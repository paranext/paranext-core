import { useCallback, useEffect, useRef } from 'react';

/**
 * Schedules a read of this window's dock layout for after the layout has committed, coalescing
 * repeated requests into a single read.
 *
 * A web view event must not be answered by reading the dock layout synchronously. rc-dock calls
 * `onLayoutChange` BEFORE it commits the new layout (`DockLayout.changeLayout` calls the callback,
 * then `setLayout`), the web view service emits its close event as that callback's first statement,
 * and a network event's local subscribers run synchronously — so a read taken inside the handler
 * still sees the layout the dock is changing FROM. For a closing tab that means the read resolves
 * the very tab that is going away, and because the value is unchanged, `useState` bails out and
 * nothing ever corrects it. `platform-dock-layout.component.tsx` states the same fact from the
 * other side: during `onLayoutChange`, `dockLayoutRef.current` still holds the layout being changed
 * from.
 *
 * A macrotask is the deferral that is actually sufficient. rc-dock commits through `setState`, so
 * the new layout is only readable once React has processed that update, and React 18 flushes the
 * sync lane in a MICROtask — one queued from inside the event handler would run first and read the
 * stale layout just the same.
 *
 * Coalescing is what keeps the deferral cheap: a buffered network event drains as one synchronous
 * loop, so N queued opens during startup restoration collapse into one dock walk rather than N.
 *
 * The read still lands in state as a VALUE, so an event that does not change the answer produces
 * the same value and re-renders nobody — the bailout the caller depends on is unaffected by
 * deferring.
 *
 * @param read Called on a later macrotask. Read the dock layout and store the result here; may be a
 *   fresh function each render, and the latest one is always the one that runs.
 * @returns Request a read. Safe to call any number of times per tick; the read runs once.
 */
export function useDeferredDockLayoutRead(read: () => void): () => void {
  // Held in a ref so the returned scheduler keeps ONE identity for the life of the hook. A
  // scheduler whose identity tracked `read` would tear down and rebuild every event subscription
  // that depends on it each time the caller's inputs changed.
  const readRef = useRef(read);
  readRef.current = read;
  const pendingReadRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Cancel a scheduled read on unmount so it cannot set state on an unmounted component.
  useEffect(() => () => clearTimeout(pendingReadRef.current), []);

  return useCallback(() => {
    if (pendingReadRef.current !== undefined) return;
    pendingReadRef.current = setTimeout(() => {
      pendingReadRef.current = undefined;
      readRef.current();
    });
  }, []);
}

export default useDeferredDockLayoutRead;
