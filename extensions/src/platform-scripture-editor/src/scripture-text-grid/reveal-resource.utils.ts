import { normalizeProjectId } from 'platform-bible-utils';
import { ALIGNED_GRID_CLASS } from './aligned-grid.styles';

/**
 * Marks the root of each per-resource cell: a verse-list row or a chapter/aligned column. The
 * chapter-context region and the single-resource wrapper show a resource too but are not cells of
 * the collection, so they carry no mark and are never a reveal target.
 */
export const TEXT_COLLECTION_CELL_ATTRIBUTE = 'data-text-collection-cell';

/**
 * A request to bring one resource's cell into view, outline it and move focus to it (where focus
 * lands depends on the layout; see {@link findRevealFocusTarget}). `requestId` changes with every
 * request so asking for the same resource twice reveals it twice.
 */
export type RevealRequest = { projectId: string; requestId: number };

/**
 * Finds the cell showing a resource.
 *
 * @param container Where to search; the grid's outer element.
 * @param projectId The project to look for. Compared case-insensitively, through
 *   `normalizeProjectId`.
 * @returns The first marked cell whose `data-project-id` matches, or `undefined` when none does.
 */
export function findRevealTargetCell(
  container: ParentNode,
  projectId: string,
): HTMLElement | undefined {
  const wanted = normalizeProjectId(projectId);
  return Array.from(
    container.querySelectorAll<HTMLElement>(`[${TEXT_COLLECTION_CELL_ATTRIBUTE}]`),
  ).find((cell) => {
    const cellProjectId = cell.dataset.projectId;
    return cellProjectId !== undefined && normalizeProjectId(cellProjectId) === wanted;
  });
}

/**
 * Finds what takes keyboard focus when a cell is revealed. Focus goes to the element that holds the
 * cell's scrolling, so Arrow and Page keys scroll the text the user was just taken to; a column's
 * own root does not scroll, so focusing it would leave those keys with nothing to move.
 *
 * @param cell A cell found by {@link findRevealTargetCell}.
 * @returns The cell itself when it is a tab stop (a verse-list row); else the cell's own focusable
 *   scroll port (a chapter column); else the aligned grid root that holds the cell; else
 *   `undefined`.
 */
export function findRevealFocusTarget(cell: HTMLElement): HTMLElement | undefined {
  if (cell.hasAttribute('tabindex')) return cell;
  return (
    cell.querySelector<HTMLElement>('[data-cell-content][tabindex]') ??
    cell.closest<HTMLElement>(`.${ALIGNED_GRID_CLASS}`) ??
    undefined
  );
}

/**
 * Decides whether the grid is handed the pending request yet. Revealing needs layout (the view is
 * shown) and the cell to exist (the grid has its resources), and the grid reports a request handled
 * even when it finds no cell, so a request handed over early would be consumed and lost.
 *
 * Hidden case: while hidden, or while the grid is still loading, the request is withheld; it is the
 * same object once both hold, so the grid's `requestId`-keyed effect fires exactly once.
 *
 * @param revealRequest The request currently exposed by the store, if any.
 * @param readiness `isViewVisible`: the tab is shown. `isGridSettled`: the grid's sources and
 *   resources have all answered, so a missing cell means the resource is not in the collection.
 * @returns The request to hand the grid, or `undefined` to hold it back.
 */
export function revealRequestForGrid(
  revealRequest: RevealRequest | undefined,
  { isViewVisible, isGridSettled }: { isViewVisible: boolean; isGridSettled: boolean },
): RevealRequest | undefined {
  return isViewVisible && isGridSettled ? revealRequest : undefined;
}

/** Distances, in CSS pixels, from each side of one box to the matching side of a box inside it. */
export type BoxInsets = { top: number; right: number; bottom: number; left: number };

/**
 * Measures where a scroll port's client area (its box minus any scrollbars) sits inside a
 * container, for drawing over the scrolling content without covering a scrollbar. The insets are
 * from the container's padding edge, which is what an absolutely positioned overlay in it is placed
 * against. A scrollbar can be on either side: right-to-left text puts the vertical one on the
 * left.
 *
 * @param container The positioned element the overlay belongs to.
 * @param scrollPort A scroll container inside `container`.
 * @returns The insets, or `undefined` while `container` has no layout (in a hidden tab).
 */
export function getScrollPortClientInsets(
  container: HTMLElement,
  scrollPort: HTMLElement,
): BoxInsets | undefined {
  const containerRect = container.getBoundingClientRect();
  if (containerRect.width === 0 && containerRect.height === 0) return undefined;
  const scrollPortRect = scrollPort.getBoundingClientRect();

  const paddingLeft = containerRect.left + container.clientLeft;
  const paddingTop = containerRect.top + container.clientTop;
  const clientLeft = scrollPortRect.left + scrollPort.clientLeft;
  const clientTop = scrollPortRect.top + scrollPort.clientTop;
  return {
    top: clientTop - paddingTop,
    right: paddingLeft + container.clientWidth - (clientLeft + scrollPort.clientWidth),
    bottom: paddingTop + container.clientHeight - (clientTop + scrollPort.clientHeight),
    left: clientLeft - paddingLeft,
  };
}
