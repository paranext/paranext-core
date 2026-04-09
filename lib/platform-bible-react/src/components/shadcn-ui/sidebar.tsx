import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import { PanelLeft, PanelRight } from 'lucide-react';

import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Separator } from '@/components/shadcn-ui/separator';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { cn } from '@/utils/shadcn-ui.util';
import { Direction, readDirection } from '@/utils/dir-helper.util';

/**
 * CUSTOM: Changes from the original code from Shadcn- Removed uses of useIsMobile, Sheet, and
 * SheetContent. Also removed the parts setting COOKIES.
 */

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
  // CUSTOM: this was moved from Sidebar to SidebarProvider to also be able to flip the icon based on the side
  side: Side;
};

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
 * used to populate and style it. These components are adapted from Shadcn UI. See Shadcn UI
 * Documentation: https://ui.shadcn.com/docs/components/sidebar
 */
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  side = 'primary',
  ref,
  ...props
}: React.ComponentProps<'div'> & {
  /** Whether the sidebar is initially open. */
  defaultOpen?: boolean;
  /** Whether the sidebar is open. */
  open?: boolean;
  /** Callback fired when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** The side of the sidebar. */
  side?: Side;
  ref?: React.Ref<HTMLDivElement>;
}) {
  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_open, _setOpen] = React.useState(defaultOpen);
  const isOpen = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(isOpen) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, isOpen],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return setOpen((open) => !open);
  }, [setOpen]);

  // CUSTOM: Commented this out pending a discussion with UX about keyboard shortcuts
  // Adds a keyboard shortcut to toggle the sidebar.
  // React.useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
  //       event.preventDefault();
  //       toggleSidebar();
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);
  //   return () => window.removeEventListener('keydown', handleKeyDown);
  // }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = isOpen ? 'expanded' : 'collapsed';

  const dir: Direction = readDirection();
  const oppositeSide: Side = side === 'primary' ? 'secondary' : 'primary';
  const directionAwareSide = dir === 'ltr' ? side : oppositeSide;

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open: isOpen,
      setOpen,
      toggleSidebar,
      side: directionAwareSide,
    }),
    [state, isOpen, setOpen, toggleSidebar, directionAwareSide],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            // CSS custom properties are not in React.CSSProperties; cast is required to use them
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            // Removed tw:min-h-svh
            'tw:group/sidebar-wrapper pr-twp tw:flex tw:w-full tw:has-[[data-variant=inset]]:bg-sidebar',
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

