import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { MenuIcon } from 'lucide-react';
import {
  GroupsInMultiColumnMenu,
  Localized,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  MultiColumnMenu,
} from 'platform-bible-utils';
import { Fragment, ReactNode, useId } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';
import {
  getMenuSectionsWithItems,
  getSubMenuGroupKeyForMenuItemId,
  isGroupUnderColumnOrSubMenu,
} from './menu.util';
import { SelectMenuItemHandler } from './platform-menubar.component';
import MenuItemIcon from './menu-icon.component';

const getGroupContent = (
  groups: Localized<GroupsInMultiColumnMenu>,
  items: Localized<(MenuItemContainingCommand | MenuItemContainingSubmenu)[]>,
  columnOrSubMenuKey: string | undefined,
  onSelectMenuItem: SelectMenuItemHandler,
) => {
  if (!columnOrSubMenuKey) return undefined;

  const sortedGroupsForColumn = Object.entries(groups)
    .filter(([key, group]) => isGroupUnderColumnOrSubMenu(key, group, columnOrSubMenuKey))
    .sort(([, a], [, b]) => a.order - b.order);

  return sortedGroupsForColumn.flatMap(([groupKey]) => {
    const groupItems = items
      .filter((item) => item.group === groupKey)
      .sort((a, b) => a.order - b.order)
      .map((item: Localized<MenuItemContainingCommand | MenuItemContainingSubmenu>) => {
        // `DropdownMenuSub` is a Radix context provider that renders no DOM node of its own, so a
        // `TooltipTrigger asChild` wrapped around it drops every cloned prop (including
        // `aria-describedby`) instead of reaching the trigger that actually renders. The submenu
        // branch attaches the tooltip to `DropdownMenuSubTrigger` itself instead, which is the
        // element the tooltip needs to describe anyway.
        if ('command' in item) {
          return (
            <Tooltip key={`tooltip-${item.label}-${item.command}`}>
              <TooltipTrigger asChild>
                <DropdownMenuItem
                  key={`dropdown-menu-item-${item.label}-${item.command}`}
                  onClick={() => {
                    // Since the item has a command, we know it is a MenuItemContainingCommand.
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    onSelectMenuItem(item as MenuItemContainingCommand);
                  }}
                >
                  {item.iconPathBefore && (
                    <MenuItemIcon icon={item.iconPathBefore} menuLabel={item.label} leading />
                  )}
                  {item.label}
                  {item.iconPathAfter && (
                    <MenuItemIcon icon={item.iconPathAfter} menuLabel={item.label} />
                  )}
                  {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
                </DropdownMenuItem>
              </TooltipTrigger>
              {item.tooltip && <TooltipContent>{item.tooltip}</TooltipContent>}
            </Tooltip>
          );
        }

        return (
          <DropdownMenuSub key={`dropdown-menu-sub-${item.label}-${item.id}`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
              </TooltipTrigger>
              {item.tooltip && <TooltipContent>{item.tooltip}</TooltipContent>}
            </Tooltip>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {getGroupContent(
                  groups,
                  items,
                  getSubMenuGroupKeyForMenuItemId(groups, item.id),
                  onSelectMenuItem,
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        );
      });

    return groupItems;
  });
};

export type TabDropdownMenuProps = {
  /** The handler to use for menu commands */
  onSelectMenuItem: SelectMenuItemHandler;

  /** The menu data to show on the dropdown menu */
  menuData: Localized<MultiColumnMenu>;

  /** Defines a string value that labels the current element */
  tabLabel: string;

  /** Optional icon for the dropdown menu trigger. Defaults to hamburger icon. */
  icon?: ReactNode;

  /** Additional css class(es) to help with unique styling of the tab dropdown menu */
  className?: string;

  /**
   * Whether to head each section with its column label. Only takes effect when two or more sections
   * have items, since a lone section has nothing to be told apart from.
   *
   * Defaults to `false`, so a menu built by hand keeps its column labels hidden. Platform.Bible's
   * tab chrome — `TabToolbar` and `TabFloatingMenu` — turns it on for the contributed menu data it
   * renders.
   */
  showSectionHeadings?: boolean;

  /** Style variant for the app menubar component. */
  variant?: 'default' | 'muted';

  buttonVariant?: 'default' | 'ghost' | 'outline' | 'secondary';

  /** Optional unique identifier */
  id?: string;
};

/**
 * Dropdown menu for Platform.Bible menu data. Each column that has items is a section, divided from
 * the next by a line; columns without items are left out. Groups within a column are not
 * distinguished. Items show their tooltip on hover and their `shortcut`, if any, at the end of the
 * row. With `showSectionHeadings`, each section is headed by its column label.
 *
 * A child component can be passed in to show as an icon on the menu trigger button.
 */
export default function TabDropdownMenu({
  onSelectMenuItem,
  menuData,
  tabLabel,
  icon,
  className,
  showSectionHeadings = false,
  variant,
  buttonVariant = 'ghost',
  id,
}: TabDropdownMenuProps) {
  const headingIdPrefix = useId();
  const sections = getMenuSectionsWithItems(menuData);
  const showHeadings = showSectionHeadings && sections.length > 1;

  return (
    <DropdownMenu variant={variant}>
      <DropdownMenuTrigger aria-label={tabLabel} className={className} asChild id={id}>
        <Button variant={buttonVariant} size="icon">
          {icon ?? <MenuIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" style={{ zIndex: Z_INDEX_ABOVE_DOCK }}>
        {sections.map(({ columnKey, label }, index) => {
          const headingId = `${headingIdPrefix}-${columnKey}`;
          return (
            <Fragment key={columnKey}>
              <DropdownMenuGroup aria-labelledby={showHeadings ? headingId : undefined}>
                {showHeadings && <DropdownMenuLabel id={headingId}>{label}</DropdownMenuLabel>}
                <TooltipProvider>
                  {getGroupContent(menuData.groups, menuData.items, columnKey, onSelectMenuItem)}
                </TooltipProvider>
              </DropdownMenuGroup>

              {index < sections.length - 1 && <DropdownMenuSeparator />}
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
