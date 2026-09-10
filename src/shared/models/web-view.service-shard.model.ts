/**
 * What a window's WebView service shard answers beyond the public WebView service.
 *
 * The public {@link WebViewServiceType} is emitted into `papi.d.ts`, so anything added there becomes
 * extension-facing API. These methods are not that: they exist so the main process's routers can
 * drive one window's dock layout. The shard registers under this extended type and the router
 * resolves it, while the router object it publishes under the generic name stays typed as the
 * public service — so the public surface is byte-identical.
 *
 * See `.context/standards/Architecture.md` § "Service router and service shard".
 */

import { Layout } from '@shared/models/docking-framework.model';
import { SavedWebViewDefinition, WebViewId } from '@shared/models/web-view.model';
import { WebViewServiceType } from '@shared/services/web-view.service-model';
import { SerializedVerseRef } from '@sillsdev/scripture';

/**
 * The WebView service as one window serves it: everything public, plus what only that window can do
 * to its own dock layout.
 *
 * @experimental
 */
export interface WebViewServiceShard extends WebViewServiceType {
  /**
   * Whether this window's dock holds the tab or tab group with the given ID.
   *
   * The router asks each window this to send an open whose layout names a tab or tab group to the
   * window that has it. Every kind of tab counts, so an id belonging to something that is not a
   * WebView is answered too.
   *
   * @param tabOrTabGroupId ID of the tab or tab group to look for
   * @returns `true` if this window's dock holds it, `false` otherwise
   * @experimental
   */
  dockContainsTab(tabOrTabGroupId: string): Promise<boolean>;

  /**
   * Whether anything has been docked in this window since it last reported its dock empty.
   *
   * An emptiness report describes a moment that has already passed by the time the main process
   * acts on it — a routed open or a move's adopt can land in the window while the report is in
   * flight. This is what the decision to close such a window is re-checked against, and what keeps
   * a window created to receive routed content from being cleaned up after the content arrived.
   *
   * @returns `true` if content reached this window's dock since its last emptiness report (or since
   *   the window started, if it has never reported one)
   * @experimental
   */
  hasContentArrivedSinceEmptyReport(): Promise<boolean>;

  /**
   * Open a Settings tab in this window, optionally limited to a project.
   *
   * The project is passed in rather than looked up here: the router already read the owning web
   * view's definition while finding this window, and a second lookup would be another cross-process
   * round trip that can come back with something different.
   *
   * @param projectIdToLimitSettings Project whose settings to show, or nothing for user settings
   * @experimental
   */
  openSettingsTab(projectIdToLimitSettings?: string): Promise<Layout | undefined>;

  /**
   * Point a web view that carries its own independent reference at a new one.
   *
   * Only the window holding the web view can write this — the definition lives in its dock layout.
   *
   * @param webViewId Web view whose detached reference to set
   * @param scrRef Reference to move it to
   * @returns Whether the definition was updated
   * @experimental
   */
  setDetachedScrRef(webViewId: WebViewId, scrRef: SerializedVerseRef): Promise<boolean>;

  /**
   * Capture a web view's definition — carrying the live `useWebViewState` state the definition
   * already holds — and close its tab through the normal close lifecycle. The move primitive's
   * source half: closing first is what lets a one-instance web view be opened in a target window at
   * all, since reuse logic would find and raise the still-open source instead.
   *
   * Waits for a layout load in flight before reading the dock, so a load that drops this web view
   * leaves nothing to capture rather than letting the tab be removed and then restored underneath
   * the move.
   *
   * @param webViewId Web view to capture and close
   * @returns The captured definition, or `undefined` if this window does not hold the web view
   * @throws If `webViewId` is not a non-empty string. Reachable from any process, so it checks
   *   rather than trusts
   * @experimental
   */
  captureAndCloseWebView(webViewId: WebViewId): Promise<SavedWebViewDefinition | undefined>;

  /**
   * Open a web view in this window from a definition captured elsewhere. The move primitive's
   * target half: seeds the captured `useWebViewState` state into this window's storage before the
   * provider runs, then opens through the normal open lifecycle (open event, fresh controller).
   *
   * The seed is undone if the open does not complete — whether the provider throws or declines — so
   * an adopt that fails leaves no state behind under an id this window does not hold.
   *
   * @param savedWebViewDefinition Captured definition to open from
   * @returns Id of the web view this window now holds, or `undefined` if the provider declined
   * @throws If the definition does not carry a non-empty `id` and `webViewType`, or if `state` is
   *   present and is not a plain serializable object. Reachable from any process, so it checks
   *   rather than trusts — and checks before the seed, since the seed persists immediately
   * @throws If this window's close has already been decided, at arrival and again after the layout
   *   wait
   * @experimental
   */
  adoptWebView(savedWebViewDefinition: SavedWebViewDefinition): Promise<WebViewId | undefined>;
}
