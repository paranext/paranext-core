/**
 * The close handshake both PAPI MessagePort adapters run: main's `MessagePortServerSocket` and the
 * renderer's `MessagePortWebSocket`. A port has no close code, so the side that closes on purpose
 * posts a close frame first; the other side reports that frame's code and reason, and a port that
 * closes with no frame is reported as 1006, the shape of a connection that died.
 *
 * Kept out of `papi-port.model.ts`, which the preload imports and must stay free of imports: this
 * module needs `isCleanCloseCode` from the RPC model, which loads the logger.
 */

import { isCleanCloseCode } from '@shared/data/rpc.model';
import {
  createPapiPortCloseFrame,
  createSyntheticCloseEvent,
  isPapiPortCloseFrame,
  PapiPortCloseFrame,
  PORT_CLOSED_WITHOUT_FRAME_REASON,
  SyntheticCloseEvent,
} from '@shared/data/papi-port.model';

/**
 * What an adapter hands the handshake: its own port primitives, and what to do once closed
 *
 * @experimental
 */
export type PortCloseHandshakeHooks = {
  /**
   * Post a close frame on the port. May throw; the close still completes.
   *
   * @experimental
   */
  postFrame(frame: PapiPortCloseFrame): void;
  /**
   * Close the port
   *
   * @experimental
   */
  closePort(): void;
  /**
   * Called exactly once, when the connection is closed for whatever reason: detach from the port,
   * record the closed state, and dispatch `event` to the adapter's close listeners
   *
   * @experimental
   */
  onClosed(event: SyntheticCloseEvent): void;
};

/**
 * One connection's close handshake. Records the close exactly once, whichever side or event caused
 * it.
 *
 * @experimental
 */
export type PortCloseHandshake = {
  /**
   * Whether the connection has closed. Once true, nothing more is reported.
   *
   * @experimental
   */
  readonly isClosed: boolean;
  /**
   * Close on purpose: post a close frame, report the close, then close the port. A no-op once
   * closed.
   *
   * @param code WebSocket close code. Defaults to 1000.
   * @param reason Human-readable reason. Defaults to empty.
   * @experimental
   */
  close(code?: number, reason?: string): void;
  /**
   * Offer a message that arrived on the port. A close frame is reported as the peer's close and the
   * port is closed; anything arriving once closed is dropped.
   *
   * @param data The message's `data`
   * @returns `true` when the message was consumed here, `false` when it is for the adapter to
   *   deliver
   * @experimental
   */
  handleIncoming(data: unknown): boolean;
  /**
   * The port's own `close` event arrived. Reported as 1006 unless the handshake already finished.
   *
   * @experimental
   */
  handlePortClosed(): void;
};

/**
 * Create the close handshake for one connection
 *
 * @param target The adapter, reported as the close event's `target`
 * @param hooks The adapter's port primitives and close handling
 * @experimental
 */
export function createPortCloseHandshake(
  target: unknown,
  hooks: PortCloseHandshakeHooks,
): PortCloseHandshake {
  let isClosed = false;

  const finish = (code: number, reason: string, wasClean: boolean) => {
    isClosed = true;
    hooks.onClosed(createSyntheticCloseEvent(target, code, reason, wasClean));
  };

  return {
    get isClosed() {
      return isClosed;
    },
    close(code = 1000, reason = '') {
      if (isClosed) return;
      try {
        hooks.postFrame(createPapiPortCloseFrame(code, reason));
      } catch {
        // A port that cannot carry the frame is already on its way down; the close is recorded and
        // the port closed regardless, and the peer reads the bare port close as 1006
      }
      finish(code, reason, isCleanCloseCode(code));
      hooks.closePort();
    },
    handleIncoming(data) {
      if (isClosed) return true;
      if (!isPapiPortCloseFrame(data)) return false;
      finish(data.code, data.reason, isCleanCloseCode(data.code));
      hooks.closePort();
      return true;
    },
    handlePortClosed() {
      if (isClosed) return;
      finish(1006, PORT_CLOSED_WITHOUT_FRAME_REASON, false);
    },
  };
}
