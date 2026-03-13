/**
 * Presentational overlay context menu component. Renders a context menu using Radix DropdownMenu
 * with a virtual anchor positioned at the requested coordinates. Supports all item types: item,
 * separator, submenu, checkbox, radio.
 *
 * This is a pure presentational component with no dependency on the overlay store. The renderer's
 * overlay wrapper connects it to the store.
 */

import { LocalizeKey } from 'platform-bible-utils';
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../shadcn-ui/dropdown-menu';
import { cn } from '../../../utils/shadcn-ui.util';
import { Z_INDEX_OVERLAY } from '../../z-index';

// ── Public Types ──

/** Alias for platform icon names. Currently any string; may become a branded type in the future. */
type PlatformIconName = string;

/**
 * A single item in an overlay context menu. Discriminated union on `type`:
 *
 * - `'item'` — A clickable menu item that returns its `id` when selected.
 * - `'separator'` — A visual divider between groups of items.
 * - `'submenu'` — A nested menu that expands on hover to show child `items`.
 * - `'checkbox'` — A toggleable item that reports its new `checked` state when selected.
 * - `'radio'` — A radio button within a named `group`.
 */
export type OverlayContextMenuItem =
  | {
      type: 'item';
      id: string;
      label: string | LocalizeKey;
      icon?: PlatformIconName;
      shortcut?: string;
      disabled?: boolean;
      destructive?: boolean;
    }
  | { type: 'separator' }
  | {
      type: 'submenu';
      label: string | LocalizeKey;
      icon?: PlatformIconName;
      items: OverlayContextMenuItem[];
    }
  | {
      type: 'checkbox';
      id: string;
      label: string | LocalizeKey;
      checked: boolean;
    }
  | {
      type: 'radio';
      id: string;
      label: string | LocalizeKey;
      value: string;
      group: string;
      checked: boolean;
    };

/** Result returned when the user selects an item from the context menu */
export type OverlayContextMenuResult = {
  itemId: string;
  checked?: boolean;
};

/** Props for the presentational OverlayContextMenu component */
export type OverlayContextMenuProps = {
  /** Menu items to display */
  items: OverlayContextMenuItem[];
  /** Document-relative position for the menu */
  position: { x: number; y: number };
  /** Called when the user selects a menu item */
  onSelect: (result: OverlayContextMenuResult) => void;
  /** Called when the menu is dismissed without a selection */
  onDismiss: () => void;
};

// ── Constants ──

/**
 * Tailwind classes for hover highlighting on menu items. In overlay context menus (force-opened via
 * `open` prop with a hidden trigger and `modal={false}`), Radix's focus-based highlighting
 * (`focus:tw-bg-accent`) doesn't reliably activate on pointer hover. These classes ensure items
 * highlight instantly on hover, matching the top-level menubar behavior.
 */
const HOVER_HIGHLIGHT_CLASSES =
  'hover:tw-bg-accent hover:tw-text-accent-foreground [transition-duration:0ms]';

/** Delay before opening a submenu on hover (ms) */
const SUBMENU_OPEN_DELAY_MS = 150;

/** Grace period before closing a submenu when pointer leaves (ms) */
const SUBMENU_CLOSE_DELAY_MS = 100;

// ── Internal Components ──

/**
 * Submenu wrapper that opens on hover with appropriate delays. Radix's built-in hover-to-open
 * behavior may not work reliably when the root DropdownMenu is force-opened via the `open` prop
 * with a hidden trigger, so we manage the open state explicitly.
 */
