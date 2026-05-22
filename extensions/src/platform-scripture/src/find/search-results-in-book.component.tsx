import { Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  LocalizedStringValue,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjReaderWriter,
} from 'platform-bible-utils';
import { useEffect, useMemo, useState } from 'react';
import { LocalizedBookData } from './find-types';
import SearchResult, {
  HidableFindResult,
  SEARCH_RESULT_LOCALIZED_STRING_KEYS,
} from './search-result.component';

type SearchResultsInBookProps = {
  /**
   * Retrieves the USJ for the given book so the verse context for each result can be computed.
   * Provided by the container (webview reads it from the USJ_Book project data provider; the story
   * returns seed USJ) so this component stays free of `@papi`.
   */
  getBookUsj: (bookId: string) => Promise<Usj | undefined>;
  /** The book ID of the book these results are from */
  bookId: string;
  /** The list of search results in this book */
  results: HidableFindResult[];
  /** Map of book IDs to their localized display names */
  localizedBookData: Map<string, Pick<LocalizedBookData, 'localizedId'>>;
  /** The index of the currently focused/selected result in this list */
  focusedResultIndex: number | undefined;
  /** Callback function called when the user clicks on a search result */
  onResultClick: (searchResult: HidableFindResult, index: number) => void;
  /** Callback function called when the user chooses to hide/dismiss a result */
  onHideResult: (index: number) => void;
  /** Callback function called when the user clicks Replace on a result */
  onReplace: (index: number) => void;
  /** Callback to cancel/revert the pending replace */
  onCancelReplace?: () => void;
  /** Whether the find WebView is currently in replace mode */
  isReplaceMode: boolean;
  /** Whether a replace operation is currently in progress */
  isReplacing: boolean;
  localizedStrings: {
    [localizedInventoryKey in (typeof SEARCH_RESULT_LOCALIZED_STRING_KEYS)[number]]?: LocalizedStringValue;
  };
};

/** Handles rendering the results within a single book of a search. */
export function SearchResultsInBook({
  getBookUsj,
  bookId,
  results,
  localizedBookData,
  focusedResultIndex,
  onResultClick,
  onHideResult,
  onReplace,
  onCancelReplace,
  localizedStrings,
  isReplaceMode,
  isReplacing,
}: SearchResultsInBookProps) {
  const [usjBook, setUsjBook] = useState<Usj | undefined>(undefined);

  useEffect(() => {
    let isActive = true;
    getBookUsj(bookId)
      .then((usj) => {
        if (isActive) setUsjBook(usj);
        return undefined;
      })
      .catch(() => {
        // The verse context is best-effort; if loading the book USJ fails, leave it undefined so
        // results still render without surrounding context.
        if (isActive) setUsjBook(undefined);
      });
    return () => {
      isActive = false;
    };
  }, [getBookUsj, bookId]);

  const usjReaderWriter = useMemo(() => {
    if (!usjBook) return undefined;
    try {
      return new UsjReaderWriter(usjBook, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });
    } catch {
      // If the USJ can't be parsed, fall back to rendering results without verse context rather
      // than surfacing an error.
      return undefined;
    }
  }, [usjBook]);

  const firstReplacedIndex = results.findIndex((r) => r.isReplaced);

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
          onHideResult={onHideResult}
          onReplace={onReplace}
          onCancelReplace={index === firstReplacedIndex ? onCancelReplace : undefined}
          localizedStrings={localizedStrings}
          isReplaceMode={isReplaceMode}
          isReplacing={isReplacing}
        />
      ))}
    </>
  );
}
