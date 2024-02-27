import React, { PropsWithChildren } from 'react';
import Menu from '@mui/material/Menu';
import MenuItemList, { GroupedMenuItemListProps } from './grouped-menu-item-list.component';
import './context-menu.component.css';

export type ContextMenuProps = GroupedMenuItemListProps & {
  /** Additional css classes to help with styling of the context menu */
  className?: string;
};

export default function ContextMenu(menuProps: PropsWithChildren<ContextMenuProps>) {
  const { className, commandHandler, menuDefinition, children } = menuProps;

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

  // If no menu items or children, we don't want to display the context menu at all.
  return (menuDefinition?.items?.length ?? 0) === 0 || !children ? (
    children
  ) : (
    <div
      className={`papi-context-menu-target ${className ?? ''}`}
      onContextMenu={handleContextMenu}
      style={{ cursor: 'context-menu' }}
    >
      {children}
      <Menu
        className={`papi-context-menu ${className ?? ''}`}
        open={contextMenu !== undefined}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== undefined
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItemList
          menuDefinition={menuDefinition}
          commandHandler={commandHandler}
          onClick={handleClose}
        />
      </Menu>
    </div>
  );
}
