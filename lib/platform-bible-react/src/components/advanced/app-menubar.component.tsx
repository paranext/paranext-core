import React, { useCallback } from 'react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from '@/components/shadcn-ui/menubar';
import usePromise from '@/hooks/use-promise.hook';
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

type AppMenubarProps = {
  /** The delegate to use to get the menu data. */
  menuProvider?: MultiColumnMenuProvider;

  /** The handler to use for menu commands (and eventually toolbar commands). */
  commandHandler: CommandHandler;

  /** Style variant for the app menubar component. */
  variant?: 'default' | 'muted';
};

export default function AppMenubar({ menuProvider, commandHandler, variant }: AppMenubarProps) {
  const [menuData] = usePromise(
    useCallback(async () => {
      return menuProvider?.(false);
    }, [menuProvider]),
    undefined,
  );

  if (!menuData) return undefined;

  const isValidColumn = (col: unknown): col is { order: number; label: string } =>
    typeof col === 'object' && col !== undefined && 'order' in col && 'label' in col;

  const isValidGroup = (group: unknown): group is { column: string; order: number } =>
    typeof group === 'object' && group !== null && 'column' in group && 'order' in group;

  return (
    <Menubar className="pr-twp tw-border-0 tw-bg-transparent" variant={variant}>
      {Object.entries(menuData.columns)
        .filter(([key, value]) => key !== 'isExtensible' && isValidColumn(value))
        .sort(([, a], [, b]) => (a as { order: number }).order - (b as { order: number }).order)
        .map(([columnKey, column]) => (
          <MenubarMenu key={columnKey}>
            <MenubarTrigger>{(column as { label: string }).label}</MenubarTrigger>
            <MenubarContent>
              {Object.entries(menuData.groups)
                .filter(([, group]) => isValidGroup(group) && group.column === columnKey)
                .sort(([, a], [, b]) => a.order - b.order)
                .map(([groupKey]) => {
                  const groupItems = menuData.items
                    .filter((item) => item.group === groupKey)
                    .sort((a, b) => a.order - b.order);

                  return groupItems.length > 0 ? (
                    <React.Fragment key={groupKey}>
                      {groupItems.map((item) => (
                        <MenubarItem
                          key={'command' in item ? item.command : item.id}
                          onClick={() => {
                            console.log('running command from item:', item);
                            'command' in item && commandHandler(item.command as unknown as Command);
                          }}
                        >
                          {item.label}
                        </MenubarItem>
                      ))}
                      <MenubarSeparator />
                    </React.Fragment>
                  ) : undefined;
                })}
            </MenubarContent>
          </MenubarMenu>
        ))}
    </Menubar>
  );
}
