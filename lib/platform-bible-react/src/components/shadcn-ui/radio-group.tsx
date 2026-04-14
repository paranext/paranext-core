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
function RadioGroup({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
  ref?: React.Ref<React.ComponentRef<typeof RadioGroupPrimitive.Root>>;
}) {
  const dir: Direction = readDirection();
  return (
    <RadioGroupPrimitive.Root
      className={cn('pr-twp tw:grid tw:gap-2', className)}
      {...props}
      ref={ref}
      dir={dir}
    />
  );
}

/** @inheritdoc RadioGroup */
function RadioGroupItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  ref?: React.Ref<React.ComponentRef<typeof RadioGroupPrimitive.Item>>;
}) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'pr-twp tw:aspect-square tw:h-4 tw:w-4 tw:rounded-full tw:border tw:border-primary tw:text-primary tw:ring-offset-background tw:focus:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="tw:flex tw:items-center tw:justify-center">
        <Circle className="tw:h-2.5 tw:w-2.5 tw:fill-current tw:text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
