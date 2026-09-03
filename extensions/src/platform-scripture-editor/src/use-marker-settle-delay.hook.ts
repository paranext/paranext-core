import { logger } from '@papi/frontend';
import { useSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useMemo } from 'react';

/**
 * The contribution's default (settings.json), which deliberately equals the editor's own built-in
 * idle delay (`IDLE_SETTLE_DELAY_MS` in the editor package): an unset setting behaves identically
 * to no setting at all. A real number rather than an unset/null default because an undefined-able
 * `SettingTypes` member widens the whole union and disables its compile-time guards — see the
 * setting's declaration.
 */
const MARKER_SETTLE_DELAY_DEFAULT_MS = 1000;

/**
 * EXPERIMENTAL: The `platformScriptureEditor.markerSettleDelayMs` setting, shaped for
 * `EditorOptions.markerSettleDelayMs`.
 *
 * Reads the setting and re-renders when it changes, so a live tweak takes effect without a restart.
 * A still-loading read and a failed read (which warns) report `undefined`, leaving the editor
 * option unset so the editor uses its own default delay. Any number passes through untouched,
 * including the editor's sentinels: `0` settles pending marker edits immediately after each edit
 * and `-1` disables the editor's idle settle clock entirely.
 *
 * @returns The delay in milliseconds, or `undefined` when the editor should use its own default.
 */
export function useMarkerSettleDelay(): number | undefined {
  const [delayPossiblyError, , , isLoading] = useSetting(
    'platformScriptureEditor.markerSettleDelayMs',
    MARKER_SETTLE_DELAY_DEFAULT_MS,
  );

  return useMemo(() => {
    if (isLoading) return undefined;
    if (isPlatformError(delayPossiblyError)) {
      logger.warn(`Error getting marker settle delay: ${getErrorMessage(delayPossiblyError)}`);
      return undefined;
    }
    // `??` guards the serialization boundary: the setting is typed (and now defaulted) as a real
    // number, but a raw null persisted by an older profile must not reach the editor as a
    // number-typed option.
    return delayPossiblyError ?? undefined;
  }, [delayPossiblyError, isLoading]);
}

export default useMarkerSettleDelay;
