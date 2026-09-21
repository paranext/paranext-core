import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import {
  AddCommentToThreadOptions,
  COMMENT_LIST_ELEMENT_ID,
  COMMENT_LIST_STRING_KEYS,
  CONFLICT_NOTE_STRING_KEYS,
  ConflictResolution,
  ConflictResolutionOptions,
  getCommentThreadElementId,
  Sonner,
  sonner,
  usePromise,
  useRunWhenVisible,
  useTabIconSelection,
  useViewVisibility,
  type TabIconUrls,
} from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  useLocalizedStrings,
  useProjectData,
  useProjectDataProvider,
  useWebViewController,
} from '@papi/frontend/react';
import {
  getErrorMessage,
  isPlatformError,
  LegacyCommentThread,
  serialize,
} from 'platform-bible-utils';
import { VerseRef } from '@sillsdev/scripture';
import type {
  LegacyCommentFilters,
  LegacyCommentThreadSelector,
  LegacyScopeFilter,
} from 'legacy-comment-manager';
import {
  hasStoredFilterSelection,
  loadFilterSelection,
  saveFilterSelection,
} from './comment-filter-store';
import { CommentListWebViewMessage } from './comment-list-messages.model';
import {
  CommentListPanel,
  COMMENT_LIST_PANEL_EXTRA_STRING_KEYS,
  COMMENT_LIST_STICKY_HEADER_ELEMENT_ID,
} from './comment-list.component';
import {
  applyFilterOverrides,
  buildCommentThreadSelector,
  CommentFilters,
  DEFAULT_COMMENT_FILTERS,
  DEFAULT_SCOPE_FILTER,
  isShowingAllThreads,
  presetNeedsFrozenReadMembership,
  presetRequiresCurrentUser,
  resolveScopeFilter,
  ScopeFilter,
  scopeFieldsUsed,
} from './comment-list-filters.model';
import {
  CurrentCommentListView,
  resolveSetFiltersMessage,
} from './comment-list-web-view-message.util';
import type { CommentListScrollTarget } from './comment-list-scroll.utils';
import { useBcvSyncScroll } from './use-bcv-sync-scroll.hook';
import { useCommentDrafts } from './use-comment-drafts.hook';
import { useFrozenPresetThreadIds } from './use-frozen-preset-thread-ids.hook';
import { COMMENT_LIST_PANEL_WEB_VIEW_TYPE } from './comment-list-panel.utils';
import { isSyncEditBlockedError, notifySyncEditBlocked } from './sync-edit-blocked.util';
import { gateCommentWriteCapabilities } from './comment-list-capability-gating.util';

const DEFAULT_LEGACY_COMMENT_THREADS: LegacyCommentThread[] = [];

/**
 * The selection to seed a freshly mounted view with when it opened plain (no mount-time override):
 * this project's stored comment-filter selection, or the default view for a brand-new Comment List
 * Panel that has no project yet (see `useCommentDrafts`'s `projectId` doc for why it can be
 * `undefined`).
 *
 * @param legacyPersistedScopeFilter The value under this web view's OLD per-web-view-state
 *   `'scopeFilter'` key (`useWebViewState('scopeFilter', undefined)`), or `undefined` if never set.
 *   Before this project's filter selection moved to `comment-filter-store.ts`'s `localStorage`,
 *   scope was the one axis persisted this way (see that key's call site for the history). A user
 *   who upgrades mid-session has a real "Current chapter"-style preference sitting in their saved
 *   layout that the new store has never recorded for this project; consulted ONLY when
 *   `hasStoredFilterSelection` says this project's new store is genuinely empty, so a real (even
 *   default-valued) stored selection always wins over this one-time migration fallback. There is no
 *   equivalent migration for the preset axis: the merge base kept `filters` as plain, unpersisted
 *   `useState`, so there is nothing under any old key to read back for it.
 */
function loadInitialSelection(
  projectId: string | undefined,
  legacyPersistedScopeFilter: ScopeFilter | undefined,
): CurrentCommentListView {
  if (!projectId) return { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: DEFAULT_SCOPE_FILTER };
  if (!hasStoredFilterSelection(projectId)) {
    return {
      filters: DEFAULT_COMMENT_FILTERS,
      scopeFilter: legacyPersistedScopeFilter ?? DEFAULT_SCOPE_FILTER,
    };
  }
  const stored = loadFilterSelection(projectId);
  return { filters: { preset: stored.preset }, scopeFilter: stored.scopeFilter };
}

/**
 * The value to seed `lastUserChosenViewRef` with — see that ref's doc in the component for why it
 * must never hold a programmatic override.
 *
 * @param mountTimeOverride `initialOverrideRef.current` — `undefined` when this view opened plain.
 * @param plainOpenSelection `initialSelection` — already equals this project's stored (or default)
 *   selection whenever `mountTimeOverride` is `undefined`, so it is reused directly rather than
 *   re-reading storage a second time.
 * @param projectId Needed only when `mountTimeOverride` is set, to read the REAL stored selection
 *   out from under the override (the override itself was never chosen by the user).
 */
function initialUserChosenSelection(
  mountTimeOverride: CurrentCommentListView | undefined,
  plainOpenSelection: CurrentCommentListView,
  projectId: string | undefined,
): CurrentCommentListView {
  // No override: `plainOpenSelection` IS this project's stored (or default) selection already.
  if (mountTimeOverride === undefined) return plainOpenSelection;
  if (!projectId) return { filters: DEFAULT_COMMENT_FILTERS, scopeFilter: DEFAULT_SCOPE_FILTER };
  const stored = loadFilterSelection(projectId);
  return { filters: { preset: stored.preset }, scopeFilter: stored.scopeFilter };
}

const COMMENT_LIST_PANEL_ICON_URLS: TabIconUrls = {
  lightDefault: 'papi-extension://legacyCommentManager/assets/message-square.svg',
  dark: 'papi-extension://legacyCommentManager/assets/message-square-dark.svg',
  lightSelected: 'papi-extension://legacyCommentManager/assets/message-square-selected.svg',
  lightUnselected: 'papi-extension://legacyCommentManager/assets/message-square-unselected.svg',
};

