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
import { MenuIcon } from 'lucide-react';
import {
  GroupsInMultiColumnMenu,
  Localized,
  MenuItemContainingCommand,
  MenuItemContainingSubmenu,
  MultiColumnMenu,
} from 'platform-bible-utils';
import { Fragment, ReactNode, useRef } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';
import {
  getLastInteractionModality,
  hideFocusRing,
  QUIET_FOCUS_RING_SUPPRESSION,
  showFocusRing,
  trackInteractionModality,
} from '@/utils/focus.util';
import { getSubMenuGroupKeyForMenuItemId } from './menu.util';
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
          <Tooltip key={`tooltip-${item.label}-${'command' in item ? item.command : item.id}`}>
            <TooltipTrigger asChild>
              {'command' in item ? (
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
                </DropdownMenuItem>
              ) : (
                <DropdownMenuSub key={`dropdown-menu-sub-${item.label}-${item.id}`}>
                  <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>

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
              )}
            </TooltipTrigger>
            {item.tooltip && <TooltipContent>{item.tooltip}</TooltipContent>}
          </Tooltip>
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

  /** Style variant for the app menubar component. */
  variant?: 'default' | 'muted';

  buttonVariant?: 'default' | 'ghost' | 'outline' | 'secondary';

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
  onSelectMenuItem,
  menuData,
  tabLabel,
  icon,
  className,
  variant,
  buttonVariant = 'ghost',
  id,
}: TabDropdownMenuProps) {
  // Radix restores focus to the trigger on every close, and the tab order depends on that. The focus
  // ring does not belong there after a pointer close, though — it would sit on a button the pointer
  // has long left. Mark the trigger so CSS hides the ring, and clear the mark on the next keydown so
  // keyboard users get it back.
  trackInteractionModality();
  // `null` is React's canonical "not yet attached" ref value; there's no undefined equivalent in the
  // DOM/ref API (same pattern as navigation-history-buttons' button refs)
  // eslint-disable-next-line no-null/no-null
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRing = () => showFocusRing(triggerRef.current ?? undefined);

  return (
    <DropdownMenu variant={variant}>
      <DropdownMenuTrigger aria-label={tabLabel} className={className} asChild id={id}>
        <Button
          ref={triggerRef}
          variant={buttonVariant}
          size="icon"
          className={QUIET_FOCUS_RING_SUPPRESSION}
          onKeyDown={restoreFocusRing}
          onBlur={restoreFocusRing}
        >
          {icon ?? <MenuIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        style={{ zIndex: Z_INDEX_ABOVE_DOCK }}
        onCloseAutoFocus={() => {
          // Radix composes this ahead of its own restore, so the mark is in place before it
          // focuses. Deliberately does not preventDefault: Radix's handler also resets the
          // bookkeeping that decides when the trigger must not be refocused at all.
          if (getLastInteractionModality() === 'pointer')
            hideFocusRing(triggerRef.current ?? undefined);
        }}
      >
        {Object.entries(menuData.columns)
          .filter(([, column]) => typeof column === 'object')
          .sort(([, a], [, b]) => {
            if (typeof a === 'boolean' || typeof b === 'boolean') return 0;
            return a.order - b.order;
          })
          .map(([columnKey], index, array) => (
            <Fragment key={columnKey}>
              <DropdownMenuGroup>
                <TooltipProvider>
                  {getGroupContent(menuData.groups, menuData.items, columnKey, onSelectMenuItem)}
                </TooltipProvider>
              </DropdownMenuGroup>

              {index < array.length - 1 && <DropdownMenuSeparator />}
            </Fragment>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
