import { useEffect, useMemo, useState } from 'react';
import { logger } from '@papi/frontend';
import { isPlatformError } from 'platform-bible-utils';
import type {
  EffectiveResourceReference,
  EffectiveResourceReferenceList,
  ResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';
import { logger } from '@papi/frontend';
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
  logger.error(`Resource reference of type '${item.type}' has no string name; discarding.`);
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
    // These lists come from a project file that reaches us via send/receive without passing through
    // `resourceReferenceListValidator`, which runs on write only. A malformed `items` would throw
    // inside the memo and unmount the panel with no error boundary.
    if (!Array.isArray(items)) {
      logger.warn('Resource reference list has a non-array `items` field; treating it as empty.');
      return;
    }

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
  | { status: 'error' }
  | { status: 'ready'; list: EffectiveResourceReferenceList };

/**
 * Returns the effective resource reference list for a setting: the set-union of project-level
 * (admin) and user-specific items, deduplicated by `id` (for ProjectReference and
 * DblResourceReference) or `name` (for all other reference types). Each item carries a runtime
 * `source` tag (`'admin'` or `'user'`); admin items are listed first.
 *
 * Reports `loading` until _both_ the project-level setting and the user-level subscription have
 * delivered. If the user setting cannot be retrieved — whether a {@link PlatformError} arrives
 * through the callback or the `subscribe` call itself rejects — the project-level items are
 * returned tagged as `'admin'` rather than leaving the panel waiting.
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

  useEffect(() => {
    if (!userPdp) {
      // No PDP available for this project — treat as empty user list so callers don't wait forever.
      setUserResourceReferenceList(DEFAULT_LIST);
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
        logger.error(`Failed to subscribe to user text connection settings: ${err}`);
        // Fall back to the default list so callers don't spin on an undefined result forever.
        if (!disposed) setUserResourceReferenceList(DEFAULT_LIST);
      });

    return () => {
      disposed = true;
      unsubscribe?.();
    };
  }, [userPdp, settingName]);

  const value = useMemo(() => {
    if (isProjectSettingLoading) return undefined;
    if (isPlatformError(projectResourceReferenceList)) return undefined;
    if (userResourceReferenceList === undefined) return undefined;

    return mergeResourceReferenceLists(projectResourceReferenceList, userResourceReferenceList);
  }, [isProjectSettingLoading, projectResourceReferenceList, userResourceReferenceList]);

  return [value, isProjectSettingLoading || value === undefined];
}

export default useEffectiveResourceReferenceList;
