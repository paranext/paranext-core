import { logger } from '@papi/frontend';
import { useSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useMemo } from 'react';

/**
 * EXPERIMENTAL: The `platformScriptureEditor.markerSettleDelayMs` setting, shaped for
 * `EditorOptions.markerSettleDelayMs`.
 *
 * Reads the setting and re-renders when it changes, so a live tweak takes effect without a
 * restart. The unset default (the JSON contribution stores `null`; papi's serialization maps it
 * to JS `undefined`), a still-loading read, and a failed read (which warns) all report
 * `undefined`, leaving the editor option unset so the editor uses its own default delay. Any
 * number passes through untouched, including the editor's sentinels: `0` settles pending marker
 * edits immediately after each edit and `-1` disables the editor's idle settle clock entirely.
 *
 * @returns The delay in milliseconds, or `undefined` when the editor should use its own default.
 */
export function useMarkerSettleDelay(): number | undefined {
  const [delayPossiblyError, , , isLoading] = useSetting(
    'platformScriptureEditor.markerSettleDelayMs',
    undefined,
  );

  return useMemo(() => {
    if (isLoading) return undefined;
    if (isPlatformError(delayPossiblyError)) {
      logger.warn(`Error getting marker settle delay: ${getErrorMessage(delayPossiblyError)}`);
      return undefined;
    }
    // `??` guards the serialization boundary: the stored JSON default is null, and while papi
    // deserializes that to undefined, a raw null leaking through must not reach the editor as a
    // number-typed option.
    return delayPossiblyError ?? undefined;
  }, [delayPossiblyError, isLoading]);
}

export default useMarkerSettleDelay;
