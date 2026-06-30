import { Usj, usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Scope, SCOPE_SELECTOR_STRING_KEYS } from 'platform-bible-react';
import {
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjReaderWriter,
  type UsfmVerseRefVerseLocation,
} from 'platform-bible-utils';
import { FindJobStatus, WordRestriction } from 'platform-scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { alertCommand } from '../../../../../.storybook/story.utils';
import { Find, FIND_LOCALIZED_STRING_KEYS, type BookResultEntry } from './find.component';
import { replacementContainsStructuralMarker } from './structure-protection.util';
import { LocalizedBookData, SearchTextType } from './find-types';
import { HidableFindResult, SEARCH_RESULT_LOCALIZED_STRING_KEYS } from './search-result.component';

/**
 * `Find` is the find/replace UI for a Scripture project: a search input with recent searches, a
 * scope selector, filters, a find/replace mode toggle, and a results list grouped by book. In the
 * app the webview owns the find-job lifecycle (begin/poll/stop), replace-with-revert,
 * version-history commits, and editor navigation, feeding the panel the derived results and
 * progress.
 *
 * These stories stand in for that webview with a thin in-memory search engine over a small seed
 * corpus, so the flow is fully interactive: typing a term, toggling the filters (match case, word
 * restriction, regex), and changing the scope all re-run the search and update the results and the
 * highlighting live. Replace / Replace All announce the command the webview would run, show the
 * "replaced" state, then commit (the matched result drops out, as a real re-find would); Cancel
 * reverts the pending replace. Selecting a result announces the editor navigation command.
 */

const localizedStrings = getLocalizedStrings([...FIND_LOCALIZED_STRING_KEYS]);
const scopeSelectorLocalizedStrings = getLocalizedStrings([...SCOPE_SELECTOR_STRING_KEYS]);
const searchResultLocalizedStrings = getLocalizedStrings([...SEARCH_RESULT_LOCALIZED_STRING_KEYS]);

const DEFAULT_SEARCH_TERM = 'God';

// Seed USX for the books we search across, so results can render verse context and the search
// engine has real text to scan.
const seedUsxByBook: Record<string, string> = {
  GEN: `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="GEN" style="id">World English Bible (WEB)</book>
  <chapter number="1" style="c" sid="GEN 1" />
  <para style="p"><verse number="1" style="v" sid="GEN 1:1" />In the beginning, God created the heavens and the earth.<verse eid="GEN 1:1" /></para>
  <para style="p"><verse number="2" style="v" sid="GEN 1:2" />The earth was formless and empty. God's Spirit was hovering over the surface of the waters.<verse eid="GEN 1:2" /></para>
  <para style="p"><verse number="3" style="v" sid="GEN 1:3" />God said, "Let there be light," and there was light.<verse eid="GEN 1:3" /></para>
</usx>
`,
  JHN: `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="JHN" style="id">World English Bible (WEB)</book>
  <chapter number="1" style="c" sid="JHN 1" />
  <para style="p"><verse number="1" style="v" sid="JHN 1:1" />In the beginning was the Word, and the Word was with God, and the Word was God.<verse eid="JHN 1:1" /></para>
</usx>
`,
};

const seedUsjByBook: Record<string, Usj> = Object.fromEntries(
  Object.entries(seedUsxByBook).map(([bookId, usx]) => [bookId, usxStringToUsj(usx)]),
);

/** The verses present in each seed book, in order, used to scan verse regions of the USFM. */
const seedVersesByBook: Record<string, SerializedVerseRef[]> = {
  GEN: [
    { book: 'GEN', chapterNum: 1, verseNum: 1 },
    { book: 'GEN', chapterNum: 1, verseNum: 2 },
    { book: 'GEN', chapterNum: 1, verseNum: 3 },
  ],
  JHN: [{ book: 'JHN', chapterNum: 1, verseNum: 1 }],
};

const availableBookIds = ['GEN', 'JHN'];

const booksPresent = Canon.allBookIds
  .map((bookId) => (availableBookIds.includes(bookId) ? '1' : '0'))
  .join('');

const localizedBookData = new Map<string, LocalizedBookData>([
  ['GEN', { localizedId: 'Genesis', localizedName: 'Genesis' }],
  ['JHN', { localizedId: 'John', localizedName: 'John' }],
]);

