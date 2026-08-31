import { onDidLoseConnection } from '@shared/services/network.service';

/**
 * Store tracking whether this renderer has lost its connection to the network.
 *
 * One-way by design: nothing here clears the state. Recovering the connection needs the socket
 * reconnected AND every method this renderer registered re-announced to main, which this renderer
 * cannot do on its own — so the only recovery available is a reload, which reruns every
 * registration naturally. A store that could flip back to `false` would be claiming a recovery that
 * had not happened.
 */

let isConnectionLost = false;

const listeners = new Set<() => void>();

/** Whether this renderer's connection to the network has been lost. */
export function getIsConnectionLost(): boolean {
  return isConnectionLost;
}

/** Subscribe to state changes. Returns an unsubscribe function. */
export function subscribeToConnectionLost(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Starts listening for this renderer losing its connection. Returns a teardown function that stops
 * listening.
 *
 * Call once at app startup. Listening from startup rather than on demand is what lets the UI react
 * the moment the connection goes, using values it captured while the connection was alive.
 */
export function initConnectionLostStore(): () => void {
  const unsubscribe = onDidLoseConnection(() => {
    // Latched: the first loss is the only one worth reporting, and re-notifying would re-render
    // every subscriber for a state that did not change.
    if (isConnectionLost) return;
    isConnectionLost = true;
    listeners.forEach((listener) => listener());
  });
  return () => {
    unsubscribe();
  };
}

/**
 * Resets the store to its initial state.
 *
 * WARNING: Test-only. @internal
 */
export function resetConnectionLost(): void {
  isConnectionLost = false;
  listeners.clear();
}
