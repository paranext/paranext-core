import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/utils/shadcn-ui/utils';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { cva, VariantProps } from 'class-variance-authority';

/**
 * Props for Select component
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/select}
 */
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  asChild?: boolean;
}

/**
 * Select components display a list of options for the user to pick from—triggered by a button.
 * These components are built on Radix UI primitives and styled with Shadcn UI.
 *
 * See Shadcn UI Documentation: https://ui.shadcn.com/docs/components/select See Radix UI
 * Documentation: https://www.radix-ui.com/primitives/docs/components/select
 */
const Select = SelectPrimitive.Root;

/** @inheritdoc Select */
const SelectGroup = SelectPrimitive.Group;

/** @inheritdoc Select */
const SelectValue = SelectPrimitive.Value;

/**
 * Style variants for the Select Trigger component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/button}
 */
export const selectTriggerVariants = cva(
  // CUSTOM: Removed tw:justify-between. Added tw:gap-2, tw:[&>span]:flex-1, tw:[&>span]:text-start
  // to keep the chevron tight against the text instead of drifting to the far edge on resize.
  'tw:flex tw:h-10 tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:border tw:border-input tw:bg-background tw:px-3 tw:py-2 tw:text-sm tw:ring-offset-background tw:placeholder:text-muted-foreground tw:focus:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:[&>span]:flex-1 tw:[&>span]:line-clamp-1 tw:[&>span]:text-start',
  {
    variants: {
      size: {
        default: 'tw:h-10 tw:px-4 tw:py-2',
        sm: 'tw:h-8 tw:rounded-md tw:px-3',
        lg: 'tw:h-11 tw:rounded-md tw:px-8',
        icon: 'tw:h-10 tw:w-10',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

/** @inheritdoc Select */
function SelectTrigger({
  className,
  children,
  size,
  ref,
  ...props
}: SelectTriggerProps & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Trigger>>;
}) {
  const dir: Direction = readDirection();
  return (
    <SelectPrimitive.Trigger
      className={cn(selectTriggerVariants({ size, className }))}
      ref={ref}
      {...props}
      dir={dir}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="tw:h-4 tw:w-4 tw:opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/** @inheritdoc Select */
function SelectScrollUpButton({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>>;
}) {
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        'tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1',
        className,
      )}
      {...props}
    >
      <ChevronUp className="tw:h-4 tw:w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

/** @inheritdoc Select */
function SelectScrollDownButton({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>>;
}) {
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        'tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1',
        className,
      )}
      {...props}
    >
      <ChevronDown className="tw:h-4 tw:w-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

/** @inheritdoc Select */
function SelectContent({
  className,
  children,
  position = 'popper',
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Content>>;
}) {
  const dir: Direction = readDirection();
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'pr-twp tw:relative tw:z-50 tw:max-h-96 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:data-[side=right]:translate-x-1 tw:data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'tw:p-1',
            position === 'popper' &&
              'tw:h-[var(--radix-select-trigger-height)] tw:w-full tw:min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          <div dir={dir}>{children}</div>
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

/** @inheritdoc Select */
function SelectLabel({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Label>>;
}) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn('tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:font-semibold', className)}
      {...props}
    />
  );
}

/** @inheritdoc Select */
function SelectItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Item>>;
}) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'tw:relative tw:flex tw:w-full tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="tw:absolute tw:start-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="tw:h-4 tw:w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/** @inheritdoc Select */
function SelectSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Separator>>;
}) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn('tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted', className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
