import { RadioGroup, FormControlLabel, Radio, Typography, Grid } from '@mui/material';
import { Canon } from '@sillsdev/scripture';
import { Button, ChapterRangeSelection, ChapterNumberOption } from 'papi-components';
import { SyntheticEvent, useMemo } from 'react';
import './book-selection.component.scss';

type BookSelectionProps = {
  useCurrentBook: boolean;
  toggleCurrentBook: () => void;
  currentBookNumber: number;
  selectedBooks: number[];
  handleSelectBooks: (bookNumber: number) => void;
  startChapter: number;
  handleSelectStartChapter: (newValue: number) => void;
  endChapter: number;
  handleSelectEndChapter: (newValue: number) => void;
  chapterCount: number;
};

export default function BookSelection({
  useCurrentBook,
  toggleCurrentBook,
  currentBookNumber,
  selectedBooks,
  handleSelectBooks,
  startChapter,
  handleSelectStartChapter,
  endChapter,
  handleSelectEndChapter,
  chapterCount,
}: BookSelectionProps) {
  const currentBookName = useMemo(
    () => Canon.bookNumberToEnglishName(currentBookNumber),
    [currentBookNumber],
  );

  const onChangeStartChapter = (_event: SyntheticEvent<Element, Event>, value: unknown) => {
    const newStartNum: number = (value as ChapterNumberOption).chapterNum;
    handleSelectStartChapter(newStartNum);
  };

  const onChangeEndChapter = (_event: SyntheticEvent<Element, Event>, value: unknown) => {
    const newEndNum = (value as ChapterNumberOption).chapterNum;
    handleSelectEndChapter(newEndNum);
  };

  return (
    <RadioGroup defaultValue="current book">
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <FormControlLabel
            key="current book"
            value="current book"
            control={<Radio checked={useCurrentBook} onChange={toggleCurrentBook} />}
            label="Current Book"
            labelPlacement="end"
          />
        </Grid>
        <Grid item xs="auto" className="book-selection-option">
          <Typography padding={0.5} marginRight={2} border={1}>
            {currentBookName}
          </Typography>
          <ChapterRangeSelection
            isDisabled={!useCurrentBook}
            startChapter={startChapter}
            endChapter={endChapter}
            onChangeStartChapter={onChangeStartChapter}
            onChangeEndChapter={onChangeEndChapter}
            chapterCount={chapterCount}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <FormControlLabel
            key="selected books"
            value="selected books"
            control={<Radio checked={!useCurrentBook} onChange={toggleCurrentBook} />}
            label="Choose Books"
            labelPlacement="end"
          />
        </Grid>
        <Grid item xs className="book-selection-option">
          {/* Book 1 ... Book N, default is all books */}
          <Typography padding={0.5} border={1}>
            {selectedBooks.length === 1 && selectedBooks[0] === currentBookNumber
              ? 'All Books'
              : selectedBooks
                  .map((bookNumber) => Canon.bookNumberToEnglishName(bookNumber))
                  .join(', ')}
          </Typography>
          {/* OnClick - opens a dialog where we send the list of selectedBooks and the handleSelectBooks
          so passing four here is irrelevant and for testing purposes */}
          <Button onClick={() => handleSelectBooks(4)}>Choose...</Button>
        </Grid>
      </Grid>
    </RadioGroup>
  );
}
