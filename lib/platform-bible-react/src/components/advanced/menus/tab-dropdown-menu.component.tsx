import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuContentProps,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubContentProps,
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
import { Localized, MenuItemContainingCommand, MultiColumnMenu } from 'platform-bible-utils';
import { Fragment, ReactNode, useId, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';
import {
  getLastInteractionModality,
  hideFocusRing,
  QUIET_FOCUS_RING_SUPPRESSION,
  showFocusRing,
} from '@/utils/focus.util';
import { useInteractionModality } from '@/hooks/use-interaction-modality.hook';
import { cn } from '@/utils/shadcn-ui/utils';
import { ShortcutKeys } from '@/components/basics/shortcut-keys.component';
import {
  buildMenuTree,
  getLeadingIconSlot,
  getMenuSectionsWithItems,
  GroupContent,
  joinGroupsWithSeparators,
  LeadingIconSlot,
  MenuGroupNode,
} from './menu.util';
import { SelectMenuItemHandler } from './platform-menubar.component';
import MenuItemIcon from './menu-icon.component';

/** Props a tab menu passes to the content of each of its submenus */
export type TabMenuSubmenuContentProps = Omit<DropdownMenuSubContentProps, 'children'> & {
  /** Any `data-*` attribute, for whoever needs to recognize the submenu's content */
  [dataAttribute: `data-${string}`]: string | undefined;
};

const createDropdownSeparator = (groupKey: string) => (
  <DropdownMenuSeparator key={`separator-${groupKey}`} />
);

/**
 * Renders the items of the given groups in the order given, one entry per group. A submenu joins
 * the entries with {@link joinGroupsWithSeparators}, so a separator sits between each pair of its
 * groups that have items; a column runs its groups together, since the menu does not distinguish
 * the groups within a column.
 *
 * @param groups The groups to render, already sorted by the groups' `order`, with their items
 *   sorted
 * @param leadingSlot The leading icon slot of the list these items render in. A submenu works out
 *   its own from its items.
 * @param submenuContentProps Props for the content of every submenu, at any depth
 */
const getGroupContent = (
  groups: MenuGroupNode[],
  onSelectMenuItem: SelectMenuItemHandler,
  leadingSlot: LeadingIconSlot,
  submenuContentProps?: TabMenuSubmenuContentProps,
): GroupContent<ReactNode>[] =>
  groups.map(({ groupKey, items }) => ({
    groupKey,
    items: items.map(({ item, subGroups = [] }) => {
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
            <DropdownMenuSubContent {...submenuContentProps}>
              {joinGroupsWithSeparators(
                getGroupContent(
                  subGroups,
                  onSelectMenuItem,
                  getLeadingIconSlot(
                    subGroups.flatMap((group) => group.items.map((node) => node.item)),
                  ),
                  submenuContentProps,
                ),
                createDropdownSeparator,
              )}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      );
    }),
  }));

export type TabDropdownMenuItemsProps = {
  /** The handler to use for menu commands */
  onSelectMenuItem: SelectMenuItemHandler;

  /** The menu data to show */
  menuData: Localized<MultiColumnMenu>;

  /**
   * Whether to head each section with its column label. Only takes effect when two or more sections
   * have items, since a lone section has nothing to be told apart from.
   */
  showSectionHeadings?: boolean;

  /**
   * Props for the content of every submenu. Submenus render in their own portal, outside the menu's
   * content, so anything that must recognize all of the menu's surfaces needs them here as well.
   *
   * @experimental This property is unstable and may change or disappear without notice
   */
  submenuContentProps?: TabMenuSubmenuContentProps;
};

/**
 * The items of a tab menu, for rendering inside a `DropdownMenuContent`. Each column that has items
 * is a section, in column order, divided from the next by a line; columns without items are left
 * out. Groups within a column are not distinguished, while the groups of a submenu are divided by a
 * line. Items show their tooltip on hover and their `shortcut`, if any, at the end of the row. With
 * `showSectionHeadings`, each section is headed by its column label, except a column that sets
 * `isHeaderHidden`, whose label names the section for screen readers only.
 *
 * {@link TabDropdownMenu} renders these in its own dropdown, and {@link AnchoredTabMenu} in a menu
 * opened at a given rectangle.
 */
export function TabDropdownMenuItems({
  onSelectMenuItem,
  menuData,
  showSectionHeadings = false,
  submenuContentProps,
}: TabDropdownMenuItemsProps) {
  const headingIdPrefix = useId();
  const menuTree = useMemo(() => buildMenuTree(menuData), [menuData]);
  const sections = getMenuSectionsWithItems(menuData);
  const showHeadings = showSectionHeadings && sections.length > 1;
  const groupsByColumn = new Map(
    menuTree.columns.map(({ columnKey, groups }) => [columnKey, groups]),
  );
  const groupsOfSection = (columnKey: string) => groupsByColumn.get(columnKey) ?? [];
  // Every section shares one content, so one slot keeps all their labels aligned
  const leadingSlot = getLeadingIconSlot(
    sections.flatMap(({ columnKey }) =>
      groupsOfSection(columnKey).flatMap((group) => group.items.map((node) => node.item)),
    ),
  );

  return sections.map(({ columnKey, label, isHeaderHidden }, index) => {
    const headingId = `${headingIdPrefix}-${columnKey}`;
    return (
      <Fragment key={columnKey}>
        <DropdownMenuGroup aria-labelledby={showHeadings ? headingId : undefined}>
          {showHeadings && (
            // A section shown without its heading keeps it for assistive technology only
            <DropdownMenuLabel id={headingId} className={isHeaderHidden ? 'tw:sr-only' : undefined}>
              {label}
            </DropdownMenuLabel>
          )}
          <TooltipProvider>
            {getGroupContent(
              groupsOfSection(columnKey),
              onSelectMenuItem,
              leadingSlot,
              submenuContentProps,
            ).flatMap((group) => group.items)}
          </TooltipProvider>
        </DropdownMenuGroup>

        {index < sections.length - 1 && <DropdownMenuSeparator />}
      </Fragment>
    );
  });
}

