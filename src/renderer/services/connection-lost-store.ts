/**
 * Store tracking whether this renderer has lost its connection to the network.
 *
 * One-way by design: nothing here clears the state. Recovering the connection needs the socket
 * reconnected AND every method this renderer registered re-announced to main, which this renderer
 * cannot do on its own — so the only recovery available is a reload, which reruns every
 * registration naturally. A store that could flip back to `false` would be claiming a recovery that
 * had not happened.
 *
 * Deliberately import-free, like `workspace-updating-store.ts`: the wiring that feeds it lives in
 * `connection-lost-service.ts`. Keeping the state module free of the network service is what lets a
 * consumer's test drive this store directly instead of mocking a service graph to reach it.
 */

let isConnectionLost = false;

/**
 * Whether this renderer is on its way down. Latched separately from the loss itself because the two
 * are different facts: every websocket dies with 1006 on an ordinary quit, so a loss reported after
 * this is set is the app closing rather than the network breaking.
 */
let isShuttingDown = false;

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
 * Records that this renderer is closing, so a websocket death from here on is read as the app
 * quitting rather than as a failure worth interrupting the user about.
 *
 * `INTENTIONAL_CLOSE_CODE` is unreachable from every peer today (see
 * `adr-renderer-websocket-suspend-disconnect`), so every socket dies with 1006 on the way down and
 * `isCleanCloseEvent` cannot tell a quit from a broken network. Main solves the same problem with
 * `isAppShuttingDown()` from `shutdown-latch.service`; that service is main's, so the renderer
 * latches its own equivalent from the browser's own unload signal.
 */
export function markShuttingDown(): void {
  isShuttingDown = true;
}

/**
 * Records that this renderer's connection has been lost, unless the app is already closing.
 *
 * Latched: the first loss is the only one worth reporting, and re-notifying would re-render every
 * subscriber for a state that did not change.
 */
export function reportConnectionLost(): void {
  if (isShuttingDown || isConnectionLost) return;
  isConnectionLost = true;
  listeners.forEach((listener) => listener());
}

/**
 * Resets the store to its initial state.
 *
 * WARNING: Test-only.
 *
 * @internal
 */
export function resetConnectionLost(): void {
  isConnectionLost = false;
  isShuttingDown = false;
  listeners.clear();
}
