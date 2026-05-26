# Storybook Theme Switcher Follow-ups (PR #2180)

**Date:** 2026-05-26
**Status:** Approved
**Branch:** `follow-up-storybook-theme-switcher`

## Motivation

PR #2180 (PT-3493 Storybook Theme Switcher) was merged to unblock UX work with
several review items still open. PR #2327 already landed one of them (drop
legacy `hsl()` wrapping around oklch theme vars). This spec covers the
remaining unresolved review items from Alex Mercado, the actionable findings
from the Devin Review (9 unread; 2 were already fixed by #2327), and
discovered cleanups from related files.

The work is scoped to documentation, UI labels, comment additions, and small
local refactors. Renaming code-level identifiers (e.g.
`StorybookColorScheme` type) and refactoring CSS class names across the
running app are explicitly deferred — Sebastian UBS has not weighed in on
terminology, and the class rename touches the app's `theme.service-host.ts`.

## Terminology decision

The Discord thread referenced in `BRANDING.md` "In flux" did not land on
final terminology. Based on Mercado's proposal and TJ's note that the app
already uses `theme family` / `theme type`, this spec adopts:

- **Appearance** for light / dark / system (Apple-style; what Mercado calls
  "appearance as the light/dark system")
- **Theme** for Shadcn Neutral / Platform / Paratext (unchanged toolbar
  label; aligns with the existing `StorybookThemeFamily` type Mercado said
  to keep)

This is **UI text only**. The code identifier `StorybookColorScheme` and
storage key `platform-bible-storybook-theme` keep their current names so the
rename is reversible without API churn if Sebastian disagrees later.

## Scope

### In scope

| #   | Item                                                                | Files                                                                                                              |
| --- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | Doc rework around Appearance × Theme axes                           | `theming.mdx`                                                                                                      |
| 2   | Add tweakcn hyperlink for Paratext (Caffeine-inspired)              | `theming.mdx`                                                                                                      |
| 3   | Replace bad-example `<table>` with `<ExampleBlock variant="dont">`  | `theming.mdx`                                                                                                      |
| 4   | Drop redundant `tw:text-foreground` on inner card div               | `theme-matrix-demo.tsx`                                                                                            |
| 5   | Outer wrapper: replace hardcoded slate colors with theme tokens     | `theme-matrix-demo.tsx`                                                                                            |
| 6   | Intro prose: replace hardcoded `slate-500`/`blue-600` with tokens   | `theme-matrix-demo.tsx`                                                                                            |
| 7   | Tighten Chromatic paragraph (resolve generic "teams" concern)       | `STORYBOOK.md`                                                                                                     |
| 8   | Drop "In flux" note; restructure around Appearance × Theme          | `BRANDING.md`                                                                                                      |
| 9   | Add comment acknowledging inconsistent CSS class naming scheme      | `theme-apply.ts`                                                                                                   |
| D3  | Comment alpha-in-HSL limitation under dark Shadcn Neutral           | `storybook-themes.css`                                                                                             |
| D4  | Comment that `ALL_THEME_CLASSES` must stay in sync with `CLASS_MAP` | `theme-apply.ts`, `theme-constants.ts`                                                                             |
| D5  | Comment that `storybook-themes.css` intentionally uses hsl format   | `storybook-themes.css`                                                                                             |
| D11 | Set `active={false}` on toolbar IconButtons                         | `manager.tsx`                                                                                                      |
| —   | Terminology rename: "Color scheme" → "Appearance" (UI text only)    | `manager.tsx`, `theming.mdx`, `BRANDING.md`, `STORYBOOK.md`, `theme-colors.stories.tsx`, JSDoc in `theme-apply.ts` |
| —   | Carry-along: replace hardcoded `blue-600`/slate text colors         | `theme-colors.stories.tsx` (lines 88, 95)                                                                          |

### Out of scope (deferred with rationale)

- **Renaming code identifiers** (`StorybookColorScheme` → `StorybookAppearance`,
  storage key, channel name). Reason: Sebastian UBS has not weighed in;
  reversibility matters. Reopen if Discord lands on a final API direction.
- **CSS class refactor** (`.paratext-light`/`.paratext-dark` → `theme-paratext`
  - `.dark`; `.theme-shadcn-neutral` → `.shadcn-neutral`). Reason: classes are
    consumed by the running app's `theme.service-host.ts` and
    `themes.data.json`; a clean fix requires coordinated changes there.
    Mercado acknowledged "not entirely avoidable without a larger refactor."
- **Vite-ui-theme localStorage migration.** Reason: Devin: "minor UX
  inconvenience, not a functional bug." Storybook is a dev tool; users
  re-pick.
- **Solid-color replacement for `--border: 0 0% 100% / 0.1`** in dark Shadcn
  Neutral. Reason: Storybook-only theme; existing Tailwind config already
  blocks opacity modifiers on `border`/`input` project-wide; comment
  suffices.

### Devin findings confirmed intentional (no action)

- `manager.tsx:59` — reading localStorage in `setColorScheme`/`setFamily`
  instead of React state. Devin: intentional; localStorage is the source of
  truth because two tools maintain independent state.
- `preview.ts:61` — decorator ordering. Devin: intentional and correct.
- `theme-apply.ts:27` — `.theme-platform-light` absent from `CLASS_MAP`.
  Devin: correct; that class exists only for local subtree scoping in
  `theme-matrix-demo.tsx`.
- `theme-colors.stories.tsx:28` — `MutationObserver` filtered to class
  changes only. Devin: fine for current Storybook-only use case.

## Design

### 1. `theming.mdx` restructure (items #1, #2, #3)

Replace the current four-paragraph "Platform vs Shadcn Neutral vs Paratext"
section with an Appearance × Theme matrix framing:

```
## Appearance × Theme

This Storybook has two independent axes:

- Appearance: light, dark, or system (follows OS preference)
- Theme: Shadcn Neutral, Platform, or Paratext (color palette)

|                | Light            | Dark             |
| -------------- | ---------------- | ---------------- |
| Shadcn Neutral | shadcn-light     | shadcn-dark      |
| Platform       | platform-light   | platform-dark    |
| Paratext       | paratext-light   | paratext-dark    |

(Composite IDs are used for `parameters.themes.themeOverride`.)
```

Per-theme summary paragraphs reduce to one tight paragraph each, focused on
what's distinct (not what's the same). The Paratext paragraph adds a
hyperlink: `[Caffeine-inspired in tweakcn](https://tweakcn.com/themes/cmeukcpoj000204l45lxw5a74)`.

