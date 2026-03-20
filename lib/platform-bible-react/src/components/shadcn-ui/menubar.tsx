import {
  MenuContext,
  MenuContextProps,
  menuVariants,
  useMenuContext,
} from '@/context/menu.context';
import { cn } from '@/utils/shadcn-ui.util';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { Check, ChevronRight, Circle } from 'lucide-react';
import React from 'react';

function MenubarMenu({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />;
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />;
}

function MenubarPortal({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />;
}

function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}

function MenubarSub({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function Menubar({
  className,
  variant = 'default',
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> & {
  variant?: MenuContextProps['variant'];
  ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Root>>;
}) {
  /* #region CUSTOM provide context to add variants */
  const contextValue = React.useMemo<MenuContextProps>(
    () => ({
      variant,
    }),
    [variant],
  );
  return (
    <MenuContext.Provider value={contextValue}>
      {/* #endregion CUSTOM */}
      <MenubarPrimitive.Root
        ref={ref}
        className={cn(
          'tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1',
          className,
        )}
        {...props}
      />
    </MenuContext.Provider>
  );
}

function MenubarTrigger({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> & {
  ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Trigger>>;
}) {
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        'tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground',
        // CUSTOM
        'pr-twp',
        menuVariants({ variant: context.variant, className }), // CUSTOM use context to add variants
      )}
      {...props}
    />
  );
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.SubTrigger>>;
}) {
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn(
        'tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground',
        inset && 'tw-pl-8',
        menuVariants({ variant: context.variant, className }), // CUSTOM use context to add variants
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="tw-ml-auto tw-h-4 tw-w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}

function MenubarSubContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent> & {
  ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.SubContent>>;
}) {
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={cn(
        'tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2',
        // CUSTOM use context to add variants
        {
          'tw-bg-popover': context.variant === 'muted',
        },
        className,
      )}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> & {
  ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Content>>;
}) {
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2',
          // CUSTOM reset styles so that only shadcn styles are applied
          'pr-twp',
          // CUSTOM use context to add variants
          {
            'tw-bg-popover': context.variant === 'muted',
          },
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
}

function MenubarItem({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
  inset?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Item>>;
}) {
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        'tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50',
        inset && 'tw-pl-8',
        menuVariants({ variant: context.variant, className }), // CUSTOM use context to add variants
        className,
      )}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem> & {
  ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>>;
}) {
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50',
        menuVariants({ variant: context.variant, className }), // CUSTOM use context to add variants
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check className="tw-h-4 tw-w-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem> & {
  ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.RadioItem>>;
}) {
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn(
        'tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50',
        menuVariants({ variant: context.variant, className }), // CUSTOM use context to add variants
        className,
      )}
      {...props}
    >
      <span className="tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Circle className="tw-h-2 tw-w-2 tw-fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
  inset?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Label>>;
}) {
  return (
    <MenubarPrimitive.Label
      ref={ref}
      className={cn('tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold', inset && 'tw-pl-8', className)}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator> & {
  ref?: React.Ref<React.ComponentRef<typeof MenubarPrimitive.Separator>>;
}) {
  return (
    <MenubarPrimitive.Separator
      ref={ref}
      className={cn('tw--mx-1 tw-my-1 tw-h-px tw-bg-muted', className)}
      {...props}
    />
  );
}

function MenubarShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground', className)}
      {...props}
    />
  );
}
MenubarShortcut.displayname = 'MenubarShortcut';

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
