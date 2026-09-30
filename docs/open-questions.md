---
title: Open questions
description: What is not decided yet, in priority order.
order: 6
---

> **Status: draft.** Unresolved means unresolved. Nothing on this page is a decision.

## P0: blocks any third-party extension

1. **The HTML/CSS allowlist.** Is the browser Sanitizer API alone enough, or do we need our own?
2. **Which security claims can UIBubbles responsibly make?** Decide after the adversarial test suite exists.
3. **Worker-DOM library.** Shopify remote-dom, AMP worker-dom, or our own.
4. **Benchmark.** Is a per-extension iframe plus one worker per Bubble materially lighter than one iframe per Bubble?
5. **Which headless grants need explicit user confirmation**, and are they per session or persistent?
6. **Provider identity and trust.** Key pinning and rotation rules, revocation, and the exact URL normalisation.

## P1: blocks protocol 0.1

7. **Canonical wire format** for Declarative Bubbles. Can or should A2UI or OpenUI be the basis?
8. **How methods are named and versioned.** Is a semver range in `uses` enough?
9. **How glue walls are declared and typed.** Do event payloads reuse JSContact and JSCalendar?
10. **Host-mediated networking.** How exactly does it work, and how are dangerous combinations such as data access plus open network refused?
11. **Runtime permission requests.** How does a Bubble ask for more capability after it is running?
12. **Surface constraints.** How are dimensions and display modes negotiated?
13. **Accessibility semantics.** How are they represented so they survive mirroring and text fallback?
14. **Themes and design tokens.** How do they pass to Declarative and Worker Bubbles?
15. **Composition bindings.** How do glue bindings work beyond matching `emits` to `accepts`?
16. **State ownership.** Who owns Bubble state when a Bubble is popped and later restored?

## P2: later

17. **What does pin mean** across sessions and devices? What does pinning a foam mean?
18. **Portability.** How portable can Declarative Bubbles realistically be across web, native and TUI?
19. **Discovery.** Beyond direct id addressing, how are extensions found? Is a registry needed, and can MCP advertise Bubble capabilities?
20. **Swappable providers** behind abstract capabilities (`contacts.choose` served by whichever provider the user prefers). Outlined only; Web Intents is the warning.
21. **Conformance.** The minimum requirements for a Host and for an extension.

## Project questions

22. **Licensing.** Apache-2.0 for code and CC-BY-4.0 for documentation and spec is the provisional choice.
23. **Governance** of a public standard. Undecided. Nothing will be claimed until it is decided.
24. **Repository layout.** One repository (site, spec, runtime) for speed, or separate repositories?
25. **When uibubbles.org goes public.** The domain is on Cloudflare; the site is not deployed yet.
26. **Signing and provenance at scale**, and cross-device pin state. Matter only at third-party scale.
