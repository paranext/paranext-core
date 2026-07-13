import { isPlatformError } from 'platform-bible-utils';

/** The three visual states a ResourceCell can be in; only `ready` renders Editorial. */
export type ResourceCellState = 'downloading' | 'ready' | 'failed';

/**
 * Derives a cell's offline state from observable data. The resource download/auto-fetch pipeline
 * owns the actual download; this only visualizes it: PlatformError → `failed`; still loading / no
 * value → `downloading`; else `ready`.
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
