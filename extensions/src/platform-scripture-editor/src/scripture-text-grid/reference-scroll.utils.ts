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
export type VerseTargetFinder = (port: ParentNode, verseNum: number) => HTMLElement | undefined;

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
  const [firstBlock] = blocks;
  if (!firstBlock) return undefined;

  // A non-finite verse can only come from a malformed reference; nothing is "nearest" to it, so the
  // top of the passage is the only defensible answer (and matches a verse-0 reference).
  if (!Number.isFinite(verseNum)) return firstBlock;

  let best: HTMLElement | undefined;
  let bestStart = Number.NEGATIVE_INFINITY;
  blocks.forEach((block) => {
    const start = Number(block.dataset.verseStart);
    if (start > verseNum || start <= bestStart) return;
    best = block;
    bestStart = start;
  });
  // A reference above every block (an intro verse 0) belongs at the top of the passage.
  return best ?? firstBlock;
}

/** The inline layout's verse anchor. `data-number` may be a range (`"14-15"`) or partial (`"3a"`). */
const VERSE_MARKER_SELECTOR = 'span[data-marker="v"][data-number]';

/**
 * The verse marker to scroll to for a reference, in a cell rendering the editor's inline layout.
 *
 * The chapter-mode counterpart of {@link findVerseBlockForVerse}, and deliberately the same rule:
 * prefer a marker starting exactly at the verse, else the nearest marker starting before it. That
 * fallback is what lands a reference inside a bridge — `\v 14-15` emits no `[data-number="15"]`, so
 * an exact match alone never resolves verse 15. It also puts a reference in a versification gap on
 * the preceding verse, and a reference above the first marker (verse 0 front matter) at the top of
 * the chapter.
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
 * @returns The marker to bring into view, or `undefined` when none has rendered yet.
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
    // `<=` on the running best keeps the EARLIER of two markers sharing a start, which is what puts
    // a sub-verse reference at `3a` rather than `3b`.
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
 * @param port The scroll port (the grid root).
 * @returns The viewport Y of the first visible content pixel.
 */
function getFirstVisibleY(port: HTMLElement): number {
  const headerHeight =
    port.querySelector<HTMLElement>('[data-cell-header]')?.getBoundingClientRect().height ?? 0;
  return port.getBoundingClientRect().top + port.clientTop + headerHeight;
}

/**
 * Whether any part of `block` is showing, counting the sticky header as covered rather than
 * visible.
 *
 * @param port The scroll port (the grid root).
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
 * Scrolls `port` so `block` sits just below the sticky header.
 *
 * Arithmetic on `scrollTop` rather than `scrollIntoView`, which would also scroll the web view's
 * ancestors to bring the grid itself into view. Instant, not smooth: this also runs as the catch-up
 * when a hidden tab is activated, where there is nothing to animate from.
 *
 * @param port The scroll port (the grid root).
 * @param block The verse block to bring to the top of the port.
 */
export function scrollPortToBlock(port: HTMLElement, block: HTMLElement): void {
  port.scrollTop += block.getBoundingClientRect().top - getFirstVisibleY(port);
}
