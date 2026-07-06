import { isPlatformError } from 'platform-bible-utils';

/** The three visual states a ResourceCell can be in; only `ready` renders Editorial. */
export type VerseCellState = 'downloading' | 'ready' | 'failed';

/**
 * Derives a cell's offline state from observable data. A2/A13 own the actual download; this only
 * visualizes it: PlatformError → `failed`; still loading / no value → `downloading`; else `ready`.
 */
export function deriveCellState(args: {
  usjPossiblyError: unknown;
  isLoading: boolean;
}): VerseCellState {
  const { usjPossiblyError, isLoading } = args;
  if (isPlatformError(usjPossiblyError)) return 'failed';
  if (isLoading || usjPossiblyError === undefined) return 'downloading';
  return 'ready';
}
