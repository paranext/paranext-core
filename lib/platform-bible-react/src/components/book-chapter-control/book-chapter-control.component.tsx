import ChapterSelect from './chapter-select.component';

function BookChapterControl() {
  return (
    <ChapterSelect
      endChapter={30}
      handleSelectChapter={(chapterNumber: number) => {
        throw new Error(`Function not implemented. ${chapterNumber}`);
      }}
      activeChapter={0}
    />
  );
}

export default BookChapterControl;
