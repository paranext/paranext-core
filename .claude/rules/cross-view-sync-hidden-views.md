# Cross-View Sync Must Handle Hidden Views

When implementing or modifying anything that synchronizes behavior across views/tabs/panes —
scroll sync, selection sync, scroll-group `scrRef` reactions, focus-follows, live highlighting —
design for BOTH visibility states, not just the live case.

## The facts that make this a trap

- rc-dock keeps inactive tab panes **mounted but hidden with `display: none`**
  (`node_modules/rc-dock/es/DockTabPane.js`). The web view's iframe keeps running: JavaScript,
  network subscriptions, and React effects all continue.
- But there is **no layout** inside a display-none iframe: geometry reads return zero,
  `scrollIntoView` no-ops, and rAF-driven work (smooth scrolling, animations) does not progress.
  Data-driven sync (re-rendering the current reference's content) works while hidden;
  **geometry-driven sync (scroll positions, measurements, focus rings) silently does nothing.**
- PAPI exposes **no visibility or tab-activation event** usable from inside a web view (the window
  service's focus subject tracks focus, not visibility). Detection requires geometry checks or an
  `IntersectionObserver` inside the iframe — use `useViewVisibility` from `platform-bible-react`
  (reference consumer: `useBcvSyncScroll` in `extensions/src/legacy-comment-manager/`).

## The rule

Every cross-view sync design MUST explicitly answer both questions:

1. **Live**: what happens while the target view is visible?
2. **Hidden**: what happens while the target view's tab is inactive, AND how does it catch up when
   the tab is activated? The usual shape: defer layout-dependent side effects while hidden, collapse
   repeats into one pending catch-up, and consume it (instantly, not animated) on visibility.

"Do nothing while hidden" can be the right answer — but only as a documented, deliberate decision
stated in the PR, never as an unexamined default. A sync feature that was only designed for the
visible case will silently show stale state on tab activation, which in Simple mode (one visible
tab per stack) is the *common* case.

Origin story: PT-4080's Comments-tab scroll sync shipped visible-only; activating the tab after
navigating showed a stale scroll position until the next verse move.
