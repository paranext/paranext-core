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
import { loadDrafts, PrunableThread, pruneDrafts, saveDraftChanges } from './comment-draft-store';

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

  // Whether `drafts` has been changed by an action this hook recognizes as a real edit
  // (`handleDraftChange` or an actual prune) since mount, as opposed to merely holding the value
  // `loadDrafts` produced on the initial render. `loadDrafts` returns `{}` for four distinct
  // reasons -- genuinely empty, unparseable JSON, a rejected shape, or a storage throw -- and a
  // write of a value only just read can never add information: gating the save effect on this flag
  // means the mount-time load, however it turned out, is never itself the reason a write happens.
  const hasRealDraftChangeRef = useRef(false);

  // Per-thread changes made since the last successful write, keyed by thread id: a new draft value,
  // or `undefined` for a deliberate removal (a cleared draft, or a prune). Flushed to storage via
  // `saveDraftChanges` -- a per-key read-modify-write merge, not a whole-map replace -- because
  // another view (the Column 3 panel and the editor-anchored list can share a project) may have its
  // OWN `useCommentDrafts` instance writing to the same `localStorage` key at the same time; see
  // `saveDraftChanges`'s doc in comment-draft-store.ts for the merge and deletion rules. A ref (not
  // state): entries accumulate across possibly-several changes within one debounce window and are
  // read only at the moment the debounced write actually executes, then cleared.
  const pendingChangesRef = useRef<Map<string, CommentDraft | undefined>>(new Map());

  const handleDraftChange = useCallback((threadId: string, draft: CommentDraft | undefined) => {
    hasRealDraftChangeRef.current = true;
    pendingChangesRef.current.set(threadId, draft);
    setDrafts((prevDrafts) => {
      if (draft === undefined) {
        if (!Object.hasOwn(prevDrafts, threadId)) return prevDrafts;
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
  //
  // Takes no arguments: unlike a whole-map save (which would need the latest `drafts` snapshot
  // passed in), this reads `pendingChangesRef.current` at the moment it actually runs -- whether
  // that's after the debounce delay or via `flush()` -- so it always merges every change
  // accumulated since the last successful write, however many `handleDraftChange`/prune events
  // happened in between.
  const debouncedSaveDraftsRef = useRef<DebouncedFunction<() => void> | undefined>(undefined);
  if (!debouncedSaveDraftsRef.current) {
    debouncedSaveDraftsRef.current = debounce(() => {
      // No project to scope this write to (see the `drafts` initializer above) -- nothing to save.
      if (!projectId) return;
      const changes = pendingChangesRef.current;
      if (changes.size === 0) return;
      saveDraftChanges(projectId, changes);
      pendingChangesRef.current = new Map();
    }, DRAFT_SAVE_DEBOUNCE_MS);
  }
  const debouncedSaveDrafts = debouncedSaveDraftsRef.current;

  useEffect(() => {
    // Skip the mount-time value and any render that merely echoes it back unchanged: only a real
    // edit (`handleDraftChange`) or an actual prune may reach storage. See `hasRealDraftChangeRef`.
    if (!hasRealDraftChangeRef.current) return;
    // Never cancelled (only flushed, below), so this only rejects if saveDraftChanges itself
    // throws -- it doesn't, it's try/catch-wrapped -- but the rejection is still handled
    // defensively rather than left as an unhandled promise, matching this codebase's other
    // debounce consumers.
    debouncedSaveDrafts().catch((error) => {
      const message = getErrorMessage(error);
      if (message !== DEBOUNCE_CANCELED_ERROR_MESSAGE)
        logger.error(`Failed to save comment drafts: ${message}`);
    });
  }, [drafts, debouncedSaveDrafts]);

  // Flush (not cancel) on unmount, so a debounced write that hasn't fired yet -- e.g. the user
  // typed and then immediately closed this panel or the app -- is never lost.
  //
  // Unmount cleanup ALONE does not reach either teardown path that actually matters for a web
  // view, so `pagehide`/`beforeunload` listeners below carry the real weight:
  //
  // - Panel close / project switch: `web-view.component.tsx` renders this web view's content via
  //   `srcDoc`, and `openCommentListPanel` calls `reloadWebView` on every project switch. Each
  //   reload regenerates the nonce baked into `content`, so the iframe's `srcDoc` changes and the
  //   iframe navigates to a brand-new document -- the PARENT `WebView` component never unmounts,
  //   so this React root (and its effect cleanups) never runs.
  // - Window/app close: destroys the renderer, and every iframe in it, the same way -- again with
  //   no React unmount in between.
  //
  // `pagehide` fires on the iframe's own window whenever ITS document is being torn down, whether
  // that's the iframe navigating to a new `srcDoc` or the whole renderer going away, so it covers
  // both paths. `beforeunload` is the belt-and-suspenders pair for the real-window-close path.
  // Matches the pairing `platform-scripture-editor.web-view.tsx` already uses for its own
  // teardown flush.
  useEffect(() => {
    const flush = () => debouncedSaveDrafts.flush();
    window.addEventListener('pagehide', flush);
    window.addEventListener('beforeunload', flush);
    return () => {
      flush();
      window.removeEventListener('pagehide', flush);
      window.removeEventListener('beforeunload', flush);
    };
  }, [debouncedSaveDrafts]);

  // The `isShowingAllCommentThreads` value the currently-held `commentThreads` was actually
  // produced under. `isShowingAllCommentThreads` is computed synchronously from this render's
  // filter/scope state, but `commentThreads` comes from a query subscription that only catches up
  // later -- and `isLoadingCommentThreads` can't fill the gap because it too lags: it is raised by
  // a passive effect (create-use-data-hook.util.ts) that has not run yet on the very render a
  // narrowed preset or scope widens back to default. On that render `isShowingAllCommentThreads`
  // and `isLoadingCommentThreads` both already look "safe to prune", while `commentThreads` is
  // still the stale, narrow array the old selection produced. Advancing this only when
  // `commentThreads` itself changes -- never merely because the selection changed -- means a
  // selection flip on its own can never be mistaken for data that has caught up with it.
  const [settledIsShowingAllCommentThreads, setSettledIsShowingAllCommentThreads] = useState(
    isShowingAllCommentThreads,
  );
  useEffect(() => {
    setSettledIsShowingAllCommentThreads(isShowingAllCommentThreads);
    // Intentionally depends only on `commentThreads`, not `isShowingAllCommentThreads`: this must
    // fire when fresh data arrives, not when the selection merely changes -- that distinction is
    // the entire point of tracking "settled" separately from "current". The closure still reads
    // the latest `isShowingAllCommentThreads` on every run even though it isn't a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentThreads]);

  /**
   * The threads (id plus current comment ids) pruning may safely trust, or `undefined` when the
   * current state cannot support it: not the complete unfiltered list, still loading, the data on
   * hand predates the current selection, or a failed query (checked directly against the RAW
   * `commentThreads`, since a normalized "error or empty both read as `[]`" value could no longer
   * tell the two apart). Modeling "not ready to prune" as "no thread list" rather than an extra
   * boolean condition makes a failed query structurally unable to read as "zero threads": there is
   * no path from `commentThreads` being a `PlatformError` to a non-`undefined` result here, so a
   * transient query failure can never be mistaken for a genuinely empty project. A genuinely empty
   * project (a healthy query that resolves to `[]`) still produces `[]` here, not `undefined` -- it
   * correctly prunes every draft, because there really are no threads left to keep one for.
   *
   * Each entry's `commentIds` comes from the SAME `commentThreads` snapshot as its `id` -- both
   * derived from one query result in the same pass below -- so a thread's id list and its
   * comment-id list can never disagree about which moment in time they describe. That is what lets
   * `pruneDrafts` treat every thread here as safe to prune at the `commentEdits` level too, not
   * just the whole-draft level.
   */
  const prunableThreads = useMemo<readonly PrunableThread[] | undefined>(() => {
    if (!isShowingAllCommentThreads || isLoadingCommentThreads) return undefined;
    // The guard must be satisfied by the data, not by state that leads the query: until
    // `settledIsShowingAllCommentThreads` catches up with `isShowingAllCommentThreads`, the held
    // `commentThreads` still belongs to the previous (narrower) selection.
    if (settledIsShowingAllCommentThreads !== isShowingAllCommentThreads) return undefined;
    if (!commentThreads || isPlatformError(commentThreads)) return undefined;
    return commentThreads.map((thread) => ({
      id: thread.id,
      commentIds: thread.comments.map((comment) => comment.id),
    }));
  }, [
    isShowingAllCommentThreads,
    isLoadingCommentThreads,
    settledIsShowingAllCommentThreads,
    commentThreads,
  ]);

  useEffect(() => {
    if (!prunableThreads) return;
    setDrafts((prevDrafts) => {
      const pruned = pruneDrafts(prevDrafts, prunableThreads);
      // Deep-equal both levels (thread-level removals AND commentEdits-level removals) rather than
      // just comparing entry counts: a commentEdits-only prune leaves the thread count unchanged,
      // so a count comparison alone would silently skip re-saving it.
      const isUnchanged =
        Object.keys(pruned).length === Object.keys(prevDrafts).length &&
        Object.entries(pruned).every(([threadId, draft]) => prevDrafts[threadId] === draft);
      if (isUnchanged) return prevDrafts;
      hasRealDraftChangeRef.current = true;
      // Record exactly what pruning changed -- a whole-thread removal, or a commentEdits-level
      // change to a surviving thread's draft -- so the debounced write merges only these keys onto
      // storage (see `saveDraftChanges`) instead of writing back this hook's entire, possibly
      // stale, in-memory map.
      Object.keys(prevDrafts).forEach((threadId) => {
        if (!Object.hasOwn(pruned, threadId)) pendingChangesRef.current.set(threadId, undefined);
      });
      Object.entries(pruned).forEach(([threadId, draft]) => {
        if (prevDrafts[threadId] !== draft) pendingChangesRef.current.set(threadId, draft);
      });
      return pruned;
    });
    // Hidden pane: this runs the same whether or not this tab is visible (rc-dock keeps a hidden
    // pane's iframe mounted and running). That's fine for the same reason as the web view's
    // scroll-group reaction: pruning is purely data-driven (a thread/comment-id-list comparison),
    // not a layout measurement, so it produces the identical result whether the pane is visible or
    // `display: none`, and there is no stale state to catch up on once the tab is activated.
  }, [prunableThreads]);

  return { drafts, handleDraftChange };
}
