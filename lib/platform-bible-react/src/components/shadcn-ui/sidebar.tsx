/**
 * CUSTOM: Changes from the original code from Shadcn: Removed uses of useIsMobile, Sheet, and
 * SheetContent. Also removed the parts setting COOKIES.
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/utils/shadcn-ui/utils';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Separator } from '@/components/shadcn-ui/separator';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn-ui/tooltip';
// CUSTOM: Added PanelRight import so SidebarTrigger can flip its icon based on the active side
import { IconLayoutSidebar, IconLayoutSidebarRight } from '@tabler/icons-react';
// CUSTOM: Added Direction and readDirection imports for RTL-aware side computation
import { type Direction, readDirection } from '@/utils/dir-helper.util';

const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_ICON = '3rem';
// CUSTOM: Commented this out pending a discussion with UX about keyboard shortcuts
// const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type Side = 'primary' | 'secondary';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  // CUSTOM: 'side' was moved from Sidebar into the context so that SidebarTrigger can flip its icon
  // (PanelLeft vs PanelRight) based on the active side
  side: Side;
};

// CUSTOM: Use undefined instead of null as createContext default - avoids no-null/no-null lint rule.
// The useSidebar() guard (if (!context)) works correctly for undefined.
const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

/** @inheritdoc SidebarProvider */
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

/**
 * Sidebar components providing an accessible sidebar along with all the sub components that can be
 * used to populate and style it. These components are adapted from Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/sidebar}
 */
