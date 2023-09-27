import { SyntheticEvent } from 'react';
import { FormControlLabel } from '@mui/material';
import ComboBox, { ComboBoxLabelOption } from './combo-box.component';

export type ChapterRangeSelectionProps = {
  startChapter: number;
  endChapter: number;
  onChangeStartChapter: (_event: SyntheticEvent<Element, Event>, value: unknown) => void;
  onChangeEndChapter: (_event: SyntheticEvent<Element, Event>, value: unknown) => void;
  isDisabled: boolean;
  chapterCount: number;
};

export interface ChapterNumberOption extends ComboBoxLabelOption {
  chapterNum: number;
}

export default function ChapterRangeSelection({
  startChapter,
  endChapter,
  onChangeStartChapter,
  onChangeEndChapter,
  isDisabled,
  chapterCount,
}: ChapterRangeSelectionProps) {
  let chapterNumberOptions: ChapterNumberOption[];
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
