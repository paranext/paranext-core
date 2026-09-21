# PT-4544 — Text Collection: click-toggle chapter view + tighten the verse row

## Context

**Ticket:** [PT-4544](https://paratextstudio.atlassian.net/browse/PT-4544) — WI-18, serves TODD-NTH-1.1
and TODD-NTH-1.2 plus TODD-NTH-1.3's residual. Parent epic
[PT-4530](https://paratextstudio.atlassian.net/browse/PT-4530) ("Simple is coherent for Saroj"),
lane L3.

**The problem.** Saroj scans several texts side by side in the Text Collection's verse view. Three
frictions:

1. Clicking a row opens that resource's chapter-context split, but clicking it again does nothing —
   there is no way back to the plain verse list except an X button or Escape.
2. Each row is a two-column flex split: a short-name badge that sizes to its own content (capped at
   `max-w-24`), then the verse text in a separate column. So rows don't align with each other, and
   wrapped lines stay in the right-hand column, leaving a column of empty space under every badge.
   Saroj sees whitespace where text should be.
3. Verse mode has no drag grip. `ScriptureTextGrid` already passes `showDragHandle`,
   `reorderHandleLabel`, `reorderHint` and `onReorderKeyDown` into verse cells, and the split-close
   focus restore targets `[data-reorder-handle-id]` — but `ResourceCell` passes
   `nameDisplay="inline"` in verse mode and the grip renders only in the `'header'` branch. So
   **keyboard reorder in verse mode is currently unreachable**, and the keyboard-shortcuts catalog
   already claims it works.

**Intended outcome.** Click a row to open its chapter, click it again to return to the verse list.
Rows start flush at the inline edge, with the short name in a fixed-size area and the verse text
flowing after it on line 1 and *beneath* it on line 2+ — the PT9 shape. Verse mode gets a working
drag grip.

### Decisions already made

| Question | Answer |
| --- | --- |
| What does "toggle verse ↔ chapter" mean? | **Toggle the chapter-context split panel.** Click a row → its split opens. Click the same row → it closes. Click a different row → the split switches, does not close. The global `viewMode` is not touched. |
| Branch base | **`origin/main`, in a separate worktree.** (Noted once and accepted: `resource-cell-view.component.tsx` and `scripture-text-grid.component.tsx` are rewritten by both PR #2781 and the unmerged `pt-4543-chapter-verse-scroll`; whichever lands second resolves the conflict.) |
| Verse drag grip | **Include it.** The ticket's DoD: "A verse-mode drag grip exists, closing TODD-NTH-1.3's remaining gap." |
| How much visual affordance? | **Hover tint + persistent tint on the open row. No chevron.** "Affordance" is ambiguous in the ticket and the only place saying *visible* is the AI-authored Implementation Ideas section; a tint satisfies "discoverable" without spending row width, which is what 1.2 exists to reclaim. |
| ARIA for the disclosure | **`aria-expanded` on the `listitem`.** One tab stop per row, keeps the list structure and the existing focus-restore selector. Technically outside ARIA 1.2's supported set for `listitem`; the repo has no axe gate and browsers surface the state fine. |

### Q9 item 4 — the ticket's hard gate is satisfied, but inverted

The ticket calls Todd's screenshot "the specification" for 1.2 and gates on Q9 item 4 confirming it
is authoritative. **Todd answered on 11 Sep** (comment on PT-4530): *"the screenshot is only an
illustration for the statement, 'Flow content after and beneath shortname - same as PT9'."*

So the **prose is the spec** and the screenshot is illustrative. This plan implements the prose.
Note the inversion in the PR description.

---

## Approach

Two independent halves that meet in one JSX block, plus one bug fix.

### Half 1 (NTH-1.2) — the wrap-around row

The requirement is a **text-wrap-around shape, not a two-column layout**. A flex/grid split puts
line 2 in the text column instead of under the badge.

**Mechanism: an absolutely-positioned badge outside the zoom subtree + a generated float exclusion
inside the editor's own block flow.**

The badge is out of flow at the row's inline-start with a *fixed* `inline-size` — that is what makes
rows align. The exclusion is `.editor-input::before { content: ''; float: inline-start }`, which
sits inside `.editor-input`'s block flow, immediately before its first `<p>`, and shortens the line
boxes exactly like a float should.

Three facts make this work, each verified against `origin/main`:

- **`.editor-input` is not a block formatting context.** `_editor.scss:33-42` gives it
  `min-height/resize/font-size/position/tab-size/outline/padding/flex`, none of which establish one,
  and `[contenteditable]`'s UA style adds only `user-modify`/`word-wrap`/`line-break`. So the
  `::before` float and the `<p>` line boxes share `.editor-container`'s BFC. The `overflow` BFCs
  above (`.editor-container` in `_editor-overrides.scss:26`, the `tw:overflow-auto` wrapper) are
  ancestors of *both*, so neither is crossed. **Nothing has to be removed and no scrolling is lost.**
- **A float composes with the existing marker indents; `text-indent` would fight them.**
  `_usj-nodes.scss:638-640` sets `.text-spacing .usfm_p { text-indent: 2.5vw }` and `:789-797` sets
  `.usfm_q1 { text-indent: -10vw; margin-left: 15vw }`. A `text-indent` override would silently
  destroy every poetry hanging indent. A float shortens the *line box*, so a `q1` paragraph gets
  line 1 starting at `max(15vw, reserve)` with its hanging indent intact.
- **`float: inline-start` resolves against the element's own `direction`**, which `.editor-input`
  carries from the editor's `textDirection` option — the same source as the row's `dir`. **RTL needs
  no second rule.** The new stylesheet contains zero `[dir='ltr']`/`[dir='rtl']` selectors; that is
  the check that the RTL story is real.

**Zoom.** Zoom is per-resource, applied as CSS `zoom` on the content wrapper
(`resource-cell-view.component.tsx:277-278`). The badge must **not** scale, or a zoomed row's badge
would differ from its neighbours' and rows would stop aligning — defeating the requirement. So the
badge stays outside the zoomed subtree, and the exclusion (which is inside it, where Blink
multiplies used lengths) divides by the factor:

```
--stg-zoom: 1.4                  (set inline by React on the row, outside the zoom)
--stg-name-reserve: 6.5rem       = 104px  (badge 6rem + gap 0.5rem)
exclusion inline-size: calc(104px / 1.4) = 74.29px × effective zoom 1.4 = 104px  ✔ matches the badge
```

`zoomFactor` is clamped to `[0.5, 3]` (`resource-zoom.utils.ts:4-6`), so it can never be 0. Rows at
3× and 0.5× have their text starting on the same device-pixel column.

**Placeholders.** `downloading`/`unavailable`/`bookNotAvailable`/`failed` and the empty-verse message
render centered flex boxes with no line boxes for a float to shorten, so the out-of-flow badge would
paint over them. They get a `.stg-verse-name-reserve` class applying the same zoom-compensated
`padding-inline-start`.

### Half 2 (NTH-1.1) — the toggle

Pure derivation — **no new state**. `chapterContext` already lives in the web view
(`scripture-text-grid.web-view.tsx:190`) and `onChapterContextClose` already exists:

```tsx
const isOpen = chapterContext?.resourceId === resource.resourceId;
const activate = onChapterContextChange
  ? () => {
      focusRestoreResourceIdRef.current = resource.resourceId;
      if (isOpen) onChapterContextClose?.();
      else onChapterContextChange(resource);
    }
  : undefined;
```

Both `onClick` and the Enter/Space `onKeyDown` already call the same closure, so keyboard parity is
structural. Switching rows takes the `else` branch, so the split never closes. Escape is unchanged.

**The focus bug this exposes — must be fixed here.** The effect at
`scripture-text-grid.component.tsx:176-182` restores focus only on *close*. The verse column
remounts on *both* transitions (it moves between a bare wrapper and a `ResizablePanel`), so on open
the focused row is destroyed and focus lands on `<body>`. Today that's unpolished; with a toggle it
means **Enter opens the split and you can't press Enter again to close it**. Widen the same effect
(one ref, one selector, no parallel mechanism) to restore on every transition, clearing the latch
only on close so a later Escape/X close still has a target.

**Affordance** (per the decision above) — on the listitem's className, which already carries
`aria-expanded`, so the Tailwind `aria-expanded:` variant applies directly:

```
tw:cursor-pointer tw:transition-colors tw:hover:bg-accent/50 tw:aria-expanded:bg-accent
```

**ARIA:** `aria-expanded={isOpen}` on the listitem; `aria-controls` → the split region's `useId()`
id, set only while the panel exists (a dangling idref is an ARIA error). The panel keeps
`role="region"` + `aria-label`. Both existing `jsx-a11y/no-noninteractive-*` suppressions stay;
extend their justification comment to say the row is now a disclosure control.

**Click-during-selection guard.** A click that ends a text drag-selection inside the verse would now
*close* the split mid-copy and destroy the selection the right-click Copy item depends on. Guard in
the click path only (not Enter/Space):

```tsx
if (window.getSelection()?.toString().trim()) return;
```

### Half 3 (NTH-1.3 residual) — the verse grip

**No prop plumbing needed.** Every prop already arrives: `reorderHandleId` from
`resource-cell.component.tsx:247`, the rest from `scripture-text-grid.component.tsx:429-438`. The
only defect is that the `inline` branch never renders them.

Extract the existing grip block into a local `ReorderGrip` component so **chapter mode stays
byte-identical**, then render it in the inline branch too.

**Placement:** pinned at the inline-end of the already-reserved 6rem badge area, revealed on
hover/`group-focus-within`/`focus-visible` and always visible on touch — the same policy the zoom
kebab already uses. This costs **zero** added row width (the area is reserved either way) and never
overlays verse text, because the float exclusion already keeps text out of it. Accepted cost: on a
row whose short name is long enough to truncate, the revealed grip overlaps the ellipsis; it is
hover-only and the truncation tooltip still conveys the full name.

It must `stopPropagation` on click so reordering doesn't toggle the split, and it carries
`data-reorder-handle-id` — which makes the keyboard-reorder focus restore at
`scripture-text-grid.component.tsx:165-170` start working with no change to that effect.

---

## Files

**Worktree first:** branch `pt-4544-text-collection-verse-row` off `origin/main`, in its own
worktree. (Memory note: after `npm install` in a worktree, revert `package-lock.json` — the install
rewrites its `name` field.)

| File | Change |
| --- | --- |
| `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx` | Rewrite the `nameDisplay === 'inline'` branch (~`:287-298`) to the new shape; extract `ReorderGrip` from `:306-330`; add `--stg-zoom` row style; add `.stg-verse-name-reserve` to placeholder wrappers. Header branch unchanged. |
| `extensions/src/platform-scripture-editor/src/_scripture-text-grid-verse.scss` | **New.** The badge/exclusion/reserve rules. Deliberately *not* `_editor-overrides.scss`, which is `@use`d by all three web-view entry points — these rules target `.editor-input`. |
| `extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.scss` | One `@use './scripture-text-grid-verse';`, last, so nothing hoists above it. |
| `extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid.component.tsx` | `useId` import; `chapterContextPanelId`; widen the focus-restore effect (`:176-182`); `isOpen` + toggling `activate` (`:358-366`); `aria-expanded`/`aria-controls` + tint classes on the listitem (`:373-420`); `id` on the panel region; extend the eslint-suppression comment. |
| `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell.component.tsx` | No change (verified: `nameDisplay` at `:221` and every reorder prop already flow correctly). |
| `src/stories/keyboard-shortcuts.data.ts` | `scripture-text-grid-open-chapter-context` (`:235`) purpose becomes "Open **or close** the chapter-context view for the focused cell". `scripture-text-grid-reorder-cell` (`:263`) already claims verse up/down — it becomes true rather than needing an edit. |
| `.context/standards/Architecture-Decisions.md` | Append an entry for the float-exclusion mechanism (why a generated float inside the editor's block flow, not `text-indent` or a flex split; the zoom-compensation contract; the `.editor-input`-is-not-a-BFC dependency). |

**Localization: nothing to add.** Verified every key already exists in both `en` and `es` in
`extensions/src/platform-scripture-editor/contributions/localizedStrings.json` —
`_cell_reorderHandle` (`:173`), `_cell_reorderHint` (`:174`), `_cell_reorderAnnouncement` (`:172`),
`_aria_chapterContextClosed` (`:167`), `_aria_chapterContextOpened` (`:168`). The toggle-close path
routes through the existing `handleCloseChapterContext`, so the close announcement fires for free.
`assets/localization/en.json` has zero `scriptureTextGrid` keys, so the epic's `en.json` cross-lane
conflict chokepoint does **not** apply to this ticket.

### Reuse — existing code this builds on rather than replacing

- `useTruncationTooltip` (`lib/platform-bible-react/src/hooks/use-truncation-tooltip.hook.ts`) —
  keeps working; a fixed `inline-size` plus `position: absolute` actually makes its
  `scrollWidth > clientWidth` check *more* deterministic than today's `max-w-24`.
- `focusRestoreResourceIdRef` + the `[data-resource-id]` selector — widened, not duplicated.
- `handleChapterContextChange` / `handleCloseChapterContext` / the Escape listener
  (`scripture-text-grid.web-view.tsx:209-221`) — unchanged; the toggle routes through them.
- The `tw:group` hover/focus-visible reveal pattern already on the zoom kebab
  (`resource-cell-view.component.tsx`) — reused verbatim for the grip.
- `resource-cell.const.ts`'s exported-key-list pattern — the model if we extract the web view's
  string keys (see Optional below).

---

## Verification

**Two things to confirm in the running app before finalizing the spec** (`/run` or the `app-runner`
skill, then `visual-verification`):

1. **`.editor-input { min-height: 150px }`** (`_editor.scss:34`) has no override anywhere in this
   repo. If verse rows really are ~180px tall today, zeroing it belongs in this change — rows cannot
   "align with each other" otherwise — but it is a visible behaviour change beyond the ticket's
   letter. Confirm, then flag it in the PR.
2. **Whether the read-only `Editorial` root is focusable.** Not blocking (we chose
   `aria-expanded` on the `listitem`), but it decides whether the spec should record the inner
   `role="button"` alternative as viable-but-rejected or as invalid.

**The test mock currently hides the grip bug — fix it first.**
`scripture-text-grid.component.test.tsx:426-467` mocks `ResourceCell` with a grip that renders
whenever `showDragHandle` is truthy, ignoring `viewMode`. Three tests pass green today against DOM
the app cannot produce (`ArrowDown moves one position`, `ArrowUp is a no-op at the boundary`,
`grip click does not trigger chapter-context activation`). Land the mock fix **first, on its own**,
and watch those three go red — that red is the proof of the bug. Change the mock to delegate to the
real `ResourceCellView` with `nameDisplay={viewMode === 'verse' ? 'inline' : 'header'}`, so it can't
drift again. (Requires porting the `ResizeObserver`/`hasPointerCapture`/`scrollIntoView` stubs from
`resource-cell-view.component.test.tsx:24-50`, and swapping `getByTestId('grip-r-a')` for
`[data-reorder-handle-id="r-a"]` — the attribute production actually queries.)

**vitest** (`npm test`) — jsdom computes no geometry, so assert the component↔stylesheet contract,
per the file's own convention ("Visual placement is verified in Storybook, not here",
`resource-cell-view.component.test.tsx:216-217`):

- `scripture-text-grid.component.test.tsx` — toggle open→close→open on the same row; a different row
  switches without closing; `aria-expanded` transitions; `aria-controls` matches the region id and is
  absent when closed; Enter/Space parity with click; click ignored while a text selection exists;
  **focus returns to the row after open** (the remount case that breaks the keyboard toggle) and
  after close via both the row and the X button.
- `resource-cell-view.component.test.tsx` — verse grip is rendered, focusable, labeled, carries
  `data-reorder-handle-id`, does not bubble on click, fires `onReorderKeyDown` on ArrowDown; no grip
  without `showDragHandle`; row has `.stg-verse-row`/`.stg-verse-name` (the classes the stylesheet
  scopes on); `--stg-zoom` is on the row and `zoom` is on the child; no `tw:ps-*`/`tw:p-*` on the row
  (guards the reclaimed flush edge); placeholders carry `.stg-verse-name-reserve`. The five existing
  "name persists in downloading/failed/empty" + `aria-hidden` + `dir`/DOM-order tests must pass
  **unmodified** — that is the real regression gate on the restructure.

**Storybook** (`npm run storybook`) — where the shape is actually verified. The existing verse
stories can't do it: `SampleVerse` renders a bare `<div><p>` with no `.editor-input`, so the
`::before` float never matches. Add a `SampleEditorial` stand-in reproducing the real class chain
(precedent: `model-text-panel.stories.tsx:36-46`), then:
`VerseWrapAround`, `VerseWrapAroundRightToLeft`, `VerseFlushInlineStart`, `VerseBadgeAlignmentRow`
(short/medium/long names, all text starting on one column), **`VerseBadgeAlignmentRowZoomed`**
(0.5×/1×/2× — the zoom-compensation proof), `VerseLongNameTruncatedFixedArea`,
`VerseWrapAroundPoetry` (`usfm_q1` hanging indent intact), `VerseZoomedPlaceholder`,
`VerseWithGrip`, `VerseRightToLeftWithGrip`, `VerseExpanded`.
`VerseInlineWrapping`'s doc comment currently documents the *old* behaviour ("later lines stay in
the text column rather than tucking under the name") — that sentence is now exactly backwards and
must be inverted.

**e2e** (`e2e-tests/tests/enhanced-resources/`) — one new geometry spec, local-only
(`test.skip(!!process.env.CI)`, matching `scripture-text-grid-zoom.spec.ts:101`). Storybook checks
the shape against a hand-written stand-in; only e2e checks it against the **real Lexical DOM and the
real cascade**, which is exactly where the `.editor-input`-is-not-a-BFC dependency would fail.
Assert, inside one `evaluate`: the `::before` is a float with non-zero width; `.editor-input` and
`.editor-inner` both compute `overflow: visible` (fails loudly the day upstream adds one); `Range`
rects show line 1 starting after the badge and line 2 at the row edge; every row's line-1 left is
equal within 1px **including after zooming one row**; badge left == row left.
(Note `scripture-text-grid-zoom.spec.ts:111-115` still queries `[role="gridcell"]` while the
component renders `role="listitem"` — that spec looks stale; use `listitem` in the new one and
mention it in the PR.)

**Before committing:** `npm run lint && npm test`. Per memory, skip `npm run typecheck` — lint +
build cover it and it's slow.

---

## Sequencing

1. Worktree + branch off `origin/main`.
2. Confirm the two runtime questions above.
3. Mock fix alone → the three verse-reorder tests go red.
4. Half 3 (grip) → they go green.
5. Half 1 (the wrap-around row + stylesheet + stories).
6. Half 2 (toggle + focus-restore widening + ARIA + tint).
7. Catalog entry, ADR entry, e2e spec.

## Optional — small latent gap, cheap to close here

`localized-strings.test.ts` pins every key set off an *exported* list, but the grid web view's six
keys are file-local `const`s (`scripture-text-grid.web-view.tsx:87-97`) and are covered by nothing.
Extracting a `SCRIPTURE_TEXT_GRID_WEB_VIEW_STRING_KEYS` (mirroring `resource-cell.const.ts`) and
adding one `describe.each` block would close it. Flagged, not assumed — say the word and it's in.

---

## After approval

Per your workflow: this plan → your review → a spec with the actual implementation code written to
`.context/designs/`, presented for approval → implementation.
