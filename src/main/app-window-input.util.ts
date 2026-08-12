import { logger } from '@shared/services/logger.service';
import { createNetworkEventEmitterAsync } from '@shared/services/network.service';
import {
  AppWindowInputEvent,
  AppWindowInputKind,
  EVENT_NAME_ON_DID_APP_WINDOW_INPUT,
} from '@shared/services/window.service-model';
import { getErrorMessage, PlatformEventEmitter } from 'platform-bible-utils';

/**
 * The parts of Electron's keyboard `Input` and `MouseInputEvent` that app-window input
 * classification reads. Both event shapes carry a `type`; only the keyboard one carries a `key`.
 */
type AppWindowInputSource = { type: string; key?: string };

/**
 * Determine whether `input` is one of the gestures that dismisses transient overlays and, if so,
 * which kind it is. `mouseUp` and every non-Escape key are ignored so the app-window input event
 * stays limited to dismissal gestures.
 *
 * @returns The {@link AppWindowInputKind} to announce, or `undefined` if this input is not a
 *   dismissal gesture
 */
export function getAppWindowInputKind(input: AppWindowInputSource): AppWindowInputKind | undefined {
  if (input.type === 'mouseDown') return 'mouseDown';
  if (input.type === 'keyDown' && input.key === 'Escape') return 'escape';
  return undefined;
}

/** Emitter for {@link EVENT_NAME_ON_DID_APP_WINDOW_INPUT}, undefined until the event is started */
let appWindowInputEmitter: PlatformEventEmitter<AppWindowInputEvent> | undefined;

/**
 * Register the app-window input network event so {@link announceAppWindowInput} can emit on it. Call
 * once during main-process startup, after the network service is initialized.
 *
 * A registration failure is logged and swallowed: overlays lose only their app-wide dismissal
 * signal (each overlay still dismisses on its own outside-click, blur, and focus-change handling),
 * which is not worth failing startup over.
 */
export async function startAppWindowInputEvent(): Promise<void> {
  try {
    appWindowInputEmitter = await createNetworkEventEmitterAsync(
      EVENT_NAME_ON_DID_APP_WINDOW_INPUT,
      {
        notification: {
          summary:
            'Emitted for every mouse-down and every Escape key-down anywhere in the app window, ' +
            'including inside WebView iframes.',
          params: [
            {
              name: 'appWindowInputEvent',
              required: true,
              summary: 'Which input gesture happened.',
              schema: {
                type: 'object',
                properties: { kind: { type: 'string', enum: ['mouseDown', 'escape'] } },
                required: ['kind'],
              },
            },
          ],
          'x-experimental': true,
        },
      },
    );
  } catch (e) {
    logger.warn(
      `Failed to register the ${EVENT_NAME_ON_DID_APP_WINDOW_INPUT} event. Overlays will not ` +
        `dismiss on input inside web views. ${getErrorMessage(e)}`,
    );
  }
}

/**
 * Announce an app-window mouse or keyboard input to the rest of the app if it is a gesture that
 * dismisses transient overlays. No-op for every other input and before
 * {@link startAppWindowInputEvent} has registered the event.
 *
 * Never calls `preventDefault` on the input — the focused frame must still receive it (e.g. the
 * scripture editor acts on Escape itself). Dismissing an already-dismissed overlay is a no-op, so
 * the two paths can safely overlap.
 */
export function announceAppWindowInput(input: AppWindowInputSource): void {
  const kind = getAppWindowInputKind(input);
  if (!kind || !appWindowInputEmitter) return;
  appWindowInputEmitter.emit({ kind });
}
