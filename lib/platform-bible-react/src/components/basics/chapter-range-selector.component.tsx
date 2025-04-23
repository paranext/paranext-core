import { ComboBox } from '@/components/basics/combo-box.component';
import { Label } from '@/components/shadcn-ui/label';
import { useMemo } from 'react';

export type ChapterRangeSelectorProps = {
  startChapter: number;
  endChapter: number;
  handleSelectStartChapter: (chapter: number) => void;
  handleSelectEndChapter: (chapter: number) => void;
  isDisabled?: boolean;
  chapterCount: number;
};

/**
 * ChapterRangeSelector is a component that provides a UI for selecting a range of chapters. It
 * consists of two combo boxes for selecting the start and end chapters. The component ensures that
 * the selected start chapter is always less than or equal to the end chapter, and vice versa.
 *
 * @param {ChapterRangeSelectorProps} props - The props for the component.
 */

export function ChapterRangeSelector({
  startChapter,
  endChapter,
  handleSelectStartChapter,
  handleSelectEndChapter,
  isDisabled = false,
  chapterCount,
}: ChapterRangeSelectorProps) {
  const chapterOptions = useMemo(
    () => Array.from({ length: chapterCount }, (_, index) => index + 1),
    [chapterCount],
  );

  const onChangeStartChapter = (value: number) => {
    handleSelectStartChapter(value);
    if (value > endChapter) {
      handleSelectEndChapter(value);
    }
  };

  const onChangeEndChapter = (value: number) => {
    handleSelectEndChapter(value);
    if (value < startChapter) {
      handleSelectStartChapter(value);
    }
  };

  return (
    <>
      <Label htmlFor="start-chapters-combobox">Chapters</Label>
      <ComboBox
        isDisabled={isDisabled}
        onChange={onChangeStartChapter}
        buttonClassName="tw-me-2 tw-ms-2 tw-w-20"
        key="start chapter"
        options={chapterOptions}
        getOptionLabel={(option) => option.toString()}
        value={startChapter}
      />

      <Label htmlFor="end-chapters-combobox">to</Label>
      <ComboBox
        isDisabled={isDisabled}
        onChange={onChangeEndChapter}
        buttonClassName="tw-ms-2 tw-w-20"
        key="end chapter"
        options={chapterOptions}
        getOptionLabel={(option) => option.toString()}
        value={endChapter}
      />
    </>
  );
}

export default ChapterRangeSelector;
