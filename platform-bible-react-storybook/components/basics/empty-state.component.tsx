import { cn } from '@/utils/shadcn-ui/utils';

/** Props for {@link EmptyState}. */
export type EmptyStateProps = {
  /** Localized message explaining why the region is empty and, ideally, what the user can do next. */
  message: string;
  /** Optional `data-testid` for locating the empty state (e.g. from an e2e test). */
  id?: string;
  /**
   * Optional class name appended to the message element so the caller controls layout (centering,
   * spacing, emphasis).
   */
  className?: string;
};

/**
 * A presentational empty-state message for a list, grid, or panel that currently has nothing to
 * show. Renders the localized `message` in a `role="status"` region so screen readers announce it
 * when the surrounding content becomes empty. Layout is left to the caller via `className`.
 */
export function EmptyState({ message, id, className }: EmptyStateProps) {
  return (
    <p
      role="status"
      data-testid={id}
      className={cn('tw:text-sm tw:text-muted-foreground', className)}
    >
      {message}
    </p>
  );
}

export default EmptyState;
