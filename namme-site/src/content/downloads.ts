/**
 * Downloadable documents — GENERATED, do not edit.
 *
 * Written by docs/templates/build.mjs, which also copies the files themselves
 * into public/downloads/. To change what appears here, edit PUBLISHED in that
 * script and re-run it.
 */

export type Download = {
  file: string;
  label: string;
  description: string;
  kind: string;
  size: string;
  lang?: string;
};

export const downloads: Download[] = [
  {
    "file": "leaflet.pdf",
    "label": "What we do — one page",
    "description": "Every trade, what we promise, and where we work. Print it or send it on.",
    "lang": "en",
    "kind": "PDF",
    "size": "236 KB"
  },
  {
    "file": "business-card.pdf",
    "label": "Business card — to print",
    "description": "Print-ready, 85×55mm. Or scan the code on it to come back here.",
    "lang": "en",
    "kind": "PDF",
    "size": "145 KB"
  },
  {
    "file": "business-card.png",
    "label": "Business card — image",
    "description": "Save it to your phone, or forward it to someone who needs a builder.",
    "lang": "en",
    "kind": "Image",
    "size": "223 KB"
  },
  {
    "file": "leaflet.pdf",
    "label": "ما نقوم به — صفحة واحدة",
    "description": "كل أعمالنا وتعهّداتنا ومناطق عملنا في صفحة واحدة. اطبعها أو أرسلها.",
    "lang": "ar",
    "kind": "PDF",
    "size": "236 KB"
  },
  {
    "file": "business-card-ar.pdf",
    "label": "بطاقة العمل — للطباعة",
    "description": "بحجم 85×55 مم، جاهزة للطباعة. أو امسح الرمز للعودة إلى الموقع.",
    "lang": "ar",
    "kind": "PDF",
    "size": "83 KB"
  },
  {
    "file": "business-card-ar.png",
    "label": "بطاقة العمل — صورة",
    "description": "احفظها على هاتفك أو أرسلها إلى من يحتاج إلى مقاول.",
    "lang": "ar",
    "kind": "Image",
    "size": "195 KB"
  }
];

export function downloadsFor(lang: "en" | "ar") {
  return downloads.filter((d) => d.lang === lang);
}
