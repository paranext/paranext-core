# Cross-View Sync Must Handle Hidden Views

When implementing or modifying anything that synchronizes behavior across views/tabs/panes —
scroll sync, selection sync, scroll-group `scrRef` reactions, focus-follows, live highlighting —
design for BOTH visibility states, not just the live case.

## The facts that make this a trap

- rc-dock keeps inactive tab panes **mounted but hidden with `display: none`** (see rc-dock's
  `DockTabPane` component, transpiled ESM under `node_modules/rc-dock/`). The web view's iframe
  keeps running: JavaScript, network subscriptions, and React effects all continue.
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

"Do nothing while hidden" can be the right answer — but only as a documented, deliberate decision,
never as an unexamined default. Record it in **both** places, since they serve different readers:

- A short comment at the sync site itself (e.g. `// Hidden case: intentionally not handled because
  <reason>`) — this is the durable record for whoever reads or refactors the code later, and it's
  what makes the decision checkable from the diff alone (by a reviewer or the review-analyzer
  agent).
- An explicit callout in the PR description — a one-line comment is easy to skim past in a large
  diff, so flag it for the human reviewer to scrutinize at review time rather than relying on them
  to spot it unprompted.

A sync feature that was only designed for the visible case will silently show stale state on tab
activation, which in Simple mode (one visible tab per stack) is the *common* case.

If the hidden case involves a catch-up mechanism, back it with a test — mount the sync while
hidden, trigger the change, flip visibility, and assert the pending catch-up fires. Documented
intent doesn't survive a refactor; a test does.

Origin story: PT-4080's Comments-tab scroll sync shipped visible-only; activating the tab after
navigating showed a stale scroll position until the next verse move.
