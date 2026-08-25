import { CommandGroup, CommandItem } from '@/components/shadcn-ui/command';
import { LIST_ITEM_KEYBOARD_FOCUS_RING } from '@/components/shared/book.utils';
import { cn } from '@/utils/shadcn-ui/utils';
import { GRID_COLUMNS } from './book-chapter-control.utils';

export interface NumberedItemGridProps {
  /** Number of items to render (1..count, inclusive). Returns null if count <= 0. */
  count: number;
  /**
   * Builds the cmdk `value` for item `n`. Whatever steers the highlight must produce a
   * byte-identical string, so build it with the shared helpers in `book-item.utils` —
   * `chapterItemValue` / `verseItemValue` — rather than composing the format here.
   */
  valueBuilder: (n: number) => string;
  /** Callback when item `n` is selected (only fires when not disabled). */
  onSelect: (n: number) => void;
  /** Returns the `ref` callback for item `n` (used for keyboard navigation). */
  itemRef: (n: number) => (element: HTMLDivElement | null) => void;
  /** Whether item `n` is disabled (not selectable). Defaults to false. */
  isDisabled?: (n: number) => boolean;
  /** Whether item `n` should be visually dimmed. Defaults to false. */
  isDimmed?: (n: number) => boolean;
  /** Whether item `n` is the currently-selected item (highlighted). Defaults to false. */
  isSelected?: (n: number) => boolean;
  /** Optional additional class name applied to the grid wrapper. */
  className?: string;
  /** Number of columns in the grid. Defaults to {@link GRID_COLUMNS}. */
  columns?: number;
}

/**
 * Internal helper that renders a grid of numbered cmdk `CommandItem`s for use by `ChapterGrid` and
 * `VerseGrid`. Encapsulates the shared layout, Tailwind classes, and disabled / dimmed / selected
 * state styling so the two public components only need to supply the per-item differences.
 *
 * Not part of the public `platform-bible-react` API.
 */
export function NumberedItemGrid({
  count,
  valueBuilder,
  onSelect,
  itemRef,
  isDisabled,
  isDimmed,
  isSelected,
  className,
  columns = GRID_COLUMNS,
}: NumberedItemGridProps) {
  if (count <= 0) return undefined;

  return (
    <CommandGroup>
      <div
        className={cn('tw:grid tw:gap-1', className)}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: count }, (_, i) => i + 1).map((n) => {
          const disabled = isDisabled?.(n) ?? false;
          return (
            <CommandItem
              key={n}
              value={valueBuilder(n)}
              onSelect={() => {
                if (disabled) return;
                onSelect(n);
              }}
              ref={itemRef(n)}
              disabled={disabled}
              aria-disabled={disabled || undefined}
              className={cn(
                'tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm',
                // Hide CommandItem's own trailing check icon (a multiselect affordance this grid
                // doesn't use) and give cells pointer feedback distinct from the keyboard focus ring.
                'tw:[&>svg]:hidden tw:hover:bg-muted',
                LIST_ITEM_KEYBOARD_FOCUS_RING,
                // cmdk highlights the focused cell with its own data-selected background/text; this
                // grid shows keyboard focus with the ring above instead, so neutralize that here.
                // The selected-cell rule below re-asserts its own colors under data-selected so the
                // current chapter/verse keeps its highlight even while the keyboard focus is on it.
                'tw:data-selected:bg-transparent tw:data-selected:text-inherit',
                {
                  'tw:bg-primary tw:text-primary-foreground tw:data-selected:bg-primary tw:data-selected:text-primary-foreground':
                    isSelected?.(n) ?? false,
                },
                {
                  // Dimmed styling only tints the text — it marks a cell as out-of-range/de-emphasized,
                  // not "selected" (the `bg-muted/50` convention used elsewhere in the design system).
                  'tw:text-muted-foreground/50': (isDimmed?.(n) ?? false) && !disabled,
                },
                disabled && 'tw:cursor-not-allowed tw:opacity-40',
              )}
            >
              {n}
            </CommandItem>
          );
        })}
      </div>
    </CommandGroup>
  );
}

export default NumberedItemGrid;
