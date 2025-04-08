import { ChapterRangeSelector } from '@/components/basics/chapter-range-selector.component';
import { getChaptersForBook } from 'platform-bible-utils';
import { useState } from 'react';

export function ChapterRangeSelectorExample() {
  const chapterCount = getChaptersForBook(1);
  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(chapterCount);

  const handleSelectStart = (newChapter: number) => {
    setStartChapter(newChapter);
  };

  const handleSelectEnd = (newChapter: number) => {
    setEndChapter(newChapter);
  };
  return (
    <ChapterRangeSelector
      startChapter={startChapter}
      endChapter={endChapter}
      handleSelectStartChapter={handleSelectStart}
      handleSelectEndChapter={handleSelectEnd}
      chapterCount={chapterCount}
    />
  );
}

export default ChapterRangeSelectorExample;
