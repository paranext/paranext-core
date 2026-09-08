/**
 * Finding and scrolling to a verse row in the aligned grid.
 *
 * The block-verse layout is read-only, and Lexical skips the DOM-selection write for a read-only
 * editor — the scroll-into-view lives inside that write. Setting the editor's selection therefore
 * scrolls nothing, so this view has to scroll to a reference itself.
 */

/**
 * The verse block to scroll to for a reference, searched within one scroll port.
 *
 * Prefers a block that starts exactly at the verse. When no displayed resource has that verse (a
 * versification gap, or a neighbour bridging it) it falls back to the block covering the verse, or
 * failing that the nearest one starting before it — so a reference in a gap lands where that verse
 * would be rather than leaving the grid where it was. Returns `undefined` only when the port holds
 * no verse block at all, which is what the caller uses to tell "not rendered yet" from "arrived".
 *
 * @param port Element containing the rendered verse blocks (the grid root).
 * @param verseNum Verse to scroll to.
 * @returns The block to bring into view, or `undefined` when none has rendered yet.
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

  // Nearest block starting at or before the verse. This is also what lands a reference inside a
  // bridge on that bridge: `14-15` starts at 14, so verse 15 finds it.
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
 * Scrolls `port` so `block` sits just below the sticky resource-name header.
 *
 * Arithmetic on `scrollTop` rather than `scrollIntoView`, which would also scroll the web view's
 * ancestors (and the iframe) to bring the grid itself into view. Instant, not smooth: this also
 * runs as the catch-up when a hidden tab is activated, where an animation would have nothing to
 * animate from.
 *
 * @param port The scroll port (the grid root).
 * @param block The verse block to bring to the top of the port.
 */
export function scrollPortToBlock(port: HTMLElement, block: HTMLElement): void {
  const headerHeight = port
    .querySelector<HTMLElement>('[data-cell-header]')
    ?.getBoundingClientRect().height;
  const delta =
    block.getBoundingClientRect().top - port.getBoundingClientRect().top - (headerHeight ?? 0);
  port.scrollTop += delta;
}
