# FoodTuk Skewers — food-tuk.nl

Indonesische saté foodtruck website. Astro 6 + Tailwind v4.

## Development

```bash
nvm use
npm install
npm run dev
```

## Build

```bash
npm run check && npm run build
```

## Hosting

Cloudflare Pages

- Build command: `npm run check && npm run build`
- Output directory: `dist`
- Node version: 22

## Environment variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for contact form |
| `DIRECTUS_URL` | Directus CMS URL for agenda events. Falls back to local content when unset. |
| `DIRECTUS_TOKEN` | Static API Reader token for the Directus `events` collection. |
| `CLOUDFLARE_DEPLOY_HOOK` | GitHub Actions secret, not runtime env. Triggers scheduled Cloudflare Pages rebuilds. |

## CMS (Agenda)

Events managed via Directus. Deploy hook triggers rebuild on publish.
See:

- `docs/launch/directus-agenda.md`
- `docs/launch/cloudflare-pages.md`
- `docs/launch/customer-domain-cms.md`
