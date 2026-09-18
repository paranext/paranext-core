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
import type { CommentFilterSelection, LegacyCommentThreadSelector } from 'legacy-comment-manager';
import { CommentListWebViewMessage } from './comment-list-messages.model';
import { CommentListPanel, COMMENT_LIST_PANEL_EXTRA_STRING_KEYS } from './comment-list.component';
import {
  applyFilterOverrides,
  buildCommentThreadSelector,
  CommentFilters,
  DEFAULT_COMMENT_FILTERS,
  DEFAULT_SCOPE_FILTER,
  isCommentPreset,
  isScopeFilter,
  ScopeFilter,
  scopeFieldsUsed,
} from './comment-list-filters.model';
import {
  CurrentCommentListView,
  resolveSetFiltersMessage,
} from './comment-list-web-view-message.util';
import type { CommentListScrollTarget } from './comment-list-scroll.utils';
import { useBcvSyncScroll } from './use-bcv-sync-scroll.hook';
import { COMMENT_LIST_PANEL_WEB_VIEW_TYPE } from './comment-list-panel.utils';
import { isSyncEditBlockedError, notifySyncEditBlocked } from './sync-edit-blocked.util';
import { gateCommentWriteCapabilities } from './comment-list-capability-gating.util';

const DEFAULT_LEGACY_COMMENT_THREADS: LegacyCommentThread[] = [];

/**
 * Placeholder returned by the `UserCommentFilters` hook before the stored selection has loaded.
 * Never shown to the user: the panel stays in its loading state (see `isLoading` below) until the
 * real value arrives, so this value's contents don't matter beyond satisfying the hook's type.
 */
const LOADING_USER_COMMENT_FILTERS: CommentFilterSelection = {
  dataVersion: '',
  preset: DEFAULT_COMMENT_FILTERS.preset,
  scopeFilter: DEFAULT_SCOPE_FILTER,
};

/**
 * Narrows a stored comment-filter selection's preset and scope to values this build recognizes. The
 * C# provider deliberately does not validate either field on write (the preset/scope sets live in
 * TypeScript), so a blank value or one written by a newer build passes through the round trip
 * unchanged. This is the ONLY place a stored selection's preset/scope are read — every other axis
 * value in this component is already known-valid (from the panel's own controls or a same-process
 * `setFilters` message) — so resolving it here keeps an unrecognized value from ever reaching
 * `buildCommentThreadSelector`, whose preset switch throws outside its closed set.
 */
