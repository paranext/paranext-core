import { initialize, onDidLoseConnection } from '@shared/services/network.service';
import {
  markShuttingDown,
  reportConnectionLost,
  reportConnectionNeverEstablished,
} from './connection-lost-store';

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

/**
 * Initializes the network service, recording in the connection-lost store if the first connect
 * fails so the window shows its couldn't-start state instead of a UI where nothing works.
 * `onDidLoseConnection` covers only a connection that was established, so this is the only report a
 * failed startup gets.
 *
 * The recorded state is one-way, like a lost connection. A later PAPI request can call the network
 * service's `initialize` again; if that succeeds, this window is connected but its startup has
 * already stopped, so it keeps showing the couldn't-start state and Reload remains the recovery.
 *
 * @throws Whatever the network service's `initialize` rejected with, after recording it
 */
export async function initializeNetworkReportingFailure(): Promise<void> {
  try {
    await initialize();
  } catch (e) {
    reportConnectionNeverEstablished();
    throw e;
  }
}
