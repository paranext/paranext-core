import { RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import settingsService from '@shared/services/settings.service';
import { Canon } from '@sillsdev/scripture';
import { Button, ComboBox } from 'papi-components';
import { useMemo, useState } from 'react';

export default function BookSelection() {
  const scrRef = useMemo(
    () => Canon.bookNumberToEnglishName(settingsService.get('platform.verseRef')?.bookNum ?? 1),
    [],
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
    <RadioGroup>
      <div className="book-selection-current-book">
        <FormControlLabel
          value="current book"
          control={<Radio />}
          label="Current Book"
          labelPlacement="end"
        />
        <Typography>{scrRef}</Typography>
        <FormControlLabel
          value="start chapter"
          control={<ComboBox />}
          label="Chapters"
          labelPlacement="start"
        />
        <FormControlLabel
          value="end chapter"
          control={<ComboBox />}
          label="to"
          labelPlacement="start"
        />
      </div>
      <div className="book-selection-choose-books">
        <FormControlLabel
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
