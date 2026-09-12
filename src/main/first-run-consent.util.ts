import { logger } from '@shared/services/logger.service';
import { settingsService } from '@shared/services/settings.service';
import type { CommandHandlers } from 'papi-shared-types';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Whether an automatic Simple-mode Send/Receive may start, as answered by
 * {@link getAutomaticSyncConsent}:
 *
 * - `granted`: the first-run wizard has been answered, and the user has not deferred sync this
 *   session.
 * - `unconfirmed`: the wizard has not been answered yet, or `platform.firstRunComplete` could not be
 *   read.
 * - `deferred`: the user chose "Don't sync yet" in the wizard earlier in this app session.
 *
 * Derived from the `platform.getAutomaticSyncConsent` command's declaration, which exposes the same
 * answer to the extension host, so the two cannot drift.
 */
export type AutomaticSyncConsent = Awaited<
  ReturnType<CommandHandlers['platform.getAutomaticSyncConsent']>
>;

/** Log wording for each answer that withholds a sync, so every gate's skip line says the same. */
export const WITHHELD_SYNC_CONSENT_REASONS: Record<
  Exclude<AutomaticSyncConsent, 'granted'>,
  string
> = {
  unconfirmed: 'first-run sync consent not confirmed',
  deferred: `automatic sync deferred for this session ("Don't sync yet")`,
};

// Main-process memory rather than a setting, so the deferral lasts exactly one app session: every
// launch starts without it, and there is no persisted value that a startup-time clear could race.
let isAutomaticSyncDeferred = false;

/**
 * Records that the user declined the first-run wizard's sync ("Don't sync yet"), so no automatic
 * sync starts for the rest of this app session. The next launch syncs as usual.
 */
export function deferAutomaticSyncForSession(): void {
  isAutomaticSyncDeferred = true;
}

/**
 * The first-run sync consent gate, and the canonical statement of its rule. Every automatic
 * Simple-mode sync must get `granted` from this before it starts: the startup, shutdown and
 * window-close syncs call it directly, and the extension host reaches it through the
 * `platform.getAutomaticSyncConsent` command. The rationale and rejected alternatives are in the
 * `first-run-sync-consent` ADR (`.context/standards/Architecture-Decisions.md`).
 *
 * Fails CLOSED: only a literal `true` in `platform.firstRunComplete` counts as answered, and an
 * unreadable flag reads as `unconfirmed`. Never rejects, so callers need no try/catch of their
 * own.
 *
 * Precondition: the caller has already established that the app is in Simple mode.
 * `platform.firstRunComplete` is only ever written by the Simple-mode wizard, so in Power mode it
 * stays `false` forever, and consulting this there would permanently disable Power mode's scheduled
 * sync. An interface mode that cannot be read must not become a way past this gate: treat it as
 * Simple, or skip the sync.
 */
export async function getAutomaticSyncConsent(): Promise<AutomaticSyncConsent> {
  if (isAutomaticSyncDeferred) return 'deferred';
  try {
    const firstRunComplete = await settingsService.get('platform.firstRunComplete');
    return firstRunComplete === true ? 'granted' : 'unconfirmed';
  } catch (e) {
    // The call site's skip line cannot tell an unreadable flag from an unfinished wizard, so this
    // warn is the only record of which one closed the gate.
    logger.warn(
      `Could not read platform.firstRunComplete; skipping the automatic sync: ${getErrorMessage(e)}`,
    );
    return 'unconfirmed';
  }
}

/**
 * Clears the session deferral so each test starts from a fresh session.
 *
 * WARNING: Test-only. @internal
 */
export function resetAutomaticSyncDeferral(): void {
  isAutomaticSyncDeferred = false;
}
