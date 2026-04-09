# Theming Doc MDX Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the prose content of `ThemingGuideBody` from TSX into native MDX so Storybook's Docs styles handle links, headings, and code spans theme-adaptively.

**Architecture:** Extract `ThemeMatrixDemo` (and its `MATRIX_THEMES` constant) into a new `theme-matrix-demo.tsx` file, inline all prose from `ThemingGuideBody` into `theming.mdx` as native markdown, and delete the now-empty `theming-doc.tsx`.

**Tech Stack:** MDX 2, Storybook Docs addon, React (TSX for `ThemeMatrixDemo` only)

---

### Task 1: Create `theme-matrix-demo.tsx`

**Files:**

- Create: `lib/platform-bible-react/src/stories/guidelines/theme-matrix-demo.tsx`

- [x] **Step 1: Write `theme-matrix-demo.tsx`** — copy `MATRIX_THEMES` and `ThemeMatrixDemo` verbatim from `theming-doc.tsx`. Drop the `ThemingGuideBody` export and its wrapping div entirely.

```tsx
import { Button } from '@/components/shadcn-ui/button';

/** Theme class only on the outer shell so `index.css` variables apply before `pr-twp` / utilities. */
const MATRIX_THEMES = [
  { id: 'shadcn-light', label: 'Shadcn Neutral (light)', themeShell: 'theme-shadcn-neutral' },
  { id: 'shadcn-dark', label: 'Shadcn Neutral (dark)', themeShell: 'dark theme-shadcn-neutral' },
  { id: 'platform-light', label: 'Platform light', themeShell: 'theme-platform-light' },
  { id: 'platform-dark', label: 'Platform dark', themeShell: 'dark' },
  { id: 'paratext-light', label: 'Paratext light', themeShell: 'paratext-light' },
  { id: 'paratext-dark', label: 'Paratext dark', themeShell: 'paratext-dark' },
] as const;

/**
 * Side-by-side preview: each column applies a local theme shell class from `MATRIX_THEMES` so
 * tokens are scoped to that wrapper (stories that follow the toolbar get classes on `html` via
 * localStorage and the preview channel instead). The matrix does not read toolbar storage; it is
 * for visual comparison only.
 */
export function ThemeMatrixDemo() {
  return (
    <div className="tw-not-prose tw-min-h-[200px] tw-max-w-6xl tw-space-y-4 tw-bg-slate-50 tw-p-6 tw-text-slate-900">
      <p className="tw-text-sm tw-text-slate-500">
        Each panel uses the same components with theme variables applied on a local wrapper. Compare
        with the global toolbar themes on other stories. For a larger token table, see{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs"
        >
          Guides / Theme Colors
        </a>
        .
      </p>
      <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 xl:tw-grid-cols-3 2xl:tw-grid-cols-6">
        {MATRIX_THEMES.map(({ id, label, themeShell }) => (
          <div key={id} className={themeShell}>
            <div className="pr-twp tw-flex tw-flex-col tw-rounded-lg tw-border tw-border-border tw-bg-background tw-p-4 tw-text-foreground">
              {/*
                Important: Docs iframe can inherit a global `color` onto `p` that does not re-resolve
                `--foreground` from this nested theme shell. Force token-based text color.
              */}
              <p className="tw-mb-2 tw-font-semibold !tw-text-foreground">{label}</p>
              <Button type="button" variant="default" className="tw-mb-2">
                Primary
              </Button>
              <Button type="button" variant="secondary">
                Secondary
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [x] **Step 2: Commit**

```bash
git add lib/platform-bible-react/src/stories/guidelines/theme-matrix-demo.tsx
git commit -m "refactor(platform-bible-react): extract ThemeMatrixDemo into theme-matrix-demo.tsx"
```

---

### Task 2: Replace `theming.mdx` content

**Files:**

- Modify: `lib/platform-bible-react/src/stories/guidelines/theming.mdx`

- [x] **Step 1: Overwrite `theming.mdx`** with the full MDX below. Key changes vs. the old file:
  - Import only `ThemeMatrixDemo` from the new `./theme-matrix-demo` path.
  - All `ThemingGuideBody` prose inlined as markdown (headings `##`, links `[text](url)`, backtick code spans, bullet/numbered lists).
  - Smaller-text callout `<p className="tw-text-sm ...">` paragraphs become regular prose.
  - Bad-example `<table>` kept as JSX (it contains a live `<input>`); outer `tw-mb-6` class dropped.
  - `## Theme matrix` section and `<ThemeMatrixDemo />` unchanged.

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
import { ThemeMatrixDemo } from './theme-matrix-demo';

<Meta title="Guidelines/Theming" />

# Theming

Guidance for theming with the shadcn design system in this library: tokens, Storybook toolbar themes,
CSS variables, and how they line up with the Paranext app. Details below.

A comprehensive guide on theming components using the shadcn design system, including best
practices for color usage, theme switching, and CSS variable management.

By default we stick to the existing shadcn styles. Components we install from shadcn already
come with styles that expect design tokens—see which properties and class patterns they use
so they can set their own appearance and stay themeable.

Token values for Storybook and the app live in
[index.css](https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css).
For a live table of variables for the toolbar-selected theme, see
[Guides / Theme Colors](https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs).

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

## Platform vs Shadcn Neutral vs Paratext

CSS variables live in
[index.css](https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css):
Platform light is `:root` / `.theme-platform-light`; Platform dark is `.dark`; stock Shadcn
Neutral is `.theme-shadcn-neutral` (and `.dark.theme-shadcn-neutral`); Paratext is
`.paratext-light` / `.paratext-dark`. The running app loads Platform and Paratext HSLs from
[themes.data.json](https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json)
(default Platform family key and `paratext`); Shadcn Neutral is Storybook-only.

