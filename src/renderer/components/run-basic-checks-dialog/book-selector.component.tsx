import { RadioGroup, FormControlLabel, Radio, Typography, Grid } from '@mui/material';
import { Canon } from '@sillsdev/scripture';
import { Button, ChapterRangeSelector, ChapterRangeSelectorProps } from 'papi-components';
import { useMemo } from 'react';
import './book-selector.component.scss';

type BookSelectionProps = ChapterRangeSelectorProps & {
  shouldUseCurrentBook: boolean;
  toggleShouldUseCurrentBook: (newValue: boolean) => void;
  currentBookNumber: number;
  selectedBooks: number[];
  handleSelectBooks: (bookNumbers: number[]) => void;
};

export default function BookSelector({
  shouldUseCurrentBook,
  toggleShouldUseCurrentBook,
  currentBookNumber,
  selectedBooks,
  handleSelectBooks,
  startChapter,
  endChapter,
  chapterCount,
  handleSelectEndChapter,
  handleSelectStartChapter,
}: BookSelectionProps) {
  const currentBookName = useMemo(
    () => Canon.bookNumberToEnglishName(currentBookNumber),
    [currentBookNumber],
  );

  const listChosenBooksTypography = useMemo(
    () =>
      (selectedBooks.length === 1 && selectedBooks[0] === currentBookNumber) || shouldUseCurrentBook
        ? 'All Books'
        : selectedBooks
            .map((bookNumber: number) => Canon.bookNumberToEnglishName(bookNumber))
            .join(', '),
    [currentBookNumber, selectedBooks, shouldUseCurrentBook],
  );

  return (
    <RadioGroup defaultValue="current book">
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <FormControlLabel
            key="current book"
            value="current book"
            control={
              <Radio
                checked={shouldUseCurrentBook}
                onChange={(e) => toggleShouldUseCurrentBook(e.target.checked)}
              />
            }
            label="Current Book"
            labelPlacement="end"
          />
        </Grid>
        <Grid item xs="auto" className="book-selection-option">
          <Typography padding={0.5} marginRight={2} border={1}>
            {currentBookName}
          </Typography>
          <ChapterRangeSelector
            isDisabled={!shouldUseCurrentBook}
            startChapter={startChapter}
            endChapter={endChapter}
            handleSelectStartChapter={handleSelectStartChapter}
            handleSelectEndChapter={handleSelectEndChapter}
            chapterCount={chapterCount}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <FormControlLabel
            key="selected books"
            value="selected books"
            control={
              <Radio
                checked={!shouldUseCurrentBook}
                onChange={(e) => toggleShouldUseCurrentBook(!e.target.checked)}
              />
            }
            label="Choose Books"
            labelPlacement="end"
          />
        </Grid>
        <Grid item xs className="book-selection-option">
          {/* Book 1 ... Book N, default is all books */}
          <Typography padding={0.5} border={1}>
            {listChosenBooksTypography}
          </Typography>
          {/* OnClick - opens a dialog where we send the list of selectedBooks and the handleSelectBooks
          so passing 4 and 10 here is irrelevant and for testing purposes */}
          <Button onClick={() => handleSelectBooks([4, 10])}>Choose...</Button>
        </Grid>
      </Grid>
    </RadioGroup>
  );
}
