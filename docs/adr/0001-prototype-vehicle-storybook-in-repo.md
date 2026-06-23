# Prototype vehicle: Storybook stories in paranext-core

The Q3 "Saroj advances a chapter" prototype is built as **Storybook stories inside `paranext-core`** (on `prototype/2026-q3-advance-chapter-through-plan-steps`), rendered through a `workspace-shell`-style decorator that fakes the app chrome — the same pattern already proven by the earlier `proto/saroj-studies` prototype. This satisfies the brief's "standalone, separate from the running app" intent (Storybook is not the Electron app and ships nothing into it) while letting the prototype import the _real_ `platform-bible-react` components and the _real_ `project-plan-draft` plan types/factory plans, so the ~7 Jul "epic-candidate" version can converge toward something buildable without re-platforming.

## Considered options

- **Storybook-in-repo (chosen)** — fast, team-proven, reuses real components + plan data.
- **Fully standalone web app/repo (the "AI-assisted, standalone" working assumption)** — maximum blue-sky freedom, but re-creates the component library, copies the plan data, and drifts away from what engineering would actually build.
- **Unwired surface inside the running app** — highest fidelity, slowest, drags in the PAPI/C# wiring explicitly deferred this quarter.

## Update (2026-06-22): `TenSimpleView` is the recommended expression, not `WorkspaceShell`

A 3-vehicle build experiment (one agent each, in parallel worktrees, then reviewed + fixed) tested how far each Storybook-in-repo expression gets, alongside a real-app integration:

- **A — `WorkspaceShell`** (the lightweight faked-chrome decorator this ADR originally named): works, but lower fidelity (dimmed stub columns) and the decorator had to be copied from `proto/saroj-studies`.
- **C — `TenSimpleView`** (`src/stories/platform/ten-layout-shared.tsx`): mounts the panel into the _real_ `rc-dock` Simple layout with the _real_ `BookChapterControl`. **Lowest integration friction** (a new panel is a ~6-line rc-dock tab), **highest fidelity**, and the **only vehicle whose full Storybook build passed**.
- **B — real running app** (native renderer tab): got impressively far (unit-tested derivation, real dock registration) but its headline integration shipped a compile error an isolated typecheck masked, and it depends on a `platform-bible-react` rebuild and ultimately PAPI/C# for real data — hardest to verify headless.

**Refinement:** the core decision stands (Storybook-in-repo, _not_ standalone and _not_ the running app). But the recommended _expression_ is now **`TenSimpleView`** (real layout + real BCV, no Electron), not `WorkspaceShell`. `WorkspaceShell` remains fine for an isolated single-surface view; the real running app (B) is the eventual epic target, not the prototype vehicle. Structural note from C for the epic-candidate: panels in `SIMPLE_LAYOUT` receive per-chapter state via React **context, not props** (the `LayoutData` is a static module-load object).
