import { logger } from '@papi/frontend';
import { Copy, X } from 'lucide-react';
import { DropdownMenuItem, ResultsCard } from 'platform-bible-react';
import {
  getErrorMessage,
  LocalizedStringValue,
  LocalizeKey,
  UsjReaderWriter,
} from 'platform-bible-utils';
import { FindResult } from 'platform-scripture';
import { useEffect, useMemo, useState } from 'react';

export type HidableFindResult = FindResult & { isHidden?: boolean };

/** How many words to show around the search result */
const WORDS_AROUND_SEARCH_RESULT = 15;

export const SEARCH_RESULT_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%webView_find_copyReference%',
  '%webView_find_copyVerseText%',
  '%webView_find_copyReferenceAndVerseText%',
  '%webView_find_dismiss%',
  '%webView_find_noVerseTextAvailable%',
  '%webView_find_loadingVerseText%',
];

/** Props interface for the SearchResult component */
interface SearchResultProps {
  /** The search result data to display */
  searchResult: HidableFindResult;
  /** The global index of this result in the complete search results list */
  globalResultsIndex: number;
  /** Whether this search result is currently selected/focused */
  isSelected: boolean;
  /** UsjReaderWriter for the book this search result occurred in */
  usjReaderWriter: UsjReaderWriter | undefined;
  /** Map of book IDs to their localized display names */
  localizedBookData: Map<string, { localizedId: string }>;
  /** Callback function called when the user clicks on this search result */
  onResultClick: (searchResult: HidableFindResult, index: number) => void;
  /** Callback function called when the user chooses to hide/dismiss this result */
  onHideResult: (index: number) => void;
  localizedStrings: {
    [localizedInventoryKey in (typeof SEARCH_RESULT_LOCALIZED_STRING_KEYS)[number]]?: LocalizedStringValue;
  };
}

const countWords = (text: string): number => {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
};

const truncateText = (text: string, maxWords: number, shouldCutFromStart: boolean): string => {
  // Don't trim when truncating because we want to keep the original spacing so the text doesn't
  // lose spaces around the search result
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;

  if (shouldCutFromStart) {
    return words.slice(-maxWords).join(' ');
  }
  return words.slice(0, maxWords).join(' ');
};

/**
 * SearchResult component displays a single search result item with verse reference, matched text,
 * and contextual actions. When selected, it shows the full verse text with the search term
 * highlighted and provides options to copy reference, verse text, or both.
 *
 * @param props - The props for the SearchResult component
 * @returns JSX element representing a search result card
 */
