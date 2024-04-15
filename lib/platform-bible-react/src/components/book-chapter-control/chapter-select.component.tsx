import { cn } from '@/utils/shadcn-ui.util';
import { useCallback } from 'react';

export type ChapterSelectProps = {
  // The end chapter of the selected book
  endChapter: number;
  // Callback to run when a chapter div is selected
  handleSelectChapter: (chapterNumber: number) => void;
  // The currently selected chapter
  activeChapter: number;
  highlightedChapter: number;
  handleHighlightedChapter: (chapterNumber: number) => void;
};

function ChapterSelect({
  endChapter,
  activeChapter,
  handleSelectChapter,
  highlightedChapter,
  handleHighlightedChapter,
}: ChapterSelectProps) {
  const chapters = Array.from({ length: endChapter }, (_, i) => i + 1);

  const handleMouse = useCallback(
    (chapterNumber: number) => {
      handleHighlightedChapter(chapterNumber);
      console.log('new highlighted chapter: ', chapterNumber);
    },
    [handleHighlightedChapter],
  );

  return (
    <div
      className={cn(
        'pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch pr-bg-amber-50',
      )}
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
          // onMouseOver wants onFocus to be added here, but onFocus will not be triggered until a chapter number is clicked
          // so it is of no use to add it here
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          onMouseOver={() => handleMouse(chapter)}
          onMouseEnter={() => handleMouse(chapter)}
          onMouseMove={() => handleMouse(chapter)}
        >
          {chapter}
        </div>
      ))}
    </div>
  );
}

export default ChapterSelect;
