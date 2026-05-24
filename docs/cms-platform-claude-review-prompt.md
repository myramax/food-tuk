# Claude Review Prompt: Long-Term CMS Platform

Use this prompt in Claude to get a second opinion on the long-term CMS architecture for We Network client websites.

---

You are reviewing a long-term architecture decision for a one-person web design/development business. Do not give a generic CMS comparison. Read the local project context first, then challenge the proposed direction.

## Relevant Local Context

Read these folders and files:

- `/home/a/projects/web-template-v2`
  - `README.md`
  - `CLAUDE.md`
  - `GUIDELINES.md`
  - `docs/operations-blueprint.md`
  - `docs/start-here.md`
  - `docs/project-workflow.md`
  - `docs/launch-checklist.md`
  - `docs/learnings-dip.md`
  - `addons/blog-directus/README.md`
  - `addons/blog-directus/files/docs/directus-profile.md`
  - `addons/blog-directus/files/docs/directus-schema-setup.md`
  - `skills/client-launch/SKILL.md`
  - `skills/client-launch/references/directus-deploy.md`

- `/home/a/projects/dip-website`
  - `CLAUDE.md`
  - `README.md`
  - `docs/guides/directus-setup.md`
  - `docs/plans/2026-03-19-single-tenant-refactor.md`
  - `docs/plans/2026-03-20-directus-provisioning.md`
  - `docs/plans/2026-03-20-dip-v2-alignment-refactor.md`
  - `src/lib/directus.ts`
  - `src/lib/types.ts`

- `/home/a/projects/food-tuk-codex`
  - `README.md`
  - `docs/design.md`
  - `docs/launch/directus-agenda.md`
  - `docs/launch/cloudflare-pages.md`
  - `docs/launch/customer-domain-cms.md`
  - `src/lib/agenda-source.ts`

- Claude memory/context if available:
  - `/home/a/.claude/projects/-home-a-projects-dip-website/memory/user_web_business.md`
  - `/home/a/.claude/projects/-home-a-projects-dip-website/memory/project_hosting_architecture.md`
  - `/home/a/.claude/projects/-home-a-projects-dip-website/memory/project_web_template_v2.md`
  - `/home/a/.claude/projects/-home-a-projects-dip-website/memory/project_dip_website.md`
  - `/home/a/.claude/projects/-home-a-projects-dip-website/memory/MEMORY.md`

Do not read or expose secrets. If you inspect `.env`, only check variable names/presence, not values.

## Current Business Context

The user runs a small web design/development business and wants a repeatable website system.

Current frontend model:

- Each client website frontend lives in the client's GitHub account.
- Each frontend is hosted in the client's Cloudflare Pages account.
- The user is added as maintainer/admin.
- Astro static sites are the standard.
- Fixed marketing content usually lives in code.
- CMS is only used where editors need autonomy: blogs, agenda/events, structured dynamic content.

Current backend/CMS model:

- `web-template-v2` currently standardizes around optional Directus for blog/structured content.
- DIP uses Directus 11 via Coolify, DO Managed PostgreSQL, and Cloudflare Pages rebuild webhooks.
- DIP was migrated from an earlier multi-tenant Directus model to single-tenant Directus per client.
- The reason documented in `2026-03-19-single-tenant-refactor.md`: Directus multi-tenancy added too much complexity for limited cost savings; per-client Directus gave cleaner isolation.
- FoodTuk now needs an agenda/events CMS, currently planned as Directus `events`.
- There is also n8n on the same Coolify/DigitalOcean backend for some automation flows.
- The current DO droplet hit resource limits while trying to deploy another Directus instance. There is already at least DIP Directus and n8n running.

Important update from the user:

- Directus content backups currently go to Cloudflare R2 buckets owned by the client.
- This client-owned backup pattern matters and should not be lost.

## What The User Wants

The user does not want a menu of choices. They want one robust long-term standard.

Criteria:

