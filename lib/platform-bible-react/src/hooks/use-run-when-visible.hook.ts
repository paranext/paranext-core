import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Defers work that should not happen while this web view's tab is inactive, and runs it once when
 * the tab is shown again.
 *
 * Rc-dock keeps an inactive tab's pane mounted under `display: none`: the iframe keeps running, so
 * React effects, subscriptions, and reactions to shared state all continue firing at full rate for
 * a view nobody can see. For cheap, data-driven work that is fine, and this hook would only add
 * latency. It is for the two cases where it is not fine: work whose result depends on layout, which
 * a `display: none` pane does not have, and work expensive enough that spending it on a hidden view
 * is a waste — a per-reference search or fetch that a permanently-mounted panel would otherwise
 * launch on every reference change through the whole session.
 *
 * Requests made while hidden collapse into a single pending catch-up rather than queueing, which
 * suits the shape of work this is for: "bring the view up to date with the current state", where
 * only the last request's result would have survived anyway. Work whose every invocation matters
 * (appending to a log, counting events) needs a queue, not this hook.
 *
 * Pair it with `useViewVisibility`, which reports whether the calling view is rendered. See
 * `.claude/rules/cross-view-sync-hidden-views.md` for the wider rule this implements.
 *
 * @param isViewVisible Whether the web view is currently rendered — pass `useViewVisibility()`.
 * @param run The work to perform. Always invoked at its latest identity, so callers need not
 *   memoize it.
 * @returns A stable callback that runs `run` now when visible, or arms the catch-up when hidden.
 *   Its identity never changes, so callers can safely list it in effect dependencies without the
 *   effect re-firing on every visibility flip.
 */
export function useRunWhenVisible(isViewVisible: boolean, run: () => void): () => void {
  const [isRunPending, setIsRunPending] = useState(false);

  // Both reads go through refs so the returned callback can stay referentially stable.
  const runRef = useRef(run);
  runRef.current = run;
  const isViewVisibleRef = useRef(isViewVisible);
  isViewVisibleRef.current = isViewVisible;

  const requestRun = useCallback(() => {
    if (isViewVisibleRef.current) runRef.current();
    else setIsRunPending(true);
  }, []);

  // Consume the pending catch-up on the transition to visible. Clearing the flag before running
  // means a `run` that requests again (or throws) cannot leave the catch-up permanently armed.
  useEffect(() => {
    if (!isViewVisible || !isRunPending) return;
    setIsRunPending(false);
    runRef.current();
  }, [isViewVisible, isRunPending]);

  return requestRun;
}

export default useRunWhenVisible;
