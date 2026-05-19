import { CommandGroup, CommandItem } from '@/components/shadcn-ui/command';
import { cn } from '@/utils/shadcn-ui/utils';
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
  /**
   * Whether to render the focus ring on the currently active (data-selected) chapter. Defaults to
   * true. Set to false when another element (e.g. a back button) holds the visible focus indicator
   * to avoid showing two focus rings at once.
   */
  showActiveRing?: boolean;
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
  showActiveRing = true,
}: ChapterGridProps) {
  if (!bookId) return undefined;

  return (
    <CommandGroup>
      <div className={cn('tw:grid tw:grid-cols-6 tw:gap-1', className)}>
        {Array.from({ length: fetchEndChapter(bookId) }, (_, i) => i + 1).map((chapter) => (
          <CommandItem
            key={chapter}
            value={`${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId] || ''} ${chapter}`}
            onSelect={() => onChapterSelect(chapter)}
            ref={setChapterRef(chapter)}
            className={cn(
              'tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:gap-0 tw:rounded-md tw:p-0 tw:text-center tw:text-sm tw:[&>svg]:hidden',
              // Suppress shadcn CommandItem's default data-selected:bg-muted / text-foreground —
              // for chapter cells keyboard focus is indicated by a ring only, with no background
              // or text-color change.
              'tw:data-selected:bg-transparent tw:data-selected:text-inherit',
              // Hover indication (pointer feedback) — kept distinct from the focus ring so it
              // doesn't imply that hovering changes the keyboard/submit target.
              'tw:hover:bg-muted',
              // cmdk sets data-selected only on keyboard-highlighted items (pointer selection is
              // disabled on the parent Command), so this ring is keyboard-focus only. Suppressed
              // when another element owns the focus indicator (e.g. the back button or input).
              // Uses ring-ring/50 to match shadcn's standard focus-ring "glow" (Button uses the
              // same semi-transparent ring color).
              showActiveRing &&
                'tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset',
              {
                'tw:bg-muted/50 tw:text-muted-foreground/50':
                  (isChapterDimmed?.(chapter) ?? false) &&
                  !(bookId === scrRef.book && chapter === scrRef.chapterNum),
              },
              {
                // Re-assert primary highlight under data-selected so the currently-selected
                // chapter keeps its primary background/text when keyboard focus also lands on it.
                // Hover uses bg-primary/70 to distinguish pointer feedback from the rest of the
                // grid (which uses bg-muted on hover).
                'tw:bg-primary/70 tw:text-primary-foreground tw:data-selected:bg-primary/70 tw:data-selected:text-primary-foreground tw:hover:bg-primary':
                  bookId === scrRef.book && chapter === scrRef.chapterNum,
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
