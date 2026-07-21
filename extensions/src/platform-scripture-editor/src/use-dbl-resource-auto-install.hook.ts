import { useCallback, useEffect, useState } from 'react';

/**
 * Auto-installs a configured/selected DBL resource that is matched in the catalog but not installed
 * locally yet (e.g. an admin choice synced from another machine — the setting syncs, the resource
 * file does not, so install can only happen here at display time). Shared by the Model Text and
 * Resource (Bible Texts / Commentaries) panels, which otherwise leave a matched-but-uninstalled
 * resource on an infinite spinner (PT-4221).
 *
 * Pass `dblEntryUidToInstall` = the uid of the resource to install, or `undefined` when nothing
 * needs installing (already installed, not a DBL resource, or nothing selected). The install is
 * fire-and-forget; the caller is expected to re-resolve its resource list once the install
 * completes so the resource flips to installed and renders.
 *
 * @param dblEntryUidToInstall Uid of the matched-but-uninstalled resource, or `undefined`.
 * @param installResource Installs a resource by uid; rejects on failure.
 * @param skipAutoInstall Skip the automatic attempt (e.g. while a manual picker selection is in
 *   flight and already installing the resource) — prevents a duplicate install.
 * @returns `isInstalling` (attempt in flight or pending), `installFailed` (last attempt for this
 *   uid failed — show a recovery affordance), and `retryInstall` (re-attempt the same uid; also
 *   used to reset the failed state on a fresh manual pick).
 */
export function useDblResourceAutoInstall(
  dblEntryUidToInstall: string | undefined,
  installResource: (dblEntryUid: string) => Promise<void>,
  skipAutoInstall = false,
): { isInstalling: boolean; installFailed: boolean; retryInstall: () => void } {
  // uid whose install we saw fail, so we can surface a recovery state instead of spinning forever
  // and avoid retrying the same failing uid in a loop. Cleared by retryInstall.
  const [failedInstallUid, setFailedInstallUid] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (dblEntryUidToInstall === undefined) return;
    // A manual pick already installs the resource itself; don't fire a duplicate install.
    if (skipAutoInstall) return;
    // Skip a uid we already saw fail (prevents a retry loop); retryInstall clears failedInstallUid.
    if (dblEntryUidToInstall === failedInstallUid) return;
    installResource(dblEntryUidToInstall).catch(() => setFailedInstallUid(dblEntryUidToInstall));
  }, [dblEntryUidToInstall, installResource, failedInstallUid, skipAutoInstall]);

  const installFailed =
    dblEntryUidToInstall !== undefined && dblEntryUidToInstall === failedInstallUid;

  const retryInstall = useCallback(() => setFailedInstallUid(undefined), []);

  return {
    // Once installed, `dblEntryUidToInstall` clears, so this drops to false on its own.
    isInstalling: dblEntryUidToInstall !== undefined && !installFailed,
    installFailed,
    retryInstall,
  };
}

export default useDblResourceAutoInstall;
