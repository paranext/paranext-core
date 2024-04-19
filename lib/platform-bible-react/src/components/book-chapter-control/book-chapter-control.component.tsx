/* eslint-disable no-console */
import { KeyboardEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
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

type BookTypeLabels = {
  [bookType in BookType]: string;
};
type BookChapterControlProps = {
  scrRef: ScriptureReference;
  handleSubmit: (scrRef: ScriptureReference) => void;
};

const BOOK_TYPE_LABELS: BookTypeLabels = {
  OT: 'Old Testament',
  NT: 'New Testament',
  DC: 'Deuterocanon',
};
const BOOK_TYPE_ARRAY: BookType[] = ['OT', 'NT', 'DC'];
// This is the height of three menu items to offset scrolling to the selected menu item
// If you use menuItemRef.clientHeight- includes height of chapter div which is too big
const SCROLL_OFFSET = 32 + 32 + 32;

function BookChapterControl({ scrRef, handleSubmit }: BookChapterControlProps) {
  const { allBookIds } = Canon;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBookId, setSelectedBookId] = useState<string>(
    Canon.bookNumberToId(scrRef.bookNum),
  );
  const [highlightedChapter, setHighlightedChapter] = useState<number>(0);
  const [highlightedBookId, setHighlightedBookId] = useState<string>('');
  const [isContentOpen, setIsContentOpen] = useState<boolean>(false);
  const [isContentOpenDelayed, setIsContentOpenDelayed] = useState<boolean>(isContentOpen);

  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const inputRef = useRef<HTMLInputElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const contentRef = useRef<HTMLDivElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const menuItemRef = useRef<HTMLDivElement>(undefined!);

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
    setHighlightedChapter(Canon.bookNumberToId(scrRef.bookNum) !== bookId ? 1 : scrRef.chapterNum);
    setSelectedBookId(selectedBookId !== bookId ? bookId : '');
    // If there are no chapters, then selecting the book will close the menu and set the
    // chapter and verse numbers to 1
    if (fetchEndChapter(bookId) === -1) {
      handleSubmit({
        bookNum: Canon.bookIdToNumber(bookId),
        chapterNum: 1,
        verseNum: 1,
      });
      setIsContentOpen(false);
      setSearchQuery('');
    }
  };

  const handleSelectChapter = (chapterNumber: number) => {
    if (chapterNumber <= 0 || chapterNumber > fetchEndChapter(selectedBookId)) {
      return;
    }

    handleSubmit({
      bookNum: Canon.bookIdToNumber(selectedBookId),
      chapterNum: chapterNumber,
      verseNum: 1,
    });
    setIsContentOpen(false);
    setSearchQuery('');
  };

  const controlMenuState = useCallback((open: boolean) => {
    if (!open && document.activeElement === inputRef.current) {
      setIsContentOpen(true);
    } else {
      setIsContentOpen(open);
    }
  }, []);

  const handleKeyDownInput = useCallback(
    (event: KeyboardEvent) => {
      if (!isContentOpen) {
        setIsContentOpen(true);
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        if (
          typeof menuItemRef !== 'undefined' &&
          // Ref uses null
          // eslint-disable-next-line no-null/no-null
          menuItemRef.current !== null
        ) {
          menuItemRef.current.focus();
        } else if (
          typeof contentRef !== 'undefined' &&
          // Ref uses null
          // eslint-disable-next-line no-null/no-null
          contentRef.current !== null
        ) {
          contentRef.current.focus();
        }
        event.preventDefault();
      }
    },
    [isContentOpen],
  );

  const handleKeyDownContent = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log('content key down processed');
    const { key } = event;
    if (
      key === 'ArrowRight' ||
      key === 'ArrowLeft' ||
      key === 'ArrowDown' ||
      key === 'ArrowUp' ||
      key === 'Enter'
    ) {
      return;
    }
    inputRef.current.focus();
  };

  const handleKeyDownMenuItem = (event: KeyboardEvent) => {
    const { key } = event;
    if (highlightedBookId === selectedBookId) {
      if (key === 'Enter') {
        handleSelectChapter(highlightedChapter);
        return;
      }

      let chapterOffSet = 0;
      if (key === 'ArrowRight') {
        if (highlightedChapter < fetchEndChapter(highlightedBookId)) {
          chapterOffSet = 1;
        } else {
          event.preventDefault();
          return;
        }
      } else if (key === 'ArrowLeft') {
        if (highlightedChapter > 1) {
          chapterOffSet = -1;
        } else {
          event.preventDefault();
          return;
        }
      } else if (key === 'ArrowDown') {
        chapterOffSet = 6;
      } else if (key === 'ArrowUp') {
        chapterOffSet = -6;
      }
      if (
        highlightedChapter + chapterOffSet <= 0 ||
        highlightedChapter + chapterOffSet > fetchEndChapter(highlightedBookId)
      ) {
        setHighlightedChapter(0);
      } else {
        setHighlightedChapter(highlightedChapter + chapterOffSet);
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    if (selectedBookId === highlightedBookId) {
      if (selectedBookId === Canon.bookNumberToId(scrRef.bookNum)) {
        setHighlightedChapter(scrRef.chapterNum);
      } else {
        setHighlightedChapter(1);
      }
    } else {
      setHighlightedChapter(0);
    }
  }, [highlightedBookId, scrRef.bookNum, scrRef.chapterNum, selectedBookId]);

  useEffect(() => {
    setIsContentOpenDelayed(isContentOpen);
  }, [isContentOpen]);

  useLayoutEffect(() => {
    if (isContentOpenDelayed && contentRef.current && menuItemRef.current) {
      const menuItemOffsetTop = menuItemRef.current.offsetTop;
      const scrollPosition = menuItemOffsetTop - SCROLL_OFFSET;
      contentRef.current.scrollTo({ top: scrollPosition, behavior: 'instant' });
      menuItemRef.current.focus();
    }
  }, [isContentOpenDelayed]);

  return (
    <div>
      <ShadDropdownMenu modal={false} open={isContentOpen} onOpenChange={controlMenuState}>
        {/* Trigger sets input type as button */}
        <ShadDropdownMenuTrigger asChild>
          <BookChapterInput
            ref={inputRef}
            value={searchQuery}
            handleSearch={handleSearchInput}
            handleKeyDown={handleKeyDownInput}
            handleOnClick={() => {
              setSelectedBookId(Canon.bookNumberToId(scrRef.bookNum));
              setHighlightedChapter(scrRef.chapterNum > 0 ? scrRef.chapterNum : 0);
            }}
            placeholder={`${Canon.bookNumberToEnglishName(scrRef.bookNum)} ${scrRef.chapterNum}:${scrRef.verseNum}`}
          />
        </ShadDropdownMenuTrigger>
        <ShadDropdownMenuContent
          className="pr-overflow-y-auto pr-font-normal pr-text-slate-700"
          style={{ width: '233px', maxHeight: '500px' }}
          onKeyDown={handleKeyDownContent}
          align="start"
          ref={contentRef}
        >
          <GoToMenuItem
            handleSort={() => console.log('sorting')}
            handleLocationHistory={() => console.log('location history')}
            handleBookmarks={() => console.log('bookmarks')}
          />
          {BOOK_TYPE_ARRAY.map(
            (bookType) =>
              fetchFilteredBooks(bookType).length > 0 && (
                <div key={bookType}>
                  <ShadDropdownMenuLabel className="pr-font-semibold pr-text-slate-700">
                    {BOOK_TYPE_LABELS[bookType]}
                  </ShadDropdownMenuLabel>

                  {fetchFilteredBooks(bookType).map((bookId) => (
                    <div key={bookId}>
                      <BookMenuItem
                        bookId={bookId}
                        handleSelectBook={() => handleSelectBook(bookId)}
                        isSelected={selectedBookId === bookId}
                        handleHighlightBook={() => setHighlightedBookId(bookId)}
                        // isHighlighted={highlightedBookId === bookId}
                        handleKeyDown={handleKeyDownMenuItem}
                        bookType={bookType}
                        ref={menuItemRef}
                      >
                        <ChapterSelect
                          handleSelectChapter={handleSelectChapter}
                          endChapter={fetchEndChapter(bookId)}
                          // Without this condition- will highlight that chapterNum in every book- not just the selected book
                          activeChapter={
                            scrRef.bookNum === Canon.bookIdToNumber(bookId) ? scrRef.chapterNum : 0
                          }
                          isHighlighted={selectedBookId === highlightedBookId}
                          highlightedChapter={highlightedChapter}
                          handleHighlightedChapter={(chapterNumber: number): void => {
                            setHighlightedChapter(chapterNumber);
                          }}
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
