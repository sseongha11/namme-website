/**
 * Service areas — Derby and Derbyshire.
 *
 * This is the local SEO engine. Every successful builder site studied runs
 * location pages, because "loft conversion Derby" is where the commercial
 * intent sits — far more than on the generic service term.
 *
 * A warning that matters: thin, templated location pages differing only by town
 * name are treated as doorway pages and can be penalised. Each entry therefore
 * carries genuinely local detail — housing stock, the actual planning authority,
 * and real local constraints. Fill these in properly or drop the page.
 *
 * TODO: confirm the real coverage radius with Namme, and verify every planning
 * note against the current local plan before publishing. Planning policy moves.
 */

export type Area = {
  slug: string;
  name: string;
  postcodes: string[];
  council: string;
  /** What the housing stock is actually like — drives which services matter */
  housingStock: string;
  /** Local planning reality: conservation areas, WHS, Green Belt, common refusals */
  planningNotes: string;
  /** Services most relevant here, by slug */
  popularServices: string[];
  /** Project slugs completed in this area, if any */
  projectSlugs: string[];
};

export const areas: Area[] = [
  {
    slug: "derby-city",
    name: "Derby city",
    postcodes: ["DE1", "DE22", "DE23", "DE24"],
    council: "Derby City Council",
    housingStock:
      "Dense Victorian and Edwardian terraces through Normanton, Pear Tree and New Normanton, built for railway and factory workers. Many still have their original rear outrigger and an unconverted roof.",
    planningNotes:
      "Conservation areas at Friar Gate, Strutt’s Park, Little Chester and the Railway Conservation Area, where permitted development is restricted and materials are scrutinised. Outside them, most single-storey rear extensions and rear dormers proceed under permitted development.",
    popularServices: [
      "rear-extensions",
      "dormer-loft-conversions",
      "full-house-renovations",
    ],
    projectSlugs: ["normanton-rear-extension"],
  },
  {
    slug: "allestree",
    name: "Allestree",
    postcodes: ["DE22"],
    council: "Derby City Council",
    housingStock:
      "Predominantly post-war and 1960s–70s detached and semi-detached housing on generous plots with integral or attached garages. Wide frontages and side access make extending straightforward.",
    planningNotes:
      "Largely unconstrained, which makes hip-to-gable lofts and double-storey side extensions achievable under permitted development in many cases. Note the Derwent Valley Mills World Heritage Site buffer along the river to the east — schemes near it attract closer heritage scrutiny.",
    popularServices: [
      "double-storey-extensions",
      "hip-to-gable-loft-conversions",
      "kitchen-renovations",
    ],
    projectSlugs: ["allestree-double-storey"],
  },
  {
    slug: "mickleover",
    name: "Mickleover",
    postcodes: ["DE3"],
    council: "Derby City Council",
    housingStock:
      "1930s semis around the older village core, with substantial 1970s–2000s estate housing beyond it. Consistent plot widths and side access throughout.",
    planningNotes:
      "A small conservation area covers the historic village centre around the church; the surrounding estates are unconstrained. Some newer estates carry restrictive covenants on extensions — worth checking your deeds as well as the planning position.",
    popularServices: [
      "rear-extensions",
      "hip-to-gable-loft-conversions",
      "double-storey-extensions",
    ],
    projectSlugs: ["mickleover-dormer-loft"],
  },
  {
    slug: "littleover",
    name: "Littleover",
    postcodes: ["DE23"],
    council: "Derby City Council",
    housingStock:
      "Inter-war and 1950s semis with deep rear gardens, plus larger detached properties toward Heatherton and the older village. Deep plots make substantial rear extensions viable without crowding the garden.",
    planningNotes:
      "Conservation area around the old village on Constable Lane and the church. Elsewhere the main constraints are practical rather than policy — drainage runs and boundary distances rather than heritage.",
    popularServices: [
      "rear-extensions",
      "kitchen-renovations",
      "full-house-renovations",
    ],
    projectSlugs: ["littleover-kitchen-extension"],
  },
  {
    slug: "oakwood-chaddesden",
    name: "Oakwood & Chaddesden",
    postcodes: ["DE21"],
    council: "Derby City Council",
    housingStock:
      "Large 1980s–90s estates in Oakwood, older council-built and inter-war stock in Chaddesden. Trussed roofs are the norm in the newer estates, which changes how a loft conversion has to be engineered.",
    planningNotes:
      "Few heritage constraints. The recurring technical issue is modern trussed roof construction, which needs steel to remove the trusses — the single most common omission we see in cheaper loft quotes for this area.",
    popularServices: [
      "dormer-loft-conversions",
      "rear-extensions",
      "bathroom-renovations",
    ],
    projectSlugs: [],
  },
  {
    slug: "chellaston-melbourne",
    name: "Chellaston & Melbourne",
    postcodes: ["DE73"],
    council: "Derby City Council / South Derbyshire District Council",
    housingStock:
      "Modern estate housing in Chellaston; Georgian and older brick and stone properties in Melbourne village, a significant number of them listed.",
    planningNotes:
      "Melbourne has an extensive conservation area and a high concentration of listed buildings — expect listed building consent and a heritage statement for external work there. Chellaston is comparatively unconstrained. Note the boundary: the two sit under different planning authorities.",
    popularServices: [
      "full-house-renovations",
      "rear-extensions",
      "kitchen-renovations",
    ],
    projectSlugs: ["melbourne-listed-renovation"],
  },
  {
    slug: "belper-duffield",
    name: "Belper & Duffield",
    postcodes: ["DE56"],
    council: "Amber Valley Borough Council",
    housingStock:
      "Gritstone and brick millworkers' terraces in Belper — including the Strutt-built clusters — alongside larger Victorian villas and modern housing in Duffield.",
    planningNotes:
      "Belper sits inside the Derwent Valley Mills World Heritage Site, which is the most significant planning constraint in our whole coverage area. Alterations visible in the streetscape are assessed against the WHS management plan, and materials matter enormously. Do not assume permitted development here.",
    popularServices: [
      "full-house-renovations",
      "rear-extensions",
      "bathroom-renovations",
    ],
    projectSlugs: ["belper-whs-renovation"],
  },
  {
    slug: "ilkeston-long-eaton",
    name: "Ilkeston & Long Eaton",
    postcodes: ["DE7", "NG10"],
    council: "Erewash Borough Council",
    housingStock:
      "Victorian terraces from the lace and mining era, plus large inter-war and post-war estates. Long Eaton has a substantial stock of former lace factory conversions and terraces around them.",
    planningNotes:
      "The Nottingham–Derby Green Belt covers land between the two towns and materially restricts extension size on affected plots. Conservation areas cover parts of central Long Eaton. Within the built-up areas, permitted development generally applies as normal.",
    popularServices: [
      "rear-extensions",
      "dormer-loft-conversions",
      "kitchen-renovations",
    ],
    projectSlugs: [],
  },
  {
    slug: "ashbourne-derbyshire-dales",
    name: "Ashbourne & the Dales",
    postcodes: ["DE6", "DE4"],
    council: "Derbyshire Dales District Council",
    housingStock:
      "Limestone and gritstone cottages, Georgian townhouses in Ashbourne, and stone-built village properties throughout the surrounding parishes. Solid wall construction is the norm, which changes how insulation has to be approached.",
    planningNotes:
      "Parts of the district fall inside the Peak District National Park, which is a separate planning authority with markedly tighter policy on extension size and materials. Ashbourne itself has a large conservation area. Natural stone and lime mortar are usually required rather than preferred.",
    popularServices: [
      "full-house-renovations",
      "rear-extensions",
      "bathroom-renovations",
    ],
    projectSlugs: [],
  },
  {
    slug: "nottingham",
    name: "Nottingham",
    postcodes: ["NG1", "NG3", "NG5", "NG7", "NG8", "NG9"],
    council: "Nottingham City Council",
    housingStock:
      "Victorian and Edwardian terraces through Sherwood, Carrington and Forest Fields, larger villas in Mapperley Park, and extensive inter-war and post-war estates further out.",
    planningNotes:
      "Two things catch people out here. First, an Article 4 direction covers much of the city and removes permitted development rights for conversion to shared housing — relevant if you are extending with letting in mind. Second, Nottingham sits on sandstone riddled with historic caves, and in parts of the city a cave survey is needed before foundations are designed. We check both before quoting.",
    popularServices: [
      "rear-extensions",
      "dormer-loft-conversions",
      "full-house-renovations",
    ],
    projectSlugs: [],
  },
  {
    slug: "loughborough",
    name: "Loughborough",
    postcodes: ["LE11", "LE12"],
    council: "Charnwood Borough Council",
    housingStock:
      "Victorian terraces close to the town centre and the university, inter-war semis through Shelthorpe and Thorpe Acre, and newer estate housing on the edges.",
    planningNotes:
      "An Article 4 direction covers the streets around the university and removes permitted development rights for conversion to shared housing — worth knowing if the property is or has been a student let. Conservation areas cover the town centre and Queen's Park. Standard householder extensions elsewhere are generally straightforward.",
    popularServices: [
      "rear-extensions",
      "hip-to-gable-loft-conversions",
      "kitchen-renovations",
    ],
    projectSlugs: [],
  },
  {
    slug: "leicester",
    name: "Leicester",
    postcodes: ["LE1", "LE2", "LE3", "LE4", "LE5"],
    council: "Leicester City Council",
    housingStock:
      "Dense Victorian terraces across Highfields, Clarendon Park and Belgrave, larger Victorian and Edwardian houses in Stoneygate, and inter-war semis through Evington and Knighton.",
    planningNotes:
      "Stoneygate is one of the largest conservation areas in the country and materials are closely scrutinised there. Article 4 directions apply in several wards, chiefly around shared housing conversion. The terraced stock across Highfields and Clarendon Park suits side return and rear extensions, though party wall agreements are almost always required.",
    popularServices: [
      "side-return-extensions",
      "rear-extensions",
      "full-house-renovations",
    ],
    projectSlugs: [],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
