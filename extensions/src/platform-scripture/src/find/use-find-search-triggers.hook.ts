import { MutableRefObject, useEffect } from 'react';
import { FindJobStatus } from 'platform-scripture';

/**
 * Whether the selected project's find provider can be resolved. `'resolving'` is the value every
 * `projectId` change resets to, so it must never be treated as a terminal answer.
 */
export type FindPdpAvailability = 'resolving' | 'ready' | 'unavailable';

/** Inputs for {@link useFindSearchTriggers}. */
export type FindSearchTriggersOptions = {
  /**
   * The find provider for the selected project, or a falsy value when none is resolved. Only its
   * IDENTITY matters here — a new object means the provider was re-resolved (typically because
   * `projectId` changed), which is what wakes the rerun.
   */
  findPdp: unknown;
  /** Whether that provider is actually usable. */
  findPdpAvailability: FindPdpAvailability;
  /** Current find-job status; `undefined` means no search has run. */
  searchStatus: FindJobStatus | undefined;
  /** Current search term (reactive copy, for the restore-time trigger). */
  searchTerm: string;
  /** Latest search term, read inside effects without re-triggering them. */
  searchTermRef: MutableRefObject<string>;
  /** Set when a project switch needs the current term re-run against the new project. */
  pendingProjectSwitchRerunRef: MutableRefObject<boolean>;
  /** Set once the initial auto-search has been attempted. */
  initialSearchTriggeredRef: MutableRefObject<boolean>;
  /** Set so a still-pending debounce skips its redundant second call. */
  explicitSearchPendingRef: MutableRefObject<boolean>;
  /** Starts a find job. `isExplicitSearch` also writes the term to recent searches. */
  startSearch: (isExplicitSearch: boolean) => void;
};

/**
 * Owns the two effects that start a search WITHOUT the user pressing anything: the project-switch
 * rerun, and the restore-time fallback.
 *
 * Extracted from the Find web view so both can be tested directly. They are the highest-risk logic
 * in the panel and each has already shipped the same defect once — a search start gated on
 * `findPdpAvailability` while the effect did not depend on it, so when availability settled late
 * nothing re-armed and the panel sat empty with a term in the box. Testing that requires driving
 * the effects across renders, which is only possible with them in a hook; this module deliberately
 * takes plain values, refs, and a callback so it needs no `@papi` mocking.
 */
export function useFindSearchTriggers({
  findPdp,
  findPdpAvailability,
  searchStatus,
  searchTerm,
  searchTermRef,
  pendingProjectSwitchRerunRef,
  initialSearchTriggeredRef,
  explicitSearchPendingRef,
  startSearch,
}: FindSearchTriggersOptions): void {
  // Re-run the current term against the project just switched to. `findPdp` only takes on the new
  // project's identity after the switching render, so this cannot live in the switch handler. Gated by
  // the pending ref rather than a previous-value comparison so it fires for every switch that handler
  // performs — user-initiated from the picker, AND automatic when the selected project's last editor
  // tab closes — and only for those, not for `findPdp` re-identifying for any other reason.
  //
  // Depends on BOTH `findPdp` and `findPdpAvailability` because a switch settles them independently and
  // the search needs both. Availability resets to `'resolving'` on every `projectId` change and
  // `findPdp`'s new identity usually lands first, so the effect must WAIT rather than consume the flag
  // on its first wake-up: clearing it before the search actually starts drops the rerun for good.
  useEffect(() => {
    if (!pendingProjectSwitchRerunRef.current) return;
    // Clear only for conditions that will NOT resolve on their own; an unavailable provider surfaces
    // its own error, so there is nothing left to wait for.
    if (!findPdp || searchTermRef.current.trim() === '' || findPdpAvailability === 'unavailable') {
      pendingProjectSwitchRerunRef.current = false;
      return;
    }
    if (findPdpAvailability !== 'ready') return;
    pendingProjectSwitchRerunRef.current = false;
    // Set directly so a pending debounce skips its redundant second call, but started as NON-explicit:
    // a project switch is not a user search, and an explicit search also writes to recent searches.
    explicitSearchPendingRef.current = true;
    startSearch(false);
  }, [
    findPdp,
    findPdpAvailability,
    pendingProjectSwitchRerunRef,
    searchTermRef,
    explicitSearchPendingRef,
    startSearch,
  ]);

  // Restore-time fallback: when a persisted term is present but the provider was not usable at mount,
  // run the search as soon as it becomes usable. `findPdpAvailability` is required here for the same
  // reason as above — without it, a late-settling provider leaves a term on screen and no results.
  useEffect(() => {
    if (
      !findPdp ||
      findPdpAvailability !== 'ready' ||
      !initialSearchTriggeredRef.current ||
      searchStatus !== undefined ||
      searchTerm.trim() === ''
    )
      return;
    explicitSearchPendingRef.current = true;
    // Non-explicit, matching the pre-extraction call: restoring a persisted term is not a fresh user
    // search, so it must not write another recent-searches entry.
    startSearch(false);
  }, [
    findPdp,
    findPdpAvailability,
    searchStatus,
    searchTerm,
    initialSearchTriggeredRef,
    explicitSearchPendingRef,
    startSearch,
  ]);
}

export default useFindSearchTriggers;
