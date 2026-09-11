import {
  getIsConnectionLost,
  subscribeToConnectionLost,
} from '@renderer/services/connection-lost-store';
import { useSyncExternalStore } from 'react';

/**
 * Returns whether this renderer has lost its connection to the network.
 *
 * One-way: the store never clears, so this goes `false` → `true` at most once per renderer and
 * nothing flips it back. Recovery is a reload. Components that cannot do their job without the
 * socket stand down on it — `if (useIsConnectionLost()) return undefined;` — which withdraws their
 * key handlers and focus traps along with their UI, leaving the connection-lost state's own shell
 * the only surface claiming the keyboard.
 *
 * Backed by `useSyncExternalStore`, which re-reads the snapshot on subscribe — that closes the gap
 * a manual subscribe effect has to cover by hand: a loss that lands between the first render and
 * the subscription.
 *
 * Thin read-only wrapper around {@link subscribeToConnectionLost} / {@link getIsConnectionLost}.
 */
export function useIsConnectionLost(): boolean {
  return useSyncExternalStore(subscribeToConnectionLost, getIsConnectionLost);
}

export default useIsConnectionLost;
