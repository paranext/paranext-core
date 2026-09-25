/**
 * Decides what to tell the user when the backend refuses a save of the chapter they are editing.
 *
 * The editor saves the open chapter every time the user stops typing, so a chapter the backend
 * keeps refusing is refused over and over. Two things follow, and this module owns both: the
 * rejection has to be classified (only some kinds let the editor recover by restoring what the PDP
 * holds), and a run of rejections the editor cannot name has to report ONCE rather than toasting on
 * every save. The two it can name — a Send/Receive edit block and a permissions failure — are told
 * on every occurrence, each with its own transient notice.
 */

/** Connected directly to the exception message within PermissionsException.cs */
const PERMISSIONS_EXCEPTION_REGEX = /Permissions exception for projectId/;

/**
 * Sentinel appended by the backend write-gate (SendReceiveWriteLock in paranext-core's c-sharp)
 * when a project write is rejected because an automatic Send/Receive is syncing that project.
 */
export const SYNC_EDIT_BLOCKED_REGEX = /\(SR_EDIT_BLOCKED\)/;

/**
 * What kind of rejection the backend gave a save.
 *
 * `syncEditBlocked` and `permissions` are the two the editor recognizes by their message, knows how
 * to describe, and can recover from by putting back what the PDP holds. `unknown` is everything
 * else — a validation rejection the backend words for a developer, a data-provider fault — where
 * all the editor can honestly say is that the save did not happen.
 */
export type SaveFailureKind = 'syncEditBlocked' | 'permissions' | 'unknown';

/**
 * Which kind of rejection `errorMessage` describes.
 *
 * @param errorMessage The message the backend rejected the write with.
 */
export function classifySaveFailure(errorMessage: string): SaveFailureKind {
  if (SYNC_EDIT_BLOCKED_REGEX.test(errorMessage)) return 'syncEditBlocked';
  if (PERMISSIONS_EXCEPTION_REGEX.test(errorMessage)) return 'permissions';
  return 'unknown';
}

/**
 * Whether a rejection of this kind should be shown to the user now.
 *
 * A Send/Receive edit block and a permissions failure are reported every time they happen, each as
 * a transient notice. A rejection the editor cannot name is different: the backend refuses such a
 * chapter on every save for as long as the user keeps typing, and its notice stays on screen until
 * a save gets through, so it is reported once per run — again only after a save has succeeded and
 * cleared the memory.
 *
 * @param kind The kind of the rejection just received.
 * @param isUnknownFailureOutstanding Whether a rejection the editor cannot name has been reported
 *   and no save has got through since.
 */
export function shouldReportSaveFailure(
  kind: SaveFailureKind,
  isUnknownFailureOutstanding: boolean,
): boolean {
  return kind !== 'unknown' || !isUnknownFailureOutstanding;
}

/** What the editor should do about one rejected save. */
export interface SaveFailureResponse {
  /** Which kind of rejection this was. */
  kind: SaveFailureKind;
  /** Whether to tell the user about it now, or stay quiet because they have already been told. */
  shouldReport: boolean;
  /**
   * Whether the caller may put back what the PDP holds in place of the rejected document.
   *
   * Independent of {@link shouldReport}: the report gate deduplicates the "could not be saved"
   * notice, and must never suppress a revert, which has to happen on every occurrence.
   */
  shouldRevert: boolean;
}

/**
 * The running record of whether the user is looking at a "could not be saved" notice.
 *
 * Deliberately a value this module owns both transitions of, rather than a field the caller
 * maintains itself. The two halves have to agree: whatever suppresses a repeat report is also the
 * only thing that knows when to stop suppressing, and the notice raised for a suppressed run stays
 * on screen until something takes it down. Split between a save path and a success path they drift
 * apart silently, and what that produces is the bug this whole module exists to prevent — a chapter
 * failing to save with nothing on screen saying so.
 */
export interface SaveFailureMemory {
  /** Whether a rejection the editor cannot name has been reported and no save has got through since. */
  isUnknownFailureOutstanding: boolean;
}

/** A memory with no rejection outstanding. */
export function createSaveFailureMemory(): SaveFailureMemory {
  return { isUnknownFailureOutstanding: false };
}

/**
 * Everything the editor needs to decide about one rejected save, worked out synchronously so the
 * caller can act on the editor's content BEFORE it awaits anything.
 *
 * That ordering is the point of this function existing rather than the caller reading the decision
 * off the notification call. Sending a notification is a cross-process call that yields across
 * macrotask boundaries, which is long enough for the PDP subscription's effect to apply a newer
 * delivery into the editor. A revert that ran after such an await would overwrite that newer
 * document with an older snapshot and record the older one as last-sent, leaving the editor and the
 * PDP out of step until the next delivery arrives.
 *
 * A rejection the editor cannot name is recorded as reported HERE, before the caller has sent
 * anything, so that a caller which reverts between deciding and telling cannot report it twice. A
 * send that then fails is deliberately not un-recorded: a notification the platform refused is a
 * broken notification path, and retrying it on every keystroke of a failing chapter would be worse
 * than staying quiet until a save gets through.
 *
 * @param memory The record of what the user has already been told. Updated in place.
 * @param errorMessage The message the backend rejected the write with.
 */
export function planSaveFailureResponse(
  memory: SaveFailureMemory,
  errorMessage: string,
): SaveFailureResponse {
  const kind = classifySaveFailure(errorMessage);
  const shouldReport = shouldReportSaveFailure(kind, memory.isUnknownFailureOutstanding);
  if (kind === 'unknown') memory.isUnknownFailureOutstanding = true;
  return {
    kind,
    shouldReport,
    // Only a rejection the editor recognizes says anything about what the backend WOULD accept. For
    // anything else the editor's content is the user's only copy of the edit, and nothing here
    // knows the PDP's document would fare any better.
    shouldRevert: kind !== 'unknown',
  };
}

/**
 * Records that a write ran to completion with no rejection to classify, so the "could not be saved"
 * notice is no longer outstanding: the next rejection the editor cannot name is worth reporting
 * again.
 *
 * @param memory The record of what the user has already been told. Updated in place.
 * @returns Whether a notice raised for an earlier rejection is now stale and has to be taken down.
 *   `false` when nothing was outstanding, so a caller never dismisses an id it never sent.
 */
export function clearOutstandingSaveFailure(memory: SaveFailureMemory): boolean {
  if (!memory.isUnknownFailureOutstanding) return false;
  memory.isUnknownFailureOutstanding = false;
  return true;
}
