# Cloudflare Pages launch plan

## Doel

FoodTuk statisch deployen op Cloudflare Pages, met rebuilds vanuit Directus en een dagelijkse rebuild voor agenda-archief.

## Cloudflare Pages project

1. Maak een nieuw Cloudflare Pages project aan vanuit de GitHub repository.
2. Build settings:
   - Framework preset: `Astro`
   - Build command: `npm run check && npm run build`
   - Build output directory: `dist`
   - Node version: stel `NODE_VERSION=22` in.

## Environment variables

Voor launch zonder Directus kan de site bouwen zonder deze variabelen. Dan gebruikt de agenda lokale fallback-data.

Voor launch met Directus:

| Variable | Waarde |
|---|---|
| `DIRECTUS_URL` | `https://cms.food-tuk.nl` zodra DNS live is, anders tijdelijke Directus URL |
| `DIRECTUS_TOKEN` | Static token van de API Reader gebruiker |
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms key voor het offerteformulier |

## Deploy hook

1. Cloudflare Pages → project → Settings → Builds & deployments → Deploy hooks.
2. Maak hook: `directus-content-change`.
3. Bewaar de hook URL.
4. Voeg in GitHub repository secrets toe:
   - `CLOUDFLARE_DEPLOY_HOOK`

De workflow `.github/workflows/daily-rebuild.yml` triggert deze hook dagelijks om 03:10 UTC. Zonder secret doet de workflow niets.

## Directus rebuild trigger

In Directus komt een Flow:

- Trigger: item create/update/delete.
- Collectie: `events`.
- Action: POST naar dezelfde Cloudflare Pages deploy hook.

## Controle voor livegang

- Lokaal: `npm run check && npm run build`
- Cloudflare preview controleren:
  - `/`
  - `/agenda`
  - `/agenda/archief`
  - `/sitemap-index.xml`
  - `/robots.txt`
