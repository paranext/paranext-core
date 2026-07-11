import {
  getLastFocusedTabId,
  onDidChangeLastFocusedTabId,
} from '@renderer/services/window.service-host';
import { useSyncExternalStore } from 'react';

/** Subscribe function for {@link useSyncExternalStore} — module-level so its identity is stable */
function subscribe(onStoreChange: () => void): () => void {
  return onDidChangeLastFocusedTabId(onStoreChange);
}

/**
 * Returns the id of the tab or web view that most recently had focus (regardless of whether it is
 * scripture-navigable), updating whenever it changes. Retained when focus moves outside all tabs.
 * `undefined` when no tab has ever been focused.
 *
 * Uses `useSyncExternalStore`, which re-reads the current value when it subscribes — a change
 * emitted between the initial render and the subscription cannot be missed.
 */
export function useLastFocusedTabId(): string | undefined {
  return useSyncExternalStore(subscribe, getLastFocusedTabId);
}

export default useLastFocusedTabId;
