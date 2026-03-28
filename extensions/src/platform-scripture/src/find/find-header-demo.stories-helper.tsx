import { SerializedVerseRef } from '@sillsdev/scripture';
import { Scope, useRecentSearches } from 'platform-bible-react';
import { FindJobStatus, WordRestriction } from 'platform-scripture';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FindHeader } from './find-header.component';
import { SearchTextType } from './find-types';
import { DEFAULT_PREVIEW_OPTIONS, PreviewOptions } from './replace-preview-types';

export function FindHeaderDemo() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // custom for demo
  const [verseRefSetting] = useState<SerializedVerseRef>({
    book: 'GEN',
    chapterNum: 1,
    verseNum: 1,
  });

  const [scope, setScope] = useState<Scope>('book');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const addRecentSearchItem = useRecentSearches(recentSearches, setRecentSearches);

  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [shouldMatchCase, setShouldMatchCase] = useState(false);
  const [searchTextType, setSearchTextType] = useState<SearchTextType>('all');
  const [wordRestriction, setWordRestriction] = useState<WordRestriction>('none');
  const [isRegexAllowed, setIsRegexAllowed] = useState(false);

  const [activeMode, setActiveMode] = useState<'find' | 'replace'>('find');
  const [replaceTerm, setReplaceTerm] = useState<string>('');
  const [preserveCase, setPreserveCase] = useState(false);
  const [previewOptions, setPreviewOptions] = useState<PreviewOptions>(DEFAULT_PREVIEW_OPTIONS);

  const [searchStatus, setSearchStatus] = useState<FindJobStatus | undefined>(undefined);

  // custom for demo
  const [focusedResultIndex, setFocusedResultIndex] = useState<number | undefined>(undefined);
  const demoTotalResults = searchStatus === 'completed' ? 5 : 0;

  const areFiltersActive =
    shouldMatchCase || wordRestriction !== 'none' || searchTextType !== 'all' || isRegexAllowed;

  // custom for demo
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);
  const handleStartSearch = () => {
    setSearchStatus('running');
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setSearchStatus('completed');
    }, 1000);

    addRecentSearchItem(searchTerm);
  };

  // custom for demo
  const availableBookIds =
    '111111111111111111111111111111111111111111111111111111111111111111100001000000000000000000001100000000000000101000000000000';

  const scopeDisplayText = useMemo(() => {
    switch (scope) {
      case 'chapter':
        return `${verseRefSetting.book} ${verseRefSetting.chapterNum}`;
      case 'book':
        return verseRefSetting.book;
      case 'selectedBooks':
        return selectedBookIds.length > 0 ? selectedBookIds.join(', ') : '…';
      default:
        return '';
    }
  }, [scope, selectedBookIds, verseRefSetting]);

  const focusedVisibleIndex = focusedResultIndex !== undefined ? focusedResultIndex : -1;

  return (
    <FindHeader
      searchTerm={searchTerm}
      onSearchTermChange={(value) => setSearchTerm(value)}
      onAddToHistory={() => addRecentSearchItem(searchTerm)}
      onSearchSubmit={handleStartSearch}
      onSearchClear={() => setSearchStatus(undefined)}
      recentSearches={recentSearches}
      onRecentSearchSelect={setSearchTerm}
      areFiltersActive={areFiltersActive}
      searchTextType={searchTextType}
      onSearchTextTypeChange={setSearchTextType}
      wordRestriction={wordRestriction}
      onWordRestrictionChange={setWordRestriction}
      shouldMatchCase={shouldMatchCase}
      onShouldMatchCaseChange={setShouldMatchCase}
      isRegexAllowed={isRegexAllowed}
      onIsRegexAllowedChange={setIsRegexAllowed}
      filterStrings={{
        toggleFilters: 'Filters',
        matchContentIn: 'Match content in',
        allText: 'All text',
        allTextTooltip: 'Search in all text including footnotes, headings, etc.',
        verseTextOnly: 'Verse text only',
        restrictions: 'Word boundary',
        restrictionNone: 'None',
        restrictionWholeWord: 'Whole word',
        restrictionStartOfWord: 'Start of word',
        restrictionEndOfWord: 'End of word',
        capitalization: 'Capitalization',
        matchCase: 'Match case',
        pattern: 'Pattern',
        allowRegex: 'Allow regex',
      }}
      activeMode={activeMode}
      onActiveModeChange={setActiveMode}
      replaceTerm={replaceTerm}
      onReplaceTermChange={setReplaceTerm}
      preserveCase={preserveCase}
      onPreserveCaseChange={setPreserveCase}
      onReplace={() => {}}
      onReplaceAll={() => {}}
      isReplacing={false}
      replaceEnabled={focusedResultIndex !== undefined}
      replaceAllEnabled={demoTotalResults > 0}
      scope={scope}
      onScopeChange={setScope}
      selectedBookIds={selectedBookIds}
      onSelectedBookIdsChange={setSelectedBookIds}
      scopeDisplayText={scopeDisplayText}
      availableBookInfo={availableBookIds}
      scopeSelectorStrings={{}}
      previewOptions={previewOptions}
      onPreviewOptionsChange={setPreviewOptions}
      previewOptionsStrings={{
        togglePreviewOptions: 'View',
        layout: 'Layout',
        layoutArrow: 'Arrow',
        layoutInline: 'Inline',
        layoutBlock: 'Block',
        highlightShape: 'Highlight Shape',
        highlightShapeBar: 'Bar border',
        highlightShapeRounded: 'Rounded',
        highlightShapePlain: 'Plain',
        color: 'Color',
        colorRedCyan: 'Red / Cyan',
        colorRedGreen: 'Red / Green',
        colorGreyBlue: 'Grey / Blue',
        monospace: 'Monospace',
        monospaceDescription: 'Use fixed-width font',
        showInvisible: 'Show invisible',
        showInvisibleDescription: 'Show symbols for whitespace',
      }}
      visibleResultsCount={demoTotalResults}
      focusedVisibleIndex={focusedVisibleIndex}
      onPreviousResult={() => {
        if (demoTotalResults === 0) return;
        setFocusedResultIndex((prev) =>
          prev === undefined || prev === 0 ? demoTotalResults - 1 : prev - 1,
        );
      }}
      onNextResult={() => {
        if (demoTotalResults === 0) return;
        setFocusedResultIndex((prev) =>
          prev === undefined || prev >= demoTotalResults - 1 ? 0 : prev + 1,
        );
      }}
      localizedStrings={{
        findTab: 'Find',
        replaceTab: 'Replace',
        searchPlaceholder: 'Search in scripture…',
        showRecentSearches: 'Show recent searches',
        recent: 'Recent',
        replacePlaceholder: 'Replace with…',
        preserveCase: 'Preserve case',
        preserveCaseTooltip:
          'When enabled, the replacement text will match the case pattern of the found text.',
        replaceAll: 'Replace All',
        replace: 'Replace',
        showing: 'Showing',
        countOfTotal: '{count} of {total}',
        previousResult: 'Previous result',
        nextResult: 'Next result',
      }}
    />
  );
}
