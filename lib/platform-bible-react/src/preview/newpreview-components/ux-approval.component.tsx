import { Button } from '@/components/shadcn-ui/button';
import Checkbox from '@/components/shadcn-ui/checkbox';
import { Label } from '@/components/shadcn-ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { cn } from '@/utils/shadcn-ui.util';
import { BadgeCheck, ChevronDown, CircleDashed } from 'lucide-react';
import { useState } from 'react';
import UxButtons from './ux-buttons';
import Link from './link';

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
        <Button variant="outline" className="pr-h-8">
          {allApproved ? (
            <BadgeCheck className="pr-h-5 pr-text-green-500" />
          ) : (
            <CircleDashed
              className={cn(
                'pr-h-5',
                approvalCount >= maxApprovals / 2 ? 'pr-text-yellow-500' : 'pr-text-red-500',
              )}
            />
          )}{' '}
          <span className="pr-ps-2">
            UX approvals {approvalCount} / {maxApprovals}
          </span>
          <ChevronDown className="pr-ml-2 pr-h-4 pr-w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="pr-w-[290px] pr-p-0">
        {' '}
        <div className="pr-p-4 pr-ps-5">
          <div className="pr-grid pr-cursor-not-allowed pr-grid-cols-[auto,1fr,1fr] pr-gap-x-4 pr-gap-y-2">
            {Object.entries(usabilityChecks)
              .sort(([a, aState], [b, bState]) => {
                const sortByStage =
                  (aState.startsWith('need') ? -1 : 0) + (bState.startsWith('need') ? 1 : 0);
                return sortByStage * 10 + a.localeCompare(b);
              })
              .map(([usabilityCheck, uxState]) => {
                const strikethrough = uxState === 'not applicable' ? 'pr-line-through' : '';
                return (
                  <>
                    <Checkbox
                      key={`checkbox-${usabilityCheck}`}
                      id={usabilityCheck}
                      disabled
                      checked={approved(uxState)}
                      className="pr-mt-1"
                    />
                    <Label
                      key={`label-${usabilityCheck}`}
                      htmlFor={usabilityCheck}
                      className={cn('pr-text-sm pr-font-medium', strikethrough)}
                    >
                      {usabilityCheckLabel(usabilityCheck)}
                    </Label>
                    <span
                      key={`value-${usabilityCheck}`}
                      className={cn('pr-text-sm pr-text-muted-foreground', strikethrough)}
                    >
                      {uxState}
                    </span>
                  </>
                );
              })}
          </div>
          <div className="pr-pt-4">
            <Link href={issuesUrl} newTab text={`Open issues for ${componentName}`} />
          </div>
          <div className="pr-flex pr-items-center pr-gap-1 pr-pt-2">
            <span className="pr-pe-2">Contact the UX team</span>
            <UxButtons />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
