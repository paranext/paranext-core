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

  /** Window whose updates we are currently relaying, so we only re-subscribe when it changes */
  #relayedWindowId: number | undefined;

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
      this.notifyUpdate('Focus');
    });
  }

  async getFocus(): Promise<FocusSubject | undefined> {
    return (await this.#getFocusedWindowService()).getFocus();
  }

  async setFocus(
    selectorOrSpecifier: SetFocusSpecifier | undefined,
    specifierIfSelectorProvided?: SetFocusSpecifier,
  ): Promise<DataProviderUpdateInstructions<WindowDataTypes>> {
    const windowService = await this.#getFocusedWindowService();
    const focusSpecifier = selectorOrSpecifier ?? specifierIfSelectorProvided;
    // The scoped provider notifies its own subscribers, and this engine relays that through
    // `subscribeFocus` above, so returning false here avoids emitting the same update twice
    await windowService.setFocus(undefined, focusSpecifier);
    return false;
  }

  /** Drop both subscriptions. Called when the proxy provider itself is disposed */
  async dispose(): Promise<boolean> {
    this.#unsubscribeFromFocusChanges();
    await this.#unsubscribeFromWindowUpdates?.();
    this.#unsubscribeFromWindowUpdates = undefined;
    this.#relayedWindowId = undefined;
    return true;
  }

  /**
   * Point the `onDidUpdate` relay at the focused window, dropping the previous window's
   * subscription. A window that has closed or has not registered yet simply leaves the relay idle;
   * the next focus change tries again.
   */
  async #relayUpdatesFromFocusedWindow(): Promise<void> {
    const targetWindowId = getTargetWindowId();
    if (targetWindowId === this.#relayedWindowId) return;

    this.#unsubscribeFromWindowUpdates?.();
    this.#unsubscribeFromWindowUpdates = undefined;
    this.#relayedWindowId = undefined;
    if (targetWindowId === undefined) return;

    const windowService = await this.#resolveWindowService(targetWindowId);
    if (!windowService) return;

    // Focus may have moved again while we were resolving; if so the later call owns the relay
    if (getTargetWindowId() !== targetWindowId) return;

    this.#relayedWindowId = targetWindowId;
    this.#unsubscribeFromWindowUpdates = await windowService.subscribeFocus(
      undefined,
      () => this.notifyUpdate('Focus'),
      // The relay exists to forward later changes; a subscriber gets its initial value from its own
      // retrieval, so replaying it here would just emit a duplicate
      { retrieveDataImmediately: false },
    );
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
    // arrives before any focus change has happened
    await this.#relayUpdatesFromFocusedWindow();
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
