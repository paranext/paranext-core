import { RadioGroup, Radio, Typography } from '@mui/material';
import { Canon } from '@sillsdev/scripture';
import { Button, ChapterRangeSelector, ChapterRangeSelectorProps } from 'platform-bible-react';
import { useCallback, useMemo, useState } from 'react';
import './book-selector.component.scss';
import { useDialogCallback } from '@renderer/hooks/papi-hooks';

export enum BookSelectionMode {
  CURRENT_BOOK = 'current book',
  CHOOSE_BOOKS = 'choose books',
}

type BookSelectorProps = ChapterRangeSelectorProps & {
  handleBookSelectionModeChange: (newMode: BookSelectionMode) => void;
  currentBookName: string;
  selectedBookIds: string[];
  handleSelectBooks: (bookIds: string[]) => void;
};

export default function BookSelector({
  handleBookSelectionModeChange,
  currentBookName,
  selectedBookIds,
  handleSelectBooks,
  chapterCount,
  handleSelectEndChapter,
  handleSelectStartChapter,
}: BookSelectorProps) {
  const [bookSelectionMode, setBookSelectionMode] = useState<BookSelectionMode>(
    BookSelectionMode.CURRENT_BOOK,
  );

  const onSelectionModeChange = (newMode: BookSelectionMode) => {
    setBookSelectionMode(newMode);
    handleBookSelectionModeChange(newMode);
  };

  const selectBooks = useDialogCallback(
    'platform.selectBooks',
    useMemo(
      () => ({
        prompt: 'Select one or more books to run basic checks on',
        title: 'Select Books',
        selectedBookIds,
      }),
      [selectedBookIds],
    ),
    useCallback(
      (newSelectedBooks) => {
        if (newSelectedBooks) handleSelectBooks(newSelectedBooks);
      },
      [handleSelectBooks],
    ),
  );

  return (
    <RadioGroup
      value={bookSelectionMode}
      // event.target.value is always a string but we need it to be BookSelectionMode
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      onChange={(e) => onSelectionModeChange(e.target.value as BookSelectionMode)}
    >
      <div className="book-selection-radio">
        <Radio value={BookSelectionMode.CURRENT_BOOK} />
        <Typography className="book-selection-radio-label">Current Book</Typography>
        <div className="book-selection-radio-content">
          <div className="book-typography">
            <Typography padding={0.5} border={1}>
              {currentBookName}
            </Typography>
          </div>
          <div className="book-selection-radio-action">
            <ChapterRangeSelector
              isDisabled={bookSelectionMode === BookSelectionMode.CHOOSE_BOOKS}
              handleSelectStartChapter={handleSelectStartChapter}
              handleSelectEndChapter={handleSelectEndChapter}
              chapterCount={chapterCount}
            />
          </div>
        </div>
      </div>
      <div className="book-selection-radio">
        <Radio value={BookSelectionMode.CHOOSE_BOOKS} />
        <Typography className="book-selection-radio-label">Choose Books</Typography>
        <div className="book-selection-radio-content">
          <div className="book-typography">
            <Typography padding={0.5} border={1}>
              {selectedBookIds
                .map((bookId: string) => Canon.bookIdToEnglishName(bookId))
                .join(', ')}
            </Typography>
          </div>
          <div className="book-selection-radio-action">
            <Button
              disabled={bookSelectionMode === BookSelectionMode.CURRENT_BOOK}
              onClick={() => selectBooks()}
            >
              Choose...
            </Button>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
}
