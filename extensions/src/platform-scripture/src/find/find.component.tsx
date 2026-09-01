import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  Replace,
  ReplaceAll,
  TextSearch,
  X,
} from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  DisabledActionTooltip,
  EmptyState,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RecentSearches,
  Scope,
  SCOPE_SELECTOR_STRING_KEYS,
  ScopeSelector,
  Skeleton,
  Sonner,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import {
  getAvailableBookIds,
  ProjectSelector,
  ProjectSelectorLocalizedStrings,
  ProjectSelectorOpenTab,
  ProjectSelectorProject,
  ScopeWithRange,
  summarizeSelectedBooks,
} from 'platform-bible-react/experimental';
import {
  formatReplacementString,
  LanguageStrings,
  LocalizedStringValue,
  ScrollGroupId,
  Section,
} from 'platform-bible-utils';
import { FindJobStatus, WordRestriction } from 'platform-scripture';
import React, { useCallback, useMemo, useRef } from 'react';
import { FindFilters } from './find-filters.component';
import { LocalizedBookData, SearchTextType } from './find-types';
import { isFindQueryValid } from './find.utils';
import {
  FindLogger,
  HidableFindResult,
  SEARCH_RESULT_LOCALIZED_STRING_KEYS,
} from './search-result.component';
import { SearchResultsInBook } from './search-results-in-book.component';
import {
  REPLACE_PREVIEW_OPTIONS_STRING_KEYS,
  ReplacePreviewOptions,
  ReplacePreviewOptionsStrings,
} from './replace-preview-options.component';
import { DEFAULT_REPLACE_PREVIEW_OPTIONS, PreviewOptions } from './replace-preview-types';

/**
 * The `openTabs` value handed to the project picker in simple interface mode. Module-level rather
 * than an inline `[]` so its identity is stable: `ProjectSelector` memoizes its row list on
 * `openTabs`, and a fresh array each render would recompute the rows on every keystroke and every
 * streamed result batch.
 */
const NO_OPEN_TABS: ProjectSelectorOpenTab[] = [];

/** Localization keys used by the {@link Find} component itself (excludes child component keys). */
export const FIND_LOCALIZED_STRING_KEYS = [
  '%general_countOfTotal%',
  '%webView_find_allBooks%',
  '%webView_find_allText%',
  '%webView_find_allText_tooltip%',
  '%webView_find_allowRegex%',
  '%webView_find_cancelSearch%',
  '%webView_find_capitalization%',
  '%webView_find_clearSearch%',
  '%webView_find_errorOccurred%',
  '%webView_find_extraMaterialNotSearched%',
  '%webView_find_findTab%',
  '%webView_find_matchCase%',
  '%webView_find_matchContentIn%',
  '%webView_find_nextResult%',
  '%webView_find_noOpenProjectsOrResources_results%',
  '%webView_find_noResultsFound%',
  '%webView_find_pattern%',
  '%webView_find_preserveCase%',
  '%webView_find_preserveCase_tooltip%',
  '%webView_find_previousResult%',
  '%webView_find_projectFilter_noOpenProjectsOrResources%',
  '%webView_find_projectFilter_noProjectsFound%',
  '%webView_find_projectSelector_label%',
  '%webView_find_projectSelector_openTabsSectionHeading%',
  '%webView_find_projectSelector_otherProjectsSectionHeading%',
  '%webView_find_projectSelector_searchPlaceholder%',
  '%webView_find_recent%',
  '%webView_find_replace%',
  '%webView_find_replaceAll%',
  '%webView_find_replaceTab%',
  '%webView_find_replaceTerm_placeholder%',
  '%webView_find_replace_readOnlyNote%',
  '%webView_find_replace_readOnlyTooltip%',
  '%webView_find_replace_structureProtectedError%',
  '%webView_find_replace_structureProtectedMarkerTooltip%',
  '%webView_find_replace_structureProtectedNote%',
  '%webView_find_restrictions%',
  '%webView_find_restrictions_endOfWord%',
  '%webView_find_restrictions_none%',
  '%webView_find_restrictions_startOfWord%',
  '%webView_find_restrictions_wholeWord%',
  '%webView_find_result%',
  '%webView_find_searchPlaceholder%',
  '%webView_find_searchPrompt%',
  '%webView_find_selectBooksPrompt%',
  '%webView_find_showing%',
  '%webView_find_showingResults%',
  '%webView_find_showingResultsOfMore%',
  '%webView_find_showRecentSearches%',
  '%webView_find_toggleFilters%',
  '%webView_find_verseTextOnly%',
  // Preview-options keys live with their component; spread them so the two lists can't drift.
  ...REPLACE_PREVIEW_OPTIONS_STRING_KEYS,
] as const;

/**
 * Key for the tooltip explaining why the book picker's Extra section is unavailable.
 *
 * Bound to {@link FIND_LOCALIZED_STRING_KEYS} rather than spelled inline at the read site:
 * `localizedStrings` is an open index signature, so an unrequested key reads as `undefined` with no
 * compile error and the tooltip would silently vanish.
 */
const EXTRA_MATERIAL_NOT_SEARCHED_KEY =
  '%webView_find_extraMaterialNotSearched%' satisfies (typeof FIND_LOCALIZED_STRING_KEYS)[number];

/**
 * A search result paired with its index in the complete (ungrouped) results array, as produced by
 * grouping the results by book.
 */
export type BookResultEntry = { result: HidableFindResult; originalIndex: number };

/** A project (or resource) the user can select for Find to operate on. */
export type FindProject = {
  /** Unique id of the project. */
  id: string;
  /** Short display name (e.g. an abbreviation). */
  shortName: string;
  /** Full display name. */
  fullName: string;
};

