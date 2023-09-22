import { FormControlLabel } from '@mui/material';
import { ComboBox, ComboBoxLabelOption } from 'papi-components';
import { SyntheticEvent } from 'react';
// import { getChaptersForBook } from 'scripture/scripture-util';

export type ChapterRangeSelectionProps = {
  startChapter: number;
  endChapter: number;
  currentBookNumber: number;
  onChangeStartChapter: (_event: SyntheticEvent<Element, Event>, value: unknown) => void;
  onChangeEndChapter: (_event: SyntheticEvent<Element, Event>, value: unknown) => void;
  isDisabled: boolean;
};

export interface ChapterNumberOption extends ComboBoxLabelOption {
  chapterNum: number;
}

export default function ChapterRangeSelection({
  startChapter,
  endChapter,
  currentBookNumber,
  onChangeStartChapter,
  onChangeEndChapter,
  isDisabled,
}: ChapterRangeSelectionProps) {
  let chapterNumberOptions: ChapterNumberOption[];
  const chapterCount = currentBookNumber === 1 ? 50 : 20;
  const numberArray = Array.from({ length: chapterCount }, (_, index) => index + 1);

  const getChapterNumberOptions = () => {
    if (!chapterNumberOptions) {
      chapterNumberOptions = numberArray.map((chapterNum) => ({
        chapterNum,
        label: chapterNum.toString(),
      }));
    }
    return chapterNumberOptions;
  };

  const currentStartChapter = getChapterNumberOptions()[startChapter - 1];
  const currentEndChapter = getChapterNumberOptions()[endChapter - 1];

  return (
    <>
      <FormControlLabel
        className="book-selection-chapter-form-label start"
        disabled={isDisabled}
        control={
          <ComboBox
            onChange={onChangeStartChapter}
            className="book-selection-chapter"
            key="start chapter"
            isClearable={false}
            options={getChapterNumberOptions()}
            value={currentStartChapter}
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
            onChange={onChangeEndChapter}
            className="book-selection-chapter"
            key="end chapter"
            isClearable={false}
            options={getChapterNumberOptions()}
            value={currentEndChapter}
            isDisabled={isDisabled}
          />
        }
        label="to"
        labelPlacement="start"
      />
    </>
  );
}
