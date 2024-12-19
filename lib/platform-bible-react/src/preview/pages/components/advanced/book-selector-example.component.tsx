import BookSelector, { BookSelectionMode } from '@/components/advanced/book-selector.component';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';
import { Canon } from '@sillsdev/scripture';
import { useState } from 'react';

const localizedStrings = {
  '%webView_bookSelector_currentBook%': 'Current Book',
  '%webView_bookSelector_choose%': 'Choose',
  '%webView_bookSelector_chooseBooks%': 'Choose Books',
};

function BookSelectorExample({ direction }: HasDirection) {
  const [startChapter, setStartChapter] = useState<number>(0);
  const [endChapter, setEndChapter] = useState<number>(0);
  const selectedBooksIds = [
    Canon.bookNumberToId(1),
    Canon.bookNumberToId(4),
    Canon.bookNumberToId(33),
  ];

  const handleSelectBooks = () =>
    console.log(
      'This should open the Book Select dialog, which is in the Platform.Bible renderer. This is too tightly coupled and should be fixed.',
    );

  return (
    <BookSelector
      startChapter={startChapter}
      endChapter={endChapter}
      handleSelectStartChapter={setStartChapter}
      handleSelectEndChapter={setEndChapter}
      chapterCount={30}
      handleBookSelectionModeChange={(newMode: BookSelectionMode) => {
        console.log(`New mode is ${newMode}`);
      }}
      currentBookName="Genesis"
      onSelectBooks={handleSelectBooks}
      selectedBookIds={selectedBooksIds}
      localizedStrings={localizedStrings}
      direction={direction}
    />
  );
}

export default BookSelectorExample;
