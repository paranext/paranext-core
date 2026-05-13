import { useEffect, useMemo, useState } from 'react';
import { isPlatformError } from 'platform-bible-utils';
import type { ResourceReference, ResourceReferenceList } from 'platform-scripture';
import { useProjectSetting, useProjectDataProvider } from '@papi/frontend/react';

// Module-level constant avoids a useMemo with [] deps inside the hook
const DEFAULT_LIST: ResourceReferenceList = { dataVersion: '1.0.0', items: [] };

function getDeduplicationKey(item: ResourceReference): string {
  if ('id' in item && typeof item.id === 'string') {
    return `id:${item.id}`;
  }
  // Fallback: name-based deduplication — guard that name is actually a string
  const name = (item as { name?: unknown }).name;
  if (typeof name === 'string') return `name:${name}`;
  // Unknown type with no string name: use type + stringified name to avoid false dedup
  return `type:${item.type}:${String(name ?? '')}`;
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
  const [projectSettingValue, , , isProjectSettingLoading] = useProjectSetting(
    projectId,
    settingName,
    DEFAULT_LIST,
  );

  const userPdp = useProjectDataProvider('platformScripture.userTextConnectionSettings', projectId);

  const [userList, setUserList] = useState<ResourceReferenceList | undefined>(undefined);

  useEffect(() => {
    if (!userPdp) {
      setUserList(undefined);
      return;
    }

    let disposed = false;
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
      if (disposed) {
        unsub();
      } else {
        unsubscribe = unsub;
      }
    });

    return () => {
      disposed = true;
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
