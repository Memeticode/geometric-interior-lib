import { describe, expect, it } from 'vitest';
import { ASPECTS } from '../../src/config.js';
import { parseRenderStillConfig, stillWidth } from '../../src/parse.js';

/** Parse and expect success; returns the resolved config. */
function ok(data: unknown) {
    const result = parseRenderStillConfig(data);
    if (!result.ok) throw new Error(`expected ok, got errors: ${result.errors.join('; ')}`);
    return result.config;
}

/** Parse and expect failure; returns the error list. */
function errors(data: unknown): string[] {
    const result = parseRenderStillConfig(data);
    if (result.ok) throw new Error('expected errors, got ok');
    return result.errors;
}

describe('defaults', () => {
    it('resolves an empty config to the full defaults', () => {
        expect(ok({})).toEqual({
            version: 1,
            locale: 'en',
            aspect: '20:13',
            height: 1040,
            seed: { arrangement: 8, structure: 8, detail: 8 },
            controls: {
                hue: 0.5, spectrum: 0.5, chroma: 0.5,
                density: 0.5, fracture: 0.5, scale: 0.5, division: 0.5, faceting: 0.5,
                luminosity: 0.5, bloom: 0.5,
                coherence: 0.5, flow: 0.5,
            },
            camera: { zoom: 0, rotation: 0, elevation: 0 },
        });
    });

    it('fills only the missing fields of a partial section', () => {
        const config = ok({ seed: { structure: 3 }, controls: { hue: 0.9 }, camera: { zoom: -40 } });
        expect(config.seed).toEqual({ arrangement: 8, structure: 3, detail: 8 });
        expect(config.controls.hue).toBe(0.9);
        expect(config.controls.bloom).toBe(0.5);
        expect(config.camera).toEqual({ zoom: -40, rotation: 0, elevation: 0 });
    });

    it('treats explicitly undefined fields as missing', () => {
        expect(ok({ locale: undefined, controls: { hue: undefined } }).controls.hue).toBe(0.5);
    });

    it('does not mutate the input', () => {
        const input = { controls: { hue: 0.2 } };
        ok(input);
        expect(input).toEqual({ controls: { hue: 0.2 } });
    });
});

describe('structure', () => {
    it.each([null, undefined, 'config', 42, [], [1, 2]])('rejects a non-object config: %j', (data) => {
        expect(errors(data)).toEqual(['config: must be an object']);
    });

    it('rejects unknown fields at the top level and in sections', () => {
        expect(errors({ colour: 1, camera: { fov: 50 } })).toEqual([
            'colour: unknown field',
            'camera.fov: unknown field',
        ]);
    });

    it('rejects a section that is not an object', () => {
        expect(errors({ seed: [8, 8, 8] })).toEqual(['seed: must be an object']);
    });

    it('collects every error instead of stopping at the first', () => {
        expect(errors({ locale: 'de', seed: { detail: 18 }, controls: { hue: 2 } })).toHaveLength(3);
    });
});

describe('fields', () => {
    it('accepts only the current version', () => {
        expect(ok({ version: 1 }).version).toBe(1);
        expect(errors({ version: 2 })).toEqual(['version: must be 1']);
    });

    it('validates locale', () => {
        expect(ok({ locale: 'es' }).locale).toBe('es');
        expect(errors({ locale: 'de' })).toEqual(['locale: must be one of en, es, fr, it, zh, ru']);
    });

    it.each(ASPECTS)('accepts aspect %s', (aspect) => {
        expect(ok({ aspect, height: 100 }).aspect).toBe(aspect);
    });

    it('rejects an aspect outside the list, including numbers', () => {
        expect(errors({ aspect: '5:4' })[0]).toMatch(/^aspect: must be one of 20:13, /);
        expect(errors({ aspect: 1.5 })[0]).toMatch(/^aspect: must be one of /);
    });

    it('requires integer seed fields in [0, 17]', () => {
        expect(ok({ seed: { arrangement: 0, structure: 17 } }).seed.structure).toBe(17);
        expect(errors({ seed: { arrangement: 18 } })).toEqual(['seed.arrangement: must be an integer in [0, 17]']);
        expect(errors({ seed: { detail: 2.5 } })).toEqual(['seed.detail: must be an integer in [0, 17]']);
        expect(errors({ seed: { structure: -1 } })).toEqual(['seed.structure: must be an integer in [0, 17]']);
    });

    it('requires controls in [0, 1], ends included', () => {
        expect(ok({ controls: { hue: 0, flow: 1 } }).controls.flow).toBe(1);
        expect(errors({ controls: { hue: 1.01 } })).toEqual(['controls.hue: must be a number in [0, 1]']);
    });

    it.each([NaN, Infinity, -Infinity, '0.5', null, true])('rejects non-finite or non-number value %j', (value) => {
        expect(errors({ controls: { bloom: value } })).toEqual(['controls.bloom: must be a number in [0, 1]']);
    });

    it('checks camera ranges, ends included', () => {
        expect(ok({ camera: { zoom: -100, rotation: 180, elevation: -90 } }).camera.zoom).toBe(-100);
        expect(ok({ camera: { zoom: 100, rotation: -180, elevation: 90 } }).camera.zoom).toBe(100);
        expect(errors({ camera: { zoom: 100.5, rotation: 181, elevation: -91 } })).toEqual([
            'camera.zoom: must be a number in [-100, 100]',
            'camera.rotation: must be a number in [-180, 180]',
            'camera.elevation: must be a number in [-90, 90]',
        ]);
    });
});

describe('size', () => {
    it('requires an integer height in [1, 4096]', () => {
        expect(ok({ aspect: '1:1', height: 4096 }).height).toBe(4096);
        expect(errors({ height: 0 })).toEqual(['height: must be an integer in [1, 4096]']);
        expect(errors({ height: 100.5 })).toEqual(['height: must be an integer in [1, 4096]']);
    });

    it('rejects a height whose width would exceed 4096', () => {
        expect(errors({ height: 4096 })).toEqual([
            'height: gives a width of 6302 at aspect 20:13; width must be in [1, 4096]',
        ]);
        expect(ok({ aspect: '16:9', height: 2304 }).height).toBe(2304); // exactly 4096 wide
        expect(errors({ aspect: '16:9', height: 2305 })).toHaveLength(1);
    });

    it('allows a tall portrait height', () => {
        expect(ok({ aspect: '9:16', height: 4096 }).height).toBe(4096);
    });

    it('reports the width only once the other fields are valid', () => {
        expect(errors({ height: 4096, locale: 'de' })).toEqual(['locale: must be one of en, es, fr, it, zh, ru']);
    });
});

describe('stillWidth', () => {
    it.each([
        ['20:13', 1040, 1600],
        ['16:9', 1080, 1920],
        ['3:2', 1000, 1500],
        ['4:3', 768, 1024],
        ['1:1', 512, 512],
        ['3:4', 1024, 768],
        ['2:3', 1500, 1000],
        ['9:16', 1920, 1080],
        ['13:20', 1600, 1040],
    ] as const)('%s at height %i is %i wide', (aspect, height, width) => {
        expect(stillWidth(height, aspect)).toBe(width);
    });

    it('rounds to the nearest pixel and never returns 0 for small heights', () => {
        expect(stillWidth(1080, '20:13')).toBe(1662); // 1661.54
        expect(stillWidth(1, '9:16')).toBe(1); // 0.5625
    });
});
