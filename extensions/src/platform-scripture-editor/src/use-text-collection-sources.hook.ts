import { useEffect, useMemo, useState } from 'react';
import { logger } from '@papi/frontend';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import type { ResourceReferenceList, ShownByDefaultOverlay } from 'platform-scripture';
import { useProjectDataProvider, useProjectSetting } from '@papi/frontend/react';
import type { TextCollectionSources } from './scripture-text-grid-contents.utils';
import { DEFAULT_RESOURCE_REFERENCE_LIST as DEFAULT_LIST } from './resource-reference-list.const';

/** A user with no recorded checkbox interactions has an empty overlay. */
const DEFAULT_OVERLAY: ShownByDefaultOverlay = {};

/**
 * Assembles the four data sources the View Options helpers read — the two admin project-scope lists
 * (`modelTexts`, `referencedProjectsAndResources`), the per-user list, and the per-user
 * shown-by-default overlay — into a single {@link TextCollectionSources} object, and returns the
 * `platformScripture.textConnectionSettings` data provider so callers can persist mutations via its
 * `setUserReferencedProjectsAndResources` / `setShownByDefaultOverlay` setters.
 *
 * The View Options panel reads the admin lists but never writes them (admin sharing lives in a
 * separate dialog); the auto-promote on admin writes runs server-side regardless. `sources` is
 * `undefined` while any source is still loading.
 */
export function useTextCollectionSources(projectId: string | undefined) {
  const [adminModelTexts, , , isModelTextsLoading] = useProjectSetting(
    projectId,
    'platformScripture.modelTexts',
    DEFAULT_LIST,
  );
  const [adminReferenced, , , isReferencedLoading] = useProjectSetting(
    projectId,
    'platformScripture.referencedProjectsAndResources',
    DEFAULT_LIST,
  );

  const textConnectionPdp = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

  const [userReferenced, setUserReferenced] = useState<ResourceReferenceList | undefined>(
    undefined,
  );
  const [overlay, setOverlay] = useState<ShownByDefaultOverlay | undefined>(undefined);

  useEffect(() => {
    if (!textConnectionPdp) {
      setUserReferenced(undefined);
      setOverlay(undefined);
      return undefined;
    }

    let disposed = false;
    const unsubscribers: Array<() => Promise<boolean>> = [];

    const track = (promise: Promise<() => Promise<boolean>>, label: string) => {
      promise
        .then((unsub) => {
          if (disposed) unsub();
          else unsubscribers.push(unsub);
          return undefined;
        })
        .catch((err) => {
          logger.warn(`Failed to subscribe to ${label}: ${getErrorMessage(err)}`);
        });
    };

    track(
      textConnectionPdp.subscribeUserReferencedProjectsAndResources(undefined, (value) => {
        setUserReferenced(isPlatformError(value) ? DEFAULT_LIST : value);
      }),
      'user referenced projects and resources',
    );
    track(
      textConnectionPdp.subscribeShownByDefaultOverlay(undefined, (value) => {
        setOverlay(isPlatformError(value) ? DEFAULT_OVERLAY : value);
      }),
      'shown-by-default overlay',
    );

    return () => {
      disposed = true;
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [textConnectionPdp]);

  const isLoading =
    isModelTextsLoading ||
    isReferencedLoading ||
    userReferenced === undefined ||
    overlay === undefined;

  const sources = useMemo<TextCollectionSources | undefined>(() => {
    if (isModelTextsLoading || isReferencedLoading) return undefined;
    if (isPlatformError(adminModelTexts) || isPlatformError(adminReferenced)) return undefined;
    if (userReferenced === undefined || overlay === undefined) return undefined;
    return { adminModelTexts, adminReferenced, userReferenced, overlay };
  }, [
    isModelTextsLoading,
    isReferencedLoading,
    adminModelTexts,
    adminReferenced,
    userReferenced,
    overlay,
  ]);

  return { sources, isLoading, textConnectionPdp };
}

export default useTextCollectionSources;
