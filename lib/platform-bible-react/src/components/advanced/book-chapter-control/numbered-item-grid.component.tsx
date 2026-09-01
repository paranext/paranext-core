import { CommandGroup, CommandItem } from '@/components/shadcn-ui/command';
import { LIST_ITEM_KEYBOARD_FOCUS_RING } from '@/utils/focus.util';
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
}: NumberedItemGridProps) {
  if (count <= 0) return undefined;

  return (
    <CommandGroup>
      {/* Column count is read from the shared constant rather than taken as a prop: the arrow-key
          arithmetic in `computeTargetGridItem` reads the same constant, and a per-instance override
          here would let the rendered layout and the keyboard arithmetic disagree — arrows would
          land on the wrong cell with nothing to catch it. */}
      <div
        className={cn('tw:grid tw:gap-1', className)}
        style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))` }}
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
                  // The keyboard ring switches to `ring-primary-foreground` on this cell. The shared
                  // `ring-ring/50` composites to within ~0.04 lightness of `bg-primary`, which makes
                  // the ring all but invisible on exactly the cell the highlight is seeded onto when
                  // the popover opens. `primary-foreground` is the token already guaranteed to read
                  // against `primary`. `cn` merges away the earlier ring color, so this wins by
                  // argument order rather than by CSS output order.
                  'tw:bg-primary tw:text-primary-foreground tw:data-selected:bg-primary tw:data-selected:text-primary-foreground tw:data-selected:ring-primary-foreground/70':
                    isSelected?.(n) ?? false,
                },
                {
                  // Same tokens as BookItem, so book rows and chapter/verse cells grey identically
                  // inside one popover. Restated under data-selected so a dimmed cell keeps its
                  // dimming while the keyboard highlight is on it, rather than losing it to the
                  // suppression rule above.
                  'tw:bg-muted/50 tw:text-muted-foreground/50 tw:data-selected:bg-muted/50 tw:data-selected:text-muted-foreground/50':
                    (isDimmed?.(n) ?? false) && !disabled,
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
