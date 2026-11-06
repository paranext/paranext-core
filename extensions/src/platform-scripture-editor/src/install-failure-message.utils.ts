import type { LocalizeKey } from 'platform-bible-utils';
import type { DblResourceInstallFailureReason } from './use-dbl-resource-auto-install.hook';

/** A panel's own localize keys for its install-failed state. */
export type InstallFailureMessageKeys<TKey extends LocalizeKey = LocalizeKey> = {
  /** The install was rejected. */
  failed: TKey;
  /** The install was rejected while offline, so the connection is a likely cause. */
  failedOffline: TKey;
  /** The install succeeded, but the catalog still reports the resource as not installed. */
  installedButUnavailable: TKey;
};

/**
 * Picks the message for a panel's install-failed state. The connection hint is only offered for an
 * install that was actually rejected: when it succeeded and the catalog has not caught up, the
 * resource is already on disk and the network is not the problem.
 *
 * @param reason Why the install failed, as reported by `useDblResourceAutoInstall`
 * @param isOnline Whether the machine is online
 * @param keys The panel's own message keys
 * @returns The key of the message to show
 */
export function getInstallFailureMessageKey<TKey extends LocalizeKey>(
  reason: DblResourceInstallFailureReason | undefined,
  isOnline: boolean,
  keys: InstallFailureMessageKeys<TKey>,
): TKey {
  if (reason === 'listNotConverging') return keys.installedButUnavailable;
  return isOnline ? keys.failed : keys.failedOffline;
}
