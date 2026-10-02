/**
 * Rendering a still: config in, PNG image and generated text out.
 */

import type { RenderStillConfigInput } from './config.js';
import { parseRenderStillConfig } from './parse.js';
import type { RenderStillResult } from './result.js';

/**
 * Render a still image and its title and alt text.
 *
 * Every field is optional and falls back to defaults. The config is always
 * validated, so plain JS callers get the same checks as typed ones;
 * an invalid config rejects with an Error listing every problem.
 */
export async function renderStill(config: RenderStillConfigInput = {}): Promise<RenderStillResult> {
    const parsed = parseRenderStillConfig(config);
    if (!parsed.ok) {
        throw new Error(`Invalid render config:\n- ${parsed.errors.join('\n- ')}`);
    }

    // TODO: build the scene, render at stillWidth(height, aspect) × height,
    // encode as PNG, and generate the title and alt text in config.locale.
    throw new Error('renderStill: not implemented yet');
}
