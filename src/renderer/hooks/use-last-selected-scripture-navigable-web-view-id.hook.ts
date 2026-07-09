import {
  getLastSelectedScriptureNavigableWebViewId,
  onDidChangeLastSelectedScriptureNavigableWebViewId,
} from '@renderer/services/window.service-host';
import { WebViewId } from '@shared/models/web-view.model';
import { useSyncExternalStore } from 'react';

/** Subscribe function for {@link useSyncExternalStore} — module-level so its identity is stable */
function subscribe(onStoreChange: () => void): () => void {
  const unsubscribe = onDidChangeLastSelectedScriptureNavigableWebViewId(() => onStoreChange());
  return () => {
    unsubscribe();
  };
}

/**
 * Returns the id of the scripture-navigable web view the user most recently selected (the
 * navigation target of the top toolbar's book/chapter/verse controls and the navigation commands),
 * updating whenever it changes. Selecting a web view that is not scripture-navigable retains the
 * previous value. `undefined` when no scripture-navigable web view has been selected or the
 * selected one closed.
 *
 * Uses `useSyncExternalStore`, which re-reads the current value when it subscribes — a change
 * emitted between the initial render and the subscription cannot be missed.
 */
export function useLastSelectedScriptureNavigableWebViewId(): WebViewId | undefined {
  return useSyncExternalStore(subscribe, getLastSelectedScriptureNavigableWebViewId);
}

export default useLastSelectedScriptureNavigableWebViewId;
