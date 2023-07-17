import { useState, useRef, ReactElement } from 'react';
import { AppBar, Toolbar as MuiToolbar, IconButton, Drawer } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import GridMenu, { GridMenuInfo } from './grid-menu.component';
import './toolbar.component.css';

export interface CommandHandler {
  (command: Command): void;
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
  const [menuOpen, setMenuOpen] = useState(false);

  // This ref will always be defined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const toolbarRef = useRef<HTMLDivElement>(null);

  return (
    <AppBar position="static">
      <MuiToolbar
        className={`papi-toolbar ${props.className ?? ''}`}
        ref={toolbarRef}
        variant="dense"
      >
        {props.menu ? (
          <IconButton
            edge="start"
            className={`papi-menuButton ${props.className ?? ''}`}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setMenuOpen((prev) => !prev);
            }}
          >
            <MenuIcon />
          </IconButton>
        ) : null}
        {props.children}
        {props.menu ? (
          <Drawer
            className={`papi-menu-drawer ${props.className ?? ''}`}
            anchor="left"
            variant="temporary"
            open={menuOpen}
            onClose={() => {
              if (menuOpen) setMenuOpen(false);
            }}
            PaperProps={{ style: { top: '40px', width: '95%', height: '170px' } }}
          >
            <GridMenu commandHandler={props.commandHandler} columns={props.menu?.columns} />
          </Drawer>
        ) : null}
      </MuiToolbar>
    </AppBar>
  );
}
