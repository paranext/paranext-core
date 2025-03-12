import PlatformMenubar, { CommandHandler } from '@/components/advanced/platform-menubar.component';
import { cn } from '@/utils/shadcn-ui.util';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { PropsWithChildren, ReactNode, useRef } from 'react';

export type ToolbarProps = PropsWithChildren<{
  /** The handler to use for menu commands (and eventually toolbar commands). */
  commandHandler: CommandHandler;

  /**
   * Menu data that is used to populate the Menubar component. If empty object, no menus will be
   * shown on the App Menubar
   */
  menuData?: Localized<MultiColumnMenu>;

  /** Optional unique identifier */
  id?: string;

  /** Additional css classes to help with unique styling of the toolbar */
  className?: string;

  /** If provided: reserve space for the window controls / macos "traffic lights" */
  reserveOSSpecificSpace?: string;

  /** Whether the toolbar should be used as a draggable area for moving the application */
  useAsAppDragArea?: boolean;

  /** Toolbar children to be put at the start of the toolbar (left side in ltr, right side in rtl) */
  appMenuAreaChildren?: ReactNode;

  /** Toolbar children to be put at the end of the toolbar (right side in ltr, left side in rtl) */
  configAreaChildren?: ReactNode;

  /** Variant of the menubar */
  menubarVariant?: 'default' | 'muted';
}>;

export default function Toolbar({
  menuData,
  commandHandler,
  className,
  id,
  children,
  appMenuAreaChildren,
  configAreaChildren,
  useAsAppDragArea,
  reserveOSSpecificSpace = undefined,
  menubarVariant = 'default',
}: ToolbarProps) {
  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const containerRef = useRef<HTMLDivElement>(undefined!);

  return (
    <div
      className={cn(
        'tw-border tw-px-4 tw-text-foreground',
        { 'tw-ps-[85px]': reserveOSSpecificSpace === 'darwin' }, // space for macos "traffic lights"
        {
          'tw-pe-[calc(138px+1rem)]':
            reserveOSSpecificSpace === 'win32' || reserveOSSpecificSpace === 'linux',
        },
        className,
      )}
      ref={containerRef}
      style={{ position: 'relative' }}
      id={id}
    >
      <div
        className="tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden"
        /* @ts-ignore Electron-only property */
        style={useAsAppDragArea ? { WebkitAppRegion: 'drag' } : undefined}
      >
        {/* App Menu area */}
        <div className="tw-flex tw-basis-0 tw-justify-start">
          <div
            className="tw-flex tw-items-center tw-gap-2"
            /* @ts-ignore Electron-only property */
            style={{ WebkitAppRegion: 'no-drag' }}
          >
            {appMenuAreaChildren}
          </div>
        </div>
        <div className="tw-flex tw-grow tw-basis-0">
          <div
            className="tw-flex tw-items-center"
            /* @ts-ignore Electron-only property */
            style={{ WebkitAppRegion: 'no-drag' }}
          >
            {menuData && (
              <PlatformMenubar
                menuData={menuData}
                commandHandler={commandHandler}
                variant={menubarVariant}
              />
            )}
          </div>
        </div>

        {/* Content area */}
        <div
          className="tw-flex tw-items-center tw-gap-2 tw-px-2"
          /* @ts-ignore Electron-only property */
          style={{ WebkitAppRegion: 'no-drag' }}
        >
          {children}
        </div>

        {/* Configure area */}
        <div className="tw-flex tw-grow tw-basis-0 tw-justify-end">
          <div
            className="tw-flex tw-items-center tw-gap-2"
            /* @ts-ignore Electron-only property */
            style={{ WebkitAppRegion: 'no-drag' }}
          >
            {configAreaChildren}
          </div>
        </div>
      </div>
    </div>
  );
}
