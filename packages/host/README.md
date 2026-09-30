# @uibubbles/host

Placeholder for the reference UIBubbles host. `private: true`; not published.

**Status: draft, types only.** `src/index.ts` exports TypeScript types for the
`0.1-draft` manifest and the `uib` API that extension code sees (`ext`, `invoke`,
`emit`, `on`). There is no runtime yet.

## Intended scope

- Mount Bubbles: Declarative (data rendered by the host), Worker (one hidden
  sandboxed iframe per third-party extension, one Web Worker per Bubble, DOM
  mirrored into a Shadow DOM through an allowlist sanitizer) and Frame.
- Broker calls between extensions: interactive picker stack with depth limit and
  cycle detection, headless calls checked against grants.
- Own the glue wall: route only declared `emits`/`accepts` events between touching Bubbles.
- Pin extension signing keys on install.

The sanitizer boundary is the security-critical core and needs adversarial tests
and external review before any third-party extension ships. See
`docs/security.md`.

## Check

```sh
pnpm --filter @uibubbles/host check
```
