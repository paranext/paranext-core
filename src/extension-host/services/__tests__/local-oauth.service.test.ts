import { createServer, Server } from 'http';
import { AddressInfo } from 'net';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@shared/services/logger.service';

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));
vi.mock('@shared/services/network.service', () => ({
  request: vi.fn(),
}));

function listenOnFreePort(): Promise<Server> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, 'localhost', () => resolve(server));
  });
}

function closeServer(server: Server): Promise<void> {
  return new Promise((resolve) => {
    server.close(() => resolve());
  });
}

/** Import a fresh instance of the service module configured to use the given port */
async function importLocalOAuthService(port: number) {
  vi.resetModules();
  vi.stubEnv('LOCAL_OAUTH_SERVER_PORT', `${port}`);
  return import('@extension-host/services/local-oauth.service');
}

describe('startLocalOAuthServer', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  /**
   * The local OAuth server always uses its one fixed (Auth0-registered) port, so when two dev
   * instances run at once (supported since PT-4109), the second instance cannot bind it. That must
   * degrade gracefully — extension host startup awaits this service, and a rejection would abort
   * extension loading entirely.
   */
  it('resolves with a warning instead of rejecting when the port is already in use', async () => {
    globalThis.isPackaged = false;
    const occupyingServer = await listenOnFreePort();
    // Assert the type: address() returns AddressInfo for TCP listeners
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const occupiedPort = (occupyingServer.address() as AddressInfo).port;

    const { startLocalOAuthServer, stopLocalOAuthServer } =
      await importLocalOAuthService(occupiedPort);
    try {
      await expect(startLocalOAuthServer()).resolves.toBeUndefined();
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('OAuth'));
    } finally {
      stopLocalOAuthServer();
      await closeServer(occupyingServer);
    }
  });

  it('listens successfully when the port is free', async () => {
    globalThis.isPackaged = false;
    const probeServer = await listenOnFreePort();
    // Assert the type: address() returns AddressInfo for TCP listeners
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const freePort = (probeServer.address() as AddressInfo).port;
    await closeServer(probeServer);

    const { startLocalOAuthServer, stopLocalOAuthServer } = await importLocalOAuthService(freePort);
    try {
      await expect(startLocalOAuthServer()).resolves.toBeUndefined();
      expect(logger.info).toHaveBeenCalledWith(expect.stringContaining(`${freePort}`));
    } finally {
      stopLocalOAuthServer();
    }
  });
});
