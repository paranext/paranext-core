import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
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
import { cn } from '@/utils/shadcn-ui.util';
import { MenuIcon } from 'lucide-react';
import {
  GroupsInMultiColumnMenu,
  Localized,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  MultiColumnMenu,
} from 'platform-bible-utils';
import { ReactNode } from 'react';
import { CommandHandler } from './platform-menubar.component';

const getSubMenuKeyForId = (
  groups: Localized<GroupsInMultiColumnMenu>,
  id: string,
): string | undefined => {
  return Object.entries(groups).find(
    ([, value]) => 'menuItem' in value && value.menuItem === id,
  )?.[0];
};

const getGroupContent = (
  groups: Localized<GroupsInMultiColumnMenu>,
  items: Localized<(MenuItemContainingCommand | MenuItemContainingSubmenu)[]>,
  columnOrSubMenuKey: string | undefined,
  commandHandler: CommandHandler,
) => {
  if (!columnOrSubMenuKey) return undefined;

  const sortedGroupsForColumn = Object.entries(groups)
    .filter(
      ([key, group]) =>
        ('column' in group && group.column === columnOrSubMenuKey) || key === columnOrSubMenuKey,
    )
    .sort(([, a], [, b]) => a.order - b.order);

  return sortedGroupsForColumn.flatMap(([groupKey]) => {
    const groupItems = items
      .filter((item) => item.group === groupKey)
      .sort((a, b) => a.order - b.order)
      .map((item: Localized<MenuItemContainingCommand | MenuItemContainingSubmenu>) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {'command' in item ? (
                  <DropdownMenuItem
                    key={item.command}
                    onClick={() => {
                      commandHandler(item);
                    }}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuSub key={item.id}>
                    <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>

                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {getGroupContent(
                          groups,
                          items,
                          getSubMenuKeyForId(groups, item.id),
                          commandHandler,
                        )}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                )}
              </TooltipTrigger>
              {item.tooltip && <TooltipContent>{item.tooltip}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        );
      });

    return groupItems;
  });
};

export type TabDropdownMenuProps = {
  /** The handler to use for menu commands */
  commandHandler: CommandHandler;

  /** The menu data to show on the dropdown menu */
  menuData: Localized<MultiColumnMenu>;

  /** Defines a string value that labels the current element */
  tabLabel: string;

  /** Optional icon for the dropdown menu trigger. Defaults to hamburger icon. */
  icon?: ReactNode;

  /** Additional css class(es) to help with unique styling of the tab dropdown menu */
  className?: string;

  /** Optional unique identifier */
  id?: string;
};

/**
 * Dropdown menu designed to be used with Platform.Bible menu data. Column headers are ignored.
 * Column data is separated by a horizontal divider, so groups are not distinguishable. Tooltips are
 * displayed on hovering over menu items, if a tooltip is defined for them.
 *
 * A child component can be passed in to show as an icon on the menu trigger button.
 */
export default function TabDropdownMenu({
  commandHandler,
  menuData,
  tabLabel,
  icon,
  className,
  id,
}: TabDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={tabLabel}
        className={cn('tw-cursor-pointer', className)}
        asChild
        id={id}
      >
        {icon ?? <MenuIcon />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="tw-z-[250]">
        {Object.entries(menuData.columns)
          .filter(([, column]) => typeof column === 'object')
          .sort(([, a], [, b]) => {
            if (typeof a === 'boolean' || typeof b === 'boolean') return 0;
            return a.order - b.order;
          })
          .map(([columnKey], index, array) => (
            <>
              <DropdownMenuGroup key={columnKey}>
                {getGroupContent(menuData.groups, menuData.items, columnKey, commandHandler)}
              </DropdownMenuGroup>

              {index < array.length - 1 && <DropdownMenuSeparator />}
            </>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
