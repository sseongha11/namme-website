/**
 * Print and send kit — business card, leaflet, quotation, invoice.
 *
 * One script generates everything, so the details that must never disagree —
 * phone number, email, the trades list, the sentence off the business card —
 * come from one place. Change them here, run `node build.mjs`, and every
 * document updates together.
 *
 * Outputs into this folder:
 *   business-card.html / .pdf        two sides, 85×55mm with 3mm bleed
 *   business-card-front.png / -back  for WhatsApp, email signatures, socials
 *   leaflet.html / .pdf / .png       one A4 page to send to a customer
 *   quotation.html / .pdf            fill in on screen, print or save as PDF
 *   invoice.html / .pdf              same
 *
 * Requires: node, and Google Chrome installed (used headless to render).
 * Run:  node docs/templates/build.mjs
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import QRCode from "qrcode";

const HERE = dirname(fileURLToPath(import.meta.url));
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/* ── the business ─────────────────────────────────────────── */

const N = {
  name: "Namme",
  legalName: "Namme Ltd",
  // Straight off the original business card. Keep this wording.
  card: "A small, local, friendly, Derby based, general building company. Providing a quality and reliable service at an affordable price.",
  line1: "A small, local, friendly, Derby based,",
  line2: "general building company.",
  line3: "Providing a quality and reliable service at an affordable price.",
  callToAction: "Call your local trader now for a free, no obligation quote",
  phone: "07424 662851",
  phoneHref: "tel:+447424662851",
  whatsapp: "wa.me/447424662851",
  email: "naeemhara1971@gmail.com",
  site: "namme-site.vercel.app",
  siteUrl: "https://namme-site.vercel.app",
  base: "Derby DE22 3QQ",
  hours: [
    ["Monday – Thursday", "8:00 – 18:00"],
    ["Friday", "Closed"],
    ["Saturday – Sunday", "9:00 – 16:00"],
  ],
  trades: [
    "Brickwork",
    "Landscape gardening",
    "Extensions",
    "Driveways",
    "Rendering",
    "Refurbishments",
    "Roofing",
    "Tiling",
    "Bathrooms",
    "Painting & decorating",
    "Kitchen fitting",
  ],
  areas:
    "Derby · Allestree · Mickleover · Littleover · Oakwood & Chaddesden · Chellaston & Melbourne · Belper & Duffield · Ilkeston & Long Eaton · Ashbourne · Nottingham · Loughborough · Leicester",
  /**
   * Arabic card. The site's own /ar page is the authority for this wording —
   * keep the two in step. "Namme" stays in Latin script, as it does on the
   * site: that is how a customer meets the name on paperwork and on the van.
   * Numbers stay in Western digits, the norm for UK-facing Arabic.
   */
  ar: {
    role: "شركة بناء عامة · ديربي",
    claim: "شركة بناء عامة صغيرة، محلية وودودة، مقرّها ديربي.",
    claimBold: "نقدّم خدمة جيدة وموثوقة بسعر معقول.",
    cta: "عرض سعر مجاني · بدون أي التزام",
    whatsapp: "واتساب",
    qrCap: "أعمالنا",
    siteUrl: "https://namme-site.vercel.app/ar",
    site: "namme-site.vercel.app/ar",
    base: "ديربي DE22 3QQ",
    trades: [
      "أعمال الطوب",
      "تنسيق الحدائق",
      "التوسعات",
      "ممرات السيارات",
      "التلبيس الخارجي",
      "التجديدات",
      "الأسقف",
      "التبليط",
      "الحمّامات",
      "الدهان والديكور",
      "تركيب المطابخ",
    ],
  },

  promises: [
    ["Free written quotes", "We come out, look at the job and put the price in writing. No charge, no obligation."],
    ["No job too small", "A day’s tiling and a full extension get quoted the same way and turned up for on the day we said."],
    ["You pay for finished work", "Never large sums up front. Any deposit covers materials, and never more than they cost."],
    ["Nothing you haven’t agreed", "If we find something underneath, you see it and get the price before we touch it."],
  ],
};

/* ── brand ────────────────────────────────────────────────── */

