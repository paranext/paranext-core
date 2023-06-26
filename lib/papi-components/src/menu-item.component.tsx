import { MenuItem as MuiMenuItem } from '@mui/material';
import './menu-item.component.css';
import { PropsWithChildren, MouseEventHandler } from 'react';

export type MenuItemProps = PropsWithChildren<{
  /**
   * If true, list item is focused during the first mount
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Additional css classes to help with unique styling of the button
   */
  className?: string;

  /**
   * If true, compact vertical padding designed for keyboard and mouse
   * input is used.
   * @default false
   */
  dense?: boolean;

  /**
   * If true, the left and right padding is removed
   * @default false
   */
  disableGutters?: boolean;

  /**
   * If true, a 1px light border is added to bottom of menu item
   * @default false
   */
  divider?: boolean;

  /**
   * Help identify which element has keyboard focus
   */
  focusVisibleClassName?: string;

  /**
   * Optional click handler
   */
  onClick?: MouseEventHandler<HTMLLIElement> | undefined;
}>;

function MenuItem({
  autoFocus = false,
  dense = false,
  disableGutters = false,
  divider = false,
  focusVisibleClassName,
  className,
  onClick,
  children,
}: MenuItemProps) {
  return (
    <MuiMenuItem
      autoFocus={autoFocus}
      dense={dense}
      disableGutters={disableGutters}
      divider={divider}
      focusVisibleClassName={focusVisibleClassName}
      className={className}
      onClick={onClick}
    >
      {children}
    </MuiMenuItem>
  );
}

export default MenuItem;
