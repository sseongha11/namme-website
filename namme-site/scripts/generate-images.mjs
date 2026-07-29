/**
 * Sample imagery generator.
 *
 * Produces the placeholder photography for the site as SVG architectural
 * illustrations. This is a deliberate choice over stock photos: research on
 * builder websites is consistent that generic stock imagery actively destroys
 * credibility, whereas an obvious, well-made illustration reads as "photography
 * pending" rather than "pretending". Every image drops out the moment a real
 * photograph replaces it — see IMAGES.md.
 *
 * Run:  node scripts/generate-images.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images");

/* ── deterministic randomness ─────────────────────────────── */

function makeRng(seedText) {
  let h = 2166136261;
  for (let i = 0; i < seedText.length; i++) {
    h ^= seedText.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let s = h >>> 0;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

/* ── palette ──────────────────────────────────────────────── */

const BRICK = {
  stock: { face: "#c9bda3", shade: "#b3a68c", mortar: "#ded6c4" },
  london: { face: "#b9a98c", shade: "#a2926f", mortar: "#d3c9b2" },
  red: { face: "#a85c43", shade: "#8f4a35", mortar: "#c99381" },
  grey: { face: "#a9a49c", shade: "#918c84", mortar: "#c8c3ba" },
};

const P = {
  skyTop: "#d9e2e6",
  skyBottom: "#f4efe6",
  glass: "#28333a",
  glassLight: "#3d4c55",
  frame: "#1b2227",
  roof: "#4a4f52",
  roofDark: "#3a3e41",
  slate: "#575e63",
  zinc: "#8d9499",
  ground: "#e4ded1",
  grass: "#a8ae87",
  grassDark: "#8f9670",
  ink: "#12161a",
  clay: "#b4552f",
  paper: "#faf8f4",
  line: "#cec5b8",
};

/* ── primitives ───────────────────────────────────────────── */

function defs(seed) {
  return `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${P.skyTop}"/>
      <stop offset="100%" stop-color="${P.skyBottom}"/>
    </linearGradient>
    <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${P.glassLight}"/>
      <stop offset="45%" stop-color="${P.glass}"/>
      <stop offset="100%" stop-color="#1f292f"/>
    </linearGradient>
    <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${P.grass}"/>
      <stop offset="100%" stop-color="${P.grassDark}"/>
    </linearGradient>
    <filter id="grain-${seed}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${seed}" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.055"/></feComponentTransfer>
    </filter>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>`;
}

/** Brick coursing as a repeating pattern band. */
function brickWall(x, y, w, h, tone, id) {
  const b = BRICK[tone];
  return `
  <g>
    <pattern id="brick-${id}" width="34" height="16" patternUnits="userSpaceOnUse">
      <rect width="34" height="16" fill="${b.face}"/>
      <rect width="34" height="1.4" y="14.6" fill="${b.mortar}" opacity="0.75"/>
      <rect width="1.4" height="8" x="0" y="0" fill="${b.mortar}" opacity="0.6"/>
      <rect width="1.4" height="8" x="17" y="7" fill="${b.mortar}" opacity="0.6"/>
      <rect width="34" height="1.4" y="6.6" fill="${b.mortar}" opacity="0.45"/>
    </pattern>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#brick-${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${b.shade}" opacity="0.18"/>
  </g>`;
}

/** Glazed opening with mullions. Reads as sliding doors or a window wall. */
function glazing(x, y, w, h, panes = 4, frame = P.frame) {
  const pw = w / panes;
  let mull = "";
  for (let i = 1; i < panes; i++) {
    mull += `<rect x="${x + i * pw - 3}" y="${y}" width="6" height="${h}" fill="${frame}"/>`;
  }
  return `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#glassGrad)"/>
    <path d="M${x} ${y + h} L${x + w * 0.55} ${y} L${x + w * 0.78} ${y} L${x + w * 0.16} ${y + h} Z"
          fill="#ffffff" opacity="0.07"/>
    ${mull}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${frame}" stroke-width="7"/>
  </g>`;
}

/**
 * Punched sash window with lintel and projecting stone sill.
 * Domestic windows are portrait; drawing them landscape is the single fastest
 * way to make an elevation read as "not a real house".
 */
function window(x, y, w, h, sash = true) {
  return `
  <g>
    <rect x="${x - 5}" y="${y - 10}" width="${w + 10}" height="10" fill="#ded6c6"/>
    <rect x="${x - 5}" y="${y - 4}" width="${w + 10}" height="${h + 8}" fill="${P.paper}" opacity="0.85"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#glassGrad)"/>
    ${
      sash
        ? `<rect x="${x}" y="${y + h * 0.46}" width="${w}" height="6" fill="${P.paper}" opacity="0.92"/>
           <rect x="${x + w / 2 - 2}" y="${y}" width="4" height="${h}" fill="${P.paper}" opacity="0.5"/>
           <rect x="${x}" y="${y + h * 0.2}" width="${w}" height="3" fill="${P.paper}" opacity="0.35"/>
           <rect x="${x}" y="${y + h * 0.72}" width="${w}" height="3" fill="${P.paper}" opacity="0.35"/>`
        : ""
    }
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${P.frame}" stroke-width="4"/>
    <rect x="${x - 11}" y="${y + h}" width="${w + 22}" height="9" fill="#d8d0be"/>
    <rect x="${x - 11}" y="${y + h + 9}" width="${w + 22}" height="4" fill="#b9b0a0"/>
  </g>`;
}

/** Panelled front door with fanlight and step. */
function door(x, y, w, h) {
  return `
  <g>
    <rect x="${x - 7}" y="${y - 9}" width="${w + 14}" height="${h + 9}" fill="#ded6c6"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h * 0.16}" fill="url(#glassGrad)"/>
    <rect x="${x}" y="${y + h * 0.18}" width="${w}" height="${h * 0.82}" fill="${P.clay}"/>
    <rect x="${x + w * 0.16}" y="${y + h * 0.28}" width="${w * 0.68}" height="${h * 0.24}" fill="none" stroke="${P.clay_dark ?? "#8d4023"}" stroke-width="3"/>
    <rect x="${x + w * 0.16}" y="${y + h * 0.6}" width="${w * 0.68}" height="${h * 0.24}" fill="none" stroke="#8d4023" stroke-width="3"/>
    <circle cx="${x + w * 0.84}" cy="${y + h * 0.56}" r="3.5" fill="#d8cfae"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${P.frame}" stroke-width="4"/>
    <rect x="${x - 14}" y="${y + h}" width="${w + 28}" height="10" fill="#cdc5b4"/>
  </g>`;
}

/** Eaves line: fascia board, gutter and an optional downpipe run. */
function eavesLine(x, w, y, pipeX, pipeH = 0) {
  return `
  <g>
    <rect x="${x - 26}" y="${y - 14}" width="${w + 52}" height="14" fill="${P.roofDark}"/>
    <rect x="${x - 26}" y="${y - 2}" width="${w + 52}" height="7" fill="#6d747a"/>
    ${
      pipeH > 0
        ? `<rect x="${pipeX}" y="${y}" width="9" height="${pipeH}" fill="#6d747a"/>
           <rect x="${pipeX - 4}" y="${y + pipeH * 0.42}" width="17" height="7" fill="#5c6367"/>`
        : ""
    }
  </g>`;
}

/** Angled rooflight sitting on a flat roof. */
function rooflight(x, y, w, h) {
  return `
  <g>
    <path d="M${x} ${y + h} L${x + w * 0.14} ${y} L${x + w} ${y} L${x + w * 0.86} ${y + h} Z"
          fill="url(#glassGrad)"/>
    <path d="M${x} ${y + h} L${x + w * 0.14} ${y} L${x + w} ${y} L${x + w * 0.86} ${y + h} Z"
          fill="none" stroke="${P.frame}" stroke-width="5"/>
    <path d="M${x + w * 0.2} ${y + h} L${x + w * 0.32} ${y}" stroke="${P.frame}" stroke-width="4"/>
  </g>`;
}

function chimney(x, y, w, h, tone) {
  return `${brickWall(x, y, w, h, tone, `ch${Math.round(x)}`)}
    <rect x="${x - 6}" y="${y}" width="${w + 12}" height="10" fill="${BRICK[tone].shade}"/>
    <rect x="${x + 8}" y="${y - 16}" width="16" height="18" fill="${P.slate}"/>
    <rect x="${x + w - 26}" y="${y - 16}" width="16" height="18" fill="${P.slate}"/>`;
}

function tree(x, groundY, scale = 1) {
  const h = 190 * scale;
  const r = 68 * scale;
  return `
  <g opacity="0.9">
    <rect x="${x - 5 * scale}" y="${groundY - h}" width="${10 * scale}" height="${h}" fill="#6f6047"/>
    <circle cx="${x}" cy="${groundY - h}" r="${r}" fill="${P.grassDark}" opacity="0.95"/>
    <circle cx="${x - r * 0.55}" cy="${groundY - h + r * 0.3}" r="${r * 0.66}" fill="${P.grass}" opacity="0.9"/>
    <circle cx="${x + r * 0.5}" cy="${groundY - h - r * 0.25}" r="${r * 0.58}" fill="${P.grass}" opacity="0.85"/>
  </g>`;
}

/** Scaffolding overlay — the visual cue for a build-in-progress frame. */
function scaffold(x, y, w, h) {
  const lifts = Math.max(2, Math.round(h / 150));
  let g = "";
  for (let i = 0; i <= lifts; i++) {
    const ly = y + (i * h) / lifts;
    g += `<rect x="${x}" y="${ly}" width="${w}" height="5" fill="${P.zinc}"/>`;
    g += `<rect x="${x}" y="${ly - 22}" width="${w}" height="14" fill="#b98c52" opacity="${i === 0 ? 0 : 0.85}"/>`;
  }
  const posts = Math.max(2, Math.round(w / 220));
  for (let i = 0; i <= posts; i++) {
    const px = x + (i * w) / posts;
    g += `<rect x="${px - 3}" y="${y}" width="6" height="${h}" fill="${P.zinc}"/>`;
  }
  // diagonal bracing
  g += `<path d="M${x} ${y + h} L${x + w} ${y}" stroke="${P.zinc}" stroke-width="4" opacity="0.7"/>`;
  return `<g opacity="0.92">${g}</g>`;
}

/* ── scenes ───────────────────────────────────────────────── */

function sceneExtension(rng, w, h, stage) {
  const groundY = h * 0.82;
  const tone = pick(rng, ["stock", "london", "red"]);
  const mainX = w * 0.46;
  const mainW = w * 0.42;
  const mainTop = h * 0.2;
  const extX = w * 0.12;
  const extW = mainX - extX;
  const extTop = h * 0.52;

  let s = "";
  s += `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  s += `<ellipse cx="${w * 0.7}" cy="${h * 0.16}" rx="${w * 0.24}" ry="${h * 0.1}" fill="#fff" opacity="0.5" filter="url(#soft)"/>`;

  // main two-storey house with pitched roof
  s += `<path d="M${mainX - 24} ${mainTop} L${mainX + mainW * 0.5} ${mainTop - h * 0.14} L${mainX + mainW + 24} ${mainTop} Z" fill="${P.roof}"/>`;
  for (let i = 1; i < 7; i++) {
    const t = i / 7;
    const ty = mainTop - h * 0.14 * t;
    const inset = (mainW / 2 + 24) * t;
    s += `<path d="M${mainX - 24 + inset} ${ty} L${mainX + mainW + 24 - inset} ${ty}" stroke="${P.roofDark}" stroke-width="3" opacity="0.4"/>`;
  }
  // chimney seated on the roof slope, rising past the ridge
  s += chimney(mainX + mainW * 0.7, mainTop - h * 0.2, 52, h * 0.2, tone);
  s += brickWall(mainX, mainTop, mainW, groundY - mainTop, tone, "main");
  s += eavesLine(mainX, mainW, mainTop, mainX + mainW - 16, groundY - mainTop);
  s += window(mainX + mainW * 0.14, mainTop + h * 0.07, mainW * 0.2, h * 0.17);
  s += window(mainX + mainW * 0.62, mainTop + h * 0.07, mainW * 0.2, h * 0.17);
  s += window(mainX + mainW * 0.14, mainTop + h * 0.33, mainW * 0.2, h * 0.17);

  // single-storey extension with parapet, full-width glazing, rooflights
  s += brickWall(extX, extTop, extW, groundY - extTop, tone, "ext");
  s += `<rect x="${extX - 14}" y="${extTop - 20}" width="${extW + 20}" height="26" fill="${BRICK[tone].shade}"/>`;
  s += glazing(extX + 40, extTop + 52, extW - 90, groundY - extTop - 52, 4);
  s += rooflight(extX + extW * 0.18, extTop - 62, extW * 0.3, 46);
  s += rooflight(extX + extW * 0.58, extTop - 62, extW * 0.3, 46);

  // ground
  s += `<rect x="0" y="${groundY}" width="${w}" height="${h - groundY}" fill="url(#groundGrad)"/>`;
  s += `<rect x="0" y="${groundY}" width="${w}" height="26" fill="${P.ground}"/>`;
  s += `<rect x="${extX - 20}" y="${groundY}" width="${extW + 120}" height="${h * 0.07}" fill="${P.ground}" opacity="0.9"/>`;
  s += tree(w * 0.075, groundY, 0.95);

  if (stage === "during") s += scaffold(extX - 30, extTop - 90, extW + 70, groundY - extTop + 90);
  return s;
}

function sceneLoft(rng, w, h, stage) {
  const groundY = h * 0.84;
  const tone = pick(rng, ["stock", "london", "red"]);
  const x = w * 0.2;
  const bw = w * 0.6;
  const eaves = h * 0.4;
  const ridge = h * 0.14;

  let s = "";
  s += `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  s += `<ellipse cx="${w * 0.28}" cy="${h * 0.14}" rx="${w * 0.22}" ry="${h * 0.09}" fill="#fff" opacity="0.45" filter="url(#soft)"/>`;

  // roof
  s += `<path d="M${x - 26} ${eaves} L${x + bw / 2} ${ridge} L${x + bw + 26} ${eaves} Z" fill="${P.roof}"/>`;
  // slate coursing
  for (let i = 1; i < 8; i++) {
    const ty = eaves - ((eaves - ridge) * i) / 8;
    const inset = ((bw / 2 + 26) * i) / 8;
    s += `<path d="M${x - 26 + inset} ${ty} L${x + bw + 26 - inset} ${ty}" stroke="${P.roofDark}" stroke-width="3" opacity="0.5"/>`;
  }

  // dormer box set into the roof
  const dx = x + bw * 0.28;
  const dw = bw * 0.44;
  const dTop = eaves - (eaves - ridge) * 0.62;
  s += `<rect x="${dx}" y="${dTop}" width="${dw}" height="${eaves - dTop + 8}" fill="${P.zinc}"/>`;
  s += `<rect x="${dx - 10}" y="${dTop - 12}" width="${dw + 20}" height="16" fill="${P.slate}"/>`;
  for (let i = 1; i < 6; i++) {
    s += `<rect x="${dx + (dw * i) / 6 - 1.5}" y="${dTop}" width="3" height="${eaves - dTop + 8}" fill="#7d848a" opacity="0.7"/>`;
  }
  s += window(dx + dw * 0.1, dTop + 24, dw * 0.32, eaves - dTop - 46);
  s += window(dx + dw * 0.58, dTop + 24, dw * 0.32, eaves - dTop - 46);
  // chimney at the party wall, base tucked behind the roof slope
  s += chimney(x + bw * 0.86, ridge + h * 0.03, 48, eaves - ridge + h * 0.02, tone);

  // walls
  s += brickWall(x, eaves, bw, groundY - eaves, tone, "loft");
  s += eavesLine(x, bw, eaves, x + bw + 6, groundY - eaves);
  s += window(x + bw * 0.12, eaves + h * 0.07, bw * 0.19, h * 0.17);
  s += window(x + bw * 0.69, eaves + h * 0.07, bw * 0.19, h * 0.17);
  s += door(x + bw * 0.44, groundY - h * 0.23, bw * 0.12, h * 0.23);

  s += `<rect x="0" y="${groundY}" width="${w}" height="${h - groundY}" fill="${P.ground}"/>`;
  s += `<rect x="0" y="${groundY}" width="${w}" height="8" fill="${P.line}"/>`;
  s += tree(w * 0.9, groundY, 0.7);

  if (stage === "during") s += scaffold(x - 40, ridge + 20, bw + 80, groundY - ridge - 20);
  return s;
}

function sceneMansard(rng, w, h, stage) {
  const groundY = h * 0.85;
  const tone = "london";
  const x = w * 0.16;
  const bw = w * 0.68;
  const eaves = h * 0.36;
  const flat = h * 0.12;

  let s = "";
  s += `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  // steep mansard slope
  s += `<path d="M${x - 20} ${eaves} L${x + bw * 0.08} ${flat} L${x + bw * 0.92} ${flat} L${x + bw + 20} ${eaves} Z" fill="${P.slate}"/>`;
  s += `<rect x="${x + bw * 0.06}" y="${flat - 10}" width="${bw * 0.88}" height="14" fill="${P.roofDark}"/>`;
  for (let i = 1; i < 5; i++) {
    const t = i / 5;
    const ty = eaves - (eaves - flat) * t;
    const ix = bw * 0.08 * t;
    s += `<path d="M${x - 20 + ix} ${ty} L${x + bw + 20 - ix} ${ty}" stroke="${P.roofDark}" stroke-width="3" opacity="0.45"/>`;
  }
  // sash dormers in the mansard face
  for (let i = 0; i < 3; i++) {
    const dw = bw * 0.16;
    const dx = x + bw * (0.14 + i * 0.28);
    const dTop = flat + (eaves - flat) * 0.22;
    s += `<rect x="${dx - 8}" y="${dTop - 10}" width="${dw + 16}" height="${eaves - dTop - 6}" fill="${P.paper}" opacity="0.92"/>`;
    s += window(dx, dTop, dw, eaves - dTop - 26);
  }
  s += brickWall(x, eaves, bw, groundY - eaves, tone, "mans");
  s += eavesLine(x, bw, eaves, x + bw + 6, groundY - eaves);
  for (let i = 0; i < 3; i++) {
    s += window(x + bw * (0.13 + i * 0.29), eaves + h * 0.08, bw * 0.15, h * 0.18);
  }
  for (let i = 0; i < 2; i++) {
    s += window(x + bw * (0.13 + i * 0.58), groundY - h * 0.28, bw * 0.15, h * 0.19);
  }
  s += door(x + bw * 0.46, groundY - h * 0.25, bw * 0.11, h * 0.25);
  s += `<rect x="0" y="${groundY}" width="${w}" height="${h - groundY}" fill="${P.ground}"/>`;
  s += `<rect x="0" y="${groundY}" width="${w}" height="8" fill="${P.line}"/>`;
  if (stage === "during") s += scaffold(x - 40, flat - 40, bw + 80, groundY - flat + 40);
  return s;
}

function sceneHouse(rng, w, h, stage) {
  const groundY = h * 0.86;
  const tone = pick(rng, ["stock", "red", "grey"]);
  const x = w * 0.14;
  const bw = w * 0.72;
  const top = h * 0.2;

  let s = `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  s += `<path d="M${x - 30} ${top} L${x + bw / 2} ${top - h * 0.12} L${x + bw + 30} ${top} Z" fill="${P.roof}"/>`;
  s += chimney(x + bw * 0.18, top - h * 0.19, 52, h * 0.19, tone);
  s += brickWall(x, top, bw, groundY - top, tone, "house");
  s += eavesLine(x, bw, top, x + bw + 6, groundY - top);
  // projecting bay
  s += `<rect x="${x + bw * 0.08}" y="${groundY - h * 0.36}" width="${bw * 0.28}" height="${h * 0.36}" fill="${BRICK[tone].shade}"/>`;
  s += `<rect x="${x + bw * 0.06}" y="${groundY - h * 0.38}" width="${bw * 0.32}" height="${h * 0.026}" fill="#6d747a"/>`;
  s += window(x + bw * 0.12, groundY - h * 0.31, bw * 0.09, h * 0.21);
  s += window(x + bw * 0.235, groundY - h * 0.31, bw * 0.09, h * 0.21);
  s += window(x + bw * 0.14, top + h * 0.08, bw * 0.16, h * 0.18);
  s += window(x + bw * 0.52, top + h * 0.08, bw * 0.16, h * 0.18);
  s += window(x + bw * 0.52, groundY - h * 0.29, bw * 0.16, h * 0.19);
  s += door(x + bw * 0.79, groundY - h * 0.25, bw * 0.11, h * 0.25);
  s += `<rect x="0" y="${groundY}" width="${w}" height="${h - groundY}" fill="${P.ground}"/>`;
  s += `<rect x="0" y="${groundY}" width="${w}" height="8" fill="${P.line}"/>`;
  s += tree(w * 0.94, groundY, 0.6);
  if (stage === "during") s += scaffold(x - 40, top - h * 0.14, bw + 80, groundY - top + h * 0.14);
  return s;
}

/** Interior elevation — kitchen island, run of units, rooflight above. */
function sceneInterior(rng, w, h) {
  const floorY = h * 0.78;
  const wallTop = h * 0.1;
  let s = `<rect width="${w}" height="${h}" fill="#efe9df"/>`;
  s += `<rect x="0" y="${wallTop}" width="${w}" height="${floorY - wallTop}" fill="#e6dfd3"/>`;
  // rooflight wash
  s += `<path d="M${w * 0.2} ${wallTop} L${w * 0.34} ${h * 0.02} L${w * 0.66} ${h * 0.02} L${w * 0.8} ${wallTop} Z" fill="#fff" opacity="0.75"/>`;
  s += `<ellipse cx="${w * 0.5}" cy="${floorY}" rx="${w * 0.34}" ry="${h * 0.1}" fill="#fff" opacity="0.35" filter="url(#soft)"/>`;
  // tall units left
  s += `<rect x="${w * 0.06}" y="${wallTop + h * 0.06}" width="${w * 0.2}" height="${floorY - wallTop - h * 0.06}" fill="#3f4a44"/>`;
  for (let i = 1; i < 3; i++)
    s += `<rect x="${w * 0.06 + (w * 0.2 * i) / 3 - 1.5}" y="${wallTop + h * 0.06}" width="3" height="${floorY - wallTop - h * 0.06}" fill="#2f3833"/>`;
  // run of base units + worktop right
  s += `<rect x="${w * 0.62}" y="${floorY - h * 0.24}" width="${w * 0.32}" height="${h * 0.24}" fill="#3f4a44"/>`;
  s += `<rect x="${w * 0.6}" y="${floorY - h * 0.26}" width="${w * 0.36}" height="${h * 0.03}" fill="#cfcabd"/>`;
  // open shelving
  for (let i = 0; i < 2; i++)
    s += `<rect x="${w * 0.64}" y="${wallTop + h * 0.16 + i * h * 0.12}" width="${w * 0.26}" height="7" fill="#8a7b63"/>`;
  // island
  s += `<rect x="${w * 0.3}" y="${floorY - h * 0.2}" width="${w * 0.28}" height="${h * 0.2}" fill="${P.clay}" opacity="0.9"/>`;
  s += `<rect x="${w * 0.28}" y="${floorY - h * 0.22}" width="${w * 0.32}" height="${h * 0.028}" fill="#cfcabd"/>`;
  // pendants
  for (let i = 0; i < 2; i++) {
    const px = w * (0.37 + i * 0.14);
    s += `<rect x="${px - 1.5}" y="${wallTop}" width="3" height="${h * 0.2}" fill="#6b6f72"/>`;
    s += `<path d="M${px - 26} ${wallTop + h * 0.24} L${px - 12} ${wallTop + h * 0.2} L${px + 12} ${wallTop + h * 0.2} L${px + 26} ${wallTop + h * 0.24} Z" fill="#2f3833"/>`;
  }
  // floor
  s += `<rect x="0" y="${floorY}" width="${w}" height="${h - floorY}" fill="#d6cfc2"/>`;
  for (let i = 1; i < 7; i++)
    s += `<rect x="0" y="${floorY + ((h - floorY) * i) / 7}" width="${w}" height="2" fill="#c6bdae" opacity="0.7"/>`;
  return s;
}

/** Blueprint line drawing — used for the design service. */
function sceneBlueprint(rng, w, h) {
  const g = 44;
  let s = `<rect width="${w}" height="${h}" fill="${P.paper}"/>`;
  let grid = "";
  for (let x = 0; x < w; x += g) grid += `<rect x="${x}" y="0" width="1" height="${h}" fill="${P.line}" opacity="0.5"/>`;
  for (let y = 0; y < h; y += g) grid += `<rect x="0" y="${y}" width="${w}" height="1" fill="${P.line}" opacity="0.5"/>`;
  s += grid;

  const x = w * 0.16,
    bw = w * 0.56,
    top = h * 0.24,
    base = h * 0.8;
  const L = (d, sw = 3, c = P.ink) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${sw}"/>`;
  // elevation outline
  s += L(`M${x} ${base} V${top} L${x + bw / 2} ${top - h * 0.12} L${x + bw} ${top} V${base} Z`, 3.5);
  // extension outline in clay (the proposed work)
  s += L(`M${x - w * 0.13} ${base} V${h * 0.55} H${x} `, 3.5, P.clay);
  s += `<path d="M${x - w * 0.13} ${h * 0.55} H${x}" stroke="${P.clay}" stroke-width="3.5" fill="none"/>`;
  s += `<rect x="${x - w * 0.13}" y="${h * 0.55}" width="${w * 0.13}" height="${base - h * 0.55}" fill="${P.clay}" opacity="0.08"/>`;
  // openings
  s += L(`M${x + bw * 0.12} ${top + h * 0.09} h${bw * 0.22} v${h * 0.14} h-${bw * 0.22} Z`);
  s += L(`M${x + bw * 0.62} ${top + h * 0.09} h${bw * 0.22} v${h * 0.14} h-${bw * 0.22} Z`);
  s += L(`M${x + bw * 0.12} ${base - h * 0.22} h${bw * 0.22} v${h * 0.22}`);
  // dimension line
  s += L(`M${x - w * 0.13} ${base + 34} H${x + bw}`, 2, P.clay);
  s += L(`M${x - w * 0.13} ${base + 24} v20`, 2, P.clay);
  s += L(`M${x + bw} ${base + 24} v20`, 2, P.clay);
  // levels
  s += L(`M${w * 0.02} ${base} H${w * 0.98}`, 2, "#9aa0a6");
  s += L(`M${w * 0.02} ${top} H${w * 0.98}`, 1.5, "#9aa0a6");
  return s;
}

/* ── compose ──────────────────────────────────────────────── */

const SCENES = {
  extension: sceneExtension,
  loft: sceneLoft,
  mansard: sceneMansard,
  house: sceneHouse,
  interior: (rng, w, h) => sceneInterior(rng, w, h),
  blueprint: (rng, w, h) => sceneBlueprint(rng, w, h),
};

function render({ name, kind, w = 1600, h = 1100, stage = "after" }) {
  const rng = makeRng(name);
  const seed = Math.floor(rng() * 999);
  const body = SCENES[kind](rng, w, h, stage);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
${defs(seed)}
${body}
<rect width="${w}" height="${h}" filter="url(#grain-${seed})" opacity="0.5"/>
</svg>`;
  writeFileSync(join(OUT, `${name}.svg`), svg.replace(/\n\s*\n/g, "\n"));
  return name;
}

/* ── manifest ─────────────────────────────────────────────── */

const IMAGES = [
  // hero
  { name: "hero", kind: "extension", w: 2200, h: 1300 },

  // service group cards
  { name: "service-extensions", kind: "extension" },
  { name: "service-lofts", kind: "loft" },
  { name: "service-renovations", kind: "interior" },

  // individual services
  { name: "service-rear-extensions", kind: "extension" },
  { name: "service-side-return-extensions", kind: "extension" },
  { name: "service-wrap-around-extensions", kind: "extension" },
  { name: "service-double-storey-extensions", kind: "house" },
  { name: "service-dormer-loft-conversions", kind: "loft" },
  { name: "service-mansard-loft-conversions", kind: "mansard" },
  { name: "service-hip-to-gable-loft-conversions", kind: "loft" },
  { name: "service-full-house-renovations", kind: "house" },
  { name: "service-kitchen-renovations", kind: "interior" },
  { name: "service-bathroom-renovations", kind: "interior" },

  // projects — after + during, because in-progress shots carry more weight
  { name: "project-normanton-rear-extension-after", kind: "extension" },
  { name: "project-normanton-rear-extension-during", kind: "extension", stage: "during" },
  { name: "project-mickleover-dormer-loft-after", kind: "loft" },
  { name: "project-mickleover-dormer-loft-during", kind: "loft", stage: "during" },
  { name: "project-allestree-double-storey-after", kind: "house" },
  { name: "project-allestree-double-storey-during", kind: "house", stage: "during" },
  { name: "project-littleover-kitchen-extension-after", kind: "extension" },
  { name: "project-littleover-kitchen-extension-during", kind: "extension", stage: "during" },
  { name: "project-melbourne-listed-renovation-after", kind: "house" },
  { name: "project-melbourne-listed-renovation-during", kind: "house", stage: "during" },
  { name: "project-belper-whs-renovation-after", kind: "house" },
  { name: "project-belper-whs-renovation-during", kind: "house", stage: "during" },

  // interiors used as secondary project frames
  { name: "interior-kitchen-1", kind: "interior" },
  { name: "interior-kitchen-2", kind: "interior" },

  // about / process
  { name: "about-team", kind: "house" },
  { name: "process-detail", kind: "blueprint" },
];

mkdirSync(OUT, { recursive: true });
for (const img of IMAGES) render(img);
console.log(`Generated ${IMAGES.length} images into public/images/`);
