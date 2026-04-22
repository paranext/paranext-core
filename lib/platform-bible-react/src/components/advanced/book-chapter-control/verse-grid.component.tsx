import { CommandGroup, CommandItem } from '@/components/shadcn-ui/command';
import { cn } from '@/utils/shadcn-ui.util';
import { ALL_ENGLISH_BOOK_NAMES } from '@/components/shared/book.utils';

export interface VerseGridProps {
  /** The book ID the verses belong to */
  bookId: string;
  /** The chapter number the verses belong to */
  chapterNum: number;
  /** The number of verses to render (from 1 to endVerse, inclusive) */
  endVerse: number;
  /** Current scripture reference for highlighting */
  scrRef: { book: string; chapterNum: number; verseNum: number };
  /** Callback when a verse is selected */
  onVerseSelect: (verse: number) => void;
  /** Function to set verse refs for keyboard navigation */
  setVerseRef: (verse: number) => (element: HTMLDivElement | null) => void;
  /** Optional function to determine if a verse should be dimmed */
  isVerseDimmed?: (verse: number) => boolean;
  /** Optional function to determine if a verse should be disabled (not selectable). */
  isVerseDisabled?: (verse: number) => boolean;
  /** Optional additional class name for styling */
  className?: string;
}

/**
 * Renders a grid of verse numbers for a given book and chapter, with highlighting for the current
 * verse and optional dimmed verses based on state logic.
 */
export function VerseGrid({
  bookId,
  chapterNum,
  endVerse,
  scrRef,
  onVerseSelect,
  setVerseRef,
  isVerseDimmed,
  isVerseDisabled,
  className,
}: VerseGridProps) {
  if (!bookId || endVerse <= 0) return undefined;

  return (
    <CommandGroup>
      <div className={cn('tw-grid tw-grid-cols-6 tw-gap-1', className)}>
        {Array.from({ length: endVerse }, (_, i) => i + 1).map((verse) => {
          const disabled = isVerseDisabled?.(verse) ?? false;
          return (
            <CommandItem
              key={verse}
              value={`${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId] || ''} ${chapterNum}:${verse}`}
              onSelect={() => {
                if (disabled) return;
                onVerseSelect(verse);
              }}
              ref={setVerseRef(verse)}
              disabled={disabled}
              aria-disabled={disabled || undefined}
              className={cn(
                // See chapter-grid — no fixed width, min-w-0, and px-0 override
                // so multi-digit verse numbers fit when the popover is narrow.
                'tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm',
                {
                  'tw-bg-primary tw-text-primary-foreground':
                    bookId === scrRef.book &&
                    chapterNum === scrRef.chapterNum &&
                    verse === scrRef.verseNum,
                },
                {
                  'tw-bg-muted/50 tw-text-muted-foreground/50':
                    (isVerseDimmed?.(verse) ?? false) && !disabled,
                },
                disabled && 'tw-cursor-not-allowed tw-opacity-40',
              )}
            >
              {verse}
            </CommandItem>
          );
        })}
      </div>
    </CommandGroup>
  );
}

export default VerseGrid;
