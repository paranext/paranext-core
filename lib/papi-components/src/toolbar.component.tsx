import { useState, useRef, ReactElement } from 'react';
import { AppBar, Toolbar as MuiToolbar, IconButton, Drawer } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import GridMenu, { GridMenuProps } from './grid-menu.component';
import './toolbar.component.css';

export type ToolbarProps = {
  /**
   * The optional grid menu to display. If not specified, the "hamburger" menu will not display.
   */
  menu?: GridMenuProps;

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
      <MuiToolbar className="toolbar" ref={toolbarRef} variant="dense">
        {props.menu ? (
          <IconButton
            edge="start"
            className="menuButton"
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
            className="menu-drawer"
            anchor="left"
            variant="temporary"
            open={menuOpen}
            onClose={() => {
              if (menuOpen) setMenuOpen(false);
            }}
            PaperProps={{ style: { top: '40px', width: '95%', height: '170px' } }}
          >
            <GridMenu columns={props.menu?.columns} />
          </Drawer>
        ) : null}
      </MuiToolbar>
    </AppBar>
  );
}
