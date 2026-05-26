# Storybook Theme Switcher Follow-ups — Implementation Summary

**Date:** 2026-05-26
**Branch:** `follow-up-storybook-theme-switcher`
**Status:** All changes implemented and verified. **No commits made** — all edits live in the working tree, awaiting user review.
**Spec:** [docs/specs/2026-05-26-storybook-theme-switcher-followup-design.md](../specs/2026-05-26-storybook-theme-switcher-followup-design.md)
**Plan:** [docs/plans/2026-05-26-storybook-theme-switcher-followup-plan.md](2026-05-26-storybook-theme-switcher-followup-plan.md)

## What this branch addresses

Unresolved review items from PR #2180 (PT-3493 Storybook Theme Switcher) — both Alex Mercado's review comments and Devin Review findings. PR #2327 had previously fixed the `hsl()`-wrapping-around-oklch bug; this branch handles the remaining 9 review items plus 5 actionable Devin findings (of 11 total — 2 already fixed by #2327, 4 confirmed intentional).

## Files changed (9)

```
 lib/platform-bible-react/.storybook/BRANDING.md         |   4 +-
 lib/platform-bible-react/.storybook/STORYBOOK.md        |   8 +-
 lib/platform-bible-react/.storybook/manager.tsx         |   8 +-
 lib/platform-bible-react/.storybook/storybook-themes.css|  11 ++
 lib/platform-bible-react/.storybook/theme-apply.ts      |  13 ++-
 lib/platform-bible-react/.storybook/theme-constants.ts  |   4 +-
 lib/platform-bible-react/src/stories/guidelines/theme-matrix-demo.tsx |   8 +-
 lib/platform-bible-react/src/stories/guidelines/theming.mdx           | 120 ++--
 lib/platform-bible-react/src/stories/guides/theme-colors.stories.tsx  |   8 +-
 9 files changed, 101 insertions(+), 83 deletions(-)
```

## Change-by-change

### `theme-apply.ts` + `theme-constants.ts` — code comments only

- Added a multi-line JSDoc above `CLASS_MAP` explaining the inconsistent CSS class naming scheme (bare `dark` vs family-prefixed `paratext-*` vs theme-prefixed `theme-shadcn-neutral`) and that a uniform `theme-{family}` + `.dark` modifier would require coordinated edits to `index.css`, `themes.data.json`, and the app's `theme.service-host.ts`.
- Added JSDoc above `ALL_THEME_CLASSES` warning that it must stay a superset of all `CLASS_MAP` values.
- Extended the top-of-file maintenance pointer in `theme-constants.ts` to mention both `CLASS_MAP` AND `ALL_THEME_CLASSES`.

Resolves review item #9 and Devin finding D4. No behavior change.

### `storybook-themes.css` — comments only

- Extended the file-level Shadcn Neutral comment to warn that the file intentionally uses `hsl(...)` while `index.css` uses `oklch(...)`, citing PR #2327 — both are complete CSS color values consumed via bare `var(--token)`, and re-wrapping them in `hsl(var(--token))` is the bug that motivated #2327.
- Added a comment immediately above `.dark.theme-shadcn-neutral` explaining that the alpha-in-HSL syntax on `--border`/`--input`/`--sidebar-border` would produce invalid CSS if a Tailwind opacity modifier (e.g. `border-border/50`) were used under this theme. Storybook-only theme; trap is latent because Tailwind config doesn't currently enable alpha modifiers on these tokens project-wide.

Resolves Devin findings D3 and D5.

### `manager.tsx` — toolbar fixes (Devin D11) + label rename

- Both `IconButton`s now have `active={false}` instead of `active={!!toolbarThemeState.colorScheme}` / `active={!!toolbarThemeState.family}`. Those props were always truthy because `colorScheme` and `family` always have values, so the toolbar buttons always looked permanently highlighted.
- The Color-scheme toolbar's title and registration both renamed to **"Appearance"** (UI text only; the addon id `${REGISTER_ID}/color-scheme` and code identifier `StorybookColorScheme` are unchanged so the rename is reversible).

### `theme-matrix-demo.tsx` — token-based theming

