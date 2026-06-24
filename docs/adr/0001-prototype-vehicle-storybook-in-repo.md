# Prototype vehicles: three parallel builds

The Q3 "Saroj advances a chapter" prototype is built in **three vehicles in parallel** — same design, decisions, and build prompt; only the platform differs. The point is to compare how far each gets and which best de-risks the ~7 Jul epic-candidate, not to pick one up front.

| Vehicle | What it is | Why |
| ------- | ---------- | --- |
| **A — Storybook (`TenSimpleView`)** | Mounts the surfaces in the _real_ `rc-dock` Simple layout (`src/stories/platform/ten-layout-shared.tsx`) with the real `BookChapterControl`/editor — no Electron. | Lowest integration friction (a new panel is a ~6-line rc-dock tab), high fidelity, fast. _Use `TenSimpleView`, not `WorkspaceShell`._ |
| **B — In-app unwired surface** | The surfaces built into the running app as an **unwired** surface (no PAPI/C# data — faked locally). Requires `platform-bible-react` rebuilds. | Highest fidelity and the eventual epic target; tests the design against the app as it really is. |
| **C — Magic Patterns** | Rebuilt in the Magic Patterns AI design tool by **pasting a prompt**. Standalone — cannot import real components. | Maximum blue-sky freedom; a check on whether the design ideas hold without the constraints of the real component library. |

## Shared build approach

- **Reuse the real substrate.** Vehicles A & B import the real `platform-bible-react` components and the real `project-plan-draft` plan types + factory plans. Only the progress, Priority, assignment, and Solo/Together layers are invented.
- **Build low-wiring components into `platform-bible-react` (or root Storybook)** so A & B mount the _same_ reusable components rather than re-implementing per vehicle. (Magic Patterns is standalone and gets its own from-the-prompt build.)
- **Structural note (from prior builds):** panels in `SIMPLE_LAYOUT` receive per-chapter state via React **context, not props** (the `LayoutData` is a static module-load object).

This keeps the in-repo vehicles "standalone, separate from the running app" per the brief while staying close enough to real components that the epic-candidate can converge toward buildable without re-platforming.
