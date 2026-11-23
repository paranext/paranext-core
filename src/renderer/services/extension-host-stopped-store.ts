import type {
  ExtensionHostStoppedEvent,
  ExtensionHostStopReason,
} from '@shared/models/extension-host-lifecycle.model';

/**
 * What the extension-host notice should say right now.
 *
 * - `stopped`: the extension host stopped without being asked to; the banner alarms and offers both
 *   restarts.
 * - `restarting`: the user pressed Restart service and the new process has not reported itself
 *   started yet. `platform.restartExtensionHost` settles at fork time, long before the new process
 *   can serve anything (about a minute in a dev build), so the banner waits for
 *   `platform.onDidStartExtensionHost` or its own fallback timer, not for the command.
 * - `restarted`: the restart is over. The banner stays, calmer, because a restart does not heal every
 *   part of a window (every settings subscription opened before the restart stays dead, in main and
 *   in the renderer, until PT-4807 lands; the toolbar's open-project book list is another known
 *   case), so a banner that vanished could leave things quietly broken. It offers Restart app and
 *   Dismiss. `isConfirmed` says whether the new extension host announced its start; it is `false`
 *   when the banner's fallback timer gave up waiting, so the banner must not claim the restart
 *   worked.
 */
export type ExtensionHostNotice =
  | { phase: 'stopped' | 'restarting'; reason: ExtensionHostStopReason }
  | { phase: 'restarted'; isConfirmed: boolean };

/**
 * Store remembering that the extension host has stopped without being asked to, and what has
 * happened about it since.
 *
 * Deliberately import-free apart from the shared types, like `connection-lost-store.ts`: the wiring
 * that feeds it lives in `extension-host-stopped-service.ts` and the banner. Keeping the network
 * service out of the state module is what lets a consumer's test drive this store directly.
 */

let notice: ExtensionHostNotice | undefined;

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

/** The current notice, or `undefined` while there is nothing to tell the user. */
export function getExtensionHostNotice(): ExtensionHostNotice | undefined {
  return notice;
}

/** Subscribe to state changes. Returns an unsubscribe function. */
export function subscribeToExtensionHostNotice(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Records that the extension host stopped. Ignored while already `stopped`: a second stop before a
 * restart is the same outage. Replaces a `restarting` notice with the new reason: main stays silent
 * about the stop it was asked for, so a stop arriving while restarting can only be the new
 * extension host dying before it announced its start, and no start announcement will ever end that
 * restart. Replaces a `restarted` notice too: the fresh extension host died, and that is an alarm
 * again.
 */
export function reportExtensionHostStopped(event: ExtensionHostStoppedEvent): void {
  if (notice?.phase === 'stopped') return;
  notice = { phase: 'stopped', reason: event.reason };
  notify();
}

/** Records that a restart was requested from the banner. No-op unless `stopped`. */
export function markExtensionHostRestarting(): void {
  if (notice?.phase !== 'stopped') return;
  notice = { phase: 'restarting', reason: notice.reason };
  notify();
}

/** Records that the restart request failed, so the alarm is back. No-op unless `restarting`. */
export function revertExtensionHostRestart(): void {
  if (notice?.phase !== 'restarting') return;
  notice = { phase: 'stopped', reason: notice.reason };
  notify();
}

/**
 * Records that the restart is over. Moves both `stopped` and `restarting` to `restarted`: a start
 * announcement means the host is up regardless of which window restarted it (the `restarting` phase
 * is per window, so another window's restart leaves this one `stopped`).
 *
 * @param isConfirmed `true` (the default) when the new extension host announced its start; `false`
 *   when the banner's fallback timer gave up waiting for that announcement. A later confirmed call
 *   upgrades an unconfirmed `restarted`; an unconfirmed call never downgrades a confirmed one.
 *   No-op when there is no notice.
 */
export function markExtensionHostRestarted(isConfirmed = true): void {
  if (!notice) return;
  if (notice.phase === 'restarted' && (notice.isConfirmed || !isConfirmed)) return;
  notice = { phase: 'restarted', isConfirmed };
  notify();
}

/** Clears the notice. No-op when there is none. */
export function dismissExtensionHostNotice(): void {
  if (!notice) return;
  notice = undefined;
  notify();
}

/**
 * Resets the state to its initial value. Subscriptions are deliberately left alone, for the same
 * reason `resetConnectionLost` leaves them: `useSyncExternalStore` keeps believing it is
 * subscribed.
 *
 * WARNING: Test-only.
 *
 * @internal
 */
export function resetExtensionHostNotice(): void {
  notice = undefined;
}
