# Storybook Theme Switcher Follow-ups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Address the unresolved review items from PR #2180 (Storybook Theme Switcher): doc rework around Appearance × Theme axes, theme-matrix-demo cleanup, terminology rename in UI text, and assorted Devin findings (comments, IconButton active prop, format-mismatch warnings).

**Architecture:** Sequential file-scoped commits on branch `follow-up-storybook-theme-switcher`. UI labels and prose change; code identifiers (`StorybookColorScheme` type, storage keys, channel name) stay. CSS class refactor and identifier rename are deferred per spec.

**Tech Stack:** React, TypeScript, MDX, Tailwind v4 with shadcn tokens, Storybook 9, Vitest.

**Spec:** [docs/specs/2026-05-26-storybook-theme-switcher-followup-design.md](../specs/2026-05-26-storybook-theme-switcher-followup-design.md)

**Working directory:** `lib/platform-bible-react/` for most commands.

---

## File map

| File                                           | Touched in task | Why                                                                   |
| ---------------------------------------------- | --------------- | --------------------------------------------------------------------- |
| `.storybook/theme-apply.ts`                    | 1               | Add comments (#9, D4) + JSDoc terminology                             |
| `.storybook/theme-constants.ts`                | 1               | Update maintenance comment (D4)                                       |
| `.storybook/storybook-themes.css`              | 2               | Format-mismatch comment (D5) + alpha-syntax comment (D3)              |
| `.storybook/manager.tsx`                       | 3               | `active={false}` (D11) + label rename ("Color scheme" → "Appearance") |
| `src/stories/guidelines/theme-matrix-demo.tsx` | 4               | Tokens replace hardcoded colors (#4, #5, #6)                          |
| `src/stories/guides/theme-colors.stories.tsx`  | 5               | Terminology rename + `text-blue-600` → `text-primary`                 |
| `src/stories/guidelines/theming.mdx`           | 6               | Restructure (#1, #2, #3) + terminology                                |
| `.storybook/BRANDING.md`                       | 7               | Restructure (#8) + terminology                                        |
| `.storybook/STORYBOOK.md`                      | 8               | Chromatic paragraph (#7) + terminology                                |

---

### Task 1: Code comments + JSDoc terminology in `theme-apply.ts` and `theme-constants.ts`

Resolves item #9 and Devin D4. No behavior change.

**Files:**

- Modify: `lib/platform-bible-react/.storybook/theme-apply.ts:26-41`
- Modify: `lib/platform-bible-react/.storybook/theme-constants.ts:1`

- [ ] **Step 1: Add block comment above `CLASS_MAP` and inline comment on `ALL_THEME_CLASSES`**

In `theme-apply.ts`, replace lines 26-41:

```ts
/** Classes applied to the Storybook preview root for each legacy composite id (see `index.css`). */
const CLASS_MAP: Record<StorybookThemeId, readonly string[]> = {
  'shadcn-light': ['theme-shadcn-neutral'],
  'shadcn-dark': ['dark', 'theme-shadcn-neutral'],
  'platform-light': [],
  'platform-dark': ['dark'],
  'paratext-light': ['paratext-light'],
  'paratext-dark': ['paratext-dark'],
};

const ALL_THEME_CLASSES = [
  'dark',
  'paratext-light',
  'paratext-dark',
  'theme-shadcn-neutral',
] as const;
```

with:

```ts
/**
 * Classes applied to the Storybook preview root for each legacy composite id (see `index.css`).
 *
 * Class names are not uniform: bare `dark` for the Platform default, family-prefixed `paratext-*`,
 * and theme-prefixed `theme-shadcn-neutral`. A uniform `theme-{family}` scheme with `.dark` as a
 * modifier would require coordinated changes in `index.css`, `themes.data.json`, and the app's
 * `theme.service-host.ts`. Deferred; tracked in PR #2180 review.
 */
const CLASS_MAP: Record<StorybookThemeId, readonly string[]> = {
  'shadcn-light': ['theme-shadcn-neutral'],
  'shadcn-dark': ['dark', 'theme-shadcn-neutral'],
  'platform-light': [],
  'platform-dark': ['dark'],
  'paratext-light': ['paratext-light'],
  'paratext-dark': ['paratext-dark'],
};

/**
 * Must be a superset of every class value in `CLASS_MAP`. Add new entries here whenever a new theme
 * is added to CLASS_MAP, otherwise switching away will leave stale classes on `<html>`.
 */
const ALL_THEME_CLASSES = [
  'dark',
  'paratext-light',
  'paratext-dark',
  'theme-shadcn-neutral',
] as const;
```

- [ ] **Step 2: Update maintenance pointer in `theme-constants.ts`**

Replace line 1 of `theme-constants.ts`:

```ts
// Shared by manager.tsx and theme-apply.ts — add composite ids and toolbar lists here; update CLASS_MAP in theme-apply.ts when adding a palette.
```

with:

```ts
// Shared by manager.tsx and theme-apply.ts — add composite ids and toolbar lists here;
// when adding a palette, update BOTH `CLASS_MAP` and `ALL_THEME_CLASSES` in theme-apply.ts
// (the latter is used to strip stale classes when switching themes).
```

- [ ] **Step 3: Confirm `theme-apply.ts` JSDoc is already terminology-neutral**

Skim the JSDoc blocks in `theme-apply.ts` (lines 13-18, 22-24, 47-49, 70-73, 90, 104-107, 120-122, 157-159, 189-191, 206-208). None of them use the user-facing label "color scheme" — they reference the code identifier `colorScheme` (which stays), the function names `resolveEffectiveColorScheme` etc. (which stay), or neutral terms like "toolbar state". No edits needed; record that this step has been verified.

- [ ] **Step 4: Verify changes typecheck and lint cleanly**

Run from `lib/platform-bible-react/`:

```bash
npm run lint -- .storybook/theme-apply.ts .storybook/theme-constants.ts
npx tsc --noEmit -p tsconfig.json
```

Expected: zero errors. Comments don't affect types or lint.

- [ ] **Step 5: Commit**

```bash
git add lib/platform-bible-react/.storybook/theme-apply.ts lib/platform-bible-react/.storybook/theme-constants.ts
git commit -m "$(cat <<'EOF'
docs(storybook): note CLASS_MAP naming inconsistency and ALL_THEME_CLASSES sync

Address PR #2180 review item #9 and Devin finding D4. Adds comments
acknowledging the inconsistent CSS class naming scheme (deferred refactor)
and that ALL_THEME_CLASSES must be kept in sync with CLASS_MAP.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: `storybook-themes.css` format-mismatch + alpha-syntax comments

Resolves Devin findings D3 and D5. No behavior change.

**Files:**

- Modify: `lib/platform-bible-react/.storybook/storybook-themes.css:7-11, 45`

- [ ] **Step 1: Extend the existing Shadcn Neutral comment to flag the format mismatch (D5)**

Replace lines 7-11:

```css
/**
 * Stock Shadcn Neutral (HSL) — Storybook-only preview. Not applied in the running app.
 * Converted from OKLCH in https://ui.shadcn.com/docs/theming (neutral "Default Theme CSS").
 * Pair with `.dark` on the same element for dark mode: `.dark.theme-shadcn-neutral`.
 */
```

with:

```css
/**
 * Stock Shadcn Neutral (HSL) — Storybook-only preview. Not applied in the running app.
 * Converted from OKLCH in https://ui.shadcn.com/docs/theming (neutral "Default Theme CSS").
 * Pair with `.dark` on the same element for dark mode: `.dark.theme-shadcn-neutral`.
 *
 * Intentional format mismatch: this file uses `hsl(...)` while `index.css` uses `oklch(...)`.
 * Both are complete CSS color values consumed via bare `var(--token)`. Do NOT re-wrap them in
 * `hsl(var(--token))` — see PR #2327 for the bug that motivated removing legacy wrapping.
 */
```

- [ ] **Step 2: Add alpha-syntax comment above `.dark.theme-shadcn-neutral` (D3)**

Replace line 45:

```css
.dark.theme-shadcn-neutral {
```

with:

```css
/*
 * These tokens use alpha-in-HSL syntax (e.g. `hsl(0 0% 100% / 0.1)` on --border, --input,
 * --sidebar-border) to match the stock Shadcn Neutral docs preset. Tailwind opacity modifiers
 * (e.g. `border-border/50`) would produce invalid `hsl(... / 0.1 / 0.5)` under this theme.
 * Project-wide, tailwind.config.ts does not enable alpha modifiers on `border`/`input`, so the
 * trap is latent; documented here to discourage future misuse.
 */
.dark.theme-shadcn-neutral {
```

- [ ] **Step 3: Verify CSS still parses (lint via stylelint if configured, otherwise build)**

Run from `lib/platform-bible-react/`:

```bash
npm run lint
```

Expected: zero errors. Comments only.

- [ ] **Step 4: Commit**

```bash
git add lib/platform-bible-react/.storybook/storybook-themes.css
git commit -m "$(cat <<'EOF'
docs(storybook): warn against hsl-wrapping and alpha-modifier traps

Address Devin findings D3 and D5 on PR #2180. Extends the Shadcn Neutral
block comment to flag the intentional hsl-vs-oklch format mismatch with
index.css (preventing the bug fixed by PR #2327 from regressing), and adds
a comment explaining that alpha-in-HSL syntax on --border / --input would
break Tailwind opacity modifiers in this Storybook-only theme.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: `manager.tsx` — `active={false}` and label rename

Resolves Devin D11 and the toolbar half of the terminology rename. Visible UI change.

**Files:**

- Modify: `lib/platform-bible-react/.storybook/manager.tsx:86-87, 128-129, 142-143`

- [ ] **Step 1: Set `active={false}` on both IconButtons**

Replace lines 84-93 of `manager.tsx`:

```tsx
<IconButton
  key={`${REGISTER_ID}/color-scheme`}
  title="Color scheme"
  active={!!toolbarThemeState.colorScheme}
>
  <SunIcon />
  <IconButtonLabel>{STORYBOOK_COLOR_SCHEME_LABELS[toolbarThemeState.colorScheme]}</IconButtonLabel>
</IconButton>
```

with:

```tsx
<IconButton key={`${REGISTER_ID}/color-scheme`} title="Appearance" active={false}>
  <SunIcon />
  <IconButtonLabel>{STORYBOOK_COLOR_SCHEME_LABELS[toolbarThemeState.colorScheme]}</IconButtonLabel>
</IconButton>
```

Replace lines 126-133:

```tsx
<IconButton key={`${REGISTER_ID}/theme-family`} title="Theme" active={!!toolbarThemeState.family}>
  <PaintBrushIcon />
  <IconButtonLabel>{STORYBOOK_THEME_FAMILY_LABELS[toolbarThemeState.family]}</IconButtonLabel>
</IconButton>
```

with:

```tsx
<IconButton key={`${REGISTER_ID}/theme-family`} title="Theme" active={false}>
  <PaintBrushIcon />
  <IconButtonLabel>{STORYBOOK_THEME_FAMILY_LABELS[toolbarThemeState.family]}</IconButtonLabel>
</IconButton>
```

- [ ] **Step 2: Rename the registered tool title for Color scheme**

Replace lines 141-147:

```tsx
addons.register(REGISTER_ID, () => {
  addons.add(`${REGISTER_ID}/color-scheme`, {
    title: 'Color scheme',
    type: types.TOOL,
    match: matchStoryDocs,
    render: ColorSchemeTool,
  });
```

with:

```tsx
addons.register(REGISTER_ID, () => {
  addons.add(`${REGISTER_ID}/color-scheme`, {
    title: 'Appearance',
    type: types.TOOL,
    match: matchStoryDocs,
    render: ColorSchemeTool,
  });
```

(The `${REGISTER_ID}/color-scheme` id stays — it's a code identifier.)

- [ ] **Step 3: Verify typecheck and lint**

Run from `lib/platform-bible-react/`:

```bash
npm run lint -- .storybook/manager.tsx
npx tsc --noEmit -p tsconfig.json
```

Expected: zero errors.

- [ ] **Step 4: Manual Storybook check**

Run from `lib/platform-bible-react/`:

```bash
npm run storybook
```

Open the Storybook URL. Verify:

- Toolbar tooltip on the sun icon reads "Appearance" (was "Color scheme")
- Toolbar tooltip on the paintbrush reads "Theme" (unchanged)
- Neither button appears with a permanent highlight/active ring
- Clicking through Light / Dark / System and Shadcn Neutral / Platform / Paratext still works
- The current selection still shows as the label text under each icon

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add lib/platform-bible-react/.storybook/manager.tsx
git commit -m "$(cat <<'EOF'
fix(storybook): drop permanent toolbar active highlight; rename to "Appearance"

Address Devin finding D11 (IconButton active prop was always truthy) by
setting active={false} on both ColorSchemeTool and ThemeFamilyTool. Also
renames the toolbar label "Color scheme" to "Appearance" per PR #2180
review (Mercado: Apple-style naming). Code identifiers (StorybookColorScheme,
the addon id ".../color-scheme") are intentionally unchanged so the rename
is reversible if the Discord terminology discussion lands differently.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: `theme-matrix-demo.tsx` — replace hardcoded colors with tokens

Resolves items #4, #5, #6. Visible UI change.

**Files:**

- Modify: `lib/platform-bible-react/src/stories/guidelines/theme-matrix-demo.tsx:21, 22, 26, 36`

- [ ] **Step 1: Replace outer wrapper + intro prose colors (items #5, #6)**

Replace lines 19-32:

```tsx
export function ThemeMatrixDemo() {
  return (
    <div className="tw:not-prose tw:min-h-[200px] tw:max-w-6xl tw:space-y-4 tw:bg-slate-50 tw:p-6 tw:text-slate-900">
      <p className="tw:text-sm tw:text-slate-500">
        Each panel uses the same components with theme variables applied on a local wrapper. Compare
        with the global toolbar themes on other stories. For a larger token table, see{' '}
        <a
          className="tw:text-blue-600 tw:hover:underline"
          href="https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs"
        >
          Guides / Theme Colors
        </a>
        .
      </p>
```

with:

```tsx
export function ThemeMatrixDemo() {
  return (
    <div className="light tw:not-prose tw:min-h-[200px] tw:max-w-6xl tw:space-y-4 tw:bg-muted tw:p-6">
      <p className="tw:text-sm tw:text-muted-foreground">
        Each panel uses the same components with theme variables applied on a local wrapper. Compare
        with the global toolbar themes on other stories. For a larger token table, see{' '}
        <a
          className="tw:text-primary tw:hover:underline"
          href="https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs"
        >
          Guides / Theme Colors
        </a>
        .
      </p>
```

Changes: `light` shell class added so the wrapper participates in theming with a stable light surface; `tw:bg-slate-50 tw:text-slate-900` → `tw:bg-muted`; `tw:text-slate-500` → `tw:text-muted-foreground`; `tw:text-blue-600 tw:hover:underline` → `tw:text-primary tw:hover:underline`.

- [ ] **Step 2: Drop redundant `tw:text-foreground` on inner card div (item #4)**

Replace line 36:

```tsx
            <div className="pr-twp tw:flex tw:flex-col tw:rounded-lg tw:border tw:border-border tw:bg-background tw:p-4 tw:text-foreground">
```

with:

```tsx
            <div className="pr-twp tw:flex tw:flex-col tw:rounded-lg tw:border tw:border-border tw:bg-background tw:p-4">
```

The `tw:!text-foreground` on the inner `<p>` (line 41) already covers foreground inside the docs iframe.

- [ ] **Step 3: Verify typecheck, lint, and tests**

Run from `lib/platform-bible-react/`:

```bash
npm run lint -- src/stories/guidelines/theme-matrix-demo.tsx
npx tsc --noEmit -p tsconfig.json
npm test
```

Expected: zero errors; existing tests pass.

- [ ] **Step 4: Manual Storybook check**

Run `npm run storybook`, navigate to Guidelines / Theming, scroll to the "Theme matrix" section. Verify:

- Outer wrapper renders with a light muted background (not slate-50)
- Intro paragraph + link use theme tokens (muted-foreground + primary)
- All six inner panels still display their respective themes
- Toggle the toolbar Appearance / Theme — the inner 6 panels stay pinned to their respective themes; the outer wrapper stays light (since `light` is on the shell)

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add lib/platform-bible-react/src/stories/guidelines/theme-matrix-demo.tsx
git commit -m "$(cat <<'EOF'
refactor(storybook): use theme tokens in theme-matrix-demo

Address PR #2180 review items #4, #5, #6 (Mercado). Replaces hardcoded
slate-50 / slate-900 / slate-500 / blue-600 with bg-muted, muted-foreground,
and primary so the demo's own chrome participates in theming. Adds the
`light` shell class to pin the outer container to a stable light surface so
the six panels can be compared on a neutral background. Drops the redundant
tw:text-foreground on the inner card div (the !tw:text-foreground on the
inner <p> already covers it).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: `theme-colors.stories.tsx` — terminology rename + carry-along

Carry-along cleanup discovered during file reads.

**Files:**

- Modify: `lib/platform-bible-react/src/stories/guides/theme-colors.stories.tsx:84-85, 88, 95, 206`

- [ ] **Step 1: Replace "Color scheme" wording on lines 84-85**

Replace lines 83-86:

```tsx
      <p>
        Color variables reflect the toolbar state: <strong>Color scheme</strong> (light / dark /
        system) and <strong>Theme</strong> (Shadcn Neutral, Platform, Paratext), persisted as{' '}
        <code>{'{ family, colorScheme }'}</code>. Token values are defined in{' '}
```

with:

```tsx
      <p>
        Color variables reflect the toolbar state: <strong>Appearance</strong> (light / dark /
        system) and <strong>Theme</strong> (Shadcn Neutral, Platform, Paratext), persisted as{' '}
        <code>{'{ family, colorScheme }'}</code>. Token values are defined in{' '}
```

Note: the `colorScheme` inside the JSON example stays — that's the code identifier.

- [ ] **Step 2: Replace hardcoded anchor colors (lines 88, 95)**

Replace line 88:

```tsx
className = 'tw:text-blue-600 tw:hover:underline';
```

with:

```tsx
className = 'tw:text-primary tw:hover:underline';
```

Same change at line 95 (second anchor in the same paragraph):

```tsx
className = 'tw:text-blue-600 tw:hover:underline';
```

→

```tsx
className = 'tw:text-primary tw:hover:underline';
```

Use `replace_all=true` when editing if the line content is identical at both call sites.

- [ ] **Step 3: Update the story description on line 206**

Replace lines 202-208:

```tsx
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Live CSS variables for the toolbar Color scheme + Theme selection (see Guides / Theming for architecture).',
      },
    },
  },
};
```

with:

```tsx
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Live CSS variables for the toolbar Appearance + Theme selection (see Guidelines / Theming for architecture).',
      },
    },
  },
};
```

Note: corrected "Guides / Theming" → "Guidelines / Theming" (the actual sidebar location of the doc).

- [ ] **Step 4: Verify typecheck, lint, tests**

```bash
npm run lint -- src/stories/guides/theme-colors.stories.tsx
npx tsc --noEmit -p tsconfig.json
npm test
```

Expected: zero errors.

- [ ] **Step 5: Manual Storybook check**

Run `npm run storybook`, navigate to Guides / Theme Colors. Verify:

- Story description text says "Appearance + Theme" (not "Color scheme + Theme")
- Intro paragraph says "Appearance" in bold (not "Color scheme")
- Anchor links use the primary token color (theme-aware) instead of blue-600
- Token swatches still render correctly across all 6 toolbar combinations

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add lib/platform-bible-react/src/stories/guides/theme-colors.stories.tsx
git commit -m "$(cat <<'EOF'
refactor(storybook): rename "Color scheme" to "Appearance" in Theme Colors story

UI-text-only rename per PR #2180 review (Mercado). The code identifier
colorScheme inside the JSON shape stays unchanged. Also replaces hardcoded
text-blue-600 anchor colors with text-primary so the prose participates in
theming (same anti-pattern as theme-matrix-demo.tsx items #5/#6).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: `theming.mdx` — full restructure

Resolves items #1, #2, #3 and the bulk of the terminology rename. Largest single change. Adds `ExampleBlock` import.

**Files:**

- Modify: `lib/platform-bible-react/src/stories/guidelines/theming.mdx` (rewrite most of it)

- [ ] **Step 1: Replace lines 1-2 to add ExampleBlock import**

Replace:

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
import { ThemeMatrixDemo } from './theme-matrix-demo';

;
```

with:

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
import { ThemeMatrixDemo } from './theme-matrix-demo';
import { ExampleBlock } from '../../storybook/example-block.component';

;
```

- [ ] **Step 2: Replace the "Try it: change theme" + intro sections (lines 23-36) with the Appearance × Theme framing**

Replace lines 23-36:

```mdx
Use the **Color scheme** (light, dark, or system) and **Theme** (Shadcn Neutral, Platform, or
Paratext) controls in the Storybook toolbar to switch palettes. Selection is stored as
`{ family, colorScheme }` (when **system** is chosen, light vs dark follows
`prefers-color-scheme`). Classes on `document.documentElement` come from
[index.css](https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css).
The effective row is always one of the six legacy composite ids below (also used for
`parameters.themes.themeOverride` strings):

- **shadcn-light** / **shadcn-dark** — Stock Shadcn Neutral (HSL, from the docs OKLCH scaffold)
  in `.theme-shadcn-neutral`; Storybook preview only (not in `themes.data.json`).
- **platform-light** / **platform-dark** — Platform.Bible default (Slate-based) light and dark;
  matches the running app.
- **paratext-light** / **paratext-dark** — Paratext palettes.
```

with:

```mdx
This Storybook has two independent axes:

- **Appearance** — light, dark, or system (when **system** is chosen, light vs dark follows
  `prefers-color-scheme`)
- **Theme** — Shadcn Neutral, Platform, or Paratext (the color palette)

Pick each from the Storybook toolbar. Selection is persisted under `localStorage` as
`{ family, colorScheme }`. Classes on `document.documentElement` come from
[index.css](https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css).

The effective row is one of six composite ids (also used for `parameters.themes.themeOverride`):

|                | Light            | Dark            |
| -------------- | ---------------- | --------------- |
| Shadcn Neutral | `shadcn-light`   | `shadcn-dark`   |
| Platform       | `platform-light` | `platform-dark` |
| Paratext       | `paratext-light` | `paratext-dark` |

Shadcn Neutral is Storybook-only (not in `themes.data.json`); Platform and Paratext match the
running app.
```

- [ ] **Step 3: Replace the "Platform vs Shadcn Neutral vs Paratext" section (lines 37-63) with one tight paragraph per theme**

Replace lines 37-63:

```mdx
## Platform vs Shadcn Neutral vs Paratext

CSS variables live in
[index.css](https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css):
Platform light is `:root` / `.light`; Platform dark is `.dark`; stock Shadcn
Neutral is `.theme-shadcn-neutral` (and `.dark.theme-shadcn-neutral`); Paratext is
`.paratext-light` / `.paratext-dark`. The running app loads Platform and Paratext HSLs from
[themes.data.json](https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json)
(default Platform family key and `paratext`); Shadcn Neutral is Storybook-only.

**Platform** default (`:root` / `.dark`) is **Slate-based** (blue-gray neutrals) but **not
identical** to the stock Shadcn Neutral preset under `.theme-shadcn-neutral` in `storybook-themes.css`.
Use the toolbar's **Shadcn Neutral** options when you need the closest match to
[shadcn/ui docs](https://ui.shadcn.com/docs/theming#neutral) for development, UX review, or
debugging. Pick **Shadcn Neutral** under Theme and set Color scheme to light or dark (or system).

**Light:** Platform differs from stock Neutral on **popover** (tinted vs pure white),
**secondary / muted / accent** neutrals (Platform `210 50% 95%` vs Neutral `0 0% 96.1%`), and
the full **sidebar-\*** token block (Platform stays Slate-aligned; Neutral follows the docs
scaffold).

**Dark:** Platform uses solid **border** / **input** grays; stock Neutral uses semi-transparent
white on dark. Sidebar styling also differs (including Neutral's violet **sidebar-primary** in
the docs preset).

**Paratext** is a separate palette (Caffeine-inspired in tweakcn), not vanilla Shadcn; it is not
"mostly Slate."
```

with:

```mdx
## Themes

CSS variables live in
[index.css](https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css)
(Platform and Paratext) and
[.storybook/storybook-themes.css](https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/.storybook/storybook-themes.css)
(Shadcn Neutral, Storybook-only).

**Platform** — the product default (`:root` / `.dark`). Slate-based (blue-gray neutrals), close
to stock Shadcn Neutral but **not identical**: differs on **popover**, **secondary / muted /
accent** neutrals, and the full **sidebar-\*** block in both light and dark. The running app
loads these tokens from
[themes.data.json](https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json).

**Shadcn Neutral** — the stock shadcn preset (`.theme-shadcn-neutral` / `.dark.theme-shadcn-neutral`).
Storybook-only — pick it when you need the closest match to
[shadcn/ui docs](https://ui.shadcn.com/docs/theming#neutral) for development, UX review, or
debugging. In dark mode, **border** / **input** use semi-transparent white (vs Platform's solid
grays).

**Paratext** — a separate palette ([Caffeine-inspired in tweakcn](https://tweakcn.com/themes/cmeukcpoj000204l45lxw5a74)),
not vanilla Shadcn. Also loaded from `themes.data.json` in the running app.
```

- [ ] **Step 4: Replace the "Try it: change theme" section (lines 65-72) — make it concise**

Replace lines 65-72:

```mdx
## Try it: change theme

Shadcn-style theming is driven by CSS variables in
[index.css](https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css).
In this Storybook, use the **Color scheme** and **Theme** toolbar controls (not a separate
preview-app toggle) to switch palettes and confirm your story respects tokens—foreground,
background, borders, and components that use the same variables should track the selection.
```

with:

```mdx
## Try it

Use the **Appearance** and **Theme** toolbar controls (not a separate preview-app toggle) to
switch palettes and confirm your story respects tokens — foreground, background, borders, and
components that use the same variables should track the selection.
```

- [ ] **Step 5: Replace the "Bad example" table (lines 82-116) with `<ExampleBlock>`**

Replace lines 82-116:

````mdx
## Bad example

Manual colors on primitives do not follow the active theme.

<table>
  <tbody>
    <tr>
      <td>
        Bad example<div className="tw:text-xs">manual styles, unable to be themed</div>
      </td>
      <td>
        <input
          value="this has manual colors"
          aria-label="Bad example input with manual colors"
          readOnly
          className="tw:full tw:col-span-2 tw:flex tw:h-8 tw:rounded-md tw:border tw:border-slate-300 tw:bg-white tw:px-3 tw:py-2 tw:text-sm tw:text-slate-900 tw:ring-offset-white tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:placeholder:text-slate-400 tw:focus-visible:ring-2 tw:focus-visible:ring-slate-400 tw:focus-visible:ring-offset-2 tw:focus-visible:outline-none tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
        />
      </td>
    </tr>
  </tbody>
</table>

```jsx
<input
  value="this has manual colors"
  aria-label="Bad example input with manual colors"
  readOnly
  className="tw:full tw:col-span-2 tw:flex tw:h-8 tw:rounded-md tw:border tw:border-slate-300 tw:bg-white tw:px-3 tw:py-2 tw:text-sm tw:text-slate-900 tw:ring-offset-white tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:placeholder:text-slate-400 tw:focus-visible:ring-2 tw:focus-visible:ring-slate-400 tw:focus-visible:ring-offset-2 tw:focus-visible:outline-none tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
/>
```
````

with:

```mdx
## Bad example

Manual colors on primitives do not follow the active theme.

<ExampleBlock
  variant="dont"
  preview={
    <input
      value="this has manual colors"
      aria-label="Bad example input with manual colors"
      readOnly
      className="tw:flex tw:h-8 tw:rounded-md tw:border tw:border-slate-300 tw:bg-white tw:px-3 tw:py-2 tw:text-sm tw:text-slate-900 tw:ring-offset-white tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:placeholder:text-slate-400 tw:focus-visible:ring-2 tw:focus-visible:ring-slate-400 tw:focus-visible:ring-offset-2 tw:focus-visible:outline-none tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
    />
  }
  code={`<input
  value="this has manual colors"
  aria-label="Bad example input with manual colors"
  readOnly
  className="tw:file:border-0 tw:flex tw:h-8 tw:rounded-md tw:border
    tw:border-slate-300 tw:bg-white tw:px-3 tw:py-2 tw:text-sm tw:text-slate-900
    tw:ring-offset-white tw:file:bg-transparent tw:file:text-sm tw:file:font-medium
    tw:placeholder:text-slate-400 tw:focus-visible:outline-none tw:focus-visible:ring-2
    tw:focus-visible:ring-slate-400 tw:focus-visible:ring-offset-2
    tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
/>`}
>
  Manual styles, unable to be themed.
</ExampleBlock>
```

Note: dropped `tw:full` and `tw:col-span-2` from the preview input (they were grid leftovers from the table layout and not relevant once the input is in the ExampleBlock preview slot).

- [ ] **Step 6: Verify MDX builds**

Run from `lib/platform-bible-react/`:

```bash
npm run lint
npm run build:storybook
```

Expected: zero errors; Storybook static build completes. The MDX must parse and the `ExampleBlock` import must resolve.

- [ ] **Step 7: Manual Storybook check**

Run `npm run storybook`, navigate to Guidelines / Theming. Verify:

- Top intro reads "Appearance × Theme" sections with the 3×2 matrix table
- The "Themes" section has three tight paragraphs (Platform, Shadcn Neutral, Paratext) with the tweakcn link
- The "Try it" section refers to "Appearance and Theme toolbar controls"
- The "Bad example" section shows the `<ExampleBlock variant="dont">` with the rose accent, "Anti-pattern" label, the styled input preview, and the collapsed/expandable code block
- All six Appearance × Theme combinations still render the page without errors
- Docs scroll position is preserved when switching themes

Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add lib/platform-bible-react/src/stories/guidelines/theming.mdx
git commit -m "$(cat <<'EOF'
docs(storybook): restructure theming guide around Appearance × Theme axes

Address PR #2180 review items #1, #2, #3 (Mercado). Replaces the
four-paragraph "Platform vs Shadcn Neutral vs Paratext" section with a clear
3×2 matrix presentation, adds the tweakcn link for Paratext (Caffeine), and
swaps the bad-example <table> for the ExampleBlock component (variant="dont").
Renames toolbar wording from "Color scheme" to "Appearance".

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: `BRANDING.md` — restructure around Appearance × Theme

Resolves item #8.

**Files:**

- Modify: `lib/platform-bible-react/.storybook/BRANDING.md:3, 25, 43`

- [ ] **Step 1: Rewrite line 3 (the opening paragraph)**

Replace line 3:

```md
This guide explains how the **Storybook manager** (outer chrome: sidebar, toolbar, panels) and the **preview iframe** (Canvas and Docs) can be aligned with Paratext or internal branding. Preview appearance combines **Color scheme** (light / dark / system) and **Theme** (Shadcn Neutral, Platform, Paratext), applied via [manager.tsx](./manager.tsx) (toolbars + direct iframe DOM update), [theme-apply.ts](./theme-apply.ts), and [theme-decorator.ts](./theme-decorator.ts) — not `globals.theme`, so Docs scroll is preserved when switching themes. Customizing the manager shell (logos, `brandTitle`, light/dark chrome) is **optional** and does not affect story output.
```

with:

```md
This guide explains how the **Storybook manager** (outer chrome: sidebar, toolbar, panels) and the **preview iframe** (Canvas and Docs) can be aligned with Paratext or internal branding. Preview rendering is driven by two independent toolbar controls: **Appearance** (light / dark / system) and **Theme** (Shadcn Neutral, Platform, Paratext), applied via [manager.tsx](./manager.tsx) (toolbars + direct iframe DOM update), [theme-apply.ts](./theme-apply.ts), and [theme-decorator.ts](./theme-decorator.ts) — not `globals.theme`, so Docs scroll is preserved when switching themes. Customizing the manager shell (logos, `brandTitle`, light/dark chrome) is **optional** and does not affect story output.
```

- [ ] **Step 2: Update line 43 toolbar terminology**

Replace line 43:

```md
- **Preview:** [theme-constants.ts](./theme-constants.ts) defines toolbar **families** and **color schemes**, plus legacy composite ids (`shadcn-light`, … `paratext-dark`) for overrides. [theme-apply.ts](./theme-apply.ts) maps those to classes on `document.documentElement` and to CSS variables in `index.css`. [manager.tsx](./manager.tsx) registers **Color scheme** and **Theme** tools; state persists under `platform-bible-storybook-theme` (JSON).
```

with:

```md
- **Preview:** [theme-constants.ts](./theme-constants.ts) defines toolbar **theme families** and **appearance options**, plus legacy composite ids (`shadcn-light`, … `paratext-dark`) for overrides. [theme-apply.ts](./theme-apply.ts) maps those to classes on `document.documentElement` and to CSS variables in `index.css`. [manager.tsx](./manager.tsx) registers **Appearance** and **Theme** tools; state persists under `platform-bible-storybook-theme` (JSON).
```

- [ ] **Step 3: Spot-check line 25 — the payload reference**

Read line 25:

```md
**Optional:** To keep the manager light/dark chrome aligned with the preview toolbar, listen for the same `PLATFORM_BIBLE_THEME_CHANNEL` event (see [theme-apply.ts](./theme-apply.ts)) — payload is `{ family, colorScheme }` — or read `localStorage` under `platform-bible-storybook-theme` (JSON), parse, and map effective light/dark (resolve `system` via `prefers-color-scheme`) to `lightTheme` / `darkTheme`. This package does not ship that wiring by default; add it only if you want that behavior.
```

The literal `{ family, colorScheme }` is the JSON payload shape — `colorScheme` is the code key. **No change** — leave line 25 as-is.

- [ ] **Step 4: Verify markdown still renders (no MDX build needed; this is .md)**

```bash
npm run lint
```

Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add lib/platform-bible-react/.storybook/BRANDING.md
git commit -m "$(cat <<'EOF'
docs(storybook): rename "Color scheme" to "Appearance" in BRANDING.md

Address PR #2180 review item #8 (Mercado). Drops the "in flux" framing
and adopts the locked terminology: Appearance (light/dark/system) × Theme
(palette). The JSON payload key `colorScheme` is left untouched — that's
the code identifier, not user-facing prose.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: `STORYBOOK.md` — Chromatic paragraph + terminology

Resolves item #7. Chromatic is not currently enabled in CI (verified: `@chromatic-com/storybook` is installed in `package.json` but no `.github/workflows/*.yml` runs it).

**Files:**

- Modify: `lib/platform-bible-react/.storybook/STORYBOOK.md:18, 35, 48-49`

- [ ] **Step 1: Rewrite the Chromatic paragraph (line 18)**

Replace line 18:

```md
- **Visual regression:** `@chromatic-com/storybook` is installed so Storybook can talk to Chromatic, a hosted service that captures story screenshots and compares them to approved "baseline" images. This repo’s CI/release setup is what decides when baselines are updated and whether Chromatic is a required check on PRs.
```

with:

```md
- **Visual regression:** `@chromatic-com/storybook` is installed so Storybook can talk to Chromatic, a hosted service that captures story screenshots and compares them to approved "baseline" images. **Chromatic is not currently enabled in CI** — add a workflow step (e.g. via `chromaui/action`) and a `CHROMATIC_PROJECT_TOKEN` secret to opt in.
```

- [ ] **Step 2: Update the table description for `manager.tsx` (line 35)**

Replace line 35:

```md
| [manager.tsx](./manager.tsx) | Color scheme + Theme toolbars (direct iframe DOM updates, no `globals.theme`); optional shell tweaks in [BRANDING.md](./BRANDING.md) |
```

with:

```md
| [manager.tsx](./manager.tsx) | Appearance + Theme toolbars (direct iframe DOM updates, no `globals.theme`); optional shell tweaks in [BRANDING.md](./BRANDING.md) |
```

- [ ] **Step 3: Update the "Canvas and theming" prose (lines 48-49)**

Replace lines 48-49:

```md
- Theme classes on `html` come from [theme-apply.ts](./theme-apply.ts) / [theme-decorator.ts](./theme-decorator.ts) and the **Color scheme** + **Theme** tools in [manager.tsx](./manager.tsx); surfaces are in [preview-storybook.css](./preview-storybook.css) and [index.css](../src/index.css). **Canvas** uses `#storybook-root` for the full themed background. **Docs** uses `#storybook-docs` with `--muted` for the MDX page; embedded previews (`.sbdocs-preview`, zoom toolbar, `.docs-story`) use `--background` so they match Canvas. `body` is not painted with the canvas color so titles/descriptions are not forced to the same flat panel as the story.
- **Persisted theme state:** The **Color scheme** and **Theme** tools store one JSON string under `localStorage` key `platform-bible-storybook-theme`: `{ family, colorScheme }` where `colorScheme` is `light`, `dark`, or `system` (see [theme-apply.ts](./theme-apply.ts)). If the value is still a legacy plain-text composite id from older Storybook builds, it is rewritten to JSON on first read. An older ThemeProvider used `vite-ui-theme`; that value is not migrated.
```

with:

```md
- Theme classes on `html` come from [theme-apply.ts](./theme-apply.ts) / [theme-decorator.ts](./theme-decorator.ts) and the **Appearance** + **Theme** tools in [manager.tsx](./manager.tsx); surfaces are in [preview-storybook.css](./preview-storybook.css) and [index.css](../src/index.css). **Canvas** uses `#storybook-root` for the full themed background. **Docs** uses `#storybook-docs` with `--muted` for the MDX page; embedded previews (`.sbdocs-preview`, zoom toolbar, `.docs-story`) use `--background` so they match Canvas. `body` is not painted with the canvas color so titles/descriptions are not forced to the same flat panel as the story.
- **Persisted theme state:** The **Appearance** and **Theme** tools store one JSON string under `localStorage` key `platform-bible-storybook-theme`: `{ family, colorScheme }` where `colorScheme` is `light`, `dark`, or `system` (see [theme-apply.ts](./theme-apply.ts)). If the value is still a legacy plain-text composite id from older Storybook builds, it is rewritten to JSON on first read. An older ThemeProvider used `vite-ui-theme`; that value is not migrated.
```

- [ ] **Step 4: Verify markdown lints cleanly**

```bash
npm run lint
```

Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add lib/platform-bible-react/.storybook/STORYBOOK.md
git commit -m "$(cat <<'EOF'
docs(storybook): tighten Chromatic paragraph; rename to "Appearance"

Address PR #2180 review item #7 (Mercado). Replaces the generic CI/release
prose with a concrete statement that Chromatic is not currently enabled in
CI and what it would take to opt in. Also adopts the locked terminology:
Appearance (light/dark/system) × Theme.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: Final verification

Confirms the full set of changes pass typecheck, lint, tests, and Storybook build.

**Files:** none modified in this task unless an earlier task missed something.

- [ ] **Step 1: Full lint + typecheck**

Run from `lib/platform-bible-react/`:

```bash
npm run lint
npm run typecheck
```

Both scripts are defined in `lib/platform-bible-react/package.json`. Expected: zero errors and zero warnings beyond preexisting ones on `main`.

- [ ] **Step 2: Full test suite**

```bash
npm test
```

Expected: all tests pass. There are no new tests for these changes (TDD doesn't apply to docs / comments / visual property tweaks); existing tests should not regress.

- [ ] **Step 3: Storybook static build**

```bash
npm run build:storybook
```

Expected: build completes; `storybook-static/` is produced; no MDX parse errors. This catches `ExampleBlock` import problems in `theming.mdx`.

- [ ] **Step 4: Full manual smoke test**

```bash
npm run storybook
```

Open Storybook in a browser. Cycle through every combination:

| Appearance | Theme          | Stories to check                                          |
| ---------- | -------------- | --------------------------------------------------------- |
| Light      | Shadcn Neutral | Guides / Theme Colors, Guidelines / Theming, theme matrix |
| Light      | Platform       | (same)                                                    |
| Light      | Paratext       | (same)                                                    |
| Dark       | Shadcn Neutral | (same)                                                    |
| Dark       | Platform       | (same)                                                    |
| Dark       | Paratext       | (same)                                                    |
| System     | Platform       | one row to verify system fallback                         |

Verify in each:

- Toolbar buttons (Appearance, Theme) do not show permanent active highlight
- Toolbar tooltips read "Appearance" / "Theme"
- Token swatches in Theme Colors paint correctly (no transparent / unstyled inputs)
- Theming guide renders the 3×2 matrix table and `ExampleBlock` bad example
- Theme matrix demo's outer wrapper stays light/muted across all 6 panels
- Switching Appearance / Theme on the Theming Docs page does NOT reset scroll position

Stop the dev server.

- [ ] **Step 5: Push the branch**

```bash
git push -u origin follow-up-storybook-theme-switcher
```

Expected: branch pushed; ready for PR.

- [ ] **Step 6 (optional): Open the PR**

If you intend to merge today:

```bash
gh pr create --title "Storybook theme switcher follow-ups (PR #2180 review items)" --body "$(cat <<'EOF'
## Summary

Follow-ups to the merged Storybook theme switcher PR (#2180). Addresses unresolved review items from Alex Mercado and actionable Devin Review findings.

- Doc rework around Appearance × Theme axes (theming.mdx)
- ExampleBlock for the bad example (replaces raw `<table>`)
- Theme-matrix-demo cleanup: replace hardcoded slate/blue colors with tokens
- Rename toolbar label "Color scheme" → "Appearance" (UI text only; code identifiers unchanged)
- Devin findings: IconButton `active` no longer always-truthy; comments added for class-naming inconsistency, `ALL_THEME_CLASSES` sync requirement, hsl-vs-oklch format mismatch, and alpha-syntax limitation
- Tightened Chromatic paragraph in STORYBOOK.md

## Test plan

- [x] `npm run lint`, `npm run typecheck`, `npm test` in `lib/platform-bible-react/`
- [x] `npm run build:storybook` succeeds
- [x] Manual: cycled through all 6 Appearance × Theme combinations on Guides / Theme Colors and Guidelines / Theming; verified ExampleBlock renders, scroll preserved on theme change, no permanent toolbar highlight, outer wrapper of theme-matrix-demo participates in theming

## Out of scope

- Renaming code identifiers (`StorybookColorScheme` type, storage key, channel name) — reversible if Discord lands differently
- CSS class refactor (`paratext-light` → `theme-paratext` + `.dark`) — touches the app's theme service
- `vite-ui-theme` localStorage migration — minor UX inconvenience per Devin

Spec: `docs/specs/2026-05-26-storybook-theme-switcher-followup-design.md`
Plan: `docs/plans/2026-05-26-storybook-theme-switcher-followup-plan.md`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Self-review notes

Spec coverage:

| Spec item                                      | Task(s)       |
| ---------------------------------------------- | ------------- |
| Terminology rename (Color scheme → Appearance) | 3, 5, 6, 7, 8 |
| #1 doc restructure (3×2 matrix)                | 6             |
| #2 tweakcn hyperlink                           | 6             |
| #3 ExampleBlock for bad example                | 6             |
| #4 redundant tw:text-foreground                | 4             |
| #5 outer wrapper bg-slate-50 → bg-muted        | 4             |
| #6 intro slate-500 / blue-600 → tokens         | 4             |
| #7 STORYBOOK.md Chromatic paragraph            | 8             |
| #8 BRANDING.md restructure                     | 7             |
| #9 class-naming inconsistency comment          | 1             |
| D3 alpha-syntax comment                        | 2             |
| D4 ALL_THEME_CLASSES sync warning              | 1             |
| D5 storybook-themes.css format-mismatch        | 2             |
| D11 IconButton active={false}                  | 3             |
| Carry-along: theme-colors blue-600 → primary   | 5             |

No placeholders. No "TBD" or "TODO" in steps — every step shows the actual edit content. Type / method names are consistent: `StorybookColorScheme`, `StorybookThemeFamily`, `STORYBOOK_COLOR_SCHEME_LABELS`, `STORYBOOK_THEME_FAMILY_LABELS`, `CLASS_MAP`, `ALL_THEME_CLASSES`, `PLATFORM_BIBLE_THEME_CHANNEL`, `platform-bible-storybook-theme` — all match what's in the source.
