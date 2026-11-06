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
 * This covers a window closing while the app stays up, and a reload. An app quit takes a different
 * route: main destroys each window on the `isAppShuttingDown()` branch (`src/main/main.ts`), and
 * `destroy()` fires neither event. That case is latched by `extension-host-stopped-service.ts`,
 * which hears main's `platform.onWillShutDown` network event and calls `markShuttingDown` too. It
 * is best effort (the event may arrive after the window is gone), so teardown outrunning paint
 * remains the backstop.
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
