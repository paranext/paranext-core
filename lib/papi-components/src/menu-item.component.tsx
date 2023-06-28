import { MenuItem as MuiMenuItem } from '@mui/material';
import './menu-item.component.css';
import { PropsWithChildren, MouseEventHandler } from 'react';

export type MenuItemProps = PropsWithChildren<{
  /**
   * If true, list item is focused during the first mount
   * @default false
   */
  hasAutoFocus?: boolean;

  /**
   * Additional css classes to help with unique styling of the button
   */
  className?: string;

  /**
   * If true, compact vertical padding designed for keyboard and mouse
   * input is used.
   * @default false
   */
  isDense?: boolean;

  /**
   * If true, the left and right padding is removed
   * @default false
   */
  hasDisabledGutters?: boolean;

  /**
   * If true, a 1px light border is added to bottom of menu item
   * @default false
   */
  hasDivider?: boolean;

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
  hasAutoFocus = false,
  className,
  isDense = false,
  hasDisabledGutters = false,
  hasDivider = false,
  focusVisibleClassName,
  onClick,
  children,
}: MenuItemProps) {
  return (
    <MuiMenuItem
      autoFocus={hasAutoFocus}
      className={className}
      dense={isDense}
      disableGutters={hasDisabledGutters}
      divider={hasDivider}
      focusVisibleClassName={focusVisibleClassName}
      onClick={onClick}
    >
      {children}
    </MuiMenuItem>
  );
}

export default MenuItem;
