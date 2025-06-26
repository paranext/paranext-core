import { BookChapterInput } from '@/components/advanced/book-chapter-control/book-chapter-input.component';
import {
  BookMenuItem,
  BookType,
} from '@/components/advanced/book-chapter-control/book-menu-item.component';
import { ChapterSelect } from '@/components/advanced/book-chapter-control/chapter-select.component';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { formatScrRef, getChaptersForBook, MODIFIER_KEYS } from 'platform-bible-utils';
import {
  FocusEvent,
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
  /** The current scripture reference */
  scrRef: SerializedVerseRef;
  /** Function to handle the submission of selected references */
  handleSubmit: (scrRef: SerializedVerseRef) => void;
  /** Optional additional class name for styling */
  className?: string;
  /** Function to retrieve active book IDs */
  getActiveBookIds?: () => string[];
};

/** How many chapter buttons fit in each row in the chapter select */
const CHAPTERS_PER_ROW = 6;

const ALL_BOOK_IDS = Canon.allBookIds.filter((b) => !Canon.isObsolete(Canon.bookIdToNumber(b)));

const ALL_ENGLISH_BOOK_NAMES = Object.fromEntries(
  ALL_BOOK_IDS.map((bookId) => [bookId, Canon.bookIdToEnglishName(bookId)]),
);
const BOOK_TYPE_LABELS: BookTypeLabels = {
  OT: 'Old Testament',
  NT: 'New Testament',
  DC: 'Deuterocanon',
};
const BOOK_TYPE_ARRAY: BookType[] = ['OT', 'NT', 'DC'];
// This is the height of three menu items to offset scrolling to the selected menu item
// If you use menuItemRef.clientHeight- includes height of chapter div which is too big
const SCROLL_OFFSET = 32 + 32 + 32;

