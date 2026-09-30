# Contributing

UIBubbles is an early draft, so critique is more valuable than code.

- **Security review:** try to break the model in `docs/security.md`. Open an issue describing the attack.
- **Open questions:** pick one from `docs/open-questions.md` and argue a position.
- **Docs:** edit files under `docs/`. They are the only source; the site renders them. Keep `Status: draft` markers honest, and never state governance or security guarantees that do not exist.
- **Schema:** change `schema/uibubbles.manifest.schema.json` together with an example or fixture, then run `pnpm validate:manifests`.

Before opening a pull request run `pnpm check && pnpm build && pnpm validate:manifests`.
Licensing is provisional (Apache-2.0 code, CC-BY-4.0 docs); contributions are accepted under the same terms.
