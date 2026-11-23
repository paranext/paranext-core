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
    event: 'did-frame-navigate',
    listener: (
      event: unknown,
      url: string,
      httpResponseCode: number,
      httpStatusText: string,
      isMainFrame: boolean,
    ) => void,
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

/** How main hears about a registered window's channel */
export type BrokerWindowOptions = {
  /**
   * Called once each time a port the window's page received closes, from either end and for any
   * reason. Not called for a port the page never received, nor for an old port that closes after
   * the window has already been served a new one.
   */
  onPortClosed?: (windowId: string) => void;
};

function grantPort(
  windowId: string,
  state: WindowPortState,
  frame: BrokerFrame,
  options: BrokerWindowOptions,
): void {
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
  let wasDelivered = false;
  // However the channel closes, the window can then be served again. A close main starts runs this
  // synchronously, before `closePort` clears the state, so every close of the current port counts
  socket.addEventListener('close', () => {
    if (state.socket !== socket) return;
    state.socket = undefined;
    if (wasDelivered) options.onPortClosed?.(windowId);
  });
  const grant: PapiPortGrant = { windowId };
  try {
    frame.postMessage(PAPI_PORT_CHANNEL, grant, [port2]);
    wasDelivered = true;
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
 * @param options How main hears about the window's channel closing
 */
export function registerWindow(
  webContents: BrokerWebContents,
  windowId: string,
  options: BrokerWindowOptions = {},
): void {
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
    grantPort(windowId, state, frame, options);
  });

  // Closed when a main-frame navigation commits, not when it starts: a navigation can start and
  // then be abandoned (turned into a download, cancelled), leaving the page running, and closing
  // its only link to main with a clean code would leave it cut off with no connection-lost notice.
  // The page's own unload usually closed the port already, on reload and on window close; this
  // covers a page that never got to. Same-document navigations do not fire `did-frame-navigate`.
  webContents.on(
    'did-frame-navigate',
    (_event, _url, _httpResponseCode, _httpStatusText, isMainFrame) => {
      if (!isMainFrame) return;
      closePort(state, 1001, NAVIGATED_AWAY_REASON);
    },
  );

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