const SCRIPTURE_REGEX_PATTERNS = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by space(s) and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon with a verse number (`:(\d+)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d+)$/i,

  // Same as BOOK_CHAPTER_VERSE, but extracts the book name/id from a reference
  EXTRACT_BOOK_FROM_REFERENCE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+\d+:\d+$/,
  // Same as BOOK_CHAPTER_VERSE, but extracts the book name/id and chapter number from a reference
  EXTRACT_BOOK_CHAPTER_FROM_REFERENCE: /^([^:\s]+(?:\s+[^:\s]+)*\s+\d+):\d+$/,
} as const;

const SEARCH_QUERY_FORMATS = [
  SCRIPTURE_REGEX_PATTERNS.BOOK_ONLY, // Matches book name/id
  SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER, // Matches book name/id followed by a chapter number
  SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER_VERSE, // Matches book name/id followed by a chapter and verse number
];

/** Keys used for navigating around in the content menu */
const CONTENT_NAVIGATION_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Enter',
]);

// Thanks to Mx. at https://stackoverflow.com/a/35173443
/** Query selector for finding tab indexable elements */
const TAB_INDEX_QUERY =
  'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

const fetchEndChapter = (bookId: string) => {
  // getChaptersForBook returns -1 if not found in scrBookData
  // scrBookData only includes OT and NT, so all DC will return -1
  return getChaptersForBook(Canon.bookIdToNumber(bookId));
};

/**
 * Gets a bookId from given English name
 *
 * @param bookName Book English name
 * @returns BookId of provided bookName, undefined otherwise
 */
function getBookIdFromEnglishName(bookName: string): string | undefined {
  const matchingBookId = ALL_BOOK_IDS.find(
    (bookId) => ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase() === bookName.toLowerCase(),
  );
  if (matchingBookId) {
    return matchingBookId;
  }

  return undefined;
}

/**
 * `BookChapterControl` is a component that provides an interactive UI for selecting book chapters.
 * It allows users to input a search query to find specific books and chapters, navigate through
 * options with keyboard interactions, and submit selections. The component handles various
 * interactions such as opening and closing the dropdown menu, filtering book lists based on search
 * input, and managing highlighted selections. It also integrates with external handlers for
 * submitting selected references and retrieving active book IDs.
 *
 * @param {BookChapterControlProps} props
 * @param {SerializedVerseRef} props.scrRef - The current scripture reference.
 * @param {function} props.handleSubmit - Function to handle the submission of selected references.
 * @param {string} [props.className] - Optional additional class name for styling.
 * @param {function} [props.getActiveBookIds] - Function to retrieve active book IDs.
 */
export function BookChapterControl({
  scrRef,
  handleSubmit,
  className,
  getActiveBookIds,
}: BookChapterControlProps) {
  const dir: Direction = readDirection();
  // Value displayed on the book chapter input
  const [bookChapterInputValue, setBookChapterInputValue] = useState<string>(() =>
    formatScrRef(scrRef, 'English'),
  );
  // Search query that is used to filter the book list. Set to the book chapter input value if it is modified
  const [searchQuery, setSearchQuery] = useState<string>('');
  // The book that is currently expanded in the dropdown to show its chapter selection controls
  const [selectedBookId, setSelectedBookId] = useState<string>(scrRef.book);
  // Which chapter is highlighted (as if it were being hovered) in the chapter selection controls
  const [highlightedChapter, setHighlightedChapter] = useState<number>(scrRef.chapterNum ?? 0);
  // Which book is highlighted (as if it were being hovered) in the book selection list
  const [highlightedBookId, setHighlightedBookId] = useState<string>(scrRef.book);
  // Whether the dropdown content is showing
  const [isContentOpen, setIsContentOpen] = useState<boolean>(false);
  // `isContentOpen` but delayed by a `useLayoutEffect` cycle - used to delay the scroll to the
  // selected book menu item until the refs are defined and available. This is necessary because the
  // refs are not defined immediately after we set the content to opened, so we need to wait a bit
  // before scrolling to the selected book menu item
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
        const englishNameLowerCase = ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase();
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
    setBookChapterInputValue(searchString);
    setSearchQuery(searchString);
  };

  /**
   * Whether to prevent radix's logic from closing the dropdown. This is important because radix
   * tries to close the dropdown when the input first focuses, and we don't want it to do that. But
   * we don't want to prevent the dropdown from closing when we click away from the input, so we
   * don't want to just keep it open if the input is focused
   */
  const shouldPreventAutoClosing = useRef(false);

  /**
   * Reset this component's internal state to match the scripture reference. For example, this
   * resets the current input value to the scripture reference and removes the filter
   */
  const resetToScrRef = useCallback(() => {
    setBookChapterInputValue(formatScrRef(scrRef, 'English'));
    setSearchQuery('');
    setSelectedBookId(scrRef.book);
    setHighlightedBookId(scrRef.book);
  }, [scrRef]);

  const controlMenuState = useCallback((open: boolean) => {
    if (shouldPreventAutoClosing.current) {
      shouldPreventAutoClosing.current = false;
      return;
    }
    setIsContentOpen(open);
  }, []);

  const updateReference = useCallback(
    (bookId: string, shouldClose: boolean, chapter?: number, verse?: number) => {
      setHighlightedChapter(scrRef.book !== bookId ? 1 : scrRef.chapterNum);

      if (shouldClose || fetchEndChapter(bookId) === -1) {
        handleSubmit({
          book: bookId,
          chapterNum: chapter ?? 1,
          verseNum: verse ?? 1,
        });

        setIsContentOpen(false);
        setSearchQuery('');
        return;
      }

      setSelectedBookId(selectedBookId !== bookId ? bookId : '');
      setIsContentOpen(!shouldClose);
    },
    [handleSubmit, scrRef.book, scrRef.chapterNum, selectedBookId],
  );

  const handleSelectChapter = (chapterNumber: number) => {
    if (chapterNumber <= 0 || chapterNumber > fetchEndChapter(selectedBookId)) {
      return;
    }
    updateReference(selectedBookId, true, chapterNumber);
  };

  const handleInputSubmit = useCallback(() => {
    SEARCH_QUERY_FORMATS.forEach((format) => {
      const matches = format.exec(searchQuery);
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
      // If the dropdown isn't open, open it for looking at what you're typing.
      // If it's open and the user presses down, go into the dropdown
      // If it's open and the user presses escape, close it
      if (!isContentOpen) {
        // Just let Tab do its thing
        if (event.key !== 'Tab') setIsContentOpen(true);
      } else if (event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey)) {
        // If the user presses down or tab, focus the content
        if (menuItemRef?.current) {
          menuItemRef.current.focus();
        } else if (contentRef.current) {
          contentRef.current.focus();
        }
        event.preventDefault();
      } else if (event.key === 'Escape' && document.activeElement === inputRef.current) {
        // If the input isn't focused, the menu dropdown automatically handles the escape key
        setIsContentOpen(false);
        event.preventDefault();
        event.stopPropagation();
      }

      // Special handling for smart chapter/verse editing
      if (document.activeElement === inputRef.current) {
        // Check if user is typing a digit as the first character - start new chapter number
        if (/^\d$/.test(event.key)) {
          const currentValue = bookChapterInputValue;
          // Match pattern "Name of Book 0:0" to extract book name
          const bookMatch = currentValue.match(
            SCRIPTURE_REGEX_PATTERNS.EXTRACT_BOOK_FROM_REFERENCE,
          );
          if (bookMatch) {
            const bookName = bookMatch[1];
            // Replace the input with book name + space + new digit
            const newValue = `${bookName} ${event.key}`;
            handleSearchInput(newValue);
            event.preventDefault();
          }
        }

        // Check if user is typing a colon as the first character - start new verse number
        if (event.key === ':') {
          const currentValue = bookChapterInputValue;
          // Match pattern "Name of Book 0:0" to extract book name and chapter number
          const bookAndChapterMatch = currentValue.match(
            SCRIPTURE_REGEX_PATTERNS.EXTRACT_BOOK_CHAPTER_FROM_REFERENCE,
          );
          if (bookAndChapterMatch) {
            const bookAndChapter = bookAndChapterMatch[1];
            // Replace the input with book name + chapter + colon, ready for verse input
            // In some cases an extraneous colon was added here, so the colon is only added if needed
            const newValue = bookAndChapter.endsWith(':')
              ? `${bookAndChapter}`
              : `${bookAndChapter}:`;
            handleSearchInput(newValue);
            event.preventDefault();
          }
        }
      }
    },
    [isContentOpen, bookChapterInputValue],
  );

  /** Send keydown event to the book chapter input component. */
  const passInputToBookChapterInput = useCallback((event: ReactKeyboardEvent) => {
    // Wait to do anything if the user presses a modifier key since that doesn't constitute typing
    if (MODIFIER_KEYS.has(event.key)) return;

    // Tab sends you to next element outside this BC control, while Shift+tab should send you back to the input
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        inputRef.current.focus();
      } else {
        // We are checking in the filter that it is HTMLElement. TypeScript is getting thrown off
        // by the additional checks for some reason
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const focusableElementsOutsideThisComponent = [
          ...document.querySelectorAll(TAB_INDEX_QUERY),
        ].filter(
          (element) =>
            element instanceof HTMLElement &&
            (((element.offsetWidth > 0 || element.offsetHeight > 0) &&
              !contentRef.current?.contains(element) &&
              !inputRef.current?.contains(element)) ||
              element === event.target),
        ) as HTMLElement[];
        const currentFocusedIndex =
          event.target instanceof HTMLElement
            ? focusableElementsOutsideThisComponent.indexOf(event.target)
            : -1;
        if (currentFocusedIndex >= 0) {
          // Focus the next element if there is one
          const nextElement =
            focusableElementsOutsideThisComponent[
              (currentFocusedIndex + 1) % focusableElementsOutsideThisComponent.length
            ];
          nextElement.focus();
        } else {
          // If we didn't find any focusable elements, just focus the input
          inputRef.current.focus();
        }
      }

      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // This is some kind of keyboard input. Send it to the input component
    event.stopPropagation();
    inputRef.current.focus();
    inputRef.current.dispatchEvent(new KeyboardEvent('keydown', { ...event, view: undefined }));
  }, []);

  /**
   * Handles keydown events for the content area of the dropdown menu.
   *
   * These occur when the user opens the dropdown, mouses over it, then mouses out of the dropdown
   */
  const handleKeyDownContent = useCallback(
    (event: ReactKeyboardEvent) => {
      const { key } = event;

      if (CONTENT_NAVIGATION_KEYS.has(key)) {
        // Built-in hover management works well in this case. Don't mess with it
        return;
      }

      // User is not navigating in the content. Other key strokes give focus back to the input
      // component to type in the filter
      passInputToBookChapterInput(event);
      // Prevent from scrolling to the book whose name starts with the letter typed
      // Unfortunately, this also prevents the character from going to the input for some reason
      event.preventDefault();
    },
    [passInputToBookChapterInput],
  );

  /**
   * Handles keydown events for individual book menu items.
   *
   * These occur when the user opens the dropdown and is focused on or hovering over a book menu
   * item
   *
   * Navigate around in the book/chapter menu using arrow keys and enter.
   *
   * @param event Keydown event
   * @param index Which book menu item is receiving the keydown event
   */
  const handleKeyDownMenuItem = useCallback(
    (event: ReactKeyboardEvent, index: number) => {
      const { key } = event;

      if (CONTENT_NAVIGATION_KEYS.has(key)) {
        // Navigate around in the book/chapter menu using arrow keys and submit with enter
        // Opening the hovered book with enter is handled elsewhere
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
            chapterOffSet = CHAPTERS_PER_ROW;
          } else if (key === 'ArrowUp') {
            chapterOffSet = -CHAPTERS_PER_ROW;
          }
          if (
            highlightedChapter + chapterOffSet <= 0 ||
            highlightedChapter + chapterOffSet > fetchEndChapter(highlightedBookId)
          ) {
            setHighlightedChapter(0);
          } else if (chapterOffSet !== 0) {
            setHighlightedChapter(highlightedChapter + chapterOffSet);
            event.preventDefault();
            return;
          }
        }

        // If we're at the top of the menu and the user presses up, go to the input
        if (index === 0 && key === 'ArrowUp') {
          event.preventDefault();
          inputRef.current.focus();
          return;
        }

        // Do not pass the key to the input component if the user is navigating in the chapter menu
        return;
      }

      // User is not navigating in the content. Other key strokes give focus back to the input
      // component to type in the filter
      passInputToBookChapterInput(event);
    },
    [
      dir,
      highlightedBookId,
      highlightedChapter,
      passInputToBookChapterInput,
      selectedBookId,
      updateReference,
    ],
  );

  useEffect(() => {
    if (selectedBookId === highlightedBookId) {
      if (selectedBookId === scrRef.book) {
        setHighlightedChapter(scrRef.chapterNum);
      } else {
        setHighlightedChapter(1);
      }
    } else {
      setHighlightedChapter(0);
    }
  }, [highlightedBookId, scrRef.book, scrRef.chapterNum, selectedBookId]);

  // When a new scrRef comes in, set the book chapter input value to the formatted scrRef and focus
  // the new scrRef
  useEffect(() => {
    resetToScrRef();
  }, [resetToScrRef]);

  useEffect(() => {}, [isContentOpen, resetToScrRef]);

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

        // Sometimes the input was losing focus because the radix dropdown logic would grab the focus.
        // Work around this to make sure the input stays focused when the user clicks to open the dropdown
        inputRef.current.focus();
      }

      // If the user clicks away, reset to the Scripture Reference
      if (
        !isContentOpenDelayed &&
        document.activeElement !== inputRef.current &&
        !inputRef.current?.contains(document.activeElement) &&
        document.activeElement !== contentRef.current &&
        !contentRef.current?.contains(document.activeElement)
      ) {
        resetToScrRef();
      }
    }, 10);
    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [isContentOpenDelayed, resetToScrRef]);

  return (
    <DropdownMenu modal={false} open={isContentOpen} onOpenChange={controlMenuState}>
      <DropdownMenuTrigger asChild>
        <BookChapterInput
          ref={inputRef}
          value={bookChapterInputValue}
          handleSearch={handleSearchInput}
          handleKeyDown={handleKeyDownInput}
          handleOnClick={() => {
            setSelectedBookId(scrRef.book);
            setHighlightedBookId(scrRef.book);
            setHighlightedChapter(scrRef.chapterNum > 0 ? scrRef.chapterNum : 0);
            setIsContentOpen(true);
            inputRef.current.focus();
          }}
          onFocus={() => {
            // Radix thinks we want to close because the input is being focused. Prevent that
            shouldPreventAutoClosing.current = true;
          }}
          handleSubmit={handleInputSubmit}
          placeholder={formatScrRef(scrRef, 'English')}
          className={className}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80"
        // Need to get over the floating window z-index 200
        style={{ width: '233px', maxHeight: '500px', zIndex: '250' }}
        align={dir === 'ltr' ? 'start' : 'end'}
        ref={contentRef}
        onKeyDown={handleKeyDownContent}
        onFocus={(event: FocusEvent) => {
          // When you focus the input for the first time (no children lost focus), select the text
          // so you overwrite what's there when you start typing
          if (
            !inputRef.current?.contains(event.relatedTarget) &&
            !contentRef.current?.contains(event.relatedTarget)
          )
            inputRef.current.select();
        }}
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

                  {filteredBooks.map((bookId, i) => (
                    <div key={bookId}>
                      <BookMenuItem
                        bookId={bookId}
                        handleSelectBook={() => updateReference(bookId, false)}
                        isSelected={selectedBookId === bookId}
                        handleHighlightBook={() => setHighlightedBookId(bookId)}
                        handleKeyDown={(event) => handleKeyDownMenuItem(event, i)}
                        bookType={bookType}
                        ref={(element: HTMLDivElement) => {
                          if (selectedBookId === bookId) menuItemRef.current = element;
                        }}
                      >
                        <ChapterSelect
                          handleSelectChapter={handleSelectChapter}
                          endChapter={fetchEndChapter(bookId)}
                          // Without this condition- will highlight that chapterNum in every book- not just the selected book
                          activeChapter={scrRef.book === bookId ? scrRef.chapterNum : 0}
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
  );
}

export default BookChapterControl;
