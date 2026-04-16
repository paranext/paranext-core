# Tailwind in paranext-core App Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire Tailwind into paranext-core's app webpack build so core's `tw-*` utilities are emitted from core's own source, ending the silent-failure dependency on PBR's compiled bundle.

**Architecture:** Split the existing Storybook-only root `tailwind.config.ts` and `postcss.config.ts` into two config pairs — root configs become app-only (scan `src/**`), new `.storybook/*` configs scan core + extensions + PBR source. Add `postcss-loader` to the shared renderer webpack config so core's new `src/renderer/styles/tailwind.css` gets processed at app build time. Storybook inherits `postcss-loader` from the renderer config and only overrides which config file it resolves to. Utilities-only emission from core (no `@tailwind base;`) — preflight keeps coming from PBR under `.pr-twp`.

**Tech Stack:** Tailwind 3 (already installed), PostCSS 8, `postcss-loader` 8, webpack 5, Storybook 9 (react-webpack5), TypeScript.

**Spec:** `docs/specs/2026-04-16-tailwind-in-core-design.md`

---

## File Map

| File                                           | Action | Purpose                                                                                                                                                                                                                               |
| ---------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.storybook/tailwind.config.ts`                | Create | Storybook-scoped Tailwind config. Scans core + extensions + PBR source. Extends PBR preset.                                                                                                                                           |
| `.storybook/postcss.config.ts`                 | Create | Storybook-scoped PostCSS config. Points Tailwind plugin at `.storybook/tailwind.config.ts`.                                                                                                                                           |
| `.storybook/main.ts`                           | Modify | Task 1: update the existing postcss-loader injection to pass `postcssOptions.config: '.storybook/postcss.config.ts'`. Task 3: remove the ~60-line injection entirely; replace with ~10-line override on the inherited postcss-loader. |
| `tailwind.config.ts` (root)                    | Modify | Narrow `content` to `./src/**` only. Rewrite the "Storybook-only" and "PT-3920" comments.                                                                                                                                             |
| `postcss.config.ts` (root)                     | Modify | Rewrite the "Storybook (not used by the Electron app build)" comment.                                                                                                                                                                 |
| `.erb/configs/webpack.config.renderer.dev.ts`  | Modify | Add `postcss-loader` to both CSS rules; bump `importLoaders`.                                                                                                                                                                         |
| `.erb/configs/webpack.config.renderer.prod.ts` | Modify | Same as dev.                                                                                                                                                                                                                          |
| `src/renderer/styles/tailwind.css`             | Create | Core's Tailwind entry. Utilities-only: `@tailwind components; @tailwind utilities;`.                                                                                                                                                  |
| `src/renderer/app.component.tsx`               | Modify | Side-effect import of `./styles/tailwind.css` next to the existing SCSS import.                                                                                                                                                       |
| `docs/tailwind.md`                             | Create | Contributor-facing doc: where Tailwind runs, where configs live, how stories work, edge cases.                                                                                                                                        |

No new dependencies; all packages already in root `package.json`.

---

## Task 1: Split the Storybook-scoped Tailwind/PostCSS configs out of the root files

**Context:** Today the root `tailwind.config.ts` and `postcss.config.ts` are "for Storybook only" per their own comments (lines 1 and 9 of `tailwind.config.ts`; line 1 of `postcss.config.ts`). `.storybook/main.ts:59-115` injects `postcss-loader` into the renderer's CSS rules and that loader discovers the root `postcss.config.ts` by default. We create `.storybook`-local copies first so Storybook's build switches to them before Task 2 narrows the root files.

**Files:**

- Create: `.storybook/tailwind.config.ts`
- Create: `.storybook/postcss.config.ts`
- Modify: `.storybook/main.ts` (around current line 113, where `newUse.splice(cssIdx + 1, 0, 'postcss-loader');` is)

- [ ] **Step 1: Record a pre-change baseline**

```bash
rm -rf storybook-static && npm run storybook:build > /tmp/sb-pre-task1.log 2>&1 && echo "baseline OK" && grep -cE "^\\./(src|extensions/src|lib/platform-bible-react/src)" storybook-static/index.json 2>/dev/null | head
```

Expected: `baseline OK`. Remember this baseline — Tasks 1–3 must not reduce it.

- [ ] **Step 2: Create `.storybook/tailwind.config.ts`**

Create this file with the following content:

```ts
import type { Config } from 'tailwindcss';
// See docs/tailwind.md for what this config covers. Storybook pulls source files from core,
// extensions, and platform-bible-react, so its Tailwind content globs scan all three trees.
// Root imports from PBR (not the other way around) because PBR is shared externally and cannot
// depend on this monorepo root.
import libConfig from '../lib/platform-bible-react/tailwind.config';

const config: Config = {
  presets: [libConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './extensions/src/**/*.{js,ts,jsx,tsx}',
    './lib/platform-bible-react/src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{ts,tsx}',
    // Ignore build artifacts and dependencies within extensions to avoid slow builds
    '!./**/node_modules/**/*',
    '!./**/temp-build/**/*',
    '!./**/dist/**/*',
  ],
};

