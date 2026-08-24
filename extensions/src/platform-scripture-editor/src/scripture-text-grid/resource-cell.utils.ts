import { isPlatformError } from 'platform-bible-utils';
import { isBookNotFoundError } from '../platform-scripture-editor.utils';

/**
 * The five visual states a ResourceCell can be in; only `ready` renders Editorial.
 *
 * - `unavailable`: the resource's project could not be resolved (e.g., not installed or absent from
 *   the cached resource list). The cell shows a static "Resource unavailable" label.
 * - `downloading`: data is still loading — shows a spinner.
 * - `bookNotFound`: the resource is installed and working, but does not contain the requested book
 *   (e.g., Genesis in a New Testament-only resource) — shows the book-not-found message.
 * - `failed`: data loaded but returned a PlatformError — shows "Resource unavailable" + "Download
 *   failed".
 * - `ready`: data is present — shows Editorial (or the empty-verse label when the slice is empty).
 */
export type ResourceCellState = 'unavailable' | 'downloading' | 'ready' | 'bookNotFound' | 'failed';

/**
 * Derives a cell's fetch state from observable data. The resource download/management flow owns the
 * actual download; this only visualizes it: book-not-found PlatformError → `bookNotFound`; any
 * other PlatformError → `failed`; still loading / no value → `downloading`; else `ready`. The
 * caller must handle the `'unavailable'` state separately (when `projectId` is `undefined`) before
 * calling this function.
 *
 * A book missing from a resource is a normal, expected outcome rather than a download problem, so
 * it must be recognized before the general error branch — otherwise the cell claims a download
 * failed and points the user at a re-download that cannot help.
 */
export function deriveCellState(args: {
  usjPossiblyError: unknown;
  isLoading: boolean;
}): 'downloading' | 'ready' | 'bookNotFound' | 'failed' {
  const { usjPossiblyError, isLoading } = args;
  if (isBookNotFoundError(usjPossiblyError)) return 'bookNotFound';
  if (isPlatformError(usjPossiblyError)) return 'failed';
  if (isLoading || usjPossiblyError === undefined) return 'downloading';
  return 'ready';
}
