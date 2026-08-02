# Print and send kit

Everything Naeem needs on paper or by message. All of it is generated from one
script, so the phone number, the email, the trades list and the sentence off the
business card can never drift apart across documents.

## What's here

| File | What it's for |
| --- | --- |
| `business-card.pdf` | **Send this to a printer.** One side, 85×55mm with 3mm bleed. |
| `business-card.png` | **Send this to a customer.** WhatsApp, email signature, Facebook. ~770dpi, so it stays sharp when someone pinches in. |
| `business-card-ar.pdf` / `.png` | The same card in Arabic, right to left. Its QR code opens the Arabic page of the site, not the English one. |
| `leaflet.pdf` / `leaflet.png` | One A4 page: what we do, why us, where we work, how to get hold of us. Email it when someone asks what you do, or print it as a flyer. |
| `quotation.html` → `quotation.pdf` | Fill in on screen, save as PDF, send. |
| `invoice.html` → `invoice.pdf` | The same, for after the job. |

Every document carries a QR code to **naeem-site.vercel.app**. Point a phone
camera at it and the site opens — no typing a web address.

## Writing a quote or an invoice

No Word, no software to buy.

1. Double-click `quotation.html` (or `invoice.html`). It opens in your browser.
2. Click any **shaded** field and type — customer name, the work, the prices.
   Everything you can fill in highlights when you hover over it.
3. **File → Print → Save as PDF.** Give it the customer's name, e.g.
   `Quote 0001 — Mrs Smith, DE22.pdf`.
4. Email or WhatsApp that PDF.

The printed page comes out clean: the yellow note at the top and the shading
never appear. Nothing you type is saved into the template, so it stays blank and
ready for the next one — which is why step 3 matters. Save each finished quote
as its own PDF.

The quotation includes the terms already: valid 30 days, payment against
completed work, deposits only for materials, nothing charged that wasn't agreed
first. Change them if they don't match how you work — they're just text.

## Getting cards printed

Send `business-card.pdf` to any online printer. It is set up the way they ask
for: 85×55mm finished size, 3mm bleed on every edge, nothing important within
5mm of the trim. Single-sided, so it is the cheaper option on every price list.

Ask for **400gsm with a matt laminate**. On a dark card that matters more than
usual: matt is what makes near-black look deliberate, where gloss makes it look
like a photocopy and shows every fingerprint. Spot UV on the monogram is a nice
touch if the printer offers it and the budget stretches.

## Changing anything

Open `build.mjs`. Everything that appears across the documents — phone, email,
address, opening hours, the trades list, the four promises — is in the `N` block
at the top. Change it there, then:

```
cd docs/templates
npm install          # once, for the QR code library
node build.mjs
```

Every file above is rebuilt together. Requires Google Chrome, which is used
headless to render the PDFs and images.

## Notes

- The QR codes are checked by decoding the finished card images, so a broken
  code can't reach a printer. English card → the site; Arabic card → `/ar`.
- The Arabic card mirrors: the clay spine moves to the right edge, the text runs
  right to left, and the phone number, email and web address stay left to right
  inside it so the punctuation doesn't land on the wrong end.
- Colours match the website: clay `#b4552f`, ink `#12161a`, paper `#faf8f4`.
  The old card's magenta was dropped so the card, the leaflet and the site read
  as one business.
- The card is dark; the leaflet and the paperwork are light. That is deliberate
  — the card is the thing handed over, so it carries the weight, and a dark A4
  sheet would cost a fortune in ink to print at home.
- Everything is on one face. Twelve trades set as bullets in columns forced the
  type down to about 5pt, which reads as cheap; as a running line they fit at a
  readable size and leave the white space that makes a card look considered.
  Each trade is wrapped in a `nowrap` span, because a running line will happily
  break "Commercial fit-out" at its hyphen and strand "out" on a line of its own.
- Type is Instrument Sans, the site's typeface, fetched when you have a
  connection and falling back to the system font when you don't. The supplied
  PDFs have it embedded, so printers see the right thing either way.
