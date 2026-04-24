import { CommandGroup, CommandItem } from '@/components/shadcn-ui/command';
import { cn } from '@/utils/shadcn-ui.util';
import { ALL_ENGLISH_BOOK_NAMES } from '@/components/shared/book.utils';
import { fetchEndChapter } from './book-chapter-control.utils';

export interface ChapterGridProps {
  /** The book ID to render chapters for */
  bookId: string;
  /** Current scripture reference for highlighting */
  scrRef: { book: string; chapterNum: number };
  /** Callback when a chapter is selected */
  onChapterSelect: (chapter: number) => void;
  /** Function to set chapter refs for keyboard navigation */
  setChapterRef: (chapter: number) => (element: HTMLDivElement | null) => void;
  /** Optional function to determine if a chapter should be dimmed */
  isChapterDimmed?: (chapter: number) => boolean;
  /** Optional function to determine if a chapter should be disabled (not selectable). */
  isChapterDisabled?: (chapter: number) => boolean;
  /** Optional additional class name for styling */
  className?: string;
}

/**
 * Renders a grid of chapter numbers for a given book, with highlighting for the current chapter and
 * optional dimmed chapters based on state logic.
 */
export function ChapterGrid({
  bookId,
  scrRef,
  onChapterSelect,
  setChapterRef,
  isChapterDimmed,
  isChapterDisabled,
  className,
}: ChapterGridProps) {
  if (!bookId) return undefined;

  return (
    <CommandGroup>
      <div className={cn('tw-grid tw-grid-cols-6 tw-gap-1', className)}>
        {Array.from({ length: fetchEndChapter(bookId) }, (_, i) => i + 1).map((chapter) => {
          const disabled = isChapterDisabled?.(chapter) ?? false;
          return (
            <CommandItem
              key={chapter}
              value={`${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId] || ''} ${chapter}`}
              onSelect={() => {
                if (disabled) return;
                onChapterSelect(chapter);
              }}
              ref={setChapterRef(chapter)}
              disabled={disabled}
              aria-disabled={disabled || undefined}
              className={cn(
                // No fixed width (previously `tw-w-8`) so cells fill their grid
                // column (1fr) and adapt when the popover is narrower than the
                // default 280px. `tw-min-w-0` lets cells shrink below their
                // intrinsic content width; `tw-px-0` overrides CommandItem's
                // default horizontal padding so multi-digit chapter numbers still
                // fit in tight cells. Keep `tw-h-8` for a consistent row height.
                'tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm',
                {
                  'tw-bg-primary tw-text-primary-foreground':
                    bookId === scrRef.book && chapter === scrRef.chapterNum,
                },
                {
                  'tw-bg-muted/50 tw-text-muted-foreground/50':
                    (isChapterDimmed?.(chapter) ?? false) && !disabled,
                },
                disabled && 'tw-cursor-not-allowed tw-opacity-40',
              )}
            >
              {chapter}
            </CommandItem>
          );
        })}
      </div>
    </CommandGroup>
  );
}
