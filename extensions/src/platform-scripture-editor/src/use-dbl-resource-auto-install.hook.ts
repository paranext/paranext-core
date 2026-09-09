import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Auto-installs a configured/selected DBL resource that is matched in the catalog but not installed
 * locally yet (e.g. an admin choice synced from another machine — the setting syncs, the resource
 * file does not, so install can only happen here at display time). Shared by the Model Text and
 * Resource (Bible Texts / Commentaries) panels: without it a matched-but-uninstalled resource would
 * sit on an infinite spinner because nothing else triggers the install at display time.
 *
 * Pass `dblEntryUidToInstall` = the uid of the resource to install, or `undefined` when nothing
 * needs installing (already installed, not a DBL resource, or nothing selected). The install is
 * fire-and-forget; the caller is expected to re-resolve its resource list once the install
 * completes so the resource flips to installed and renders.
 *
 * An install that RESOLVES is never fired again for the same uid. Installing a resource that is
 * already on disk succeeds as a no-op, so a uid that comes back still uninstalled after a
 * successful install means the caller's catalog is not converging — and since every success asks
 * the caller to re-resolve that catalog, re-firing the install would loop forever. Such a uid gets
 * the failed state instead, whose retry re-reads the catalog and so can reach a different outcome.
 *
 * @param dblEntryUidToInstall Uid of the matched-but-uninstalled resource, or `undefined`.
 * @param installResource Installs a resource by uid; rejects on failure.
 * @param skipAutoInstall Skip the automatic attempt (e.g. while a manual picker selection is in
 *   flight and already installing the resource) — prevents a duplicate install.
 * @returns `isInstalling` (attempt in flight or pending), `installFailed` (last attempt for this
 *   uid failed — show a recovery affordance), `retryInstall` (re-attempt the same uid; also used to
 *   reset the failed state on a fresh manual pick), and `markInstallFailed` (record a uid a caller
 *   already installed-and-failed itself — e.g. a manual pick — so the auto-install effect doesn't
 *   re-fire a duplicate attempt and the failed state surfaces immediately).
 */
export function useDblResourceAutoInstall(
  dblEntryUidToInstall: string | undefined,
  installResource: (dblEntryUid: string) => Promise<void>,
  skipAutoInstall = false,
): {
  isInstalling: boolean;
  installFailed: boolean;
  retryInstall: () => void;
  markInstallFailed: (dblEntryUid: string) => void;
} {
  // uid whose install we saw fail, so we can surface a recovery state instead of spinning forever
  // and avoid retrying the same failing uid in a loop. Cleared by retryInstall.
  const [failedInstallUid, setFailedInstallUid] = useState<string | undefined>(undefined);

  // The last uid whose install RESOLVED, paired with the `installResource` that ran it. A ref
  // rather than state: nothing renders from it, and it is only ever read when the effect below
  // re-fires. The pairing is what keeps the no-op `installResource` returned before the data
  // provider resolves from counting as an attempt — that identity changes when the provider
  // arrives, so the real install still runs.
  const resolvedAttemptRef = useRef<
    { uid: string; install: (dblEntryUid: string) => Promise<void> } | undefined
  >(undefined);

  useEffect(() => {
    if (dblEntryUidToInstall === undefined) return;
    // A manual pick already installs the resource itself; don't fire a duplicate install.
    if (skipAutoInstall) return;
    // Skip a uid we already saw fail (prevents a retry loop); retryInstall clears failedInstallUid.
    if (dblEntryUidToInstall === failedInstallUid) return;
    // This uid's install already succeeded and it is still being asked for, so the catalog behind
    // it is not converging. Report it as failed rather than installing again — the retry re-reads
    // the catalog, which is the only thing that can change the answer.
    if (
      resolvedAttemptRef.current?.uid === dblEntryUidToInstall &&
      resolvedAttemptRef.current.install === installResource
    ) {
      setFailedInstallUid(dblEntryUidToInstall);
      return;
    }
    // The attempt is recorded only once the install RESOLVES, so the no-op that precedes the data
    // provider — which resolves too — is distinguished by the `install` identity rather than by the
    // outcome. An async function (not `.then`) so a rejection skips the record and lands in the
    // one `catch` below, which is also what keeps this promise from floating.
    const runInstall = async () => {
      await installResource(dblEntryUidToInstall);
      resolvedAttemptRef.current = { uid: dblEntryUidToInstall, install: installResource };
    };
    runInstall().catch(() => setFailedInstallUid(dblEntryUidToInstall));
  }, [dblEntryUidToInstall, installResource, failedInstallUid, skipAutoInstall]);

  const installFailed =
    dblEntryUidToInstall !== undefined && dblEntryUidToInstall === failedInstallUid;

  // Clears the resolved-attempt record too: a user-initiated retry is a fresh attempt and must be
  // able to run the install again, not just re-derive the state that produced the error view.
  const retryInstall = useCallback(() => {
    resolvedAttemptRef.current = undefined;
    setFailedInstallUid(undefined);
  }, []);

  const markInstallFailed = useCallback(
    (dblEntryUid: string) => setFailedInstallUid(dblEntryUid),
    [],
  );

  return {
    // Once installed, `dblEntryUidToInstall` clears, so this drops to false on its own.
    isInstalling: dblEntryUidToInstall !== undefined && !installFailed,
    installFailed,
    retryInstall,
    markInstallFailed,
  };
}

export default useDblResourceAutoInstall;