/** Where a tab menu's trigger sits, in pixels relative to the viewport of the document it is in */
export type TabMenuTriggerRect = { x: number; y: number; width: number; height: number };

export type AnchoredTabMenuProps = TabDropdownMenuItemsProps & {
  /** The rectangle of the trigger the menu belongs to; the menu opens below it, aligned to its start */
  anchor: TabMenuTriggerRect;

  /** Called when the menu closes without a pick: Escape, a click away, or a submenu's Escape */
  onClose: () => void;

  /**
   * Props for the menu's content. Its `onCloseAutoFocus` defaults to keeping focus where it is,
   * since the menu has no real trigger to return focus to.
   */
  contentProps?: Omit<DropdownMenuContentProps, 'children'> & {
    /** Any `data-*` attribute, for whoever needs to recognize the menu's content */
    [dataAttribute: `data-${string}`]: string | undefined;
  };
};

/**
 * A tab menu that is open from the moment it renders, below a trigger rectangle given in this
 * document's coordinates rather than below a trigger element. It shows the items as
 * {@link TabDropdownMenuItems} does. The overlay service uses it to draw a web view's tab menu over
 * the whole window, below the rectangle of the trigger inside the web view.
 *
 * @experimental This component is unstable and may change or disappear without notice
 */
export function AnchoredTabMenu({
  anchor,
  onClose,
  contentProps,
  ...itemsProps
}: AnchoredTabMenuProps) {
  return (
    <DropdownMenu
      open
      modal={false}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DropdownMenuTrigger asChild>
        {/* Stands in for the real trigger, so the menu lines up with it */}
        <button
          type="button"
          style={{
            position: 'fixed',
            left: anchor.x,
            top: anchor.y,
            width: anchor.width,
            height: anchor.height,
            padding: 0,
            margin: 0,
            border: 'none',
            opacity: 0,
            pointerEvents: 'none',
          }}
          aria-hidden
          tabIndex={-1}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        onCloseAutoFocus={(event) => event.preventDefault()}
        {...contentProps}
      >
        <TabDropdownMenuItems {...itemsProps} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Opens a tab menu outside the document its trigger is in, and settles with the item the user
 * picked, or `undefined` when the menu closed without a pick.
 *
 * In a web view, pass one that calls `papi.overlays.showTabMenu`: the window then draws the menu
 * over every tab, so a narrow tab no longer cuts it or its flyouts off.
 *
 * @experimental This type is unstable and may change or disappear without notice
 */
export type OpenTabMenuInOverlay = (
  menuData: Localized<MultiColumnMenu>,
  triggerRect: TabMenuTriggerRect,
) => Promise<Localized<MenuItemContainingCommand> | undefined>;

export type TabDropdownMenuProps = Omit<
  TabDropdownMenuItemsProps,
  'showSectionHeadings' | 'submenuContentProps'
> & {
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

  /**
   * Opens the menu outside this document instead of in it. When set, the trigger hands the menu
   * data and its own position to this function and passes the item it settles with to
   * `onSelectMenuItem`; the menu is not rendered here at all.
   *
   * @experimental This property is unstable and may change or disappear without notice
   */
  openMenuInOverlay?: OpenTabMenuInOverlay;

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
 * names the section for screen readers only. With `openMenuInOverlay`, the menu opens outside this
 * document instead (in a web view, over the whole window).
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
  openMenuInOverlay,
  variant,
  buttonVariant = 'ghost',
  id,
}: TabDropdownMenuProps) {
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
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  if (openMenuInOverlay) {
    const openOverlay = async () => {
      const trigger = triggerRef.current;
      if (!trigger || isOverlayOpen) return;
      const { x, y, width, height } = trigger.getBoundingClientRect();
      setIsOverlayOpen(true);
      let pickedItem: Localized<MenuItemContainingCommand> | undefined;
      try {
        pickedItem = await openMenuInOverlay(menuData, { x, y, width, height });
      } catch {
        // The overlay refuses a request it cannot show (a hidden tab, a repeat inside its
        // cooldown) and drops a menu that another request replaced; either way nothing was picked
      } finally {
        setIsOverlayOpen(false);
      }
      if (getLastInteractionModality() === 'pointer') hideFocusRing(trigger);
      // Run in the same task the pick settles in: some handlers need the pick's user activation
      // The handler's type names the unlocalized item, as for a pick from the in-document menu
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      if (pickedItem) onSelectMenuItem(pickedItem as MenuItemContainingCommand);
    };
    return (
      <Button
        ref={triggerRef}
        id={id}
        aria-label={tabLabel}
        aria-haspopup="menu"
        aria-expanded={isOverlayOpen}
        variant={buttonVariant}
        size="icon"
        className={cn(QUIET_FOCUS_RING_SUPPRESSION, className)}
        onClick={openOverlay}
        onKeyDown={(event) => {
          restoreFocusRing();
          // Like a dropdown trigger, ArrowDown opens the menu too
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            openOverlay();
          }
        }}
        onBlur={restoreFocusRing}
      >
        {icon ?? <MenuIcon />}
      </Button>
    );
  }

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
        <TabDropdownMenuItems
          menuData={menuData}
          onSelectMenuItem={onSelectMenuItem}
          showSectionHeadings={showSectionHeadings}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
