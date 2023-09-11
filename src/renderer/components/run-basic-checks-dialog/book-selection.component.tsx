import { RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import settingsService from '@shared/services/settings.service';
import { Canon } from '@sillsdev/scripture';
import { Button, ComboBox, ComboBoxLabelOption } from 'papi-components';
import { useMemo, useState } from 'react';
import './book-selection.component.scss';

export default function BookSelection() {
  const currentBook = useMemo(
    () => Canon.bookNumberToEnglishName(settingsService.get('platform.verseRef')?.bookNum ?? 1),
    [],
  );

  interface ChapterNumberOption extends ComboBoxLabelOption {
    chapterNum: number;
  }

  const chapterNumbers: ChapterNumberOption[] = useMemo(
    () =>
      (currentBook === 'Genesis' ? [1, 2] : [1, 2, 3]).map((c) => ({
        chapterNum: c,
        label: c.toString(),
      })),
    [currentBook],
  );

  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const handleSelectBooks = (bookNumber: number) => {
    if (selectedBooks.includes(bookNumber)) {
      setSelectedBooks(selectedBooks.filter((number) => number !== bookNumber));
    } else {
      setSelectedBooks([...selectedBooks, bookNumber]);
    }
  };

  return (
    <RadioGroup defaultValue="current book">
      <div className="book-selection-current-book">
        <FormControlLabel
          key="current book"
          value="current book"
          control={<Radio />}
          label="Current Book"
          labelPlacement="end"
        />
        <Typography>{currentBook}</Typography>
        <FormControlLabel
          className=""
          value="1"
          control={<ComboBox key="start chapter" options={chapterNumbers} />}
          label="Chapters"
          labelPlacement="start"
        />
        <FormControlLabel
          value="50"
          control={<ComboBox key="end chapter" options={chapterNumbers} />}
          label="to"
          labelPlacement="start"
        />
      </div>
      <div className="book-selection-choose-books">
        <FormControlLabel
          key="selected books"
          value="selected books"
          control={<Radio />}
          label="Choose Books"
          labelPlacement="end"
        />
        {/* Book 1 ... Book N, default is all books */}
        <Typography>
          {selectedBooks.length === 0
            ? 'All Books'
            : Canon.bookNumberToEnglishName(selectedBooks[0])}
        </Typography>
        {/* OnClick - opens a dialog where we send the list of selectedBooks and the handleSelectBooks */}
        <Button onClick={() => handleSelectBooks(4)}>Choose...</Button>
      </div>
    </RadioGroup>
  );
}
