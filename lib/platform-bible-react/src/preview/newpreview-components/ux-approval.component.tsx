import { Button } from '@/components/shadcn-ui/button';
import Checkbox from '@/components/shadcn-ui/checkbox';
import { Label } from '@/components/shadcn-ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { cn } from '@/utils/shadcn-ui.util';
import { cva } from 'class-variance-authority';
import { BadgeCheck, ChevronDown, CircleDashed } from 'lucide-react';
import { useState } from 'react';

export type UxState = 'needed' | 'done' | 'rework' | 'not_applicable';
export type UxApprovals = {
  rtl_ready: UxState;
  themeable: UxState;
  font: UxState;
  spacing: UxState;
  wording: UxState;
};
export type UxApprovalProps = { approvalList: UxApprovals };

function approved(approval: UxState) {
  return approval === 'done' || approval === 'not_applicable';
}

function countUxApprovals(approvalList: UxApprovals): number {
  let approvalCount = 0;
  Object.values(approvalList).forEach((value: UxState) => {
    if (approved(value)) approvalCount += 1;
  });
  return approvalCount;
}

export default function UxApproval({ approvalList }: UxApprovalProps) {
  const [open, setOpen] = useState(false);

  const maxApprovals = Object.keys(approvalList).length;
  const approvalCount = countUxApprovals(approvalList);
  const allApproved = approvalCount === maxApprovals;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('pr-h-8', allApproved ? 'pr-text-green-600' : '')}>
          {allApproved ? <BadgeCheck className="pr-h-5" /> : <CircleDashed className="pr-h-5" />}{' '}
          <span className="pr-ps-2">
            UX approvals {approvalCount} / {maxApprovals}
          </span>
          <ChevronDown className="pr-ml-2 pr-h-4 pr-w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="pr-w-[200px] pr-p-0">
        {' '}
        <div className="pr-cursor-not-allowed pr-space-y-4 pr-p-4">
          {Object.entries(approvalList).map(([approvalType, approvalValue]) => (
            <div key={approvalType} className="pr-flex pr-items-center pr-space-x-2">
              <Checkbox id={approvalType} disabled checked={approved(approvalValue)} />
              <Label htmlFor={approvalType} className="pr-select-none pr-text-sm">
                {approvalType}: {approvalValue}
              </Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