type SearchParams = {
  term: string;
  shouldMatchCase: boolean;
  wordRestriction: WordRestriction;
  searchTextType: SearchTextType;
  isRegexAllowed: boolean;
  scope: Scope;
  selectedBookIds: string[];
  verseRef: SerializedVerseRef;
};

/** Escape regex metacharacters so a plain search term is matched literally. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Build the regular expression for the current search params (or `undefined` for an empty term or
 * an invalid user-supplied regex). Honors match-case, the word-boundary restriction, and the
 * allow-regex toggle the same way the real find job's options would.
 */
function buildSearchRegex(params: SearchParams): RegExp | undefined {
  if (!params.term) return undefined;
  const flags = `g${params.shouldMatchCase ? '' : 'i'}`;
  if (params.isRegexAllowed) {
    try {
      return new RegExp(params.term, flags);
    } catch {
      // Invalid regex while the user is typing → no matches (matches the app surfacing zero results).
      return undefined;
    }
  }
  const escaped = escapeRegExp(params.term);
  switch (params.wordRestriction) {
    case 'wholeWord':
      return new RegExp(`\\b${escaped}\\b`, flags);
    case 'startOfWord':
      return new RegExp(`\\b${escaped}`, flags);
    case 'endOfWord':
      return new RegExp(`${escaped}\\b`, flags);
    default:
      return new RegExp(escaped, flags);
  }
}

/**
 * The books the current scope searches: the current book for chapter/book, the chosen set
 * otherwise.
 */
function booksInScope(params: SearchParams): string[] {
  if (params.scope === 'selectedBooks')
    return params.selectedBookIds.filter((id) => seedUsjByBook[id]);
  return [params.verseRef.book];
}

/**
 * The in-memory search engine standing in for the find job: scans the seed USFM verse-by-verse for
 * the term and returns a result per occurrence, with USFM offsets computed the same way the verse
 * context is rendered (`usfmVerseLocationToIndexInUsfm`) so the highlight lands on the match. (The
 * seed corpus has no non-verse text, so the match-content-in filter re-runs the search but returns
 * the same set here.)
 */
function runSearch(params: SearchParams): HidableFindResult[] {
  const baseRegex = buildSearchRegex(params);
  if (!baseRegex) return [];

  const results: HidableFindResult[] = [];
  booksInScope(params).forEach((bookId) => {
    const usj = seedUsjByBook[bookId];
    if (!usj) return;
    const readerWriter = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });
    const usfm = readerWriter.toUsfm();
    const verses = seedVersesByBook[bookId] ?? [];
    verses.forEach((verse, index) => {
      if (params.scope === 'chapter' && verse.chapterNum !== params.verseRef.chapterNum) return;
      const verseStart = readerWriter.usfmVerseLocationToIndexInUsfm(verse);
      const nextVerse = verses[index + 1];
      const verseEnd = nextVerse
        ? readerWriter.usfmVerseLocationToIndexInUsfm(nextVerse)
        : usfm.length;
      const region = usfm.slice(verseStart, verseEnd);
      // Fresh regex per region so the shared lastIndex never leaks between verses.
      const regex = new RegExp(baseRegex.source, baseRegex.flags);
      Array.from(region.matchAll(regex)).forEach((match) => {
        if (!match[0]) return;
        const offset = match.index ?? 0;
        const start: UsfmVerseRefVerseLocation = { verseRef: verse, offset };
        const end: UsfmVerseRefVerseLocation = {
          verseRef: verse,
          offset: offset + match[0].length,
        };
        results.push({ start, end, text: match[0] });
      });
    });
  });
  return results;
}

/** Stable per-result key (book chapter:verse@offset) for tracking hidden/replaced/committed state. */
const resultKey = (result: HidableFindResult): string =>
  `${result.start.verseRef.book} ${result.start.verseRef.chapterNum}:${result.start.verseRef.verseNum}@${result.start.offset}`;

const completedStatus: FindJobStatus = 'completed';
const runningStatus: FindJobStatus = 'running';

/** How long the simulated replace takes before it commits (matches the result card's progress bar). */
const REPLACE_COMMIT_DELAY_MS = 1300;

