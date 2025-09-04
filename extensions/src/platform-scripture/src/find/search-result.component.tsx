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
import { LocalizeKey } from 'platform-bible-utils';
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
export interface SearchResultProps {
  /** The search result data to display */
  searchResult: HidableFindResult;
  /** The global index of this result in the complete search results list */
  globalResultsIndex: number;
  /** Whether this search result is currently selected/focused */
  isSelected: boolean;
  /** Map of book ids to their localized display names */
  localizedBookData: Map<string, { localizedId: string }>;
  /** The index of this occurrence within the verse (for multiple matches in same verse) */
  occurrenceInVerseIndex: number;
  /** Callback function called when the user clicks on this search result */
  onResultClick: (
    verseRef: SerializedVerseRef,
    index: number,
    /** Start index for the occurrence in the USFM verse text */
    occurrenceTextPositionStart?: number,
    /** End index for the occurrence in the USFM verse text */
    occurrenceTextPositionEnd?: number,
  ) => void;
  /** Callback function called when the user chooses to hide/dismiss this result */
  onHideResult: (index: number) => void;

  /**
   * From papi Gets localizations on the papi.
   *
   * @param localizationKeys Array of keys to get localizations of
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @param localizationLocales Array of localization languages to look up the keys in
   *
   *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
   *   updated every render
   * @param subscriberOptions Various options to adjust how the subscriber emits updates
   *
   *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
   *   to re-run with its new value. This means that `subscriberOptions` will be passed to the data
   *   provider's `subscribe<data_type>` method as soon as possible and will not be updated again
   *   until `dataProviderSource` or `selector` changes.
   * @returns `[localizedStrings]`
   *
   *   - `localizedStrings`: The current state of the localizations, either `defaultState` or the stored
   *       state on the papi, if any
   */
  useLocalizedStrings: (keys: LocalizeKey[]) => [Record<LocalizeKey, string>, boolean];

  /** The USFM text of the verse containing this search result, if available */
  currentVerseUsfm: string | undefined;
}

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
  localizedBookData,
  occurrenceInVerseIndex,
  onResultClick,
  onHideResult,
  useLocalizedStrings,
  currentVerseUsfm,
}: SearchResultProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => SEARCH_RESULT_LOCALIZED_STRINGS, []),
  );

  /** Start and end index for the occurrence in the verse */
  const occurrenceTextPosition = useMemo(() => {
    if (!currentVerseUsfm || !searchResult.text) return undefined;

    const lowerFocusedVerseText = currentVerseUsfm.toLowerCase();
    const lowerResultText = searchResult.text.toLowerCase();
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

    if (targetOccurrenceIndex === undefined) return undefined;

    return { start: targetOccurrenceIndex, end: targetOccurrenceIndex + searchResult.text.length };
  }, [currentVerseUsfm, occurrenceInVerseIndex, searchResult.text]);

  /**
   * Highlights the search term within the verse text by wrapping the specified occurrence in a
   * <strong> tag. If the component is not selected, returns the plain verse text.
   *
   * @returns The verse text with the search term highlighted, or plain text if not selected
   */
  const getFocusedVerseText = () => {
    if (!currentVerseUsfm || !occurrenceTextPosition || !isSelected) return undefined;

    let beforeText = currentVerseUsfm.substring(0, occurrenceTextPosition.start);
    const matchText = currentVerseUsfm.substring(
      occurrenceTextPosition.start,
      occurrenceTextPosition.end,
    );
    let afterText = currentVerseUsfm.substring(occurrenceTextPosition.end);

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
    if (currentVerseUsfm) navigator.clipboard.writeText(currentVerseUsfm);
  };

  const handleCopyReferenceAndVerseText = () => {
    navigator.clipboard.writeText(
      `${searchResult.verseRef.book} ${searchResult.verseRef.chapterNum}:${searchResult.verseRef.verseNum} - ${currentVerseUsfm ?? localizedStrings['%webView_find_noVerseTextAvailable%']}`,
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
      onClick={() =>
        onResultClick(
          searchResult.verseRef,
          globalResultsIndex,
          occurrenceTextPosition?.start,
          occurrenceTextPosition?.end,
        )
      }
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
          <div className="tw-mt-2 tw-text-sm tw-text-muted-foreground tw-break-words">
            {getFocusedVerseText()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
