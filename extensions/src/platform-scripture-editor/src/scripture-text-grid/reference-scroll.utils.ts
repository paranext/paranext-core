/**
 * Finding, and scrolling to, the verse a reference names — in either Text Collection layout.
 *
 * The port math is shared. The lookup is not: the aligned grid's block-verse layout wraps each
 * verse in a placed element, while a chapter cell's inline layout emits only a marker span, so
 * there is one finder per layout and callers pass the one their view renders.
 */

import { MAX_ALIGNED_VERSE_ROWS } from './aligned-grid.styles';
import { parseVerseRange } from './verse-display.utils';

/**
 * Finds the element to bring into view for a verse, searched within one scroll port.
 *
 * Returning `undefined` means "nothing has rendered yet", which callers use to tell that from "the
 * verse is missing" and leave their pending scroll armed.
 */
export type VerseTargetFinder = (port: HTMLElement, verseNum: number) => HTMLElement | undefined;

/**
 * Whether the grid's generated row rules place a block carrying this `data-verse-start`.
 *
 * A block outside 1..`MAX_ALIGNED_VERSE_ROWS` — a `\v 0` front-matter marker, or a verse numbered
 * past the last row — matches no rule and so stays hidden. Scrolling to one would read an all-zero
 * rect off an element with no layout box, which lands the reader at the top of the chapter instead
 * of at the verse they asked for, and then keeps them pinned there.
 *
 * @param block A rendered verse block.
 * @returns True when the block is one the layout placed on a shared row.
 */
function isPlacedBlock(block: HTMLElement): boolean {
  const start = Number(block.dataset.verseStart);
  return Number.isInteger(start) && start >= 1 && start <= MAX_ALIGNED_VERSE_ROWS;
}

/**
 * The verse block to scroll to for a reference, searched within one scroll port.
 *
 * Only blocks the layout actually placed are candidates ({@link isPlacedBlock}). Prefers a block
 * starting exactly at the verse. Otherwise takes the nearest block starting before it, which is
 * what lands a reference inside a bridge (`14-15` starts at 14, so verse 15 finds it) or in a
 * versification gap on the row above. Returns `undefined` only when no placed verse block has
 * rendered yet, which callers use to tell "the chapter has not arrived" from "the verse is
 * missing".
 *
 * @param port Element containing the rendered verse blocks (the grid root).
 * @param verseNum Verse to scroll to.
 * @returns The block to bring into view, or `undefined` when none has rendered.
 */
export function findVerseBlockForVerse(
  port: ParentNode,
  verseNum: number,
): HTMLElement | undefined {
  // The common case — the reference names a verse some column starts — is answerable without
  // collecting every block, and this runs on each frame in which the grid's editors mutate.
  if (Number.isInteger(verseNum) && verseNum >= 1 && verseNum <= MAX_ALIGNED_VERSE_ROWS) {
    const match = port.querySelector<HTMLElement>(`.verse-block[data-verse-start="${verseNum}"]`);
    if (match) return match;
  }

  const blocks = [...port.querySelectorAll<HTMLElement>('.verse-block[data-verse-start]')].filter(
    isPlacedBlock,
  );
  if (blocks.length === 0) return undefined;

  // The top of the passage is the block with the lowest verse, not the first in document order:
  // `querySelectorAll` walks column by column, so its first block is the first COLUMN's first verse,
  // which is further down whenever that column starts later than another (a commentary on 10-12
  // beside a full text).
  let topBlock = blocks[0];
  blocks.forEach((block) => {
    if (Number(block.dataset.verseStart) < Number(topBlock.dataset.verseStart)) topBlock = block;
  });

  // A non-finite verse can only come from a malformed reference; nothing is "nearest" to it, so the
  // top of the passage is the only defensible answer (and matches a verse-0 reference).
  if (!Number.isFinite(verseNum)) return topBlock;

  let best: HTMLElement | undefined;
  let bestStart = Number.NEGATIVE_INFINITY;
  blocks.forEach((block) => {
    const start = Number(block.dataset.verseStart);
    if (start > verseNum || start <= bestStart) return;
    best = block;
    bestStart = start;
  });
  // A reference above every block (an intro verse 0) belongs at the top of the passage.
  return best ?? topBlock;
}

/** The inline layout's verse anchor. `data-number` may be a range (`"14-15"`) or partial (`"3a"`). */
const VERSE_MARKER_SELECTOR = 'span[data-marker="v"][data-number]';

/**
 * The first block of a cell's editor content that has a layout box — the top of the chapter.
 *
 * Blocks with no layout box are skipped: an element rendered `display:none` reads an all-zero rect,
 * which would send the port somewhere unrelated to the chapter top.
 *
 * @param port One cell's content box.
 * @returns The block, or `undefined` when no editor content has rendered.
 */
