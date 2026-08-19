import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useBufferedLayoutSetting } from './use-buffered-layout-setting.hook';

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
 * Readiness of the effective resource reference list.
 *
 * `ready` may carry zero items — that is the genuine "nothing is configured" state, and it is the
 * only state in which a panel may render its empty prompt. Any other status means the answer is not
 * known yet, so callers must branch on the status _before_ asking how many items there are.
 */
export type EffectiveResourceReferenceListState =
  | { status: 'loading' }
  | { status: 'error'; retry: () => void }
  | { status: 'ready'; list: EffectiveResourceReferenceList };

/**
 * Returns the effective resource reference list for a setting: the set-union of project-level
 * (admin) and user-specific items, deduplicated by `id` (for ProjectReference and
 * DblResourceReference) or `name` (for all other reference types). Each item carries a runtime
 * `source` tag (`'admin'` or `'user'`); admin items are listed first.
 *
 * Reports `loading` until _both_ the project-level setting and the user-level subscription have
 * delivered. If the user setting cannot be retrieved, the project-level items are returned tagged
 * as `'admin'`.
 */
export function useEffectiveResourceReferenceList(
  projectId: string | undefined,
  settingName: 'platformScripture.modelTexts' | 'platformScripture.referencedProjectsAndResources',
): EffectiveResourceReferenceListState {
  const [projectResourceReferenceList, isProjectSettingLoading, projectSettingError] =
    useBufferedLayoutSetting(projectId, settingName, DEFAULT_LIST);

  const userPdp = useProjectDataProvider('platformScripture.textConnectionSettings', projectId);

  const [userResourceReferenceList, setUserResourceReferenceList] = useState<
    ResourceReferenceList | undefined
  >(undefined);

  // Bumping this re-runs the subscription effect below. The project layer needs no equivalent: it
  // stays armed through a read error (see `useBufferedLayoutSetting`), so it self-heals as soon as
  // the setting becomes readable.
  const [retryEpoch, setRetryEpoch] = useState(0);
  const retry = useCallback(() => setRetryEpoch((epoch) => epoch + 1), []);

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
  }, [userPdp, settingName, retryEpoch]);

  return useMemo(() => {
    // Readiness must account for BOTH sources. The user layer needs `useProjectDataProvider` to
    // resolve, then an explicit subscribe, then a first delivery — strictly more hops than the
    // project setting — so "project setting resolved, user list still undefined" is the normal
    // window on essentially every mount, not a narrow race. Reporting that window as anything other
    // than `loading` is what let panels render a premature empty state.
    if (isProjectSettingLoading) return { status: 'loading' };
    // `projectSettingError` is the live read failure; `projectResourceReferenceList` is only itself
    // an error when the very first read failed. Both mean the same thing to a panel: the answer is
    // unknown, so it must not render either a spinner or an empty prompt.
    if (projectSettingError || isPlatformError(projectResourceReferenceList))
      return { status: 'error', retry };
    if (userResourceReferenceList === undefined) return { status: 'loading' };

    return {
      status: 'ready',
      list: mergeResourceReferenceLists(projectResourceReferenceList, userResourceReferenceList),
    };
  }, [
    isProjectSettingLoading,
    projectSettingError,
    projectResourceReferenceList,
    retry,
    userResourceReferenceList,
  ]);
}

export default useEffectiveResourceReferenceList;
