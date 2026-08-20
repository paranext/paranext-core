import {
  SelectMenuItemHandler,
  PlatformMenubar,
} from '@/components/advanced/menus/platform-menubar.component';
import { cn } from '@/utils/shadcn-ui/utils';
import { ShrinkStepContext } from '@/context/shrink-step.context';
import { useShrinkStep } from '@/hooks/use-shrink-step.hook';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { PropsWithChildren, ReactNode, useCallback, useState } from 'react';

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

  /**
   * Overrides the shrink step this toolbar would otherwise measure from its own width, and
   * publishes it to descendants through `ShrinkStepContext`. Higher means narrower.
   *
   * Intended for stories and tests: measuring needs a layout engine, which jsdom does not have. In
   * the app, leave this unset and let the toolbar measure itself.
   */
  shrinkStep?: number;
}>;

/**
 * Breakpoints for the application titlebar, widest first, measured against the width actually
 * available to the toolbar's content — the inner row, inside whatever padding reserves the OS
 * caption buttons — and never against the window's width.
 *
 * Which box is measured is load-bearing here. The caption-button reserve sits INSIDE the toolbar's
 * own box on macOS (`tw:ps-[85px]`) and on the Windows/Linux fallback (`tw:pe-[…]`), but OUTSIDE it
 * when Electron reports a live overlay rect and the wrapper reserves the space instead (see
 * `platform-bible-toolbar.tsx`). Measuring the outer box would therefore report up to ~150px more
 * room on one path than another for the same window width, and the same window would abbreviate the
 * scripture reference on one OS but not on the next. The inner row is the space the controls really
 * get, on every path.
 *
 * Estimated from the widths of the controls the toolbar carries rather than measured, so expect to
 * adjust them the first time this is watched in a running app.
 */
export const APP_TOOLBAR_SHRINK_THRESHOLDS_PX = Object.freeze([950, 800, 700]);

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
 * Two `data-testid` hooks are relied on by end-to-end tests outside this package, so they are part
 * of this component's contract: `toolbar-content-row` (the row that clips when contents do not fit)
 * and `toolbar-content-area` (the area receiving `children`). Renaming either is a breaking
 * change.
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
  shrinkStep: shrinkStepOverride,
}: ToolbarProps) {
  // The content row lives in state, not a ref: mutating `ref.current` does not re-run the effect
  // inside `useShrinkStep`, so a ref would leave the observer permanently unattached.
  const [contentRowNode, setContentRowNode] = useState<HTMLDivElement | undefined>(undefined);
  const attachContentRow = useCallback(
    (node: HTMLDivElement | null) => setContentRowNode(node ?? undefined),
    [],
  );
  const measuredShrinkStep = useShrinkStep(contentRowNode, APP_TOOLBAR_SHRINK_THRESHOLDS_PX);
  const shrinkStep = shrinkStepOverride ?? measuredShrinkStep;

  return (
    <ShrinkStepContext.Provider value={shrinkStep}>
      <div
        className={cn('tw:border tw:px-4 tw:text-foreground', className)}
        style={{ position: 'relative' }}
        id={id}
      >
        {/* Observed for the shrink step, not the bordered wrapper above: this row's box is the
          space the controls actually have, with the OS caption-button reserve already taken out of
          it however the current platform reserves that space. See
          APP_TOOLBAR_SHRINK_THRESHOLDS_PX. */}
        <div
          data-testid="toolbar-content-row"
          className="tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden"
          ref={attachContentRow}
          /* @ts-ignore Electron-only property */
          style={shouldUseAsAppDragArea ? { WebkitAppRegion: 'drag' } : undefined}
        >
          {/* App Menu area — rigid. Deliberately NOT `tw:min-w-0`: letting the logo and main menubar
            shrink would clip menu titles, which is the failure this design exists to prevent.
            Shrinking flows to the content area instead. */}
          <div className="tw:flex tw:shrink-0 tw:grow tw:basis-0">
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

          {/* Content area — absorbing. Holds the project selector, reference-history buttons and
            BookChapterControl, each of which has a shorter label form to fall back to. */}
          <div
            data-testid="toolbar-content-area"
            className="tw:flex tw:min-w-0 tw:shrink tw:items-center tw:gap-2 tw:px-2"
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
    </ShrinkStepContext.Provider>
  );
}

export default Toolbar;
