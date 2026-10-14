import type { Schema } from '@shared/models/openrpc.model';

/**
 * Why the extension host stopped without main asking it to.
 *
 * - `'lost-connection'`: the extension host lost its connection to main and ended itself, since it
 *   cannot do anything without that connection.
 * - `'crashed'`: any other exit main did not request — an uncaught fatal error, an OS signal, an
 *   out-of-memory kill.
 *
 * @experimental
 */
export type ExtensionHostStopReason = 'lost-connection' | 'crashed';

/**
 * Payload of the {@link EVENT_NAME_ON_DID_STOP_EXTENSION_HOST} network event and the answer of
 * `platform.getExtensionHostStoppedState`. Carries the reason only; the exit code, signal and pid
 * stay in main's log.
 *
 * @experimental
 */
export type ExtensionHostStoppedEvent = {
  reason: ExtensionHostStopReason;
};

/** Every {@link ExtensionHostStopReason}, for the schema below. */
const EXTENSION_HOST_STOP_REASONS: ExtensionHostStopReason[] = ['lost-connection', 'crashed'];

/**
 * OpenRPC schema of an {@link ExtensionHostStoppedEvent}, shared by every registration that sends
 * one over the network.
 *
 * @experimental
 */
export const EXTENSION_HOST_STOPPED_EVENT_SCHEMA: Schema = {
  type: 'object',
  properties: {
    reason: { type: 'string', enum: EXTENSION_HOST_STOP_REASONS },
  },
  required: ['reason'],
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
 * is gone, so no window sees it. Those windows need no hint: each one's connection was closed
 * cleanly, as a normal close rather than a failure, before the window was destroyed. Other peers,
 * such as the extension host, still receive it. Best effort even on an explicit quit: delivery is
 * asynchronous and a window may be gone before it arrives, so a subscriber must still cope without
 * it.
 *
 * @experimental
 */
export const EVENT_NAME_ON_WILL_SHUT_DOWN = 'platform.onWillShutDown';
