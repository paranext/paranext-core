import { CommentDraft } from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { logger } from '@papi/frontend';
import {
  DEBOUNCE_CANCELED_ERROR_MESSAGE,
  debounce,
  getErrorMessage,
  isPlatformError,
  LegacyCommentThread,
  PlatformError,
  type DebouncedFunction,
} from 'platform-bible-utils';
import { loadDrafts, pruneDrafts, saveDrafts } from './comment-draft-store';

/**
 * How long a draft change waits with no further typing before it is written to storage.
 * `onDraftChange` fires on every serialized editor change — effectively every keystroke — and a
 * write re-serializes every draft in the project via `JSON.stringify` plus a synchronous
 * `localStorage.setItem`; debouncing collapses a typing burst into one write instead of one per
 * keystroke. The in-memory `drafts` state (and the `drafts` prop threads render from) updates
 * synchronously regardless, so typing itself is never delayed — only the persistence write is.
 */
const DRAFT_SAVE_DEBOUNCE_MS = 500;

/**
 * Owns comment drafts (unsent replies, pending assignees, in-progress comment edits) for one
 * project: the in-memory map, its debounced persistence, and pruning entries whose thread no longer
 * exists.
 *
 * Held here rather than inside CommentThread/CommentItem's own state (platform-bible-react's
 * CommentList `drafts`/`onDraftChange` props) so a draft survives the routine remount a filter or
 * scope change causes when its thread stops matching the active query. Persisted to `localStorage`
 * via comment-draft-store.ts so a draft also survives a panel close or restart.
 *
 * @param projectId Project the drafts belong to. `undefined` only for a brand-new Comment List
 *   Panel that has no project yet (see `openCommentListPanel`'s doc) — there is no project to scope
 *   a draft to, and no comments PDP either, so there is nothing to load or persist until a project
 *   is assigned. Invariant for this hook's whole lifetime: every caller that reassigns this web
 *   view's project calls `reloadWebView`, which remounts the React root entirely rather than
 *   changing the prop on a live instance (see `openCommentListPanel`) — so it is safe to close over
 *   directly rather than track through a ref.
 * @param commentThreads The RAW `CommentThreads` query result (not normalized to `[]` on error) —
 *   this hook needs to tell "the query failed" apart from "this project has no threads", which a
 *   pre-normalized array can no longer express.
 * @param isLoadingCommentThreads Whether the `CommentThreads` query is still loading.
 * @param isShowingAllCommentThreads Whether the active preset/scope is the one query that returns
 *   every thread in the project, unfiltered — the only list pruning can safely trust; a narrowed
 *   preset or scope would otherwise make every thread it excludes look deleted, discarding drafts a
 *   filter change is merely hiding rather than destroying. Passed in rather than computed here: it
 *   is a general "no filtering is active" fact about the web view's `filters`/`scopeFilter` state,
 *   computed via the shared `isShowingAllThreads` predicate (the same one that backs the
 *   empty-state copy in comment-list.component.tsx's `noFiltersActive`), not something specific to
 *   pruning, and computing it needs the filters domain model that this hook otherwise has no reason
 *   to import.
 * @returns `drafts` (keyed by thread id) and `handleDraftChange`, the pair to hand straight to
 *   platform-bible-react's `CommentList` `drafts`/`onDraftChange` props.
 */
