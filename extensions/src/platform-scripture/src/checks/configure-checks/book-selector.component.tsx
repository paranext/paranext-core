import { useDialogCallback, useLocalizedStrings } from '@papi/frontend/react';
import { Canon } from '@sillsdev/scripture';
import {
  Button,
  ChapterRangeSelector,
  ChapterRangeSelectorProps,
  Label,
  RadioGroup,
  RadioGroupItem,
} from 'platform-bible-react';
import { useCallback, useMemo, useState } from 'react';

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
  endChapter,
  handleSelectEndChapter,
  startChapter,
  handleSelectStartChapter,
}: BookSelectorProps) {
  const [bookSelectionMode, setBookSelectionMode] = useState<BookSelectionMode>(
    BookSelectionMode.CURRENT_BOOK,
  );

  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () => [
        '%webView_platformScripture_currentBook%',
        '%webView_bookSelector_selectBooks%',
        '%webView_bookSelector_selectBooks_prompt%',
        '%webView_bookSelector_choose%',
        '%webView_bookSelector_chooseBooks%',
      ],
      [],
    ),
  );

  const onSelectionModeChange = (newMode: BookSelectionMode) => {
    setBookSelectionMode(newMode);
    handleBookSelectionModeChange(newMode);
  };

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

  return (
    <RadioGroup
      value={bookSelectionMode}
      // value is always a string but we need it to be BookSelectionMode
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      onValueChange={(value) => onSelectionModeChange(value as BookSelectionMode)}
    >
      <div className="book-selection-radio">
        <div className="book-selection-radio-action">
          <RadioGroupItem value={BookSelectionMode.CURRENT_BOOK} />
          <Label className="book-selection-margin-left">
            {`${localizedStrings['%webView_platformScripture_currentBook%']}:`}
          </Label>
          <Label className="book-selection-margin-left">{currentBookName}</Label>
        </div>
        <div className="book-selection-radio-content">
          <ChapterRangeSelector
            isDisabled={bookSelectionMode === BookSelectionMode.CHOOSE_BOOKS}
            handleSelectStartChapter={handleSelectStartChapter}
            handleSelectEndChapter={handleSelectEndChapter}
            chapterCount={chapterCount}
            startChapter={startChapter}
            endChapter={endChapter}
          />
        </div>
      </div>
      <div className="book-selection-radio">
        <div className="book-selection-radio-action">
          <RadioGroupItem value={BookSelectionMode.CHOOSE_BOOKS} />
          <Label className="book-selection-margin-left">
            {`${localizedStrings['%webView_bookSelector_chooseBooks%']}`}
          </Label>
        </div>
        <div className="book-selection-radio-content">
          <Label className="book-selection-margin-right">
            {selectedBookIds.map((bookId: string) => Canon.bookIdToEnglishName(bookId)).join(', ')}
          </Label>
          <Button
            disabled={bookSelectionMode === BookSelectionMode.CURRENT_BOOK}
            onClick={() => selectBooks()}
          >
            {localizedStrings['%webView_bookSelector_choose%']}
          </Button>
        </div>
      </div>
    </RadioGroup>
  );
}
