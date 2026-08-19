import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { getErrorMessage } from 'platform-bible-utils';
import { useEvent } from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/** Delay between re-checks while the answer is still being reported as unknown. */
const UNSETTLED_RECHECK_INTERVAL_MS = 2000;
/**
 * Delay between re-checks after the answer has settled. Slower because by then the UI is already
 * showing the settled answer and these re-checks only exist to catch a late arrival.
 */
const SETTLED_RECHECK_INTERVAL_MS = 5000;

/**
 * How long a `false` is reported as `undefined` before being reported as `false`.
 *
 * Both directions cost something. Too short and send/receive UI appears and disappears on a normal
 * startup; too long and a build without send/receive shows that UI, clickable and inert, for this
 * long on every launch. Sized at roughly three times the ~1.5s activation gap measured in a
 * Paratext 10 Studio build: long enough for a typical startup, short enough to settle quickly where
 * send/receive genuinely isn't installed. Exceeding it is not the bug this hook exists for —
 * re-checks continue past it, so the UI comes back rather than staying hidden.
 */
export const SEND_RECEIVE_UNKNOWN_GRACE_MS = 5000;

/**
 * How long to keep re-checking. Much longer than {@link SEND_RECEIVE_UNKNOWN_GRACE_MS} on purpose —
 * the two bound different risks. Reporting `false` late leaves inert UI on screen for a moment;
 * giving up early leaves send/receive hidden for the whole session, which is the bug itself. Sized
 * well past the worst case, since every extension activating between this check's extension and
 * send/receive can take up to the 5s activation timeout.
 */
export const SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS = 60_000;

/**
 * Whether the Send/Receive extension is part of this build: `true` if it is, `false` if it is not,
 * and `undefined` while that is still unknown. Callers should treat `undefined` as available (fail
 * open) so a slow or unanswerable check can't hide send/receive UI.
 *
 * Re-checks are what make this reliable. `platformGetResources.isSendReceiveAvailable` can only
 * answer once its own extension has activated, which happens before `paratextBibleSendReceive`
 * activates, so an early check gets a `false` that is truthful but temporary — and
 * `platform.onDidReloadExtensions` does not fire on a cold start to correct it. This re-checks
 * until the answer is `true` or {@link SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS} passes, and
 * starts over when extensions reload so an extension installed mid-session is picked up.
 *
 * A `false` is reported as `undefined` until {@link SEND_RECEIVE_UNKNOWN_GRACE_MS} has passed. Only
 * a literal `false` — the extension answering "not in this build" — is ever reported as `false`; a
 * check that throws, or that answers `undefined` because it couldn't determine availability, stays
 * unknown, since neither means the extension is missing.
 *
 * @param options.enabled When false, no further checking happens; an answer already reported is
 *   retained rather than reset. Use it to avoid the network traffic where the answer can't affect
 *   anything — power mode has no send/receive UI to gate. Defaults to true.
 */
export function useSendReceiveAvailability({ enabled = true }: { enabled?: boolean } = {}):
  | boolean
  | undefined {
  const [isSendReceiveAvailable, setIsSendReceiveAvailable] = useState<boolean | undefined>(
    undefined,
  );

  const recheckTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Monotonic, not wall-clock: this runs during startup, when the wall clock can be stepped.
  const checkingStartedAtRef = useRef<number>(0);
  // Identifies the current run of checks. Bumped whenever checking restarts or stops, so an answer
  // from an abandoned run can be recognized and dropped instead of applied over a newer one.
  const checkRunRef = useRef<number>(0);

  const check = useCallback(async () => {
    // Keep a single re-check chain alive. The mount effect, the extensions-reloaded event, and
    // StrictMode's double-invoked effect can all start one, and a stray chain would outlive the ref
    // meant to cancel it.
    clearTimeout(recheckTimeoutRef.current);
    const checkRun = checkRunRef.current;
    const isCurrent = () => checkRun === checkRunRef.current;
    const elapsedMs = () => performance.now() - checkingStartedAtRef.current;
    const scheduleRecheck = (hasSettled: boolean) => {
      if (elapsedMs() >= SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS) {
        logger.warn('Giving up on determining send/receive availability');
        return;
      }
      recheckTimeoutRef.current = setTimeout(
        check,
        hasSettled ? SETTLED_RECHECK_INTERVAL_MS : UNSETTLED_RECHECK_INTERVAL_MS,
      );
    };

    try {
      const isAvailable = await sendCommand('platformGetResources.isSendReceiveAvailable');
      // A slow check can resolve after its run was abandoned (unmounted, or extensions reloaded);
      // dropping it keeps a stale answer from overwriting a newer one or reviving a stopped chain.
      if (!isCurrent()) return;

      if (isAvailable === true) {
        setIsSendReceiveAvailable(true);
        return;
      }

      // `undefined` means the command couldn't determine an answer (it has no `manageExtensions`
      // privilege to check with), which is the same situation as a throw — keep re-checking rather
      // than reporting it as "not in the build".
      if (isAvailable === undefined) {
        scheduleRecheck(false);
        return;
      }

      // Report unknown rather than `false` during the grace period. Reporting it right away would
      // hide send/receive UI and bring it back seconds later on a normal startup. Re-checks continue
      // past the grace period either way, so a late arrival still flips this back to available.
      const hasSettled = elapsedMs() >= SEND_RECEIVE_UNKNOWN_GRACE_MS;
      if (hasSettled) setIsSendReceiveAvailable(false);
      scheduleRecheck(hasSettled);
    } catch (e) {
      // Leave the answer unknown: a throw means the extension host couldn't answer (startup race, or
      // it's busy), not that the extension is absent.
      logger.warn(`Could not determine send/receive availability: ${getErrorMessage(e)}`);
      if (isCurrent()) scheduleRecheck(false);
    }
  }, []);

  /** Starts a fresh run of checks, abandoning any run already in progress. */
  const restartChecking = useCallback(() => {
    checkRunRef.current += 1;
    checkingStartedAtRef.current = performance.now();
    check();
  }, [check]);

  useEffect(() => {
    if (!enabled) return undefined;
    restartChecking();
    return () => {
      clearTimeout(recheckTimeoutRef.current);
      // Abandon the run as well as its timer: a check already in flight would otherwise come back
      // after teardown and schedule a fresh chain that nothing is left to cancel.
      checkRunRef.current += 1;
    };
  }, [enabled, restartChecking]);

  const onDidReloadExtensions = useMemo(
    () => getNetworkEvent('platform.onDidReloadExtensions'),
    [],
  );
  const handleExtensionsReloaded = useCallback(() => {
    // Reloading extensions can add send/receive mid-session, and the first answer after it can still
    // land in the same activation gap — so start a whole new run rather than checking once.
    if (enabled) restartChecking();
  }, [enabled, restartChecking]);
  useEvent(onDidReloadExtensions, handleExtensionsReloaded);

  return isSendReceiveAvailable;
}

export default useSendReceiveAvailability;
