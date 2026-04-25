# Directus agenda setup

## Collectie

Maak collectie `events`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | UUID | yes | Primary key |
| `status` | Status | yes | Directus standaard: `draft` / `published` |
| `name` | String | yes | Eventnaam |
| `location` | String | yes | Vrij tekstveld, bijvoorbeeld `Westergasfabriek, Amsterdam` |
| `start_datetime` | DateTime | yes | Startdatum en starttijd |
| `end_datetime` | DateTime | yes | Einddatum en eindtijd |
| `external_url` | String | no | Externe eventpagina |
| `external_url_label` | String | no | Bijvoorbeeld `Meer info` |

## API Reader role

Maak een role `API Reader` met read-only toegang.

Permissions:

| Collection | Create | Read | Update | Delete |
|---|---:|---:|---:|---:|
| `events` | no | yes | no | no |

Maak een gebruiker met deze role en genereer een static token.

## Editor role

Maak een role voor de klant.

Permissions:

| Collection | Create | Read | Update | Delete |
|---|---:|---:|---:|---:|
| `events` | yes | yes | yes | no |

Advies: delete uitzetten. Afgelopen events blijven zo bruikbaar voor het archief.

## Site-koppeling

De Astro build leest:

- `DIRECTUS_URL`
- `DIRECTUS_TOKEN`

Als beide ontbreken, gebruikt de site lokale fallback-events. Als beide aanwezig zijn maar Directus faalt, faalt de build. Dat is bewust: Cloudflare houdt dan de vorige succesvolle deploy live.

## Query

De site leest uit `/items/events`:

- Alleen `status = published`.
- Velden: `id`, `name`, `location`, `start_datetime`, `end_datetime`, `external_url`, `external_url_label`.
- Sortering uit Directus is startdatum; frontend doet daarna filtering en archive/upcoming split.

## Agenda gedrag

- `/agenda`: `end_datetime >= build time`.
- `/agenda/archief`: `end_datetime < build time`.
- Dagelijkse rebuild zorgt dat events vanzelf naar het archief schuiven.

## Import eerste data

De huidige fallback-events in `src/content/agenda/nl.ts` kunnen als startpunt handmatig of via import in Directus worden gezet. Controleer wel eerst of dit echte klantdata is; placeholder-events mogen niet live als echte agenda.
