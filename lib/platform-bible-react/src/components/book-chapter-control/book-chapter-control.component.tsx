/* eslint-disable no-console */
import { useCallback, useRef, useState } from 'react';
import { Canon } from '@sillsdev/scripture';
import { ScriptureReference, getChaptersForBook } from 'platform-bible-utils';
import {
  DropdownMenuTrigger as ShadDropdownMenuTrigger,
  DropdownMenu as ShadDropdownMenu,
  DropdownMenuContent as ShadDropdownMenuContent,
  DropdownMenuLabel as ShadDropdownMenuLabel,
  DropdownMenuSeparator as ShadDropdownMenuSeparator,
} from '@/components/shadcn-ui/dropdown-menu';
import BookChapterInput from '@/components/book-chapter-control/book-chapter-input.component';
import ChapterSelect from '@/components/book-chapter-control/chapter-select.component';
import BookMenuItem, { BookType } from '@/components/book-chapter-control/book-menu-item.component';
import GoToMenuItem from './goTo-menu-item.component';

// functionality todo's:
// todo selected book menu item stays open when you close and reopen the menu
// ? ^ when no chapters book should be highlighted
// ? Figma says "empty books" appear greyed out, does empty mean no chapters?
// todo keyboard shortcuts- ^F9 previous book
// todo keyboard shortcuts- F9 next book
// todo When a webview is set to full screen mode, the dropdown menu is hidden behind this webview, instead of floating over it
// todo Scrollbar not showing on dropdown menu
// todo Input and menu focus sync
// ability to disable menu items

// cleaning code todo's:
// ? Is this the intended way to get and sort bookTypes and books, long term solution

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

function BookChapterControl({ scrRef, handleSubmit }: BookChapterControlProps) {
  const { allBookIds } = Canon;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBookId, setSelectedBookId] = useState<string>('');

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  const handleSelectChapter = (chapterNumber: number) => {
    handleSubmit({
      bookNum: Canon.bookIdToNumber(selectedBookId),
      chapterNum: chapterNumber,
      verseNum: 1,
    });
    setIsOpen(false);
    setSearchQuery('');
  };

  const controlMenuState = useCallback((open: boolean) => {
    if (!open && document.activeElement === inputRef.current) {
      setIsOpen(true);
    } else {
      setIsOpen(open);
    }
  }, []);

  const giveFocusToInput = useCallback(() => inputRef.current.focus(), []);

  return (
    <div>
      <ShadDropdownMenu modal={false} open={isOpen} onOpenChange={controlMenuState}>
        {/* Trigger sets input type as button */}
        <ShadDropdownMenuTrigger asChild>
          <BookChapterInput
            ref={inputRef}
            value={searchQuery}
            handleSearch={handleSearchInput}
            handleKeyUp={() => setIsOpen(true)}
            placeholder={`${Canon.bookNumberToEnglishName(scrRef.bookNum)} ${scrRef.chapterNum}:${scrRef.verseNum}`}
          />
        </ShadDropdownMenuTrigger>
        <ShadDropdownMenuContent
          className="pr-overflow-y-auto pr-font-normal pr-text-slate-700"
          style={{ width: '233px', maxHeight: '500px' }}
          onKeyDown={giveFocusToInput}
          align="start"
        >
          <GoToMenuItem
            handleSort={() => console.log('sorting')}
            handleLocationHistory={() => console.log('location history')}
            handleBookmarks={() => console.log('bookmarks')}
          />
          {bookTypeArray.map(
            (bookType) =>
              fetchFilteredBooks(bookType).length > 0 && (
                <div key={bookType}>
                  <ShadDropdownMenuLabel className="pr-font-semibold pr-text-slate-700">
                    {bookTypeLabels[bookType]}
                  </ShadDropdownMenuLabel>

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
                  {bookType === 'OT' || bookType === 'NT' ? (
                    <ShadDropdownMenuSeparator />
                  ) : undefined}
                </div>
              ),
          )}
        </ShadDropdownMenuContent>
      </ShadDropdownMenu>
    </div>
  );
}

export default BookChapterControl;
