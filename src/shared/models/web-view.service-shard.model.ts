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
import { WebViewServiceType } from '@shared/services/web-view.service-model';

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
}
