# PT-4544 — Implementation spec: Text Collection verse row

> **Frozen record** — approved implementation spec as of 2026-09-18, for the
> `pt-4544-text-collection-verse-row` branch, derived from
> [the approved plan](2026-09-16-text-collection-verse-row-plan.md). Base: `origin/main` at
> `33af3034cc1`; every line anchor below was re-derived against that commit.
> Now that it is implemented, the code is the authority — read the current files rather than this
> document.

PT-4544 · WI-18 · serves TODD-NTH-1.1, TODD-NTH-1.2 and TODD-NTH-1.3's residual · blocked by PT-4543

## How this spec differs from the plan

The plan's reasoning survived re-verification intact. Three things changed.

**1. Every line anchor was wrong.** The plan states `origin/main` as its base but its anchors were
read from the working tree of `pt-find-picker-reference-panels`, three weeks behind main. All
anchors in this spec are re-derived against `33af3034cc1`. The corrections:

| Plan | Actual on main |
| --- | --- |
| `resource-cell-view.component.tsx:277-278` (zoom) | `:299-300` |
| `resource-cell-view.component.tsx:287-298` (inline branch) | `:309-320` |
| `resource-cell-view.component.tsx:306-330` (grip) | `:328-352` |
| `resource-cell.component.tsx:221` (nameDisplay) | `:237` |
| `scripture-text-grid.web-view.tsx:190` (chapterContext state) | `:203` |
| `scripture-text-grid.component.tsx:358-366` (activate) | `:360-366` |
| `scripture-text-grid.component.tsx:373-420` (listitem) | `:374-421` |
| `keyboard-shortcuts.data.ts:235` / `:263` | `:533` / `:561` |
| `_usj-nodes.scss:638-640` / `:789-797` | `:639-641` / `:790-798` |
| test mock at `:426-467` | mock is `:12-48`; that range is the three verse-reorder *tests* |
| `_editor-overrides.scss` "@use'd by all three web-view entry points" | **four** web views, plus `_editor.scss` and `_simple-mode.scss` |

Correct as written: `scripture-text-grid.component.tsx:165-170`, `:176-182`, `:429-438`, and
`scripture-text-grid.web-view.tsx:87-97`.

**2. Both runtime questions are answered, and one changes the scope.** Measured in the running app
on this base:

- **`min-height: 150px` binds.** No override exists anywhere in the repo — the only other
  occurrences are three Storybook stand-ins that replicate the rule. A one-verse `.editor-input`
  carrying the real class chain (`editor-input usfm marker-hidden text-spacing formatted-font`)
  measures **exactly 150px**. Verse rows are floored at 150px today. **Zeroing it for verse cells is
  therefore in scope** — rows cannot align or compact otherwise. (The plan guessed ~180px; it is
  150px, the floor exactly.) This is a visible behaviour change beyond the ticket's letter: call it
  out in the PR.
- **The read-only `Editorial` root is not focusable**: `contentEditable="false"`, `tabIndex=-1`,
  `role="textbox"`, `aria-readonly="true"`. It is out of the tab order, so it never competed for a
  tab stop. Record the inner `role="button"` alternative as viable-but-rejected, not invalid.

**3. The float mechanism is confirmed against the real cascade,** not just argued. Probing the live
editor inside the Text Collection frame:

- `.editor-input` computes `overflow: visible`, `display: block` — **not a block formatting
  context**, in the real Lexical DOM.
- With a 104px `::before` float: line 1 starts at x=134, lines 2-3 at x=18 (the flush content edge).
  134 = 18 (content edge) + 104 (float) + 12 (`text-indent: 2.5vw`).

So the float produces the wrap-around shape **and** composes with the existing paragraph indent
rather than fighting it — which is exactly why a `text-indent` override was rejected.

## One decision the plan never addressed

