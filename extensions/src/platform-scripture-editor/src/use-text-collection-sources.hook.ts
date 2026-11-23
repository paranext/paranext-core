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
 * Unsubscribes, warning rather than throwing if that fails. It rejects when the provider the
 * subscription belongs to is already disposed, which a project switch routinely causes.
 */
function unsubscribeAndWarn(unsubscribe: () => Promise<boolean>, subscriptionName: string) {
  unsubscribe().catch((err) =>
    logger.warn(`Failed to unsubscribe from ${subscriptionName}: ${getErrorMessage(err)}`),
  );
}

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
  // project's provider and no way to tell. `ready` is the only status that may be acted on.
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
  // A user-layer subscribe that rejected will never deliver, so `sources` can never assemble.
  // Reported as a settings error rather than filled with a default: a default user list would let
  // the grid treat the user's resources as removed, prune them from the saved order, and save that.
  const [hasSubscribeError, setHasSubscribeError] = useState(false);

  useEffect(() => {
    // Clear whenever the provider changes, not only when there is none: nothing the previous
    // provider's subscriptions delivered is known to describe what the new one serves (for instance
    // a replacement registered after the previous provider was disposed).
    setUserReferenced(undefined);
    setOverlay(undefined);
    setOrder(undefined);
    setHasSubscribeError(false);

    if (!textConnectionPdp) return undefined;

    let disposed = false;
    let hasReceivedOrder = false;
    const unsubscribers: Array<() => Promise<boolean>> = [];

    // `isRequired`: `sources` cannot assemble without this subscription, so its failure must be
    // reported, or View Options stays on "Loading" for something that is not coming.
    const track = (
      promise: Promise<() => Promise<boolean>>,
      label: string,
      isRequired: boolean,
    ) => {
      promise
        .then((unsub) => {
          if (disposed) {
            // Cleanup has already run. Not returned into this chain, so a failed unsubscribe is
            // never reported by the `.catch` below as a failed subscribe.
            unsubscribeAndWarn(unsub, label);
            return undefined;
          }
          unsubscribers.push(unsub);
          return undefined;
        })
        .catch((err) => {
          logger.warn(`Failed to subscribe to ${label}: ${getErrorMessage(err)}`);
          if (isRequired && !disposed) setHasSubscribeError(true);
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
      true,
    );
    track(
      textConnectionPdp.subscribeTextCollectionOverlay(undefined, (value) => {
        if (disposed) return;
        setOverlay(isPlatformError(value) ? DEFAULT_OVERLAY : value);
      }),
      'text-collection overlay',
      true,
    );
    track(
      textConnectionPdp.subscribeCellOrder(undefined, (value) => {
        if (disposed) return;
        // An unreadable order never becomes `[]`: treating "could not read" as "empty" is what
        // would let a reorder erase the saved slots. So a failed read keeps whatever order this
        // project last delivered, and leaves the order pending only if none has arrived yet.
        if (isPlatformError(value)) {
          logger.warn(
            hasReceivedOrder
              ? 'Could not read the saved cell order; keeping the last order received.'
              : 'Could not read the saved cell order; reordering stays disabled until it can be read.',
          );
          return;
        }
        // `undefined` is a valid delivery and leaves the order pending, so it does not count as
        // received.
        hasReceivedOrder = value !== undefined;
        setOrder(value);
      }),
      'cell order',
      // Not required: `sources` assembles without it, and an order that never arrives stays
      // pending, which withholds reordering rather than writing from an order nobody has read.
      false,
    );

    return () => {
      disposed = true;
      unsubscribers.forEach((unsub) => unsubscribeAndWarn(unsub, 'text connection settings'));
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
    hasSettingsError:
      !!adminReferencedError || isPlatformError(adminReferenced) || hasSubscribeError,
  };
}

export default useTextCollectionSources;
