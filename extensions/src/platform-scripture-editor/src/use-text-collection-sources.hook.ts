import { useEffect, useMemo, useState } from 'react';
import { logger } from '@papi/frontend';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import type { ResourceReferenceList, TextCollectionOverlay } from 'platform-scripture';
import { useProjectDataProvider } from '@papi/frontend/react';
import type { TextCollectionSources } from './scripture-text-grid-contents.utils';
import { DEFAULT_RESOURCE_REFERENCE_LIST as DEFAULT_LIST } from './resource-reference-list.const';
import { useBufferedLayoutSetting } from './use-buffered-layout-setting.hook';

/** A user with no recorded checkbox interactions has an empty overlay. */
const DEFAULT_OVERLAY: TextCollectionOverlay = {};

/** A user with no saved cell order has an empty order. */
const DEFAULT_ORDER: string[] = [];

/**
 * Assembles the four data sources the View Options helpers read — the admin project-scope
 * `referencedProjectsAndResources` list, the per-user list, the per-user text-collection overlay,
 * and the per-user cell order — into a single {@link TextCollectionSources} object, and returns the
 * `platformScripture.textConnectionSettings` data provider so callers can persist mutations via its
 * `setUserReferencedProjectsAndResources` / `setTextCollectionOverlay` / `setCellOrder` setters.
 *
 * Model texts are decoupled from the text-collection feature (they carry no admin flag and the
 * overlay is initialized only from the referenced list), so they are not read here. The View
 * Options panel reads the admin list but never writes it (admin sharing lives in a separate
 * dialog). `sources` is `undefined` while any source is still loading.
 */
export function useTextCollectionSources(projectId: string | undefined) {
  // Buffered (not raw `useProjectSetting`) so a manual-sync change to the admin layout is held
  // in memory until the member applies it, matching the resource/model-text panels. The per-user
  // list and the text-collection overlay below stay live (unbuffered).
  const [adminReferenced, isReferencedLoading, adminReferencedError] = useBufferedLayoutSetting(
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
  const [overlay, setOverlay] = useState<TextCollectionOverlay | undefined>(undefined);
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);

  useEffect(() => {
    if (!textConnectionPdp) {
      setUserReferenced(undefined);
      setOverlay(undefined);
      setOrder(DEFAULT_ORDER);
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
      textConnectionPdp.subscribeTextCollectionOverlay(undefined, (value) => {
        setOverlay(isPlatformError(value) ? DEFAULT_OVERLAY : value);
      }),
      'text-collection overlay',
    );
    track(
      textConnectionPdp.subscribeCellOrder(undefined, (value) => {
        setOrder(isPlatformError(value) ? DEFAULT_ORDER : value);
      }),
      'cell order',
    );

    return () => {
      disposed = true;
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [textConnectionPdp]);

  const sources = useMemo<TextCollectionSources | undefined>(() => {
    if (isReferencedLoading) return undefined;

    // Both channels must be checked. `useBufferedLayoutSetting` does not apply a PlatformError to
    // the held copy (it stays armed so a transient failure self-heals), so once past the initial
    // loading window the held value is the placeholder and only `adminReferencedError` reports the
    // failure. Trusting the held value alone would assemble sources from an empty admin list and
    // show the grid "nothing configured" for a setting we simply could not read.
    if (adminReferencedError || isPlatformError(adminReferenced)) return undefined;

    if (userReferenced === undefined || overlay === undefined) return undefined;

    return { adminReferenced, userReferenced, overlay, order };
  }, [isReferencedLoading, adminReferencedError, adminReferenced, userReferenced, overlay, order]);

  return { sources, textConnectionPdp };
}

export default useTextCollectionSources;
