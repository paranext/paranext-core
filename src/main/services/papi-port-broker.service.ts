import { MessageChannelMain } from 'electron';
import { logger } from '@shared/services/logger.service';
import { acceptLocalClient } from '@shared/services/network.service';
import {
  PAPI_PORT_CHANNEL,
  PAPI_PORT_ERROR_CHANNEL,
  PAPI_PORT_REQUEST_CHANNEL,
  PapiPortError,
  PapiPortGrant,
} from '@shared/data/papi-port.model';
import { getErrorMessage } from 'platform-bible-utils';
import { doesNavigationReplaceRendererRegistrations } from '@main/services/window-state.service';
import {
  MessagePortMainLike,
  MessagePortServerSocket,
} from '@main/services/message-port-server-socket';

/** The frame surface the broker replies through: `WebFrameMain.postMessage` */
export type BrokerFrame = {
  postMessage(channel: string, message: unknown, transfer?: unknown[]): void;
};

/** The IPC event surface the broker reads: `IpcMainEvent.senderFrame` */
export type BrokerIpcEvent = {
  senderFrame: BrokerFrame | null;
};

/**
 * The `WebContents` surface the broker uses, typed structurally so tests can drive it. The handler
 * is registered on `webContents.ipc`, which outlives any one frame, rather than on `mainFrame.ipc`:
 * a crash-reload or process swap can replace the main frame, and a handler bound to the old frame
 * would never hear the new page.
 */
export type BrokerWebContents = {
  ipc: {
    on(channel: string, listener: (event: BrokerIpcEvent, ...args: unknown[]) => void): unknown;
  };
  mainFrame: BrokerFrame | null;
  on(
    event: 'did-start-navigation',
    listener: (details: { isMainFrame: boolean; isSameDocument: boolean }) => void,
  ): unknown;
  on(event: 'render-process-gone', listener: () => void): unknown;
  on(event: 'destroyed', listener: () => void): unknown;
};

type MessageChannelFactory = () => { port1: MessagePortMainLike; port2: unknown };

type WindowPortState = {
  /**
   * The window's live channel to main, if it has one. A window has at most one at a time: extension
   * code shares the page's origin and can reach the preload's bridge, so a request while this is
   * set is refused rather than answered. It is cleared when the channel closes, from either end,
   * and only then can the window be served again. Keying this on the channel rather than on a page
   * load means an old page that asks after a reload has started, and then unloads, cannot leave the
   * new page refused.
   */
  socket: MessagePortServerSocket | undefined;
};

const NAVIGATED_AWAY_REASON = 'page navigated away';
const RENDERER_GONE_REASON = 'renderer process gone';
const ALREADY_CONNECTED_REASON =
  'This window already has an open PAPI port; a window gets one at a time';

const windowStates = new Map<string, WindowPortState>();

let createMessageChannel: MessageChannelFactory = () => new MessageChannelMain();

/** Replace how channels are made so a test can observe both ends */
export function setMessageChannelFactoryForTesting(factory: MessageChannelFactory): void {
  createMessageChannel = factory;
}

/** Forget every window, for test isolation */
export function resetForTesting(): void {
  windowStates.clear();
}

function closePort(state: WindowPortState, code: number, reason: string): void {
  state.socket?.close(code, reason);
  state.socket = undefined;
}

/**
 * Tell the page it gets no port. The frame may already be gone, and a refusal nobody receives needs
 * no handling beyond the log line.
 */
function postPortError(windowId: string, frame: BrokerFrame, reason: string): void {
  const message: PapiPortError = { reason };
  try {
    frame.postMessage(PAPI_PORT_ERROR_CHANNEL, message);
  } catch (error) {
    logger.warn(
      `Could not tell window ${windowId} it gets no PAPI port (${reason}): ${getErrorMessage(error)}`,
    );
  }
}

