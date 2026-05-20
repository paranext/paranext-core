import { Badge } from '@/components/shadcn-ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import type { TranslationStatus } from './types';

export interface TranslationStatusPillProps {
  status: TranslationStatus;
  /** Optional source-language preview shown in a tooltip on hover/focus. */
  sourcePreview?: string;
  /** Override the visible label (defaults to the status itself, title-cased). */
  label?: string;
  className?: string;
}

const STATUS_LABEL: Record<TranslationStatus, string> = {
  translated: 'Translated',
  missing: 'Missing',
  'needs-review': 'Needs review',
};

const STATUS_VARIANT = {
  translated: 'secondary',
  missing: 'outline',
  'needs-review': 'destructive',
} as const;

export function TranslationStatusPill({
  status,
  sourcePreview,
  label,
  className,
}: TranslationStatusPillProps) {
  const badge = (
    <Badge
      variant={STATUS_VARIANT[status]}
      data-status={status}
      className={className}
      tabIndex={sourcePreview ? 0 : undefined}
    >
      {label ?? STATUS_LABEL[status]}
    </Badge>
  );
  if (!sourcePreview) return badge;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent>
          <div className="tw:max-w-xs tw:text-xs">
            <div className="tw:mb-1 tw:font-medium">Source</div>
            <div className="tw:whitespace-pre-line">{sourcePreview}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
