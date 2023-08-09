import { MenuItem as MuiMenuItem } from '@mui/material';
import './menu-item.component.css';
import { PropsWithChildren } from 'react';

export type Command = {
  /**
   * Text (displayable in the UI) as the name of the command
   */
  name: string;

  /**
   * Command to execute (string.string)
   */
  // Command is embedded into MenuItemInfo, and GridMenu is using this command property but MenuItem doesn't need it
  // eslint-disable-next-line react/no-unused-prop-types
  command: string;
};

export interface CommandHandler {
  (command: Command): void;
}

export type MenuItemProps = MenuItemInfo & {
  onClick: () => void;
};

export type MenuItemInfo = Command &
  PropsWithChildren<{
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
     * @default true
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
  }>;

function MenuItem(props: MenuItemProps) {
  const {
    onClick,
    name,
    hasAutoFocus = false,
    className,
    isDense = true,
    hasDisabledGutters = false,
    hasDivider = false,
    focusVisibleClassName,
  } = props;

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
      {name}
    </MuiMenuItem>
  );
}

export default MenuItem;
