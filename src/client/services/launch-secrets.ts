import type { ConnectionIdentity } from '@shared/data/request-access.data';
import type { LaunchSecrets } from '@shared/data/rpc.model';

let launchSecrets: LaunchSecrets | undefined;
let localConnectionIdentity: ConnectionIdentity = 'unidentified';

/** Keeps the secrets main handed this process until the connection to main takes them */
export function setLaunchSecrets(secrets: LaunchSecrets): void {
  launchSecrets = secrets;
}

/**
 * Returns the secrets once, then forgets them, so nothing that runs after the connection is made
 * can read them.
 */
export function takeLaunchSecrets(): LaunchSecrets | undefined {
  const secrets = launchSecrets;
  launchSecrets = undefined;
  return secrets;
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
