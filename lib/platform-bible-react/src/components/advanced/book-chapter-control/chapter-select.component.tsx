import { cn } from '@/utils/shadcn-ui.util';
import { useCallback } from 'react';

export type ChapterSelectProps = {
  /**
   * Callback to run when a chapter div is selected
   *
   * @param chapterNumber Number of the chapter that has been selected
   */
  handleSelectChapter: (chapterNumber: number) => void;
  /** The highest chapter number in the book (of course equal to number of chapters in the book) */
  endChapter: number;
  /** The chapter number that is currently selected */
  selectedChapter: number;
  /** The chapter number that is currently highlighted using keyboard or mouse navigation */
  highlightedChapter: number;
  /**
   * Callback to run when a chapter is highlighted by the user
   *
   * @param chapterNumber The chapter that is highlighted
   */
  handleHighlightedChapter: (chapterNumber: number) => void;
  /** Optional chapter query number used to style non-matching chapter numbers accordingly */
  matchingChapters?: number[];
};

export function ChapterSelect({
  handleSelectChapter,
  endChapter,
  selectedChapter,
  highlightedChapter,
  handleHighlightedChapter,
  matchingChapters,
}: ChapterSelectProps) {
  const chapters = Array.from({ length: endChapter }, (_, i) => i + 1);

  const handleMouse = useCallback(
    (chapterNumber: number) => {
      handleHighlightedChapter(chapterNumber);
    },
    [handleHighlightedChapter],
  );

  return (
    <div className={cn('tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch')}>
      {chapters.map((chapter) => (
        <div
          key={chapter}
          className={cn(
            'tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800',
            {
              'tw-font-semibold tw-text-amber-900': chapter === selectedChapter,
              'tw-bg-amber-200': chapter === highlightedChapter,
              'tw-pointer-events-none tw-bg-accent tw-opacity-50':
                matchingChapters && !matchingChapters.includes(chapter),
            },
          )}
          aria-current={chapter === highlightedChapter}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleSelectChapter(chapter);
          }}
          role="button"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
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
