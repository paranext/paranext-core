import { useCallback, useEffect, useRef, useState } from 'react';

/** Options for {@link useDblResourceAutoInstall}. */
export type DblResourceAutoInstallOptions = {
  /**
   * Skip the automatic attempt — e.g. while a manual picker selection is in flight and already
   * installing the resource, which would otherwise be installed twice.
   */
  skipAutoInstall?: boolean;
  /**
   * Re-resolves the caller's resource list. Called by `retryInstall` so a user retry re-reads the
   * catalog it failed against; without it the retry can only replay the same outcome.
   */
  refreshResourceList?: () => void;
};

/** What {@link useDblResourceAutoInstall} reports and offers. */
export type DblResourceAutoInstallState = {
  /** An attempt is in flight or pending. */
  isInstalling: boolean;
  /** The last attempt for this uid failed — show a recovery affordance. */
  installFailed: boolean;
  /** Refreshes the resource list and re-attempts the uid. Wire this to the recovery affordance. */
  retryInstall: () => void;
  /** Drops the failed state without retrying, for a caller starting its own fresh attempt. */
  clearInstallFailure: () => void;
  /**
   * Records a uid the caller installed and saw fail itself — e.g. a manual pick — so the failed
   * state surfaces immediately and the auto-install effect does not fire a duplicate attempt.
   */
  markInstallFailed: (dblEntryUid: string) => void;
};

/**
 * Auto-installs a configured/selected DBL resource that is matched in the catalog but not installed
 * locally yet (e.g. an admin choice synced from another machine — the setting syncs, the resource
 * file does not, so install can only happen here at display time). Shared by the Model Text and
 * Resource (Bible Texts / Commentaries) panels: without it a matched-but-uninstalled resource would
 * sit on an infinite spinner because nothing else triggers the install at display time.
 *
 * The install is fire-and-forget; the caller re-resolves its resource list once the install
 * completes so the resource flips to installed and renders.
 *
 * An install that RESOLVES is never fired again for the same uid, because installing a resource
 * already on disk succeeds as a no-op: a uid still uninstalled after a successful install means the
 * caller's list is not converging, and re-firing would loop forever. That uid gets the failed state
 * instead, whose retry re-reads the list and so can reach a different outcome. See
 * `adr-dbl-install-is-idempotent`.
 *
 * @param dblEntryUidToInstall Uid of the matched-but-uninstalled resource, or `undefined` when
 *   nothing needs installing (already installed, not a DBL resource, or nothing selected).
 * @param installResource Installs a resource by uid; rejects on failure. Must keep a stable
 *   identity across renders (`useInstallDblResource` does) — a new identity reads as a new
 *   installer and re-enables the auto-install, which is what lets the real install run once the
 *   data provider replaces the no-op one.
 * @param options See {@link DblResourceAutoInstallOptions}.
 * @returns See {@link DblResourceAutoInstallState}.
 */
export function useDblResourceAutoInstall(
  dblEntryUidToInstall: string | undefined,
  installResource: (dblEntryUid: string) => Promise<void>,
  options: DblResourceAutoInstallOptions = {},
): DblResourceAutoInstallState {
  const { skipAutoInstall = false, refreshResourceList } = options;

  // uid whose install we saw fail, so we can surface a recovery state instead of spinning forever
  // and avoid retrying the same failing uid in a loop.
  const [failedInstallUid, setFailedInstallUid] = useState<string | undefined>(undefined);

  // The last uid whose install resolved, paired with the `installResource` that ran it. Recorded on
  // resolution rather than on the call, so an attempt still in flight does not count; paired with
  // the installer so the no-op one returned before the data provider resolves does not either.
  const resolvedAttemptRef = useRef<
    { uid: string; install: (dblEntryUid: string) => Promise<void> } | undefined
  >(undefined);

  useEffect(() => {
    if (dblEntryUidToInstall === undefined) return;
    // A manual pick already installs the resource itself; don't fire a duplicate install.
    if (skipAutoInstall) return;
    // Skip a uid we already saw fail (prevents a retry loop); retryInstall clears failedInstallUid.
    if (dblEntryUidToInstall === failedInstallUid) return;
    // Installing again cannot help: this uid's install already succeeded and it is still being
    // asked for, so only a re-read of the caller's list can change the answer. Offer the retry.
    if (
      resolvedAttemptRef.current?.uid === dblEntryUidToInstall &&
      resolvedAttemptRef.current.install === installResource
    ) {
      setFailedInstallUid(dblEntryUidToInstall);
      return;
    }
    // An async function rather than `.then`, so a rejection skips the record and lands in the one
    // `catch` below — which is also what keeps this promise from floating.
    const runInstall = async () => {
      await installResource(dblEntryUidToInstall);
      resolvedAttemptRef.current = { uid: dblEntryUidToInstall, install: installResource };
    };
    runInstall().catch(() => setFailedInstallUid(dblEntryUidToInstall));
  }, [dblEntryUidToInstall, installResource, failedInstallUid, skipAutoInstall]);

  const installFailed =
    dblEntryUidToInstall !== undefined && dblEntryUidToInstall === failedInstallUid;

  // Clears the resolved-attempt record too, so the uid is genuinely attempted again rather than
  // falling straight back into the "already installed this" branch above.
  const clearInstallFailure = useCallback(() => {
    resolvedAttemptRef.current = undefined;
    setFailedInstallUid(undefined);
  }, []);

  // The refresh is started, not awaited: it lands as a new resource list a render or two later. The
  // install re-fired in between runs against the old list, which is harmless because installing an
  // already-installed resource is a no-op success.
  const retryInstall = useCallback(() => {
    refreshResourceList?.();
    clearInstallFailure();
  }, [refreshResourceList, clearInstallFailure]);

  const markInstallFailed = useCallback(
    (dblEntryUid: string) => setFailedInstallUid(dblEntryUid),
    [],
  );

  return {
    // Once installed, `dblEntryUidToInstall` clears, so this drops to false on its own.
    isInstalling: dblEntryUidToInstall !== undefined && !installFailed,
    installFailed,
    retryInstall,
    clearInstallFailure,
    markInstallFailed,
  };
}

export default useDblResourceAutoInstall;
