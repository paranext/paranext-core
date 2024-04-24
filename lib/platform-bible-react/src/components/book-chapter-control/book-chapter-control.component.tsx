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
import GoToMenuItem from './go-to-menu-item.component';

type BookTypeLabels = {
  [bookType in BookType]: string;
};
type BookChapterControlProps = {
  scrRef: ScriptureReference;
  handleSubmit: (scrRef: ScriptureReference) => void;
};

const ALL_BOOK_IDS = Canon.allBookIds;
const BOOK_TYPE_LABELS: BookTypeLabels = {
  OT: 'Old Testament',
  NT: 'New Testament',
  DC: 'Deuterocanon',
};
const BOOK_TYPE_ARRAY: BookType[] = ['OT', 'NT', 'DC'];
// This is the height of three menu items to offset scrolling to the selected menu item
// If you use menuItemRef.clientHeight- includes height of chapter div which is too big
const SCROLL_OFFSET = 32 + 32 + 32;
const SEARCH_QUERY_FORMATS = [
  /^(\w+)$/i, // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i, // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i, // Matches a word followed by a chapter and verse number
];
const fetchGroupedBooks = (bookType: BookType) => {
  const groupedBooks = {
    OT: ALL_BOOK_IDS.filter((bookId) => Canon.isBookOT(bookId)),
    NT: ALL_BOOK_IDS.filter((bookId) => Canon.isBookNT(bookId)),
    DC: ALL_BOOK_IDS.filter((bookId) => Canon.isBookDC(bookId)),
  };
  return groupedBooks[bookType];
};
const fetchEndChapter = (bookId: string) => {
  // getChaptersForBook returns -1 if not found in scrBookData
  // scrBookData only includes OT and NT, so all DC will return -1
  return getChaptersForBook(Canon.bookIdToNumber(bookId));
};

/**
 * Gets all of the English names from book ids
 *
 * @returns String[]
 */
function getAllEnglishNames(): string[] {
  const allEnglishNames = ALL_BOOK_IDS.map((bookId) => {
    return Canon.bookIdToEnglishName(bookId);
  });
  return allEnglishNames;
}

/**
 * Determines if bookName is in allEnglishNames
 *
 * @param bookName Book English name
 * @returns True if bookName is included, false otherwise
 */
function isValidBookEnglishName(bookName: string): boolean {
  return getAllEnglishNames().includes(bookName);
}

/**
 * Gets a bookId from given English name
 *
 * @param bookName Book English name
 * @returns BookId of provided bookName, undefined otherwise
 */
function getBookIdFromEnglishName(bookName: string): string | undefined {
  // Convert bookName to lowercase and then capitalize the first letter
  const formattedBookName = bookName.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());

  if (isValidBookEnglishName(formattedBookName)) {
    const matchingBookId = ALL_BOOK_IDS.find((bookId) => {
      return Canon.bookIdToEnglishName(bookId) === formattedBookName;
    });
    return matchingBookId;
  }

  return undefined;
}

function BookChapterControl({ scrRef, handleSubmit }: BookChapterControlProps) {
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

  const fetchFilteredBooks = useCallback(
    (bookType: BookType) => {
      return fetchGroupedBooks(bookType).filter((bookId: string) => {
        const englishNameLowerCase = Canon.bookIdToEnglishName(bookId).toLowerCase();
        const normalizedQuery = searchQuery.replace(/[^a-zA-Z]/g, '').toLowerCase();
        return (
          englishNameLowerCase.includes(normalizedQuery) || // Match book name
          bookId.toLowerCase().includes(normalizedQuery) // Match book ID
        );
      });
    },
    [searchQuery],
  );

  const handleSearchInput = (searchString: string) => {
    setSearchQuery(searchString);
  };

  const controlMenuState = useCallback((open: boolean) => {
    if (!open && document.activeElement === inputRef.current) {
      setIsContentOpen(true);
    } else {
      setIsContentOpen(open);
    }
  }, []);

  const updateReference = useCallback(
    (bookId: string, shouldClose: boolean, chapter?: number, verse?: number) => {
      if (bookId && (!chapter || fetchEndChapter(bookId) === -1)) {
        setSelectedBookId(selectedBookId !== bookId ? bookId : '');
        return;
      }

      setHighlightedChapter(
        Canon.bookNumberToId(scrRef.bookNum) !== bookId ? 1 : scrRef.chapterNum,
      );
      setSelectedBookId(selectedBookId !== bookId ? bookId : '');

      handleSubmit({
        bookNum: Canon.bookIdToNumber(bookId),
        chapterNum: chapter || 1,
        verseNum: verse || 1,
      });

      setIsContentOpen(!shouldClose);
      setSearchQuery('');
    },
    [handleSubmit, scrRef.bookNum, scrRef.chapterNum, selectedBookId],
  );

  const handleSelectChapter = (chapterNumber: number) => {
    if (chapterNumber <= 0 || chapterNumber > fetchEndChapter(selectedBookId)) {
      return;
    }

    updateReference(selectedBookId, true, chapterNumber);
  };

  const handleInputSubmit = useCallback(() => {
    SEARCH_QUERY_FORMATS.forEach((format) => {
      const matches = searchQuery.match(format);
      if (matches) {
        // Book should be a bookId or an english name
        const [book, chapter = undefined, verse = undefined] = matches.slice(1);
        const englishName = getBookIdFromEnglishName(book);

        if (Canon.isBookIdValid(book) || englishName) {
          updateReference(
            englishName ?? book,
            true,
            chapter ? parseInt(chapter, 10) : 1,
            verse ? parseInt(verse, 10) : 1,
          );
        }
      }
    });
  }, [updateReference, searchQuery]);

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
    // When the dropdown menu has focus, key strokes should give focus to the input component,
    // unless they're navigation keys (arrows and enter)
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
        updateReference(selectedBookId, true, highlightedChapter);
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

  // The purpose of these useLayoutEffects and timeout is to delay the scroll just
  // enough so that the refs have time to be defined and it makes it through the check on 293
  useLayoutEffect(() => {
    setIsContentOpenDelayed(isContentOpen);
  }, [isContentOpen]);

  useLayoutEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (isContentOpenDelayed && contentRef.current && menuItemRef.current) {
        const menuItemOffsetTop = menuItemRef.current.offsetTop;
        const scrollPosition = menuItemOffsetTop - SCROLL_OFFSET;
        contentRef.current.scrollTo({ top: scrollPosition, behavior: 'instant' });
        menuItemRef.current.focus();
      }
    }, 10);
    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [isContentOpenDelayed]);

  return (
    <div>
      <ShadDropdownMenu modal={false} open={isContentOpen} onOpenChange={controlMenuState}>
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
            handleSubmit={handleInputSubmit}
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
                        handleSelectBook={() => updateReference(bookId, false)}
                        isSelected={selectedBookId === bookId}
                        handleHighlightBook={() => setHighlightedBookId(bookId)}
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
