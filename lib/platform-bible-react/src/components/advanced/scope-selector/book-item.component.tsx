import { CommandItem } from '@/components/shadcn-ui/command';
import { cn } from '@/utils/shadcn-ui.util';
import { Canon } from '@sillsdev/scripture';
import { Check } from 'lucide-react';
import { MutableRefObject } from 'react';
import { getSectionForBook, Section } from './scope-selector-utils';

function BookItem({
  bookId,
  selectedBookIds,
  toggleBook,
  lastKeyEventShiftKey,
  isMouseClick,
  mouseClickTimer,
}: {
  bookId: string;
  selectedBookIds: string[];
  toggleBook: (bookId: string, shiftKey: boolean) => void;
  lastKeyEventShiftKey: MutableRefObject<boolean>;
  isMouseClick: MutableRefObject<boolean>;
  mouseClickTimer: MutableRefObject<ReturnType<typeof setTimeout> | undefined>;
}) {
  return (
    <CommandItem
      key={bookId}
      value={bookId}
      className="tw-flex tw-items-center"
      onSelect={() => {
        // Only process selection if it wasn't triggered by mouse
        if (!isMouseClick.current) {
          toggleBook(bookId, lastKeyEventShiftKey.current);
          lastKeyEventShiftKey.current = false;
        }
        if (mouseClickTimer.current) {
          clearTimeout(mouseClickTimer.current);
        }
        mouseClickTimer.current = setTimeout(() => {
          isMouseClick.current = false;
        }, 100);
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        isMouseClick.current = true;
        toggleBook(bookId, e.shiftKey);
      }}
      role="option"
      aria-selected={selectedBookIds.includes(bookId)}
      aria-label={`${Canon.bookIdToEnglishName(bookId)} (${bookId.toLocaleUpperCase()})`}
    >
      <Check
        className={cn(
          'tw-mr-2 tw-h-4 tw-w-4',
          selectedBookIds.includes(bookId) ? 'tw-opacity-100' : 'tw-opacity-0',
        )}
      />
      <span
        className={cn(
          'tw-flex-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2',
          {
            'tw-border-s-red-200': getSectionForBook(bookId) === Section.OT,
            'tw-border-s-purple-200': getSectionForBook(bookId) === Section.NT,
            'tw-border-s-indigo-200': getSectionForBook(bookId) === Section.DC,
            'tw-border-s-yellow-200': getSectionForBook(bookId) === Section.Extra,
          },
        )}
      >
        {Canon.bookIdToEnglishName(bookId)}
      </span>

      <span className="tw-ml-2 tw-text-xs tw-text-muted-foreground">
        {bookId.toLocaleUpperCase()}
      </span>
    </CommandItem>
  );
}

export default BookItem;