type HarnessConfig = {
  /** Live in-memory search (default). Set false for fixed-state showcase stories. */
  live?: boolean;
  /** Fixed results when `live` is false. */
  results?: HidableFindResult[];
  /** Initial search term. */
  searchTerm?: string;
  /** Initial mode. */
  activeMode?: 'find' | 'replace';
  /** Initial scope. */
  scope?: Scope;
  /** Initial selected books for the `selectedBooks` scope. */
  selectedBookIds?: string[];
  /** The find-job status the status bar reflects (fixed-state stories only). */
  searchStatus?: FindJobStatus;
  /** Percent complete for an in-progress search. */
  searchProgress?: number;
  /** Total results the job reports (fixed-state stories only). */
  totalNumberOfResults?: number;
  /** Start with every result already in the replaced state (the Replaced showcase). */
  initiallyReplacedAll?: boolean;
  /** Initial replace term (defaults to a sample word). */
  replaceTerm?: string;
  /**
   * Whether structure is locked. When `true`, the protected note shows and a replacement containing
   * a paragraph/verse/chapter marker disables Replace with an explanatory tooltip.
   */
  isStructureProtected?: boolean;
};

/**
 * Thin in-memory service container. It owns the search/replace/filter state and runs the search
 * engine reactively, then layers hidden / replaced / committed result state on top so hide and
 * replace behave like the app: replace shows the "replaced" state, announces the command, and after
 * a short delay commits (the result drops out as a re-find would); Cancel reverts pending
 * replaces.
 */
