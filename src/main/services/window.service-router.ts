/**
 * Service router for the window service. Publishes a data provider under the generic
 * "platform.windowServiceDataProvider" name that forwards to the focused window's shard (e.g.
 * "platform.windowServiceDataProvider-1").
 *
 * Each renderer registers its window service shard under a window-scoped name so several windows
 * can coexist, which would otherwise leave the generic name — the one declared in `papi.d.ts` and
 * used by `useData('platform.windowServiceDataProvider', …)` — registered by nobody. This restores
 * it, matching what `web-view.service-router.ts` and `notification.service-router.ts` do for their
 * own services.
 *
 * The router/shard pattern does not depend on the transport: this one is a data provider on both
 * sides because the window service has subscription semantics, while the others are plain network
 * objects. See `.context/standards/Architecture.md` § "Service router and service shard".
 *
 * Unlike those routers, a data provider also has to keep subscribers current, which means
 * re-emitting updates from two sources: the window it currently routes to, and the routing target
 * moving to another window (which changes the answer without any window's data having changed).
 */

import { getTargetWindowId, onDidChangeRoutingTarget } from '@main/services/window-state.service';
import { createServiceShardIndex } from '@main/services/service-shard-index';
import { createTargetWindowShardResolver } from '@main/services/target-shard-resolver.util';
import { WINDOW_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import { DataProviderEngine, IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import {
  dataProviderService,
  getByType as getDataProviderByType,
} from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import {
  FocusSubject,
  IWindowService,
  SetFocusSpecifier,
  WindowDataTypes,
  windowServiceProviderName,
} from '@shared/services/window.service-model';
import { WindowServiceShard } from '@shared/models/window.service-shard.model';
import { getErrorMessage, Mutex, Unsubscriber, UnsubscriberAsync } from 'platform-bible-utils';

/**
 * Resolve the window service shard for a given window. Injected so the engine can be tested without
 * the Electron window plumbing that owns the real lookup.
 */
export type GetWindowService = (windowId: number) => Promise<IWindowService | undefined>;

/**
 * The window service shard each window registers, found by network object type and window attribute
 * rather than by rebuilding the window-scoped provider name the window registered under.
 *
 * These shards are data providers rather than plain network objects, which changes only how they
 * are resolved; they are discovered exactly like every other shard.
 */
const windowServiceShards = createServiceShardIndex<WindowServiceShard>({
  objectType: WINDOW_SERVICE_SHARD_OBJECT_TYPE,
  // What the index holds is the shard's network object id, which for a data provider already ends
  // in the suffix `getByType` would otherwise append (see `getDataProviderObjectId`)
  resolveShard: (networkObjectId) => getDataProviderByType<WindowServiceShard>(networkObjectId),
});

/**
 * Get the window service shard for a specific window, or `undefined` if that window has not
 * registered one.
 *
 * Deliberately a plain lookup rather than a caching layer, even though the main process's input
 * handlers call it on every keystroke and mouse press: the network object service already keeps
 * what it resolves, serializes concurrent lookups of the same id behind one lock, and drops what it
 * holds when the object is disposed or its window closes. A second cache of resolved providers
 * could only go stale, and a stale entry here answers for a window that has gone.
 *
 * @param windowId Platform id of the window whose shard to get
 */
export async function getWindowServiceShard(
  windowId: number,
): Promise<WindowServiceShard | undefined> {
  return windowServiceShards.getShard(windowId);
}

/**
 * Get the window service shard of the window the user is currently working in, along with that
 * window's id — throwing, with the reason, when no window can answer.
 *
 * This is how the main process's navigation commands ask a window what to act on. They act on the
 * answer afterwards, so they need the window that gave it; and an unreachable window has to reach
 * the caller as a failure rather than as a navigation that quietly did nothing.
 */
export const getTargetWindowServiceShard = createTargetWindowShardResolver(
  windowServiceProviderName,
  windowServiceShards,
);

/**
 * Fires with a window id when that window registers its window service shard.
 *
 * A window is tracked and takes OS focus the moment it is shown, but it cannot serve a routed call
 * until its renderer has registered. Its shard appearing is that signal.
 */
export const onDidRegisterWindowServiceShard = windowServiceShards.onDidAddShard;

/**
 * Windows that have already registered their window service shard.
 *
 * {@link onDidRegisterWindowServiceShard} has no replay, so anything that reacts to windows becoming
 * able to serve calls has to reconcile against this once when it subscribes. Without that, a window
 * that registered before the subscription is never marked ready and stays unroutable for the rest
 * of the session.
 */
export function getWindowIdsWithServiceShard(): number[] {
  return windowServiceShards.getShardWindowIds();
}

/**
 * Forwards to whichever window is currently the routing target.
 *
 * Holds no state of its own — every call re-resolves the target, so it follows focus without a
 * cache to invalidate. What it does own is the subscription bookkeeping needed to tell subscribers
 * that the answer changed.
 */
class FocusedWindowDataProviderEngine
  extends DataProviderEngine<WindowDataTypes>
  implements IDataProviderEngine<WindowDataTypes>
{
  /** Unsubscribes from the updates of the window we are currently relaying */
  #unsubscribeFromWindowUpdates: UnsubscriberAsync | undefined;

  /**
   * Shard we are currently relaying from.
   *
   * Compared by identity rather than by window ID: a renderer that reloads registers a brand new
   * provider under the same window ID, and the resolver's cache drops the old one on disposal, so
   * an ID match would leave the relay bound to a dead provider that can never emit again.
   */
  #relayedWindowShard: IWindowService | undefined;

  /**
   * Serializes relay re-points. Each one both reads and replaces the subscription bookkeeping — two
   * in flight together would each subscribe and only the last would be remembered, orphaning a live
   * subscription that no disposal can reach.
   */
  #relayMutex = new Mutex();

  /** Set by `dispose`, so a re-point that is mid-flight at that moment undoes itself */
  #isDisposed = false;

  #unsubscribeFromRoutingTargetChanges: Unsubscriber;

  /**
   * Resolves a window's shard. Held in a `#`-private field on purpose: `buildDataProvider`
   * classifies every visible function on an engine by prefix, so a normal `getWindowService`
   * property would be read as a getter for a `WindowService` data type with no matching setter, and
   * registration would fail the get/set matching check.
   */
  #resolveWindowService: GetWindowService;

  constructor(resolveWindowService: GetWindowService) {
    super();
    this.#resolveWindowService = resolveWindowService;

    // The routing target moving to another window changes what `getFocus` answers even though no
    // window's own focus changed, so it has to reach subscribers as an update in its own right.
    this.#unsubscribeFromRoutingTargetChanges = onDidChangeRoutingTarget(() => {
      this.#relayUpdatesFromTargetWindow().catch((e) =>
        logger.warn(`Window routing could not follow the routing target: ${getErrorMessage(e)}`),
      );
      // This runs inside a synchronous emit on the window `closed` path, where `PlatformEventEmitter`
      // does not isolate subscribers — letting a throw escape here would skip the rest of that
      // window's teardown, so a routing fault stays a routing fault
      try {
        this.notifyUpdate('Focus');
      } catch (e) {
        logger.warn(
          `Window routing could not notify subscribers of a routing target change: ${getErrorMessage(e)}`,
        );
      }
    });
  }

  // The shard emits its own update and the relay forwards it, so layering a second
  // automatic emit on top of this one would notify every subscriber twice for one change. Doing it
  // this way rather than returning a constant `false` keeps the shard's real answer —
  // which callers use to tell "focus moved" from "no such tab" — reaching the caller intact.
  @dataProviderService.decorators.doNotNotify
  async setFocus(
    selectorOrSpecifier: SetFocusSpecifier | undefined,
    specifierIfSelectorProvided?: SetFocusSpecifier,
  ): Promise<DataProviderUpdateInstructions<WindowDataTypes>> {
    const windowService = await this.#getTargetWindowService();
    const focusSpecifier = selectorOrSpecifier ?? specifierIfSelectorProvided;
    // Deselecting goes over as the one-argument form. Arguments cross the process boundary as JSON,
    // where an `undefined` in a non-trailing position becomes `null`, and the window service reads
    // "deselect" as a specifier that is strictly `undefined` — so the two-argument form would reach
    // it as a `null` it then tries to read a tab id off of.
    if (focusSpecifier === undefined) return windowService.setFocus(undefined);
    return windowService.setFocus(undefined, focusSpecifier);
  }

  async getFocus(): Promise<FocusSubject | undefined> {
    return (await this.#getTargetWindowService()).getFocus();
  }

  /** Drop both subscriptions. Called when the router's provider itself is disposed */
  async dispose(): Promise<boolean> {
    this.#isDisposed = true;
    this.#unsubscribeFromRoutingTargetChanges();
    // Queued behind a re-point already in flight rather than racing it; that re-point checks
    // `#isDisposed` after attaching and undoes itself, so nothing can be left subscribed to a
    // window once this resolves
    await this.#relayMutex.runExclusive(async () => {
      await this.#unsubscribeFromWindowUpdates?.();
      this.#unsubscribeFromWindowUpdates = undefined;
      this.#relayedWindowShard = undefined;
    });
    return true;
  }

  /**
   * Point the update relay at the target window, dropping the previous window's subscription.
   * Serialized behind any re-point already running, so concurrent callers queue instead of racing
   * each other into duplicate subscriptions.
   */
  async #relayUpdatesFromTargetWindow(): Promise<void> {
    await this.#relayMutex.runExclusive(() => this.#repointRelay());
  }

  /**
   * The body of a single re-point. Only ever runs one at a time — see
   * `#relayUpdatesFromTargetWindow`, which serializes calls to this. A window that has closed or
   * has not registered yet simply leaves the relay idle; the next routing target change or read
   * tries again.
   *
   * A window that is opened takes OS focus well before its renderer registers a shard, so the relay
   * stays on the window that can answer until the new one is ready. The routing target change that
   * readiness fires lands here and re-points, which is also what re-attaches the relay to a
   * renderer that reloaded: the target announcement repeats for the same window ID and the service
   * is resolved again, replacing the provider that died with the old page.
   */
  async #repointRelay(): Promise<void> {
    if (this.#isDisposed) return;

    const targetWindowId = getTargetWindowId();
    const windowService =
      targetWindowId === undefined ? undefined : await this.#resolveWindowService(targetWindowId);
    if (windowService === this.#relayedWindowShard) return;

    // Attach before detaching, so an update arriving in the newly targeted window during the
    // handover still reaches subscribers. A brief overlap costs at most one redundant notify, where
    // the reverse order drops the update entirely.
    const unsubscribeFromNewWindow = windowService
      ? await windowService.subscribeFocus(undefined, () => this.notifyUpdate('Focus'), {
          // The relay exists to forward later changes; a subscriber gets its initial value from its
          // own retrieval, so replaying it here would just emit a duplicate
          retrieveDataImmediately: false,
          // Forward every update the window reports, including one whose focus value matches what
          // this subscription saw last. Whether an update is worth passing on is each subscriber of
          // the generic name's judgment to make against its own last value — one that re-pointed
          // from another window holds a different one — and the default comparison here would make
          // it for them.
          whichUpdates: '*',
        })
      : undefined;

    const unsubscribeFromPreviousWindow = this.#unsubscribeFromWindowUpdates;
    // Committed only now that the new subscription exists. If the subscribe above threw, the
    // bookkeeping still points at the previous window, so the next attempt retries rather than
    // short-circuiting on a relay it does not actually hold.
    this.#relayedWindowShard = windowService;
    this.#unsubscribeFromWindowUpdates = unsubscribeFromNewWindow;
    // The window this re-point is leaving is often one that just closed, which rejects the
    // unsubscribe instead of answering it. That belongs to the window that is already gone: the
    // handover to the new window has succeeded by this point, so it is reported and swallowed rather
    // than thrown past the compensation below and out to callers as a failed re-point.
    try {
      await unsubscribeFromPreviousWindow?.();
    } catch (e) {
      logger.warn(
        `Window routing could not unsubscribe from the window it stopped relaying: ${getErrorMessage(e)}`,
      );
    }

    // Disposed while we were attaching: `dispose` has already run its own teardown, so undo ours
    if (this.#isDisposed) {
      this.#relayedWindowShard = undefined;
      this.#unsubscribeFromWindowUpdates = undefined;
      await unsubscribeFromNewWindow?.();
    }
  }

  /** Resolve the target window's service, or explain why there isn't one */
  async #getTargetWindowService(): Promise<IWindowService> {
    const targetWindowId = getTargetWindowId();
    if (targetWindowId === undefined)
      throw new Error('No windows available to route window service call');
    const windowService = await this.#resolveWindowService(targetWindowId);
    if (!windowService)
      throw new Error(
        `Window service for window ${targetWindowId} is not available. The renderer may not have started yet.`,
      );
    // Start relaying from this window if we aren't already — covers the case where the first call
    // arrives before any routing target change has happened. A relay this call could not set up
    // fails the call rather than being logged and dropped: the value would be correct at the moment
    // it was read and then silently stop tracking the window, and the caller is the only one
    // positioned to retry or degrade. The routing target change that follows is still the later
    // self-heal — `#repointRelay` commits its bookkeeping only after a subscribe succeeds, so that
    // re-point genuinely retries instead of short-circuiting on a relay it does not hold.
    await this.#relayUpdatesFromTargetWindow();
    return windowService;
  }
}

/**
 * Register the window service router under the generic name so it claims the name before any
 * renderer starts. Must be called during main process startup, before createWindow().
 *
 * The engine resolves shards through this module's own index. It takes a resolver rather than
 * reaching for that index itself only so a test can stand it up without the Electron window
 * plumbing — see {@link testingWindowServiceRouter}.
 */
export async function startWindowServiceRouter(): Promise<void> {
  await dataProviderService.registerEngine(
    windowServiceProviderName,
    new FocusedWindowDataProviderEngine(getWindowServiceShard),
    undefined,
    undefined,
    // Experimental at the object level, which fans out over the provider's methods and its update
    // notification. The generic name is not new, but it now answers from whichever window is the
    // routing target rather than from the only one there was.
    { 'x-experimental': true },
  );
  logger.info('Window service router registered');
}

/** Internal-only export for testing; not for use in development */
export const testingWindowServiceRouter = { FocusedWindowDataProviderEngine };