export default config;
```

Note that the `content` globs are still written **relative to the repo root**, not to `.storybook/`. Tailwind's content globs are resolved against `process.cwd()` (the repo root when Storybook runs), not relative to the config file's location. Keeping them root-relative preserves existing behaviour.

- [ ] **Step 3: Create `.storybook/postcss.config.ts`**

Create this file with the following content:

```ts
// PostCSS configuration for Storybook. See docs/tailwind.md for the overall Tailwind
// architecture. Storybook's webpackFinal points its postcss-loader at this file so Tailwind
// uses `.storybook/tailwind.config.ts` (which scans core + extensions + platform-bible-react
// source) rather than the root app-scoped config.
import type { Config } from 'postcss-load-config';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config: Config = {
  plugins: [tailwindcss({ config: './.storybook/tailwind.config.ts' }), autoprefixer()],
};

export default config;
```

Passing `{ config: ... }` to the `tailwindcss` plugin explicitly pins the Tailwind config file so we don't rely on PostCSS's implicit config discovery (which searches upward from the CSS file's directory and would otherwise find the root `tailwind.config.ts`).

- [ ] **Step 4: Point the Storybook postcss-loader at the new Storybook PostCSS config**

Open `.storybook/main.ts`. Find this line (currently near line 113):

```ts
newUse.splice(cssIdx + 1, 0, 'postcss-loader');
```

Replace with:

```ts
newUse.splice(cssIdx + 1, 0, {
  loader: 'postcss-loader',
  options: {
    postcssOptions: { config: join(__dirname, 'postcss.config.ts') },
  },
});
```

This makes the injected `postcss-loader` use `.storybook/postcss.config.ts` explicitly instead of walking up from the source file and finding the root `postcss.config.ts`.

- [ ] **Step 5: Verify Storybook still builds against the new Storybook configs**

```bash
rm -rf storybook-static && npm run storybook:build > /tmp/sb-task1.log 2>&1; echo "exit=$?"; tail -3 /tmp/sb-task1.log
```

Expected: `exit=0`, final line `info => Output directory: /home/paratext/git/paranext-core/storybook-static`.

Confirm core and extension story asset bundles are still present:

```bash
grep -l "./src/renderer/components/overlays/overlay-command-palette.stories" storybook-static/ -r | head -1
grep -l "./extensions/src/platform-get-resources/src/home.stories" storybook-static/ -r | head -1
```

Expected: each returns at least one match (the story bundle was included).

- [ ] **Step 6: Commit**

```bash
git add .storybook/tailwind.config.ts .storybook/postcss.config.ts .storybook/main.ts
git commit -m "refactor(storybook): move Storybook Tailwind/PostCSS configs into .storybook/

Creates .storybook/tailwind.config.ts and .storybook/postcss.config.ts
as copies of the root configs. Storybook's webpackFinal now points its
injected postcss-loader at the local .storybook/postcss.config.ts so
subsequent tasks can narrow the root configs to app-only content globs
without affecting Storybook.