- Optimize for the architecture the user's future self will be glad to maintain for years, not for what is easiest to migrate this week.
- Current migration hassle is acceptable if the long-term system is materially cleaner, stronger, and easier to build on.
- The user wants a system they can build on for years and years, not a short-term workaround.
- Minimal maintenance after initial setup.
- Minimal hassle when adding a new client website.
- Future-proof and not fragile.
- Minimalistic, unlike WordPress/plugin-heavy stacks.
- Strong architecture, not a weak or hacked-together system.
- Client should not be stuck if something happens to the user.
- Assume the user's server may keep running for at least about a month, but the client must be able to recover/migrate without depending on the user.
- The client already owns frontend code and frontend hosting. The open question is CMS, database, media, backups, export/import, and recovery.

## Prior Discussion Summary

Directus per client:

- Pros:
  - Strong isolation.
  - Easy conceptual ownership.
  - Raw technical migration is straightforward: database dump + uploads/storage + env/config + Directus instance.
  - Different clients can have different schemas without polluting a central CMS.
- Cons:
  - More services per client.
  - More Coolify/Docker resources.
  - More backup, update, deploy, health-check, and provisioning overhead.
  - Current resource issue is already showing this pain.

Shared Directus multi-tenant:

- Previously considered and then rejected in DIP context.
- Directus can model tenants with `sites`, roles, filters, and policies, but this increased complexity in frontend queries, permissions, schema, and mental overhead.
- The current template intentionally moved away from this.

Payload central CMS:

- Payload is MIT licensed and code-first.
- Official multi-tenant support exists via the Payload multi-tenant plugin.
- It can model one central agency CMS with tenants/sites and modules such as blog/events/settings/media.
- Adding a client becomes tenant setup rather than deploying a new CMS instance.
- The schema/access control can be in Git and reviewed/tested.
- But export/import/recovery must be intentionally built; the default import/export plugin alone should not be assumed sufficient for a Webflow-like exit path.

The proposed direction from Codex was:

```text
One central We Network Payload CMS
1 managed Postgres database
Multi-tenant in code
Client-owned Cloudflare R2 for media and recovery packs
Client-owned GitHub + Cloudflare Pages remain as-is for frontend
```

Hard architectural rule:

```text
Frontend ownership: client-owned GitHub + client-owned Cloudflare Pages
Media ownership: client-owned R2 bucket
Recovery ownership: client-owned R2 bucket
CMS operation: We Network central Payload
```

## Proposed Target Architecture To Review

For every client:

```text
Client GitHub
  -> frontend code

Client Cloudflare Pages
  -> live Astro website

Client Cloudflare R2
  -> media files
  -> CMS recovery packs
  -> latest export/backups

We Network Payload CMS
  -> editor UI
  -> content database
  -> tenant/module access control
  -> deploy webhooks to client Cloudflare Pages
```

For DIP:

```text
tenant: dip
modules: blog, ctas, authors, maybe settings
media: DIP-owned R2
recovery exports: DIP-owned R2
frontend: DIP-owned GitHub + DIP-owned Cloudflare Pages
```

For FoodTuk:

```text
tenant: food-tuk
modules: events/agenda, maybe settings
media: FoodTuk-owned R2 if CMS media is needed
recovery exports: FoodTuk-owned R2
frontend: FoodTuk-owned GitHub + FoodTuk-owned Cloudflare Pages
```

CMS modules should be generic, not client-specific:

```text
Good:
- tenants/sites
- posts
- events
- authors
- ctas
- navigation
- settings
- media
- deployHooks

Bad:
- dip_posts
- foodtuk_events
- custom collection per one-off client unless truly productized
```

Per tenant, enabled modules decide what the editor sees:

```text
DIP sees Blog/Authors/CTAs/Media
FoodTuk sees Agenda/Media
Other clients may see Blog + Events
```

Payload does not design pages. Astro designs pages. Payload only provides data.

Example FoodTuk agenda flow:

```text
1. Create `food-tuk` tenant in Payload.
2. Enable `events` module.
3. Create events in Payload.
4. FoodTuk Astro repo has `/agenda` page and AgendaPage component.
5. Cloudflare Pages env vars point to Payload:
   CMS_URL
   CMS_TENANT=food-tuk
   CMS_TOKEN=tenant-scoped read token
6. Astro build fetches published events for tenant `food-tuk`.
7. Payload webhook triggers FoodTuk Cloudflare deploy hook when events change.
```

