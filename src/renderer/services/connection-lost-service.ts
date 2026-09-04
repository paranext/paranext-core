import { onDidLoseConnection } from '@shared/services/network.service';
import { markShuttingDown, reportConnectionLost } from './connection-lost-store';

/**
 * Subscribes to this renderer losing its network connection and drives the connection-lost store.
 * Call once at app startup. Returns a cleanup function.
 *
 * Listening from startup rather than on demand is what lets the UI react the moment the connection
 * goes, using values it captured while the connection was alive.
 *
 * Also latches the store shut on `beforeunload` and `pagehide`, so an ordinary quit — where every
 * socket dies with 1006 and looks exactly like a broken network — cannot flash the connection-lost
 * state on the way out. `pagehide` as well as `beforeunload` because a reload from within this
 * state takes the `pagehide` path.
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
