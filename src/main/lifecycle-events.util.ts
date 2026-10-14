import { logger } from '@shared/services/logger.service';
import { createNetworkEventEmitterAsync } from '@shared/services/network.service';
import {
  EVENT_NAME_ON_DID_STOP_EXTENSION_HOST,
  EVENT_NAME_ON_WILL_SHUT_DOWN,
  ExtensionHostStoppedEvent,
} from '@shared/models/extension-host-lifecycle.model';
import { getErrorMessage, PlatformEventEmitter } from 'platform-bible-utils';

/** Emitter for {@link EVENT_NAME_ON_DID_STOP_EXTENSION_HOST}, undefined until registered */
let extensionHostStoppedEmitter: PlatformEventEmitter<ExtensionHostStoppedEvent> | undefined;
/** Emitter for {@link EVENT_NAME_ON_WILL_SHUT_DOWN}, undefined until registered */
let appWillShutDownEmitter: PlatformEventEmitter<undefined> | undefined;

/**
 * Register the two lifecycle network events so the announce functions below can emit on them. Call
 * once during main-process startup, after the network service is initialized.
 *
 * A registration failure is logged and swallowed: the windows lose their "extensions have stopped"
 * notice and their quit-time hint, which is not worth failing startup over. Each event is
 * registered independently, so one failing does not take the other with it.
 */
export async function startLifecycleEvents(): Promise<void> {
  try {
    extensionHostStoppedEmitter = await createNetworkEventEmitterAsync(
      EVENT_NAME_ON_DID_STOP_EXTENSION_HOST,
      {
        notification: {
          summary:
            'Emitted when the extension host stops without being asked to: it lost its ' +
            'connection to main, or it exited for any other reason. Not emitted for a requested ' +
            'restart or during app shutdown.',
          params: [
            {
              name: 'extensionHostStoppedEvent',
              required: true,
              summary: 'Why the extension host stopped.',
              schema: {
                type: 'object',
                properties: {
                  reason: { type: 'string', enum: ['lost-connection', 'crashed'] },
                },
                required: ['reason'],
              },
            },
          ],
          'x-experimental': true,
        },
      },
    );
  } catch (e) {
    logger.warn(
      `Failed to register the ${EVENT_NAME_ON_DID_STOP_EXTENSION_HOST} event. Windows will not ` +
        `be told when the extension host stops. ${getErrorMessage(e)}`,
    );
  }
  try {
    appWillShutDownEmitter = await createNetworkEventEmitterAsync(EVENT_NAME_ON_WILL_SHUT_DOWN, {
      notification: {
        summary:
          'Emitted when the app begins to quit, before any window is destroyed. No payload. ' +
          'Best effort: a window may be gone before it arrives.',
        params: [],
        'x-experimental': true,
      },
    });
  } catch (e) {
    logger.warn(
      `Failed to register the ${EVENT_NAME_ON_WILL_SHUT_DOWN} event. A quit may flash the ` +
        `connection-lost notice. ${getErrorMessage(e)}`,
    );
  }
}

/**
 * Tell every window that the extension host stopped without being asked to. No-op before
 * {@link startLifecycleEvents} has registered the event. A failed emit is warned about and
 * swallowed: this runs inside the child-process `exit` handler, which must finish its own cleanup
 * regardless.
 */
export function announceExtensionHostStopped(event: ExtensionHostStoppedEvent): void {
  if (!extensionHostStoppedEmitter) return;
  try {
    extensionHostStoppedEmitter.emit(event);
  } catch (e) {
    logger.warn(
      `Failed to announce the extension host stop on ${EVENT_NAME_ON_DID_STOP_EXTENSION_HOST}. ${getErrorMessage(e)}`,
    );
  }
}

/**
 * Tell every window the app is about to quit. No-op before {@link startLifecycleEvents} has
 * registered the event. A failed emit is warned about and swallowed: the quit must proceed.
 */
export function announceAppWillShutDown(): void {
  if (!appWillShutDownEmitter) return;
  try {
    appWillShutDownEmitter.emit(undefined);
  } catch (e) {
    logger.warn(
      `Failed to announce the app shutdown on ${EVENT_NAME_ON_WILL_SHUT_DOWN}. ${getErrorMessage(e)}`,
    );
  }
}
