import { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from '@/components/shadcn-ui/empty';
import { cn } from '@/utils/shadcn-ui/utils';

/** Props for {@link RetryableErrorView}. */
export type RetryableErrorViewProps = {
  /** Already-localized message saying what went wrong, or why the region has nothing to show. */
  message: ReactNode;
  /** Already-localized label for the retry button. Required alongside `onRetry`; ignored without it. */
  retryLabel?: ReactNode;
  /**
   * Re-attempts whatever failed. Omit when nothing the user does here could change the outcome —
   * the view then renders its message alone rather than an inert button.
   */
  onRetry?: () => void;
  /** Overrides the default warning glyph so distinct failures stay distinguishable. */
  icon?: ReactNode;
  /**
   * ARIA live-region role. Defaults to `alert` for a failure; pass `status` for a state that
   * reports a condition rather than an error, such as a capability this installation does not
   * have.
   */
  role?: 'alert' | 'status';
  /** Class name applied to the `Empty` container so the caller owns sizing within its surface. */
  className?: string;
};

/**
 * Icon + message zero state for a region that has nothing to show because something failed or is
 * unavailable, with an optional retry action.
 *
 * One implementation for every surface that reports the same condition. The resource panels, the
 * resource picker, Get Resources, and the Text Collection grid can all be looking at the very same
 * failed DBL catalog fetch, and a retry button that changes size or emphasis depending on which of
 * them the user happened to reach it from reads as a different control doing a different thing.
 *
 * Composes the shadcn `Empty` primitive per `adr-empty-is-zero-state-primitive` rather than
 * hand-rolling a container.
 *
 * The icon is the state's visual signature. Without one, a failure and a "nothing is configured"
 * prompt render as the same centred text plus a button — two identical screens whose buttons do
 * opposite things (retry vs. reconfigure).
 */
export function RetryableErrorView({
  message,
  retryLabel,
  onRetry,
  icon,
  role = 'alert',
  className,
}: RetryableErrorViewProps) {
  return (
    <Empty className={cn(className)} role={role}>
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon ?? <AlertTriangle />}</EmptyMedia>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
      {onRetry && (
        <EmptyContent>
          <Button onClick={() => onRetry()}>{retryLabel}</Button>
        </EmptyContent>
      )}
    </Empty>
  );
}

export default RetryableErrorView;
