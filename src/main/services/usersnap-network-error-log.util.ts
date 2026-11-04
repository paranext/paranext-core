/**
 * Logs why a request to Usersnap failed. The renderer loads the Usersnap feedback widget with a
 * `<script>` tag, and a failed script load tells the page nothing about why, so without this the
 * log can only say that the widget did not load. The session's network layer does know the reason,
 * and it comes in two kinds:
 *
 * - A network error, for a request that got no answer: `net::ERR_NAME_NOT_RESOLVED`,
 *   `net::ERR_ADDRESS_INVALID` for a name a DNS blocker answers with `0.0.0.0`,
 *   `net::ERR_CERT_...`. This is what tells a blocked network from an outage.
 * - An HTTP error status, for a request Usersnap answered with one, as it answers a space key it does
 *   not accept (404).
 */

import { logger } from '@shared/services/logger.service';

/** Every request to Usersnap: the widget loader, its assets, and its API */
const USERSNAP_URL_PATTERN = 'https://*.usersnap.com/*';
/** Chromium's error for a request that was cancelled rather than failed */
const CANCELLED_REQUEST_ERROR = 'net::ERR_ABORTED';
/** The lowest HTTP status that is an error */
const FIRST_HTTP_ERROR_STATUS = 400;

/** The parts of Electron's `OnErrorOccurredListenerDetails` the log reads */
export type UsersnapNetworkErrorDetails = { url: string; error: string; resourceType: string };
/** The parts of Electron's `OnCompletedListenerDetails` the log reads */
export type UsersnapCompletedRequestDetails = {
  url: string;
  statusCode: number;
  resourceType: string;
};

/** The parts of Electron's `Session` that report failed and completed requests */
export type UsersnapNetworkErrorSession = {
  webRequest: {
    onErrorOccurred(
      filter: { urls: string[] },
      listener: (details: UsersnapNetworkErrorDetails) => void,
    ): void;
    onCompleted(
      filter: { urls: string[] },
      listener: (details: UsersnapCompletedRequestDetails) => void,
    ): void;
  };
};

/** Names the request in a log line by host only: the path and query hold the space key */
function describeRequest({ url, resourceType }: { url: string; resourceType: string }): string {
  return `A Usersnap request to '${new URL(url).host}' (${resourceType})`;
}

/**
 * Logs every request to Usersnap that failed or was answered with an HTTP error, but only when
 * Usersnap is configured. A session has one `onErrorOccurred` and one `onCompleted` listener at a
 * time, so registering another one replaces this one.
 *
 * @param session The session whose Usersnap requests to log
 * @param spaceApiKey The Usersnap space key; empty when this build has no Usersnap integration
 * @returns `true` if the listeners were registered, `false` if not
 */
export function registerUsersnapNetworkErrorLogging(
  session: UsersnapNetworkErrorSession,
  spaceApiKey: string,
): boolean {
  if (!spaceApiKey) return false;

  session.webRequest.onErrorOccurred({ urls: [USERSNAP_URL_PATTERN] }, (details) => {
    if (details.error === CANCELLED_REQUEST_ERROR) {
      logger.debug(`${describeRequest(details)} was cancelled`);
      return;
    }
    logger.warn(
      `${describeRequest(details)} failed with ${details.error}; the feedback forms cannot load while it does`,
    );
  });
  session.webRequest.onCompleted({ urls: [USERSNAP_URL_PATTERN] }, (details) => {
    if (details.statusCode < FIRST_HTTP_ERROR_STATUS) return;
    logger.warn(
      `${describeRequest(details)} was answered with HTTP ${details.statusCode} (Usersnap answers 404 to a space key it does not accept)`,
    );
  });
  return true;
}
