---
title: Concepts
description: Terminology and the moving parts of a Bubble system.
order: 2
---

> **Status: draft.** Terms may be renamed before 0.1.

## Terminology

| Term | Meaning |
|---|---|
| **Bubble** | One isolated UI instance of an extension, shown inside a host surface. |
| **Host** | The application that shows Bubbles, brokers calls between them and decides grants. |
| **Surface** | A host-controlled area where Bubbles appear: a chat thread, a dashboard, a TUI pane. |
| **Extension** | Something a user installs. Identified by an https URL. The unit of trust. Can provide methods, use other extensions' methods, and render Bubbles. |
| **Manifest** | `uibubbles.json` in the extension's id directory: identity, modes, provided and used methods, emitted and accepted events, network domains, requested permissions. |
| **Mode** | How a Bubble renders: Declarative, Worker or Frame. A mode implies no capability. |
| **Call** | One extension invoking a method another extension provides, always through the host. |
| **Glue** | A host-owned shared wall between touching Bubbles across which declared events pass. |
| **Foam** | A cluster of glued Bubbles. Pure data: members plus walls. |

## Rendering modes

- **Declarative.** Data only: an HTML subset the host renders itself. No code
  from the extension runs. Doubles as the text and TUI fallback.
- **Worker.** Third-party code. One hidden sandboxed iframe per third-party
  extension, one Web Worker per Bubble. The worker's DOM is mirrored into a
  Shadow DOM in the host through an allowlist sanitizer with CSS containment.
- **Frame.** A visible iframe for full existing web apps. Optional in the spec.

See [security](/docs/security/) for why these differ in strength.

## Calls

Extensions call each other through the host, addressed by local alias:

```js
const picked = await uib.ext("contacts").choose({ min: 1, max: 5, fields: ["name", "email"] });
// equivalent: uib.invoke("contacts.choose", { ... })
```

- **Interactive** calls open the callee's Bubble over the caller, labelled with who is
  asking. They must begin from a user gesture. The caller receives only what the
  user picked, and only the fields it requested. Nesting is allowed; the host keeps
  a stack with a depth limit, blocks cycles and propagates cancel.
- **Headless** calls, such as a free/busy query, need a grant in advance which the
  host checks.

Payloads reuse IETF formats where they exist: JSContact (RFC 9553) and JSCalendar (RFC 8984).

## Glue and foam

Touching Bubbles form a shared wall owned by the host. A glue is allowed only
where one Bubble's `emits` match the other's `accepts`, so compatible Bubbles
snap together and incompatible ones do not. Only declared events cross.

## Lifecycle verbs

| Verb | Effect |
|---|---|
| **pop** | A Bubble appears, or (popping it) disappears. Dismissing the instance does not delete the underlying resource. |
| **pin** | Keep the Bubble available on the surface. |
| **expand** | Grow from inline to panel to fullscreen. |
| **glue** | Attach touching Bubbles across a wall. By the user (drag), an agent (a glued pair pops) or a Bubble (spawn glued). |
| **unglue** | Split a cluster. Popping one Bubble leaves the others. |
| **spawn** | A Bubble asks the host to bring another Bubble into being. |

Instance lifecycle is distinct from resource lifecycle: popping a Calendar Bubble
does not delete the event it showed.

## Instance states (draft)

Like blowing a real soap bubble:

| State | Meaning | What the host shows |
|---|---|---|
| **blowing** | The instance exists; the extension is loading or the answer is not ready yet. | A small bubble right away, breathing, with an optional one-line status ("thinking…", "checking your calendar…"). It may swell a little as partial results stream in. |
| **inflated** | The Bubble has reported that it is ready, with its preferred size. | The small bubble grows into the final size and shape, with a short spring. Content fades in once it has settled. |
| **popped** | Dismissed, cancelled or failed. | A burst, replaced by a line of text when there was an error. |

Two reasons this is more than decoration: the **blowing** phase covers the real
cold-start time of a Worker Bubble (booting its extension's sandbox and worker),
and growing to the reported size is the size handshake between host and Bubble,
made visible instead of appearing as a layout jump. With
`prefers-reduced-motion`, the small bubble stays still and the Bubble
cross-fades in.
