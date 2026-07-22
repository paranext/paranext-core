# PT-4208: Icon-Only Simple-Mode Tab Headers — Design Spec

**Branch:** `pt-4208-implement-simple-tab-icons`, based on `pt-3958-simple-layout-styling-adjustments`
**Related spec:** `docs/superpowers/specs/2026-07-20-simple-layout-styling-adjustments-design.md`
(pt-3958) — that spec explicitly deferred its "Item #5 (icon-only tab header restyle)" to a
separate branch; this is that work.
**Source PRD:** `docs/superpowers/prd-sarojs-workspace-is-stable-and-uncluttered.md` — non-negotiable
#1: "Tab selection UI appears within the panel using icons to identify tabs rather than text."

---

## Problem

Simple mode's Resources & Tools column (Column 3: Bible Texts, Commentaries, Comments) is the one
Simple-mode column with a real, interactive multi-tab bar (Columns 1 and 2 use a headless,
single-tab bar). Today its tabs render icon + text unconditionally
(`platform-tab-title.component.tsx`), none of the three tabs has an icon at all yet, and nothing
adapts as the column narrows.

This spec covers:

1. Giving Bible Texts, Commentaries, and Comments a tab icon (Text Collection already has one).
2. Making the tab strip's visual chrome match a reference icon-only mockup.
3. Making tabs respond to narrowing width — icon+title when roomy, icon-only when tight — instead
   of the current fixed-width, no-shrink behavior.
4. Keeping the tab's title available on hover/to screen readers once its visible text is hidden.

**Scope:** Simple mode only. Power mode is untouched by every section below, following the same
`[data-interface-mode='simple']` scoping convention pt-3958 already established in
`dock-layout-wrapper.component.scss`.

---

## Section 1 — Tab icons for Bible Texts, Commentaries, Comments

**Icon choices (author-specified):**

| Tab             | webViewType                        | Lucide icon                     | Provider location                                                                                                 |
| --------------- | ---------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Bible Texts     | `BIBLE_TEXTS_PANEL_WEBVIEW_TYPE`   | `book-open`                     | `extensions/src/platform-scripture-editor/src/main.ts` (`bibleTextsPanelWebViewProvider`)                         |
| Commentaries    | `COMMENTARIES_PANEL_WEBVIEW_TYPE`  | `file-text`                     | same file (`commentariesPanelWebViewProvider`)                                                                    |
| Comments        | `COMMENT_LIST_PANEL_WEB_VIEW_TYPE` | `message-square`                | `extensions/src/legacy-comment-manager/` (`comment-list-panel-web-view.factory.ts` + `comment-list.web-view.tsx`) |
| Text Collection | `SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE` | `library` (existing, unchanged) | `extensions/src/platform-scripture-editor/src/main.ts`                                                            |

**Asset convention (matching the existing Text Collection icon exactly):** each icon is Lucide's
stock outline SVG — 24×24 viewBox, `stroke-width="2"`, round cap/join, `class="lucide
lucide-<name>"` — exported in 4 stroke-color variants, since the tab-icon slot is painted as a
static CSS `background-image` and can't use `currentColor` to follow the theme:

- `<icon>.svg` — `stroke="#64748b"` (fallback / selection-state-unknown)
- `<icon>-dark.svg` — `stroke="#cbd5e1"` (dark theme)
- `<icon>-selected.svg` — `stroke="#ffffff"` (light theme, tab selected)
- `<icon>-unselected.svg` — `stroke="#0f172a"` (light theme, tab not selected)

New files:

- `extensions/src/platform-scripture-editor/assets/book-open.svg` (+ 3 variants)
- `extensions/src/platform-scripture-editor/assets/file-text.svg` (+ 3 variants)
- `extensions/src/legacy-comment-manager/assets/message-square.svg` (+ 3 variants)

Served via `papi-extension://<extensionName>/assets/<file>.svg`, same as the existing
`library*.svg` files.

**Shared theme/selection-adaptive icon hook.** Today this logic — subscribe to
`papi.themes.subscribeCurrentTheme`, poll the tab's selected state via the iframe's
`offsetParent`, and pick one of the 4 URL variants — lives only in
`scripture-text-grid.web-view.tsx` (`TAB_ICON_URLS` + `pickTabIconUrl`). Adding icons to the other
3 tabs needs the identical logic 2 more times (Bible Texts/Commentaries share
`resourceTextPanelWebView`; Comments is a separate extension), so extract it into a shared hook
(decision: extract, not duplicate):