function findFirstLaidOutBlock(port: HTMLElement): HTMLElement | undefined {
  const content = port.querySelector('.editor-input');
  if (!content) return undefined;
  return [...content.children].find(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child.getClientRects().length > 0,
  );
}

/**
 * The verse marker to scroll to for a reference, in a cell rendering the editor's inline layout.
 *
 * The chapter-mode counterpart of {@link findVerseBlockForVerse}, and deliberately the same rule:
 * prefer a marker starting exactly at the verse, else the nearest marker starting before it. That
 * fallback is what lands a reference inside a bridge — `\v 14-15` emits no `[data-number="15"]`, so
 * an exact match alone never resolves verse 15. It also puts a reference in a versification gap on
 * the preceding verse.
 *
 * A reference above verse 1 (verse 0: an intro, a heading, a superscription) returns the chapter's
 * first laid-out block instead of any marker, so the port lands at the top of the chapter the way
 * the Scripture editor's `scrollToVerse` does. Landing on verse 1's marker would scroll away the
 * very front matter the reference names. Unlike the aligned grid, which has no row for front
 * matter, a chapter cell shows it.
 *
 * Unlike {@link findVerseBlockForVerse} there is no upper bound to respect: the inline layout places
 * no verse on a fixed row, so every rendered marker is a candidate.
 *
 * Sub-verse markers (`\v 3a`, `\v 3b`) both resolve to verse 3 and the earlier one wins, which puts
 * the reader at the start of the verse. The aligned layout's equivalent collision is worse — both
 * blocks land on one row and overlap — and is tracked upstream as PT-4559.
 *
 * @param port Element containing the rendered markers — one cell's content box.
 * @param verseNum Verse to scroll to.
 * @returns The marker to bring into view, or `undefined` when none has rendered yet or the one it
 *   lands on has no layout box.
 */
export function findVerseMarkerForVerse(
  port: HTMLElement,
  verseNum: number,
): HTMLElement | undefined {
  const target = findNearestVerseMarker(port, verseNum);
  // The editor keeps unknown markers (an `\esb` sidebar, a `\periph`) in the DOM but hides them
  // outside Standard view, verses included. A hidden marker's all-zero rect would drift the port
  // toward the top on every check, so leave the port alone. Only the chosen target is screened: a
  // rect read per candidate would cost too much on a scan that runs every mutation frame.
  return target && target.getClientRects().length > 0 ? target : undefined;
}

/**
 * {@link findVerseMarkerForVerse}'s lookup, before its screen for a target with no layout box.
 *
 * @param port One cell's content box.
 * @param verseNum Verse to scroll to.
 * @returns The chosen target, or `undefined` when none has rendered yet.
 */
function findNearestVerseMarker(port: HTMLElement, verseNum: number): HTMLElement | undefined {
  if (verseNum < 1) {
    const chapterTop = findFirstLaidOutBlock(port);
    if (chapterTop) return chapterTop;
  }

  // The common case — the reference names a verse the chapter starts — is answerable without
  // collecting every marker, and this runs on each frame in which the cell's editor mutates.
  if (Number.isInteger(verseNum) && verseNum >= 1) {
    const exact = port.querySelector<HTMLElement>(
      `${VERSE_MARKER_SELECTOR}[data-number="${verseNum}"]`,
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
    // `<=` on the running best keeps the EARLIER of two markers sharing a start, which is what puts
    // a sub-verse reference at `3a` rather than `3b`.
    //
    // This nearest-start-wins scan is deliberately the same rule as `findVerseBlockForVerse`'s
    // above, tie-break included — the two layouts should not disagree about which verse a
    // reference belongs to. Change one and change the other.
    if (!Number.isFinite(start) || start > verseNum || start <= bestStart) return;
    best = marker;
    bestStart = start;
  });
  // A reference above every marker belongs at the top of the chapter.
  return best ?? firstMarker;
}

/**
 * The viewport-relative Y of the port's first pixel a reader can actually see: past its top border,
 * and past the sticky resource-name header that covers the top of the scrollable area.
 *
 * `clientTop` is the port's top border: its bounding rect starts at the border, its scrollable
 * content does not. `getTopWithinScrollContainer` in `editor-dom.util.ts` subtracts it for the same
 * reason; this view allows an external border on the grid. Both functions below take their origin
 * from here so they cannot disagree about it — reading a block as visible against one origin and
 * scrolling it to another is off by the border width.
 *
 * @param port The scroll port.
 * @returns The viewport Y of the first visible content pixel.
 */
function getFirstVisibleY(port: HTMLElement): number {
  const headerHeight =
    port.querySelector<HTMLElement>('[data-cell-header]')?.getBoundingClientRect().height ?? 0;
  return port.getBoundingClientRect().top + port.clientTop + headerHeight;
}

