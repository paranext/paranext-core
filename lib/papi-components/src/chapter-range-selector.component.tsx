import { SyntheticEvent, useMemo } from 'react';
import { FormControlLabel } from '@mui/material';
import ComboBox from './combo-box.component';

export type ChapterRangeSelectorProps = {
  startChapter: number;
  endChapter: number;
  onChangeStartChapter: (event: SyntheticEvent<Element, Event>, value: number) => void;
  onChangeEndChapter: (event: SyntheticEvent<Element, Event>, value: number) => void;
  isDisabled?: boolean;
  chapterCount: number;
};

export default function ChapterRangeSelector({
  startChapter,
  endChapter,
  onChangeStartChapter,
  onChangeEndChapter,
  isDisabled,
  chapterCount,
}: ChapterRangeSelectorProps) {
  const numberArray = useMemo(
    () => Array.from({ length: chapterCount }, (_, index) => index + 1),
    [chapterCount],
  );

  return (
    <>
      <FormControlLabel
        className="book-selection-chapter-form-label start"
        disabled={isDisabled}
        control={
          <ComboBox
            onChange={(e, value) => onChangeStartChapter(e, value as number)}
            className="book-selection-chapter"
            key="start chapter"
            isClearable={false}
            options={numberArray}
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
            onChange={(e, value) => onChangeEndChapter(e, value as number)}
            className="book-selection-chapter"
            key="end chapter"
            isClearable={false}
            options={numberArray}
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
