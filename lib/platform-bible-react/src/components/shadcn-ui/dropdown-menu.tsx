import React from 'react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

// CUSTOM: Import menu context for variant propagation down the menu tree
import {
  MenuContext,
  MenuContextProps,
  menuVariants,
  useMenuContext,
} from '@/context/menu.context';
// CUSTOM: Import readDirection for RTL support
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { cn } from '@/utils/shadcn-ui/utils';
import { IconCheck, IconChevronRight } from '@tabler/icons-react';

/**
 * Dropdown Menu components providing accessible dropdown menus and submenus. Built on Radix UI
 * primitives and styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dropdown-menu}
 * @see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dropdown-menu}
 */
// CUSTOM: Add variant prop to DropdownMenuProps to support different menu styles via context
export type DropdownMenuProps = React.ComponentProps<typeof DropdownMenuPrimitive.Root> & {
  variant?: MenuContextProps['variant'];
};

// CUSTOM: Defined named DropdownMenu*Props type aliases for each sub-component so extensions
// composing their own menu pieces have public prop shapes to import.
export type DropdownMenuSubTriggerProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};
/** @inheritdoc DropdownMenuSubTriggerProps */
export type DropdownMenuSubContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.SubContent
>;
/** @inheritdoc DropdownMenuSubTriggerProps */
export type DropdownMenuContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.Content>;
/** @inheritdoc DropdownMenuSubTriggerProps */
export type DropdownMenuItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
};
/** @inheritdoc DropdownMenuSubTriggerProps */
export type DropdownMenuCheckboxItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
> & {
  inset?: boolean;
};
/** @inheritdoc DropdownMenuSubTriggerProps */
export type DropdownMenuRadioItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.RadioItem
> & {
  inset?: boolean;
};
/** @inheritdoc DropdownMenuSubTriggerProps */
export type DropdownMenuLabelProps = React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
};
/** @inheritdoc DropdownMenuSubTriggerProps */
export type DropdownMenuSeparatorProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Separator
>;
/** @inheritdoc DropdownMenuSubTriggerProps */
export type DropdownMenuShortcutProps = React.ComponentProps<'span'>;

// CUSTOM: Wrap DropdownMenuPrimitive.Root in MenuContext.Provider to propagate variant down the tree
/** @inheritdoc DropdownMenuProps */
export function DropdownMenu({ variant = 'default', ...props }: DropdownMenuProps) {
  // CUSTOM: Added readDirection() and dir prop so Radix uses RTL-aware popup alignment:
  // align='start' flips to right-align in RTL so the popup's right edge aligns with the trigger's
  // right edge, matching LTR behavior where the left edge aligns with the trigger's left edge.
  const dir: Direction = readDirection();
  const contextValue = React.useMemo<MenuContextProps>(
    () => ({
      variant,
    }),
    [variant],
  );
  return (
    <MenuContext.Provider value={contextValue}>
      <DropdownMenuPrimitive.Root data-slot="dropdown-menu" dir={dir} {...props} />
    </MenuContext.Provider>
  );
}

/** @inheritdoc DropdownMenuProps */
function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

/** @inheritdoc DropdownMenuProps */
function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

/** @inheritdoc DropdownMenuProps */
// CUSTOM: Lifted the prop shape out of the function signature into the named
// DropdownMenuContentProps type above so it can be exported.
function DropdownMenuContent({
  className,
  align = 'start',
  sideOffset = 4,
  children,
  ...props
}: DropdownMenuContentProps) {
  // CUSTOM: Use readDirection for RTL support — wraps children in dir div to mirror layout
  const dir: Direction = readDirection();
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          /* CUSTOM: adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
          // CUSTOM: Removed tw:w-(--radix-dropdown-menu-trigger-width) which pinned the dropdown to
          // exactly the trigger button width, making menus unusably narrow when the trigger is a small
          // icon button. Restores natural min-width behavior so content determines popup width.
          // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
          'pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150',
          className,
        )}
        {...props}
      >
        {/* CUSTOM: Wrap children in dir div for RTL support — scrollbar-position limitation noted below */}
        {/* TODO: bug in shadcn component: DropdownMenuContent does not support a dir prop.
For the content we can work around this by adding a div with dir, but that would not cause
the scrollbar to appear left in an rtl layout (e.g. see book-chapter-control.component) */}
        <div dir={dir}>{children}</div>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

