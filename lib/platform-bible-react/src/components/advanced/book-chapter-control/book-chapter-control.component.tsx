import BookChapterInput from '@/components/advanced/book-chapter-control/book-chapter-input.component';
import BookMenuItem, {
  BookType,
} from '@/components/advanced/book-chapter-control/book-menu-item.component';
import ChapterSelect from '@/components/advanced/book-chapter-control/chapter-select.component';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { Canon } from '@sillsdev/scripture';
import { type ScriptureReference, getChaptersForBook } from 'platform-bible-utils';
import {
  KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type BookTypeLabels = {
  [bookType in BookType]: string;
};

export type BookChapterControlProps = {
  scrRef: ScriptureReference;
  handleSubmit: (scrRef: ScriptureReference) => void;
  className?: string;
  getActiveBookIds?: () => string[];
};

const ALL_BOOK_IDS = Canon.allBookIds.filter((b) => !Canon.isObsolete(Canon.bookIdToNumber(b)));
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

function BookChapterControl({
  scrRef,
  handleSubmit,
  className,
  getActiveBookIds,
}: BookChapterControlProps) {
  const dir: Direction = readDirection();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBookId, setSelectedBookId] = useState<string>(
    Canon.bookNumberToId(scrRef.bookNum),
  );
  const [highlightedChapter, setHighlightedChapter] = useState<number>(scrRef.chapterNum ?? 0);
  const [highlightedBookId, setHighlightedBookId] = useState<string>(
    Canon.bookNumberToId(scrRef.bookNum),
  );
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
      const newBookIds = getActiveBookIds ? getActiveBookIds() : ALL_BOOK_IDS;

      return {
        OT: newBookIds.filter((bookId) => Canon.isBookOT(bookId)),
        NT: newBookIds.filter((bookId) => Canon.isBookNT(bookId)),
        DC: newBookIds.filter((bookId) => Canon.isBookDC(bookId)),
      }[bookType].filter((bookId: string) => {
        const englishNameLowerCase = Canon.bookIdToEnglishName(bookId).toLowerCase();
        const normalizedQuery = searchQuery.replace(/[^a-zA-Z]/g, '').toLowerCase();
        return (
          englishNameLowerCase.includes(normalizedQuery) || // Match book name
          bookId.toLowerCase().includes(normalizedQuery) // Match book ID
        );
      });
    },
    [searchQuery, getActiveBookIds], // Only recompute when relevant values change
  );

  const handleSearchInput = (searchString: string) => {
    setSearchQuery(searchString);
  };

  /**
   * Whether to prevent radix's logic from closing the dropdown. This is important because radix
   * tries to close the dropdown when the input first focuses, and we don't want it to do that. But
   * we don't want to prevent the dropdown from closing when we click away from the input, so we
   * don't want to just keep it open if the input is focused
   */
  const shouldPreventAutoClosing = useRef(false);

  const controlMenuState = useCallback((open: boolean) => {
    if (shouldPreventAutoClosing.current) {
      shouldPreventAutoClosing.current = false;
      return;
    }
    setIsContentOpen(open);
  }, []);

  const updateReference = useCallback(
    (bookId: string, shouldClose: boolean, chapter?: number, verse?: number) => {
      setHighlightedChapter(
        Canon.bookNumberToId(scrRef.bookNum) !== bookId ? 1 : scrRef.chapterNum,
      );

      if (shouldClose || fetchEndChapter(bookId) === -1) {
        handleSubmit({
          bookNum: Canon.bookIdToNumber(bookId),
          chapterNum: chapter || 1,
          verseNum: verse || 1,
        });

        setIsContentOpen(false);
        setSearchQuery('');
        return;
      }

      setSelectedBookId(selectedBookId !== bookId ? bookId : '');
      setIsContentOpen(!shouldClose);
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
    (event: ReactKeyboardEvent) => {
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

  const handleKeyDownContent = (event: ReactKeyboardEvent<HTMLInputElement>) => {
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

    inputRef.current.dispatchEvent(new KeyboardEvent('keydown', { key }));
    inputRef.current.focus();
  };

  const handleKeyDownMenuItem = (event: ReactKeyboardEvent) => {
    const { key } = event;
    if (highlightedBookId === selectedBookId) {
      if (key === 'Enter') {
        event.preventDefault();
        updateReference(selectedBookId, true, highlightedChapter);
        return;
      }

      const upOneChapter =
        (key === 'ArrowRight' && !dir) ||
        (key === 'ArrowRight' && dir === 'ltr') ||
        (key === 'ArrowLeft' && dir === 'rtl');
      const downOneChapter =
        (key === 'ArrowLeft' && !dir) ||
        (key === 'ArrowLeft' && dir === 'ltr') ||
        (key === 'ArrowRight' && dir === 'rtl');
      let chapterOffSet = 0;
      if (upOneChapter) {
        if (highlightedChapter < fetchEndChapter(highlightedBookId)) {
          chapterOffSet = 1;
        } else {
          event.preventDefault();
          return;
        }
      } else if (downOneChapter) {
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
      } else if (chapterOffSet !== 0) {
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
  // enough so that the refs are defined and available when they are used after the timeout
  useLayoutEffect(() => {
    setIsContentOpenDelayed(isContentOpen);
  }, [isContentOpen]);

  useLayoutEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (isContentOpenDelayed && contentRef.current && menuItemRef.current) {
        const menuItemOffsetTop = menuItemRef.current.offsetTop;
        const scrollPosition = menuItemOffsetTop - SCROLL_OFFSET;
        contentRef.current.scrollTo({ top: scrollPosition, behavior: 'instant' });
      }
    }, 10);
    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [isContentOpenDelayed]);

  return (
    <div className="pr-twp tw-flex">
      <DropdownMenu modal={false} open={isContentOpen} onOpenChange={controlMenuState}>
        <DropdownMenuTrigger asChild>
          <BookChapterInput
            ref={inputRef}
            value={searchQuery}
            handleSearch={handleSearchInput}
            handleKeyDown={handleKeyDownInput}
            handleOnClick={() => {
              setSelectedBookId(Canon.bookNumberToId(scrRef.bookNum));
              setHighlightedBookId(Canon.bookNumberToId(scrRef.bookNum));
              setHighlightedChapter(scrRef.chapterNum > 0 ? scrRef.chapterNum : 0);
              setIsContentOpen(true);
              inputRef.current.focus();
            }}
            onFocus={() => {
              // Radix thinks we want to close because the input is being focused. Prevent that
              shouldPreventAutoClosing.current = true;
            }}
            handleSubmit={handleInputSubmit}
            placeholder={`${Canon.bookNumberToEnglishName(scrRef.bookNum)} ${scrRef.chapterNum}:${scrRef.verseNum}`}
            className={className}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80"
          // Need to get over the floating window z-index 200
          style={{ width: '233px', maxHeight: '500px', zIndex: '250' }}
          onKeyDown={handleKeyDownContent}
          align={dir === 'ltr' ? 'start' : 'end'}
          ref={contentRef}
        >
          {/* work around until DropdownMenuContent supports a dir prop */}
          <div className="rtl:tw-ps-2">
            {BOOK_TYPE_ARRAY.map((bookType, bookTypeIndex) => {
              const filteredBooks = fetchFilteredBooks(bookType);
              return (
                filteredBooks.length > 0 && (
                  <div key={bookType}>
                    <DropdownMenuLabel className="tw-font-semibold tw-text-foreground/80">
                      {BOOK_TYPE_LABELS[bookType]}
                    </DropdownMenuLabel>

                    {filteredBooks.map((bookId) => (
                      <div key={bookId}>
                        <BookMenuItem
                          bookId={bookId}
                          handleSelectBook={() => updateReference(bookId, false)}
                          isSelected={selectedBookId === bookId}
                          handleHighlightBook={() => setHighlightedBookId(bookId)}
                          handleKeyDown={handleKeyDownMenuItem}
                          bookType={bookType}
                          ref={(element: HTMLDivElement) => {
                            if (selectedBookId === bookId) menuItemRef.current = element;
                          }}
                        >
                          <ChapterSelect
                            handleSelectChapter={handleSelectChapter}
                            endChapter={fetchEndChapter(bookId)}
                            // Without this condition- will highlight that chapterNum in every book- not just the selected book
                            activeChapter={
                              scrRef.bookNum === Canon.bookIdToNumber(bookId)
                                ? scrRef.chapterNum
                                : 0
                            }
                            highlightedChapter={highlightedChapter}
                            handleHighlightedChapter={(chapterNumber: number): void => {
                              setHighlightedChapter(chapterNumber);
                            }}
                          />
                        </BookMenuItem>
                      </div>
                    ))}
                    {BOOK_TYPE_ARRAY.length - 1 !== bookTypeIndex ? (
                      <DropdownMenuSeparator />
                    ) : undefined}
                  </div>
                )
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default BookChapterControl;
