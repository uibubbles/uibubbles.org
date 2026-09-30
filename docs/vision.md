---
title: Vision
description: Why UIBubbles exists and what it is trying to become.
order: 1
---

> **Status: draft.** Early, unreviewed, and likely to change. Nothing here is a finished standard.

## The idea in three lines

A **Bubble** is an isolated UI instance of an extension that pops into a host
surface when it is useful. Extensions can use each other's UI, and Bubbles that
touch can glue together. Each extension stays isolated and sees only what the
user deliberately hands it.

## The mental model

The model is Facebook, VK and Wix apps, not generative UI. Those platforms let
third-party apps call host APIs. VK's `VKWebAppGetFriends`, for example, opens the
platform's friend picker and returns only the friends the user picked.

UIBubbles keeps that model and changes one thing: **the APIs are not fixed by the
host.** Other extensions provide them, and the host brokers every call.

## What a Bubble is not

- **Not chat-only.** Chat is the first host surface. Dashboards, IDE sidebars, TUIs and
  agent workspaces are equally valid surfaces.
- **Not AI-only.** An assistant can pop a Bubble, and so can a button or a deterministic app.
- **Not a component library.** A Bubble is a unit of isolation and trust, not a widget.

## Two principles

> A Bubble declares what it wants. The Host decides what it gets.

> The user's gesture is the grant.

Picking, dropping and gluing are consent. Gluing and calling never widen what an
extension may see.

## First host

The first host in development is a family chat, with a handful of built-in
extensions as the first providers. The MVP has to be useful with built-in
extensions alone; third-party adoption is a hypothesis to test, not a premise.

## Where this could go

An open standard at uibubbles.org, reference host code and SDKs. That is a
long-term aim, not a precondition. The evidence threshold is deliberately
honest: invest in a public standard only if people prefer Bubbles in the first
host **and** at least one outside developer builds, or asks to build, an
extension unprompted. Otherwise UIBubbles stays an internal extension UI runtime.

Governance of any public standard is **undecided**. See [open questions](/docs/open-questions/).
