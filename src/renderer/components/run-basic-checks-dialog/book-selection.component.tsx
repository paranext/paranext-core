import { RadioGroup, FormControlLabel, Radio, Typography, Grid } from '@mui/material';
import settingsService from '@shared/services/settings.service';
import { Canon } from '@sillsdev/scripture';
import { Button, ComboBox, ComboBoxLabelOption } from 'papi-components';
import { SyntheticEvent, useMemo, useState } from 'react';
import './book-selection.component.scss';

export default function BookSelection() {
  // Gets the current book from scripture reference in settings
  const currentBook = useMemo(
    () => Canon.bookNumberToEnglishName(settingsService.get('platform.verseRef')?.bookNum ?? 1),
    [],
  );

  interface ChapterNumberOption extends ComboBoxLabelOption {
    chapterNum: number;
  }

  const chapterCount = currentBook === 'Genesis' ? 50 : 20;
  const chapterNumbers: ChapterNumberOption[] = useMemo(
    () =>
      Array.from({ length: chapterCount }, (_, i) => i + 1).map((c) => ({
        chapterNum: c,
        label: c.toString(),
      })),
    [chapterCount],
  );

  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const handleSelectBooks = (bookNumber: number) => {
    if (selectedBooks.includes(bookNumber)) {
      setSelectedBooks(selectedBooks.filter((number) => number !== bookNumber));
    } else {
      setSelectedBooks([...selectedBooks, bookNumber]);
    }
  };

  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(chapterCount);

  const onSelectChangeStartChapter = (_event: SyntheticEvent<Element, Event>, value: unknown) => {
    setStartChapter((value as ChapterNumberOption).chapterNum);
  };

  const onSelectChangeEndChapter = (_event: SyntheticEvent<Element, Event>, value: unknown) => {
    setEndChapter((value as ChapterNumberOption).chapterNum);
  };

  return (
    <RadioGroup defaultValue="current book">
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <FormControlLabel
            key="current book"
            value="current book"
            control={<Radio />}
            label="Current Book"
            labelPlacement="end"
          />
        </Grid>
        <Grid item xs="auto" className="book-selection-option">
          <Typography padding={0.5} marginRight={2} border={1}>
            {currentBook}
          </Typography>
          <FormControlLabel
            className="book-selection-chapter-form-label start"
            value={startChapter}
            control={
              <ComboBox
                onChange={onSelectChangeStartChapter}
                className="book-selection-chapter"
                key="start chapter"
                isClearable={false}
                options={chapterNumbers}
              />
            }
            label="Chapters"
            labelPlacement="start"
          />
          <FormControlLabel
            className="book-selection-chapter-form-label end"
            value={endChapter}
            control={
              <ComboBox
                onChange={onSelectChangeEndChapter}
                className="book-selection-chapter"
                key="end chapter"
                isClearable={false}
                options={chapterNumbers}
              />
            }
            label="to"
            labelPlacement="start"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <FormControlLabel
            key="selected books"
            value="selected books"
            control={<Radio />}
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
          {/* OnClick - opens a dialog where we send the list of selectedBooks and the handleSelectBooks */}
          <Button onClick={() => handleSelectBooks(4)}>Choose...</Button>
        </Grid>
      </Grid>
    </RadioGroup>
  );
}
