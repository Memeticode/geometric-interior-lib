/**
 * Seed → independent random streams for the scene builder.
 *
 * Each seed field gets its own prefixed hash, so changing one field only
 * re-randomizes its own subsystem. The hash strings match the original app,
 * so a given seed builds the same scene.
 */

import type { SeedConfig } from '../config.js';
import { xmur3, mulberry32 } from './utils/prng.js';

export interface SceneRngStreams {
    arrangementRng: () => number;
    structureRng: () => number;
    detailRng: () => number;
    arrangementBias: number;
    structureBias: number;
    detailBias: number;
}

/** Highest seed field value (seeds are integers in [0, 17]). */
const SEED_MAX = 17;

/** Map a seed field to a bias in [0, 1]. */
function seedBias(value: number): number {
    return value / SEED_MAX;
}

export function createSceneStreams(seed: SeedConfig): SceneRngStreams {
    return {
        arrangementRng: mulberry32(xmur3('arr-' + seed.arrangement)()),
        structureRng:   mulberry32(xmur3('str-' + seed.structure)()),
        detailRng:      mulberry32(xmur3('det-' + seed.detail)()),
        arrangementBias: seedBias(seed.arrangement),
        structureBias:   seedBias(seed.structure),
        detailBias:      seedBias(seed.detail),
    };
}
