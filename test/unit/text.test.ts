import { describe, expect, it } from 'vitest';
import type { Locale, SeedConfig, StillControlsConfig } from '../../src/config.js';
import { DEFAULT_SEED, DEFAULT_STILL_CONTROLS } from '../../src/defaults.js';
import { generateDescriptions } from '../../src/engine/text/descriptions.js';
import { generateTitle } from '../../src/engine/text/title.js';
import { mulberry32 } from '../../src/engine/utils/prng.js';

const CONTROL_KEYS = Object.keys(DEFAULT_STILL_CONTROLS) as (keyof StillControlsConfig)[];
const LOCALES: Locale[] = ['en', 'es'];

/** Deterministic random configs, mixing extreme and in-between values. */
function* randomInputs(count: number) {
    const rng = mulberry32(2026);
    const extremes = [0, 0.03, 0.1, 0.5, 0.9, 0.97, 1];
    for (let i = 0; i < count; i++) {
        const controls = Object.fromEntries(CONTROL_KEYS.map(k =>
            [k, i % 2 ? rng() : extremes[Math.floor(rng() * extremes.length)]],
        )) as unknown as StillControlsConfig;
        const seed: SeedConfig = {
            arrangement: Math.floor(rng() * 18),
            structure: Math.floor(rng() * 18),
            detail: Math.floor(rng() * 18),
        };
        yield { controls, seed, nodeCount: Math.floor(rng() * 3000) };
    }
}

// These snapshots were checked against the original app's text output when the
// engine was ported. A changed snapshot means generated text changed for users.
describe('snapshots', () => {
    const cases: { name: string; controls: StillControlsConfig; seed: SeedConfig; nodeCount: number }[] = [
        { name: 'defaults', controls: DEFAULT_STILL_CONTROLS, seed: DEFAULT_SEED, nodeCount: 412 },
        {
            name: 'dark bloom, chaotic',
            controls: { ...DEFAULT_STILL_CONTROLS, luminosity: 0.1, bloom: 0.9, coherence: 0.1, hue: 0.06 },
            seed: { arrangement: 3, structure: 12, detail: 5 },
            nodeCount: 1234,
        },
    ];

    for (const { name, controls, seed, nodeCount } of cases) {
        for (const locale of LOCALES) {
            it(`${name} (${locale})`, () => {
                expect({
                    title: generateTitle(controls, seed, locale),
                    ...generateDescriptions(controls, nodeCount, seed, locale),
                }).toMatchSnapshot();
            });
        }
    }
});

describe('determinism', () => {
    it('gives the same text for the same inputs', () => {
        for (const { controls, seed, nodeCount } of randomInputs(50)) {
            expect(generateDescriptions(controls, nodeCount, seed, 'en'))
                .toEqual(generateDescriptions({ ...controls }, nodeCount, { ...seed }, 'en'));
            expect(generateTitle(controls, seed, 'es')).toBe(generateTitle({ ...controls }, { ...seed }, 'es'));
        }
    });

    it('changes the descriptions when any single input changes', () => {
        const base = generateDescriptions(DEFAULT_STILL_CONTROLS, 412, DEFAULT_SEED, 'en');
        expect(generateDescriptions(DEFAULT_STILL_CONTROLS, 413, DEFAULT_SEED, 'en')).not.toEqual(base);
        expect(generateDescriptions(DEFAULT_STILL_CONTROLS, 412, { ...DEFAULT_SEED, detail: 9 }, 'en')).not.toEqual(base);
        expect(generateDescriptions({ ...DEFAULT_STILL_CONTROLS, flow: 0.51 }, 412, DEFAULT_SEED, 'en')).not.toEqual(base);
    });
});

describe('content', () => {
    it.each(LOCALES)('stays within length limits without cutting the long text (%s)', (locale) => {
        for (const { controls, seed, nodeCount } of randomInputs(2000)) {
            const { short, long } = generateDescriptions(controls, nodeCount, seed, locale);
            expect(short.length).toBeLessThanOrEqual(140);
            // The 2000 cap is a safety net; real text stays far below it.
            expect(long.length).toBeLessThan(1500);
            expect(long).toMatch(/[.!?]$/);
        }
    });

    it('mentions the node count in both descriptions', () => {
        const { short, long } = generateDescriptions(DEFAULT_STILL_CONTROLS, 777, DEFAULT_SEED, 'en');
        expect(short).toMatch(/^777 /);
        expect(long).toContain('777');
    });

    it('writes each locale in its own language', () => {
        const en = generateDescriptions(DEFAULT_STILL_CONTROLS, 412, DEFAULT_SEED, 'en');
        const es = generateDescriptions(DEFAULT_STILL_CONTROLS, 412, DEFAULT_SEED, 'es');
        expect(en.short).toContain('luminous points');
        expect(es.short).toContain('puntos luminosos');
    });

    it('produces a non-empty title for every input', () => {
        for (const { controls, seed } of randomInputs(200)) {
            for (const locale of LOCALES) expect(generateTitle(controls, seed, locale)).toMatch(/\S+ \S+/);
        }
    });
});
