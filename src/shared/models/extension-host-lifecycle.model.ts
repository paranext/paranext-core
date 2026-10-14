/**
 * Why the extension host stopped without main asking it to.
 *
 * - `'lost-connection'`: it ended itself because its connection to main died (see
 *   `exit-on-lost-connection.ts` in the extension host).
 * - `'crashed'`: any other exit main did not request — an uncaught fatal error, an OS signal, an
 *   out-of-memory kill.
 *
 * @experimental
 */
export type ExtensionHostStopReason = 'lost-connection' | 'crashed';

/**
 * Payload of the {@link EVENT_NAME_ON_DID_STOP_EXTENSION_HOST} network event. Carries the reason
 * only; the exit code, signal and pid stay in main's log.
 *
 * @experimental
 */
export type ExtensionHostStoppedEvent = {
  reason: ExtensionHostStopReason;
};

/**
 * Name of the network event main emits when the extension host stops without being asked to. Not
 * emitted for a restart main itself requested (`platform.restartExtensionHost`, the dev-mode file
 * watcher) or while the app is shutting down. Every window shows its "extensions have stopped"
 * notice on it.
 *
 * @experimental
 */
export const EVENT_NAME_ON_DID_STOP_EXTENSION_HOST = 'platform.onDidStopExtensionHost';

/**
 * Name of the network event the extension host emits once its extensions have initialized. No
 * payload. Emitted by every extension host process, including the first; its use is the readiness
 * signal a window waits for after `platform.restartExtensionHost`, since that command settles at
 * fork time, long before the new process can serve anything.
 *
 * @experimental
 */
export const EVENT_NAME_ON_DID_START_EXTENSION_HOST = 'platform.onDidStartExtensionHost';

/**
 * Name of the network event main emits when the app quits. No payload. On an explicit quit (Cmd+Q,
 * the Quit menu item, `platform.quit` or `platform.restart`) it is emitted before any window is
 * destroyed, and a window uses it to read the death of its own connection a moment later as the app
 * going away rather than as a failure.
 *
 * When closing windows shuts the app down instead (a close-all from the primary window's close
 * button, or closing the last window on Windows and Linux), it is emitted only after every window
 * is gone, so no window sees it; those windows closed their connections cleanly (1001) before they
 * were destroyed, so they need no hint. Other peers, such as the extension host, still receive it.
 * Best effort even on an explicit quit: delivery is asynchronous and a window may be gone before it
 * arrives, so a subscriber must still cope without it.
 *
 * @experimental
 */
export const EVENT_NAME_ON_WILL_SHUT_DOWN = 'platform.onWillShutDown';
