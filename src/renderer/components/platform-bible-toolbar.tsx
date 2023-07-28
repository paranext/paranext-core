import { useState, useRef, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import PlatformBibleMenu from './platform-bible-menu';
import './platform-bible-toolbar.css';

export default function PlatformBibleToolbar() {
  // This ref will always be defined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClose = useCallback(() => {
    if (menuOpen) setMenuOpen(false);
  }, [menuOpen, setMenuOpen]);

  return (
    <AppBar position="static">
      <Toolbar className="toolbar" ref={toolbarRef} variant="dense">
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
        <Typography className="title" variant="h6" noWrap>
          Scripture Reference Control goes here.
        </Typography>

        <Drawer
          className="menu-drawer"
          anchor="left"
          variant="temporary"
          open={menuOpen}
          onClose={handleMenuClose}
          PaperProps={{ style: { top: '40px', width: '95%', height: 'fit-content' } }}
        >
          <PlatformBibleMenu closeMenu={handleMenuClose} />
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
