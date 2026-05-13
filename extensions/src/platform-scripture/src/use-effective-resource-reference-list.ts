import { useEffect, useMemo, useState } from 'react';
import { isPlatformError } from 'platform-bible-utils';
import type { ResourceReference, ResourceReferenceList } from 'platform-scripture';
import { useProjectSetting, useProjectDataProvider } from '@papi/frontend/react';

function getDeduplicationKey(item: ResourceReference): string {
  if ('id' in item && typeof item.id === 'string') {
    return `id:${item.id}`;
  }
  return `name:${item.name}`;
}

function mergeResourceReferenceLists(
  projectList: ResourceReferenceList,
  userList: ResourceReferenceList,
): ResourceReferenceList {
  const seen = new Set<string>();
  const merged: ResourceReference[] = [];

  for (const item of projectList.items) {
    const key = getDeduplicationKey(item);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(item);
    }
  }

  for (const item of userList.items) {
    const key = getDeduplicationKey(item);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(item);
    }
  }

  return {
    dataVersion: projectList.dataVersion,
    items: merged,
  };
}

/**
 * Returns the effective ResourceReferenceList for a setting: the set-union of project-level and
 * user-specific items, deduplicated by `id` (for ProjectReference and DblResourceReference) or
 * `name` (for all other reference types).
 *
 * Returns `undefined` while either setting is loading.
 */
export function useEffectiveResourceReferenceList(
  projectId: string | undefined,
  settingName: 'platformScripture.modelTexts' | 'platformScripture.referencedProjectsAndResources',
): ResourceReferenceList | undefined {
  const defaultList = useMemo<ResourceReferenceList>(
    () => ({ dataVersion: '1.0.0', items: [] }),
    [],
  );

  const [projectSettingValue, , , isProjectSettingLoading] = useProjectSetting(
    projectId,
    settingName,
    defaultList,
  );

  const userPdp = useProjectDataProvider('platformScripture.userTextConnectionSettings', projectId);

  const [userList, setUserList] = useState<ResourceReferenceList | undefined>(undefined);

  useEffect(() => {
    if (!userPdp) {
      setUserList(undefined);
      return undefined;
    }

    let unsubscribe: (() => Promise<boolean>) | undefined;

    const subscribeMethod =
      settingName === 'platformScripture.modelTexts'
        ? 'subscribeUserModelTexts'
        : 'subscribeUserReferencedProjectsAndResources';

    const subscribePromise = userPdp[subscribeMethod](undefined, (value) => {
      if (isPlatformError(value)) {
        setUserList(undefined);
      } else {
        setUserList(value);
      }
    });

    subscribePromise.then((unsub) => {
      unsubscribe = unsub;
      return unsub;
    });

    return () => {
      unsubscribe?.();
    };
  }, [userPdp, settingName]);

  return useMemo(() => {
    if (isProjectSettingLoading) return undefined;
    if (isPlatformError(projectSettingValue)) return undefined;
    if (userList === undefined) return undefined;

    return mergeResourceReferenceLists(projectSettingValue, userList);
  }, [isProjectSettingLoading, projectSettingValue, userList]);
}

export default useEffectiveResourceReferenceList;
