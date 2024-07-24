import HamburgerMenuButton, {
  MultiColumnMenuProvider,
} from '@/components/mui/hamburger-menu-button.component';
import { CommandHandler } from '@/components/mui/menu-item.component';
import '@/components/mui/toolbar.component.css';
import { AppBar, Toolbar as MuiToolbar } from '@mui/material';
import { PropsWithChildren, useRef } from 'react';

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
              menuProvider={menuProvider}
            />
          ) : undefined}
          {children ? <div className="papi-toolbar-children">{children}</div> : undefined}
        </MuiToolbar>
      </AppBar>
    </div>
  );
}
