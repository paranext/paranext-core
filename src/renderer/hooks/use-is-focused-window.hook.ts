import {
  getIsThisWindowFocused,
  onDidChangeIsThisWindowFocused,
} from '@renderer/services/window.service-shard';
import { useSyncExternalStore } from 'react';

/** Subscribe function for {@link useSyncExternalStore} — module-level so its identity is stable */
function subscribe(onStoreChange: () => void): () => void {
  return onDidChangeIsThisWindowFocused(onStoreChange);
}

/**
 * Returns whether this window is the one the main process currently considers focused, updating
 * whenever that changes. Stays `true` while the whole application is out of OS focus (alt-tabbed to
 * another application) as long as this was the last window the user was working in — main only
 * reports a different focused window id, never "none".
 *
 * Uses `useSyncExternalStore`, which re-reads the current value when it subscribes — a change
 * emitted between the initial render and the subscription cannot be missed.
 */
export function useIsFocusedWindow(): boolean {
  return useSyncExternalStore(subscribe, getIsThisWindowFocused);
}

export default useIsFocusedWindow;