Part of PT-3920."
```

---

## Task 2: Narrow the root Tailwind/PostCSS configs to app-only

**Context:** The root `tailwind.config.ts` and `postcss.config.ts` are now orphaned by Storybook (Task 1 switched Storybook to `.storybook/*`). Before Task 3 starts using them for the app build, narrow them down to only what the app cares about: core's own `src/**` and its own PostCSS plugin chain. Storybook must not regress — verify after.

**Files:**

- Modify: `tailwind.config.ts` (root)
- Modify: `postcss.config.ts` (root)

- [ ] **Step 1: Rewrite `tailwind.config.ts` (root)**

Replace the entire file with:

```ts
import type { Config } from 'tailwindcss';
// See docs/tailwind.md for the overall Tailwind architecture. This config is used by the
// paranext-core Electron app webpack build to emit utilities from core's own source.
// Storybook has its own config at .storybook/tailwind.config.ts that scans extensions and
// platform-bible-react too.
// Root imports from PBR (not the other way around) because PBR is shared externally and cannot
// depend on this monorepo root.
import libConfig from './lib/platform-bible-react/tailwind.config';

const config: Config = {
  presets: [libConfig],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};

export default config;
```

Note the deletions:

- The old note block about "This tailwind config is for Storybook only" and the "When PT-3920 is implemented…" paragraph are gone — they no longer describe the file.
- The `!./**/node_modules/**/*`, `!./**/temp-build/**/*`, `!./**/dist/**/*` exclusion globs are unnecessary here because `./src/**` doesn't match any of those (they live in `node_modules/`, `extensions/**/temp-build/`, and `**/dist/`, none of which are under `./src/`).
- `./.storybook/**` is dropped from content because the Storybook config handles that.

- [ ] **Step 2: Rewrite `postcss.config.ts` (root)**

Replace the entire file with:

```ts
// PostCSS configuration for the paranext-core Electron app. See docs/tailwind.md for the overall
// Tailwind architecture. Storybook has its own PostCSS config at .storybook/postcss.config.ts.
import type { Config } from 'postcss-load-config';

const config: Config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

With no `{ config: ... }` arg on the `tailwindcss` plugin, PostCSS's default discovery walks up from the CSS file and finds `./tailwind.config.ts` at the repo root — which is what we want for the app build.

- [ ] **Step 3: Verify Storybook still builds (root configs are now app-only but Storybook uses .storybook/)**

```bash
rm -rf storybook-static && npm run storybook:build > /tmp/sb-task2.log 2>&1; echo "exit=$?"; tail -3 /tmp/sb-task2.log
```

Expected: `exit=0`, successful output directory line. Storybook's own tailwind config still scans extensions and PBR, so its bundle is unaffected.

- [ ] **Step 4: Sanity-check that extensions still have utilities in the Storybook bundle**

```bash
grep -rE "tw-flex|tw-grid|tw-px-" storybook-static/*.css storybook-static/*style*.css 2>/dev/null | head -3
```

Expected: at least one match (Tailwind utilities from extensions' `tw-*` usage are still emitted).

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts postcss.config.ts
git commit -m "refactor(tailwind): narrow root configs to app-only content globs

The root tailwind.config.ts now scans only ./src/** — core's own
renderer source. Extensions and platform-bible-react are no longer
referenced because they have their own independent builds, and
Storybook has switched to .storybook/tailwind.config.ts (previous
commit).

Removes the outdated note about the config being 'for Storybook only'
and the PT-3920 forward-reference, which this PR resolves.

Part of PT-3920."
```

---

## Task 3: Add postcss-loader to the renderer webpack and simplify the Storybook monkey-patch

**Context:** The app build's renderer webpack config (`webpack.config.renderer.dev.ts` and `.prod.ts`) currently has no PostCSS processing. Once we add it, the app processes Tailwind at build time. Storybook inherits the renderer config via its `webpackFinal`, so the ~60-line injection block becomes unnecessary — we only need a small override that re-points the inherited `postcss-loader` at `.storybook/postcss.config.ts`. Both changes happen together so there's no window where Storybook double-processes CSS.

**Files:**

- Modify: `.erb/configs/webpack.config.renderer.dev.ts` (CSS rules around lines 60–82)
- Modify: `.erb/configs/webpack.config.renderer.prod.ts` (CSS rules around lines 51–73)
- Modify: `.storybook/main.ts` (replace the whole `// Inject postcss-loader …` block from current lines 59–116)

- [ ] **Step 1: Edit `.erb/configs/webpack.config.renderer.dev.ts`**

Find the two CSS rules (currently lines 60–82):

```ts
      {
        test: /\.s?(c|a)ss$/,
        resourceQuery: { not: [/raw/] },
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
        include: /\.module\.s?(c|a)ss$/,
      },
      {
        test: /\.s?css$/,
        resourceQuery: { not: [/raw/] },
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\.module\.s?(c|a)ss$/,
      },
```

Replace with:

```ts
      {
        test: /\.s?(c|a)ss$/,
        resourceQuery: { not: [/raw/] },
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              // postcss-loader + sass-loader both run before css-loader resolves @imports
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
        include: /\.module\.s?(c|a)ss$/,
      },
      {
        test: /\.s?css$/,
        resourceQuery: { not: [/raw/] },
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // postcss-loader + sass-loader both run before css-loader resolves @imports
            options: { importLoaders: 2 },
          },
          'postcss-loader',
          'sass-loader',
        ],
        exclude: /\.module\.s?(c|a)ss$/,
      },
```

Two changes per rule: insert `'postcss-loader'` between `'css-loader'` and `'sass-loader'`, and bump `importLoaders` from 1 → 2 (modules rule) or 0 → 2 (non-modules rule — converted from plain string to object form).

- [ ] **Step 2: Edit `.erb/configs/webpack.config.renderer.prod.ts`**

Find the two CSS rules (currently lines 51–73):

```ts
      {
        test: /\.s?(a|c)ss$/,
        resourceQuery: { not: [/raw/] },
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
        include: /\.module\.s?(c|a)ss$/,
      },
      {
        test: /\.s?(a|c)ss$/,
        resourceQuery: { not: [/raw/] },
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /\.module\.s?(c|a)ss$/,
      },
```

Replace with:

```ts
      {
        test: /\.s?(a|c)ss$/,
        resourceQuery: { not: [/raw/] },
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              // postcss-loader + sass-loader both run before css-loader resolves @imports
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
        include: /\.module\.s?(c|a)ss$/,
      },
      {
        test: /\.s?(a|c)ss$/,
        resourceQuery: { not: [/raw/] },
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // postcss-loader + sass-loader both run before css-loader resolves @imports
            options: { importLoaders: 2 },
          },
          'postcss-loader',
          'sass-loader',
        ],
        exclude: /\.module\.s?(c|a)ss$/,
      },
```

Same pattern as dev, with `MiniCssExtractPlugin.loader` in place of `'style-loader'`.

- [ ] **Step 3: Replace the Storybook postcss-injection monkey-patch with a small config-path override**

Open `.storybook/main.ts`. Find the whole injection block (currently lines 59–116) — everything starting from:

```ts
// Inject postcss-loader into the renderer's CSS rules for Storybook only.
```

through the closing `}` of:

```ts
      });
    }
```

That is, the block that ends right before `// Add path mapping for platform-bible-react's @/ alias…`.

Replace it with:

```ts
// Override the inherited postcss-loader's config path so Storybook uses
// .storybook/postcss.config.ts (which scans extensions and platform-bible-react source)
// rather than the root postcss.config.ts (app-scoped). postcss-loader is now supplied
// by the shared renderer webpack config, so we just need to point it at the right config.
// See docs/tailwind.md for the overall Tailwind architecture.
const storybookPostcssConfigPath = join(__dirname, 'postcss.config.ts');
if (rendererConfigSanitized.module?.rules) {
  const rendererRules: RuleSetRule[] = rendererConfigSanitized.module.rules;
  rendererConfigSanitized.module.rules = rendererRules.map((rule) => {
    if (!rule || typeof rule !== 'object' || !Array.isArray(rule.use)) return rule;
    return {
      ...rule,
      use: rule.use.map((u) => {
        if (u === 'postcss-loader') {
          return {
            loader: 'postcss-loader',
            options: { postcssOptions: { config: storybookPostcssConfigPath } },
          };
        }
        return u;
      }),
    };
  });
}
```

- [ ] **Step 4: Run the app production build to verify it still compiles**

```bash
npm run build 2>&1 | tail -10; echo "exit=$?"
```

Expected: `exit=0`. No webpack errors. This is the first time the renderer config's CSS rules have postcss-loader in them, so any PostCSS misconfiguration surfaces here.

- [ ] **Step 5: Verify Storybook still builds and output is unchanged in shape**

```bash
rm -rf storybook-static && npm run storybook:build > /tmp/sb-task3.log 2>&1; echo "exit=$?"; tail -3 /tmp/sb-task3.log
```

Expected: `exit=0`, `info => Output directory: …`.

Confirm PBR and extension utilities are still in the Storybook bundle:

```bash
grep -rE "tw-flex|tw-grid" storybook-static/*.css 2>/dev/null | head -2
```

Expected: at least one match.

- [ ] **Step 6: Commit**

```bash
git add .erb/configs/webpack.config.renderer.dev.ts .erb/configs/webpack.config.renderer.prod.ts .storybook/main.ts
git commit -m "feat(tailwind): add postcss-loader to renderer webpack; simplify Storybook

Adds postcss-loader to both CSS rules in the shared renderer webpack
config (dev + prod), so the Electron app now processes Tailwind at
build time. importLoaders is bumped so postcss-loader and sass-loader
both re-run on any CSS resolved via @import.

Storybook's webpackFinal now inherits postcss-loader from the renderer
config. The previous ~60-line injection block is replaced by a ~15-line
override that re-points the inherited postcss-loader at
.storybook/postcss.config.ts.

Part of PT-3920."
```

---

## Task 4: Add core's Tailwind entry CSS and wire it into the renderer

**Context:** The renderer webpack now processes CSS through PostCSS → Tailwind, but core doesn't have an entry file that actually triggers Tailwind's `@tailwind` directives. Add that file (utilities-only per spec §4) and import it as a side effect from the renderer's established style-import site, `src/renderer/app.component.tsx`.

**Files:**

- Create: `src/renderer/styles/tailwind.css`
- Modify: `src/renderer/app.component.tsx` (near line 4, where `import './app.component.scss';` is)

- [ ] **Step 1: Create `src/renderer/styles/tailwind.css`**

```css
/* Core's Tailwind entry for the paranext-core Electron app build.
 * Utilities-only — preflight (base) is intentionally omitted.
 * Preflight continues to come from platform-bible-react's runtime-injected CSS, scoped under
 * .pr-twp. See docs/tailwind.md for the overall Tailwind architecture. */
