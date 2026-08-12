/**
 * What a window's WebView service shard answers beyond the public WebView service.
 *
 * The public {@link WebViewServiceType} is emitted into `papi.d.ts`, so anything added there becomes
 * extension-facing API. This method is not that: it exists so the main process's router can ask a
 * window what its own dock holds. The shard registers under this extended type and the router
 * resolves it, while the router object it publishes under the generic name stays typed as the
 * public service — so the public surface is byte-identical.
 *
 * See `.context/standards/Architecture.md` § "Service router and service shard".
 */

import { WebViewServiceType } from '@shared/services/web-view.service-model';

/**
 * The WebView service as one window serves it: everything public, plus what only that window can
 * answer about its own dock.
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
   */
  dockContainsTab(tabOrTabGroupId: string): Promise<boolean>;
}