The bad example replaces the raw `<table>` with `<ExampleBlock
variant="dont">` from `src/storybook/example-block.component.tsx`, using
its `preview` slot for the styled input and its `code` slot for the JSX
snippet. The MDX `<Meta>` import gains the `ExampleBlock` import.

### 2. `theme-matrix-demo.tsx` cleanup (items #4, #5, #6)

```diff
-    <div className="tw:not-prose tw:min-h-[200px] tw:max-w-6xl tw:space-y-4 tw:bg-slate-50 tw:p-6 tw:text-slate-900">
-      <p className="tw:text-sm tw:text-slate-500">
+    <div className="light tw:not-prose tw:min-h-[200px] tw:max-w-6xl tw:space-y-4 tw:bg-muted tw:p-6">
+      <p className="tw:text-sm tw:text-muted-foreground">
         Each panel uses the same components ...
         <a
-          className="tw:text-blue-600 tw:hover:underline"
+          className="tw:text-primary tw:hover:underline"
           href="..."
         >
```

And on the inner card div (item #4):

```diff
-            <div className="pr-twp tw:flex tw:flex-col tw:rounded-lg tw:border tw:border-border tw:bg-background tw:p-4 tw:text-foreground">
+            <div className="pr-twp tw:flex tw:flex-col tw:rounded-lg tw:border tw:border-border tw:bg-background tw:p-4">
```

The `tw:!text-foreground` on the inner `<p>` already covers foreground.

Adding the `light` class to the outer wrapper preserves Mercado's intent
that the _matrix container_ uses a stable, well-lit chrome (so all six
panels read on the same surface) without hardcoding slate values.

### 3. Terminology rename (UI text only)

`manager.tsx` toolbar dropdown title: "Color scheme" → "Appearance".

`theming.mdx`, `BRANDING.md`, `STORYBOOK.md`, `theme-colors.stories.tsx`
(lines 84, 206), and JSDoc in `theme-apply.ts` referring to user-facing
terminology: "Color scheme" → "Appearance".

Code identifiers (`StorybookColorScheme`, `colorScheme` property,
`platform-bible-storybook-theme` storage key, `PLATFORM_BIBLE_THEME_CHANNEL`)
are unchanged.

### 4. `STORYBOOK.md` Chromatic paragraph (item #7)

Line 18 no longer contains the literal "teams" wording (changed during
review), but the prose is still generic ("This repo's CI/release setup is
what decides..."). Verified: `@chromatic-com/storybook` is installed in
`package.json` but no workflow under `.github/workflows/` runs Chromatic
upload. Rewrite to be concrete:

> The `@chromatic-com/storybook` addon is installed so Storybook can
> communicate with Chromatic, a hosted service that captures story
> screenshots and diffs them against approved baselines. **Chromatic is not
> currently enabled in CI** — add a workflow step (e.g. via
> `chromaui/action`) and a `CHROMATIC_PROJECT_TOKEN` secret to opt in.

### 5. `BRANDING.md` (item #8)

Line 3: restructure around the locked terminology.

```
This guide explains how the **Storybook manager** (outer chrome) and the
**preview iframe** can be aligned with Paratext or internal branding.
Preview appearance is controlled by two independent toolbars: **Appearance**
(light / dark / system) and **Theme** (Shadcn Neutral, Platform, Paratext),
applied via `manager.tsx`, `theme-apply.ts`, and `theme-decorator.ts` — not
`globals.theme`, so Docs scroll is preserved on theme change.
```

Drop the in-flux/Discord pending note. Also update line 43 ("defines toolbar
**families** and **color schemes**") to "...toolbar **theme families** and
**appearance options**".

Note: the literal `colorScheme` token inside the JSON payload example on
line 25 (`payload is `{ family, colorScheme }``) is a code identifier and
stays. Same for `PLATFORM_BIBLE_THEME_CHANNEL`and the`platform-bible-
storybook-theme` localStorage key — these are unchanged code surfaces.

### 6. `theme-colors.stories.tsx` carry-along

Beyond the terminology rename, replace hardcoded `tw:text-blue-600
tw:hover:underline` on the two anchor tags (lines 88, 95) with
`tw:text-primary tw:hover:underline`. Same anti-pattern as item #6 in
`theme-matrix-demo.tsx`.

### 7. `theme-apply.ts` + `theme-constants.ts` (item #9 + Devin D4)

Near `CLASS_MAP` (theme-apply.ts:27), add a block comment:

```ts
/**
 * Class names are not uniform: bare `dark` for the Platform default, family- prefixed `paratext-*`,
 * and theme-prefixed `theme-shadcn-neutral`. A uniform `theme-{family}` scheme with `.dark` as a
 * modifier would require coordinated changes in `index.css`, `themes.data.json`, and the app's
 * `theme.service-host.ts`. Deferred.
 */
```

Near `ALL_THEME_CLASSES` (line 36):

```ts
// Must be a superset of every class value in `CLASS_MAP`. Add new entries
// here whenever a new theme is added to CLASS_MAP, otherwise switching away
// will leave stale classes on `<html>`.
```

Update the maintenance pointer in `theme-constants.ts:1` to mention both
`CLASS_MAP` _and_ `ALL_THEME_CLASSES` need updating.

### 8. `manager.tsx` IconButton `active` (Devin D11)

```diff
- <IconButton title="Appearance" active={!!toolbarThemeState.colorScheme}>
+ <IconButton title="Appearance" active={false}>
```

Same change on `ThemeFamilyTool`. Toolbar buttons no longer appear
permanently highlighted.

### 9. `storybook-themes.css` alpha-syntax comment (Devin D3)

The alpha-syntax tokens live in `storybook-themes.css` line 62-63, 72
(`.dark.theme-shadcn-neutral`), not `index.css`. Add a comment near the
`.dark.theme-shadcn-neutral` selector:

```css
/*
 * These tokens use alpha-in-HSL syntax (e.g. `hsl(0 0% 100% / 0.1)`) to
 * match the stock Shadcn Neutral docs preset. Tailwind opacity modifiers
 * (e.g. `border-border/50`) would produce invalid `hsl(... / 0.1 / 0.5)`
 * under this theme. Project-wide, tailwind.config.ts does not enable alpha
 * modifiers on `border`/`input`, so the trap is latent; documented to
 * discourage future misuse.
 */
```

### 10. `storybook-themes.css` format-mismatch comment (Devin D5)

One-line block comment at the top of the file:

```css
/*
 * Intentionally uses `hsl(0 0% 100%)` while `index.css` uses `oklch(1 0 0)`.
 * Both are complete CSS color values; do not wrap in `hsl(var(--...))`
 * (see PR #2327 for the bug that motivated the cleanup).
 */
```

## Testing plan

In `lib/platform-bible-react/`:

```
npm run typecheck
npm run lint
npm test
npm run build:storybook
```

Manual Storybook verification:

- Open Storybook locally (`npm run storybook`)
- Cycle through all 6 Appearance × Theme combinations on:
  - Guides / Theme Colors
  - Guidelines / Theming (verify matrix renders, bad example shows via
    `ExampleBlock`, tweakcn link works)
- Confirm Docs scroll is preserved when switching themes
- Confirm toolbar IconButtons no longer permanently highlighted
- Spot-check the theme matrix in Guidelines / Theming: outer wrapper should
  read as light surface across all 6 combinations (not pinned to slate)

## Open questions resolved during brainstorming

1. **Rename scope?** Docs + UI labels only. Code identifiers unchanged.
2. **Appearance vs Display mode?** Appearance.
3. **Family label?** Keep "Theme" (existing toolbar label).
4. **CSS class refactor scope?** Defer with comment.
5. **Devin findings?** User pulled them; 2 already fixed by #2327, 4
   confirmed intentional, 5 actionable items folded into this spec.
6. **IconButton `active`?** `false`.
7. **Alpha syntax?** Comment, no behavior change.
8. **vite-ui-theme migration?** Skip.

## Implementation order suggestion

1. Comment-only additions (#9, D3, D4, D5) — lowest risk, can land first.
2. `manager.tsx` `active={false}` (D11) — small, isolated.
3. Terminology rename across files — bulk find-replace pass.
4. `theme-matrix-demo.tsx` cleanup — small local refactor.
5. `theming.mdx` restructure — largest single change; needs visual review.
6. `BRANDING.md`, `STORYBOOK.md` prose — last; depends on terminology
   landing.
