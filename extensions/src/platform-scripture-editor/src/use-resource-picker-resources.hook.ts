import papi, { logger } from '@papi/frontend';
import { useEvent } from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { DblResourceData } from 'platform-bible-utils';
import { getErrorMessage } from 'platform-bible-utils';
import { useEffectiveResourceReferenceList } from './use-effective-resource-reference-list.hook';
import {
  buildPickerResources,
  fetchDownloadedResources,
  type DownloadedResource,
  type PickerResource,
} from './downloaded-resources.utils';

/**
 * Composes the picker's resource list: the effective (admin+user) referenced list, optionally
 * unioned with all locally-downloaded scripture projects, deduped and ordered.
 *
 * @param projectId The container project whose reference list is shown
 * @param options.includeDownloaded Union in locally-downloaded projects that are not referenced yet
 * @param options.adminLockedFirst Sort admin-locked rows to the top
 * @param dblResources The resource catalog rows to resolve references against
 * @param isCatalogSettled Whether the catalog fetch has finished — delivered or failed. A row's
 *   type comes from the catalog, so rows built while it is still in flight are provisional: every
 *   project would type as `'ScriptureResource'`, which a type-filtered panel would read as a
 *   settled answer and could persist as a selection. Pass `isCatalogReady || hasCatalogError` from
 *   {@link useDblResourceCatalog} — a failed catalog still has to produce rows, or a panel with
 *   nothing configured waits on a fetch that is already over.
 * @returns The rows, or `undefined` while any source is still in flight, and whether they are still
 *   loading
 */
export function useResourcePickerResources(
  projectId: string | undefined,
  options: { includeDownloaded?: boolean; adminLockedFirst?: boolean },
  dblResources: DblResourceData[],
  isCatalogSettled: boolean,
): [PickerResource[] | undefined, boolean] {
  const { includeDownloaded = false, adminLockedFirst = false } = options;

  const effectiveResourcesState = useEffectiveResourceReferenceList(
    projectId,
    'platformScripture.referencedProjectsAndResources',
  );
  const effectiveResources =
    effectiveResourcesState.status === 'ready' ? effectiveResourcesState.list : undefined;

  // undefined = fetch in flight; [] = not fetching (includeDownloaded is false or fetch completed)
  const [downloaded, setDownloaded] = useState<DownloadedResource[] | undefined>(undefined);

  const refetchDownloaded = useCallback(() => {
    if (!includeDownloaded) {
      setDownloaded([]);
      return undefined;
    }
    let isCurrent = true;
    // `fetchDownloadedResources` handles its own errors and resolves to `[]`, so the catch is only
    // reachable if that contract breaks. It reports rather than repeating the success path, so a
    // broken contract shows up in the log instead of as a list that silently stays empty.
    fetchDownloadedResources()
      .then((result) => {
        if (isCurrent) setDownloaded(result);
        return undefined;
      })
      .catch((e) => {
        logger.warn(`Downloaded resource list fetch rejected unexpectedly: ${getErrorMessage(e)}`);
        if (isCurrent) setDownloaded([]);
      });
    return () => {
      isCurrent = false;
    };
  }, [includeDownloaded]);

  useEffect(() => {
    setDownloaded(undefined);
    return refetchDownloaded();
  }, [refetchDownloaded]);

  // Projects can be installed, removed or renamed while this panel is open — including by the
  // resource picker this list feeds. Re-read when the C# provider says so, rather than showing a
  // list that is stale until the panel is reopened.
  const onDidChangeProjects = useMemo(
    () => papi.network.getNetworkEvent('platform.onDidChangeProjects'),
    [],
  );
  useEvent(
    onDidChangeProjects,
    useCallback(() => {
      refetchDownloaded();
    }, [refetchDownloaded]),
  );

  const rows = useMemo(() => {
    if (!effectiveResources) return undefined;
    if (!isCatalogSettled) return undefined;
    if (includeDownloaded && downloaded === undefined) return undefined;
    const built = buildPickerResources(
      effectiveResources.items,
      includeDownloaded ? (downloaded ?? []) : [],
      dblResources,
    );
    if (!adminLockedFirst) return built;
    return [...built].sort((a, b) => Number(b.isAdminLocked) - Number(a.isAdminLocked));
  }, [
    effectiveResources,
    downloaded,
    dblResources,
    adminLockedFirst,
    includeDownloaded,
    isCatalogSettled,
  ]);

  return [rows, effectiveResourcesState.status === 'loading' || rows === undefined];
}
