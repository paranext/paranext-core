import { useEffect, useMemo, useState } from 'react';
import { logger } from '@papi/frontend';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import type { ResourceReferenceList, TextCollectionOverlay } from 'platform-scripture';
import { useProjectDataProviderState } from '@papi/frontend/react';
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

  // The STATE hook, not the plain one: the plain one answers a project change with the previous
  // project's provider and no way to tell, which is how one project's settings came to be read —
  // and written — under another's. `ready` is the only status that may be acted on.
  const textConnectionState = useProjectDataProviderState(
    'platformScripture.textConnectionSettings',
    projectId,
  );
  const textConnectionPdp =
    textConnectionState.status === 'ready' ? textConnectionState.networkObject : undefined;

  const [userReferenced, setUserReferenced] = useState<ResourceReferenceList | undefined>(
    undefined,
  );
  const [overlay, setOverlay] = useState<TextCollectionOverlay | undefined>(undefined);
  // `string[] | undefined` so "nothing has arrived for this project" is distinguishable from a
  // genuinely empty saved order — `[]` cannot serve as both. A caller that persists an order must
  // wait for the real one, or it writes back only the resources currently shown and discards the
  // saved slot of every hidden one.
  const [order, setOrder] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    // Clear whenever the provider changes, not only when there is none: a different provider is a
    // different project, so nothing the previous subscriptions delivered describes what this hook
    // now reports on.
    setUserReferenced(undefined);
    setOverlay(undefined);
    setOrder(undefined);

    if (!textConnectionPdp) return undefined;

    let disposed = false;
    const unsubscribers: Array<() => Promise<boolean>> = [];

    const track = (promise: Promise<() => Promise<boolean>>, label: string) => {
      promise
        .then((unsub) => {
          // Rejects when the provider it belongs to is already disposed. Reaching this branch means
          // cleanup has already run, so that is the likely case rather than the exceptional one.
          if (disposed) return unsub().then(() => undefined);
          unsubscribers.push(unsub);
          return undefined;
        })
        .catch((err) => {
          logger.warn(`Failed to subscribe to ${label}: ${getErrorMessage(err)}`);
        });
    };

    track(
      textConnectionPdp.subscribeUserReferencedProjectsAndResources(undefined, (value) => {
        // Unsubscribing is an async round trip, so the outgoing project's subscriptions stay live
        // for a moment after cleanup. Without this fence a late delivery repopulates the state the
        // clear above just emptied, and the new project assembles around the old project's data.
        if (disposed) return;
        setUserReferenced(isPlatformError(value) ? DEFAULT_LIST : value);
      }),
      'user referenced projects and resources',
    );
    track(
      textConnectionPdp.subscribeTextCollectionOverlay(undefined, (value) => {
        if (disposed) return;
        setOverlay(isPlatformError(value) ? DEFAULT_OVERLAY : value);
      }),
      'text-collection overlay',
    );
    track(
      textConnectionPdp.subscribeCellOrder(undefined, (value) => {
        if (disposed) return;
        // An unreadable order stays pending rather than becoming `[]`: we do not know the saved
        // slots, and treating "could not read" as "empty" is what would let a reorder erase them.
        if (isPlatformError(value)) {
          logger.warn('Could not read the saved cell order; reordering will stay disabled.');
          setOrder(undefined);
          return;
        }
        setOrder(value);
      }),
      'cell order',
    );

    return () => {
      disposed = true;
      unsubscribers.forEach((unsub) =>
        // Rejects when the provider it belongs to is already disposed, which a project switch
        // routinely causes; unhandled without this.
        unsub().catch((err) =>
          logger.warn(
            `Failed to unsubscribe from text connection settings: ${getErrorMessage(err)}`,
          ),
        ),
      );
    };
  }, [textConnectionPdp]);

  const sources = useMemo<TextCollectionSources | undefined>(() => {
    // No provider means no project is resolved for this render, so nothing assembled here could
    // describe one.
    if (!textConnectionPdp || isReferencedLoading) return undefined;

    // Both channels must be checked. `useBufferedLayoutSetting` does not apply a PlatformError to
    // the held copy (it stays armed so a transient failure self-heals), so once past the initial
    // loading window the held value is the placeholder and only `adminReferencedError` reports the
    // failure. Trusting the held value alone would assemble sources from an empty admin list and
    // show the grid "nothing configured" for a setting we simply could not read.
    if (adminReferencedError || isPlatformError(adminReferenced)) return undefined;

    if (userReferenced === undefined || overlay === undefined) return undefined;

    // The empty stand-in lets the grid paint before the saved order arrives; `isOrderPending`
    // below is how a caller knows not to write from it.
    return { adminReferenced, userReferenced, overlay, order: order ?? DEFAULT_ORDER };
  }, [
    textConnectionPdp,
    isReferencedLoading,
    adminReferencedError,
    adminReferenced,
    userReferenced,
    overlay,
    order,
  ]);

  // `textConnectionState` is returned so a consumer can tell a transient window (keep showing what
  // it last rendered) from a project that has no settings provider at all (say so).
  // `isOrderPending` guards the write paths that would otherwise derive an order from the stand-in.
  return {
    sources,
    textConnectionPdp,
    textConnectionState,
    isOrderPending: order === undefined,
    // Surfaced because `sources` alone cannot distinguish "still arriving" from "cannot be read":
    // both leave it `undefined`, and reporting the second as the first is an unending spinner.
    hasSettingsError: !!adminReferencedError || isPlatformError(adminReferenced),
  };
}

export default useTextCollectionSources;
