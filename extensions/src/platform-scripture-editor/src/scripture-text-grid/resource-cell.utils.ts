import { isPlatformError } from 'platform-bible-utils';
import {
  isMissingBookError,
  isMissingBookInfoOnScreen,
  parseMissingBookError,
} from '../platform-scripture-editor.utils';

/**
 * The five visual states a ResourceCell can be in; only `ready` renders Editorial.
 *
 * - `unavailable`: the resource's project could not be resolved (e.g., not installed or absent from
 *   the cached resource list). The cell shows a static "Resource unavailable" label.
 * - `downloading`: data is still loading — shows a spinner.
 * - `failed`: data loaded but returned a PlatformError — shows "Resource unavailable" + "Download
 *   failed".
 * - `bookNotAvailable`: the resource simply does not contain the current book. Distinct from `failed`
 *   because nothing went wrong and retrying a download cannot help.
 * - `ready`: data is present — shows Editorial (or the empty-verse label when the slice is empty).
 */
export type ResourceCellState =
  | 'unavailable'
  | 'downloading'
  | 'ready'
  | 'failed'
  | 'bookNotAvailable';

/**
 * Derives a cell's fetch state from observable data. The resource download/management flow owns the
 * actual download; this only visualizes it: a missing book in the resource on screen →
 * `bookNotAvailable`; any other PlatformError → `failed`; still loading / no value → `downloading`;
 * else `ready`. The caller must handle the `'unavailable'` state separately (when `projectId` is
 * `undefined`) before calling this function.
 *
 * `bookNotAvailable` requires the failure to name BOTH the book and the resource the cell is
 * showing right now. A cell re-keys its chapter subscription on the grid's shared reference, and a
 * data hook keeps serving the PREVIOUS selector's result until the new subscription's first update
 * lands — so navigating OUT of a missing book leaves an error in hand describing the book the user
 * just left. Without the comparison, and with the failure branch taken ahead of `isLoading`, the
 * cell would claim "not in this text" about a book the resource does have for the whole round
 * trip.
 *
 * @param args.currentBookNum The book number the cell is displaying. 0 or less means the cell has
 *   no book it can name, so no claim is made about one.
 * @param args.projectId The resource's project id, or `undefined` if it has not resolved to one.
 */
export function deriveCellState(args: {
  usjPossiblyError: unknown;
  isLoading: boolean;
  currentBookNum: number;
  projectId: string | undefined;
}): Exclude<ResourceCellState, 'unavailable'> {
  const { usjPossiblyError, isLoading, currentBookNum, projectId } = args;
  if (isPlatformError(usjPossiblyError)) {
    // Parsed once and compared, rather than calling `isMissingBookOnScreen` and then
    // `isMissingBookError`: this runs per grid cell, so the same message would otherwise be matched
    // against both regexes twice for one decision.
    const missingBook = parseMissingBookError(usjPossiblyError);
    if (isMissingBookInfoOnScreen({ missingBook, currentBookNum, projectId }))
      return 'bookNotAvailable';
    // A missing-book failure naming some other book or resource is the previous selector's result,
    // held while the new subscription's first update is in flight — a spinner, not a fault.
    if (missingBook || isMissingBookError(usjPossiblyError)) return 'downloading';
    return 'failed';
  }
  if (isLoading || usjPossiblyError === undefined) return 'downloading';
  return 'ready';
}

/**
 * Whether a chapter's USJ is the chapter a reference names, going by the book and chapter nodes the
 * content itself carries.
 *
 * A data hook keeps serving the previous selector's result until the new subscription's first
 * update lands, and raises `isLoading` only in an effect, so for a render after the reference moves
 * a cell can read as `ready` while still holding the chapter the reader left. This is how a caller
 * tells the two apart. Content that names no chapter (a chapter-0 intro, or chapter data without a
 * `\c`) has nothing to contradict the reference, so it matches.
 *
 * @param usj The chapter data, or whatever the data hook currently holds.
 * @param book The reference's book code.
 * @param chapterNum The reference's chapter number.
 * @returns True when `usj` is USJ that does not name a different book or chapter.
 */
export function isUsjForChapter(usj: unknown, book: string, chapterNum: number): boolean {
  if (typeof usj !== 'object' || !usj || !('content' in usj) || !Array.isArray(usj.content))
    return false;
  let namesChapter = false;
  let namesThisChapter = false;
  let namesOtherBook = false;
  usj.content.forEach((node: unknown) => {
    if (typeof node !== 'object' || !node || !('type' in node)) return;
    if (node.type === 'book' && 'code' in node && node.code !== book) namesOtherBook = true;
    if (node.type === 'chapter' && 'number' in node) {
      namesChapter = true;
      if (node.number === `${chapterNum}`) namesThisChapter = true;
    }
  });
  return !namesOtherBook && (!namesChapter || namesThisChapter);
}