const C = {
  clay: "#b4552f",
  clayDark: "#8d4023",
  ink: "#12161a",
  inkSoft: "#4a5157",
  inkMuted: "#7c848b",
  paper: "#faf8f4",
  paper2: "#f2eee6",
  line: "#ded7cb",
  lineStrong: "#c6bdae",
};

const FONT =
  '"Instrument Sans", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

/** Loaded when online; falls back to the system stack when not. */
const WEBFONT = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">`;

/** Instrument Sans has no Arabic; IBM Plex Sans Arabic is what the site uses. */
const FONT_AR =
  '"IBM Plex Sans Arabic", "Geeza Pro", "Noto Naskh Arabic", sans-serif';

/** The site's monogram: an N whose diagonal doubles as a roof pitch. */
const mark = (size, colour) => `<svg viewBox="0 0 40 40" fill="none"
  width="${size}" height="${size}" style="display:block">
  <path d="M6 34.5V15.2L20 5.5L34 15.2V34.5" stroke="${colour}" stroke-width="3"
        stroke-linejoin="miter" stroke-linecap="square"/>
  <path d="M6 15.2L34 34.5" stroke="${colour}" stroke-width="3" stroke-linecap="square"/>
</svg>`;

/* ── QR ───────────────────────────────────────────────────── */

/**
 * Rendered as inline SVG rather than a PNG so it stays crisp at any size and
 * the HTML file works offline with nothing to load. Error correction is set to
 * M: enough redundancy to survive a scuffed printed card, without making the
 * modules so small that a phone camera struggles.
 */
async function qr(colour = C.ink, url = N.siteUrl) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 0,
    color: { dark: colour, light: "#0000" },
  });
  return svg.replace("<svg", '<svg preserveAspectRatio="xMidYMid meet"');
}

/* ── shared document chrome ───────────────────────────────── */

