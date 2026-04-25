# SEO launch audit

## Status

De site heeft nu een solide SEO-basis voor lancering:

- Per pagina een eigen `<title>` en meta description.
- Canonical URLs via `Astro.site`.
- Open Graph en Twitter Card tags.
- `robots.txt` met sitemap-verwijzing.
- Astro sitemap generatie.
- FAQ structured data op de homepage.
- Launch-fix: LocalBusiness/FoodEstablishment structured data toegevoegd.
- Launch-fix: 404 krijgt `noindex, follow`.
- Launch-fix: agenda-archief krijgt `noindex, follow` en wordt uit de sitemap gehouden.

## Pagina's

### Homepage

Doel: hoofdlandingspagina voor FoodTuk Skewers, foodtruck/catering/offerte.

Goed:
- Sterke H1 in de hero.
- Duidelijke secties met H2's.
- FAQ schema aanwezig.
- Reviews en contactinformatie zijn zichtbaar.
- Social/proof content staat op de pagina.

Aangepast:
- Structured data is nu een `@graph` met `WebSite`, `FoodEstablishment`/`LocalBusiness` en `FAQPage`.
- OG image alt en theme color toegevoegd via de basislayout.

Nog handmatig te controleren voor livegang:
- Google Business Profile URL toevoegen als `sameAs` zodra die definitief bekend is.
- Eventuele exacte vestigingsplaats/adres alleen toevoegen aan schema als die publiek en correct is.

### Agenda

Doel: actuele publieke events tonen.

Goed:
- Eigen route `/agenda`.
- Eigen title/description.
- Events worden vanaf nu build-time gefilterd: afgelopen events verdwijnen uit de publieke agenda.
- De pagina blijft indexeerbaar.

Bewuste keuze:
- Nog geen Event JSON-LD zolang Directus nog geen echte klantdata bevat. Zodra Directus live is en events echt zijn, kan Event schema worden toegevoegd.

### Agenda archief

Doel: UX/social proof voor bezoekers die eerdere events willen zien.

Bewuste SEO-keuze:
- `noindex, follow`.
- Niet in sitemap.

Reden: archiefpagina's kunnen op termijn dunne/oude content worden. Voor FoodTuk is de actuele agenda commercieel relevanter. Het archief blijft bereikbaar vanaf de agenda, maar hoeft niet als losse zoekresultaatpagina te concurreren.

## Technische SEO

Goed:
- `astro.config.mjs` heeft `site: 'https://food-tuk.nl'`.
- Sitemap wordt gegenereerd.
- Canonicals gebruiken de echte site URL.
- Favicon en Apple touch icon zijn aanwezig.
- Afbeeldingen hebben alt waar ze inhoudelijk zijn; decoratieve marquee-afbeeldingen zijn leeg gelabeld.

Aangepast:
- `meta name="robots"` standaard op `index, follow`.
- `theme-color` en `color-scheme` toegevoegd.
- `og:site_name`, `og:image:alt` en `twitter:image:alt` toegevoegd.

## Open SEO punten na Directus

- Event JSON-LD toevoegen voor gepubliceerde aankomende events.
- Controleren of Directus events echte externe event-URLs hebben; externe links moeten alleen getoond worden als ze relevant en betrouwbaar zijn.
- Google Search Console property toevoegen na livegang.
- Sitemap indienen in Search Console.
- Live canonical controleren op `https://food-tuk.nl`.
