# Make Tailwind fully functional in paranext-core's app build

**Date:** 2026-04-16
**Status:** Approved
**Ticket:** PT-3920

## Motivation

Developers in paranext-core's main renderer use Tailwind utility classes
(`tw-*`) throughout — 51 occurrences across files like
`src/renderer/components/platform-bible-toolbar.tsx`. These classes only render
correctly today by incidental overlap with utilities that platform-bible-react
(PBR) happens to emit into its own compiled bundle. If core adds a `tw-*` class
that PBR doesn't also use, it silently has no style — developers hit this as
"the class doesn't work" and either add CSS hacks or drop the class.

The user story:

> As a developer I need the same classnames to be available all over Platform
> so that I can develop UIs without the need for hacks.

This spec eliminates the incidental-overlap dependency by wiring Tailwind into
paranext-core's app build so it emits its own utilities for its own source.

## Current state

### How Tailwind flows today

| Context                          | Tailwind processing? | How                                                                                                                                                                                                          |
| -------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PBR (`lib/platform-bible-react`) | ✅ Own build         | Emits scoped preflight (`.pr-twp`) + utilities; injected at runtime into the host document via PBR's dist `.js` bundle (no standalone `.css` file)                                                           |
| Extensions (`extensions/src/*`)  | ✅ Own builds        | Each extension has its own `tailwind.config.ts` + `postcss.config.ts` + `tailwind.css`; emits unscoped preflight + utilities, isolated by WebView (iframe)                                                   |
| Core app (`src/renderer/*`)      | ❌ **Not processed** | `postcss-loader` is intentionally omitted from `webpack.config.renderer.*`; core relies on PBR's runtime-injected CSS for any Tailwind classes it uses (works only when PBR also uses the same class)        |
| Core Storybook                   | ✅ Via monkey-patch  | `.storybook/main.ts:59-115` injects `postcss-loader` into the renderer's CSS rules for Storybook only; root `tailwind.config.ts` and `postcss.config.ts` are Storybook-only (comments in those files say so) |

### Symptom

Any core-only `tw-*` class that PBR does not itself emit is missing from the
rendered document's styles. Workaround patterns seen in the past include inline
`<style>` blocks duplicating a subset of Tailwind rules (e.g. the inline CSS
hack removed from `home.stories.tsx` in commit `a639bb1124`). Without this
change, similar hacks will recur whenever a developer adds a new Tailwind class
to core.

### Ticket reference

`tailwind.config.ts:15-18` explicitly marks PT-3920 as the ticket that splits
app vs. Storybook Tailwind content globs:

> When https://paratextstudio.atlassian.net/browse/PT-3920 is implemented, the
> app's tailwind config will NOT need to include extensions or
> lib/platform-bible-react since they will build their own tailwind files
> independently, but they will need to continue to be included in Storybook's
> config since Storybook still pulls in source files from those packages.

## Design

No new dependencies. All Tailwind/PostCSS packages (`tailwindcss`,
`postcss-loader`, `autoprefixer`, `tailwindcss-animate`,
`tailwindcss-scoped-preflight`, `@tailwindcss/typography`,
`@tailwindcss/container-queries`) are already in root `package.json` (installed
for Storybook's use).

### 1. App build: add Tailwind processing to the renderer webpack

- Add `postcss-loader` to the renderer's CSS loader chain in the shared
  `.erb/configs/webpack.config.renderer.*` configs.
- Add a new entry CSS file for core's Tailwind: `src/renderer/styles/tailwind.css`
  (location chosen to match the existing `src/renderer/styles/` folder).
- Contents of the entry CSS: `@tailwind components; @tailwind utilities;`
  (no `@tailwind base;`) — **utilities-only**, per the preflight decision below.
- Side-effect import from `src/renderer/app.component.tsx` (next to the
  existing `import './app.component.scss';`). A plain (non-`?raw`) import
  triggers webpack → postcss-loader → Tailwind. `app.component.tsx` is the
  established site for non-raw renderer style imports.

### 2. Config split — four files

| File                            | Used by                 | Content globs                                                                             |
| ------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| `tailwind.config.ts` (root)     | App build (new)         | `./src/**/*.{js,ts,jsx,tsx}` only                                                         |
| `postcss.config.ts` (root)      | App build (new)         | references root `tailwind.config.ts`                                                      |
| `.storybook/tailwind.config.ts` | Storybook build (moved) | `./src/**`, `./extensions/src/**`, `./lib/platform-bible-react/src/**`, `./.storybook/**` |
| `.storybook/postcss.config.ts`  | Storybook build (moved) | references `.storybook/tailwind.config.ts`                                                |

Both Tailwind configs extend PBR's config via `presets: [libConfig]` (where
`libConfig` is imported from `./lib/platform-bible-react/tailwind.config`).
This preserves the existing pattern: theme tokens, `tw-` prefix, plugins
(`typography`, `tailwindCssAnimate`, container queries,
`scopedPreflightStyles`) all come from PBR. Only `content` differs.

