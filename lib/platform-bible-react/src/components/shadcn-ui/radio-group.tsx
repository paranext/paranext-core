import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '@/utils/shadcn-ui.util';
import { Direction, readDirection } from '@/utils/dir-helper.util';

/**
 * Radio Group components providing a set of checkable buttons—known as radio buttons—where no more
 * than one of the buttons can be checked at a time. These components are built on Radix UI
 * primitives and styled with Shadcn UI.
 *
 * See Shadcn UI Documentation: https://ui.shadcn.com/docs/components/radio-group See Radix UI
 * Documentation: https://www.radix-ui.com/primitives/docs/components/radio-group
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  const dir: Direction = readDirection();
  return (
    <RadioGroupPrimitive.Root
      className={cn('pr-twp tw-grid tw-gap-2', className)}
      {...props}
      ref={ref}
      dir={dir}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/** @inheritdoc RadioGroup */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="tw-flex tw-items-center tw-justify-center">
        <Circle className="tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
