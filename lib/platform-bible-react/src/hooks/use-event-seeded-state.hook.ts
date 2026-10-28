import type { PlatformEvent } from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEvent } from './use-event.hook';

/**
 * Options for {@link useEventSeededState}.
 *
 * @experimental This type is unstable and may change or disappear without notice
 */
export type EventSeededStateOptions<T> = {
  /**
   * Reads the current value. Rejects if the read fails. An answer that `isValid` rejects is
   * ignored.
   *
   * WARNING: MUST BE STABLE - const or wrapped in useCallback. A reference that is updated every
   * render restarts the seed every render.
   *
   * @experimental This option is unstable and may change or disappear without notice
   */
  read: () => Promise<unknown>;
  /**
   * The event that announces new values, or `undefined` while it is not yet available. An emitted
   * payload that `isValid` rejects is ignored.
   *
   * @experimental This option is unstable and may change or disappear without notice
   */
  event: PlatformEvent<unknown> | undefined;
  /**
   * Whether a payload from `read` or `event` is a well-formed value.
   *
   * WARNING: MUST BE STABLE - const or wrapped in useCallback. A reference that is updated every
   * render restarts the seed every render.
   *
   * @experimental This option is unstable and may change or disappear without notice
   */
  isValid: (value: unknown) => value is T;
  /**
   * How many times a rejected seed read is retried. Defaults to 10.
   *
   * @experimental This option is unstable and may change or disappear without notice
   */
  seedRetries?: number;
  /**
   * Milliseconds to wait between seed retries. Defaults to 3000.
   *
   * @experimental This option is unstable and may change or disappear without notice
   */
  seedRetryDelayMs?: number;
  /**
   * Milliseconds between re-reads while `shouldRecheck` holds for the current value. Leave
   * `undefined` to never re-read on a timer.
   *
   * @experimental This option is unstable and may change or disappear without notice
   */
  recheckIntervalMs?: number;
  /**
   * Whether the current value may be stale in a way the event will not correct, so it is re-read
   * every `recheckIntervalMs`. Defaults to never.
   *
   * @experimental This option is unstable and may change or disappear without notice
   */
  shouldRecheck?: (value: T) => boolean;
  /**
   * Whether to track the value at all. While `false` the value is reset to `undefined`, nothing is
   * read and emitted events are ignored. Defaults to `true`.
   *
   * @experimental This option is unstable and may change or disappear without notice
   */
  enabled?: boolean;
};

/**
 * What {@link useEventSeededState} reports.
 *
 * @experimental This type is unstable and may change or disappear without notice
 */
export type EventSeededState<T> = {
  /**
   * The latest valid value, or `undefined` until one arrives (or while the hook is disabled).
   *
   * @experimental This property is unstable and may change or disappear without notice
   */
  value: T | undefined;
  /**
   * Whether every seed read was rejected and retries ran out. Clears as soon as a value arrives
   * from an event.
   *
   * @experimental This property is unstable and may change or disappear without notice
   */
  hasSeedFailed: boolean;
};

const DEFAULT_SEED_RETRIES = 10;
const DEFAULT_SEED_RETRY_DELAY_MS = 3000;
const NEVER_RECHECK = () => false;

/**
 * Tracks a value that is announced by an event and can also be read on demand.
 *
 * An event has no replay: a subscriber that mounts after the last emission never hears about the
 * current value. So the hook seeds the value with `read` (retrying while the read is rejected, for
 * example while the service behind it is still starting) and then follows `event`.
 *
 * An event is always newer than a read that was already in flight when the event arrived, so the
 * event wins: such a read result is dropped, and an event also ends any pending seed retries.
 *
 * Some values can go stale without a further event (for example when the emitter is restarted). For
 * those, `shouldRecheck` plus `recheckIntervalMs` re-read the value on a timer for as long as it
 * says the value needs it.
 *
 * Deliberately takes `read` and `event` as callbacks rather than using PAPI itself, so this library
 * stays free of any PAPI dependency and both the renderer and extension web views can use it with
 * their own command-sending and event mechanisms.
 *
 * @param options See {@link EventSeededStateOptions}. `read` and `isValid` MUST BE STABLE - const or
 *   wrapped in useCallback. The references must not be updated every render.
 * @returns See {@link EventSeededState}.
 * @experimental This hook is unstable and may change or disappear without notice
 */
export function useEventSeededState<T>({
  read,
  event,
  isValid,
  seedRetries = DEFAULT_SEED_RETRIES,
  seedRetryDelayMs = DEFAULT_SEED_RETRY_DELAY_MS,
  recheckIntervalMs,
  shouldRecheck = NEVER_RECHECK,
  enabled = true,
}: EventSeededStateOptions<T>): EventSeededState<T> {
  const [value, setValue] = useState<T | undefined>(undefined);
  const [hasSeedFailed, setHasSeedFailed] = useState(false);

  // Counts the events accepted so far. A read that started before the latest event is older than it.
  const eventCountRef = useRef(0);

  /** Reads once and applies the answer unless it is outdated. Rejects if the read rejects. */
  const readAndApply = useCallback(
    async (isStillWanted: () => boolean) => {
      const eventCountAtRequest = eventCountRef.current;
      const answer = await read();
      if (!isStillWanted() || eventCountRef.current !== eventCountAtRequest || !isValid(answer))
        return;
      setValue(answer);
      setHasSeedFailed(false);
    },
    [read, isValid],
  );

  useEffect(() => {
    if (!enabled) {
      setValue(undefined);
      setHasSeedFailed(false);
      return undefined;
    }
    let isCurrent = true;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const eventCountAtSeed = eventCountRef.current;
    const seed = async (retriesLeft: number) => {
      // An event has answered since the seed began, so a retry has nothing left to add.
      if (eventCountRef.current !== eventCountAtSeed) return;
      try {
        await readAndApply(() => isCurrent);
      } catch {
        if (!isCurrent) return;
        if (retriesLeft > 0) retryTimer = setTimeout(() => seed(retriesLeft - 1), seedRetryDelayMs);
        else setHasSeedFailed(true);
      }
    };
    seed(seedRetries);
    return () => {
      isCurrent = false;
      clearTimeout(retryTimer);
    };
  }, [enabled, readAndApply, seedRetries, seedRetryDelayMs]);

  const needsRecheck = enabled && value !== undefined && shouldRecheck(value);
  useEffect(() => {
    if (!needsRecheck || recheckIntervalMs === undefined) return undefined;
    let isCurrent = true;
    const recheckTimer = setInterval(() => {
      // A failed recheck keeps the last value; the next tick tries again.
      readAndApply(() => isCurrent).catch(() => {});
    }, recheckIntervalMs);
    return () => {
      isCurrent = false;
      clearInterval(recheckTimer);
    };
  }, [needsRecheck, recheckIntervalMs, readAndApply]);

  useEvent(
    event,
    useCallback(
      (payload: unknown) => {
        if (!enabled || !isValid(payload)) return;
        eventCountRef.current += 1;
        setValue(payload);
        setHasSeedFailed(false);
      },
      [enabled, isValid],
    ),
  );

  return { value, hasSeedFailed };
}

export default useEventSeededState;
