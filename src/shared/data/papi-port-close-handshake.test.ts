import { describe, expect, test, vi } from 'vitest';
import { createPortCloseHandshake } from '@shared/data/papi-port-close-handshake';
import {
  createPapiPortCloseFrame,
  PAPI_PORT_CLOSE_FRAME_TYPE,
  PORT_CLOSED_WITHOUT_FRAME_REASON,
} from '@shared/data/papi-port.model';

function setUp() {
  const target = { name: 'socket' };
  const hooks = { postFrame: vi.fn(), closePort: vi.fn(), onClosed: vi.fn() };
  const handshake = createPortCloseHandshake(target, hooks);
  return { target, hooks, handshake };
}

describe('createPortCloseHandshake', () => {
  test('starts open', () => {
    expect(setUp().handshake.isClosed).toBe(false);
  });

  test('close posts a frame with the code and reason, reports a clean close once, then closes the port', () => {
    const { target, hooks, handshake } = setUp();
    const order: string[] = [];
    hooks.postFrame.mockImplementation(() => order.push('postFrame'));
    hooks.onClosed.mockImplementation(() => order.push('onClosed'));
    hooks.closePort.mockImplementation(() => order.push('closePort'));

    handshake.close(1001, 'page unloading');

    expect(hooks.postFrame).toHaveBeenCalledWith(createPapiPortCloseFrame(1001, 'page unloading'));
    expect(hooks.onClosed).toHaveBeenCalledTimes(1);
    expect(hooks.onClosed).toHaveBeenCalledWith({
      type: 'close',
      target,
      code: 1001,
      reason: 'page unloading',
      wasClean: true,
    });
    expect(order).toEqual(['postFrame', 'onClosed', 'closePort']);
    expect(handshake.isClosed).toBe(true);
  });

  test('close defaults to 1000 with an empty reason', () => {
    const { hooks, handshake } = setUp();

    handshake.close();

    expect(hooks.postFrame).toHaveBeenCalledWith(createPapiPortCloseFrame(1000, ''));
    expect(hooks.onClosed).toHaveBeenCalledWith(
      expect.objectContaining({ code: 1000, reason: '', wasClean: true }),
    );
  });

  test('close with a code that is not clean reports wasClean false', () => {
    const { hooks, handshake } = setUp();

    handshake.close(1011, 'server error');

    expect(hooks.onClosed).toHaveBeenCalledWith(
      expect.objectContaining({ code: 1011, wasClean: false }),
    );
  });

  test('close still finishes and closes the port when posting the frame throws', () => {
    const { hooks, handshake } = setUp();
    hooks.postFrame.mockImplementation(() => {
      throw new Error('port is gone');
    });

    expect(() => handshake.close(1006, 'renderer process gone')).not.toThrow();

    expect(handshake.isClosed).toBe(true);
    expect(hooks.onClosed).toHaveBeenCalledTimes(1);
    expect(hooks.onClosed).toHaveBeenCalledWith(
      expect.objectContaining({ code: 1006, reason: 'renderer process gone' }),
    );
    expect(hooks.closePort).toHaveBeenCalledTimes(1);
  });

  test('close is a no-op once closed', () => {
    const { hooks, handshake } = setUp();
    handshake.close(1000, 'first');

    handshake.close(1001, 'second');

    expect(hooks.postFrame).toHaveBeenCalledTimes(1);
    expect(hooks.onClosed).toHaveBeenCalledTimes(1);
    expect(hooks.closePort).toHaveBeenCalledTimes(1);
  });

  test('an incoming close frame is consumed, reported as the peer close, and closes the port', () => {
    const { hooks, handshake } = setUp();

    const consumed = handshake.handleIncoming(createPapiPortCloseFrame(4000, 'app shutdown'));

    expect(consumed).toBe(true);
    expect(hooks.postFrame).not.toHaveBeenCalled();
    expect(hooks.onClosed).toHaveBeenCalledTimes(1);
    expect(hooks.onClosed).toHaveBeenCalledWith(
      expect.objectContaining({ code: 4000, reason: 'app shutdown', wasClean: true }),
    );
    expect(hooks.closePort).toHaveBeenCalledTimes(1);
    expect(handshake.isClosed).toBe(true);
  });

  test('an incoming close frame with a code that is not clean reports wasClean false', () => {
    const { hooks, handshake } = setUp();

    handshake.handleIncoming(createPapiPortCloseFrame(1011, 'oops'));

    expect(hooks.onClosed).toHaveBeenCalledWith(
      expect.objectContaining({ code: 1011, wasClean: false }),
    );
  });

  test('an ordinary message while open is not consumed and changes nothing', () => {
    const { hooks, handshake } = setUp();

    expect(handshake.handleIncoming('{"jsonrpc":"2.0"}')).toBe(false);
    expect(handshake.handleIncoming({ type: PAPI_PORT_CLOSE_FRAME_TYPE, code: '1000' })).toBe(
      false,
    );

    expect(handshake.isClosed).toBe(false);
    expect(hooks.onClosed).not.toHaveBeenCalled();
    expect(hooks.closePort).not.toHaveBeenCalled();
  });

  test('anything arriving after the close is swallowed without a second report', () => {
    const { hooks, handshake } = setUp();
    handshake.close(1000, '');

    expect(handshake.handleIncoming('{"jsonrpc":"2.0"}')).toBe(true);
    expect(handshake.handleIncoming(createPapiPortCloseFrame(1001, 'late'))).toBe(true);

    expect(hooks.onClosed).toHaveBeenCalledTimes(1);
    expect(hooks.closePort).toHaveBeenCalledTimes(1);
  });

  test('a port that closes with no frame is reported as 1006, not clean, without closing the port again', () => {
    const { hooks, handshake } = setUp();

    handshake.handlePortClosed();

    expect(hooks.onClosed).toHaveBeenCalledTimes(1);
    expect(hooks.onClosed).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 1006,
        reason: PORT_CLOSED_WITHOUT_FRAME_REASON,
        wasClean: false,
      }),
    );
    expect(hooks.closePort).not.toHaveBeenCalled();
    expect(hooks.postFrame).not.toHaveBeenCalled();
    expect(handshake.isClosed).toBe(true);
  });

  test('a port close after the handshake already finished reports nothing more', () => {
    const { hooks, handshake } = setUp();
    handshake.close(1001, 'window closing');

    handshake.handlePortClosed();

    expect(hooks.onClosed).toHaveBeenCalledTimes(1);
    expect(hooks.onClosed).toHaveBeenCalledWith(expect.objectContaining({ code: 1001 }));
  });
});