```ts
// platform-bible-react — new hook, exported for extension use
useTabIconSelection(isDarkTheme: boolean, tabIconUrls: TabIconUrls): string
```

**Correction — scope of the shared hook.** `platform-bible-react` has no dependency on
`@papi/frontend` today (confirmed: not in its `package.json`, not imported anywhere in its `src/`),
and adding one would make a shared UI library depend on the extension-facing PAPI surface — a real
architectural change, not something to introduce silently. So only the mode-agnostic, DOM-only part
of the pattern moves into the shared hook: the `offsetParent`-based selected-state polling and the
`pickTabIconUrl` variant selection. The `papi.themes.subscribeCurrentTheme` subscription itself
(genuinely papi-specific) stays in each of the 3-4 call sites — each keeps its own small
theme-subscribe `useEffect` (as the grid already has) and passes the resulting `isDarkTheme` boolean
into the shared hook. This still removes the fiddlier, more bug-prone half of the duplication (the
interval-based polling with its cleanup/equality-check dance) while keeping the hook free of new
package dependencies.

Callers call `updateWebViewDefinition({ iconUrl: useTabIconSelection(isDarkTheme, MY_ICON_URLS) })`
inside their own effect, same call shape as today's grid code minus the theme part.
`platform-scripture-editor` (migrates `scripture-text-grid.web-view.tsx` to it, adds it to
`resource-text-panel.web-view.tsx` parameterized by `resourceType`) and `legacy-comment-manager`
(`comment-list.web-view.tsx`) both import it from `platform-bible-react`, which both already
depend on.

**Power-mode gating (correction — these tabs are NOT Simple-mode-exclusive):** Bible Texts,
Commentaries, and Comments are reachable in Power mode too — `platformScriptureEditor.openResourceText`
and `legacyCommentManager`'s comment-list-panel open commands are registered unconditionally, not
gated to Simple mode. Today none of the three has any icon in either mode, so adding one
unconditionally would change Power mode's tabs from text-only to icon+text — a real behavior
change, not just a Simple-mode restyle. Gate the new `iconUrl` on `interfaceMode === 'simple'`,
mirroring the existing conditional already present in these same provider functions
(`scrollGroupScrRef: interfaceMode === 'simple' ? 0 : savedWebView.scrollGroupScrRef` in both
`scriptureTextGridWebViewProvider`/`createResourceTextPanelProvider` and the Comment List panel
factory): Power mode keeps showing these three tabs with no icon, exactly as today; only Simple
mode gets the new `book-open`/`file-text`/`message-square` icons. Text Collection's existing
`library` icon is unaffected by this gating (it is unconditional today and stays that way — not
new behavior introduced by this spec).

---

## Section 2 — Visual styling (match reference screenshot)

The reference screenshot shows an icon-only tab row: generous per-tab padding, the active tab
picked out with a warm highlighted background and rounded top corners, no visible per-tab
dividers, evenly spaced.

