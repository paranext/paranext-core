import { FormControlLabel } from '@mui/material';
import { ComboBox, ComboBoxLabelOption } from 'papi-components';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

export type ChapterRangeSelectionProps = {
  startChapter: number;
  endChapter: number;
  setStartChapter: Dispatch<SetStateAction<number>>;
  setEndChapter: Dispatch<SetStateAction<number>>;
  chapterCount: number;
};

interface ChapterNumberOption extends ComboBoxLabelOption {
  chapterNum: number;
}

export default function ChapterRangeSelection({
  startChapter,
  endChapter,
  setStartChapter,
  setEndChapter,
  chapterCount,
}: ChapterRangeSelectionProps) {
  const chapterNumbers: ChapterNumberOption[] = Array.from(
    { length: chapterCount },
    (_, index) => index + 1,
  ).map((c) => ({
    chapterNum: c,
    label: c.toString(),
  }));

  const onSelectChangeStartChapter = (_event: SyntheticEvent<Element, Event>, value: unknown) => {
    const newStartChapterNum = (value as ChapterNumberOption).chapterNum;
    setStartChapter(newStartChapterNum);
    if (newStartChapterNum > endChapter) setEndChapter(newStartChapterNum);
  };

  const onSelectChangeEndChapter = (_event: SyntheticEvent<Element, Event>, value: unknown) => {
    const newEndChapterNum = (value as ChapterNumberOption).chapterNum;
    setEndChapter(newEndChapterNum);
    if (newEndChapterNum < startChapter) setStartChapter(newEndChapterNum);
  };

  return (
    <>
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
    </>
  );
}
