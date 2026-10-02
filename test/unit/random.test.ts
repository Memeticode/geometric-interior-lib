import { describe, expect, it } from 'vitest';
import { DEFAULT_STILL_CAMERA } from '../../src/defaults.js';
import { mulberry32 } from '../../src/engine/utils/prng.js';
import { parseRenderStillConfig } from '../../src/parse.js';
import { randomRenderStillConfig } from '../../src/random.js';

describe('randomRenderStillConfig', () => {
    it('always returns a valid, complete config', () => {
        for (let i = 0; i < 500; i++) {
            const config = randomRenderStillConfig();
            const reparsed = parseRenderStillConfig(config);
            expect(reparsed.ok).toBe(true);
            if (reparsed.ok) expect(reparsed.config).toEqual(config);
        }
    });

    it('randomizes the seed and controls, keeping the defaults elsewhere', () => {
        const config = randomRenderStillConfig({}, mulberry32(1));
        expect(config).toMatchObject({ version: 1, locale: 'en', aspect: '20:13', height: 1040, camera: DEFAULT_STILL_CAMERA });
        expect(Object.values(config.controls).some(v => v !== 0.5)).toBe(true);
        expect(Object.values(config.seed).some(v => v !== 8)).toBe(true);
    });

    it('produces integer seeds in [0, 17] and controls rounded to two decimals', () => {
        const rng = mulberry32(2);
        for (let i = 0; i < 300; i++) {
            const { seed, controls } = randomRenderStillConfig({}, rng);
            for (const v of Object.values(seed)) {
                expect(Number.isInteger(v)).toBe(true);
                expect(v).toBeGreaterThanOrEqual(0);
                expect(v).toBeLessThanOrEqual(17);
            }
            for (const v of Object.values(controls)) {
                expect(Math.round(v * 100) / 100).toBe(v);
            }
        }
    });

    it('covers the full ranges', () => {
        const rng = mulberry32(3);
        const seen = new Set<number>();
        let min = 1, max = 0;
        for (let i = 0; i < 2000; i++) {
            const { seed, controls } = randomRenderStillConfig({}, rng);
            seen.add(seed.arrangement);
            min = Math.min(min, controls.hue);
            max = Math.max(max, controls.hue);
        }
        expect(seen.size).toBe(18);
        expect(min).toBe(0);
        expect(max).toBe(1);
    });

    it('stays in range even if the generator returns its extremes', () => {
        for (const value of [0, 0.999999999, 1]) {
            expect(parseRenderStillConfig(randomRenderStillConfig({}, () => value)).ok).toBe(true);
        }
    });

    it('keeps every fixed field', () => {
        const fixed = {
            locale: 'ru',
            aspect: '9:16',
            height: 512,
            seed: { detail: 3 },
            controls: { hue: 0.78, bloom: 0 },
            camera: { zoom: 40, elevation: -20 },
        } as const;
        for (let i = 0; i < 50; i++) {
            const config = randomRenderStillConfig(fixed);
            expect(config).toMatchObject({ locale: 'ru', aspect: '9:16', height: 512 });
            expect(config.seed.detail).toBe(3);
            expect(config.controls.hue).toBe(0.78);
            expect(config.controls.bloom).toBe(0);
            expect(config.camera).toEqual({ zoom: 40, rotation: 0, elevation: -20 });
        }
    });

    it('is reproducible with a seeded generator', () => {
        expect(randomRenderStillConfig({}, mulberry32(42))).toEqual(randomRenderStillConfig({}, mulberry32(42)));
        expect(randomRenderStillConfig({}, mulberry32(42))).not.toEqual(randomRenderStillConfig({}, mulberry32(43)));
    });

    it('fixing one field leaves the other random values unchanged', () => {
        const free = randomRenderStillConfig({}, mulberry32(7));
        const pinned = randomRenderStillConfig({ controls: { hue: 0.1 }, seed: { structure: 0 } }, mulberry32(7));
        expect(pinned.controls).toEqual({ ...free.controls, hue: 0.1 });
        expect(pinned.seed).toEqual({ ...free.seed, structure: 0 });
    });

    it('throws for an invalid fixed config', () => {
        expect(() => randomRenderStillConfig({ height: 0 })).toThrow(
            'Invalid render config:\n- height: must be an integer in [1, 4096]',
        );
    });
});
