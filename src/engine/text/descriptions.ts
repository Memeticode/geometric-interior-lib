/**
 * Short and long text descriptions from controls.
 *
 *   short: a brief summary, <=140 chars
 *   long:  interpretive prose, <=2000 chars (a safety cap; real text stays near 1000)
 *
 * Language-neutral: every word and template comes from the locale's
 * LocaleText (./locales/), assembled as described in ./locale-text.ts.
 */

import type { Locale, SeedConfig, StillControlsConfig as Controls } from '../../config.js';
import { injectColor } from '../utils/string.js';
import type { InflectionKey, LocaleText } from './locale-text.js';
import { LOCALE_TEXT } from './locales/index.js';
import { createTextRng, gradedIndex, hueWords, joinSentences, pickGraded, pickOne, truncateAt } from './text-engine.js';

/* ── Helpers ── */

function hueAdj(hue01: number, t: LocaleText): string {
    return hueWords(hue01, t)[0].toLowerCase();
}

/** 3-level index (low / mid / high) for cross-product banks. */
function tier3(v: number): number {
    if (v < 0.33) return 0;
    if (v < 0.67) return 1;
    return 2;
}

/** Map coherence (3 levels) × flow (3 levels) into a 0-8 index. */
function spatialIndex(coherence: number, flow: number): number {
    return tier3(coherence) * 3 + tier3(flow);
}

/** Map chroma (3 levels) × spectrum (3 levels) into a 0-8 index. */
function colorIndex(chroma: number, spectrum: number): number {
    return tier3(chroma) * 3 + tier3(spectrum);
}

/** Division: low (<0.30) = 0, mid = 1, high (>0.70) = 2. */
function divisionTier(v: number): number {
    if (v < 0.30) return 0;
    if (v > 0.70) return 2;
    return 1;
}

/**
 * Fill count placeholders: {N} → the number, and {N|one|few|many} → the number
 * plus the plural form Intl.PluralRules picks for this locale (e.g. Russian
 * "1 точка", "2 точки", "5 точек"). Fewer forms than categories reuse the last.
 */
function fillCount(template: string, n: number, locale: Locale): string {
    const category = new Intl.PluralRules(locale).select(n);
    const index = ({ one: 0, few: 1, many: 2 } as Record<string, number>)[category] ?? 2;
    return template
        .replace(/\{N\|([^}]*)\}/g, (_, forms: string) => {
            const list = forms.split('|');
            return `${n} ${list[Math.min(index, list.length - 1)]}`;
        })
        .replace(/\{N\}/g, String(n));
}

/* ── Summary builder ── */

function buildSummary(c: Controls, nodeCount: number, rng: () => number, t: LocaleText, locale: Locale): string {
    const s = t.summary;
    return fillCount(s.compose({
        nodeCount,
        density: pickGraded(s.density, c.density, rng),
        faceting: pickGraded(s.faceting, c.faceting, rng),
        scale: pickGraded(s.scale, c.scale, rng),
        arrangement: pickOne(s.arrangement[spatialIndex(c.coherence, c.flow)], rng),
        bloom: pickGraded(s.bloom, c.bloom, rng),
        hue: tier3(c.chroma) === 0 ? null : hueAdj(c.hue, t),
    }), nodeCount, locale);
}

/* ── Expanded description builders ── */

function buildScene(c: Controls, rng: () => number, t: LocaleText): string {
    const lum = pickGraded(t.scene.luminosity, c.luminosity, rng);
    const bloom = pickGraded(t.scene.bloom, c.bloom, rng);
    return lum + bloom + t.punctuation.period;
}

function buildGeometry(c: Controls, rng: () => number, t: LocaleText): string {
    const g = t.geometry;
    // density (5 levels) × fracture (3 levels) = 15 combos
    const formIdx = gradedIndex(c.density, 5) * 3 + tier3(c.fracture);
    const form = pickOne(g.form[formIdx], rng);
    const faceting = pickOne(g.faceting[gradedIndex(c.faceting, 5)], rng);
    const spatial = pickOne(g.spatial[spatialIndex(c.coherence, c.flow)], rng);
    const division = pickOne(g.division[divisionTier(c.division)], rng);

    return joinSentences([form + faceting + t.punctuation.period, spatial + division], t.punctuation.space);
}