/**
 * The viewport-relative Y where the port's visible content ends: above its bottom border and above
 * a horizontal scrollbar, which sits inside the border box that `getBoundingClientRect` reports. A
 * classic scrollbar (Windows, Linux) appears when an indented poetry line, whose indent is sized in
 * `vw`, overflows a narrow column.
 *
 * `clientTop`/`clientHeight` are layout pixels while rects are on-screen pixels, and the two differ
 * under CSS `zoom` on an ancestor, so the layout values are scaled by the port's own rect-to-layout
 * ratio. A port with no layout height (an environment that lays nothing out) falls back to the
 * rect's bottom.
 *
 * @param port The scroll port.
 * @returns The viewport Y just past the last visible content pixel.
 */
function getLastVisibleY(port: HTMLElement): number {
  const rect = port.getBoundingClientRect();
  if (port.offsetHeight === 0 || port.clientHeight === 0) return rect.bottom;
  const scale = rect.height / port.offsetHeight;
  return rect.top + (port.clientTop + port.clientHeight) * scale;
}

/**
 * Whether the reader can see a scroll target, as one layout counts "visible".
 *
 * Injected beside {@link VerseTargetFinder}, because the layouts aim the scroll at different kinds
 * of element and so answer this differently. A `true` here means "leave the port alone".
 */
export type TargetVisibilityTest = (port: HTMLElement, target: HTMLElement) => boolean;

/**
 * Whether any part of `block` is showing in `port`, counting anything behind a sticky header as
 * covered rather than visible.
 *
 * The aligned grid's rule, and the default. Its target is a whole verse block, so a sliver on
 * screen still means the reader can see that verse, and scrolling it to the top would fight a
 * reader who is part-way through it.
 *
 * @param port The scroll port — the grid root in the aligned view.
 * @param block The verse block to test.
 * @returns True when the reader can see some of the block.
 */
export function isBlockInPortView(port: HTMLElement, block: HTMLElement): boolean {
  const blockRect = block.getBoundingClientRect();
  return (
    blockRect.bottom > getFirstVisibleY(port) && blockRect.top < port.getBoundingClientRect().bottom
  );
}

/**
 * Whether all of `marker` is showing in `port`, counting anything behind a sticky header as covered
 * rather than visible.
 *
 * A chapter cell's rule. Its target is a one-line verse marker whose verse text follows _after_ it,
 * so "any part showing" would count a marker clipped at the bottom edge as visible while the reader
 * sees a verse number and none of its verse — and the leave-a-visible-verse-alone rule would then
 * decline to scroll. Demanding the marker fit completely is what makes the verse readable.
 *
 * A target taller than the visible area can never fit, so it falls back to the any-part-showing
 * rule rather than being called hidden forever. A port reporting no visible area at all takes the
 * same fallback, where nothing counts as showing, so the caller scrolls.
 *
 * @param port The scroll port — the cell's content box in a chapter cell.
 * @param marker The verse marker to test.
 * @returns True when the reader can see the whole marker.
 */
export function isMarkerFullyInPortView(port: HTMLElement, marker: HTMLElement): boolean {
  const markerRect = marker.getBoundingClientRect();
  const firstVisibleY = getFirstVisibleY(port);
  const portBottom = getLastVisibleY(port);
  if (markerRect.height >= portBottom - firstVisibleY) return isBlockInPortView(port, marker);
  return markerRect.top >= firstVisibleY && markerRect.bottom <= portBottom;
}

/**
 * Scrolls `port` so `block` sits `leadInPx` below the sticky header.
 *
 * Flush, with no context above it, unlike the Scripture editor's `VERSE_NUMBER_SCROLL_OFFSET` — a
 * deliberate difference; see `adr-aligned-grid-flattens-the-editor-dom` before changing either.
 *
 * Arithmetic on `scrollTop` rather than `scrollIntoView`, which would also scroll the web view's
 * ancestors to bring the grid itself into view. Instant, not smooth: this also runs as the catch-up
 * when a hidden tab is activated, where there is nothing to animate from.
 *
 * @param port The scroll port.
 * @param block The verse target (block or marker) to bring to the top of the port.
 * @param leadInPx How much room to leave above the target, so the reader keeps a little of the
 *   preceding verse for context. Defaults to none, which is what the aligned grid wants: its verse
 *   blocks carry their own padding, so their rect top is already the padding edge. A position above
 *   the top of the content is clamped by the browser, which is the right answer for a target near
 *   the start of the chapter.
 */
export function scrollPortToBlock(
  port: HTMLElement,
  block: HTMLElement,
  leadInPx: number = 0,
): void {
  port.scrollTop += block.getBoundingClientRect().top - getFirstVisibleY(port) - leadInPx;
}