@tailwind components;
@tailwind utilities;
```

No `@tailwind base;` directive — that matches the spec's utilities-only decision.

- [ ] **Step 2: Check stylelint tolerates `@tailwind` directives**

```bash
npx stylelint src/renderer/styles/tailwind.css
```

Expected: exits 0 with no output, or at most warnings. If stylelint errors on `@tailwind` as an unknown at-rule, check whether `stylelint-config-tailwindcss` is extended in `.stylelintrc.*`. If not, add `"extends": ["stylelint-config-tailwindcss"]` to the stylelint config — the package is already in `package.json` (version `^0.0.7`).

(If adding the extends is needed, include it in the Step 5 commit with a one-line commit-message bullet.)

- [ ] **Step 3: Import the new entry from `src/renderer/app.component.tsx`**

Open `src/renderer/app.component.tsx`. Find the existing SCSS import (currently near line 4):

```ts
import './app.component.scss';
```

Insert a new line right after it so Tailwind's utility classes load **last** in source order — Tailwind utilities are single-class (low specificity), so for any tie they must come after component CSS to win. This is the standard Tailwind-with-component-styles ordering.

```ts
import './app.component.scss';
import './styles/tailwind.css';
```

- [ ] **Step 4: Build and verify Tailwind utilities are emitted**

```bash
npm run build 2>&1 | tail -5; echo "exit=$?"
```

Expected: `exit=0`.

Sanity-check the emitted CSS for a utility that core uses but PBR's compiled CSS is unlikely to carry (pick one with the `!` modifier from `platform-bible-toolbar.tsx` usage, e.g. `tw-h-12`):

```bash
find release/app/dist/renderer -name "*.css" -exec grep -l "tw-h-12" {} + 2>/dev/null | head
```

Expected: at least one path prints.

(If `release/app/dist/renderer` doesn't exist, use `find . -name "*.css" -path "*/dist*" -newer /tmp/sb-task3.log 2>/dev/null | head -5` to locate the actual output location emitted by `npm run build`.)

- [ ] **Step 5: Commit**

```bash
git add src/renderer/styles/tailwind.css src/renderer/app.component.tsx
# If stylelint config was also adjusted in Step 2, include that file too.
git commit -m "feat(tailwind): emit core Tailwind utilities from app build