`_simple-mode.scss:54-58` carries a deliberate, heavily documented decision to **reserve** rather
than **float** the inline-end marker-bar gutter, reasoning "there is no right margin to float over —
`.editor-input` has just 10px of inline padding and `.editor-container` sets `max-width: none`, so
prose wraps to the full panel width and a floating bar would sit on top of text on most wrapped
lines."

That reasoning is about *an element floated over existing text*, which does not shorten line boxes.
This change floats a generated `::before` **inside** `.editor-input`'s own block flow, which does
shorten them — the probe above measures it doing so. The two are not in conflict, but they look
alike at a glance. Say so in the ADR entry and the PR, so the next reader does not think the
precedent was missed.

---

## Half 1 (NTH-1.2) — the wrap-around row

### The shape

A fixed-width badge, out of flow at the row's inline-start, plus a float exclusion inside the
editor's block flow that shortens line 1 by the same amount. Rows align because the badge width is
fixed, not content-sized.

### Zoom contract

Zoom is per-resource, applied as CSS `zoom` on the content wrapper
(`resource-cell-view.component.tsx:299-300`, `:317`). The badge must **not** scale, or a zoomed
row's badge would differ from its neighbours' and rows would stop aligning — defeating the
requirement. So:

- the badge lives **outside** the zoomed subtree and takes no zoom;
- the exclusion lives **inside** it, where Blink multiplies used lengths, so it divides by the
  factor.

```
--stg-zoom: 1.4                  (set inline by React on the row, outside the zoom)
--stg-name-reserve: 6.5rem       = 104px  (badge 6rem + gap 0.5rem)
exclusion inline-size: calc(104px / 1.4) = 74.29px x effective zoom 1.4 = 104px  -> matches the badge
```

`zoomFactor` is clamped to `[0.5, 3]` (`resource-zoom.utils.ts:4,6`), so it is never 0.

### `resource-cell-view.component.tsx` — publish the zoom factor to CSS

The row publishes the factor as a custom property so the exclusion inside the zoomed subtree can
divide by it. `no-type-assertion/no-type-assertion` is `error` repo-wide (`.eslintrc.js:128`), so the
`as React.CSSProperties` spelling used in `shadcn-ui/` is not available here. A type **annotation**
carries the custom property without any suppression:

```tsx
// React.CSSProperties has no index signature for custom properties. Widening the declared type
// (rather than asserting at the use site) keeps this inside the repo's no-type-assertion rule.
const rowStyle: CSSProperties & Record<`--${string}`, string | number> = {
  '--stg-zoom': zoomFactor ?? 1,
};
```

### `resource-cell-view.component.tsx` — replace the inline branch (`:309-320`)

```tsx
{nameDisplay === 'inline' ? (
  // Verse-row cell: the name is a fixed-width badge taken out of flow at the row's inline-start,
  // and `.editor-input::before` (see _scripture-text-grid-verse.scss) is a float of the same width
  // inside the editor's own block flow. Line 1 starts after the badge; line 2+ tuck under it at the
  // flush edge — the PT9 shape, which a flex/grid split cannot produce. The badge is fixed-width so
  // rows align with each other regardless of name length, and sits outside the zoomed subtree so a
  // zoomed row still aligns with its neighbours; the exclusion inside divides by --stg-zoom to
  // compensate.
  <div
    className="stg-verse-row tw:relative tw:flex tw:flex-1 tw:flex-col"
    dir={textDirection}
    style={rowStyle}
  >
    <ResourceNameLabel
      label={label}
      className="stg-verse-name tw:absolute tw:z-10 tw:text-sm"
    />
    <div className="stg-verse-content tw:min-w-0 tw:flex-1 tw:overflow-auto" style={contentStyle}>
      {stateContent}
    </div>
  </div>
) : (
```

The `tw:p-2` that was on the old flex row is gone: the row is flush at the inline edge, which is the
width NTH-1.2 exists to reclaim. Vertical padding moves into the stylesheet so it does not reintroduce
an inline offset.

### `_scripture-text-grid-verse.scss` — new file