Extensions' and PBR's own configs are not touched.

### 3. Storybook wiring simplification

Today `.storybook/main.ts:59-115` contains ~60 lines of webpack-merge logic
that injects `postcss-loader` into the renderer config's CSS rules, because
`postcss-loader` isn't in the shared renderer config. Once we add
`postcss-loader` to the shared renderer config (Design §1), Storybook inherits
it naturally.

- **Remove** the injection monkey-patch from `.storybook/main.ts`.
- **Add** a small override so Storybook's inherited `postcss-loader` uses
  `.storybook/postcss.config.ts` (which references the Storybook-scoped
  Tailwind config) instead of the root `postcss.config.ts` (which is
  app-scoped and would only scan core).

Expected size: ~10 lines, down from ~60.

### 4. Preflight policy — utilities-only for core

Core's own build emits **no** Tailwind base/preflight. Rationale:

- PBR already emits scoped preflight under `.pr-twp` (via
  `scopedPreflightStyles({ cssSelector: '.pr-twp' })` in its config) and
  injects it at runtime via its dist bundle. Core continues to receive
  preflight from PBR wherever `.pr-twp` is on the DOM.
- Emitting preflight from core too would either double-emit the same rules
  (if scoped under `.pr-twp`) or leak resets outside PBR trees (if unscoped,
  colliding with rc-dock, SCSS files, etc.).
- Core's gap today is missing _utilities_, not missing preflight. Fix only
  what's broken.

### 5. Documentation

Note: on `main`, `.context/standards/` is a symlink into the `ai-prompts`
repo — not part of the paranext-core tree. Docs need to live in the main
tree. The convention we started in Task 1 uses `docs/specs/` and
`docs/plans/`; extending with a short contributor-facing note keeps that
convention growing.

- **New file:** `docs/tailwind.md` (~50–100 lines) covering:
  - Where Tailwind runs today (app build, Storybook, extensions, PBR) — a
    short version of the table in "Current state".
  - Where the two Tailwind configs live (`tailwind.config.ts` at root for
    the app; `.storybook/tailwind.config.ts` for Storybook).
  - How `tw-*` classes in core code just work — no special setup.
  - How core stories just work — the Storybook config scans all source.
  - **When you'd need something special/unexpected in a story** —
    e.g. demoing a component _outside_ `.pr-twp` preflight scope, or
    needing arbitrary-value classes that aren't detected by Tailwind's
    content scanner, or injecting an external stylesheet.
- **Pointer comments:** top of each Tailwind config file — a one-line
  comment linking to `docs/tailwind.md` so future readers don't have to
  guess which config does what.

## Out of scope

- Touching extensions' Tailwind/PostCSS setups.
- Touching PBR's Tailwind config or its runtime style-injection.
- Deleting the `home.stories.tsx` hack (already handled by commit
  `a639bb1124`; scratched from the user story during brainstorming).
- Switching core to emit its own preflight under `.pr-twp` or a new scope
  (utilities-only was chosen; revisit only if a concrete preflight gap
  surfaces).
- Replacing Tailwind 3 with Tailwind 4.

## Acceptance criteria

1. `npm run build` succeeds; the renderer bundle includes core's emitted
   utilities.
2. `npm run storybook:build` still succeeds; Storybook uses the new
   `.storybook/tailwind.config.ts` and scans core + extensions + PBR source
   as before.
3. `npm run storybook` (dev) still shows stories with proper Tailwind styling.
4. In the running app, a `tw-*` utility used by core but **not** by PBR
   renders correctly. Concrete check: introduce a temporary probe class in
   core (e.g. `className="tw-rotate-[7deg]"` on a toolbar element) — it
   applies the rotation. Revert the probe before merge.
5. Root `tailwind.config.ts` no longer references `extensions/` or
   `lib/platform-bible-react/` in its content globs; the updated
   `.storybook/tailwind.config.ts` does.
6. `.storybook/main.ts`'s ~60-line `postcss-loader` injection block is
   removed; replaced by a small override (~10 lines) that points Storybook's
   inherited `postcss-loader` at `.storybook/postcss.config.ts`.
7. `tailwind.config.ts:15-18` comment referencing PT-3920 is removed or
   updated (the "when PT-3920 is implemented" prediction no longer belongs
   in the config once it's implemented).
8. `docs/tailwind.md` added per Design §5; pointer comments at the top of
   each Tailwind config file link to it.
