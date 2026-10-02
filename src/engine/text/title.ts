/**
 * Procedural title generation from controls.
 */

import type { Locale, SeedConfig, StillControlsConfig as Controls } from '../../config.js';
import { LUMINOSITY_WORDS, DENSITY_WORDS, SCALE_WORDS, getHueWords } from './word-tables.js';
import { mulberry32, pick, xmur3 } from '../utils/prng.js';
import { tier } from '../utils/string.js';

/**
 * Generate a title. Seeded from the seed only (not the controls), with the
 * same hash string as the original app, so the same inputs give the same title.
 */
export function generateTitle(controls: Controls, seed: SeedConfig, lang: Locale): string {
    const rng = mulberry32(xmur3(`title-${seed.arrangement}-${seed.structure}-${seed.detail}`)());
    const c = controls;
    const hueWords = getHueWords(c.hue, lang);
    const lumWords = LUMINOSITY_WORDS[lang][tier(c.luminosity)];
    const scaleWords = SCALE_WORDS[lang][tier(c.scale)];
    const denWords = DENSITY_WORDS[lang][tier(c.density)];

    const templates = lang === 'es' ? [
        () => `${pick(hueWords, rng)} ${pick(scaleWords, rng)} ${pick(lumWords, rng)}`,
        () => `Interior ${pick(denWords, rng)} ${pick(lumWords, rng)}`,
        () => `Campo ${pick(denWords, rng)} ${pick(hueWords, rng)}`,
        () => `Geometría ${pick(scaleWords, rng)} ${pick(lumWords, rng)}`,
        () => `Variedad ${pick(hueWords, rng)} ${pick(lumWords, rng)}`,
        () => `Plano ${pick(denWords, rng)} ${pick(scaleWords, rng)}`,
        () => `Estructura ${pick(lumWords, rng)} ${pick(hueWords, rng)}`,
        () => `Retícula ${pick(scaleWords, rng)} ${pick(hueWords, rng)}`,
    ] : [
        () => `${pick(lumWords, rng)} ${pick(hueWords, rng)} ${pick(scaleWords, rng)}`,
        () => `${pick(lumWords, rng)} ${pick(denWords, rng)} Interior`,
        () => `${pick(hueWords, rng)} ${pick(denWords, rng)} Field`,
        () => `${pick(scaleWords, rng)} ${pick(lumWords, rng)} Geometry`,
        () => `${pick(lumWords, rng)} ${pick(hueWords, rng)} Manifold`,
        () => `${pick(denWords, rng)} ${pick(scaleWords, rng)} Plane`,
        () => `${pick(hueWords, rng)} ${pick(lumWords, rng)} Structure`,
        () => `${pick(scaleWords, rng)} ${pick(hueWords, rng)} Lattice`,
    ];

    return (templates[Math.floor(rng() * templates.length)])();
}
