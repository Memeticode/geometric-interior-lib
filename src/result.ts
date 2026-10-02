/**
 * Result models — what rendering a still returns.
 *
 * Types only.
 */

import type { RenderStillConfig } from './config.js';

/** A rendered still and its generated text. */
export interface RenderStillResult {
    /** The image, as a PNG. */
    image: Blob;
    /** Image size in pixels. Width is config.height × config.aspect, rounded. */
    width: number;
    height: number;
    /** Title, in config.locale. */
    title: string;
    /** Alt text describing the image, in config.locale. */
    altText: string;
    /** The fully resolved config. Store this to reproduce the image exactly. */
    config: RenderStillConfig;
}