/** @inheritdoc SidebarProvider */
function Sidebar({
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  ref?: React.Ref<HTMLDivElement>;
}) {
  const context = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        className={cn(
          'tw:flex tw:h-full tw:w-[--sidebar-width] tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="tw:group tw:peer tw:hidden tw:text-sidebar-foreground tw:md:block"
      data-state={context.state}
      data-collapsible={context.state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={context.side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          'tw:relative tw:h-svh tw:w-[--sidebar-width] tw:bg-transparent tw:transition-[width] tw:duration-200 tw:ease-linear',
          'tw:group-data-[collapsible=offcanvas]:w-0',
          'tw:group-data-[side=secondary]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
            : 'tw:group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
        )}
      />
      <div
        className={cn(
          // CUSTOM: Switched tw:fixed to tw:absolute here to scope the sidebar inside of it's container
          'tw:absolute tw:inset-y-0 tw:z-10 tw:hidden tw:h-svh tw:w-[--sidebar-width] tw:transition-[left,right,width] tw:duration-200 tw:ease-linear tw:md:flex',
          context.side === 'primary'
            ? 'tw:left-0 tw:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'tw:right-0 tw:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'tw:p-2 tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
            : 'tw:group-data-[collapsible=icon]:w-[--sidebar-width-icon] tw:group-data-[side=primary]:border-r tw:group-data-[side=secondary]:border-l',
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="tw:flex tw:h-full tw:w-full tw:flex-col tw:bg-sidebar tw:group-data-[variant=floating]:rounded-lg tw:group-data-[variant=floating]:border tw:group-data-[variant=floating]:border-sidebar-border tw:group-data-[variant=floating]:shadow"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** @inheritdoc SidebarProvider */
function SidebarTrigger({
  className,
  onClick,
  ref,
  ...props
}: React.ComponentProps<typeof Button> & {
  ref?: React.Ref<React.ComponentRef<typeof Button>>;
}) {
  const context = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('tw:h-7 tw:w-7', className)}
      onClick={(event) => {
        onClick?.(event);
        context.toggleSidebar();
      }}
      {...props}
    >
      {context.side === 'primary' ? <PanelLeft /> : <PanelRight />}
      <span className="tw:sr-only">Toggle Sidebar</span>
    </Button>
  );
}

/** @inheritdoc SidebarProvider */
function SidebarRail({
  className,
  ref,
  ...props
}: React.ComponentProps<'button'> & { ref?: React.Ref<HTMLButtonElement> }) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'tw:absolute tw:inset-y-0 tw:z-20 tw:hidden tw:w-4 tw:-translate-x-1/2 tw:transition-all tw:ease-linear tw:after:absolute tw:after:inset-y-0 tw:after:left-1/2 tw:after:w-[2px] tw:hover:after:bg-sidebar-border tw:group-data-[side=primary]:-right-4 tw:group-data-[side=secondary]:left-0 tw:sm:flex',
        'tw:[[data-side=secondary]_&]:cursor-e-resize tw:[[data-side=secondary]_&]:cursor-w-resize',
        'tw:[[data-side=primary][data-state=collapsed]_&]:cursor-e-resize tw:[[data-side=secondary][data-state=collapsed]_&]:cursor-w-resize',
        'tw:group-data-[collapsible=offcanvas]:translate-x-0 tw:group-data-[collapsible=offcanvas]:after:left-full tw:group-data-[collapsible=offcanvas]:hover:bg-sidebar',
        'tw:[[data-side=primary][data-collapsible=offcanvas]_&]:-right-2',
        'tw:[[data-side=secondary][data-collapsible=offcanvas]_&]:-left-2',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarInset({
  className,
  ref,
  ...props
}: React.ComponentProps<'main'> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <main
      ref={ref}
      className={cn(
        // CUSTOM: Removed tw:min-h-svh
        'tw:relative tw:flex tw:flex-1 tw:flex-col tw:bg-background',
        'tw:peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 tw:md:peer-data-[variant=inset]:ml-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarInput({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof Input> & {
  ref?: React.Ref<React.ComponentRef<typeof Input>>;
}) {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        'tw:h-8 tw:w-full tw:bg-background tw:shadow-none tw:focus-visible:ring-2 tw:focus-visible:ring-sidebar-ring',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarHeader({
  className,
  ref,
  ...props
}: React.ComponentProps<'div'> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn('tw:flex tw:flex-col tw:gap-2 tw:p-2', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarFooter({
  className,
  ref,
  ...props
}: React.ComponentProps<'div'> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn('tw:flex tw:flex-col tw:gap-2 tw:p-2', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarSeparator({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof Separator> & {
  ref?: React.Ref<React.ComponentRef<typeof Separator>>;
}) {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn('tw:mx-2 tw:w-auto tw:bg-sidebar-border', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarContent({
  className,
  ref,
  ...props
}: React.ComponentProps<'div'> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        'tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarGroup({
  className,
  ref,
  ...props
}: React.ComponentProps<'div'> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
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
  ref,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        'tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:outline-none tw:ring-sidebar-ring tw:transition-[margin,opa] tw:duration-200 tw:ease-linear tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0',
        'tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0',
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
  ref,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        'tw:absolute tw:right-3 tw:top-3.5 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:outline-none tw:ring-sidebar-ring tw:transition-transform tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'tw:after:absolute tw:after:-inset-2 tw:after:md:hidden',
        'tw:group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarGroupContent({
  className,
  ref,
  ...props
}: React.ComponentProps<'div'> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn('tw:w-full tw:text-sm', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenu({
  className,
  ref,
  ...props
}: React.ComponentProps<'ul'> & { ref?: React.Ref<HTMLUListElement> }) {
  return (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn('tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-1', className)}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuItem({
  className,
  ref,
  ...props
}: React.ComponentProps<'li'> & { ref?: React.Ref<HTMLLIElement> }) {
  return (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn('tw:group/menu-item tw:relative', className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  'tw:peer/menu-button tw:flex tw:w-full tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:p-2 tw:text-left tw:text-sm tw:outline-none tw:ring-sidebar-ring tw:transition-[width,height,padding] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[active=true]:font-medium tw:data-[active=true]:text-sidebar-accent-foreground tw:data-[active=true]:bg-sidebar-accent tw:data-[state=open]:hover:bg-sidebar-accent tw:data-[state=open]:hover:text-sidebar-accent-foreground tw:group-data-[collapsible=icon]:!size-8 tw:group-data-[collapsible=icon]:!p-2 tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground',
        outline:
          'tw:bg-background tw:shadow-[0_0_0_1px_var(--sidebar-border)] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
      },
      size: {
        default: 'tw:h-8 tw:text-sm',
        sm: 'tw:h-7 tw:text-xs',
        lg: 'tw:h-12 tw:text-sm tw:group-data-[collapsible=icon]:!p-0',
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
  ref,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  ref?: React.Ref<HTMLButtonElement>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : 'button';
  const { state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
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

  if (typeof tooltip === 'string') {
    // Normalizing the string tooltip to an object shape; reassignment is the clearest approach here
    // eslint-disable-next-line no-param-reassign
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== 'collapsed'} {...tooltip} />
    </Tooltip>
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ref,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        'tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:absolute tw:right-1 tw:top-1.5 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:outline-none tw:ring-sidebar-ring tw:transition-transform tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'tw:after:absolute tw:after:-inset-2 tw:after:md:hidden',
        'tw:peer-data-[size=sm]/menu-button:top-1',
        'tw:peer-data-[size=default]/menu-button:top-1.5',
        'tw:peer-data-[size=lg]/menu-button:top-2.5',
        'tw:group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground tw:data-[state=open]:opacity-100 tw:md:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuBadge({
  className,
  ref,
  ...props
}: React.ComponentProps<'div'> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        'tw:pointer-events-none tw:absolute tw:right-1 tw:flex tw:h-5 tw:min-w-5 tw:select-none tw:items-center tw:justify-center tw:rounded-md tw:px-1 tw:text-xs tw:font-medium tw:tabular-nums tw:text-sidebar-foreground',
        'tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'tw:peer-data-[size=sm]/menu-button:top-1',
        'tw:peer-data-[size=default]/menu-button:top-1.5',
        'tw:peer-data-[size=lg]/menu-button:top-2.5',
        'tw:group-data-[collapsible=icon]:hidden',
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
  ref,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn('tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton className="tw:size-4 tw:rounded-md" data-sidebar="menu-skeleton-icon" />
      )}
      <Skeleton
        className="tw:h-4 tw:max-w-[--skeleton-width] tw:flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          // CSS custom property '--skeleton-width' is not in React.CSSProperties; cast is required
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuSub({
  className,
  ref,
  ...props
}: React.ComponentProps<'ul'> & { ref?: React.Ref<HTMLUListElement> }) {
  return (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        'tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:flex-col tw:gap-1 tw:border-l tw:border-sidebar-border tw:px-2.5 tw:py-0.5',
        'tw:group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

/** @inheritdoc SidebarProvider */
function SidebarMenuSubItem({
  ref,
  ...props
}: React.ComponentProps<'li'> & { ref?: React.Ref<HTMLLIElement> }) {
  return <li ref={ref} {...props} />;
}

/** @inheritdoc SidebarProvider */
function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive,
  className,
  ref,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  size?: 'sm' | 'md';
  isActive?: boolean;
  ref?: React.Ref<HTMLAnchorElement>;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:outline-none tw:ring-sidebar-ring tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground',
        'tw:data-[active=true]:bg-sidebar-accent tw:data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'tw:text-xs',
        size === 'md' && 'tw:text-sm',
        'tw:group-data-[collapsible=icon]:hidden',
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
