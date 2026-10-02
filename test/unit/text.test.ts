import { describe, expect, it } from 'vitest';
import { LOCALES, type Locale, type SeedConfig, type StillControlsConfig } from '../../src/config.js';
import { DEFAULT_SEED, DEFAULT_STILL_CONTROLS } from '../../src/defaults.js';
import { generateDescriptions } from '../../src/engine/text/descriptions.js';
import { generateTitle } from '../../src/engine/text/title.js';
import { mulberry32 } from '../../src/engine/utils/prng.js';

const CONTROL_KEYS = Object.keys(DEFAULT_STILL_CONTROLS) as (keyof StillControlsConfig)[];

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

// The en snapshots (and es, apart from its short description, which was later
// rewritten to fit 140 characters) were checked against the original app's text
// when the engine was ported. A changed snapshot means generated text changed for users.
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
            expect(long).toMatch(/[.!?。]$/);
        }
    });

    it('mentions the node count in both descriptions', () => {
        const { short, long } = generateDescriptions(DEFAULT_STILL_CONTROLS, 777, DEFAULT_SEED, 'en');
        expect(short).toMatch(/^777 /);
        expect(long).toContain('777');
    });

    it.each([
        ['en', 'luminous points'],
        ['es', 'puntos luminosos'],
        ['fr', 'lumières ancrent'],
        ['it', 'punti luminosi'],
        ['zh', '个光点'],
        ['ru', 'огней держат'],
    ] as [Locale, string][])('writes %s in its own language', (locale, phrase) => {
        expect(generateDescriptions(DEFAULT_STILL_CONTROLS, 412, DEFAULT_SEED, locale).short).toContain(phrase);
    });

    it('produces a non-empty title for every input', () => {
        for (const { controls, seed } of randomInputs(200)) {
            for (const locale of LOCALES) expect(generateTitle(controls, seed, locale).length).toBeGreaterThan(2);
        }
    });
});

describe('assembly in every language', () => {
    /** Every title, short, and long text for a sweep of random inputs in `locale`. */
    function texts(locale: Locale, count = 400): string[] {
        const out: string[] = [];
        for (const { controls, seed, nodeCount } of randomInputs(count)) {
            const { short, long } = generateDescriptions(controls, nodeCount, seed, locale);
            out.push(generateTitle(controls, seed, locale), short, long);
        }
        return out;
    }

    it.each(LOCALES)('leaves no placeholders or missing values (%s)', (locale) => {
        for (const text of texts(locale)) {
            expect(text).not.toMatch(/[{}]|undefined|null|NaN/);
        }
    });

    it.each(LOCALES.filter(l => l !== 'zh'))('has clean spacing and punctuation (%s)', (locale) => {
        for (const text of texts(locale)) {
            expect(text).not.toMatch(/ {2}| [,.]|[,.]{2}/);
        }
    });

    it('writes Chinese with full-width punctuation and no spaces or Latin letters', () => {
        for (const text of texts('zh')) {
            expect(text).not.toMatch(/[A-Za-z ,.]/);
            expect(text).not.toMatch(/。。|，，|，。|。，/);
        }
        const { short, long } = generateDescriptions(DEFAULT_STILL_CONTROLS, 412, DEFAULT_SEED, 'zh');
        expect(short).toMatch(/。$/);
        expect(long).toMatch(/。$/);
    });

    it.each([
        [1, '1 огонь держит'],
        [2, '2 огня держат'],
        [5, '5 огней держат'],
        [11, '11 огней держат'],
        [21, '21 огонь держит'],
        [22, '22 огня держат'],
        [412, '412 огней держат'],
    ])('makes Russian agree with the count: %i', (count, start) => {
        expect(generateDescriptions(DEFAULT_STILL_CONTROLS, count, DEFAULT_SEED, 'ru').short.startsWith(start)).toBe(true);
    });

    // en keeps the original app's template (and its ~14% truncation rate here);
    // the other languages were written or tightened to fit.
    it.each(LOCALES.filter(l => l !== 'en'))('rarely truncates the short description (%s)', (locale) => {
        // A truncated summary loses its closing phrase.
        let truncated = 0;
        const inputs = [...randomInputs(1000)];
        for (const { controls, seed } of inputs) {
            if (generateDescriptions(controls, 412, seed, locale).short.length >= 138) truncated++;
        }
        expect(truncated / inputs.length).toBeLessThan(0.05);
    });
});
