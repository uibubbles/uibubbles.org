---
title: Security
description: Principles, a threat model sketch and the honest limits.
order: 3
---

> **Status: draft.** A sketch to be attacked, not a guarantee. No claim here
> has been independently reviewed.

## Principles

1. **A Bubble declares what it wants. The Host decides what it gets.** The
   manifest lists requests. Declaring is never granting.
2. **The user's gesture is the grant.** Picking, dropping and gluing are consent.
3. **No capability is implied by a rendering mode.**
4. **Calls and glue never widen what an extension may see.** If a glue would
   expose more than a Bubble's grants, the host asks once at glue time.

## Requested versus granted

A host should show both. Illustrative:

```text
theme                     granted
timezone                  granted
contacts (via picker)     ask, per call
unrestricted network      denied
```

## Architecture in brief (Worker mode)

- One **hidden sandboxed iframe per third-party extension**: opaque origin, no
  `allow-same-origin`, so no access to host cookies, storage or API.
- Inside it, **one Web Worker per Bubble** runs the extension's code.
- The worker's DOM is **mirrored** to the host, rendered into a **Shadow DOM** per
  Bubble, and passed through an **allowlist sanitizer** for elements and attributes.
  No scripts, inline handlers, `javascript:` URLs or forms that post out. The host
  attaches event listeners itself and forwards them.
- **CSS containment** clips the Bubble to its box.
- Images and links go through the host or through domains declared in the manifest.
- Built-in extensions are trusted and use the same pipeline.

## Threat model sketch

| Threat | Mitigation idea | Confidence |
|---|---|---|
| Extension script reaches host cookies or storage | Opaque-origin sandbox iframe | Reasonably well understood |
| Sanitizer bug lets script run on the host origin | Allowlist, Shadow DOM, containment, adversarial tests, external review | **The weak point.** See limits |
| Extension draws or overlays outside its Bubble | CSS containment, clip, no `position: fixed` | Needs testing |
| Data exfiltration over the network | Declared domains only, host-mediated fetch, images through the host | Dangerous combinations such as read access plus open network must be refused |
| Phishing look-alike UI inside a Bubble | Host chrome labels who is asking, Bubble cannot cover host chrome | Partly a UX problem |
| Malicious caller abuses a picker | Call starts from a user gesture, caller gets only what was picked | Depends on host enforcing the gesture |
| Call cycles and stack floods | Depth limit (about 4, hypothesis), cycle detection, cancel propagation | Straightforward |
| Domain expires and is re-registered by an attacker | Signing key pinned on install (trust on first use), mismatch refuses or re-asks | Rotation rules undecided |
| Compromised CDN | Integrity hash of the entry file | Undecided |

## Network declaration

The manifest lists the domains the extension may reach. The host denies everything
else. Whether the host proxies all fetches, or applies CSP inside the sandbox, is
undecided.

## Key pinning

On install the host pins the extension's signing key. An update signed by another
key is refused or the user is asked again. Rotation, revocation and cross-device
pin state are open questions.

## Honest limits

- **Rendering into the host's DOM is weaker isolation than one iframe per Bubble.**
  A sanitizer bug means extension-controlled markup or script runs on the host
  origin. The allowlist, sanitizer and containment are the security-critical
  core and need adversarial tests and external review before any third-party
  extension ships.
- Shadow DOM is an encapsulation feature, not a security boundary.
- Trust on first use protects against change, not against a malicious first install.
- A user can be talked into granting too much. The design reduces how often
  they are asked; it cannot remove social engineering.
- Frame mode trades these limits for heavier, harder-to-size iframes.
- None of this is implemented yet.