Deliberately **not** `_editor-overrides.scss`, which is `@use`d by four web-view entry points plus
`_editor.scss` and `_simple-mode.scss` — these rules target `.editor-input` and must reach only the
grid's verse cells.

```scss
// Verse-row layout for the Text Collection (PT-4544).
//
// The row hangs a fixed-width name badge at the inline-start and reserves the same width on line 1
// of the verse text with a generated float, so line 2+ tuck under the badge. Three facts this
// depends on, each verified against the running app:
//
//   1. `.editor-input` is not a block formatting context (computed `overflow: visible`,
//      `display: block`), so the `::before` float and the `<p>` line boxes share `.editor-container`'s
//      BFC and the float actually shortens the line boxes.
//   2. A float composes with the marker indents in `_usj-nodes.scss` (`.usfm_p` text-indent at :639,
//      `.usfm_q1` hanging indent at :790). A `text-indent` override here would destroy them.
//   3. `float: inline-start` resolves against the element's own `direction`, which `.editor-input`
//      carries from the editor's `textDirection`. RTL needs no second rule — which is why this file
//      contains no [dir] selectors.

.stg-verse-row {
  --stg-name-reserve: 6.5rem; // 6rem badge + 0.5rem gap
  padding-block: 0.5rem;
}

.stg-verse-name {
  inset-inline-start: 0.5rem;
  inset-block-start: 0.5rem;
  inline-size: 6rem; // fixed, NOT max-width: this is what makes rows align
}

// The exclusion lives inside the zoomed subtree, where Blink multiplies used lengths, so divide by
// the factor the row published outside it.
.stg-verse-content .editor-input::before {
  content: '';
  float: inline-start;
  inline-size: calc(var(--stg-name-reserve) / var(--stg-zoom, 1));
  block-size: 1px;
}

// `.editor-input` carries `min-height: 150px` from _editor.scss:34 for the full-panel editors. In a
// verse cell that floors every row at 150px regardless of content, which is measurably what happens
// today. Scope the reset to verse cells so the panel editors keep their floor.
.stg-verse-content .editor-input {
  min-block-size: 0;
}

// Placeholders (downloading / unavailable / bookNotAvailable / failed / empty-verse) are centered
// flex boxes with no line boxes for a float to shorten, so the out-of-flow badge would paint over
// them. Reserve the same width with padding, zoom-compensated the same way.
.stg-verse-name-reserve {
  padding-inline-start: calc(var(--stg-name-reserve) / var(--stg-zoom, 1));
}
```

### `scripture-text-grid.web-view.scss` — one line, after the editor styles

```scss
@use './editor-overrides';
@use './scripture-text-grid-verse';
@use './tailwind';
```

It must come **after** `./editor`/`./editor-overrides`, whose `.editor-input` min-height the verse
rows override, and **before** `./tailwind`. Not last: `./tailwind` resolves to a plain `.css` file,
so Sass inlines its ~3,100 rules at that point and rejects any `@use` that follows real CSS rules
(`@use rules must be written before any other rules`). Ordering against Tailwind does not otherwise
matter here — the verse rules set logical-box properties on their own classes, which no utility on
these elements touches.

### Placeholder wrappers — `resource-cell-view.component.tsx:222` and `:267`

Both centered wrappers take `stg-verse-name-reserve` when `nameDisplay === 'inline'`. The class is
inert in chapter mode because the stylesheet scopes the reserve variable to `.stg-verse-row`.

---

## Half 2 (NTH-1.1) — the toggle

Pure derivation — **no new state**. `chapterContext` already lives in the web view
(`scripture-text-grid.web-view.tsx:203`) and `onChapterContextClose` already exists.

### `scripture-text-grid.component.tsx` — replace `activate` (`:360-366`)

