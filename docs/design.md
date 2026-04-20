# FoodTuk Skewers — Design Document

## Samenvatting

Rebuild van food-tuk.nl (WordPress/Bricks Builder) naar Astro 6 + Tailwind v4. NL-only one-pager met aparte /agenda-pagina. 95% exacte nabouw, inconsistenties rechtgetrokken, code verbeterd met web-template-v2 design system.

---

## Branding

### Merkwaarden
- Authentiek — familierecept, generaties oud
- Warm/gezellig — straatvoedsel-sfeer, laagdrempelig
- Kwaliteit — live gegrild op houtskool, alles vers

### Doelgroep
- Event-organisatoren (bedrijfsfeesten, festivals, privéfeesten)
- Foodies die Indonesische saté zoeken
- Particulieren die catering willen boeken

### Tone of voice
- Informeel, warm, enthousiast
- "Je/jullie"-toon
- Licht speels (bv. "Aduh, geloof je ons niet?")
- Geen vaktaal, kort en puntig

### Visuele stijl
- Warme cream/goud palette — evoceert Indonesische keuken
- Afwisselend cream (#faf6e0) en warm-geel (#fff8d4) secties
- Dark cards met video-achtergronden voor sfeer
- Ronde vormen (rounded cards, pill-buttons)
- Fotografie: warm, close-up food shots

### Do's & Don'ts
- ✓ Warm, uitnodigend, authentiek
- ✓ Ruimtelijk, niet druk
- ✗ Geen corporate/zakelijk gevoel
- ✗ Geen felle kleuren buiten het goud-palette
- ✗ Geen stockfoto's

---

## Sitemap

| Pagina | Route | Type |
|--------|-------|------|
| Homepage | `/` | One-pager met secties |
| Agenda | `/agenda` | Aparte pagina, events-lijst |

---

## Homepage — Secties (volgorde)

### 1. Header/Nav (fixed)
- Logo (FoodTuk-logo.webp) links
- Anchor-links: Wat wij doen, FAQ, Reviews, Offerte & contact, Agenda
- Mobile: hamburger menu
- Transparant op hero → cream bg na scroll (pill-patroon uit dip-website)

### 2. Hero
- **Achtergrond:** video (foodtruck-backgroundvideo-compressed.mp4) fullscreen
- **H1 met animated typing:** "Eén hap van onze saté en je snapt waarom [men ons opzoekt. / die rij toch zo lang is. / men ons boekt. / men vaak nóg een portie wilt.]"
- **Subtitle:** "Smaak zoals je die alleen op straat in Indonesië vindt, maar dan gewoon met onze food tuk bij jou op locatie voor grote en kleine gelegenheden."
- **CTA button:** "Offerte aanvragen" → scrollt naar contact-sectie
- **Scroll indicator:** "Lees beneden meer" + chevron-down icon

### 3. Wat wij doen (bg: warm-geel, dotted border top+bottom in #b0a354)
- **H2:** "Het lijkt misschien magie. Maar het is gewoon onze saté."
- **Body:** "Met onze foodtuk brengen wij ~~magie~~ authentieke Indonesische saté naar feesten, festivals en bedrijven door heel Nederland. Live gegrild op houtskool. Precies zoals het hoort. Je ruikt het van ver en je proeft het verschil. Wij kunnen kip, varken, vegetarisch en lams leveren."
- **Pills:** "Bijgerechten mogelijk" | "Keuze uit ayam, babi, kambing en/of tempeh"
- **Image:** sfeerfotos-van-foodtuktuk.webp (rechts op desktop, onder op mobile)
- **Layout:** tekst links, beeld rechts (2-kolom desktop, gestapeld mobile)

### 4. Meer dan alleen lekker eten (bg: cream)
- **H2:** "Meer dan alleen lekker eten"
- **Subhead:** "Én misschien toch wel een klein beetje magie"
- **3 cards grid** (responsive: 3-kolom → 1-kolom):
  - Card 1: video bg (backgroundvideo-card1.mp4), H3 "Smaakt als thuiskomen", body "Je hoeft geen Indo te zijn om het te voelen. Eén hap en je voelt: 'hier hoor ik te zijn'"
  - Card 2: video bg (backgroundvideo-card2.mp4), H3 "Food tuk als unieke sfeermaker op locatie.", body "Met onze foodtuk brengen we meer dan lekker eten maar ook een unieke ervaring die mensen onthouden."
  - Card 3: video bg (backgroundvideo-card-3.mp4), H3 "Volgens opa en oma's recept", body "Onze saté smaakt naar verhalen die al generaties meegaan."
- Card styling: rounded-lg (16px), min-h-[600px] desktop / min-h-[400px] mobile, dark overlay, tekst centered wit

### 5. FAQ (bg: warm-geel, dotted border)
- **H2:** "Veelgestelde vragen"
- **Subtitle:** "Heb je een andere vraag die er niet tussenstaat? Bel dan even naar 06 48 18 58 48 of mail info@food-tuk.nl"
- **Accordion (7 items):**
  1. Hebben jullie ook meer dan alleen saté?
  2. Wat kost het om jullie foodtuk te boeken?
  3. Wat zit er bij een boeking inbegrepen?
  4. Hoeveel mensen kunnen jullie bedienen?
  5. Hebben jullie halal en vegetarische opties?
  6. Maken jullie alles zelf?
  7. Zijn jullie gerechten ook los verkrijgbaar?
- **FAQPage JSON-LD schema** in head
- Accordion titel: El Messiri, kleur #b0a354
- Expand/collapse icoon: chevron (rechts rotatie → beneden)

### 6. Agenda teaser (bg: cream) — NIEUW
- **H2:** "Komende events"
- **Subhead:** "Kom ons proeven op een van deze plekken"
- Max 3 eerstvolgende events (event-rij component)
- **CTA:** "Bekijk volledige agenda →" → linkt naar /agenda
- **Empty state:** "Geen events gepland op dit moment — maar we komen graag bij jou langs." + knop "Vraag een offerte aan →"
- Rij-layout: event-naam + locatie links, datum-tegel rechts

### 7. Reviews (bg: cream)
- **H2:** "Aduh, geloof je ons niet?"
- **Subhead:** "Lees dan wat anderen vonden."
- **Trustindex Google Reviews widget** (externe embed, auto-updates)
- **Button:** "Plaats hier jouw review" → linkt naar Google review pagina

### 8. Offerte & Contact (bg: warm-geel, dotted border)
- **H2:** "Trek gekregen?"
- **Subtitle:** "Vraag vrijblijvend een offerte aan. We denken graag met je mee! Voor andere vragen: 06 48 18 58 48 of info@food-tuk.nl"
- **Form (Web3Forms):**
  - Naam* (text, required)
  - Telefoonnummer (tel)
  - E-mail* (email, required)
  - Aantal personen (schatting) (text)
  - Datum en locatie (text)
  - Extra opmerking (textarea)
  - Submit: "Offerte aanvragen"
- Subject: "Offerte aanvraag van {naam}"

### 9. Foto Slider (fullwidth, geen section-padding)
- Splide auto-scroll, infinite loop
- 11 foto's (food close-ups, tuk in actie)
- Rounded images (16px), ~300px breed per slide (200px mobile)
- Geen controls, auto-play

### 10. Footer (bg: dark/brand-dark)
- 3-kolom grid:
  - **Socials:** Instagram, Facebook, Tiktok (met iconen)
  - **Contact:** 0648185848, info@food-tuk.nl
  - **Bedrijfsgegevens:** KVK: 93211929, BTW: NL001176266B65
- **Credit:** "Website gerealiseerd door We Network"

---

## /agenda pagina

Zie `docs/plans/2026-04-20-foodtuk-agenda-design.md` voor volledig ontwerp.

Samenvatting:
- Route: `/agenda`
- Nav-item "Agenda" in header
- Hero/kop: "Komende events" + subhead
- Event-rij component (zelfde als homepage teaser)
- 5 events per pagina, paginering bij >5
- CTA blok onderaan: "Staan we niet in jouw stad? Vraag een offerte aan."
- Data: Directus CMS `events` collectie
- Empty state met CTA naar offerte

---

## Design Tokens

```css
@theme {
  /* Kleuren */
  --color-brand-primary: #b0a354;    /* goud/olive — buttons, accents, headings */
  --color-brand-dark: #1a1a1a;       /* donker — footer, card overlays */
  --color-brand-light: #faf6e0;      /* cream — site achtergrond */
  --color-brand-accent: #fff8d4;     /* warm geel — alternatieve sectie-bg */
  --color-brand-soft: #ebe3ae;       /* licht goud — pill achtergrond */
  --color-brand-subtle: #9e9977;     /* muted olive — body tekst */
  --color-text: #e9e9e9;             /* licht — headings op dark bg */
  --color-text-muted: #9e9977;       /* muted — body tekst */

  /* Fonts */
  --font-display: 'El Messiri', serif;
  --font-body: 'Satoshi', sans-serif;

  /* Z-index */
  --z-header: 50;
  --z-overlay: 100;
  --z-modal: 200;
}
```

### Typografie

| Element | Font | Gewicht | Grootte (desktop) | Lijn-hoogte | Kleur |
|---------|------|---------|-------------------|-------------|-------|
| H1 | El Messiri | 700 | 56px (text-hero) | 72px | #e9e9e9 |
| H2 | El Messiri | 600 | 48px (text-display) | 64px | #b0a354 |
| H3 | El Messiri | 600 | 32px (text-heading) | 40px | #e9e9e9 |
| Body | Satoshi | 500 | 20px (text-lg) | 150% | #9e9977 |
| Nav links | Satoshi | 500 | 16px | — | #b0a354 |
| Button text | Satoshi | 600 | 16px | 16px | #ffffff |
| Pill | Satoshi | 400 | 12px | 12px | #b0a354 |

### Mobiel (≤767px)
| Element | Grootte | Lijn-hoogte |
|---------|---------|-------------|
| H1 | 32px | 40px |
| H2 | 32px | 40px |
| H3 | 24px | 32px |
| Body | 16px | 24px |

---

## Technische beslissingen

| Beslissing | Reden |
|-----------|-------|
| NL-only (geen i18n addon) | Site is alleen Nederlands |
| Geen routes.ts / localePath() | Single-language, geen vertaalde slugs nodig |
| Web3Forms voor formulier | Simpele form-to-email, geen backend nodig |
| Trustindex embed voor reviews | Auto-updates, geen API configuratie |
| Splide voor foto-slider | Lightweight, accessible, al in gebruik |
| Typed.js voor hero-animatie | Typed effect exact nabouwen |
| Directus voor agenda events | Klant-beheert, rebuild via webhook |
| Background videos (.mp4) | Sfeer-element, identiek aan origineel |
| Section.astro gebruiken | Design system standaard voor reguliere secties |
| Hero: handmatige markup | Nodig voor video-achtergrond + header clearance |
| Umami analytics | Privacy-friendly |

---

## Component Lijst

| Component | Bestand | Beschrijving |
|-----------|---------|--------------|
| Header | `src/components/Header.astro` | Fixed nav met pill-scroll-effect, mobile menu |
| Hero | `src/components/Hero.astro` | Fullscreen video bg, typed.js animatie, CTA |
| AboutSection | `src/components/AboutSection.astro` | "Wat wij doen" — tekst + pills + image |
| FeatureCards | `src/components/FeatureCards.astro` | 3 video-bg cards grid |
| FAQ | `src/components/FAQ.astro` | Accordion met JSON-LD |
| AgendaTeaser | `src/components/AgendaTeaser.astro` | Max 3 events + CTA |
| EventRow | `src/components/EventRow.astro` | Herbruikbaar event-rij component |
| Reviews | `src/components/Reviews.astro` | Trustindex widget embed |
| ContactForm | `src/components/ContactForm.astro` | Web3Forms offerte-form |
| PhotoSlider | `src/components/PhotoSlider.astro` | Splide auto-scroll slider |
| Footer | `src/components/Footer.astro` | Socials, contact, bedrijfsinfo |
| Section | `src/components/Section.astro` | Micro-primitive (uit template) |
| Stack | `src/components/Stack.astro` | Micro-primitive (uit template) |

---

## Assets (uit wpress)

### Fonts
- `Satoshi-Variable.ttf` → `public/fonts/Satoshi-Variable.ttf`
- El Messiri → Google Fonts (preconnect + link)

### Afbeeldingen (→ `public/images/`)
- FoodTuk-logo.webp
- sfeerfotos-van-foodtuktuk.webp
- foto4.webp (OG image)
- food-tuk-favicon.png
- Foodtuk-Skewers-4F9A*.webp (11 slider foto's)

### Video's (→ `public/videos/`)
- foodtruck-backgroundvideo-compressed.mp4 (hero)
- backgroundvideo-card1.mp4
- backgroundvideo-card2.mp4
- backgroundvideo-card-3.mp4

### SVG Iconen (→ inline of `src/icons/`)
- mail1.svg, call.svg, facebook.svg, instagam2.svg, tiktok.svg
- icon-forward.svg, chevron-down-outline.svg, menu.svg, menu-white.svg, review.svg

---

## SEO

- **Title:** "FoodTuk Skewers — De lekkerste saté én sfeermaker voor jouw event"
- **Description:** "Met onze food tuk brengen wij authentieke Indonesische saté naar feesten en bedrijven door heel Nederland. Zoals het hoort, live gegrild op houtskool."
- **OG image:** foto4.webp
- **Structured data:** FAQPage JSON-LD op homepage
- **Canonical:** https://food-tuk.nl/
- **Analytics:** Umami (c2544fd7-f307-496a-aea9-4f01d9669f25) + GA (GT-WV8F2737)

---

## Status

- [x] Fase 0: briefing
- [x] Fase 1: design document
- [ ] Fase 2: project setup
- [ ] Fase 3a: Header + Hero
- [ ] Fase 3b: About + FeatureCards + FAQ
- [ ] Fase 3c: Agenda Teaser + Reviews + Contact + Slider
- [ ] Fase 3d: Footer + /agenda pagina
- [ ] Fase 4: Content & Polish
- [ ] Fase 5: Deploy
- [ ] Fase 6: Directus CMS
