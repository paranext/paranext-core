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
import { WebViewId } from '@shared/models/web-view.model';
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
}
