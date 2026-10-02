/**
 * French text. See ../locale-text.ts for how the pieces are assembled.
 *
 * Agreement: summary nouns (summary.scale) are all feminine plural so the
 * adjectives can agree; title nouns are all masculine singular. Hue words are
 * nouns used as invariable colours ("couleur turquoise"). Bridges and
 * inflections are prepositional so they fit any following subject. The coda's
 * subjects (l’image, la composition, la structure) are all feminine.
 */

import type { LocaleText } from '../locale-text.js';

export const fr: LocaleText = {
    punctuation: { period: '.', space: ' ' },

    hues: [
        { max: 30, words: ['rubis', 'cramoisi', 'carmin', 'écarlate'] },
        { max: 60, words: ['ambre', 'or', 'safran', 'topaze'] },
        { max: 90, words: ['chartreuse', 'citrine', 'péridot', 'anis'] },
        { max: 150, words: ['émeraude', 'jade', 'malachite', 'céladon'] },
        { max: 210, words: ['turquoise', 'aigue-marine', 'sarcelle', 'azur'] },
        { max: 270, words: ['cobalt', 'indigo', 'lapis', 'saphir'] },
        { max: 330, words: ['améthyste', 'prune', 'orchidée', 'mauve'] },
        { max: 361, words: ['rubis', 'cramoisi', 'carmin', 'écarlate'] },
    ],

    title: {
        luminosity: {
            low: ['sombre', 'feutré', 'obscur', 'ombragé'],
            mid: ['rayonnant', 'serein', 'chaleureux', 'tempéré'],
            high: ['lumineux', 'radieux', 'incandescent', 'flamboyant'],
        },
        density: {
            low: ['épars', 'minimal', 'distillé', 'essentiel'],
            mid: ['équilibré', 'structuré', 'composé', 'mesuré'],
            high: ['dense', 'stratifié', 'complexe', 'saturé'],
        },
        scale: {
            low: ['monumental', 'grandiose', 'ample', 'vaste'],
            mid: ['spatial', 'dimensionnel', 'étagé', 'tempéré'],
            high: ['atmosphérique', 'particulaire', 'granuleux', 'dispersé'],
        },
        templates: [
            w => `Intérieur ${w.hue()} ${w.luminosity()}`,
            w => `Intérieur ${w.density()} et ${w.luminosity()}`,
            w => `Champ ${w.hue()} ${w.density()}`,
            w => `Volume ${w.scale()} et ${w.luminosity()}`,
            w => `Espace ${w.hue()} ${w.luminosity()}`,
            w => `Plan ${w.density()} et ${w.scale()}`,
            w => `Réseau ${w.hue()} ${w.scale()}`,
            w => `Prisme ${w.hue()} ${w.luminosity()}`,
        ],
    },

    summary: {
        density: [
            /* sparse */ ['éparses', 'isolées'],
            /* scattered */ ['clairsemées', 'dispersées'],
            /* moderate */ ['modérées', 'mesurées'],
            /* layered */ ['étagées', 'superposées'],
            /* dense */ ['denses', 'serrées'],
        ],
        faceting: [
            /* smooth */ ['lisses', 'fluides'],
            /* broad */ ['larges', 'aux bords doux'],
            /* mixed */ ['translucides', 'mixtes'],
            /* faceted */ ['facettées', 'cristallines'],
            /* sharp */ ['anguleuses', 'acérées'],
        ],
        scale: [
            /* slabs */ ['dalles', 'lames'],
            /* planes */ ['plaques', 'surfaces'],
            /* forms */ ['formes', 'facettes'],
            /* fragments */ ['brisures', 'esquilles'],
            /* particles */ ['particules', 'paillettes'],
        ],
        arrangement: [
            /* chaotic-radial */ ['dérivent librement', 'se dispersent sans ordre'],
            /* chaotic-organic */ ['se dispersent en tous sens', 's’éparpillent en désordre'],
            /* chaotic-orbital */ ['tourbillonnent en désordre', 'se dispersent en turbulence'],
            /* loose-radial */ ['rayonnent librement', 'partent du centre'],
            /* loose-organic */ ['suivent des voies organiques', 's’écoulent librement'],
            /* loose-orbital */ ['s’enroulent doucement', 'orbitent librement'],
            /* structured-radial */ ['émanent en rayons', 'rayonnent depuis le centre'],
            /* structured-organic */ ['suivent un flux cohérent', 's’écoulent en formation'],
            /* structured-orbital */ ['orbitent en arcs', 'orbitent en anneaux'],
        ],
        bloom: [
            /* tight */ ['dans une lumière concentrée', 'dans une lumière précise'],
            /* contained */ ['avec un éclat contenu', 'avec un rayonnement serré'],
            /* soft */ ['avec de doux halos', 'avec une lueur délicate'],
            /* spreading */ ['dans une lumière ample', 'avec des halos lumineux'],
            /* atmospheric */ ['dans une lueur diffuse', 'dans une brume rayonnante'],
        ],
        compose: p => `${p.nodeCount} lumières ancrent des ${p.scale} ${p.density} et ${p.faceting}, ${p.hue ? `couleur ${p.hue}` : 'sans couleur'}, qui ${p.arrangement}, ${p.bloom}.`,
    },

    scene: {
        luminosity: [
            // near-black
            [
                'Sur fond de ténèbres presque totales, les plus faibles traces géométriques apparaissent au seuil du visible',
                'De la noirceur impénétrable surgissent des formes porteuses d’une lumière à peine perceptible',
                'Dans l’obscurité la plus profonde, les structures ne sont guère plus que l’idée d’une géométrie',
            ],
            // dark
            [
                'Une obscurité profonde retient ces formes géométriques, chaque surface une affirmation silencieuse face au vide',
                'De l’ombre profonde émergent des formes porteuses de leur propre lumière intérieure, ténue',
                'Des structures géométriques remontent de l’ombre profonde, leurs arêtes seule preuve de leur dimension',
            ],
            // dim
            [
                'Un intérieur faiblement éclairé suspend ces formes dans un crépuscule tranquille, les surfaces captant une lumière résiduelle',
                'Une lumière tamisée révèle la géométrie par murmures de tons plutôt que par affirmations',
                'Sous une faible lumière ambiante, les plans géométriques deviennent visibles par une douce luminescence propre',
            ],
            // moderate-low
            [
                'Une lumière douce et contemplative révèle la géométrie de cet espace intérieur',
                'Un champ doucement éclairé tient ces plans géométriques en suspension lisible',
                'Un éclairage modéré emplit l’espace, la géométrie ni cachée ni entièrement exposée',
            ],
            // moderate-high
            [
                'Une luminosité constante définit chaque surface géométrique avec une clarté tranquille',
                'Une lumière claire emplit l’espace, les plans translucides révélant tout leur caractère structurel',
                'Les formes géométriques habitent un intérieur bien éclairé, chaque arête et chaque surface nettement articulées',
            ],
            // bright
            [
                'Une lumière vive rayonne depuis et à travers chaque surface géométrique avec une présence énergique',
                'Une intensité lumineuse éclaire la structure de l’intérieur, les surfaces vibrantes de rayonnement',
                'Les formes brillent d’une énergie intérieure considérable, la lumière poussant vers l’extérieur à travers chaque plan',
            ],
            // blazing
            [
                'Un rayonnement intense, presque écrasant, inonde chaque surface de cet intérieur géométrique',
                'Une énergie lumineuse maximale sature le champ, la géométrie flamboyant au bord de la dissolution',
                'Une intensité éclatante engloutit la structure, chaque plan source d’une puissance rayonnante concentrée',
            ],
        ],
        bloom: [
            // tight
            [
                ', chaque point de lumière nettement défini et précisément contenu',
                ', l’éclairage tenu avec une précision architecturale à chaque arête',
                ', un rayonnement concentré, sans diffusion atmosphérique',
            ],
            // 1
            [
                ', la lumière se rassemblant tout près de chaque surface en un rayonnement contenu',
                ', de faibles halos à peine visibles sur les arêtes les plus brillantes',
            ],
            /* 2 */ [', de modestes halos s’étendant depuis les points les plus brillants', ', une lueur subtile entourant les surfaces les plus lumineuses'],
            // moderate
            [
                ', des halos visibles encadrant chaque surface géométrique',
                ', de douces auréoles marquant la frontière entre la forme et le vide',
                ', la lumière débordant nettement de chaque arête',
            ],
            // 4
            [
                ', une lumière douce émanant bien au-delà de chaque surface vers l’obscurité environnante',
                ', la lueur de chaque plan gagnant l’espace qui l’entoure',
            ],
            // 5
            [
                ', des auréoles de lumière qui s’étendent et se fondent entre les surfaces voisines',
                ', un rayonnement atmosphérique adoucissant chaque frontière géométrique',
            ],
            // atmospheric
            [
                ', la géométrie flottant dans sa propre atmosphère lumineuse où les frontières se dissolvent',
                ', une lueur atmosphérique diffuse emplissant l’espace jusqu’à rendre formes et lumière inséparables',
                ', un rayonnement enveloppant où géométrie et émanation se fondent en un champ continu',
            ],
        ],
    },

    geometry: {
        form: [
            // sparse-compact
            [
                'Quelques plans géométriques audacieux se tiennent ensemble en une formation cristalline serrée',
                'Une poignée seulement de surfaces translucides se regroupent étroitement, chacune lisible individuellement',
            ],
            // sparse-moderate
            [
                'De rares plans translucides sont disposés avec soin, modérément espacés',
                'Un petit nombre de formes géométriques s’écartent à des distances lisibles',
            ],
            // sparse-shattered
            [
                'Des éclats géométriques isolés se dispersent dans un vaste espace sombre, chacun une présence solitaire',
                'Quelques fragments s’éparpillent largement, séparés par des étendues de vide',
            ],
            // low-compact
            [
                'Une modeste collection de plans translucides se replient de façon compacte les uns sur les autres',
                'Plusieurs surfaces géométriques se superposent de près, conservant leur cohésion structurelle',
            ],
            // low-moderate
            [
                'Un petit ensemble de plans translucides se déploie avec un espacement confortable',
                'Les formes géométriques gardent entre elles une douce distance, en une dispersion tranquille',
            ],
            // low-shattered
            [
                'Des fragments géométriques épars se répandent dans le champ en une dispersion croissante',
                'Une poignée de formes brisées sont projetées vers l’extérieur depuis un centre dont on garde la mémoire',
            ],
            // moderate-compact
            [
                'Un ensemble substantiel de plans translucides s’accumule en une masse cristalline compacte',
                'Des surfaces géométriques se superposent et se replient les unes sur les autres en une formation concentrée',
            ],
            // moderate-moderate
            [
                'Des plans translucides se chevauchent et s’écartent en une fragmentation mesurée',
                'Un agencement équilibré de formes géométriques occupe l’espace avec une dispersion modérée',
            ],
            // moderate-shattered
            [
                'Des formes géométriques se dispersent vers l’extérieur en une expansion croissante, l’espace entre elles s’élargissant',
                'Des plans translucides se fragmentent et se répandent, la structure se dissolvant en distribution spatiale',
            ],
            // high-compact
            [
                'De nombreuses surfaces géométriques se pressent les unes contre les autres en une dense accumulation cristalline',
                'D’épaisses couches de plans translucides s’empilent étroitement, leurs surfaces presque confondues',
            ],
            // high-moderate
            [
                'De nombreux plans superposés s’étagent et se fragmentent, leur accumulation créant une richesse visuelle',
                'Une géométrie dense emplit le champ de surfaces translucides à des distances variées',
            ],
            // high-shattered
            [
                'Une multitude d’éclats géométriques se dispersent de façon explosive, emplissant l’espace de fragments épars',
                'Des centaines de fragments translucides se répandent en tous sens en une dispersion maximale',
            ],
            // dense-compact
            [
                'Une immense concentration de surfaces géométriques se tasse en une masse cristalline solide',
                'D’innombrables plans translucides se compriment si densément qu’ils frôlent l’opacité',
            ],
            // dense-moderate
            [
                'Une vaste population de fragments géométriques emplit l’espace, se chevauchant à chaque profondeur',
                'Le champ fourmille de surfaces translucides, chacune voilant en partie celles qui se trouvent derrière',
            ],
            // dense-shattered
            [
                'Un essaim écrasant d’éclats géométriques explose vers l’extérieur, chaque fragment suivant sa propre trajectoire',
                'Des centaines et des centaines de particules translucides se dispersent dans toutes les directions imaginables',
            ],
        ],
        faceting: [
            // smooth
            [
                ', leurs surfaces lisses comme la soie et continûment courbées',
                ', avec de larges panneaux fluides aux bords doux',
            ],
            // mostly smooth
            [
                ', des surfaces surtout lisses, ponctuées d’interruptions anguleuses',
                ', de larges panneaux mêlés à de subtils accents facettés',
            ],
            // mixed
            [
                ', des surfaces mêlant à parts égales panneaux lisses et faces anguleuses',
                ', un mélange de courbes fluides et d’arêtes cristallines',
            ],
            // faceted
            [
                ', leurs faces nettement facettées, au caractère cristallin affirmé',
                ', des surfaces anguleuses captant la lumière sous des angles géométriques distincts',
            ],
            // razor-sharp
            [
                ', chaque surface une face de cristal tranchante comme un rasoir, d’une précision angulaire maximale',
                ', le tout hérissé d’une géométrie anguleuse serrée et d’arêtes cristallines dures',
            ],
        ],
        spatial: [
            // chaotic-radial
            [
                'L’agencement ne suit aucun ordre lisible, les fragments dérivant sans alignement.',
                'Aucun principe organisateur ne gouverne la dispersion — la géométrie s’éparpille librement.',
            ],
            // chaotic-organic
            [
                'Les plans géométriques se dispersent en tous sens, sans orientation privilégiée.',
                'Les formes s’éparpillent avec une liberté entropique, chaque élément trouvant sa propre trajectoire.',
            ],
            // chaotic-orbital
            [
                'Une tempête turbulente de géométrie submerge toute structure orbitale sous le désordre.',
                'Les courants orbitaux se devinent à peine sous le chaos des éléments épars.',
            ],
            // loose-radial
            [
                'Les formes rayonnent librement depuis l’intérieur, suggestion d’une étoile éclatée à peine suivie.',
                'Une tendance radiale détendue organise les formes sans y insister.',
            ],
            // loose-organic
            [
                'La géométrie s’organise librement autour de courants organiques, structure présente mais sans hâte.',
                'Un doux flux organique donne à l’agencement un sens de la direction sans rigidité.',
            ],
            // loose-orbital
            [
                'Les éléments dérivent sur des trajectoires orbitales lâches, s’enroulant doucement sans rigueur stricte.',
                'Une douce tendance spirale emporte les formes dans une dérive circulaire sans hâte.',
            ],
            // structured-radial
            [
                'Des éléments ordonnés émanent en rayons, une gerbe de plans divergeant depuis le centre.',
                'Une symétrie radiale précise gouverne l’agencement, chaque forme alignée sur le centre.',
            ],
            // structured-organic
            [
                'Les formes suivent un motif d’écoulement cohérent, créant une structure directionnelle visible.',
                'Un courant organique lisible emporte chaque élément dans la même direction résolue.',
            ],
            // structured-orbital
            [
                'Des bandes orbitales s’enroulent autour de la forme, arcs de géométrie spiralant avec une discipline architecturale.',
                'Des trajectoires orbitales concentriques emportent les éléments en une formation spirale disciplinée.',
            ],
        ],
        division: [
            // single core
            [
                ' Un noyau unique et unifié ancre toute la composition.',
                ' Toute la géométrie converge vers un seul centre lumineux.',
            ],
            /* none */ ['', ''],
            // three lobes
            [
                ' Trois noyaux lumineux divisent la forme, chacun un centre de gravité distinct.',
                ' La structure se scinde en trois lobes distincts d’activité géométrique.',
            ],
        ],
    },

    color: {
        phrase: [
            // achromatic-mono
            [
                'Une structure purement achromatique, d’argent et de blanc, imprègne la composition, géométrie sans identité chromatique.',
                'Les formes ne portent aucune couleur — seulement des dégradés d’argent lumineux, de nacre et d’ombre.',
            ],
            // achromatic-ranged
            [
                'Une géométrie presque incolore porte de faibles variations spectrales, tons fantomatiques à peine distincts du blanc.',
                'De subtiles traces spectrales hantent les surfaces achromatiques, le plus léger murmure de couleur prismatique.',
            ],
            // achromatic-prismatic
            [
                'De pâles fantômes d’arc-en-ciel habitent les formes achromatiques, traces spectrales qui naissent et se dissolvent sur une géométrie neutre.',
                'De délicates réfractions prismatiques traversent des plans par ailleurs incolores, comme la lumière à travers un verre ancien.',
            ],
            // muted-mono
            [
                'Une teinte {color} assourdie imprègne la composition, évoquant une surface patinée plus qu’une lumière émise.',
                'Un ton {color} calme et désaturé baigne chaque plan, suggérant une patine plutôt qu’un éclairage.',
            ],
            // muted-ranged
            [
                'Des nuances {color} assourdies varient subtilement sur une palette étroite et désaturée, évoquant le souvenir plus que la présence.',
                'Un spectre {color} retenu traverse doucement la géométrie, des couleurs ressenties plus que vues.',
            ],
            // muted-prismatic
            [
                'Des teintes spectrales fanées baignent la géométrie comme la lumière à travers un vieux vitrail, assourdies et atmosphériques.',
                'Un arc-en-ciel désaturé dérive à travers les formes, chaque teinte présente mais aucune ne s’imposant.',
            ],
            // vivid-mono
            [
                'Une teinte {color} intense sature chaque surface d’une identité chromatique audacieuse et singulière.',
                'La teinte {color} domine entièrement — une affirmation chromatique concentrée et inébranlable sur chaque plan.',
            ],
            // vivid-ranged
            [
                'Un riche ton {color} domine, rehaussé d’accents vifs de teintes voisines qui ajoutent profondeur et complexité chromatique.',
                'Un ton {color} saturé ancre la palette tandis que des longueurs d’onde voisines introduisent une variation harmonique.',
            ],
            // vivid-prismatic
            [
                'Une couleur prismatique intégrale inonde la géométrie, chaque teinte vive et lumineusement présente.',
                'Tout le spectre visible rayonne à travers les formes, une explosion prismatique de couleur saturée.',
            ],
        ],
        lightPoints: [
            // tight
            [
                'Au sein de la structure, {N} points de lumière blanche apparaissent comme de précis ancrages lumineux, chacun nettement découpé sur la géométrie.',
                '{N} points de lumière concentrée ponctuent la composition comme des épingles brillantes qui maintiennent la structure en place.',
            ],
            // contained
            [
                '{N} points de lumière sont semés dans la géométrie, chacun entouré d’un petit halo contenu.',
                'À travers la structure, {N} points lumineux brillent d’un rayonnement retenu, leur lumière restant proche.',
            ],
            // moderate
            [
                '{N} points lumineux s’éparpillent dans la géométrie comme les étoiles d’une constellation, leurs halos doucement visibles.',
                'Flottant parmi les plans, {N} orbes de lumière blanche forment une douce distribution stellaire.',
            ],
            // spreading
            [
                '{N} points de lumière rayonnent à travers les plans éclairés, leurs halos se fondant là où ils se chevauchent.',
                '{N} orbes lumineux se dispersent dans la structure, chacun projetant une lumière visible sur la géométrie environnante.',
            ],
            // atmospheric
            [
                '{N} points de lumière blanche se diffusent largement dans la composition, chaque orbe se dissolvant en rayonnement atmosphérique.',
                '{N} sources lumineuses se dispersent comme des étoiles rapprochées, leur rayonnement combiné formant un champ de lumière continu.',
            ],
        ],
    },

    coda: {
        arrangement: [
            // mineral
            [
                'L’image évoque une formation minérale saisie en pleine cristallisation',
                'La composition suggère une géode vue de l’intérieur',
                'La structure rappelle une cathédrale minérale, ancienne et immobile',
            ],
            // architectural
            [
                'L’image évoque un intérieur vu du dedans — un espace qui contient et qui est contenu',
                'La composition suggère une architecture suspendue dans la pensée',
                'La structure rappelle une pièce faite de lumière, aux murs se dissolvant en géométrie',
            ],
            // sanctuary
            [
                'L’image évoque un sanctuaire bâti de pure géométrie, un lieu d’intention silencieuse',
                'La composition suggère un reliquaire qui garde de la lumière plutôt que des ossements',
                'La structure rappelle un autel de plans translucides, une ferveur sans liturgie',
            ],
            // organic
            [
                'L’image évoque un organisme bioluminescent, vivant à sa manière tranquille',
                'La composition suggère une structure vivante, qui croît et se réoriente',
                'La structure rappelle le corail ou le mycélium, une intelligence organique sous forme géométrique',
            ],
            // aquatic
            [
                'L’image évoque un courant rendu visible, une dynamique des fluides figée dans le cristal',
                'La composition suggère une eau cristallisée à l’instant du mouvement',
                'La structure rappelle une vague océanique rendue en géométrie translucide, toujours sur le point de déferler',
            ],
            // mechanical
            [
                'L’image évoque un mécanisme d’horlogerie réduit à sa géométrie essentielle',
                'La composition suggère un moteur de lumière, chaque arc un transfert d’énergie',
                'La structure rappelle un gyroscope pris entre des forces, sa rotation tenue en suspens',
            ],
            // storm
            [
                'L’image évoque un système orageux rendu en abstraction géométrique',
                'La composition suggère l’œil d’une turbulence, l’énergie rayonnant vers l’extérieur',
                'La structure rappelle un éclair pris dans le cristal — une énergie cherchant chaque chemin possible',
            ],
            // explosion
            [
                'L’image évoque une explosion figée à son instant le plus beau',
                'La composition suggère des éclats d’obus qui auraient choisi de devenir architecture',
                'La structure rappelle une détonation rendue en vitrail, la violence devenue immobilité',
            ],
            // cosmic
            [
                'L’image évoque une galaxie en miniature, les forces gravitationnelles rendues en plans géométriques',
                'La composition suggère une supernova figée à l’instant de son expansion',
                'La structure rappelle la naissance d’une étoile, matière et énergie hésitant encore sur ce qu’elles deviendront',
            ],
        ],
        structure: [
            /* silken */ [', sa géométrie tissée de soie translucide', ', ses surfaces drapées plutôt que construites'],
            /* folded */ [', bâtie de plans de lumière soigneusement pliés', ', ses couches empilées avec une calme intention architecturale'],
            /* woven */ [', ses plans entrelacés comme la chaîne et la trame', ', sa géométrie stratifiée avec la patience du sédiment'],
            // creased
            [
                ', ses surfaces froissées et plissées avec une précision anguleuse',
                ', sa géométrie pliée le long de lignes nettes et délibérées',
            ],
            /* faceted */ [', taillée dans un cristal fracturé', ', ses faces reflétant la lumière sous des angles géométriques distincts'],
            // carved
            [
                ', sculptée dans la lumière solide avec une intention tranchante comme un ciseau',
                ', ses faces brisées le long de failles de force lumineuse',
            ],
            /* shattered */ [', brisée en fragments cristallins qui gardent encore leur formation', ', éclatée en une constellation de débris cristallins'],
            /* crystalline */ [', chaque arête une lame de rayonnement cristallisé', ', ses surfaces pavées avec une précision minérale'],
            // jagged
            [
                ', hérissée d’arêtes déchiquetées comme une structure forgée dans la violence',
                ', chaque surface un tranchant dentelé, une géométrie née de la rupture',
            ],
        ],
        bridge: [
            /* earth × cold */ ['. Dans une immobilité de tombeau,', '. Sous un sceau de silence,'],
            /* earth × neutral */ ['. Dans le repos de sa propre gravité,', '. Sous le poids d’une masse silencieuse,'],
            /* earth × hot */ ['. Depuis les profondeurs de la pierre,', '. Dans la chaleur qui monte du minéral ancien,'],
            /* life × cold */ ['. En dormance sous le givre,', '. Dans une vie suspendue, en attente du dégel,'],
            /* life × neutral */ ['. Au rythme d’une lente respiration,', '. Au pas de la géologie,'],
            /* life × hot */ ['. Dans une urgence biologique,', '. Dans la chaleur de son propre métabolisme,'],
            /* cosmos × cold */ ['. Dans le froid entre les étoiles,', '. Dans le vide de l’espace profond,'],
            /* cosmos × neutral */ ['. Dans le silence de l’orbite,', '. Au gré de forces plus anciennes que la lumière,'],
            /* cosmos × hot */ ['. Au cœur de la formation,', '. Sous la pression de son propre effondrement,'],
        ],
        detail: [
            // frozen
            [
                'Elle garde une immobilité glaciale et parfaite — une architecture qui n’a jamais connu le mouvement.',
                'La scène porte le silence de la glace profonde, une géométrie préservée au zéro absolu.',
            ],
            // cool
            [
                'Un calme frais et contemplatif imprègne la scène, comme observée au crépuscule.',
                'L’atmosphère évoque la tombée du jour — la dernière lumière tenue en suspension géométrique.',
            ],
            // misty
            [
                'L’air lui-même semble retenir son souffle, la lumière arrivant à travers la distance et la brume.',
                'Une brume liminale adoucit chaque arête, la scène suspendue entre la visibilité et le rêve.',
            ],
            // neutral
            [
                'L’humeur est celle d’un équilibre tranquille, ni chaude ni froide, une géométrie en paix avec elle-même.',
                'Un calme mesuré et neutre tient la composition dans un équilibre réfléchi.',
            ],
            // warm
            [
                'La chaleur rayonne de l’intérieur, la géométrie vivante d’un feu intérieur.',
                'La scène rayonne de la chaleur d’une chose longtemps gardée tout près, la lumière comme tendresse.',
            ],
            // bright
            [
                'La lumière pousse vers l’extérieur depuis chaque surface, la structure lumineuse d’une conviction tranquille.',
                'La géométrie porte sa propre lumière du jour, brillante sans source, chaude sans chaleur.',
            ],
            // radiant
            [
                'Une énergie rayonnante pulse à travers la structure, chaque surface conduisant un éclat concentré.',
                'La géométrie flamboie d’une intensité vive, la structure transformée en pur événement lumineux.',
            ],
            // molten
            [
                'La structure brûle d’une férocité incandescente, une géométrie au bord de sa propre transformation.',
                'Tout est en fusion — les formes portent l’énergie de leur propre devenir, la lumière comme origine.',
            ],
            // burning
            [
                'La scène a franchi l’éclairage pour atteindre le pur rayonnement, la géométrie devenue feu.',
                'La lumière a entièrement remplacé la matière — il ne reste que le souvenir d’une structure, en feu.',
            ],
        ],
        inflection: {
            darkBloom: ['. Rayonnant depuis sa propre obscurité comme une créature des abysses,', '. Avec une lumière venue non du dehors mais de quelque part au sein de la géométrie,'],
            darkJewel: ['. À la manière d’un écrin précieux qu’on ne découvre que de près,', '. Dans une obscurité qu’il faut sonder plutôt que regarder,'],
            chaosStorm: ['. Chaque fragment obéissant à sa propre trajectoire, la structure abandonnée au vent,', '. Dans un ordre brisé au-delà de toute reconnaissance,'],
            sparseOrder: ['. Chaque élément une île d’intention dans une mer de vide,', '. Avec si peu de formes, chacune posée avec une certitude absolue,'],
            vividMono: ['. Dans une couleur si concentrée qu’elle devient matière et non simple qualité,', '. Une seule teinte portée à l’intensité d’une conviction,'],
            denseChaos: ['. Dans un champ de débris où le motif cède sous la quantité,', '. Avec tant de fragments que le chaos lui-même devient texture,'],
            coherenceHigh: ['. Chaque élément obéissant à une seule volonté architecturale,', '. Sous l’autorité cristalline de la structure,'],
            coherenceLow: ['. Dans une entropie où l’ordre n’est plus qu’un lointain souvenir,', '. Dans un chaos qui disperse chaque plan hors de portée de tout motif,'],
            luminosityLow: ['. Dans une obscurité presque totale,', '. Au seuil même de la perception,'],
            bloomHigh: ['. En se dissolvant dans sa propre atmosphère,', '. Dans une fusion de lumière et de forme en un rayonnement continu,'],
            densityHigh: ['. Sous le poids de sa propre abondance,', '. Sous la pression d’une géométrie accumulée,'],
        },
    },
};
