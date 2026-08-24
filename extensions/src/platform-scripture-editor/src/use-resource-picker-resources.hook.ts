import { useEffect, useMemo, useState } from 'react';
import type { DblResourceData } from 'platform-bible-utils';
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
 */
export function useResourcePickerResources(
  projectId: string | undefined,
  options: { includeDownloaded?: boolean; adminLockedFirst?: boolean },
  dblResources: DblResourceData[],
): [PickerResource[] | undefined, boolean] {
  const { includeDownloaded = false, adminLockedFirst = false } = options;

  const [effectiveResources, isEffectiveLoading] = useEffectiveResourceReferenceList(
    projectId,
    'platformScripture.referencedProjectsAndResources',
  );

  const [downloaded, setDownloaded] = useState<DownloadedResource[]>([]);
  const [isDownloadedLoading, setIsDownloadedLoading] = useState(false);

  // TODO: papi.projectLookup has no onDidChange event yet; the downloaded list will be stale if
  // a project is installed while this panel is open. Re-fetch when that event exists.
  useEffect(() => {
    if (!includeDownloaded) {
      setDownloaded([]);
      setIsDownloadedLoading(false);
      return undefined;
    }
    setIsDownloadedLoading(true);
    let current = true;
    fetchDownloadedResources()
      .then((result) => {
        if (current) {
          setDownloaded(result);
          setIsDownloadedLoading(false);
        }
        return undefined;
      })
      .catch(() => {
        if (current) {
          setDownloaded([]);
          setIsDownloadedLoading(false);
        }
      });
    return () => {
      current = false;
    };
  }, [includeDownloaded]);

  const rows = useMemo(() => {
    if (!effectiveResources) return undefined;
    const built = buildPickerResources(effectiveResources.items, downloaded, dblResources);
    if (!adminLockedFirst) return built;
    return [...built].sort((a, b) => Number(b.isAdminLocked) - Number(a.isAdminLocked));
  }, [effectiveResources, downloaded, dblResources, adminLockedFirst]);

  return [rows, isEffectiveLoading || isDownloadedLoading];
}
