import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { serializeRequestType } from '@shared/utils/util';

/**
 * Fully-qualified name of the S/R extension command that runs the sync scheduled for a session
 * boundary ("On startup/shutdown", PT-4162). Shared by the startup and shutdown task modules so the
 * two call sites can't drift apart: a typo in one bare string literal compiles cleanly and both
 * suites still pass (they only assert `stringContaining('runScheduledSessionSync')`), so a single
 * source for the name is the only thing that actually pins them together.
 *
 * This is deliberately NOT wired through the typed `commandService.sendCommand`. That path always
 * applies the shared network retry policy, which both call sites exist specifically to avoid — the
 * shutdown call wants no retry at all, and the startup call has its own longer boot-race budget.
 * Typing the name here (via the extension's vendored `CommandHandlers` declaration) would buy the
 * name check at the cost of the retry semantics `networkService.requestNoRetry` is chosen for, so
 * this shared constant gives the name safety without giving up the raw request path.
 */
export const RUN_SCHEDULED_SESSION_SYNC_COMMAND =
  'paratextBibleSendReceive.runScheduledSessionSync';

/** Serialized request type for {@link RUN_SCHEDULED_SESSION_SYNC_COMMAND}. */
export const RUN_SCHEDULED_SESSION_SYNC_REQUEST_TYPE = serializeRequestType(
  CATEGORY_COMMAND,
  RUN_SCHEDULED_SESSION_SYNC_COMMAND,
);

/** The two session boundaries at which a scheduled sync can be triggered (PT-4162). */
export type SessionSyncBoundary = 'startup' | 'shutdown';

/**
 * Result the S/R extension's `runScheduledSessionSync` command resolves with (PT-4162). The command
 * handles its own errors internally and always resolves (it never rejects for an internal failure),
 * so core distinguishes the three real outcomes from this value rather than from
 * resolve-vs-reject:
 *
 * - `synced`: a scheduled sync ran and completed successfully.
 * - `failed`: a scheduled sync ran but did not complete successfully (the extension logged detail).
 * - `skipped`: nothing ran — nothing was scheduled for this boundary, it wasn't due, or another sync
 *   was already in progress (the common default state until the user schedules something).
 *
 * A rejection from the call still means the command couldn't be reached/executed at all (not
 * registered yet, or a request timeout); callers treat that separately from these settled
 * outcomes.
 */
export type ScheduledSessionSyncResult = 'synced' | 'failed' | 'skipped';