/**
 * Wraps a PDP method call with a null check. If the PDP is not yet available, logs a debug message
 * and returns the specified default value. This reduces repetitive null-checking boilerplate.
 *
 * @param pdp The project data provider, or undefined if not yet available
 * @param methodName Name of the method being called (for logging purposes)
 * @param defaultValue Value to return if PDP is not available
 * @param action The action to perform with the PDP if available
 * @returns The result of the action, or the default value if PDP is unavailable
 */
async function withPdp<PDP, T>(
  pdp: PDP | undefined,
  methodName: string,
  defaultValue: T,
  action: (p: PDP) => Promise<T>,
): Promise<T> {
  if (!pdp) {
    logger.debug(`Comments PDP is not yet available for ${methodName}`);
    return defaultValue;
  }
  return action(pdp);
}

/**
 * Re-measures the sticky header (`COMMENT_LIST_STICKY_HEADER_ELEMENT_ID`) and pins its live height
 * as the document's `scroll-padding-top`, so a `scrollIntoView` call lands its target below the
 * header instead of underneath it. The header's height is not stable — it grows when the
 * editing-paused notice appears, and the filter toolbar it also contains wraps as the viewport
 * narrows — so every caller must invoke this immediately before its own `scrollIntoView`, rather
 * than relying on a padding value set by an earlier scroll.
 */
function applyStickyHeaderScrollPadding(): void {
  const stickyHeader = document.getElementById(COMMENT_LIST_STICKY_HEADER_ELEMENT_ID);
  if (stickyHeader)
    document.documentElement.style.scrollPaddingTop = `${stickyHeader.getBoundingClientRect().height}px`;
}

