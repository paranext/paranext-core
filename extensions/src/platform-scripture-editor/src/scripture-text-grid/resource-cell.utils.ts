import { isPlatformError } from 'platform-bible-utils';

/**
 * The four visual states a ResourceCell can be in; only `ready` renders Editorial.
 *
 * - `unavailable`: the resource's project could not be resolved (e.g., not installed or absent from
 *   the cached resource list). The cell shows a static "Resource unavailable" label.
 * - `downloading`: data is still loading — shows a spinner.
 * - `failed`: data loaded but returned a PlatformError — shows "Resource unavailable" + "Download
 *   failed".
 * - `ready`: data is present — shows Editorial (or the empty-verse label when the slice is empty).
 */
export type ResourceCellState = 'unavailable' | 'downloading' | 'ready' | 'failed';

/**
 * Derives a cell's offline state from observable data. The resource download/management flow owns
 * the actual download; this only visualizes it: PlatformError → `failed`; still loading / no value
 * → `downloading`; else `ready`.
 */
export function deriveCellState(args: {
  usjPossiblyError: unknown;
  isLoading: boolean;
}): ResourceCellState {
  const { usjPossiblyError, isLoading } = args;
  if (isPlatformError(usjPossiblyError)) return 'failed';
  if (isLoading || usjPossiblyError === undefined) return 'downloading';
  return 'ready';
}
