import { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Persists per-thread comment drafts (an unsent reply, a pending assignee, unsaved edits to
 * existing comments) in `localStorage`, keyed by project — deliberately, not a placeholder for a
 * future project setting; see `adr-comment-machine-local-storage` in Architecture-Decisions.md for
 * why per-user project settings (which travel in Send/Receive) are the wrong store for this.
 *
 * `localStorage` for a project is also shared by every web view open on it at once — in particular
 * the editor-anchored `legacyCommentManager.commentList` and the Column 3 panel
 * (`legacyCommentManager.commentListPanel`), which can both be open on the same project
 * simultaneously (each web view iframe gets `allow-same-origin`; see
 * `src/renderer/services/local-storage.service.ts`). Each view's `useCommentDrafts` holds its own
 * in-memory `drafts` map, loaded once at mount and edited independently from then on. `saveDrafts`
 * below replaces the WHOLE stored map and is only safe when a caller genuinely owns the complete,
 * current set of drafts (e.g. seeding a fixture in a test); production persistence instead goes
 * through {@link saveDraftChanges}, which merges per-thread via read-modify-write so a write from
 * one view cannot silently erase an unrelated thread's draft the other view wrote in the meantime.
 * {@link saveDraftChanges}'s own doc covers the deletion rule and its residual limitation.
 */

const STORAGE_KEY_PREFIX = 'legacyCommentManager.drafts.';

function getStorageKey(projectId: string): string {
  return `${STORAGE_KEY_PREFIX}${projectId}`;
}

/**
 * Whether a parsed value can stand in for a map of drafts.
 *
 * Only the container is checked, not the drafts themselves: this store round-trips whatever it was
 * handed, and a draft written by another build is still that build's business. `typeof null` is
 * `'object'`, so the truthiness check carries the null case; an array would otherwise pass and hand
 * every caller numeric keys.
 */
function isDraftMap<T>(value: unknown): value is Readonly<Record<string, T>> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Loads the persisted drafts for a project.
 *
 * @param projectId Id of the project whose drafts to load.
 * @returns The project's drafts, keyed by thread id. Returns an empty object when nothing has been
 *   saved, when storage is unavailable (`localStorage` throws outright in sandboxed contexts), or
 *   when the stored value cannot be a map of drafts — a caller must be able to render with no
 *   drafts rather than crash. That covers text which is not JSON at all and JSON which parses to
 *   something other than an object, such as `null`, which every caller would otherwise iterate.
 */
export function loadDrafts<T>(projectId: string): Readonly<Record<string, T>> {
  try {
    const stored = localStorage.getItem(getStorageKey(projectId));
    if (!stored) return {};
    const parsed: unknown = JSON.parse(stored);
    return isDraftMap<T>(parsed) ? parsed : {};
  } catch {
    // Storage may be unavailable, or a previous build may have written something this build
    // can't parse. Either way, drafts are best-effort: losing them must never block rendering.
    return {};
  }
}

/**
 * Persists the drafts for a project, replacing whatever was stored before.
 *
 * @param projectId Id of the project whose drafts to save.
 * @param drafts The project's drafts, keyed by thread id. An empty object clears the project's
 *   entry entirely rather than leaving a stale `{}` behind.
 */
export function saveDrafts<T>(projectId: string, drafts: Readonly<Record<string, T>>): void {
  try {
    const key = getStorageKey(projectId);
    if (Object.keys(drafts).length === 0) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(drafts));
  } catch (error) {
    // Best-effort persistence: a failed write leaves the draft live only in the caller's
    // in-memory state for this session, which is the same outcome as never having saved it. Still
    // logged: silently swallowing this turns a `QuotaExceededError` into an undiagnosable support
    // case, since the UI keeps showing the draft as saved right up until it is gone on restart.
    logger.warn(
      `Failed to save comment drafts for project ${projectId}: ${getErrorMessage(error)}`,
    );
  }
}

/**
 * Applies a set of per-thread changes to a project's persisted drafts via read-modify-write: reads
 * whatever is CURRENTLY stored (not this caller's possibly-stale in-memory copy), overlays each
 * change, and writes the merged result back. This is what `useCommentDrafts` calls for its
 * debounced persistence, instead of `saveDrafts` -- see the module doc above for why a whole-map
 * replace is unsafe once two views can be open on the same project at once.
 *
 * Deletion rule (the hard case a whole-map replace can't express): a key present in `changes` with
 * value `undefined` is removed from the merged result regardless of what the fresh read just found
 * for it -- an explicit removal from THIS writer always wins over whatever the read turned up,
 * because a value never in `changes` at all is left completely untouched. That is what lets a
 * writer remove an entry it deliberately cleared (the user emptied the reply box, or `pruneDrafts`
 * determined the thread no longer exists) without also erasing every key it doesn't happen to be
 * touching right now.
 *
 * Residual limitation: this is still bare last-writer-wins for the SAME key. If two views both hold
 * a pending change to the identical thread id (e.g. the same thread's reply box is open, absurdly,
 * in both the panel and the editor-anchored list, and both are typed into within the same debounce
 * window), whichever write reaches storage last overwrites the other's -- there is no per-key
 * versioning or merge of the draft CONTENTS themselves. What this function does guarantee is that a
 * change to one thread's draft can never discard a different, untouched thread's draft, which is
 * the failure this was written to close.
 *
 * @param projectId Id of the project whose drafts to update.
 * @param changes Per-thread changes to apply, keyed by thread id: a new draft value to set, or
 *   `undefined` to remove that thread's entry entirely. An empty map writes nothing.
 */