const baseCss = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: ${FONT};
    color: ${C.ink};
    background: #e9e6e0;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  .sheet { background: ${C.paper}; position: relative; overflow: hidden; }
  @media screen {
    body { padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 24px; }
    .sheet { box-shadow: 0 18px 50px -20px rgba(18,22,26,.45); }
    .hint {
      font-size: 13px; line-height: 1.6; color: #3f464c; background: #fffbe8;
      border: 1px solid #e5d9a8; padding: 14px 18px; max-width: 700px; border-radius: 4px;
    }
    .hint b { color: ${C.clayDark}; }
    [contenteditable]:hover { background: #fff6e9; }
    [contenteditable]:focus { background: #fff2dd; outline: 2px solid ${C.clay}; outline-offset: 2px; }
  }
  /* Screenshot mode: the sheet alone, exactly its own size, nothing around it. */
  body.shot { padding: 0 !important; display: block !important; background: #fff !important;
              overflow: hidden !important; }
  body.shot .sheet { box-shadow: none !important; margin: 0 !important; }
  /* Cards keep their 3mm bleed for print; a screenshot shows the trimmed card. */
  body.shot .card-sheet { padding: 0 !important; width: 85mm !important; height: 55mm !important; }
  @media print {
    body { background: none; padding: 0; display: block; }
    .sheet { box-shadow: none; page-break-after: always; }
    .sheet:last-of-type { page-break-after: auto; }
    .hint { display: none !important; }
  }
`;

const doc = ({ title, css, body, pageCss }) => `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
${WEBFONT}
<style>${pageCss}${baseCss}${css}</style>
</head>
<body>
${body}
</body>
</html>`;

/* ── 1. business card ─────────────────────────────────────── */

async function businessCard({ lang = "en" } = {}) {
  const arabic = lang === "ar";

  // The Arabic card's code goes to the Arabic page — sending an Arabic-speaking
  // customer to the English site would waste the one thing the card is for.
  const code = await qr(C.ink, arabic ? N.ar.siteUrl : N.siteUrl);

  // 85×55mm trimmed, 3mm bleed, single-sided — everything on one face.
  const pageCss = `@page { size: 91mm 61mm; margin: 0; }`;

  const ink = "#14181c";
  const cream = "#f4f0e8";

  const css = `
    .sheet { width: 91mm; height: 61mm; padding: 3mm; background: ${ink}; }
    .card { width: 85mm; height: 55mm; padding: 4.6mm 5.2mm; position: relative;
            display: flex; flex-direction: column; background: ${ink};
            color: ${cream}; overflow: hidden;
            ${arabic ? `font-family: ${FONT_AR}; direction: rtl;` : ""} }
    /* Latin runs — the name, the number, the address — stay left-to-right
       inside a right-to-left card, or the punctuation lands on the wrong end. */
    .ltr { direction: ltr; unicode-bidi: isolate; display: inline-block;
           font-family: ${FONT}; }

    /* Hairline keyline inset from the trim: the detail that separates a card
       that was designed from one that was filled in. */
    .card::before { content: ""; position: absolute; inset: 2.2mm;
                    border: .5pt solid rgba(180,85,47,.55); pointer-events: none; }

    .lockup { display: flex; align-items: center; gap: 2.4mm; }
    .wordmark { font-size: 13.5pt; font-weight: 500; letter-spacing: .2em;
                text-transform: uppercase; line-height: 1; color: ${cream}; }
    .role { font-size: ${arabic ? "4.7pt" : "4.4pt"};
            letter-spacing: ${arabic ? "0" : ".2em"};
            text-transform: ${arabic ? "none" : "uppercase"};
            color: ${C.clay}; font-weight: 600; margin-top: 1.4mm; }
    .claim { font-size: ${arabic ? "5.3pt" : "5.3pt"}; line-height: ${arabic ? "1.6" : "1.6"};
             color: rgba(244,240,232,.72); margin: ${arabic ? "2.3mm" : "2.8mm"} 0 0;
             max-width: 66mm; }
    .claim b { color: ${cream}; font-weight: 600; }

    .trades { font-size: ${arabic ? "4.6pt" : "4.5pt"}; line-height: ${arabic ? "1.7" : "1.7"};
              color: rgba(244,240,232,.48); margin: ${arabic ? "2.1mm" : "2.6mm"} 0 0;
              letter-spacing: ${arabic ? "0" : ".02em"}; }

    /* Contact and QR share the bottom band: the customer looks for the number
       and the code in the same place, and it balances the weight of the
       lockup above. */
    .contact { margin-top: auto; display: grid; grid-template-columns: minmax(0, 1fr) 14mm;
               gap: 4mm; align-items: end; padding-top: 2.6mm;
               border-top: .5pt solid rgba(244,240,232,.18); }
    .cta { font-size: ${arabic ? "4.7pt" : "4.4pt"};
           letter-spacing: ${arabic ? "0" : ".16em"};
           text-transform: ${arabic ? "none" : "uppercase"};
           color: ${C.clay}; font-weight: 600; }
    .big { font-size: 13pt; font-weight: 600; letter-spacing: -.01em;
           color: ${cream}; line-height: 1; margin-top: 1.2mm; }
    .sub { font-size: ${arabic ? "4.9pt" : "5pt"}; line-height: ${arabic ? "1.75" : "1.75"};
           color: rgba(244,240,232,.62); margin-top: 1.4mm; white-space: nowrap; }
    .sub b { color: ${C.clay}; font-weight: 600; }

    /* Cream tile, sized so the code keeps a quiet zone on all four sides. */
    .qr-tile { width: 14mm; height: 14mm; background: ${cream}; padding: 1mm; }
    .qr { width: 100%; height: 100%; }
    .qr-cap { font-size: ${arabic ? "4.8pt" : "4.2pt"}; letter-spacing: .04em; color: ${C.clay};
              text-align: center; margin-top: 1.2mm; font-weight: 600;
              white-space: nowrap; }
  `;

  const body = arabic
    ? `
<p class="hint" dir="ltr"><b>Arabic business card.</b> Same card, right to left,
with the QR code pointing at the Arabic page of the site rather than the English
one. Print <b>business-card-ar.pdf</b>; send <b>business-card-ar.png</b>.</p>

<div class="sheet card-sheet"><div class="card">
  <div class="lockup">
    ${mark("7mm", C.clay)}
    <div>
      <div class="wordmark ltr">${N.name}</div>
      <div class="role">${N.ar.role}</div>
    </div>
  </div>

  <p class="claim">${N.ar.claim}<br><b>${N.ar.claimBold}</b></p>

  <p class="trades">${N.ar.trades.join(" · ")}</p>

  <div class="contact">
    <div>
      <div class="cta">${N.ar.cta}</div>
      <div class="big ltr">${N.phone}</div>
      <div class="sub">
        ${N.ar.whatsapp} · <span class="ltr">${N.email}</span><br>
        <b class="ltr">${N.ar.site}</b> · ${N.ar.base}
      </div>
    </div>
    <div>
      <div class="qr-tile"><div class="qr">${code}</div></div>
      <div class="qr-cap">${N.ar.qrCap}</div>
    </div>
  </div>
</div></div>`
    : `
<p class="hint"><b>Business card — one side, everything on it.</b> Send
<b>business-card.pdf</b> to a printer: 85×55mm with 3mm bleed, single-sided.
On dark stock ask for matt laminate, which is what makes this finish feel
expensive rather than merely dark. <b>business-card.png</b> is the one to send a
customer on WhatsApp or put in an email signature.</p>

<div class="sheet card-sheet"><div class="card">
  <div class="lockup">
    ${mark("7mm", C.clay)}
    <div>
      <div class="wordmark">${N.name}</div>
      <div class="role">General building · Derby</div>
    </div>
  </div>

  <p class="claim">${N.line1} ${N.line2}<br>
    <b>Providing a quality and reliable service at an affordable price.</b></p>

  <p class="trades">${N.trades.join(" · ")}</p>

  <div class="contact">
    <div>
      <div class="cta">Free · No obligation quote</div>
      <div class="big">${N.phone}</div>
      <div class="sub">
        WhatsApp welcome · ${N.email}<br>
        <b>${N.site}</b> · ${N.base}
      </div>
    </div>
    <div>
      <div class="qr-tile"><div class="qr">${code}</div></div>
      <div class="qr-cap">Our work</div>
    </div>
  </div>
</div></div>`;

  return doc({
    title: `${N.name} — business card${arabic ? " (Arabic)" : ""}`,
    css,
    body,
    pageCss,
  });
}

/* ── 2. leaflet — the thing you send a customer ───────────── */

async function leaflet() {
  const code = await qr(C.ink);
  const pageCss = `@page { size: A4; margin: 0; }`;

  const css = `
    .sheet { width: 210mm; height: 297mm; display: flex; flex-direction: column; }
    .band { background: ${C.clay}; color: #fff; padding: 13mm 18mm 11mm; }
    .band .wordmark { font-size: 20pt; font-weight: 600; letter-spacing: .18em;
                      text-transform: uppercase; line-height: 1; }
    .band h1 { font-size: 22pt; line-height: 1.15; letter-spacing: -.02em;
               font-weight: 600; margin: 7mm 0 0; max-width: 150mm; }
    .band p { font-size: 10.5pt; line-height: 1.6; margin: 4mm 0 0; max-width: 138mm;
              color: rgba(255,255,255,.92); }
    .body { padding: 9mm 18mm 0; flex: 1; }
    .eyebrow { font-size: 7.5pt; letter-spacing: .16em; text-transform: uppercase;
               color: ${C.clay}; font-weight: 600; }
    h2 { font-size: 14pt; letter-spacing: -.01em; margin: 2.5mm 0 0; font-weight: 600; }
    .trade-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.2mm 3.5mm; margin-top: 5mm; }
    .trade { border: .8pt solid ${C.line}; padding: 2.8mm 3.6mm; font-size: 9pt;
             font-weight: 500; background: ${C.paper2}; }
    .promises { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm 8mm; margin-top: 5mm; }
    .promise h3 { font-size: 10.5pt; margin: 0; font-weight: 600; }
    .promise p { font-size: 9pt; line-height: 1.6; color: ${C.inkSoft}; margin: 1.6mm 0 0; }
    .areas { font-size: 8.4pt; line-height: 1.7; color: ${C.inkSoft}; margin: 4mm 0 8mm; }
    .foot { margin-top: auto; background: ${C.ink}; color: #fff; padding: 8mm 18mm;
            display: flex; justify-content: space-between; align-items: center; gap: 10mm; }
    .foot .num { font-size: 21pt; font-weight: 700; letter-spacing: -.02em; line-height: 1; }
    .foot .det { font-size: 9pt; line-height: 1.7; color: rgba(255,255,255,.75); margin-top: 3mm; }
    .foot .det b { color: #fff; font-weight: 600; }
    .foot .qr { width: 27mm; height: 27mm; background: #fff; padding: 2.5mm; }
    .foot .qr-cap { font-size: 7pt; color: rgba(255,255,255,.7); text-align: center; margin-top: 2mm; }
    .rule { height: .8pt; background: ${C.line}; margin: 7mm 0; }
  `;

  const body = `
<p class="hint"><b>One-page leaflet.</b> Send <b>leaflet.pdf</b> by email or
WhatsApp when someone asks what you do, or print it as a flyer.</p>

<div class="sheet">
  <div class="band">
    <div style="display:flex;align-items:center;gap:4mm">
      ${mark("10mm", "rgba(255,255,255,.92)")}
      <div class="wordmark">${N.name}</div>
    </div>
    <h1>${N.line1.replace(/,$/, "")}<br>${N.line2}</h1>
    <p>${N.line3} Call your local trader now for a free, no obligation quote.</p>
  </div>

  <div class="body">
    <p class="eyebrow">What we do</p>
    <h2>Eleven trades, one team, one standard.</h2>
    <div class="trade-grid">${N.trades.map((t) => `<div class="trade">${t}</div>`).join("")}</div>

    <div class="rule"></div>

    <p class="eyebrow">Why us</p>
    <h2>The promises you can hold us to.</h2>
    <div class="promises">
      ${N.promises
        .map(
          ([h, p]) => `<div class="promise"><h3>${h}</h3><p>${p}</p></div>`,
        )
        .join("")}
    </div>

    <div class="rule"></div>

    <p class="eyebrow">Where we work</p>
    <h2>Derby, and about an hour around it.</h2>
    <p class="areas">${N.areas}</p>
  </div>

  <div class="foot">
    <div>
      <div class="num">${N.phone}</div>
      <div class="det">
        <b>WhatsApp</b> ${N.whatsapp} &nbsp;·&nbsp; ${N.email}<br>
        <b>${N.site}</b> — prices, timescales and planning for every trade<br>
        ${N.hours.map(([d, t]) => `${d}: ${t}`).join(" &nbsp;·&nbsp; ")}
      </div>
    </div>
    <div>
      <div class="qr">${code}</div>
      <div class="qr-cap">Scan to see the site</div>
    </div>
  </div>
</div>`;

  return doc({ title: `${N.name} — leaflet`, css, body, pageCss });
}

/* ── 3 & 4. quotation and invoice ─────────────────────────── */

/**
 * Both are the same letterhead with a different table and footer. Every field a
 * human fills is `contenteditable`, so it can be completed in a browser and
 * saved straight to PDF — no Word, no software to buy.
 */
async function financialDoc({ kind }) {
  const code = await qr(C.ink);
  const isQuote = kind === "quotation";
  const pageCss = `@page { size: A4; margin: 0; }`;

  const css = `
    /* 296mm, not 297: an element exactly the height of the page rounds up in
       print and spills a blank second sheet. */
    .sheet { width: 210mm; min-height: 296mm; padding: 12mm 15mm 10mm;
             display: flex; flex-direction: column; }
    .head { display: flex; justify-content: space-between; align-items: flex-start;
            border-bottom: 1.6pt solid ${C.ink}; padding-bottom: 6mm; }
    .head .wordmark { font-size: 15pt; font-weight: 600; letter-spacing: .18em;
                      text-transform: uppercase; line-height: 1; }
    .head .tag { font-size: 7.6pt; color: ${C.inkMuted}; margin-top: 1.8mm;
                 letter-spacing: .04em; }
    .head .det { font-size: 8.4pt; line-height: 1.65; color: ${C.inkSoft}; text-align: right; }
    .head .det b { color: ${C.ink}; }

    .title { display: flex; justify-content: space-between; align-items: flex-end;
             margin-top: 6mm; gap: 10mm; }
    .title h1 { font-size: 19pt; font-weight: 600; letter-spacing: -.02em; margin: 0; }
    .meta { font-size: 8.6pt; line-height: 1.9; color: ${C.inkSoft}; text-align: right; }
    .meta b { color: ${C.ink}; }

    .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 9mm; margin-top: 6mm; }
    .box { border: .8pt solid ${C.line}; background: ${C.paper2}; padding: 4mm 5mm; }
    .box .lbl { font-size: 7pt; letter-spacing: .14em; text-transform: uppercase;
                color: ${C.clay}; font-weight: 600; }
    .box .val { font-size: 9.6pt; line-height: 1.75; margin-top: 2.4mm; color: ${C.ink}; }

    table { width: 100%; border-collapse: collapse; margin-top: 7mm; }
    th { font-size: 7.2pt; letter-spacing: .12em; text-transform: uppercase;
         color: ${C.inkMuted}; font-weight: 600; text-align: left;
         border-bottom: 1pt solid ${C.ink}; padding: 0 0 2.4mm; }
    th.r, td.r { text-align: right; }
    td { font-size: 9.6pt; line-height: 1.6; color: ${C.ink};
         border-bottom: .6pt solid ${C.line}; padding: 2.4mm 0; vertical-align: top; }
    td.desc { padding-right: 8mm; }
    tfoot td { border-bottom: none; padding-top: 2.6mm; font-size: 10pt; }
    tfoot .total td { border-top: 1.4pt solid ${C.ink}; font-size: 12.5pt;
                      font-weight: 700; padding-top: 3.6mm; }

    .terms { margin-top: 7mm; display: grid; grid-template-columns: 1.35fr 1fr; gap: 9mm; }
    .terms h3 { font-size: 8pt; letter-spacing: .14em; text-transform: uppercase;
                color: ${C.clay}; font-weight: 600; margin: 0 0 2.6mm; }
    .terms p, .terms li { font-size: 8.2pt; line-height: 1.7; color: ${C.inkSoft}; margin: 0; }
    .terms ul { margin: 0; padding-left: 4.4mm; }
    .terms li { margin-bottom: 1.4mm; }

    .sign { margin-top: auto; padding-top: 6mm; display: flex; justify-content: space-between;
            align-items: flex-end; gap: 10mm; }
    .sigline { flex: 1; }
    .sigline .rule { border-bottom: .8pt solid ${C.lineStrong}; height: 9mm; }
    .sigline .lbl { font-size: 7.4pt; color: ${C.inkMuted}; margin-top: 2mm; }
    .qr { width: 20mm; height: 20mm; flex: none; }
    .qr-cap { font-size: 6.4pt; color: ${C.inkMuted}; text-align: center; margin-top: 1.4mm; }
    .foot-note { margin-top: 6mm; border-top: .8pt solid ${C.line}; padding-top: 3.4mm;
                 font-size: 7.6pt; color: ${C.inkMuted}; line-height: 1.7; text-align: center; }
  `;

  const rows = (n) =>
    Array.from({ length: n })
      .map(
        () => `<tr>
      <td class="desc" contenteditable>&nbsp;</td>
      <td class="r" contenteditable>&nbsp;</td>
    </tr>`,
      )
      .join("");

  const quoteTerms = `
    <div>
      <h3>What this price includes</h3>
      <ul>
        <li contenteditable>All labour, materials and plant listed above</li>
        <li contenteditable>Removal of waste from site</li>
        <li contenteditable>Making good on completion</li>
      </ul>
      <h3 style="margin-top:5mm">Not included</h3>
      <ul>
        <li contenteditable>Anything not visible before work starts — you will see it and get a price before we touch it</li>
        <li contenteditable>Council or Building Control fees, where they apply</li>
      </ul>
    </div>
    <div>
      <h3>Terms</h3>
      <p contenteditable>This quotation is valid for 30 days. Payment follows completed
      work: on shorter jobs, in full on completion; on longer ones, in agreed stages as
      each part is finished. Any deposit covers materials ordered for your job and never
      more than they cost. Nothing is charged that you have not agreed in writing first.
      Start and finish dates are agreed before we begin.</p>
    </div>`;

  const invoiceTerms = `
    <div>
      <h3>Work carried out</h3>
      <p contenteditable>[Short description of the job, and the dates it ran.]</p>
      <h3 style="margin-top:5mm">Certificates issued</h3>
      <p contenteditable>[List any electrical, gas or Building Control paperwork handed over — or delete this section.]</p>
    </div>
    <div>
      <h3>Payment</h3>
      <p contenteditable>Payable within 14 days of the date above.</p>
      <p style="margin-top:3mm" contenteditable><b>Bank:</b> [bank name]<br>
      <b>Account name:</b> [account name]<br>
      <b>Sort code:</b> [00-00-00]<br>
      <b>Account number:</b> [00000000]<br>
      <b>Reference:</b> the invoice number above</p>
    </div>`;

  const body = `
<p class="hint"><b>${isQuote ? "Quotation" : "Invoice"} template.</b> Open this
file in a browser and click any <b>shaded</b> field to type into it — customer
name, the job, the prices. Then <b>File → Print → Save as PDF</b> and email it.
The page prints clean: this note and the shading do not appear. Nothing is saved
in the file itself, so it stays blank and ready for the next one — save each
finished ${isQuote ? "quote" : "invoice"} as its own PDF.</p>

<div class="sheet">
  <div class="head">
    <div style="display:flex;align-items:center;gap:3.4mm">
      ${mark("9mm", C.clay)}
      <div>
        <div class="wordmark">${N.name}</div>
        <div class="tag">General building · ${N.base}</div>
      </div>
    </div>
    <div class="det">
      <b>${N.phone}</b> &nbsp;·&nbsp; WhatsApp<br>
      ${N.email}<br>
      ${N.site}
    </div>
  </div>

  <div class="title">
    <h1>${isQuote ? "Quotation" : "Invoice"}</h1>
    <div class="meta">
      ${isQuote ? "Quote no." : "Invoice no."} <b contenteditable>[0001]</b><br>
      Date <b contenteditable>[__ / __ / 2026]</b><br>
      ${
        isQuote
          ? "Valid until <b contenteditable>[30 days from above]</b>"
          : "Due <b contenteditable>[14 days from above]</b>"
      }
    </div>
  </div>

  <div class="parties">
    <div class="box">
      <div class="lbl">${isQuote ? "Quotation for" : "Invoice to"}</div>
      <div class="val" contenteditable>[Customer name]<br>[Address]<br>[Postcode]<br>[Phone / email]</div>
    </div>
    <div class="box">
      <div class="lbl">Work at</div>
      <div class="val" contenteditable>[Address of the job, if different]<br>[Postcode]<br><br>[Start date — agreed before we begin]</div>
    </div>
  </div>

  <table>
    <thead>
      <tr><th>Description of work</th><th class="r" style="width:34mm">Amount</th></tr>
    </thead>
    <tbody>
      <tr>
        <td class="desc" contenteditable>[Describe the work line by line — a single figure on one page is not a quotation. Break out preparation, materials, labour and finishing so the customer can compare it properly against other quotes.]</td>
        <td class="r" contenteditable>£&nbsp;</td>
      </tr>
      ${rows(2)}
    </tbody>
    <tfoot>
      <tr><td class="r" style="color:${C.inkSoft}">Subtotal</td><td class="r" contenteditable>£&nbsp;</td></tr>
      <tr class="total"><td class="r">Total</td><td class="r" contenteditable>£&nbsp;</td></tr>
    </tfoot>
  </table>

  <div class="terms">
    ${isQuote ? quoteTerms : invoiceTerms}
  </div>

  <div class="sign">
    ${
      isQuote
        ? `<div class="sigline">
             <div class="rule"></div>
             <div class="lbl">Customer signature — accepting this quotation</div>
           </div>
           <div class="sigline">
             <div class="rule"></div>
             <div class="lbl">Date</div>
           </div>`
        : `<div class="sigline"><p style="font-size:9pt;line-height:1.7;color:${C.inkSoft};margin:0">
             Thank you — it was good to work on your home.<br>
             Any questions about this invoice, ring <b style="color:${C.ink}">${N.phone}</b>.
           </p></div>`
    }
    <div>
      <div class="qr">${code}</div>
      <div class="qr-cap">${N.site}</div>
    </div>
  </div>

  <div class="foot-note">
    ${N.legalName} · ${N.base} · ${N.phone} · ${N.email}
    ${
      isQuote
        ? "<br>Not VAT registered — delete this line, and add a VAT number and a VAT row above, if that changes."
        : "<br>Not VAT registered — delete this line, and add a VAT number and a VAT row above, if that changes."
    }
  </div>
</div>`;

  return doc({
    title: `${N.name} — ${kind}`,
    css,
    body,
    pageCss,
  });
}

/* ── render ───────────────────────────────────────────────── */

function chrome(args) {
  execFileSync(CHROME, ["--headless", "--disable-gpu", ...args], {
    stdio: "pipe",
  });
}

function toPdf(htmlPath, pdfPath) {
  chrome([
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ]);
}

/**
 * PNGs are rendered from single-sheet HTML at 4× so they stay sharp when a
 * customer pinches into them on a phone.
 */
function toPng(html, pngPath, { width, height, scale = 4 }) {
  const tmp = join(HERE, ".tmp-shot.html");
  writeFileSync(tmp, html);
  chrome([
    "--hide-scrollbars",
    `--force-device-scale-factor=${scale}`,
    `--window-size=${width},${height}`,
    `--screenshot=${pngPath}`,
    `file://${tmp}`,
  ]);
  rmSync(tmp);
}