/** Props for the {@link Find} presentational component. */
export type FindProps = {
  /** Localized strings for the find/replace UI; resolve via {@link FIND_LOCALIZED_STRING_KEYS}. */
  localizedStrings: LanguageStrings;
  /** Localized strings for the {@link ScopeSelector}; resolve via `SCOPE_SELECTOR_STRING_KEYS`. */
  scopeSelectorLocalizedStrings: LanguageStrings;
  /**
   * Localized strings for the search-result cards; resolve via
   * `SEARCH_RESULT_LOCALIZED_STRING_KEYS`.
   */
  searchResultLocalizedStrings: {
    [localizedKey in (typeof SEARCH_RESULT_LOCALIZED_STRING_KEYS)[number]]?: LocalizedStringValue;
  };

  // Project selection
  /**
   * Scripture projects/resources the user can select for Find to operate on — only those currently
   * open in an editor tab; Find has nothing to scroll for a project that isn't open.
   */
  projects: FindProject[];
  /** Id of the project Find currently operates on, or `undefined` if none is selected. */
  selectedProjectId: string | undefined;
  /**
   * The specific open tab (by scroll group) Find currently targets, or `undefined` before an
   * initial selection has been made.
   */
  selectedScrollGroupId: ScrollGroupId | undefined;
  /** Currently-open scripture editor tabs backing the `projects` list above. */
  openTabs: ProjectSelectorOpenTab[];
  /**
   * True while the project metadata backing `projects` is still being fetched. Distinct from
   * `noOpenProjects`: until the fetch resolves, `projects` is empty even when tabs ARE open, so
   * without this the picker would render its "no open projects" placeholder and contradict the
   * results area. Shows a loading affordance instead.
   */
  isLoadingProjects: boolean;
  /**
   * True when no scripture project is open in any editor tab. The project selector and the results
   * area both show a "no open projects" placeholder instead of their normal content.
   */
  noOpenProjects: boolean;
  /**
   * When true, the project picker presents projects as a flat list with no scroll-group letters —
   * neither in the trigger nor on any row (simple interface mode). Simple mode hides
   * `ScrollGroupSelector` from both the app toolbar and the web view toolbar, so a group letter
   * would name something the user can neither see nor change. `onSelectProject` handles selection
   * instead of `onSelectProjectScrollGroup` while this is set.
   */
  hideScrollGroups?: boolean;
  /**
   * Called when the user selects a different open project/tab for Find to operate on. Not used
   * while `hideScrollGroups` is set — see `onSelectProject`.
   */
  onSelectProjectScrollGroup: (projectId: string, scrollGroupId: ScrollGroupId) => void;
  /**
   * Called when the user selects a different open project while `hideScrollGroups` is set. Carries
   * no scroll group: the picker does not surface groups in that mode, so which of the project's
   * open tabs Find targets is the caller's decision.
   */
  onSelectProject: (projectId: string) => void;
  /**
   * Required by the underlying project picker but expected never to fire: the picker only ever
   * lists open projects, so there is nothing for it to open. Not passed while `hideScrollGroups` is
   * set — `mode="project"` has no "open in group" affordance at all.
   */
  onOpenProjectInGroup: (projectId: string, scrollGroupId: ScrollGroupId) => void;

  // Search/replace input + filter state
  /**
   * Ref attached to the search box, so the web view can put the caret there when Find is invoked.
   * Owned by the caller rather than exposed as an imperative handle, matching how the scripture
   * editor hands `MarkerMenu` its `searchRef`.
   */
  searchInputRef?: React.Ref<HTMLInputElement>;
  /**
   * Puts the caret back in the search box. Called after the clear button empties the term, because
   * that button only renders while there is a term to clear: emptying it unmounts the element the
   * user just activated, which would otherwise drop focus to the document body and strand a
   * keyboard user with nothing focused.
   */
  onFocusSearchInput?: () => void;
  /** The current search term. */
  searchTerm: string;
  /** Recent search terms shown in the recent-searches dropdown. */
  recentSearches: string[];
  /** The currently selected scope (chapter/book/selectedBooks). */
  scope: Scope;
  /** The current scroll-group verse ref, used to label the chapter/book scope (e.g. "Genesis 1"). */
  verseRef: SerializedVerseRef;
  /**
   * The string of present books (from the `booksPresent` project setting) for the scope selector.
   *
   * Expected to already have extra material cleared — Find does not search it, and the scope
   * selector builds its book picker straight from this string, so a host passing the project's raw
   * setting would offer books the search never covers. Callers derive it with
   * `deriveFindBookLists`.
   */
  booksPresent: string;
  /**
   * Whether {@link booksPresent} had extra material to withhold, i.e. the project has some. Drives
   * the explanation on the book picker's disabled Extra section, which would otherwise tell a
   * project with no extra material why its (nonexistent) extra material is unavailable.
   */
  hasExcludedExtraMaterial: boolean;
  /** Ids of the books selected for the `selectedBooks` scope. */
  selectedBookIds: string[];
  /** Map of available book ids to their localized display names. */
  localizedBookData: Map<string, LocalizedBookData>;
  /** Whether to match case in the search. */
  shouldMatchCase: boolean;
  /** Which text to match (all text / verse text only). */
  searchTextType: SearchTextType;
  /** The word-boundary restriction for matches. */
  wordRestriction: WordRestriction;
  /** Whether the search string is treated as a regular expression. */
  isRegexAllowed: boolean;

  // Mode + replace state
  /** Whether the UI is in find or replace mode. */
  activeMode: 'find' | 'replace';
  /**
   * When true, hide the find/replace toggle entirely (e.g. in simple interface mode, where replace
   * is not offered). The panel then shows only the find UI. Callers must also keep `activeMode` at
   * `'find'` while this is set so no replace UI is rendered.
   */
  hideModeToggle?: boolean;
  /** The replacement term entered in replace mode. */
  replaceTerm: string;
  /** Whether to preserve the case of the matched text when replacing. */
  preserveCase: boolean;
  /** True while a replace operation (and its mandatory re-find) is executing. */
  isReplacing: boolean;
  /** Whether the project's structure is currently protected (replace restrictions apply). */
  isStructureProtected?: boolean;
  /**
   * Whether the active project can be edited. When false, Replace / Replace All (and the per-result
   * replace action) are disabled. Required (no permissive default) so a call site that forgets to
   * pass it fails to compile rather than silently re-enabling a mutation.
   */
  isEditable: boolean;
  /**
   * Whether the current replacement text itself contains a paragraph/verse marker — guaranteed to
   * be rejected while protected, so Replace is proactively disabled.
   */
  isReplacementStructureChanging?: boolean;

  // Results state
  /** All current search results (including hidden/replaced ones). */
  results: HidableFindResult[];
  /** Search results grouped by book id, each paired with its original index. */
  resultsByBook: Map<string, BookResultEntry[]>;
  /** The index (into `results`) of the focused result, or `undefined`. */
  focusedResultIndex: number | undefined;
  /** The current find-job status, or `undefined` when no search has run. */
  searchStatus: FindJobStatus | undefined;
  /** The find-job error message, if the status is `errored`. */
  searchError: string | undefined;
  /** Percent complete of the running search (0-100). */
  searchProgress: number;
  /** Total number of results the job reports (may exceed loaded results). */
  totalNumberOfResults: number;
  /** Number of results the user has hidden/dismissed. */
  numberOfHiddenResults: number;
  /**
   * Whether the current search was auto-triggered after a replace. Used to suppress the progress
   * bar for that housekeeping search.
   */
  isPostReplaceSearch: boolean;

  // Action callbacks
  /** Called when the search term changes. */
  onSearchTermChange: (term: string) => void;
  /** Called to start a search. `isExplicitSearch` is true for Enter/Find-button-initiated searches. */
  onStartSearch: (isExplicitSearch?: boolean) => void;
  /** Called to stop the running search, leaving the results it has already found on screen. */
  onStopSearch: () => void;
  /** Called when the user changes the scope. */
  setScope: (scope: Scope) => void;
  /** Called when the selected books for the `selectedBooks` scope change. */
  onSelectedBookIdsChange: (bookIds: string[]) => void;
  /** Called when the match-content-in (text type) filter changes. */
  setSearchTextType: (value: SearchTextType) => void;
  /** Called when the word-restriction filter changes. */
  setWordRestriction: (value: WordRestriction) => void;
  /** Called when the match-case filter changes. */
  setShouldMatchCase: (value: boolean) => void;
  /** Called when the allow-regex filter changes. */
  setIsRegexAllowed: (value: boolean) => void;
  /** Called when the user toggles find/replace mode. */
  onToggleMode: (mode: 'find' | 'replace') => void;
  /** Called when the replacement term changes. */
  onReplaceTermChange: (term: string) => void;
  /** Called when the preserve-case checkbox changes. */
  onPreserveCaseChange: (value: boolean) => void;
  /** Called when the user focuses a result (by clicking or keyboard navigation). */
  onFocusedResultChange: (searchResult: HidableFindResult, index: number) => void;
  /** Called when a result card receives browser focus (e.g. Tab navigation), by original index. */
  onResultFocus?: (searchResult: HidableFindResult, index: number) => void;
  /** Called when the user double-clicks a result (jump to editor), by original index. */
  onResultDoubleClick?: (searchResult: HidableFindResult, index: number) => void;
  /** Called when the user clicks a result's scripture reference (jump to editor), by original index. */
  onResultReferenceClick?: (searchResult: HidableFindResult, index: number) => void;
  /** Called when the user hides/dismisses a result, by its original index. */
  onHideResult: (index: number) => void;
  /** Called when the user replaces a single result, by its original index (defaults to focused). */
  onReplace: (resultIndex?: number) => void;
  /** Called when the user replaces all visible results. */
  onReplaceAll: () => void;
  /** Called to cancel/revert the pending replace operation. */
  onCancelReplace: () => void;
  /** Called when the results container scrolls (drives progressive loading). */
  onResultsScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  /** Retrieves the USJ for a book so each result's verse context can be computed. */
  getBookUsj: (bookId: string) => Promise<Usj | undefined>;
  /**
   * Optional logger for unexpected USJ load/parse failures while building verse context. The
   * webview supplies the PAPI logger; stories may omit it. The component stays `@papi`-free.
   */
  logger?: FindLogger;
  /** Options controlling how the replace preview is displayed in result cards. */
  previewOptions?: PreviewOptions;
  /**
   * Called when the user changes the replace preview options. When omitted, the preview-options
   * picker is hidden (result cards still render with `previewOptions` or the default).
   */
  onPreviewOptionsChange?: (options: PreviewOptions) => void;
  /** Whether the project has AllowInvisibleChars enabled. Forwarded to the result cards. */
  allowInvisibleCharacters?: boolean;
};

