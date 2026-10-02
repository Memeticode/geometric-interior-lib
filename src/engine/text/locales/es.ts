/**
 * Spanish text. See ../locale-text.ts for how the pieces are assembled.
 */

import type { LocaleText } from '../locale-text.js';

export const es: LocaleText = {
    punctuation: { period: '.', space: ' ' },

    hues: [
        { max: 30, words: ['Rubí', 'Carmesí', 'Carmín', 'Escarlata'] },
        { max: 60, words: ['Ámbar', 'Dorado', 'Azafrán', 'Topacio'] },
        { max: 90, words: ['Chartreuse', 'Citrino', 'Peridoto', 'Lima'] },
        { max: 150, words: ['Esmeralda', 'Jade', 'Viridiano', 'Malaquita'] },
        { max: 210, words: ['Cerúleo', 'Turquesa', 'Aguamarina', 'Marino'] },
        { max: 270, words: ['Cobalto', 'Índigo', 'Lapislázuli', 'Zafiro'] },
        { max: 330, words: ['Amatista', 'Ciruela', 'Orquídea', 'Malva'] },
        { max: 361, words: ['Rubí', 'Carmesí', 'Carmín', 'Escarlata'] },
    ],

    title: {
        luminosity: {
            low: ['Oscuro', 'Tenue', 'Sombrío', 'Ensombrecido'],
            mid: ['Resplandeciente', 'Sereno', 'Cálido', 'Templado'],
            high: ['Luminoso', 'Radiante', 'Incandescente', 'Fulgurante'],
        },
        density: {
            low: ['Disperso', 'Mínimo', 'Destilado', 'Esencial'],
            mid: ['Equilibrado', 'Estructurado', 'Compuesto', 'Mesurado'],
            high: ['Denso', 'Estratificado', 'Complejo', 'Saturado'],
        },
        scale: {
            low: ['Monumental', 'Grandioso', 'Amplio', 'Expansivo'],
            mid: ['Espacial', 'Dimensional', 'Estratificado', 'Templado'],
            high: ['Atmosférico', 'Particulado', 'Granular', 'Disperso'],
        },
        templates: [
            w => `${w.hue()} ${w.scale()} ${w.luminosity()}`,
            w => `Interior ${w.density()} ${w.luminosity()}`,
            w => `Campo ${w.density()} ${w.hue()}`,
            w => `Geometría ${w.scale()} ${w.luminosity()}`,
            w => `Variedad ${w.hue()} ${w.luminosity()}`,
            w => `Plano ${w.density()} ${w.scale()}`,
            w => `Estructura ${w.luminosity()} ${w.hue()}`,
            w => `Retícula ${w.scale()} ${w.hue()}`,
        ],
    },

    summary: {
        density: [
            /* sparse */ ['dispersas', 'aisladas'],
            /* scattered */ ['esparcidas', 'escasas'],
            /* moderate */ ['moderadas', 'mesuradas'],
            /* layered */ ['estratificadas', 'superpuestas'],
            /* dense */ ['densas', 'concentradas'],
        ],
        faceting: [
            /* smooth */ ['suaves', 'fluidas'],
            /* broad */ ['amplias', 'de bordes suaves'],
            /* mixed */ ['translúcidas', 'mixtas'],
            /* faceted */ ['facetadas', 'cristalinas'],
            /* sharp */ ['angulares', 'afiladas'],
        ],
        scale: [
            /* slabs */ ['losas', 'paneles'],
            /* planes */ ['planos', 'placas'],
            /* forms */ ['formas', 'planos'],
            /* fragments */ ['fragmentos', 'esquirlas'],
            /* particles */ ['partículas', 'puntos'],
        ],
        arrangement: [
            /* chaotic-radial */ ['derivan libremente', 'se dispersan sin orden'],
            /* chaotic-organic */ ['se dispersan en toda dirección', 'se esparcen caóticamente'],
            /* chaotic-orbital */ ['se agitan en desorden', 'se dispersan turbulentamente'],
            /* loose-radial */ ['irradian vagamente', 'se extienden desde el centro'],
            /* loose-organic */ ['derivan en trayectorias orgánicas', 'fluyen libremente'],
            /* loose-orbital */ ['espiralan suavemente', 'orbitan sueltas'],
            /* structured-radial */ ['emanan radialmente', 'irradian desde el centro'],
            /* structured-organic */ ['siguen un flujo coherente', 'fluyen en formación'],
            /* structured-orbital */ ['orbitan en arcos', 'se envuelven en bandas orbitales'],
        ],
        bloom: [
            /* tight */ ['con luz concentrada', 'con luz precisa'],
            /* contained */ ['con brillo contenido', 'con radiancia ajustada'],
            /* soft */ ['con halos suaves', 'con resplandor gentil'],
            /* spreading */ ['con luz expansiva', 'con halos luminosos'],
            /* atmospheric */ ['en brillo atmosférico difuso', 'en bruma radiante'],
        ],
        compose: p => `${p.nodeCount} puntos luminosos anclan ${p.density} ${p.scale} geométricas ${p.faceting} en ${p.hue ?? 'acromáticas'} que ${p.arrangement} contra la oscuridad, ${p.bloom}.`,
    },

    scene: {
        luminosity: [
            // near-black
            [
                'Contra una oscuridad casi total, los más tenues trazos geométricos se resuelven en el umbral de la visibilidad',
                'Desde una negrura impenetrable, las formas emergen portando luz apenas perceptible',
                'En la oscuridad más profunda, las estructuras existen como poco más que la idea de geometría',
            ],
            // dark
            [
                'La oscuridad profunda sostiene estas formas geométricas, cada superficie una afirmación silenciosa contra el vacío',
                'Desde una sombra profunda, las formas emergen portando su propia luz interior tenue',
                'Estructuras geométricas emergen de la sombra profunda, sus bordes la única evidencia de dimensión',
            ],
            // dim
            [
                'Un interior tenue suspende estas formas en un crepúsculo quieto, superficies capturando luz residual',
                'Una iluminación sutil revela la geometría en susurros tonales más que en declaraciones',
                'En luz ambiental baja, los planos geométricos se hacen visibles a través de una suave autoluminiscencia',
            ],
            // moderate-low
            [
                'Una luz contemplativa y suave revela la geometría de este espacio interior',
                'Un campo gentilmente iluminado sostiene estos planos geométricos en suspensión legible',
                'Una iluminación moderada llena el espacio, la geometría ni oculta ni plenamente expuesta',
            ],
            // moderate-high
            [
                'Una luminosidad estable define cada superficie geométrica con claridad tranquila',
                'La luz clara llena el espacio, planos translúcidos revelando su carácter estructural completo',
                'Las formas geométricas habitan un interior bien iluminado, cada borde y superficie articulados',
            ],
            // bright
            [
                'Luz brillante irradia desde y a través de cada superficie geométrica con presencia energética',
                'Una intensidad luminosa ilumina la estructura desde dentro, superficies vivas de radiancia',
                'Las formas resplandecen con sustancial energía interna, la luz presionando hacia afuera por cada plano',
            ],
            // blazing
            [
                'Una radiancia intensa, casi abrumadora, inunda cada superficie de este interior geométrico',
                'La máxima energía luminosa satura el campo, la geometría ardiendo al borde de la disolución',
                'Una intensidad brillante envuelve la estructura, cada plano una fuente de poder radiante concentrado',
            ],
        ],
        bloom: [
            // tight
            [
                ', cada punto de luz definido con precisión y contenido nítidamente',
                ', la iluminación mantenida con precisa arquitectura en cada borde',
                ', radiancia concentrada sin dispersión atmosférica',
            ],
            // 1
            [
                ', la luz agrupándose cerca de cada superficie con radiancia contenida',
                ', halos tenues apenas visibles en los bordes más brillantes',
            ],
            // 2
            [
                ', modestos halos extendiéndose desde los puntos más brillantes',
                ', un brillo sutil rodeando las superficies más luminosas',
            ],
            // moderate
            [
                ', halos visibles enmarcando cada superficie geométrica',
                ', suaves aureolas marcando el límite entre forma y vacío',
                ', la luz extendiéndose notablemente más allá de cada borde',
            ],
            // 4
            [
                ', luz gentil emanando más allá de cada superficie hacia la oscuridad circundante',
                ', el resplandor de cada plano alcanzando el espacio a su alrededor',
            ],
            // 5
            [
                ', aureolas de luz expandiéndose y fusionándose entre superficies adyacentes',
                ', radiancia atmosférica suavizando cada límite geométrico',
            ],
            // atmospheric
            [
                ', la geometría flotando en su propia atmósfera luminosa donde los límites se disuelven',
                ', un brillo atmosférico difuso llenando el espacio hasta que formas y luz se vuelven inseparables',
                ', una radiancia envolvente en la que geometría y emanación se funden en campo continuo',
            ],
        ],
    },

    geometry: {
        form: [
            // sparse-compact
            [
                'Unos pocos planos geométricos audaces se mantienen juntos en formación cristalina cerrada',
                'Solo un puñado de superficies translúcidas se agrupan estrechamente, cada una individualmente legible',
            ],
            // sparse-moderate
            [
                'Planos translúcidos dispersos se ubican deliberadamente con separación moderada',
                'Un número reducido de formas geométricas se separan a distancias legibles',
            ],
            // sparse-shattered
            [
                'Esquirlas geométricas aisladas se dispersan por el vasto espacio oscuro, cada una una presencia solitaria',
                'Unos pocos fragmentos se dispersan ampliamente, separados por extensiones de vacío',
            ],
            // low-compact
            [
                'Una modesta colección de planos translúcidos se pliegan compactamente unos sobre otros',
                'Varias superficies geométricas se superponen en proximidad cercana, manteniendo cohesión estructural',
            ],
            // low-moderate
            [
                'Un pequeño arreglo de planos translúcidos se extiende con separación cómoda',
                'Formas geométricas mantienen distancia gentil entre sí en dispersión tranquila',
            ],
            // low-shattered
            [
                'Fragmentos geométricos dispersos se extienden por el campo en dispersión creciente',
                'Un puñado de formas fragmentadas se lanzan hacia afuera desde un centro recordado',
            ],
            // moderate-compact
            [
                'Una colección sustancial de planos translúcidos se acumula en una masa cristalina compacta',
                'Superficies geométricas se superponen y pliegan unas sobre otras en formación concentrada',
            ],
            // moderate-moderate
            [
                'Planos translúcidos se superponen y separan en fragmentación mesurada',
                'Una disposición equilibrada de formas geométricas ocupa el espacio con dispersión moderada',
            ],
            // moderate-shattered
            [
                'Formas geométricas se dispersan hacia afuera en expansión creciente, el espacio entre ellas ampliándose',
                'Planos translúcidos se fragmentan y esparcen, la estructura disolviéndose en distribución espacial',
            ],
            // high-compact
            [
                'Muchas superficies geométricas se aglomeran en densa acumulación cristalina',
                'Espesas capas de planos translúcidos se comprimen estrechamente, superficies casi fusionándose',
            ],
            // high-moderate
            [
                'Muchos planos superpuestos se estratifican y fragmentan, la acumulación creando riqueza visual',
                'Geometría densa llena el campo con superficies translúcidas a distancias variables',
            ],
            // high-shattered
            [
                'Una multitud de esquirlas geométricas se dispersan explosivamente, llenando el espacio',
                'Cientos de fragmentos translúcidos se esparcen en toda dirección en máxima dispersión',
            ],
            // dense-compact
            [
                'Una inmensa concentración de superficies geométricas se comprime en una masa cristalina sólida',
                'Incontables planos translúcidos se comprimen tan densamente que se aproximan a la opacidad',
            ],
            // dense-moderate
            [
                'Una vasta población de fragmentos geométricos llena el espacio, superponiéndose en cada profundidad',
                'El campo rebosa de superficies translúcidas, cada una ocluyendo parcialmente las de detrás',
            ],
            // dense-shattered
            [
                'Un enjambre abrumador de esquirlas geométricas explota hacia afuera, cada fragmento una trayectoria separada',
                'Cientos y cientos de partículas translúcidas se dispersan en toda dirección concebible',
            ],
        ],
        faceting: [
            // smooth
            [
                ', sus superficies suaves como seda y continuamente curvadas',
                ', con paneles fluidos amplios y bordes suaves',
            ],
            // mostly smooth
            [
                ', superficies mayormente suaves con ocasionales interrupciones angulares',
                ', paneles amplios mezclándose con sutiles acentos facetados',
            ],
            // mixed
            [
                ', superficies mezclando paneles suaves y caras angulares en igual medida',
                ', una fusión de curvas fluidas y bordes cristalinos',
            ],
            // faceted
            [
                ', sus caras agudamente facetadas con definido carácter cristalino',
                ', superficies angulares capturando luz en ángulos geométricos distintos',
            ],
            // razor-sharp
            [
                ', cada superficie una cara cristalina afilada con máxima precisión angular',
                ', erizadas de geometría angular estrecha y bordes cristalinos duros',
            ],
        ],
        spatial: [
            // chaotic-radial
            [
                'La disposición no sigue orden legible, los fragmentos derivando sin alineación.',
                'Ningún principio organizador gobierna la dispersión — la geometría se esparce libremente.',
            ],
            // chaotic-organic
            [
                'Los planos geométricos se dispersan en toda dirección sin orientación preferente.',
                'Las formas se dispersan con libertad entrópica, cada elemento encontrando su propia trayectoria.',
            ],
            // chaotic-orbital
            [
                'Una tormenta turbulenta de geometría abruma toda estructura orbital con desorden.',
                'Las corrientes orbitales apenas se registran bajo el caos de elementos dispersos.',
            ],
            // loose-radial
            [
                'Las formas irradian vagamente desde el interior, una sugerencia de estallido solo parcialmente seguida.',
                'Una tendencia radial relajada organiza las formas sin insistir en ello.',
            ],
            // loose-organic
            [
                'La geometría se organiza libremente alrededor de corrientes orgánicas, estructura presente pero sin prisa.',
                'Un flujo orgánico gentil da a la disposición un sentido de dirección sin rigidez.',
            ],
            // loose-orbital
            [
                'Los elementos derivan en trayectorias orbitales sueltas, espiraleando gentilmente sin adherencia estricta.',
                'Una suave tendencia espiral lleva las formas en deriva circular sin prisa.',
            ],
            // structured-radial
            [
                'Elementos ordenados emanan radialmente, un estallido de planos divergiendo desde el centro.',
                'Una simetría radial precisa gobierna la disposición, cada forma alineada al centro.',
            ],
            // structured-organic
            [
                'Las formas siguen un patrón de flujo coherente, creando estructura direccional visible.',
                'Una corriente orgánica legible lleva cada elemento en la misma dirección deliberada.',
            ],
            // structured-orbital
            [
                'Bandas orbitales envuelven la forma, arcos de geometría espiraleando con disciplina arquitectónica.',
                'Trayectorias orbitales concéntricas llevan los elementos en formación espiral disciplinada.',
            ],
        ],
        division: [
            // single core
            [
                ' Un solo núcleo unificado ancla toda la composición.',
                ' Toda la geometría converge hacia un centro luminoso.',
            ],
            /* none */ ['', ''],
            // three lobes
            [
                ' Tres núcleos luminosos dividen la forma, cada uno un centro gravitacional separado.',
                ' La estructura se divide en tres lóbulos distintos de actividad geométrica.',
            ],
        ],
    },

    color: {
        phrase: [
            // achromatic-mono
            [
                'Estructura acromática pura en plata y blanco impregna la composición, geometría sin identidad cromática.',
                'Las formas no portan color — solo gradaciones de plata luminosa, perla y sombra.',
            ],
            // achromatic-ranged
            [
                'Geometría casi incolora porta leves desplazamientos espectrales, tonos fantasmales apenas distinguibles del blanco.',
                'Sutiles trazos espectrales habitan las superficies acromáticas, el más leve susurro de color prismático.',
            ],
            // achromatic-prismatic
            [
                'Tenues fantasmas de arcoíris habitan formas acromáticas, trazos espectrales emergiendo y disolviéndose contra geometría neutra.',
                'Delicadas refracciones prismáticas atraviesan planos por lo demás incoloros como luz a través de cristal antiguo.',
            ],
            // muted-mono
            [
                'Un tono {color} apagado impregna la composición, evocando superficie envejecida más que luz emitida.',
                'Un {color} quieto y desaturado recorre cada plano, sugiriendo pátina más que iluminación.',
            ],
            // muted-ranged
            [
                'Matices {color} apagados cambian sutilmente en una paleta desaturada estrecha, sugiriendo memoria más que presencia.',
                'Un espectro {color} contenido se mueve tranquilamente por la geometría, colores sentidos más que vistos.',
            ],
            // muted-prismatic
            [
                'Tintes espectrales desvanecidos recorren la geometría como luz a través de cristal antiguo, apagados y atmosféricos.',
                'Un arcoíris desaturado deriva por las formas, cada matiz presente pero ninguno imponiéndose.',
            ],
            // vivid-mono
            [
                'Un {color} intenso satura cada superficie con identidad cromática audaz y singular.',
                'El {color} domina completamente — una declaración cromática concentrada e inquebrantable en cada plano.',
            ],
            // vivid-ranged
            [
                'Un rico {color} domina con acentos vívidos de matices adyacentes añadiendo profundidad y complejidad cromática.',
                'Un {color} saturado ancla la paleta mientras longitudes de onda vecinas introducen variación armónica.',
            ],
            // vivid-prismatic
            [
                'Color prismático pleno inunda la geometría, cada matiz vívido y luminosamente presente.',
                'El espectro visible entero irradia a través de las formas, una explosión prismática de color saturado.',
            ],
        ],
        lightPoints: [
            // tight
            [
                'Entre la estructura, {N} puntos de luz blanca aparecen como anclajes luminosos precisos, cada uno definido contra la geometría.',
                '{N} puntos concentrados de luz puntúan la composición como pines brillantes sosteniendo la estructura.',
            ],
            // contained
            [
                '{N} puntos de luz se dispersan por la geometría, cada uno rodeado por un pequeño halo contenido.',
                'A través de la estructura, {N} puntos luminosos resplandecen con radiancia contenida, su luz manteniéndose cercana.',
            ],
            // moderate
            [
                '{N} puntos luminosos se dispersan entre la geometría como estrellas en una constelación, sus halos suavemente visibles.',
                'Flotando entre los planos, {N} orbes de luz blanca crean una gentil distribución estelar.',
            ],
            // spreading
            [
                '{N} puntos de luz irradian hacia afuera a través de los planos iluminados, sus halos fusionándose donde se superponen.',
                '{N} orbes luminosos se dispersan por la estructura, cada uno proyectando luz visible en la geometría circundante.',
            ],
            // atmospheric
            [
                '{N} puntos de luz blanca se difunden ampliamente por la composición, cada orbe disolviéndose en radiancia atmosférica.',
                '{N} fuentes luminosas se dispersan como estrellas atraídas entre sí, su radiancia combinada creando un campo continuo de luz.',
            ],
        ],
    },

    coda: {
        arrangement: [
            // mineral
            [
                'La imagen evoca una formación mineral capturada a mitad de cristalización',
                'La composición sugiere una geoda vista desde su interior',
                'La estructura recuerda una catedral mineral, antigua e inmóvil',
            ],
            // architectural
            [
                'La imagen evoca un interior visto desde dentro — un espacio que contiene y es contenido',
                'La composición sugiere arquitectura suspendida en pensamiento',
                'La estructura recuerda una habitación hecha de luz, paredes disolviéndose en geometría',
            ],
            // sanctuary
            [
                'La imagen evoca un santuario construido de geometría pura, un lugar de intención silenciosa',
                'La composición sugiere un relicario que guarda luz en lugar de hueso',
                'La estructura recuerda un altar de planos translúcidos, propósito sin liturgia',
            ],
            // organic
            [
                'La imagen evoca un organismo bioluminiscente, vivo a su propia manera silenciosa',
                'La composición sugiere una estructura viva, creciendo y reorientándose',
                'La estructura recuerda coral o micelio, inteligencia orgánica en forma geométrica',
            ],
            // aquatic
            [
                'La imagen evoca una corriente hecha visible, dinámica de fluidos congelada en cristal',
                'La composición sugiere agua cristalizada en el momento del movimiento',
                'La estructura recuerda una ola oceánica renderizada en geometría translúcida, perpetuamente a punto de romper',
            ],
            // mechanical
            [
                'La imagen evoca un mecanismo de relojería reducido a su geometría esencial',
                'La composición sugiere un motor de luz, cada arco una transferencia de energía',
                'La estructura recuerda un giroscopio atrapado entre fuerzas, rotación sostenida en suspensión',
            ],
            // storm
            [
                'La imagen evoca un sistema de tormentas renderizado en abstracción geométrica',
                'La composición sugiere el ojo de una turbulencia, energía irradiando hacia afuera',
                'La estructura recuerda un relámpago atrapado en cristal — energía buscando todo camino posible',
            ],
            // explosion
            [
                'La imagen evoca una explosión congelada en su instante más hermoso',
                'La composición sugiere metralla que eligió convertirse en arquitectura',
                'La estructura recuerda una detonación renderizada en vidriera, violencia vuelta quietud',
            ],
            // cosmic
            [
                'La imagen evoca una galaxia en miniatura, fuerzas gravitacionales renderizadas como planos geométricos',
                'La composición sugiere una supernova congelada en el instante de expansión',
                'La estructura recuerda el nacimiento de una estrella, materia y energía aún decidiendo qué ser',
            ],
        ],
        structure: [
            /* silken */ [', su geometría tejida de seda translúcida', ', superficies drapeadas más que construidas'],
            // folded
            [
                ', construida de planos de luz cuidadosamente plegados',
                ', sus capas apiladas con quieto propósito arquitectónico',
            ],
            // woven
            [
                ', sus planos entrelazados como urdimbre y trama',
                ', geometría estratificada con la paciencia del sedimento',
            ],
            // creased
            [
                ', sus superficies plegadas y plisadas con precisión angular',
                ', geometría doblada a lo largo de líneas deliberadas y afiladas',
            ],
            // faceted
            [
                ', tallada de cristal fracturado',
                ', sus caras reflejando luz en ángulos geométricos distintos',
            ],
            // carved
            [
                ', labrada de luz sólida con intención de cincel',
                ', sus caras rotas a lo largo de líneas de fuerza luminosa',
            ],
            // shattered
            [
                ', fragmentada en esquirlas cristalinas que aún mantienen formación',
                ', astillada en una constelación de escombros cristalinos',
            ],
            // crystalline
            [
                ', cada borde una hoja de radiancia cristalizada',
                ', sus superficies teseladas con precisión mineral',
            ],
            // jagged
            [
                ', erizada de bordes dentados como una estructura forjada en violencia',
                ', cada superficie un filo serrado, geometría nacida de la ruptura',
            ],
        ],
        bridge: [
            /* earth × cold */ ['. Sepultada en quietud,', '. Sellada bajo el silencio,'],
            // earth × neutral
            [
                '. Reposando en su propia gravedad,',
                '. Sostenida en su sitio por masa silenciosa,',
            ],
            // earth × hot
            [
                '. Iluminada desde lo profundo de la piedra,',
                '. Calor ascendiendo por mineral antiguo,',
            ],
            /* life × cold */ ['. Latente bajo la escarcha,', '. Viva pero suspendida, esperando el deshielo,'],
            /* life × neutral */ ['. Respirando en ritmo lento,', '. Creciendo al paso de la geología,'],
            /* life × hot */ ['. Encendida de urgencia biológica,', '. Viva con el calor de su propio metabolismo,'],
            // cosmos × cold
            [
                '. A la deriva en el frío entre estrellas,',
                '. Suspendida en el vacío del espacio profundo,',
            ],
            // cosmos × neutral
            [
                '. Girando en el silencio de la órbita,',
                '. Llevada por fuerzas más antiguas que la luz,',
            ],
            // cosmos × hot
            [
                '. Ardiendo en el corazón de la formación,',
                '. Encendida por la presión de su propio colapso,',
            ],
        ],
        detail: [
            // frozen
            [
                'Mantiene una quietud glacial perfecta — arquitectura que nunca ha conocido el movimiento.',
                'La escena porta el silencio del hielo profundo, geometría preservada en cero absoluto.',
            ],
            // cool
            [
                'Una quietud fresca y contemplativa impregna la escena, como observada a través del crepúsculo.',
                'La atmósfera sugiere el anochecer — la última luz sostenida en suspensión geométrica.',
            ],
            // misty
            [
                'El aire mismo parece contener la respiración, la luz llegando a través de distancia y niebla.',
                'Una bruma liminal suaviza cada borde, la escena suspendida entre visibilidad y sueño.',
            ],
            // neutral
            [
                'El ánimo es de equilibrio quieto, ni cálido ni frío, geometría en reposo consigo misma.',
                'Una calma mesurada y neutra mantiene la composición en balance reflexivo.',
            ],
            // warm
            [
                'La calidez irradia desde dentro, la geometría viva con fuego interior.',
                'La escena resplandece con la calidez de algo sostenido cerca, la luz como ternura.',
            ],
            // bright
            [
                'La luz presiona hacia afuera desde cada superficie, la estructura luminosa con quieta convicción.',
                'La geometría porta su propia luz diurna, brillante sin fuente, cálida sin calor.',
            ],
            // radiant
            [
                'Energía radiante pulsa a través de la estructura, cada superficie un conducto de brillantez concentrada.',
                'La geometría arde con intensidad vívida, estructura transformada en puro evento luminoso.',
            ],
            // molten
            [
                'La estructura arde con ferocidad incandescente, geometría al borde de su propia transformación.',
                'Todo es fundido — las formas portan la energía de su propio devenir, la luz como origen.',
            ],
            // burning
            [
                'La escena ha cruzado más allá de la iluminación hacia radiancia pura, geometría como fuego mismo.',
                'La luz ha reemplazado la materia por completo — lo que queda es la memoria de la estructura, ardiendo.',
            ],
        ],
        inflection: {
            darkBloom: ['. Brillando desde dentro de su propia oscuridad como una criatura abisal,', '. La luz llegando no desde fuera sino desde algún lugar dentro de la geometría,'],
            darkJewel: ['. Preciosa y contenida, una geometría de joyero visible solo para quienes miran de cerca,', '. Geometría tan oscura que debe ser encontrada más que vista,'],
            chaosStorm: ['. Cada fragmento obedeciendo su propia trayectoria, la estructura abandonada al viento,', '. El orden destrozado más allá del punto de reconocimiento,'],
            sparseOrder: ['. Cada elemento una isla de intención en un mar de vacío,', '. Tan pocas formas, y sin embargo cada una colocada con certeza absoluta,'],
            vividMono: ['. Color tan concentrado que se convierte en material, no meramente en cualidad,', '. Un solo matiz elevado a la intensidad de la convicción,'],
            denseChaos: ['. Un campo de escombros donde el patrón ha sido abrumado por la pura cantidad,', '. Tantos fragmentos que el caos mismo se convierte en textura,'],
            coherenceHigh: ['. Cada elemento obedece una sola voluntad arquitectónica,', '. La estructura gobierna cada plano con autoridad cristalina,'],
            coherenceLow: ['. La entropía ha reclamado la disposición, el orden un recuerdo lejano,', '. El caos dispersa cada plano más allá del alcance del patrón,'],
            luminosityLow: ['. Sumergida en oscuridad casi total,', '. Visible solo en el umbral de la percepción,'],
            bloomHigh: ['. Disolviéndose en su propia atmósfera,', '. Luz y forma fundiéndose en radiancia continua,'],
            densityHigh: ['. Abrumada por su propia abundancia,', '. El peso puro de geometría acumulada presionando hacia dentro,'],
        },
    },
};