function FindHarness({ config }: { config: HarnessConfig }) {
  const isLive = config.live !== false;

  const [searchTerm, setSearchTerm] = useState(config.searchTerm ?? DEFAULT_SEARCH_TERM);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Lord', 'beginning']);
  const [scope, setScope] = useState<Scope>(config.scope ?? 'selectedBooks');
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>(
    config.selectedBookIds ?? ['GEN', 'JHN'],
  );
  const [shouldMatchCase, setShouldMatchCase] = useState(false);
  const [searchTextType, setSearchTextType] = useState<SearchTextType>('all');
  const [wordRestriction, setWordRestriction] = useState<WordRestriction>('none');
  const [isRegexAllowed, setIsRegexAllowed] = useState(false);

  const [activeMode, setActiveMode] = useState<'find' | 'replace'>(config.activeMode ?? 'find');
  const [replaceTerm, setReplaceTerm] = useState(config.replaceTerm ?? 'Yahweh');
  const [preserveCase, setPreserveCase] = useState(false);

  const [focusedResultIndex, setFocusedResultIndex] = useState<number | undefined>(undefined);

  // Result overlay: user-dismissed, pending-replace (red), and committed (replace ran through).
  const [hiddenKeys, setHiddenKeys] = useState<Set<string>>(new Set());
  const [replacedKeys, setReplacedKeys] = useState<Set<string>>(new Set());
  const [committedKeys, setCommittedKeys] = useState<Set<string>>(new Set());

  const replacedKeysRef = useRef<Set<string>>(replacedKeys);
  useEffect(() => {
    replacedKeysRef.current = replacedKeys;
  }, [replacedKeys]);
  const commitTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const verseRef = useMemo<SerializedVerseRef>(
    () => ({ book: 'GEN', chapterNum: 1, verseNum: 1 }),
    [],
  );

  const baseResults = useMemo<HidableFindResult[]>(() => {
    if (!isLive) return config.results ?? [];
    return runSearch({
      term: searchTerm,
      shouldMatchCase,
      wordRestriction,
      searchTextType,
      isRegexAllowed,
      scope,
      selectedBookIds,
      verseRef,
    });
  }, [
    isLive,
    config.results,
    searchTerm,
    shouldMatchCase,
    wordRestriction,
    searchTextType,
    isRegexAllowed,
    scope,
    selectedBookIds,
    verseRef,
  ]);

  // A fresh result set (new search) clears the transient overlay and resets focus. The Replaced
  // showcase seeds every result into the replaced state instead.
  useEffect(() => {
    setHiddenKeys(new Set());
    setCommittedKeys(new Set());
    setReplacedKeys(config.initiallyReplacedAll ? new Set(baseResults.map(resultKey)) : new Set());
    setFocusedResultIndex(activeMode === 'replace' && baseResults.length > 0 ? 0 : undefined);
    if (commitTimerRef.current) {
      clearTimeout(commitTimerRef.current);
      commitTimerRef.current = undefined;
    }
  }, [baseResults, config.initiallyReplacedAll, activeMode]);

  const displayedResults = useMemo<HidableFindResult[]>(
    () =>
      baseResults.map((result) => {
        const key = resultKey(result);
        return {
          ...result,
          isHidden: hiddenKeys.has(key) || committedKeys.has(key),
          isReplaced: replacedKeys.has(key) && !committedKeys.has(key),
        };
      }),
    [baseResults, hiddenKeys, replacedKeys, committedKeys],
  );

  const resultsByBook = useMemo<Map<string, BookResultEntry[]>>(() => {
    const map = new Map<string, BookResultEntry[]>();
    displayedResults.forEach((result, originalIndex) => {
      const bookId = result.start.verseRef.book;
      const entries = map.get(bookId) ?? [];
      entries.push({ result, originalIndex });
      map.set(bookId, entries);
    });
    return map;
  }, [displayedResults]);

  const addRecentSearchItem = useCallback((term: string) => {
    if (term.trim() === '') return;
    setRecentSearches((prev) => [term, ...prev.filter((t) => t !== term)].slice(0, 10));
  }, []);

  const getBookUsj = useCallback(async (bookId: string) => seedUsjByBook[bookId], []);

  const handleFocusedResultChange = useCallback(
    (searchResult: HidableFindResult, index: number) => {
      setFocusedResultIndex(index);
      // Selecting a result navigates/selects it in the editor in the real app.
      alertCommand('platformScriptureEditor.selectRange', {
        start: searchResult.start.verseRef,
        end: searchResult.end.verseRef,
      });
    },
    [],
  );

  const handleHideResult = useCallback(
    (index: number) => {
      const target = displayedResults[index];
      if (!target) return;
      const key = resultKey(target);
      setHiddenKeys((prev) => new Set(prev).add(key));
      setFocusedResultIndex(undefined);
    },
    [displayedResults],
  );

  // After the replaced animation, commit the pending replaces: the matched results drop out, just
  // as the app's mandatory re-find would no longer return the replaced occurrences.
  const scheduleReplaceCommit = useCallback(() => {
    if (commitTimerRef.current) clearTimeout(commitTimerRef.current);
    commitTimerRef.current = setTimeout(() => {
      setCommittedKeys((prev) => new Set([...prev, ...replacedKeysRef.current]));
      setReplacedKeys(new Set());
      commitTimerRef.current = undefined;
    }, REPLACE_COMMIT_DELAY_MS);
  }, []);

  const handleReplace = useCallback(
    (resultIndex?: number) => {
      const indexToReplace = resultIndex ?? focusedResultIndex;
      if (indexToReplace === undefined) return;
      const target = displayedResults[indexToReplace];
      if (!target || target.isReplaced || target.isHidden) return;
      alertCommand('platformScripture.replaceText', {
        reference: `${target.start.verseRef.book} ${target.start.verseRef.chapterNum}:${target.start.verseRef.verseNum}`,
        search: searchTerm,
        replace: replaceTerm,
      });
      setReplacedKeys((prev) => new Set(prev).add(resultKey(target)));
      scheduleReplaceCommit();
    },
    [displayedResults, focusedResultIndex, searchTerm, replaceTerm, scheduleReplaceCommit],
  );

  const handleReplaceAll = useCallback(() => {
    const toReplace = displayedResults.filter((result) => !result.isHidden && !result.isReplaced);
    if (toReplace.length === 0) return;
    alertCommand('platformScripture.replaceAllText', {
      search: searchTerm,
      replace: replaceTerm,
      count: toReplace.length,
    });
    setReplacedKeys((prev) => {
      const next = new Set(prev);
      toReplace.forEach((result) => next.add(resultKey(result)));
      return next;
    });
    scheduleReplaceCommit();
  }, [displayedResults, searchTerm, replaceTerm, scheduleReplaceCommit]);

  const handleCancelReplace = useCallback(() => {
    if (commitTimerRef.current) {
      clearTimeout(commitTimerRef.current);
      commitTimerRef.current = undefined;
    }
    // Revert the pending (not-yet-committed) replaces.
    setReplacedKeys(new Set());
  }, []);

  const numberOfHiddenResults = hiddenKeys.size + committedKeys.size;
  const liveSearchStatus: FindJobStatus | undefined = searchTerm.trim()
    ? completedStatus
    : undefined;
  const searchStatus: FindJobStatus | undefined = isLive ? liveSearchStatus : config.searchStatus;
  const totalNumberOfResults = isLive
    ? baseResults.length
    : (config.totalNumberOfResults ?? baseResults.length);

  // When structure is locked, a replacement that itself contains a paragraph/verse/chapter marker
  // would change structure, so Replace is disabled with a tooltip. Computed live so editing the
  // replace term in the story toggles the disabled state, mirroring the real web view.
  const isStructureProtected = config.isStructureProtected ?? false;
  const isReplacementStructureChanging =
    isStructureProtected && replacementContainsStructuralMarker(replaceTerm);

  return (
    <Find
      localizedStrings={localizedStrings}
      scopeSelectorLocalizedStrings={scopeSelectorLocalizedStrings}
      searchResultLocalizedStrings={searchResultLocalizedStrings}
      searchTerm={searchTerm}
      recentSearches={recentSearches}
      scope={scope}
      verseRef={verseRef}
      booksPresent={booksPresent}
      selectedBookIds={selectedBookIds}
      localizedBookData={localizedBookData}
      shouldMatchCase={shouldMatchCase}
      searchTextType={searchTextType}
      wordRestriction={wordRestriction}
      isRegexAllowed={isRegexAllowed}
      activeMode={activeMode}
      replaceTerm={replaceTerm}
      preserveCase={preserveCase}
      isReplacing={false}
      isStructureProtected={isStructureProtected}
      isReplacementStructureChanging={isReplacementStructureChanging}
      results={displayedResults}
      resultsByBook={resultsByBook}
      focusedResultIndex={focusedResultIndex}
      searchStatus={searchStatus}
      searchError={undefined}
      searchProgress={config.searchProgress ?? 0}
      totalNumberOfResults={totalNumberOfResults}
      numberOfHiddenResults={numberOfHiddenResults}
      isPostReplaceSearch={false}
      onSearchTermChange={setSearchTerm}
      onStartSearch={() => addRecentSearchItem(searchTerm)}
      onStopSearch={() => {}}
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
      onHideResult={handleHideResult}
      onReplace={handleReplace}
      onReplaceAll={handleReplaceAll}
      onCancelReplace={handleCancelReplace}
      onResultsScroll={() => {}}
      getBookUsj={getBookUsj}
    />
  );
}