/**
 * Isolates one sheet for a screenshot: the artwork alone, at exactly its own
 * size, with the on-screen note and drop shadow removed.
 *
 * Walks the div tags to find the matching close rather than pattern-matching
 * the end, because a sheet contains nested divs and a lazy regex stops at the
 * first one — which silently produced a half-rendered leaflet.
 */
function sheetOnly(html, index) {
  const opens = [...html.matchAll(/<div class="sheet[^"]*"[^>]*>/g)];
  const open = opens[index];
  if (!open) throw new Error(`No sheet at index ${index} to screenshot`);

  let depth = 0;
  let i = open.index;
  const tag = /<div\b[^>]*>|<\/div>/g;
  tag.lastIndex = i;
  let m;
  while ((m = tag.exec(html))) {
    depth += m[0] === "</div>" ? -1 : 1;
    if (depth === 0) {
      const sheet = html.slice(open.index, m.index + m[0].length);
      return html.replace(
        /<body>[\s\S]*<\/body>/,
        `<body class="shot">${sheet}</body>`,
      );
    }
  }
  throw new Error(`Unbalanced markup in sheet ${index}`);
}

async function main() {
  mkdirSync(HERE, { recursive: true });

  const card = await businessCard();
  const cardAr = await businessCard({ lang: "ar" });
  const leaf = await leaflet();
  const quote = await financialDoc({ kind: "quotation" });
  const inv = await financialDoc({ kind: "invoice" });

  const files = [
    ["business-card.html", card],
    ["business-card-ar.html", cardAr],
    ["leaflet.html", leaf],
    ["quotation.html", quote],
    ["invoice.html", inv],
  ];
  for (const [name, html] of files) writeFileSync(join(HERE, name), html);

  for (const [name] of files) {
    const html = join(HERE, name);
    toPdf(html, join(HERE, name.replace(".html", ".pdf")));
  }

  // Shareable images: both card faces, and the leaflet.
  // 8× ≈ 770dpi at card size: sharp enough to print from, never mind share.
  for (const [name, html] of [
    ["business-card.png", card],
    ["business-card-ar.png", cardAr],
  ]) {
    toPng(sheetOnly(html, 0), join(HERE, name), {
      width: 321,
      height: 207,
      scale: 8,
    });
  }
  toPng(sheetOnly(leaf, 0), join(HERE, "leaflet.png"), {
    width: 793,
    height: 1122,
  });

  const built = [
    ...files.map(([n]) => n),
    ...files.map(([n]) => n.replace(".html", ".pdf")),
    "business-card.png",
    "business-card-ar.png",
    "leaflet.png",
  ];
  console.log(`Built ${built.length} files into docs/templates/:`);
  for (const f of built) console.log(`  ${f}`);
}

main();
