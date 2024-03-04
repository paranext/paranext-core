import { useCallback, useRef, useState } from 'react';
import { Canon } from '@sillsdev/scripture';
import { ScriptureReference, getChaptersForBook } from 'platform-bible-utils';
import {
  DropdownMenuTrigger as ShadDropdownMenuTrigger,
  DropdownMenu as ShadDropdownMenu,
  DropdownMenuContent as ShadDropdownMenuContent,
  DropdownMenuLabel as ShadDropdownMenuLabel,
  DropdownMenuSeparator as ShadDropdownMenuSeparator,
  DropdownMenuItem as ShadDropdownMenuItem,
} from '../shadcn-ui/dropdown-menu';
import BookChapterInput from './book-chapter-input.component';
import ChapterSelect from './chapter-select.component';
import BookMenuItem, { BookType } from './book-menu-item.component';
import './book-chapter-control.component.css';

type BookTypeLabels = {
  [bookType in BookType]: string;
};
const bookTypeLabels: BookTypeLabels = {
  OT: 'Old Testament',
  NT: 'New Testament',
  DC: 'Deuterocanon',
};
const bookTypeArray: BookType[] = ['OT', 'NT', 'DC'];

type BookChapterControlProps = {
  scrRef: ScriptureReference;
  handleSubmit: (scrRef: ScriptureReference) => void;
};

// todo Can we type in the input when the menu is open? And will the menu be updated accordingly?
// todo History icon should appear inside Input component

// todo Get rid of the black border upon clicking the input
// todo When a webview is set to full screen mode, the dropdown menu is hidden behind this webview, instead of floating over it
// todo CSS can be optimized (proper colors)

// todo Dropdown menu does not close when a chapter number is clicked
// todo Dropdown entries for books that don't have chapters defined should go to 1:1 when clicked, and the menu should be closed upon clicking one of them

function BookChapterControl({ scrRef, handleSubmit }: BookChapterControlProps) {
  const { allBookIds } = Canon;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBookId, setSelectedBookId] = useState<string>('');

  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const inputRef = useRef<HTMLInputElement>(undefined!);

  const fetchGroupedBooks = useCallback(
    (bookType: BookType) => {
      const groupedBooks = {
        OT: allBookIds.filter((bookId) => Canon.isBookOT(bookId)),
        NT: allBookIds.filter((bookId) => Canon.isBookNT(bookId)),
        DC: allBookIds.filter((bookId) => Canon.isBookDC(bookId)),
      };
      return groupedBooks[bookType];
    },
    [allBookIds],
  );

  const fetchFilteredBooks = useCallback(
    (bookType: BookType) => {
      return fetchGroupedBooks(bookType).filter(
        (bookId: string) =>
          Canon.bookIdToEnglishName(bookId).toLowerCase().includes(searchQuery.toLowerCase()) ||
          bookId.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    },
    [fetchGroupedBooks, searchQuery],
  );

  const handleSearchInput = (searchString: string) => {
    setSearchQuery(searchString);
  };

  const fetchEndChapter = useCallback((bookId: string) => {
    // getChaptersForBook returns -1 if not found in scrBookData
    // scrBookData only includes OT and NT, so all DC will return -1
    return getChaptersForBook(Canon.bookIdToNumber(bookId));
  }, []);

  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(selectedBookId !== bookId ? bookId : '');
    // If there are no chapters, then selecting the book will close the menu and set the
    // chapter and verse numbers to 1
    if (fetchEndChapter(bookId) === -1) {
      handleSubmit({
        bookNum: Canon.bookIdToNumber(bookId),
        chapterNum: 1,
        verseNum: 1,
      });
    }
  };

  const handleSelectChapter = (chapterNumber: number) => {
    handleSubmit({
      bookNum: Canon.bookIdToNumber(selectedBookId),
      chapterNum: chapterNumber,
      verseNum: 1,
    });
  };

  // Make sure input gets focus when it's clicked (now the dropdown content gets focus)

  return (
    <div>
      <ShadDropdownMenu>
        {/* Trigger sets input type as button */}
        <ShadDropdownMenuTrigger asChild>
          <BookChapterInput
            ref={inputRef}
            value={searchQuery}
            handleSearch={handleSearchInput}
            placeholder={`${Canon.bookNumberToEnglishName(scrRef.bookNum)} ${scrRef.chapterNum}:${scrRef.verseNum}`}
          />
        </ShadDropdownMenuTrigger>
        <ShadDropdownMenuContent style={{ width: '300px', height: '500px', overflowY: 'auto' }}>
          <ShadDropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              inputRef.current.focus();
              console.log('Attempt to give focus to input');
            }}
          >
            Give focus to input
          </ShadDropdownMenuItem>
          {bookTypeArray.map((bookType) => (
            <div key={bookType}>
              <ShadDropdownMenuLabel>{bookTypeLabels[bookType]}</ShadDropdownMenuLabel>
              {fetchFilteredBooks(bookType).map((bookId) => (
                <div key={bookId}>
                  <BookMenuItem
                    bookId={bookId}
                    handleSelectBook={() => handleSelectBook(bookId)}
                    isSelected={selectedBookId === bookId}
                    bookType={bookType}
                  >
                    <ChapterSelect
                      handleSelectChapter={handleSelectChapter}
                      endChapter={fetchEndChapter(bookId)}
                      // Without this condition- will highlight that chapterNum in every book- not just the selected book
                      activeChapter={
                        scrRef.bookNum === Canon.bookIdToNumber(bookId) ? scrRef.chapterNum : 0
                      }
                    />
                  </BookMenuItem>
                </div>
              ))}
              {/* We know this is right because the order of bookTypes will not change */}
              {bookType === 'OT' || bookType === 'NT' ? <ShadDropdownMenuSeparator /> : undefined}
            </div>
          ))}
        </ShadDropdownMenuContent>
      </ShadDropdownMenu>
      <button
        type="button"
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        Focus input
      </button>
    </div>
  );
}

export default BookChapterControl;
