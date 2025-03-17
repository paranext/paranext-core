import { MultiColumnMenuProvider } from '@/components/mui/hamburger-menu-button.component';
import { CommandHandler } from '@/components/mui/menu-item.component';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/shadcn-ui/menubar';
import usePromise from '@/hooks/use-promise.hook';
import {
  GroupsInMultiColumnMenu,
  Localized,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  MultiColumnMenu,
} from 'platform-bible-utils';
import { RefObject, useCallback, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const simulateKeyPress = (ref: RefObject<HTMLButtonElement>, keys: KeyboardEventInit[]) => {
  setTimeout(() => {
    keys.forEach((key) => {
      ref.current?.dispatchEvent(new KeyboardEvent('keydown', key));
    });
  }, 0);
};

const getSubMenuKeyForId = (
  groups: Localized<GroupsInMultiColumnMenu>,
  id: string,
): string | undefined => {
  return Object.entries(groups).find(
    ([, value]) => 'menuItem' in value && value.menuItem === id,
  )?.[0];
};

const getMenubarContent = (
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

  return sortedGroupsForColumn.flatMap(([groupKey], index) => {
    const groupItems = items
      .filter((item) => item.group === groupKey)
      .sort((a, b) => a.order - b.order)
      .map((item: Localized<MenuItemContainingCommand | MenuItemContainingSubmenu>) =>
        'command' in item ? (
          <MenubarItem
            key={item.command}
            onClick={() => {
              commandHandler(item);
            }}
          >
            {item.label}
          </MenubarItem>
        ) : (
          <MenubarSub key={item.id}>
            <MenubarSubTrigger>{item.label}</MenubarSubTrigger>
            <MenubarSubContent>
              {getMenubarContent(
                groups,
                items,
                getSubMenuKeyForId(groups, item.id),
                commandHandler,
              )}
            </MenubarSubContent>
          </MenubarSub>
        ),
      );

    const itemsWithSeparator = [...groupItems];
    if (groupItems.length > 0 && index < sortedGroupsForColumn.length - 1) {
      itemsWithSeparator.push(<MenubarSeparator key={`${groupKey}-separator`} />);
    }

    return itemsWithSeparator;
  });
};

type PlatformMenubarProps = {
  /** The delegate to use to get the menu data. */
  menuProvider: MultiColumnMenuProvider;

  /** The handler to use for menu commands. */
  commandHandler: CommandHandler;

  /** Style variant for the app menubar component. */
  variant?: 'default' | 'muted';
};

/** Menubar component tailored to work with Platform.Bible menu data */
export default function PlatformMenubar({
  menuProvider,
  commandHandler,
  variant,
}: PlatformMenubarProps) {
  const [menuData] = usePromise(
    useCallback(async (): Promise<Localized<MultiColumnMenu>> => {
      return menuProvider?.(false);
    }, [menuProvider]),
    undefined,
  );

  // These refs will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const primaryMenuRef = useRef<HTMLButtonElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const windowMenuRef = useRef<HTMLButtonElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const layoutMenuRef = useRef<HTMLButtonElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const helpMenuRef = useRef<HTMLButtonElement>(undefined!);

  const getRefForColumn = (columnKey: string) => {
    switch (columnKey) {
      case 'paratext.paratext':
      case 'platform.project':
        return primaryMenuRef;
      case 'platform.window':
        return windowMenuRef;
      case 'platform.layout':
        return layoutMenuRef;
      case 'platform.help':
        return helpMenuRef;
      default:
        return undefined;
    }
  };

  // This is a quick and dirty way to implement some shortcuts by simulating key presses
  useHotkeys(['alt', 'alt+p', 'alt+l', 'alt+n', 'alt+h'], (event, handler) => {
    event.preventDefault();

    const escKey: KeyboardEventInit = { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true };
    const spaceKey: KeyboardEventInit = { key: ' ', code: 'Space', keyCode: 32, bubbles: true };

    switch (handler.hotkey) {
      case 'alt':
        simulateKeyPress(primaryMenuRef, [escKey]);
        break;
      case 'alt+p':
        primaryMenuRef.current?.focus();
        simulateKeyPress(primaryMenuRef, [escKey, spaceKey]);
        break;
      case 'alt+l':
        windowMenuRef.current?.focus();
        simulateKeyPress(windowMenuRef, [escKey, spaceKey]);
        break;
      case 'alt+n':
        layoutMenuRef.current?.focus();
        simulateKeyPress(layoutMenuRef, [escKey, spaceKey]);
        break;
      case 'alt+h':
        helpMenuRef.current?.focus();
        simulateKeyPress(helpMenuRef, [escKey, spaceKey]);
        break;
      default:
        break;
    }
  });

  if (!menuData) return undefined;

  return (
    <Menubar className="pr-twp tw-border-0 tw-bg-transparent" variant={variant}>
      {Object.entries(menuData.columns)
        .filter(([, column]) => typeof column === 'object')
        .sort(([, a], [, b]) => {
          if (typeof a === 'boolean' || typeof b === 'boolean') return 0;
          return a.order - b.order;
        })
        .map(([columnKey, column]) => (
          <MenubarMenu key={columnKey}>
            <MenubarTrigger ref={getRefForColumn(columnKey)}>
              {typeof column === 'object' && 'label' in column && column.label}
            </MenubarTrigger>
            <MenubarContent>
              {getMenubarContent(menuData.groups, menuData.items, columnKey, commandHandler)}
            </MenubarContent>
          </MenubarMenu>
        ))}
    </Menubar>
  );
}
