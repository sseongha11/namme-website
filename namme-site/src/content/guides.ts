/**
 * Cost guides and planning guides.
 *
 * These target research-stage searches — people who are 2–6 months away from
 * contacting anyone, which is where most of this market actually sits. The
 * guidance from every source studied is the same: explain what *drives* the
 * price rather than publishing an unhelpfully broad range. A guide that says
 * "£30,000–£120,000" and stops teaches the reader nothing and ranks for nothing.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string };

export type Guide = {
  slug: string;
  title: string;
  /** The search this is written to answer, stated plainly */
  question: string;
  category: "Costs" | "Planning" | "Process";
  updated: string;
  readingTime: string;
  summary: string;
  body: Block[];
  relatedServices: string[];
};

export const guides: Guide[] = [
  {
    slug: "how-much-does-a-driveway-cost",
    title: "How much does a new driveway cost?",
    question: "how much does a driveway cost uk block paving",
    category: "Costs",
    updated: "2026-07",
    readingTime: "6 min",
    summary:
      "Prices by surface type, why cheap drives sink, and when you need planning permission.",
    body: [
      {
        type: "p",
        text: "Driveway quotes vary more than almost any other job we price, and the reason is rarely the surface. Two quotes for the same block paving can be £4,000 apart because one includes digging out to 250mm and carting the spoil away, and the other means laying over what is already there.",
      },
      { type: "h2", text: "Cost by surface" },
      {
        type: "table",
        head: ["Surface", "Per m²", "Typical drive", "Life expectancy"],
        rows: [
          ["Gravel", "£45 – £75", "£2,800 – £4,500", "10+ yrs, topped up"],
          ["Tarmac", "£65 – £100", "£3,500 – £7,000", "15–20 yrs"],
          ["Block paving", "£90 – £140", "£5,500 – £11,000", "20–25 yrs"],
          ["Resin-bound", "£110 – £160", "£7,000 – £14,000", "15–20 yrs"],
        ],
      },
      {
        type: "p",
        text: "A typical Derby semi has a frontage of 35–50m². The totals above assume that size, a straightforward dig-out, and spoil removed from site. Note that resin-bound needs a solid base beneath it — tarmac or concrete — so a resin drive over bare ground is two jobs, not one.",
      },
      { type: "h2", text: "Why driveways fail" },
      {
        type: "p",
        text: "Almost every sunken drive we are called to replace failed for the same three reasons, in the same order.",
      },
      {
        type: "ul",
        items: [
          "Sub-base too shallow. A drive taking cars needs around 150mm of compacted MOT Type 1 under the surface, laid and whacked in layers rather than in one go — and more on soft or made ground.",
          "No edge restraint. Block paving spreads sideways under wheel loads unless the edge courses are haunched in concrete. Once it starts, the whole field of blocks loosens.",
          "Nowhere for water to go. On the clay around Derby, a surface fall into a border is not drainage. Water needs a soakaway or a channel drain connected to something.",
        ],
      },
      { type: "h2", text: "Planning permission and the 5m² rule" },
      {
        type: "p",
        text: "Since 2008 you have needed planning permission to lay more than 5m² of impermeable surfacing between the front of your house and the highway, if the water runs off onto that highway. You do not need it if the surface is permeable — gravel, permeable block paving, porous resin — or if run-off is directed to a soakaway, border or lawn within your own boundary.",
      },
      {
        type: "callout",
        title: "A dropped kerb is a separate application",
        text: "Creating or widening a vehicle crossing over the footway needs approval from the council's highways team, not planning. Budget £1,000–£2,500 for the works, expect several weeks, and get it agreed before the drive is laid — a beautiful driveway you cannot legally drive onto is an expensive lesson.",
      },
      { type: "h2", text: "What to check in a quote" },
      {
        type: "ul",
        items: [
          "Excavation depth, and whether spoil removal is included or extra",
          "Sub-base type and depth, compacted in layers",
          "How drainage is dealt with, in words, not 'adequate falls'",
          "Edge restraints haunched in concrete",
          "Whether the drive is permeable, or has permission",
          "Kiln-dried sand and a final compaction — and who comes back if it settles",
        ],
      },
    ],
    relatedServices: ["driveways", "landscape-gardening"],
  },
  {
    slug: "how-much-does-an-extension-cost",
    title: "How much does a house extension cost?",
    question: "how much does an extension cost uk 2026",
    category: "Costs",
    updated: "2026-07",
    readingTime: "8 min",
    summary:
      "Per-square-metre rates by extension type, plus the costs that sit outside the build figure.",
    body: [
      {
        type: "p",
        text: "Extension costs are usually quoted per square metre, which is a reasonable starting point and a poor finishing one. The rate covers the shell. A large share of what you will actually spend sits either side of it.",
      },
      { type: "h2", text: "Build cost by type" },
      {
        type: "table",
        head: ["Type", "Per m²", "Typical total", "Time on site"],
        rows: [
          ["Single-storey rear", "£1,700 – £2,300", "£32,000 – £62,000", "12–16 weeks"],
          ["Side return", "£2,000 – £2,600", "£38,000 – £75,000", "14–18 weeks"],
          ["Wrap-around", "£1,950 – £2,500", "£58,000 – £112,000", "18–24 weeks"],
          ["Double-storey", "£1,550 – £2,050", "£68,000 – £125,000", "20–28 weeks"],
        ],
      },
      {
        type: "p",
        text: "Note that double-storey is the cheapest per square metre and the most expensive overall. You build one set of foundations and one roof for two floors of space, which is why extending upwards at the same time as outwards is nearly always better value than returning to do it later.",
      },
      { type: "h2", text: "The costs outside the build figure" },
      {
        type: "ul",
        items: [
          "Architectural design: £1,900 – £8,500 depending on scale and iterations",
          "Structural engineer: £700 – £1,900",
          "Planning application fee: from £258 for a householder application",
          "Building Control: £500 – £1,200",
          "Party wall surveyor: £1,000 – £2,000 per neighbour where required",
          "Severn Trent build-over agreement: from £395 where you build near a public sewer",
          "Kitchen and appliances: £10,000 – £45,000, entirely specification-dependent",
          "VAT at 20% — check whether quotes you are comparing include it",
        ],
      },
      {
        type: "callout",
        title: "Add 10–15% contingency",
        text: "Not because builders are unreliable, but because nobody can see under your floor before the floor comes up. Rot, inadequate foundations and undocumented drainage are the three most common finds. A contingency you don’t spend is money you keep; a contingency you didn’t set aside is a stalled project.",
      },
      { type: "h2", text: "Where the money goes" },
      {
        type: "p",
        text: "On a typical £45,000 single-storey rear extension, roughly 20% goes on groundworks and foundations, 25% on structure and envelope, 15% on glazing, 20% on services and internal finishes, and the balance on preliminaries — scaffolding, skips, welfare and site management. Glazing is the line most likely to surprise you: a 5m sliding door set can exceed £12,000 on its own.",
      },
      { type: "h2", text: "Fixed price or cost-plus?" },
      {
        type: "p",
        text: "A fixed price transfers risk to the builder, who prices that risk in. Cost-plus is cheaper when everything goes well and uncapped when it doesn’t. For domestic work of this size, a fixed price against a fully detailed specification is almost always the right choice — but it is only as good as the specification, and a fixed price against a vague drawing is neither fixed nor a price.",
      },
    ],
    relatedServices: ["extensions", "kitchen-fitting"],
  },
  {
    slug: "do-i-need-planning-permission",
    title: "Do I need planning permission?",
    question: "do i need planning permission extension driveway wall fence",
    category: "Planning",
    updated: "2026-07",
    readingTime: "7 min",
    summary:
      "Extensions, driveways, walls, fences and render — what needs permission and what doesn’t.",
    body: [
      {
        type: "p",
        text: "For most of what we do, you don’t. Permitted development rights let you extend, pave, wall and render without a planning application, provided you stay inside a specific set of limits. The catch is that several common circumstances remove those rights entirely — and finding that out after you have paid for drawings is an expensive way to learn it.",
      },
      { type: "h2", text: "The quick answers" },
      {
        type: "table",
        head: ["Work", "Permission needed?"],
        rows: [
          ["Repairs, re-roofing like for like", "No"],
          ["Rendering a house", "No — unless listed, conservation or Article 4"],
          ["Driveway, permeable or drained to your own land", "No"],
          ["Driveway over 5m², impermeable, draining to the road", "Yes"],
          ["Dropped kerb", "Highways approval, not planning"],
          ["Garden wall or fence up to 2m (1m by a highway)", "No"],
          ["Patio, path, decking under 30cm high", "No"],
          ["Single-storey rear extension within the limits below", "No"],
        ],
      },
      { type: "h2", text: "Single-storey rear extension limits" },
      {
        type: "table",
        head: ["Property type", "Standard depth", "With prior approval"],
        rows: [
          ["Terraced or semi-detached", "3m", "6m"],
          ["Detached", "4m", "8m"],
        ],
      },
      {
        type: "p",
        text: "Height must not exceed 4m, and where the extension is within 2m of a boundary the eaves must not exceed 3m. The larger depths require the neighbour consultation scheme — you notify the council, they notify your neighbours, and if nobody objects within 21 days it proceeds.",
      },
      { type: "h2", text: "When permitted development does not apply" },
      {
        type: "ul",
        items: [
          "The building is listed — any external alteration needs listed building consent",
          "An Article 4 direction is in force, which councils use to withdraw permitted development in specific areas",
          "You are in a conservation area and the work involves side extensions or cladding",
          "The house is a flat or maisonette — permitted development rights do not apply at all",
          "The property was created through a change of use under permitted development",
          "Previous extensions have already used up the allowance — this is cumulative, including work done by previous owners",
        ],
      },
      {
        type: "callout",
        title: "Get a lawful development certificate anyway",
        text: "Even when you are confident the work is permitted development, apply for a certificate of lawfulness. It costs around £129 and takes about six weeks. Without it, you will be asked to prove the extension was lawful when you sell — and reconstructing that evidence years later, with a buyer’s solicitor waiting, is far worse than the six weeks.",
      },
      { type: "h2", text: "The 50% rule" },
      {
        type: "p",
        text: "No more than half the land around the original house may be covered by buildings. 'Original' means as it stood in 1948, or as first built if later — not as you bought it. Outbuildings and sheds count towards this.",
      },
      { type: "h2", text: "If you do need permission" },
      {
        type: "p",
        text: "A householder application is determined within eight weeks. Approval rates for well-prepared domestic applications are high; most refusals we see come from schemes that ignored published local guidance rather than from anything inherently unacceptable. Where a case is genuinely marginal, a pre-application enquiry costs a few hundred pounds and tells you the officer’s view before you commit to a full submission.",
      },
    ],
    relatedServices: ["extensions", "driveways", "landscape-gardening"],
  },
  {
    slug: "how-to-choose-a-builder",
    title: "How to choose a builder",
    question: "how to choose a builder uk checklist",
    category: "Process",
    updated: "2026-07",
    readingTime: "6 min",
    summary:
      "What to verify before signing, and the warning signs worth walking away from.",
    body: [
      {
        type: "p",
        text: "This guide will occasionally argue against hiring us, which is the only way a guide like this is worth reading. Use it on every builder you are considering, including this one.",
      },
      { type: "h2", text: "Verify before you shortlist" },
      {
        type: "ul",
        items: [
          "Companies House: check the company exists, how long it has traded, and whether previous companies at the same address were dissolved",
          "Public liability insurance: ask for the certificate, check the expiry date and that the cover is at least £2m",
          "Accreditations: verify membership directly on the FMB or TrustMark register rather than trusting a logo on a website",
          "Reviews: look for ones describing your project type specifically — a five-star average built on bathroom jobs tells you little about a mansard",
          "Ask to visit a current site, not just a finished one. How a site is run mid-build tells you more than the photographs",
        ],
      },
      { type: "h2", text: "Comparing quotes" },
      {
        type: "p",
        text: "Quotes are only comparable if they price the same specification. Before comparing, confirm each one includes: structural steel, building control fees, party wall costs, scaffolding, waste removal, making good, and VAT. A quote 20% below the others usually has three of these missing rather than a cheaper way of building.",
      },
      {
        type: "callout",
        title: "Warning signs",
        text: "A large deposit demanded up front. Cash-only pricing or a discount for paying without VAT. Pressure to decide this week. No written contract. An address that is a mail-forwarding service. Any one of these is reason enough to walk away.",
      },
      { type: "h2", text: "The contract" },
      {
        type: "p",
        text: "For domestic work, use a JCT Home Owner Contract or equivalent. It should define the specification, the programme, the staged payment schedule, the process for agreeing variations in writing, and the retention held until snagging is complete. Any builder reluctant to work under a written contract is telling you something useful.",
      },
      { type: "h2", text: "Payment structure" },
      {
        type: "p",
        text: "Payment should follow completed work, never precede it by much. A deposit covering ordered materials is reasonable; a deposit of 30% before anyone arrives is not. Retain around 5% for three to six months after completion to cover snagging — and expect a good builder to accept that without argument.",
      },
    ],
    relatedServices: ["extensions", "refurbishments", "roofing"],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