```tsx
const isOpen = chapterContext?.resourceId === resource.resourceId;
// Activating a verse item latches the focus-restore target and toggles this resource's chapter
// context. Shared by the click and keyboard paths so they can never drift apart. Clicking a
// different row switches the split rather than closing it.
const activate = onChapterContextChange
  ? () => {
      focusRestoreResourceIdRef.current = resource.resourceId;
      if (isOpen) onChapterContextClose?.();
      else onChapterContextChange(resource);
    }
  : undefined;
```

### The focus bug this exposes — must be fixed here

The effect at `:176-182` restores focus only on *close* (`if (chapterContext) return;`). The verse
column remounts on **both** transitions — it moves between a bare wrapper (`:451-453`) and a
`ResizablePanel` (`:460-462`) — so on open the focused row is destroyed and focus lands on `<body>`.
Today that is merely unpolished; with a toggle it means **Enter opens the split and you cannot press
Enter again to close it**. The keyboard toggle is dead on arrival without this.

Widen the same effect — one ref, one selector, no parallel mechanism:

```tsx
// Return focus to the listitem that opened or closed the split (WCAG 2.4.3). The verse column
// remounts on BOTH transitions (bare wrapper <-> ResizablePanel), so restore on every change, not
// only on close, or the keyboard toggle cannot fire twice. Restore by identity (resourceId) against
// the freshly-rendered DOM, not by a stale element reference. Uses data-resource-id (always present)
// rather than data-project-id (absent for unavailable resources whose projectId is undefined).
useEffect(() => {
  const resourceId = focusRestoreResourceIdRef.current;
  if (!resourceId) return;
  // Clear the latch only once the split is closed, so a later Escape/X close still has a target.
  if (!chapterContext) focusRestoreResourceIdRef.current = undefined;
  gridRef.current?.querySelector<HTMLElement>(`[data-resource-id="${resourceId}"]`)?.focus();
}, [chapterContext]);
```

### The disclosure control lives beside the content, not around it

`aria-expanded` is not in ARIA 1.2's supported set for `listitem`, and `jsx-a11y`'s
`role-supports-aria-props` enforces that. Putting the disclosure on the row itself therefore needs a
suppression and risks an assistive technology dropping the state.

A control *wrapping* the row is not available either: the row contains the reorder grip and the
editor's contenteditable surface, so a wrapper would nest interactive content inside a button —
invalid for `<button>` and the `nested-interactive` anti-pattern for `role="button"`.

So the row's **name** is the control (`ResourceNameDisclosure` in `resource-cell-view.component.tsx`),
a sibling of the verse content:

- it is a real `<button>`, so Enter and Space activate it with no key handler of our own;
- it carries the accessible name, `aria-expanded`, and `aria-controls` while open;
- it carries `data-disclosure-control`, which is what the grid's focus-restore effects query;
- the `listitem` keeps `data-resource-id` (the zoom hook and drag handlers rely on it) and is named
  by `aria-label` **only when no control exists to name it**, so the name is never announced twice.

The row keeps an `onClick` as a pointer-only convenience for the enlarged hit area. That still needs
`jsx-a11y/no-noninteractive-element-interactions` suppressed — correctly, since the row deliberately
is *not* the control and must not add a second tab stop.

Tab order per verse row is therefore: name control, then the reorder grip when reorder is on.

### Click-during-selection guard

A click that ends a text drag-selection inside the verse would otherwise close the split mid-copy and
destroy the selection the right-click Copy item depends on. Guard the click path only, not
Enter/Space:

```tsx
onClick={
  activate
    ? () => {
        // A click that ends a drag-selection inside the verse must not toggle the split: it would
        // destroy the selection the context-menu Copy item reads.
        if (window.getSelection()?.toString().trim()) return;
        activate();
      }
    : undefined
}
```

---

## Half 3 (NTH-1.3 residual) — the verse grip

**No prop plumbing needed.** Every prop already arrives: `reorderHandleId` from
`resource-cell.component.tsx:247`, the rest from `scripture-text-grid.component.tsx:429-438`. The
only defect is that the `inline` branch never renders them — the grip block sits inside the
`'header'` branch at `:328-352`. So **keyboard reorder in verse mode is currently unreachable**,
while the keyboard-shortcuts catalog already claims it works.

