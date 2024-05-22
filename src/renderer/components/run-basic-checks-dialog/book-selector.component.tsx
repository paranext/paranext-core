import { RadioGroup, Radio, Typography } from '@mui/material';
import { Canon } from '@sillsdev/scripture';
import { Button, ChapterRangeSelector, ChapterRangeSelectorProps } from 'platform-bible-react';
import { useCallback, useMemo, useState } from 'react';
import './book-selector.component.scss';
import { useDialogCallback } from '@renderer/hooks/papi-hooks';

type BookSelectorProps = ChapterRangeSelectorProps & {
  handleRadioChange: (newRadioValue: string) => void;
  currentBookName: string;
  selectedBookIds: string[];
  handleSelectBooks: (bookIds: string[]) => void;
};

export default function BookSelector({
  handleRadioChange,
  currentBookName,
  selectedBookIds,
  handleSelectBooks,
  chapterCount,
  handleSelectEndChapter,
  handleSelectStartChapter,
}: BookSelectorProps) {
  const [radioValue, setRadioValue] = useState<string>('current book');

  const onRadioChange = (newRadioValue: string) => {
    setRadioValue(newRadioValue);
    handleRadioChange(newRadioValue);
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
    <RadioGroup value={radioValue} onChange={(e) => onRadioChange(e.target.value)}>
      <div className="book-selection-radio">
        <Radio value="current book" />
        <Typography className="book-selection-radio-label">Current Book</Typography>
        <div className="book-selection-radio-content">
          <div className="book-typography">
            <Typography padding={0.5} border={1}>
              {currentBookName}
            </Typography>
          </div>
          <div className="book-selection-radio-action">
            <ChapterRangeSelector
              isDisabled={radioValue === 'choose books'}
              handleSelectStartChapter={handleSelectStartChapter}
              handleSelectEndChapter={handleSelectEndChapter}
              chapterCount={chapterCount}
            />
          </div>
        </div>
      </div>
      <div className="book-selection-radio">
        <Radio value="choose books" />
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
            <Button isDisabled={radioValue === 'current book'} onClick={() => selectBooks()}>
              Choose...
            </Button>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
}