**Platform** default (`:root` / `.dark`) is **Slate-based** (blue-gray neutrals) but **not
identical** to the stock Shadcn Neutral preset under `.theme-shadcn-neutral` in `index.css`.
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

## Try it: change theme

Shadcn-style theming is driven by CSS variables in
[index.css](https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css).
In this Storybook, use the **Color scheme** and **Theme** toolbar controls (not a separate
preview-app toggle) to switch palettes and confirm your story respects tokens—foreground,
background, borders, and components that use the same variables should track the selection.

## In the running application

The Paranext renderer loads built-in theme definitions from
[themes.data.json](https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json)
(Platform and Paratext families) and applies the same HSL tokens as `index.css` for those (see
[theme.service-host.ts](https://github.com/paranext/paranext-core/blob/main/src/renderer/services/theme.service-host.ts)).
Keep `index.css` and `themes.data.json` in sync when you change theme colors. End-user theme
selection is handled by the platform theme service, not Storybook.

## Bad example

Manual colors on primitives do not follow the active theme.

<table>
  <tbody>
    <tr>
      <td>
        Bad example<div className="tw-text-xs">manual styles, unable to be themed</div>
      </td>
      <td>
        <input
          value="this has manual colors"
          aria-label="Bad example input with manual colors"
          readOnly
          className="tw-full tw-file:border-0 tw-col-span-2 tw-flex tw-h-8 tw-rounded-md tw-border tw-border-slate-300 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-text-slate-900 tw-ring-offset-white file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-slate-400 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-slate-400 focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50"
        />
      </td>
    </tr>
  </tbody>
</table>

## Overwriting styles

Try not to overwrite styles (colors). When you need to, use Tailwind classes that apply the same
color variables shadcn uses, in the same way shadcn does. You can see token names on
[Guides / Theme Colors](https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs)
and in the [shadcn theming docs](https://ui.shadcn.com/docs/theming).

For example, use `className="tw-bg-muted"` on a header-like surface and
`className="tw-text-muted-foreground"` for supporting text. You can use shades such as
`tw-bg-muted/50` sparingly, in line with how shadcn applies them.

## Per-story theme override

To lock a story to one palette (for example to show a dark-mode edge case), set a **legacy
composite id** such as `parameters: { themes: { themeOverride: 'paratext-dark' } }` on the story
or meta. You can also pass `themeOverride: { family: 'paratext', colorScheme: 'system' }` for
system light/dark. The preview decorator reads this in `.storybook/theme-decorator.ts` (toolbar
changes use `localStorage` and a channel event instead of `globals.theme`).

## Adding a new theme

1. Add a CSS class in `index.css` with `--background`, `--foreground`, and the other variables
   (see existing blocks).
2. Update `themes.data.json` in paranext-core if the app should expose the theme.
3. Register the composite id in `.storybook/theme-constants.ts` (`STORYBOOK_THEME_IDS` and
   `STORYBOOK_THEME_LABELS`), map classes in `.storybook/theme-apply.ts` (`CLASS_MAP`,
   `compositeThemeIdFromFamilyAndEffective`, `themeStateFromLegacyThemeId`, and
   `ALL_THEME_CLASSES`). Toolbar family and color-scheme options live in
   `STORYBOOK_THEME_FAMILIES` / `STORYBOOK_COLOR_SCHEMES` in the same file;
   `.storybook/manager.tsx` reads those lists for the two toolbar tools.

Descriptions of which colors to use in which context are still being expanded. If you are
unsure, see how [shadcn](https://ui.shadcn.com/) handles a similar pattern or talk to the
[Paratext UX team](https://discord.com/channels/1064938364597436416/1082713526780575845).

## Theme matrix

Compares Platform and Paratext palettes in one view using scoped wrappers. Useful for visual review
of theme tokens. For the live token table for the toolbar-selected theme, see [Guides / Theme
Colors](https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs).

<ThemeMatrixDemo />
```

- [x] **Step 2: Commit**

```bash
git add lib/platform-bible-react/src/stories/guidelines/theming.mdx
git commit -m "refactor(platform-bible-react): inline ThemingGuideBody prose into theming.mdx as native MDX"
```

---

### Task 3: Delete `theming-doc.tsx`

**Files:**

- Delete: `lib/platform-bible-react/src/stories/guidelines/theming-doc.tsx`

- [x] **Step 1: Delete the file**

```bash
git rm lib/platform-bible-react/src/stories/guidelines/theming-doc.tsx
```

- [x] **Step 2: Commit**

```bash
git commit -m "refactor(platform-bible-react): delete theming-doc.tsx (content migrated to MDX)"
```

---

### Task 4: Build and verify

**Files:** none (verification only)

- [x] **Step 1: Build the library**

```bash
cd lib/platform-bible-react && npm run build
```

Expected: build completes with no errors.

- [x] **Step 2: Run Storybook and visually verify**

```bash
cd /Users/jolierabideau/dev/paranext-core && npm run storybook
```

Navigate to **Guidelines / Theming** in the Storybook sidebar. Verify:

- All prose sections render (headings, paragraphs, links, lists, code spans)
- The bad-example table and input are visible
- The Theme matrix demo renders below all prose
- Switching the toolbar Color scheme/Theme changes the matrix demo colors but the prose text adapts via Docs styles (no fixed-light wrapper)

- [x] **Step 3: Confirm no other files reference `theming-doc`**

```bash
grep -r "theming-doc" lib/platform-bible-react/src/
```

Expected: no matches.
