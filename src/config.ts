/**
 * Config models — the public input contract for rendering.
 *
 * Types only. Numeric ranges can't be expressed in TypeScript types,
 * so they're documented here and enforced by validation.
 */

// ──────────────────────────────────────
// Locale
// ──────────────────────────────────────

/** Supported languages for generated text (title, alt text, seed labels). */
export const LOCALES = ['en', 'es'] as const;

export type Locale = (typeof LOCALES)[number];

// ──────────────────────────────────────
// Aspect
// ──────────────────────────────────────

/**
 * Supported image shapes, as width:height. Changes the framing, not the scene.
 */
export const ASPECTS = ['20:13', '16:9', '3:2', '4:3', '1:1', '3:4', '2:3', '9:16', '13:20'] as const;

export type Aspect = (typeof ASPECTS)[number];

// ──────────────────────────────────────
// Seed
// ──────────────────────────────────────

/**
 * Selects the scene's random structure. Each field is an integer in [0, 17]
 * and drives an independent random stream, so changing one only affects
 * its own subsystem.
 */
export interface SeedConfig {
    arrangement: number;
    structure: number;
    detail: number;
}

export type SeedConfigInput = Partial<SeedConfig>;

// ──────────────────────────────────────
// Controls
// ──────────────────────────────────────

/** User-facing sliders. Every value is in [0, 1]; the default is 0.5. */
export interface StillControlsConfig {
    // Color
    /** Dominant hue around the color wheel (hue × 360°): 0.06 amber, 0.51 teal, 0.78 violet. */
    hue: number;
    /** Hue variation around the dominant hue: 0 = near-monochrome, 1 = full prismatic. */
    spectrum: number;
    /** Color saturation, including fog tint: 0 = near-grayscale, 1 = fully vivid. */
    chroma: number;

    // Geometry
    /** Number of elements: 0 = sparse (~100), 1 = dense (1000+). */
    density: number;
    /** Scatter and fragmentation: 0 = compact and whole, 1 = scattered shards. */
    fracture: number;
    /** Size balance between tiers at fixed density: 0 = few large forms, 1 = many fine particles. */
    scale: number;
    /** Large-scale form: 0 = single lobe, 0.5 = two lobes, 1 = three lobes. */
    division: number;
    /** Shard character: 0 = broad flat panels, 1 = sharp angular triangles. */
    faceting: number;

    // Light
    /** Overall brightness and glow: 0 = dim and saturated, 1 = bright and radiant. */
    luminosity: number;
    /** How far light spreads from its sources: 0 = tight pools, 1 = diffuse halos. */
    bloom: number;

    // Space
    /** How strongly elements align to the flow field: 0 = random orientation, 1 = strong alignment. */
    coherence: number;
    /** Flow field pattern: 0 = radial starburst, 0.5 = noise, 1 = orbital bands. */
    flow: number;
}

/** Controls as supplied by a caller; missing values fall back to defaults. */
export type StillControlsConfigInput = Partial<StillControlsConfig>;

// ──────────────────────────────────────
// Camera
// ──────────────────────────────────────

export interface StillCameraConfig {
    /** Zoom in or out amount, [-100, 100]: -100 = far, 100 = close. Default 0. */
    zoom: number;
    /** Degrees around the vertical axis, [-180, 180]. Default 0. */
    rotation: number;
    /** Degrees above (+) or below (-) the horizon, [-90, 90]. Default 0. */
    elevation: number;
}

export type StillCameraConfigInput = Partial<StillCameraConfig>;

// ──────────────────────────────────────
// Render config
// ──────────────────────────────────────

/** Everything that determines a rendered still: the image and its generated text. */
export interface RenderStillConfig {
    /** Config format version. Bump when the meaning of any field changes. */
    version: 1;
    /** Language for generated text. Does not affect the image. */
    locale: Locale;
    /** Image shape, width:height. Does not change the scene, only how much of it is framed. */
    aspect: Aspect;
    /**
     * Image height in pixels, an integer in [1, 4096]. Default 1040.
     * Width follows from aspect, rounded, and must also be in [1, 4096].
     */
    height: number;
    seed: SeedConfig;
    controls: StillControlsConfig;
    camera: StillCameraConfig;
}

/** A render config as supplied by a caller; every field is optional and falls back to defaults. */
export interface RenderStillConfigInput {
    version?: 1;
    locale?: Locale;
    aspect?: Aspect;
    height?: number;
    seed?: SeedConfigInput;
    controls?: StillControlsConfigInput;
    camera?: StillCameraConfigInput;
}