export default function SearchResult({
  searchResult,
  globalResultsIndex,
  isSelected,
  usjReaderWriter,
  localizedBookData,
  onResultClick,
  onHideResult,
  localizedStrings,
}: SearchResultProps) {
  // We should avoid calculating context unless this result is selected to improve performance
  const [shouldCalculateContext, setShouldGetVerseText] = useState<boolean>(isSelected);

  // When this result becomes selected, we should calculate the context if we haven't already
  useEffect(() => {
    if (isSelected) {
      setShouldGetVerseText(true);
    }
  }, [isSelected]);

  // Determine the text to show before the search result, the search result, and the text after
  const textParts = useMemo(() => {
    if (!usjReaderWriter || !shouldCalculateContext) return undefined;
    try {
      const startIndexInUsfm = usjReaderWriter.usfmVerseLocationToIndexInUsfm(searchResult.start);
      const endIndexInUsfm = usjReaderWriter.usfmVerseLocationToIndexInUsfm(searchResult.end);

      const usfm = usjReaderWriter.toUsfm();

      let beforeText = usfm.substring(0, startIndexInUsfm);

      const text = usfm.substring(startIndexInUsfm, endIndexInUsfm);

      let afterText = usfm.substring(endIndexInUsfm);

      if (countWords(beforeText) > WORDS_AROUND_SEARCH_RESULT) {
        beforeText = truncateText(beforeText, WORDS_AROUND_SEARCH_RESULT, true);
      }
      if (countWords(afterText) > WORDS_AROUND_SEARCH_RESULT) {
        afterText = truncateText(afterText, WORDS_AROUND_SEARCH_RESULT, false);
      }

      return { beforeText, text, afterText };
    } catch (error) {
      logger.warn(`Error determining text parts for search result: ${getErrorMessage(error)}`);
      return undefined;
    }
  }, [usjReaderWriter, searchResult, shouldCalculateContext]);

  /**
   * Highlights the search term within the verse text by wrapping the specified occurrence in a
   * <strong> tag. If the component is not selected, returns the plain verse text.
   *
   * @returns The verse text with the search term highlighted, or plain text if not selected
   */
  const getFocusedVerseText = () => {
    if (!textParts) return localizedStrings['%webView_find_loadingVerseText%'];

    const { beforeText, text, afterText } = textParts;

    return (
      <>
        {beforeText}
        <strong>{text}</strong>
        {afterText}
      </>
    );
  };

  const getReference = () => {
    return `${searchResult.start.verseRef.book} ${searchResult.start.verseRef.chapterNum}:${searchResult.start.verseRef.verse || searchResult.start.verseRef.verseNum}`;
  };

  const getVerseText = () => {
    if (!textParts) return localizedStrings['%webView_find_noVerseTextAvailable%'] ?? '';
    return `${textParts.beforeText}${textParts.text}${textParts.afterText}`;
  };

  const handleCopyReference = () => {
    navigator.clipboard.writeText(getReference());
  };

  const handleCopyVerseText = () => {
    if (textParts) navigator.clipboard.writeText(getVerseText());
  };

  const handleCopyReferenceAndVerseText = () => {
    navigator.clipboard.writeText(`${getReference()} - ${getVerseText()}`);
  };

  const handleDismiss = () => {
    onHideResult(globalResultsIndex);
  };

  const dropdownContent = (
    <>
      <DropdownMenuItem className="tw-flex tw-flex-row" onClick={handleCopyReference}>
        <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
        <span>{localizedStrings['%webView_find_copyReference%']}</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="tw-flex tw-flex-row" onClick={handleCopyVerseText}>
        <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
        <span>{localizedStrings['%webView_find_copyVerseText%']}</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="tw-flex tw-flex-row" onClick={handleCopyReferenceAndVerseText}>
        <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
        <span>{localizedStrings['%webView_find_copyReferenceAndVerseText%']}</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="tw-flex tw-flex-row" onClick={handleDismiss}>
        <X className="tw-mr-2 tw-h-4 tw-w-4" />
        <span>{localizedStrings['%webView_find_dismiss%']}</span>
      </DropdownMenuItem>
    </>
  );

  const cardContent = (
    <div className="tw-text-xs tw-font-medium">
      {localizedBookData.get(searchResult.start.verseRef.book)?.localizedId ??
        searchResult.start.verseRef.book}{' '}
      {searchResult.start.verseRef.chapterNum}:
      {searchResult.start.verseRef.verse || searchResult.start.verseRef.verseNum}{' '}
      {searchResult.text ?? ''}
    </div>
  );

  const additionalSelectedContent = (
    <div className="tw-text-xs tw-font-normal tw-text-muted-foreground">
      {getFocusedVerseText()}
    </div>
  );

  return (
    <ResultsCard
      cardKey={`${searchResult.start.verseRef.book + searchResult.start.verseRef.chapterNum}:${
        searchResult.start.verseRef.verseNum
      }${searchResult.text}${globalResultsIndex}`}
      isHidden={searchResult.isHidden}
      isSelected={isSelected}
      onSelect={() => {
        setShouldGetVerseText(true);
        onResultClick(searchResult, globalResultsIndex);
      }}
      dropdownContent={dropdownContent}
      additionalSelectedContent={additionalSelectedContent}
    >
      {cardContent}
    </ResultsCard>
  );
}
