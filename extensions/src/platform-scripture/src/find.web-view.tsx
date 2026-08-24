import { WebViewProps } from '@papi/core';
import papi, { logger, network } from '@papi/frontend';
import {
  useData,
  useDataProvider,
  useLocalizedStrings,
  useProjectData,
  useProjectDataProvider,
  useProjectSetting,
  useSetting,
  useWebViewController,
} from '@papi/frontend/react';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  Scope,
  SCOPE_SELECTOR_STRING_KEYS,
  sonner,
  useEvent,
  usePromise,
  useRunWhenVisible,
  useViewVisibility,
} from 'platform-bible-react';
import { getAvailableBookIds, ProjectSelectorOpenTab } from 'platform-bible-react/experimental';
import {
  debounce,
  DEBOUNCE_CANCELED_ERROR_MESSAGE,
  DebouncedFunction,
  formatReplacementString,
  getErrorMessage,
  groupBy,
  isPlatformError,
  LocalizeKey,
  Mutex,
  normalizeProjectId,
  ScrollGroupId,
  UnsubscriberAsync,
} from 'platform-bible-utils';
import { BOOKS_PRESENT_DEFAULT } from 'platform-bible-utils/experimental';
import {
  FindJobStatus,
  FindJobStatusReport,
  FindOptions,
  FindScope,
  WordRestriction,
} from 'platform-scripture';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Find, FIND_LOCALIZED_STRING_KEYS, FindProject } from './find/find.component';
import { FIND_FOCUS_SEARCH_EVENT } from './find.model';
import { useFocusSearchOnInvoke } from './find/use-focus-search-on-invoke.hook';
import {
  applyPreserveCase,
  armBoundedWait,
  callControllerSafely,
  classifyPollAttempt,
  GIVE_UP_AFTER_MS,
  gateStartSearch,
  isDifferentProjectSelection,
  isFindQueryValid,
  isSimpleInterfaceMode,
  POLL_INTERVAL_MS,
  prunePresentBookIds,
  resolveScrollGroupForPickedProject,
  resolveSelectedProjectScrollGroup,
} from './find/find.utils';
import {
  STRUCTURE_PROTECTED_ERROR,
  replacementContainsStructuralMarker,
} from './find/structure-protection.util';
import { LocalizedBookData, SearchTextType } from './find/find-types';
import {
  HidableFindResult,
  SEARCH_RESULT_LOCALIZED_STRING_KEYS,
} from './find/search-result.component';
import { DEFAULT_REPLACE_PREVIEW_OPTIONS, PreviewOptions } from './find/replace-preview-types';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './scripture-editor-web-view-type.const';
import { useOpenProjectTabs } from './hooks/use-open-project-tabs';
import { useFindSearchTriggers } from './find/use-find-search-triggers.hook';

// Strings used by the webview's own replace / version-history-commit / toast logic, in addition to
// the strings the presentational Find component needs (FIND_LOCALIZED_STRING_KEYS).
const WEB_VIEW_LOCALIZED_STRINGS: LocalizeKey[] = [
  '%versionHistoryCommit_beforeReplace%',
  '%versionHistoryCommit_beforeReplace_failureMessage%',
  '%versionHistoryCommit_afterReplace%',
  '%webView_find_findInProject%',
  '%webView_find_project_unavailableError%',
  '%webView_find_replacedOneOccurrence%',
  '%webView_find_replacedNOccurrences%',
  '%webView_find_replacementReverted%',
  '%webView_find_searchInterruptedError%',
];

const LOCALIZED_STRINGS: LocalizeKey[] = [
  ...FIND_LOCALIZED_STRING_KEYS,
  ...WEB_VIEW_LOCALIZED_STRINGS,
];

const RESULTS_BATCH_SIZE = 100;
const SEARCH_DEBOUNCE_DELAY_MS = 500;
/** Delay after typing stops before the current search term is saved to history. */
const HISTORY_DEBOUNCE_DELAY_MS = 5000;
/** Stable empty-array reference so the History data subscription's default doesn't change identity. */
const DEFAULT_RECENT_SEARCHES: string[] = [];

/**
 * Web-view types that should count as "open" project tabs for the project picker's "Open Tabs"
 * grouping. Mirrors `checks-side-panel.web-view.tsx` / `manage-books.web-view.tsx`: only the
 * scripture editor binds a project to a scroll group in a user-meaningful way. Without this filter,
 * every project-bound web view (including this Find panel itself) would falsely mark a project as
 * open.
 */
const SCRIPTURE_EDITOR_WEB_VIEW_TYPES = new Set<string>(['platformScriptureEditor.react']);

/** Short and full names for every scripture project/resource, keyed by canonical project id. */
type ProjectNamesById = { [id: string]: Pick<FindProject, 'shortName' | 'fullName'> };

/**
 * Gets the short and full names of a project from its ID. Kept in the webview (not the shared,
 * `@papi`-free utils) so the utils stay importable by the presentational component and its story.
 */
async function getProjectNames(
  projectId: string,
): Promise<Pick<FindProject, 'shortName' | 'fullName'>> {
  const pdp = await papi.projectDataProviders.get('platform.base', projectId);
  const projectShortName = await pdp.getSetting('platform.name');
  const projectFullName = await pdp.getSetting('platform.fullName');
  return { shortName: projectShortName, fullName: projectFullName };
}

/**
 * Returns a promise that resolves after `ms` milliseconds. The cancel function stored in
 * `cancelRef` resolves the promise early; the resolved value is `true` when cancelled, `false` when
 * the timeout elapsed naturally. Callers must clear `cancelRef.current` after awaiting.
 */
function cancellableDelay(
  ms: number,
  cancelRef: { current: { cancel: () => void } | undefined },
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const timeoutId = setTimeout(() => resolve(false), ms);
    // We must write to cancelRef.current to expose the cancel function to the caller, which is the
    // intended API of this function. The ref object itself is not reassigned.
    // eslint-disable-next-line no-param-reassign
    cancelRef.current = {
      cancel: () => {
        clearTimeout(timeoutId);
        resolve(true);
      },
    };
  });
}

async function revertBookSnapshots(
  snapshots: Map<string, string>,
  pdp: { setBookUSFM: (verseRef: SerializedVerseRef, usfm: string) => Promise<unknown> },
): Promise<boolean> {
  let allRevertedSuccessfully = true;
  await Promise.all(
    [...snapshots].map(async ([bookId, snapshot]) => {
      try {
        await pdp.setBookUSFM({ book: bookId, chapterNum: 1, verseNum: 0 }, snapshot);
      } catch (revertError) {
        allRevertedSuccessfully = false;
        logger.error(`Error reverting replace for book ${bookId}: ${getErrorMessage(revertError)}`);
      }
    }),
  );
  return allRevertedSuccessfully;
}