const meta: Meta<typeof FindHarness> = {
  title: 'Bundled Extensions/platform-scripture/Find',
  component: FindHarness,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FindHarness>;

function createDecorator(config: HarnessConfig) {
  return function FindDecorator() {
    return <FindHarness config={config} />;
  };
}

/**
 * A live, fully interactive find across Genesis and John. Edit the search term, toggle the filters
 * (match case / word restriction / regex), and change the scope — the results and the highlighting
 * update live. Click a result to select it (announces the editor command the webview would run).
 */
export const Populated: Story = {
  decorators: [createDecorator({})],
};

/**
 * Replace mode against the same live search. Clicking Replace (or Replace All) announces the
 * command, shows the "replaced" state, then commits (the result drops out as a re-find would);
 * Cancel reverts a pending replace before it commits.
 */
export const ReplaceMode: Story = {
  decorators: [createDecorator({ activeMode: 'replace' })],
};

/** An in-progress search — the progress bar and Cancel button show while results stream in. */
export const InProgress: Story = {
  decorators: [
    createDecorator({
      live: false,
      results: [],
      searchStatus: runningStatus,
      searchProgress: 40,
      totalNumberOfResults: 12,
    }),
  ],
};

/** No results were found for the search term — the empty-state message renders. */
export const NoResults: Story = {
  decorators: [
    createDecorator({
      live: false,
      results: [],
      searchStatus: completedStatus,
      totalNumberOfResults: 0,
    }),
  ],
};

/**
 * Replace mode with every result already in the "replaced" state (the red state + revert Cancel
 * button). Use Cancel to revert them.
 */
export const Replaced: Story = {
  decorators: [createDecorator({ activeMode: 'replace', initiallyReplacedAll: true })],
};

/**
 * Replace mode with structure locked. The locked-structure note shows above the results, and
 * because the replace term contains a paragraph marker (`\p`) the replacement would change
 * structure — so Replace / Replace All are disabled and hovering them explains why. Clear or edit
 * the replace term to a plain word to see Replace re-enable while the note stays.
 */
export const StructureProtected: Story = {
  decorators: [
    createDecorator({ activeMode: 'replace', isStructureProtected: true, replaceTerm: '\\p text' }),
  ],
};
