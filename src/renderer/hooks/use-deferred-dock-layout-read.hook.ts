import { useCallback, useEffect, useMemo, useRef } from 'react';

/** Request a deferred read, and revoke one that has been requested but has not run yet. */
export type DeferredDockLayoutRead = {
  /** Request a read. Safe to call any number of times per tick; the read runs once. */
  requestRead: () => void;
  /**
   * Revoke a requested read that has not run yet. For a consumer that stops caring about the answer
   * before it arrives — one that has just cleared the value the read would repopulate.
   */
  cancelPendingRead: () => void;
};

/**
 * Schedules a read of this window's dock layout for after the dock has adopted the new layout,
 * coalescing repeated requests into a single read.
 *
 * A web view event must not be answered by reading the dock layout synchronously. rc-dock calls
 * `onLayoutChange` BEFORE it adopts the new layout (`DockLayout.changeLayout` calls the callback,
 * then `setLayout`), the web view service emits its close event as that callback's first statement,
 * and a network event's local subscribers run synchronously — so a read taken inside the handler
 * still sees the layout the dock is changing FROM. For a closing tab that means the read resolves
 * the very tab that is going away, and because the value is unchanged, `useState` bails out and
 * nothing ever corrects it. `platform-dock-layout.component.tsx` states the same fact from the
 * other side: during `onLayoutChange`, `dockLayoutRef.current` still holds the layout being changed
 * from.
 *
 * A MICROTASK is sufficient, and is what `platform-dock-layout.component.tsx` already uses for the
 * same post-`onLayoutChange` read (`queueMicrotask(refreshWindowTitle)`). No React commit has to
 * happen first: `DockLayout.setLayout` assigns `this.tempLayout` synchronously before calling
 * `setState`, and `getLayout()` — the source every dock walk goes through — returns
 * `this.tempLayout || this.state.layout`. So the new layout is readable the instant the synchronous
 * stack unwinds, and `render` clears `tempLayout` only once `state.layout` already holds the same
 * value, leaving no window in which the old layout is visible again.
 *
 * Coalescing is what keeps the deferral cheap: a buffered network event drains as one synchronous
 * loop, so N queued opens during startup restoration collapse into one dock walk rather than N.
 *
 * The read still lands in state as a VALUE, so an event that does not change the answer produces
 * the same value and re-renders nobody — the bailout the caller depends on is unaffected by
 * deferring.
 *
 * @param read Called on a later microtask. Read the dock layout and store the result here; may be a
 *   fresh function each render, and the latest committed one is always the one that runs.
 * @returns {@link DeferredDockLayoutRead}
 */
export function useDeferredDockLayoutRead(read: () => void): DeferredDockLayoutRead {
  // Held in a ref so the returned functions keep ONE identity each for the life of the hook.
  // Functions whose identity tracked `read` would tear down and rebuild every event subscription
  // that depends on them each time the caller's inputs changed.
  //
  // Written in an effect rather than during render, so a render React discards (a StrictMode
  // double-invoke, an interrupted concurrent render) cannot install a callback that was never
  // committed. Reads are only ever requested from committed code — an event subscription or a
  // post-commit effect — so an effect-time write is never too late.
  const readRef = useRef(read);
  useEffect(() => {
    readRef.current = read;
  }, [read]);

  // A queued microtask cannot be withdrawn, so this flag is both the "already requested" guard and
  // the cancellation: the callback consults it and does nothing if it was cleared while queued.
  // Tracking cancellation in the flag rather than in a task handle also means cleanup cannot leave
  // a stale handle behind that wedges the scheduler for a re-mounted hook instance.
  const isReadPendingRef = useRef(false);

  const cancelPendingRead = useCallback(() => {
    isReadPendingRef.current = false;
  }, []);

  // Cancel a requested read on unmount so it cannot set state on an unmounted component.
  useEffect(() => cancelPendingRead, [cancelPendingRead]);

  const requestRead = useCallback(() => {
    if (isReadPendingRef.current) return;
    isReadPendingRef.current = true;
    queueMicrotask(() => {
      if (!isReadPendingRef.current) return;
      isReadPendingRef.current = false;
      readRef.current();
    });
  }, []);

  return useMemo(() => ({ requestRead, cancelPendingRead }), [requestRead, cancelPendingRead]);
}

export default useDeferredDockLayoutRead;
