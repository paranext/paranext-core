'use client';

import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';
import { toggleVariants } from '@/components/shadcn-ui/toggle';
// CUSTOM: Import readDirection for RTL support in ToggleGroup
import { Direction, readDirection } from '@/utils/dir-helper.util';

// CUSTOM: Added @inheritdoc TSDoc pointing to ToggleGroup for documentation inheritance
/** @inheritdoc ToggleGroup */
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: 'horizontal' | 'vertical';
  }
>({
  size: 'default',
  variant: 'default',
  spacing: 0,
  orientation: 'horizontal',
});

// CUSTOM: Added TSDoc with links to shadcn/ui and Radix UI documentation for this component
/**
 * ToggleGroup components provide a set of two-state buttons that can be toggled on or off. These
 * components are built on Radix UI primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/toggle-group}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/toggle-group}
 */
function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  orientation = 'horizontal',
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: 'horizontal' | 'vertical';
  }) {
  // CUSTOM: Read text direction so ToggleGroup passes dir to Radix, enabling RTL support
  const dir: Direction = readDirection();
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      // CUSTOM: CSS custom properties (--*) are not in React.CSSProperties; 'as React.CSSProperties'
      // is the standard React pattern for passing CSS variables via style prop. No cleaner alternative.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      style={{ '--gap': spacing } as React.CSSProperties}
      // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
      className={cn(
        'pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch',
        className,
      )}
      // CUSTOM: Pass dir to Radix UI so it uses correct RTL keyboard navigation direction
      dir={dir}
      {...props}
    >
      {/* CUSTOM: Memoize context value to avoid creating a new object reference on every render,
          which would cause all consumers to re-render unnecessarily (react/jsx-no-constructed-context-values) */}
      <ToggleGroupContext.Provider
        value={React.useMemo(
          () => ({ variant, size, spacing, orientation }),
          [variant, size, spacing, orientation],
        )}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

// CUSTOM: Added @inheritdoc TSDoc pointing to ToggleGroup for documentation inheritance
/** @inheritdoc ToggleGroup */
function ToggleGroupItem({
  className,
  children,
  variant = 'default',
  size = 'default',
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        'tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
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
