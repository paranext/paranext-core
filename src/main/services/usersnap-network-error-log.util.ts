/**
 * Logs why a request to Usersnap failed. The renderer loads the Usersnap feedback widget with a
 * `<script>` tag, and a failed script load tells the page nothing about why, so without this the
 * log can only say that the widget did not load. The session's network layer does know the reason,
 * and it comes in two kinds:
 *
 * - A network error, for a request that got no answer: `net::ERR_NAME_NOT_RESOLVED`,
 *   `net::ERR_ADDRESS_INVALID` for a name a DNS blocker answers with `0.0.0.0`,
 *   `net::ERR_CERT_...`. This is what tells a blocked network from an outage.
 * - An HTTP error status, for a request Usersnap answered with one. Its loader answers a space key it
 *   does not accept with 404; its other hosts answer for other reasons (a missing widget chunk gets
 *   403), so only the loader's 404 says anything about the key.
 */

import { logger } from '@shared/services/logger.service';

/** Every request to Usersnap: the widget loader, its assets, and its API */
const USERSNAP_URL_PATTERN = 'https://*.usersnap.com/*';
/** Chromium's error for a request that was cancelled rather than failed */
const CANCELLED_REQUEST_ERROR = 'net::ERR_ABORTED';
/** The lowest HTTP status that is an error */
const FIRST_HTTP_ERROR_STATUS = 400;
/** The HTTP status Usersnap's loader answers a space key it does not accept with */
const HTTP_NOT_FOUND = 404;
/** The host of the loader request, the one request whose URL carries the space key */
const USERSNAP_LOADER_HOST = 'widget.usersnap.com';
/** The start of the loader request's path, which continues with the space key */
const USERSNAP_LOADER_PATH_PREFIX = '/global/load/';

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
function describeRequest(requestUrl: URL, resourceType: string): string {
  return `A Usersnap request to '${requestUrl.host}' (${resourceType})`;
}

/** Whether the request is the loader's, the one that tells Usersnap which space key to load */
function isLoaderRequest(requestUrl: URL): boolean {
  return (
    requestUrl.hostname === USERSNAP_LOADER_HOST &&
    requestUrl.pathname.startsWith(USERSNAP_LOADER_PATH_PREFIX)
  );
}

/**
 * Logs every request to Usersnap that failed or was answered with an HTTP error, but only when
 * Usersnap is configured. Electron keeps one `onErrorOccurred` and one `onCompleted` listener per
 * session, so this takes the session's only listeners for both events: registering another one
 * replaces this one, even with a different URL filter. Route any other use of those events through
 * this function rather than registering another listener.
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
    const request = describeRequest(new URL(details.url), details.resourceType);
    if (details.error === CANCELLED_REQUEST_ERROR) {
      logger.debug(`${request} was cancelled`);
      return;
    }
    logger.warn(
      `${request} failed with ${details.error}, so the feedback forms may be unavailable`,
    );
  });
  session.webRequest.onCompleted({ urls: [USERSNAP_URL_PATTERN] }, (details) => {
    if (details.statusCode < FIRST_HTTP_ERROR_STATUS) return;
    const requestUrl = new URL(details.url);
    const hint =
      details.statusCode === HTTP_NOT_FOUND && isLoaderRequest(requestUrl)
        ? ' (Usersnap answers 404 to a space key it does not accept)'
        : '';
    logger.warn(
      `${describeRequest(requestUrl, details.resourceType)} was answered with HTTP ${details.statusCode}${hint}`,
    );
  });
  return true;
}
