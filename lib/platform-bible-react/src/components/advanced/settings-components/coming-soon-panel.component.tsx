import { cn } from '@/utils/shadcn-ui/utils';

export type ComingSoonPanelProps = {
  /** Already-localized title. */
  title: string;
  /** Already-localized body text. */
  body: string;
  /** Optional className passed to the root container. */
  className?: string;
};

/**
 * Placeholder right-panel content shown when a settings entry has been laid out in the sidebar but
 * the actual settings UI for it has not been ported yet.
 */
export function ComingSoonPanel({ title, body, className }: ComingSoonPanelProps) {
  return (
    <div
      className={cn(
        'tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-2 tw:p-6 tw:text-center',
        className,
      )}
    >
      <span className="tw:text-lg tw:font-semibold">{title}</span>
      <span className="tw:text-sm tw:text-muted-foreground">{body}</span>
    </div>
  );
}

export default ComingSoonPanel;
