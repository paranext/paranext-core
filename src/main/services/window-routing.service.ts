/**
 * Publishes a data provider under the generic "platform.windowServiceDataProvider" name that
 * forwards to the focused window's scoped provider (e.g. "platform.windowServiceDataProvider-1").
 *
 * Each renderer registers its window service under a window-scoped name so several windows can
 * coexist, which would otherwise leave the generic name — the one declared in `papi.d.ts` and used
 * by `useData('platform.windowServiceDataProvider', …)` — registered by nobody. This restores it,
 * matching what `web-view-routing.service.ts`, `notification-routing.service.ts`, and
 * `command-routing.service.ts` do for their own services.
 *
 * Unlike those three, a data provider also has to keep subscribers current, which means re-emitting
 * updates from two sources: the focused window's own `onDidUpdate`, and focus moving between
 * windows (which changes the answer without any window's data having changed).
 */

import { getTargetWindowId, onDidChangeFocusedWindowId } from '@main/services/window-state.service';
import { DataProviderEngine, IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import { dataProviderService } from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import {
  FocusSubject,
  IWindowService,
  SetFocusSpecifier,
  WindowDataTypes,
  windowServiceProviderName,
} from '@shared/services/window.service-model';
import { getErrorMessage, Unsubscriber, UnsubscriberAsync } from 'platform-bible-utils';

/**
 * Resolve the scoped window service for a given window. Injected so the engine can be tested
 * without the Electron window plumbing that owns the real lookup.
 */
export type GetWindowService = (windowId: number) => Promise<IWindowService | undefined>;

/**
 * Forwards to whichever window currently has focus.
 *
 * Holds no state of its own — every call re-resolves the target, so it follows focus without a
 * cache to invalidate. What it does own is the subscription bookkeeping needed to tell subscribers
 * that the answer changed.
 */
class FocusedWindowDataProviderEngine
  extends DataProviderEngine<WindowDataTypes>
  implements IDataProviderEngine<WindowDataTypes>
{
  /** Unsubscribes from the window we are currently relaying `onDidUpdate` from */
  #unsubscribeFromWindowUpdates: UnsubscriberAsync | undefined;

  /**
   * Scoped service we are currently relaying from.
   *
   * Compared by identity rather than by window ID: a renderer that reloads registers a brand new
   * provider under the same window ID, and the resolver's cache drops the old one on disposal, so
   * an ID match would leave the relay bound to a dead provider that can never emit again.
   */
  #relayedWindowService: IWindowService | undefined;

  /**
   * Tail of the chain of relay re-points. Re-points are serialized rather than allowed to overlap,
   * because each one both reads and replaces the subscription bookkeeping — two in flight together
   * would each subscribe and only the last would be remembered, orphaning a live subscription that
   * no disposal can reach.
   */
  #pendingRelay: Promise<void> = Promise.resolve();

  /** Set by `dispose`, so a re-point that is mid-flight at that moment undoes itself */
  #isDisposed = false;

  #unsubscribeFromFocusChanges: Unsubscriber;

  /**
   * Resolves a window's scoped service. Held in a `#`-private field on purpose: `buildDataProvider`
   * classifies every visible function on an engine by prefix, so a normal `getWindowService`
   * property would be read as a getter for a `WindowService` data type with no matching setter, and
   * registration would fail the get/set matching check.
   */
  #resolveWindowService: GetWindowService;

  constructor(resolveWindowService: GetWindowService) {
    super();
    this.#resolveWindowService = resolveWindowService;

    // Focus moving from one window to another changes what `getFocus` answers even though no
    // window's own focus changed, so it has to reach subscribers as an update in its own right.
    this.#unsubscribeFromFocusChanges = onDidChangeFocusedWindowId(() => {
      this.#relayUpdatesFromFocusedWindow().catch((e) =>
        logger.warn(`Window routing could not follow the focus change: ${getErrorMessage(e)}`),
      );
      // This runs inside a synchronous emit on the window `closed` path, where `PlatformEventEmitter`
      // does not isolate subscribers — letting a throw escape here would skip the rest of that
      // window's teardown, so a routing fault stays a routing fault
      try {
        this.notifyUpdate('Focus');
      } catch (e) {
        logger.warn(
          `Window routing could not notify subscribers of a focus change: ${getErrorMessage(e)}`,
        );
      }
    });
  }

  // The scoped provider emits its own update and the relay forwards it, so layering a second
  // automatic emit on top of this one would notify every subscriber twice for one change. Doing it
  // this way rather than returning a constant `false` keeps the scoped provider's real answer —
  // which callers use to tell "focus moved" from "no such tab" — reaching the caller intact.
  @dataProviderService.decorators.doNotNotify
  async setFocus(
    selectorOrSpecifier: SetFocusSpecifier | undefined,
    specifierIfSelectorProvided?: SetFocusSpecifier,
  ): Promise<DataProviderUpdateInstructions<WindowDataTypes>> {
    const windowService = await this.#getFocusedWindowService();
    const focusSpecifier = selectorOrSpecifier ?? specifierIfSelectorProvided;
    return windowService.setFocus(undefined, focusSpecifier);
  }

  async getFocus(): Promise<FocusSubject | undefined> {
    return (await this.#getFocusedWindowService()).getFocus();
  }

  /** Drop both subscriptions. Called when the proxy provider itself is disposed */
  async dispose(): Promise<boolean> {
    this.#isDisposed = true;
    this.#unsubscribeFromFocusChanges();
    // Wait out any re-point already in flight; it checks `#isDisposed` after attaching and undoes
    // itself, so nothing can be left subscribed to a window once this resolves
    await this.#pendingRelay.catch(() => undefined);
    await this.#unsubscribeFromWindowUpdates?.();
    this.#unsubscribeFromWindowUpdates = undefined;
    this.#relayedWindowService = undefined;
    return true;
  }

  /**
   * Point the `onDidUpdate` relay at the focused window, dropping the previous window's
   * subscription. Serialized behind any re-point already running, so concurrent callers queue
   * instead of racing each other into duplicate subscriptions.
   */
  async #relayUpdatesFromFocusedWindow(): Promise<void> {
    const repoint = this.#pendingRelay.catch(() => undefined).then(() => this.#repointRelay());
    this.#pendingRelay = repoint;
    await repoint;
  }

  /**
   * The body of a single re-point. Only ever runs one at a time — see
   * `#relayUpdatesFromFocusedWindow`, which serializes calls to this. A window that has closed or
   * has not registered yet simply leaves the relay idle; the next focus change or read tries
   * again.
   *
   * That idle window is observable when a window is first opened: Electron fires `focus` as soon as
   * the window shows, well before its renderer registers a scoped provider, so the new window's own
   * focus churn during startup is not pushed to subscribers of the generic name until something
   * reads and re-arms the relay. Every read still answers correctly throughout — only the push is
   * late. Closing that gap needs a re-point triggered by the scoped provider appearing rather than
   * by focus alone.
   */
  async #repointRelay(): Promise<void> {
    if (this.#isDisposed) return;

    const targetWindowId = getTargetWindowId();
    const windowService =
      targetWindowId === undefined ? undefined : await this.#resolveWindowService(targetWindowId);
    if (windowService === this.#relayedWindowService) return;

    // Attach before detaching, so a focus change arriving in the newly focused window during the
    // handover still reaches subscribers. A brief overlap costs at most one redundant notify, where
    // the reverse order drops the update entirely.
    const unsubscribeFromNewWindow = windowService
      ? await windowService.subscribeFocus(undefined, () => this.notifyUpdate('Focus'), {
          // The relay exists to forward later changes; a subscriber gets its initial value from its
          // own retrieval, so replaying it here would just emit a duplicate
          retrieveDataImmediately: false,
        })
      : undefined;

    const unsubscribeFromPreviousWindow = this.#unsubscribeFromWindowUpdates;
    // Committed only now that the new subscription exists. If the subscribe above threw, the
    // bookkeeping still points at the previous window, so the next attempt retries rather than
    // short-circuiting on a relay it does not actually hold.
    this.#relayedWindowService = windowService;
    this.#unsubscribeFromWindowUpdates = unsubscribeFromNewWindow;
    await unsubscribeFromPreviousWindow?.();

    // Disposed while we were attaching: `dispose` has already run its own teardown, so undo ours
    if (this.#isDisposed) {
      this.#relayedWindowService = undefined;
      this.#unsubscribeFromWindowUpdates = undefined;
      await unsubscribeFromNewWindow?.();
    }
  }

  /** Resolve the focused window's service, or explain why there isn't one */
  async #getFocusedWindowService(): Promise<IWindowService> {
    const targetWindowId = getTargetWindowId();
    if (targetWindowId === undefined)
      throw new Error('No windows available to route window service call');
    const windowService = await this.#resolveWindowService(targetWindowId);
    if (!windowService)
      throw new Error(
        `Window service for window ${targetWindowId} is not available. The renderer may not have started yet.`,
      );
    // Start relaying from this window if we aren't already — covers the case where the first call
    // arrives before any focus change has happened. Failing to set up the relay must not fail the
    // read: the window answered, and the relay retries on the next call.
    await this.#relayUpdatesFromFocusedWindow().catch((e) =>
      logger.warn(`Window routing could not start relaying updates: ${getErrorMessage(e)}`),
    );
    return windowService;
  }
}

/**
 * Register the window service routing proxy under the generic name so it claims the name before any
 * renderer starts. Must be called during main process startup, before createWindow().
 *
 * @param getWindowService Resolves a window's scoped window service by window ID
 */
export async function startWindowRoutingService(getWindowService: GetWindowService): Promise<void> {
  await dataProviderService.registerEngine(
    windowServiceProviderName,
    new FocusedWindowDataProviderEngine(getWindowService),
  );
  logger.info('Window service routing proxy registered');
}

/** Internal-only export for testing; not for use in development */
export const testingWindowRoutingService = { FocusedWindowDataProviderEngine };
