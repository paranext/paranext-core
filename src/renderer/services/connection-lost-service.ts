import { onDidLoseConnection } from '@shared/services/network.service';
import { markShuttingDown, reportConnectionLost } from './connection-lost-store';

/**
 * Subscribes to this renderer losing its network connection and drives the connection-lost store.
 * Call once at app startup. Returns a cleanup function.
 *
 * Listening from startup rather than on demand is what lets the UI react the moment the connection
 * goes, using values it captured while the connection was alive.
 *
 * Also latches the store shut on `beforeunload` and `pagehide`, so a teardown — where every socket
 * dies with 1006 and looks exactly like a broken network — cannot flash the connection-lost state
 * on the way out. `pagehide` as well as `beforeunload` because a reload from within this state
 * takes the `pagehide` path.
 *
 * This covers a window closing while the app stays up, and a reload. It does NOT cover an app quit:
 * main destroys each window on the `isAppShuttingDown()` branch (`src/main/main.ts`), and
 * `destroy()` fires neither event — as main's own comment there records. What keeps the state off
 * screen on a quit is still teardown outrunning paint, unchanged by this latch and not guaranteed
 * by it. Closing that case needs main to tell the renderer it is going down, the same
 * main-to-renderer relay the keyboard gaps and the extension-host disconnect want.
 *
 * TODO(main-renderer-shutdown-relay): deferred to the follow-up work described in
 * `adr-connection-lost-is-renderer-local`. The marker is deliberately a slug rather than a
 * `PT-XXXX`, because the ticket does not exist yet; grep it to find all three deferrals that the
 * one relay closes, and swap in the real id when it is filed.
 */
export function initConnectionLostService(): () => void {
  const unsubscribe = onDidLoseConnection(() => {
    reportConnectionLost();
  });
  const handleUnload = () => {
    markShuttingDown();
  };
  window.addEventListener('beforeunload', handleUnload);
  window.addEventListener('pagehide', handleUnload);
  return () => {
    unsubscribe();
    window.removeEventListener('beforeunload', handleUnload);
    window.removeEventListener('pagehide', handleUnload);
  };
}