global.webViewComponent = function CommentListWebView({
  useWebViewScrollGroupScrRef,
  useWebViewState,
  projectId,
  updateWebViewDefinition,
  webViewType,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return [
        ...Array.from(COMMENT_LIST_STRING_KEYS),
        ...Array.from(CONFLICT_NOTE_STRING_KEYS),
        ...COMMENT_LIST_PANEL_EXTRA_STRING_KEYS,
      ];
    }, []),
  );
  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();
  const [editorWebViewId] = useWebViewState<string | undefined>('editorWebViewId', undefined);
  // Set on this web view's state by the core auto-sync edit-block driver while an
  // automatic (scheduled or session) Send/Receive is syncing this project. When true, comment
  // writing is paused: the write affordances below are disabled and a slim notice is shown. Transient
  // runtime state — the provider scrubs it to false on every rehydrate, and the driver re-flags it if
  // a sync is still in flight.
  const [isSyncBlocked] = useWebViewState<boolean>('isSyncBlocked', false);
  // The Column 3 comment-list panel follows the active project's scroll group, so it always has a
  // current chapter even though no editor is wired to it. Both comment-list web view types share
  // this component, so its own `webViewType` prop distinguishes the panel — no extra state channel
  // needed (and nothing gets serialized into persisted layouts).
  const isCommentListPanel = webViewType === COMMENT_LIST_PANEL_WEB_VIEW_TYPE;

  // #region Tab icon (Comment List panel only, both Power and Simple mode — matching Text
  // Collection's convention; per-product-decision this tab keeps its icon in Power mode too,
  // unlike Bible Texts/Commentaries which stay Simple-mode-only. The non-panel comment-list web
  // view type still keeps its tab/view text-only, as today.)

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    let disposed = false;
    let unsubscribe: (() => void) | undefined;
    papi.themes
      .subscribeCurrentTheme(undefined, (theme) => {
        if (!isPlatformError(theme)) setIsDarkTheme(theme.type === 'dark');
      })
      .then((unsub) => {
        if (disposed) unsub();
        else unsubscribe = unsub;
        return undefined;
      })
      .catch((e) => logger.warn(`Failed to subscribe to the current theme: ${getErrorMessage(e)}`));
    return () => {
      disposed = true;
      unsubscribe?.();
    };
  }, []);

  const commentListPanelIconUrl = useTabIconSelection(isDarkTheme, COMMENT_LIST_PANEL_ICON_URLS);
  useEffect(() => {
    // `isCommentListPanel` is fixed for this component instance's whole lifetime (derived from the
    // webViewType prop), so there's no icon to clear when it's false — this instance never set one.
    if (!isCommentListPanel) return;
    updateWebViewDefinition({ iconUrl: commentListPanelIconUrl });
  }, [isCommentListPanel, commentListPanelIconUrl, updateWebViewDefinition]);

  // #endregion

  const editorWebViewController = useWebViewController(
    'platformScriptureEditor.react',
    editorWebViewId,
  );
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>(undefined);
  /**
   * Thread ID that should be selected and scrolled to once data finishes loading. This handles the
   * race condition where a `selectThread` message arrives before comment threads have loaded.
   */
  const [pendingThreadIdToSelect, setPendingThreadIdToSelect] = useState<string | undefined>(
    undefined,
  );

  /** Latest loaded threads, readable from the stable message listener without re-subscribing it. */
  const commentThreadsRef = useRef<LegacyCommentThread[]>([]);

  // Initial filter/scope axes passed by openCommentList when opening a NEW comment list (e.g. the
  // S/R conflict link). Read from web view state so a new view mounts already-filtered — avoiding the
  // race where a setFilters message could arrive before this view's message listener attaches. An
  // already-open (reused) view keeps its state and is updated via the setFilters message instead.
  // Also accepts the deprecated legacy shapes (LegacyCommentFilters, LegacyScopeFilter) for
  // out-of-repo callers of openCommentList's filtersToSet/scopeFilterToSet — applyFilterOverrides and
  // resolveScopeFilter below map both onto the current model.
  const [initialFilters, setInitialFilters] = useWebViewState<
    Partial<CommentFilters> | LegacyCommentFilters | undefined
  >('initialFilters', undefined);
  const [initialScopeFilter, setInitialScopeFilter] = useWebViewState<
    ScopeFilter | LegacyScopeFilter | undefined
  >('initialScopeFilter', undefined);

  // The pre-`localStorage` per-web-view-state scope key a build before this project's filter
  // selection moved to comment-filter-store.ts persisted scope under. Read unconditionally (hooks
  // can't be conditional) and consumed only by `loadInitialSelection`'s migration fallback below —
  // see that function's `legacyPersistedScopeFilter` param doc. Never written back through this
  // setter: this view no longer owns that key going forward, it only reads whatever a prior build
  // left there.
  const [legacyPersistedScopeFilter] = useWebViewState<ScopeFilter | undefined>(
    'scopeFilter',
    undefined,
  );

  // A brand-new view's requested override (e.g. the S/R conflict link), captured once on mount so
  // the filters/scopeFilter initializers below take it over this project's stored selection.
  // `undefined` means this view opened plain, so the initializers fall back to the stored selection
  // instead.
  const initialOverrideRef = useRef<CurrentCommentListView | undefined>(
    initialFilters !== undefined || initialScopeFilter !== undefined
      ? {
          filters: applyFilterOverrides(initialFilters),
          scopeFilter: resolveScopeFilter(initialScopeFilter),
        }
      : undefined,
  );

  // Whether `initialSelectionRef` below was latched while `projectId` was still unresolved (a panel
  // can render before its project is known — see `useCommentDrafts`'s `projectId` doc). Without
  // this, that first, necessarily-default-only computation would latch forever, and this project's
  // real stored (or migrated) selection would never be read even once `projectId` resolves later on
  // this same mounted instance — the correction effect below fires at most once, exactly when this
  // flag says the latched value was never actually read against a real project.
  const initialSelectionLatchedWithoutProjectIdRef = useRef(false);

  // Resolved exactly once per distinct `projectId` this instance has seen — never a second time for
  // the SAME project. Feeding a single snapshot to both `useState` initializers below (rather than
  // each calling `loadInitialSelection` separately) guarantees the preset and the scope come from
  // the same read of storage, and avoids a second redundant `localStorage` read + `JSON.parse` on
  // every mount.
  const initialSelectionRef = useRef<CurrentCommentListView | undefined>(undefined);
  if (!initialSelectionRef.current) {
    initialSelectionRef.current =
      initialOverrideRef.current ?? loadInitialSelection(projectId, legacyPersistedScopeFilter);
    initialSelectionLatchedWithoutProjectIdRef.current = projectId === undefined;
  }
  const initialSelection = initialSelectionRef.current;

  // Plain useState, seeded once from `initialSelection` above — never from useWebViewState, since a
  // filter selection is a per-user, per-project preference kept on this machine, not per-view UI
  // state. Holding it in local state (rather than deriving it every render from storage) is what
  // lets a `setFilters` message or a panel change show immediately, and what lets a `setFilters`
  // message override the display without that override ever reaching the stored selection.
  const [filters, setFilters] = useState<CommentFilters>(() => initialSelection.filters);
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>(() => initialSelection.scopeFilter);

  /**
   * Latest applied filters/scope, readable from the stable message listener without re-subscribing
   * it. Lets an incoming `setFilters` message compare against the view's current values so a
   * same-value re-send (see `resolveSetFiltersMessage`) can skip the `useState` setter entirely
   * instead of minting a new-but-equal `CommentFilters` object.
   *
   * EVERY path that changes the view writes this ref synchronously — the message handler below and
   * the panel's own change handlers alike. The sync effect only lands after a render, and a
   * buffered burst of messages (or a message arriving on the heels of a panel change) happens with
   * no render in between: whatever comes next would compare against the state from before, and a
   * real change that happens to equal that stale snapshot would be skipped for good. The effect
   * stays as the backstop that folds in any state change reaching this component another way.
   *
   * This reflects the DISPLAYED view, including a programmatic override (a mount-time seed, or a
   * `setFilters` message) — it is NOT the right source for what to persist. See
   * `lastUserChosenViewRef` below for that.
   */
  const currentViewRef = useRef<CurrentCommentListView>({ filters, scopeFilter });
  useEffect(() => {
    currentViewRef.current = { filters, scopeFilter };
  }, [filters, scopeFilter]);

  /**
   * The last value the user THEMSELVES chose for each axis, as opposed to `currentViewRef` above,
   * which also reflects programmatic overrides. Initialized from this project's stored selection —
   * a plain open's stored value IS the user's last real choice — rather than from
   * `initialSelection` whenever a mount-time override is in play, since an override was never
   * chosen by the user. Updated ONLY by the panel's own change handlers
   * (`handleFiltersChange`/`handleScopeFilterChange`) below — NEVER by the `setFilters` message
   * handler, and never by the projectId-resolves correction effect below either — so
   * `persistFilterSelection` can always recover the untouched axis's real last-user-chosen value
   * even while an override is still on screen. This is what keeps a programmatic override from
   * leaking into the user's standing preference: see `persistFilterSelection`'s doc for the
   * concrete failure this closes.
   */
  const lastUserChosenViewRef = useRef<CurrentCommentListView>(
    initialUserChosenSelection(initialOverrideRef.current, initialSelection, projectId),
  );

  // Consume the one-shot seed exactly once. The ref above already captured it synchronously on
  // first render, so clear it from persistent web view state now. Otherwise an in-session remount
  // that re-runs this component (e.g. dragging the tab to another dock region) would re-read the
  // stale seed and snap the user's live filter changes back to the original programmatic request.
  useEffect(() => {
    if (initialFilters !== undefined) setInitialFilters(undefined);
    if (initialScopeFilter !== undefined) setInitialScopeFilter(undefined);
  }, [initialFilters, initialScopeFilter, setInitialFilters, setInitialScopeFilter]);

  // A panel that mounted before its project resolved latched the no-project default above; correct
  // it once `projectId` resolves, but ONLY while the view still shows exactly that stale default —
  // a `setFilters` message or a user change that reached the panel in the interim must never be
  // clobbered by a late correction. A mount-time override doesn't depend on the project's stored
  // selection at all (see `initialOverrideRef`), so it was already correct and needs no re-seed.
  useEffect(() => {
    if (!initialSelectionLatchedWithoutProjectIdRef.current || projectId === undefined) return;
    initialSelectionLatchedWithoutProjectIdRef.current = false;
    if (initialOverrideRef.current) return;
    const stillAtStaleDefault =
      currentViewRef.current.filters.preset === DEFAULT_COMMENT_FILTERS.preset &&
      currentViewRef.current.scopeFilter === DEFAULT_SCOPE_FILTER;
    if (!stillAtStaleDefault) return;
    const resolved = loadInitialSelection(projectId, legacyPersistedScopeFilter);
    initialSelectionRef.current = resolved;
    setFilters(resolved.filters);
    setScopeFilter(resolved.scopeFilter);
    currentViewRef.current = resolved;
    lastUserChosenViewRef.current = resolved;
    // setFilters/setScopeFilter are stable useState setters (the linter treats them as stable, so
    // both are omitted).
  }, [projectId, legacyPersistedScopeFilter]);

  const commentsPdp = useProjectDataProvider('legacyCommentManager.comments', projectId);

  // Whether the current user's registration-data fetch (below) has failed. Distinct from merely
  // "not loaded yet": without this, a preset that needs the current user (see
  // `presetRequiresCurrentUser`) would hold `isAwaitingCurrentUserName` true forever on a failed
  // fetch -- a user who left the panel on "Unread comments assigned to me" would reopen it to
  // permanently-loading skeletons with no error and no escape but changing preset. Reset to `false`
  // at the start of every attempt (including a retry), so a later success clears a prior failure.
  const [currentUserNameError, setCurrentUserNameError] = useState(false);
  const isMountedRef = useRef(true);
  useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    [],
  );

  // Fetches the current user's registration data. Stable (empty deps): both the mount-time effect
  // below and the panel's retry action (passed through as `onRetryFetchCurrentUserName`) call this
  // same function, so a retry after a failure runs the identical logic rather than a second,
  // possibly-diverging copy.
  const fetchCurrentUserName = useCallback(async () => {
    setCurrentUserNameError(false);
    try {
      const registrationData = await papi.commands.sendCommand(
        'paratextRegistration.getParatextRegistrationData',
      );
      if (isMountedRef.current) setCurrentUserName(registrationData.name);
    } catch (error) {
      logger.error('Failed to fetch registration data:', error);
      if (isMountedRef.current) setCurrentUserNameError(true);
    }
  }, []);

  // Fetch current user's registration data on mount.
  useEffect(() => {
    fetchCurrentUserName();
  }, [fetchCurrentUserName]);

  // Every `current-*` scope follows the window's scroll group live, whether or not this list is
  // wired to an editor — the scroll group always holds a position. A verse move must not tear down
  // and re-establish the subscription (which re-runs the C# query and flashes the skeletons) for a
  // field the active scope's query granularity doesn't use, so each field is frozen to a sentinel
  // ('' for book, 0 for chapterNum/verseNum — not a real reference component, just "not part of
  // this scope's query") unless `scopeFieldsUsed` says the active scope reads it.
  //
  // Hidden pane: this reacts to the scroll group the same whether or not this tab is visible
  // (rc-dock keeps a hidden pane's iframe mounted and running). That is deliberate, not deferred:
  // the reaction is data-driven — it re-runs the PDP query, not a layout measurement — so it stays
  // correct while hidden and shows the right result the moment the tab is activated; there is no
  // stale state to catch up on. The accepted cost is an extra PDP query per scroll-group move for a
  // pane nobody can currently see.
  const fieldsUsed = scopeFieldsUsed[scopeFilter];
  const scopeBook = fieldsUsed.book ? scrRef.book : '';
  const scopeChapterNum = fieldsUsed.chapterNum ? scrRef.chapterNum : 0;
  const scopeVerseNum = fieldsUsed.verseNum ? scrRef.verseNum : 0;

  // Presets flagged via `presetRequiresCurrentUser` filter on the current user, and an empty
  // assignedTo means "unassigned" to the provider — so hold the loading state rather than querying
  // with a blank name, UNLESS the fetch has already failed (`currentUserNameError`): a failure must
  // stop forcing the loading state forever, so the panel can recover into the explanatory
  // `currentUserNameUnavailable` state below instead of parking on skeletons with no escape.
  const requiresCurrentUserName = presetRequiresCurrentUser[filters.preset];
  const isAwaitingCurrentUserName =
    requiresCurrentUserName && !currentUserName && !currentUserNameError;
  const currentUserNameUnavailable =
    requiresCurrentUserName && !currentUserName && currentUserNameError;

  const [commentThreads, , isLoadingCommentThreads] = useProjectData(
    'legacyCommentManager.comments',
    projectId,
  ).CommentThreads(
    useMemo<LegacyCommentThreadSelector>(
      () =>
        buildCommentThreadSelector({
          filters,
          scopeFilter,
          scrRef: { book: scopeBook, chapterNum: scopeChapterNum, verseNum: scopeVerseNum },
          currentUserName,
        }),
      [scopeBook, scopeChapterNum, scopeVerseNum, scopeFilter, filters, currentUserName],
    ),
    DEFAULT_LEGACY_COMMENT_THREADS,
  );

  // Whether the current query is the complete, unfiltered thread list -- the only list pruning can
  // safely trust. A narrowed preset or scope would otherwise make every thread it excludes look
  // deleted, discarding drafts a filter change is merely hiding rather than destroying. Computed via
  // the shared `isShowingAllThreads` predicate (not inside useCommentDrafts) because it's a general
  // "no filtering is active" fact about THIS view's own filters/scopeFilter state -- the same
  // predicate backs the empty-state copy in comment-list.component.tsx's `noFiltersActive` -- not
  // something specific to drafts; see useCommentDrafts' `isShowingAllCommentThreads` parameter doc
  // for the full reasoning.
  const isShowingAllCommentThreads = isShowingAllThreads({ filters, scopeFilter });

  const { drafts, handleDraftChange } = useCommentDrafts({
    projectId,
    commentThreads,
    isLoadingCommentThreads,
    isShowingAllCommentThreads,
  });

  // The raw query result, normalized to never be a `PlatformError` or `undefined`. Both frozen
  // membership sets below narrow FROM this list, so it is computed once and shared rather than
  // repeated at each narrowing site.
  const queriedThreads = useMemo<LegacyCommentThread[]>(
    () => (!commentThreads || isPlatformError(commentThreads) ? [] : commentThreads),
    [commentThreads],
  );

  // Ids of the threads that currently have a draft, memoized so `useFrozenPresetThreadIds` below
  // only re-runs its entry/grow effect when the SET of drafted threads actually changes, not on
  // every render `drafts` happens to be handed on.
  const draftThreadIds = useMemo(() => Object.keys(drafts), [drafts]);

  // The 'unsaved' preset's membership, frozen at entry and grow-only while the preset stays
  // active -- see the hook's doc for why this must NOT simply be "does this thread currently have
  // a draft": filtering by the live `drafts` map would unmount a thread's CommentThread (and the
  // Lexical editor holding the caret) the instant its draft empties, e.g. select-all + delete, or
  // a successful submit that clears the editor.
  const unsavedPresetThreadIds = useFrozenPresetThreadIds(
    filters.preset,
    filters.preset === 'unsaved',
    draftThreadIds,
  );

  // Ids of the threads that are CURRENTLY unread, per the (unnarrowed-by-isRead) query result --
  // see buildCommentThreadSelector's 'unread' cases and presetNeedsFrozenReadMembership's doc for
  // why isRead is never sent to the provider. Memoized for the same reason draftThreadIds is.
  const unreadThreadIds = useMemo(
    () => queriedThreads.filter((thread) => !thread.isRead).map((thread) => thread.id),
    [queriedThreads],
  );

  // An unread-family preset's membership, frozen at entry and grow-only while it stays active --
  // the same treatment as 'unsaved' above, for the same reason: a thread is marked read ~5 seconds
  // after selection, and filtering by the LIVE read state would unmount the very card the user just
  // opened to read, taking their scroll position with it. A thread read during this visit therefore
  // stays listed until the user leaves the preset.
  const unreadPresetThreadIds = useFrozenPresetThreadIds(
    filters.preset,
    presetNeedsFrozenReadMembership[filters.preset],
    unreadThreadIds,
  );

  // The single UI-facing thread list: the normalized query result, narrowed client-side to whichever
  // frozen membership set the active preset needs (at most one ever applies -- the two families are
  // mutually exclusive). Both preset families contribute no isRead/draft clause to the query itself
  // (see buildCommentThreadSelector) -- a draft is client-side state the provider has never heard
  // of, and isRead is deliberately withheld -- so their queries are otherwise scope-only (plus, for
  // 'unread-assigned-to-me', an assignedTo clause) and return every thread scope/assignment allow;
  // narrowing to the frozen set happens here instead, since the hooks above own the membership sets
  // and this web view owns the query result and the active filters. Because this filter only ever
  // removes entries already present in the normalized query result, a thread the scope excluded (and
  // which therefore never reached that result) can never be added back by newly qualifying -- unlike
  // Paratext 9, where a drafted thread survives every filter.
  const visibleCommentThreads = useMemo<LegacyCommentThread[]>(() => {
    if (filters.preset === 'unsaved') {
      return queriedThreads.filter((thread) => unsavedPresetThreadIds.has(thread.id));
    }
    if (presetNeedsFrozenReadMembership[filters.preset]) {
      return queriedThreads.filter((thread) => unreadPresetThreadIds.has(thread.id));
    }
    return queriedThreads;
  }, [queriedThreads, filters.preset, unsavedPresetThreadIds, unreadPresetThreadIds]);

  // Mirror the currently visible threads into the ref the stable message listener reads.
  useEffect(() => {
    commentThreadsRef.current = visibleCommentThreads;
  }, [visibleCommentThreads]);

  /**
   * Writes a selection to this machine's stored preference for this project. Called ONLY with
   * `lastUserChosenViewRef.current` below — never with `currentViewRef.current`, which can hold a
   * programmatic override (a `setFilters` message, or this view's own mount-time override seed).
   * `setFilters` folds an accepted override into `currentViewRef` for BOTH axes at once (it "sets
   * the ENTIRE view", per its own doc); persisting that ref directly would let the untouched axis
   * of a live override leak into the user's standing preference the moment they changed the OTHER
   * axis from the panel — e.g. the S/R conflict link's `setFilters({preset:'conflict'})` also
   * resets scope, and picking any preset afterward would silently overwrite a scope the user never
   * touched. `lastUserChosenViewRef` never holds a value the user didn't actually choose, so
   * persisting it is always safe.
   */
  const persistFilterSelection = useCallback(
    (selection: CurrentCommentListView) => {
      // No project to scope this write to (see `loadInitialSelection`'s doc) -- nothing to persist.
      if (!projectId) return;
      saveFilterSelection(projectId, {
        preset: selection.filters.preset,
        scopeFilter: selection.scopeFilter,
      });
    },
    [projectId],
  );

  /**
   * Apply a filter change the user made in the panel. Updates both `currentViewRef` (the display
   * value) and `lastUserChosenViewRef` (the persistence value) — see their docs above for why they
   * can diverge and why only the latter is ever persisted.
   */
  const handleFiltersChange = useCallback(
    (newFilters: CommentFilters) => {
      currentViewRef.current = { ...currentViewRef.current, filters: newFilters };
      lastUserChosenViewRef.current = { ...lastUserChosenViewRef.current, filters: newFilters };
      setFilters(newFilters);
      persistFilterSelection(lastUserChosenViewRef.current);
    },
    [persistFilterSelection],
  );

  /**
   * Apply a scope change the user made in the panel. See {@link handleFiltersChange} for why both
   * refs are updated.
   */
  const handleScopeFilterChange = useCallback(
    (newScopeFilter: ScopeFilter) => {
      currentViewRef.current = { ...currentViewRef.current, scopeFilter: newScopeFilter };
      lastUserChosenViewRef.current = {
        ...lastUserChosenViewRef.current,
        scopeFilter: newScopeFilter,
      };
      setScopeFilter(newScopeFilter);
      persistFilterSelection(lastUserChosenViewRef.current);
    },
    [persistFilterSelection],
  );

  const isViewVisible = useViewVisibility();

  // Performs the DOM scroll for a computed sync-scroll target. The hook computes WHERE to scroll;
  // this web view owns the DOM knowledge (both element ids come from platform-bible-react's
  // CommentList).
  const scrollToTarget = useCallback(
    (target: NonNullable<CommentListScrollTarget>, behavior: ScrollBehavior) => {
      // The sticky header overlays the top of what scrolls here (this view's document scrolls, not
      // the list container), so a `block: 'start'` scroll would otherwise park the card underneath
      // it. applyStickyHeaderScrollPadding gives the scroll container that much top padding so the
      // browser stops the card below the header instead. The height is in the document's own
      // pixels — the header sits outside the content-zoom root, so neither it nor
      // `scroll-padding-top` is scaled by the zoom level. Setting the padding on `documentElement`
      // is correct only while the web-view document itself is the scroller; a future layout that
      // bounds this view's height (PT-4173) would move the scroller to a bounded container instead,
      // and this padding would need to move with it.
      applyStickyHeaderScrollPadding();

      if (target.type === 'thread') {
        const threadElement = document.getElementById(getCommentThreadElementId(target.threadId));
        if (threadElement) threadElement.scrollIntoView({ behavior, block: 'start' });
        else logger.debug(`BCV-sync scroll: thread element not found: ${target.threadId}`);
        return;
      }
      // Past every loaded thread: show the end of the list (the user can scroll up). A 'bottom'
      // target guarantees at least one loaded thread, so the list and its children should exist;
      // either miss below means the DOM contract with platform-bible-react's CommentList broke.
      const listElement = document.getElementById(COMMENT_LIST_ELEMENT_ID);
      const lastThreadElement = listElement?.lastElementChild;
      if (lastThreadElement) lastThreadElement.scrollIntoView({ behavior, block: 'end' });
      else
        logger.debug(
          `BCV-sync scroll: #${COMMENT_LIST_ELEMENT_ID} ${listElement ? 'has no children to scroll to' : 'element not found'}`,
        );
    },
    [],
  );

  const { recordSelfInitiatedNavigation, cancelPendingSyncScroll } = useBcvSyncScroll({
    scrRef,
    isLoadingCommentThreads,
    hasPendingThreadSelection: pendingThreadIdToSelect !== undefined,
    isViewVisible,
    commentThreads: visibleCommentThreads,
    scrollToTarget,
  });

  // Clears the scroll-padding this view applies before a scroll (see
  // applyStickyHeaderScrollPadding) so a stale value never outlives this component.
  useEffect(() => {
    return () => {
      document.documentElement.style.scrollPaddingTop = '';
    };
  }, []);

  /**
   * Target for the deferred scroll `trySelectThread` performs — read by
   * `scrollSelectedThreadIntoView` at run time rather than closed over, so a request made while the
   * view is hidden still resolves against the thread (and behavior) it was made for once the
   * catch-up runs.
   */
  const pendingThreadScrollRef = useRef<{ threadId: string; behavior: ScrollBehavior } | undefined>(
    undefined,
  );

  const scrollSelectedThreadIntoView = useCallback(() => {
    const pending = pendingThreadScrollRef.current;
    pendingThreadScrollRef.current = undefined;
    if (!pending) return;
    const threadElement = document.getElementById(getCommentThreadElementId(pending.threadId));
    if (!threadElement) {
      logger.debug(`Deferred thread scroll: thread element not found: ${pending.threadId}`);
      return;
    }
    applyStickyHeaderScrollPadding();
    threadElement.scrollIntoView({ behavior: pending.behavior, block: 'center' });
  }, []);

  // Hidden case: rc-dock keeps an inactive tab's pane mounted under `display: none`, where both the
  // header-height read and `scrollIntoView` silently no-op — there is no layout to measure or
  // scroll within. useRunWhenVisible defers the scroll while hidden, collapsing repeat requests into
  // the single most recent one (pendingThreadScrollRef), and runs it once the tab is shown; the
  // 'instant' behavior trySelectThread records for that case (below) makes the catch-up snap into
  // place instead of animating into a pane the user just switched to.
  const requestThreadScroll = useRunWhenVisible(isViewVisible, scrollSelectedThreadIntoView);

  /**
   * Attempts to scroll to and select a thread by ID. If the thread element doesn't exist yet
   * (likely because data is still loading), queues the thread ID to be processed later.
   *
   * @param threadId The ID of the thread to select and scroll to
   * @param isDataLoading Whether comment threads are currently loading
   * @returns `true` if the thread was found and scrolled to, `false` if it was queued for later
   */
  const trySelectThread = useCallback(
    (threadId: string, isDataLoading: boolean): boolean => {
      const threadElement = document.getElementById(getCommentThreadElementId(threadId));
      if (threadElement) {
        setSelectedThreadId(threadId);
        // See requestThreadScroll's own comment for the hidden-view rationale: 'smooth' while the
        // view is already visible, 'instant' recorded up front for the hidden case so the eventual
        // catch-up doesn't animate.
        pendingThreadScrollRef.current = {
          threadId,
          behavior: isViewVisible ? 'smooth' : 'instant',
        };
        requestThreadScroll();
        setPendingThreadIdToSelect(undefined);
        // The editor's caret move for this navigation may deliver its scroll-group change after
        // this point; record the thread's reference so that late change doesn't scroll the list
        // away from the selection. Recording here (not in the message handler) covers the deferred
        // path too: when the message arrived before thread data loaded, the data is loaded by the
        // time this success branch runs, so the lookup cannot miss.
        const selectedThread = commentThreadsRef.current.find((thread) => thread.id === threadId);
        recordSelfInitiatedNavigation(selectedThread?.verseRef);
        return true;
      }

      // If data is still loading, queue the thread ID to select later
      if (isDataLoading) {
        logger.debug(
          `Thread element ${threadId} not found; queuing for selection after data loads`,
        );
        setPendingThreadIdToSelect(threadId);
        return false;
      }

      // Data is loaded but element still not found - thread may not exist in current view
      logger.warn(`Could not find thread element with id: ${threadId}`);
      return false;
    },
    [isViewVisible, recordSelfInitiatedNavigation, requestThreadScroll],
  );

  // Listen for messages from the web view controller
  useEffect(() => {
    const messageListener = ({ data }: MessageEvent<CommentListWebViewMessage>) => {
      if (data?.method === 'selectThread') {
        logger.debug(`Comment list received selectThread message: ${serialize(data)}`);
        // Note: This handler closes over a stale isLoadingCommentThreads (it isn't in the effect's
        // deps), so we always pass `true` as the conservative safe default rather than trust it. The
        // pending thread will be processed by the effect below once loading actually completes.
        trySelectThread(data.threadId, true);
        // The explicit "go to comment" navigation wins over any due BCV-sync scroll (PT-4080).
        // (trySelectThread records the thread's reference as self-initiated navigation when the
        // selection succeeds, guarding against the editor's caret move arriving after it.)
        // This drop is permanent unless the BCV changes again — safe here only because this flow
        // always navigates the editor first (see cancelPendingSyncScroll's JSDoc for the invariant).
        cancelPendingSyncScroll();
      }

      if (data?.method === 'setFilters') {
        logger.debug(`Comment list received setFilters message: ${serialize(data)}`);
        // A setFilters message sets the ENTIRE view deterministically, exactly like a fresh open:
        // an unspecified preset resets to 'all' and an omitted scope resets to 'all-books', so the
        // programmatic open (e.g. the S/R conflict link) shows exactly the requested view — nothing
        // carries over from prior state.
        //
        // openCommentList sends this message unconditionally on every open, including a reuse hit
        // whose filters are already correct — so an equal-values re-send is expected, not an edge
        // case. Skip the setters when nothing actually changes: applying an equal value would still
        // mint a new-but-equal CommentFilters object, invalidating the CommentThreads selector's
        // identity-based useMemo below and forcing an unnecessary PDP unsubscribe/resubscribe,
        // re-query, and skeleton flash.
        // Each accepted axis is folded into the ref synchronously so the next message of a burst
        // compares against what THIS message applied, not a pre-burst snapshot — see the ref's doc
        const resolved = resolveSetFiltersMessage(data, currentViewRef.current);
        if (resolved.filtersChanged) {
          currentViewRef.current = { ...currentViewRef.current, filters: resolved.filters };
          setFilters(resolved.filters);
        }
        if (resolved.scopeFilterChanged) {
          currentViewRef.current = { ...currentViewRef.current, scopeFilter: resolved.scopeFilter };
          setScopeFilter(resolved.scopeFilter);
        }
      }
    };

    window.addEventListener('message', messageListener);
    return () => {
      window.removeEventListener('message', messageListener);
    };
    // setFilters and setScopeFilter are stable useState setters (the linter treats them as stable,
    // so both are omitted).
  }, [trySelectThread, cancelPendingSyncScroll]);

  // Process any pending thread selection once data finishes loading
  useEffect(() => {
    if (!isLoadingCommentThreads && pendingThreadIdToSelect) {
      // Use a small delay to allow the DOM to update after data loads
      const timeoutId = setTimeout(() => {
        trySelectThread(pendingThreadIdToSelect, false);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [isLoadingCommentThreads, pendingThreadIdToSelect, trySelectThread]);

  const fetchAssignableUsers = useCallback(
    async () =>
      withPdp(commentsPdp, 'fetchAssignableUsers', [], (pdp) => pdp.findAssignableUsers()),
    [commentsPdp],
  );
  const [assignableUsers] = usePromise(fetchAssignableUsers, []);

  const fetchCanUserAddCommentToThread = useCallback(
    async () =>
      withPdp(commentsPdp, 'fetchCanUserAddCommentToThread', false, (pdp) =>
        pdp.canUserAddCommentToThread(),
      ),
    [commentsPdp],
  );
  const [canUserAddCommentToThread] = usePromise(fetchCanUserAddCommentToThread, false);

  const canUserAssignThreadCallback = useCallback(
    async (threadId: string): Promise<boolean> =>
      withPdp(commentsPdp, 'canUserAssignThreadCallback', false, (pdp) =>
        pdp.canUserAssignThread(threadId),
      ),
    [commentsPdp],
  );

  const canUserResolveThreadCallback = useCallback(
    async (threadId: string): Promise<boolean> =>
      withPdp(commentsPdp, 'canUserResolveThreadCallback', false, (pdp) =>
        pdp.canUserResolveThread(threadId),
      ),
    [commentsPdp],
  );

  const getConflictResolutionOptionsCallback = useCallback(
    async (threadId: string): Promise<ConflictResolutionOptions> =>
      withPdp(commentsPdp, 'getConflictResolutionOptionsCallback', 'none', async (pdp) => {
        try {
          return await pdp.getConflictResolutionOptions(threadId);
        } catch (error) {
          logger.error(`Failed to get conflict resolution options for thread ${threadId}:`, error);
          return 'none';
        }
      }),
    [commentsPdp],
  );

  const canUserEditOrDeleteCommentCallback = useCallback(
    async (commentId: string): Promise<boolean> =>
      withPdp(commentsPdp, 'canUserEditOrDeleteCommentCallback', false, (pdp) =>
        pdp.canUserEditOrDeleteComment(commentId),
      ),
    [commentsPdp],
  );

  const handleAddCommentToThread = useCallback(
    async (options: AddCommentToThreadOptions): Promise<string | undefined> =>
      withPdp(commentsPdp, 'handleAddCommentToThread', undefined, async (pdp) => {
        try {
          const newCommentId = await pdp.addCommentToThread({
            thread: options.threadId,
            contents: options.contents,
            status: options.status,
            assignedUser: options.assignedUser,
          });
          return newCommentId;
        } catch (error) {
          // A write-gate rejection (an automatic Send/Receive is syncing this project) is an
          // expected paused state, not an error: show the shared "editing paused" notice instead of
          // logging + surfacing a raw failure. Defense-in-depth behind the disabled reply affordance.
          if (isSyncEditBlockedError(error)) notifySyncEditBlocked();
          else logger.error(`Failed to add comment to thread ${options.threadId}:`, error);
          return undefined;
        }
      }),
    [commentsPdp],
  );

  const handleResolveConflict = useCallback(
    async (threadId: string, resolution: ConflictResolution): Promise<boolean> =>
      withPdp(commentsPdp, 'handleResolveConflict', false, async (pdp) => {
        try {
          await pdp.resolveConflict(threadId, resolution);
          return true;
        } catch (error) {
          // A write-gate rejection (an automatic Send/Receive is syncing this project) gets the
          // shared "editing paused" notice rather than the generic resolve-failed toast. Defense-in-
          // depth behind the disabled resolve affordance.
          if (isSyncEditBlockedError(error)) {
            notifySyncEditBlocked();
          } else {
            logger.error(`Failed to resolve conflict thread ${threadId}:`, error);
            sonner.error(
              localizedStrings['%conflict_note_resolve_failed%'] ??
                'Could not resolve the conflict.',
            );
          }
          return false;
        }
      }),
    [commentsPdp, localizedStrings],
  );

  // Bundle the two conflict callbacks into the single slot CommentList/ConflictThread consume.
  const conflictResolution = useMemo(
    () => ({ resolve: handleResolveConflict, getOptions: getConflictResolutionOptionsCallback }),
    [handleResolveConflict, getConflictResolutionOptionsCallback],
  );

  const handleUpdateComment = useCallback(
    async (commentId: string, contents: string): Promise<boolean> =>
      withPdp(commentsPdp, 'handleUpdateComment', false, async (pdp) => {
        try {
          // `false` means the update was rejected (comment not found, or its content normalizes to
          // the "content unavailable" placeholder, which is never persisted over real content).
          // Surface it so the editor stays open instead of closing as if the edit had saved.
          const updateSucceeded = (await pdp.updateComment(commentId, contents)) !== false;
          if (!updateSucceeded)
            logger.warn(`Update of comment ${commentId} was rejected and not saved.`);
          return updateSucceeded;
        } catch (error) {
          // A write-gate rejection (an automatic Send/Receive is syncing this project) is an
          // expected paused state: show the shared "editing paused" notice. Defense-in-depth behind
          // the disabled edit affordance.
          if (isSyncEditBlockedError(error)) notifySyncEditBlocked();
          else logger.error(`Failed to update comment ${commentId}:`, error);
          return false;
        }
      }),
    [commentsPdp],
  );

  const handleDeleteComment = useCallback(
    async (commentId: string): Promise<boolean> =>
      withPdp(commentsPdp, 'handleDeleteComment', false, async (pdp) => {
        try {
          await pdp.deleteComment(commentId);
          return true;
        } catch (error) {
          // A write-gate rejection (an automatic Send/Receive is syncing this project) is an
          // expected paused state: show the shared "editing paused" notice. Defense-in-depth behind
          // the disabled delete affordance.
          if (isSyncEditBlockedError(error)) notifySyncEditBlocked();
          else logger.error(`Failed to delete comment ${commentId}:`, error);
          return false;
        }
      }),
    [commentsPdp],
  );

  const handleReadStatusChange = useCallback(
    async (threadId: string, markAsRead: boolean): Promise<boolean> =>
      withPdp(commentsPdp, 'handleReadStatusChange', false, async (pdp) => {
        try {
          await pdp.setIsCommentThreadRead(threadId, markAsRead);
          return true;
        } catch (error) {
          logger.error(`Failed to set read status on thread ${threadId}:`, error);
          return false;
        }
      }),
    [commentsPdp],
  );

  const handleVerseRefClick = useCallback(
    (thread: LegacyCommentThread) => {
      const { verseRef } = VerseRef.tryParse(thread.verseRef ?? '');
      if (!verseRef.valid) return;

      // This view is causing the upcoming scroll-group change; a click inside the list must never
      // scroll the list, so record the reference for the sync-scroll hook to swallow.
      recordSelfInitiatedNavigation(thread.verseRef);

      if (editorWebViewId && editorWebViewController) {
        papi.window.setFocus({ focusType: 'webView', id: editorWebViewId });
        const location = {
          verseRef: verseRef.toJSON(),
          offset: Math.max(0, (thread.comments[0]?.startPosition ?? 0) - 1),
        };
        editorWebViewController.selectRange({ start: location, end: location });
      } else {
        setScrRef(verseRef.toJSON());
      }
    },
    [setScrRef, editorWebViewId, editorWebViewController, recordSelfInitiatedNavigation],
  );

  // While this project's automatic Send/Receive is blocking edits (isSyncBlocked),
  // disable every comment write affordance by forcing its capability gate to `false`.
  // platform-bible-react's CommentList exposes no `disabled`/`readOnly` prop; these per-capability
  // callbacks ARE its existing mechanism for hiding/disabling the reply box, assign, edit/delete, and
  // thread-resolve, so gating them here is the real disable path (not a cosmetic no-op). NOTE: the
  // verse-text conflict-resolution card (the `conflictResolution` prop / `useConflictResolution`,
  // whose Accept/Reject/Merge controls derive from an ungated `getOptions` read, not
  // `canUserResolveThreadCallback`) is NOT gated by these callbacks — during a block those controls
  // stay live and rely on the backend `(SR_EDIT_BLOCKED)` rejection surfaced as the shared "editing
  // paused" notice (click-then-paused, no data harm). The write handlers above additionally catch
  // that rejection as defense-in-depth. The
  // deny-while-blocked / pass-through-when-not decision itself lives in
  // gateCommentWriteCapabilities (unit tested in comment-list-capability-gating.util.test.ts); this
  // component only memoizes the result so unrelated re-renders don't churn the props CommentList
  // sees.
  const gatedCapabilities = useMemo(
    () =>
      gateCommentWriteCapabilities(isSyncBlocked, {
        canUserAddCommentToThread,
        canUserAssignThreadCallback,
        canUserResolveThreadCallback,
        canUserEditOrDeleteCommentCallback,
      }),
    [
      isSyncBlocked,
      canUserAddCommentToThread,
      canUserAssignThreadCallback,
      canUserResolveThreadCallback,
      canUserEditOrDeleteCommentCallback,
    ],
  );

  return (
    <>
      <CommentListPanel
        localizedStrings={localizedStrings}
        isLoading={isLoadingCommentThreads || !commentsPdp || isAwaitingCurrentUserName}
        threads={visibleCommentThreads}
        currentUser={currentUserName}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        scopeFilter={scopeFilter}
        onScopeFilterChange={handleScopeFilterChange}
        // While an automatic Send/Receive is syncing this project, show a slim "editing paused"
        // notice and disable the write affordances (via the gated capability callbacks below).
        isSyncBlocked={isSyncBlocked}
        // The active preset needs the current user's name (see `presetRequiresCurrentUser`) but the
        // registration-data fetch has failed -- show an explanatory message with a retry action
        // instead of leaving the panel on skeletons forever.
        currentUserNameUnavailable={currentUserNameUnavailable}
        onRetryFetchCurrentUserName={fetchCurrentUserName}
        handleAddCommentToThread={handleAddCommentToThread}
        handleUpdateComment={handleUpdateComment}
        handleDeleteComment={handleDeleteComment}
        handleReadStatusChange={handleReadStatusChange}
        assignableUsers={assignableUsers}
        canUserAddCommentToThread={gatedCapabilities.canUserAddCommentToThread}
        canUserAssignThreadCallback={gatedCapabilities.canUserAssignThreadCallback}
        canUserResolveThreadCallback={gatedCapabilities.canUserResolveThreadCallback}
        canUserEditOrDeleteCommentCallback={gatedCapabilities.canUserEditOrDeleteCommentCallback}
        selectedThreadId={selectedThreadId}
        onSelectedThreadChange={setSelectedThreadId}
        onVerseRefClick={handleVerseRefClick}
        conflictResolution={conflictResolution}
        drafts={drafts}
        onDraftChange={handleDraftChange}
      />
      <Sonner />
    </>
  );
};
