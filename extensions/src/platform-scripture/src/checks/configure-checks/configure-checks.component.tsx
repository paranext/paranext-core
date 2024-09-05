import { Button, ScriptureReference, Checklist } from 'platform-bible-react';
import { getChaptersForBook } from 'platform-bible-utils';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Canon, VerseRef } from '@sillsdev/scripture';
import { useSetting } from '@papi/frontend/react';
import { CheckInputRange, CheckRunnerCheckDetails } from 'platform-scripture';
import BookSelector, { BookSelectionMode } from './book-selector.component';

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
  handlePrintResults: () => void;
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
  handlePrintResults,
}: ConfigureChecksProps) {
  const [scrRef] = useSetting('platform.verseRef', defaultScrRef);

  const [rangeIsCurrentBook, setRangeIsCurrentBook] = useState<boolean>(false);
  const chapterCount = useMemo(() => getChaptersForBook(scrRef.bookNum), [scrRef]);
  const [startChapter, setStartChapter] = useState<number>(1);
  const [endChapter, setEndChapter] = useState<number>(chapterCount);
  const currentBookId = useMemo(() => Canon.bookNumberToId(scrRef.bookNum), [scrRef]);

  const toggleShouldUseCurrentBook = (newMode: string) => {
    if (newMode === BookSelectionMode.CURRENT_BOOK) {
      setRangeIsCurrentBook(true);
    } else {
      setRangeIsCurrentBook(false);
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
    if (!rangeIsCurrentBook || !projectId) return;

    const newCheckInputRange: CheckInputRange = {
      projectId,
      start: new VerseRef(scrRef.bookNum, startChapter, 1),
      end: new VerseRef(scrRef.bookNum, endChapter, 1),
    };
    handleActiveRangesChange([newCheckInputRange]);
  }, [
    rangeIsCurrentBook,
    startChapter,
    endChapter,
    scrRef.bookNum,
    projectId,
    handleActiveRangesChange,
  ]);

  const handleSelectBooks = useCallback(
    (bookIds: string[]) => {
      if (rangeIsCurrentBook || !projectId) return;

      handleActiveRangesChange(
        bookIds.map((bookId): CheckInputRange => {
          return { projectId, start: new VerseRef(Canon.bookIdToNumber(bookId), 1, 1) };
        }),
      );
    },
    [handleActiveRangesChange, projectId, rangeIsCurrentBook],
  );

  const selectedBookIds = useMemo(() => {
    return activeRanges.map((range) =>
      range.start.bookNum ? Canon.bookNumberToId(range.start.bookNum) : range.start.book,
    );
  }, [activeRanges]);

  return (
    <div className="configure-checks-dialog">
      <Checklist
        className="configure-checks-check-names"
        legend="Checks"
        listItems={availableChecks.map((check) => check.checkDescription)}
        selectedListItems={selectedChecks}
        handleSelectListItem={handleSelectCheck}
      />
      <fieldset className="configure-checks-books">
        <BookSelector
          handleBookSelectionModeChange={toggleShouldUseCurrentBook}
          currentBookName={Canon.bookIdToEnglishName(currentBookId)}
          selectedBookIds={selectedBookIds}
          handleSelectBooks={handleSelectBooks}
          chapterCount={chapterCount}
          handleSelectStartChapter={setStartChapter}
          handleSelectEndChapter={setEndChapter}
        />
      </fieldset>
      <div className="basic-checks-dialog-actions">
        <Button onClick={() => handlePrintResults()}>Print results to console</Button>
      </div>
    </div>
  );
}