Extract the existing block verbatim into a local `ReorderGrip` so **chapter mode stays
byte-identical**, then render it in the inline branch too:

```tsx
function ReorderGrip({ reorderHandleId, reorderHandleLabel, reorderHint, onReorderKeyDown, className }: ReorderGripProps) {
  // Nested tooltip on the grip so `reorderHint` shows on hover AND keyboard focus. Its own
  // provider/tooltip keeps it independent of the name-truncation tooltip.
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            data-reorder-handle-id={reorderHandleId}
            aria-label={reorderHandleLabel}
            // A grip click must not bubble to the enclosing cell wrapper (whose click may activate
            // the chapter-context split); the grip only starts a reorder.
            onClick={(event) => event.stopPropagation()}
            onKeyDown={onReorderKeyDown}
            className={className}
          >
            <GripVertical className="tw:h-4 tw:w-4" />
          </Button>
        </TooltipTrigger>
        {reorderHint ? <TooltipContent>{reorderHint}</TooltipContent> : undefined}
      </Tooltip>
    </TooltipProvider>
  );
}
```

In the inline branch, pinned at the inline-end of the already-reserved badge area, revealed on
hover / `group-focus-within` / `focus-visible` and always visible on touch — the same policy the zoom
kebab already uses at `:369-371`:

```tsx
{showDragHandle ? (
  <ReorderGrip
    reorderHandleId={reorderHandleId}
    reorderHandleLabel={reorderHandleLabel}
    reorderHint={reorderHint}
    onReorderKeyDown={onReorderKeyDown}
    className="stg-verse-grip tw:absolute tw:z-20 tw:h-6 tw:w-6 tw:shrink-0 tw:cursor-grab tw:text-muted-foreground tw:opacity-0 tw:group-hover:opacity-100 tw:group-focus-within:opacity-100 tw:focus-visible:opacity-100 tw:[@media(hover:none)]:opacity-100"
  />
) : undefined}
```

This costs **zero** added row width — the area is reserved either way — and never overlays verse
text, because the float exclusion already keeps text out of it. Accepted cost: on a row whose short
name truncates, the revealed grip overlaps the ellipsis; it is hover-only and the truncation tooltip
still conveys the full name.

Carrying `data-reorder-handle-id` makes the keyboard-reorder focus restore at `:165-170` start
working with no change to that effect.

---

## The test mock currently hides the grip bug — fix it first

`scripture-text-grid.component.test.tsx:12-48` mocks `ResourceCell` with a grip that renders whenever
`showDragHandle` is truthy, **ignoring `viewMode`** (it sets `data-view-mode` at `:28` but gates the
grip only on `showDragHandle` at `:30`). Three tests at `:425-465` pass green today against DOM the
app cannot produce:

- `ArrowDown moves one position` (`:446`)
- `ArrowUp is a no-op at the boundary` (`:461`)
- `grip click does not trigger chapter-context activation`

**Land the mock fix on its own, first, and watch those three go red — that red is the proof of the
bug.** Change the mock to delegate to the real `ResourceCellView` with
`nameDisplay={viewMode === 'verse' ? 'inline' : 'header'}`, so it cannot drift again. Requires
porting the `ResizeObserver` / `hasPointerCapture` / `scrollIntoView` stubs from
`resource-cell-view.component.test.tsx:24-50`, and swapping `getByTestId('grip-r-a')` for
`[data-reorder-handle-id="r-a"]` — the attribute production actually queries.

---

## Files