// CUSTOM: Added TSDoc with link to shadcn/ui documentation
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  // CUSTOM: Added 'side' prop at provider level so direction-aware side can be propagated via context
  side = 'primary',
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The side of the sidebar. */
  side?: Side;
}) {
  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  // CUSTOM: Removed isMobile, openMobile, setOpenMobile state (useIsMobile removed)
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      // CUSTOM: Removed cookie-setting logic (not applicable in Platform.Bible)
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  // CUSTOM: Removed isMobile branch from toggleSidebar (mobile support removed)
  const toggleSidebar = React.useCallback(() => {
    return setOpen((prevOpen) => !prevOpen);
  }, [setOpen]);

  // CUSTOM: Commented out keyboard shortcut pending a discussion with UX about keyboard shortcuts
  // Adds a keyboard shortcut to toggle the sidebar.
  // React.useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
  //       event.preventDefault();
  //       toggleSidebar();
  //     }
  //   };
  //
  //   window.addEventListener('keydown', handleKeyDown);
  //   return () => window.removeEventListener('keydown', handleKeyDown);
  // }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed';

  // CUSTOM: Added RTL-aware side computation so 'primary' always maps to the correct physical side
  const dir: Direction = readDirection();
  const oppositeSide: Side = side === 'primary' ? 'secondary' : 'primary';
  const directionAwareSide = dir === 'ltr' ? side : oppositeSide;

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      toggleSidebar,
      // CUSTOM: Passes direction-aware side into context so SidebarTrigger icon and Sidebar
      // positioning both respond correctly in RTL layouts
      side: directionAwareSide,
    }),
    [state, open, setOpen, toggleSidebar, directionAwareSide],
  );

  // CUSTOM: CSS custom properties (--*) are not in React.CSSProperties; 'as React.CSSProperties'
  // is the standard React pattern for passing CSS variables via the style prop. Extracted to a
  // single-line const so the eslint-disable-next-line can target the assertion precisely.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const wrapperStyle = {
    '--sidebar-width': SIDEBAR_WIDTH,
    '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
    ...style,
  } as React.CSSProperties;

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={wrapperStyle}
        className={cn(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
          'pr-twp tw:group/sidebar-wrapper tw:flex tw:w-full tw:has-data-[variant=inset]:bg-sidebar',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

/** @inheritdoc SidebarProvider */
// CUSTOM: Added TSDoc via @inheritdoc
function Sidebar({
  // CUSTOM: Removed 'side' prop from Sidebar - it is now read from context (moved to SidebarProvider)
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  // CUSTOM: Read side from context instead of accepting it as a prop
  const context = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          'tw:flex tw:h-full tw:w-(--sidebar-width) tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className="tw:group tw:peer tw:hidden tw:text-sidebar-foreground tw:md:block"
      data-state={context.state}
      data-collapsible={context.state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      // CUSTOM: Changed data-side values from 'left'/'right' to 'primary'/'secondary' so styling
      // uses positional semantics rather than physical direction, enabling RTL support
      data-side={context.side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          'tw:relative tw:w-(--sidebar-width) tw:bg-transparent tw:transition-[width] tw:duration-200 tw:ease-linear',
          'tw:group-data-[collapsible=offcanvas]:w-0',
          // CUSTOM: Updated selector from data-[side=right] to data-[side=secondary]
          'tw:group-data-[side=secondary]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'tw:group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={context.side}
        className={cn(
          // CUSTOM: Switched tw:fixed to tw:absolute to scope the sidebar inside its container
          // rather than the viewport, matching Platform.Bible's layout model
          'tw:absolute tw:inset-y-0 tw:z-10 tw:hidden tw:h-svh tw:w-(--sidebar-width) tw:transition-[left,right,width] tw:duration-200 tw:ease-linear tw:md:flex',
          // CUSTOM: Use positional side values (primary/secondary) for left/right offset selectors
          context.side === 'primary'
            ? 'tw:left-0 tw:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'tw:right-0 tw:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'tw:p-2 tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : // CUSTOM: Updated border selectors from data-[side=left/right] to data-[side=primary/secondary]
              'tw:group-data-[collapsible=icon]:w-(--sidebar-width-icon) tw:group-data-[side=primary]:border-e tw:group-data-[side=secondary]:border-s',
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="tw:flex tw:size-full tw:flex-col tw:bg-sidebar tw:group-data-[variant=floating]:rounded-lg tw:group-data-[variant=floating]:shadow-sm tw:group-data-[variant=floating]:ring-1 tw:group-data-[variant=floating]:ring-sidebar-border"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** @inheritdoc SidebarProvider */
function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, side } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {/* CUSTOM: Renders PanelLeft or PanelRight based on context.side so the icon always points
          toward the sidebar's current position (accounting for RTL direction) */}
      {side === 'primary' ? <IconLayoutSidebar /> : <IconLayoutSidebarRight />}
      <span className="tw:sr-only">Toggle Sidebar</span>
    </Button>
  );
}

/** @inheritdoc SidebarProvider */
function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      // CUSTOM: Added type="button" to satisfy react/button-has-type lint rule
      type="button"
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        // CUSTOM: Updated selectors from data-[side=left/right] to data-[side=primary/secondary]
        'tw:absolute tw:inset-y-0 tw:z-20 tw:hidden tw:w-4 tw:transition-all tw:ease-linear tw:group-data-[side=primary]:-right-4 tw:group-data-[side=secondary]:left-0 tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-[2px] tw:hover:after:bg-sidebar-border tw:sm:flex tw:ltr:-translate-x-1/2 tw:rtl:translate-x-1/2',
        'tw:in-data-[side=primary]:cursor-w-resize tw:rtl:in-data-[side=primary]:cursor-e-resize tw:in-data-[side=secondary]:cursor-e-resize tw:rtl:in-data-[side=secondary]:cursor-w-resize',
        'tw:[[data-side=primary][data-state=collapsed]_&]:cursor-e-resize tw:rtl:[[data-side=primary][data-state=collapsed]_&]:cursor-w-resize tw:[[data-side=secondary][data-state=collapsed]_&]:cursor-w-resize tw:rtl:[[data-side=secondary][data-state=collapsed]_&]:cursor-e-resize',
        'tw:group-data-[collapsible=offcanvas]:translate-x-0 tw:group-data-[collapsible=offcanvas]:after:start-full tw:hover:group-data-[collapsible=offcanvas]:bg-sidebar',
        // CUSTOM: Updated selectors from data-[side=left/right] to data-[side=primary/secondary]
        'tw:[[data-side=primary][data-collapsible=offcanvas]_&]:-end-2',
        'tw:[[data-side=secondary][data-collapsible=offcanvas]_&]:-start-2',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        // CUSTOM: Removed tw:min-h-svh - not appropriate in Platform.Bible's windowed layout
        'tw:relative tw:flex tw:w-full tw:flex-1 tw:flex-col tw:bg-background tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[variant=inset]:ms-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow-sm tw:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn('tw:h-8 tw:w-full tw:bg-background tw:shadow-none', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('tw:flex tw:flex-col tw:gap-2 tw:p-2', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn('tw:flex tw:flex-col tw:gap-2 tw:p-2', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('tw:mx-2 tw:w-auto tw:bg-sidebar-border', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'tw:no-scrollbar tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-0 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:ring-sidebar-ring tw:outline-hidden tw:transition-[margin,opacity] tw:duration-200 tw:ease-linear tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0 tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'tw:absolute tw:top-3.5 tw:end-3 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('tw:w-full tw:text-sm', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-0', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('tw:group/menu-item tw:relative', className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  'tw:peer/menu-button tw:group/menu-button tw:flex tw:w-full tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:p-2 tw:text-start tw:text-sm tw:ring-sidebar-ring tw:outline-hidden tw:transition-[width,height,padding] tw:group-has-data-[sidebar=menu-action]/menu-item:pe-8 tw:group-data-[collapsible=icon]:size-8! tw:group-data-[collapsible=icon]:p-2! tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-open:hover:bg-sidebar-accent tw:data-open:hover:text-sidebar-accent-foreground tw:data-active:bg-sidebar-accent tw:data-active:font-medium tw:data-active:text-sidebar-accent-foreground tw:[&_svg]:size-4 tw:[&_svg]:shrink-0 tw:[&>span:last-child]:truncate',
  {
    variants: {
      variant: {
        default: 'tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground',
        // CUSTOM: Updated shadow color values from hsl(var(--...)) to var(--...) to use the
        // updated CSS variable format that includes the color space directly in the variable value
        outline:
          'tw:bg-background tw:shadow-[0_0_0_1px_var(--sidebar-border)] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
      },
      size: {
        default: 'tw:h-8 tw:text-sm',
        sm: 'tw:h-7 tw:text-xs',
        lg: 'tw:h-12 tw:text-sm tw:group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

/** @inheritdoc SidebarProvider */
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot.Root : 'button';
  const { state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  // CUSTOM: Avoid reassigning function parameter (no-param-reassign) by using a new const variable
  const resolvedTooltip: React.ComponentProps<typeof TooltipContent> =
    typeof tooltip === 'string' ? { children: tooltip } : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        // CUSTOM: Removed isMobile condition from hidden prop (mobile support removed)
        hidden={state !== 'collapsed'}
        {...resolvedTooltip}
      />
    </Tooltip>
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        'tw:absolute tw:top-1.5 tw:end-1 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:transition-transform tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:after:absolute tw:after:-inset-2 tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:md:after:hidden tw:[&>svg]:size-4 tw:[&>svg]:shrink-0',
        showOnHover &&
          'tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-active/menu-button:text-sidebar-accent-foreground tw:aria-expanded:opacity-100 tw:md:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        'tw:pointer-events-none tw:absolute tw:end-1 tw:flex tw:h-5 tw:min-w-5 tw:items-center tw:justify-center tw:rounded-md tw:px-1 tw:text-xs tw:font-medium tw:text-sidebar-foreground tw:tabular-nums tw:select-none tw:group-data-[collapsible=icon]:hidden tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[size=default]/menu-button:top-1.5 tw:peer-data-[size=lg]/menu-button:top-2.5 tw:peer-data-[size=sm]/menu-button:top-1 tw:peer-data-active/menu-button:text-sidebar-accent-foreground',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });
  // CUSTOM: CSS custom properties (--*) are not in React.CSSProperties; 'as React.CSSProperties'
  // is the standard React pattern for passing CSS variables via the style prop. Extracted to a
  // single-line const so the eslint-disable-next-line can target the assertion precisely.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const skeletonStyle = { '--skeleton-width': width } as React.CSSProperties;

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton className="tw:size-4 tw:rounded-md" data-sidebar="menu-skeleton-icon" />
      )}
      <Skeleton
        className="tw:h-4 tw:max-w-(--skeleton-width) tw:flex-1"
        data-sidebar="menu-skeleton-text"
        style={skeletonStyle}
      />
    </div>
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:rtl:-translate-x-px tw:flex-col tw:gap-1 tw:border-s tw:border-sidebar-border tw:px-2.5 tw:py-0.5 tw:group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('tw:group/menu-sub-item tw:relative', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  size?: 'sm' | 'md';
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot.Root : 'a';

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:rtl:translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:ring-sidebar-ring tw:outline-hidden tw:group-data-[collapsible=icon]:hidden tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[size=md]:text-sm tw:data-[size=sm]:text-xs tw:data-active:bg-sidebar-accent tw:data-active:text-sidebar-accent-foreground tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground',
        className,
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
