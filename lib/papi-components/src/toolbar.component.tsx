import { useRef, useState, useCallback, useEffect, ReactElement, MouseEvent } from 'react';
import { AppBar, Toolbar as MuiToolbar, IconButton, Drawer } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import GridMenu, { GridMenuInfo } from './grid-menu.component';
import './toolbar.component.css';

export interface CommandHandler {
  (command: Command): void;
}

export interface DataHandler {
  (isSupportAndDevelopment: boolean): GridMenuInfo;
}

export type Command = {
  /**
   * Text (displayable in the UI) as the name of the command
   */
  name: string;

  /**
   * Command to execute (string.string)
   */
  command: string;
};

export type ToolbarProps = {
  /**
   * The handler to use for menu commands (and eventually toolbar commands).
   */
  commandHandler: CommandHandler;

  /**
   * The handler to use for menu data if there is no menu provided.
   */
  dataHandler?: DataHandler;

  /**
   * The optional grid menu to display. If not specified, the "hamburger" menu will not display.
   */
  menu?: GridMenuInfo;

  /**
   * Additional css classes to help with unique styling of the toolbar
   */
  className?: string;

  /**
   * The controls to include on the toolbar.
   */
  children?: ReactElement<any, any>;
};

export default function Toolbar(props: ToolbarProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hasShiftModifier, setHasShiftModifier] = useState(false);

  const handleMenuClose = useCallback(() => {
    if (isMenuOpen) setMenuOpen(false);
    setHasShiftModifier(false);
  }, [isMenuOpen, setMenuOpen]);

  const handleMenuButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setMenuOpen((prevIsOpen) => {
        const isOpening = !prevIsOpen;
        if (isOpening && e.shiftKey) setHasShiftModifier(true);
        return isOpening;
      });
    },
    [setMenuOpen, setHasShiftModifier],
  );

  // This ref will always be defined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const containerRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  const [toolbarHeightRef, setToolbarHeightRef] = useState(0);
  useEffect(() => {
    if (isMenuOpen && containerRef.current) {
      setToolbarHeightRef(containerRef.current?.clientHeight);
    }
  }, [isMenuOpen, containerRef.current]);

  function ToolbarCommandHandler(command: Command) {
    handleMenuClose();
    return props.commandHandler(command);
  }

  let menu = props.menu;
  if (!menu && props.dataHandler) menu = props.dataHandler(hasShiftModifier);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <AppBar position="static">
        <MuiToolbar
          className={`papi-toolbar ${props.className ?? ''}`}
          ref={toolbarRef}
          variant="dense"
        >
          {menu ? (
            <IconButton
              edge="start"
              className={`papi-menuButton ${props.className ?? ''}`}
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenuButtonClick}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          {props.children ? (
            <div ref={childrenRef} style={{ padding: 10 }}>
              {props.children}
            </div>
          ) : null}
          {menu ? (
            <Drawer
              className={`papi-menu-drawer ${props.className ?? ''}`}
              anchor="left"
              variant="persistent"
              open={isMenuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  top: toolbarHeightRef,
                  height: 'fit-content',
                },
              }}
            >
              <GridMenu commandHandler={ToolbarCommandHandler} columns={menu.columns} />
            </Drawer>
          ) : null}
        </MuiToolbar>
      </AppBar>
    </div>
  );
}
