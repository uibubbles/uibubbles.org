---
title: Prior art
description: What exists, and what UIBubbles reuses or adds.
order: 5
---

> **Status: draft.** Descriptions reflect the state of these projects as understood in September 2026 and should be re-verified.

| Project | What it does | Why it is not enough |
|---|---|---|
| [MCP Apps](https://modelcontextprotocol.io/) (SEP-1865) | A tool result renders as a sandboxed iframe. The host passes context (theme, locale, timezone, display mode, size) plus tool input and result. The widget can call only its own server's tools. | No calls between apps and no gluing. The host never lends its own data. |
| [Google A2UI](https://github.com/google/A2UI) and [Thesys OpenUI](https://github.com/thesysdev/openui) | Interactive declarative UI an agent generates and the host renders. | No third-party code runs, so no extensions and no calls between them. Useful input for the Declarative mode format. |
| Facebook and VK apps, Wix, [Telegram Mini Apps](https://core.telegram.org/bots/webapps), [Teams JS SDK](https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/using-teams-client-library) | Third-party apps call a fixed set of platform APIs, including user-driven pickers. | The platform implements every API itself, each locked to one platform. Each app is a heavy iframe. |
| [Shopify remote-dom](https://github.com/Shopify/remote-dom), [AMP worker-dom](https://github.com/ampproject/worker-dom), [Figma plugins](https://www.figma.com/plugin-docs/) | Third-party code runs isolated and its UI is mirrored into, or drawn by, the host. | This is the rendering technique UIBubbles reuses. None adds calls between extensions or gluing. |
| iOS photo picker, Android `startActivityForResult`, [W3C Contact Picker](https://www.w3.org/TR/contact-picker/), [Sandstorm Powerbox](https://sandstorm.io/) | The user's pick is the permission. | This is the security pattern UIBubbles applies to extension-to-extension calls. |
| Web Intents (Chrome 2012, abandoned) | Intent, then a provider chosen per call. | A cautionary tale: asking the user to choose a provider on every call killed it. |

## Where UIBubbles is meant to add something

1. **Extension-to-extension calls brokered by the host**, with the user's pick as the grant.
2. **Gluing**: host-owned walls where only declared events cross.
3. **DNS-addressed extension ids** without a central registry.
4. All of it on an isolation model that is cheaper than one iframe per Bubble, with its weaker isolation stated plainly.

## Relationship to other standards

UIBubbles aims to use rather than compete. Its Declarative subset may align with
or adapt A2UI. A later adapter could expose a Bubble as an MCP App. Payloads
reuse JSContact (RFC 9553) and JSCalendar (RFC 8984).