Much of this is already in place from pt-3958 (dividers removed, active-tab background/rounding
via `--tab-background`/`--radius`, fillets intentionally kept rounded per author feedback). This
section is a targeted style pass on top, reusing those existing tokens rather than introducing new
colors — adjust padding/spacing on `.dock-panel.dock-style-resources .dock-tab .drag-initiator` (or
the equivalent selector after Section 3's shrink changes) so icon-only tabs get comfortable,
evenly-spaced click targets matching the screenshot.

**Exact pixel values are not pinned here.** Per this branch's own established practice (see
pt-3958's many `fix:` commits correcting spacing/height after visual review), tune padding/gap
during implementation using the visual-verification skill against the running app, compared
side-by-side with the reference screenshot.

---

## Section 3 — Responsive density (full icon+title → icon-only)

Per-tab CSS container queries — no JS/ResizeObserver. Each tab's title wrapper becomes its own
containment context (`container-type: inline-size` on `.platform-tab-title` in
`platform-tab-title.component.scss`), so it reacts to its own shrinking width as the column
narrows, not a shared column/viewport breakpoint.

Two states:

1. **Full** (default): icon + tabTitle. Continuous ellipsis truncation as it narrows — not a hard
   breakpoint, just `overflow: hidden; white-space: nowrap; text-overflow: ellipsis;` on the title
   span.
2. **Icon-only**: below a width threshold (tuned during implementation), the title span is hidden
   (`display: none`) via `@container`, padding tightens, and the icon centers.

Floor: rc-dock's existing "more tabs" overflow dropdown, unchanged — no new overflow logic.

**Scoping:** all new rules live under `[data-interface-mode='simple']`, matching every other
Simple-mode rule already in `dock-layout-wrapper.component.scss` and
`platform-tab-title.component.scss`.

**Rabbit hole — flagged, not resolved here:** `.dock-tab` currently has `flex: 1 0 auto; max-width:
max-content` (`dock-layout-wrapper.component.scss`, TAB HEADER region) — tabs do not shrink at all
today; anything that doesn't fit at full content width goes straight into rc-dock's overflow
dropdown. Making the container-query approach above actually trigger requires overriding this to
allow shrinking (e.g. `flex-shrink: 1` plus a `min-width` floor) in Simple mode. rc-dock's own
overflow-detection JS measures rendered tab widths to decide when to move a tab into the dropdown;
whether it still triggers correctly once tabs are allowed to shrink toward the icon-only floor
(instead of staying fixed-width) is **unverified** and must be checked empirically during
implementation via the visual-verification skill (narrow Column 3 with all 3 tabs open and confirm
overflow still kicks in once even icon-only tabs don't fit). If rc-dock's measurement doesn't
cooperate with shrinkable tabs, fall back to a fixed icon-only `min-width` with `flex-shrink: 0`
(no continuous shrink, just a hard full→icon-only swap at one breakpoint) rather than fighting the
library's internals.

---

## Section 4 — Title/tooltip accessibility on icon-only

`PlatformTabTitle` (`platform-tab-title.component.tsx`) already renders a custom Radix `Tooltip`,
but only when the explicit `tooltip` prop (from `tabInfo.tabTooltip`) is set — and `aria-label` is
always just the generic localized word "Tab", never the actual title.

Change, scoped to Simple mode only (consistent with this spec's scope decision):

- Set the native `title` HTML attribute on the tab's container `div` to the resolved title text,
  but only when `tooltip` is not already set (`title={tooltip ? undefined : title}`) — avoids a
  double tooltip (native + custom Radix) when a tab already has an explicit custom tooltip.
- This works regardless of the CSS-driven full/icon-only state (no JS awareness of the container
  query breakpoint needed) — harmless when the title is already visible, essential once it's
  hidden.
- Leave `aria-label` and Power mode untouched; the "Tab"-only aria-label gap is a pre-existing,
  out-of-scope issue there.

---

## Testing

- Extend `platform-tab-title.component.test.tsx`: assert `title` attribute is set to the resolved
  title when `tooltip` is absent, and is `undefined` when `tooltip` is present (Simple mode).
- Extend `resource-text-panel.web-view.test.tsx` / equivalent for Comments: assert the icon URL
  reflects theme + selection state via the new shared hook.
- **CSS container-query behavior (Section 3) cannot be meaningfully unit-tested in jsdom** — no
  automated coverage for the full↔icon-only visual transition; verify manually via
  visual-verification during implementation. This mirrors pt-3958's own Definition of Done, which
  notes "no automated visual-regression suite exists for this layout."

---

## Definition of Done

- Bible Texts, Commentaries, and Comments each show a themed, selection-adaptive tab icon
  (`book-open`, `file-text`, `message-square` respectively) in Simple mode, matching the existing
  Text Collection icon's asset/variant/wiring convention. In Power mode these three tabs show no
  icon, exactly as today (gated on `interfaceMode`, not a new unconditional icon).
- The theme/selection-adaptive icon-picking logic is a single shared hook in
  `platform-bible-react`, used by all 4 tabs — no duplicated copies.
- Column 3's tab strip visually matches the reference screenshot (padding, active-tab highlight,
  spacing), reusing existing design tokens.
- Tabs show icon+title when roomy and shrink to icon-only as the column narrows, verified visually;
  rc-dock's existing overflow dropdown remains the floor for tabs that don't fit even icon-only.
- Every tab exposes its title via native `title` (and existing custom tooltip take priority when
  set) once its visible text is hidden, in Simple mode.
- Power mode is behaviorally and visually unchanged throughout.
