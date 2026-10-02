/**
 * Italian text. See ../locale-text.ts for how the pieces are assembled.
 *
 * Agreement: summary nouns (summary.scale) are all feminine plural so the
 * adjectives can agree; title nouns are all masculine singular. Hue words are
 * nouns used as invariable colours ("color smeraldo"). Bridges and inflections
 * are prepositional so they fit any following subject. The coda's subjects
 * (l’immagine, la composizione, la struttura) are all feminine.
 */

import type { LocaleText } from '../locale-text.js';

export const it: LocaleText = {
    punctuation: { period: '.', space: ' ' },

    hues: [
        { max: 30, words: ['rubino', 'cremisi', 'carminio', 'scarlatto'] },
        { max: 60, words: ['ambra', 'oro', 'zafferano', 'topazio'] },
        { max: 90, words: ['chartreuse', 'citrino', 'peridoto', 'lime'] },
        { max: 150, words: ['smeraldo', 'giada', 'malachite', 'verderame'] },
        { max: 210, words: ['turchese', 'acquamarina', 'ottanio', 'ceruleo'] },
        { max: 270, words: ['cobalto', 'indaco', 'lapislazzuli', 'zaffiro'] },
        { max: 330, words: ['ametista', 'prugna', 'orchidea', 'malva'] },
        { max: 361, words: ['rubino', 'cremisi', 'carminio', 'scarlatto'] },
    ],

    title: {
        luminosity: {
            low: ['oscuro', 'sommesso', 'fioco', 'ombroso'],
            mid: ['raggiante', 'sereno', 'caldo', 'temperato'],
            high: ['luminoso', 'radioso', 'incandescente', 'sfolgorante'],
        },
        density: {
            low: ['rado', 'minimo', 'distillato', 'essenziale'],
            mid: ['equilibrato', 'strutturato', 'composto', 'misurato'],
            high: ['denso', 'stratificato', 'complesso', 'saturo'],
        },
        scale: {
            low: ['monumentale', 'grandioso', 'ampio', 'vasto'],
            mid: ['spaziale', 'dimensionale', 'stratificato', 'temperato'],
            high: ['atmosferico', 'particellare', 'granulare', 'disperso'],
        },
        templates: [
            w => `Interno ${w.hue()} ${w.luminosity()}`,
            w => `Interno ${w.density()} e ${w.luminosity()}`,
            w => `Campo ${w.hue()} ${w.density()}`,
            w => `Volume ${w.scale()} e ${w.luminosity()}`,
            w => `Spazio ${w.hue()} ${w.luminosity()}`,
            w => `Piano ${w.density()} e ${w.scale()}`,
            w => `Reticolo ${w.hue()} ${w.scale()}`,
            w => `Prisma ${w.hue()} ${w.luminosity()}`,
        ],
    },

    summary: {
        density: [
            /* sparse */ ['rade', 'isolate'],
            /* scattered */ ['sparse', 'diradate'],
            /* moderate */ ['moderate', 'misurate'],
            /* layered */ ['stratificate', 'sovrapposte'],
            /* dense */ ['dense', 'fitte'],
        ],
        faceting: [
            /* smooth */ ['lisce', 'fluide'],
            /* broad */ ['ampie', 'dai bordi morbidi'],
            /* mixed */ ['traslucide', 'miste'],
            /* faceted */ ['sfaccettate', 'cristalline'],
            /* sharp */ ['angolose', 'affilate'],
        ],
        scale: [
            /* slabs */ ['lastre', 'lamine'],
            /* planes */ ['piastre', 'superfici'],
            /* forms */ ['forme', 'sfaccettature'],
            /* fragments */ ['schegge', 'scaglie'],
            /* particles */ ['particelle', 'scintille'],
        ],
        arrangement: [
            /* chaotic-radial */ ['fluttuano liberamente', 'si disperdono senza ordine'],
            /* chaotic-organic */ ['si disperdono in ogni direzione', 'si sparpagliano caoticamente'],
            /* chaotic-orbital */ ['turbinano nel disordine', 'si disperdono turbolente'],
            /* loose-radial */ ['si irradiano liberamente', 'si allargano dal centro'],
            /* loose-organic */ ['vagano lungo percorsi organici', 'fluiscono liberamente'],
            /* loose-orbital */ ['spiraleggiano dolcemente', 'orbitano liberamente'],
            /* structured-radial */ ['emanano radialmente', 'si irradiano dal centro'],
            /* structured-organic */ ['seguono un flusso coerente', 'scorrono in formazione'],
            /* structured-orbital */ ['orbitano in archi', 'si avvolgono in fasce orbitali'],
        ],
        bloom: [
            /* tight */ ['in una luce concentrata', 'in una luce precisa'],
            /* contained */ ['con un bagliore contenuto', 'con una radianza raccolta'],
            /* soft */ ['con aloni morbidi', 'con un tenue bagliore'],
            /* spreading */ ['in una luce che si espande', 'con aloni luminosi'],
            /* atmospheric */ ['in un bagliore diffuso', 'in una foschia radiosa'],
        ],
        compose: p => `${p.nodeCount} punti luminosi ancorano ${p.scale} ${p.density} e ${p.faceting}, ${p.hue ? `color ${p.hue}` : 'senza colore'}, che ${p.arrangement}, ${p.bloom}.`,
    },

    scene: {
        luminosity: [
            // near-black
            [
                'Contro un’oscurità quasi totale, le più tenui tracce geometriche affiorano sulla soglia del visibile',
                'Dal nero impenetrabile emergono forme che portano una luce appena percettibile',
                'Nell’oscurità più profonda, le strutture esistono come poco più che l’idea di una geometria',
            ],
            // dark
            [
                'Un’oscurità profonda trattiene queste forme geometriche, ogni superficie una silenziosa affermazione contro il vuoto',
                'Dall’ombra profonda emergono forme che portano una propria, tenue luce interiore',
                'Strutture geometriche affiorano dall’ombra profonda, i loro spigoli unica prova della loro dimensione',
            ],
            // dim
            [
                'Un interno in penombra sospende queste forme in un crepuscolo quieto, le superfici che catturano luce residua',
                'Un’illuminazione sommessa rivela la geometria per sussurri tonali più che per dichiarazioni',
                'In una debole luce ambientale, i piani geometrici diventano visibili grazie a una lieve luminescenza propria',
            ],
            // moderate-low
            [
                'Una luce morbida e contemplativa rivela la geometria di questo spazio interno',
                'Un campo dolcemente illuminato tiene questi piani geometrici in una sospensione leggibile',
                'Un’illuminazione moderata riempie lo spazio, la geometria né nascosta né del tutto esposta',
            ],
            // moderate-high
            [
                'Una luminosità costante definisce ogni superficie geometrica con quieta chiarezza',
                'Una luce chiara riempie lo spazio, i piani traslucidi che rivelano appieno il loro carattere strutturale',
                'Le forme geometriche abitano un interno ben illuminato, ogni spigolo e superficie nitidamente articolati',
            ],
            // bright
            [
                'Una luce vivida si irradia da e attraverso ogni superficie geometrica con presenza energica',
                'Un’intensità luminosa illumina la struttura dall’interno, le superfici vive di radianza',
                'Le forme brillano di una notevole energia interna, la luce che preme verso l’esterno attraverso ogni piano',
            ],
            // blazing
            [
                'Una radianza intensa, quasi travolgente, inonda ogni superficie di questo interno geometrico',
                'Il massimo dell’energia luminosa satura il campo, la geometria che arde al limite della dissoluzione',
                'Un’intensità abbagliante avvolge la struttura, ogni piano fonte di una potenza radiante concentrata',
            ],
        ],
        bloom: [
            // tight
            [
                ', ogni punto di luce nettamente definito e precisamente contenuto',
                ', l’illuminazione trattenuta con precisione architettonica a ogni spigolo',
                ', una radianza concentrata senza alcuna diffusione atmosferica',
            ],
            /* 1 */ [', la luce raccolta vicino a ogni superficie in una radianza contenuta', ', tenui aloni appena visibili sugli spigoli più luminosi'],
            /* 2 */ [', modesti aloni che si estendono dai punti più luminosi', ', un bagliore sottile attorno alle superfici più luminose'],
            // moderate
            [
                ', aloni visibili che incorniciano ogni superficie geometrica',
                ', morbide aureole a segnare il confine tra forma e vuoto',
                ', la luce che si spinge nettamente oltre ogni spigolo',
            ],
            // 4
            [
                ', una luce gentile che emana ben oltre ogni superficie verso il buio circostante',
                ', il bagliore di ogni piano che raggiunge lo spazio attorno a sé',
            ],
            /* 5 */ [', aureole di luce che si allargano e si fondono tra superfici vicine', ', una radianza atmosferica che ammorbidisce ogni confine geometrico'],
            // atmospheric
            [
                ', la geometria sospesa nella propria atmosfera luminosa, dove i confini si dissolvono',
                ', un diffuso bagliore atmosferico che riempie lo spazio finché forme e luce diventano inseparabili',
                ', una radianza avvolgente in cui geometria ed emanazione si fondono in un campo continuo',
            ],
        ],
    },

    geometry: {
        form: [
            // sparse-compact
            [
                'Pochi piani geometrici decisi restano uniti in una stretta formazione cristallina',
                'Solo una manciata di superfici traslucide si raccoglie da vicino, ciascuna leggibile da sé',
            ],
            // sparse-moderate
            [
                'Radi piani traslucidi sono disposti con cura, a moderata distanza tra loro',
                'Un piccolo numero di forme geometriche si allontana a distanze leggibili',
            ],
            // sparse-shattered
            [
                'Schegge geometriche isolate si disperdono nel vasto spazio buio, ciascuna una presenza solitaria',
                'Pochi frammenti si spargono lontano, separati da distese di vuoto',
            ],
            // low-compact
            [
                'Una modesta raccolta di piani traslucidi si ripiega in modo compatto, uno sull’altro',
                'Diverse superfici geometriche si sovrappongono da vicino, mantenendo la coesione strutturale',
            ],
            // low-moderate
            [
                'Un piccolo insieme di piani traslucidi si distende con comoda spaziatura',
                'Le forme geometriche mantengono tra loro una distanza gentile, in una quieta dispersione',
            ],
            // low-shattered
            [
                'Frammenti geometrici sparsi si allargano nel campo in una dispersione crescente',
                'Una manciata di forme infrante viene scagliata verso l’esterno da un centro ricordato',
            ],
            // moderate-compact
            [
                'Un insieme consistente di piani traslucidi si accumula in una massa cristallina compatta',
                'Superfici geometriche si sovrappongono e si ripiegano l’una sull’altra in una formazione concentrata',
            ],
            // moderate-moderate
            [
                'Piani traslucidi si sovrappongono e si separano in una frammentazione misurata',
                'Una disposizione equilibrata di forme geometriche occupa lo spazio con una dispersione moderata',
            ],
            // moderate-shattered
            [
                'Forme geometriche si disperdono verso l’esterno in un’espansione crescente, lo spazio tra loro che si allarga',
                'Piani traslucidi si frammentano e si spargono, la struttura che si dissolve in distribuzione spaziale',
            ],
            // high-compact
            [
                'Molte superfici geometriche si affollano in un denso accumulo cristallino',
                'Spessi strati di piani traslucidi si compattano, le superfici quasi fuse insieme',
            ],
            // high-moderate
            [
                'Molti piani sovrapposti si stratificano e si frammentano, e l’accumulo crea ricchezza visiva',
                'Una geometria densa riempie il campo di superfici traslucide a distanze diverse',
            ],
            // high-shattered
            [
                'Una moltitudine di schegge geometriche si disperde in modo esplosivo, riempiendo lo spazio di frammenti sparsi',
                'Centinaia di frammenti traslucidi si spargono in ogni direzione, in una dispersione massima',
            ],
            // dense-compact
            [
                'Un’immensa concentrazione di superfici geometriche si compatta in una solida massa cristallina',
                'Innumerevoli piani traslucidi si comprimono così fitti da sfiorare l’opacità',
            ],
            // dense-moderate
            [
                'Una vasta popolazione di frammenti geometrici riempie lo spazio, sovrapponendosi a ogni profondità',
                'Il campo brulica di superfici traslucide, ciascuna che vela in parte quelle retrostanti',
            ],
            // dense-shattered
            [
                'Uno sciame travolgente di schegge geometriche esplode verso l’esterno, ogni frammento una traiettoria a sé',
                'Centinaia e centinaia di particelle traslucide si disperdono in ogni direzione immaginabile',
            ],
        ],
        faceting: [
            /* smooth */ [', le loro superfici lisce come seta e curvate senza interruzione', ', con ampi pannelli fluidi e bordi morbidi'],
            // mostly smooth
            [
                ', superfici per lo più lisce, con occasionali interruzioni angolose',
                ', ampi pannelli che si fondono con sottili accenti sfaccettati',
            ],
            // mixed
            [
                ', superfici che alternano in egual misura pannelli lisci e facce angolose',
                ', un intreccio di curve fluide e spigoli cristallini',
            ],
            // faceted
            [
                ', le loro facce nettamente sfaccettate, dal deciso carattere cristallino',
                ', superfici angolose che catturano la luce secondo angoli geometrici distinti',
            ],
            // razor-sharp
            [
                ', ogni superficie una faccia di cristallo affilata come un rasoio, di massima precisione angolare',
                ', il tutto irto di una geometria angolosa e serrata e di spigoli cristallini duri',
            ],
        ],
        spatial: [
            // chaotic-radial
            [
                'La disposizione non segue alcun ordine leggibile, i frammenti che vagano senza allineamento.',
                'Nessun principio ordinatore governa la dispersione — la geometria si sparge liberamente.',
            ],
            // chaotic-organic
            [
                'I piani geometrici si disperdono in ogni direzione, senza un orientamento preferito.',
                'Le forme si sparpagliano con libertà entropica, ogni elemento in cerca della propria traiettoria.',
            ],
            // chaotic-orbital
            [
                'Una tempesta turbolenta di geometria travolge con il disordine ogni struttura orbitale.',
                'Le correnti orbitali si avvertono appena sotto il caos degli elementi sparsi.',
            ],
            // loose-radial
            [
                'Le forme si irradiano liberamente dall’interno, l’accenno di un’esplosione stellare seguito solo in parte.',
                'Una rilassata tendenza radiale organizza le forme senza insistervi.',
            ],
            // loose-organic
            [
                'La geometria si organizza liberamente attorno a correnti organiche, una struttura presente ma senza fretta.',
                'Un dolce flusso organico dà alla disposizione un senso di direzione senza rigidità.',
            ],
            // loose-orbital
            [
                'Gli elementi vagano lungo orbite lasche, avvolgendosi dolcemente a spirale senza stretta aderenza.',
                'Una morbida tendenza a spirale porta le forme in una lenta deriva circolare.',
            ],
            // structured-radial
            [
                'Elementi ordinati emanano radialmente, un’esplosione di piani che divergono dal centro.',
                'Una precisa simmetria radiale governa la disposizione, ogni forma allineata al centro.',
            ],
            // structured-organic
            [
                'Le forme seguono un andamento coerente, creando una visibile struttura direzionale.',
                'Una corrente organica leggibile porta ogni elemento nella stessa direzione deliberata.',
            ],
            // structured-orbital
            [
                'Fasce orbitali avvolgono la forma, archi di geometria che girano a spirale con disciplina architettonica.',
                'Traiettorie orbitali concentriche portano gli elementi in una disciplinata formazione a spirale.',
            ],
        ],
        division: [
            /* single core */ [' Un unico nucleo unificato ancora l’intera composizione.', ' Tutta la geometria converge verso un solo centro luminoso.'],
            /* none */ ['', ''],
            // three lobes
            [
                ' Tre nuclei luminosi dividono la forma, ciascuno un distinto centro di gravità.',
                ' La struttura si divide in tre lobi distinti di attività geometrica.',
            ],
        ],
    },

    color: {
        phrase: [
            // achromatic-mono
            [
                'Una struttura puramente acromatica, in argento e bianco, pervade la composizione, geometria senza identità cromatica.',
                'Le forme non hanno colore — solo gradazioni di argento luminoso, perla e ombra.',
            ],
            // achromatic-ranged
            [
                'Una geometria quasi incolore porta lievi variazioni spettrali, toni fantasma appena distinguibili dal bianco.',
                'Sottili tracce spettrali infestano le superfici acromatiche, il più lieve sussurro di colore prismatico.',
            ],
            // achromatic-prismatic
            [
                'Tenui fantasmi d’arcobaleno abitano forme acromatiche, tracce spettrali che affiorano e si dissolvono su una geometria neutra.',
                'Delicate rifrazioni prismatiche attraversano piani altrimenti incolori, come luce attraverso un vetro antico.',
            ],
            // muted-mono
            [
                'Una tinta {color} smorzata pervade la composizione, evocando una superficie invecchiata più che una luce emessa.',
                'Un tono {color} quieto e desaturato attraversa ogni piano, suggerendo una patina più che un’illuminazione.',
            ],
            // muted-ranged
            [
                'Sfumature {color} smorzate variano sottilmente lungo una tavolozza stretta e desaturata, evocando il ricordo più che la presenza.',
                'Uno spettro {color} contenuto si muove quieto nella geometria, colori sentiti più che visti.',
            ],
            // muted-prismatic
            [
                'Tinte spettrali sbiadite attraversano la geometria come luce attraverso un vecchio vetro, smorzate e atmosferiche.',
                'Un arcobaleno desaturato fluttua tra le forme, ogni tinta presente ma nessuna che si imponga.',
            ],
            // vivid-mono
            [
                'Una tinta {color} intensa satura ogni superficie con un’identità cromatica audace e singolare.',
                'Il colore {color} domina completamente — un’affermazione cromatica concentrata e incrollabile su ogni piano.',
            ],
            // vivid-ranged
            [
                'Un ricco tono {color} domina, con accenti vividi di tinte vicine che aggiungono profondità e complessità cromatica.',
                'Un tono {color} saturo ancora la tavolozza, mentre lunghezze d’onda vicine introducono variazioni armoniche.',
            ],
            // vivid-prismatic
            [
                'Un pieno colore prismatico inonda la geometria, ogni tinta vivida e luminosamente presente.',
                'L’intero spettro visibile si irradia attraverso le forme, un’esplosione prismatica di colore saturo.',
            ],
        ],
        lightPoints: [
            // tight
            [
                'Nella struttura, {N} punti di luce bianca appaiono come precisi ancoraggi luminosi, ciascuno nettamente definito contro la geometria.',
                '{N} punti di luce concentrata punteggiano la composizione come spilli brillanti che tengono ferma la struttura.',
            ],
            // contained
            [
                '{N} punti di luce sono sparsi nella geometria, ciascuno circondato da un piccolo alone contenuto.',
                'Attraverso la struttura, {N} punti luminosi brillano di una radianza trattenuta, la loro luce che resta vicina.',
            ],
            // moderate
            [
                '{N} punti luminosi si spargono nella geometria come stelle in una costellazione, i loro aloni dolcemente visibili.',
                'Fluttuando tra i piani, {N} sfere di luce bianca creano una dolce distribuzione stellare.',
            ],
            // spreading
            [
                '{N} punti di luce si irradiano attraverso i piani illuminati, i loro aloni che si fondono dove si sovrappongono.',
                '{N} sfere luminose si disperdono nella struttura, ciascuna proiettando luce visibile sulla geometria circostante.',
            ],
            // atmospheric
            [
                '{N} punti di luce bianca si diffondono ampiamente nella composizione, ogni sfera che si dissolve in radianza atmosferica.',
                '{N} sorgenti luminose si spargono come stelle attratte l’una verso l’altra, e la loro radianza combinata crea un campo di luce continuo.',
            ],
        ],
    },

    coda: {
        arrangement: [
            // mineral
            [
                'L’immagine evoca una formazione minerale colta nel mezzo della cristallizzazione',
                'La composizione suggerisce una geode vista dall’interno',
                'La struttura ricorda una cattedrale minerale, antica e immobile',
            ],
            // architectural
            [
                'L’immagine evoca un interno visto da dentro — uno spazio che contiene ed è contenuto',
                'La composizione suggerisce un’architettura sospesa nel pensiero',
                'La struttura ricorda una stanza fatta di luce, con pareti che si dissolvono in geometria',
            ],
            // sanctuary
            [
                'L’immagine evoca un santuario costruito di pura geometria, un luogo di quieta intenzione',
                'La composizione suggerisce un reliquiario che custodisce luce anziché ossa',
                'La struttura ricorda un altare di piani traslucidi, uno scopo senza liturgia',
            ],
            // organic
            [
                'L’immagine evoca un organismo bioluminescente, vivo a suo modo, in silenzio',
                'La composizione suggerisce una struttura vivente, che cresce e si riorienta',
                'La struttura ricorda corallo o micelio, un’intelligenza organica in forma geometrica',
            ],
            // aquatic
            [
                'L’immagine evoca una corrente resa visibile, una dinamica dei fluidi congelata nel cristallo',
                'La composizione suggerisce acqua cristallizzata nell’istante del movimento',
                'La struttura ricorda un’onda oceanica resa in geometria traslucida, perennemente sul punto di frangersi',
            ],
            // mechanical
            [
                'L’immagine evoca un meccanismo a orologeria ridotto alla sua geometria essenziale',
                'La composizione suggerisce un motore di luce, ogni arco un trasferimento di energia',
                'La struttura ricorda un giroscopio stretto tra forze opposte, la rotazione trattenuta in sospensione',
            ],
            // storm
            [
                'L’immagine evoca un sistema temporalesco reso in astrazione geometrica',
                'La composizione suggerisce l’occhio di una turbolenza, l’energia che si irradia verso l’esterno',
                'La struttura ricorda un fulmine catturato nel cristallo — energia che cerca ogni percorso possibile',
            ],
            // explosion
            [
                'L’immagine evoca un’esplosione congelata nel suo istante più bello',
                'La composizione suggerisce schegge che hanno scelto di diventare architettura',
                'La struttura ricorda una detonazione resa in vetrata, la violenza divenuta quiete',
            ],
            // cosmic
            [
                'L’immagine evoca una galassia in miniatura, forze gravitazionali rese come piani geometrici',
                'La composizione suggerisce una supernova congelata nell’istante dell’espansione',
                'La struttura ricorda la nascita di una stella, materia ed energia ancora indecise su cosa diventare',
            ],
        ],
        structure: [
            /* silken */ [', la sua geometria tessuta di seta traslucida', ', superfici drappeggiate più che costruite'],
            /* folded */ [', costruita con piani di luce piegati con cura', ', i suoi strati impilati con quieto intento architettonico'],
            /* woven */ [', i suoi piani intrecciati come trama e ordito', ', una geometria stratificata con la pazienza del sedimento'],
            // creased
            [
                ', le sue superfici increspate e pieghettate con precisione angolare',
                ', una geometria piegata lungo linee nette e deliberate',
            ],
            /* faceted */ [', intagliata in un cristallo fratturato', ', le sue facce che riflettono la luce secondo angoli geometrici distinti'],
            // carved
            [
                ', scolpita nella luce solida con l’intenzione affilata di uno scalpello',
                ', le sue facce spezzate lungo faglie di forza luminosa',
            ],
            // shattered
            [
                ', frantumata in frammenti cristallini che mantengono ancora la formazione',
                ', scheggiata in una costellazione di detriti cristallini',
            ],
            /* crystalline */ [', ogni spigolo una lama di radianza cristallizzata', ', le sue superfici tassellate con precisione minerale'],
            // jagged
            [
                ', irta di bordi frastagliati come una struttura forgiata nella violenza',
                ', ogni superficie un filo seghettato, una geometria nata dalla rottura',
            ],
        ],
        bridge: [
            /* earth × cold */ ['. In un’immobilità di tomba,', '. Sotto un sigillo di silenzio,'],
            /* earth × neutral */ ['. Nel riposo della propria gravità,', '. Sotto il peso di una massa silenziosa,'],
            /* earth × hot */ ['. Dal profondo della pietra,', '. Nel calore che sale dal minerale antico,'],
            /* life × cold */ ['. In letargo sotto la brina,', '. In una vita sospesa, in attesa del disgelo,'],
            /* life × neutral */ ['. Al ritmo di un respiro lento,', '. Al passo della geologia,'],
            /* life × hot */ ['. In un’urgenza biologica,', '. Nel calore del proprio metabolismo,'],
            /* cosmos × cold */ ['. Nel freddo tra le stelle,', '. Nel vuoto dello spazio profondo,'],
            /* cosmos × neutral */ ['. Nel silenzio dell’orbita,', '. Al ritmo di forze più antiche della luce,'],
            /* cosmos × hot */ ['. Nel cuore della formazione,', '. Sotto la pressione del proprio collasso,'],
        ],
        detail: [
            // frozen
            [
                'Custodisce un’immobilità glaciale e perfetta — un’architettura che non ha mai conosciuto il movimento.',
                'La scena porta il silenzio del ghiaccio profondo, una geometria conservata allo zero assoluto.',
            ],
            // cool
            [
                'Una quiete fresca e contemplativa pervade la scena, come osservata nel crepuscolo.',
                'L’atmosfera evoca l’imbrunire — l’ultima luce trattenuta in sospensione geometrica.',
            ],
            // misty
            [
                'L’aria stessa sembra trattenere il respiro, la luce che arriva attraverso la distanza e la nebbia.',
                'Una foschia liminale ammorbidisce ogni spigolo, la scena sospesa tra visibilità e sogno.',
            ],
            // neutral
            [
                'Il clima è di quieto equilibrio, né caldo né freddo, una geometria in pace con se stessa.',
                'Una calma misurata e neutra tiene la composizione in un equilibrio meditato.',
            ],
            // warm
            [
                'Il calore si irradia dall’interno, la geometria viva di un fuoco interiore.',
                'La scena risplende del calore di qualcosa tenuto vicino a lungo, la luce come tenerezza.',
            ],
            // bright
            [
                'La luce preme verso l’esterno da ogni superficie, la struttura luminosa di una quieta convinzione.',
                'La geometria porta con sé la propria luce del giorno, luminosa senza fonte, calda senza calore.',
            ],
            // radiant
            [
                'Un’energia radiante pulsa attraverso la struttura, ogni superficie un canale di splendore concentrato.',
                'La geometria arde di un’intensità vivida, la struttura trasformata in puro evento luminoso.',
            ],
            // molten
            [
                'La struttura brucia di una ferocia incandescente, una geometria al limite della propria trasformazione.',
                'Tutto è fuso — le forme portano l’energia del proprio divenire, la luce come origine.',
            ],
            // burning
            [
                'La scena ha oltrepassato l’illuminazione per farsi pura radianza, la geometria divenuta fuoco.',
                'La luce ha sostituito del tutto la materia — ciò che resta è il ricordo di una struttura, in fiamme.',
            ],
        ],
        inflection: {
            darkBloom: ['. Splendendo dalla propria oscurità come una creatura degli abissi,', '. Con una luce che giunge non dall’esterno ma da un punto dentro la geometria,'],
            darkJewel: ['. Come uno scrigno prezioso, visibile solo a chi guarda da vicino,', '. In un buio che va cercato più che guardato,'],
            chaosStorm: ['. Ogni frammento fedele alla propria traiettoria, la struttura abbandonata al vento,', '. In un ordine infranto oltre ogni riconoscimento,'],
            sparseOrder: ['. Ogni elemento un’isola di intenzione in un mare di vuoto,', '. Con così poche forme, ciascuna posta con assoluta certezza,'],
            vividMono: ['. In un colore così concentrato da farsi materia, non semplice qualità,', '. Con un’unica tinta portata all’intensità di una convinzione,'],
            denseChaos: ['. In un campo di detriti dove il disegno cede alla pura quantità,', '. Con tanti frammenti che il caos stesso diventa trama,'],
            coherenceHigh: ['. Ogni elemento obbediente a un’unica volontà architettonica,', '. Sotto l’autorità cristallina della struttura,'],
            coherenceLow: ['. In un’entropia dove l’ordine è un ricordo lontano,', '. In un caos che disperde ogni piano oltre la portata di qualsiasi disegno,'],
            luminosityLow: ['. In un’oscurità quasi totale,', '. Sulla soglia stessa della percezione,'],
            bloomHigh: ['. Dissolvendosi nella propria atmosfera,', '. In una fusione di luce e forma in radianza continua,'],
            densityHigh: ['. Sotto il peso della propria abbondanza,', '. Sotto la pressione di una geometria accumulata,'],
        },
    },
};
