import { cn } from '@/utils/shadcn-ui.util';
import { useCallback } from 'react';

export type ChapterSelectProps = {
  // Callback to run when a chapter div is selected
  handleSelectChapter: (chapterNumber: number) => void;
  // The end chapter of the selected book
  endChapter: number;
  // The currently selected chapter
  activeChapter: number;
  isHighlighted: boolean;
  highlightedChapter: number;
  handleHighlightedChapter: (chapterNumber: number) => void;
};

function ChapterSelect({
  handleSelectChapter,
  endChapter,
  activeChapter,
  isHighlighted,
  highlightedChapter,
  handleHighlightedChapter,
}: ChapterSelectProps) {
  const chapters = Array.from({ length: endChapter }, (_, i) => i + 1);

  const handleMouse = useCallback(
    (chapterNumber: number) => {
      handleHighlightedChapter(chapterNumber);
    },
    [handleHighlightedChapter],
  );

  return (
    <div
      className={cn('pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch', {
        'pr-bg-amber-50': !isHighlighted,
        'pr-bg-amber-100': isHighlighted,
      })}
    >
      {chapters.map((chapter) => (
        <div
          key={chapter}
          className={cn(
            'pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800',
            {
              'pr-font-semibold pr-text-amber-900': chapter === activeChapter,
              'pr-bg-amber-200': chapter === highlightedChapter,
            },
          )}
          onClick={() => handleSelectChapter(chapter)}
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSelectChapter(chapter);
            }
          }}
          tabIndex={0}
          onMouseMove={() => handleMouse(chapter)}
        >
          {chapter}
        </div>
      ))}
    </div>
  );
}

export default ChapterSelect;
