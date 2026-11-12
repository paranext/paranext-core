import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  registerUsersnapNetworkErrorLogging,
  type UsersnapCompletedRequestDetails,
  type UsersnapNetworkErrorDetails,
  type UsersnapNetworkErrorSession,
} from '@main/services/usersnap-network-error-log.util';
import { logger } from '@shared/services/logger.service';

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

/** A session that records the filters and listeners registered for failed and completed requests */
function createSession() {
  const registrations: {
    filter: { urls: string[] };
    listener: (details: UsersnapNetworkErrorDetails) => void;
  }[] = [];
  const completedRegistrations: {
    filter: { urls: string[] };
    listener: (details: UsersnapCompletedRequestDetails) => void;
  }[] = [];
  const session: UsersnapNetworkErrorSession = {
    webRequest: {
      onErrorOccurred: (filter, listener) => {
        registrations.push({ filter, listener });
      },
      onCompleted: (filter, listener) => {
        completedRegistrations.push({ filter, listener });
      },
    },
  };
  return { session, registrations, completedRegistrations };
}

describe('registerUsersnapNetworkErrorLogging', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('without a space key: registers nothing', () => {
    const { session, registrations, completedRegistrations } = createSession();

    expect(registerUsersnapNetworkErrorLogging(session, '')).toBe(false);

    expect(registrations).toHaveLength(0);
    expect(completedRegistrations).toHaveLength(0);
  });

  it('listens only for failed and completed requests to Usersnap', () => {
    const { session, registrations, completedRegistrations } = createSession();

    expect(registerUsersnapNetworkErrorLogging(session, 'test-space-key')).toBe(true);

    expect(registrations).toHaveLength(1);
    expect(registrations[0].filter).toEqual({ urls: ['https://*.usersnap.com/*'] });
    expect(completedRegistrations).toHaveLength(1);
    expect(completedRegistrations[0].filter).toEqual({ urls: ['https://*.usersnap.com/*'] });
  });

  it('adds the space-key hint only to a 404 from the loader', () => {
    const { session, completedRegistrations } = createSession();
    registerUsersnapNetworkErrorLogging(session, 'test-space-key');

    completedRegistrations[0].listener({
      url: 'https://widget.usersnap.com/global/load/wrong-key?onload=usersnapCallback_1',
      statusCode: 404,
      resourceType: 'script',
    });

    expect(logger.warn).toHaveBeenCalledWith(
      "A Usersnap request to 'widget.usersnap.com' (script) was answered with HTTP 404 (Usersnap answers 404 to a space key it does not accept)",
    );
  });

  it.each([
    ['a widget chunk', 'https://resources.usersnap.com/widget-assets/js/chunks/1/a.js', 'script'],
    ['an API call', 'https://widget.usersnap.com/api/widget/xhrrpc', 'xhr'],
    ['the loader path on another host', 'https://resources.usersnap.com/global/load/x', 'script'],
    [
      'a path that only starts like the loader',
      'https://widget.usersnap.com/global/loadx',
      'script',
    ],
  ])('logs a 404 from %s without the space-key hint', (_name, url, resourceType) => {
    const { session, completedRegistrations } = createSession();
    registerUsersnapNetworkErrorLogging(session, 'test-space-key');

    completedRegistrations[0].listener({ url, statusCode: 404, resourceType });

    expect(logger.warn).toHaveBeenCalledWith(
      `A Usersnap request to '${new URL(url).host}' (${resourceType}) was answered with HTTP 404`,
    );
  });

  it('logs any other HTTP error status without the space-key hint', () => {
    const { session, completedRegistrations } = createSession();
    registerUsersnapNetworkErrorLogging(session, 'test-space-key');

    completedRegistrations[0].listener({
      url: 'https://widget.usersnap.com/api/widget/xhrrpc',
      statusCode: 400,
      resourceType: 'xhr',
    });
    completedRegistrations[0].listener({
      url: 'https://widget.usersnap.com/api/widget/xhrrpc',
      statusCode: 503,
      resourceType: 'xhr',
    });

    expect(logger.warn).toHaveBeenCalledTimes(2);
    expect(logger.warn).toHaveBeenNthCalledWith(
      1,
      "A Usersnap request to 'widget.usersnap.com' (xhr) was answered with HTTP 400",
    );
    expect(logger.warn).toHaveBeenNthCalledWith(
      2,
      "A Usersnap request to 'widget.usersnap.com' (xhr) was answered with HTTP 503",
    );
  });

  it('does not log a successful response, up to and including status 399', () => {
    const { session, completedRegistrations } = createSession();
    registerUsersnapNetworkErrorLogging(session, 'test-space-key');

    [200, 304, 399].forEach((statusCode) =>
      completedRegistrations[0].listener({
        url: 'https://widget.usersnap.com/global/load/test-space-key?onload=usersnapCallback_1',
        statusCode,
        resourceType: 'script',
      }),
    );

    expect(logger.warn).not.toHaveBeenCalled();
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
      "A Usersnap request to 'widget.usersnap.com' (script) failed with net::ERR_ADDRESS_INVALID, so the feedback forms may be unavailable",
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
