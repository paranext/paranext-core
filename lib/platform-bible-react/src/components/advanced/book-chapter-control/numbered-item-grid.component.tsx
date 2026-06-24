import { CommandGroup, CommandItem } from '@/components/shadcn-ui/command';
import { cn } from '@/utils/shadcn-ui/utils';

export interface NumberedItemGridProps {
  /** Number of items to render (1..count, inclusive). Returns null if count <= 0. */
  count: number;
  /**
   * Builds the cmdk `value` for item `n`. This string drives cmdk's filtering / matching behavior,
   * so callers must preserve the exact format used by the non-shared components (e.g. `${bookId}
   * ${name} ${chapter}` for chapters or `${bookId} ${name} ${chapterNum}:${verse}` for verses).
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
  /**
   * Whether to render the focus ring on the currently active (data-selected) item. Defaults to
   * true. Set to false when another element holds the visible focus indicator to avoid showing two
   * focus rings at once.
   */
  showActiveRing?: boolean;
  /** Optional additional class name applied to the grid wrapper. */
  className?: string;
}

/**
 * Internal helper that renders a 6-column grid of numbered cmdk `CommandItem`s for use by
 * `ChapterGrid` and `VerseGrid`. Encapsulates the shared layout, Tailwind classes, and disabled /
 * dimmed / selected state styling so the two public components only need to supply the per-item
 * differences.
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
  showActiveRing = true,
  className,
}: NumberedItemGridProps) {
  if (count <= 0) return undefined;

  return (
    <CommandGroup>
      <div className={cn('tw:grid tw:grid-cols-6 tw:gap-1', className)}>
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
                'tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm tw:[&>svg]:hidden',
                // Suppress shadcn CommandItem's default data-selected:bg-muted / text-foreground —
                // for grid cells keyboard focus is indicated by a ring only, with no background
                // or text-color change.
                'tw:data-selected:bg-transparent tw:data-selected:text-inherit',
                // Hover indication (pointer feedback) — kept distinct from the focus ring so it
                // doesn't imply that hovering changes the keyboard/submit target.
                'tw:hover:bg-muted',
                // cmdk sets data-selected only on keyboard-highlighted items (pointer selection is
                // disabled on the parent Command), so this ring is keyboard-focus only. Suppressed
                // when another element owns the focus indicator. Uses ring-ring/50 to match shadcn's
                // standard focus-ring "glow".
                showActiveRing &&
                  'tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset',
                {
                  'tw:bg-muted/50 tw:text-muted-foreground/50':
                    (isDimmed?.(n) ?? false) && !disabled && !(isSelected?.(n) ?? false),
                },
                {
                  // Re-assert primary highlight under data-selected so the currently-selected
                  // item keeps its primary background/text when keyboard focus also lands on it.
                  // Hover uses bg-primary to distinguish pointer feedback from the rest of the
                  // grid (which uses bg-muted on hover).
                  'tw:bg-primary/70 tw:text-primary-foreground tw:data-selected:bg-primary/70 tw:data-selected:text-primary-foreground tw:hover:bg-primary':
                    isSelected?.(n) ?? false,
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
