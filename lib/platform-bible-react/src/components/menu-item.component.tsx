import {
  MenuItem as MuiMenuItem,
  ListItemText as MuiListItemText,
  ListItemIcon as MuiListItemIcon,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { MouseEvent, PropsWithChildren } from 'react';
import { Localized, ReferencedItem, SingleColumnMenu } from 'platform-bible-utils';
import '@/components/menu-item.component.css';

type MenuItemInfoBase = {
  /** Text (displayable in the UI) as the name of the menu item */
  label: string;
  /** Text to display when the mouse hovers over the menu item */
  tooltip?: string;
};

export type Command = MenuItemInfoBase & {
  /** Command to execute (string.string) */
  command: string;
};

type SubMenu = MenuItemInfoBase & {
  /** Command to execute (string.string) */
  items: MenuItemInfo[];
};

export interface CommandHandler {
  (command: Command): void;
}

export type MenuPropsBase = {
  /*
   * The JSON defining the menu whose items are to be rendered. This will typically be one of the
   * menus in the "defs" in a Platform.Bible menu (see PlatformMenus). The schema for this is
   * menuDocumentSchema (at the end of menus.model.ts). Note that while this is a
   * "SingleColumnMenu", somewhat bizarrely, a MultiColumnMenu is a SingleColumnMenu, so it really
   * could be a MultiColumnMenu, in which case, column had better be defined so it can be used
   * to filter out the actual groups and items to display on the column.
   */
  menuDefinition: Localized<SingleColumnMenu>;

  commandHandler: CommandHandler;

  /**
   * Additional action to perform when any menu item is clicked. Allows the caller to handle event
   * (e.g., to close the menu).
   */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

export type MenuItemListProps = MenuPropsBase & {
  /** Optional unique (column) identifier */
  columnId?: ReferencedItem;
};

export type MenuItemProps = Omit<MenuItemInfo, 'command'> &
  PropsWithChildren<{
    /** Optional unique identifier */
    id?: string;

    onClick: (event: MouseEvent<HTMLElement>) => void;
  }>;

type MenuItemInfo = (Command | SubMenu) & {
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

  /** Additional css classes to help with unique styling of the menu item */
  className?: string;

  /**
   * If true, the menu item will appear disabled and it will not respond to clicks or mouse hovers.
   *
   * @default false
   */
  isDisabled?: boolean;

  /**
   * If true, compact vertical padding designed for keyboard and mouse input is used.
   *
   * @default true
   */
  isDense?: boolean;

  /**
   * If true, a right-arrow icon will be displayed (iconPathAfter, if specified, will be ignored).
   *
   * @default false
   */
  isSubMenuParent?: boolean;

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

  /** If it's a submenu, it should have the items property */
  items?: MenuItemInfo[];
};

function getIcon(icon: string | undefined, menuLabel: string, leading: boolean) {
  return icon ? (
    <MuiListItemIcon className={`papi-menu-icon-${leading ? 'leading' : 'trailing'}`}>
      <img src={icon} alt={`${leading ? 'Leading' : 'Trailing'} icon for ${menuLabel}`} />
    </MuiListItemIcon>
  ) : undefined;
}

export default function MenuItem(props: MenuItemProps) {
  const {
    onClick,
    label,
    tooltip,
    allowForLeadingIcons = true,
    iconPathBefore = undefined,
    iconPathAfter = undefined,
    hasAutoFocus = false,
    className,
    isDisabled = false,
    isDense = true,
    isSubMenuParent = false,
    hasDisabledGutters = false,
    hasDivider = false,
    focusVisibleClassName,
    id,
    children,
  } = props;

  const menuItem = (
    <MuiMenuItem
      sx={{ lineHeight: 0.8 }}
      autoFocus={hasAutoFocus}
      className={className}
      disabled={isDisabled}
      dense={isDense}
      disableGutters={hasDisabledGutters}
      divider={hasDivider}
      focusVisibleClassName={focusVisibleClassName}
      onClick={onClick}
      id={id}
    >
      {label ? (
        <>
          {getIcon(iconPathBefore, label, true)}
          <MuiListItemText primary={label} inset={!iconPathBefore && allowForLeadingIcons} />
          {isSubMenuParent ? (
            <MuiListItemIcon className="papi-menu-icon-trailing">
              <ArrowRightIcon />
            </MuiListItemIcon>
          ) : (
            getIcon(iconPathAfter, label, false)
          )}
        </>
      ) : (
        children
      )}
    </MuiMenuItem>
  );

  return tooltip ? (
    <Tooltip title={tooltip} placement="right">
      <div>{menuItem}</div>
    </Tooltip>
  ) : (
    menuItem
  );
}
