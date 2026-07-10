import {
  getLastSelectedScriptureNavigableWebViewId,
  onDidChangeLastSelectedScriptureNavigableWebViewId,
} from '@renderer/services/window.service-host';
import { WebViewId } from '@shared/models/web-view.model';
import { useSyncExternalStore } from 'react';

/** Subscribe function for {@link useSyncExternalStore} — module-level so its identity is stable */
function subscribe(onStoreChange: () => void): () => void {
  return onDidChangeLastSelectedScriptureNavigableWebViewId(onStoreChange);
}

/**
 * Returns the id of the scripture-navigable web view the user most recently focused (selected),
 * updating whenever it changes. Focusing a web view that is not scripture-navigable retains the
 * previous value; `undefined` when none has been selected or the selected one closed.
 *
 * This is the RAW last-focused tab, with no fallback — use it only when you need "the tab the user
 * was last in" (e.g. tinting that tab). For what BCV navigation actually DRIVES (the top toolbar's
 * book/chapter/verse controls and the `platform.goTo*` commands), use
 * {@link useNavigationTargetWebView} instead, which resolves this through the main-editor fallback
 * and Simple-mode pinning.
 *
 * Uses `useSyncExternalStore`, which re-reads the current value when it subscribes — a change
 * emitted between the initial render and the subscription cannot be missed.
 */
export function useLastSelectedScriptureNavigableWebViewId(): WebViewId | undefined {
  return useSyncExternalStore(subscribe, getLastSelectedScriptureNavigableWebViewId);
}

export default useLastSelectedScriptureNavigableWebViewId;
