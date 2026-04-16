import {
  MenuContext,
  MenuContextProps,
  menuVariants,
  useMenuContext,
} from '@/context/menu.context';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { cn } from '@/utils/shadcn-ui/utils';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import React from 'react';

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

/** @inheritdoc DropdownMenuProps */
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/** @inheritdoc DropdownMenuProps */
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/** @inheritdoc DropdownMenuProps */
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/** @inheritdoc DropdownMenuProps */
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/** @inheritdoc DropdownMenuProps */
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/** @inheritdoc DropdownMenuProps */
export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  className?: string;
  inset?: boolean;
};

/** @inheritdoc DropdownMenuProps */
export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
> & {
  className?: string;
};

/** @inheritdoc DropdownMenuProps */
export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> & {
  className?: string;
  sideOffset?: number;
};

/** @inheritdoc DropdownMenuProps */
export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> & {
  className?: string;
  inset?: boolean;
};

/** @inheritdoc DropdownMenuProps */
export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
> & {
  className?: string;
  checked?: boolean;
};

/** @inheritdoc DropdownMenuProps */
export type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
> & {
  className?: string;
};

/** @inheritdoc DropdownMenuProps */
export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> & {
  className?: string;
  inset?: boolean;
};

/** @inheritdoc DropdownMenuProps */
export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
> & {
  className?: string;
};

/** @inheritdoc DropdownMenuProps */
export type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
};

/* #region CUSTOM Provide context to add variants */
/** @inheritdoc DropdownMenuProps */
export function DropdownMenu({ variant = 'default', ...props }: DropdownMenuProps) {
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
export function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ref,
  ...props
}: DropdownMenuSubTriggerProps & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>>;
}) {
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        'tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:focus:bg-accent tw:data-[state=open]:bg-accent',
        inset && 'tw:pl-8',
        className,
        menuVariants({ variant: context.variant }), // CUSTOM use context to add variants
      )}
      {...props}
    >
      {children}
      <ChevronRight className="tw:ml-auto tw:h-4 tw:w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/** @inheritdoc DropdownMenuProps */
export function DropdownMenuSubContent({
  className,
  children,
  ref,
  ...props
}: DropdownMenuSubContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>>;
}) {
  const dir: Direction = readDirection();
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        'pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    >
      {/* CUSTOM wrap children in dir div for RTL support */}
      <div dir={dir}>{children}</div>
    </DropdownMenuPrimitive.SubContent>
  );
}

/* TODO: bug in shadcn component: DropdownMenuContent does not support a dir prop.
For the content we can work around this by adding a div with dir, but that would not cause
the scrollbar to appear left in an rtl layout (e.g. see book-chapter-control.component) */
/** @inheritdoc DropdownMenuProps */
export function DropdownMenuContent({
  className,
  sideOffset = 4,
  children,
  ref,
  ...props
}: DropdownMenuContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Content>>;
}) {
  const dir: Direction = readDirection();
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
          'pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        {...props}
      >
        <div dir={dir}>{children}</div>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

/** @inheritdoc DropdownMenuProps */
export function DropdownMenuItem({
  className,
  inset,
  ref,
  ...props
}: DropdownMenuItemProps & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Item>>;
}) {
  const dir: Direction = readDirection();
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        // removed: tw:relative tw:focus:text-accent-foreground
        'tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50',
        inset && 'tw:pl-8',
        className,
        menuVariants({ variant: context.variant }), // CUSTOM use context to add variants
      )}
      {...props}
      dir={dir}
    />
  );
}

/** @inheritdoc DropdownMenuProps */
export function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ref,
  ...props
}: DropdownMenuCheckboxItemProps & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>>;
}) {
  const dir: Direction = readDirection(); // CUSTOM RTL support
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50',
        className,
        menuVariants({ variant: context.variant }), // CUSTOM use context to add variants
      )}
      checked={checked}
      {...props}
      dir={dir} // CUSTOM RTL support
    >
      <span className="tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="tw:h-4 tw:w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/** @inheritdoc DropdownMenuProps */
export function DropdownMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: DropdownMenuRadioItemProps & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>>;
}) {
  const dir: Direction = readDirection(); // CUSTOM RTL support
  const context = useMenuContext(); // CUSTOM use context to add variants
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-hidden tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50',
        className,
        menuVariants({ variant: context.variant }), // CUSTOM use context to add variants
      )}
      {...props}
      dir={dir} // CUSTOM RTL support
    >
      <span className="tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="tw:h-2 tw:w-2 tw:fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/** @inheritdoc DropdownMenuProps */
export function DropdownMenuLabel({
  className,
  inset,
  ref,
  ...props
}: DropdownMenuLabelProps & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Label>>;
}) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn('tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold', inset && 'tw:pl-8', className)}
      {...props}
    />
  );
}

/** @inheritdoc DropdownMenuProps */
export function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: DropdownMenuSeparatorProps & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Separator>>;
}) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn('tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted', className)}
      {...props}
    />
  );
}

/** @inheritdoc DropdownMenuProps */
export function DropdownMenuShortcut({ className, ...props }: DropdownMenuShortcutProps) {
  return (
    <span
      className={cn('tw:ms-auto tw:text-xs tw:tracking-widest tw:opacity-60', className)}
      // Shadcn UI pattern: spreading props onto the element is necessary to forward all HTML attributes
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
