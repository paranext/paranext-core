import { useLocalizedStrings, useProjectData } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Copy, MoreVertical, X } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'platform-bible-react';
import { getErrorMessage, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { FindResult } from 'platform-scripture';
import { useMemo } from 'react';

type HidableFindResult = FindResult & { isHidden?: boolean };

const SEARCH_RESULT_LOCALIZED_STRINGS: LocalizeKey[] = [
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
  /** The ID of the project being searched */
  projectId: string | undefined;
  /** Map of book ids to their localized display names */
  localizedBookData: Map<string, { localizedId: string }>;
  /** The index of this occurrence within the verse (for multiple matches in same verse) */
  occurrenceInVerseIndex: number;
  /** Callback function called when the user clicks on this search result */
  onResultClick: (verseRef: SerializedVerseRef, index: number) => void;
  /** Callback function called when the user chooses to hide/dismiss this result */
  onHideResult: (index: number) => void;
}

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
  projectId,
  localizedBookData,
  occurrenceInVerseIndex,
  onResultClick,
  onHideResult,
}: SearchResultProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => SEARCH_RESULT_LOCALIZED_STRINGS, []),
  );

  const [currentProjectVersePossiblyError] = useProjectData(
    'platformScripture.USFM_Verse',
    projectId ?? undefined,
  ).VerseUSFM(searchResult.verseRef, localizedStrings['%webView_find_loadingVerseText%']);

  const focusedVerseText = useMemo(() => {
    if (isPlatformError(currentProjectVersePossiblyError)) {
      return getErrorMessage(currentProjectVersePossiblyError);
    }
    return currentProjectVersePossiblyError;
  }, [currentProjectVersePossiblyError]);

  const countWords = (text: string): number => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  const truncateText = (text: string, maxWords: number, shouldCutFromStart: boolean): string => {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;

    if (shouldCutFromStart) {
      return words.slice(-maxWords).join(' ');
    }
    return words.slice(0, maxWords).join(' ');
  };

  /**
   * Highlights the search term within the verse text by wrapping the specified occurrence in a
   * <strong> tag. If the component is not selected, returns the plain verse text.
   *
   * @param resultText - The search term to highlight within the verse
   * @returns The verse text with the search term highlighted, or plain text if not selected
   */
  const getFocusedVerseText = (resultText: string) => {
    if (!focusedVerseText || !resultText || !isSelected) return undefined;

    const lowerFocusedVerseText = focusedVerseText.toLowerCase();
    const lowerResultText = resultText.toLowerCase();
    const occurrences: number[] = [];
    let searchIndex = 0;

    while (searchIndex < lowerFocusedVerseText.length) {
      const foundIndex = lowerFocusedVerseText.indexOf(lowerResultText, searchIndex);
      if (foundIndex === -1) break;
      occurrences.push(foundIndex);
      searchIndex = foundIndex + 1;
    }

    const targetOccurrenceIndex =
      occurrenceInVerseIndex < occurrences.length
        ? occurrences[occurrenceInVerseIndex]
        : occurrences[0];

    if (targetOccurrenceIndex === undefined) return focusedVerseText;

    let beforeText = focusedVerseText.substring(0, targetOccurrenceIndex);
    const matchText = focusedVerseText.substring(
      targetOccurrenceIndex,
      targetOccurrenceIndex + resultText.length,
    );
    let afterText = focusedVerseText.substring(targetOccurrenceIndex + resultText.length);

    if (countWords(beforeText) > 50) {
      beforeText = truncateText(beforeText, 50, true);
    }
    if (countWords(afterText) > 50) {
      afterText = truncateText(afterText, 50, false);
    }

    return (
      <>
        {beforeText}
        <strong>{matchText}</strong>
        {afterText}
      </>
    );
  };

  const handleCopyReference = () => {
    navigator.clipboard.writeText(
      `${searchResult.verseRef.book} ${searchResult.verseRef.chapterNum}:${searchResult.verseRef.verseNum}`,
    );
  };

  const handleCopyVerseText = () => {
    if (focusedVerseText) navigator.clipboard.writeText(focusedVerseText);
  };

  const handleCopyReferenceAndVerseText = () => {
    navigator.clipboard.writeText(
      `${searchResult.verseRef.book} ${searchResult.verseRef.chapterNum}:${searchResult.verseRef.verseNum} - ${focusedVerseText ?? localizedStrings['%webView_find_noVerseTextAvailable%']}`,
    );
  };

  const handleDismiss = () => {
    onHideResult(globalResultsIndex);
  };

  return (
    <Card
      hidden={searchResult.isHidden}
      key={`${searchResult.verseRef.book + searchResult.verseRef.chapterNum}:${
        searchResult.verseRef.verseNum
      }${searchResult.text}${globalResultsIndex}`}
      className={`tw-cursor-pointer ${isSelected ? 'tw-bg-primary-foreground' : 'tw-bg-primary-foreground/10'}`}
      onClick={() => onResultClick(searchResult.verseRef, globalResultsIndex)}
    >
      <CardContent className="tw-p-4">
        <div className="tw-flex tw-items-start tw-justify-between">
          <div className="tw-font-medium tw-truncate tw-overflow-hidden tw-whitespace-nowrap tw-flex-1 tw-min-w-0">
            {localizedBookData.get(searchResult.verseRef.book)?.localizedId ??
              searchResult.verseRef.book}{' '}
            {searchResult.verseRef.chapterNum}:{searchResult.verseRef.verseNum}{' '}
            {searchResult.text ?? ''}
          </div>
          {isSelected && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="tw-h-8 tw-w-8">
                  <MoreVertical className="tw-h-4 tw-w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="tw-flex tw-flex-row" onClick={handleCopyReference}>
                  <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
                  <span>{localizedStrings['%webView_find_copyReference%']}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="tw-flex tw-flex-row" onClick={handleCopyVerseText}>
                  <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
                  <span>{localizedStrings['%webView_find_copyVerseText%']}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="tw-flex tw-flex-row"
                  onClick={handleCopyReferenceAndVerseText}
                >
                  <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
                  <span>{localizedStrings['%webView_find_copyReferenceAndVerseText%']}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="tw-flex tw-flex-row" onClick={handleDismiss}>
                  <X className="tw-mr-2 tw-h-4 tw-w-4" />
                  <span>{localizedStrings['%webView_find_dismiss%']}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {isSelected && (
          <div className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
            {getFocusedVerseText(searchResult.text)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
