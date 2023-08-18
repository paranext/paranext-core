import { useRef, useState, useCallback, useEffect, MouseEvent, PropsWithChildren } from 'react';
import { AppBar, Toolbar as MuiToolbar, IconButton, Drawer } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import GridMenu, { GridMenuInfo } from './grid-menu.component';
import './toolbar.component.css';
import { Command, CommandHandler } from './menu-item.component';

export interface DataHandler {
  (isSupportAndDevelopment: boolean): GridMenuInfo;
}

export type ToolbarProps = PropsWithChildren<{
  /**
   * The handler to use for menu commands (and eventually toolbar commands).
   */
  commandHandler: CommandHandler;

  /**
   * The handler to use for menu data if there is no menu provided.
   */
  dataHandler?: DataHandler;

  /**
   *  Optional unique identifier
   */
  id?: string;

  /**
   * The optional grid menu to display. If not specified, the "hamburger" menu will not display.
   */
  menu?: GridMenuInfo;

  /**
   * Additional css classes to help with unique styling of the toolbar
   */
  className?: string;
}>;

export default function Toolbar({
  menu: propsMenu,
  dataHandler,
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

  const containerRef = useRef<HTMLDivElement>(null);

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

  let menu = propsMenu;
  if (!menu && dataHandler) menu = dataHandler(hasShiftModifier);

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
          ) : null}
          {children ? <div className="papi-menu-children">{children}</div> : null}
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
              <GridMenu commandHandler={toolbarCommandHandler} columns={menu.columns} />
            </Drawer>
          ) : null}
        </MuiToolbar>
      </AppBar>
    </div>
  );
}
