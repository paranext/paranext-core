import { isPlatformError } from 'platform-bible-utils';
import { isMissingBookError } from '../platform-scripture-editor.utils';

/**
 * The four visual states a ResourceCell can be in; only `ready` renders Editorial.
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
 * actual download; this only visualizes it: a missing-book failure → `bookNotAvailable`; any other
 * PlatformError → `failed`; still loading / no value → `downloading`; else `ready`. The caller must
 * handle the `'unavailable'` state separately (when `projectId` is `undefined`) before calling this
 * function.
 *
 * A cell is one verse tall and carries no reference of its own, so it reports the missing book
 * without the identity comparison the full-panel surfaces need: there is no in-cell navigation that
 * could leave a stale claim on screen.
 */
export function deriveCellState(args: {
  usjPossiblyError: unknown;
  isLoading: boolean;
}): 'downloading' | 'ready' | 'failed' | 'bookNotAvailable' {
  const { usjPossiblyError, isLoading } = args;
  if (isPlatformError(usjPossiblyError))
    return isMissingBookError(usjPossiblyError) ? 'bookNotAvailable' : 'failed';
  if (isLoading || usjPossiblyError === undefined) return 'downloading';
  return 'ready';
}
