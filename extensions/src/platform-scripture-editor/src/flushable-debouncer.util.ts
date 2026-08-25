import { debounce } from 'platform-bible-utils';

/**
 * Trailing-edge debouncer with an explicit lifecycle, for the web view's keystroke-driven PDP save.
 * A thin fire-and-forget adapter over `platform-bible-utils`' shared `debounce` (which carries the
 * actual `flush`/`cancel` machinery): the shared debounce hands every call a promise for the
 * pending invocation and `cancel` REJECTS it, so a keystroke save that ignored the return value
 * would produce unhandled rejections. This adapter keeps the promise plumbing internal (each
 * scheduled call's promise gets a no-op rejection handler) and exposes the void-returning
 * `schedule`/`flush`/`cancel`/`isPending` surface the save pipeline wants.
 *
 * Why a debounced save needs `flush` at all — two holes in a plain trailing-edge debounce:
 *
 * - Renderer death (crash, web-view dispose, app quit) inside the trailing window silently loses the
 *   final edits.
 * - A pending trailing call captures the OLD chapter's USJ but resolves AFTER rapid chapter
 *   navigation swaps the save function's closure to the NEW chapter — a cross-chapter stale write.
 *
 * `flush` fires the pending call immediately (synchronously, with its captured args) and clears the
 * timer; `cancel` discards it. Callers wire `flush` to unmount/blur/pagehide and to the moment
 * BEFORE the captured context changes (see the web view's book/chapter effect).
 */
export interface FlushableDebouncer<TArgs extends unknown[]> {
  /** (Re)arm the trailing-edge timer with the latest arguments. */
  schedule: (...args: TArgs) => void;
  /** Fire the pending call NOW (no-op when nothing is pending) and clear the timer. */
  flush: () => void;
  /** Discard the pending call and clear the timer. */
  cancel: () => void;
  /** Whether a call is currently pending. */
  isPending: () => boolean;
}

export function createFlushableDebouncer<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delayMs: number,
): FlushableDebouncer<TArgs> {
  // Pending-ness is tracked here rather than exposed by the shared debounce. Cleared BEFORE `fn`
  // runs (in the wrapped callback below) so a re-schedule from inside `fn` is not wiped out.
  let isPending = false;

  const debouncedFn = debounce((...args: TArgs) => {
    isPending = false;
    fn(...args);
  }, delayMs);

  return {
    schedule: (...args: TArgs) => {
      isPending = true;
      // Swallow the pending promise's rejection: `cancel` rejects it by design, and this adapter's
      // callers are fire-and-forget (outcomes are handled inside `fn` itself).
      debouncedFn(...args).catch(() => undefined);
    },
    flush: () => {
      debouncedFn.flush();
    },
    cancel: () => {
      isPending = false;
      debouncedFn.cancel();
    },
    isPending: () => isPending,
  };
}
