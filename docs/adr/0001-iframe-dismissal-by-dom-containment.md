# 1. Dismissal across iframe boundaries is defined by DOM containment

- **Status:** Proposed
- **Date:** 2026-06-16

## Context

Platform.Bible renders most webviews inside `iframe`s, and many are **cross-origin and sandboxed**
(see `src/renderer/services/web-view.service-host.ts`). Our transient surfaces (popovers, menus,
panels) rely on **outside-interaction dismissal** to close when the user moves on.

The usual implementation of that — pointer-based dismissal, as Radix provides via
`onPointerDownOutside` — assumes the parent document sees the click. It does not across an iframe
boundary: when a user clicks into a cross-origin/sandboxed iframe, **the parent document never
receives a `pointerdown`/`mousedown`**. As a result, a popover in the parent stays open even though
the user has clearly moved into a webview. The only reliable signal the parent gets is **focus
leaving the window**, at which point `document.activeElement` becomes the focused `<iframe>` element.

Complicating matters, a surface may **contain its own webview** (e.g. a popover with an embedded
webview). So "focus moved into an iframe" cannot naively mean "dismiss," or such a surface would
dismiss itself the moment the user interacts with its own content.

## Decision

Define "outside" for the focus-loss trigger by **DOM containment, not element type**:

> On window/document blur, inspect `document.activeElement`. Treat the interaction as "outside" —
> and dismiss — **only if** the focused element is **not contained within the surface's DOM
> subtree**. A surface's own child iframes never dismiss it; focus landing in any other iframe (a
> sibling webview) counts as outside.

This applies to the **Light** and **Click-away** dismissal patterns; **Explicit** dismissal ignores
focus loss entirely. The patterns themselves are documented in Storybook under
**Guidelines → Dismissal Patterns**.

## Consequences

- Popovers/menus reliably dismiss when the user clicks into a sibling webview, despite the missing
  pointer event.
- Surfaces that embed their own webview keep working — their child iframes don't trigger dismissal.
- This behavior is **not yet implemented as a shared hook** (`lib/platform-bible-react/src/hooks/`
  has none). Until one exists, surfaces that need it implement the rule per-component, following the
  containment definition above for consistency.

## Alternatives considered

- **Pointer-based only (rely on Radix defaults).** Rejected: silently fails across cross-origin
  iframes, which is the dominant case in this app.
- **"Any iframe focus dismisses."** Rejected: a surface containing its own webview would dismiss
  itself when the user interacts with its content.
- **Don't dismiss on focus loss at all.** Rejected: leaves the main webview gap unsolved — popovers
  linger when the user moves into an adjacent webview.
