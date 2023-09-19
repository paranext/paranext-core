import { RadioGroup, FormControlLabel, Radio, Typography, Grid } from '@mui/material';
import { Canon } from '@sillsdev/scripture';
import { Button } from 'papi-components';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import './book-selection.component.scss';
import ChapterRangeSelection from './chapter-range-selection.component';

type BookSelectionProps = {
  currentBookNumber: number;
  setSelectedBooks: Dispatch<SetStateAction<number[]>>;
  selectedBooks: number[];
  setStartChapter: Dispatch<SetStateAction<number>>;
  startChapter: number;
  setEndChapter: Dispatch<SetStateAction<number>>;
  endChapter: number;
  chapterCount: number;
};

export default function BookSelection({
  currentBookNumber,
  setSelectedBooks,
  selectedBooks,
  setStartChapter,
  startChapter,
  setEndChapter,
  endChapter,
  chapterCount,
}: BookSelectionProps) {
  const [currentBookRadio, setCurrentBookRadio] = useState<boolean>(true);
  const [chooseBookRadio, setChooseBookRadio] = useState<boolean>(false);

  const currentBookName = useMemo(
    () => Canon.bookNumberToEnglishName(currentBookNumber),
    [currentBookNumber],
  );

  const handleSelectBooks = (bookNumber: number) => {
    setCurrentBookRadio(false);
    setChooseBookRadio(true);
    if (selectedBooks.includes(bookNumber)) {
      setSelectedBooks(selectedBooks.filter((number) => number !== bookNumber));
    } else {
      setSelectedBooks([...selectedBooks, bookNumber]);
    }
  };

  return (
    <RadioGroup defaultValue="current book">
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <FormControlLabel
            key="current book"
            value="current book"
            control={
              <Radio
                checked={currentBookRadio}
                onChange={() => {
                  setChooseBookRadio(false);
                  setCurrentBookRadio((prev) => !prev);
                }}
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
          <ChapterRangeSelection
            setStartChapter={setStartChapter}
            startChapter={startChapter}
            setEndChapter={setEndChapter}
            endChapter={endChapter}
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
                checked={chooseBookRadio}
                onChange={() => {
                  setCurrentBookRadio(false);
                  setChooseBookRadio((prev) => !prev);
                }}
              />
            }
            label="Choose Books"
            labelPlacement="end"
          />
        </Grid>
        <Grid item xs className="book-selection-option">
          {/* Book 1 ... Book N, default is all books */}
          <Typography padding={0.5} border={1}>
            {selectedBooks.length === 0
              ? 'All Books'
              : Canon.bookNumberToEnglishName(selectedBooks[0])}
          </Typography>
          {/* OnClick - opens a dialog where we send the list of selectedBooks and the handleSelectBooks
          so passing four here is irrelevant and for testing purposes */}
          <Button onClick={() => handleSelectBooks(4)}>Choose...</Button>
        </Grid>
      </Grid>
    </RadioGroup>
  );
}
