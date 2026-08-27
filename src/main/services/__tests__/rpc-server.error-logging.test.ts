import { describe, expect, test, vi, beforeEach } from 'vitest';
import { RpcServer } from '@main/services/rpc-server';
import { RpcEventRegistry } from '@main/services/rpc-event-registry';

const { mockLoggerError } = vi.hoisted(() => ({ mockLoggerError: vi.fn() }));

// vi.mock and vi.hoisted calls are hoisted above the imports above at transform time, so the
// static imports can be written first here to satisfy import/first.
vi.mock('@shared/services/logger.service', () => ({
  logger: {
    error: mockLoggerError,
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

/** Minimal event-target stand-in: records listeners so tests can dispatch to them. */
function makeFakeSocket() {
  const listeners = new Map<string, (ev: unknown) => void>();
  const socket = {
    readyState: 1,
    send: vi.fn(),
    close: vi.fn(),
    addEventListener: (type: string, handler: (ev: unknown) => void) => {
      listeners.set(type, handler);
    },
    removeEventListener: (type: string) => {
      listeners.delete(type);
    },
  };
  return {
    // The fake implements only the surface RpcServer touches; a cast is unavoidable here.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    socket: socket as unknown as WebSocket,
    dispatch: (type: string, ev: unknown) => listeners.get(type)?.(ev),
  };
}

function makeServer(socket: WebSocket) {
  return new RpcServer('7', socket, () => {}, new Map(), new RpcEventRegistry());
}

describe('RpcServer error logging', () => {
  beforeEach(() => {
    mockLoggerError.mockClear();
  });

  test('logs the socket name and the real error detail, not "{}"', async () => {
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    const error = new Error('socket hang up');
    Object.defineProperty(error, 'code', { value: 'ECONNRESET', enumerable: true });
    dispatch('error', { message: 'outer', error });

    expect(mockLoggerError).toHaveBeenCalledTimes(1);
    const logged = mockLoggerError.mock.calls[0][0];
    expect(logged).toContain('Websocket 7');
    expect(logged).toContain('socket hang up');
    expect(logged).toContain('ECONNRESET');
    expect(logged).not.toContain('{}');
  });

  test('reports unknown rather than {} for a detail-free event', async () => {
    const { socket, dispatch } = makeFakeSocket();
    const server = makeServer(socket);
    await server.connect();

    dispatch('error', new Event('error'));

    expect(mockLoggerError.mock.calls[0][0]).toContain('message=unknown');
  });
});
