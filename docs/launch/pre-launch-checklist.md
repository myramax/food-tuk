# Pre-launch checklist

## Blockers

Deze punten moeten rond zijn voor livegang:

- Cloudflare Pages project bestaat en bouwt met `npm run check && npm run build`.
- `PUBLIC_WEB3FORMS_ACCESS_KEY` staat in Cloudflare Pages.
- Formulier is getest vanaf een Cloudflare preview URL.
- Directus keuze is gemaakt:
  - of launch tijdelijk met lokale agenda fallback-data,
  - of Directus live met `DIRECTUS_URL` en `DIRECTUS_TOKEN`.
- Als Directus live is: `events` collectie, API Reader token en Editor role zijn ingesteld.
- Als Directus live is: echte events zijn ingevoerd; placeholder-events mogen niet als echte agenda live.
- `CLOUDFLARE_DEPLOY_HOOK` staat als GitHub secret als de dagelijkse rebuild actief moet zijn.
- DNS/live domain switch is gepland.
- Na livegang: `https://food-tuk.nl/`, `/agenda`, `/robots.txt` en `/sitemap-index.xml` geven de verwachte output.

## Non-blockers

Deze punten zijn goed om later te doen, maar blokkeren launch niet:

- Event JSON-LD toevoegen zodra Directus echte eventdata bevat.
- Google Search Console property toevoegen.
- Sitemap indienen in Search Console.
- CMS definitief omzetten naar `https://cms.food-tuk.nl` als eerst een tijdelijke Directus URL wordt gebruikt.
- Google Business Profile URL periodiek controleren als Google de bedrijfsvermelding of URL-structuur wijzigt.

## Laatste lokale checks

```bash
npm run check
npm run build
```

Controleer daarna in `dist/`:

- `dist/index.html` bevat `LocalBusiness`, `FoodEstablishment` en `FAQPage`.
- `dist/agenda/index.html` heeft `robots` op `index, follow`.
- `dist/agenda/archief/index.html` heeft `robots` op `noindex, follow`.
- `dist/sitemap-0.xml` bevat `/` en `/agenda/`, maar niet `/agenda/archief/`.