| File | Change |
| --- | --- |
| `.../scripture-text-grid/resource-cell-view.component.tsx` | Rewrite the inline branch (`:309-320`); extract `ReorderGrip` from `:328-352`; add `--stg-zoom` row style; add `stg-verse-name-reserve` to the placeholder wrappers (`:222`, `:267`). Header branch byte-identical. |
| `.../platform-scripture-editor/src/_scripture-text-grid-verse.scss` | **New.** Badge / exclusion / min-height reset / reserve rules. |
| `.../platform-scripture-editor/src/scripture-text-grid.web-view.scss` | One `@use './scripture-text-grid-verse';`, after the editor styles and before `./tailwind`. |
| `.../scripture-text-grid/scripture-text-grid.component.tsx` | `useId` import; `chapterContextPanelId`; widen the focus-restore effect (`:176-182`); `isOpen` + toggling `activate` (`:360-366`); `aria-expanded`/`aria-controls` + tint + selection guard on the listitem (`:374-421`); `id` on the split region (`:465-472`); extend the eslint-suppression comment (`:369-373`). |
| `.../scripture-text-grid/resource-cell.component.tsx` | **No change** — `nameDisplay` (`:237`) and every reorder prop (`:246-249`) already flow correctly. |
| `src/stories/keyboard-shortcuts.data.ts` | `scripture-text-grid-open-chapter-context` (`:533`) purpose becomes "Open **or close** the chapter-context view for the focused cell". `scripture-text-grid-reorder-cell` (`:561`) already claims verse up/down — it becomes true rather than needing an edit. |
| `.context/standards/Architecture-Decisions.md` | Append: the float-exclusion mechanism (why a generated float inside the editor's block flow, not `text-indent` or a flex split); the zoom-compensation contract; the `.editor-input`-is-not-a-BFC dependency; the verse-scoped `min-height` reset; and why this does not contradict `_simple-mode.scss`'s reserve-not-float decision. |

**Localization: nothing to add.** Every key already exists in both `en` and `es` in
`extensions/src/platform-scripture-editor/contributions/localizedStrings.json` —
`_cell_reorderHandle` (`:172`), `_cell_reorderHint` (`:173`), `_cell_reorderAnnouncement` (`:171`),
`_aria_chapterContextClosed` (`:165`), `_aria_chapterContextOpened` (`:166`). The toggle-close path
routes through the existing `handleCloseChapterContext`, so the close announcement fires for free.
`assets/localization/en.json` has zero `scriptureTextGrid` keys, so the epic's `en.json` cross-lane
conflict chokepoint does not apply.

### Reuse — existing code this builds on rather than replacing

- `useTruncationTooltip` (`lib/platform-bible-react/src/hooks/use-truncation-tooltip.hook.ts`) —
  keeps working; a fixed `inline-size` plus `position: absolute` makes its
  `scrollWidth > clientWidth` check *more* deterministic than today's `max-w-24`.
- `focusRestoreResourceIdRef` + the `[data-resource-id]` selector — widened, not duplicated.
- `handleChapterContextChange` / `handleCloseChapterContext` / the Escape listener
  (`scripture-text-grid.web-view.tsx:224-231`) — unchanged; the toggle routes through them.
- The `tw:group` hover/focus-visible reveal pattern already on the zoom kebab (`:369-371`) — reused
  verbatim for the grip.
- `resource-cell.const.ts`'s exported-key-list pattern — the model if we extract the web view's
  string keys (see Optional).

---

## Verification

**vitest** (`npm test`) — jsdom computes no geometry, so assert the component-to-stylesheet contract,
per the file's own convention ("Visual placement is verified in Storybook, not here",
`resource-cell-view.component.test.tsx:216-217`):

- `scripture-text-grid.component.test.tsx` — toggle open/close/open on the same row; a different row
  switches without closing; `aria-expanded` transitions; `aria-controls` matches the region id and is
  absent when closed; Enter/Space parity with click; click ignored while a text selection exists;
  **focus returns to the row after open** (the remount case that breaks the keyboard toggle) and
  after close via both the row and the X button.
