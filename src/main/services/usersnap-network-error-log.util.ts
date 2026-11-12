/**
 * Logs why a request to Usersnap failed. The renderer loads the Usersnap feedback widget with a
 * `<script>` tag, and a failed script load tells the page nothing about why, so without this the
 * log can only say that the widget did not load. The session's network layer does know the reason,
 * and it comes in two kinds:
 *
 * - A network error, for a request that got no answer: `net::ERR_NAME_NOT_RESOLVED`,
 *   `net::ERR_ADDRESS_INVALID` for a name a DNS blocker answers with `0.0.0.0`,
 *   `net::ERR_CERT_...`. This is what tells a blocked network from an outage.
 * - An HTTP error status, for a request Usersnap answered with one, such as 403 for a missing widget
 *   chunk.
 *
 * Usersnap's loader answers a space key it does not accept with a 404 page, not a script. Chromium
 * blocks that answer to a `<script>` request before it completes (Opaque Response Blocking), so it
 * arrives as the network error `net::ERR_BLOCKED_BY_ORB` rather than as an HTTP 404. That error on
 * the loader request is therefore the one that points at the key.
 */

import { logger } from '@shared/services/logger.service';

/** Every request to Usersnap: the widget loader, its assets, and its API */
const USERSNAP_URL_PATTERN = 'https://*.usersnap.com/*';
/** Chromium's error for a request that was cancelled rather than failed */
const CANCELLED_REQUEST_ERROR = 'net::ERR_ABORTED';
/** The lowest HTTP status that is an error */
const FIRST_HTTP_ERROR_STATUS = 400;
/** Chromium's error for an answer it blocked because it was not what the request asked for */
const BLOCKED_NON_SCRIPT_ANSWER_ERROR = 'net::ERR_BLOCKED_BY_ORB';
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
    const requestUrl = new URL(details.url);
    const request = describeRequest(requestUrl, details.resourceType);
    if (details.error === CANCELLED_REQUEST_ERROR) {
      logger.debug(`${request} was cancelled`);
      return;
    }
    const hint =
      details.error === BLOCKED_NON_SCRIPT_ANSWER_ERROR && isLoaderRequest(requestUrl)
        ? " (the loader's answer was not a script, which is how Usersnap answers a space key it does not accept)"
        : '';
    logger.warn(
      `${request} failed with ${details.error}, so the feedback forms may be unavailable${hint}`,
    );
  });
  session.webRequest.onCompleted({ urls: [USERSNAP_URL_PATTERN] }, (details) => {
    if (details.statusCode < FIRST_HTTP_ERROR_STATUS) return;
    logger.warn(
      `${describeRequest(new URL(details.url), details.resourceType)} was answered with HTTP ${details.statusCode}`,
    );
  });
  return true;
}