function narrowStoredSelection(selection: CommentFilterSelection): CurrentCommentListView {
  return {
    filters: {
      preset: isCommentPreset(selection.preset) ? selection.preset : DEFAULT_COMMENT_FILTERS.preset,
    },
    scopeFilter: isScopeFilter(selection.scopeFilter)
      ? selection.scopeFilter
      : DEFAULT_SCOPE_FILTER,
  };
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
  const [initialFilters, setInitialFilters] = useWebViewState<Partial<CommentFilters> | undefined>(
    'initialFilters',
    undefined,
  );
  const [initialScopeFilter, setInitialScopeFilter] = useWebViewState<ScopeFilter | undefined>(
    'initialScopeFilter',
    undefined,
  );

  // A brand-new view's requested override (e.g. the S/R conflict link), captured once on mount —
  // before the one-shot-seed effect below clears it — so the hydration effect can still read it
  // after the stored selection finishes loading. `undefined` means this view opened plain, so
  // hydration below should follow the user's stored selection instead.
  const initialOverrideRef = useRef<CurrentCommentListView | undefined>(
    initialFilters !== undefined || initialScopeFilter !== undefined
      ? {
          filters: applyFilterOverrides(initialFilters),
          scopeFilter: initialScopeFilter ?? DEFAULT_SCOPE_FILTER,
        }
      : undefined,
  );

  // Plain useState, hydrated once (see the effect below) from either the mount-time override above
  // or this user's stored selection for this project — never from useWebViewState, since a filter
  // selection is now a per-user, per-project preference the C# provider persists, not per-view UI
  // state. Holding it in local state (rather than deriving it every render from the PDP hook's
  // value) is what lets a `setFilters` message or a panel change show immediately without waiting
  // on the write's round trip, and what lets a `setFilters` message override the display without
  // that override ever reaching the stored selection.
  const [filters, setFilters] = useState<CommentFilters>(
    () => initialOverrideRef.current?.filters ?? DEFAULT_COMMENT_FILTERS,
  );
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>(
    () => initialOverrideRef.current?.scopeFilter ?? DEFAULT_SCOPE_FILTER,
  );

  /**
   * Latest applied filters/scope, readable from the stable message listener without re-subscribing
   * it. Lets an incoming `setFilters` message compare against the view's current values so a
   * same-value re-send (see `resolveSetFiltersMessage`) can skip the `useState` setter entirely
   * instead of minting a new-but-equal `CommentFilters` object.
   *
   * EVERY path that changes the view writes this ref synchronously — the message handler below, the
   * panel's own change handlers, and the stored-selection hydration effect alike. The sync effect
   * only lands after a render, and a buffered burst of messages (or a message arriving on the heels
   * of a panel change) happens with no render in between: whatever comes next would compare against
   * the state from before, and a real change that happens to equal that stale snapshot would be
   * skipped for good. The effect stays as the backstop that folds in any state change reaching this
   * component another way.
   */
  const currentViewRef = useRef<CurrentCommentListView>({ filters, scopeFilter });
  useEffect(() => {
    currentViewRef.current = { filters, scopeFilter };
  }, [filters, scopeFilter]);

  // Consume the one-shot seed exactly once. The ref above already captured it synchronously on
  // first render, so clear it from persistent web view state now. Otherwise an in-session remount
  // that re-runs this component (e.g. dragging the tab to another dock region) would re-read the
  // stale seed and snap the user's live filter changes back to the original programmatic request.
  useEffect(() => {
    if (initialFilters !== undefined) setInitialFilters(undefined);
    if (initialScopeFilter !== undefined) setInitialScopeFilter(undefined);
  }, [initialFilters, initialScopeFilter, setInitialFilters, setInitialScopeFilter]);

  const commentsPdp = useProjectDataProvider('legacyCommentManager.comments', projectId);

  const [userCommentFiltersPossiblyError, setUserCommentFilters, isLoadingUserCommentFilters] =
    useProjectData('legacyCommentManager.comments', projectId).UserCommentFilters(
      undefined,
      LOADING_USER_COMMENT_FILTERS,
    );

  const storedUserCommentFilters = useMemo<CommentFilterSelection>(() => {
    if (isPlatformError(userCommentFiltersPossiblyError)) {
      logger.warn(
        `Error getting the stored comment filter selection: ${getErrorMessage(userCommentFiltersPossiblyError)}`,
      );
      return LOADING_USER_COMMENT_FILTERS;
    }
    return userCommentFiltersPossiblyError;
  }, [userCommentFiltersPossiblyError]);

  /**
   * Whether `filters`/`scopeFilter` are ready to show: either a mount-time override (see
   * `initialOverrideRef`) already fixed them with no need to wait on storage, or this user's stored
   * selection has resolved and been applied below. Gates whether `CommentListPanel` mounts at all
   * (see the render below) rather than folding into its `isLoading` prop: the panel deliberately
   * keeps its filter toolbar mounted across `isLoading` transitions (a query resubscribe briefly
   * flips it true) so a control the user is mid-interaction with never unmounts under them —
   * folding hydration into that same flag would make the toolbar mount showing the pre-hydration
   * defaults and then swap, exactly the flash this is meant to prevent. Not rendering the panel at
   * all until hydrated means it only ever mounts already showing the right values, and never needs
   * to un-flip afterward — `isHydrated` goes false→true exactly once per view and never back.
   */
  const [isHydrated, setIsHydrated] = useState(() => initialOverrideRef.current !== undefined);

  /**
   * Hydrates `filters`/`scopeFilter` from this user's stored selection the first time it resolves.
   * Skipped entirely when a mount-time override already seeded them (`isHydrated` starts `true` in
   * that case) — matching how a later `setFilters` message overrides the display without
   * persisting, a programmatic open's initial values win over the stored selection too. Runs once:
   * after hydration, `filters`/`scopeFilter` are driven only by the panel's own changes and by
   * messages, never passively re-synced from a later provider update, so a change this view just
   * made or was told to show is never clobbered by a stale read racing behind it.
   */
  useEffect(() => {
    if (isHydrated || isLoadingUserCommentFilters) return;
    const restored = narrowStoredSelection(storedUserCommentFilters);
    setFilters(restored.filters);
    setScopeFilter(restored.scopeFilter);
    currentViewRef.current = restored;
    setIsHydrated(true);
  }, [isHydrated, isLoadingUserCommentFilters, storedUserCommentFilters]);

  // Fetch current user's registration data on mount
  useEffect(() => {
    let isMounted = true;
    const fetchRegistrationData = async () => {
      try {
        const registrationData = await papi.commands.sendCommand(
          'paratextRegistration.getParatextRegistrationData',
        );
        if (isMounted) {
          setCurrentUserName(registrationData.name);
        }
      } catch (error) {
        logger.error('Failed to fetch registration data:', error);
      }
    };
    fetchRegistrationData();
    return () => {
      isMounted = false;
    };
  }, []);

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

  // These presets filter on the current user, and an empty assignedTo means "unassigned" to the
  // provider — so hold the loading state rather than querying with a blank name.
  const isAwaitingCurrentUserName =
    (filters.preset === 'unresolved-assigned-to-me' ||
      filters.preset === 'unread-assigned-to-me') &&
    !currentUserName;

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

  const safeCommentThreads = useMemo<LegacyCommentThread[]>(() => {
    if (!commentThreads || isPlatformError(commentThreads)) return [];
    return commentThreads;
  }, [commentThreads]);

  // Mirror the loaded threads into the ref the stable message listener reads.
  useEffect(() => {
    commentThreadsRef.current = safeCommentThreads;
  }, [safeCommentThreads]);

  /**
   * Writes the whole selection to this user's stored preference for this project, preserving
   * `dataVersion` exactly as last read — only the provider stamps a version, and only on a write it
   * accepts. Used by the panel's own change handlers below; a `setFilters` message never calls
   * this, which is what keeps a programmatic override from persisting past the view that requested
   * it.
   */
  const persistUserCommentFilters = useCallback(
    (selection: CurrentCommentListView) => {
      if (!setUserCommentFilters) {
        logger.debug('Comments PDP is not yet available for setUserCommentFilters');
        return;
      }
      setUserCommentFilters({
        dataVersion: storedUserCommentFilters.dataVersion,
        preset: selection.filters.preset,
        scopeFilter: selection.scopeFilter,
      }).catch((error) =>
        logger.error(`Failed to save the comment filter selection: ${getErrorMessage(error)}`),
      );
    },
    [setUserCommentFilters, storedUserCommentFilters.dataVersion],
  );

  /** Apply a filter change the user made in the panel — see {@link currentViewRef} for the ref */
  const handleFiltersChange = useCallback(
    (newFilters: CommentFilters) => {
      currentViewRef.current = { ...currentViewRef.current, filters: newFilters };
      setFilters(newFilters);
      persistUserCommentFilters(currentViewRef.current);
    },
    [persistUserCommentFilters],
  );

  /** Apply a scope change the user made in the panel — see {@link currentViewRef} for the ref */
  const handleScopeFilterChange = useCallback(
    (newScopeFilter: ScopeFilter) => {
      currentViewRef.current = { ...currentViewRef.current, scopeFilter: newScopeFilter };
      setScopeFilter(newScopeFilter);
      persistUserCommentFilters(currentViewRef.current);
    },
    [persistUserCommentFilters],
  );

  const isViewVisible = useViewVisibility();

  // Performs the DOM scroll for a computed sync-scroll target. The hook computes WHERE to scroll;
  // this web view owns the DOM knowledge (both element ids come from platform-bible-react's
  // CommentList).
  const scrollToTarget = useCallback(
    (target: NonNullable<CommentListScrollTarget>, behavior: ScrollBehavior) => {
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
    commentThreads: safeCommentThreads,
    scrollToTarget,
  });

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
        threadElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    [recordSelfInitiatedNavigation],
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
        // A setFilters message deterministically specifies the whole view, exactly like a mount-
        // time override — mark hydrated so a stored-selection read still pending when this message
        // arrives (a reuse hit whose view hasn't finished loading yet) cannot later overwrite what
        // this message just showed. Unconditional (not gated on the changed flags above) because
        // the message still "applies" a definite view even when it happens to match the pre-
        // hydration placeholder values. Once already hydrated this is a no-op — `setIsHydrated`
        // bails out on an unchanged value — so an ordinary post-hydration message behaves exactly
        // as before.
        setIsHydrated(true);
      }
    };

    window.addEventListener('message', messageListener);
    return () => {
      window.removeEventListener('message', messageListener);
    };
    // setFilters, setScopeFilter, and setIsHydrated are stable useState setters (the linter treats
    // them as stable, so all three are omitted).
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
      {/* Held until `isHydrated` (see its doc above) — never mounted with the pre-hydration
          defaults, so the toolbar cannot flash them before swapping to the stored selection. */}
      {isHydrated && (
        <CommentListPanel
          localizedStrings={localizedStrings}
          isLoading={isLoadingCommentThreads || !commentsPdp || isAwaitingCurrentUserName}
          threads={safeCommentThreads}
          currentUser={currentUserName}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          scopeFilter={scopeFilter}
          onScopeFilterChange={handleScopeFilterChange}
          // While an automatic Send/Receive is syncing this project, show a slim "editing paused"
          // notice and disable the write affordances (via the gated capability callbacks below).
          isSyncBlocked={isSyncBlocked}
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
        />
      )}
      <Sonner />
    </>
  );
};
