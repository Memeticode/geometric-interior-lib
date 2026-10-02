import { afterEach, describe, expect, it, vi } from 'vitest';
import { ASPECTS, type RenderStillConfigInput } from '../../src/config.js';
import { generateDescriptions } from '../../src/engine/text/descriptions.js';
import { generateTitle } from '../../src/engine/text/title.js';
import { parseRenderStillConfig, stillWidth } from '../../src/parse.js';
import { renderStill } from '../../src/index.js';
import type { RenderStillResult } from '../../src/result.js';

// Small images keep software WebGL fast; the full default size is tested once.
const SMALL = 130;

/** Decode a PNG and measure it: size, and how much of it is lit. */
async function inspect(image: Blob) {
    const bitmap = await createImageBitmap(image);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(bitmap, 0, 0);
    const { data } = ctx.getImageData(0, 0, bitmap.width, bitmap.height);
    let lit = 0, sum = 0;
    for (let i = 0; i < data.length; i += 4) {
        const v = Math.max(data[i], data[i + 1], data[i + 2]);
        if (v > 8) lit++;
        sum += v;
    }
    const pixels = bitmap.width * bitmap.height;
    return { width: bitmap.width, height: bitmap.height, litFraction: lit / pixels, meanBrightness: sum / pixels };
}

async function bytes(image: Blob): Promise<Uint8Array> {
    return new Uint8Array(await image.arrayBuffer());
}

afterEach(() => {
    vi.restoreAllMocks();
});

describe('renderStill', () => {
    it('renders the default config at 1600 × 1040', async () => {
        const result = await renderStill();
        expect(result.image.type).toBe('image/png');
        expect(result.width).toBe(1600);
        expect(result.height).toBe(1040);

        const stats = await inspect(result.image);
        expect(stats).toMatchObject({ width: 1600, height: 1040 });
        expect(stats.litFraction).toBeGreaterThan(0.5);
    });

    it('returns the resolved config and the text for that config', async () => {
        const input: RenderStillConfigInput = { locale: 'es', height: SMALL, seed: { detail: 2 }, controls: { hue: 0.8 } };
        const result: RenderStillResult = await renderStill(input);

        const parsed = parseRenderStillConfig(input);
        if (!parsed.ok) throw new Error('fixture should be valid');
        expect(result.config).toEqual(parsed.config);

        const { controls, seed, locale } = parsed.config;
        expect(result.title).toBe(generateTitle(controls, seed, locale));
        // The descriptions depend on the scene's node count, read back from the short one.
        const nodeCount = Number(result.shortDescription.split(' ')[0]);
        expect(nodeCount).toBeGreaterThan(0);
        expect(generateDescriptions(controls, nodeCount, seed, locale)).toEqual({
            short: result.shortDescription,
            long: result.longDescription,
        });
    });

    it('is deterministic: the same config gives identical PNG bytes', async () => {
        const config = { height: SMALL, seed: { arrangement: 4, structure: 11, detail: 7 } };
        const [a, b] = await Promise.all([renderStill(config), renderStill(config)]);
        expect(await bytes(a.image)).toEqual(await bytes(b.image));
    });

    it('renders a different image for a different seed', async () => {
        const a = await renderStill({ height: SMALL, seed: { arrangement: 1 } });
        const b = await renderStill({ height: SMALL, seed: { arrangement: 2 } });
        expect(await bytes(a.image)).not.toEqual(await bytes(b.image));
    });

    it.each(ASPECTS)('renders aspect %s at the computed width', async (aspect) => {
        const result = await renderStill({ aspect, height: SMALL });
        const stats = await inspect(result.image);
        expect(stats.width).toBe(stillWidth(SMALL, aspect));
        expect(stats.height).toBe(SMALL);
        expect(result.width).toBe(stats.width);
    });

    it.each([
        ['zoomed all the way in', { zoom: 100 }],
        ['zoomed all the way out', { zoom: -100 }],
        ['straight overhead', { elevation: 90 }],
        ['straight below', { elevation: -90 }],
        ['orbited and raised', { rotation: 135, elevation: 45 }],
    ])('renders a visible scene %s', async (_name, camera) => {
        const stats = await inspect((await renderStill({ aspect: '1:1', height: SMALL, camera })).image);
        expect(stats.litFraction).toBeGreaterThan(0.2);
    });

    it('zooming in fills more of the frame than zooming out', async () => {
        const near = await inspect((await renderStill({ height: SMALL, camera: { zoom: 100 } })).image);
        const far = await inspect((await renderStill({ height: SMALL, camera: { zoom: -100 } })).image);
        expect(near.meanBrightness).toBeGreaterThan(far.meanBrightness * 2);
    });

    it('elevation +45 and -45 give different views', async () => {
        const up = await renderStill({ height: SMALL, camera: { elevation: 45 } });
        const down = await renderStill({ height: SMALL, camera: { elevation: -45 } });
        expect(await bytes(up.image)).not.toEqual(await bytes(down.image));
    });

    it('releases its WebGL context: 30 renders in a row all succeed', async () => {
        // Browsers cap live contexts (often 16); leaking them would fail here.
        for (let i = 0; i < 30; i++) {
            const result = await renderStill({ height: 64, seed: { arrangement: i % 18 } });
            expect(result.image.size).toBeGreaterThan(0);
        }
    });

    it('works inside a Web Worker', async () => {
        const worker = new Worker(new URL('./render-worker.ts', import.meta.url), { type: 'module' });
        try {
            const reply = await new Promise<{ ok: boolean; result?: RenderStillResult; error?: string }>((resolve, reject) => {
                worker.onmessage = e => resolve(e.data);
                worker.onerror = e => reject(new Error(e.message));
                worker.postMessage({ height: SMALL });
            });
            expect(reply.error).toBeUndefined();
            expect(reply.result!.image.type).toBe('image/png');
            expect(reply.result!.height).toBe(SMALL);
        } finally {
            worker.terminate();
        }
    });
});

describe('errors', () => {
    it('rejects an invalid config with every problem listed', async () => {
        await expect(renderStill({ height: 0, camera: { zoom: 500 } })).rejects.toThrow(
            'Invalid render config:\n- height: must be an integer in [1, 4096]\n- camera.zoom: must be a number in [-100, 100]',
        );
    });

    it('rejects with a WebGL2 error when the browser cannot create a WebGL2 context', async () => {
        // Simulate a browser without WebGL2 (unsupported, disabled, or blocked).
        const original = OffscreenCanvas.prototype.getContext;
        vi.spyOn(OffscreenCanvas.prototype, 'getContext').mockImplementation(function (this: OffscreenCanvas, type: string, ...rest: unknown[]) {
            return type === 'webgl2' ? null : (original as Function).call(this, type, ...rest);
        } as typeof original);

        await expect(renderStill({ height: SMALL })).rejects.toThrow(/^WebGL2 unavailable: this browser could not create a WebGL2 context/);
    });
});
