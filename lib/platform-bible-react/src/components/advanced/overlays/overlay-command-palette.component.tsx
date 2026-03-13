/**
 * Presentational overlay command palette component. Renders a searchable, filterable list of items
 * using the shadcn Command component (cmdk). Positioned via a virtual anchor (same pattern as
 * overlay-popover) or centered in the viewport when no position is provided.
 *
 * This is a pure presentational component with no dependency on the overlay store. The renderer's
 * overlay wrapper connects it to the store.
 */

import { type KeyboardEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { LocalizeKey } from 'platform-bible-utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Popover, PopoverAnchor, PopoverContent } from '../../shadcn-ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../shadcn-ui/command';
import { Z_INDEX_OVERLAY } from '../../z-index';

// ── Public Types ──

/** A single item in the command palette */
export type OverlayCommandPaletteItem = {
  /** Unique identifier returned when this item is selected */
  id: string;
  /** Primary display text */
  label: string | LocalizeKey;
  /** Secondary description text displayed below the label */
  description?: string | LocalizeKey;
  /** Optional icon displayed to the left of the label */
  icon?: string;
  /** Optional badge text (e.g., "Deprecated", "Disallowed") */
  badge?: string | LocalizeKey;
  /** Optional group key for visual sectioning with group headers */
  group?: string;
  /** Whether the item is grayed out and non-selectable. Defaults to false. */
  disabled?: boolean;
};

/** Props for the presentational OverlayCommandPalette component */
export type OverlayCommandPaletteProps = {
  /** The selectable items to display */
  items: OverlayCommandPaletteItem[];
  /** Document-relative position for the palette anchor. Omit for centered mode. */
  position?: { x: number; y: number };
  /** Optional anchor dimensions */
  anchor?: { width?: number; height?: number };
  /** Preferred side of the anchor. Defaults to 'bottom'. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Maximum width in pixels. Defaults to 500. */
  maxWidth?: number;
  /** Maximum height in pixels. Defaults to 400. */
  maxHeight?: number;
  /** Called when the user selects an item */
  onSelect: (itemId: string) => void;
  /** Called when the palette is dismissed (Escape, click outside) */
  onDismiss: () => void;
};

// ── Constants ──

const DEFAULT_MAX_WIDTH = 500;
const DEFAULT_MAX_HEIGHT = 400;

// ── Internal Components ──

/** Renders a single command palette item with label, description, icon, and badge */
function PaletteItem({
  item,
  onSelect,
}: {
  item: OverlayCommandPaletteItem;
  onSelect: (id: string) => void;
}) {
  // Build a searchable value from label + description + badge for cmdk filtering
  const searchValue = [item.label, item.description, item.badge].filter(Boolean).join(' ');

  return (
    <CommandItem
      value={searchValue}
      disabled={item.disabled}
      onSelect={() => onSelect(item.id)}
      className="tw-flex tw-items-center tw-gap-2"
    >
      {item.icon && (
        <span className="tw-flex tw-h-4 tw-w-4 tw-shrink-0 tw-items-center tw-justify-center tw-text-muted-foreground">
          {item.icon}
        </span>
      )}
      <div className="tw-flex tw-flex-1 tw-flex-col tw-overflow-hidden">
        <span className="tw-truncate">{item.label}</span>
        {item.description && (
          <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
            {item.description}
          </span>
        )}
      </div>
      {item.badge && (
        <span className="tw-ml-auto tw-shrink-0 tw-rounded tw-bg-muted tw-px-1.5 tw-py-0.5 tw-text-xs tw-text-muted-foreground">
          {item.badge}
        </span>
      )}
    </CommandItem>
  );
}

/** Renders items grouped by their group key, or as a single default group */
function GroupedItems({
  items,
  onSelect,
}: {
  items: OverlayCommandPaletteItem[];
  onSelect: (id: string) => void;
}) {
  const grouped = useMemo(() => {
    const groups = new Map<string, OverlayCommandPaletteItem[]>();
    items.forEach((item) => {
      const key = item.group ?? '';
      const arr = groups.get(key);
      if (arr) arr.push(item);
      else groups.set(key, [item]);
    });
    return groups;
  }, [items]);

  const hasGroups = grouped.size > 1 || (grouped.size === 1 && !grouped.has(''));

  if (!hasGroups) {
    return (
      <CommandGroup>
        {items.map((item) => (
          <PaletteItem key={item.id} item={item} onSelect={onSelect} />
        ))}
      </CommandGroup>
    );
  }

  return (
    <>
      {Array.from(grouped.entries()).map(([groupKey, groupItems]) => (
        <CommandGroup key={groupKey} heading={groupKey || undefined}>
          {groupItems.map((item) => (
            <PaletteItem key={item.id} item={item} onSelect={onSelect} />
          ))}
        </CommandGroup>
      ))}
    </>
  );
}

// ── Main Component ──

/**
 * Renders a command palette as a searchable list of items. Positioned via a Radix Popover virtual
 * anchor when `position` is provided, or centered in the viewport when omitted.
 */
export function OverlayCommandPalette({
  items,
  position,
  anchor,
  side = 'bottom',
  placeholder = 'Search...',
  maxWidth = DEFAULT_MAX_WIDTH,
  maxHeight = DEFAULT_MAX_HEIGHT,
  onSelect,
  onDismiss,
}: OverlayCommandPaletteProps) {
  // eslint-disable-next-line no-null/no-null
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the search input on mount. Called synchronously after DOM commit so cmdk receives
  // keyboard events (including arrow keys) immediately without a setTimeout tick delay.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onDismiss();
      }
    },
    [onDismiss],
  );

  const paletteContent = (
    <Command
      data-overlay-command-palette
      className="tw-rounded-lg tw-border tw-shadow-md"
      onKeyDown={handleKeyDown}
    >
      <CommandInput ref={inputRef} placeholder={placeholder} />
      <CommandList style={{ maxHeight: maxHeight - 44 }}>
        <CommandEmpty>No results found</CommandEmpty>
        <GroupedItems items={items} onSelect={onSelect} />
      </CommandList>
    </Command>
  );

  // Centered mode — no anchor position
  if (!position) {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        data-overlay-command-palette-backdrop
        className="tw-fixed tw-inset-0 tw-flex tw-items-start tw-justify-center tw-pt-[20vh]"
        style={{ zIndex: Z_INDEX_OVERLAY }}
        onClick={(e) => {
          // Dismiss only when clicking the backdrop itself, not the palette content
          if (e.target === e.currentTarget) onDismiss();
        }}
      >
        <div style={{ width: maxWidth, maxWidth }}>{paletteContent}</div>
      </div>
    );
  }

  // Anchored mode — position via Radix Popover virtual anchor
  const handleOpenChange = (open: boolean) => {
    if (!open) onDismiss();
  };

  return (
    <Popover open onOpenChange={handleOpenChange}>
      <PopoverAnchor asChild>
        <div
          data-overlay-command-palette-anchor
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            width: anchor?.width ?? 0,
            height: anchor?.height ?? 0,
            pointerEvents: 'none',
          }}
        />
      </PopoverAnchor>
      <PopoverContent
        data-overlay-command-palette
        className="tw-p-0"
        side={side}
        align="start"
        sideOffset={4}
        style={{
          zIndex: Z_INDEX_OVERLAY,
          width: maxWidth,
          maxWidth,
        }}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <PopoverPrimitive.Arrow className="tw-fill-popover tw-stroke-border tw-stroke-1" />
        {paletteContent}
      </PopoverContent>
    </Popover>
  );
}
