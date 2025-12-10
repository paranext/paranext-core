import { logger } from '@papi/frontend';
import { Copy, X } from 'lucide-react';
import { Button, DropdownMenuItem, ResultsCard, ScrRefBtnProps } from 'platform-bible-react';
import {
  getErrorMessage,
  LocalizedStringValue,
  LocalizeKey,
  UsfmVerseRefVerseLocation,
  UsjReaderWriter,
} from 'platform-bible-utils';
import { FindResult } from 'platform-scripture';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LocalizedBookData } from './find-types';

export type HidableFindResult = FindResult & { isHidden?: boolean; isReplaced?: boolean };

/** How many words to show around the search result */
const WORDS_AROUND_SEARCH_RESULT = 15;

export const SEARCH_RESULT_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%general_cancel%',
  '%webView_find_copyReference%',
  '%webView_find_copyVerseText%',
  '%webView_find_copyReferenceAndVerseText%',
  '%webView_find_dismiss%',
  '%webView_find_noVerseTextAvailable%',
  '%webView_find_loadingVerseText%',
  '%webView_find_replace%',
  '%webView_find_replaced%',
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
  localizedBookData: Map<string, Pick<LocalizedBookData, 'localizedId'>>;
  /** Callback function called when the user clicks on this search result */
  onResultClick: (searchResult: HidableFindResult, index: number) => void;
  /** Callback function called when the user double clicks on this search result */
  onResultDoubleClick: (searchResult: HidableFindResult, index: number) => void;
  /** Callback function called when the user chooses to hide/dismiss this result */
  onHideResult: (index: number) => void;
  /** Callback function called when the user clicks Replace on this result */
  onReplace: (index: number) => void;
  /** Callback to cancel/revert the pending replace for this result */
  onCancelReplace?: () => void;
  /** Whether the find WebView is currently in replace mode */
  isReplaceMode: boolean;
  /** Whether a replace operation is currently in progress */
  isReplacing: boolean;
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
  onResultDoubleClick,
  onHideResult,
  onReplace,
  onCancelReplace,
  localizedStrings,
  isReplaceMode,
  isReplacing,
}: SearchResultProps) {
  // useRef requires null as the initial value for DOM refs
  // eslint-disable-next-line no-null/no-null
  const cardRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isProgressAnimating, setIsProgressAnimating] = useState(false);

  useEffect(() => {
    // Registers a `IntersectionObserver` instance to determine when the component is visible in the DOM
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [cardRef]);

  useEffect(() => {
    if (!searchResult.isReplaced) {
      setIsProgressAnimating(false);
      return undefined;
    }
    const frame = requestAnimationFrame(() => setIsProgressAnimating(true));
    return () => cancelAnimationFrame(frame);
  }, [searchResult.isReplaced]);

  // When this result becomes selected, we should calculate the context if we haven't already
  useEffect(() => {
    if (isSelected) {
      cardRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [isSelected]);

  // Determine the text to show before the search result, the search result, and the text after
  const textParts = useMemo(() => {
    if (!usjReaderWriter || !isVisible) return undefined;
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
  }, [usjReaderWriter, searchResult, isVisible]);

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
        <mark className="tw-bg-amber-100 tw-ring-2 tw-rounded-sm tw-ring-offset-1 tw-ring-amber-400">
          {text}
        </mark>
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

  const replaceButton = (
    <Button
      className="tw-m-1 tw-h-6 tw-text-foreground"
      variant="outline"
      size="sm"
      disabled={isReplacing}
      onClick={(e) => {
        e.stopPropagation();
        onReplace(globalResultsIndex);
      }}
    >
      {localizedStrings['%webView_find_replace%']}
    </Button>
  );

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

  const getBookFromVerseRef = (verseLocation: UsfmVerseRefVerseLocation): string => {
    return (
      localizedBookData.get(verseLocation.verseRef.book)?.localizedId ?? verseLocation.verseRef.book
    );
  };
  const getChapterAndVerseFromVerseRef = (verseLocation: UsfmVerseRefVerseLocation): string => {
    return `${verseLocation.verseRef.chapterNum}:${
      verseLocation.verseRef.verse || verseLocation.verseRef.verseNum
    }`;
  };

  const startRef = {
    book: getBookFromVerseRef(searchResult.start),
    chapterAndVerse: getChapterAndVerseFromVerseRef(searchResult.start),
  };
  const endRef = {
    book: getBookFromVerseRef(searchResult.end),
    chapterAndVerse: getChapterAndVerseFromVerseRef(searchResult.end),
  };
  const scrRef: ScrRefBtnProps = {
    startRef,
    endRef:
      startRef.book === endRef.book && startRef.chapterAndVerse === endRef.chapterAndVerse
        ? undefined
        : endRef,
    text: searchResult.text,
  };

  const additionalSelectedContent = (
    <div className="tw-text-xs tw-m-1 tw-font-normal tw-text-muted-foreground scripture-font">
      {getFocusedVerseText()}
    </div>
  );

  return (
    <div ref={cardRef}>
      <ResultsCard
        cardKey={`${searchResult.start.verseRef.book + searchResult.start.verseRef.chapterNum}:${
          searchResult.start.verseRef.verseNum
        }${searchResult.text}${globalResultsIndex}`}
        scrRef={scrRef}
        isHidden={searchResult.isHidden}
        isSelected={isSelected}
        className={searchResult.isReplaced ? '!tw-bg-red-100 dark:!tw-bg-red-950' : undefined}
        onSelect={() => {
          setShouldGetVerseText(true);
          onResultClick(searchResult, globalResultsIndex);
        }}
        onDoubleClick={() => {
          setShouldGetVerseText(true);
          onResultDoubleClick(searchResult, globalResultsIndex);
        }}
        selectedButtons={isReplaceMode && !searchResult.isReplaced ? replaceButton : undefined}
        hoverButtons={isReplaceMode && !searchResult.isReplaced ? replaceButton : undefined}
        dropdownContent={searchResult.isReplaced ? undefined : dropdownContent}
        showDropdownOnHover={!searchResult.isReplaced}
        additionalContent={additionalSelectedContent}
      >
        {searchResult.isReplaced && (
          <div className="tw-flex tw-items-center tw-gap-2">
            <span className="tw-text-red-500 tw-font-semibold tw-shrink-0">
              {localizedStrings['%webView_find_replaced%']}
            </span>
            <div className="tw-flex-1 tw-h-1.5 tw-bg-red-200 tw-rounded-full tw-overflow-hidden">
              <div
                className="tw-h-full tw-bg-red-500 tw-rounded-full tw-transition-all tw-ease-linear tw-duration-1000"
                style={{ width: isProgressAnimating ? '100%' : '0%' }}
              />
            </div>
            {onCancelReplace && (
              <Button
                variant="outline"
                size="sm"
                className="tw-h-6 tw-shrink-0 tw-mr-10 tw-border-red-300 tw-text-red-500 hover:tw-border-red-500 hover:tw-text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onCancelReplace();
                }}
              >
                {localizedStrings['%general_cancel%']}
              </Button>
            )}
          </div>
        )}
      </ResultsCard>
    </div>
  );
}
