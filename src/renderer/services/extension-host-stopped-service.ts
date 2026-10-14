import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { getErrorMessage } from 'platform-bible-utils';
import {
  EVENT_NAME_ON_DID_START_EXTENSION_HOST,
  EVENT_NAME_ON_DID_STOP_EXTENSION_HOST,
  EVENT_NAME_ON_WILL_SHUT_DOWN,
} from '@shared/models/extension-host-lifecycle.model';
import { markShuttingDown } from './connection-lost-store';
import {
  markExtensionHostRestarted,
  reportExtensionHostStopped,
} from './extension-host-stopped-store';

/**
 * Subscribes this window to main's lifecycle events and drives the stores they feed. Call once at
 * app startup. Returns a cleanup function.
 *
 * - `platform.onDidStopExtensionHost` → the extension-host-stopped store, which the banner reads.
 * - `platform.onDidStartExtensionHost` → the same store's restarting → restarted transition, the
 *   readiness signal after a restart from the banner.
 * - `platform.onWillShutDown` → the connection-lost store's shutdown latch, so this window's own
 *   connection dying a moment later reads as the quit it is. Closes the quit-time gap that the
 *   browser's unload events cannot: main destroys windows on a quit, and `destroy()` raises neither
 *   `beforeunload` nor `pagehide`.
 *
 * Listening from startup rather than on demand: a network event does not replay to a late
 * subscriber, and once the extension host is gone there is nothing left to ask what happened.
 */
export function initExtensionHostStoppedService(): () => void {
  // No explicit type arguments: the event names are literal types registered in `NetworkEvents`
  // (`papi-shared-types.ts`), so `getNetworkEvent` infers each payload from the name, the same way
  // `overlay.service-host.ts` subscribes to `EVENT_NAME_ON_DID_APP_WINDOW_INPUT`.
  const unsubscribeStopped = getNetworkEvent(EVENT_NAME_ON_DID_STOP_EXTENSION_HOST)((event) => {
    reportExtensionHostStopped(event);
  });
  const unsubscribeStarted = getNetworkEvent(EVENT_NAME_ON_DID_START_EXTENSION_HOST)(() => {
    // A no-op unless a restart from the banner is in flight; the first start and a dev-mode
    // restart therefore change nothing here.
    markExtensionHostRestarted();
  });
  const unsubscribeShutDown = getNetworkEvent(EVENT_NAME_ON_WILL_SHUT_DOWN)(() => {
    markShuttingDown();
  });
  return () => {
    unsubscribeStopped();
    unsubscribeStarted();
    unsubscribeShutDown();
  };
}

/**
 * Ask main whether the extension host is already stopped, and report it if so. For a window that
 * was not listening when `platform.onDidStopExtensionHost` fired: one opened after the stop, or one
 * whose renderer had not subscribed yet. Call once, after the network service has connected.
 *
 * Never rejects: a window that cannot ask is no worse off than before, and the event path still
 * covers any later stop.
 */
export async function catchUpExtensionHostStoppedState(): Promise<void> {
  try {
    const stopped = await sendCommand('platform.getExtensionHostStoppedState');
    if (stopped) reportExtensionHostStopped(stopped);
  } catch (error) {
    logger.warn(
      `Could not ask main whether the extension host is stopped: ${getErrorMessage(error)}`,
    );
  }
}
