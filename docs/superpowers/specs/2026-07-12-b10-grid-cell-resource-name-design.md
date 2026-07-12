# B10 — Compact resource-name display in ScriptureTextGrid cells

- **Ticket:** [PT-4157](https://paratextstudio.atlassian.net/browse/PT-4157) (B10)
- **Parent:** [PT-4048](https://paratextstudio.atlassian.net/browse/PT-4048) — Multi-Resource View in Resource Viewer, nice-to-haves
- **Depends on:** A4 (PT-4052) — the cell/renderer (landed)
- **Date:** 2026-07-12
- **Scope:** paranext-core only (extension `platform-scripture-editor`)

## Goal

Make each `ScriptureTextGrid` cell display its resource name as compactly as
possible — P9-style — so the short name/abbreviation takes as little space as
possible instead of consuming a full-width header row above the verse.

## Chosen rendering path: (a) — chrome only

The three paths the ticket lays out:

- **(a) Render the name in the cell header/chrome, outside `Editorial`.** No Lexical
  risk, paranext-core-only. **This is the path we take.**
- (b) Faux-inline before the verse text (absolute / negative margin). Rejected:
  true text-wrap-around requires the name to live inside `Editorial`'s block
  formatting context, which we cannot reliably achieve from outside — the ticket's
  documented fragility.
- (c) Push an abbreviation slot upstream into `scripture-editors`. Rejected:
  expands scope to a second repo and breaks paranext-core-only.

### Why true P9 wrap-around is not achievable robustly here

In P9 the abbreviation and verse text share one block, so `float` makes the verse
lines wrap around the abbreviation. In Platform.Bible the verse text is rendered by
`Editorial` (a `LexicalComposer` that owns its own DOM subtree), and the cell's
content wrapper sets `overflow-auto`, which establishes a block-formatting context
that blocks float intrusion. A float placed _outside_ `Editorial` therefore cannot
make text _inside_ `Editorial` wrap around it. Genuine wrap-under would require the
abbreviation to live inside `Editorial`'s flow — i.e. path (c) or injecting into the
USJ data (which would pollute the scripture model and render as scripture content).
Both are rejected. We deliver the compact, colored, inline _feel_ without the
fragile wrap dependency.

## Design

Two layouts, selected by the cell's view mode. `ResourceCellView` is the single
presentational component reused across all three rendering contexts (verse-row
cells, single-resource full-width, chapter-context split), so both layouts live
there and are chosen by an explicit prop.

### Verse-row cells (`viewMode='verse'`) → hanging inline label

- The cell content area becomes a flex row: a colored abbreviation pinned to the
  inline-start, and the `Editorial` verse slice filling the remaining column.
- Verse text wraps within its own (right-hand, in LTR) column. Later lines stay in
  that column — they do not tuck under the abbreviation. This is the accepted,
  robust approximation of P9 for the primary (verse) mode, where verses are short.
- No full-width header row — reclaims the vertical space the current header spends.

### Chapter contexts (`viewMode='chapter'`) → compact colored header band

- Single-resource full-width view and the chapter-context split panel show a whole
  chapter, where a hanging inline label would only sit beside verse 1. These keep a
  header treatment — but restyled to be compact: keep the existing
  truncation-triggered tooltip, apply the distinct color, tighten padding.
- Matches the ticket's "chapter view — name likely at the column top where there is
  more vertical space" note.

### Color

A distinct, standout theme token — **not** muted, and **not** link-styled (no
underline, no pointer): in P9 the name is a link, but it is not a link in P10 yet.
Use an accent token (e.g. `tw:text-primary`) so it adapts to light/dark themes and
is a one-line change if a different hue is wanted later. Applies to both layouts.

## Components touched

No new files — both components already exist and are extended in place.

| File                                                                                                | Change                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx` | Add a `nameDisplay: 'inline' \| 'header'` prop. Branch the render: `'inline'` → flex-row hanging label; `'header'` → compact colored band (restyle of today's header). Reuse the existing truncation-triggered tooltip in both. |
| `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.component.tsx`      | Derive `nameDisplay` from `viewMode` (`verse` → `inline`, `chapter` → `header`) and pass it to `ResourceCellView`. `viewMode` is already known here.                                                                            |

## Data flow

Unchanged. The label still originates as `reference.name` (the short name) mapped
to `GridResource.label` in `grid-resources.utils.ts`, threaded through `ResourceCell`
(`resourceRef.label`) into `ResourceCellView`. B10 only changes _how_ that existing
label is presented — no new data, no new fetch.

## Behavior details

- **RTL.** The abbreviation sits on the inline-start side (flips to the right in
  RTL) via flex + CSS logical properties. The content area already applies each
  resource's own `dir={textDirection}`.
- **Offline / empty states.** The abbreviation renders in _every_ state
  (`downloading` / `failed` / empty verse), so the cell is always identifiable —
  matches today's header behavior, which renders the label regardless of state.
- **Click / B8 (kebab).** The whole cell already activates the chapter-context split
  (`onActivate` on the gridcell). The abbreviation inherits that; no separate
  name-click routing is added. **There is no kebab in the current cell**, so B8 is
  "not affected" — no re-anchoring needed.
- **Accessibility / reading order.** The abbreviation is real leading text so a
  screen reader announces "NIV, verse text…". Reconcile the existing gridcell
  `aria-label={label}` so the name is not double-announced (an `aria-label` on the
  container would otherwise override child content); the exact reconciliation is
  driven by a test asserting reading order.
- **Long short-names / tooltip.** The abbreviation can be a longer short-name; cap
  its width and keep the existing truncation-triggered tooltip (the
  `ProjectRowView`-style manual-`open` measure-on-pointer-enter pattern already in
  the file) revealing the full label.

## Testing

Matches the ticket's testing ideas (testing trophy: component-level focus).

- **Component tests** (vitest + React Testing Library):
  - Verse mode renders the inline layout; abbreviation appears before the editor in
    DOM order.
  - Chapter mode renders the header band.
  - The abbreviation carries the distinct-color class.
  - RTL places the abbreviation on the inline-start side.
  - Tooltip appears only when the label is truncated.
  - The abbreviation is present in `downloading`, `failed`, and empty-verse states.
  - Screen-reader reading order is abbreviation → verse content (no double
    announcement of the name).
- **Snapshot:** verse view + chapter view.
- **Storybook:** update the existing `ResourceCellView` stories to cover both
  layouts (inline + header) and states.
- **Manual checklist:** clicking a cell still opens the chapter-context split; RTL
  renders correctly; screen reader announces the name then the verse text.

No keyboard handler changes (Enter-to-activate is unchanged) → the keyboard
shortcuts catalog is untouched.

## Out of scope

- **B9 (PT-4156)** — long name in the View Options list (a different surface).
- **B4 (PT-4062)** — enabling the chapter-toggle view mode; B10 only styles the
  chapter contexts that already render today.
- Any upstream `scripture-editors` / `platform-editor` change.
- Injecting the name into the USJ data.

## Definition of Done (from the ticket)

- [x] Rendering path chosen (a) and documented before start — this spec.
- [ ] Grid cell shows the resource name compactly per the chosen path.
- [ ] B8 kebab has a discoverable anchor (if affected) — N/A, no kebab in the cell.
- [ ] Chapter-view treatment consistent — compact header band.
- [ ] Snapshot + accessibility + RTL tests pass.
