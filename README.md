# UIBubbles

UI that pops up when you need it. A **Bubble** is an isolated UI instance of an
extension that pops into a host surface such as a chat, a dashboard or a TUI.
Extensions can use each other's UI through the host, and Bubbles that touch glue
together. Each extension sees only what the user deliberately hands it.

**Status: early draft.** Governance of any public standard is undecided. Website: https://uibubbles.org (not live yet).

## What is here

| Path | What |
|---|---|
| `site/` | Astro 7 static website (landing, docs, about) |
| `docs/` | Draft specification and docs, Markdown. The single source: the site renders these files |
| `schema/` | JSON Schema `0.1-draft` for the extension manifest, plus examples and an invalid fixture |
| `packages/host/` | `@uibubbles/host` placeholder, draft TypeScript types only |
| `scripts/` | Manifest validation and built-site checks |
| `wrangler.jsonc` | Cloudflare Workers static assets config (no custom domain yet) |

## Local development

Requires Node 24 and pnpm 12.

```sh
pnpm install
pnpm dev                 # http://localhost:4321
pnpm check               # astro check + tsc for packages/host
pnpm build               # site/dist
pnpm validate:manifests  # examples must pass, the invalid fixture must fail
pnpm verify:dist         # static sanity check of the built HTML (after build)
```

## Deployment

`.github/workflows/deploy.yml` is manual (`workflow_dispatch`) and needs the
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. **They are not configured yet**, and no custom domain route is set because domain registration is unconfirmed.

## Licensing (provisional)

Code: Apache-2.0 (`LICENSE`). Documentation and specification text: CC-BY-4.0 (`docs/LICENSE`).
This choice is provisional and may change before a public release.

## Contributing

See `CONTRIBUTING.md`. The most useful contributions right now are attacks on
[`docs/security.md`](docs/security.md) and answers to [`docs/open-questions.md`](docs/open-questions.md).
