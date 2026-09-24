import { isPapiPortMainWorldMessage, PAPI_PORT_CHANNEL } from '@shared/data/papi-port.model';
import type { MessagePortLike, PapiPortProvider } from '@renderer/services/message-port-web-socket';

/** The part of the preload's bridge this provider needs, read off the window at call time */
type WindowWithPapiBridge = Window & {
  electronAPI?: { papi?: { requestPort?: () => void } };
};

/**
 * Obtains this page's PAPI MessagePort from main through the preload's bridge.
 *
 * Installs its `message` listener BEFORE sending the request, so the reply cannot land before
 * anyone is listening; that ordering is what lets this skip the `onload` handshake Electron's
 * documented pattern needs. Accepts only a message posted by this window itself (the preload posts
 * from the top window; a web view is a different `source`) that carries a port, reports the first
 * outcome, and then stops listening, so nothing that arrives later can be mistaken for the port.
 *
 * @param win The window whose bridge to use. Defaults to the global `window`.
 * @experimental
 */
export function createElectronPapiPortProvider(win: Window = window): PapiPortProvider {
  return ({ onPort, onError }) => {
    const bridgedWindow: WindowWithPapiBridge = win;
    const requestPort = bridgedWindow.electronAPI?.papi?.requestPort;
    if (typeof requestPort !== 'function') {
      onError(
        'This page has no electronAPI.papi.requestPort bridge, so it cannot obtain a PAPI port',
      );
      return;
    }

    const onMessage = (event: MessageEvent) => {
      if (event.source !== win) return;
      if (!isPapiPortMainWorldMessage(event.data)) return;
      if (event.data.type === PAPI_PORT_CHANNEL) {
        const [port] = event.ports;
        if (!port) return;
        win.removeEventListener('message', onMessage);
        // A DOM MessagePort satisfies MessagePortLike; the DOM lib types the listener overloads too
        // narrowly to say so.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        onPort(port as unknown as MessagePortLike, event.data.windowId);
        return;
      }
      win.removeEventListener('message', onMessage);
      onError(event.data.reason);
    };

    win.addEventListener('message', onMessage);
    requestPort();
  };
}
