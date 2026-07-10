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
 * Returns the web view BCV navigation currently DRIVES (with its current saved definition) — what
 * the top toolbar's book/chapter/verse controls and the `platform.goTo*` commands read and write —
 * updating whenever the resolved target changes. It is the tracked last-selected
 * scripture-navigable web view or, failing that (or always in Simple interface mode), the first
 * open Scripture editor with a project; `undefined` when there is nothing to navigate. The window
 * service keeps this value current from web view lifecycle and interface-mode events, so consumers
 * do not track those themselves.
 *
 * This is the value nearly all navigation UI wants. Use
 * {@link useLastSelectedScriptureNavigableWebViewId} only when you specifically need the raw tab the
 * user last focused (no fallback), not what navigation drives.
 *
 * Uses `useSyncExternalStore`, which re-reads the current value when it subscribes — a change
 * emitted between the initial render and the subscription cannot be missed.
 */
export function useNavigationTargetWebView(): ResolvedWebView | undefined {
  return useSyncExternalStore(subscribe, getNavigationTargetWebView);
}

export default useNavigationTargetWebView;
