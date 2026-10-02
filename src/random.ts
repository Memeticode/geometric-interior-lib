/**
 * Random configs: a new seed and new controls, everything else as given or default.
 */

import type { RenderStillConfig, RenderStillConfigInput, SeedConfig, StillControlsConfig } from './config.js';
import { DEFAULT_SEED, DEFAULT_STILL_CONTROLS } from './defaults.js';
import { invalidConfigError, parseRenderStillConfig } from './parse.js';

/** Highest seed field value (seed fields are integers in [0, 17]). */
const SEED_MAX = 17;

/**
 * A complete config with a random seed and random controls, like the original
 * app's Randomize button. Controls are rounded to two decimals so configs stay
 * short in JSON and URLs.
 *
 * Fields set in `fixed` are kept, including individual seed and control fields;
 * locale, aspect, height, and camera are never randomized (the default camera
 * frames the scene best). Throws "Invalid render config:" if `fixed` is invalid.
 *
 * `random` returns numbers in [0, 1) (Math.random by default); pass a seeded
 * generator for reproducible results. Every field draws a value even when
 * fixed, so fixing one field never changes the others.
 */
export function randomRenderStillConfig(
    fixed: RenderStillConfigInput = {},
    random: () => number = Math.random,
): RenderStillConfig {
    const parsed = parseRenderStillConfig(fixed);
    if (!parsed.ok) throw invalidConfigError(parsed.errors);
    const config = parsed.config;

    const seed = { ...config.seed };
    for (const key of Object.keys(DEFAULT_SEED) as (keyof SeedConfig)[]) {
        const value = Math.min(SEED_MAX, Math.floor(random() * (SEED_MAX + 1)));
        if (fixed.seed?.[key] === undefined) seed[key] = value;
    }

    const controls = { ...config.controls };
    for (const key of Object.keys(DEFAULT_STILL_CONTROLS) as (keyof StillControlsConfig)[]) {
        const value = Math.min(1, Math.round(random() * 100) / 100);
        if (fixed.controls?.[key] === undefined) controls[key] = value;
    }

    return { ...config, seed, controls };
}
