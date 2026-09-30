---
title: "ADR 0002: Worker per Bubble in a per-extension sandbox, rendered to host DOM"
description: How third-party Bubble code runs and draws.
order: 10
---

> **Status: proposed.** Draft, 2026-09-30. Subject to the benchmark and review described below.

## Context

A Bubble must feel native in a chat, sit next to other Bubbles, be glued, and follow
host theming and accessibility. Third-party code must not reach host cookies, storage or API.

## Decision

- Each third-party extension gets **one hidden sandboxed iframe**, opaque origin, no `allow-same-origin`.
- Inside it, **one Web Worker per Bubble** runs the extension's code.
- The worker's DOM is mirrored to the host, which renders it into a **Shadow DOM** per
  Bubble after an **allowlist sanitizer**, with **CSS containment**.
- Built-in extensions use the same pipeline.
- Declarative Bubbles send the same HTML subset as data with no worker. Frame mode stays an option.

## Consequences

- Lighter than one document per Bubble, and Bubbles are real accessible DOM that can be themed and glued.
- **Weaker isolation than one iframe per Bubble.** A sanitizer bug runs extension-controlled content on the host origin.
  The sanitizer is security-critical and needs adversarial tests and external review before any third-party extension ships.
- Needs a benchmark confirming the weight advantage.

## Rejected alternatives

- **One iframe per Bubble.** Strongest isolation, but each Bubble boots a full document,
  sizing inside a chat is a constant fight and gluing adjacent iframes is awkward.
  Kept as Frame mode.
- **A worker drawing into a canvas.** Light, but screen readers cannot read it, and IME, autofill,
  text selection and host theming are lost. A per-Bubble canvas toolkit costs megabytes.
  Rejected as a mode; OffscreenCanvas stays available as a component for charts and maps.
- **Scoped extension ids.** See ADR 0001.
