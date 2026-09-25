import papi, { logger } from '@papi/frontend';
import { usePromise } from 'platform-bible-react';
import { getErrorMessage, retryUntil, type DblResourceData } from 'platform-bible-utils';
import type { DblResourceInstallStatus } from 'platform-get-resources';
import { useMemo } from 'react';
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

/** One ask's outcome, tagged with the ask that produced it. `status` is `undefined` if it failed. */
type Answer = { ask: () => Promise<Answer>; status: DblResourceInstallStatus | undefined };

/**
 * Asks the backend's disk scan about DBL references the catalog cannot resolve, so installed
 * resources still render offline or while the catalog is loading.
 *
 * Hidden case: runs while the tab is inactive, deliberately. It is data only, no geometry, so the
 * cells are right when the tab is shown.
 */
export function useDblInstallLookup({
  references,
  cachedResources,
  isCatalogLoading,
  hasCatalogSettled,
}: {
  references: BibleTextReference[];
  cachedResources: DblResourceData[] | undefined;
  isCatalogLoading: boolean;
  hasCatalogSettled: boolean;
}): InstallLookup {
  const isNeeded = useMemo(
    () => needsInstallLookup(references, cachedResources ?? []),
    [references, cachedResources],
  );

  const ask = useMemo(() => {
    if (!isNeeded) return undefined;
    const run = async (): Promise<Answer> => {
      try {
        return { ask: run, status: await fetchInstalledDblResources() };
      } catch (error) {
        logger.warn(`Could not check which DBL resources are installed: ${getErrorMessage(error)}`);
        return { ask: run, status: undefined };
      }
    };
    return run;
    // `hasCatalogSettled` is a trigger (value unread): the catalog fetch holds the provider while it
    // runs, so ask again once it settles — after a Retry or an install, too.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNeeded, hasCatalogSettled]);

  const [answer] = usePromise(ask, undefined);
  // `usePromise` keeps an earlier ask's answer until the new one arrives; that answer may predate an
  // install, uninstall or Retry, so only the current ask's answer counts.
  const currentAnswer = answer && answer.ask === ask ? answer : undefined;

  return useMemo(
    () => toInstallLookup(currentAnswer, { isNeeded, isCatalogLoading }),
    [currentAnswer, isNeeded, isCatalogLoading],
  );
}

export default useDblInstallLookup;
