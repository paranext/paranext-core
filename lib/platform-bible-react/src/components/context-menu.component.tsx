import React from 'react';
import Menu from '@mui/material/Menu';
import SimpleMenu, { MenuItemListProps } from './menu-item-list.component';
import './context-menu.component.css';

export default function ContextMenu(menuProps: MenuItemListProps) {
  const { className, commandHandler, items } = menuProps;

  const [contextMenu, setContextMenu] = React.useState<
    | {
        mouseX: number;
        mouseY: number;
      }
    | undefined
  >(undefined);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === undefined
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent re-locating existing context menus.
          undefined,
    );
  };

  const handleClose = () => {
    setContextMenu(undefined);
  };

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
      children
      <Menu
        className={`${className} papi-context-menu`}
        open={contextMenu !== undefined}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== undefined
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <SimpleMenu items={items} commandHandler={commandHandler} onClick={handleClose} />
      </Menu>
    </div>
  );
}
