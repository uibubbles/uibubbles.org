---
title: "ADR 0001: Extension id is an https URL"
description: DNS is the registry.
order: 9
---

> **Status: proposed.** Draft, 2026-09-30.

## Context

Extensions must be addressable in one another's manifests and calls. We want no
central registry and no scope authority at the start, and identity that survives
moving the code to a CDN.

## Decision

An extension's id is an https directory URL that contains `uibubbles.json`.
Ids are normalised: https only, trailing slash, no query or fragment. The manifest's
`entry.url` holds the code location, separate from the id. The caller's manifest
maps local aliases to ids with a version range. On install the host pins the signing key.
Identity is the URL plus the pinned key.

## Consequences

- No registry needed to start. Anyone with a domain can publish.
- Domain expiry and re-registration is a real risk, answered by key pinning.
- Moving hosting does not change identity.
- Discovery is unsolved; direct addressing only.

## Rejected alternatives

- **Scoped ids (`@scope/name`).** Needs a scope authority and a registry, so a
  central party from day one.
- **Reverse-DNS ids (`com.example.contacts`).** Not fetchable, so a separate lookup
  is needed, and they invite unverified claims.
- **Id equals code URL.** Ties identity to hosting and breaks on every CDN move.
