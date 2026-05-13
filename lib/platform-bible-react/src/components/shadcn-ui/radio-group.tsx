'use client';

import React from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';
// CUSTOM: Import direction helper for RTL support
import { Direction, readDirection } from '@/utils/dir-helper.util';

/**
 * Radio Group components providing a set of checkable buttons—known as radio buttons—where no more
 * than one of the buttons can be checked at a time. These components are built on Radix UI
 * primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radio-group}
 * @see Radix UI Documentation:
 *   {@link https://www.radix-ui.com/primitives/docs/components/radio-group}
 */
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  // CUSTOM: Read document direction to support RTL layouts
  const dir: Direction = readDirection();
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:grid tw:w-full tw:gap-2',
        className,
      )}
      // CUSTOM: Pass document direction to the root element for RTL keyboard navigation support
      dir={dir}
      {...props}
    />
  );
}

/** @inheritdoc RadioGroup */
function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        'pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="tw:flex tw:size-4 tw:items-center tw:justify-center"
      >
        <span className="tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
