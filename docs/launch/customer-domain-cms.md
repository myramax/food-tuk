# CMS op klantdomein

## Doel

Directus uiteindelijk draaien op:

`https://cms.food-tuk.nl`

De publieke site blijft:

`https://food-tuk.nl`

## Waarom subdomein

Een subdomein is beter dan `food-tuk.nl/cms`, omdat Directus een aparte applicatie is met eigen admin routes, API routes, assets, cookies en websockets. Met een subdomein blijft routing via Coolify/Traefik simpel en voorspelbaar.

## DNS

In de DNS-zone van `food-tuk.nl`:

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `cms` | IP van de Coolify server | DNS only |

Gebruik DNS only als Coolify/Traefik Let's Encrypt beheert.

## Coolify

In de Directus service:

- Domain: `https://cms.food-tuk.nl:8055`
- `PUBLIC_URL=https://cms.food-tuk.nl`

Daarna service opnieuw deployen en SSL laten provisionen.

## Astro/Cloudflare Pages

Update environment variable:

`DIRECTUS_URL=https://cms.food-tuk.nl`

`DIRECTUS_TOKEN` blijft hetzelfde zolang de Directus instance en gebruiker hetzelfde blijven.

## Migratie vanaf tijdelijke URL

Als Directus eerst op een tijdelijke Coolify URL draait:

1. Schema en data blijven staan.
2. Koppel `cms.food-tuk.nl` in DNS.
3. Update Coolify domain en `PUBLIC_URL`.
4. Update `DIRECTUS_URL` in Cloudflare Pages.
5. Trigger een rebuild.

Er hoeft geen data verhuisd te worden.
