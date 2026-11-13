import { createHash, randomBytes, timingSafeEqual } from 'crypto';

/**
 * The child processes main launches and identifies by a launch secret. Each presents its client
 * secret in its PAPI WebSocket handshake and checks main's reply for its server secret.
 */
export type LaunchedIdentity = 'extensionHost' | 'dotnetDataProvider';

/** The two secrets main hands a child it launches */
export type LaunchSecrets = { clientSecret: string; serverSecret: string };

type IssuedLaunch = { clientSecretDigest: Buffer; serverSecret: string; launchId: number };

const SECRET_BYTES = 32;

/**
 * The launch each identity holds now. Only a digest of the client secret is kept, so main cannot
 * leak it after the child has it.
 */
const issuedLaunches = new Map<LaunchedIdentity, IssuedLaunch>();
let lastLaunchId = 0;

function digest(value: string): Buffer {
  return createHash('sha256').update(value, 'utf8').digest();
}

/**
 * Creates new secrets for a child about to be launched. Replaces any secrets issued earlier for the
 * identity, so a connection can no longer be made with those.
 *
 * Never log the returned secrets or put them on a command line or in main's own environment.
 */
export function issueLaunchSecrets(identity: LaunchedIdentity): LaunchSecrets {
  const clientSecret = randomBytes(SECRET_BYTES).toString('base64url');
  const serverSecret = randomBytes(SECRET_BYTES).toString('base64url');
  lastLaunchId += 1;
  issuedLaunches.set(identity, {
    clientSecretDigest: digest(clientSecret),
    serverSecret,
    launchId: lastLaunchId,
  });
  return { clientSecret, serverSecret };
}

/**
 * Finds which launched child a presented client secret belongs to. Compares digests in constant
 * time, so a malformed value of any length is simply not found.
 *
 * @param presented The client secret a connection presented
 * @returns The identity, the server secret to return to it, and a number that changes each time
 *   secrets are issued for the identity; `undefined` when the secret matches no current launch
 */
export function identifyClientSecret(
  presented: string,
): { identity: LaunchedIdentity; serverSecret: string; launchId: number } | undefined {
  const presentedDigest = digest(presented);
  let match: { identity: LaunchedIdentity; serverSecret: string; launchId: number } | undefined;
  // Check every launch rather than stopping at a match so the time taken does not depend on which
  // identity matched
  issuedLaunches.forEach((launch, identity) => {
    if (timingSafeEqual(presentedDigest, launch.clientSecretDigest))
      match = { identity, serverSecret: launch.serverSecret, launchId: launch.launchId };
  });
  return match;
}

/** Forgets the secrets issued for an identity, e.g. when its process has exited */
export function revokeLaunchSecrets(identity: LaunchedIdentity): void {
  issuedLaunches.delete(identity);
}
