import type { ConnectionIdentity } from '@shared/data/request-access.data';

/** The secrets a process main launched uses to identify itself to main, and main to it */
export type LaunchCredentials = { clientSecret: string; serverSecret: string };

let launchCredentials: LaunchCredentials | undefined;
let localConnectionIdentity: ConnectionIdentity = 'unidentified';

/** Keeps the credentials main handed this process until the connection to main takes them */
export function setLaunchCredentials(credentials: LaunchCredentials): void {
  launchCredentials = credentials;
}

/**
 * Returns the credentials once, then forgets them, so nothing that runs after the connection is
 * made can read them.
 */
export function takeLaunchCredentials(): LaunchCredentials | undefined {
  const credentials = launchCredentials;
  launchCredentials = undefined;
  return credentials;
}

/**
 * Which process main knows this one as. `'unidentified'` until a connection has proven itself: for
 * the extension host, a handshake whose reply carried the right server secret.
 */
export function getLocalConnectionIdentity(): ConnectionIdentity {
  return localConnectionIdentity;
}

/** Records which process main knows this one as, once the connection has proven it */
export function markLocalConnectionIdentified(identity: ConnectionIdentity): void {
  localConnectionIdentity = identity;
}
