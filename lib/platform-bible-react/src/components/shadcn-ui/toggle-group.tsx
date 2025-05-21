import React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui.util';
import { toggleVariants } from '@/components/shadcn-ui/toggle';
import { Direction, readDirection } from '@/utils/dir-helper.util';

/** @inheritdoc ToggleGroup */
const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default',
});

/**
 * ToggleGroup components provide a set of two-state buttons that can be toggled on or off. These
 * components are built on Radix UI primitives and styled with Shadcn UI. See Shadcn UI
 * Documentation: https://ui.shadcn.com/docs/components/toggle-group See Radix UI Documentation:
 * https://www.radix-ui.com/primitives/docs/components/toggle-group
 */
const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => {
  const dir: Direction = readDirection();
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn('pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1', className)}
      {...props}
      dir={dir}
    >
      <ToggleGroupContext.Provider
        // Suppress warning produced by imported shadcn code
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ variant, size }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
});

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

/** @inheritdoc ToggleGroup */
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
