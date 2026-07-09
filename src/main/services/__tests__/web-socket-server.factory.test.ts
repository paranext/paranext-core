import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WebSocketServer } from 'ws';
import {
  createPapiWebSocketServer,
  getPreferredWebSocketPort,
  WEBSOCKET_PORT_ENV_VAR,
} from '@main/services/web-socket-server.factory';
import { WEBSOCKET_PORT } from '@shared/data/rpc.model';
import { CommandLineArgs, commandLineArgumentsAliases } from '@node/utils/command-line.util';

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

/** Start a WebSocketServer directly (no fallback logic) for test setup purposes */
function listenOnPort(port: number): Promise<WebSocketServer> {
  return new Promise((resolve, reject) => {
    const webSocketServer = new WebSocketServer({ port });
    webSocketServer.once('listening', () => resolve(webSocketServer));
    webSocketServer.once('error', reject);
  });
}

function getListeningPort(webSocketServer: WebSocketServer): number {
  const address = webSocketServer.address();
  if (typeof address === 'object' && address) return address.port;
  throw new Error('Test WebSocketServer is not listening on a TCP port');
}

function closeServer(webSocketServer: WebSocketServer): Promise<void> {
  return new Promise((resolve) => {
    webSocketServer.close(() => resolve());
  });
}

describe('createPapiWebSocketServer', () => {
  it('listens on the preferred port when it is available', async () => {
    // Find a port that is currently free by binding to an OS-assigned port and releasing it
    const probeServer = await listenOnPort(0);
    const freePort = getListeningPort(probeServer);
    await closeServer(probeServer);

    const { webSocketServer, port } = await createPapiWebSocketServer(freePort);
    try {
      expect(port).toBe(freePort);
      expect(getListeningPort(webSocketServer)).toBe(freePort);
    } finally {
      await closeServer(webSocketServer);
    }
  });

  it('falls back to an automatically assigned port when the preferred port is in use', async () => {
    // Occupy a port to simulate another paranext-based app owning the preferred port
    const occupyingServer = await listenOnPort(0);
    const occupiedPort = getListeningPort(occupyingServer);

    try {
      const { webSocketServer, port } = await createPapiWebSocketServer(occupiedPort);
      try {
        expect(port).not.toBe(occupiedPort);
        expect(port).toBeGreaterThan(0);
        expect(getListeningPort(webSocketServer)).toBe(port);
      } finally {
        await closeServer(webSocketServer);
      }
    } finally {
      await closeServer(occupyingServer);
    }
  });
});

describe('getPreferredWebSocketPort', () => {
  let originalPortEnv: string | undefined;

  beforeEach(() => {
    // The machine running the tests may have the variable exported; make sure it does not leak in
    originalPortEnv = process.env[WEBSOCKET_PORT_ENV_VAR];
    delete process.env[WEBSOCKET_PORT_ENV_VAR];
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    if (originalPortEnv === undefined) delete process.env[WEBSOCKET_PORT_ENV_VAR];
    else process.env[WEBSOCKET_PORT_ENV_VAR] = originalPortEnv;
  });

  it('returns the default port when no override is specified', () => {
    expect(getPreferredWebSocketPort()).toBe(WEBSOCKET_PORT);
  });

  it('returns the port from the environment variable when set', () => {
    vi.stubEnv(WEBSOCKET_PORT_ENV_VAR, '9123');
    expect(getPreferredWebSocketPort()).toBe(9123);
  });

  it('returns the default port when the environment variable is not a valid port', () => {
    vi.stubEnv(WEBSOCKET_PORT_ENV_VAR, 'not-a-port');
    expect(getPreferredWebSocketPort()).toBe(WEBSOCKET_PORT);
  });

  it('prefers the command-line argument over the environment variable', () => {
    vi.stubEnv(WEBSOCKET_PORT_ENV_VAR, '9123');
    const originalArgv = process.argv;
    process.argv = [
      ...originalArgv,
      commandLineArgumentsAliases[CommandLineArgs.WebSocketPort][0],
      '9456',
    ];
    try {
      expect(getPreferredWebSocketPort()).toBe(9456);
    } finally {
      process.argv = originalArgv;
    }
  });

  it('uses a valid environment variable when the command-line argument is invalid', () => {
    vi.stubEnv(WEBSOCKET_PORT_ENV_VAR, '9123');
    const originalArgv = process.argv;
    process.argv = [
      ...originalArgv,
      commandLineArgumentsAliases[CommandLineArgs.WebSocketPort][0],
      'not-a-port',
    ];
    try {
      expect(getPreferredWebSocketPort()).toBe(9123);
    } finally {
      process.argv = originalArgv;
    }
  });
});
