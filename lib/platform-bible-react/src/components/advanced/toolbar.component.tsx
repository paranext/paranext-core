import {
  SelectMenuItemHandler,
  PlatformMenubar,
} from '@/components/advanced/menus/platform-menubar.component';
import { cn } from '@/utils/shadcn-ui/utils';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { PropsWithChildren, ReactNode, useRef } from 'react';

export type ToolbarProps = PropsWithChildren<{
  /** The handler to use for menu commands (and eventually toolbar commands). */
  onSelectMenuItem: SelectMenuItemHandler;

  /**
   * Menu data that is used to populate the Menubar component. If empty object, no menus will be
   * shown on the App Menubar
   */
  menuData?: Localized<MultiColumnMenu>;

  /**
   * Optional callback function that is executed whenever a menu on the App Menubar is opened or
   * closed. Helpful for handling updates to the menu, as changing menu data when the menu is opened
   * is not desirable.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /** Optional unique identifier */
  id?: string;

  /** Additional css classes to help with unique styling of the toolbar */
  className?: string;

  /**
   * Whether the toolbar should be used as a draggable area for moving the application. This will
   * add an electron specific style `WebkitAppRegion: 'drag'` to the toolbar in order to make it
   * draggable. See:
   * https://www.electronjs.org/docs/latest/tutorial/custom-title-bar#create-a-custom-title-bar
   */
  shouldUseAsAppDragArea?: boolean;

  /** Toolbar children to be put at the start of the toolbar (left side in ltr, right side in rtl) */
  appMenuAreaChildren?: ReactNode;

  /** Toolbar children to be put at the end of the toolbar (right side in ltr, left side in rtl) */
  configAreaChildren?: ReactNode;

  /** Variant of the menubar */
  menubarVariant?: 'default' | 'muted';
}>;

/**
 * Get tailwind class for reserved space for the window controls / macos "traffic lights". Passing
 * 'darwin' will reserve the necessary space for macos traffic lights at the start, otherwise a
 * different amount of space at the end for the window controls.
 *
 * Apply to the toolbar like: `<Toolbar className={cn('tw:h-8 tw:bg-background',
 * getToolbarOSReservedSpaceClassName('darwin'))}>` or `<Toolbar
 * className={getToolbarOSReservedSpaceClassName('linux')}>`
 *
 * @param operatingSystem The os platform: 'darwin' (macos) | anything else
 * @returns The class name to apply to the toolbar if os specific space should be reserved
 */
export function getToolbarOSReservedSpaceClassName(
  operatingSystem: string | undefined,
): string | undefined {
  switch (operatingSystem) {
    case undefined:
      return undefined;
    case 'darwin':
      return 'tw:ps-[85px]';
    default:
      return 'tw:pe-[calc(138px+1rem)]';
  }
}

/**
 * A customizable toolbar component with a menubar, content area, and configure area.
 *
 * This component is designed to be used in the window title bar of an electron application.
 *
 * The root element declares a named container-query context, `toolbar`, whose content box is the
 * bar's genuinely usable width — the window width minus the OS caption-button reservation and the
 * bar's own padding. Children passed through any of the three areas can therefore shrink or hide
 * themselves against the space actually available, which stays correct across the macOS, Windows,
 * and Linux reservations and in RTL, where a viewport breakpoint would not.
 *
 * Note the container context also applies CSS containment to the root: it becomes a containing
 * block for `position: fixed` descendants and establishes a new stacking context, and its inline
 * size is computed as if it had no contents. Render `Toolbar` as a full-width block; in a
 * shrink-to-fit context (an `inline-block`, a `w-auto` flex item, an `auto` grid track) it
 * collapses. Overlay content should portal out of the subtree, as the shadcn Select, Tooltip, and
 * Menubar primitives already do.
 *
 * Two `data-testid` hooks are part of this contract as well, relied on by end-to-end tests outside
 * this package: `toolbar-content-row` (the row that clips when contents do not fit) and
 * `toolbar-content-area` (the area receiving `children`). Renaming either is a breaking change.
 *
 * @example
 *
 * Hide a child once the usable bar width drops below 52rem:
 *
 * ```tsx
 * <Toolbar {...props}>
 *   <Badge className="tw:@max-[52rem]/toolbar:hidden">{version}</Badge>
 * </Toolbar>;
 * ```
 *
 * @param {ToolbarProps} props - The props for the component.
 */
