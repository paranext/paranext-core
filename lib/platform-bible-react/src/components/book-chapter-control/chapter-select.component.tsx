import { cn } from '@/utils/shadcn-ui.util';

export type ChapterSelectProps = {
  // The end chapter of the selected book
  endChapter: number;
  // Callback to run when a chapter div is selected
  handleSelectChapter: (chapterNumber: number) => void;
  // The currently selected chapter
  activeChapter: number;
};

function ChapterSelect({ endChapter, activeChapter, handleSelectChapter }: ChapterSelectProps) {
  const chapters = Array.from({ length: endChapter }, (_, i) => i + 1);

  return (
    <div className="pr-flex pr-flex-wrap pr-content-start pr-items-start pr-self-stretch pr-bg-amber-50">
      {chapters.map((chapter) => (
        // When adding onClick to <div> get error: Visible, non-interactive elements with click handlers must have at least one keyboard listener.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className={cn(
            'pr-h-5 pr-w-5 pr-cursor-pointer pr-items-center pr-justify-center pr-rounded pr-p-2 pr-text-amber-800',
            'hover:pr-bg-amber-200',
            `${chapter === activeChapter ?? 'pr-bg-amber-200 pr-font-semibold pr-text-amber-900'}`,
          )}
          key={chapter}
          onClick={() => handleSelectChapter(chapter)}
        >
          {chapter}
        </div>
      ))}
    </div>
  );
}

export default ChapterSelect;
