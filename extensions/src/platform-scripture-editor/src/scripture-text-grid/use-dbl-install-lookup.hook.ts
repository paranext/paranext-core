import papi, { logger } from '@papi/frontend';
import { useEvent, usePromise, useRunWhenVisible, useViewVisibility } from 'platform-bible-react';
import { getErrorMessage, retryUntil, type DblResourceData } from 'platform-bible-utils';
import type { DblResourceInstallStatus } from 'platform-get-resources';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { BibleTextReference } from '../scripture-text-grid-contents.utils';
import { needsInstallLookup, toInstallLookup, type InstallLookup } from './grid-resources.utils';

/** How long a burst of project changes, such as one install's, has to go quiet before one re-ask. */
export const PROJECTS_CHANGE_COLLAPSE_MS = 250;

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
 * in between. `lastAnswered` is the newest answer any of them got, and `lastAnsweredAsk` is the
 * order that ask started in, so a slow earlier ask cannot overwrite a newer answer.
 * `lastAnsweredProjectsChange` is the count of project changes that answer had seen, or, before any
 * answer, the count when the generation started.
 */
type Generation = {
  asksStarted: number;
  lastAnsweredAsk: number;
  lastAnswered: DblResourceInstallStatus | undefined;
  lastAnsweredProjectsChange: number;
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
 * Hidden case: the asks a Retry or an install starts run while the tab is inactive, deliberately.
 * They are data only, no geometry, so the cells are right when the tab is shown. Project changes
 * are different: they come from anywhere in the app, so while hidden they collapse into one re-ask
 * when the tab is shown.
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
  const requestProjectsReask = useRunWhenVisible(useViewVisibility(), () =>
    setProjectsChangeCount((count) => count + 1),
  );
  const projectsChangeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(projectsChangeTimerRef.current), []);
  const onDidChangeProjects = useMemo(
    () => papi.network.getNetworkEvent('platform.onDidChangeProjects'),
    [],
  );
  useEvent(
    onDidChangeProjects,
    useCallback(() => {
      clearTimeout(projectsChangeTimerRef.current);
      projectsChangeTimerRef.current = setTimeout(
        requestProjectsReask,
        PROJECTS_CHANGE_COLLAPSE_MS,
      );
    }, [requestProjectsReask]),
  );

  // A new generation starts level with the project changes seen so far, so only a change after it
  // starts can let an empty scan in. Read through a ref so a project change does not itself start a
  // new generation.
  const projectsChangeCountRef = useRef(projectsChangeCount);
  projectsChangeCountRef.current = projectsChangeCount;
  const generation = useMemo(
    (): Generation => ({
      asksStarted: 0,
      lastAnsweredAsk: 0,
      lastAnswered: undefined,
      lastAnsweredProjectsChange: projectsChangeCountRef.current,
    }),
    // `refreshCounter` is a trigger (value unread): an install changes what is on disk.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isNeeded, refreshCounter],
  );

  const ask = useMemo(() => {
    if (!isNeeded) return undefined;
    const run = async (): Promise<Answer> => {
      // The catalog fetch holds the provider until it settles, so a disk scan asked meanwhile can
      // only hear "busy"; the settle asks again. Only a generation's first ask scans anyway, because
      // that is what renders an installed resource while the catalog loads.
      if (!hasCatalogSettled && generation.asksStarted > 0)
        return { ask: run, generation, status: generation.lastAnswered };

      generation.asksStarted += 1;
      const askOrder = generation.asksStarted;
      try {
        const status = await fetchInstalledDblResources();
        const isEmpty = Object.keys(status).length === 0;
        // An empty map is "no answer", so it never replaces one, with one exception. Offline, the
        // scan names only installed resources, so removing the last one also answers `{}`; once
        // projects have changed since the answer in hand, that answer may name a removed project,
        // and is dropped rather than kept.
        const isStale = projectsChangeCount > generation.lastAnsweredProjectsChange;
        if (askOrder > generation.lastAnsweredAsk && (!isEmpty || isStale)) {
          generation.lastAnswered = isEmpty ? undefined : status;
          generation.lastAnsweredAsk = askOrder;
          generation.lastAnsweredProjectsChange = projectsChangeCount;
        }
      } catch (error) {
        logger.warn(`Could not check which DBL resources are installed: ${getErrorMessage(error)}`);
      }
      return { ask: run, generation, status: generation.lastAnswered };
    };
    return run;
    // Each change also asks again: after a project change, and once the catalog fetch releases the
    // provider (after a Retry or an install, too).
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
