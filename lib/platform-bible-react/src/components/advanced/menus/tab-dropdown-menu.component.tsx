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
import { Fragment, ReactNode, useId, useRef } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';
import {
  getLastInteractionModality,
  hideFocusRing,
  QUIET_FOCUS_RING_SUPPRESSION,
  showFocusRing,
} from '@/utils/focus.util';
import { useInteractionModality } from '@/hooks/use-interaction-modality.hook';
import { ShortcutKeys } from '@/components/basics/shortcut-keys.component';
import {
  getColumnGroupKeys,
  getItemsInGroups,
  getLeadingIconSlot,
  getMenuSectionsWithItems,
  getSubMenuGroupKeysForMenuItemId,
  LeadingIconSlot,
} from './menu.util';
import { SelectMenuItemHandler } from './platform-menubar.component';
import MenuItemIcon from './menu-icon.component';

/**
 * Renders the items of the given groups in the order given. Groups within a column are not
 * distinguished from each other; a submenu's groups are, with a separator between each pair that
 * both have items.
 *
 * @param groupKeys Keys of the groups to render, already sorted by the groups' `order`
 * @param separateGroups Whether to put a separator between consecutive groups that have items
 * @param leadingSlot The leading icon slot of the list these items render in. A submenu works out
 *   its own from its items.
 */
const getGroupContent = (
  groups: Localized<GroupsInMultiColumnMenu>,
  items: Localized<(MenuItemContainingCommand | MenuItemContainingSubmenu)[]>,
  groupKeys: string[],
  separateGroups: boolean,
  onSelectMenuItem: SelectMenuItemHandler,
  leadingSlot: LeadingIconSlot,
): ReactNode[] => {
  let hasShownItems = false;
  return groupKeys.flatMap((groupKey) => {
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
                    <DropdownMenuShortcut className="tw:ps-4">
                      <ShortcutKeys hint={item.shortcut} />
                    </DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              </TooltipTrigger>
              {item.tooltip && <TooltipContent>{item.tooltip}</TooltipContent>}
            </Tooltip>
          );
        }

        // Only wrap the trigger when there is a tooltip: `TooltipTrigger asChild` clones its own
        // `data-state` and `data-slot` onto the trigger, hiding the submenu's open state from
        // `data-open:` styles
        const subTrigger = (
          <DropdownMenuSubTrigger>
            <MenuItemIcon
              iconName={item.iconNameBefore}
              menuLabel={item.label}
              leading
              leadingSlot={leadingSlot}
            />
            {item.label}
            <MenuItemIcon iconName={item.iconNameAfter} menuLabel={item.label} />
          </DropdownMenuSubTrigger>
        );
        const subGroupKeys = getSubMenuGroupKeysForMenuItemId(groups, item.id);
        return (
          <DropdownMenuSub key={`dropdown-menu-sub-${item.label}-${item.id}`}>
            {item.tooltip ? (
              <Tooltip>
                <TooltipTrigger asChild>{subTrigger}</TooltipTrigger>
                <TooltipContent>{item.tooltip}</TooltipContent>
              </Tooltip>
            ) : (
              subTrigger
            )}

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {getGroupContent(
                  groups,
                  items,
                  subGroupKeys,
                  true,
                  onSelectMenuItem,
                  getLeadingIconSlot(getItemsInGroups(items, subGroupKeys)),
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        );
      });

    // Only a group with items gets a separator, and only once an earlier group has shown items, so
    // an emptied group never leaves a stray separator
    const separator =
      separateGroups && hasShownItems && groupItems.length > 0
        ? [<DropdownMenuSeparator key={`separator-${groupKey}`} />]
        : [];
    if (groupItems.length > 0) hasShownItems = true;

    return [...separator, ...groupItems];
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
 * distinguished, while the groups of a submenu are divided by a line. Items show their tooltip on
 * hover and their `shortcut`, if any, at the end of the row. With `showSectionHeadings`, each
 * section is headed by its column label, except a column that sets `isHeaderHidden`, whose label
 * names the section for screen readers only.
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
  // Every section shares one content, so one slot keeps all their labels aligned
  const leadingSlot = getLeadingIconSlot(
    getItemsInGroups(
      menuData.items,
      sections.flatMap(({ columnKey }) => getColumnGroupKeys(menuData.groups, columnKey)),
    ),
  );

  // Radix restores focus to the trigger on every close, and the tab order depends on that. The focus
  // ring does not belong there after a pointer close, though — it would sit on a button the pointer
  // has long left. Mark the trigger so CSS hides the ring, and clear the mark on the next keydown so
  // keyboard users get it back.
  // Only the tab menus behave this way; every other menu keeps Radix's default.
  // TODO(PT-4727): Lift this into DropdownMenuContent so all menus close alike, and drop it here.
  useInteractionModality();
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
        {sections.map(({ columnKey, label, isHeaderHidden }, index) => {
          const headingId = `${headingIdPrefix}-${columnKey}`;
          return (
            <Fragment key={columnKey}>
              <DropdownMenuGroup aria-labelledby={showHeadings ? headingId : undefined}>
                {showHeadings && (
                  // A section shown without its heading keeps it for assistive technology only
                  <DropdownMenuLabel
                    id={headingId}
                    className={isHeaderHidden ? 'tw:sr-only' : undefined}
                  >
                    {label}
                  </DropdownMenuLabel>
                )}
                <TooltipProvider>
                  {getGroupContent(
                    menuData.groups,
                    menuData.items,
                    getColumnGroupKeys(menuData.groups, columnKey),
                    false,
                    onSelectMenuItem,
                    leadingSlot,
                  )}
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