function grantPort(windowId: string, state: WindowPortState, frame: BrokerFrame): void {
  const { port1, port2 } = createMessageChannel();
  const socket = new MessagePortServerSocket(port1);
  try {
    acceptLocalClient(socket, `renderer:${windowId}`);
  } catch (error) {
    const reason = getErrorMessage(error);
    logger.warn(`Could not serve a PAPI port to window ${windowId}: ${reason}`);
    socket.close(1011, reason);
    postPortError(windowId, frame, reason);
    return;
  }
  state.socket = socket;
  // However the channel closes, the window can then be served again
  socket.addEventListener('close', () => {
    if (state.socket === socket) state.socket = undefined;
  });
  const grant: PapiPortGrant = { windowId };
  try {
    frame.postMessage(PAPI_PORT_CHANNEL, grant, [port2]);
  } catch (error) {
    // The page never received the port, so the window must not count as connected
    const reason = getErrorMessage(error);
    logger.warn(`Could not deliver a PAPI port to window ${windowId}: ${reason}`);
    closePort(state, 1011, reason);
  }
}

/**
 * Start answering `webContents`'s requests for a PAPI port. Call before the window loads its page
 * so the handler exists before the page can ask; the handler lives on the `WebContents`, so it
 * keeps answering across reloads.
 *
 * @param webContents The window's `WebContents`
 * @param windowId The window's platform id, which labels its RPC server `renderer:<windowId>`
 */
export function registerWindow(webContents: BrokerWebContents, windowId: string): void {
  const state: WindowPortState = { socket: undefined };
  windowStates.set(windowId, state);

  webContents.ipc.on(PAPI_PORT_REQUEST_CHANNEL, (event) => {
    const frame = event.senderFrame;
    // Refuses other frames, but a same-origin web view can drive the page frame's bridge, so what
    // stops a second channel is the one-open-port-per-window rule below
    if (!frame || frame !== webContents.mainFrame) {
      logger.warn(
        `Ignored a PAPI port request for window ${windowId} from a frame that is not its page`,
      );
      return;
    }
    if (state.socket) {
      logger.warn(`Window ${windowId} already has an open PAPI port; refusing a second request`);
      // Answered rather than ignored so a second socket in the page fails at once instead of
      // waiting out its connect timeout
      postPortError(windowId, frame, ALREADY_CONNECTED_REASON);
      return;
    }
    grantPort(windowId, state, frame);
  });

  webContents.on('did-start-navigation', (details) => {
    if (!doesNavigationReplaceRendererRegistrations(details)) return;
    // The page's own unload usually closed the port already; this covers a page that never got to
    closePort(state, 1001, NAVIGATED_AWAY_REASON);
  });

  webContents.on('render-process-gone', () => {
    // Closed here rather than left to the port's own close notification, which can arrive after
    // the reload's navigation has already replaced the socket, so the crash always reads as 1006
    closePort(state, 1006, RENDERER_GONE_REASON);
  });

  webContents.on('destroyed', () => {
    // A window id can be reused by a new window before this one's `destroyed` arrives; only forget
    // the entry this registration made
    if (windowStates.get(windowId) === state) windowStates.delete(windowId);
  });
}

/**
 * Close one window's port on purpose, so the renderer reads it as a clean close. Call before the
 * window is destroyed.
 *
 * @param windowId The window whose port to close. A window with no open port is ignored.
 * @param code WebSocket close code to report to both ends
 * @param reason Human-readable reason to report to both ends
 */
export function closeWindowPort(windowId: string, code: number, reason: string): void {
  const state = windowStates.get(windowId);
  if (!state) return;
  closePort(state, code, reason);
}

/**
 * Close every open port, for app shutdown
 *
 * @param code WebSocket close code to report to both ends
 * @param reason Human-readable reason to report to both ends
 */
export function closeAllPorts(code: number, reason: string): void {
  windowStates.forEach((state) => closePort(state, code, reason));
}
