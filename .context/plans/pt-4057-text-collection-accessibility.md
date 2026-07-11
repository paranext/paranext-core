# A12 — Scripture Text Grid Accessibility, Theming & RTL Pass (PT-4057)

**Ticket:** [PT-4057](https://paratextstudio.atlassian.net/browse/PT-4057) · child of [PT-4047](https://paratextstudio.atlassian.net/browse/PT-4047) (Multi-Resource View / Scripture Text Grid)
**Date:** 2026-07-11
**Scope:** accessibility + dark/light theming + RTL parity. **Telemetry is out of scope** (removed from the ticket — no telemetry hook exists in paranext-core, and telemetry was not intended to be a work item).

## 1. Background

The Scripture Text Grid (a.k.a. Text Collection) view was added to the `platform-scripture-editor`
extension by A1–A5. The renderer (A4) and View Options panel (A5) have already landed on
`pt-4057-accessibility-pass`. A12 is a cross-cutting polish pass over that shipped surface. It is the
first ticket to drop if the sprint slips; the keyboard-nav + RTL-smoke subset must ship even in a
slip.

### Already implemented (do not rebuild)

- `role="grid"` on the scrolling container, `role="row"` on the flex row, `role="gridcell"` on each cell.
- Enter opens the chapter-context resizable split for the focused cell; Esc closes it (global key handler in the web view).
- Focus returns to the opening cell when the split closes, restored by `data-project-id` after remount (WCAG 2.4.3).
- Each cell has `tabIndex={0}` (Tab/Shift-Tab already step between cells) and an `onKeyDown` Enter handler.
- Per-cell `dir` follows each resource's own `platform.textDirection`; the row reverses under `dir="rtl"` via logical Tailwind flex (`flex-row` → `row-reverse`). Both have Playwright coverage.
- Theme-adaptive tab icon (light/dark SVG swap via `papi.themes`); theme tokens (`bg-background`, `text-foreground`, `muted-foreground`) used across the web view and cells.

### Gaps A12 closes

1. Accessible name lacks the verse reference.
2. No visible focus indicator on the focused cell.
3. No screen-reader announcements on cell focus or chapter-context open/close.
4. The readonly `Editorial` content inside each cell is (potentially) in the tab order, muddying clean Tab-between-cells stepping.
5. No dark/light audit across every state; no "locked" affordance on admin-shared View Options rows.
6. No RTL audit of the split side, header/close affordances, and picker dropdown direction.
7. Playwright specs don't cover accessible names, focus indicator, or Tab order.

All work stays inside `extensions/src/platform-scripture-editor/` — no new top-level structure.

## 2. Design decisions (agreed)

- **Keyboard model = Option A (Tab/Shift-Tab between cells).** Not the full ARIA grid APG pattern (roving tabindex + arrow keys). Rationale: (a) the ticket explicitly specifies Tab/Shift-Tab — the APG pattern would make Tab a single in/out stop and reassign cell movement to arrows, contradicting the DoD; (b) each cell embeds a scrollable `Editorial` editor, and reserving arrow keys for grid nav would fight reading/scrolling inside a cell; (c) the row is a short one-dimensional list (~2–10 cells), so the APG pattern's main benefit (avoiding many tab stops) barely applies; (d) it is the lowest-risk change on the drop-first ticket, and cells are already `tabIndex={0}`. Accepted caveat: `role="grid"` + per-cell tab stops is a mild ARIA-semantics mismatch; existing roles stay.
- **Locked-admin indicator lives only in the View Options panel.** A small, non-interactive lock icon appears **on hover** next to admin-shared (top-section) rows — occupying the same slot the hover-✕ uses on removable rows — signalling "shared by the admin; can't be removed from the list." **No** lock/indicator is added to the ScriptureTextGrid cells.

## 3. Detailed design

### 3.1 Accessible name with verse reference

- Compose the gridcell `aria-label` as `"{resource short name}, {formatted scrRef}"` → e.g. `"ESV, MAT 5:3"`.
- Use `formatScrRef` from `platform-bible-utils` to format the reference from the active `scrRef`.
- The label is composed where the cell has both the resource label and `scrRef` (`ResourceCell`), then passed into `ResourceCellView` as the `aria-label` (today `ResourceCellView` uses `label` directly). Keep `ResourceCellView` presentational: add an explicit `ariaLabel` prop rather than formatting inside it.
- The visible header text stays the plain resource label; only the accessible name gains the reference.

### 3.2 Visible focus indicator

- Add a `focus-visible` ring to the gridcell using theme tokens (`tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-inset` or the project's established focus-ring utility), applied only when the cell is activatable (`onActivate` set).
- Verify the ring is not suppressed by the Tailwind/preflight reset and is visible in both themes (the ticket flags this explicitly). Use `ring-inset` so the indicator isn't clipped by the cell's `overflow`/`divide-x` borders.

### 3.3 Screen-reader announcements

- Add one polite, atomic live region (`role="status"`, `aria-live="polite"`, `aria-atomic="true"`, visually hidden) owned by the web-view root — a single region avoids competing announcements.
- Announce on:
  - **Cell focus** — the cell's accessible name (resource + reference), so SR users hear which cell they moved to.
  - **Chapter-context open** — e.g. "Chapter view opened for {resource}, {reference}".
  - **Chapter-context close** — e.g. "Chapter view closed".
- Announcement text is localized (new keys, see §3.7). The web view already tracks `chapterContext` open/close state, so open/close announcements hook into the existing setter/close handler. Cell-focus announcement is driven by an `onFocus` on the gridcell surfaced through a callback prop (kept out of `ResourceCellView`'s presentational core where practical).
- Visually-hidden styling uses the project's existing sr-only utility if present; otherwise a standard clip pattern.

### 3.4 Clean Tab order (remove editor from tab order)

- Ensure the readonly `Editorial` content within a cell is not a Tab stop, so Tab/Shift-Tab step cell-to-cell cleanly (the gridcell is the intended stop).
- Investigate the actual rendered focusability of the readonly Lexical `contentEditable` first; if it is focusable, neutralize it (e.g. `tabIndex={-1}` on the editor container / `contentEditable` host) without breaking selection or scroll. Confirm via the new Tab-order Playwright spec rather than by assumption.

### 3.5 Theming audit (dark + light)

Audit and fix, replacing any hardcoded colors with `platform-bible-react` theme tokens:

- Cells (ready / downloading / failed / verse-empty), cell header + divider.
- New focus ring (both themes).
- View Options popover: rows, checkboxes, Verse/Chapter toggle, "Coming soon" hint, Get Resources button, the new lock indicator.
- Empty state (A6 directional copy).
- Chapter-context split: close button, border seam, resize handle.

Deliverable is a short audit note in the PR plus any token fixes; no visual-regression harness is added.

### 3.6 Locked-admin indicator (View Options panel)

- In `ResourceCollectionOptions`, admin-shared rows (top section, `isUserRemovable === false`) get a non-interactive lock icon (`lucide-react` `Lock`) in the trailing slot, revealed on row hover / focus-within — mirroring the hover-✕ reveal pattern already used for removable rows (`opacity-0 … group-hover:opacity-100 focus-visible:opacity-100`).
- The lock is decorative-with-a-name: give it an accessible label (new localized key, e.g. "Shared by administrator") via `aria-label` on a non-focusable element, or `title` + visually-hidden text, so it does not add a tab stop.
- Reuse the existing `tw:group` row wrapper; the trailing slot is shared with the ✕ but the two are mutually exclusive per row (`isUserRemovable` gates which one renders).

### 3.7 RTL (UI-locale) audit

- Verify the chapter-context split opens on the **inline-end** side (visual left under `dir="rtl"`). The split uses `ResizablePanelGroup direction="horizontal"`; confirm panel order maps to inline-start→inline-end under RTL and fix with logical ordering if it is pinned to physical left/right.
- Verify the header's justify-end button placement and the close button mirror correctly.
- Verify the View Options popover (Radix) opens with correct direction under an RTL UI locale, and the picker dropdown/resource-picker dialog respect UI locale direction.
- Confirm no hardcoded `left`/`right` regressions (current STG files use logical Tailwind utilities; keep it that way).
- Per-cell content direction already works and stays.

### 3.8 New localized strings

Add to `contributions/localizedStrings.json` (English + AI Spanish, per A6 precedent), namespaced under `webView_scriptureTextGrid_*`:

- `..._a11y_chapterContextOpened` — "Chapter view opened for {resourceReference}" (replacement param).
- `..._a11y_chapterContextClosed` — "Chapter view closed".
- `..._viewOptions_adminSharedLock` — "Shared by administrator" (lock accessible name).

(Cell-focus announcement reuses the already-composed accessible name; no new key needed for it. Reference exact param names during implementation.)

## 4. Testing

### Automated (extend `e2e-tests/tests/enhanced-resources/scripture-text-grid.spec.ts`)

- **Accessible name:** a gridcell's `aria-label` matches `"{name}, {formatted ref}"` for the active reference.
- **Tab order:** Tab/Shift-Tab move focus between gridcells (and not into editor content) — assert `document.activeElement` role is `gridcell` across steps.
- **Focus indicator:** focused gridcell exposes a visible ring (assert the focus-visible class / computed outline/ring is non-empty).
- **RTL split side:** under `dir="rtl"`, the chapter-context panel renders on the inline-end (visual-left) side. (RTL row-reversal test already exists — keep it.)

Data-mutating specs follow the existing pattern (skip in CI, discover an admin-writable project locally).

### Component / unit (Vitest)

- Accessible-name composition helper (label + `formatScrRef`) — table of book/chapter/verse cases.
- `ResourceCollectionOptions`: admin row renders the lock (and no ✕); user row renders the ✕ (and no lock); lock adds no tab stop.
- Live-region announcement text for open/close (localized-string formatting).

### Manual smoke (documented in PR)

- Keyboard-only walkthrough: Tab across cells → Enter opens split → Esc closes → focus returns to the originating cell.
- Screen-reader smoke (NVDA on Windows; VoiceOver on macOS) — cell focus and split open/close are announced.
- Dark + light visual smoke of every surface in §3.5.
- RTL: switch UI locale to `ar` or `he`; mix a Hebrew/Arabic resource with an English one — row reverses, split on inline-end, each cell keeps its own content direction.

## 5. Files touched (anticipated)

- `scripture-text-grid/resource-cell.component.tsx` — compose accessible name (label + `formatScrRef`), pass `ariaLabel`.
- `scripture-text-grid/resource-cell-view.component.tsx` — accept `ariaLabel`; focus-visible ring; surface `onFocus`; keep editor out of tab order.
- `scripture-text-grid/scripture-text-grid.component.tsx` — thread focus/announce callbacks; verify RTL split ordering.
- `scripture-text-grid.web-view.tsx` — live region + announcement wiring on focus and chapter-context open/close.
- `resource-collection-options/resource-collection-options.component.tsx` (+ `.types.ts`) — hover lock for admin rows.
- `contributions/localizedStrings.json` — new a11y + lock strings (English + AI Spanish).
- `e2e-tests/tests/enhanced-resources/scripture-text-grid.spec.ts` — new specs.
- Relevant `.test.tsx` / `.stories.tsx` alongside changed components.

## 6. Out of scope

- Telemetry of any kind (removed from the ticket).
- Chapter view mode (B4 / disabled "Coming soon").
- Full ARIA grid APG keyboard pattern (Option B).
- Any indicator inside the ScriptureTextGrid cells for admin/locked resources.
- Visual-regression test harness.

## 7. Risks / open items

- **Lexical readonly focusability** — the exact tab behavior of the embedded readonly `Editorial` must be confirmed empirically before choosing the neutralization approach (§3.4).
- **Radix RTL** — Popover/dialog direction under an RTL UI locale depends on how the app sets `dir`; confirm during the RTL audit and adjust only if broken (avoid regressing LTR).
- **`role="grid"` semantics** — accepted mismatch documented in §2; flagged for reviewer awareness.
