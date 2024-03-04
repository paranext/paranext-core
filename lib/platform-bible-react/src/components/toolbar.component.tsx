import { useRef, PropsWithChildren } from 'react';
import { AppBar, Toolbar as MuiToolbar } from '@mui/material';
import { MultiColumnMenu } from 'platform-bible-utils';
import { CommandHandler } from './menu-item.component';
import HamburgerMenuButton from './hamburger-menu-button.component';
import './toolbar.component.css';

export interface MultiColumnMenuProvider {
  (isSupportAndDevelopment: boolean): MultiColumnMenu;
}

export type ToolbarProps = PropsWithChildren<{
  /** The handler to use for menu commands (and eventually toolbar commands). */
  commandHandler: CommandHandler;

  /**
   * The optional delegate to use to get the menu data. If not specified or if it returns undefined,
   * the "hamburger" menu will not display.
   */
  menuProvider?: MultiColumnMenuProvider;

  /** Optional unique identifier */
  id?: string;

  /** Additional css classes to help with unique styling of the toolbar */
  className?: string;
}>;

export default function Toolbar({
  menuProvider,
  commandHandler,
  className,
  id,
  children,
}: ToolbarProps) {
  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const containerRef = useRef<HTMLDivElement>(undefined!);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <AppBar position="static" id={id}>
        <MuiToolbar className={`papi-toolbar ${className ?? ''}`} variant="dense">
          {menuProvider ? (
            <HamburgerMenuButton
              commandHandler={commandHandler}
              containerRef={containerRef}
              normalMenu={menuProvider(false)}
              fullMenu={menuProvider(true)}
            />
          ) : undefined}
          {children ? <div className="papi-toolbar-children">{children}</div> : undefined}
        </MuiToolbar>
      </AppBar>
    </div>
  );
}
