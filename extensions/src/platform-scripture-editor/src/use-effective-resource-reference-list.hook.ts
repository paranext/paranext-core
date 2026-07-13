import { useEffect, useMemo, useState } from 'react';
import { isPlatformError } from 'platform-bible-utils';
import type {
  EffectiveResourceReference,
  EffectiveResourceReferenceList,
  ResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';
import { useProjectDataProvider } from '@papi/frontend/react';
import {
  CURRENT_DATA_VERSION,
  DEFAULT_RESOURCE_REFERENCE_LIST as DEFAULT_LIST,
} from './resource-reference-list.const';
import { useBufferedProjectSetting } from './use-buffered-project-setting.hook';

const KNOWN_RESOURCE_TYPES = new Set([
  'project',
  'dblResource',
  'enhancedResource',
  'xmlResource',
  'sourceLanguageResource',
]);

function getDeduplicationKey(item: ResourceReference): string | undefined {
  if ('id' in item && typeof item.id === 'string') return `id:${item.id}`;
  if ('name' in item && typeof item.name === 'string') return `name:${item.name}`;
  // Should never happen after upstream validation; discard rather than silently misidentify
  console.error(`Resource reference of type '${item.type}' has no string name; discarding.`);
  return undefined;
}

/**
 * Merges two ResourceReferenceLists into a deduplicated union. The result is derived/read-only: it
 * uses CURRENT_DATA_VERSION (not the source versions) and excludes UnknownResourceReference items,
 * which exist only for round-trip storage compatibility and cannot be acted upon. Admin-sourced
 * items (from the project file) are listed first.
 */
function mergeResourceReferenceLists(
  projectResourceReferenceList: ResourceReferenceList,
  userResourceReferenceList: ResourceReferenceList,
): EffectiveResourceReferenceList {
  const seen = new Set<string>();
  const merged: EffectiveResourceReference[] = [];

  const processItems = (items: ResourceReference[], source: 'admin' | 'user') => {
    items
      .filter((item) => KNOWN_RESOURCE_TYPES.has(item.type))
      .forEach((item) => {
        const key = getDeduplicationKey(item);
        if (key !== undefined && !seen.has(key)) {
          seen.add(key);
          merged.push({ ...item, source });
        }
      });
  };

  processItems(projectResourceReferenceList.items, 'admin');
  processItems(userResourceReferenceList.items, 'user');

  return { dataVersion: CURRENT_DATA_VERSION, items: merged };
}

/**
 * Returns the effective resource reference list for a setting: the set-union of project-level
 * (admin) and user-specific items, deduplicated by `id` (for ProjectReference and
 * DblResourceReference) or `name` (for all other reference types). Each item carries a runtime
 * `source` tag (`'admin'` or `'user'`); admin items are listed first.
 *
 * Returns `undefined` while either setting is loading. If the user setting cannot be retrieved, the
 * project-level items are returned tagged as `'admin'`.
 */
export function useEffectiveResourceReferenceList(
  projectId: string | undefined,
  settingName: 'platformScripture.modelTexts' | 'platformScripture.referencedProjectsAndResources',
): [EffectiveResourceReferenceList | undefined, boolean] {
  const [projectResourceReferenceList, isProjectSettingLoading] = useBufferedProjectSetting(
    projectId,
    settingName,
    DEFAULT_LIST,
  );

  const userPdp = useProjectDataProvider('platformScripture.textConnectionSettings', projectId);

  const [userResourceReferenceList, setUserResourceReferenceList] = useState<
    ResourceReferenceList | undefined
  >(undefined);

  useEffect(() => {
    if (!userPdp) {
      setUserResourceReferenceList(undefined);
      return;
    }

    let disposed = false;
    let unsubscribe: (() => Promise<boolean>) | undefined;

    const subscribeMethod =
      settingName === 'platformScripture.modelTexts'
        ? 'subscribeUserModelTexts'
        : 'subscribeUserReferencedProjectsAndResources';

    const subscribePromise = userPdp[subscribeMethod](undefined, (value) => {
      setUserResourceReferenceList(isPlatformError(value) ? DEFAULT_LIST : value);
    });

    subscribePromise
      .then((unsub) => {
        if (disposed) {
          unsub();
        } else {
          unsubscribe = unsub;
        }
        return undefined;
      })
      .catch((err) => {
        console.error(`Failed to subscribe to user text connection settings: ${err}`);
      });

    return () => {
      disposed = true;
      unsubscribe?.();
    };
  }, [userPdp, settingName]);

  return [
    useMemo(() => {
      if (isProjectSettingLoading) return undefined;
      if (isPlatformError(projectResourceReferenceList)) return undefined;
      if (userResourceReferenceList === undefined) return undefined;

      return mergeResourceReferenceLists(projectResourceReferenceList, userResourceReferenceList);
    }, [isProjectSettingLoading, projectResourceReferenceList, userResourceReferenceList]),
    isProjectSettingLoading,
  ];
}

export default useEffectiveResourceReferenceList;
