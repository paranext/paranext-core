import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import { RegistrationValidity } from '@renderer/services/first-run.model';
import { isDemoMode } from '@renderer/services/first-run-store';
import {
  getRegistrationValidity,
  refreshRegistrationValidity,
  subscribeToRegistrationValidity,
} from '@renderer/services/registration-validity-store';

/** What {@link useRegistrationValidity} hands back. */
export interface RegistrationValidityState {
  /** The session's validity. Treat `'unknown'` as "don't nag" — the probe could not complete. */
  validity: RegistrationValidity;
  /**
   * Re-checks validity past the session cache. Call after the user has had a chance to change their
   * registration; it is a no-op in demo mode. Fire-and-forget — failures are logged, not thrown.
   */
  refresh: () => void;
}

/**
 * The user's Paratext registration validity, kept live from `registration-validity-store`.
 *
 * Mounting kicks the session's probe if nothing has resolved one yet. That is not just convenience:
 * the first-run gate skips its probe in Power mode and when the startup re-registration reminder is
 * off, so without this the store would stay `'unknown'` for those users and no
 * registration-dependent UI would ever appear. The probe is shared, so this never adds a second
 * one.
 *
 * Demo mode is the exception: it promises to bypass the real registration backend entirely, so
 * neither the mount probe nor {@link RegistrationValidityState.refresh} sends anything. Validity
 * stays `'unknown'` there, which renders as no reminder.
 */
export function useRegistrationValidity(): RegistrationValidityState {
  const validity = useSyncExternalStore(subscribeToRegistrationValidity, getRegistrationValidity);

  const refresh = useCallback((force: boolean) => {
    if (isDemoMode()) return;
    // The catch is required, not tidiness: the store propagates rejections so the first-run gate can
    // log them, and an unguarded floating promise would become an unhandled rejection.
    refreshRegistrationValidity({ force }).catch((e: unknown) => {
      logger.warn(`Could not resolve registration validity for the UI: ${getErrorMessage(e)}`);
    });
  }, []);

  useEffect(() => refresh(false), [refresh]);

  const forceRefresh = useCallback(() => refresh(true), [refresh]);
  return { validity, refresh: forceRefresh };
}

export default useRegistrationValidity;
