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
    <div className="pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch pr-bg-amber-50">
      {chapters.map((chapter) => (
        <div
          key={chapter}
          className={cn(
            'pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800',
            {
              'hover:pr-bg-amber-200': chapter !== activeChapter,
              'pr-bg-amber-200 pr-font-semibold pr-text-amber-900': chapter === activeChapter,
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
        >
          {chapter}
        </div>
      ))}
    </div>
  );
}

export default ChapterSelect;
