import React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shadcn-ui/utils';
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
function ToggleGroup({
  className,
  variant,
  size,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    ref?: React.Ref<React.ComponentRef<typeof ToggleGroupPrimitive.Root>>;
  }) {
  const dir: Direction = readDirection();
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn('pr-twp tw:flex tw:items-center tw:justify-center tw:gap-1', className)}
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
}

/** @inheritdoc ToggleGroup */
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants> & {
    ref?: React.Ref<React.ComponentRef<typeof ToggleGroupPrimitive.Item>>;
  }) {
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
}

export { ToggleGroup, ToggleGroupItem };
