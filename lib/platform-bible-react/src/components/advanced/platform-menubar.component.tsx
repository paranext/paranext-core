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
  Localized,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  MultiColumnMenu,
} from 'platform-bible-utils';
import { useCallback } from 'react';
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
            <MenubarTrigger>
              {typeof column === 'object' && 'label' in column && column.label}
            </MenubarTrigger>
            <MenubarContent>
              {(() => {
                const groups = Object.entries(menuData.groups)
                  .filter(([, group]) => 'column' in group && group.column === columnKey)
                  .sort(([, a], [, b]) => a.order - b.order);

                return groups.flatMap(([groupKey], index) => {
                  const groupItems = menuData.items
                    .filter((item) => item.group === groupKey)
                    .sort((a, b) => a.order - b.order)
                    .map(
                      (item: Localized<MenuItemContainingCommand | MenuItemContainingSubmenu>) =>
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
                          <MenubarSub>
                            <MenubarSubTrigger>{item.label}</MenubarSubTrigger>
                            <MenubarSubContent>
                              <MenubarItem>Email link</MenubarItem>
                              <MenubarItem>Messages</MenubarItem>
                              <MenubarItem>Notes</MenubarItem>
                            </MenubarSubContent>
                          </MenubarSub>
                        ),
                    );

                  const itemsWithSeparator = [...groupItems];
                  if (groupItems.length > 0 && index < groups.length - 1) {
                    itemsWithSeparator.push(<MenubarSeparator key={`${groupKey}-separator`} />);
                  }

                  return itemsWithSeparator;
                });
              })()}
            </MenubarContent>
          </MenubarMenu>
        ))}
    </Menubar>
  );
}
