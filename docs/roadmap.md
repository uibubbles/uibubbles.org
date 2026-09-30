---
title: Roadmap
description: Three stages, and the evidence needed to move between them.
order: 7
---

> **Status: draft.** A plan, not a promise. There are no dates.

## 1. Website and demo MVP

- This site, the docs and the `0.1-draft` manifest schema.
- A live demo that reproduces one journey: a Calendar Bubble pops, Invite opens a contacts picker on top, a new contact calls a location picker, and Calendar and Contacts glue. A readout shows what each Bubble actually received.
- A benchmark of memory and startup for N Bubbles across M extensions, before the host runtime is fixed.
- A first host in development, with built-in extensions only.

## 2. Protocol 0.1

- Stable wire format and manifest.
- Sanitizer and sandbox core with an adversarial test suite and external review.
- Reference host and a TypeScript SDK.
- Decisions on governance and licensing.

**Evidence gate:** people prefer Bubbles to text replies and screen switching, and at
least one outside developer builds or asks to build an extension unprompted.
Without that, UIBubbles stays an internal runtime.

## 3. Ecosystem, later

- Registry or discovery beyond DNS, if needed.
- Conformance tooling and other language SDKs.
- Signing and provenance at scale.
- MCP Apps adapter, TUI and native renderers.
