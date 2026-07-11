import { formatScrRef, isPlatformError } from 'platform-bible-utils';
import { SerializedVerseRef } from '@sillsdev/scripture';

/** The three visual states a ResourceCell can be in; only `ready` renders Editorial. */
export type ResourceCellState = 'downloading' | 'ready' | 'failed';

/**
 * Accessible name for a grid cell: the resource's short label plus the active reference, e.g. "ESV,
 * MAT 5:3". Read by screen readers when the cell receives focus. The reference uses the stable
 * 3-letter book id (not localized) for a terse, unambiguous spoken form.
 */
export function buildCellAccessibleName(label: string, scrRef: SerializedVerseRef): string {
  return `${label}, ${formatScrRef(scrRef)}`;
}

/**
 * Derives a cell's offline state from observable data. A2/A13 own the actual download; this only
 * visualizes it: PlatformError → `failed`; still loading / no value → `downloading`; else `ready`.
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
