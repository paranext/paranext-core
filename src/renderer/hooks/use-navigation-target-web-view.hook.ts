import {
  getNavigationTargetWebView,
  onDidChangeNavigationTargetWebView,
} from '@renderer/services/window.service-host';
import { ResolvedWebView } from '@renderer/services/navigation-target.util';
import { useSyncExternalStore } from 'react';

/** Subscribe function for {@link useSyncExternalStore} — module-level so its identity is stable */
function subscribe(onStoreChange: () => void): () => void {
  return onDidChangeNavigationTargetWebView(onStoreChange);
}

/**
 * Returns the web view BCV navigation currently targets (with its current saved definition),
 * updating whenever the resolved target changes: the tracked last-selected scripture-navigable web
 * view or, failing that, the first open Scripture editor with a project. `undefined` when there is
 * nothing to navigate. The window service keeps this value current from web view lifecycle events,
 * so consumers do not track those events themselves.
 *
 * Uses `useSyncExternalStore`, which re-reads the current value when it subscribes — a change
 * emitted between the initial render and the subscription cannot be missed.
 */
export function useNavigationTargetWebView(): ResolvedWebView | undefined {
  return useSyncExternalStore(subscribe, getNavigationTargetWebView);
}

export default useNavigationTargetWebView;
