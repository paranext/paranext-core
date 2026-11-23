import {
  SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS,
  UNSETTLED_RECHECK_INTERVAL_MS,
} from '@renderer/hooks/use-send-receive-availability.hook';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * How long to wait between seed attempts. Aliases the sibling availability hook's interval rather
 * than restating the number: both pace the same send/receive activation race, and a literal here
 * would let the two drift apart silently.
 */
export const SYNC_SEED_RETRY_INTERVAL_MS = UNSETTLED_RECHECK_INTERVAL_MS;

/**
 * How long to keep retrying a seed before giving up and reporting that the answer is unknown.
 * Aliases the sibling availability hook's window, for the same reason as
 * {@link SYNC_SEED_RETRY_INTERVAL_MS}.
 */
export const SYNC_SEED_RETRY_WINDOW_MS = SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS;

/** What one {@link seedWithRetry} loop reads, and what it does with the answer. */
export type SeedWithRetryOptions<T> = {
  /** Reads a snapshot, resolving `undefined` when it could not be read. Must not throw. */
  read: () => Promise<T | undefined>;
  /** Applies a snapshot that answered. Runs at most once per loop. */
  apply: (snapshot: T) => void;
  /**
   * Runs instead of {@link SeedWithRetryOptions.apply} when the retry window closed with no answer.
   * Omit when there is nothing to say — leaving the initial state standing IS the honest answer.
   */
  onExhausted?: () => void;
  /**
   * Whether a live event has already been applied to this input's state. Checked before and after
   * each read: once true the snapshot is stale by definition and there is nothing left to retry
   * for. Read through a callback rather than passed by value so each attempt sees the current
   * answer.
   */
  hasEventApplied: () => boolean;
  /**
   * The run counter for this loop's input, bumped here on start and on cleanup so a read resolving
   * after teardown is recognised and dropped rather than setting state on a torn-down consumer.
   *
   * Owned by the input rather than by this loop, because a caller may need a teardown to cancel
   * OTHER reads sequenced against the same counter (the claim's follow-up read is). What must not
   * be shared is one input's counter with another input's loop — see this function's own doc.
   */
  runRef: { current: number };
  /** Names this input in the two "unexpected failure" logs, e.g. `sync status`, `sync activity`. */
  logLabel: string;
};

/**
 * Runs one seed-with-retry loop, started by a caller and stopped by the cleanup it returns.
 *
 * Every input that has to be correct from the moment its consumer starts needs the same loop — read
 * a snapshot, retry on a spare schedule while the command may still be unregistered, stop the
 * moment a live event has made the snapshot stale — so it lives here once, parameterized by what to
 * read and what to do with the answer. The seed is the point: the events these inputs come from
 * fire on TRANSITIONS only, so a consumer starting mid-sync would otherwise report idle until that
 * sync ends. The seed RETRIES because the case it exists for is the case where one attempt cannot
 * succeed: an unregistered command rejects rather than answering, so a single attempt would give up
 * permanently during exactly the cold start it was written to fix.
 *
 * Nothing is shared BETWEEN loops. This function holds no state of its own: every piece of mutable
 * state a loop touches ({@link SeedWithRetryOptions.runRef},
 * {@link SeedWithRetryOptions.hasEventApplied}, and whatever
 * {@link SeedWithRetryOptions.apply}/{@link SeedWithRetryOptions.onExhausted} write) is supplied by
 * the caller, so one loop giving up, retrying, or being torn down cannot reach another's state.
 */
export function seedWithRetry<T>({
  read,
  apply,
  onExhausted,
  hasEventApplied,
  runRef,
  logLabel,
}: SeedWithRetryOptions<T>): () => void {
  runRef.current += 1;
  const run = runRef.current;
  let retryTimeout: ReturnType<typeof setTimeout> | undefined;

  const seed = async (deadline: number) => {
    // Checked before the read as well as after it: a retry scheduled before an event arrived would
    // otherwise spend a whole RPC round trip on an answer that is already known to be discarded.
    if (hasEventApplied()) return;
    const snapshot = await read();
    if (run !== runRef.current) return;
    // An event beat the snapshot here. It describes a later moment, so the snapshot is discarded
    // rather than merged — applying only part of it would pair this sync's status with values from
    // before the transition. No point retrying either: the live stream has taken over.
    if (hasEventApplied()) return;

    if (!snapshot) {
      if (performance.now() >= deadline) {
        onExhausted?.();
        return;
      }
      retryTimeout = setTimeout(() => {
        seed(deadline).catch((e: unknown) => {
          logger.warn(`Unexpected failure re-seeding ${logLabel}: ${getErrorMessage(e)}`);
        });
      }, SYNC_SEED_RETRY_INTERVAL_MS);
      return;
    }

    apply(snapshot);
  };

  // Monotonic, not wall-clock: this runs during startup, when the wall clock can be stepped. A step
  // backwards would stretch the retry window and a step forwards would close it before the
  // activation race it exists to cover has played out.
  seed(performance.now() + SYNC_SEED_RETRY_WINDOW_MS).catch((e: unknown) => {
    // `read` swallows its own failures, so reaching here means a bug in the code above rather than
    // an unavailable command — worth a log that says so.
    logger.warn(`Unexpected failure seeding ${logLabel}: ${getErrorMessage(e)}`);
  });

  return () => {
    runRef.current += 1;
    if (retryTimeout) clearTimeout(retryTimeout);
  };
}
