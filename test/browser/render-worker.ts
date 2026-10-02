/** Test helper: runs renderStill inside a Web Worker and posts back the outcome. */
import { renderStill } from '../../src/index.js';

self.onmessage = async (event: MessageEvent) => {
    try {
        const result = await renderStill(event.data);
        postMessage({ ok: true, result });
    } catch (err) {
        postMessage({ ok: false, error: String(err) });
    }
};
