/**
 * English text. See ../locale-text.ts for how the pieces are assembled.
 */

import type { LocaleText } from '../locale-text.js';

export const en: LocaleText = {
    punctuation: { period: '.', space: ' ' },

    hues: [
        { max: 30, words: ['Ruby', 'Crimson', 'Carmine', 'Scarlet'] },
        { max: 60, words: ['Amber', 'Golden', 'Saffron', 'Topaz'] },
        { max: 90, words: ['Chartreuse', 'Citrine', 'Peridot', 'Lime'] },
        { max: 150, words: ['Emerald', 'Jade', 'Viridian', 'Malachite'] },
        { max: 210, words: ['Cerulean', 'Teal', 'Aquamarine', 'Marine'] },
        { max: 270, words: ['Cobalt', 'Indigo', 'Lapis', 'Sapphire'] },
        { max: 330, words: ['Amethyst', 'Plum', 'Orchid', 'Mauve'] },
        { max: 361, words: ['Ruby', 'Crimson', 'Carmine', 'Scarlet'] },
    ],

    title: {
        luminosity: {
            low: ['Dark', 'Subdued', 'Dim', 'Shadowed'],
            mid: ['Glowing', 'Steady', 'Warm', 'Tempered'],
            high: ['Luminous', 'Radiant', 'Incandescent', 'Blazing'],
        },
        density: {
            low: ['Sparse', 'Minimal', 'Distilled', 'Essential'],
            mid: ['Balanced', 'Structured', 'Composed', 'Measured'],
            high: ['Dense', 'Layered', 'Complex', 'Saturated'],
        },
        scale: {
            low: ['Monumental', 'Grand', 'Sweeping', 'Expansive'],
            mid: ['Spatial', 'Dimensional', 'Layered', 'Tempered'],
            high: ['Atmospheric', 'Particulate', 'Granular', 'Scattered'],
        },
        templates: [
            w => `${w.luminosity()} ${w.hue()} ${w.scale()}`,
            w => `${w.luminosity()} ${w.density()} Interior`,
            w => `${w.hue()} ${w.density()} Field`,
            w => `${w.scale()} ${w.luminosity()} Geometry`,
            w => `${w.luminosity()} ${w.hue()} Manifold`,
            w => `${w.density()} ${w.scale()} Plane`,
            w => `${w.hue()} ${w.luminosity()} Structure`,
            w => `${w.scale()} ${w.hue()} Lattice`,
        ],
    },

    summary: {
        density: [
            /* sparse */ ['sparse', 'isolated'],
            /* scattered */ ['scattered', 'few'],
            /* moderate */ ['moderate', 'measured'],
            /* layered */ ['layered', 'overlapping'],
            /* dense */ ['dense', 'concentrated'],
        ],
        faceting: [
            /* smooth */ ['smooth', 'flowing'],
            /* broad */ ['broad', 'soft-edged'],
            /* mixed */ ['translucent', 'mixed'],
            /* faceted */ ['faceted', 'crystalline'],
            /* sharp */ ['angular', 'sharp'],
        ],
        scale: [
            /* slabs */ ['slabs', 'panels'],
            /* planes */ ['planes', 'plates'],
            /* forms */ ['forms', 'planes'],
            /* fragments */ ['fragments', 'shards'],
            /* particles */ ['particles', 'points'],
        ],
        arrangement: [
            /* chaotic-radial */ ['drift freely', 'scatter without order'],
            /* chaotic-organic */ ['disperse in every direction', 'scatter chaotically'],
            /* chaotic-orbital */ ['tumble in disorder', 'scatter turbulently'],
            /* loose-radial */ ['radiate loosely', 'spread from center'],
            /* loose-organic */ ['drift in organic paths', 'flow loosely'],
            /* loose-orbital */ ['spiral gently', 'orbit loosely'],
            /* structured-radial */ ['emanate radially', 'radiate from center'],
            /* structured-organic */ ['follow a coherent flow', 'stream in formation'],
            /* structured-orbital */ ['orbit in arcs', 'wrap in orbital bands'],
        ],
        bloom: [
            /* tight */ ['with concentrated light', 'with precise light'],
            /* contained */ ['with contained glow', 'with tight radiance'],
            /* soft */ ['with soft halos', 'with gentle glow'],
            /* spreading */ ['with spreading light', 'with luminous halos'],
            /* atmospheric */ ['in diffuse atmospheric glow', 'in radiant haze'],
        ],
        compose: p => `${p.nodeCount} luminous points anchor ${p.density} ${p.faceting} ${p.hue ?? 'achromatic'} geometric ${p.scale} that ${p.arrangement} against darkness, ${p.bloom}.`,
    },

    scene: {
        luminosity: [
            // near-black
            [
                'Against near-total darkness, the faintest geometric traces resolve at the threshold of visibility',
                'From impenetrable blackness, forms surface carrying barely perceptible light',
                'In the deepest darkness, structures exist as little more than the idea of geometry',
            ],
            // dark
            [
                'Deep darkness holds these geometric forms, each surface a quiet assertion against the void',
                'From profound shadow, shapes emerge carrying their own faint interior light',
                'Geometric structures surface from deep shadow, their edges the only evidence of dimension',
            ],
            // dim
            [
                'A dim interior suspends these forms in quiet twilight, surfaces catching residual light',
                'Subdued illumination reveals geometry in tonal whispers rather than declarations',
                'In low ambient light, the geometric planes become visible through gentle self-luminescence',
            ],
            // moderate-low
            [
                'Soft contemplative light reveals the geometry of this interior space',
                'A gently lit field holds these geometric planes in readable suspension',
                'Moderate illumination fills the space, geometry neither hidden nor fully exposed',
            ],
            // moderate-high
            [
                'Steady luminosity defines every geometric surface with quiet clarity',
                'Clear light fills the space, translucent planes revealing their full structural character',
                'The geometric forms inhabit a well-lit interior, every edge and surface articulated',
            ],
            // bright
            [
                'Bright light radiates from and through every geometric surface with energetic presence',
                'Luminous intensity illuminates the structure from within, surfaces alive with radiance',
                'The forms glow with substantial internal energy, light pressing outward through every plane',
            ],
            // blazing
            [
                'Intense, almost overwhelming radiance floods every surface of this geometric interior',
                'Maximum luminous energy saturates the field, geometry blazing at the edge of dissolution',
                'Brilliant intensity engulfs the structure, each plane a source of concentrated radiant power',
            ],
        ],
        bloom: [
            // tight
            [
                ', each point of light sharply defined and precisely contained',
                ', illumination held in tight architectural precision at every edge',
                ', concentrated radiance with no atmospheric spread',
            ],
            // 1
            [
                ', light pooling closely around each surface with contained radiance',
                ', faint halos barely visible at the brightest edges',
            ],
            // 2
            [
                ', modest halos extending from the brightest points',
                ', a subtle glow surrounding the most luminous surfaces',
            ],
            // moderate
            [
                ', visible halos framing each geometric surface',
                ', soft aureoles marking the boundary between form and void',
                ', light extending noticeably beyond every edge',
            ],
            // 4
            [
                ', gentle light emanating well beyond each surface into surrounding darkness',
                ', the glow of each plane reaching into the space around it',
            ],
            // 5
            [
                ', spreading aureoles of light merging between adjacent surfaces',
                ', atmospheric radiance softening every geometric boundary',
            ],
            // atmospheric
            [
                ', the geometry floating in its own luminous atmosphere where boundaries dissolve',
                ', diffuse atmospheric glow filling the space until forms and light become inseparable',
                ', all-engulfing radiance in which geometry and emanation merge into continuous field',
            ],
        ],
    },

    geometry: {
        form: [
            // sparse-compact
            [
                'A few bold geometric planes hold together in close crystalline formation',
                'Only a handful of translucent surfaces cluster tightly, each individually legible',
            ],
            // sparse-moderate
            [
                'Sparse translucent planes are placed deliberately with moderate separation between them',
                'A small number of geometric forms drift apart at readable distances',
            ],
            // sparse-shattered
            [
                'Isolated geometric shards scatter across vast dark space, each a solitary presence',
                'A few fragments disperse widely, separated by expanses of emptiness',
            ],
            // low-compact
            [
                'A modest collection of translucent planes fold compactly over one another',
                'Several geometric surfaces layer in close proximity, maintaining structural cohesion',
            ],
            // low-moderate
            [
                'A small arrangement of translucent planes spreads with comfortable separation',
                'Geometric forms maintain gentle distance from one another in quiet dispersal',
            ],
            // low-shattered
            [
                'Scattered geometric fragments spread across the field in widening dispersal',
                'A handful of shattered forms fling outward from a remembered center',
            ],
            // moderate-compact
            [
                'A substantial collection of translucent planes accumulate in a compact crystalline mass',
                'Geometric surfaces layer and fold over one another in concentrated formation',
            ],
            // moderate-moderate
            [
                'Translucent planes overlap and drift apart in measured fragmentation',
                'A balanced arrangement of geometric forms occupies the space with moderate scatter',
            ],
            // moderate-shattered
            [
                'Geometric forms scatter outward in expanding dispersal, the space between them widening',
                'Translucent planes fragment and spread, structure dissolving into spatial distribution',
            ],
            // high-compact
            [
                'Many geometric surfaces crowd together in dense crystalline accumulation',
                'Thick layers of translucent planes pack tightly, surfaces almost merging',
            ],
            // high-moderate
            [
                'Many overlapping planes layer and fragment, the accumulation creating visual richness',
                'Dense geometry fills the field with translucent surfaces at varying distances',
            ],
            // high-shattered
            [
                'A multitude of geometric shards scatter explosively, filling the space with dispersed fragments',
                'Hundreds of translucent fragments spread in every direction in maximum dispersal',
            ],
            // dense-compact
            [
                'An immense concentration of geometric surfaces packs into a solid crystalline mass',
                'Countless translucent planes compress together so densely they approach opacity',
            ],
            // dense-moderate
            [
                'A vast population of geometric fragments fills the space, overlapping at every depth',
                'The field teems with translucent surfaces, each partially occluding those behind',
            ],
            // dense-shattered
            [
                'An overwhelming swarm of geometric shards explodes outward, each fragment a separate trajectory',
                'Hundreds upon hundreds of translucent particles scatter in every conceivable direction',
            ],
        ],
        faceting: [
            // smooth
            [
                ', their surfaces silk-smooth and continuously curved',
                ', with broad flowing panels and soft edges',
            ],
            // mostly smooth
            [
                ', surfaces mostly smooth with occasional angular interruptions',
                ', broad panels blending with subtle faceted accents',
            ],
            // mixed
            [
                ', surfaces mixing smooth panels and angular faces in equal measure',
                ', a blend of flowing curves and crystalline edges',
            ],
            // faceted
            [
                ', their faces sharply faceted with defined crystal character',
                ', angular surfaces catching light at distinct geometric angles',
            ],
            // razor-sharp
            [
                ', every surface a razor-sharp crystal face with maximum angular precision',
                ', bristling with tight angular geometry and hard crystalline edges',
            ],
        ],
        spatial: [
            // chaotic-radial
            [
                'The arrangement follows no legible order, fragments drifting without alignment.',
                'No organizing principle governs the dispersal — geometry scatters freely.',
            ],
            // chaotic-organic
            [
                'Geometric planes disperse in every direction without preferred orientation.',
                'The forms scatter with entropic freedom, each element finding its own trajectory.',
            ],
            // chaotic-orbital
            [
                'A turbulent storm of geometry overwhelms any orbital structure with disorder.',
                'Orbital currents barely register beneath the chaos of scattered elements.',
            ],
            // loose-radial
            [
                'The forms loosely radiate from the interior, a suggestion of starburst only partially followed.',
                'A relaxed radial tendency organizes the forms without insisting upon it.',
            ],
            // loose-organic
            [
                'Geometry organizes loosely around organic currents, structure present but unhurried.',
                'Gentle organic flow gives the arrangement a sense of direction without rigidity.',
            ],
            // loose-orbital
            [
                'Elements drift in loose orbital paths, gently spiraling without strict adherence.',
                'A soft spiraling tendency carries the forms in unhurried circular drift.',
            ],
            // structured-radial
            [
                'Ordered elements emanate radially, a starburst of planes diverging from the center.',
                'Precise radial symmetry governs the arrangement, every form aligned to the center.',
            ],
            // structured-organic
            [
                'The forms follow a coherent flowing pattern, creating visible directional structure.',
                'A legible organic current carries every element in the same purposeful direction.',
            ],
            // structured-orbital
            [
                'Orbital bands wrap around the form, arcs of geometry spiraling with architectural discipline.',
                'Concentric orbital paths carry the elements in disciplined spiraling formation.',
            ],
        ],
        division: [
            // single core
            [
                ' A single unified core anchors the entire composition.',
                ' All geometry converges toward one luminous center.',
            ],
            /* none */ ['', ''],
            // three lobes
            [
                ' Three luminous cores divide the form, each a separate gravitational center.',
                ' The structure splits into three distinct lobes of geometric activity.',
            ],
        ],
    },

    color: {
        phrase: [
            // achromatic-mono
            [
                'Pure achromatic structure in silver and white pervades the composition, geometry without chromatic identity.',
                'The forms carry no color — only gradations of luminous silver, pearl, and shadow.',
            ],
            // achromatic-ranged
            [
                'Nearly colorless geometry carries faint spectral shifts, ghost-like tones barely distinguishable from white.',
                'Subtle spectral traces haunt the achromatic surfaces, the barest whisper of prismatic color.',
            ],
            // achromatic-prismatic
            [
                'Faint rainbow ghosts inhabit achromatic forms, spectral traces emerging and dissolving against neutral geometry.',
                'Delicate prismatic refractions pass through otherwise colorless planes like light through ancient glass.',
            ],
            // muted-mono
            [
                'A hushed {color} tone pervades the composition, evoking aged surface more than emitted light.',
                'Quiet, desaturated {color} washes through every plane, suggesting patina rather than illumination.',
            ],
            // muted-ranged
            [
                'Muted {color} hues shift subtly across a narrow desaturated palette, suggesting memory more than presence.',
                'A restrained {color} spectrum moves quietly through the geometry, colors felt rather than seen.',
            ],
            // muted-prismatic
            [
                'Faded spectral tints wash through the geometry like light through old glass, muted and atmospheric.',
                'A desaturated rainbow drifts through the forms, every hue present but none asserting itself.',
            ],
            // vivid-mono
            [
                'Intense {color} saturates every surface with bold singular chromatic identity.',
                '{Color} dominates completely — a concentrated, unwavering chromatic statement across every plane.',
            ],
            // vivid-ranged
            [
                'Rich {color} dominates with vivid accents from adjacent hues adding chromatic depth and complexity.',
                'Saturated {color} anchors the palette while neighboring wavelengths introduce harmonic variation.',
            ],
            // vivid-prismatic
            [
                'Full prismatic color floods the geometry, every hue vivid and luminously present.',
                'The entire visible spectrum radiates through the forms, a prismatic explosion of saturated color.',
            ],
        ],
        lightPoints: [
            // tight
            [
                'Among the structure, {N} points of white light appear as precise luminous anchors, each sharply defined against the geometry.',
                '{N} concentrated points of light punctuate the composition like bright pins holding the structure in place.',
            ],
            // contained
            [
                '{N} points of light are scattered through the geometry, each surrounded by a small contained halo.',
                'Across the structure, {N} luminous points glow with restrained radiance, their light staying close.',
            ],
            // moderate
            [
                '{N} luminous points scatter amongst the geometry like stars in a constellation, their halos softly visible.',
                'Floating amongst the planes, {N} orbs of white light create a gentle stellar distribution.',
            ],
            // spreading
            [
                '{N} points of light radiate outward through the illuminated planes, their halos merging where they overlap.',
                '{N} luminous orbs scatter through the structure, each casting visible light into the surrounding geometry.',
            ],
            // atmospheric
            [
                '{N} points of white light diffuse broadly through the composition, each orb dissolving into atmospheric radiance.',
                '{N} luminous sources scatter like stars drawn together, their combined radiance creating a continuous field of light.',
            ],
        ],
    },

    coda: {
        arrangement: [
            // mineral
            [
                'The image evokes a mineral formation caught mid-crystallization',
                'The composition suggests a geode viewed from within',
                'The structure recalls a mineral cathedral, ancient and still',
            ],
            // architectural
            [
                'The image evokes an interior seen from within — a space that contains and is contained',
                'The composition suggests architecture suspended in thought',
                'The structure recalls a room made of light, walls dissolving into geometry',
            ],
            // sanctuary
            [
                'The image evokes a sanctuary built from pure geometry, a place of quiet intention',
                'The composition suggests a reliquary holding light instead of bone',
                'The structure recalls an altar of translucent planes, purpose without liturgy',
            ],
            // organic
            [
                'The image evokes a bioluminescent organism, alive in its own quiet way',
                'The composition suggests a living structure, growing and reorienting',
                'The structure recalls coral or mycelium, organic intelligence in geometric form',
            ],
            // aquatic
            [
                'The image evokes a current made visible, fluid dynamics frozen in crystal',
                'The composition suggests water crystallized at the moment of movement',
                'The structure recalls an ocean wave rendered in translucent geometry, perpetually about to break',
            ],
            // mechanical
            [
                'The image evokes a clockwork mechanism stripped to its essential geometry',
                'The composition suggests an engine of light, every arc a transfer of energy',
                'The structure recalls a gyroscope caught between forces, rotation held in suspension',
            ],
            // storm
            [
                'The image evokes a storm system rendered in geometric abstraction',
                'The composition suggests the eye of a turbulence, energy radiating outward',
                'The structure recalls lightning caught in crystal — energy seeking every possible path',
            ],
            // explosion
            [
                'The image evokes an explosion frozen at its most beautiful instant',
                'The composition suggests shrapnel that chose to become architecture',
                'The structure recalls a detonation rendered in stained glass, violence become stillness',
            ],
            // cosmic
            [
                'The image evokes a galaxy in miniature, gravitational forces rendered as geometric planes',
                'The composition suggests a supernova frozen at the instant of expansion',
                'The structure recalls the birth of a star, matter and energy still deciding what to become',
            ],
        ],
        structure: [
            /* silken */ [', its geometry woven from translucent silk', ', surfaces draped rather than constructed'],
            // folded
            [
                ', built from carefully folded planes of light',
                ', its layers stacked with quiet architectural purpose',
            ],
            // woven
            [
                ', its planes interlaced like warp and weft',
                ', geometry layered with the patience of sediment',
            ],
            // creased
            [
                ', its surfaces creased and pleated with angular precision',
                ', geometry folded along sharp deliberate lines',
            ],
            // faceted
            [
                ', carved from fractured crystal',
                ', its faces reflecting light at distinct geometric angles',
            ],
            // carved
            [
                ', hewn from solid light with chisel-sharp intention',
                ', its faces broken along fault lines of luminous force',
            ],
            // shattered
            [
                ', shattered into crystalline fragments that still hold formation',
                ', splintered into a constellation of crystalline debris',
            ],
            // crystalline
            [
                ', every edge a blade of crystallized radiance',
                ', its surfaces tessellated with mineral precision',
            ],
            // jagged
            [
                ', bristling with jagged edges like a structure forged in violence',
                ', every surface a serrated edge, geometry born from rupture',
            ],
        ],
        bridge: [
            /* earth × cold */ ['. Entombed in stillness,', '. Sealed beneath silence,'],
            /* earth × neutral */ ['. Resting in its own gravity,', '. Held in place by quiet mass,'],
            /* earth × hot */ ['. Lit from deep within the stone,', '. Heat rising through ancient mineral,'],
            /* life × cold */ ['. Dormant beneath frost,', '. Alive but suspended, waiting for thaw,'],
            /* life × neutral */ ['. Breathing in slow rhythm,', '. Growing at the pace of geology,'],
            /* life × hot */ ['. Flushed with biological urgency,', '. Alive with the heat of its own metabolism,'],
            // cosmos × cold
            [
                '. Drifting through the cold between stars,',
                '. Suspended in the vacuum of deep space,',
            ],
            /* cosmos × neutral */ ['. Turning in the silence of orbit,', '. Carried by forces older than light,'],
            // cosmos × hot
            [
                '. Burning at the heart of formation,',
                '. Ignited by the pressure of its own collapse,',
            ],
        ],
        detail: [
            // frozen
            [
                'It holds a perfect, glacial stillness — architecture that has never known motion.',
                'The scene carries the silence of deep ice, geometry preserved in absolute zero.',
            ],
            // cool
            [
                'A cool, contemplative quiet pervades the scene, as though observed through twilight.',
                'The atmosphere suggests dusk — the last light held in geometric suspension.',
            ],
            // misty
            [
                'The air itself seems to hold its breath, light arriving through distance and fog.',
                'A liminal haze softens every edge, the scene suspended between visibility and dream.',
            ],
            // neutral
            [
                'The mood is one of quiet equilibrium, neither warm nor cold, geometry at rest with itself.',
                'A measured, neutral calm holds the composition in thoughtful balance.',
            ],
            // warm
            [
                'Warmth radiates from within, the geometry alive with internal fire.',
                'The scene glows with the warmth of something that has been held close, light as tenderness.',
            ],
            // bright
            [
                'Light presses outward from every surface, the structure luminous with quiet conviction.',
                'The geometry carries its own daylight, bright without source, warm without heat.',
            ],
            // radiant
            [
                'Radiant energy pulses through the structure, each surface a conduit for concentrated brilliance.',
                'The geometry blazes with vivid intensity, structure transformed into pure luminous event.',
            ],
            // molten
            [
                'The structure burns with incandescent ferocity, geometry at the edge of its own transformation.',
                'Everything is molten — the forms carry the energy of their own becoming, light as origin.',
            ],
            // burning
            [
                'The scene has crossed beyond illumination into pure radiance, geometry as fire itself.',
                'Light has replaced matter entirely — what remains is the memory of structure, burning.',
            ],
        ],
        inflection: {
            darkBloom: ['. Glowing from within its own darkness like a deep-sea creature,', '. Light arriving not from outside but from somewhere inside the geometry,'],
            darkJewel: ['. Precious and contained, a jewel-box geometry visible only to those who look closely,', '. Geometry so dark it must be found rather than seen,'],
            chaosStorm: ['. Every fragment obeying its own trajectory, structure abandoned to the wind,', '. Order shattered past the point of recognition,'],
            sparseOrder: ['. Each element an island of intention in a sea of void,', '. So few forms, and yet each one placed with absolute certainty,'],
            vividMono: ['. Color so concentrated it becomes a material, not merely a quality,', '. A single hue raised to the intensity of conviction,'],
            denseChaos: ['. A debris field where pattern has been overwhelmed by sheer quantity,', '. So many fragments that chaos itself becomes a texture,'],
            coherenceHigh: ['. Every element obeys a single architectural will,', '. Structure governs every plane with crystalline authority,'],
            coherenceLow: ['. Entropy has claimed the arrangement, order a distant memory,', '. Chaos scatters every plane beyond the reach of pattern,'],
            luminosityLow: ['. Submerged in near-total darkness,', '. Visible only at the threshold of perception,'],
            bloomHigh: ['. Dissolving into its own atmosphere,', '. Light and form merging into continuous radiance,'],
            densityHigh: ['. Overwhelmed by its own abundance,', '. The sheer weight of accumulated geometry pressing inward,'],
        },
    },
};
