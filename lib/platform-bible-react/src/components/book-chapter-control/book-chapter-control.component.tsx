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
} from '@/components/shadcn-ui/dropdown-menu';
import ShadSlider from '@/components/shadcn-ui/slider';
import BookChapterInput from '@/components/book-chapter-control/book-chapter-input.component';
import ChapterSelect from '@/components/book-chapter-control/chapter-select.component';
import BookMenuItem, { BookType } from '@/components/book-chapter-control/book-menu-item.component';
import { cn } from '@/utils/shadcn-ui.util';
import {
  RadioGroup as ShadRadioGroup,
  RadioGroupItem as ShadRadioGroupItem,
} from '@/components/shadcn-ui/radio-group';
import {
  Select as ShadSelect,
  SelectGroup as ShadSelectGroup,
  SelectValue as ShadSelectValue,
  SelectTrigger as ShadSelectTrigger,
  SelectContent as ShadSelectContent,
  SelectLabel as ShadSelectLabel,
  SelectItem as ShadSelectItem,
} from '@/components/shadcn-ui/select';

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
  const [zoom, setZoom] = useState<number>(100);
  const [fruit, setFruit] = useState<string>('');
  const [radio, setRadio] = useState<string>('');

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

  // todo When a webview is set to full screen mode, the dropdown menu is hidden behind this webview, instead of floating over it
  // todo Scrollbar not showing on dropdown menu

  // On clicking out of Input (focus loss?), also close menu
  // On first key stroke in Input, when menu is closed, the menu will open but keystroke won't be captured

  return (
    <div>
      <ShadDropdownMenu modal={false} open={isOpen} onOpenChange={controlMenuState}>
        {/* Trigger sets input type as button */}
        <ShadDropdownMenuTrigger asChild>
          <BookChapterInput
            ref={inputRef}
            value={searchQuery}
            handleSearch={handleSearchInput}
            handleKeyDown={() => setIsOpen(true)}
            placeholder={`${Canon.bookNumberToEnglishName(scrRef.bookNum)} ${scrRef.chapterNum}:${scrRef.verseNum}`}
          />
        </ShadDropdownMenuTrigger>
        <ShadDropdownMenuContent
          className="pr-overflow-y-auto pr-font-sans pr-font-normal pr-text-slate-700"
          style={{ width: '300px', maxHeight: '500px' }}
          onKeyDown={giveFocusToInput}
        >
          <ShadDropdownMenuItem
            key={1}
            className={cn(
              'pr-flex pr-justify-between pr-font-sans pr-font-normal pr-text-slate-700',
            )}
          >
            {`Zoom: ${zoom}%`}
            <ShadSlider
              defaultValue={[100]}
              value={[zoom]}
              min={50}
              max={200}
              step={1}
              onValueChange={([value]) => {
                setZoom(value);
              }}
            />
          </ShadDropdownMenuItem>

          <ShadDropdownMenuItem
            key={1}
            className={cn(
              'pr-flex pr-justify-between pr-font-sans pr-font-normal pr-text-slate-700',
            )}
          >
            Fruit:
            <ShadSelect
              onValueChange={(value) => {
                setFruit(value);
              }}
              value={fruit}
            >
              <ShadSelectTrigger>
                <ShadSelectValue placeholder="Select a fruit" />
              </ShadSelectTrigger>
              <ShadSelectContent>
                <ShadSelectGroup>
                  <ShadSelectLabel>Fruits</ShadSelectLabel>
                  <ShadSelectItem value="apple">Apple</ShadSelectItem>
                  <ShadSelectItem value="banana">Banana</ShadSelectItem>
                  <ShadSelectItem value="blueberry">Blueberry</ShadSelectItem>
                  <ShadSelectItem value="grapes">Grapes</ShadSelectItem>
                  <ShadSelectItem value="pineapple">Pineapple</ShadSelectItem>
                </ShadSelectGroup>
              </ShadSelectContent>
            </ShadSelect>
          </ShadDropdownMenuItem>
          <ShadDropdownMenuItem
            key={1}
            className={cn(
              'pr-flex pr-justify-between pr-font-sans pr-font-normal pr-text-slate-700',
            )}
          >
            Scroll with:
            <ShadRadioGroup
              orientation="horizontal"
              defaultValue="a"
              onValueChange={(value) => {
                setRadio(value);
              }}
              value={radio}
            >
              <div className="pr-flex pr-items-center pr-space-x-2">
                <ShadRadioGroupItem value="a" id="r1" />A
              </div>
              <div className="pr-flex pr-items-center pr-space-x-2">
                <ShadRadioGroupItem value="b" id="r2" />B
              </div>
              <div className="pr-flex pr-items-center pr-space-x-2">
                <ShadRadioGroupItem value="c" id="r3" />C
              </div>
            </ShadRadioGroup>
          </ShadDropdownMenuItem>
          {bookTypeArray.map((bookType) => (
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
              {bookType === 'OT' || bookType === 'NT' ? <ShadDropdownMenuSeparator /> : undefined}
            </div>
          ))}
        </ShadDropdownMenuContent>
      </ShadDropdownMenu>
    </div>
  );
}

export default BookChapterControl;