export function useCommentDrafts({
  projectId,
  commentThreads,
  isLoadingCommentThreads,
  isShowingAllCommentThreads,
}: {
  projectId: string | undefined;
  commentThreads: LegacyCommentThread[] | PlatformError | undefined;
  isLoadingCommentThreads: boolean;
  isShowingAllCommentThreads: boolean;
}): {
  drafts: Readonly<Record<string, CommentDraft>>;
  handleDraftChange: (threadId: string, draft: CommentDraft | undefined) => void;
} {
  const [drafts, setDrafts] = useState<Record<string, CommentDraft>>(() =>
    projectId ? loadDrafts<CommentDraft>(projectId) : {},
  );

  const handleDraftChange = useCallback((threadId: string, draft: CommentDraft | undefined) => {
    setDrafts((prevDrafts) => {
      if (draft === undefined) {
        if (!(threadId in prevDrafts)) return prevDrafts;
        return Object.fromEntries(Object.entries(prevDrafts).filter(([id]) => id !== threadId));
      }
      return { ...prevDrafts, [threadId]: draft };
    });
  }, []);

  // A ref, not `useMemo`: this object owns a live timer, and React documents a memo value as a
  // discardable hint (see useAutoSearchDebounce for the same reasoning). A ref guarantees exactly
  // one instance, so the flush-on-unmount effect below is always flushing the one timer that could
  // actually be pending. Created exactly once (guarded below), so it closes directly over
  // `projectId` — invariant for this hook's whole lifetime, per the parameter doc above — rather
  // than reading it through a second ref that could only ever report the same value.
  const debouncedSaveDraftsRef = useRef<
    DebouncedFunction<(d: Record<string, CommentDraft>) => void> | undefined
  >(undefined);
  if (!debouncedSaveDraftsRef.current) {
    debouncedSaveDraftsRef.current = debounce((draftsToSave: Record<string, CommentDraft>) => {
      // No project to scope this write to (see the `drafts` initializer above) -- nothing to save.
      if (projectId) saveDrafts(projectId, draftsToSave);
    }, DRAFT_SAVE_DEBOUNCE_MS);
  }
  const debouncedSaveDrafts = debouncedSaveDraftsRef.current;

  useEffect(() => {
    // Never cancelled (only flushed, below), so this only rejects if saveDrafts itself throws --
    // it doesn't, it's try/catch-wrapped -- but the rejection is still handled defensively rather
    // than left as an unhandled promise, matching this codebase's other debounce consumers.
    debouncedSaveDrafts(drafts).catch((error) => {
      const message = getErrorMessage(error);
      if (message !== DEBOUNCE_CANCELED_ERROR_MESSAGE)
        logger.error(`Failed to save comment drafts: ${message}`);
    });
  }, [drafts, debouncedSaveDrafts]);

  // Flush (not cancel) on unmount, so a debounced write that hasn't fired yet -- e.g. the user
  // typed and then immediately closed this panel or the app -- is never lost.
  useEffect(() => {
    return () => {
      debouncedSaveDrafts.flush();
    };
  }, [debouncedSaveDrafts]);

  /**
   * The thread ids pruning may safely trust, or `undefined` when the current state cannot support
   * it: not the complete unfiltered list, still loading, or a failed query (checked directly
   * against the RAW `commentThreads`, since a normalized "error or empty both read as `[]`" value
   * could no longer tell the two apart). Modeling "not ready to prune" as "no id list" rather than
   * an extra boolean condition makes a failed query structurally unable to read as "zero threads":
   * there is no path from `commentThreads` being a `PlatformError` to a non-`undefined` result
   * here, so a transient query failure can never be mistaken for a genuinely empty project. A
   * genuinely empty project (a healthy query that resolves to `[]`) still produces `[]` here, not
   * `undefined` -- it correctly prunes every draft, because there really are no threads left to
   * keep one for.
   */
  const prunableThreadIds = useMemo<readonly string[] | undefined>(() => {
    if (!isShowingAllCommentThreads || isLoadingCommentThreads) return undefined;
    if (!commentThreads || isPlatformError(commentThreads)) return undefined;
    return commentThreads.map((thread) => thread.id);
  }, [isShowingAllCommentThreads, isLoadingCommentThreads, commentThreads]);

  useEffect(() => {
    if (!prunableThreadIds) return;
    setDrafts((prevDrafts) => {
      const pruned = pruneDrafts(prevDrafts, prunableThreadIds);
      // pruneDrafts only ever removes entries, so an unchanged count means nothing was pruned --
      // keep the same reference rather than mint an equal one, avoiding a no-op render (and, in
      // turn, a needless re-save).
      if (Object.keys(pruned).length === Object.keys(prevDrafts).length) return prevDrafts;
      return pruned;
    });
    // Hidden pane: this runs the same whether or not this tab is visible (rc-dock keeps a hidden
    // pane's iframe mounted and running). That's fine for the same reason as the web view's
    // scroll-group reaction: pruning is purely data-driven (a thread-id-list comparison), not a
    // layout measurement, so it produces the identical result whether the pane is visible or
    // `display: none`, and there is no stale state to catch up on once the tab is activated.
  }, [prunableThreadIds]);

  return { drafts, handleDraftChange };
}
