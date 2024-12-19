import { Button } from '@/components/shadcn-ui/button';
import { Label } from '@/components/shadcn-ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { Canon } from '@sillsdev/scripture';
import { LocalizedStringValue } from 'platform-bible-utils';
import { useState } from 'react';
import ChapterRangeSelector, {
  ChapterRangeSelectorProps,
} from '../basics/chapter-range-selector.component';

export enum BookSelectionMode {
  CURRENT_BOOK = 'current book',
  CHOOSE_BOOKS = 'choose books',
}

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const BOOK_SELECTOR_STRING_KEYS = Object.freeze([
  '%webView_bookSelector_currentBook%',
  '%webView_bookSelector_choose%',
  '%webView_bookSelector_chooseBooks%',
] as const);

export type BookSelectorLocalizedStrings = {
  [localizedInventoryKey in (typeof BOOK_SELECTOR_STRING_KEYS)[number]]?: LocalizedStringValue;
};

/**
 * Gets the localized value for the provided key
 *
 * @param strings Object containing localized string
 * @param key Key for a localized string
 * @returns The localized value for the provided key, if available. Returns the key if no localized
 *   value is available
 */
const localizeString = (
  strings: BookSelectorLocalizedStrings,
  key: keyof BookSelectorLocalizedStrings,
) => {
  return strings[key] ?? key;
};

type BookSelectorProps = ChapterRangeSelectorProps & {
  handleBookSelectionModeChange: (newMode: BookSelectionMode) => void;
  currentBookName: string;
  onSelectBooks: () => void;
  selectedBookIds: string[];
  localizedStrings: BookSelectorLocalizedStrings;
};

export default function BookSelector({
  handleBookSelectionModeChange,
  currentBookName,
  onSelectBooks,
  selectedBookIds,
  chapterCount,
  endChapter,
  handleSelectEndChapter,
  startChapter,
  handleSelectStartChapter,
  localizedStrings,
}: BookSelectorProps) {
  const currentBookText = localizeString(localizedStrings, '%webView_bookSelector_currentBook%');
  const chooseText = localizeString(localizedStrings, '%webView_bookSelector_choose%');
  const chooseBooksText = localizeString(localizedStrings, '%webView_bookSelector_chooseBooks%');

  const [bookSelectionMode, setBookSelectionMode] = useState<BookSelectionMode>(
    BookSelectionMode.CURRENT_BOOK,
  );

  const onSelectionModeChange = (newMode: BookSelectionMode) => {
    setBookSelectionMode(newMode);
    handleBookSelectionModeChange(newMode);
  };

  return (
    <RadioGroup
      className="pr-twp tw-flex"
      value={bookSelectionMode}
      // value is always a string but we need it to be BookSelectionMode
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      onValueChange={(value: string) => onSelectionModeChange(value as BookSelectionMode)}
    >
      <div className="tw-flex tw-w-full tw-flex-col tw-gap-4">
        <div className="tw-grid tw-grid-cols-[25%,25%,50%]">
          <div className="tw-flex tw-items-center">
            <RadioGroupItem value={BookSelectionMode.CURRENT_BOOK} />
            <Label className="tw-ms-1">{currentBookText}</Label>
          </div>
          <Label className="tw-flex tw-items-center">{currentBookName}</Label>
          <div className="tw-flex tw-items-center tw-justify-end">
            <ChapterRangeSelector
              isDisabled={bookSelectionMode === BookSelectionMode.CHOOSE_BOOKS}
              handleSelectStartChapter={handleSelectStartChapter}
              handleSelectEndChapter={handleSelectEndChapter}
              chapterCount={chapterCount}
              startChapter={startChapter}
              endChapter={endChapter}
            />
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-[25%,50%,25%]">
          <div className="tw-flex tw-items-center">
            <RadioGroupItem value={BookSelectionMode.CHOOSE_BOOKS} />
            <Label className="tw-ms-1">{chooseBooksText}</Label>
          </div>
          <Label className="tw-flex tw-items-center">
            {selectedBookIds.map((bookId: string) => Canon.bookIdToEnglishName(bookId)).join(', ')}
          </Label>
          <Button
            disabled={bookSelectionMode === BookSelectionMode.CURRENT_BOOK}
            onClick={() => onSelectBooks()}
          >
            {chooseText}
          </Button>
        </div>
      </div>
    </RadioGroup>
  );
}
