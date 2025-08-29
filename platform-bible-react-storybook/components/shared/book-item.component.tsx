import { CommandItem } from '@/components/shadcn-ui/command';
import { getLocalizedBookId, getLocalizedBookName } from '@/components/shared/book.utils';
import { cn } from '@/utils/shadcn-ui.util';
import { Canon } from '@sillsdev/scripture';
import { Check } from 'lucide-react';
import { Section } from 'platform-bible-utils';
import { forwardRef, MouseEvent, useMemo, useRef } from 'react';

type BookItemProps = {
  /** The book ID (e.g., 'GEN', 'EXO') */
  bookId: string;
  /** Whether this book is currently selected */
  isSelected?: boolean;
  /** Callback function to handle book selection/deselection */
  onSelect?: (bookId: string) => void;
  /** Optional custom mouse down handler */
  onMouseDown?: (e: MouseEvent) => void;
  /** The section this book belongs to */
  section: Section;
  /** Additional CSS classes for the wrapper CommandItem */
  className?: string;
  /** Whether to show the check icon (for multiselect mode) */
  showCheck?: boolean;
  /**
   * Optional map of localized book IDs/short names and full names. Key is the (English) book ID,
   * value contains localized versions of the ID and full book name
   */
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>;
  /** Value to use for Command component matching */
  commandValue?: string;
};

/**
 * A reusable component that represents a single book item in book selectors. The component shows
 * the book's localized name, its ID, and visually indicates its testament (OT/NT/DC/Extra) through
 * color coding.
 *
 * For simple selection, use the `onSelect` prop. For complex interactions (like shift-click range
 * selection), implement custom `onSelect` and `onMouseDown` handlers that manage the logic
 * externally.
 */
export const BookItem = forwardRef<HTMLDivElement, BookItemProps>(
  (
    {
      bookId,
      isSelected,
      onSelect,
      onMouseDown,
      section,
      className,
      showCheck = false,
      localizedBookNames,
      commandValue,
    },
    ref,
  ) => {
    const isMouseClick = useRef(false);

    const handleSelect = () => {
      if (!isMouseClick.current) {
        onSelect?.(bookId);
      }
      // Reset the mouse flag after a short delay
      setTimeout(() => {
        isMouseClick.current = false;
      }, 100);
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseClick.current = true;

      if (onMouseDown) {
        onMouseDown(e);
      } else {
        // If no custom mouse handler, fall back to calling onSelect
        onSelect?.(bookId);
      }
    };

    const bookDisplayName = useMemo(
      () => getLocalizedBookName(bookId, localizedBookNames),
      [bookId, localizedBookNames],
    );

    const bookDisplayId = useMemo(
      () => getLocalizedBookId(bookId, localizedBookNames),
      [bookId, localizedBookNames],
    );

    return (
      <div
        className={cn(
          'tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid',
          {
            'tw-border-s-red-200': section === Section.OT,
            'tw-border-s-purple-200': section === Section.NT,
            'tw-border-s-indigo-200': section === Section.DC,
            'tw-border-s-amber-200': section === Section.Extra,
          },
        )}
      >
        <CommandItem
          ref={ref}
          value={commandValue || `${bookId} ${Canon.bookIdToEnglishName(bookId)}`}
          onSelect={handleSelect}
          onMouseDown={handleMouseDown}
          role="option"
          aria-selected={isSelected}
          aria-label={`${Canon.bookIdToEnglishName(bookId)} (${bookId.toLocaleUpperCase()})`}
          className={className}
        >
          {showCheck && (
            <Check
              className={cn(
                'tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0',
                isSelected ? 'tw-opacity-100' : 'tw-opacity-0',
              )}
            />
          )}
          <span className="tw-min-w-0 tw-flex-1">{bookDisplayName}</span>
          <span className="tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground">
            {bookDisplayId}
          </span>
        </CommandItem>
      </div>
    );
  },
);
