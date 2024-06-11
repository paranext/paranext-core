import { useEffect, useState } from 'react';
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
  isDisabled = false,
  chapterCount,
}: ChapterRangeSelectorProps) {
  const [startChapter, setStartChapter] = useState<number>(1);
  const [endChapter, setEndChapter] = useState<number>(chapterCount);
  const [chapterOptions, setChapterOptions] = useState<number[]>(
    Array.from({ length: chapterCount }, (_, i) => i + 1),
  );

  useEffect(() => {
    setStartChapter(1);
    handleSelectStartChapter(1);
    setEndChapter(chapterCount);
    handleSelectEndChapter(chapterCount);
    setChapterOptions(Array.from({ length: chapterCount }, (_, i) => i + 1));
  }, [chapterCount, handleSelectEndChapter, handleSelectStartChapter]);

  const onChangeStartChapter = (value: number) => {
    setStartChapter(value);
    handleSelectStartChapter(value);
    if (value > endChapter) {
      setEndChapter(value);
      handleSelectEndChapter(value);
    }
  };

  const onChangeEndChapter = (value: number) => {
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
            onChange={onChangeStartChapter}
            className="book-selection-chapter"
            key="start chapter"
            isClearable={false}
            options={chapterOptions}
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
            onChange={onChangeEndChapter}
            className="book-selection-chapter"
            key="end chapter"
            isClearable={false}
            options={chapterOptions}
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
