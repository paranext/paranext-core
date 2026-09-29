import papi, { logger } from '@papi/frontend';
import { useEvent, usePromise } from 'platform-bible-react';
import { getErrorMessage, retryUntil, type DblResourceData } from 'platform-bible-utils';
import type { DblResourceInstallStatus } from 'platform-get-resources';
import { useCallback, useMemo, useState } from 'react';
import type { BibleTextReference } from '../scripture-text-grid-contents.utils';
import { needsInstallLookup, toInstallLookup, type InstallLookup } from './grid-resources.utils';

/** Asks the backend which DBL resources are installed on disk. */
async function fetchInstalledDblResources(): Promise<DblResourceInstallStatus> {
  // Looked up on every ask: `useDataProvider` never looks again after missing a provider that had
  // not registered yet.
  const provider = await papi.dataProviders.get('platformGetResources.dblResourcesProvider');
  if (!provider)
    throw new Error('The DBL resources provider is not available to report installed resources');
  // An empty map may only mean the provider is busy for a moment.
  return retryUntil(
    () => provider.recomputeDblResourcesInstallStatus(),
    (status) => Object.keys(status).length > 0,
    { maxAttempts: 5, delayMs: 500 },
  );
}

/**
 * Asks whose answers stand in for one another: the same references, with no install from this grid
 * in between. `lastAnswered` is the newest non-empty answer any of them got, and `lastAnsweredAsk`
 * is the order that ask started in, so a slow earlier ask cannot overwrite a newer answer.
 */
type Generation = {
  asksStarted: number;
  lastAnsweredAsk: number;
  lastAnswered: DblResourceInstallStatus | undefined;
};

/**
 * An ask's outcome, tagged with the ask that produced it: its generation's newest answer, or
 * `undefined` if none of its asks got one.
 */
type Answer = {
  ask: () => Promise<Answer>;
  generation: Generation;
  status: DblResourceInstallStatus | undefined;
};

/**
 * Asks the backend's disk scan about DBL references the catalog cannot resolve, so installed
 * resources still render offline or while the catalog is loading.
 *
 * An answer holds until the references change or an install from this grid (`refreshCounter`)
 * changes the disk; after either, only a new answer counts. A Retry, or a project added, removed or
 * renamed anywhere, asks again but keeps showing the answer in hand until a newer one arrives.
 *
 * Hidden case: runs while the tab is inactive, deliberately. It is data only, no geometry, so the
 * cells are right when the tab is shown.
 */
export function useDblInstallLookup({
  references,
  cachedResources,
  isCatalogLoading,
  hasCatalogSettled,
  refreshCounter,
}: {
  references: BibleTextReference[];
  cachedResources: DblResourceData[] | undefined;
  isCatalogLoading: boolean;
  hasCatalogSettled: boolean;
  /** Bumped by each install from this grid, which is what makes an earlier answer stale. */
  refreshCounter: number;
}): InstallLookup {
  const isNeeded = useMemo(
    () => needsInstallLookup(references, cachedResources ?? []),
    [references, cachedResources],
  );

  // A resource removed in another panel would otherwise stay resolved to a project that is gone.
  const [projectsChangeCount, setProjectsChangeCount] = useState(0);
  const onDidChangeProjects = useMemo(
    () => papi.network.getNetworkEvent('platform.onDidChangeProjects'),
    [],
  );
  useEvent(
    onDidChangeProjects,
    useCallback(() => setProjectsChangeCount((count) => count + 1), []),
  );

  const generation = useMemo(
    (): Generation => ({ asksStarted: 0, lastAnsweredAsk: 0, lastAnswered: undefined }),
    // `refreshCounter` is a trigger (value unread): an install changes what is on disk.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isNeeded, refreshCounter],
  );

  const ask = useMemo(() => {
    if (!isNeeded) return undefined;
    const run = async (): Promise<Answer> => {
      // The catalog fetch holds the provider until it settles, so a disk scan asked meanwhile can
      // only hear "busy". Skip it when an answer is already in hand; without one (first mount), ask
      // anyway, because that is what renders an installed resource while the catalog loads.
      if (!hasCatalogSettled && generation.lastAnswered)
        return { ask: run, generation, status: generation.lastAnswered };

      generation.asksStarted += 1;
      const askOrder = generation.asksStarted;
      try {
        const status = await fetchInstalledDblResources();
        // An empty map is "no answer", so it never replaces one.
        if (Object.keys(status).length > 0 && askOrder > generation.lastAnsweredAsk) {
          generation.lastAnswered = status;
          generation.lastAnsweredAsk = askOrder;
        }
      } catch (error) {
        logger.warn(`Could not check which DBL resources are installed: ${getErrorMessage(error)}`);
      }
      return { ask: run, generation, status: generation.lastAnswered };
    };
    return run;
    // `projectsChangeCount` is a trigger (value unread): ask again after a project change.
    // `hasCatalogSettled` is read, and also a trigger: ask again once the catalog fetch releases the
    // provider — after a Retry or an install, too.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generation, isNeeded, hasCatalogSettled, projectsChangeCount]);

  const [answer] = usePromise(ask, undefined);
  // `usePromise` keeps an earlier ask's result until the new one arrives. One from an earlier
  // generation may predate an install, so it is never presented as current; within a generation an
  // earlier ask's answer still stands, but its "no answer" does not speak for the ask now running.
  const currentAnswer =
    answer &&
    (answer.ask === ask || (answer.generation === generation && answer.status !== undefined))
      ? answer
      : undefined;

  return useMemo(
    () => toInstallLookup(currentAnswer, { isNeeded, isCatalogLoading }),
    [currentAnswer, isNeeded, isCatalogLoading],
  );
}

export default useDblInstallLookup;