function buildColor(c: Controls, nodeCount: number, rng: () => number, t: LocaleText, locale: Locale): string {
    const colorRaw = pickOne(t.color.phrase[colorIndex(c.chroma, c.spectrum)], rng);
    const color = injectColor(colorRaw, hueAdj(c.hue, t));

    // Light points phrase: bloom drives the bank (5 levels)
    const light = fillCount(pickGraded(t.color.lightPoints, c.bloom, rng), nodeCount, locale);

    return joinSentences([color, light], t.punctuation.space);
}

/** Map a 0-8 family index into one of 3 meta-groups. */
function metaGroup(family9: number): number {
    if (family9 < 3) return 0;
    if (family9 < 6) return 1;
    return 2;
}

/**
 * Check for a parameter-sensitive inflection that should replace the
 * bridge phrase. Returns null if no parameter is extreme enough.
 *
 * Pair inflections checked first (more specific = higher priority),
 * then single-parameter inflections. First match wins.
 */
function paramInflection(c: Controls, rng: () => number, t: LocaleText): string | null {
    const checks: Array<{ key: InflectionKey; test: boolean }> = [
        // Pair inflections — two simultaneous extremes
        { key: 'darkBloom',    test: c.luminosity < 0.15 && c.bloom > 0.70 },
        { key: 'darkJewel',    test: c.luminosity < 0.15 && c.bloom < 0.20 },
        { key: 'chaosStorm',   test: c.coherence < 0.20 && c.fracture > 0.65 },
        { key: 'sparseOrder',  test: c.density < 0.06 && c.coherence > 0.80 },
        { key: 'vividMono',    test: c.chroma > 0.70 && c.spectrum < 0.25 },
        { key: 'denseChaos',   test: c.density > 0.25 && c.coherence < 0.25 },
        // Single-parameter inflections
        { key: 'coherenceHigh', test: c.coherence > 0.88 },
        { key: 'coherenceLow',  test: c.coherence < 0.12 },
        { key: 'luminosityLow', test: c.luminosity < 0.08 },
        { key: 'bloomHigh',     test: c.bloom > 0.88 },
        { key: 'densityHigh',   test: c.density > 0.85 },
    ];
    for (const { key, test } of checks) {
        if (test) return pickOne(t.coda.inflection[key], rng);
    }
    return null;
}

function buildCoda(seed: SeedConfig, controls: Controls, rng: () => number, t: LocaleText): string {
    const aFamily = Math.floor(seed.arrangement / 2);  // 0-8
    const sFamily = Math.floor(seed.structure / 2);    // 0-8
    const dFamily = Math.floor(seed.detail / 2);       // 0-8

    const arrangement = pickOne(t.coda.arrangement[aFamily], rng);
    const structure = pickOne(t.coda.structure[sFamily], rng);
    const detail = pickOne(t.coda.detail[dFamily], rng);

    // Bridge: parameter inflection overrides cross-slot bridge when active
    const inflection = paramInflection(controls, rng, t);
    const bridgeIdx = metaGroup(aFamily) * 3 + metaGroup(dFamily);
    const bridge = inflection ?? pickOne(t.coda.bridge[bridgeIdx], rng);

    // Lowercase the detail opening so it flows from the bridge's comma.
    const detailLower = detail.charAt(0).toLowerCase() + detail.slice(1);
    return arrangement + structure + bridge + t.punctuation.space + detailLower;
}

/* ── Main entry point ── */

const SHORT_MAX = 140;
const LONG_MAX = 2000;

export interface Descriptions {
    short: string;
    long: string;
}

/**
 * Generate both descriptions. `nodeCount` comes from the built scene.
 * Sections draw from one RNG in a fixed order (summary, scene, geometry,
 * color, coda); keep it that way or every config's text changes.
 */
export function generateDescriptions(
    controls: Controls,
    nodeCount: number,
    seed: SeedConfig,
    locale: Locale,
): Descriptions {
    const t = LOCALE_TEXT[locale];
    const { period, space } = t.punctuation;
    const rng = createTextRng(controls, nodeCount, seed);

    const short = truncateAt(buildSummary(controls, nodeCount, rng, t, locale), SHORT_MAX, period);

    const scene = buildScene(controls, rng, t);
    const geometry = buildGeometry(controls, rng, t);
    const color = buildColor(controls, nodeCount, rng, t, locale);
    const coda = buildCoda(seed, controls, rng, t);
    const long = truncateAt(joinSentences([scene, geometry, color, coda], space), LONG_MAX, period);

    return { short, long };
}
