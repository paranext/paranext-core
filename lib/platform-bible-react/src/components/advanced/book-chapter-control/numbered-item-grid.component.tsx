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
  className,
}: NumberedItemGridProps) {
  if (count <= 0) return undefined;

  return (
    <CommandGroup>
      <div className={cn('tw-grid tw-grid-cols-6 tw-gap-1', className)}>
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
                // No fixed width (previously `tw-w-8`) so cells fill their grid
                // column (1fr) and adapt when the popover is narrower than the
                // default 280px. `tw-min-w-0` lets cells shrink below their
                // intrinsic content width; `tw-px-0` overrides CommandItem's
                // default horizontal padding so multi-digit numbers still fit
                // in tight cells. Keep `tw-h-8` for a consistent row height.
                'tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm',
                {
                  'tw-bg-primary tw-text-primary-foreground': isSelected?.(n) ?? false,
                },
                {
                  'tw-bg-muted/50 tw-text-muted-foreground/50':
                    (isDimmed?.(n) ?? false) && !disabled,
                },
                disabled && 'tw-cursor-not-allowed tw-opacity-40',
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
