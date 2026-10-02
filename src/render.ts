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
 * validated, so plain JS callers get the same checks as typed ones.
 *
 * Runs in a browser, on the main thread or in a worker, and needs WebGL2.
 * Rejects with an Error whose message starts with:
 * - "Invalid render config:" listing every problem, checked first.
 * - "WebGL2 unavailable:" when there's no canvas (e.g. Node.js) or the browser can't create a WebGL2 context.
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