## Media And Recovery Requirements

This is the most important part to scrutinize.

Do not let media depend only on the central CMS server. If media URLs point to `cms.wenetwork.nl/assets/...`, then the static frontend may remain live after the CMS server dies, but CMS images may break.

Preferred robust pattern:

```text
Media binaries live in client-owned Cloudflare R2.
Payload stores metadata and relations.
Frontend uses public R2/CDN URLs where appropriate.
Recovery exports also live in client-owned R2.
```

Every tenant should have automatic recovery packs:

```text
recovery-pack.zip
├── manifest.json
├── schema-version.json
├── content/
│   ├── posts.json
│   ├── events.json
│   ├── authors.json
│   ├── ctas.json
│   ├── navigation.json
│   └── settings.json
├── media/
│   └── optional manifest or included files, depending on storage strategy
├── import/
│   └── instructions or import script reference
└── README.md
```

Question: should media files be included physically in the recovery ZIP, or is it enough that they are already in the client's R2 with a media manifest? Consider size, cost, privacy, and recovery simplicity.

Recovery promise:

If the user disappears:

```text
1. The live frontend remains on client Cloudflare Pages.
2. Frontend code remains in client GitHub.
3. Media remains in client R2.
4. Latest content/recovery pack remains in client R2.
5. Another developer can deploy a Payload recovery template or migrate the content elsewhere.
6. Frontend env vars can be changed to a new CMS endpoint if editing must continue.
```

## Questions For Claude

Please answer these directly:

1. Is the proposed central Payload CMS + client-owned R2 media/recovery model actually the best long-term standard for this business, given the current `web-template-v2`, DIP, and FoodTuk context?

2. What are the strongest arguments against this architecture?

3. Is there a simpler architecture that gives the same:
   - low maintenance,
   - easy new client onboarding,
   - client not stuck if the user disappears,
   - clean media ownership,
   - static Astro frontend compatibility?

4. Does central Payload introduce an unacceptable platform-maintenance burden compared to Directus per client?

5. Is the tenant/module model likely to become a mess when clients have different content needs such as:
   - DIP: blog and CTAs,
   - FoodTuk: agenda/events,
   - future clients: team members, cases, locations, redirects, navigation, settings?

6. What hard rules should the Payload CMS enforce to prevent schema sprawl?

7. How should media be stored exactly?
   - One R2 bucket per client?
   - One shared R2 bucket with tenant prefixes?
   - Client-owned R2 buckets only?
   - Public URLs vs signed/private URLs?
   - How should Payload integrate with this?

8. What should a recovery/export system contain so a client is not dependent on the user?

9. How hard would it be for another developer to restore a client into:
   - a new Payload instance using the same codebase,
   - a new Payload instance without the same codebase,
   - Directus/Sanity/WordPress or another CMS?

10. Should `web-template-v2` evolve from `blog-directus` to a more generic `cms-payload` addon, or should Payload live as a separate `cms-platform` repo with frontend projects only using a small client SDK?

11. What migration path would you recommend?
   - Do not migrate DIP/FoodTuk yet?
   - Build Payload platform for new clients only?
   - Build a spike/prototype with FoodTuk agenda first?
   - Keep Directus for existing clients until there is a compelling reason?

12. What are the exact failure modes if the user disappears, and how should each be mitigated?

## Expected Output

Give a clear recommendation. Avoid giving many options unless one is explicitly preferred.

Structure your answer like this:

```text
Recommendation:
<one clear direction>

Why:
<short rationale>

What I would change in the proposed architecture:
<specific corrections>

Hard rules:
<rules that must be true for this to be robust>

Migration path:
<phased practical plan>

Risks:
<most important risks and mitigations>

Verdict:
<whether to proceed, pause, or choose another route>
```

Be strict. If the Payload plan is over-engineered or risky, say so. If Directus per client is still better despite the current pain, say so. If client-owned R2 recovery packs are insufficient, explain exactly why.
