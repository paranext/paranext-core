/**
 * Overlay context menu component. Renders a context menu using Radix DropdownMenu with a virtual
 * anchor positioned at the requested coordinates. Supports item types: item, separator, submenu.
 *
 * Contains both the presentational component (OverlayContextMenuPresentational, exported for tests
 * and stories) and the store-connected component (OverlayContextMenu) that resolves LocalizeKeys
 * and connects to the overlay store.
 */

import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { resolveAndRemoveOverlay } from '@renderer/services/overlays/overlay-store';
import { OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Z_INDEX_OVERLAY,
} from 'platform-bible-react';
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isLocalizeKey, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

// ── Public Types ──

/** Alias for platform icon names. Currently any string; may become a branded type in the future. */
type PlatformIconName = string;

/**
 * A single item in an overlay context menu. Discriminated union on `type`:
 *
 * - `'item'` — A clickable menu item that returns its `id` when selected.
 * - `'separator'` — A visual divider between groups of items.
 * - `'submenu'` — A nested menu that expands on hover to show child `items`.
 */
export type OverlayContextMenuItem =
  | {
      type: 'item';
      id: string;
      label: string | LocalizeKey;
      icon?: PlatformIconName;
      shortcut?: string;
      disabled?: boolean;
    }
  | { type: 'separator' }
  | {
      type: 'submenu';
      label: string | LocalizeKey;
      icon?: PlatformIconName;
      items: OverlayContextMenuItem[];
    };

/** Result returned when the user selects an item from the context menu */
export type OverlayContextMenuResult = {
  itemId: string;
};

/** Props for the presentational OverlayContextMenuPresentational component */
export type OverlayContextMenuPresentationalProps = {
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
const HOVER_HIGHLIGHT_CLASSES = 'hover:tw-bg-accent hover:tw-text-accent-foreground';

/** Inline style for instant hover highlight (no transition delay) */
const HOVER_HIGHLIGHT_STYLE: CSSProperties = { transitionDuration: '0ms' };

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
        style={HOVER_HIGHLIGHT_STYLE}
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
          {/* renderMenuItems and HoverableSubmenu call each other; forward reference is unavoidable */}
          {/* eslint-disable-next-line no-use-before-define */}
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
      result.push(
        // Separators have no unique identifier; index is the only stable key
        // eslint-disable-next-line react/no-array-index-key
        <DropdownMenuSeparator key={`sep-${i}`} />,
      );
      i += 1;
    } else if (item.type === 'item') {
      result.push(
        <DropdownMenuItem
          key={item.id}
          disabled={item.disabled}
          className={HOVER_HIGHLIGHT_CLASSES}
          style={HOVER_HIGHLIGHT_STYLE}
          onSelect={() => onSelect({ itemId: item.id })}
        >
          {item.label}
          {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
        </DropdownMenuItem>,
      );
      i += 1;
    } else if (item.type === 'submenu') {
      result.push(
        <HoverableSubmenu
          // Use index for a stable key — labels are not guaranteed unique (LocalizeKeys may resolve
          // to the same string), which would cause key collisions and unstable submenu behavior.
          // eslint-disable-next-line react/no-array-index-key
          key={`submenu-${i}`}
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

// ── Presentational Component ──

/**
 * Pure presentational context menu component. Renders a context menu at a fixed position using
 * Radix DropdownMenu. Supports items, separators, and submenus.
 *
 * This component has no dependency on the overlay store or localization hooks. Use it directly in
 * tests and Storybook stories. For production rendering via the overlay service, use
 * {@link OverlayContextMenu} instead — it handles LocalizeKey resolution and store lifecycle.
 */
export function OverlayContextMenuPresentational({
  items,
  position,
  onSelect,
  onDismiss,
}: OverlayContextMenuPresentationalProps) {
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

// ── Localization Helpers ──

/** Recursively collects all LocalizeKey values from context menu items */
function collectContextMenuKeys(items: OverlayContextMenuItem[]): LocalizeKey[] {
  return items.reduce<LocalizeKey[]>((keys, item) => {
    if (item.type === 'separator') return keys;
    if (isLocalizeKey(item.label)) keys.push(item.label);
    if (item.type === 'submenu') keys.push(...collectContextMenuKeys(item.items));
    return keys;
  }, []);
}

/** Recursively resolves LocalizeKey labels in context menu items using localized strings */
function localizeContextMenuItems(
  items: OverlayContextMenuItem[],
  localizedStrings: LanguageStrings,
): OverlayContextMenuItem[] {
  return items.map((item) => {
    if (item.type === 'separator') return item;
    const label = isLocalizeKey(item.label)
      ? (localizedStrings[item.label] ?? item.label)
      : item.label;
    if (item.type === 'submenu')
      return { ...item, label, items: localizeContextMenuItems(item.items, localizedStrings) };
    return { ...item, label };
  });
}

// ── Store-Connected Component ──

type OverlayContextMenuProps = {
  overlay: Extract<OverlayEntry, { type: 'contextMenu' }>;
};

/**
 * Production context menu component. Resolves LocalizeKey values in menu items via
 * `useLocalizedStrings`, manages overlay lifecycle (removing from store and resolving the promise),
 * and delegates rendering to {@link OverlayContextMenuPresentational}.
 *
 * This is the component rendered by `OverlayHost`. Do not use it directly in tests or Storybook —
 * use {@link OverlayContextMenuPresentational} instead, which accepts plain props without requiring
 * an `OverlayEntry`.
 */
export function OverlayContextMenu({ overlay }: OverlayContextMenuProps) {
  const hasResolved = useRef(false);

  const localizeKeys = useMemo(() => collectContextMenuKeys(overlay.items), [overlay.items]);
  const [localizedStrings] = useLocalizedStrings(localizeKeys);

  const localizedItems = useMemo(
    () => localizeContextMenuItems(overlay.items, localizedStrings),
    [overlay.items, localizedStrings],
  );

  const handleSelect = useCallback(
    (result: OverlayContextMenuResult) => {
      if (hasResolved.current) return;
      hasResolved.current = true;
      resolveAndRemoveOverlay(overlay.id, overlay.type, result.itemId);
    },
    [overlay],
  );

  const handleDismiss = useCallback(() => {
    if (hasResolved.current) return;
    hasResolved.current = true;
    resolveAndRemoveOverlay(overlay.id, overlay.type, undefined);
  }, [overlay]);

  return (
    <OverlayContextMenuPresentational
      items={localizedItems}
      position={overlay.position}
      onSelect={handleSelect}
      onDismiss={handleDismiss}
    />
  );
}
