/**
 * Text generation engine — quantization, selection, composition.
 *
 * Pure functions with no phrase data. The banks live in alt-text-banks.ts.
 */

import { xmur3, mulberry32 } from '../utils/prng.js';
import type { SeedConfig, StillControlsConfig } from '../../config.js';
import type { LocaleText, Synonyms } from './locale-text.js';

/* ── Quantization ── */

/** Quantize a [0,1] value into `levels` discrete buckets (0-indexed). */
export function gradedIndex(value: number, levels: number): number {
    return Math.min(levels - 1, Math.floor(value * levels));
}

/* ── Selection ── */

/** Pick a random element from an array. */
export function pickOne<T>(arr: readonly T[], rng: () => number): T {
    return arr[Math.floor(rng() * arr.length)];
}

/** Pick from a graded bank: bank[level] is a synonym array. */
export function pickGraded(
    bank: readonly (readonly string[])[],
    value: number,
    rng: () => number,
): string {
    const level = gradedIndex(value, bank.length);
    return pickOne(bank[level], rng);
}

/* ── Deterministic text RNG ── */

/**
 * Create a PRNG seeded from every input to the descriptions.
 * Any change to any control, nodeCount, or seed produces a new stream.
 * The hash string matches the original app, so the same inputs give the same text.
 */
export function createTextRng(controls: StillControlsConfig, nodeCount: number, seed: SeedConfig): () => number {
    const parts: string[] = ['alt-v2'];
    const keys = Object.keys(controls).sort() as (keyof StillControlsConfig)[];
    for (const k of keys) {
        const v = controls[k];
        parts.push(typeof v === 'number' ? v.toFixed(6) : String(v));
    }
    parts.push(String(nodeCount));
    parts.push(`${seed.arrangement}.${seed.structure}.${seed.detail}`);
    return mulberry32(xmur3(parts.join('|'))());
}

/* ── Text utilities ── */

/**
 * Truncate to a character limit, breaking at a word boundary, and make sure
 * the result ends with `period`. Text without spaces (Chinese) breaks at the limit.
 */
export function truncateAt(text: string, maxChars: number, period = '.'): string {
    if (text.length <= maxChars) return text;
    const cut = text.slice(0, maxChars);
    const lastSpace = cut.lastIndexOf(' ');
    const breakAt = lastSpace > maxChars * 0.6 ? lastSpace : maxChars;
    // Trailing separators: ASCII, em/en dashes, and Chinese full-width comma, enumeration comma, semicolon, colon.
    let result = cut.slice(0, breakAt).replace(/[\s,;:—–，、；：-]+$/, '');
    if (!result.endsWith(period)) result += period;
    return result;
}

/** Join sentences with `separator`, collapsing extra whitespace. */
export function joinSentences(parts: string[], separator = ' '): string {
    return parts.filter(Boolean).join(separator).replace(/\s{2,}/g, ' ').trim();
}

/** The locale's hue words for a hue in [0, 1]. */
export function hueWords(hue01: number, t: LocaleText): Synonyms {
    const hueDeg = ((hue01 * 360) % 360 + 360) % 360;
    return (t.hues.find(e => hueDeg < e.max) ?? t.hues[0]).words;
}
