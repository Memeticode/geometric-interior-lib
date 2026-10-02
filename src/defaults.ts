/**
 * Default config values, and resolving a partial input into a complete config.
 */

import type {
    Locale,
    RenderStillConfig,
    RenderStillConfigInput,
    SeedConfig,
    StillCameraConfig,
    StillControlsConfig,
} from './config.js';

export const CONFIG_VERSION = 1;

export const DEFAULT_LOCALE: Locale = 'en';

export const DEFAULT_SEED: Readonly<SeedConfig> = Object.freeze({
    arrangement: 8,
    structure: 8,
    detail: 8,
});

export const DEFAULT_STILL_CONTROLS: Readonly<StillControlsConfig> = Object.freeze({
    hue: 0.5,
    spectrum: 0.5,
    chroma: 0.5,
    density: 0.5,
    fracture: 0.5,
    scale: 0.5,
    division: 0.5,
    faceting: 0.5,
    luminosity: 0.5,
    bloom: 0.5,
    coherence: 0.5,
    flow: 0.5,
});

export const DEFAULT_STILL_CAMERA: Readonly<StillCameraConfig> = Object.freeze({
    zoom: 0,
    rotation: 0,
    elevation: 0,
});

/**
 * Fill every missing field of `input` from defaults. Does not validate:
 * use parseRenderStillConfig() for untrusted data.
 */
export function resolveRenderStillConfig(input: RenderStillConfigInput = {}): RenderStillConfig {
    return {
        version: CONFIG_VERSION,
        locale: input.locale ?? DEFAULT_LOCALE,
        seed: withDefaults(DEFAULT_SEED, input.seed),
        controls: withDefaults(DEFAULT_STILL_CONTROLS, input.controls),
        camera: withDefaults(DEFAULT_STILL_CAMERA, input.camera),
    };
}

/**
 * Copy `defaults`, overriding each key that `input` sets to a defined value.
 *
 * Plain `{ ...defaults, ...input }` isn't enough: `{ hue: undefined }` is a
 * valid Partial, and spreading it would overwrite the default with undefined.
 * Iterating the defaults' keys also keeps any extra keys on `input` out of the result.
 */
function withDefaults<T extends object>(defaults: Readonly<T>, input: Partial<T> | undefined): T {
    const out = { ...defaults } as T;
    if (!input) return out;
    for (const key of Object.keys(defaults) as (keyof T)[]) {
        const value = input[key];
        if (value !== undefined) out[key] = value as T[keyof T];
    }
    return out;
}
