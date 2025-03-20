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
import { cn } from '@/utils/shadcn-ui.util';
import { MenuIcon } from 'lucide-react';
import {
  GroupsInMultiColumnMenu,
  Localized,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  MultiColumnMenu,
} from 'platform-bible-utils';
import { PropsWithChildren } from 'react';
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
      .map((item: Localized<MenuItemContainingCommand | MenuItemContainingSubmenu>) =>
        'command' in item ? (
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
        ),
      );

    return groupItems;
  });
};

export type TabDropdownMenuProps = PropsWithChildren & {
  /** The handler to use for menu commands */
  commandHandler: CommandHandler;

  /** The menu data to show on the dropdown menu */
  menuData: Localized<MultiColumnMenu>;

  /** Defines a string value that labels the current element */
  tabLabel: string;

  /** Additional css class(es) to help with unique styling of the tab dropdown menu */
  className?: string;
};

export default function TabDropdownMenu({
  commandHandler,
  menuData,
  tabLabel,
  className,
  children,
}: TabDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={tabLabel}
        className={cn('tw-cursor-pointer', className)}
        asChild
      >
        {children ?? <MenuIcon />}
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
