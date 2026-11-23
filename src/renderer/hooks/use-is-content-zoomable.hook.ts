import {
  isContentZoomable,
  onDidChangeContentZoomable,
} from '@renderer/services/web-view-content-zoom.service';
import { WebViewId } from '@shared/models/web-view.model';
import { useCallback, useSyncExternalStore } from 'react';

/**
 * Whether a tab's pane takes content zoom (see `isContentZoomable` in the content-zoom service),
 * updating whenever that answer changes. `false` for a tab hosting no web view.
 *
 * Uses `useSyncExternalStore`, which re-reads the current value when it subscribes, so a change
 * emitted between the initial render and the subscription cannot be missed.
 *
 * Hidden case: nothing to catch up, for the reason given at `onDidChangeContentZoomable` in the
 * content-zoom service.
 *
 * @experimental This hook is unstable and may change or disappear without notice
 */
export function useIsContentZoomable(webViewId: WebViewId | undefined): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (webViewId === undefined) return () => {};
      return onDidChangeContentZoomable((event) => {
        if (event.webViewId === webViewId) onStoreChange();
      });
    },
    [webViewId],
  );
  const getSnapshot = useCallback(
    () => webViewId !== undefined && isContentZoomable(webViewId),
    [webViewId],
  );
  return useSyncExternalStore(subscribe, getSnapshot);
}

export default useIsContentZoomable;
