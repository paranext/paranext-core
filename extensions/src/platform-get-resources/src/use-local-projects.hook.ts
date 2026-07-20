import papi, { logger } from '@papi/frontend';
import { useEvent } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import { DependencyList, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LocalProjectInfo, metadataToLocalProjectInfo } from './home.component';

/**
 * Fetches the local scripture-editor projects (filtered service-side to
 * `platformScripture.USJ_Chapter`), maps them to {@link LocalProjectInfo}, and manages the
 * loading/error state. Shared by the Home and New Tab web views so the fetch shape, the mapping,
 * and the "clear the loading flag even on a failed fetch" handling cannot drift between the two
 * surfaces (they already share {@link metadataToLocalProjectInfo}; this extends that to the whole
 * effect).
 *
 * @param excludePdpFactoryIds PDP factory ids to exclude from the metadata fetch.
 * @param options.logLabel Human-readable surface name used in the failure warning (e.g. `'Home'`).
 * @param options.enabled When false, the fetch is skipped and loading state is left untouched (Home
 *   pauses while a Send/Receive is in progress). Defaults to true.
 * @param options.refetchTriggers Extra reactive values that re-run the fetch when they change (Home
 *   re-fetches when its cached resource list or completed-sync count changes). Defaults to none.
 * @returns The mapped local projects and whether they are still loading.
 */
export function useLocalProjects(
  excludePdpFactoryIds: string[],
  {
    logLabel,
    enabled = true,
    refetchTriggers = [],
  }: { logLabel: string; enabled?: boolean; refetchTriggers?: DependencyList },
): { localProjectsInfo: LocalProjectInfo[]; isLoadingLocalProjects: boolean } {
  const [localProjectsInfo, setLocalProjectsInfo] = useState<LocalProjectInfo[]>([]);
  const [isLoadingLocalProjects, setIsLoadingLocalProjects] = useState<boolean>(true);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Refetch when the C# provider signals the project set/metadata changed - a project added via S/R
  // or DBL download, removed, or renamed. Emitted as `platform.onDidChangeProjects` from
  // LocalParatextProjects; keeps both web views current without waiting for an unrelated refresh.
  const [projectsChangedCount, setProjectsChangedCount] = useState(0);
  const onDidChangeProjects = useMemo(
    () => papi.network.getNetworkEvent('platform.onDidChangeProjects'),
    [],
  );
  useEvent(
    onDidChangeProjects,
    useCallback(() => setProjectsChangedCount((count) => count + 1), []),
  );

  useEffect(() => {
    if (!enabled) return undefined;
    let promiseIsCurrent = true;
    const getLocalProjects = async () => {
      try {
        const projectMetadata = await papi.projectLookup.getMetadataForAllProjects({
          includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
          excludePdpFactoryIds,
        });
        const projectInfo = projectMetadata.map(metadataToLocalProjectInfo);

        if (promiseIsCurrent && isMounted.current) {
          setIsLoadingLocalProjects(false);
          setLocalProjectsInfo(projectInfo);
        }
      } catch (e) {
        // A metadata fetch rejection must still clear the loading flag, or the view spins forever.
        logger.warn(`${logLabel} web view failed to load local projects: ${getErrorMessage(e)}`);
        if (promiseIsCurrent && isMounted.current) setIsLoadingLocalProjects(false);
      }
    };

    getLocalProjects();

    return () => {
      // Mark this promise as old and not to be used
      promiseIsCurrent = false;
    };
    // `refetchTriggers` is a caller-supplied dependency list (Home passes its resource list and
    // completed-sync count); the fixed inputs are listed explicitly. exhaustive-deps can't see
    // through the spread, so it is disabled for this dependency array only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, logLabel, excludePdpFactoryIds, projectsChangedCount, ...refetchTriggers]);

  return { localProjectsInfo, isLoadingLocalProjects };
}
