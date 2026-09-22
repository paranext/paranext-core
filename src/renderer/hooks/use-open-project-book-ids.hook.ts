import {
  getAllOpenWebViewDefinitionsSync,
  onDidCloseWebView,
  onDidOpenWebView,
  onDidUpdateWebView,
} from '@renderer/services/web-view.service-shard';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { logger } from '@shared/services/logger.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { useEvent } from 'platform-bible-react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import type { UnsubscriberAsync } from 'platform-bible-utils';
import type { ProjectDataProviderInterfaces } from 'papi-shared-types';
import {
  getBookIdsFromBooksPresent,
  isNavigableProjectIds,
  NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
} from 'platform-bible-utils/experimental';
import { Canon } from '@sillsdev/scripture';
import { useDeferredDockLayoutRead } from '@renderer/hooks/use-deferred-dock-layout-read.hook';
import { useCallback, useEffect, useMemo, useState } from 'react';

/** Canon order for the returned union, so consumers can group by section without re-sorting. */
const CANON_BOOK_IDS = Canon.allBookIds;

const EMPTY_IDS: string[] = [];

/**
 * Joins the open project ids into one comparable key. NUL, so no pair of distinct id sets can
 * collide into the same key — a space would let {'A B'} and {'A', 'B'} agree.
 */
const SEPARATOR = '\u0000';

type BaseProjectDataProvider =
  ProjectDataProviderInterfaces[typeof PROJECT_INTERFACE_PLATFORM_BASE];

/**
 * How long a project whose provider could not be reached is left alone before it is looked up
 * again. The retry is timer-driven: it fires whether or not the project leaves and rejoins the open
 * set, so a project that stays open through a slow startup is still picked up. Long enough that an
 * id flapping many times a second costs one fan-out per window rather than one per flap; short
 * enough that a project a factory begins serving later in the session (a slow startup, a resource
 * installed mid-session, an extension host restart) is picked up without reloading the window. The
 * same delay applies whatever the failure was: the lookup service cannot tell "no such project"
 * from "no factory has answered yet" reliably enough to treat them apart.
 */
export const FAILED_PROVIDER_LOOKUP_RETRY_MS = 30_000;

/**
 * A cached provider lookup, and when (if ever) it failed so the retry can be timed from the first
 * failure. Cleared again by a later successful subscribe: a provider that works is not discarded.
 */
type ProviderCacheEntry = {
  provider: Promise<BaseProjectDataProvider | undefined>;
  failedAt: number | undefined;
};

/** The books a project reports, handed back to the hook by {@link subscribeToBooksPresent}. */
type ReportBooks = (projectId: string, bookIds: string[]) => void;

/**
 * One project's live `booksPresent` subscription, from the moment its id joins the open set until
 * it leaves. `dispose` is safe at any stage: before the provider resolves, before the subscription
 * settles, or after it is live.
 */
type BooksPresentSubscription = {
  isDisposed: boolean;
  unsubscribe: UnsubscriberAsync | undefined;
  /** A retry waiting to run after a failure; cleared by `dispose`. */
  retryTimer: ReturnType<typeof setTimeout> | undefined;
  dispose: () => void;
};

/**
 * What one project's subscription needs from the hook that hosts it: the two per-hook maps and the
 * way to report books into the hook's state. Built once per hook instance; nothing here changes
 * identity for the life of the hook.
 */
type BooksPresentHost = {
  providers: Map<string, ProviderCacheEntry>;
  subscriptions: Map<string, BooksPresentSubscription>;
  reportBooks: ReportBooks;
};

/**
 * Project ids reachable from this window's open web views: each view's own `projectId`, plus any it
 * declares under {@link NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY} (how a view that hosts several
 * projects at once, like the Scripture Text Grid, makes its members visible from outside).
 *
 * Every project-scoped web view counts, not only the ones that display scripture — a project
 * settings tab or a checks view widens the list the same way an editor does. A project the user has
 * open anywhere in the window is one they are working with, and the books it reports are the same
 * books either way.
 *
 * The navigation target's own project is NOT excluded here, and must not be. Subtracting it would
 * make this set — and the subscription fingerprint derived from it — change every time the resolved
 * navigation target changes, including the brief `undefined` a dock rebuild produces while the
 * editor slot has no project yet. In Simple mode every open panel carries the same project id, so
 * such a set swings between "one project" and "none" on each navigation, and every subscription is
 * torn down and rebuilt at that cadence. The active project is filtered out at READ time instead,
 * where changing its mind costs nothing.
 */