global.webViewComponent = function FindWebView({
  id: webViewId,
  projectId: webViewProjectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
  updateWebViewDefinition,
}: WebViewProps) {
  const [
    verseRefSetting,
    setVerseRefSetting,
    findScrollGroupId,
    setFindScrollGroupId,
    scrollGroupSourceProjectId,
  ] = useWebViewScrollGroupScrRef();

  // The project to search. Normally the tab's own — `openFind` sets it from the trigger (the
  // editor's project, or the resource a reference panel is displaying). The simple-mode layout also
  // seeds a Find tab that carries no projectId at all, so fall back to whichever project is driving
  // this web view's scroll group reference (the Scripture editor, since the provider puts Find in
  // group 0 in simple mode). Without the fallback that seeded tab renders a search box that silently
  // searches nothing until the user's first Ctrl+F. Mirrors the Text Collection tab, which resolves
  // its own default-layout tab the same way.
  const projectId = webViewProjectId ?? scrollGroupSourceProjectId;

  // Each instance needs its own mutex — a module-level mutex would cause operations from one Find
  // panel to block another if two panels are open for different projects simultaneously.
  const findPdpMutex = useRef(new Mutex()).current;
  const [searchTerm, setSearchTerm] = useWebViewState<string>('findSearchTerm', '');
  const [scope, setScope] = useWebViewState<Scope>('findScope', 'book');
  // These three state variables exist solely for the change-detection feature (booksToMonitor /
  // external change detection effect). They are not used for scope display text or
  // query-changed detection.
  const [monitoredScope, setMonitoredScope] = useState<Scope | undefined>();
  const [monitoredVerseRef, setMonitoredVerseRef] = useState<SerializedVerseRef | undefined>(
    undefined,
  );

  const findHistoryProvider = useDataProvider('platformScripture.findHistory');
  // Keep the resolved provider in a ref so writes from unmount cleanup effects go out immediately
  // instead of first awaiting a provider lookup that may not complete before the WebView is destroyed.
  const findHistoryProviderRef = useRef(findHistoryProvider);
  findHistoryProviderRef.current = findHistoryProvider;

  // Subscribe to the shared find history so every find WebView sees the same list and updates made
  // in one WebView automatically appear in the others.
  const [recentSearchesPossiblyError] = useData<'platformScripture.findHistory'>(
    findHistoryProvider,
  ).History(projectId, DEFAULT_RECENT_SEARCHES);
  const recentSearches = isPlatformError(recentSearchesPossiblyError)
    ? DEFAULT_RECENT_SEARCHES
    : recentSearchesPossiblyError;

  // Track the last (project, term) pair written to storage so repeated calls for the same term in
  // the same project (e.g. clicking through results) don't trigger redundant writes.
  const lastPersistedHistoryKeyRef = useRef<string | undefined>(undefined);
  const addToHistory = useCallback(
    (term: string) => {
      if (!term) return;
      // Keyed by PROJECT + term, not term alone. History is stored per project
      // (`addHistoryItem(item, projectId)`), so a term-only guard meant that after switching projects
      // the term that just ran was never recorded under the new project — the guard suppressed the
      // write because the same term had already been persisted under the OLD one.
      const historyKey = `${normalizeProjectId(projectId ?? '')}\u0000${term}`;
      if (historyKey === lastPersistedHistoryKeyRef.current) return;
      lastPersistedHistoryKeyRef.current = historyKey;
      findHistoryProviderRef.current
        ?.addHistoryItem(term, projectId)
        .catch((e) => logger.warn(`Find: failed to save search history: ${getErrorMessage(e)}`));
    },
    [projectId],
  );

  const [lastSearchTermPossiblyError, , isLoadingLastSearchTerm] =
    useData<'platformScripture.findHistory'>(findHistoryProvider).LastSearchTerm(projectId, '');
  const lastSearchTermStorage = isPlatformError(lastSearchTermPossiblyError)
    ? ''
    : lastSearchTermPossiblyError;

  const [selectedBookIds, setSelectedBookIds] = useWebViewState<string[]>(
    'findSelectedBookIds',
    [],
  );
  const [monitoredBookIds, setMonitoredBookIds] = useState<string[]>([]);
  const [shouldMatchCase, setShouldMatchCase] = useWebViewState<boolean>(
    'findShouldMatchCase',
    false,
  );
  const [searchTextType, setSearchTextType] = useWebViewState<SearchTextType>(
    'findSearchTextType',
    'all',
  );
  const [wordRestriction, setWordRestriction] = useWebViewState<WordRestriction>(
    'findWordRestriction',
    'none',
  );
  const [isRegexAllowed, setIsRegexAllowed] = useWebViewState<boolean>('findIsRegexAllowed', false);

  const [activeMode, setActiveMode] = useWebViewState<'find' | 'replace'>('findActiveMode', 'find');
  // Replace is a power-mode-only capability. In simple interface mode we hide the find/replace
  // toggle and keep the panel in find mode. Defaults to 'simple' while the setting loads, so the
  // toggle stays hidden until we know the mode is 'power' (fail-safe — see isSimpleInterfaceMode).
  const [interfaceModePossiblyError] = useSetting('platform.interfaceMode', 'simple');
  const isSimpleMode = useMemo(
    () => isSimpleInterfaceMode(interfaceModePossiblyError),
    [interfaceModePossiblyError],
  );
  // If the user was left in replace mode (persisted from power mode) and the interface switches to
  // simple, coerce back to find so the internal replace-gating effects below also see find mode.
  useEffect(() => {
    if (isSimpleMode && activeMode === 'replace') setActiveMode('find');
  }, [isSimpleMode, activeMode, setActiveMode]);
  const [replaceTerm, setReplaceTerm] = useWebViewState<string>('findReplaceTerm', '');
  const [preserveCase, setPreserveCase] = useWebViewState<boolean>('findPreserveCase', false);
  const [storedPreviewOptions, setStoredPreviewOptions] = useWebViewState<PreviewOptions>(
    'findPreviewOptions',
    DEFAULT_REPLACE_PREVIEW_OPTIONS,
  );
  // Spread-merge with defaults so adding new fields in future versions doesn't break stored values
  // that were saved before those fields existed.
  const previewOptions = useMemo(
    () => ({ ...DEFAULT_REPLACE_PREVIEW_OPTIONS, ...storedPreviewOptions }),
    [storedPreviewOptions],
  );
  /**
   * True while a replace operation is executing (including the mandatory re-find afterward). Keeps
   * replace buttons disabled during the gap between replace() completing and searchStatus becoming
   * 'running', preventing the user from replacing with already-stale positions.
   */
  const [isReplacing, setIsReplacing] = useState(false);
  /**
   * True when the current search was automatically triggered after a replace operation. Used to
   * suppress the progress bar in replace mode — after replacing, a re-search is mandatory to
   * refresh result positions, but showing a progress indicator for that invisible housekeeping
   * search would be confusing to the user, but want the progress bar to appear on searches after
   * that one.
   */
  const [isPostReplaceSearch, setIsPostReplaceSearch] = useState(false);
  const isPostReplaceSearchRef = useRef(false);
  const [activeJobId, setActiveJobId] = useState<string>();
  const [searchProgress, setSearchProgress] = useState<number>(0);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState<number>(0);
  const [searchStatus, setSearchStatus] = useState<FindJobStatus | undefined>(undefined);
  const [searchError, setSearchError] = useState<string | undefined>();

  const [results, setResults] = useState<HidableFindResult[]>([]);
  const resultsRef = useRef<HidableFindResult[]>([]);
  resultsRef.current = results;
  const loadedResultsLengthRef = useRef(0);
  const [numberOfHiddenResults, setNumberOfHiddenResults] = useState<number>(0);
  const [focusedResultIndex, setFocusedResultIndex] = useState<number | undefined>(undefined);

  /**
   * Search results grouped by book. Keys are book IDs and values are search results in that book
   * and their index in the original search results array
   */
  const resultsByBook = useMemo(() => {
    return groupBy(
      results,
      (result) => result.start.verseRef.book,
      (result, _key, index) => ({ result, originalIndex: index }),
    );
  }, [results]);

  // `setFindScrollGroupId` repoints Find's OWN scroll group so it always tracks the scroll group of
  // the editor tab the project selector has chosen (see `handleSelectProjectScrollGroup`). Without
  // that, Find keeps the group it was seeded with at open time
  // (`find.web-view-provider.ts` -> `scrollGroupScrRef: getWebViewOptions.editorScrollGroupId`) and
  // every reference-derived behavior reads the WRONG tab: `findScope` would resolve `Current
  // book`/`Current chapter` against the originating tab's group instead of the selected one, and the
  // `setVerseRefSetting` call on result activation would navigate unrelated editors in that stale
  // group. Keeping the two equal makes both correct by construction and keeps the scroll-group
  // letter in Find's tab toolbar agreeing with the one in the project selector.
  // The returned `scrollGroupId` (index 2) IS read, because the sync is not one-way: in power mode
  // every web view gets a `ScrollGroupSelector` in its tab toolbar
  // (`web-view.component.tsx` -> `isPowerMode ? <ScrollGroupSelector .../>`), so the user can move
  // Find's group from there without touching the picker. A reconciliation effect below pulls that
  // change back into `selectedScrollGroupId`; without it the picker would show a stale group while
  // `findScope`/`verseRefSetting` already resolved against the new one and `targetEditorWebViewId`
  // still pointed at the old tab.
  const [editorWebViewId] = useWebViewState<string | undefined>('editorWebViewId', undefined);

  // #region Project selector

  // Project data loading — fetched for all scripture projects/resources so names/canonical ids are
  // available once a project opens; filtered down to only open ones below. Re-fetched when an open
  // project turns out to be missing from the result (see `projectMetadataGeneration`), so a project
  // created/cloned/downloaded after Find mounted still reaches the picker.
  const [projectMetadataGeneration, setProjectMetadataGeneration] = useState(0);
  const [projectIdsAndNames, isLoadingProjects]: [ProjectNamesById, boolean] = usePromise(
    useCallback(async () => {
      const projectDict: ProjectNamesById = {};

      const allMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['Scripture', 'Paratext'],
      });

      // `allSettled`, NOT `all`. These are independent per-project reads, and `usePromise` has no
      // `.catch` around its factory — so with `all`, one project whose PDP or `platform.name` read
      // rejects would reject the whole batch, the rejection would escape this callback, and neither
      // `setValue` nor `setIsLoading(false)` would ever run: `projectIdsAndNames` would stay `{}`
      // and `isLoadingProjects` stuck `true`, permanently. That state is UNRECOVERABLE here,
      // because the refetch effect and the reassignment effect's canonical-id gate both wait on
      // `isLoadingProjects` — the one path that could retry is gated off by the failure itself. And
      // the batch spans every Scripture/Paratext project, not just open ones, so a single bad
      // project would take out the whole picker. Skip the failures, keep the rest.
      const projectNameResults = await Promise.allSettled(
        allMetadata.map(async (metadata) => ({
          id: metadata.id,
          names: await getProjectNames(metadata.id),
        })),
      );
      projectNameResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          projectDict[result.value.id] = result.value.names;
          return;
        }
        logger.warn(
          `Find: could not read names for project ${allMetadata[index].id}; omitting it from the project picker: ${getErrorMessage(result.reason)}`,
        );
      });

      return projectDict;
      // `projectMetadataGeneration` is an invalidation token, not a value read in the body — bumping
      // it is what re-runs this fetch.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectMetadataGeneration]),
    useMemo(() => ({}), []),
  );

  // Filter to scripture editor tabs only — without this filter, every project-bound web view
  // (e.g. this Find panel itself) would falsely mark a project as "open" in the picker's "Open
  // Tabs" grouping.
  const editorWebViewFilter = useCallback(
    (webView: { webViewType: string }) => SCRIPTURE_EDITOR_WEB_VIEW_TYPES.has(webView.webViewType),
    [],
  );
  const allOpenProjectTabs = useOpenProjectTabs(editorWebViewFilter);
  const noOpenProjects = allOpenProjectTabs.length === 0;

  // Find's project picker only ever lists projects that are open in an editor tab (a project
  // isn't a candidate to search until it's actually open): once a project's last tab closes, the
  // reassignment effect below moves the selection to another open project before this list update
  // even renders. A transient "selected but not listed" gap IS possible while the metadata fetch
  // above is in flight or stale — the refetch effect below and the `isLoadingProjects` gate in the
  // reassignment effect close it rather than letting a half-known list drive the selection.
  const openProjectIds = useMemo(() => {
    const ids = new Set<string>();
    allOpenProjectTabs.forEach((tab) => ids.add(normalizeProjectId(tab.projectId)));
    return ids;
  }, [allOpenProjectTabs]);

  const projects = useMemo<FindProject[]>(
    () =>
      Object.entries(projectIdsAndNames)
        .filter(([id]) => openProjectIds.has(normalizeProjectId(id)))
        .map(([id, names]) => ({ id, ...names })),
    [projectIdsAndNames, openProjectIds],
  );

  // An open editor tab whose project the metadata fetch never returned means the fetch predates the
  // project (created/cloned/downloaded after Find mounted). Re-fetch so it can appear in the picker.
  // Each missing id is recorded before bumping the token so a project that genuinely has no
  // Scripture/Paratext metadata triggers exactly one retry rather than an infinite refetch loop.
  const refetchAttemptedProjectIdsRef = useRef(new Set<string>());
  useEffect(() => {
    if (isLoadingProjects) return;
    const knownProjectIds = new Set(
      Object.keys(projectIdsAndNames).map((id) => normalizeProjectId(id)),
    );
    const missingProjectIds = [...openProjectIds].filter(
      (id) => !knownProjectIds.has(id) && !refetchAttemptedProjectIdsRef.current.has(id),
    );
    if (missingProjectIds.length === 0) return;
    missingProjectIds.forEach((id) => refetchAttemptedProjectIdsRef.current.add(id));
    setProjectMetadataGeneration((generation) => generation + 1);
  }, [isLoadingProjects, projectIdsAndNames, openProjectIds]);

  const projectSelectorOpenTabs = useMemo<ProjectSelectorOpenTab[]>(
    () =>
      allOpenProjectTabs.map((tab) => ({
        projectId: tab.projectId,
        scrollGroupId: tab.scrollGroupId,
      })),
    [allOpenProjectTabs],
  );

  // The specific open tab's scroll group Find currently targets — distinct from `projectId`
  // (which project Find searches) because the same project can be open in more than one tab. Kept
  // in web-view state so a reload / close-reopen resumes the same targeted tab.
  const [selectedScrollGroupId, setSelectedScrollGroupId] = useWebViewState<
    ScrollGroupId | undefined
  >('findSelectedScrollGroupId', undefined);

  // Reconcile a toolbar-driven scroll-group change back into the picker's selection. In power mode the
  // user can change Find's own scroll group from its tab toolbar's `ScrollGroupSelector`, which writes
  // `scrollGroupScrRef` straight into the web view definition and never touches
  // `selectedScrollGroupId`. Pulling it back keeps the picker, `findScope`/`verseRefSetting`, and
  // `targetEditorWebViewId` describing the same tab instead of drifting apart.
  //
  // Skipped when `findScrollGroupId` is `undefined`, which means Find has been DETACHED from any
  // scroll group (an independent ref). There is no group to target then, so overwriting the selection
  // with `undefined` would throw away a still-valid target for no gain.
  useEffect(() => {
    if (findScrollGroupId === undefined) return;
    if (findScrollGroupId === selectedScrollGroupId) return;
    setSelectedScrollGroupId(findScrollGroupId);
  }, [findScrollGroupId, selectedScrollGroupId, setSelectedScrollGroupId]);

  // Set by `handleSelectProjectScrollGroup` (defined below, once `abandonFindJob` exists) and
  // consumed by an effect keyed on `findPdp` once the switch takes effect — see that effect for
  // why a plain "did projectId change" comparison isn't used instead.
  const pendingProjectSwitchRerunRef = useRef(false);

  // Which open editor tab a Find result click should scroll: the exact tab the project selector
  // has selected. Deterministic (not a heuristic) because the reassignment effect below guarantees
  // `(projectId, selectedScrollGroupId)` always names an open tab whenever one exists anywhere.
  // `undefined` only when `noOpenProjects` — nothing to scroll.
  const targetEditorWebViewId = useMemo(() => {
    if (!projectId || selectedScrollGroupId === undefined) return undefined;
    const normalizedProjectId = normalizeProjectId(projectId);
    return allOpenProjectTabs.find(
      (tab) =>
        normalizeProjectId(tab.projectId) === normalizedProjectId &&
        tab.scrollGroupId === selectedScrollGroupId,
    )?.webViewId;
  }, [projectId, selectedScrollGroupId, allOpenProjectTabs]);

  // #endregion

  const editorWebViewController = useWebViewController(
    SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    targetEditorWebViewId,
  );

  const findPdp = useProjectDataProvider('platformScripture.findInScripture', projectId);
  const replacePdp = useProjectDataProvider('platformScripture.replaceWithUsfm', projectId);

  // Whether the SELECTED project's find provider can actually be resolved. Needed because
  // `useProjectDataProvider` cannot express failure: it runs `usePromise` with the default
  // `preserveValue: true` and no `.catch`, so if resolution rejects (e.g. `getMetadataForProject`
  // hitting its `waitForNetworkObject` timeout, or the project not providing the interface),
  // `findPdp` silently keeps the PREVIOUS project's provider while the picker shows the new one —
  // and a subsequent search would run against the old project. `isLoading` can't disambiguate
  // either: an unhandled rejection means it is never cleared, and the hook discards it anyway.
  // This probe is additive rather than a replacement so `useProjectDataProvider` keeps owning
  // `findPdp`'s `onDidDispose` handling; `papi.projectDataProviders.get` resolves the same cached
  // network object, so this is not a second connection. `preserveValue: false` is load-bearing —
  // it is what stops a stale verdict outliving a `projectId` change.
  const [findPdpAvailability] = usePromise<'resolving' | 'ready' | 'unavailable'>(
    useCallback(async () => {
      if (!projectId) return 'unavailable';
      try {
        await papi.projectDataProviders.get('platformScripture.findInScripture', projectId);
        return 'ready';
      } catch (error) {
        logger.warn(
          `Find: could not resolve findInScripture PDP for ${projectId}: ${getErrorMessage(error)}`,
        );
        return 'unavailable';
      }
    }, [projectId]),
    'resolving',
    { preserveValue: false },
  );

  const [isStructureProtectedPossiblyError] = useProjectData(
    'platformScripture.replaceWithUsfm',
    projectId,
  ).IsStructureProtected(undefined, false);

  const isStructureProtected =
    typeof isStructureProtectedPossiblyError === 'boolean'
      ? isStructureProtectedPossiblyError
      : false;

  // Project data provider for USFM Book data — used in Replace mode to detect external edits.
  // Only activated in Replace mode to avoid overhead.
  const usfmBookPdp = useProjectDataProvider(
    'platformScripture.USFM_Book',
    activeMode === 'replace' ? projectId : undefined,
  );

  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));
  // useLocalizedStrings returns a freshly-allocated object on its loading/error branch, so its
  // identity is not stable across renders — reading it via a ref (rather than depending on it
  // directly) keeps the poll effect below from tearing down and resetting its miss counter on an
  // unrelated localization re-render.
  const localizedStringsRef = useRef(localizedStrings);
  localizedStringsRef.current = localizedStrings;

  const [scopeSelectorLocalizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return Array.from(SCOPE_SELECTOR_STRING_KEYS);
    }, []),
  );

  const [searchResultLocalizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return Array.from(SEARCH_RESULT_LOCALIZED_STRING_KEYS);
    }, []),
  );

  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // #region Find history persistence

  // Track the current search term and the latest addToHistory callback in refs so unmount cleanups
  // and timers read fresh values without re-subscribing.
  const searchTermRef = useRef(searchTerm);
  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

  const addToHistoryRef = useRef(addToHistory);
  addToHistoryRef.current = addToHistory;

  const persistLastSearchTerm = useCallback(
    (term: string) => {
      findHistoryProviderRef.current
        ?.setLastSearchTerm(projectId, term)
        .catch((e) =>
          logger.warn(`Find: failed to persist last search term: ${getErrorMessage(e)}`),
        );
    },
    [projectId],
  );
  const persistLastSearchTermRef = useRef(persistLastSearchTerm);
  persistLastSearchTermRef.current = persistLastSearchTerm;

  // Restore the last search term from storage when the webview first loads with an empty field.
  const [searchTermRestored, setSearchTermRestored] = useState(false);
  useEffect(() => {
    if (searchTermRestored) return;
    if (isLoadingLastSearchTerm) return;
    setSearchTermRestored(true);
    if (lastSearchTermStorage && !searchTerm) setSearchTerm(lastSearchTermStorage);
  }, [
    isLoadingLastSearchTerm,
    lastSearchTermStorage,
    searchTerm,
    searchTermRestored,
    setSearchTerm,
  ]);

  // Persist the current search term (debounced) so it survives session restarts.
  const debouncedPersistLastSearchTerm = useRef<DebouncedFunction<(term: string) => void>>(
    debounce((term: string) => persistLastSearchTermRef.current(term), 1000),
  );
  useEffect(() => {
    if (!searchTermRestored) return undefined;
    const debouncedPersist = debouncedPersistLastSearchTerm.current;
    debouncedPersist(searchTerm).catch((error) => {
      const message = getErrorMessage(error);
      if (message !== DEBOUNCE_CANCELED_ERROR_MESSAGE)
        logger.warn(`Error persisting last search term: ${message}`);
    });
    return () => debouncedPersist.cancel();
  }, [searchTerm, searchTermRestored]);

  // Save the search term to storage on unmount (closing the tab or the application).
  useEffect(() => {
    return () => {
      persistLastSearchTermRef.current(searchTermRef.current);
    };
  }, []);

  // Save the search term to history on unmount, and after a period of typing inactivity.
  const addToHistoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    return () => {
      clearTimeout(addToHistoryTimeoutRef.current);
      if (searchTermRef.current) addToHistoryRef.current(searchTermRef.current);
    };
  }, []);
  useEffect(() => {
    clearTimeout(addToHistoryTimeoutRef.current);
    if (searchTerm) {
      addToHistoryTimeoutRef.current = setTimeout(() => {
        addToHistoryRef.current(searchTerm);
      }, HISTORY_DEBOUNCE_DELAY_MS);
    }
    return () => clearTimeout(addToHistoryTimeoutRef.current);
  }, [searchTerm]);

  // Skips the first render of the options-change history effect below so restoring saved options
  // doesn't immediately push the restored term into history.
  const isInitialOptionsRenderRef = useRef(true);

  // #endregion Find history persistence

  // #region Get available books and their localizations

  const [booksPresentPossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.booksPresent',
    BOOKS_PRESENT_DEFAULT,
  );

  const booksPresent: string = useMemo(() => {
    if (isPlatformError(booksPresentPossiblyError)) {
      logger.warn(`Error getting books present: ${getErrorMessage(booksPresentPossiblyError)}`);
      return BOOKS_PRESENT_DEFAULT;
    }
    return booksPresentPossiblyError;
  }, [booksPresentPossiblyError]);

  // Whether the project preserves invisible characters literally in USFM. Forwarded to the result
  // cards so the "Show invisible" preview renders the USFM tilde `~` as a literal tilde (true) vs. an
  // NBSP stand-in (false). Matches the setting the finder PDPE reads for the search itself.
  const [allowInvisibleCharactersPossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.allowInvisibleCharacters',
    false,
  );
  const allowInvisibleCharacters: boolean = isPlatformError(allowInvisibleCharactersPossiblyError)
    ? false
    : allowInvisibleCharactersPossiblyError;

  // Whether the active project can be edited. Replace mutates the project, so it's disabled (with
  // an explanatory tooltip) while this is false; Find itself is read-only and stays unaffected. The
  // `true` third argument is `useProjectSetting`'s own documented default for the platform-level
  // *unset* case, returned once the read resolves and the project simply never overrode the
  // setting — that value is trusted as-is below. Fails closed (matching this extension's other
  // permission-adjacent read in use-checklist.ts) both while still loading and if the read
  // genuinely errors: the safer default for a write-gating permission is to assume not-editable
  // rather than silently allow a mutation before we actually know.
  const [isEditablePossiblyError, , , isEditableLoading] = useProjectSetting(
    projectId,
    'platform.isEditable',
    true,
  );
  const isEditable: boolean =
    isEditableLoading || isPlatformError(isEditablePossiblyError) ? false : isEditablePossiblyError;

  const availableBooksIds = useMemo(() => getAvailableBookIds(booksPresent), [booksPresent]);

  // `selectedBookIds` is persisted per web view, so a project switch can leave it naming books the
  // NEW project doesn't have. The finder engine skips absent books gracefully (see
  // `isScriptureNotFoundError` in the finder PDPE), so this is not a crash — but with
  // `scope === 'selectedBooks'` the search would silently cover fewer books than the checkbox list
  // shows. Prune the selection to what the newly selected project actually has.
  //
  // Guarded on a NON-EMPTY `availableBooksIds`: `booksPresent` sits at `BOOKS_PRESENT_DEFAULT` (all
  // zeros — no books) while `useProjectSetting` resolves for the new project, and pruning against
  // that transient empty set would wipe the entire selection instead of narrowing it. "Don't know
  // the books yet" must not read as "the project has no books".
  //
  // Depends on `selectedBookIds` because `useWebViewState`'s setter takes a value, not an updater.
  // That is safe: `prunePresentBookIds` returns the original array reference when nothing needs
  // removing, so the identity check makes the write conditional and the effect converges after a
  // single prune instead of re-triggering itself.
  useEffect(() => {
    const prunedBookIds = prunePresentBookIds(availableBooksIds, selectedBookIds);
    if (prunedBookIds !== selectedBookIds) setSelectedBookIds(prunedBookIds);
  }, [availableBooksIds, selectedBookIds, setSelectedBookIds]);

  const availableBooksLocalizationKeys = useMemo(() => {
    const keys: `%${string}%`[] = [];
    availableBooksIds.forEach((book) => {
      keys.push(`%LocalizedId.${book}%` as const);
      keys.push(`%Book.${book}%` as const);
    });
    return keys;
  }, [availableBooksIds]);

  const [localizedBookIdsAndShortNames] = useLocalizedStrings(availableBooksLocalizationKeys);

  const localizedBookData = useMemo(() => {
    const data = new Map<string, LocalizedBookData>();
    availableBooksIds.forEach((book) => {
      data.set(book, {
        localizedId: localizedBookIdsAndShortNames[`%LocalizedId.${book}%` as const],
        localizedName: localizedBookIdsAndShortNames[`%Book.${book}%` as const],
      });
    });
    return data;
  }, [availableBooksIds, localizedBookIdsAndShortNames]);

  const isReplacementStructureChanging = useMemo(
    () => replacementContainsStructuralMarker(replaceTerm),
    [replaceTerm],
  );

  // #endregion

  // #region Safe wrappers for findPdp calls to avoid concurrency issues

  const activeJobIdRef = useRef(activeJobId);

  // Keep activeJobIdRef in sync with activeJobId state
  useEffect(() => {
    activeJobIdRef.current = activeJobId;
  }, [activeJobId]);

  const abandonFindJob = useCallback(async () => {
    try {
      return await findPdpMutex.runExclusive(async () => {
        if (!findPdp || !activeJobIdRef.current) return;
        const jobIdToAbandon = activeJobIdRef.current;
        activeJobIdRef.current = undefined;

        try {
          await findPdp.abandonFindJob(jobIdToAbandon);
          if (isMountedRef.current) setActiveJobId(undefined);
        } catch (error) {
          logger.error(`Error abandoning find job: ${getErrorMessage(error)}`);
        }
      });
    } catch (error) {
      logger.error(`Error acquiring mutex to abandon find job: ${getErrorMessage(error)}`);
    }
  }, [findPdp, findPdpMutex, setActiveJobId]);

  // Switching projects mutates `projectId` in place (matching `checks-side-panel.web-view.tsx`)
  // rather than reloading the panel: `papi.webViews.reloadWebView`'s options type from inside a
  // web view (`@papi/frontend`) is deliberately narrow and does not accept provider-specific
  // fields like `projectId` — that richer form only exists extension-host-side, where `openFind`
  // uses it. Unlike Checks' `checkAggregator` (a single non-project-scoped provider), Find's job
  // lives on a project-scoped PDP (`useProjectDataProvider(..., projectId)`), so switching
  // `projectId` swaps `findPdp` to a fresh provider instance. `abandonFindJob` is called here,
  // BEFORE `updateWebViewDefinition` propagates the new `projectId`, so its closure still holds
  // the OLD `findPdp` and can actually reach the in-flight job — once `projectId` changes, no
  // callback in this component can reach the old PDP anymore.
  const handleSelectProjectScrollGroup = useCallback(
    (newProjectId: string, newScrollGroupId: ScrollGroupId) => {
      // Case-INSENSITIVE so a casing-only correction (canonical UPPERCASE replacing the lowercased
      // id `useOpenProjectTabs` reports) is not mistaken for a project switch — that would abandon
      // the job, clear results and re-search a project the user never left. See the helper's TSDoc.
      if (isDifferentProjectSelection(newProjectId, projectId)) {
        abandonFindJob();
        setResults([]);
        loadedResultsLengthRef.current = 0;
        setNumberOfHiddenResults(0);
        setFocusedResultIndex(undefined);
        setSearchStatus(undefined);
        setSearchError(undefined);
        setSearchProgress(0);
        pendingProjectSwitchRerunRef.current = true;
      }
      // Propagated whenever the string differs at all, so a casing-only correction still lands in
      // the web view definition (keeping `findPdp` keyed on the canonical id) without the reset above.
      if (newProjectId !== projectId) updateWebViewDefinition({ projectId: newProjectId });
      setSelectedScrollGroupId(newScrollGroupId);
      // Keep Find's own scroll group equal to the selected tab's group so scope resolution and the
      // result-activation broadcast both act on the tab the user picked. See the
      // `useWebViewScrollGroupScrRef` call site for why this is load-bearing rather than cosmetic.
      setFindScrollGroupId(newScrollGroupId);
    },
    [
      projectId,
      abandonFindJob,
      updateWebViewDefinition,
      setSelectedScrollGroupId,
      setFindScrollGroupId,
    ],
  );

  // Restricting the picker to only open projects means the selection can go stale the instant a
  // tab closes (or, on first mount, before an initial pick has been made at all). Re-resolves
  // whenever the set of open tabs changes and applies the result if it differs from the current
  // selection — reassigning to another open tab of the same project (or, if the whole project
  // closed, to whatever other project is still open) with no user action required. A no-op when
  // the current selection is already valid, or when no projects are open anywhere.
  useEffect(() => {
    if (!projectId) return;
    const resolved = resolveSelectedProjectScrollGroup(
      projectId,
      selectedScrollGroupId,
      allOpenProjectTabs,
      editorWebViewId,
    );
    if (!resolved) return;
    // `resolved.projectId` may carry `useOpenProjectTabs`'s lowercased casing when it names a
    // fallback project (canonical ids are UPPERCASE) — resolve back to the canonical id so
    // `updateWebViewDefinition`/`findPdp` stay keyed consistently.
    const isCrossProjectFallback =
      normalizeProjectId(resolved.projectId) !== normalizeProjectId(projectId);
    // Canonical casing lives in `projects`, which is empty until the metadata fetch resolves. Wait
    // rather than fall back to the lowercased id: writing that into the web view definition keys
    // `findPdp` on a non-canonical id and, once metadata arrives, flips it back — a churn the
    // reassignment is not meant to cause. Only the cross-project branch needs the canonical id; a
    // same-project scroll-group move can proceed immediately.
    if (isCrossProjectFallback && isLoadingProjects) return;
    const canonicalProjectId =
      projects.find(
        (project) => normalizeProjectId(project.id) === normalizeProjectId(resolved.projectId),
      )?.id ?? resolved.projectId;
    if (canonicalProjectId === projectId && resolved.scrollGroupId === selectedScrollGroupId)
      return;
    handleSelectProjectScrollGroup(canonicalProjectId, resolved.scrollGroupId);
  }, [
    projectId,
    selectedScrollGroupId,
    allOpenProjectTabs,
    editorWebViewId,
    projects,
    isLoadingProjects,
    handleSelectProjectScrollGroup,
  ]);

  // Simple interface mode's picker reports only a project id (it shows no scroll groups, because
  // simple mode hides `ScrollGroupSelector` from both toolbars). Resolving which of that project's
  // open tabs to target happens here rather than in the component because `allOpenProjectTabs`
  // carries the `webViewId`s. See `resolveScrollGroupForPickedProject` for why the current
  // selection and the triggering editor are passed through rather than `undefined`.
  const handleSelectProject = useCallback(
    (newProjectId: string) => {
      const resolved = resolveScrollGroupForPickedProject(
        newProjectId,
        selectedScrollGroupId,
        allOpenProjectTabs,
        editorWebViewId,
      );
      if (!resolved) {
        logger.warn(
          `Find: ignoring project selection for ${newProjectId} — it has no open editor tab.`,
        );
        return;
      }
      handleSelectProjectScrollGroup(newProjectId, resolved.scrollGroupId);
    },
    [allOpenProjectTabs, selectedScrollGroupId, editorWebViewId, handleSelectProjectScrollGroup],
  );

  // Required by `ProjectSelector`'s `projectScrollGroup` mode, but unreachable in practice: the
  // picker only ever lists open projects (no "not open" rows) and the reassignment effect above
  // moves the selection away from a pair before its tab-closed state could render a "bound but
  // closed" row either. Kept as a defensive no-op rather than a non-null assertion so a future
  // change to the row-filtering logic fails loudly instead of silently opening tabs.
  const handleOpenProjectInGroup = useCallback(
    (openProjectId: string, openScrollGroupId: ScrollGroupId) => {
      logger.warn(
        `Find: onOpenProjectInGroup unexpectedly called for ${openProjectId}/${openScrollGroupId} — the project picker should only ever list open projects.`,
      );
    },
    [],
  );

  const beginFindJob = useCallback(
    async (findOptions: FindOptions) => {
      try {
        return await findPdpMutex.runExclusive(async () => {
          if (!findPdp) return;

          try {
            const jobId = await findPdp.beginFindJob(findOptions);
            if (isMountedRef.current) setActiveJobId(jobId);
            activeJobIdRef.current = jobId;
          } catch (error) {
            logger.error(`Error beginning find job: ${getErrorMessage(error)}`);
            if (isMountedRef.current) setActiveJobId(undefined);
            activeJobIdRef.current = undefined;
            throw error;
          }
        });
      } catch (error) {
        logger.error(`Error acquiring mutex to begin find job: ${getErrorMessage(error)}`);
      }
    },
    [findPdp, findPdpMutex, setActiveJobId],
  );

  const stopFindJob = useCallback(async () => {
    try {
      return await findPdpMutex.runExclusive(async () => {
        if (!findPdp || !activeJobIdRef.current) return false;

        try {
          return await findPdp.stopFindJob(activeJobIdRef.current);
        } catch (error) {
          logger.error(`Error stopping find job: ${getErrorMessage(error)}`);
          return false;
        }
      });
    } catch (error) {
      logger.error(`Error acquiring mutex to stop find job: ${getErrorMessage(error)}`);
      return false;
    }
  }, [findPdp, findPdpMutex]);

  const retrieveFindJobUpdate = useCallback(
    async (maxResultsToInclude: number): Promise<FindJobStatusReport | undefined> => {
      try {
        return findPdpMutex.runExclusive(async () => {
          if (!findPdp || !activeJobIdRef.current) return undefined;
          try {
            return await findPdp.retrieveFindJobUpdate(activeJobIdRef.current, maxResultsToInclude);
          } catch (error) {
            logger.error(`Error retrieving find job update: ${getErrorMessage(error)}`);
            return undefined;
          }
        });
      } catch (error) {
        logger.error(
          `Error acquiring mutex to retrieve find job update: ${getErrorMessage(error)}`,
        );
        return undefined;
      }
    },
    [findPdp, findPdpMutex],
  );

  // #endregion

  // #region Search related functions

  // Deliberately the PURE query rule (term + scope/books) and nothing else: `Find` derives its own
  // copy from the same `isFindQueryValid` helper to drive its results-area placeholder, and the two
  // must not drift. The "don't search through an unresolved provider" guard that used to live here
  // moved into `gateStartSearch`'s `hasPdp` argument below, which is the input that actually governs
  // whether a job may start.
  const isSearchQueryValid = useMemo(
    () => isFindQueryValid({ searchTerm, scope, selectedBookIds }),
    [scope, searchTerm, selectedBookIds],
  );

  // Surface an unresolvable provider through the existing error path instead of leaving the panel
  // looking idle. The ref tracks whether the displayed error is OURS, so recovery only clears the
  // message this effect set and never wipes a real find-job error.
  const isShowingPdpUnavailableErrorRef = useRef(false);
  useEffect(() => {
    if (findPdpAvailability === 'unavailable') {
      isShowingPdpUnavailableErrorRef.current = true;
      setSearchStatus('errored');
      setSearchError(localizedStrings['%webView_find_project_unavailableError%']);
      return;
    }
    if (findPdpAvailability === 'ready' && isShowingPdpUnavailableErrorRef.current) {
      isShowingPdpUnavailableErrorRef.current = false;
      setSearchStatus(undefined);
      setSearchError(undefined);
    }
  }, [findPdpAvailability, localizedStrings]);

  const findScope = useMemo((): FindScope[] => {
    switch (scope) {
      case 'chapter':
        return [{ bookId: verseRefSetting.book, chapter: verseRefSetting.chapterNum }];
      case 'book':
        return [{ bookId: verseRefSetting.book }];
      case 'selectedBooks':
        return selectedBookIds.map((bookId) => ({ bookId }));
      default:
        throw new Error(`Unsupported scope: ${scope}`);
    }
  }, [scope, selectedBookIds, verseRefSetting]);

  /**
   * A stable string key capturing only the parts of scope/verseRef that affect the search query.
   * Used to trigger auto-search when the user changes scope or navigates to a different
   * book/chapter, without spuriously re-searching when clicking a result (which calls
   * setVerseRefSetting but stays within the already-searched book/chapter).
   */
  const relevantScopeKey = useMemo(() => {
    if (scope === 'selectedBooks') return `selectedBooks:${selectedBookIds.join(',')}`;
    if (scope === 'book') return `book:${verseRefSetting.book}`;
    return `chapter:${verseRefSetting.book}:${verseRefSetting.chapterNum}`;
  }, [scope, selectedBookIds, verseRefSetting.book, verseRefSetting.chapterNum]);

  // When search options change (not the search term itself), add the current term to history — the
  // user is intentionally refining how to search for it.
  useEffect(() => {
    if (isInitialOptionsRenderRef.current) {
      isInitialOptionsRenderRef.current = false;
      return;
    }
    if (searchTermRef.current) addToHistoryRef.current(searchTermRef.current);
  }, [shouldMatchCase, wordRestriction, isRegexAllowed, searchTextType, relevantScopeKey]);

  // Stores a cancel function for a pending replace/replace-all operation (the 1-second window
  // before the re-search fires). Calling it stops the timer and triggers a revert.
  const pendingReplaceRevertRef = useRef<{ cancel: () => void } | undefined>(undefined);

  const isStartingSearchRef = useRef(false);
  // Set when the user explicitly starts a search (Enter/Find button) so the debounce timer that
  // may still be pending from the same keystroke skips its redundant restart.
  const explicitSearchPendingRef = useRef(false);
  // Tracks the index of the result that was just replaced so the auto-select effect can advance
  // focus to the next result instead of jumping back to the first.
  const pendingAdvanceIndexRef = useRef<number | undefined>(undefined);
  // On the initial render, skip the debounce-triggered auto-search only when searchTerm is empty.
  // When searchTerm is non-empty (restored from state), let the search run so results appear on
  // startup. A separate effect handles the case where findPdp isn't ready.
  const isInitialAutoSearchRef = useRef(true);
  // Tracks whether the startup search (for a pre-filled search term) has already been triggered, so
  // the findPdp-readiness effect only fires once. Intentionally never reset: that fallback is a
  // one-shot safety net for mount-time races and should not re-fire on project switch.
  const initialSearchTriggeredRef = useRef(false);
  // Set whenever handleStartSearch bails specifically because findPdp isn't ready (query was
  // otherwise valid). The readiness-retry effect below clears it and retries as soon as findPdp
  // becomes available — covering both a mount-time race and findPdp dropping later during a long
  // idle period, not just the first attempt ever.
  const pendingSearchDesiredRef = useRef(false);
  // Bounds how long a search can sit waiting for findPdp before giving up. Without this, a valid
  // term with findPdp never arriving would show the pending/loading skeleton forever with no
  // error — the same silently-stuck-forever failure the poll loop's own give-up treatment exists
  // to prevent, just one step earlier (before a search job even starts).
  const pendingSearchWaitRef = useRef<{ clear: () => void } | undefined>(undefined);
  const clearPendingSearchTimeout = useCallback(() => {
    pendingSearchWaitRef.current?.clear();
    pendingSearchWaitRef.current = undefined;
  }, []);
  useEffect(() => clearPendingSearchTimeout, [clearPendingSearchTimeout]);

  const handleStartSearch = useCallback(
    async (isExplicitSearch = false) => {
      const gate = gateStartSearch({
        isSearchQueryValid,
        // Availability, not just presence. `findPdp` uses `preserveValue: true`, so right after a
        // project switch it still holds the PREVIOUS project's provider — starting a job then would
        // silently search the wrong project. Treating "resolving" as no-PDP routes it through the
        // gate's retry-when-ready path instead.
        hasPdp: !!findPdp && findPdpAvailability === 'ready',
        isAlreadyStarting: isStartingSearchRef.current,
      });
      if (gate.action === 'skip') {
        if (gate.shouldRetryWhenPdpReady) {
          pendingSearchDesiredRef.current = true;
          clearPendingSearchTimeout();
          pendingSearchWaitRef.current = armBoundedWait(() => {
            pendingSearchWaitRef.current = undefined;
            if (!pendingSearchDesiredRef.current || !isMountedRef.current) return;
            pendingSearchDesiredRef.current = false;
            setSearchStatus('errored');
            setSearchError(localizedStringsRef.current['%webView_find_searchInterruptedError%']);
          }, GIVE_UP_AFTER_MS);
        }
        return;
      }

      const isPostReplace = isPostReplaceSearchRef.current;
      isPostReplaceSearchRef.current = false;

      if (isExplicitSearch) explicitSearchPendingRef.current = true;

      // Set the flag to prevent concurrent calls
      // No mutex is needed here because we're fine throwing away concurrent calls instead of queuing
      // them to execute serially. Rapid button clicking or pressing Enter isn't a use case that needs
      // to be supported since no one could see the search results of all but the final search anyway.
      isStartingSearchRef.current = true;

      try {
        if (isExplicitSearch) addToHistory(searchTerm);

        await abandonFindJob();
        if (!isMountedRef.current) return;

        await beginFindJob({
          scope: findScope,
          searchString: searchTerm,
          caseInsensitive: !shouldMatchCase,
          useRegex: isRegexAllowed,
          verseTextOnly: searchTextType === 'verseOnly',
          wordRestriction,
        });
        if (!isMountedRef.current) return;

        setSearchStatus('running');
        setIsPostReplaceSearch(isPostReplace);
        setSearchError(undefined);
        setSearchProgress(0);

        setMonitoredScope(scope);
        setMonitoredVerseRef(verseRefSetting);
        setMonitoredBookIds(selectedBookIds);

        setFocusedResultIndex(undefined);

        setResults([]);
        loadedResultsLengthRef.current = 0;
        setNumberOfHiddenResults(0);
      } catch (error) {
        logger.error('Error starting search:', error);

        setSearchStatus('errored');
        setSearchProgress(0);

        setMonitoredScope(undefined);
        setMonitoredVerseRef(undefined);
      } finally {
        // Clear the flag regardless of success or failure
        isStartingSearchRef.current = false;
      }
    },
    [
      abandonFindJob,
      addToHistory,
      beginFindJob,
      clearPendingSearchTimeout,
      findPdp,
      findPdpAvailability,
      findScope,
      isRegexAllowed,
      isSearchQueryValid,
      scope,
      searchTerm,
      searchTextType,
      selectedBookIds,
      shouldMatchCase,
      verseRefSetting,
      wordRestriction,
    ],
  );

  const handleStopSearch = useCallback(
    async (shouldClearResults?: boolean) => {
      if (!isMountedRef.current) return;
      setSearchProgress(0);
      if (shouldClearResults) {
        setResults([]);
        loadedResultsLengthRef.current = 0;
        setNumberOfHiddenResults(0);
        setSearchStatus(undefined);
        setSearchError(undefined);
        setFocusedResultIndex(undefined);
        // There is no focused result anymore, so remove the current-result highlight from the editor.
        // The cleanup effect only removes it on controller change / unmount, so clearing (or starting
        // a new search) would otherwise leave a stale amber highlight painted with nothing selected.
        callControllerSafely(() =>
          editorWebViewController?.runAnnotationAction('find-current-result', 'removed'),
        );
        await abandonFindJob();
      } else await stopFindJob();
    },
    [abandonFindJob, stopFindJob, editorWebViewController],
  );

  const loadMoreResults = useCallback(async () => {
    try {
      const update = await retrieveFindJobUpdate(RESULTS_BATCH_SIZE);
      if (!update || !isMountedRef.current) return;
      const newResults = update.nextResults || [];

      if (newResults.length > 0) {
        setResults((prev) => {
          const currentResults = prev || [];
          return [...currentResults, ...newResults];
        });
        loadedResultsLengthRef.current += newResults.length;
      }
    } catch (error) {
      logger.error('Error loading more results:', error);
    }
  }, [retrieveFindJobUpdate]);

  const handleResultsScroll = useCallback(
    async (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      if (scrollPercentage > 0.9 && results.length < totalNumberOfResults) await loadMoreResults();
    },
    [loadMoreResults, results.length, totalNumberOfResults],
  );

  // Effect to poll for search job updates
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isEffectActive = true;
    // Consecutive polls that came back with no update (a transient PDP/connection blip). Reset on
    // any successful update; past MAX_CONSECUTIVE_POLL_MISSES the job is treated as lost rather
    // than left to poll forever with a frozen, stale UI and no feedback.
    let consecutiveMisses = 0;

    const checkForUpdates = async () => {
      // Check if this effect is still active to avoid race conditions
      if (!isEffectActive) return;

      try {
        // classifyPollAttempt distinguishes "no active job right now" (most commonly because a new
        // search's abandonFindJob() already cleared activeJobIdRef synchronously while its PDP
        // round-trip is still in flight) from a genuine miss — collapsing that distinction
        // previously caused a false "search interrupted" error on every ordinary new search.
        const outcome = await classifyPollAttempt({
          hasActiveJob: !!activeJobIdRef.current,
          getUpdate: () => retrieveFindJobUpdate(0),
          consecutiveMisses,
        });
        if (!isEffectActive) return;

        if (outcome.kind === 'noActiveJob') return;

        if (outcome.kind === 'miss') {
          consecutiveMisses = outcome.consecutiveMisses;
          if (outcome.hasExceededRetryLimit) {
            setSearchStatus('errored');
            setSearchError(localizedStringsRef.current['%webView_find_searchInterruptedError%']);
            // Best-effort: we can no longer get updates for this job, so tell the backend to stop
            // running it rather than leaving it tracked with nothing left polling it.
            abandonFindJob().catch((error) =>
              logger.error(
                `Error abandoning find job after giving up on polling: ${getErrorMessage(error)}`,
              ),
            );
            return;
          }
          timeoutId = setTimeout(checkForUpdates, POLL_INTERVAL_MS);
          return;
        }

        // outcome.kind === 'update'
        consecutiveMisses = 0;
        const { update } = outcome;

        setSearchProgress(update.percentComplete);
        setTotalNumberOfResults(update.totalResultsCount);
        setSearchStatus(update.status);
        setSearchError(update.error);

        const loadedCount = loadedResultsLengthRef.current;
        if (loadedCount < RESULTS_BATCH_SIZE && update.totalResultsCount > loadedCount) {
          await loadMoreResults();
          if (!isEffectActive) return;
        }

        // Continue polling if the job is still running and this effect is still active
        if (update.status === 'running' && isEffectActive)
          timeoutId = setTimeout(checkForUpdates, POLL_INTERVAL_MS);
      } catch (error) {
        if (isEffectActive) {
          logger.error(`Error checking search results: ${getErrorMessage(error)}`);
          setSearchStatus('errored');
          // A raw exception message isn't localized or meaningful to the user; show the same
          // generic message the give-up path above shows, and keep the real message in the log.
          setSearchError(localizedStringsRef.current['%webView_find_searchInterruptedError%']);
        }
      }
    };

    // Only start polling if we have an active job
    if (activeJobId) checkForUpdates();

    return () => {
      isEffectActive = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeJobId, loadMoreResults, retrieveFindJobUpdate, abandonFindJob]);

  // #endregion

  // Cleanup function that runs when component unmounts
  useEffect(() => {
    return () => {
      pendingReplaceRevertRef.current?.cancel();
      abandonFindJob();
    };
  }, [abandonFindJob]);

  // #region External scripture change detection for Replace mode

  /**
   * Combined version counter string for all monitored books (bookId:version pairs joined by '|').
   * Updated by subscriptions below. Used to detect external edits while in Replace mode. Uses
   * version counters instead of raw USFM to avoid storing megabytes of scripture text in state.
   */
  const [scriptureDataForChangeDetection, setScriptureDataForChangeDetection] = useState<
    string | undefined
  >(undefined);

  // Determine which books to monitor: all selected books for 'selectedBooks' scope, or the single
  // submitted book for 'book'/'chapter' scope. Only populated after a search has been run.
  const booksToMonitor = useMemo((): string[] => {
    if (!monitoredScope) return [];
    if (monitoredScope === 'selectedBooks') return monitoredBookIds;
    const book = monitoredVerseRef?.book;
    return book ? [book] : [];
  }, [monitoredScope, monitoredBookIds, monitoredVerseRef?.book]);

  // Subscribe to USFM data for every monitored book in Replace mode. When any book's data
  // changes, increment that book's version counter and update `scriptureDataForChangeDetection`
  // so the detection effect below can react. Version counters avoid storing full USFM in state.
  useEffect(() => {
    if (activeMode !== 'replace' || !usfmBookPdp || booksToMonitor.length === 0) {
      setScriptureDataForChangeDetection(undefined);
      return undefined;
    }

    const bookVersionMap = new Map<string, number>();
    const unsubscribers: UnsubscriberAsync[] = [];
    let isEffectActive = true;

    const updateCombined = () => {
      if (!isEffectActive) return;
      const combined = booksToMonitor
        .map((bookId) => `${bookId}:${bookVersionMap.get(bookId) ?? 0}`)
        .join('|');
      setScriptureDataForChangeDetection(combined);
    };

    (async () => {
      await booksToMonitor.reduce(async (prevPromise, bookId) => {
        await prevPromise;
        if (!isEffectActive) return;
        const verseRef = { book: bookId, chapterNum: 1, verseNum: 0 };
        // Subscriptions must be created sequentially so that `isEffectActive` is checked between
        // each one, allowing cleanup to abort early if the effect has been torn down mid-loop.
        // eslint-disable-line no-await-in-loop
        const unsubscriber = await usfmBookPdp.subscribeBookUSFM(
          verseRef,
          (usfm) => {
            if (!isEffectActive) return;
            if (!isPlatformError(usfm))
              bookVersionMap.set(bookId, (bookVersionMap.get(bookId) ?? 0) + 1);
            updateCombined();
          },
          { retrieveDataImmediately: true },
        );
        if (!isEffectActive) {
          unsubscriber().catch((err) =>
            logger.warn(`Error unsubscribing book USFM: ${getErrorMessage(err)}`),
          );
          return;
        }
        unsubscribers.push(unsubscriber);
      }, Promise.resolve());
    })().catch((err) =>
      logger.error(`Error subscribing to book USFM for change detection: ${getErrorMessage(err)}`),
    );

    return () => {
      isEffectActive = false;
      unsubscribers.forEach((unsub) =>
        unsub().catch((err) =>
          logger.warn(`Error unsubscribing book USFM: ${getErrorMessage(err)}`),
        ),
      );
    };
  }, [activeMode, usfmBookPdp, booksToMonitor]);

  /**
   * Baseline scripture data recorded at the time of the last find. `undefined` means no baseline
   * has been set yet for the current Replace mode session. Compared against
   * `scriptureDataForChangeDetection` to detect external edits.
   */
  const scriptureDataBaselineRef = useRef<string | undefined>(undefined);

  // Track a baseline snapshot of the scripture data so we can detect external edits during Replace mode.
  // Reset to undefined when leaving Replace mode, captured on first load or whenever a new search runs.
  useEffect(() => {
    if (activeMode !== 'replace') {
      scriptureDataBaselineRef.current = undefined;
      return;
    }
    if (
      scriptureDataForChangeDetection !== undefined &&
      (scriptureDataBaselineRef.current === undefined || searchStatus === 'running')
    ) {
      scriptureDataBaselineRef.current = scriptureDataForChangeDetection;
    }
  }, [activeMode, searchStatus, scriptureDataForChangeDetection]);

  // Keep handleStartSearch in a ref so the detection effect never re-runs just because the
  // memoized callback identity changed (it has many dependencies).
  const handleStartSearchRef = useRef(handleStartSearch);
  handleStartSearchRef.current = handleStartSearch;
  const debouncedHandleStartSearch = useRef(
    debounce(() => {
      if (explicitSearchPendingRef.current) {
        explicitSearchPendingRef.current = false;
        return;
      }
      handleStartSearchRef.current();
    }, SEARCH_DEBOUNCE_DELAY_MS),
  );

  // Both no-user-input search triggers (project-switch rerun, restore-time fallback) live in this
  // hook so they can be tested across renders — see `use-find-search-triggers.hook.ts` for why that
  // matters and `use-find-search-triggers.hook.test.tsx` for the late-settling-availability cases.
  useFindSearchTriggers({
    findPdp,
    findPdpAvailability,
    searchStatus,
    searchTerm,
    searchTermRef,
    pendingProjectSwitchRerunRef,
    initialSearchTriggeredRef,
    explicitSearchPendingRef,
    startSearch: useCallback((isExplicitSearch: boolean) => {
      handleStartSearchRef.current(isExplicitSearch);
    }, []),
  });

  // Hidden case: auto-searches are deferred, not dropped. In Simple mode Find is a permanent tab
  // bound to the editor's scroll group, so `relevantScopeKey` changes on every book the user moves
  // to (and, under chapter scope, every chapter) whether or not the Find tab is on screen. Left
  // unguarded, each of those launches a full find job into a `display: none` pane: uninterruptible
  // once past its scope boundary, polled at ~10 Hz over JSON-RPC, and pulling a whole book's USJ
  // into an iframe whose result cards then decline to render it (they gate on an
  // `IntersectionObserver` that reports nothing intersecting while hidden). A permanent tab offers no
  // way to opt out of that, either — there is nothing to close. Requests made while hidden collapse
  // into one catch-up that runs when the tab is activated, so the tab still opens showing results for
  // where the user actually is.
  const isViewVisible = useViewVisibility();
  const requestAutoSearch = useRunWhenVisible(isViewVisible, () =>
    debouncedHandleStartSearch.current(),
  );

  // The refs need to start out with null for them to work as element refs
  // eslint-disable-next-line no-null/no-null
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Invoking Find must land the caret in the search box; a plain tab click must not. The hook holds
  // both delivery routes and the hidden-tab deferral — see its docs for why there are two routes and
  // why neither can be a bare `.focus()`.
  const [shouldFocusSearch] = useWebViewState<boolean>('shouldFocusSearch', false);
  const focusSearchInput = useCallback(() => searchInputRef.current?.focus(), []);
  const handleFocusSearchEvent = useFocusSearchOnInvoke({
    webViewId,
    shouldFocusSearch,
    isViewVisible,
    focusSearchInput,
  });
  useEvent(network.getNetworkEvent(FIND_FOCUS_SEARCH_EVENT), handleFocusSearchEvent);

  // Auto-search with debounce when the search term or any filter changes
  useEffect(() => {
    if (isInitialAutoSearchRef.current) {
      isInitialAutoSearchRef.current = false;
      // Only skip the initial auto-search when the field is empty. When searchTerm is non-empty
      // (e.g. restored from state), fall through so results appear immediately on startup.
      if (searchTerm.trim() === '') return undefined;
      initialSearchTriggeredRef.current = true;
    }
    requestAutoSearch();
  }, [
    searchTerm,
    shouldMatchCase,
    wordRestriction,
    isRegexAllowed,
    searchTextType,
    relevantScopeKey,
    requestAutoSearch,
  ]);

  // Readiness retry: if handleStartSearch bailed because findPdp wasn't available (mount-time race,
  // or findPdp dropping later during a long idle period), retry as soon as it becomes available —
  // not just once at mount. Deliberately does NOT gate on searchStatus: pendingSearchDesiredRef is
  // only ever set after a search already ran once and bailed on !findPdp, so by definition any
  // findPdp-driven auto-search debounce that could have raced this retry has already fired — there
  // is nothing left to deduplicate against, so explicitSearchPendingRef is not set here either
  // (setting it unconditionally previously risked swallowing the user's next legitimate keystroke).
  useEffect(() => {
    if (!findPdp || !pendingSearchDesiredRef.current) return;
    pendingSearchDesiredRef.current = false;
    clearPendingSearchTimeout();
    handleStartSearchRef.current();
  }, [findPdp, clearPendingSearchTimeout]);

  // Reset isPostReplaceSearch once the search finishes so a subsequent search in replace mode
  // (e.g. triggered by an external change) is not mistakenly treated as a post-replace search.
  useEffect(() => {
    if (searchStatus !== 'running') setIsPostReplaceSearch(false);
  }, [searchStatus]);

  // When scripture changes externally in Replace mode, auto-re-run find so positions stay fresh.
  useEffect(() => {
    if (activeMode !== 'replace') return;
    if (scriptureDataBaselineRef.current === undefined) return; // No baseline yet
    if (isReplacing || searchStatus === 'running' || searchStatus === undefined) return;
    if (!monitoredScope) return; // No previous search to re-run
    if (scriptureDataForChangeDetection === undefined) return;
    if (scriptureDataForChangeDetection === scriptureDataBaselineRef.current) return;

    // External change detected — update baseline and re-run find to refresh positions
    scriptureDataBaselineRef.current = scriptureDataForChangeDetection;
    handleStartSearchRef.current();
  }, [scriptureDataForChangeDetection, activeMode, isReplacing, searchStatus, monitoredScope]);

  // #endregion

  // Auto-select first result when switching to Replace mode, or advance to the next result
  // after a replace operation instead of jumping back to the first.
  useEffect(() => {
    if (activeMode === 'replace' && results.length > 0 && focusedResultIndex === undefined) {
      if (pendingAdvanceIndexRef.current === undefined) {
        const firstVisibleIndex = results.findIndex((r) => !r.isHidden);
        if (firstVisibleIndex >= 0) setFocusedResultIndex(firstVisibleIndex);
      } else {
        // Wait until the search finishes so all results are available before picking the target.
        if (searchStatus === 'running') return;
        const targetIndex = pendingAdvanceIndexRef.current;
        pendingAdvanceIndexRef.current = undefined;
        // Find the first visible result at or after the replaced position (the replaced result
        // is gone, so this naturally advances to what was previously the next result).
        const nextIndex = results.findIndex((r, i) => i >= targetIndex && !r.isHidden);
        const indexToFocus = nextIndex >= 0 ? nextIndex : results.findIndex((r) => !r.isHidden);
        if (indexToFocus >= 0) setFocusedResultIndex(indexToFocus);
      }
    }
  }, [activeMode, focusedResultIndex, results, searchStatus]);

  // Remove the find-result-highlight annotation when the editor changes or the find panel closes.
  //
  // `callControllerSafely` is load-bearing here, not defensive dressing: this cleanup fires exactly
  // when `editorWebViewController` changes identity, and the most common cause of that is the
  // selected project's editor tab CLOSING — which disposes the controller and revokes its proxy
  // first. Reading `.runAnnotationAction` off it then throws synchronously, and an uncaught throw in
  // an effect cleanup crashes the whole Find web view. Swallowed silently: the editor is already
  // gone, so a failed highlight removal is a no-op with nothing to report.
  useEffect(() => {
    const currentController = editorWebViewController;
    return () => {
      callControllerSafely(
        () => currentController?.runAnnotationAction('find-current-result', 'removed'),
        (e) => logger.warn(`Find: failed to clear result highlight: ${getErrorMessage(e)}`),
      );
    };
  }, [editorWebViewController]);

  const handleFocusedResultChange = useCallback(
    (searchResult: HidableFindResult, index: number) => {
      setFocusedResultIndex(index);
      setVerseRefSetting(searchResult.start.verseRef);
      if (targetEditorWebViewId && editorWebViewController) {
        // Preview the match in the editor (select + highlight) without stealing focus, so the user
        // can keep navigating results. Double-click / reference-click shift focus to the editor.
        //
        // Hidden case (see .claude/rules/cross-view-sync-hidden-views.md): if the editor tab is
        // inactive, the preview scroll no-ops (no layout in a display:none iframe) and does NOT catch
        // up on activation. This is a deliberate no-op, not an oversight: (1) PAPI exposes no way for
        // this panel to observe the *editor's* visibility (useViewVisibility only sees this panel's
        // own iframe), so a deferred catch-up isn't implementable here; (2) selection + annotation
        // are data-driven, so they persist and render when the editor is shown — only the preview
        // scroll is geometry; and (3) the explicit "go there" path (handleOpenAtResult) calls
        // setFocus to activate the editor and re-runs selectRange, which scrolls correctly. A silent
        // preview while the editor is hidden has nothing to preview, so doing nothing is correct.
        try {
          editorWebViewController
            .selectRange({ start: searchResult.start, end: searchResult.end })
            .catch((e) =>
              logger.warn(`Find: failed to select result in editor: ${getErrorMessage(e)}`),
            );
          editorWebViewController
            .setAnnotation(
              { start: searchResult.start, end: searchResult.end },
              'find-result-highlight',
              'find-current-result',
            )
            .catch((e) =>
              logger.warn(`Find: failed to highlight result in editor: ${getErrorMessage(e)}`),
            );
        } catch {
          // Ignore any synchronous errors from the controller methods.
        }
      }
    },
    [editorWebViewController, targetEditorWebViewId, setVerseRefSetting],
  );

  /** Navigate to a result AND shift focus to the editor (double-click / reference-click). */
  const handleOpenAtResult = useCallback(
    (searchResult: HidableFindResult, index: number) => {
      setFocusedResultIndex(index);
      setVerseRefSetting(searchResult.start.verseRef);
      if (targetEditorWebViewId && editorWebViewController) {
        papi.window.setFocus({ focusType: 'webView', id: targetEditorWebViewId });
        // Await selectRange before setAnnotation so the websocket is settled (avoids
        // "Tried to send payload while not connected" races). Wrapped because the tab can close
        // between this callback being handed to the result list and the user activating it, leaving a
        // revoked proxy whose property read throws synchronously — see `callControllerSafely`.
        callControllerSafely(
          () =>
            editorWebViewController
              .selectRange({ start: searchResult.start, end: searchResult.end })
              .then(() => {
                if (targetEditorWebViewId && editorWebViewController)
                  return editorWebViewController.setAnnotation(
                    { start: searchResult.start, end: searchResult.end },
                    'find-result-highlight',
                    'find-current-result',
                  );
                return undefined;
              }),
          (e) => logger.warn(`Find: failed to update editor: ${getErrorMessage(e)}`),
        );
      }
    },
    [editorWebViewController, targetEditorWebViewId, setVerseRefSetting],
  );

  const handleHideResult = useCallback((index: number) => {
    setResults((prevResults) =>
      prevResults.map((prevResult, i) =>
        i === index ? { ...prevResult, isHidden: true } : prevResult,
      ),
    );
    setNumberOfHiddenResults((prevCount) => prevCount + 1);
    setFocusedResultIndex(undefined);
  }, []);

  const handleReplace = useCallback(
    async (resultIndex?: number) => {
      if (isReplacing || !projectId) return;
      const indexToReplace = resultIndex ?? focusedResultIndex;
      if (indexToReplace === undefined || !replacePdp) return;

      const result = results[indexToReplace];
      if (!result || result.isHidden) return;

      const usfmToInsert = preserveCase
        ? applyPreserveCase(result.text ?? '', replaceTerm)
        : replaceTerm;

      const bookVerseRef = { book: result.start.verseRef.book, chapterNum: 1, verseNum: 0 };
      setIsReplacing(true);
      try {
        // Snapshot the book before replacing so revert can restore USFM exactly
        const bookSnapshot = await usfmBookPdp?.getBookUSFM(bookVerseRef);
        // Also commits changes to the version history
        let isCommitSuccess = false;
        try {
          if (projectId)
            isCommitSuccess = await papi.commands.sendCommand(
              'paratextBibleSendReceive.commitChanges',
              projectId,
              formatReplacementString(localizedStrings['%versionHistoryCommit_beforeReplace%'], {
                replaceTerms: `<vern>${searchTerm}\u2014>${replaceTerm}</vern>`,
              }),
              true,
            );
        } catch (err: unknown) {
          const errMessage = getErrorMessage(err);
          // Requires the `commitChanges` command handler to throw
          // `PlatformUnimplementedException` having the `ERROR_UNIMPLEMENTED` prefix to
          // successfully handle if this command is not implemented in the application version
          if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
            // Shouldn't stop the replace if the commit commands are only unimplemented in the
            // current version of the application.
            isCommitSuccess = true;
            logger.info(errMessage);
          } else {
            logger.warn(
              `Error committing changes to version history before replacing: ${getErrorMessage(err)}`,
            );
          }
        }
        // If the commit fails, aborts the replace operation
        if (!isCommitSuccess) {
          setIsReplacing(false);
          papi.notifications.send({
            message: localizedStrings['%versionHistoryCommit_beforeReplace_failureMessage%'],
            severity: 'error',
          });
          return;
        }

        await replacePdp.replace([{ start: result.start, end: result.end }], usfmToInsert);

        // Commits resulting changes from the replace to the version history
        try {
          if (projectId)
            await papi.commands.sendCommand(
              'paratextBibleSendReceive.commitChanges',
              projectId,
              formatReplacementString(localizedStrings['%versionHistoryCommit_afterReplace%'], {
                replaceTerms: `<vern>${searchTerm}\u2014>${replaceTerm}</vern>`,
              }),
              false,
            );
        } catch (err: unknown) {
          const errMessage = getErrorMessage(err);
          // Requires the `commitChanges` command handler to throw
          // `PlatformUnimplementedException` having the `ERROR_UNIMPLEMENTED` prefix to
          // successfully handle if this command is not implemented in the application version
          if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
            logger.info(errMessage);
          } else {
            logger.warn(
              `Error committing changes to version history after replacing: ${getErrorMessage(err)}`,
            );
          }
        }

        // Mark the replaced result with visual feedback before re-running the search
        setResults((prev) =>
          prev.map((r, i) => (i === indexToReplace ? { ...r, isReplaced: true } : r)),
        );
        const replacedToastId = sonner(localizedStrings['%webView_find_replacedOneOccurrence%']);

        // Cancellable 1-second wait before re-search
        const isCancelled = await cancellableDelay(1000, pendingReplaceRevertRef);
        pendingReplaceRevertRef.current = undefined;

        let revertSucceeded = false;
        if (isCancelled) {
          if (!isMountedRef.current) return; // Unmount — keep the replacement, don't revert
          try {
            if (bookSnapshot !== undefined && usfmBookPdp) {
              revertSucceeded = await revertBookSnapshots(
                new Map([[bookVerseRef.book, bookSnapshot]]),
                usfmBookPdp,
              );
            } else {
              logger.error('Error reverting replace: book snapshot unavailable');
            }
            sonner.dismiss(replacedToastId);
            if (revertSucceeded) {
              sonner(localizedStrings['%webView_find_replacementReverted%']);
              if (isMountedRef.current)
                setResults((prev) =>
                  prev.map((r, i) => (i === indexToReplace ? { ...r, isReplaced: false } : r)),
                );
            }
          } catch (revertError) {
            logger.error(`Error reverting replace: ${getErrorMessage(revertError)}`);
          }
        } else {
          // Store the replaced index so the auto-select effect can advance to the next result
          // rather than jumping back to the first after the re-search completes.
          pendingAdvanceIndexRef.current = indexToReplace;
        }
        if (!isMountedRef.current) return;
        // Skip re-search when the revert succeeded — the book is restored to its pre-replace
        // state so the existing results are still valid, and re-searching would cause a flicker.
        if (!(isCancelled && revertSucceeded)) {
          isPostReplaceSearchRef.current = true;
          await handleStartSearchRef.current();
        }
      } catch (error) {
        if (getErrorMessage(error).includes(STRUCTURE_PROTECTED_ERROR)) {
          sonner(localizedStrings['%webView_find_replace_structureProtectedError%']);
        } else {
          logger.error(`Error replacing result: ${getErrorMessage(error)}`);
        }
      } finally {
        setIsReplacing(false);
      }
    },
    [
      focusedResultIndex,
      isReplacing,
      localizedStrings,
      preserveCase,
      replacePdp,
      replaceTerm,
      results,
      usfmBookPdp,
      searchTerm,
      projectId,
    ],
  );

  const handleReplaceAll = useCallback(async () => {
    if (isReplacing || !replacePdp || !projectId) return;

    setIsReplacing(true);
    try {
      // Load all remaining results before replacing so we don't miss any.
      // Use a local `latestTotal` updated from each server response so that a stale
      // `totalNumberOfResults` snapshot (from when the button was clicked) cannot cause
      // the loop to exit before all results have arrived.
      // Use the ref so we always start from the latest results, even if state updates
      // (e.g. user scrolled to load more) happened after the callback was created.
      let allResults = [...resultsRef.current];
      let latestTotal = totalNumberOfResults;
      while (allResults.length < latestTotal) {
        // Sequential awaiting is intentional: each call fetches the next batch and its result
        // determines whether another fetch is needed. Promise.all cannot be used here.
        // eslint-disable-next-line no-await-in-loop
        const update = await retrieveFindJobUpdate(RESULTS_BATCH_SIZE);
        if (!update || !isMountedRef.current) break;
        latestTotal = update.totalResultsCount;
        const newBatch = update.nextResults || [];
        if (newBatch.length === 0) break;
        allResults = [...allResults, ...newBatch];
        loadedResultsLengthRef.current += newBatch.length;
      }
      // Sync any newly loaded results into state
      if (allResults.length > resultsRef.current.length) setResults(allResults);

      const visibleResultsList = allResults.filter((r) => !r.isHidden);
      if (visibleResultsList.length === 0) return;

      let isCommitSuccess = false;
      // Also commits changes to the version history
      try {
        if (projectId)
          isCommitSuccess = await papi.commands.sendCommand(
            'paratextBibleSendReceive.commitChanges',
            projectId,
            formatReplacementString(localizedStrings['%versionHistoryCommit_beforeReplace%'], {
              replaceTerms: `<vern>${searchTerm}\u2014>${replaceTerm}</vern>`,
            }),
            true,
          );
      } catch (err: unknown) {
        const errMessage = getErrorMessage(err);
        // Requires the `commitChanges` command handler to throw
        // `PlatformUnimplementedException` having the `ERROR_UNIMPLEMENTED` prefix to
        // successfully handle if this command is not implemented in the application version
        if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
          // If the commit commands are simply not implemented in this version of the application,
          // shouldn't skip the replace.
          isCommitSuccess = true;
          logger.info(errMessage);
        } else {
          logger.warn(
            `Error committing changes to version history before replacing: ${getErrorMessage(err)}`,
          );
        }
      }
      // If the initial commit failed, aborts replace operation
      if (!isCommitSuccess) {
        setIsReplacing(false);
        papi.notifications.send({
          message: localizedStrings['%versionHistoryCommit_beforeReplace_failureMessage%'],
          severity: 'error',
        });
        return;
      }

      const usfmToInsert = preserveCase
        ? visibleResultsList.map((r) => applyPreserveCase(r.text ?? '', replaceTerm))
        : replaceTerm;

      // Snapshot all affected books' USFM before replacing so cancel/revert can restore them
      // exactly, avoiding stale-position errors from the post-replacement document state.
      const uniqueBookIds = [...new Set(visibleResultsList.map((r) => r.start.verseRef.book))];
      const bookSnapshots = new Map<string, string>();
      await Promise.all(
        uniqueBookIds.map(async (bookId) => {
          const verseRef = { book: bookId, chapterNum: 1, verseNum: 0 };
          const snapshot = await usfmBookPdp?.getBookUSFM(verseRef);
          if (snapshot !== undefined) bookSnapshots.set(bookId, snapshot);
        }),
      );

      // Group results by book and call replace() once per book (API requires all ranges in same book).
      const bookGroupMap = new Map<
        string,
        {
          ranges: { start: HidableFindResult['start']; end: HidableFindResult['end'] }[];
          insertions: string[];
        }
      >();
      visibleResultsList.forEach((r, i) => {
        const bookId = r.start.verseRef.book;
        if (!bookGroupMap.has(bookId)) bookGroupMap.set(bookId, { ranges: [], insertions: [] });
        // TypeScript doesn't know that bookId is guaranteed to be in bookGroupMap here, but the
        // preceding `if` ensures it was just inserted if missing, so the `!` assertion is safe.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const group = bookGroupMap.get(bookId)!;
        group.ranges.push({ start: r.start, end: r.end });
        group.insertions.push(Array.isArray(usfmToInsert) ? usfmToInsert[i] : usfmToInsert);
      });
      await Promise.all(
        [...bookGroupMap.values()].map(({ ranges, insertions }) =>
          replacePdp.replace(ranges, preserveCase ? insertions : insertions[0]),
        ),
      );
      const count = visibleResultsList.length;
      const replacedAllToastId = sonner(
        count === 1
          ? localizedStrings['%webView_find_replacedOneOccurrence%']
          : formatReplacementString(localizedStrings['%webView_find_replacedNOccurrences%'], {
              count: count.toString(),
            }),
      );

      // Commits resulting changes from the replace to the version history
      try {
        if (projectId)
          await papi.commands.sendCommand(
            'paratextBibleSendReceive.commitChanges',
            projectId,
            formatReplacementString(localizedStrings['%versionHistoryCommit_afterReplace%'], {
              replaceTerms: `<vern>${searchTerm}\u2014>${replaceTerm}</vern>`,
            }),
            false,
          );
      } catch (err: unknown) {
        const errMessage = getErrorMessage(err);
        // Requires the `commitChanges` command handler to throw
        // `PlatformUnimplementedException` having the `ERROR_UNIMPLEMENTED` prefix to
        // successfully handle if this command is not implemented in the application version
        if (errMessage.includes('ERROR_UNIMPLEMENTED')) {
          logger.info(errMessage);
        } else {
          logger.warn(
            `Error committing changes to version history after replacing: ${getErrorMessage(err)}`,
          );
        }
      }

      // Mark all visible results as replaced for visual feedback (red background + progress bar)
      setResults(allResults.map((r) => (r.isHidden ? r : { ...r, isReplaced: true })));

      // Cancellable 1-second wait before re-search
      const isCancelled = await cancellableDelay(1000, pendingReplaceRevertRef);
      pendingReplaceRevertRef.current = undefined;

      let revertSucceeded = false;
      if (isCancelled) {
        if (!isMountedRef.current) return; // Unmount — keep the replacement, don't revert
        if (bookSnapshots.size > 0 && usfmBookPdp) {
          revertSucceeded = await revertBookSnapshots(bookSnapshots, usfmBookPdp);
        } else {
          logger.error('Error reverting replace all: book snapshots unavailable');
        }
        sonner.dismiss(replacedAllToastId);
        if (revertSucceeded) {
          sonner(localizedStrings['%webView_find_replacementReverted%']);
          if (isMountedRef.current)
            setResults((prev) => prev.map((r) => ({ ...r, isReplaced: false })));
        }
      }
      if (!isMountedRef.current) return;
      // Skip re-search when the revert succeeded — the book is restored to its pre-replace
      // state so the existing results are still valid, and re-searching would cause a flicker.
      if (!(isCancelled && revertSucceeded)) {
        isPostReplaceSearchRef.current = true;
        await handleStartSearchRef.current();
      }
    } catch (error) {
      if (getErrorMessage(error).includes(STRUCTURE_PROTECTED_ERROR)) {
        sonner(localizedStrings['%webView_find_replace_structureProtectedError%']);
      } else {
        logger.error(`Error replacing all results: ${getErrorMessage(error)}`);
      }
    } finally {
      setIsReplacing(false);
    }
  }, [
    isReplacing,
    localizedStrings,
    preserveCase,
    replacePdp,
    replaceTerm,
    retrieveFindJobUpdate,
    totalNumberOfResults,
    usfmBookPdp,
    searchTerm,
    projectId,
  ]);

  const handleCancelReplace = useCallback(() => {
    pendingReplaceRevertRef.current?.cancel();
  }, []);

  // Retrieves the USJ for a book so the search-result cards can compute verse context. Reads the
  // USJ_Book project data provider imperatively (rather than via a hook) so the presentational Find
  // component stays free of `@papi`.
  const getBookUsj = useCallback(
    async (bookId: string): Promise<Usj | undefined> => {
      if (!projectId) return undefined;
      try {
        const usjBookPdp = await papi.projectDataProviders.get(
          'platformScripture.USJ_Book',
          projectId,
        );
        return await usjBookPdp.getBookUSJ({ book: bookId, chapterNum: 1, verseNum: 0 });
      } catch (error) {
        logger.warn(
          `Error retrieving USJ Book ${bookId} for search results: ${getErrorMessage(error)}`,
        );
        return undefined;
      }
    },
    [projectId],
  );

  return (
    <Find
      searchInputRef={searchInputRef}
      localizedStrings={localizedStrings}
      scopeSelectorLocalizedStrings={scopeSelectorLocalizedStrings}
      searchResultLocalizedStrings={searchResultLocalizedStrings}
      projects={projects}
      selectedProjectId={projectId}
      selectedScrollGroupId={selectedScrollGroupId}
      openTabs={projectSelectorOpenTabs}
      isLoadingProjects={isLoadingProjects}
      noOpenProjects={noOpenProjects}
      onSelectProjectScrollGroup={handleSelectProjectScrollGroup}
      onSelectProject={handleSelectProject}
      onOpenProjectInGroup={handleOpenProjectInGroup}
      searchTerm={searchTerm}
      recentSearches={recentSearches}
      scope={scope}
      verseRef={verseRefSetting}
      booksPresent={booksPresent}
      allowInvisibleCharacters={allowInvisibleCharacters}
      selectedBookIds={selectedBookIds}
      localizedBookData={localizedBookData}
      shouldMatchCase={shouldMatchCase}
      searchTextType={searchTextType}
      wordRestriction={wordRestriction}
      isRegexAllowed={isRegexAllowed}
      activeMode={isSimpleMode ? 'find' : activeMode}
      hideModeToggle={isSimpleMode}
      hideScrollGroups={isSimpleMode}
      replaceTerm={replaceTerm}
      preserveCase={preserveCase}
      previewOptions={previewOptions}
      onPreviewOptionsChange={setStoredPreviewOptions}
      isReplacing={isReplacing}
      isStructureProtected={isStructureProtected}
      isReplacementStructureChanging={isReplacementStructureChanging}
      isEditable={isEditable}
      results={results}
      resultsByBook={resultsByBook}
      focusedResultIndex={focusedResultIndex}
      searchStatus={searchStatus}
      searchError={searchError}
      searchProgress={searchProgress}
      totalNumberOfResults={totalNumberOfResults}
      numberOfHiddenResults={numberOfHiddenResults}
      isPostReplaceSearch={isPostReplaceSearch}
      onSearchTermChange={setSearchTerm}
      onStartSearch={handleStartSearch}
      onStopSearch={handleStopSearch}
      setScope={setScope}
      onSelectedBookIdsChange={setSelectedBookIds}
      setSearchTextType={setSearchTextType}
      setWordRestriction={setWordRestriction}
      setShouldMatchCase={setShouldMatchCase}
      setIsRegexAllowed={setIsRegexAllowed}
      onToggleMode={setActiveMode}
      onReplaceTermChange={setReplaceTerm}
      onPreserveCaseChange={setPreserveCase}
      onFocusedResultChange={handleFocusedResultChange}
      onResultFocus={handleFocusedResultChange}
      onResultDoubleClick={handleOpenAtResult}
      onResultReferenceClick={handleOpenAtResult}
      onHideResult={handleHideResult}
      onReplace={handleReplace}
      onReplaceAll={handleReplaceAll}
      onCancelReplace={handleCancelReplace}
      onResultsScroll={handleResultsScroll}
      getBookUsj={getBookUsj}
      logger={logger}
    />
  );
};
