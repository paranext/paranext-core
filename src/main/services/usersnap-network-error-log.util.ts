/**
 * Logs why a request to Usersnap failed. The renderer loads the Usersnap feedback widget with a
 * `<script>` tag, and a failed script load tells the page nothing about why, so without this the
 * log can only say that the widget did not load. The session's network layer does know the reason
 * (`net::ERR_NAME_NOT_RESOLVED`, `net::ERR_ADDRESS_INVALID` for a name a DNS blocker answers with
 * `0.0.0.0`, `net::ERR_CERT_...`), which is what tells a blocked network from an outage.
 */

import { logger } from '@shared/services/logger.service';

/** Every request to Usersnap: the widget loader, its assets, and its API */
const USERSNAP_URL_PATTERN = 'https://*.usersnap.com/*';
/** Chromium's error for a request that was cancelled rather than failed */
const CANCELLED_REQUEST_ERROR = 'net::ERR_ABORTED';

/** The parts of Electron's `OnErrorOccurredListenerDetails` the log reads */
export type UsersnapNetworkErrorDetails = { url: string; error: string; resourceType: string };

/** The part of Electron's `Session` that reports failed requests */
export type UsersnapNetworkErrorSession = {
  webRequest: {
    onErrorOccurred(
      filter: { urls: string[] },
      listener: (details: UsersnapNetworkErrorDetails) => void,
    ): void;
  };
};

/**
 * Logs every failed request to Usersnap with its network error, but only when Usersnap is
 * configured. A session has one `onErrorOccurred` listener at a time, so registering another one
 * replaces this one.
 *
 * @param session The session whose failed requests to log
 * @param spaceApiKey The Usersnap space key; empty when this build has no Usersnap integration
 * @returns `true` if the listener was registered, `false` if not
 */
export function registerUsersnapNetworkErrorLogging(
  session: UsersnapNetworkErrorSession,
  spaceApiKey: string,
): boolean {
  if (!spaceApiKey) return false;

  session.webRequest.onErrorOccurred({ urls: [USERSNAP_URL_PATTERN] }, (details) => {
    // Only the host: the path and query hold the space key and a per-load callback name
    const request = `A Usersnap request to '${new URL(details.url).host}' (${details.resourceType})`;
    if (details.error === CANCELLED_REQUEST_ERROR) {
      logger.debug(`${request} was cancelled`);
      return;
    }
    logger.warn(
      `${request} failed with ${details.error}; the feedback forms cannot load while it does`,
    );
  });
  return true;
}
