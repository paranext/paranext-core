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
import { useCallback, useMemo, useState } from 'react';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { alertCommand } from '../../../../../.storybook/story.utils';
import { Find, FIND_LOCALIZED_STRING_KEYS, type BookResultEntry } from './find.component';
import { LocalizedBookData, SearchTextType } from './find-types';
import { HidableFindResult, SEARCH_RESULT_LOCALIZED_STRING_KEYS } from './search-result.component';

/**
 * `Find` is the find/replace UI for a Scripture project: a search input with recent searches, a
 * scope selector, filters, a find/replace mode toggle, and a results list grouped by book. In the
 * app the webview owns the find-job lifecycle (begin/poll/stop), replace-with-revert,
 * version-history commits, and editor navigation, feeding the panel the derived results and
 * progress. These stories feed it from a thin in-memory service so the flow is interactive: replace
 * mutates the seed results in place, the scope/filters/mode are driven by local state, and editor
 * navigation announces the command the webview would run.
 */

const localizedStrings = getLocalizedStrings([...FIND_LOCALIZED_STRING_KEYS]);
const scopeSelectorLocalizedStrings = getLocalizedStrings([...SCOPE_SELECTOR_STRING_KEYS]);
const searchResultLocalizedStrings = getLocalizedStrings([...SEARCH_RESULT_LOCALIZED_STRING_KEYS]);

const SEARCH_TERM = 'God';

// Seed USX for the two books we search across, so the selected result can render verse context.
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

/**
 * Build a {@link HidableFindResult} for an occurrence of the search term in a verse, computing the
 * USFM offsets from the seed USJ so the selected result renders the matched text in context. Uses
 * the same `UsjReaderWriter` the component uses (no `@papi`).
 */
function makeResult(
  bookId: string,
  chapterNum: number,
  verseNum: number,
  occurrence = 1,
): HidableFindResult {
  const verseRef: SerializedVerseRef = { book: bookId, chapterNum, verseNum };
  const readerWriter = new UsjReaderWriter(seedUsjByBook[bookId], {
    markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
  });
  const usfm = readerWriter.toUsfm();
  const verseStartIndex = readerWriter.usfmVerseLocationToIndexInUsfm(verseRef);

  // Find the requested occurrence of the term at or after the verse start.
  let matchIndex = -1;
  let searchFrom = verseStartIndex;
  for (let i = 0; i < occurrence; i++) {
    matchIndex = usfm.indexOf(SEARCH_TERM, searchFrom);
    searchFrom = matchIndex + SEARCH_TERM.length;
  }

  const start: UsfmVerseRefVerseLocation = { verseRef, offset: matchIndex - verseStartIndex };
  const end: UsfmVerseRefVerseLocation = {
    verseRef,
    offset: matchIndex - verseStartIndex + SEARCH_TERM.length,
  };
  return { start, end, text: SEARCH_TERM };
}

const seedResults: HidableFindResult[] = [
  makeResult('GEN', 1, 1),
  makeResult('GEN', 1, 2),
  makeResult('GEN', 1, 3),
  makeResult('JHN', 1, 1, 1),
  makeResult('JHN', 1, 1, 2),
];

const availableBookIds = ['GEN', 'JHN'];

const booksPresent = Canon.allBookIds
  .map((bookId) => (availableBookIds.includes(bookId) ? '1' : '0'))
  .join('');

const localizedBookData = new Map<string, LocalizedBookData>([
  ['GEN', { localizedId: 'Genesis', localizedName: 'Genesis' }],
  ['JHN', { localizedId: 'John', localizedName: 'John' }],
]);

const completedStatus: FindJobStatus = 'completed';
const runningStatus: FindJobStatus = 'running';

type HarnessConfig = {
  /** Seed results the in-memory service serves. */
  results?: HidableFindResult[];
  /** Initial search term. */
  searchTerm?: string;
  /** Initial mode. */
  activeMode?: 'find' | 'replace';
  /** The find-job status the status bar reflects. */
  searchStatus?: FindJobStatus | undefined;
  /** Percent complete for an in-progress search. */
  searchProgress?: number;
  /** Total results the job reports. */
  totalNumberOfResults?: number;
};

/**
 * Thin in-memory service container: holds the search/replace/filter state and the results, mutates
 * the results on replace/replace-all (mark replaced) and on hide, returns seed USJ for verse
 * context, and routes editor navigation to `alertCommand` (the different-UI action the webview
 * would perform).
 */