Adds src/renderer/styles/tailwind.css (utilities-only — no @tailwind
base; directive) and imports it from src/renderer/app.component.tsx.
Combined with the postcss-loader in the renderer webpack config,
the paranext-core Electron app now emits its own Tailwind utilities
from its own source. tw-* classes in core code no longer depend on
incidental overlap with PBR's compiled bundle.

Part of PT-3920."
```

---

## Task 5: Runtime verification with a probe utility

**Context:** The previous tasks compile and ship utilities in the bundle, but the real win is runtime rendering of a core-only class that PBR doesn't already emit. Add a temporary probe, run the app, confirm it renders, revert the probe.

**Files:**

- Temporary modify: `src/renderer/components/platform-bible-toolbar.tsx` (or any visible core component)

- [ ] **Step 1: Add a probe**

Pick a short-lived arbitrary-value utility class unlikely to appear anywhere else, e.g. `tw-rotate-[7.3deg]`. Open `src/renderer/components/platform-bible-toolbar.tsx`, find a visible top-level element with an existing `className`, and append the probe. For example, change:

```tsx
<SomeElement className="tw-h-12 tw-bg-transparent">
```

to:

```tsx
<SomeElement className="tw-h-12 tw-bg-transparent tw-rotate-[7.3deg]">
```

- [ ] **Step 2: Run the app and observe**

Use the repo's standard dev startup (see `CLAUDE.md` → _Common Commands_ → _Development_). Once the app window renders, look at the toolbar — the probed element should be visibly rotated 7.3°.

```bash
./.erb/scripts/refresh.sh
```

If you can't run the app interactively in your environment, inspect the built CSS instead:

```bash
find release/app/dist/renderer -name "*.css" -exec grep -l "tw-rotate-\\[7\\.3deg\\]" {} + 2>/dev/null | head
```

Expected: at least one match (the arbitrary-value utility was detected by Tailwind's content scanner and emitted).

- [ ] **Step 3: Revert the probe**

Undo Step 1 so the probe is not committed:

```bash
git restore src/renderer/components/platform-bible-toolbar.tsx
```

Verify clean tree:

```bash
git diff --stat
```

Expected: no output (probe is gone).

- [ ] **Step 4: No commit for this task**

The probe was diagnostic only. Nothing to commit.

---

## Task 6: Add `docs/tailwind.md` and pointer comments

**Context:** The spec requires a contributor-facing doc covering where Tailwind runs, where the configs live, how Storybook handles Tailwind, and when a story needs special setup. Tailwind config files already have one-line comments added in Tasks 1 and 2 (`See docs/tailwind.md …`); create the doc they point to.

**Files:**

- Create: `docs/tailwind.md`

- [ ] **Step 1: Create `docs/tailwind.md`**

```markdown
# Tailwind in paranext-core

