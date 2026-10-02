/**
 * The shape of one language's text: phrase banks, word lists, punctuation,
 * and the templates that assemble them. Each language lives in ./locales/.
 *
 * How the long description is assembled (P = punctuation):
 *
 *   scene.luminosity + scene.bloom + P.period
 *   P.space  geometry.form + geometry.faceting + P.period
 *   P.space  geometry.spatial + geometry.division
 *   P.space  color.phrase  P.space  color.lightPoints
 *   P.space  coda.arrangement + coda.structure + (coda.inflection | coda.bridge) + P.space + coda.detail
 *
 * so each bank's entries must fit that frame: clause banks (scene.bloom,
 * geometry.faceting, coda.structure) start with a comma, bridges and
 * inflections end the previous sentence and open the next, and the detail
 * sentence's first letter is lowercased to follow the bridge.
 *
 * Placeholders: {color} / {Color} (hue word, lowercase / capitalized),
 * {N} (light point count), and {N|one|few|many} (count + the plural form
 * Intl.PluralRules picks, for languages whose words change with the number).
 *
 * The level counts are fixed by the tuple types below, because the level
 * picked depends on the control value; synonym counts per level may differ.
 */

/** Interchangeable phrasings; one is picked at random. */
export type Synonyms = readonly string[];

type Tuple<T, N extends number, R extends readonly T[] = []> =
    R['length'] extends N ? R : Tuple<T, N, readonly [T, ...R]>;

/** `N` graded levels, low to high, each with its synonyms. */
export type Levels<N extends number> = Tuple<Synonyms, N>;

/** Title words bucketed by control value. */
export type Tiers = Readonly<Record<'low' | 'mid' | 'high', Synonyms>>;

export type InflectionKey =
    | 'darkBloom' | 'darkJewel' | 'chaosStorm' | 'sparseOrder' | 'vividMono' | 'denseChaos'
    | 'coherenceHigh' | 'coherenceLow' | 'luminosityLow' | 'bloomHigh' | 'densityHigh';

/** Word pickers handed to a title template; each call draws from the title RNG. */
export interface TitleWords {
    luminosity(): string;
    density(): string;
    scale(): string;
    hue(): string;
}

/** The picked pieces of the short description. */
export interface SummaryParts {
    nodeCount: number;
    density: string;
    faceting: string;
    scale: string;
    arrangement: string;
    bloom: string;
    /** Hue word (lowercase), or null when the image is achromatic. */
    hue: string | null;
}

export interface LocaleText {
    punctuation: {
        /** Ends a sentence: '.' or '。'. */
        period: string;
        /** Between sentences and before the detail clause: ' ', or '' for Chinese. */
        space: string;
    };

    /** Hue words by hue angle: the first entry whose `max` (degrees) exceeds the hue. */
    hues: readonly { max: number; words: Synonyms }[];

    title: {
        luminosity: Tiers;
        density: Tiers;
        scale: Tiers;
        /** One is picked at random; word pickers draw in call order. */
        templates: readonly ((w: TitleWords) => string)[];
    };

    summary: {
        /** sparse → dense */
        density: Levels<5>;
        /** smooth → sharp */
        faceting: Levels<5>;
        /** large slabs → fine particles (a noun) */
        scale: Levels<5>;
        /** coherence (chaotic, loose, structured) × flow (radial, organic, orbital); a verb phrase */
        arrangement: Levels<9>;
        /** tight → atmospheric light */
        bloom: Levels<5>;
        /**
         * Assemble the sentence; keep the count near the front so truncation spares it.
         * May use {N|one|few|many} instead of p.nodeCount where the words change with the number.
         */
        compose(parts: SummaryParts): string;
    };

    scene: {
        /** near-black, dark, dim, moderate-low, moderate-high, bright, blazing (main clause) */
        luminosity: Levels<7>;
        /** tight → atmospheric (a clause starting with a comma) */
        bloom: Levels<7>;
    };

    geometry: {
        /** density (sparse, low, moderate, high, dense) × fracture (compact, moderate, shattered) */
        form: Levels<15>;
        /** smooth → razor-sharp (a clause starting with a comma) */
        faceting: Levels<5>;
        /** coherence × flow, as in summary.arrangement (full sentences) */
        spatial: Levels<9>;
        /** single core, none (mid: empty strings), three lobes (sentences with a leading space) */
        division: Levels<3>;
    };

    color: {
        /** chroma (achromatic, muted, vivid) × spectrum (mono, ranged, prismatic); may use {color} / {Color} */
        phrase: Levels<9>;
        /** tight → atmospheric light; uses {N} or {N|…} */
        lightPoints: Levels<5>;
    };

    coda: {
        /** mineral, architectural, sanctuary, organic, aquatic, mechanical, storm, explosion, cosmic */
        arrangement: Levels<9>;
        /** silken, folded, woven, creased, faceted, carved, shattered, crystalline, jagged (comma clause) */
        structure: Levels<9>;
        /** earth / life / cosmos × cold / neutral / hot: closes a sentence and opens the next */
        bridge: Levels<9>;
        /** frozen, cool, misty, neutral, warm, bright, radiant, molten, burning (first letter lowercased) */
        detail: Levels<9>;
        /** Replaces the bridge when a control is extreme (same shape as a bridge). */
        inflection: Readonly<Record<InflectionKey, Synonyms>>;
    };
}
