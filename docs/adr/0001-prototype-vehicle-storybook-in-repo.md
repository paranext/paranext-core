# Prototype vehicle: Storybook stories in paranext-core

The Q3 "Saroj advances a chapter" prototype is built as **Storybook stories inside `paranext-core`** (on `prototype/2026-q3-advance-chapter-through-plan-steps`), rendered through a `workspace-shell`-style decorator that fakes the app chrome — the same pattern already proven by the earlier `proto/saroj-studies` prototype. This satisfies the brief's "standalone, separate from the running app" intent (Storybook is not the Electron app and ships nothing into it) while letting the prototype import the *real* `platform-bible-react` components and the *real* `project-plan-draft` plan types/factory plans, so the ~7 Jul "epic-candidate" version can converge toward something buildable without re-platforming.

## Considered options

- **Storybook-in-repo (chosen)** — fast, team-proven, reuses real components + plan data.
- **Fully standalone web app/repo (the "AI-assisted, standalone" working assumption)** — maximum blue-sky freedom, but re-creates the component library, copies the plan data, and drifts away from what engineering would actually build.
- **Unwired surface inside the running app** — highest fidelity, slowest, drags in the PAPI/C# wiring explicitly deferred this quarter.
