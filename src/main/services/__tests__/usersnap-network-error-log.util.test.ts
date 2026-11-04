import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  registerUsersnapNetworkErrorLogging,
  type UsersnapNetworkErrorDetails,
  type UsersnapNetworkErrorSession,
} from '@main/services/usersnap-network-error-log.util';
import { logger } from '@shared/services/logger.service';

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

/** A session that records the filter and listener registered for failed requests */
function createSession() {
  const registrations: {
    filter: { urls: string[] };
    listener: (details: UsersnapNetworkErrorDetails) => void;
  }[] = [];
  const session: UsersnapNetworkErrorSession = {
    webRequest: {
      onErrorOccurred: (filter, listener) => {
        registrations.push({ filter, listener });
      },
    },
  };
  return { session, registrations };
}

describe('registerUsersnapNetworkErrorLogging', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('without a space key: registers nothing', () => {
    const { session, registrations } = createSession();

    expect(registerUsersnapNetworkErrorLogging(session, '')).toBe(false);

    expect(registrations).toHaveLength(0);
  });

  it('listens only for failed requests to Usersnap', () => {
    const { session, registrations } = createSession();

    expect(registerUsersnapNetworkErrorLogging(session, 'test-space-key')).toBe(true);

    expect(registrations).toHaveLength(1);
    expect(registrations[0].filter).toEqual({ urls: ['https://*.usersnap.com/*'] });
  });

  it("logs the network error and the host, without the request's path or query", () => {
    const { session, registrations } = createSession();
    registerUsersnapNetworkErrorLogging(session, 'test-space-key');

    registrations[0].listener({
      url: 'https://widget.usersnap.com/global/load/test-space-key?onload=usersnapCallback_1',
      error: 'net::ERR_ADDRESS_INVALID',
      resourceType: 'script',
    });

    expect(logger.warn).toHaveBeenCalledWith(
      "A Usersnap request to 'widget.usersnap.com' (script) failed with net::ERR_ADDRESS_INVALID; the feedback forms cannot load while it does",
    );
  });

  it('logs a cancelled request at debug only, since the widget cancels its own requests', () => {
    const { session, registrations } = createSession();
    registerUsersnapNetworkErrorLogging(session, 'test-space-key');

    registrations[0].listener({
      url: 'https://resources.usersnap.com/widget-assets/js/chunks/1/a.js',
      error: 'net::ERR_ABORTED',
      resourceType: 'script',
    });

    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.debug).toHaveBeenCalledWith(
      "A Usersnap request to 'resources.usersnap.com' (script) was cancelled",
    );
  });
});