export function saveDraftChanges<T>(
  projectId: string,
  changes: ReadonlyMap<string, T | undefined>,
): void {
  if (changes.size === 0) return;
  try {
    const key = getStorageKey(projectId);
    const merged: Record<string, T> = { ...loadDrafts<T>(projectId) };
    changes.forEach((draft, threadId) => {
      if (draft === undefined) delete merged[threadId];
      else merged[threadId] = draft;
    });
    if (Object.keys(merged).length === 0) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(merged));
  } catch (error) {
    // Best-effort persistence, matching saveDrafts: a failed write leaves the change live only in
    // the caller's in-memory state for this session. Still logged for the same QuotaExceededError
    // diagnosability reason as saveDrafts.
    logger.warn(
      `Failed to save comment draft changes for project ${projectId}: ${getErrorMessage(error)}`,
    );
  }
}

/**
 * One thread's identity for pruning purposes: its id, plus the ids of the comments it currently
 * contains -- `undefined` when the caller cannot vouch for that list (see `commentIds` below).
 */
export type PrunableThread = {
  id: string;
  /**
   * Ids of the comments this thread currently contains, or `undefined` when the caller doesn't have
   * a trustworthy list for this thread (e.g. only thread ids were available, not full thread data).
   * `undefined` and `[]` are deliberately different: an empty array means "this thread's comment
   * list is known, and it's empty" (safe to prune every `commentEdits` entry against it), while
   * `undefined` means "unknown" (prune nothing at the comment level -- see `pruneDrafts`).
   */
  commentIds?: readonly string[];
};

/**
 * Removes drafts whose thread no longer exists, and -- within a surviving thread's draft -- any
 * `commentEdits` entry whose comment no longer exists in that thread.
 *
 * @param drafts The drafts to prune, keyed by thread id. A draft's optional `commentEdits` sub-map,
 *   if present, is keyed by COMMENT id (not thread id): an edit to one specific comment in the
 *   thread, distinct from the thread-level draft fields.
 * @param existingThreads The threads that still exist, each with the comment ids it currently
 *   contains. Bundled as one list (rather than a separate thread-id list plus a comment-id map) so
 *   the two can never be read from different, possibly-inconsistent snapshots of the data.
 * @returns A copy of `drafts` containing only the entries whose thread id matches an entry in
 *   `existingThreads`. Without this, a deleted thread's draft lingers forever and makes an "unsaved
 *   comments" indicator point at a thread the user can no longer open. Within a surviving thread's
 *   draft, `commentEdits` is pruned the same way when that thread's `commentIds` is known (not
 *   `undefined`) -- otherwise a `commentEdits` entry keyed by a deleted comment id would survive
 *   every prune forever, since pruning by thread id alone can never reach it. `commentEdits` is
 *   dropped entirely (set to `undefined`) once it would otherwise become `{}`, matching the shape
 *   `handleDraftChange` itself already produces when the last edit in a thread is cleared.
 */
export function pruneDrafts<T extends { commentEdits?: Readonly<Record<string, unknown>> }>(
  drafts: Readonly<Record<string, T>>,
  existingThreads: readonly PrunableThread[],
): Readonly<Record<string, T>> {
  const commentIdsByThreadId = new Map(
    existingThreads.map((thread) => [thread.id, thread.commentIds]),
  );

  return Object.fromEntries(
    Object.entries(drafts)
      .filter(([threadId]) => commentIdsByThreadId.has(threadId))
      .map(([threadId, draft]) => {
        const existingCommentIds = commentIdsByThreadId.get(threadId);
        // No commentEdits to prune, or this thread's comment-id list isn't known -- leave the
        // draft as-is (unconditional pruning against an unknown list would risk discarding a
        // live edit; see the `commentIds` doc above).
        if (!draft.commentEdits || !existingCommentIds) return [threadId, draft];

        const existingIds = new Set(existingCommentIds);
        const prunedCommentEdits = Object.fromEntries(
          Object.entries(draft.commentEdits).filter(([commentId]) => existingIds.has(commentId)),
        );
        if (Object.keys(prunedCommentEdits).length === Object.keys(draft.commentEdits).length) {
          return [threadId, draft];
        }
        return [
          threadId,
          {
            ...draft,
            commentEdits:
              Object.keys(prunedCommentEdits).length > 0 ? prunedCommentEdits : undefined,
          },
        ];
      }),
  );
}
