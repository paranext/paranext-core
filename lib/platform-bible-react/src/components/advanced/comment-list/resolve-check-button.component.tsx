import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui/utils';
import { Check } from 'lucide-react';

/** Props for {@link ResolveCheckButton}. */
export interface ResolveCheckButtonProps {
  /** Whether to render the button at all. */
  show: boolean;
  /** Disables the button (e.g. while a resolve is in flight) to guard against a double-click. */
  disabled?: boolean;
  /** Invoked when clicked. Click propagation to the enclosing thread is already stopped. */
  onClick: () => void;
  /** Accessible label. */
  ariaLabel: string;
}

/**
 * The header hover check that resolves a thread. Shared by CommentThread's generic status-resolve
 * default and by ConflictThread's conflict-gated resolve so the two stay visually identical.
 * Renders nothing when `show` is false.
 */
export function ResolveCheckButton({
  show,
  disabled = false,
  onClick,
  ariaLabel,
}: ResolveCheckButtonProps) {
  if (!show) return undefined;
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={disabled}
      className={cn(
        'tw:ms-auto',
        'tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10',
        'tw:opacity-0 tw:group-hover:opacity-100',
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={ariaLabel}
    >
      <Check className="tw:h-4 tw:w-4" />
    </Button>
  );
}
