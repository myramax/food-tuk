# FoodTuk Agenda — Design

**Datum:** 2026-04-20
**Status:** Design, nog niet geïmplementeerd
**Context:** Ombouw van food-tuk.nl (WordPress) naar Astro + Directus. Agenda-sectie is een nieuwe feature — toont waar en wanneer de foodtruck staat op festivals, markten en publieke events.

## Doel

Bezoekers kunnen zien waar ze de FoodTuk de komende tijd in het echt kunnen bezoeken. De klant beheert de agenda zelf via een CMS zonder tussenkomst van de ontwikkelaar.

## Stack & architectuur

- **Frontend:** Astro 6 + Tailwind (core van web-template-v2), geen i18n-addon (NL-only).
- **CMS:** Directus — nieuwe instance per klant-pattern, draait op bestaande Coolify-server.
- **Forms:** `forms-cloudflare` addon voor de bestaande offerte-aanvraag (onveranderd).
- **Hosting:** Cloudflare Pages.
- **Data-flow:** Astro haalt events op bij build-time. Directus-flow op collection-change triggert rebuild via Cloudflare Pages deploy-hook. Rebuild duurt ~30-60 seconden.

## Data-model

Directus-collectie `events`:

| veld | type | required | opmerking |
|---|---|---|---|
| `id` | uuid | ja | primary key |
| `name` | string | ja | naam event, bv. "Foodtruckfestival Amersfoort" |
| `location` | string | ja | vrij tekstveld, bv. "Vondelpark, Amsterdam" |
| `start_datetime` | datetime | ja | bepaalt volgorde en "voorbij"-status |
| `end_datetime` | datetime | ja | voor tijdrange in tegel |
| `status` | selectie | auto | `draft` / `published` (Directus-standaard) |
| `date_created` | datetime | auto | Directus-systeem |

**Filtering bij build:**
- Alleen `status = published` én `end_datetime >= nu`.
- Gesorteerd op `start_datetime` ascending.
- Past events blijven in Directus voor records, verschijnen niet op de site.

## Site-structuur

**Twee plekken waar events verschijnen:**

1. **Homepage-teaser** (one-pager sectie, direct boven de FAQ).
2. **`/agenda`-pagina** (eigen route, linkt in de nav als "Agenda").

Beide gebruiken dezelfde event-rij-component voor consistentie.

## Homepage-teaser

- **Plek:** direct boven de FAQ-sectie op de homepage.
- **Kop:** "Komende events"
- **Subkop:** één regel, laagdrempelig, in FoodTuk's warme tone-of-voice (bv. *"Kom ons proeven op een van deze plekken"*). Definitieve tekst bij content-pas.
- **Max 3 eerstvolgende events**, geen paginering.
- Elk event = één rij (zie rij-layout hieronder).
- **CTA onder de lijst:** `bekijk volledige agenda →` — linkt naar `/agenda`.
- **Fewer-than-3 case:** als er 1 of 2 events zijn, toont alleen die. Geen opvul-rijen.

## `/agenda`-pagina

- **Route:** `/agenda`.
- **Nav:** item "Agenda" in de header, linkt naar `/agenda`. Bij klikken vanaf andere pagina → route-navigatie, geen anchor-scroll.
- **Hero / kop:** zelfde titel "Komende events" met iets uitgebreidere subkop (bv. *"Waar je onze foodtruck de komende tijd kunt vinden"*).
- **Events-lijst:** identieke rij-component als teaser.
- **5 events per pagina**, paginering onderaan.
  - Paginering alleen zichtbaar bij meer dan 5 events.
  - Stijl: subtiel, gecentreerd (bv. `← 1 / 2 / 3 →`).
  - Astro genereert statische routes: `/agenda`, `/agenda/2`, `/agenda/3`, etc. (build-time).
- **Onder de lijst:** één CTA-blok — *"Staan we niet in jouw stad? Vraag een offerte aan."* → linkt naar offerte-sectie op homepage.

## Rij-layout

**Per event, één horizontale rij:**

- **Links:**
  - **Event-naam** (prominent, groter).
  - **Locatie** (kleiner, grijzer) eronder.
- **Rechts: datum-tegel**
  - **Datum** (bv. `19 apr`), groter, eerste regel.
  - **Tijdrange** (bv. `12:00-18:00`), kleiner, tweede regel.
  - Geen dag-van-de-week.

**Scheiding:** rijen gescheiden door subtiele divider.

**Mobiel:** rij blijft horizontaal — content links, datum-tegel rechts (iets smaller). Als event-naam lang is, wrapt hij over twee regels; tegel blijft rechtsboven uitgelijnd.

## Empty state (0 toekomstige events)

**Anders dan de normale rij-layout.** Op zowel homepage-teaser als `/agenda`:

> *"Geen events gepland op dit moment — maar we komen graag bij jou langs."*
>
> Knop: *"Vraag een offerte aan →"* — scrollt naar offerte-sectie op homepage, of navigeert daarheen als je op `/agenda` zit.

## CMS-ervaring (klant)

- Eén collectie zichtbaar: `Events`.
- Velden: `name`, `location`, `start_datetime`, `end_datetime`. Datetime-pickers.
- Publish/draft via Directus-standaard toggle.
- Rol beperkt tot alleen de `events`-collectie — geen toegang tot overige data of instellingen.
- Past events blijven zichtbaar in admin (sortering nieuwste bovenaan). Klant kan zelf opschonen of laten staan.

## Rebuild-flow

1. Klant voegt event toe / bewerkt / verwijdert in Directus.
2. Directus flow (collection-change trigger) → POST naar Cloudflare Pages deploy-hook.
3. Astro bouwt opnieuw (~30-60 sec). Nieuwe data in statische HTML.
4. Klant ziet het ongeveer een minuut later live.

**Failure-gedrag:** bij mislukte build blijft vorige versie live — Cloudflare Pages vervangt pas na een succesvolle build.

## Buiten scope (bewust weggelaten, YAGNI)

Overwogen tijdens brainstorm, bewust niet in v1:

- Event-beschrijving veld.
- Event-URL / klikbare link naar externe event-website.
- Foto's per event.
- Multi-dag events (klant maakt losse rijen per dag).
- Filters of zoek op stad of datum.
- Cancelled / postponed status (klant past datum aan of verwijdert).
- EN-vertaling / i18n.
- RSS / iCal feed van events.
- Kaartweergave / Google Maps embed.
- Archief-pagina met past events.

Als een van deze later toch gewenst is, kan het los worden bijgebouwd — het data-model en de component-structuur zijn bewust compact gehouden zodat uitbreiding niet hoeft te breken met het huidige ontwerp.

## Open punten voor implementatie

- Exacte styling van datum-tegel (rand, achtergrond, typografie) — bij visual design.
- Definitieve tekst van subkop en empty-state copy — bij content-pas.
- Directus webhook/flow configuratie — bij opzetten van Directus-instance.
- Cloudflare Pages deploy-hook URL — beschikbaar zodra hosting is opgezet.
