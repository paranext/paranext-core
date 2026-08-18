import { logger } from '@papi/frontend';
import { useSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useMemo } from 'react';

/**
 * EXPERIMENTAL: The `platformScriptureEditor.markerSettleDelayMs` setting, shaped for
 * `EditorOptions.markerSettleDelayMs`.
 *
 * Reads the setting and re-renders when it changes, so a live tweak takes effect without a
 * restart. `null` (the stored default — a JSON contribution cannot express `undefined`), a
 * still-loading read, and a failed read (which warns) all report `undefined`, leaving the editor
 * option unset so the editor uses its own default delay. Any number passes through untouched,
 * including the editor's sentinels: `0` settles pending marker edits immediately after each edit
 * and `-1` disables the editor's idle settle clock entirely.
 *
 * @returns The delay in milliseconds, or `undefined` when the editor should use its own default.
 */
export function useMarkerSettleDelay(): number | undefined {
  const [delayPossiblyError, , , isLoading] = useSetting(
    'platformScriptureEditor.markerSettleDelayMs',
    // eslint-disable-next-line no-null/no-null -- the setting's stored default is null (JSON)
    null,
  );

  return useMemo(() => {
    if (isLoading) return undefined;
    if (isPlatformError(delayPossiblyError)) {
      logger.warn(`Error getting marker settle delay: ${getErrorMessage(delayPossiblyError)}`);
      return undefined;
    }
    return delayPossiblyError ?? undefined;
  }, [delayPossiblyError, isLoading]);
}

export default useMarkerSettleDelay;
