import { Button } from '@/components/shadcn-ui/button';
import Checkbox from '@/components/shadcn-ui/checkbox';
import { Label } from '@/components/shadcn-ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { cn } from '@/utils/shadcn-ui.util';
import { BadgeCheck, ChevronDown, CircleDashed } from 'lucide-react';
import { useState } from 'react';
import UxButtons from './ux-buttons';
import Link from './link.component';

export type UxState = 'needed' | 'done' | 'needs rework' | 'not applicable';
export type UsabilityChecks = {
  accessible: UxState;
  font: UxState;
  rtl_ready: UxState;
  spacing: UxState;
  themeable: UxState;
  wording: UxState;
};
function usabilityCheckLabel(usabilityCheck: string): string {
  switch (usabilityCheck) {
    case 'accessible':
      return 'Accessible';
    case 'font':
      return 'Correct font';
    case 'rtl_ready':
      return 'RTL ready';
    case 'spacing':
      return 'Spacing aligned';
    case 'themeable':
      return 'Themeable';
    case 'wording':
      return 'Wording';
    default:
      return usabilityCheck;
  }
}

export type UxApprovalProps = { usabilityChecks: UsabilityChecks; componentName: string };

function approved(approval: UxState) {
  return approval === 'done' || approval === 'not applicable';
}

function countUxApprovals(usabilityChecks: UsabilityChecks): number {
  let approvalCount = 0;
  Object.values(usabilityChecks).forEach((value: UxState) => {
    if (approved(value)) approvalCount += 1;
  });
  return approvalCount;
}

export default function UxApproval({ usabilityChecks, componentName }: UxApprovalProps) {
  const [open, setOpen] = useState(false);

  const maxApprovals = Object.keys(usabilityChecks).length;
  const approvalCount = countUxApprovals(usabilityChecks);
  const allApproved = approvalCount === maxApprovals;
  const issuesUrl = `https://github.com/paranext/paranext-core/issues?q=is%3Aissue+is%3Aopen+${encodeURIComponent(componentName)}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="tw-h-8">
          {allApproved ? (
            <BadgeCheck className="tw-h-5 tw-text-green-500" />
          ) : (
            <CircleDashed
              className={cn(
                'tw-h-5',
                approvalCount >= maxApprovals / 2 ? 'tw-text-yellow-500' : 'tw-text-red-500',
              )}
            />
          )}{' '}
          <span className="tw-ps-2">
            UX approvals {approvalCount} / {maxApprovals}
          </span>
          <ChevronDown className="tw-ml-2 tw-h-4 tw-w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="tw-w-[290px] tw-p-0">
        {' '}
        <div className="tw-p-4 tw-ps-5">
          <div className="tw-grid tw-cursor-not-allowed tw-grid-cols-[auto,1fr,1fr] tw-gap-x-4 tw-gap-y-2">
            {Object.entries(usabilityChecks)
              .sort(([a, aState], [b, bState]) => {
                const sortByStage =
                  (aState.startsWith('need') ? -1 : 0) + (bState.startsWith('need') ? 1 : 0);
                return sortByStage * 10 + a.localeCompare(b);
              })
              .map(([usabilityCheck, uxState]) => {
                const strikethrough = uxState === 'not applicable' ? 'tw-line-through' : '';
                return (
                  <>
                    <Checkbox
                      key={`checkbox-${usabilityCheck}`}
                      id={usabilityCheck}
                      disabled
                      checked={approved(uxState)}
                      className="tw-mt-1"
                    />
                    <Label
                      key={`label-${usabilityCheck}`}
                      htmlFor={usabilityCheck}
                      className={cn('tw-text-sm tw-font-medium', strikethrough)}
                    >
                      {usabilityCheckLabel(usabilityCheck)}
                    </Label>
                    <span
                      key={`value-${usabilityCheck}`}
                      className={cn('tw-text-sm tw-text-muted-foreground', strikethrough)}
                    >
                      {uxState}
                    </span>
                  </>
                );
              })}
          </div>
          <div className="tw-pt-4">
            <Link href={issuesUrl} newTab text={`Open issues for ${componentName}`} />
          </div>
          <div className="tw-flex tw-items-center tw-gap-1 tw-pt-2">
            <span className="tw-pe-2">Contact the UX team</span>
            <UxButtons />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
