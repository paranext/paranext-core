/**
 * Trailing-edge debouncer with an explicit lifecycle, for the web view's keystroke-driven PDP save.
 * `platform-bible-utils`' `debounce` exposes no `flush`/`cancel`, which leaves two holes in a
 * debounced save:
 *
 * - Renderer death (crash, web-view dispose, app quit) inside the trailing window silently loses the
 *   final edits.
 * - A pending trailing call captures the OLD chapter's USJ but resolves AFTER rapid chapter
 *   navigation swaps the save function's closure to the NEW chapter — a cross-chapter stale write.
 *
 * `flush` fires the pending call immediately (with its captured args) and clears the timer;
 * `cancel` discards it. Callers wire `flush` to unmount/blur/pagehide and to the moment BEFORE the
 * captured context changes (see the web view's book/chapter effect).
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
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let pendingArgs: TArgs | undefined;

  const clear = () => {
    if (timeout !== undefined) clearTimeout(timeout);
    timeout = undefined;
    pendingArgs = undefined;
  };

  const fire = () => {
    const args = pendingArgs;
    clear();
    // Cleared BEFORE invoking so a re-schedule from inside `fn` is not wiped out.
    if (args) fn(...args);
  };

  return {
    schedule: (...args: TArgs) => {
      pendingArgs = args;
      if (timeout !== undefined) clearTimeout(timeout);
      timeout = setTimeout(fire, delayMs);
    },
    flush: () => {
      if (pendingArgs) fire();
    },
    cancel: clear,
    isPending: () => pendingArgs !== undefined,
  };
}
