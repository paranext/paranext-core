import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import Menu from '@mui/material/Menu';
import MenuItemList, { GroupedMenuPropsBase } from '@/components/grouped-menu-item-list.component';
import '@/components/context-menu.component.css';

export type ContextMenuProps = GroupedMenuPropsBase & {
  /** Additional css classes to help with styling of the context menu */
  className?: string;
};

/**
 * A component that wraps its children, making them the "target" of a context menu so that the
 * context menu is displayed when the target is right-clicked.
 *
 * @param {ContextMenuProps & PropsWithChildren} props - The properties for the ContextMenu
 *   component which define what menu items to display and supply a command handler for when a menu
 *   item is clicked.
 * @returns {JSX.Element} The ContextMenu component (including the wrapped children)
 */
export default function ContextMenu({
  className,
  commandHandler,
  menuDefinition,
  children,
}: PropsWithChildren<ContextMenuProps>) {
  const [contextMenuPosition, setContextMenuPosition] = React.useState<
    | {
        mouseX: number;
        mouseY: number;
      }
    | undefined
  >(undefined);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      setContextMenuPosition(
        contextMenuPosition === undefined
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
            }
          : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
            // Other native context menus might behave different.
            // With this behavior we prevent re-locating existing context menus.
            undefined,
      );
    },
    [contextMenuPosition],
  );

  const handleClose = useCallback(() => {
    setContextMenuPosition(undefined);
  }, []);

  const anchorPosition = useMemo(() => {
    if (contextMenuPosition !== undefined) {
      return { top: contextMenuPosition.mouseY, left: contextMenuPosition.mouseX };
    }
    return undefined;
  }, [contextMenuPosition]);

  // If no menu items or children, we don't want to display the context menu at all.
  return (menuDefinition?.items?.length ?? 0) === 0 || !children ? (
    children
  ) : (
    <div
      className={`papi-context-menu-target ${className ?? ''}`}
      onContextMenu={handleContextMenu}
    >
      {children}
      <Menu
        className={`papi-context-menu ${className ?? ''}`}
        open={contextMenuPosition !== undefined}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
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
