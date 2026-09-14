/**
 * Decides what to tell the user when the backend refuses a save of the chapter they are editing.
 *
 * The editor saves the open chapter every time the user stops typing, so a chapter the backend
 * keeps refusing is refused over and over. Two things follow, and this module owns both: the
 * rejection has to be classified (only some kinds let the editor recover by restoring what the PDP
 * holds), and a run of identical rejections has to report ONCE rather than toasting on every save.
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
 * @param errorMessage - The message the backend rejected the write with.
 */
export function classifySaveFailure(errorMessage: string): SaveFailureKind {
  if (SYNC_EDIT_BLOCKED_REGEX.test(errorMessage)) return 'syncEditBlocked';
  if (PERMISSIONS_EXCEPTION_REGEX.test(errorMessage)) return 'permissions';
  return 'unknown';
}

/**
 * Whether a rejection of this kind should be shown to the user now.
 *
 * A chapter the backend refuses is refused on every save for as long as the user keeps typing, so
 * an ungated report would raise a notification every time the save debounce fires. Reporting only
 * on a CHANGE of kind says it once per run of identical rejections — and still speaks up when the
 * failure turns into a different one, or when a save has succeeded in between and cleared the
 * memory.
 *
 * @param kind - The kind of the rejection just received.
 * @param lastReportedKind - The kind last reported to the user, or `undefined` when nothing is
 *   outstanding (nothing has failed yet, or a save has succeeded since).
 */
export function shouldReportSaveFailure(
  kind: SaveFailureKind,
  lastReportedKind: SaveFailureKind | undefined,
): boolean {
  return kind !== lastReportedKind;
}
