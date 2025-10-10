'use client';

import React from 'react';

import {
  MenuContext,
  MenuContextProps,
  menuVariants,
  useMenuContext,
} from '@/context/menu.context';
import { Direction, readDirection } from '@/utils/dir-helper.util';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';

import { cn } from '@/utils/shadcn-ui.util';

/**
 * Dropdown Menu components providing accessible dropdown menus and submenus. These components are
 * built on Radix UI primitives and styled with Shadcn UI. See Shadcn UI Documentation:
 * https://ui.shadcn.com/docs/components/dropdown-menu See Radix UI Documentation:
 * https://www.radix-ui.com/primitives/docs/components/dropdown-menu
 */
/* #region CUSTOM Add variant prop to support different styles */
export type DropdownMenuProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Root
> & {
  variant?: MenuContextProps['variant'];
};
/* #endregion CUSTOM */

/* #region CUSTOM Provide context to add variants */
/** @inheritdoc DropdownMenuProps */
function DropdownMenu({ variant = 'default', ...props }: DropdownMenuProps) {
  const contextValue = React.useMemo<MenuContextProps>(
    () => ({
      variant,
    }),
    [variant],
  );
  return (
    <MenuContext.Provider value={contextValue}>
      <DropdownMenuPrimitive.Root {...props} />
    </MenuContext.Provider>
  );
}
/* #endregion CUSTOM */

/** @inheritdoc DropdownMenuProps */
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/** @inheritdoc DropdownMenuProps */
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/** @inheritdoc DropdownMenuProps */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/** @inheritdoc DropdownMenuProps */
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/** @inheritdoc DropdownMenuProps */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// CUSTOM: Re-added type DropdownMenuShortcutProps
/** @inheritdoc DropdownMenuProps */
export type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
};

/** @inheritdoc DropdownMenuProps */
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => {
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        'tw-flex tw-cursor-default tw-select-none tw-items-center tw-gap-2 tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0',
        inset && 'tw-ps-8', // CUSTOM: Support RTL (was inset && tw-pl-8)
        className,
        menuVariants({ variant: context.variant }), // CUSTOM use context to add variants
      )}
      {...props}
    >
      {children}
      <ChevronRight className="tw-ms-auto" /> {/* CUSTOM: Support RTL (was tw-ml-auto) */}
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

/** @inheritdoc DropdownMenuProps */
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-dropdown-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

/* TODO: bug in shadcn component: DropdownMenuContent does not support a dir prop.
For the content we can work around this by adding a div with dir, but that would not cause
the scrollbar to appear left in an rtl layout (e.g. see book-chapter-control.component) */
/** @inheritdoc DropdownMenuProps */
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => {
  const dir: Direction = readDirection();
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'pr-twp', // CUSTOM adding pr twp because the dropdown content is added to the dom as a sibling to the app root
          'tw-z-50 tw-max-h-[var(--radix-dropdown-menu-content-available-height)] tw-min-w-[8rem] tw-origin-[--radix-dropdown-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2',
          className,
        )}
        {...props}
      >
        <div dir={dir}>{children}</div> {/* CUSTOM: Support RTL */}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/** @inheritdoc DropdownMenuProps */
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => {
  const dir: Direction = readDirection();
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        // CUSTOM: removed tw-relative focus:tw-text-accent-foreground
        'tw-flex tw-cursor-default tw-select-none tw-items-center tw-gap-2 tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0',
        inset && 'tw-ps-8', // CUSTOM: Support RTL (was inset && tw-pl-8)
        className,
        menuVariants({ variant: context.variant }), // CUSTOM use context to add variants
      )}
      {...props}
      dir={dir}
    />
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

/** @inheritdoc DropdownMenuProps */
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => {
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50',
        'tw-pe-2 tw-ps-8', // CUSTOM: Support RTL
        className,
        menuVariants({ variant: context.variant }), // CUSTOM use context to add variants
      )}
      checked={checked}
      {...props}
    >
      <span
        className={cn(
          'tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center',
          'ltr:tw-left-2 rtl:tw-right-2', // CUSTOM: Support RTL
        )}
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="tw-h-4 tw-w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

/** @inheritdoc DropdownMenuProps */
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => {
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50',
        'tw-pe-2 tw-ps-8', // CUSTOM: Support RTL
        className,
        menuVariants({ variant: context.variant }), // CUSTOM use context to add variants
      )}
      {...props}
    >
      <span
        className={cn(
          'tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center',
          'ltr:tw-left-2 rtl:tw-right-2', // CUSTOM: Support RTL
        )}
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="tw-h-2 tw-w-2 tw-fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

/** @inheritdoc DropdownMenuProps */
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold',
      inset && 'tw-ps-8', // CUSTOM: Support RTL (was inset && tw-pl-8)
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/** @inheritdoc DropdownMenuProps */
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('tw--mx-1 tw-my-1 tw-h-px tw-bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

/** @inheritdoc DropdownMenuProps */
function DropdownMenuShortcut({ className, ...props }: DropdownMenuShortcutProps) {
  return (
    <span
      className={cn(
        'tw-text-xs tw-tracking-widest tw-opacity-60',
        'tw-ms-auto', // CUSTOM: Support RTL (was tw-ml-auto)
        className,
      )}
      // CUSTOM: Suppress warning produced by imported shadcn code
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
