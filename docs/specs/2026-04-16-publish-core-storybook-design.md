# Publish paranext-core Storybook to GitHub Pages

**Date:** 2026-04-16
**Status:** Approved

## Motivation

Designers and developers need a published, browsable catalog of paranext-core's UI
stories (and stories from bundled extensions) — alongside the existing
platform-bible-react (PBR) Storybook — so visual work can be reviewed quickly
online, referenced in design specs, and shared via links without requiring a local
dev environment.

Today only PBR's Storybook is published (to `/platform-bible-react-storybook/` on
the `github-pages` branch). The core Storybook exists in-repo but is not built in
CI and is not deployed anywhere.

## Current state

### Blocker: core Storybook fails to build

On `main`, `npm run storybook:build` fails with:

> Conflict: Multiple assets emit different content to the same filename
> `mocker-runtime-injected.js`

Root cause: Storybook 9's `WebpackInjectMockerRuntimePlugin` hooks into every
`HtmlWebpackPlugin` instance. The merged Electron renderer config brings in a
second `HtmlWebpackPlugin`, which causes `mocker-runtime-injected.js` to be emitted
twice.

A fix for this exists in `ai/main` as commit `65698cbced` (PR #2168): it edits
`.storybook/main.ts` to filter conflicting plugins (`HtmlWebpackPlugin`,
`BundleAnalyzerPlugin`) and strip `optimization` + `cache` from the merged renderer
config. That fix never landed on `main`.

### PBR coupling in core Storybook

`.storybook/main.ts` currently pulls PBR stories into the core Storybook build:

- `stories` array includes `../lib/platform-bible-react/src/stories/**/*.stories.*`
- `staticDirs` includes `../lib/platform-bible-react/src`
- `webpackFinal` aliases `platform-bible-react` → PBR source, and `@` → PBR source

Publishing both Storybooks side-by-side would mean PBR's stories appear in **both**
`/platform-bible-react-storybook/` and `/paranext-core-storybook/`, drifting apart
over time as each is built from a different toolchain.

## Design

One PR against `main`, four changes.

### 1. Fix the Storybook build

Apply only the `.storybook/main.ts` hunk from `65698cbced` onto this branch. Skip
the unrelated files from that squash-merge (`.github/workflows/chromatic.yml`,
`e2e-tests/fixtures/papi-live.fixture.ts`) — they belong to separate efforts.

### 2. Decouple PBR from the core Storybook build

Edit `.storybook/main.ts`:

- **Remove** the PBR stories glob
  (`../lib/platform-bible-react/src/stories/**/*.stories.*`).
- **Remove** `../lib/platform-bible-react/src` from `staticDirs`.
- **Keep** both webpack aliases (`platform-bible-react` → PBR source,
  `@` → `lib/platform-bible-react/src`). The `platform-bible-react` alias lets
  core/extension stories import PBR components by bare specifier and resolve to
  source (hot reload while iterating on PBR). The `@` alias is required
  transitively: when webpack compiles PBR source via the `platform-bible-react`
  alias, PBR's own internal imports use `@/…` and need this alias to resolve.
  Verified: no core/extension story uses `@/` directly; the only cross-package
  import in core/extension stories is `platform-bible-react` bare (in
  `extensions/src/platform-get-resources/src/home.stories.tsx`).
- **Keep** `extensions/src/**/*.stories.*` — extensions haven't been migrated to
  standalone Storybooks yet (PT-3307).

After this, core Storybook shows: core `src/` stories + extension stories,
consuming PBR as a library. PBR's Storybook remains the canonical catalog for PBR
components.

### 3. Publish core Storybook in CI

Edit `.github/workflows/publish-docs.yml`: add a new step after the existing PBR
Storybook build:

```yaml
- name: Build Storybook for paranext-core
  run: npm run storybook:build -- --output-dir docs-for-pages/paranext-core-storybook
```

The workflow already runs `npm run build` earlier, so extension and library builds
that core Storybook depends on are available.

The output URL on GitHub Pages will be `/paranext-core-storybook/` — parallel to
the existing `/platform-bible-react-storybook/`.

### 4. Surface it on the landing page

Edit `.github/assets/github-pages-index.html`: add a fourth resource card with:

- **Title:** `paranext-core`
- **Subtitle:** "Paranext core" (friendly-case version of the repo name, mirroring
  how the PBR card expands `platform-bible-react` to a readable subtitle — but
  without the `Platform.Bible` branding).
- **Description:** "UI component catalog for paranext-core — stories from the
  core renderer and bundled extensions, consuming platform-bible-react as a
  library."
- **Single link:** "Design System" → `paranext-core-storybook/` (same styling as
  the PBR "Design System" link so the two read as peers).

No reorganization of existing cards.

## Out of scope

- Task 2 of the user story (Tailwind in paranext-core without CSS hacks; deleting
  the `home.stories.tsx` workaround; splitting tailwind content globs between
  Storybook and the app build). That is a separate follow-up PR.
- Chromatic visual regression testing for core (PR #2197 covers PBR; core is
  future work).
- Migrating extensions to their own Storybooks (PT-3307).

## Acceptance criteria

1. `npm run storybook:build` succeeds locally on the PR branch.
2. `publish-docs` workflow succeeds on a push to `main` and produces both
   `platform-bible-react-storybook/` and `paranext-core-storybook/` under the
   `github-pages` branch.
3. The landing page on GitHub Pages shows a fourth card linking to the new
   Storybook; the link resolves to the deployed Storybook.
4. Core Storybook no longer contains PBR stories (only core and extension
   stories); PBR's own Storybook is unchanged.
5. `npm run storybook` (dev mode) still works and shows the same story set as the
   production build.