function HoverableSubmenu({
  label,
  items,
  onSelect,
}: {
  label: string;
  items: OverlayContextMenuItem[];
  onSelect: (result: OverlayContextMenuResult) => void;
}) {
  const [open, setOpen] = useState(false);
  const openTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const scheduleOpen = useCallback(() => {
    clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => setOpen(true), SUBMENU_OPEN_DELAY_MS);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpen(false), SUBMENU_CLOSE_DELAY_MS);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <DropdownMenuSub open={open} onOpenChange={setOpen}>
      <DropdownMenuSubTrigger
        className={HOVER_HIGHLIGHT_CLASSES}
        onPointerEnter={scheduleOpen}
        onPointerLeave={scheduleClose}
      >
        {label}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent
          className="overlay-context-menu-content"
          style={{ zIndex: Z_INDEX_OVERLAY }}
          onPointerEnter={cancelClose}
          onPointerLeave={scheduleClose}
        >
          {/* eslint-disable-next-line no-use-before-define -- mutual recursion between renderMenuItems and HoverableSubmenu */}
          {renderMenuItems(items, onSelect)}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

/**
 * Groups consecutive radio items by their `group` field so they share a single
 * DropdownMenuRadioGroup for proper mutual exclusivity.
 */
function renderMenuItems(
  items: OverlayContextMenuItem[],
  onSelect: (result: OverlayContextMenuResult) => void,
): ReactNode[] {
  const result: ReactNode[] = [];
  let i = 0;

  while (i < items.length) {
    const item = items[i];

    if (item.type === 'separator') {
      // Separators have no unique identifier; index is the only stable key
      result.push(
        // eslint-disable-next-line react/no-array-index-key
        <DropdownMenuSeparator key={`sep-${i}`} />,
      );
      i += 1;
    } else if (item.type === 'item') {
      result.push(
        <DropdownMenuItem
          key={item.id}
          disabled={item.disabled}
          className={cn(HOVER_HIGHLIGHT_CLASSES, item.destructive && 'tw-text-destructive')}
          onSelect={() => onSelect({ itemId: item.id })}
        >
          {item.label}
          {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
        </DropdownMenuItem>,
      );
      i += 1;
    } else if (item.type === 'checkbox') {
      result.push(
        <DropdownMenuCheckboxItem
          key={item.id}
          className={HOVER_HIGHLIGHT_CLASSES}
          checked={item.checked}
          onCheckedChange={(checked: boolean) => onSelect({ itemId: item.id, checked })}
        >
          {item.label}
        </DropdownMenuCheckboxItem>,
      );
      i += 1;
    } else if (item.type === 'radio') {
      // Collect all consecutive radio items in the same group
      const { group } = item;
      const radioItems: Extract<OverlayContextMenuItem, { type: 'radio' }>[] = [];
      while (i < items.length && items[i].type === 'radio') {
        const radioItem = items[i];
        if (radioItem.type === 'radio' && radioItem.group === group) {
          radioItems.push(radioItem);
          i += 1;
        } else {
          break;
        }
      }

      // Determine current value: the checked item's value, or empty string
      const currentValue = radioItems.find((r) => r.checked)?.value ?? '';

      result.push(
        <DropdownMenuRadioGroup
          key={`radio-group-${group}`}
          value={currentValue}
          onValueChange={(value: string) => {
            const selected = radioItems.find((r) => r.value === value);
            if (selected) onSelect({ itemId: selected.id, checked: true });
          }}
        >
          {radioItems.map((radioItem) => (
            <DropdownMenuRadioItem
              key={radioItem.id}
              className={HOVER_HIGHLIGHT_CLASSES}
              value={radioItem.value}
            >
              {radioItem.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>,
      );
    } else if (item.type === 'submenu') {
      result.push(
        <HoverableSubmenu
          key={`submenu-${item.label}`}
          label={typeof item.label === 'string' ? item.label : String(item.label)}
          items={item.items}
          onSelect={onSelect}
        />,
      );
      i += 1;
    } else {
      i += 1;
    }
  }

  return result;
}

// ── Main Component ──

/**
 * Renders a context menu at a fixed position using Radix DropdownMenu. Supports items, separators,
 * submenus, checkboxes, and radio groups.
 */
export function OverlayContextMenu({
  items,
  position,
  onSelect,
  onDismiss,
}: OverlayContextMenuProps) {
  // React refs passed to DOM elements must be initialized with null, not undefined
  // eslint-disable-next-line no-null/no-null
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <DropdownMenu
      open
      modal={false}
      onOpenChange={(open: boolean) => {
        if (!open) onDismiss();
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          data-overlay-context-menu
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            width: 0,
            height: 0,
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
        className="overlay-context-menu-content"
        style={{ zIndex: Z_INDEX_OVERLAY }}
        align="start"
        side="bottom"
        sideOffset={0}
      >
        {renderMenuItems(items, onSelect)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
