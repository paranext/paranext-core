import { AlertTriangle } from 'lucide-react';
import { Button, cn } from 'platform-bible-react';
import type { RibbonWarning } from '../types/parallel-passages';

export interface RibbonWarningDisplayProps {
  /** Warning to display; renders nothing when null */
  warning: RibbonWarning | null;
  /** Called when the user clicks an action link; receives the action string from the warning */
  onActionClick: (action: string) => void;
}

/**
 * Conditional warning banner for the Parallel Passages tool. Displays contextual warnings about
 * resource texts, missing books, scope issues, or missing projects. Admin users see clickable
 * action links; non-admin users see a "Contact your administrator" message instead.
 */
export default function RibbonWarningDisplay({
  warning,
  onActionClick,
}: RibbonWarningDisplayProps) {
  if (!warning) return null;

  return (
    <div
      role="alert"
      className={cn(
        'tw-flex tw-items-start tw-gap-2 tw-rounded-md tw-border tw-border-border',
        'tw-bg-muted tw-p-3 tw-text-sm tw-text-foreground',
      )}
    >
      <AlertTriangle
        className="tw-h-4 tw-w-4 tw-shrink-0 tw-mt-0.5 tw-text-muted-foreground"
        aria-hidden="true"
      />
      <div className="tw-flex tw-flex-col tw-gap-1">
        <span>{warning.message}</span>
        {warning.actionLink ? (
          <Button
            variant="link"
            className="tw-h-auto tw-p-0 tw-text-sm tw-justify-start"
            onClick={() => onActionClick(warning.actionLink!.action)}
          >
            {warning.actionLink.label}
          </Button>
        ) : (
          warning.type !== 'resource-text' && (
            <span className="tw-text-muted-foreground tw-text-xs">Contact your administrator.</span>
          )
        )}
      </div>
    </div>
  );
}
