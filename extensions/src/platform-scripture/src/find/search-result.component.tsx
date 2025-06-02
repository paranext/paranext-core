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
import React, { useMemo } from 'react';

type HidableFindResult = FindResult & { isHidden?: boolean };

const SEARCH_RESULT_LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_find_copyReference%',
  '%webView_find_copyVerseText%',
  '%webView_find_copyReferenceAndVerseText%',
  '%webView_find_dismiss%',
  '%webView_find_noVerseTextAvailable%',
  '%webView_find_loadingVerseText%',
];

interface SearchResultProps {
  searchResult: HidableFindResult;
  globalResultsIndex: number;
  isSelected: boolean;
  projectId: string | undefined;
  localizedBookData: Map<string, { localizedId: string }>;
  occurrenceInVerseIndex: number;
  onResultClick: (verseRef: SerializedVerseRef, index: number) => void;
  onHideResult: (index: number) => void;
}

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

  const getFocusedVerseText = (resultText: string) => {
    if (!focusedVerseText || !resultText || !isSelected) return focusedVerseText;

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

    const beforeText = focusedVerseText.substring(0, targetOccurrenceIndex);
    const matchText = focusedVerseText.substring(
      targetOccurrenceIndex,
      targetOccurrenceIndex + resultText.length,
    );
    const afterText = focusedVerseText.substring(targetOccurrenceIndex + resultText.length);

    return (
      <>
        {beforeText}
        <strong>{matchText}</strong>
        {afterText}
      </>
    );
  };

  const handleCopyReference = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `${searchResult.verseRef.book} ${searchResult.verseRef.chapterNum}:${searchResult.verseRef.verseNum}`,
    );
  };

  const handleCopyVerseText = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (focusedVerseText) navigator.clipboard.writeText(focusedVerseText);
  };

  const handleCopyReferenceAndVerseText = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `${searchResult.verseRef.book} ${searchResult.verseRef.chapterNum}:${searchResult.verseRef.verseNum} - ${focusedVerseText ?? localizedStrings['%webView_find_noVerseTextAvailable%']}`,
    );
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onHideResult(globalResultsIndex);
  };

  return (
    <Card
      hidden={searchResult.isHidden}
      key={
        // Unfortunately index has to be used here, because the same search term can appear
        // multiple times in the same verse
        // eslint-disable-next-line react/no-array-index-key
        searchResult.verseRef.book +
        searchResult.verseRef.chapterNum +
        searchResult.verseRef.verseNum +
        searchResult.text +
        globalResultsIndex
      }
      className={`tw-cursor-pointer ${isSelected ? 'tw-bg-primary-foreground' : 'tw-bg-primary-foreground/10'}`}
      onClick={() => onResultClick(searchResult.verseRef, globalResultsIndex)}
    >
      <CardContent className="tw-p-4">
        <div className="tw-flex tw-items-start tw-justify-between">
          <div className="tw-font-medium">
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
              <DropdownMenuContent align="start">
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
