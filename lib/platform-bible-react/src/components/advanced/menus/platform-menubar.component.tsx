import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
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
import { Localized, MenuItemContainingCommand, MultiColumnMenu } from 'platform-bible-utils';
import { ReactNode, RefObject, useEffect, useMemo, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';
import { ShortcutKeys } from '@/components/basics/shortcut-keys.component';
import {
  buildMenuTree,
  getLeadingIconSlot,
  GroupContent,
  joinGroupsWithSeparators,
  LeadingIconSlot,
  MenuGroupNode,
} from './menu.util';
import MenuItemIcon from './menu-icon.component';

/**
 * Callback function that is invoked when a user selects a menu item. Receives the full
 * `MenuItemContainingCommand` object as an argument.
 */
export interface SelectMenuItemHandler {
  (selectedMenuItem: MenuItemContainingCommand): void;
}

const simulateKeyPress = (ref: RefObject<HTMLButtonElement>, keys: KeyboardEventInit[]) => {
  setTimeout(() => {
    keys.forEach((key) => {
      ref.current?.dispatchEvent(new KeyboardEvent('keydown', key));
    });
  }, 0);
};

const createMenubarSeparator = (groupKey: string) => (
  <MenubarSeparator key={`separator-${groupKey}`} />
);

/**
 * Renders the items of the given groups in the order given, one entry per group. A column and a
 * submenu both join the entries with {@link joinGroupsWithSeparators}, so a separator only ever sits
 * between two groups that have items.
 *
 * @param groups The groups to render, already sorted by the groups' `order`, with their items
 *   sorted
 * @param leadingSlot The leading icon slot of the list these items render in. A submenu works out
 *   its own from its items.
 */
const getMenubarContent = (
  groups: MenuGroupNode[],
  onSelectMenuItem: SelectMenuItemHandler,
  leadingSlot: LeadingIconSlot,
): GroupContent<ReactNode>[] =>
  groups.map(({ groupKey, items }) => ({
    groupKey,
    items: items.map(({ item, subGroups = [] }) => {
      let menuEntry: ReactNode;
      if ('command' in item) {
        const itemContent = (
          <>
            <MenuItemIcon
              iconName={item.iconNameBefore}
              icon={item.iconPathBefore}
              menuLabel={item.label}
              leading
              leadingSlot={leadingSlot}
            />
            {item.label}
            <MenuItemIcon
              iconName={item.iconNameAfter}
              icon={item.iconPathAfter}
              menuLabel={item.label}
            />
            {item.shortcut && (
              <MenubarShortcut className="tw:ps-4">
                <ShortcutKeys hint={item.shortcut} />
              </MenubarShortcut>
            )}
          </>
        );
        // `onSelect` rather than `onClick`: Radix does not fire `onSelect` for a disabled item
        const handleSelect = () => {
          // Since the item has a command, we know it is a MenuItemContainingCommand.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          onSelectMenuItem(item as MenuItemContainingCommand);
        };
        menuEntry =
          item.checked !== undefined ? (
            <MenubarCheckboxItem
              key={`menubar-item-${item.label}-${item.command}`}
              checked={item.checked}
              disabled={item.disabled}
              onSelect={handleSelect}
            >
              {itemContent}
            </MenubarCheckboxItem>
          ) : (
            <MenubarItem
              key={`menubar-item-${item.label}-${item.command}`}
              disabled={item.disabled}
              onSelect={handleSelect}
            >
              {itemContent}
            </MenubarItem>
          );
      } else {
        menuEntry = (
          <MenubarSub key={`menubar-sub-${item.label}-${item.id}`}>
            <MenubarSubTrigger disabled={item.disabled}>
              <MenuItemIcon
                iconName={item.iconNameBefore}
                menuLabel={item.label}
                leading
                leadingSlot={leadingSlot}
              />
              {item.label}
              <MenuItemIcon iconName={item.iconNameAfter} menuLabel={item.label} />
            </MenubarSubTrigger>
            <MenubarSubContent>
              {joinGroupsWithSeparators(
                getMenubarContent(
                  subGroups,
                  onSelectMenuItem,
                  getLeadingIconSlot(
                    subGroups.flatMap((group) => group.items.map((node) => node.item)),
                  ),
                ),
                createMenubarSeparator,
              )}
            </MenubarSubContent>
          </MenubarSub>
        );
      }
      return (
        <Tooltip key={`tooltip-${item.label}-${'command' in item ? item.command : item.id}`}>
          <TooltipTrigger asChild>{menuEntry}</TooltipTrigger>
          {item.tooltip && <TooltipContent>{item.tooltip}</TooltipContent>}
        </Tooltip>
      );
    }),
  }));

type PlatformMenubarProps = {
  /** Menu data that is used to populate the Menubar component. */
  menuData: Localized<MultiColumnMenu>;

  /** The handler to use for menu commands. */
  onSelectMenuItem: SelectMenuItemHandler;

  /**
   * Optional callback function that is executed whenever a menu on the Menubar is opened or closed.
   * Helpful for handling updates to the menu, as changing menu data when the menu is opened is not
   * desirable.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /** Style variant for the app menubar component. */
  variant?: 'default' | 'muted';
};

/**
 * Menubar component tailored to work with Platform.Bible menu data. Items show their `shortcut`, if
 * any, at the end of the row.
 */
export function PlatformMenubar({
  menuData,
  onSelectMenuItem,
  onOpenChange,
  variant,
}: PlatformMenubarProps) {
  // These refs will always be defined — using undefined! avoids a null check on every use
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const menubarRef = useRef<HTMLDivElement>(undefined!);
  // Ref is always defined before use; the non-null assertion avoids redundant null checks
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const projectMenuRef = useRef<HTMLButtonElement>(undefined!);
  // Ref is always defined before use; the non-null assertion avoids redundant null checks
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const windowMenuRef = useRef<HTMLButtonElement>(undefined!);
  // Ref is always defined before use; the non-null assertion avoids redundant null checks
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const layoutMenuRef = useRef<HTMLButtonElement>(undefined!);
  // Ref is always defined before use; the non-null assertion avoids redundant null checks
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const helpMenuRef = useRef<HTMLButtonElement>(undefined!);

  const menuTree = useMemo(() => buildMenuTree(menuData), [menuData]);

  const getRefForColumn = (columnKey: string) => {
    switch (columnKey) {
      case 'platform.app':
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
    <Menubar ref={menubarRef} className="pr-twp tw:border-0 tw:bg-transparent" variant={variant}>
      {menuTree.columns.map(({ columnKey, column, groups }) => {
        return (
          <MenubarMenu key={columnKey}>
            <MenubarTrigger ref={getRefForColumn(columnKey)}>{column.label}</MenubarTrigger>
            <MenubarContent
              style={{ zIndex: Z_INDEX_ABOVE_DOCK }} // Need to get over the floating web view z-index 200
            >
              <TooltipProvider>
                {joinGroupsWithSeparators(
                  getMenubarContent(
                    groups,
                    onSelectMenuItem,
                    getLeadingIconSlot(
                      groups.flatMap((group) => group.items.map((node) => node.item)),
                    ),
                  ),
                  createMenubarSeparator,
                )}
              </TooltipProvider>
            </MenubarContent>
          </MenubarMenu>
        );
      })}
    </Menubar>
  );
}

export default PlatformMenubar;