/** @inheritdoc DropdownMenuProps */
function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

/** @inheritdoc DropdownMenuProps */
// CUSTOM: Lifted the prop shape out of the function signature into the named
// DropdownMenuItemProps type above so it can be exported.
function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: DropdownMenuItemProps) {
  // CUSTOM: Use readDirection for RTL support
  const dir: Direction = readDirection();
  // CUSTOM: Use menu context to apply variant-driven styles
  const context = useMenuContext();
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        'tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive',
        className,
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant }),
      )}
      // CUSTOM: Set dir for RTL support
      dir={dir}
      {...props}
    />
  );
}

/** @inheritdoc DropdownMenuProps */
// CUSTOM: Lifted the prop shape out of the function signature into the named
// DropdownMenuCheckboxItemProps type above so it can be exported.
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: DropdownMenuCheckboxItemProps) {
  // CUSTOM: Use readDirection for RTL support
  const dir: Direction = readDirection();
  // CUSTOM: Use menu context to apply variant-driven styles
  const context = useMenuContext();
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        'tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4',
        className,
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant }),
      )}
      checked={checked}
      // CUSTOM: Set dir for RTL support
      dir={dir}
      {...props}
    >
      <span
        className="tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <IconCheck />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/** @inheritdoc DropdownMenuProps */
function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

/** @inheritdoc DropdownMenuProps */
// CUSTOM: Lifted the prop shape out of the function signature into the named
// DropdownMenuRadioItemProps type above so it can be exported.
function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: DropdownMenuRadioItemProps) {
  // CUSTOM: Use readDirection for RTL support
  const dir: Direction = readDirection();
  // CUSTOM: Use menu context to apply variant-driven styles
  const context = useMenuContext();
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        'tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4',
        className,
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant }),
      )}
      // CUSTOM: Set dir for RTL support
      dir={dir}
      {...props}
    >
      <span
        className="tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <IconCheck />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/** @inheritdoc DropdownMenuProps */
// CUSTOM: Lifted the prop shape out of the function signature into the named
// DropdownMenuLabelProps type above so it can be exported.
function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc DropdownMenuProps */
// CUSTOM: Lifted the prop shape out of the function signature into the named
// DropdownMenuSeparatorProps type above so it can be exported.
function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('tw:-mx-1 tw:my-1 tw:h-px tw:bg-border', className)}
      {...props}
    />
  );
}

/** @inheritdoc DropdownMenuProps */
// CUSTOM: Lifted the prop shape out of the function signature into the named
// DropdownMenuShortcutProps type above so it can be exported.
function DropdownMenuShortcut({ className, ...props }: DropdownMenuShortcutProps) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc DropdownMenuProps */
function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

/** @inheritdoc DropdownMenuProps */
// CUSTOM: Lifted the prop shape out of the function signature into the named
// DropdownMenuSubTriggerProps type above so it can be exported.
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) {
  // CUSTOM: Use menu context to apply variant-driven styles
  const context = useMenuContext();
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        'tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4',
        className,
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant }),
      )}
      {...props}
    >
      {children}
      <IconChevronRight className="tw:ms-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/** @inheritdoc DropdownMenuProps */
// CUSTOM: Lifted the prop shape out of the function signature into the named
// DropdownMenuSubContentProps type above so it can be exported.
function DropdownMenuSubContent({ className, children, ...props }: DropdownMenuSubContentProps) {
  // CUSTOM: Use readDirection for RTL support — wraps children in dir div to mirror layout
  const dir: Direction = readDirection();
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        'pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150',
        className,
      )}
      {...props}
    >
      {/* CUSTOM: Wrap children in dir div for RTL support */}
      <div dir={dir}>{children}</div>
    </DropdownMenuPrimitive.SubContent>
  );
}

export {
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
