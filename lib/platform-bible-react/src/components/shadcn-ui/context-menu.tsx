import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * Context Menu component displays a menu to the user — such as a set of actions or functions,
 * triggered by a button.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/context-menu}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/context-menu}
 */
const ContextMenu = ContextMenuPrimitive.Root;

/** @inheritdoc ContextMenu */
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

/** @inheritdoc ContextMenu */
const ContextMenuGroup = ContextMenuPrimitive.Group;

/** @inheritdoc ContextMenu */
const ContextMenuPortal = ContextMenuPrimitive.Portal;

/** @inheritdoc ContextMenu */
const ContextMenuSub = ContextMenuPrimitive.Sub;

/** @inheritdoc ContextMenu */
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

/** @inheritdoc ContextMenu */
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.SubTrigger>>;
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        'pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground',
        inset && 'tw-pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="tw-ml-auto tw-h-4 tw-w-4" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

/** @inheritdoc ContextMenu */
function ContextMenuSubContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> & {
  ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.SubContent>>;
}) {
  return (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        'pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc ContextMenu */
function ContextMenuContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> & {
  ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.Content>>;
}) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(
          'pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2',
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

/** @inheritdoc ContextMenu */
function ContextMenuItem({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.Item>>;
}) {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        'pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50',
        inset && 'tw-pl-8',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc ContextMenu */
function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> & {
  ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.CheckboxItem>>;
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50',
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="tw-h-4 tw-w-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

/** @inheritdoc ContextMenu */
function ContextMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> & {
  ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.RadioItem>>;
}) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50',
        className,
      )}
      {...props}
    >
      <span className="tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="tw-h-2 tw-w-2 tw-fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

/** @inheritdoc ContextMenu */
function ContextMenuLabel({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.Label>>;
}) {
  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn(
        'tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground',
        inset && 'tw-pl-8',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc ContextMenu */
function ContextMenuSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> & {
  ref?: React.Ref<React.ComponentRef<typeof ContextMenuPrimitive.Separator>>;
}) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn('tw--mx-1 tw-my-1 tw-h-px tw-bg-border', className)}
      {...props}
    />
  );
}

/** @inheritdoc ContextMenu */
function ContextMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
