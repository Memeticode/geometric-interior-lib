import { describe, expect, it } from 'vitest';
import * as api from '../../src/index.js';

describe('public API', () => {
    it('exports exactly the three functions (types are erased at runtime)', () => {
        expect(Object.keys(api).sort()).toEqual(['parseRenderStillConfig', 'randomRenderStillConfig', 'renderStill']);
    });
});

describe('renderStill outside a browser', () => {
    it('rejects with a WebGL2 error, since Node.js has no canvas', async () => {
        await expect(api.renderStill()).rejects.toThrow(/^WebGL2 unavailable: .*cannot run in Node\.js/);
    });

    it('reports an invalid config before checking the environment', async () => {
        await expect(api.renderStill({ height: 0 })).rejects.toThrow(
            'Invalid render config:\n- height: must be an integer in [1, 4096]',
        );
    });

    it('validates plain JS input that bypasses the types', async () => {
        const untyped = { controls: { hue: 'red' } } as unknown as Parameters<typeof api.renderStill>[0];
        await expect(api.renderStill(untyped)).rejects.toThrow(/controls\.hue: must be a number/);
    });
});
