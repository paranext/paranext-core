/**
 * What a window's window service shard answers beyond the public window service.
 *
 * The public {@link IWindowService} is emitted into `papi.d.ts`, so anything added there becomes
 * extension-facing API. What is here is not that: it exists so the main process's navigation
 * commands can ask one window what they should act on. The shard registers under this extended type
 * and the router resolves it, while the data provider the router publishes under the generic name
 * keeps its public shape — so the public surface is byte-identical.
 *
 * See `.context/standards/Architecture.md` § "Service router and service shard".
 */

import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { IWindowService } from '@shared/services/window.service-model';
import { WebViewId } from '@shared/models/web-view.model';

/**
 * Everything a navigation command needs to know about one window, in a single round trip.
 *
 * @experimental
 */
export type NavigationContext = {
  /**
   * This window's layout direction. The physical→logical mapping for reference-history navigation
   * needs it, and only a renderer can read it — so the window supplies the direction and the main
   * process applies the mapping.
   *
   * @experimental
   */
  readDirection: 'ltr' | 'rtl';

  /**
   * The web view navigation currently drives in this window — the one the top toolbar's
   * book/chapter/verse controls follow — or nothing when this window has nothing to navigate.
   *
   * Absent rather than the whole context being absent, because the reference-history commands still
   * act (on scroll group 0, matching the toolbar) when there is no target, and they still need
   * `readDirection` to decide which way to go.
   *
   * @experimental
   */
  target?: {
    /** The resolved web view, needed to write a detached reference back to it */
    webViewId: WebViewId;
    /** The scroll group it follows, or its own reference when it is detached */
    scrollGroupScrRef: ScrollGroupScrRef;
    /** Its project — the versification frame for reads and writes */
    projectId?: string;
  };
};

/**
 * The window service as one window serves it: everything public, plus what only that window can
 * answer about what navigation should act on.
 *
 * An intersection rather than an interface extending {@link IWindowService}: that type is itself an
 * intersection ending in `IDataProvider<WindowDataTypes>`, and an interface extending it does not
 * carry the data provider constraint through to `getByType`.
 *
 * @experimental
 */
export type WindowServiceShard = IWindowService & {
  /**
   * What navigation should act on in this window (see {@link NavigationContext}).
   *
   * @experimental
   */
  getNavigationContext(): Promise<NavigationContext>;
};