function FindHarness({ config }: { config: HarnessConfig }) {
  const [searchTerm, setSearchTerm] = useState(config.searchTerm ?? SEARCH_TERM);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Lord', 'beginning']);
  const [scope, setScope] = useState<Scope>('book');
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN']);
  const [shouldMatchCase, setShouldMatchCase] = useState(false);
  const [searchTextType, setSearchTextType] = useState<SearchTextType>('all');
  const [wordRestriction, setWordRestriction] = useState<WordRestriction>('none');
  const [isRegexAllowed, setIsRegexAllowed] = useState(false);

  const [activeMode, setActiveMode] = useState<'find' | 'replace'>(config.activeMode ?? 'find');
  const [replaceTerm, setReplaceTerm] = useState('Yahweh');
  const [preserveCase, setPreserveCase] = useState(false);

  const [results, setResults] = useState<HidableFindResult[]>(config.results ?? seedResults);
  const [focusedResultIndex, setFocusedResultIndex] = useState<number | undefined>(
    config.activeMode === 'replace' ? 0 : undefined,
  );
  const [numberOfHiddenResults, setNumberOfHiddenResults] = useState(0);

  const verseRef = useMemo<SerializedVerseRef>(
    () => ({ book: 'GEN', chapterNum: 1, verseNum: 1 }),
    [],
  );

  const resultsByBook = useMemo<Map<string, BookResultEntry[]>>(() => {
    const map = new Map<string, BookResultEntry[]>();
    results.forEach((result, originalIndex) => {
      const bookId = result.start.verseRef.book;
      const entries = map.get(bookId) ?? [];
      entries.push({ result, originalIndex });
      map.set(bookId, entries);
    });
    return map;
  }, [results]);

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

  const handleHideResult = useCallback((index: number) => {
    setResults((prev) =>
      prev.map((result, i) => (i === index ? { ...result, isHidden: true } : result)),
    );
    setNumberOfHiddenResults((prev) => prev + 1);
    setFocusedResultIndex(undefined);
  }, []);

  const handleReplace = useCallback(
    (resultIndex?: number) => {
      const indexToReplace = resultIndex ?? focusedResultIndex;
      if (indexToReplace === undefined) return;
      // Mark the replaced result so the UI reflects it; in the app a re-find then refreshes.
      setResults((prev) =>
        prev.map((result, i) => (i === indexToReplace ? { ...result, isReplaced: true } : result)),
      );
    },
    [focusedResultIndex],
  );

  const handleReplaceAll = useCallback(() => {
    setResults((prev) =>
      prev.map((result) => (result.isHidden ? result : { ...result, isReplaced: true })),
    );
  }, []);

  const handleCancelReplace = useCallback(() => {
    // Cancel/revert the pending replace: unmark the replaced results.
    setResults((prev) => prev.map((result) => ({ ...result, isReplaced: false })));
  }, []);

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
      results={results}
      resultsByBook={resultsByBook}
      focusedResultIndex={focusedResultIndex}
      searchStatus={config.searchStatus ?? completedStatus}
      searchError={undefined}
      searchProgress={config.searchProgress ?? 0}
      totalNumberOfResults={config.totalNumberOfResults ?? results.length}
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
 * A populated find result list across two books. Click a result to select it (announces the editor
 * command the webview would run) and watch its verse context render.
 */
export const Populated: Story = {
  decorators: [createDecorator({})],
};

/**
 * Replace mode: the replace input and Replace / Replace All buttons show. Clicking Replace marks
 * the focused result as replaced; Replace All marks all visible results; Cancel reverts them.
 */
export const ReplaceMode: Story = {
  decorators: [createDecorator({ activeMode: 'replace' })],
};

/** An in-progress search — the progress bar and Cancel button show while results stream in. */
export const InProgress: Story = {
  decorators: [
    createDecorator({
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
    createDecorator({ results: [], searchStatus: completedStatus, totalNumberOfResults: 0 }),
  ],
};

/**
 * Replace mode with results already marked as replaced (the red "replaced" state + revert Cancel
 * button). Use Cancel to revert them back.
 */
export const Replaced: Story = {
  decorators: [
    createDecorator({
      activeMode: 'replace',
      results: seedResults.map((result) => ({ ...result, isReplaced: true })),
    }),
  ],
};
