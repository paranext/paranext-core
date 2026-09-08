/** Finding, and scrolling to, a verse row in the aligned grid. */

/**
 * The verse block to scroll to for a reference, searched within one scroll port.
 *
 * Prefers a block starting exactly at the verse. Otherwise takes the nearest block starting before
 * it, which is what lands a reference inside a bridge (`14-15` starts at 14, so verse 15 finds it)
 * or in a versification gap on the row above. Returns `undefined` only when no verse block has
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
  const blocks = [...port.querySelectorAll<HTMLElement>('.verse-block[data-verse-start]')];
  const [firstBlock] = blocks;
  if (!firstBlock) return undefined;

  const exact = blocks.find((block) => Number(block.dataset.verseStart) === verseNum);
  if (exact) return exact;

  let best: HTMLElement | undefined;
  let bestStart = Number.NEGATIVE_INFINITY;
  blocks.forEach((block) => {
    const start = Number(block.dataset.verseStart);
    if (Number.isNaN(start) || start > verseNum || start <= bestStart) return;
    best = block;
    bestStart = start;
  });
  // A reference above every block (an intro verse 0) belongs at the top of the passage.
  return best ?? firstBlock;
}

/**
 * The height of the sticky resource-name header, which covers the top of the port.
 *
 * @param port The grid root.
 * @returns The header's height, or 0 before one has rendered.
 */
function getStickyHeaderHeight(port: HTMLElement): number {
  return port.querySelector<HTMLElement>('[data-cell-header]')?.getBoundingClientRect().height ?? 0;
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
  const portRect = port.getBoundingClientRect();
  const blockRect = block.getBoundingClientRect();
  const firstVisibleY = portRect.top + getStickyHeaderHeight(port);
  return blockRect.bottom > firstVisibleY && blockRect.top < portRect.bottom;
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
  // `clientTop` is the port's top border: its bounding rect starts at the border, its scrollable
  // content does not. `getTopWithinScrollContainer` in `editor-dom.util.ts` subtracts it for the
  // same reason; this view allows an external border on the grid.
  const portTop = port.getBoundingClientRect().top + port.clientTop;
  port.scrollTop += block.getBoundingClientRect().top - portTop - getStickyHeaderHeight(port);
}