- `resource-cell-view.component.test.tsx` — verse grip is rendered, focusable, labeled, carries
  `data-reorder-handle-id`, does not bubble on click, fires `onReorderKeyDown` on ArrowDown; no grip
  without `showDragHandle`; row carries `.stg-verse-row` / `.stg-verse-name` / `.stg-verse-content`
  (the classes the stylesheet scopes on); `--stg-zoom` is on the row and `zoom` on the child; no
  `tw:ps-*` / `tw:p-*` on the row (guards the reclaimed flush edge); placeholders carry
  `.stg-verse-name-reserve`. The five existing "name persists in downloading/failed/empty" +
  `aria-hidden` + `dir`/DOM-order tests must pass **unmodified** — that is the real regression gate.

**Storybook** (`npm run storybook`) — where the shape is verified. The existing verse stories cannot
do it: `SampleVerse` (`resource-cell-view.component.stories.tsx:89`) renders a bare `<div><p>` with
no `.editor-input`, so the `::before` float never matches. Add a `SampleEditorial` stand-in
reproducing the real class chain (precedent: `model-text-panel.stories.tsx:36-46`), then:
`VerseWrapAround`, `VerseWrapAroundRightToLeft`, `VerseFlushInlineStart`, `VerseBadgeAlignmentRow`
(short/medium/long names, all text starting on one column), **`VerseBadgeAlignmentRowZoomed`**
(0.5x/1x/2x — the zoom-compensation proof), `VerseLongNameTruncatedFixedArea`,
`VerseWrapAroundPoetry` (`usfm_q1` hanging indent intact), `VerseZoomedPlaceholder`, `VerseWithGrip`,
`VerseRightToLeftWithGrip`, `VerseExpanded`.

`VerseInlineWrapping`'s doc comment (`:254-257`) currently documents the *old* behaviour — "later
lines stay in the text column rather than tucking under the name". That sentence is now exactly
backwards and must be inverted.

**e2e** (`e2e-tests/tests/enhanced-resources/`) — one new geometry spec, local-only
(`test.skip(!!process.env.CI)`, matching `scripture-text-grid-zoom.spec.ts:101`). Storybook checks the
shape against a hand-written stand-in; only e2e checks it against the **real Lexical DOM and the real
cascade**, which is where the `.editor-input`-is-not-a-BFC dependency would fail. Assert, inside one
`evaluate`: the `::before` is a float with non-zero width; `.editor-input` and `.editor-inner` both
compute `overflow: visible` (fails loudly the day upstream adds one); `Range` rects show line 1
starting after the badge and line 2 at the row edge; every row's line-1 left equal within 1px
**including after zooming one row**; badge left == row left; and a verse row's height is below the
old 150px floor for a one-line verse.

Note `scripture-text-grid-zoom.spec.ts:111-115` still queries `[role="gridcell"]` while the component
renders `role="listitem"` — that spec looks stale; use `listitem` in the new one and mention it in
the PR.

**Before committing:** `npm run lint && npm test`. Per the user's standing preference, skip
`npm run typecheck` — lint + build cover it and it is slow.

---

## Sequencing

1. Worktree + branch off `origin/main`. *(Done: `pt-4544-text-collection-verse-row` at
   `.claude/worktrees/pt-4544-verse-row`.)*
2. Mock fix alone -> the three verse-reorder tests go red.
3. Half 3 (grip) -> they go green.
4. Half 1 (wrap-around row + stylesheet + stories).
5. Half 2 (toggle + focus-restore widening + ARIA + tint + selection guard).
6. Catalog entry, ADR entry, e2e spec.

## Optional — small latent gap, cheap to close here

`localized-strings.test.ts` pins every key set off an *exported* list, but the grid web view's six
keys are file-local `const`s (`scripture-text-grid.web-view.tsx:87-97`) and are covered by nothing.
Extracting a `SCRIPTURE_TEXT_GRID_WEB_VIEW_STRING_KEYS` (mirroring `resource-cell.const.ts`, which
exports nine such keys) and adding one `describe.each` block would close it. Flagged, not assumed.
