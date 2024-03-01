import { useRef, useState, useCallback, useEffect, MouseEvent, PropsWithChildren } from 'react';
import { AppBar, Toolbar as MuiToolbar, IconButton, Drawer } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { MultiColumnMenu } from 'platform-bible-utils';
import { Command, CommandHandler } from './menu-item.component';
import GridMenu from './grid-menu.component';
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
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hasShiftModifier, setHasShiftModifier] = useState(false);

  const handleMenuItemClick = useCallback(() => {
    if (isMenuOpen) setMenuOpen(false);
    setHasShiftModifier(false);
  }, [isMenuOpen]);

  const handleMenuButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMenuOpen((prevIsOpen) => {
      const isOpening = !prevIsOpen;
      if (isOpening && e.shiftKey) setHasShiftModifier(true);
      else if (!isOpening) setHasShiftModifier(false);
      return isOpening;
    });
  }, []);

  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const containerRef = useRef<HTMLDivElement>(undefined!);

  const [toolbarHeight, setToolbarHeight] = useState(0);

  useEffect(() => {
    if (isMenuOpen && containerRef.current) {
      setToolbarHeight(containerRef.current.clientHeight);
    }
  }, [isMenuOpen]);

  const toolbarCommandHandler = useCallback(
    (command: Command) => {
      handleMenuItemClick();
      return commandHandler(command);
    },
    [commandHandler, handleMenuItemClick],
  );

  const menu = menuProvider?.(hasShiftModifier);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <AppBar position="static" id={id}>
        <MuiToolbar className={`papi-toolbar ${className ?? ''}`} variant="dense">
          {menu ? (
            <IconButton
              edge="start"
              className={`papi-menuButton ${className ?? ''}`}
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenuButtonClick}
            >
              <MenuIcon />
            </IconButton>
          ) : undefined}
          {children ? <div className="papi-menu-children">{children}</div> : undefined}
          {menu ? (
            <Drawer
              className={`papi-menu-drawer ${className ?? ''}`}
              anchor="left"
              variant="persistent"
              open={isMenuOpen}
              onClose={handleMenuItemClick}
              PaperProps={{
                className: 'papi-menu-drawer-paper',
                style: {
                  top: toolbarHeight,
                },
              }}
            >
              <GridMenu
                className={className}
                commandHandler={toolbarCommandHandler}
                multiColumnMenu={menu}
              />
            </Drawer>
          ) : undefined}
        </MuiToolbar>
      </AppBar>
    </div>
  );
}
