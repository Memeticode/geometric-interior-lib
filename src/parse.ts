/**
 * Runtime validation for configs from untrusted sources (JSON, URLs, plain JS callers).
 *
 * Strict: out-of-range values and unknown keys are rejected rather than
 * clamped or ignored, so mistakes surface instead of silently changing the image.
 */

import { LOCALES } from './config.js';
import type {
    Locale,
    RenderStillConfig,
    RenderStillConfigInput,
    SeedConfig,
    StillCameraConfig,
    StillControlsConfig,
} from './config.js';
import { CONFIG_VERSION, resolveRenderStillConfig } from './defaults.js';

export type ParseResult<T> =
    | { ok: true; config: T }
    | { ok: false; errors: string[] };

// ──────────────────────────────────────
// Field specs
// ──────────────────────────────────────

interface NumberSpec {
    min: number;
    max: number;
    integer?: boolean;
}

// Typed as Record<keyof X, ...> so adding a field to a config interface
// is a compile error here until it gets a spec.

const SEED_SPEC: Record<keyof SeedConfig, NumberSpec> = {
    arrangement: { min: 0, max: 17, integer: true },
    structure: { min: 0, max: 17, integer: true },
    detail: { min: 0, max: 17, integer: true },
};

const UNIT: NumberSpec = { min: 0, max: 1 };

const STILL_CONTROLS_SPEC: Record<keyof StillControlsConfig, NumberSpec> = {
    hue: UNIT,
    spectrum: UNIT,
    chroma: UNIT,
    density: UNIT,
    fracture: UNIT,
    scale: UNIT,
    division: UNIT,
    faceting: UNIT,
    luminosity: UNIT,
    bloom: UNIT,
    coherence: UNIT,
    flow: UNIT,
};

const STILL_CAMERA_SPEC: Record<keyof StillCameraConfig, NumberSpec> = {
    zoom: UNIT,
    rotation: { min: -180, max: 180 },
    elevation: { min: -90, max: 90 },
};

const TOP_LEVEL_KEYS: readonly (keyof RenderStillConfigInput)[] =
    ['version', 'locale', 'seed', 'controls', 'camera'];

// ──────────────────────────────────────
// Public API
// ──────────────────────────────────────

/**
 * Validate untrusted data and fill in defaults.
 * Every field is optional; whatever is present must be valid.
 */
export function parseRenderStillConfig(data: unknown): ParseResult<RenderStillConfig> {
    const errors: string[] = [];

    if (!isPlainObject(data)) {
        return { ok: false, errors: ['config: must be an object'] };
    }

    checkUnknownKeys(data, TOP_LEVEL_KEYS, '', errors);

    if (data.version !== undefined && data.version !== CONFIG_VERSION) {
        errors.push(`version: must be ${CONFIG_VERSION}`);
    }
    if (data.locale !== undefined && !isLocale(data.locale)) {
        errors.push(`locale: must be one of ${LOCALES.join(', ')}`);
    }
    checkSection(data.seed, 'seed', SEED_SPEC, errors);
    checkSection(data.controls, 'controls', STILL_CONTROLS_SPEC, errors);
    checkSection(data.camera, 'camera', STILL_CAMERA_SPEC, errors);

    if (errors.length > 0) return { ok: false, errors };
    return { ok: true, config: resolveRenderStillConfig(data as RenderStillConfigInput) };
}

// ──────────────────────────────────────
// Helpers
// ──────────────────────────────────────

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isLocale(value: unknown): value is Locale {
    return (LOCALES as readonly unknown[]).includes(value);
}

function checkUnknownKeys(
    obj: Record<string, unknown>,
    allowed: readonly string[],
    path: string,
    errors: string[],
): void {
    for (const key of Object.keys(obj)) {
        if (!allowed.includes(key)) errors.push(`${path}${key}: unknown field`);
    }
}

/** Check an optional object whose fields are all optional numbers. */
function checkSection(
    value: unknown,
    path: string,
    spec: Record<string, NumberSpec>,
    errors: string[],
): void {
    if (value === undefined) return;
    if (!isPlainObject(value)) {
        errors.push(`${path}: must be an object`);
        return;
    }
    checkUnknownKeys(value, Object.keys(spec), `${path}.`, errors);
    for (const [key, { min, max, integer }] of Object.entries(spec)) {
        const v = value[key];
        if (v === undefined) continue;
        const kind = integer ? 'an integer' : 'a number';
        const ok = typeof v === 'number'
            && Number.isFinite(v)
            && (!integer || Number.isInteger(v))
            && v >= min && v <= max;
        if (!ok) errors.push(`${path}.${key}: must be ${kind} in [${min}, ${max}]`);
    }
}