function getOpenProjectIds(): string[] {
  let definitions;
  try {
    definitions = getAllOpenWebViewDefinitionsSync();
  } catch (e) {
    // Loud rather than quiet: this read runs deferred, after the dock has adopted its new layout
    // (see `useDeferredDockLayoutRead`), so by this point this window's dock layout is registered.
    // A throw here means it never was, which is an anomaly worth finding in a log rather than the
    // ordinary timing of a first render.
    logger.warn(`Open project books could not enumerate open web views: ${getErrorMessage(e)}`);
    return EMPTY_IDS;
  }

  const projectIds = new Set<string>();
  definitions.forEach((definition) => {
    if (definition.projectId) projectIds.add(definition.projectId);
    const declared = definition.state?.[NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY];
    // Web view state is written by whoever owns the view and survives into saved layouts, so it is
    // untrusted input rather than a known shape.
    if (isNavigableProjectIds(declared))
      declared.forEach((projectId) => {
        if (projectId) projectIds.add(projectId);
      });
  });
  return [...projectIds];
}

/**
 * The `platform.base` provider for `projectId`, looked up at most once per hook instance while the
 * answer holds. The cache holds the promise, not the value, so concurrent joins of one id share a
 * single lookup (see the hook body for why a repeat lookup is so expensive). A lookup that failed,
 * or whose provider later failed to subscribe (see {@link markProviderFailed}), is kept for
 * {@link FAILED_PROVIDER_LOOKUP_RETRY_MS} and then looked up afresh on the next attempt, which the
 * retry timer makes whether or not the project leaves and rejoins the set.
 */
function getBaseProjectDataProvider(
  cache: Map<string, ProviderCacheEntry>,
  projectId: string,
): ProviderCacheEntry {
  const cached = cache.get(projectId);
  if (cached && !hasRetryDelayPassed(cached)) return cached;
  const entry: ProviderCacheEntry = { provider: Promise.resolve(undefined), failedAt: undefined };
  entry.provider = lookUpBaseProjectDataProvider(projectId, () => markProviderFailed(entry));
  cache.set(projectId, entry);
  return entry;
}

function hasRetryDelayPassed(entry: ProviderCacheEntry): boolean {
  return entry.failedAt !== undefined && remainingRetryDelayMs(entry) === 0;
}

/**
 * How much of the retry delay is left for a failed entry; 0 for one that has not failed. Clamped to
 * the delay on both sides: the stamp is wall-clock time, so a clock that steps backwards between
 * the failure and this read must not arm a retry for longer than one delay.
 */
function remainingRetryDelayMs(entry: ProviderCacheEntry): number {
  if (entry.failedAt === undefined) return 0;
  const remaining = FAILED_PROVIDER_LOOKUP_RETRY_MS - (Date.now() - entry.failedAt);
  return Math.min(FAILED_PROVIDER_LOOKUP_RETRY_MS, Math.max(0, remaining));
}

/**
 * Records that a cached provider is not usable — its lookup failed, or it was reached but could not
 * be subscribed to (its network object may have been disposed since, as an extension host restart
 * does) — so the attempt after {@link FAILED_PROVIDER_LOOKUP_RETRY_MS} looks the project up again
 * instead of reusing the dead entry. Stamps the entry the failure belongs to, not whichever entry
 * the cache holds for the project by then: a late rejection from a superseded provider must not
 * mark its replacement.
 */
function markProviderFailed(entry: ProviderCacheEntry): void {
  // Timed from the FIRST failure. A dead provider fails again on every rejoin inside the delay,
  // and restamping it each time would let a flapping id push its own retry out for ever.
  if (entry.failedAt === undefined) entry.failedAt = Date.now();
}

/**
 * One uncached lookup; `undefined` when it yields no provider. Never rejects. Calls `onFailure`
 * before returning `undefined`, so the caller can time its retry from the failure.
 */
