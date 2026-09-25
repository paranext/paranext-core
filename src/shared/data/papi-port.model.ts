/**
 * Wire shapes of the renderer's PAPI MessagePort transport: the IPC channels the preload uses to
 * obtain the port from main, the message the preload forwards into the page's main world, and the
 * close frame both adapters send before closing a port. Nothing here is a JSON-RPC message; the RPC
 * layer never sees these shapes.
 *
 * Kept free of imports so the preload bundle can use it without pulling in the logger or
 * `electron`.
 */

/**
 * The PAPI part of the bridge the preload exposes on `window.electronAPI.papi`. The preload
 * declares its object against this type and the page reads the bridge through it, so both sides
 * fail to compile if either renames or reshapes a member.
 *
 * @experimental
 */
export type PapiPortBridge = {
  /**
   * Ask main for this window's PAPI MessagePort. The reply arrives as a `window` `message` event (a
   * {@link PapiPortMainWorldMessage}), not as a return value, because a port can only travel over
   * `postMessage`.
   *
   * @experimental
   */
  requestPort(): void;
};

/**
 * IPC channel the preload sends on to ask main for this window's PAPI MessagePort
 *
 * @experimental
 */
export const PAPI_PORT_REQUEST_CHANNEL = 'electronAPI:papi.requestPort';

/**
 * IPC channel main replies on, carrying a {@link PapiPortGrant} and the port as its one transferred
 * object. Also the `type` of the message the preload forwards into the main world.
 *
 * @experimental
 */
export const PAPI_PORT_CHANNEL = 'electronAPI:papi.port';

/**
 * IPC channel main replies on when it cannot hand out a port, carrying a {@link PapiPortError}. Also
 * the `type` of the message the preload forwards into the main world.
 *
 * @experimental
 */
export const PAPI_PORT_ERROR_CHANNEL = 'electronAPI:papi.portError';

/**
 * What main says alongside the port it grants
 *
 * @experimental
 */
export type PapiPortGrant = {
  /**
   * Platform id of the window the port was granted to, for the renderer's log lines
   *
   * @experimental
   */
  windowId: string;
};

/**
 * Why main declined to grant a port
 *
 * @experimental
 */
export type PapiPortError = {
  /** @experimental */
  reason: string;
};

/**
 * Message the preload posts into the page's main world: either the port (in the event's `ports`)
 * with its grant, or the error
 *
 * @experimental
 */
export type PapiPortMainWorldMessage =
  | ({ type: typeof PAPI_PORT_CHANNEL } & PapiPortGrant)
  | ({ type: typeof PAPI_PORT_ERROR_CHANNEL } & PapiPortError);

/**
 * Whether `data` from a `window` `message` event is a {@link PapiPortMainWorldMessage}. Anything can
 * land on `window.postMessage`, so a shape check is the only filter.
 *
 * @experimental
 */
export function isPapiPortMainWorldMessage(data: unknown): data is PapiPortMainWorldMessage {
  if (typeof data !== 'object' || !data || !('type' in data)) return false;
  if (data.type === PAPI_PORT_CHANNEL)
    return 'windowId' in data && typeof data.windowId === 'string';
  if (data.type === PAPI_PORT_ERROR_CHANNEL)
    return 'reason' in data && typeof data.reason === 'string';
  return false;
}

/**
 * `type` of the in-band close frame. A MessagePort's own `close` event carries no code, so the side
 * that closes on purpose posts this first; the other side then reports the close with the code and
 * reason given here, and treats a port close that arrives with no frame as 1006 (the connection
 * died).
 *
 * @experimental
 */
export const PAPI_PORT_CLOSE_FRAME_TYPE = 'papi:close';

/**
 * The in-band close frame. Distinguishable from every JSON-RPC payload, which is a string.
 *
 * @experimental
 */
export type PapiPortCloseFrame = {
  /** @experimental */
  type: typeof PAPI_PORT_CLOSE_FRAME_TYPE;
  /**
   * A WebSocket close code, so both ends keep using `isCleanCloseCode` unchanged
   *
   * @experimental
   */
  code: number;
  /** @experimental */
  reason: string;
};

/**
 * Build the close frame a port adapter posts before closing its port on purpose
 *
 * @experimental
 */
export function createPapiPortCloseFrame(code: number, reason: string): PapiPortCloseFrame {
  return { type: PAPI_PORT_CLOSE_FRAME_TYPE, code, reason };
}

/**
 * Whether a message received over a PAPI port is a {@link PapiPortCloseFrame}
 *
 * @experimental
 */
export function isPapiPortCloseFrame(data: unknown): data is PapiPortCloseFrame {
  if (typeof data !== 'object' || !data) return false;
  return (
    'type' in data &&
    data.type === PAPI_PORT_CLOSE_FRAME_TYPE &&
    'code' in data &&
    typeof data.code === 'number' &&
    'reason' in data &&
    typeof data.reason === 'string'
  );
}

/**
 * The close event a port adapter hands to the RPC layer. Only the fields
 * `describeWebSocketCloseEvent`, `isCleanCloseEvent` and `RpcWebSocketListener.onClientDisconnect`
 * read; a real `CloseEvent` cannot be constructed in every environment the adapters run in, and the
 * RPC layer reads these properties reflectively.
 *
 * @experimental
 */
export type SyntheticCloseEvent = {
  /** @experimental */
  type: 'close';
  /** @experimental */
  target: unknown;
  /** @experimental */
  code: number;
  /** @experimental */
  reason: string;
  /** @experimental */
  wasClean: boolean;
};

/**
 * Build the close event a port adapter dispatches to its `close` listeners
 *
 * @experimental
 */
export function createSyntheticCloseEvent(
  target: unknown,
  code: number,
  reason: string,
  wasClean: boolean,
): SyntheticCloseEvent {
  return { type: 'close', target, code, reason, wasClean };
}
