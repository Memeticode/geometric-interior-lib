/**
 * Rendering a still: config in, PNG image and generated text out.
 */

import type { RenderStillConfigInput } from './config.js';
import { renderImage } from './engine/renderer.js';
import { generateDescriptions } from './engine/text/descriptions.js';
import { generateTitle } from './engine/text/title.js';
import { parseRenderStillConfig, stillWidth } from './parse.js';
import type { RenderStillResult } from './result.js';

/**
 * Render a still image, with its title and short and long descriptions.
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

    const resolved = parsed.config;
    const width = stillWidth(resolved.height, resolved.aspect);

    const { image, nodeCount } = await renderImage(resolved, width);
    const descriptions = generateDescriptions(resolved.controls, nodeCount, resolved.seed, resolved.locale);

    return {
        image,
        width,
        height: resolved.height,
        title: generateTitle(resolved.controls, resolved.seed, resolved.locale),
        shortDescription: descriptions.short,
        longDescription: descriptions.long,
        config: resolved,
    };
}