async function lookUpBaseProjectDataProvider(
  projectId: string,
  onFailure: () => void,
): Promise<BaseProjectDataProvider | undefined> {
  try {
    return await papiFrontendProjectDataProviderService.get(
      PROJECT_INTERFACE_PLATFORM_BASE,
      projectId,
    );
  } catch (e) {
    onFailure();
    logger.debug(
      `Open project books: could not look up a platform.base provider for ${projectId}: ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/**
 * Releases a live subscription, reporting rather than throwing. The unsubscriber is a round trip to
 * the provider, which may be gone by the time the project leaves; a rejection here must not become
 * an unhandled rejection in the renderer, and a `false` result (nothing was unsubscribed) is worth
 * a line in the log.
 */
async function releaseBooksPresentSubscription(
  subscription: BooksPresentSubscription,
  projectId: string,
): Promise<void> {
  const { unsubscribe } = subscription;
  if (!unsubscribe) return;
  subscription.unsubscribe = undefined;
  try {
    if (!(await unsubscribe()))
      logger.debug(`Open project books: booksPresent for ${projectId} did not unsubscribe`);
  } catch (e) {
    logger.debug(
      `Open project books: unsubscribing booksPresent for ${projectId} failed: ${getErrorMessage(e)}`,
    );
  }
}

/**
 * Opens `projectId`'s `booksPresent` subscription into `subscription`, honoring a `dispose` that
 * lands at any point along the way. Never rejects: a project whose provider or setting cannot be
 * reached contributes no books, says so at debug level, and is tried again after the retry delay
 * (see {@link scheduleBooksPresentRetry}).
 */
async function subscribeToBooksPresent(
  subscription: BooksPresentSubscription,
  projectId: string,
  host: BooksPresentHost,
): Promise<void> {
  const { providers, reportBooks } = host;
  const entry = getBaseProjectDataProvider(providers, projectId);
  try {
    const pdp = await entry.provider;
    if (subscription.isDisposed) return;
    if (!pdp) {
      // The lookup failed. Reporting no books matters when this is a rejoin after the delay: the
      // project's earlier list is still in state and would show again now that it is back in the
      // set, though it can no longer be trusted.
      handleBooksPresentFailure(subscription, projectId, host, entry);
      return;
    }
    const unsubscribe = await pdp.subscribeSetting('platformScripture.booksPresent', (value) => {
      // subscribeSetting invokes its callback with the current value as soon as it subscribes, so a
      // callback can still land around teardown; this skips the pointless state update.
      if (subscription.isDisposed) return;
      if (isPlatformError(value)) {
        logger.debug(
          `Open project books: ${projectId} reported an error for booksPresent: ${getErrorMessage(value)}`,
        );
        reportBooks(projectId, EMPTY_IDS);
        return;
      }
      reportBooks(projectId, getBookIdsFromBooksPresent(value));
    });
    subscription.unsubscribe = unsubscribe;
    // The provider works, whatever it did earlier: a stale stamp would discard it after the delay.
    entry.failedAt = undefined;
    // Disposed while the subscription was settling: release it now that it exists.
    if (subscription.isDisposed) await releaseBooksPresentSubscription(subscription, projectId);
  } catch (e) {
    // The provider was reached but its subscription failed. A provider without `booksPresent`
    // contributes nothing, which keeps this forward-compatible with resource providers that gain the
    // setting later; a provider whose network object is gone is retried after the delay like a
    // failed lookup. Either way the project cannot report its books right now.
    logger.debug(
      `Open project books: could not subscribe to booksPresent for ${projectId}: ${getErrorMessage(e)}`,
    );
    handleBooksPresentFailure(subscription, projectId, host, entry);
  }
}

/**
 * The shared tail of every failed attempt by a live subscription: the entry is stamped
 * (idempotently, so the retry is still timed from the first failure), the project stops
 * contributing books because it cannot report them, and a retry is armed. Stamping here rather than
 * trusting the lookup helper to have done it keeps "stamped before scheduled" a local invariant —
 * an unstamped entry would otherwise arm a zero-delay retry against the same cached answer.
 *
 * A disposed subscription's failure is ignored entirely, stamp included: its replacement may have
 * reused the same entry and subscribed fine in the meantime, and a late rejection from the
 * superseded attempt must not mark a provider that works. If the entry really is dead, the live
 * subscription's own attempt fails and stamps it.
 */
function handleBooksPresentFailure(
  subscription: BooksPresentSubscription,
  projectId: string,
  host: BooksPresentHost,
  entry: ProviderCacheEntry,
): void {
  if (subscription.isDisposed) return;
  markProviderFailed(entry);
  host.reportBooks(projectId, EMPTY_IDS);
  scheduleBooksPresentRetry(subscription, projectId, host, entry);
}

/** Cancels a pending retry, if any, and forgets it. */
function clearBooksPresentRetry(subscription: BooksPresentSubscription): void {
  if (subscription.retryTimer !== undefined) clearTimeout(subscription.retryTimer);
  subscription.retryTimer = undefined;
}

/**
 * Arms one retry for a subscription whose attempt failed, for whatever remains of the delay since
 * `entry`'s first failure, so a flapping id still costs one lookup per window. The timer belongs to
 * the subscription, so leaving the set (`dispose`) cancels it. The identity check against the
 * host's map is defense in depth: every removal from that map disposes first, so a stale timer is
 * already stopped by `isDisposed`; the check is kept so that a future removal path which forgets to
 * dispose cannot make a stale timer attempt on behalf of the subscription that replaced it.
 */
function scheduleBooksPresentRetry(
  subscription: BooksPresentSubscription,
  projectId: string,
  host: BooksPresentHost,
  entry: ProviderCacheEntry,
): void {
  if (subscription.isDisposed || host.subscriptions.get(projectId) !== subscription) return;
  clearBooksPresentRetry(subscription);
  subscription.retryTimer = setTimeout(() => {
    subscription.retryTimer = undefined;
    if (subscription.isDisposed || host.subscriptions.get(projectId) !== subscription) return;
    // Not awaited: the helper never rejects, and a failure re-arms this timer itself.
    subscribeToBooksPresent(subscription, projectId, host);
  }, remainingRetryDelayMs(entry));
}

/**
 * The open project ids as a single comparable value. Sorted, because set equality rather than order
 * is what matters.
 */
function readOpenProjectIdsKey(): string {
  return getOpenProjectIds().sort().join(SEPARATOR);
}

/**
 * The books present in every project open in this window OTHER than the active project — what the
 * global book/chapter/verse control offers beyond the active project's own books. Resources are
 * projects here, so they are included; so is any other project-scoped web view.
 *
 * The result is NOT filtered against the active project's books: this hook knows the other
 * projects' ids, not the active project's book list, and an open resource may well share books with
 * the project. Consumers subtract.
 *
 * A project that cannot report its books contributes nothing. It deliberately does not fall back to
 * the full canon the way navigation-command book lookup does — there, the fallback keeps navigation
 * permissive; here, it would advertise every book in the canon as reachable.
 *
 * The flow, so the stages below can be checked against a whole: a web view event requests a
 * DEFERRED read of the dock layout (deferred because the close event is emitted before the dock has
 * adopted the new layout) → the read lands in state as a membership KEY covering every open project
 * → a change in membership is diffed into per-project `booksPresent` subscriptions to open and to
 * close, with the projects that stayed left untouched → their values are unioned in canon order,
 * with the active project's books left out of the union during RENDER, so a prop change lands in
 * the same commit. Each stage has its own note where it is declared.
 *
 * @param activeProjectId The project whose books are already offered, excluded from the result. It
 *   may still be subscribed to — only the result excludes it (see {@link getOpenProjectIds}).
 * @param isEnabled Whether to do the work at all. When false the hook subscribes to nothing and
 *   returns an empty list, so a caller that discards the result pays none of its cost. Defaults to
 *   true.
 * @returns Book ids in canon order, deduplicated across projects
 */
export function useOpenProjectBookIds(
  activeProjectId: string | undefined,
  isEnabled: boolean = true,
): string[] {
  // The membership fingerprint is held IN STATE rather than derived from a refresh counter. A web
  // view event that leaves the set of open projects unchanged produces the same string, and
  // `useState` bails out on an unchanged value — so the burst of web view events a project switch
  // fires cannot re-render this hook's consumer. A counter would re-render on every event by
  // construction, because its value changes even when nothing it is standing in for did.
  //
  // The key covers EVERY open project, with the active one still in it. Deriving the exclusion here
  // would put a value that changes with a prop behind a read that only web view events trigger, so
  // an `activeProjectId` change would not reach the returned list until a commit later — one
  // committed frame in which the newly active project's own books are offered as "books outside
  // this project", the exact set this hook exists to exclude. The exclusion is applied during
  // render instead, where the books are unioned below.
  const [allOpenProjectIdsKey, setAllOpenProjectIdsKey] = useState('');
  const { requestRead: refreshOpenWebViews, cancelPendingRead } = useDeferredDockLayoutRead(
    useCallback(() => setAllOpenProjectIdsKey(readOpenProjectIdsKey()), []),
  );

  // Undefined while disabled: `useEvent` subscribes to nothing when its event is undefined, so a
  // disabled hook does not even listen for the web view changes it would have reacted to.
  useEvent(isEnabled ? onDidOpenWebView : undefined, refreshOpenWebViews);
  useEvent(isEnabled ? onDidUpdateWebView : undefined, refreshOpenWebViews);
  useEvent(isEnabled ? onDidCloseWebView : undefined, refreshOpenWebViews);

  // The first read. Declared AFTER the `useEvent` calls so it is requested once the subscriptions
  // are attached and an event fired in the gap cannot be missed. There is no read during render:
  // enumerating open web views deliberately touches the WebViewState keep-alive set, which a
  // discarded or double-invoked render must not do, and by the time this deferred read runs this
  // window's dock layout has registered — which on a first render it typically has not. This is a
  // fast path, not a synchronization point: if the layout registers later still, correctness comes
  // from the open event above, at the cost of reporting no open projects for an extra render.
  //
  // Re-requested when `isEnabled` turns on, since nothing was listening while it was off. Turning
  // off drops the key so re-enabling cannot briefly report a set that went stale while disabled —
  // which is why it must also revoke a read requested while still enabled. That read would
  // otherwise run after the key was cleared and repopulate it, and with the subscriptions already
  // gone nothing would ever correct it.
  useEffect(() => {
    if (isEnabled) refreshOpenWebViews();
    else {
      cancelPendingRead();
      setAllOpenProjectIdsKey('');
    }
  }, [isEnabled, refreshOpenWebViews, cancelPendingRead]);

  // The set to subscribe to: every open project, the active one included. Identity tracks
  // membership rather than event count — the memo's inputs are the key and `isEnabled`, neither of
  // which a no-op web view event or a change of navigation target moves — so the subscription
  // effect, the returned book list, and the consumers that memoize on it all stay stable across an
  // unchanged set. The empty key must short-circuit: splitting it yields `['']`, not `[]`.
  const openProjectIds = useMemo(() => {
    if (!isEnabled) return EMPTY_IDS;
    return allOpenProjectIdsKey ? allOpenProjectIdsKey.split(SEPARATOR) : EMPTY_IDS;
  }, [allOpenProjectIdsKey, isEnabled]);

  // Entries persist for projects that have since closed rather than being pruned as each project
  // closes; the final useMemo below filters them out by membership at read time. This is fine
  // because entries are small and the number of distinct projects a session opens is bounded, and
  // the map is cleared in full once the open set becomes empty.
  const [bookIdsByProjectId, setBookIdsByProjectId] = useState<Record<string, string[]>>({});

  // Both maps live for the life of the hook, not of one membership: a membership change is acted on
  // as a DIFF (subscribe the ids that joined, unsubscribe the ids that left) and never touches the
  // projects that stayed. Every data provider lookup runs a project-metadata query that fans out to
  // every PDP factory in every process, and the layering factories in the extension host fan out
  // again to the C# factories — so resolving a provider again for a project that merely stayed open,
  // or for one that leaves and rejoins, is what turns a flapping membership (a panel republishing
  // its navigable project ids in a loop) into a request storm that starves the backends.
  //
  // A resolved provider is kept per project id for as long as the hook lives. A failed one is kept
  // for `FAILED_PROVIDER_LOOKUP_RETRY_MS` and then looked up afresh by a timer the failed
  // subscription arms for itself, whether or not the project leaves the set — so a flapping id costs
  // one fan-out per window while a project a factory starts serving later is still picked up. See
  // `getBaseProjectDataProvider` and `scheduleBooksPresentRetry`. Both maps are bounded by the
  // number of distinct projects a session opens, like `bookIdsByProjectId` above.
  //
  // Built once through a state initializer, so the maps are not constructed and discarded on
  // every render as `useRef(new Map())` would, and the whole bundle keeps one identity for the
  // life of the hook. The state is never set; only the maps' contents change. `reportBooks` closes
  // over the stable state setter, so a subscription opened under one render reports into the same
  // state as one opened under a later render.
  const [host] = useState<BooksPresentHost>(() => ({
    providers: new Map<string, ProviderCacheEntry>(),
    subscriptions: new Map<string, BooksPresentSubscription>(),
    reportBooks: (projectId, bookIds) => {
      // Same list again (a project that keeps failing reports the shared empty list once per retry
      // for as long as it stays open): keep the previous state so nothing downstream re-renders.
      setBookIdsByProjectId((previous) =>
        previous[projectId] === bookIds ? previous : { ...previous, [projectId]: bookIds },
      );
    },
  }));

  useEffect(() => {
    const projectIds = openProjectIds;
    const { subscriptions } = host;

    subscriptions.forEach((subscription, projectId) => {
      if (projectIds.includes(projectId)) return;
      subscription.dispose();
      subscriptions.delete(projectId);
    });

    if (projectIds.length === 0) {
      setBookIdsByProjectId({});
      return;
    }

    projectIds.forEach((projectId) => {
      if (subscriptions.has(projectId)) return;

      const subscription: BooksPresentSubscription = {
        isDisposed: false,
        unsubscribe: undefined,
        retryTimer: undefined,
        dispose: () => {
          subscription.isDisposed = true;
          clearBooksPresentRetry(subscription);
          // Not awaited: releasing is a network round trip the effect must not wait on, and the
          // helper never rejects. A subscription still settling is released the moment it lands, in
          // subscribeToBooksPresent.
          releaseBooksPresentSubscription(subscription, projectId);
        },
      };
      subscriptions.set(projectId, subscription);
      // Not awaited: the effect must not wait on network round trips, and the helper never rejects.
      subscribeToBooksPresent(subscription, projectId, host);
    });
    // `openProjectIds` is membership-stable (see its definition), so an unrelated web view event
    // cannot reach the diff above at all. `host` never changes identity.
  }, [openProjectIds, host]);

  // Unmount tears down whatever is still subscribed. The membership effect above deliberately
  // returns no cleanup: React runs an effect's cleanup before every re-run, which is exactly the
  // tear-down-everything-on-every-change this hook must not do.
  useEffect(
    () => () => {
      host.subscriptions.forEach((subscription) => subscription.dispose());
      host.subscriptions.clear();
    },
    // Never changes identity, so this cleanup runs on unmount only.
    [host],
  );

  return useMemo(() => {
    const openIds = new Set(openProjectIds);
    const books = new Set<string>();
    Object.entries(bookIdsByProjectId).forEach(([projectId, bookIds]) => {
      // A project that has since closed may still have an entry from a settled subscription.
      if (!openIds.has(projectId)) return;
      // The navigation target's books are the control's baseline, so this hook never offers them.
      // Filtered here rather than out of the subscribed set — see `getOpenProjectIds` for why.
      //
      // While `activeProjectId` is `undefined` nothing matches, so through the brief gap a dock
      // rebuild produces this deliberately offers the navigation target's own books, and a caller's
      // "show more books" affordance may appear for that gap. Tolerated rather than guarded: holding
      // the last non-`undefined` target in a ref would also suppress those books when `undefined` is
      // the settled answer — no editor open, so the project really is just another open project —
      // and that failure is silent and persistent, where this one is visible and sub-frame.
      if (projectId === activeProjectId) return;
      bookIds.forEach((bookId) => books.add(bookId));
    });
    if (books.size === 0) return EMPTY_IDS;
    return CANON_BOOK_IDS.filter((bookId) => books.has(bookId));
  }, [bookIdsByProjectId, openProjectIds, activeProjectId]);
}

export default useOpenProjectBookIds;
