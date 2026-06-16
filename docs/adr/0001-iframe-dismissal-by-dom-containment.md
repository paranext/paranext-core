# 1. Dismissal across iframe boundaries uses content-node containment

- **Status:** Proposed
- **Date:** 2026-06-16

This ADR records _why_ outside-interaction dismissal behaves the way it does across webview
boundaries, and the alternatives we rejected. The operative rules and the code recipe live in
Storybook under **Guidelines → Dismissal Patterns** — this record does not restate them.

## Context

Platform.Bible renders most webviews as `iframe`s, many **cross-origin and sandboxed**
(`src/renderer/services/web-view.service-host.ts`). Two facts force the design:

1. **Pointer dismissal can't see across a cross-origin iframe.** When the user clicks into one, the
   parent never receives `pointerdown`, so pointer-based outside detection doesn't fire and a parent
   surface lingers. The observable signal is focus leaving the window.
2. **Radix portals floating content to `document.body`** (`popover.tsx`), so a surface's content is
   _not_ a DOM descendant of its trigger, and a surface may even embed its own webview.

## Decision

**Define "outside" by containment against the surface's rendered _content node_ (the portaled
element), not its trigger**, and supplement Radix only for the cross-iframe focus case:

- Use Radix's portal-aware `onInteractOutside`/`onPointerDownOutside` for same-document interactions.
- For focus crossing into a _foreign_ webview, dismiss only when `document.activeElement` is a
  concrete element the **content node** does not contain. A window merely losing focus (alt-tab,
  DevTools — `activeElement` falls back to `<body>`/null) is **not** "outside" and must not dismiss.
- Applies to **Light** and **Click-away**; **Explicit** ignores focus loss.

**Scroll inside a foreign webview is left unsolved on purpose.** The parent can't observe it (same
root cause as the pointer gap). Real scroll-driven Light dismissal across a webview boundary requires
the **webview to forward scroll events to the host** — feasible over existing channels
(`papi.webViewProviders.postMessageToWebView` / the reverse path; `window.parent.papi` for
same-origin webviews) but **not built yet**. Until then, Light surfaces don't dismiss on in-webview
scroll, and we do not fake it from the parent.

## Consequences

- Surfaces dismiss correctly when focus moves into a sibling webview, and a surface that embeds its
  own webview does not dismiss itself **provided that webview is portaled inside the content node**
  (use `PopoverPortalContainerProvider` for nested popovers; see Storybook).
- The window-switch guard means surfaces survive alt-tab rather than vanishing on every focus change.
- **Not yet implemented as a shared hook** (`lib/platform-bible-react/src/hooks/` has the project's
  hooks but no dismissal/outside-interaction one). Surfaces implement the focus supplement
  per-component until a shared hook exists — a known inconsistency risk.
- In-webview scroll dismissal for Light is **blocked on a platform capability** and is an accepted
  gap until webview → host scroll forwarding lands.

## Alternatives considered

- **Pointer-based only (Radix defaults).** Rejected: silently fails across cross-origin iframes, the
  dominant case here.
- **Naive containment against the trigger element (`trigger.contains(activeElement)`).** Rejected: it
  is the bug this ADR exists to avoid — Radix portals content out of the trigger's subtree, so the
  surface reads its own content as "outside" and self-dismisses. Containment must use the content node.
- **"Any iframe focus dismisses."** Rejected: a surface embedding its own webview would dismiss
  itself when the user interacts with its content.
- **Dismiss on any window blur.** Rejected: dismisses surfaces on alt-tab / DevTools / multi-window
  switches, since `activeElement` falls back to `<body>` rather than naming a sibling webview.
- **Don't dismiss on focus loss at all.** Rejected: leaves the main webview gap unsolved.
- **Approximate webview scroll from the parent (pointer-enter as a scroll proxy).** Rejected:
  conflates hovering over a webview with scrolling it, dismissing Light surfaces on cursor movement.
