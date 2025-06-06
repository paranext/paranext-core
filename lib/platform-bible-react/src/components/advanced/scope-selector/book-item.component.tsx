import { CommandItem } from '@/components/shadcn-ui/command';
import { cn } from '@/utils/shadcn-ui.util';
import { Canon } from '@sillsdev/scripture';
import { Check } from 'lucide-react';
import { MutableRefObject, useRef } from 'react';
import { getSectionForBook, Section } from './scope-selector-utils';

type BookItemProps = {
  /** The book ID (e.g., 'GEN', 'EXO') */
  bookId: string;
  /** Array of currently selected book IDs */
  selectedBookIds: string[];
  /** Callback function to handle book selection/deselection with optional shift-key support */
  toggleBook: (bookId: string, shiftKey: boolean) => void;
  /** Reference to track if the last key event included the shift key */
  lastKeyEventShiftKey: MutableRefObject<boolean>;
};

/**
 * A component that represents a single book item in the book selector. Handles both keyboard and
 * mouse interactions for book selection, including shift-click for range selection. The component
 * shows the book's English name, its ID, and visually indicates its testament (OT/NT/DC/Extra)
 * through color coding.
 */
function BookItem({ bookId, selectedBookIds, toggleBook, lastKeyEventShiftKey }: BookItemProps) {
  const isMouseClick = useRef(false);
  const mouseClickTimer = useRef<ReturnType<typeof setTimeout>>();
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
          'tw-me-2 tw-h-4 tw-w-4',
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
