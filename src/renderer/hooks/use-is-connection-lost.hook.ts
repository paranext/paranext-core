import {
  getIsConnectionLost,
  subscribeToConnectionLost,
} from '@renderer/services/connection-lost-store';
import { useSyncExternalStore } from 'react';

/**
 * Returns whether this renderer has lost its connection to the network.
 *
 * One-way by design: nothing in the store clears the state, so this goes `false` → `true` at most
 * once per renderer and nothing flips it back. Recovery is a reload. Components that cannot do
 * their job without the socket stand down on it — `if (useIsConnectionLost()) return undefined;` —
 * which withdraws their key handlers and focus traps along with their UI, so Escape and Tab reach
 * the connection-lost state's own shell. Containment there is not total: main's
 * `before-input-event` accelerators, the `document`-level toaster hotkeys and `PlatformMenubar`'s
 * Alt chords still fire, deliberately (see `keyboard-shortcuts.data.ts` and
 * `Architecture-Decisions.md`).
 *
 * Per renderer, and the state it guards may not be: `localStorage` is shared across same-origin
 * windows, so a flag one window declines to write is still writable by another whose socket
 * survived.
 *
 * Backed by `useSyncExternalStore`, which re-reads the snapshot on subscribe — that closes the gap
 * a manual subscribe effect has to cover by hand: a loss that lands between the first render and
 * the subscription.
 *
 * Thin read-only wrapper around {@link subscribeToConnectionLost} / {@link getIsConnectionLost}. It
 * must stay that way: this hook sits on the reaction path to the socket dying, so it may not
 * acquire a PAPI dependency — no command, no settings read, no logger that round-trips. The store
 * behind it is deliberately import-free for the same reason.
 */
export function useIsConnectionLost(): boolean {
  return useSyncExternalStore(subscribeToConnectionLost, getIsConnectionLost);
}

export default useIsConnectionLost;
