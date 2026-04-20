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

## CMS (Agenda)

Events managed via Directus. Deploy hook triggers rebuild on publish.
