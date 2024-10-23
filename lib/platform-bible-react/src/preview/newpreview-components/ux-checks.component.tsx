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

export type UxChecksProps = { usabilityChecks: UsabilityChecks; componentName: string };

function passing(checkState: UxState) {
  return checkState === 'done' || checkState === 'not applicable';
}

function countUsabilityChecks(usabilityChecks: UsabilityChecks): number {
  let checkCount = 0;
  Object.values(usabilityChecks).forEach((value: UxState) => {
    if (passing(value)) checkCount += 1;
  });
  return checkCount;
}

export default function UxChecks({ usabilityChecks, componentName }: UxChecksProps) {
  const [open, setOpen] = useState(false);

  const maxChecks = Object.keys(usabilityChecks).length;
  const usabilityCheckCount = countUsabilityChecks(usabilityChecks);
  const allPassing = usabilityCheckCount === maxChecks;
  const issuesUrl = `https://github.com/paranext/paranext-core/issues?q=is%3Aissue+is%3Aopen+${encodeURIComponent(componentName)}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="tw-h-8">
          {allPassing ? (
            <BadgeCheck className="tw-h-5 tw-text-green-500" />
          ) : (
            <CircleDashed
              className={cn(
                'tw-h-5',
                usabilityCheckCount >= maxChecks / 2 ? 'tw-text-yellow-500' : 'tw-text-red-500',
              )}
            />
          )}{' '}
          <span className="tw-ps-2">
            Usability checks {usabilityCheckCount} / {maxChecks}
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
                      checked={passing(uxState)}
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