This doc explains where Tailwind runs in paranext-core, which config file controls
what, and how to author new stories that depend on Tailwind.

## Where Tailwind runs

| Context                              | Config                                                           | Scans                                                                                     | Emits                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| paranext-core Electron app build     | `tailwind.config.ts` (root) + `postcss.config.ts` (root)         | `./src/**`                                                                                | Utilities-only (no preflight) — see "Why utilities-only" below                                                 |
| paranext-core Storybook build        | `.storybook/tailwind.config.ts` + `.storybook/postcss.config.ts` | `./src/**`, `./extensions/src/**`, `./lib/platform-bible-react/src/**`, `./.storybook/**` | Utilities + scoped preflight (via the PBR preset's `scopedPreflightStyles({ cssSelector: '.pr-twp' })` plugin) |
| `platform-bible-react`               | `lib/platform-bible-react/tailwind.config.ts`                    | `lib/platform-bible-react/src/**`                                                         | Utilities + scoped preflight, injected into the host document at runtime via its dist JS bundle                |
| Each extension in `extensions/src/*` | `extensions/src/<ext>/tailwind.config.ts` + `postcss.config.ts`  | that extension's `src/**`                                                                 | Utilities + preflight, isolated by WebView (iframe)                                                            |

Both core configs extend platform-bible-react's config via `presets: [libConfig]`,
so theme tokens, the `tw-` class prefix, and the plugin list (`typography`,
`tailwindcss-animate`, container queries, `scopedPreflightStyles`) are inherited.
Only `content` differs between them.

## Why utilities-only in the app build

Core's `src/renderer/styles/tailwind.css` contains only
`@tailwind components; @tailwind utilities;` — **not** `@tailwind base;`.
Preflight for core continues to come from PBR's runtime-injected CSS, which is
scoped under `.pr-twp`. Emitting preflight a second time from core would either
duplicate rules under `.pr-twp` or leak global resets that clash with rc-dock,
SCSS component stylesheets, and other non-Tailwind CSS. The goal of this setup
is to emit missing utilities, not missing preflight.

## Using Tailwind classes in core code

Just use `tw-*` classes in core's renderer code — no additional setup. They're
picked up by the content scanner in `tailwind.config.ts` and emitted as part of
the app build.

## Authoring a Storybook story that uses Tailwind

Stories "just work" by default. The `.storybook` config scans core, extensions,
and PBR source, so any `tw-*` class in a story file or the component under test
gets emitted into the Storybook bundle. No per-story setup is required.

## When you need something special or unexpected

Reach for one of these patterns only when the default setup doesn't cover your
case:

- **Demoing a component _outside_ `.pr-twp` preflight scope.** Preflight in
  Storybook is scoped under `.pr-twp` (applied in `.storybook/preview.ts`).
  If you need to show what a component looks like _without_ preflight
  (e.g. to check its base-style assumptions), wrap the story in a decorator
  that renders the component outside any `.pr-twp` ancestor.
- **Arbitrary-value classes built dynamically.** Tailwind's content scanner
  looks for literal class strings in source. If you build a class name at
  runtime (e.g. `` `tw-rotate-[${angle}deg]` ``), the scanner cannot see it and
  won't emit the utility. Either safelist the pattern in the relevant
  `tailwind.config.ts` or construct a finite set of literal class strings
  the scanner can detect.
- **Injecting an external stylesheet in a story.** If the story needs an
  external CSS file (e.g. `rc-dock/dist/rc-dock.css` imported at the top of
  the story), just add a plain `import` — Storybook's webpack config picks
  up CSS imports the same way the app build does.

## Tips

- New `tw-*` class in core code isn't taking effect? Make sure you ran
  `npm run build` after the code change (or restart the dev server) — the
  Tailwind content scan runs at build time. Static analysis of class strings
  is strict: no template literals or runtime concatenation.
- Changed a `tailwind.config.ts` content glob and nothing happens? Restart
  the build — webpack caches the compiled CSS.
- Storybook rebuilds do more Tailwind work than the app build because the
  Storybook config scans three trees (core + extensions + PBR). That's
  expected; the app build uses the narrower root config and is faster.
```

- [ ] **Step 2: Verify the pointer comments in earlier tasks landed**

```bash
grep -l "docs/tailwind.md" tailwind.config.ts postcss.config.ts .storybook/tailwind.config.ts .storybook/postcss.config.ts .storybook/main.ts src/renderer/styles/tailwind.css
```

Expected: all six files print (each has a one-line `See docs/tailwind.md` or `See docs/tailwind.md for the overall Tailwind architecture` comment added in Tasks 1–4).

If any file is missing the pointer, add it now as a one-line comment near the top of the file and include it in the Step 3 commit.

- [ ] **Step 3: Commit**

```bash
git add docs/tailwind.md
git commit -m "docs(tailwind): add contributor guide for Tailwind in paranext-core

Explains the four Tailwind contexts (app, Storybook, PBR, extensions),
why core's app build emits utilities only (no @tailwind base;), how
tw-* classes work in core code, how Storybook stories handle Tailwind
by default, and the edge cases where a story needs extra setup.

Pointer comments added to each Tailwind config file in earlier
commits link here.

Part of PT-3920."
```

---

## Task 7: Push branch and open PR

**Context:** Six commits on `pt-3920-tailwind-in-core` (one from each of Tasks 1–3, 4, 6, plus the spec commit from brainstorming). Push and open a PR targeting `main`.

- [ ] **Step 1: Verify the commit history**

```bash
git log --oneline main..HEAD
```

Expected (in reverse-chronological order):

```
<sha> docs(tailwind): add contributor guide for Tailwind in paranext-core
<sha> feat(tailwind): emit core Tailwind utilities from app build
<sha> feat(tailwind): add postcss-loader to renderer webpack; simplify Storybook
<sha> refactor(tailwind): narrow root configs to app-only content globs
<sha> refactor(storybook): move Storybook Tailwind/PostCSS configs into .storybook/
<sha> docs(pt-3920): add design spec for Tailwind in core app build
```

Six commits.

- [ ] **Step 2: Push the branch**

```bash
git push -u origin pt-3920-tailwind-in-core
```

Expected: exit 0; GitHub prints a PR-creation URL.

- [ ] **Step 3: Open the PR**

```bash
gh pr create --base main --title "PT-3920: Make Tailwind fully functional in paranext-core's app build" --body "$(cat <<'EOF'
## Summary
- Wire Tailwind into the paranext-core Electron app webpack build so core's `tw-*` utility classes are emitted from core's own source.
- Split the existing Storybook-only Tailwind/PostCSS configs into two config pairs — root configs are now app-only, `.storybook/tailwind.config.ts` + `.storybook/postcss.config.ts` are Storybook-only.
- Simplify `.storybook/main.ts`: replaces a ~60-line `postcss-loader` injection with a ~15-line override that just re-points the inherited loader at the Storybook config.
- Utilities-only emission from core — preflight keeps coming from PBR's runtime-injected CSS under `.pr-twp`.
- New `docs/tailwind.md` explains the full Tailwind architecture for contributors.

Full design: `docs/specs/2026-04-16-tailwind-in-core-design.md`
Implementation plan: `docs/plans/2026-04-16-tailwind-in-core.md`

## Test plan
- [x] `npm run build` succeeds; renderer bundle emits `tw-*` utilities from core's own source.
- [x] `npm run storybook:build` succeeds; output contains utilities from core + extensions + PBR source as before.
- [x] A previously-silent utility (probe: `tw-rotate-[7.3deg]` on the toolbar) renders correctly in the running app.
- [ ] `npm run storybook` (dev mode) starts and stories render with Tailwind styling.
- [ ] Extension builds still produce their own Tailwind output (`npm run build` covers this).
- [ ] `.storybook/main.ts` monkey-patch is gone; Storybook inherits postcss-loader from renderer webpack.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR URL printed to stdout.

- [ ] **Step 4: Report PR URL to the user**

Print the URL. Task complete.