/**
 * A centered, screen-reader-announced message shown in the results area in place of the results
 * list (idle prompt, invalid-query prompt). {@link EmptyState} supplies the muted/small text styling
 * and a `role="status"` region.
 */
function ResultsPlaceholder({ id, message }: { id: string; message: string }) {
  return (
    <div className="tw:flex tw:min-h-48 tw:items-center tw:justify-center tw:p-4">
      <EmptyState id={id} className="tw:text-center tw:font-light" message={message} />
    </div>
  );
}

/**
 * Presentational find/replace UI. It owns the rendering and the presentational derivations (visible
 * results, focused-result navigation, scope display text, results message) but no async logic. The
 * container (webview or story) owns the find-job lifecycle, replace/revert, version-history
 * commits, and editor navigation, passing data in as props and operations in as callbacks.
 */
export function Find({
  localizedStrings,
  scopeSelectorLocalizedStrings,
  searchResultLocalizedStrings,
  projects,
  selectedProjectId,
  selectedScrollGroupId,
  openTabs,
  isLoadingProjects,
  noOpenProjects,
  hideScrollGroups = false,
  onSelectProjectScrollGroup,
  onSelectProject,
  onOpenProjectInGroup,
  searchInputRef,
  onFocusSearchInput,
  searchTerm,
  recentSearches,
  scope,
  verseRef,
  booksPresent,
  hasExcludedExtraMaterial,
  selectedBookIds,
  localizedBookData,
  shouldMatchCase,
  searchTextType,
  wordRestriction,
  isRegexAllowed,
  activeMode,
  hideModeToggle = false,
  replaceTerm,
  preserveCase,
  isReplacing,
  isStructureProtected = false,
  isReplacementStructureChanging = false,
  isEditable,
  results,
  resultsByBook,
  focusedResultIndex,
  searchStatus,
  searchError,
  searchProgress,
  totalNumberOfResults,
  numberOfHiddenResults,
  isPostReplaceSearch,
  onSearchTermChange,
  onStartSearch,
  onStopSearch,
  setScope,
  onSelectedBookIdsChange,
  setSearchTextType,
  setWordRestriction,
  setShouldMatchCase,
  setIsRegexAllowed,
  onToggleMode,
  onReplaceTermChange,
  onPreserveCaseChange,
  onFocusedResultChange,
  onResultFocus,
  onResultDoubleClick,
  onResultReferenceClick,
  onHideResult,
  onReplace,
  onReplaceAll,
  onCancelReplace,
  onResultsScroll,
  getBookUsj,
  logger,
  previewOptions = DEFAULT_REPLACE_PREVIEW_OPTIONS,
  onPreviewOptionsChange,
  allowInvisibleCharacters = false,
}: FindProps) {
  // useRef requires null as the initial value when used with a DOM element ref
  // eslint-disable-next-line no-null/no-null
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const areFiltersActive =
    shouldMatchCase || wordRestriction !== 'none' || searchTextType !== 'all' || isRegexAllowed;

  const visibleResults = useMemo(
    () =>
      results
        .map((result, index) => ({ result, originalIndex: index }))
        .filter(({ result }) => !result.isHidden),
    [results],
  );

  const focusedVisibleIndex = useMemo(
    () =>
      focusedResultIndex === undefined
        ? -1
        : visibleResults.findIndex((vr) => vr.originalIndex === focusedResultIndex),
    [visibleResults, focusedResultIndex],
  );

  const handlePreviousResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    if (focusedVisibleIndex <= 0) {
      // No result focused (index -1) or already at first → wrap to last
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const last = visibleResults.at(-1)!;
      onFocusedResultChange(last.result, last.originalIndex);
      return;
    }
    const prev = visibleResults[focusedVisibleIndex - 1];
    onFocusedResultChange(prev.result, prev.originalIndex);
  }, [focusedVisibleIndex, visibleResults, onFocusedResultChange]);

  const handleNextResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    if (focusedVisibleIndex >= visibleResults.length - 1) {
      // Already at last result → wrap to first
      onFocusedResultChange(visibleResults[0].result, visibleResults[0].originalIndex);
      return;
    }
    const next = visibleResults[focusedVisibleIndex + 1];
    onFocusedResultChange(next.result, next.originalIndex);
  }, [focusedVisibleIndex, visibleResults, onFocusedResultChange]);

  const handleFirstResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    onFocusedResultChange(visibleResults[0].result, visibleResults[0].originalIndex);
  }, [visibleResults, onFocusedResultChange]);

  const handleLastResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    // `at(-1)` returns `undefined` only on an empty array; the early return above guarantees
    // that the array is non-empty
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const last = visibleResults.at(-1)!;
    onFocusedResultChange(last.result, last.originalIndex);
  }, [visibleResults, onFocusedResultChange]);

  const getPageSize = useCallback(() => {
    const container = resultsContainerRef.current;
    if (!container) return 1;
    const containerRect = container.getBoundingClientRect();
    const cards = container.querySelectorAll<HTMLElement>('[role="button"]:not([hidden])');
    const count = Array.from(cards).filter((card) => {
      const rect = card.getBoundingClientRect();
      return rect.bottom > containerRect.top && rect.top < containerRect.bottom;
    }).length;
    return Math.max(1, count);
  }, []);

  const handlePageUpResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    const pageSize = getPageSize();
    const currentIndex = Math.max(0, focusedVisibleIndex);
    const newIndex = Math.max(0, currentIndex - pageSize);
    const target = visibleResults[newIndex];
    onFocusedResultChange(target.result, target.originalIndex);
  }, [focusedVisibleIndex, visibleResults, onFocusedResultChange, getPageSize]);

  const handlePageDownResult = useCallback(() => {
    if (visibleResults.length === 0) return;
    const pageSize = getPageSize();
    const currentIndex = Math.max(0, focusedVisibleIndex);
    const newIndex = Math.min(visibleResults.length - 1, currentIndex + pageSize);
    const target = visibleResults[newIndex];
    onFocusedResultChange(target.result, target.originalIndex);
  }, [focusedVisibleIndex, visibleResults, onFocusedResultChange, getPageSize]);

  const handleResultsKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handlePreviousResult();
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleNextResult();
          break;
        case 'Home':
          e.preventDefault();
          handleFirstResult();
          break;
        case 'End':
          e.preventDefault();
          handleLastResult();
          break;
        case 'PageUp':
          e.preventDefault();
          handlePageUpResult();
          break;
        case 'PageDown':
          e.preventDefault();
          handlePageDownResult();
          break;
        default:
          break;
      }
    },
    [
      handlePreviousResult,
      handleNextResult,
      handleFirstResult,
      handleLastResult,
      handlePageUpResult,
      handlePageDownResult,
    ],
  );

  // Derived here (not received as a prop) so there is exactly one place that computes this rule —
  // the container previously passed its own copy as isSearchQueryValid, which drifted from the
  // Storybook harness's copy and let impossible prop combinations exist in tests. Find already
  // receives every input the rule needs.
  const isSearchQueryValid = isFindQueryValid({ searchTerm, scope, selectedBookIds });

  // Single source of truth for which (if any) results-area placeholder shows, so the four states
  // are mutually exclusive by construction instead of by four separately-maintained boolean
  // expressions. 'none' covers both "results are present" and "a search finished with 0 results" —
  // in the latter case the status bar's message (see resultsMessage) handles the feedback instead.
  // 'noOpenProjectsPrompt' is checked FIRST, ahead of even `results.length > 0`: with no project
  // open in any editor tab there is nothing to search, and every result-activation callback is
  // gated on a target editor tab, so results left on screen would be inert. They are replaced
  // rather than merely covered.
  const resultsAreaState:
    | 'noOpenProjectsPrompt'
    | 'skeleton'
    | 'idlePrompt'
    | 'invalidQueryPrompt'
    | 'none' = useMemo(() => {
    if (noOpenProjects) return 'noOpenProjectsPrompt';
    // Outranks the results still on screen. They belong to the last query that DID run, so leaving
    // them up with no message dead-ends a query the user has since emptied — the state reads as a
    // working search that simply stopped responding. Deciding it here, ahead of the results, is what
    // makes an invalid query show the right thing by construction: no container effect has to land
    // first, so there is no window in which stale results are on screen under a query that cannot
    // produce them.
    if (!isSearchQueryValid) return searchTerm.trim() === '' ? 'idlePrompt' : 'invalidQueryPrompt';
    if (results.length > 0) return 'none';
    if (searchStatus === 'running') return 'skeleton';
    if (searchStatus !== undefined) return 'none';
    if (searchTerm.trim() === '') return 'idlePrompt';
    return 'skeleton';
  }, [noOpenProjects, results.length, searchStatus, searchTerm, isSearchQueryValid]);

  const resultsMessage = useMemo(() => {
    if (results.length === 0) {
      return localizedStrings['%webView_find_noResultsFound%'];
    }
    const l10nKey =
      searchStatus === 'exceeded'
        ? '%webView_find_showingResultsOfMore%'
        : (numberOfHiddenResults > 0 && '%webView_find_showingResults%') || '%webView_find_result%';

    return formatReplacementString(localizedStrings[l10nKey], {
      visibleNumber: (results.length - numberOfHiddenResults).toString(),
      totalNumber: totalNumberOfResults.toString(),
    });
  }, [results, numberOfHiddenResults, totalNumberOfResults, searchStatus, localizedStrings]);

  // Only offered when the project actually has extra material. Telling a project with none that
  // Find "can't include" it explains an absence that isn't Find's doing.
  const extraMaterialNotSearchedExplanation = useMemo(
    () =>
      hasExcludedExtraMaterial
        ? { [Section.Extra]: localizedStrings[EXTRA_MATERIAL_NOT_SEARCHED_KEY] }
        : undefined,
    [hasExcludedExtraMaterial, localizedStrings],
  );

  /** Text shown in the scope popover trigger, e.g. "GEN 1", "GEN, EXO, JHN", or "All books" */
  const scopeDisplayText = useMemo(() => {
    switch (scope) {
      case 'chapter': {
        const bookName = localizedBookData.get(verseRef.book)?.localizedId ?? verseRef.book;
        return `${bookName} ${verseRef.chapterNum}`;
      }
      case 'book':
        return localizedBookData.get(verseRef.book)?.localizedId ?? verseRef.book;
      case 'selectedBooks':
        // Listing every book outgrows this row past a handful of books and forces a horizontal
        // scrollbar on the whole panel, so the summary collapses to "All books" or to a canon-order
        // range of its first and last books, e.g. "GEN - HOS".
        return (
          summarizeSelectedBooks(
            selectedBookIds,
            getAvailableBookIds(booksPresent),
            localizedStrings['%webView_find_allBooks%'],
            localizedBookData,
          ) ?? '…'
        );
      default:
        return '';
    }
  }, [scope, selectedBookIds, verseRef, localizedBookData, booksPresent, localizedStrings]);

  // Configuration for the per-result replace preview. Present whenever in replace mode — including
  // an empty replacement term, so the "replace with nothing" (deletion) preview can render its
  // deletion bar rather than silently showing no preview.
  const replaceConfig = activeMode === 'replace' ? { term: replaceTerm, preserveCase } : undefined;

  // Replace/Replace All (and the per-result replace action) are blocked for two independent
  // reasons: the project is read-only, or structure is locked and the replacement itself would
  // change it. When both apply, the read-only reason takes precedence since it is the more
  // fundamental blocker. The two buttons additionally disable for their own busy/precondition
  // reasons (see isReplaceUnavailable below).
  const isReplaceActionBlocked =
    !isEditable || (isStructureProtected && isReplacementStructureChanging);
  // Only meaningful while isReplaceActionBlocked; kept empty otherwise so a future consumer of this
  // value (e.g. an aria-label) can't inherit a tooltip for a reason that doesn't apply.
  let replaceBlockedTooltipText = '';
  if (isReplaceActionBlocked) {
    replaceBlockedTooltipText = !isEditable
      ? localizedStrings['%webView_find_replace_readOnlyTooltip%']
      : localizedStrings['%webView_find_replace_structureProtectedMarkerTooltip%'];
  }
  // Both Replace and Replace All additionally disable while a search is running, a replace is
  // already in flight, or the action is blocked (above) — only their own precondition differs.
  //
  // An unrunnable query counts as blocked too. Results outlive the query that produced them, so
  // emptying the book selection leaves rows on screen that no longer correspond to a search Find
  // would run; replacing against them writes to character offsets nothing has re-verified.
  const isReplaceUnavailable =
    searchStatus === 'running' || isReplacing || isReplaceActionBlocked || !isSearchQueryValid;

  // Map the flat localized-string bag into the shape the preview-options picker expects.
  const previewOptionsStrings: ReplacePreviewOptionsStrings = {
    togglePreviewOptions: localizedStrings['%webView_find_previewOptions_toggle%'],
    layout: localizedStrings['%webView_find_previewOptions_layout%'],
    layoutArrow: localizedStrings['%webView_find_previewOptions_layout_arrow%'],
    layoutInline: localizedStrings['%webView_find_previewOptions_layout_inline%'],
    layoutBlock: localizedStrings['%webView_find_previewOptions_layout_block%'],
    highlightShape: localizedStrings['%webView_find_previewOptions_shape%'],
    highlightShapeBar: localizedStrings['%webView_find_previewOptions_shape_bar%'],
    highlightShapeRounded: localizedStrings['%webView_find_previewOptions_shape_rounded%'],
    highlightShapePlain: localizedStrings['%webView_find_previewOptions_shape_plain%'],
    color: localizedStrings['%webView_find_previewOptions_color%'],
    colorRedCyan: localizedStrings['%webView_find_previewOptions_color_redCyan%'],
    colorRedGreen: localizedStrings['%webView_find_previewOptions_color_redGreen%'],
    colorGreyBlue: localizedStrings['%webView_find_previewOptions_color_greyBlue%'],
    monospace: localizedStrings['%webView_find_previewOptions_monospace%'],
    monospaceDescription: localizedStrings['%webView_find_previewOptions_monospaceDescription%'],
    showInvisible: localizedStrings['%webView_find_previewOptions_showInvisible%'],
    showInvisibleDescription:
      localizedStrings['%webView_find_previewOptions_showInvisibleDescription%'],
    swatchOld: localizedStrings['%webView_find_previewOptions_swatchOld%'],
    swatchNew: localizedStrings['%webView_find_previewOptions_swatchNew%'],
  };

  const sortedProjects = useMemo<ProjectSelectorProject[]>(
    () =>
      [...projects]
        .sort((a, b) => a.fullName.localeCompare(b.fullName, undefined, { sensitivity: 'base' }))
        .map((project) => ({
          id: project.id,
          shortName: project.shortName,
          fullName: project.fullName,
        })),
    [projects],
  );

  // `ProjectSelector`'s popover strings default to hardcoded English (`DEFAULT_STRINGS` in
  // `project-selector.component.tsx`), so they must be supplied explicitly or the picker's insides
  // stay untranslated. Mirrors the `manage-books.web-view.tsx` precedent.
  //
  // Deliberately only the strings REACHABLE from Find's configuration, since localized keys are
  // immutable once shipped and one that can never render is permanent dead surface. Omitted, with
  // the reason each cannot appear here:
  // - `filterAriaLabel` / `groupSectionLabel` / `filterSectionLabel` / `filterGroupByOpenTabs` —
  //   the funnel menu is not mounted at all (`hideFilterMenu` below).
  // - `selectAll` / `clearAll` / `filterShowSelectedOnly` — multi-select only; both of Find's
  //   configurations are single-select (`mode="projectScrollGroup"` / `mode="project"`).
  // - `versificationUnknownSectionHeading` — requires versification grouping.
  // - `boundButClosedTooltip` / `openButtonLabel` — render only on bound-but-closed rows, which Find
  //   cannot produce (see `onOpenProjectInGroup`'s defensive no-op) and which `mode="project"` has no
  //   code path for at all.
  //
  // `otherProjectsSectionHeading` is kept even though today's list is all open tabs (so that section
  // is empty and its heading does not render): unlike the above, its reachability depends on what
  // ends up in `projects` rather than on a setting here, so it is the one worth holding.
  //
  // `openTabsSectionHeading` is only reachable in the power-mode configuration: `defaultGroupByOpenTabs`
  // defaults to `true`, and there every row carries a `scrollGroupId` so all of them land in the
  // "open tabs" section. The simple-mode configuration passes `openTabs={[]}`, which leaves no row
  // eligible for that section and collapses the list to a single unheaded group.
  const projectSelectorLocalizedStrings = useMemo<ProjectSelectorLocalizedStrings>(
    () => ({
      searchPlaceholder: localizedStrings['%webView_find_projectSelector_searchPlaceholder%'],
      openTabsSectionHeading:
        localizedStrings['%webView_find_projectSelector_openTabsSectionHeading%'],
      otherProjectsSectionHeading:
        localizedStrings['%webView_find_projectSelector_otherProjectsSectionHeading%'],
    }),
    [localizedStrings],
  );

  // Presentation and localization shared by both project-picker configurations, so the
  // `hideScrollGroups` branch below differs only in the parts that actually vary: the mode, the
  // selection shape, and the change/open callbacks.
  const sharedProjectSelectorProps = {
    localizedStrings: projectSelectorLocalizedStrings,
    isLoading: isLoadingProjects,
    hideFilterMenu: true,
    buttonPlaceholder: localizedStrings['%webView_find_projectFilter_noOpenProjectsOrResources%'],
    commandEmptyMessage: localizedStrings['%webView_find_projectFilter_noProjectsFound%'],
    ariaLabel: localizedStrings['%webView_find_projectSelector_label%'],
    buttonVariant: 'outline' as const,
    buttonClassName: 'tw:w-full tw:font-normal',
    popoverContentClassName: 'tw:w-[300px]',
    alignDropDown: 'start' as const,
  };

  return (
    <div className="pr-twp tw:mx-auto tw:flex tw:flex-col tw:gap-4 tw:p-4 tw:min-w-[10rem] tw:max-h-screen">
      {/* Header with searchbar and filters */}
      <div className="tw:space-y-3">
        {/* Project selector + Find/Replace toggle share one row. The responsiveness guideline caps a
            filter toolbar at two–three rows and expects a 300px min width, and these were two
            full-width rows of a four-row header; `flex-wrap` lets them fall back to stacking when
            the panel is too narrow to fit both. */}
        <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
          {/* Always visible; lets the user see and change which project Find operates on (and, by
              extension, which open tab a result click will scroll). */}
          <div className="tw:min-w-[8rem] tw:flex-1" data-testid="find-project-trigger">
            {hideScrollGroups ? (
              /* Simple interface mode: a flat project list with no scroll-group letters anywhere.
                 `openTabs={[]}` is what suppresses them — `mode="project"` derives each row's
                 group badges from `openTabs`, so passing Find's real tabs here would still badge
                 every open project with its group letter. It also leaves no row eligible for the
                 "open tabs" section, collapsing the list into one unheaded group. Matches the
                 `ProjectSelector` "Simple Flat List" story. */
              <ProjectSelector
                mode="project"
                projects={sortedProjects}
                openTabs={NO_OPEN_TABS}
                selection={{ projectId: selectedProjectId }}
                onChangeSelection={({ projectId: nextId }) => onSelectProject(nextId)}
                {...sharedProjectSelectorProps}
              />
            ) : (
              <ProjectSelector
                mode="projectScrollGroup"
                projects={sortedProjects}
                openTabs={openTabs}
                selection={{ projectId: selectedProjectId, scrollGroupId: selectedScrollGroupId }}
                onChangeSelection={({ projectId: nextId, scrollGroupId: nextScrollGroupId }) =>
                  onSelectProjectScrollGroup(nextId, nextScrollGroupId)
                }
                onOpenProjectInGroup={onOpenProjectInGroup}
                {...sharedProjectSelectorProps}
              />
            )}
          </div>

          {/* Find/Replace mode toggle — hidden in simple interface mode, where replace is not
              offered and the panel is find-only. */}
          {!hideModeToggle && (
            <ToggleGroup
              type="single"
              value={activeMode}
              onValueChange={(value) => {
                if (value === 'find' || value === 'replace') onToggleMode(value);
              }}
              className="tw:w-fit tw:shrink-0 tw:rounded-lg tw:bg-muted tw:p-1"
            >
              <ToggleGroupItem
                value="find"
                className="tw:data-[state=on]:!bg-background tw:data-[state=on]:!text-foreground tw:data-[state=on]:shadow-sm tw:data-[state=off]:text-muted-foreground"
              >
                {localizedStrings['%webView_find_findTab%']}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="replace"
                className="tw:data-[state=on]:!bg-background tw:data-[state=on]:!text-foreground tw:data-[state=on]:shadow-sm tw:data-[state=off]:text-muted-foreground"
              >
                {localizedStrings['%webView_find_replaceTab%']}
              </ToggleGroupItem>
            </ToggleGroup>
          )}
        </div>

        {/* Find input row */}
        <div className="tw:flex tw:gap-2 tw:flex-wrap">
          <div className="tw:relative tw:flex-1">
            <TextSearch className="tw:pointer-events-none tw:absolute tw:left-2 tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:text-muted-foreground" />
            <Input
              id="search-term"
              ref={searchInputRef}
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onStartSearch(true);
                }
              }}
              placeholder={localizedStrings['%webView_find_searchPlaceholder%']}
              className={`tw:w-full tw:min-w-16 tw:text-ellipsis tw:!pl-8 scripture-font ${searchTerm ? 'tw:!pe-8' : 'tw:!pr-4'}`}
            />
            {searchTerm && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={localizedStrings['%webView_find_clearSearch%']}
                      // Emptying the term is itself what clears the results and abandons a running
                      // job, so every route to an empty box behaves the same — see the container's
                      // invalid-query effect. Focus is handed back to the search box because
                      // emptying the term unmounts this button.
                      onClick={() => {
                        onSearchTermChange('');
                        onFocusSearchInput?.();
                      }}
                      className="tw:absolute tw:end-2 tw:top-1/2 tw:-translate-y-1/2 tw:text-muted-foreground tw:hover:text-foreground tw:bg-transparent tw:border-0 tw:p-0 tw:cursor-pointer"
                    >
                      <X className="tw:h-4 tw:w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{localizedStrings['%webView_find_clearSearch%']}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <RecentSearches
            classNameForItems="scripture-font"
            recentSearches={recentSearches}
            onSearchItemSelect={onSearchTermChange}
            ariaLabel={localizedStrings['%webView_find_showRecentSearches%']}
            groupHeading={localizedStrings['%webView_find_recent%']}
            buttonClassName="tw:h-10 tw:w-10"
            buttonVariant="outline"
          />

          <FindFilters
            areFiltersActive={areFiltersActive}
            searchTextType={searchTextType}
            setSearchTextType={setSearchTextType}
            wordRestriction={wordRestriction}
            setWordRestriction={setWordRestriction}
            shouldMatchCase={shouldMatchCase}
            setShouldMatchCase={setShouldMatchCase}
            isRegexAllowed={isRegexAllowed}
            setIsRegexAllowed={setIsRegexAllowed}
            localizedStrings={{
              toggleFilters: localizedStrings['%webView_find_toggleFilters%'],
              matchContentIn: localizedStrings['%webView_find_matchContentIn%'],
              allText: localizedStrings['%webView_find_allText%'],
              allTextTooltip: localizedStrings['%webView_find_allText_tooltip%'],
              verseTextOnly: localizedStrings['%webView_find_verseTextOnly%'],
              restrictions: localizedStrings['%webView_find_restrictions%'],
              restrictionNone: localizedStrings['%webView_find_restrictions_none%'],
              restrictionWholeWord: localizedStrings['%webView_find_restrictions_wholeWord%'],
              restrictionStartOfWord: localizedStrings['%webView_find_restrictions_startOfWord%'],
              restrictionEndOfWord: localizedStrings['%webView_find_restrictions_endOfWord%'],
              capitalization: localizedStrings['%webView_find_capitalization%'],
              matchCase: localizedStrings['%webView_find_matchCase%'],
              pattern: localizedStrings['%webView_find_pattern%'],
              allowRegex: localizedStrings['%webView_find_allowRegex%'],
            }}
          />
        </div>

        {/* Replace input row — shown in Replace mode */}
        {activeMode === 'replace' && (
          <>
            <div className="tw:relative tw:flex-1">
              <ArrowRight className="tw:pointer-events-none tw:absolute tw:left-2 tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:text-muted-foreground" />
              <Input
                id="replace-term"
                value={replaceTerm}
                onChange={(e) => onReplaceTermChange(e.target.value)}
                placeholder={localizedStrings['%webView_find_replaceTerm_placeholder%']}
                className="tw:w-full tw:min-w-16 tw:!pl-8 tw:!pr-4 scripture-font"
              />
            </div>
            {/* Persistent note, not just a hover tooltip — matches the two-signal feedback pattern
                below (note + tooltip) for whichever reason currently blocks replace. Read-only
                takes precedence when both apply, same as the tooltip precedence below. */}
            {!isEditable ? (
              <p className="tw:text-xs tw:text-muted-foreground">
                {localizedStrings['%webView_find_replace_readOnlyNote%']}
              </p>
            ) : (
              isStructureProtected && (
                <p className="tw:text-xs tw:text-muted-foreground">
                  {localizedStrings['%webView_find_replace_structureProtectedNote%']}
                </p>
              )
            )}
            <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:flex-wrap">
              <div className="tw:flex tw:items-center tw:gap-2">
                <Checkbox
                  id="preserve-case"
                  checked={preserveCase}
                  onCheckedChange={(checked) => onPreserveCaseChange(checked === true)}
                />
                <Label htmlFor="preserve-case" className="tw:cursor-pointer">
                  {localizedStrings['%webView_find_preserveCase%']}
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="tw:h-3.5 tw:w-3.5 tw:text-muted-foreground tw:cursor-default" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="tw:max-w-xs tw:whitespace-pre-line">
                        {localizedStrings['%webView_find_preserveCase_tooltip%']}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {onPreviewOptionsChange && (
                  <ReplacePreviewOptions
                    previewOptions={previewOptions}
                    setPreviewOptions={onPreviewOptionsChange}
                    localizedStrings={previewOptionsStrings}
                  />
                )}
              </div>
              <DisabledActionTooltip
                className="tw:flex tw:gap-2"
                disabled={isReplaceActionBlocked}
                tooltipText={replaceBlockedTooltipText}
              >
                <Button
                  variant="outline"
                  onClick={onReplaceAll}
                  disabled={visibleResults.length === 0 || isReplaceUnavailable}
                >
                  <ReplaceAll className="tw:h-4 tw:w-4" />
                  {localizedStrings['%webView_find_replaceAll%']}
                </Button>
                <Button
                  onClick={() => onReplace()}
                  disabled={focusedResultIndex === undefined || isReplaceUnavailable}
                >
                  <Replace className="tw:h-4 tw:w-4" />
                  {localizedStrings['%webView_find_replace%']}
                </Button>
              </DisabledActionTooltip>
            </div>
          </>
        )}

        {/* Scope selector row. The summary is short by construction, but a long localized book
            name or an unresolved string can still outrun a narrow panel, so the trigger is built to
            clip rather than widen the row: `tw:shrink` overrides the `tw:shrink-0` every shadcn
            `Button` carries in its base class (without it `tw:min-w-0` is inert and the row grows a
            horizontal scrollbar), and `tw:min-w-0` then lets the summary span's `tw:truncate`
            actually clip. The label, chevron and the result-count block opposite keep their
            intrinsic width so the summary is the only thing that gives. */}
        <div className="tw:flex tw:min-w-0 tw:items-center tw:justify-between">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="tw:h-auto tw:min-w-0 tw:shrink tw:gap-1 tw:overflow-hidden tw:px-2 tw:py-1 tw:font-normal"
              >
                <span className="tw:shrink-0 tw:text-sm tw:text-muted-foreground">
                  {localizedStrings['%webView_find_showing%']}
                </span>
                <span className="tw:min-w-0 tw:flex-1 tw:truncate tw:text-sm tw:font-medium">
                  {scopeDisplayText}
                </span>
                <ChevronDown className="tw:h-3 tw:w-3 tw:shrink-0 tw:text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            {/* Height-capped and scrollable for the same reason as the books picker inside it: in a
                narrow panel this popover can flip above its trigger, and anything taller than the
                space there is clipped off past the top of the web view's iframe. overflow-x-hidden
                keeps the y-axis scroller from computing the x-axis to `auto` and adding a second,
                horizontal scrollbar. */}
            <PopoverContent
              align="start"
              className="tw:max-h-(--radix-popover-content-available-height) tw:w-auto tw:overflow-x-hidden tw:overflow-y-auto tw:p-3"
              collisionPadding={8}
            >
              <ScopeSelector
                scope={scope}
                availableScopes={['chapter', 'book', 'selectedBooks']}
                // ScopeSelector's onScopeChange takes the wider ScopeWithRange (the
                // markers-checklist work added a 'range' scope). Find never enables
                // 'range' (not in availableScopes), so this narrowing wrapper just
                // guards that contract before forwarding to the narrow setScope.
                onScopeChange={(newScope: ScopeWithRange) => {
                  if (newScope === 'range') return;
                  setScope(newScope);
                }}
                availableBookInfo={booksPresent}
                selectedBookIds={selectedBookIds}
                onSelectedBookIdsChange={onSelectedBookIdsChange}
                localizedStrings={scopeSelectorLocalizedStrings}
                localizedBookNames={localizedBookData}
                // Find withholds extra material from `availableBookInfo`, which leaves the Extra
                // quick-select button disabled on a project that has some. Say why, so it doesn't
                // read as "this project has no extra material".
                disabledSectionExplanations={extraMaterialNotSearchedExplanation}
              />
            </PopoverContent>
          </Popover>
          {visibleResults.length > 0 && (
            <div className="tw:flex tw:shrink-0 tw:items-center tw:gap-1">
              <span className="tw:text-sm tw:text-muted-foreground tw:tabular-nums">
                {formatReplacementString(localizedStrings['%general_countOfTotal%'], {
                  count: focusedVisibleIndex >= 0 ? String(focusedVisibleIndex + 1) : '–',
                  total: String(visibleResults.length),
                })}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="tw:h-7 tw:w-7"
                disabled={visibleResults.length === 0}
                onClick={handlePreviousResult}
                aria-label={localizedStrings['%webView_find_previousResult%']}
              >
                <ChevronUp className="tw:h-4 tw:w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="tw:h-7 tw:w-7"
                disabled={visibleResults.length === 0}
                onClick={handleNextResult}
                aria-label={localizedStrings['%webView_find_nextResult%']}
              >
                <ChevronDown className="tw:h-4 tw:w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Search Results Placeholder: shown while actually running, and while a valid non-empty term
          is about to auto-search (debounce pending, or waiting on the data provider) — otherwise a
          restored/carried-over term would flash the idle prompt below before the search starts. */}
      {resultsAreaState === 'skeleton' && (
        <div className="tw:space-y-2">
          {Array.from({ length: 5 }).map((_value, index) => (
            // As this is a placeholder, it is safe to use the index as a key
            // eslint-disable-next-line react/no-array-index-key
            <Card key={index}>
              <CardContent className="tw:flex tw:items-center tw:space-x-4 tw:p-4">
                <div className="tw:space-y-2">
                  <Skeleton className="tw:h-4 tw:w-[250px]" />
                  <Skeleton className="tw:h-4 tw:w-[200px]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Search Results */}
      {/* This div is a scroll container that handles keyboard navigation (arrow keys) between search
          results. It needs onKeyDown for result navigation and onScroll for progressive loading, but
          it has no single semantic ARIA role (it's not a listbox, grid, etc.) that would satisfy the
          rule without being misleading. The child result rows are the interactive elements. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={resultsContainerRef}
        className="tw:min-h-48 tw:flex-1 tw:space-y-2 tw:overflow-y-auto tw:pe-2"
        // This div is a keyboard-navigable scroll container; tabIndex is required to receive focus for arrow-key navigation between results
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onScroll={onResultsScroll}
        onKeyDown={handleResultsKeyDown}
      >
        {/* Idle placeholder: no search has run yet (e.g. first open, or after clearing the search),
            so the results region would otherwise be blank. */}
        {resultsAreaState === 'idlePrompt' && (
          <ResultsPlaceholder
            id="find-idle-placeholder"
            message={localizedStrings['%webView_find_searchPrompt%']}
          />
        )}
        {/* No-open-projects placeholder: nothing is open in any editor tab, so there is nothing to
            search. Outranks every other state — every result-activation callback is gated on a
            target editor tab, so results still on screen would be inert, and leaving them rendered
            invites clicks that silently do nothing. */}
        {resultsAreaState === 'noOpenProjectsPrompt' && (
          <ResultsPlaceholder
            id="find-no-open-projects-placeholder"
            message={localizedStrings['%webView_find_noOpenProjectsOrResources_results%']}
          />
        )}
        {/* Invalid-query placeholder: a term is present but won't run (e.g. `selectedBooks` scope
            with no books selected — can happen after a project switch invalidates a carried-over
            selection). Distinct from the idle prompt so the user knows why nothing is happening. */}
        {resultsAreaState === 'invalidQueryPrompt' && (
          <ResultsPlaceholder
            id="find-invalid-query-placeholder"
            message={localizedStrings['%webView_find_selectBooksPrompt%']}
          />
        )}
        {(() => {
          // With no project open in any editor tab there is no target to scroll, so these rows are
          // inert. The no-open-projects placeholder replaces them rather than rendering alongside,
          // so a click can't silently do nothing.
          if (noOpenProjects) return undefined;
          // Same reasoning for a query that can no longer produce these rows: the placeholder is
          // meant to replace them, not sit above them.
          if (!isSearchQueryValid) return undefined;
          // Only the first book that has a replaced result gets the cancel handler.
          // All replaced rows share one pending operation, so only one Cancel button
          // should appear to avoid implying per-row granularity.
          let cancelHandlerAssigned = false;
          return [...resultsByBook.entries()].map(([bookId, bookResults]) => {
            const bookHasReplaced = bookResults.some(({ result }) => result.isReplaced);
            const cancelReplace =
              !cancelHandlerAssigned && bookHasReplaced ? onCancelReplace : undefined;
            if (cancelReplace) cancelHandlerAssigned = true;
            return (
              <SearchResultsInBook
                key={bookId}
                getBookUsj={getBookUsj}
                bookId={bookId}
                results={bookResults.map(({ result }) => result)}
                localizedBookData={localizedBookData}
                focusedResultIndex={bookResults.findIndex(
                  ({ originalIndex }) => originalIndex === focusedResultIndex,
                )}
                onResultClick={(result, indexInBookResults) => {
                  onFocusedResultChange(result, bookResults[indexInBookResults].originalIndex);
                  // Return focus to the scroll container so arrow-key navigation keeps working
                  // after a single click selects/previews a result.
                  setTimeout(() => resultsContainerRef.current?.focus(), 0);
                }}
                onResultFocus={(result, indexInBookResults) =>
                  onResultFocus?.(result, bookResults[indexInBookResults].originalIndex)
                }
                onResultDoubleClick={(result, indexInBookResults) =>
                  onResultDoubleClick?.(result, bookResults[indexInBookResults].originalIndex)
                }
                onResultReferenceClick={(result, indexInBookResults) =>
                  onResultReferenceClick?.(result, bookResults[indexInBookResults].originalIndex)
                }
                onHideResult={(indexInBookResults) =>
                  onHideResult(bookResults[indexInBookResults].originalIndex)
                }
                onReplace={(indexInBookResults) =>
                  onReplace(bookResults[indexInBookResults].originalIndex)
                }
                onCancelReplace={cancelReplace}
                localizedStrings={searchResultLocalizedStrings}
                isReplaceMode={activeMode === 'replace'}
                isReplacing={isReplacing}
                isReplaceBlocked={isReplaceActionBlocked}
                replaceBlockedTooltipText={replaceBlockedTooltipText}
                replaceConfig={replaceConfig}
                previewOptions={previewOptions}
                allowInvisibleCharacters={allowInvisibleCharacters}
                logger={logger}
              />
            );
          });
        })()}
      </div>

      {/* Status bar — suppressed while no project is open, so a stale "Showing N results" cannot
          contradict the placeholder above. */}
      {searchStatus && !noOpenProjects && (
        <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:border-t tw:pt-4">
          {searchStatus === 'running' && (activeMode !== 'replace' || !isPostReplaceSearch) && (
            <div className="tw:flex tw:items-center tw:gap-4">
              <Progress value={searchProgress} className="tw:w-64" />
              <Button onClick={() => onStopSearch()}>
                {localizedStrings['%webView_find_cancelSearch%']}
              </Button>
            </div>
          )}
          {(searchStatus === 'completed' ||
            searchStatus === 'stopped' ||
            searchStatus === 'exceeded') && (
            <p className="tw:font-light tw:text-center">{resultsMessage}</p>
          )}
          {searchStatus === 'errored' && searchError && (
            <p className="tw:font-light tw:text-center">
              {formatReplacementString(localizedStrings['%webView_find_errorOccurred%'], {
                error: searchError,
              })}
            </p>
          )}
        </div>
      )}
      <Sonner />
    </div>
  );
}

export default Find;

// Re-export the scope-selector key constant so the webview/story can resolve those strings.
export { SCOPE_SELECTOR_STRING_KEYS };
