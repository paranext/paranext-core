import './chapter-select.component.css';

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
    <div className="chapter-select">
      {chapters.map((chapter) => (
        // When adding onClick to <div> get error: Visible, non-interactive elements with click handlers must have at least one keyboard listener.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className={`chapter ${chapter === activeChapter ? 'active' : undefined}`}
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
