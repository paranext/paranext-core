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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import {
  GroupsInMultiColumnMenu,
  Localized,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  MultiColumnMenu,
} from 'platform-bible-utils';
import { RefObject, useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export type MenuItemInfoBase = {
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
      .map((item: Localized<MenuItemContainingCommand | MenuItemContainingSubmenu>) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {'command' in item ? (
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
                )}
              </TooltipTrigger>
              {item.tooltip && <TooltipContent>{item.tooltip}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        );
      });

    const itemsWithSeparator = [...groupItems];
    if (groupItems.length > 0 && index < sortedGroupsForColumn.length - 1) {
      itemsWithSeparator.push(<MenubarSeparator key={`${groupKey}-separator`} />);
    }

    return itemsWithSeparator;
  });
};

type PlatformMenubarProps = {
  /** Menu data that is used to populate the Menubar component. */
  menuData: Localized<MultiColumnMenu>;

  /** The handler to use for menu commands. */
  commandHandler: CommandHandler;

  /**
   * Optional callback function that is executed whenever a menu on the Menubar is opened or closed.
   * Helpful for handling updates to the menu, as changing menu data when the menu is opened is not
   * desirable.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /** Style variant for the app menubar component. */
  variant?: 'default' | 'muted';
};

/** Menubar component tailored to work with Platform.Bible menu data */
export function PlatformMenubar({
  menuData,
  commandHandler,
  onOpenChange,
  variant,
}: PlatformMenubarProps) {
  // These refs will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const menubarRef = useRef<HTMLDivElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const projectMenuRef = useRef<HTMLButtonElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const windowMenuRef = useRef<HTMLButtonElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const layoutMenuRef = useRef<HTMLButtonElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const helpMenuRef = useRef<HTMLButtonElement>(undefined!);

  const getRefForColumn = (columnKey: string) => {
    switch (columnKey) {
      case 'platform.project':
        return projectMenuRef;
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
        simulateKeyPress(projectMenuRef, [escKey]);
        break;
      case 'alt+p':
        projectMenuRef.current?.focus();
        simulateKeyPress(projectMenuRef, [escKey, spaceKey]);
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

  useEffect(() => {
    if (!onOpenChange || !menubarRef.current) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-state' && mutation.target instanceof HTMLElement) {
          const state = mutation.target.getAttribute('data-state');

          if (state === 'open') {
            onOpenChange(true);
          } else {
            onOpenChange(false);
          }
        }
      });
    });

    const menubarElement = menubarRef.current;
    const dataStateAttributes = menubarElement.querySelectorAll('[data-state]');

    dataStateAttributes.forEach((element) => {
      observer.observe(element, { attributes: true });
    });

    return () => observer.disconnect();
  }, [onOpenChange]);

  if (!menuData) return undefined;

  return (
    <Menubar ref={menubarRef} className="pr-twp tw-border-0 tw-bg-transparent" variant={variant}>
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
            <MenubarContent
              className="tw-z-[250]" // Need to get over the floating web view z-index 200
            >
              {getMenubarContent(menuData.groups, menuData.items, columnKey, commandHandler)}
            </MenubarContent>
          </MenubarMenu>
        ))}
    </Menubar>
  );
}

export default PlatformMenubar;
