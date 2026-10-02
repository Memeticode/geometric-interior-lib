/**
 * One-shot WebGL rendering: build the scene for a config, render one frame
 * at an exact pixel size, encode it as PNG, and release every GPU resource.
 *
 * Adapted from the original app's live renderer (create-renderer.ts),
 * minus everything that only a live canvas needs (resizing, DPR, re-rendering).
 */

import * as THREE from 'three';
import {
    EffectComposer,
    RenderPass,
    EffectPass,
    BloomEffect,
    ChromaticAberrationEffect,
    VignetteEffect,
    BlendFunction,
} from 'postprocessing';
import type { RenderStillConfig, StillCameraConfig } from '../config.js';
import { deriveParams } from './params.js';
import { createSceneStreams } from './streams.js';
import { buildScene } from './scene/build-scene.js';
import { createGlowTexture } from './scene/dots.js';
import { Background } from './background.js';

export interface RenderedImage {
    /** The frame, as a PNG. */
    image: Blob;
    /** Number of light points in the scene; the descriptions mention it. */
    nodeCount: number;
}

/**
 * Render `config` to a `width` × `config.height` PNG.
 * The config must already be validated. Browser only: needs WebGL2.
 */
export async function renderImage(config: RenderStillConfig, width: number): Promise<RenderedImage> {
    const height = config.height;
    const canvas = createCanvas(width, height);
    requireWebGL2(canvas);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas as HTMLCanvasElement,
        antialias: false,
        alpha: false,
        preserveDrawingBuffer: true,
    });
    const scene = new THREE.Scene();
    const bg = new Background();
    const glowTexture = createGlowTexture();
    let composer: EffectComposer | undefined;

    try {
        // Exact pixels: the caller chose the size, so no devicePixelRatio scaling.
        renderer.setPixelRatio(1);
        renderer.setSize(width, height, false);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 1.1;
        renderer.sortObjects = true;
        scene.background = null;

        const params = deriveParams(config.controls);
        const camera = new THREE.PerspectiveCamera(params.cameraFov, width / height, 0.1, 100);
        placeCamera(camera, params.cameraZ, config.camera);

        // Scene
        bg.setCenterColor(params.fogColor);
        bg.update(camera);
        scene.add(bg.mesh);
        const { nodeCount } = buildScene(params, createSceneStreams(config.seed), scene, glowTexture, camera.position);

        // Postprocessing
        composer = new EffectComposer(renderer, {
            multisampling: Math.min(2, renderer.capabilities.maxSamples || 2),
        });
        composer.setSize(width, height);
        composer.addPass(new RenderPass(scene, camera));

        const bloom = new BloomEffect({
            blendFunction: BlendFunction.SCREEN,
            luminanceThreshold: params.bloomThreshold,
            luminanceSmoothing: 0.20,
            mipmapBlur: true,
            intensity: params.bloomStrength,
            radius: 0.50,
        });
        const chromaticAberration = new ChromaticAberrationEffect({
            offset: new THREE.Vector2(params.chromaticAberration, params.chromaticAberration),
            radialModulation: true,
            modulationOffset: 0.15,
        });
        const vignette = new VignetteEffect({
            offset: 0.5,
            darkness: params.vignetteStrength,
        });
        composer.addPass(new EffectPass(camera, bloom, chromaticAberration, vignette));

        composer.render();

        // Encode before cleanup: losing the context below would clear the canvas.
        const image = await encodePng(canvas);
        return { image, nodeCount };
    } finally {
        disposeScene(scene, bg.mesh);
        bg.dispose();
        glowTexture.dispose();
        composer?.dispose();
        renderer.dispose();
        // Free the WebGL context now rather than at garbage collection:
        // browsers cap open contexts (often 16), and each call makes a new one.
        renderer.forceContextLoss();
    }
}

/**
 * Position the camera on a sphere around the origin, looking at it.
 *
 * zoom: 0 keeps the base distance; ±100 is 3× closer / farther.
 * elevation: degrees above (+) or below (−) the horizon.
 * rotation: degrees around the vertical axis.
 *
 * Built as one rotation (elevation first, then rotation) instead of lookAt(),
 * so it stays well defined straight overhead (elevation ±90).
 */
function placeCamera(camera: THREE.PerspectiveCamera, baseDistance: number, cam: StillCameraConfig): void {
    const distance = baseDistance * Math.pow(3, -cam.zoom / 100);
    const toRad = Math.PI / 180;
    // Euler order YXZ applies X (elevation) first, then Y (rotation).
    // Negative X tilt raises the camera, since it starts on the +Z axis.
    camera.quaternion.setFromEuler(new THREE.Euler(-cam.elevation * toRad, cam.rotation * toRad, 0, 'YXZ'));
    camera.position.set(0, 0, distance).applyQuaternion(camera.quaternion);
    camera.updateMatrixWorld();
}

/** An offscreen canvas where supported (including workers), otherwise a detached DOM canvas. */
function createCanvas(width: number, height: number): OffscreenCanvas | HTMLCanvasElement {
    if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(width, height);
    if (typeof document === 'undefined') {
        throw new Error(
            'WebGL2 unavailable: renderStill needs a browser with WebGL2, ' +
            'but this environment has no canvas (no OffscreenCanvas or document). It cannot run in Node.js.',
        );
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

/**
 * The exact attributes three.js requests for its context (r172). A canvas
 * returns the same context to every later getContext('webgl2') call, so
 * three.js picks up this one unchanged; keep these in sync with three's
 * defaults plus our preserveDrawingBuffer, or pixels may change.
 */
const CONTEXT_ATTRIBUTES: WebGLContextAttributes = {
    alpha: true,
    depth: true,
    stencil: false,
    antialias: false,
    premultipliedAlpha: true,
    preserveDrawingBuffer: true,
    powerPreference: 'default',
    failIfMajorPerformanceCaveat: false,
};

/** Create the canvas's WebGL2 context, or throw a clear error if the browser can't. */
function requireWebGL2(canvas: OffscreenCanvas | HTMLCanvasElement): void {
    if (!canvas.getContext('webgl2', CONTEXT_ATTRIBUTES)) {
        throw new Error(
            'WebGL2 unavailable: this browser could not create a WebGL2 context. ' +
            'It may be unsupported, disabled, or blocked (for example, with hardware acceleration turned off).',
        );
    }
}

function encodePng(canvas: OffscreenCanvas | HTMLCanvasElement): Promise<Blob> {
    // Test OffscreenCanvas first: HTMLCanvasElement doesn't exist in workers.
    if (typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas) {
        return canvas.convertToBlob({ type: 'image/png' });
    }
    return new Promise((resolve, reject) => {
        (canvas as HTMLCanvasElement).toBlob(
            blob => blob ? resolve(blob) : reject(new Error('PNG encoding failed')),
            'image/png',
        );
    });
}

/** Release every object's GPU resources (geometry, material, instance buffers). */
function disposeScene(scene: THREE.Scene, skip: THREE.Object3D): void {
    for (const child of [...scene.children]) {
        scene.remove(child);
        if (child === skip) continue;
        const mesh = child as THREE.Mesh;
        mesh.geometry?.dispose();
        (mesh.material as THREE.Material | undefined)?.dispose();
        // geometry.dispose() does not free instanceMatrix/instanceColor buffers
        if ((child as THREE.InstancedMesh).isInstancedMesh) (child as THREE.InstancedMesh).dispose();
    }
}
