---
paths:
  - lib/platform-bible-react/src/components/advanced/project-selector/**
  - lib/platform-bible-react/src/components/advanced/resource-picker-dialog/**
  - src/renderer/components/projects/**
---

## Picker Rows Truncate — They Never Scroll Horizontally

Platform.Bible lists the same three things in several project/resource pickers — a short name, a
full name and a language. They follow one layout contract, recorded with its full rationale as
`adr-picker-row-truncates-never-scrolls` in
[`Architecture-Decisions.md`](../../../.context/standards/Architecture-Decisions.md). The log keeps
the *why*; this is the rule.

Surfaces governed today: `ResourcePickerDialog`
(`lib/platform-bible-react/src/components/advanced/resource-picker-dialog/`), `ProjectPicker`
(`src/renderer/components/projects/project-picker.component.tsx`), and `ProjectSelector`
(`lib/platform-bible-react/src/components/advanced/project-selector/`).

### The invariants

When you add a picker, or change the row layout of one that exists:

1. **No column may be widened by its content.** Fix the columns — a `colgroup` under
   `table-fixed` for a table, `minmax(0, …)` tracks for a CSS grid — so a long name cannot set the
   row's width.
2. **Every text track must be allowed to be narrower than its content**, or it cannot truncate.
   A track left at bare `auto`, or a cell without `min-w-0`, floors at its longest unbreakable word
   and satisfies itself by crushing its neighbours instead. This applies to *every* text column,
   including the ones you do not expect to overflow — a language column holding a display name
   instead of a tag is one mapping slip away.
3. **The scroll container states `overflow-x: hidden` explicitly.** Asking only for
   `overflow-y: auto` leaves the other axis computing from `visible` to `auto` — that is the CSS
   Overflow spec, not a browser quirk — and is what produces the horizontal scrollbar in the first
   place. Note this removes the user's escape hatch, which is why (2) is not optional.
4. **Truncation must not hide anything.** Clipped text stays reachable on hover, by whichever
   tooltip mechanism that surface's row already uses: a native `title` where the row is plain
   markup, and the row's own tooltip where the row is already a tooltip trigger — a `title` inside
   one opens the browser's default tooltip on top of the app's.

   **A hover label that only restates the visible text is gated on measured clipping**
   (`scrollWidth > clientWidth`), whichever mechanism carries it — an unconditional one puts a
   tooltip on every row in the list repeating the words under the pointer. Measure in a layout
   effect and re-measure on resize (`useTruncationTitle` in `project-picker.component.tsx`), or on
   `pointerenter` when driving a controlled tooltip (`useTruncationTooltip` in
   `platform-bible-react`); a native `title` cannot use the latter, because attaching it once the
   pointer is inside races the browser's own tooltip timer. A label that adds something the cell
   does not show — the language column pairing a tag with its display name — is not gated.
   Reasoning: `adr-picker-row-hover-label-gated-on-truncation`.
5. **The short name starts at the leading edge** of its column, with any check mark / indicator
   glyph in a fixed-width slot rendered for every row. A slot rendered only when it has something in
   it leaves the one column the list aligns on with a ragged leading edge.

### Testing it

jsdom reports `scrollWidth` and `clientWidth` as `0`, so **it cannot see a horizontal-overflow
defect at all**. Pin the layout half with a browser-level Storybook story (see
`LongNamesDoNotScrollHorizontally*` in `resource-picker-dialog.stories.tsx`), varying both a long
name and a narrow container — either alone can pass. jsdom tests are fine for the alignment half,
but assert the sizing classes, not a child index: an index is the same whether or not the reserved
slot has any width.

The hover label is split the same way, and for the same reason: jsdom sees every cell as unclipped,
so it can pin "no label when the text fits" and nothing else. Whether the label appears when the
text really is cut off needs a browser story (`RowHoverLabelsAppearOnlyWhenClipped` in
`project-picker.stories.tsx`) — and assert both a clipped and an unclipped cell there, since a
label that never appears and one that always appears each satisfy half the pair.
