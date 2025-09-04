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
  className,
}: ChapterGridProps) {
  if (!bookId) return undefined;

  return (
    <CommandGroup>
      <div className={cn('tw-grid tw-grid-cols-6 tw-gap-1', className)}>
        {Array.from({ length: fetchEndChapter(bookId) }, (_, i) => i + 1).map((chapter) => (
          <CommandItem
            key={chapter}
            value={`${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId] || ''} ${chapter}`}
            onSelect={() => onChapterSelect(chapter)}
            ref={setChapterRef(chapter)}
            className={cn(
              'tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm',
              {
                'tw-bg-primary tw-text-primary-foreground':
                  bookId === scrRef.book && chapter === scrRef.chapterNum,
              },
              {
                'tw-bg-muted/50 tw-text-muted-foreground/50': isChapterDimmed?.(chapter) ?? false,
              },
            )}
          >
            {chapter}
          </CommandItem>
        ))}
      </div>
    </CommandGroup>
  );
}
