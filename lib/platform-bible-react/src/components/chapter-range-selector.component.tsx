import { SyntheticEvent, useMemo, useState } from 'react';
import { FormControlLabel } from '@mui/material';
import ComboBox from '@/components/combo-box.component';

export type ChapterRangeSelectorProps = {
  handleSelectStartChapter: (chapter: number) => void;
  handleSelectEndChapter: (chapter: number) => void;
  isDisabled?: boolean;
  chapterCount: number;
};

export default function ChapterRangeSelector({
  handleSelectStartChapter,
  handleSelectEndChapter,
  isDisabled,
  chapterCount,
}: ChapterRangeSelectorProps) {
  const numberArray = useMemo(
    () => Array.from({ length: chapterCount }, (_, index) => index + 1),
    [chapterCount],
  );

  const [startChapter, setStartChapter] = useState<number>(numberArray[0]);
  const [endChapter, setEndChapter] = useState<number>(numberArray[chapterCount - 1]);

  // const startChapter = useMemo(() => numberArray[0], [numberArray]);
  // const endChapter = useMemo(() => numberArray[chapterCount - 1], [chapterCount, numberArray]);

  const onChangeStartChapter = (_event: SyntheticEvent<Element, Event>, value: number) => {
    setStartChapter(value);
    handleSelectStartChapter(value);
    if (value > endChapter) {
      setEndChapter(value);
      handleSelectEndChapter(value);
    }
  };

  const onChangeEndChapter = (_event: SyntheticEvent<Element, Event>, value: number) => {
    setEndChapter(value);
    handleSelectEndChapter(value);
    if (value < startChapter) {
      setStartChapter(value);
      handleSelectStartChapter(value);
    }
  };

  return (
    <>
      <FormControlLabel
        className="book-selection-chapter-form-label start"
        disabled={isDisabled}
        control={
          <ComboBox
            // Type asserting because combobox props aren't precise enough yet
            // Issue https://github.com/paranext/paranext-core/issues/560
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            onChange={(e, value) => onChangeStartChapter(e, value as number)}
            className="book-selection-chapter"
            key="start chapter"
            isClearable={false}
            options={numberArray}
            getOptionLabel={(option) => option.toString()}
            value={startChapter}
            isDisabled={isDisabled}
          />
        }
        label="Chapters"
        labelPlacement="start"
      />
      <FormControlLabel
        className="book-selection-chapter-form-label end"
        disabled={isDisabled}
        control={
          <ComboBox
            // Type asserting because combobox props aren't precise enough yet
            // Issue https://github.com/paranext/paranext-core/issues/560
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            onChange={(e, value) => onChangeEndChapter(e, value as number)}
            className="book-selection-chapter"
            key="end chapter"
            isClearable={false}
            options={numberArray}
            getOptionLabel={(option) => option.toString()}
            value={endChapter}
            isDisabled={isDisabled}
          />
        }
        label="to"
        labelPlacement="start"
      />
    </>
  );
}
