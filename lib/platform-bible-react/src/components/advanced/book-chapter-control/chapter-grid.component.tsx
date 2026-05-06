import { ALL_ENGLISH_BOOK_NAMES } from '@/components/shared/book.utils';
import { fetchEndChapter } from './book-chapter-control.utils';
import { NumberedItemGrid } from './numbered-item-grid.component';

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
    <NumberedItemGrid
      count={fetchEndChapter(bookId)}
      valueBuilder={(chapter) => `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId] || ''} ${chapter}`}
      onSelect={onChapterSelect}
      itemRef={setChapterRef}
      isDisabled={isChapterDisabled}
      isDimmed={isChapterDimmed}
      isSelected={(chapter) => bookId === scrRef.book && chapter === scrRef.chapterNum}
      className={className}
    />
  );
}
