import HamburgerMenuButton, {
  MultiColumnMenuProvider,
} from '@/components/mui/hamburger-menu-button.component';
import { CommandHandler } from '@/components/mui/menu-item.component';
import '@/components/mui/toolbar.component.css';
import { cn } from '@/utils/shadcn-ui.util';
import { PropsWithChildren, ReactNode, useRef } from 'react';
import MenubarExamples from '@/preview/pages/components/basics/menubar.examples.component';

export type ToolbarProps = PropsWithChildren<{
  /** The handler to use for menu commands (and eventually toolbar commands). */
  commandHandler: CommandHandler;

  /**
   * The optional delegate to use to get the menu data. If not specified, the "hamburger" menu will
   * not display.
   */
  menuProvider?: MultiColumnMenuProvider;

  /** Optional unique identifier */
  id?: string;

  /** Additional css classes to help with unique styling of the toolbar */
  className?: string;

  /** Whether the toolbar should be used as a draggable area for moving the application */
  useAsAppDragArea?: boolean;

  /** Toolbar children to be put at the end of the toolbar (right side in ltr, left side in rtl) */
  configAreaChildren?: ReactNode;

  /** Variant of the menubar */
  menubarVariant?: 'default' | 'muted';
}>;

export default function Toolbar({
  menuProvider,
  commandHandler,
  className,
  id,
  children,
  configAreaChildren,
  useAsAppDragArea,
  menubarVariant = 'default',
}: ToolbarProps) {
  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const containerRef = useRef<HTMLDivElement>(undefined!);

  return (
    <div
      className={cn('tw-border tw-bg-muted tw-px-4 tw-text-muted-foreground', className)}
      ref={containerRef}
      style={{ position: 'relative' }}
      id={id}
    >
      <div
        className="tw-flex tw-h-full tw-w-full tw-justify-between"
        /* @ts-ignore Electron-only property */
        style={useAsAppDragArea ? { WebkitAppRegion: 'drag' } : undefined}
      >
        {/* App Menu area */}
        <div className="tw-flex tw-grow tw-basis-0">
          <div
            className="tw-flex tw-items-center"
            /* @ts-ignore Electron-only property */
            style={{ WebkitAppRegion: 'no-drag' }}
          >
            {menuProvider ? (
              <>
                {/*
                  TODO: When the HamburgerMenuButton is removed, move this component out of the MUI folder
                  also then remove components/mui/toolbar.component.css
                */}
                <HamburgerMenuButton
                  commandHandler={commandHandler}
                  containerRef={containerRef}
                  menuProvider={menuProvider}
                />
                {/* TODO: This is a placeholder for the actual menu */}
                <MenubarExamples variant={menubarVariant} />
              </>
            ) : undefined}
          </div>
        </div>

        {/* Command area */}
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
