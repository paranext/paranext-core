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
import { MultiColumnMenuProvider } from '../mui/hamburger-menu-button.component';

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

export interface CommandHandler {
  (command: Command): void;
}

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

  const getColumnKeyForId = (
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
    columnKey: string | undefined,
  ) => {
    if (!columnKey) return undefined;

    const sortedGroupsForColumn = Object.entries(groups)
      .filter(
        ([key, group]) => ('column' in group && group.column === columnKey) || key === columnKey,
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
                {getMenubarContent(groups, items, getColumnKeyForId(groups, item.id))}
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
        console.log('yes');
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

  const simulateKeyPress = (ref: RefObject<HTMLButtonElement>) => {
    setTimeout(() => {
      ref.current?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true }),
      );
      ref.current?.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', code: 'Space', keyCode: 32, bubbles: true }),
      );
    }, 0);
  };

  useHotkeys(['alt+p', 'alt+l', 'alt+n', 'alt+h'], (event, handler) => {
    event.preventDefault();

    switch (handler.hotkey) {
      case 'alt+p':
        primaryMenuRef.current?.focus();
        simulateKeyPress(primaryMenuRef);
        break;
      case 'alt+l':
        windowMenuRef.current?.focus();
        simulateKeyPress(windowMenuRef);
        break;
      case 'alt+n':
        layoutMenuRef.current?.focus();
        simulateKeyPress(layoutMenuRef);
        break;
      case 'alt+h':
        helpMenuRef.current?.focus();
        simulateKeyPress(helpMenuRef);
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
              {getMenubarContent(menuData.groups, menuData.items, columnKey)}
            </MenubarContent>
          </MenubarMenu>
        ))}
    </Menubar>
  );
}
