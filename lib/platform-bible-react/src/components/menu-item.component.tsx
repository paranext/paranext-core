import {
  MenuItem as MuiMenuItem,
  ListItemText as MuiListItemText,
  ListItemIcon as MuiListItemIcon,
} from '@mui/material';
import './menu-item.component.css';
import { PropsWithChildren } from 'react';

export type Command = {
  /** Text (displayable in the UI) as the name of the command */
  name: string;

  /** Command to execute (string.string) */
  command: string;
};

export interface CommandHandler {
  (command: Command): void;
}

export type MenuItemProps = Omit<MenuItemInfo, 'command'> &
  PropsWithChildren<{
    /** Optional unique identifier */
    id?: string;

    onClick: () => void;
  }>;

export type MenuItemInfo = Command & {
  /**
   * If specified, menu item will be inset if it does not have a leading icon.
   *
   * @default true
   */
  allowForLeadingIcons?: boolean;
  /**
   * If specified, the path to the icon image to display on the leading side of the menu text.
   *
   * @default undefined (no leading icon will be shown)
   */
  iconPathBefore?: string;
  /**
   * If specified, the path to the icon image to display on the trailing side of the menu text.
   *
   * @default undefined (no trailing icon will be shown)
   */
  iconPathAfter?: string;
  /**
   * If true, list item is focused during the first mount
   *
   * @default false
   */
  hasAutoFocus?: boolean;

  /** Additional css classes to help with unique styling of the button */
  className?: string;

  /**
   * If true, compact vertical padding designed for keyboard and mouse input is used.
   *
   * @default true
   */
  isDense?: boolean;

  /**
   * If true, the left and right padding is removed
   *
   * @default false
   */
  hasDisabledGutters?: boolean;

  /**
   * If true, a 1px light border is added to bottom of menu item
   *
   * @default false
   */
  hasDivider?: boolean;

  /** Help identify which element has keyboard focus */
  focusVisibleClassName?: string;
};

function getIcon(icon: string | undefined, menuLabel: string, leading: boolean) {
  return icon ? (
    <MuiListItemIcon className={`papi-menu-icon-${leading ? 'leading' : 'trailing'}`}>
      <img src={icon} alt={`${leading ? 'Leading' : 'Trailing'} icon for ${menuLabel}`} />
    </MuiListItemIcon>
  ) : undefined;
}

function MenuItem(props: MenuItemProps) {
  const {
    onClick,
    name,
    allowForLeadingIcons = true,
    iconPathBefore = undefined,
    iconPathAfter = undefined,
    hasAutoFocus = false,
    className,
    isDense = true,
    hasDisabledGutters = false,
    hasDivider = false,
    focusVisibleClassName,
    id,
    children,
  } = props;

  return (
    <MuiMenuItem
      sx={{ lineHeight: 0.8 }}
      autoFocus={hasAutoFocus}
      className={className}
      dense={isDense}
      disableGutters={hasDisabledGutters}
      divider={hasDivider}
      focusVisibleClassName={focusVisibleClassName}
      onClick={onClick}
      id={id}
    >
      {name ? (
        <>
          {getIcon(iconPathBefore, name, true)}
          <MuiListItemText primary={name} inset={!iconPathBefore && allowForLeadingIcons} />
          {getIcon(iconPathAfter, name, false)}
        </>
      ) : (
        children
      )}
    </MuiMenuItem>
  );
}

export default MenuItem;
