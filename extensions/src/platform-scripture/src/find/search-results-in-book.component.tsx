import {
  getErrorMessage,
  isPlatformError,
  LocalizedStringValue,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjReaderWriter,
} from 'platform-bible-utils';
import { useProjectData } from '@papi/frontend/react';
import { useMemo } from 'react';
import { logger } from '@papi/frontend';
import SearchResult, {
  HidableFindResult,
  SEARCH_RESULT_LOCALIZED_STRING_KEYS,
} from './search-result.component';

type SearchResultsInBookProps = {
  /** The ID of the project being searched */
  projectId: string | undefined;
  /** The book ID of the book these results are from */
  bookId: string;
  /** The list of search results in this book */
  results: HidableFindResult[];
  /** Map of book IDs to their localized display names */
  localizedBookData: Map<string, { localizedId: string }>;
  /** The index of the currently focused/selected result in this list */
  focusedResultIndex: number | undefined;
  /** Callback function called when the user clicks on a search result */
  onResultClick: (searchResult: HidableFindResult, index: number) => void;
  /** Callback function called when the user double clicks on a search result */
  onResultDoubleClick: (searchResult: HidableFindResult, index: number) => void;
  /** Callback function called when the user chooses to hide/dismiss a result */
  onHideResult: (index: number) => void;
  localizedStrings: {
    [localizedInventoryKey in (typeof SEARCH_RESULT_LOCALIZED_STRING_KEYS)[number]]?: LocalizedStringValue;
  };
};

/** Handles rendering the results within a single book of a search. */
export function SearchResultsInBook({
  projectId,
  bookId,
  results,
  localizedBookData,
  focusedResultIndex,
  onResultClick,
  onResultDoubleClick,
  onHideResult,
  localizedStrings,
}: SearchResultsInBookProps) {
  const verseRefForBook = useMemo(() => {
    return {
      book: bookId,
      chapterNum: 1,
      verseNum: 0,
    };
  }, [bookId]);

  const [usjBookPossiblyError] = useProjectData(
    'platformScripture.USJ_Book',
    projectId ?? undefined,
  ).BookUSJ(verseRefForBook, undefined);

  const usjBook = useMemo(() => {
    if (isPlatformError(usjBookPossiblyError)) {
      logger.warn(
        `Error retrieving USJ Book ${bookId} for search results in book: ${getErrorMessage(usjBookPossiblyError)}`,
      );
      return undefined;
    }
    return usjBookPossiblyError;
  }, [usjBookPossiblyError, bookId]);

  const usjReaderWriter = useMemo(() => {
    if (!usjBook) return undefined;
    try {
      return new UsjReaderWriter(usjBook, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });
    } catch (error) {
      logger.warn(
        `Error creating UsjReaderWriter ${bookId} for search results in book: ${getErrorMessage(error)}`,
      );
      return undefined;
    }
  }, [usjBook, bookId]);

  return (
    <>
      {results.map((result, index) => (
        <SearchResult
          key={`${result.start.verseRef.book + result.start.verseRef.chapterNum}:${result.start.verseRef.verseNum}${result.text}${result.start.offset}`}
          searchResult={result}
          globalResultsIndex={index}
          isSelected={index === focusedResultIndex}
          usjReaderWriter={usjReaderWriter}
          localizedBookData={localizedBookData}
          onResultClick={onResultClick}
          onResultDoubleClick={onResultDoubleClick}
          onHideResult={onHideResult}
          localizedStrings={localizedStrings}
        />
      ))}
    </>
  );
}