export function Toolbar({
  menuData,
  onOpenChange,
  onSelectMenuItem,
  className,
  id,
  children,
  appMenuAreaChildren,
  configAreaChildren,
  shouldUseAsAppDragArea,
  menubarVariant = 'default',
}: ToolbarProps) {
  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const containerRef = useRef<HTMLDivElement>(undefined!);

  return (
    <div
      /* `@container/toolbar` is the container context consumers use to shrink/hide title bar
         controls at narrow widths (see PlatformBibleToolbar). Deliberately on this element rather
         than the inner flex: a container query measures the container's CONTENT box, and this
         div's padding is where every OS caption-button reservation lands — the static
         `ps-[85px]`/`pe-[calc(138px+1rem)]` from getToolbarOSReservedSpaceClassName arrives via
         `className`, and the live-measured Windows variant is padding on an ancestor. So this
         content box is the genuinely usable bar width in all three cases. It is also already
         `position: relative`, so the `contain: layout` implied by `container-type: inline-size`
         does not change which element is the containing block for absolutely positioned
         descendants — putting the context on the inner flex would.

         Containment does have three further effects, none of them live here but all of them worth
         knowing before moving this: the root also becomes the containing block for `position:
         fixed` descendants (which `position: relative` alone does NOT do), it establishes a new
         stacking context, and inline-size containment makes its width independent of its contents.
         Nothing in the toolbar positions `fixed`, every overlay it can open portals to
         `document.body`, and all consumers render it full-width — see the TSDoc above. */
      className={cn('tw:@container/toolbar tw:border tw:px-4 tw:text-foreground', className)}
      ref={containerRef}
      style={{ position: 'relative' }}
      id={id}
    >
      <div
        /* The element that clips when the bar's contents do not fit, so it is also the one whose
           `scrollWidth > clientWidth` proves an overflow regression (see the narrow-title-bar e2e
           test). */
        data-testid="toolbar-content-row"
        className="tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden"
        /* @ts-ignore Electron-only property */
        style={shouldUseAsAppDragArea ? { WebkitAppRegion: 'drag' } : undefined}
      >
        {/* App Menu area */}
        <div className="tw:flex tw:grow tw:basis-0">
          <div
            className="tw:flex tw:items-center tw:gap-2"
            /* @ts-ignore Electron-only property */
            style={shouldUseAsAppDragArea ? { WebkitAppRegion: 'no-drag' } : undefined}
          >
            {appMenuAreaChildren}

            {menuData && (
              <PlatformMenubar
                menuData={menuData}
                onOpenChange={onOpenChange}
                onSelectMenuItem={onSelectMenuItem}
                variant={menubarVariant}
              />
            )}
          </div>
        </div>

        {/* Content area */}
        <div
          /* `min-w-0` defeats the `min-width: auto` a flex item gets by default, which floors this
             area at its content's intrinsic width. Without it the area cannot shrink at all, so a
             narrow window pushes the trailing controls under the `overflow-hidden` above and they
             are silently clipped rather than shrunk (PT-4218). The app menu area intentionally does
             NOT get the same treatment: it holds the menubar, which has nowhere to shrink to, and
             its `basis-0` already keeps it from claiming space it does not need. */
          data-testid="toolbar-content-area"
          className="tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:px-2"
          /* @ts-ignore Electron-only property */
          style={shouldUseAsAppDragArea ? { WebkitAppRegion: 'no-drag' } : undefined}
        >
          {children}
        </div>

        {/* Configure area */}
        <div className="tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end">
          <div
            className="tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1"
            /* @ts-ignore Electron-only property */
            style={shouldUseAsAppDragArea ? { WebkitAppRegion: 'no-drag' } : undefined}
          >
            {configAreaChildren}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
