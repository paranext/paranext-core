import { hasRendererCrashed } from '@renderer/components/renderer-error-boundary.component';
import { cleanupOldWebViewState } from '@renderer/services/web-view-state.service';

/**
 * The renderer's `beforeunload` teardown: purges the saved state of every web view this window did
 * not see load — unless its React tree has crashed.
 *
 * `cleanupOldWebViewState` is only correct once every web view has loaded, which a crashed tree
 * never reached. See `hasRendererCrashed` for why the crash screen's reload button makes an unload
 * after a crash reachable.
 */
export function cleanupWebViewStateOnUnload(): void {
  if (hasRendererCrashed()) return;
  cleanupOldWebViewState();
}