- Outer wrapper: dropped hardcoded `tw:bg-slate-50` / `tw:text-slate-900`, replaced with `tw:bg-muted`. **Added a bare `light` class** (not Tailwind-prefixed — it's the theme shell class defined in `index.css`) so the wrapper itself participates in theming, pinned to a stable light surface for cross-panel comparison.
- Intro paragraph: `tw:text-slate-500` → `tw:text-muted-foreground`.
- Anchor: `tw:text-blue-600 tw:hover:underline` → `tw:text-primary tw:hover:underline`.
- Inner card div: dropped redundant `tw:text-foreground` (the `tw:!text-foreground` on the inner `<p>` already covers it).

Resolves review items #4, #5, #6.

### `theme-colors.stories.tsx` — terminology rename + carry-along

- "Color scheme" → "Appearance" in the bold label in the intro `<p>` and in the story description.
- Carry-along cleanup: two `tw:text-blue-600` anchor classes → `tw:text-primary` (same anti-pattern as theme-matrix-demo).
- Story description corrected "Guides / Theming" → "Guidelines / Theming" (matches actual sidebar location).
- The `<code>{'{ family, colorScheme }'}</code>` JSON shape and the `colorScheme` identifier inside it are left untouched — those are code identifiers.

### `theming.mdx` — full restructure (largest change)

- New `ExampleBlock` import: `import { ExampleBlock } from '../../storybook/example-block.component';`.
- Replaced the old "Color scheme / Theme" intro + bullet list with a two-axis framing: **Appearance** (light/dark/system) × **Theme** (Shadcn Neutral/Platform/Paratext) + a 3×2 markdown table listing the six composite IDs.
- Replaced the old four-paragraph "Platform vs Shadcn Neutral vs Paratext" section with `## Themes` containing three concise per-theme paragraphs that highlight only what's distinct. Paratext now links to `[Caffeine-inspired in tweakcn](https://tweakcn.com/themes/cmeukcpoj000204l45lxw5a74)`.
- Renamed `## Try it: change theme` → `## Try it` with shorter prose.
- Replaced the `## Bad example` raw `<table>` + jsx code fence with a single `<ExampleBlock variant="dont">` component, using the `preview` and `code` props. The container is no longer hand-rolled.

Resolves review items #1, #2, #3.

### `BRANDING.md`

- Line 3: dropped "In flux" framing; restructured around the locked **Appearance** + **Theme** terminology.
- Line 43: "toolbar families and color schemes" → "toolbar theme families and appearance options"; "Color scheme and Theme tools" → "Appearance and Theme tools".
- **Line 25 left untouched** — the JSON payload `{ family, colorScheme }` is a code identifier reference.

Resolves review item #8.

### `STORYBOOK.md`

- Chromatic paragraph (line 18) rewritten to be concrete: "**Chromatic is not currently enabled in CI** — add a workflow step (e.g. via `chromaui/action`) and a `CHROMATIC_PROJECT_TOKEN` secret to opt in." (Verified: `@chromatic-com/storybook` is installed in `package.json` but no workflow under `.github/workflows/` runs Chromatic.)
- Table row for `manager.tsx`: "Color scheme + Theme toolbars" → "Appearance + Theme toolbars".
- Lines 48-49: both bullets updated to use "Appearance" instead of "Color scheme". The `{ family, colorScheme }` payload literal and the `where colorScheme is light/dark/system` clause stay (code identifiers).

Resolves review item #7.

## Non-obvious decisions

### Terminology rename is UI-text only

The toolbar label changed from "Color scheme" to "Appearance", but **no code identifiers changed**: `StorybookColorScheme` type, `STORYBOOK_COLOR_SCHEMES`/`STORYBOOK_COLOR_SCHEME_LABELS` constants, the `colorScheme` property on `StorybookThemeState`, the `${REGISTER_ID}/color-scheme` addon id, the `platform-bible-storybook-theme` localStorage key, and the `PLATFORM_BIBLE_THEME_CHANNEL` channel name are all unchanged. The rationale: Sebastian UBS hadn't weighed in on the Discord terminology thread, and a UI-only rename is reversible without API churn if a different direction is chosen later.

### "Appearance" was picked over "Display mode"

Mercado's Discord post listed both as candidates. We chose "Appearance" because it matches Apple's terminology (System Settings), reads naturally with "System" as a value, and isn't overloaded the way "mode" is in dev contexts (edit mode / dark mode / build mode).

### `light` class added to the theme-matrix-demo outer wrapper

Mercado specifically asked for `bg-muted` + a `light` class so the matrix container "participates in theming." Pinning it to `.light` (the theme shell class from `index.css`, not a Tailwind utility — hence no `tw:` prefix) means the chrome stays on a stable light surface across all 6 inner panels, which is the point of a comparison matrix. The 6 inner panels still apply their own shell classes via `MATRIX_THEMES`, so they each show their respective themes regardless of the outer wrapper.

### CSS class naming inconsistency was deferred, not fixed

`CLASS_MAP` still has the mixed scheme (bare `dark`, family-prefixed `paratext-*`, theme-prefixed `theme-shadcn-neutral`). Mercado acknowledged a uniform fix is "not entirely avoidable without a larger refactor" because `.paratext-light`/`.paratext-dark` are consumed by the running app's `theme.service-host.ts` and `themes.data.json`. The fix is now flagged with an inline comment so future contributors find it; the actual rename is out of scope.

### Spec error caught during planning

The original spec said Devin's alpha-syntax finding (D3) was about `index.css`, but the actual alpha-in-HSL tokens (`hsl(0 0% 100% / 0.1)`) live in `storybook-themes.css` (line 62, 63, 72). The Devin report was based on an earlier file structure. The spec was corrected inline before the plan was written, and the comment landed in the right file.

### Devin findings deliberately skipped

Four Devin findings were verified as intentional (not bugs to fix):

- `manager.tsx:59` — reading `localStorage` directly inside `setColorScheme`/`setFamily` (the two toolbar tools maintain separate React state, so `localStorage` is the source of truth for merging)
- `preview.ts:61` — decorator ordering (theme decorator must run outside the layout wrapper because theme classes go on `<html>`)
- `theme-apply.ts:27` — `.theme-platform-light` absent from `CLASS_MAP` (correct: `platform-light` maps to `[]` because `:root` already provides those tokens)
- `theme-colors.stories.tsx:28` — `MutationObserver` watches class changes only (sufficient for Storybook's class-based theme system)

One Devin finding was deliberately skipped on UX-tradeoff grounds:

- `vite-ui-theme` localStorage migration — Devin called it "minor UX inconvenience, not a functional bug." Storybook is a dev tool; users will just re-pick their theme. Skipping reduces code surface area.

### No commits made per user instruction

All 9 changed files are unstaged in the working tree. The user said "do not make any Git commits"; this constraint was passed through to every implementer subagent. The original plan's per-task commit steps were skipped. The user can review the diff and decide how to commit (one squash, file-by-file, or some grouping).

## Verification

Final verification passed all four checks:

| Command (from `lib/platform-bible-react/`) | Result                                                                           |
| ------------------------------------------ | -------------------------------------------------------------------------------- |
| `npm run lint`                             | ✅ 0 errors, 0 warnings                                                          |
| `npm run typecheck`                        | ✅ 0 errors                                                                      |
| `npm test -- --run`                        | ✅ 94 test files / 706 tests pass                                                |
| `npm run build:storybook`                  | ✅ Built `storybook-static/` in ~18s; MDX parsed; `ExampleBlock` import resolved |

**Not yet done:** manual visual smoke test in a browser. The plan's Task 9 included cycling through all 6 Appearance × Theme combinations on Theme Colors and Theming guideline pages to verify the toolbar buttons no longer show permanent highlight, the matrix renders, the `ExampleBlock` shows the rose-accent "Anti-pattern" framing, and Docs scroll is preserved on theme change. The user should perform this manually before committing.

## Suggested next steps

1. Review the diff: `git diff --stat` and `git diff lib/platform-bible-react/`.
2. Spot-check the largest change visually: `npm run storybook` (from `lib/platform-bible-react/`) and walk through the Appearance × Theme combinations on:
   - Guides / Theme Colors
   - Guidelines / Theming
3. Decide commit grouping:
   - **One squash** is simplest and matches the project's squash-merge convention.
   - **Per-task** (~9 commits) is more reviewable but matches the plan structure.
4. The spec and plan files (`docs/specs/2026-05-26-storybook-theme-switcher-followup-design.md`, `docs/plans/2026-05-26-storybook-theme-switcher-followup-plan.md`, and this summary) are untracked — decide whether to include them in the PR.

## Out of scope (intentionally not done)

- Renaming code identifiers (`StorybookColorScheme` → `StorybookAppearance`, channel name, storage key) — reversible if Discord terminology lands differently
- CSS class refactor to uniform `theme-{family}` + `.dark` — touches running-app code
- Migrating from legacy `vite-ui-theme` localStorage key
- Replacing alpha-in-HSL with solid colors in dark Shadcn Neutral
- Running Chromatic in CI (the doc now flags this as opt-in work)
