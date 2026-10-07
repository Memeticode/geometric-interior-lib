# @memeticode/geometric-interior

Generate abstract geometric still images from a small config: luminous translucent planes, light points, and glow, rendered with WebGL. Each image comes with a title and a short and long text description in one of six languages, written to describe that specific image (useful as alt text).

Rendering is deterministic: the same config gives the same image and text every time on the same browser and device.

See examples at: https://geometric-interior.org/

```sh
npm install @memeticode/geometric-interior
```

## Requirements

- **A browser with WebGL2**, on the main thread or in a Web Worker. It does not run in Node.js.
- ES modules. Use a bundler (Vite, esbuild, webpack, …) or a browser import map.

## Quick start

```js
import { renderStill } from '@memeticode/geometric-interior';

const still = await renderStill({
    locale: 'en',
    aspect: '16:9',
    height: 1080,
    seed: { arrangement: 4, structure: 11, detail: 7 },
    controls: { hue: 0.78, density: 0.6, bloom: 0.7 },
});

const img = document.createElement('img');
img.src = URL.createObjectURL(still.image);
img.width = still.width;   // 1920
img.height = still.height; // 1080
img.alt = still.shortDescription;
img.title = still.title;
document.body.append(img);
```

Every field is optional; `await renderStill()` renders the defaults (1600 × 1040).

## API

### `renderStill(config?): Promise<RenderStillResult>`

Validates the config, fills in defaults, renders the image, and generates its text.

```ts
interface RenderStillResult {
    image: Blob;              // PNG
    width: number;            // pixels
    height: number;           // pixels
    title: string;
    shortDescription: string; // one sentence, ≤ 140 characters
    longDescription: string;  // a paragraph (about 700–1200 characters; 200–300 in Chinese)
    config: RenderStillConfig; // the fully resolved config: store it to reproduce the image
}
```

It rejects with an `Error` whose message starts with:

- `Invalid render config:`, followed by every problem, one per line. Checked first.
- `WebGL2 unavailable:`, when there is no canvas (for example in Node.js), or the browser cannot create a WebGL2 context (unsupported, disabled, or blocked).

Each call creates its own WebGL context and releases it when done, so calls are independent and can run in a worker.

### `parseRenderStillConfig(data): ParseResult<RenderStillConfig>`

Validates untrusted input (JSON, URL parameters, form values) without rendering, and fills in defaults. Use it to show errors before calling `renderStill`.

```js
import { parseRenderStillConfig } from '@memeticode/geometric-interior';

const result = parseRenderStillConfig(JSON.parse(text));
if (result.ok) {
    console.log(result.config); // complete, with defaults filled in
} else {
    console.log(result.errors); // e.g. ['controls.hue: must be a number in [0, 1]']
}
```

Validation is strict: unknown fields and out-of-range values are errors, never silently clamped or ignored.

### `randomRenderStillConfig(fixed?, random?): RenderStillConfig`

Returns a complete config with a random seed, controls (rounded to two decimals), and camera (whole numbers). Pass it straight to `renderStill`, or store it to render the same image later.

```js
import { randomRenderStillConfig, renderStill } from '@memeticode/geometric-interior';

const config = randomRenderStillConfig();
const still = await renderStill(config);
```

- **`fixed`** keeps any fields you set, down to individual seed, control, and camera values. `locale`, `aspect`, and `height` are never randomized; they use your values or the defaults.

  ```js
  // A random French portrait image, but always violet.
  randomRenderStillConfig({ locale: 'fr', aspect: '3:4', controls: { hue: 0.78 } });

  // Random everything, but from the default viewpoint.
  randomRenderStillConfig({ camera: { zoom: 0, rotation: 0, elevation: 0 } });
  ```

- **`random`** is the random number source, returning numbers in [0, 1). It defaults to `Math.random`; pass a seeded generator for reproducible results. Fixing a field never changes the other random values.

It throws `Invalid render config:` if `fixed` is invalid. It doesn't render, so it also works in Node.js.

## Config

| Field | Type | Default | |
|---|---|---|---|
| `locale` | `'en'` `'es'` `'fr'` `'it'` `'zh'` `'ru'` | `'en'` | Language of the text. Does not affect the image. |
| `aspect` | see below | `'20:13'` | Image shape, width:height. Changes the framing, not the scene. |
| `height` | integer, 1–4096 | `1040` | Image height in pixels. Width is `height × aspect`, rounded, and must also be ≤ 4096. |
| `seed` | object | all `8` | The scene's random structure. See below. |
| `controls` | object | all `0.5` | Visual sliders. See below. |
| `camera` | object | all `0` | Viewpoint. See below. |
| `version` | `1` | `1` | Config format version. |

**Aspects:** `'20:13'` (the framing the scene was designed for), `'16:9'`, `'3:2'`, `'4:3'`, `'1:1'`, `'3:4'`, `'2:3'`, `'9:16'`, `'13:20'`.

**Languages:** English (`en`), Spanish (`es`), French (`fr`), Italian (`it`), Mandarin Chinese in Simplified characters (`zh`), Russian (`ru`).

### `seed`

Three integers, each 0–17. Each drives an independent random stream, so changing one leaves the others' parts of the scene unchanged.

| Field | Shapes |
|---|---|
| `arrangement` | Where elements are placed |
| `structure` | The shape of the folded planes |
| `detail` | Color variation and fine detail |

### `controls`

All numbers from 0 to 1.

| Control | 0 | 1 |
|---|---|---|
| `hue` | Dominant hue around the color wheel (hue × 360°) | |
| `spectrum` | Near-monochrome | Full prismatic range |
| `chroma` | Near-grayscale | Fully vivid |
| `density` | Sparse (~100 elements) | Dense (1000+) |
| `fracture` | Compact and whole | Scattered shards |
| `scale` | Few large forms | Many fine particles |
| `division` | One lobe (0.5 = two) | Three lobes |
| `faceting` | Broad flat panels | Sharp angular triangles |
| `luminosity` | Dim | Bright and radiant |
| `bloom` | Tight pools of light | Diffuse halos |
| `coherence` | Random orientation | Strongly aligned to the flow |
| `flow` | Radial starburst (0.5 = noise) | Orbital bands |

### `camera`

| Field | Range | |
|---|---|---|
| `zoom` | −100 to 100 | 0 is the default framing; 100 is 3× closer, −100 is 3× farther. |
| `rotation` | −180 to 180 | Degrees around the vertical axis. |
| `elevation` | −90 to 90 | Degrees above (+) or below (−) the horizon. 90 looks straight down. |

## TypeScript

Types are included. The input types (`RenderStillConfigInput` and the section types) make every field optional; the resolved types (`RenderStillConfig`, …) are what `parseRenderStillConfig` and `renderStill` return.

```ts
import type { RenderStillConfigInput, RenderStillResult, Locale, Aspect } from '@memeticode/geometric-interior';
```

## Versioning

This package follows [semver](https://semver.org). While it is 0.x, a minor version (0.2.0) may include breaking changes; patch versions will not.

## License

MIT
