---
title: Extension ids
description: How an extension is named, found and identified.
order: 4
---

> **Status: draft.**

## The rule

An extension's id is an **https directory URL** that contains the manifest file
`uibubbles.json`. There is no special path. DNS is the registry: no scope
authority and no central registry.

```text
id:        https://tax-calculator.example.com/
manifest:  https://tax-calculator.example.com/uibubbles.json
```

The id page itself is the extension's human-facing landing page.

## Normalisation

https only, trailing slash, no query, no fragment. Exact normalisation rules
(case, default port, internationalised hosts) are still open.

## The id is not the code location

The manifest's `entry.url` says where code loads from, so moving to a CDN never
changes the id. The same lesson XML namespaces taught.

## Local aliases

A caller's manifest maps a short alias to an id and pins a version range,
like an import map:

```json
"uses": {
  "contacts": { "id": "https://contacts.example.com/", "version": "^1" }
}
```

Code then calls `uib.ext("contacts").choose(...)`.

## Identity is URL plus pinned key

On install the host pins the extension's signing key (trust on first use). An
update signed by a different key, for example after a domain lapses and is
re-registered, is refused or re-asks the user.

## Built-ins

Built-in extensions follow the same rule under the host vendor's domain
(hypothesis).

See [ADR 0001](/docs/adr/0001-extension-id-is-https-url/).
