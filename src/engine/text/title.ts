/**
 * Procedural title generation from controls.
 */

import type { Locale, SeedConfig, StillControlsConfig as Controls } from '../../config.js';
import { mulberry32, pick, xmur3 } from '../utils/prng.js';
import { tier } from '../utils/string.js';
import { LOCALE_TEXT } from './locales/index.js';
import { hueWords } from './text-engine.js';

/**
 * Generate a title. Seeded from the seed only (not the controls), with the
 * same hash string as the original app, so the same inputs give the same title.
 * The template is picked first, then its words, in the order the template asks.
 */
export function generateTitle(controls: Controls, seed: SeedConfig, locale: Locale): string {
    const rng = mulberry32(xmur3(`title-${seed.arrangement}-${seed.structure}-${seed.detail}`)());
    const t = LOCALE_TEXT[locale];
    const words = {
        luminosity: () => pick(t.title.luminosity[tier(controls.luminosity)], rng),
        density: () => pick(t.title.density[tier(controls.density)], rng),
        scale: () => pick(t.title.scale[tier(controls.scale)], rng),
        hue: () => pick(hueWords(controls.hue, t), rng),
    };
    const template = t.title.templates[Math.floor(rng() * t.title.templates.length)];
    return template(words);
}
