# Text Collection: follow the scroll group's verse in chapter surfaces

> **Frozen record** — approved design as of 2026-09-16, for the `pt-4543-chapter-verse-scroll`
> branch, based on `pt-4184-grid` ([#2781](https://github.com/paranext/paranext-core/pull/2781)).
> Once implemented, the code is the authority; read the current files rather than this document.

## Changed during implementation

The shipped code departs from the design below in these ways; each is the current rule.

- **Echo latch added, reversing decision 4.** A click deep inside a long verse publishes a verse
  whose marker is above the fold, so "leave a visible verse alone" does not cover it. Chapter cells
  pass `publishedScrRefRef` and the hook skips the echo.
- **Marker visibility rule.** Chapter cells pass `isMarkerFullyInPortView` as `isTargetVisible`:
  a one-line marker must fit completely, where `isBlockInPortView` (still the grid's default) counts
  any part showing.
- **Lead-in.** Chapter cells pass `VERSE_NUMBER_SCROLL_OFFSET` as `leadInPx`; the grid stays flush.
- **Visibility is a parameter.** The hook takes `isViewVisible` rather than calling
  `useViewVisibility`, so its tests pass a value instead of mocking the hook.
- **Readiness and chapter gate.** A chapter cell enables the hook only when it is `ready` and its
  USJ names the reference's chapter (`isUsjForChapter`); otherwise a navigation scrolls the chapter
  being left, and the loading placeholder's clamp stands the hook down.
- **Zoom moved below the port.** `'box'` zoom sits on `[data-cell-pad]`, not on the
  `[data-cell-content]` scroll port, because CSS `zoom` on the port breaks the `scrollTop` math.
- **Single-resource layout rebuilt.** Its wrapper no longer scrolls; a flex chain gives the cell a
  height so its own content box is the scroll port.

PT-4543 · duplicates PT-4170 · blocks PT-4544 (WI-18)

## Problem

Clicking a verse row in the Text Collection opens the **chapter-context pane** — a full-chapter
Scripture view beside the verse column. It renders the chapter at the top and never scrolls to the
verse, and it does not move when the shared reference changes. In Simple mode, where column 3 shows
one tab at a time, the pane is usually hidden when the reference moves and shows a stale position on
activation.

One premise in the ticket is wrong, and building on it would produce the wrong fix:

- **The grid is not unsynced.** `createScriptureTextGridWebViewProvider` in
  `platform-scripture-editor`'s `main.ts` pins it to scroll group 0 in Simple mode, and in its
  default `viewMode: 'verse'` each cell renders *only* the target verse via `sliceUsjToVerse`
  (`resource-cell.component.tsx`) — there is nothing to scroll. The gap exists only on the surfaces
  that render a whole chapter: the chapter-context split pane, chapter-mode columns, and the
  single-resource full-width view.

The ticket's other claims about the test surface hold up. `scroll-group-sync.spec.ts` really is
Power-pinned (`test.use({ interfaceMode: 'power' })`, a first-class `isolated.fixture` option the
fixture asserts the app came up in) and editor-only, so Simple mode genuinely has no scroll-group
coverage.

## Decisions

1. **Parameterize #2781's scroll hook; do not extract the older settle loop.** #2781's
   `useAlignedReferenceScroll` is already a general reference-scroll controller with exactly one
   layout-specific dependency — how to find the element representing a verse. That becomes a
   parameter. See *Why not the settle loop*.
2. **One code path for all three chapter surfaces.** The hook is called from `ResourceCell` gated on
   `viewMode === 'chapter'`, which is what every chapter surface renders through. Gating narrower
   would need an extra prop threaded down — more code for less behavior.
3. **Verse mode gets nothing, deliberately.** The slice *is* the verse.
4. **No echo latch.** "Leave a verse that is already on screen alone" makes
   `isEchoOfPublishedScrRef` unnecessary: a click inside a chapter cell publishes a reference that
   is, by construction, already visible.
5. **Base the branch on `pt-4184-grid`, merge after #2781.** Basing on `main` would mean authoring
   near-duplicates of #2781's scroll utils and reconciling two implementations in one directory
   later.

## Why not the settle loop

`resource-text-panel.component.tsx:405-487` (on `main`) solves the same shape of problem for the
Bible texts / Commentaries panel. It is the weaker of the two:

| Concern | Settle loop | #2781's hook |
| --- | --- | --- |
| Hidden tab | `!isViewVisible` early-returns; catch-up is incidental and **smooth** | `useRunWhenVisible` + `useViewVisibility`; catch-up **instant by construction** |
| Waiting for content | rAF loop sampling `.editor-container` `scrollHeight` | `MutationObserver`, coalesced to ≤1 check per frame |
| Late content pushing the target off screen | not handled | re-checks as content arrives |
| Reader's own scroll | not handled | stands down until the reference changes |
| Content *shrinking* (resource unchecked, zoom out) | not handled | distinguishes a browser `scrollTop` clamp from the reader |
| The view's own echo | needs an `isEchoOfPublishedScrRef` latch | obviated |

It also carries a bug that short ports make likely. `scrollToVerse` returns the verse element
whether or not it scrolled, and `findScrollContainer` defaults to `requireOverflow: true`:

```ts
const scrollContainerElement = scrollStartElement ? findScrollContainer(scrollStartElement) : undefined;
if (scrollContainerElement) { /* scrollTo */ }
return verseElement;          // returned even when no container was found
```

The loop records success on that return value, so while the marker exists but the box has not yet
outgrown its port, nothing scrolls and `lastScrolledForRef` is marked done — never retried. In a
45%-of-300px chapter-context pane that window is wide.

Only `scrollToVerse`'s **selector** transfers. Its math (`findScrollContainer` +
`getTopWithinScrollContainer` + hardcoded `behavior: 'smooth'`) is superseded by an explicit port
and `scrollPortToBlock`.

## Why the port math needs no branch

`getFirstVisibleY` (in `aligned-scroll.utils.ts`) reads:

```ts
port.querySelector<HTMLElement>('[data-cell-header]')?.getBoundingClientRect().height ?? 0
```

In #2781's header layout the `[data-cell-header]` band is a **sibling** of the scroll box, not a
descendant (`resource-cell-view.component.tsx:386` and `:460`):

```tsx
<div data-cell-header …>                                       {/* :386 */}
<div data-cell-content className={`tw:flex-1 ${contentOverflowClass}`}>   {/* :460 */}
```

So in chapter mode, where the port *is* `[data-cell-content]` (`contentOverflow` defaults to
`'auto'`), the query returns null → zero header offset → the origin is the port's top edge plus
`clientTop`. Correct. In aligned mode the port is the grid root and the sticky headers *are*
descendants → their height counts. One function, both modes.

Consequence for maintainers: **do not move `[data-cell-header]` inside the content box.** That
adjacency is load-bearing, and a test pins it.

Chapter surfaces always have the marker: `nameDisplay={viewMode === 'verse' ? 'inline' : 'header'}`,
and `data-cell-content` exists only in the header branch. The inline branch (`:375`) has no marker
and needs none.

## Components

### `reference-scroll.utils.ts` — renamed from `aligned-scroll.utils.ts` (`git mv`)

`isPlacedBlock`, `findVerseBlockForVerse`, `getFirstVisibleY`, `isBlockInPortView` and
`scrollPortToBlock` are unchanged. Adds the finder type and the chapter-mode finder:

```ts
/**
 * Finds the element to bring into view for a verse, searched within one scroll port.
 *
 * The two Text Collection layouts expose different verse anchors — the block-verse layout wraps
 * each verse in a placed element, the inline layout emits only a marker span — so the lookup is a
 * parameter of {@link useReferenceScroll} rather than baked into it.
 */
export type VerseTargetFinder = (port: ParentNode, verseNum: number) => HTMLElement | undefined;

/** The inline layout's verse anchor. `data-number` may be a range (`"14-15"`) or partial (`"3a"`). */
const VERSE_MARKER_SELECTOR = 'span[data-marker="v"][data-number]';

/**
 * The verse marker to scroll to for a reference, in a cell rendering the editor's inline layout.
 *
 * The chapter-mode counterpart of {@link findVerseBlockForVerse}, and deliberately the same rule:
 * prefer a marker starting exactly at the verse, else the nearest marker starting before it. That
 * fallback is what lands a reference inside a bridge — `\v 14-15` emits no `[data-number="15"]`, so
 * an exact match alone finds nothing and the reference would never resolve. It also puts a
 * reference in a versification gap on the preceding verse, and a reference above the first marker
 * (verse 0 front matter) at the top of the chapter.
 *
 * Unlike the aligned finder there is no upper bound to respect: the inline layout places no verse on
 * a fixed row, so every rendered marker is a candidate.
 *
 * @param port Element containing the rendered markers — one cell's content box.
 * @param verseNum Verse to scroll to.
 * @returns The marker to bring into view, or `undefined` when none has rendered yet, which callers
 *   use to tell "the chapter has not arrived" from "the verse is missing".
 */
export function findVerseMarkerForVerse(
  port: ParentNode,
  verseNum: number,
): HTMLElement | undefined {
  // The common case — the reference names a verse the chapter starts — is answerable without
  // collecting every marker, and this runs on each frame in which the cell's editor mutates.
  if (Number.isInteger(verseNum) && verseNum >= 1) {
    const exact = port.querySelector<HTMLElement>(
      `span[data-marker="v"][data-number="${verseNum}"]`,
    );
    if (exact) return exact;
  }

  const markers = [...port.querySelectorAll<HTMLElement>(VERSE_MARKER_SELECTOR)];
  const [firstMarker] = markers;
  if (!firstMarker) return undefined;
  // A non-finite verse can only come from a malformed reference; nothing is "nearest" to it, so the
  // top of the chapter is the only defensible answer (and matches a verse-0 reference).
  if (!Number.isFinite(verseNum)) return firstMarker;

  let best: HTMLElement | undefined;
  let bestStart = Number.NEGATIVE_INFINITY;
  markers.forEach((marker) => {
    const { start } = parseVerseRange(marker.dataset.number ?? '');
    if (!Number.isFinite(start) || start > verseNum || start <= bestStart) return;
    best = marker;
    bestStart = start;
  });
  // A reference above every marker belongs at the top of the chapter.
  return best ?? firstMarker;
}
```

`parseVerseRange` is reused from `verse-display.utils.ts`; it already handles `"14-15"`, `"3a"` and
`"1-3a"`. The bridge case needs no special branch — nearest-preceding resolves verse 15 to the
`14-15` marker because `parseVerseRange("14-15").start === 14`.

### `use-reference-scroll.hook.ts` — renamed from `use-aligned-reference-scroll.hook.ts` (`git mv`)

```ts
export function useReferenceScroll(
  portRef: RefObject<HTMLElement | null>,
  scrRef: SerializedVerseRef,
  findTarget: VerseTargetFinder,
  options?: {
    /**
     * When `false` the hook does nothing at all — no geometry reads, no observer. For a cell whose
     * layout is scrolled by an ancestor instead (aligned mode) or that has nothing to scroll to
     * (verse mode), where a React hook still has to be called unconditionally.
     */
    isEnabled?: boolean;
  },
): void
```

Three edits to #2781's body; nothing else moves, and the existing comments stay:

1. `const { isEnabled = true } = options ?? {};` — the default keeps the aligned call site's
   behavior identical.
2. In the `useRunWhenVisible` callback: `if (!isEnabled) return;` first, and
   `findVerseBlockForVerse(port, scrRef.verseNum)` becomes `findTarget(port, scrRef.verseNum)`.
   Both reads are current, because `useRunWhenVisible` invokes `run` at its latest identity — so
   callers need not memoize `findTarget`.
3. The `MutationObserver` effect returns early when `!isEnabled` and lists it as a dependency.
   `requestScroll`'s identity is stable, so this is the only new dependency and the observer is
   rebuilt only when the mode actually changes.

Untouched: `appliedScrollTopRef` and the `SCROLL_MATCH_TOLERANCE_PX` clamp comparison,
`hasStoodDownRef`, the `targetReference` string key, and the reset-on-reference-change effect.

`aligned-grid.component.tsx:49` becomes `useReferenceScroll(portRef, scrRef, findVerseBlockForVerse);`.

### `resource-cell-view.component.tsx`

One new prop, wired to the existing marked div. No layout change.

```ts
  /**
   * Ref to this cell's scrollable content box, for a caller that scrolls the cell itself
   * (`contentOverflow="auto"`). Only the header layout wires it — the inline layout's verse row has
   * nothing to scroll to, since the cell is already reduced to the reference's verse.
   */
  contentRef?: Ref<HTMLDivElement>;
```

`ref={contentRef}` on the `data-cell-content` div at `:460`.

### `resource-cell.component.tsx`

```ts
// React's ref API requires `null` as the initial value for DOM refs.
// eslint-disable-next-line no-null/no-null
const contentRef = useRef<HTMLDivElement>(null);

// Chapter surfaces render a whole chapter in a short port, so they have to follow the scroll
// group's verse themselves. The other two modes deliberately do not:
//   - verse mode has nothing to scroll to — `sliceUsjToVerse` has already reduced the cell to the
//     reference's verse;
//   - aligned mode hands its scrolling to the grid root, which owns the only port in that view
//     (`contentOverflow="visible"`), and `AlignedGrid` runs this same hook there.
//
// Hidden case (.claude/rules/cross-view-sync-hidden-views.md): handled inside the hook, which
// defers through `useRunWhenVisible` and consumes the catch-up instantly — `scrollPortToBlock` is
// `scrollTop` arithmetic, so there is nothing to animate from on tab activation. In Simple mode
// this is the common path: column 3 shows one tab at a time.
useReferenceScroll(contentRef, scrRef, findVerseMarkerForVerse, {
  isEnabled: viewMode === 'chapter',
});
```

plus `contentRef={contentRef}` on the `<ResourceCellView>` call.

**Verify while implementing:** #2781 rewrote `scripture-text-grid.component.tsx` (+98/−107) and added
`resource-column.component.tsx`, so confirm all three chapter surfaces still reach `ResourceCell`
with `viewMode === 'chapter'`.

### `main.ts` — correct a false comment

`createResourceTextPanelProvider` (~:1115) claims Bible texts and Commentaries "are not scroll-synced
with the scripture editor in simple mode". The provider never sets `scrollGroupScrRef`, and an absent
value resolves to group 0 (`use-scroll-group-scr-ref.hook.ts:101`) — so they *do* follow it. Replace
with what the code does:

```ts
// Deliberately leaves `scrollGroupScrRef` alone rather than pinning it: these panels inherit
// whatever the saved layout carries, and an absent value resolves to scroll group 0
// (`use-scroll-group-scr-ref.hook.ts`), so they follow the shared reference like the editor does.
// Pinning would also overwrite a Power-mode user's explicit choice of a different group.
```

### ADR

Append to `.context/standards/Architecture-Decisions.md` in slug byte order — #2781 changed the
convention from numbered headings to slugs:

`## adr-one-reference-scroll-hook-parameterized-by-verse-anchor: The Text Collection has one reference-scroll controller, parameterized by how a verse is found`

Context: two layouts, two anchors. Decision: one hook, finder injected; the port math is shared
because it derives its origin from a header lookup that is correctly empty when the header sits
outside the port. Alternatives rejected: a second hand-rolled loop per layout; extracting the older
settle loop (see *Why not the settle loop*). Consequence: the reference panel still runs the older
loop, and converging it is a follow-up.

No keyboard handlers change, so `src/stories/keyboard-shortcuts.data.ts` is untouched.

## Hidden case

Required by `.claude/rules/cross-view-sync-hidden-views.md`, and the common path here rather than the
edge: in Simple mode column 3 shows one tab at a time, so the pane is usually hidden when the
reference moves.

- **Live:** the reference change requests a scroll immediately; a verse already on screen is left
  alone.
- **Hidden:** `useRunWhenVisible` defers the request. Repeats collapse into one pending catch-up, so
  a reader who moves through six verses while the tab is inactive gets one scroll, at the last
  reference, on activation.
- **Catch-up is instant, not animated** — `scrollPortToBlock` is `scrollTop` arithmetic, so there is
  nothing to animate from. No behavior parameter is needed.
- The stand-down flag is only ever set from inside `requestScroll`, which runs only while visible, so
  a hidden pane's clamped `scrollTop` can never be mistaken for the reader.

Called out at the sync site (see `resource-cell.component.tsx` above) **and** required in the PR
description, per the rule.

## Testing

### `reference-scroll.utils.test.ts` (extend the renamed file)

Follow its existing style — `// @vitest-environment jsdom`, a builder factory, ports detached from
the document since the finders need no layout. Add a `buildChapterPort(markers)` emitting
`span[data-marker="v"][data-number]`.

| Case | Expectation |
| --- | --- |
| `['1','2','3']`, verse 2 | the `2` marker |
| `['1','14-15','16']`, verse 15 | the `14-15` marker — the bridge an exact match cannot reach |
| `['1','2','4']`, verse 3 | the `2` marker (versification gap → preceding verse) |
| `['1','2']`, verse 0 | the `1` marker (front matter → top of chapter) |
| `['1','2']`, verse 99 | the `2` marker (past the end → last marker, not `undefined`) |
| no markers rendered | `undefined` — "chapter not arrived", so the caller waits |
| `['3a','3b']`, verse 3 | the `3a` marker (partials parse to start 3; document order wins) |

Plus one case with the port as a chapter cell's `[data-cell-content]` and `[data-cell-header]` as its
**sibling**, asserting `isBlockInPortView` / `scrollPortToBlock` take a zero header offset. That
premise is load-bearing, so it is pinned rather than inferred.

### `use-reference-scroll.hook.test.tsx` (new — the hook's first direct test)

`renderHook`, with `isViewVisible` driven by a mocked `useViewVisibility` (the mutable-flag pattern
from `character-marker-bar-overlay.component.test.tsx:47-51`), a stub `findTarget`, and a fake port
with scripted `scrollTop` / `scrollHeight` / `clientHeight` / `getBoundingClientRect`.

| Test | Asserts |
| --- | --- |
| deferred catch-up | Mounted hidden, reference changes, nothing scrolls; on the visibility flip it scrolls exactly once |
| repeats collapse | Several reference changes while hidden produce **one** scroll on activation, at the latest reference |
| catch-up is instant | The catch-up writes `scrollTop` directly and calls no smooth-scroll API |
| visible verse left alone | `isBlockInPortView` true → `scrollTop` unchanged |
| reader stand-down | After a `scrollTop` differing from what the hook wrote, a later mutation does not move the port; a reference change re-arms it |
| shrink clamp is not the reader | `scrollHeight` drops so the browser clamps below what the hook wrote → still treated as the hook's own position |
| re-check as content arrives | A mutation after an unresolved target (finder returns `undefined`, then a marker) produces the scroll |
| disabled mode | With `isEnabled: false`, the finder is called zero times and no observer is attached |

### `resource-cell.component.test.tsx` (extend)

Chapter mode requests a scroll; verse and aligned modes request none. Assert through the injected
finder or the port's `scrollTop`, not by reaching into the hook.

### `use-scroll-group-scr-ref.hook.test.ts` (extend) — the DoD's "pin the behavior it denied"

The comment corrected in `main.ts` denied that Bible texts and Commentaries follow the group in
Simple mode. What actually makes them follow it is the hook's `?? 0` default, and none of that
file's existing cases covered it. Four cases, contrasting with the detached-view block above them:
an absent `scrollGroupScrRef` reports group `0` rather than no group; an update published to group 0
is followed; **an update published to a different group is ignored** (without which a hook that
followed every group would pass); and a new reference is published to group 0 rather than written
back to the view definition.

### No E2E, deliberately

The ticket's Testing Ideas never ask for E2E — they ask for a "Simple-mode scroll-group test", and
its own framing points at `scroll-group-sync.spec.ts`, which is why an E2E looks implied. Three
facts say the unit tests above are the better answer:

- **CI runs only `test:e2e:smoke`.** Neither the `isolated` nor the `enhanced-resources` project is
  wired into CI, so no placement buys CI protection; both are local harnesses.
- **The two candidate lanes are mutually exclusive.** `tests/isolated/` launches its own Electron
  and its `globalSetup` aborts when port 8876 is bound — exactly the state the `cdp.fixture` specs
  in `tests/enhanced-resources/` (which own the grid's page object) require.
- **Opening the chapter-context pane needs a real resource in the Text Collection**, which is why
  every existing grid spec gates on `E2E_TEST_RESOURCE_IDS` and skips without it, and why
  `enhanced-resources` is marked local-only. Simple mode also renders no dock tabs, so a Simple
  variant could not reuse `scroll-group-sync.spec.ts`'s shape.

If a standing local harness is wanted later, it belongs in `tests/enhanced-resources/` beside the
other grid specs, using `cdp.fixture` + `scripture-text-grid.page.ts` + `E2E_TEST_RESOURCE_IDS`, and
labeled local-only. Verify by hand in the app meanwhile (see Commands).

### Commands

```bash
npm test -- extensions/src/platform-scripture-editor --run   # the hook, the finders, the cell
npm run test:core -- src/renderer/hooks/papi-hooks --run      # the group-0 default
npm run lint     # root ignores extensions/ — also run ESLint with the extensions config, as #2781 found
npm run build
```

Manual, Simple mode: open the chapter-context pane from a verse row; move the toolbar BCV and watch
it scroll to the verse; switch to another column-3 tab, navigate, switch back, and confirm it is
already positioned and did not animate; scroll by hand and confirm the sync stands down until the
reference changes; uncheck a resource in View Options and confirm the shrink does not read as a
reader scroll.

## Out of scope

- **Converging `resource-text-panel.component.tsx` onto this hook.** It still runs the older settle
  loop with the `requireOverflow` bug above. Worth a follow-up ticket; not worth widening this diff
  into a file #2781 does not touch.
- **Verse-mode column scrolling.** The row set does not change with the reference, so scrolling the
  outer verse list is a different feature.
- **Sub-verse anchors.** `\v 3a` and `\v 3b` both parse to start 3; the first in document order wins.
  The aligned view's equivalent collision is filed upstream as PT-4559.
