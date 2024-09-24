import { useDialogCallback, useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { Canon, VerseRef } from '@sillsdev/scripture';
import {
  BOOK_SELECTOR_STRING_KEYS,
  BookSelectionMode,
  BookSelector,
  Checklist,
  Label,
  ScriptureReference,
  Spinner,
} from 'platform-bible-react';
import { getChaptersForBook } from 'platform-bible-utils';
import { CheckInputRange, CheckRunnerCheckDetails } from 'platform-scripture';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type BookSelectionStatus = {
  [bookId: string]: boolean;
};

type ConfigureChecksProps = {
  projectId: string | undefined;
  availableChecks: CheckRunnerCheckDetails[];
  handleSelectCheck: (checkLabel: string, selected: boolean) => void;
  selectedChecks: string[];
  activeRanges: CheckInputRange[];
  handleActiveRangesChange: (newActiveRanges: CheckInputRange[]) => void;
};

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

export default function ConfigureChecks({
  projectId,
  availableChecks,
  handleSelectCheck,
  selectedChecks,
  activeRanges,
  handleActiveRangesChange,
}: ConfigureChecksProps) {
  const [scrRef] = useSetting('platform.verseRef', defaultScrRef);

  const [usingCurrentBook, setUsingCurrentBook] = useState<boolean>(true);
  const chapterCount = useMemo(() => getChaptersForBook(scrRef.bookNum), [scrRef]);
  const [startChapter, setStartChapter] = useState<number>(1);
  const [endChapter, setEndChapter] = useState<number>(chapterCount);
  const currentBookId = useMemo(() => Canon.bookNumberToId(scrRef.bookNum), [scrRef]);

  const [bookSelectorLocalizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return Array.from(BOOK_SELECTOR_STRING_KEYS);
    }, []),
  );

  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () => [
        '%webView_configureChecks_checks%',
        '%webView_configureChecks_loadingChecks%',
        '%webView_configureChecks_activeRanges%',
        '%webView_bookSelector_selectBooks%',
        '%webView_bookSelector_selectBooks_prompt%',
      ],
      [],
    ),
  );

  const toggleShouldUseCurrentBook = (newMode: string) => {
    if (newMode === BookSelectionMode.CURRENT_BOOK) {
      setUsingCurrentBook(true);
    } else {
      setUsingCurrentBook(false);
    }
  };

  // Ensure activeRanges is never empty
  useEffect(() => {
    if (activeRanges.length === 0 && projectId) {
      handleActiveRangesChange([
        {
          projectId,
          start: new VerseRef(scrRef.bookNum, 1, 1),
        },
      ]);
    }
  }, [activeRanges.length, handleActiveRangesChange, projectId, scrRef.bookNum]);

  useEffect(() => {
    if (!projectId) return;

    const newCheckInputRange: CheckInputRange = {
      projectId,
      start: new VerseRef(scrRef.bookNum, usingCurrentBook ? startChapter : 1, 1),
      end: usingCurrentBook ? new VerseRef(scrRef.bookNum, endChapter, 1) : undefined,
    };
    handleActiveRangesChange([newCheckInputRange]);
  }, [
    usingCurrentBook,
    startChapter,
    endChapter,
    scrRef.bookNum,
    projectId,
    handleActiveRangesChange,
  ]);

  const handleSelectBooks = useCallback(
    (bookIds: string[]) => {
      if (usingCurrentBook || !projectId) return;

      handleActiveRangesChange(
        bookIds.map((bookId): CheckInputRange => {
          return { projectId, start: new VerseRef(Canon.bookIdToNumber(bookId), 1, 1) };
        }),
      );
    },
    [handleActiveRangesChange, projectId, usingCurrentBook],
  );

  const selectedBookIds = useMemo(() => {
    return activeRanges.map((range) =>
      range.start.bookNum ? Canon.bookNumberToId(range.start.bookNum) : range.start.book,
    );
  }, [activeRanges]);

  const selectBooks = useDialogCallback(
    'platform.selectBooks',
    useMemo(
      () => ({
        prompt: localizedStrings['%webView_bookSelector_selectBooks_prompt%'],
        title: localizedStrings['%webView_bookSelector_selectBooks%'],
        selectedBookIds,
      }),
      [localizedStrings, selectedBookIds],
    ),
    useCallback(
      (newSelectedBooks) => {
        if (newSelectedBooks) handleSelectBooks(newSelectedBooks);
      },
      [handleSelectBooks],
    ),
  );

  const noAvailableChecks = useMemo(() => availableChecks.length === 0, [availableChecks]);
  const singleEmptyCheck = useMemo(
    () => availableChecks.length === 1 && availableChecks[0].checkId === '',
    [availableChecks],
  );

  return (
    <div className="configure-checks-dialog">
      {noAvailableChecks || singleEmptyCheck ? (
        <div className="configure-checks-loader">
          <Spinner />
          <Label>{localizedStrings['%webView_configureChecks_loadingChecks%']}</Label>
        </div>
      ) : (
        <Checklist
          className="configure-checks-check-names"
          legend={localizedStrings['%webView_configureChecks_checks%']}
          listItems={availableChecks.map((check) => check.checkDescription)}
          selectedListItems={selectedChecks}
          handleSelectListItem={handleSelectCheck}
        />
      )}
      <fieldset className="configure-checks-books">
        <legend>
          <Label>{localizedStrings['%webView_configureChecks_activeRanges%']}</Label>
        </legend>
        <BookSelector
          handleBookSelectionModeChange={toggleShouldUseCurrentBook}
          currentBookName={Canon.bookIdToEnglishName(currentBookId)}
          onSelectBooks={selectBooks}
          selectedBookIds={selectedBookIds}
          chapterCount={chapterCount}
          handleSelectStartChapter={setStartChapter}
          handleSelectEndChapter={setEndChapter}
          startChapter={startChapter}
          endChapter={endChapter}
          localizedStrings={bookSelectorLocalizedStrings}
        />
      </fieldset>
    </div>
  );
}
