/**
 * Overlay command palette component. Renders a searchable, filterable list of items using the
 * shadcn Command component (cmdk). Positioned via a virtual anchor (same pattern as
 * overlay-popover) or centered in the viewport when no position is provided.
 *
 * Contains both the presentational component (OverlayCommandPalettePresentational, exported for
 * tests and stories) and the store-connected component (OverlayCommandPalette) that resolves
 * LocalizeKeys and connects to the overlay store.
 */

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { resolveAndRemoveOverlay } from '@renderer/services/overlays/overlay-store';
import {
  CommandPaletteItem,
  OverlayEntry,
} from '@renderer/services/overlays/overlay.service-model';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Z_INDEX_OVERLAY,
} from 'platform-bible-react';
import { type KeyboardEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { isLocalizeKey, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

// ── Public Types ──

/** Props for the presentational OverlayCommandPalettePresentational component */
export type OverlayCommandPalettePresentationalProps = {
  /** The selectable items to display */
  items: CommandPaletteItem[];
  /** Document-relative position for the palette anchor. Omit for centered mode. */
  position?: { x: number; y: number };
  /** Optional anchor dimensions */
  anchor?: { width?: number; height?: number };
  /** Preferred side of the anchor. Defaults to 'bottom'. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Text shown when no items match the search filter. Defaults to 'No results found'. */
  noResultsText?: string;
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
  item: CommandPaletteItem;
  onSelect: (id: string) => void;
}) {
  // Build a searchable value from label + description + badge for cmdk filtering
  const searchValue = [item.label, item.description, item.badge].filter(Boolean).join(' ');

  return (
    <CommandItem
      value={searchValue}
      disabled={item.disabled}
      onSelect={() => onSelect(item.id)}
      className="tw:flex tw:items-center tw:gap-2"
    >
      {item.icon && (
        <span className="tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center tw:text-muted-foreground">
          {item.icon}
        </span>
      )}
      <div className="tw:flex tw:flex-1 tw:flex-col tw:overflow-hidden">
        <span className="tw:truncate">{item.label}</span>
        {item.description && (
          <span className="tw:truncate tw:text-xs tw:text-muted-foreground">
            {item.description}
          </span>
        )}
      </div>
      {item.badge && (
        <span
          className="tw:ms-auto tw:shrink-0 tw:rounded tw:bg-muted tw:py-0.5 tw:text-xs tw:text-muted-foreground"
          style={{ paddingLeft: '0.375rem', paddingRight: '0.375rem' }}
        >
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
  items: CommandPaletteItem[];
  onSelect: (id: string) => void;
}) {
  const grouped = useMemo(() => {
    const groups = new Map<string, CommandPaletteItem[]>();
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

// ── Presentational Component ──

/**
 * Pure presentational command palette component. Renders a searchable list of items using cmdk.
 * Positioned via a Radix Popover virtual anchor when `position` is provided, or centered in the
 * viewport when omitted.
 *
 * This component has no dependency on the overlay store or localization hooks. Use it directly in
 * tests and Storybook stories. For production rendering via the overlay service, use
 * {@link OverlayCommandPalette} instead — it handles LocalizeKey resolution and store lifecycle.
 */
export function OverlayCommandPalettePresentational({
  items,
  position,
  anchor,
  side = 'bottom',
  placeholder = 'Search...',
  noResultsText = 'No results found',
  maxWidth = DEFAULT_MAX_WIDTH,
  maxHeight = DEFAULT_MAX_HEIGHT,
  onSelect,
  onDismiss,
}: OverlayCommandPalettePresentationalProps) {
  // React's useRef requires null as the initial value for DOM refs
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
      className="tw:rounded-lg tw:border tw:shadow-md"
      onKeyDown={handleKeyDown}
    >
      <CommandInput ref={inputRef} placeholder={placeholder} />
      <CommandList style={{ maxHeight: maxHeight - 44 }}>
        <CommandEmpty>{noResultsText}</CommandEmpty>
        <GroupedItems items={items} onSelect={onSelect} />
      </CommandList>
    </Command>
  );

  // Centered mode — no anchor position
  if (!position) {
    return (
      // Backdrop handles click-to-dismiss; keyboard events (Escape) are handled by the child Command component
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        data-overlay-command-palette-backdrop
        className="tw:fixed tw:inset-0 tw:flex tw:items-start tw:justify-center"
        style={{ zIndex: Z_INDEX_OVERLAY, paddingTop: '20vh' }}
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
        className="tw:p-0"
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
        <PopoverPrimitive.Arrow
          style={{
            fill: 'hsl(var(--popover))',
            stroke: 'hsl(var(--border))',
            strokeWidth: 1,
          }}
        />
        {paletteContent}
      </PopoverContent>
    </Popover>
  );
}

// ── Localization Helpers ──

// Platform-level default keys for search placeholder and no-results text
const DEFAULT_PLACEHOLDER_KEY: LocalizeKey = '%overlay_commandPalette_searchPlaceholder%';
const DEFAULT_NO_RESULTS_KEY: LocalizeKey = '%overlay_commandPalette_noResults%';

/** Helper to push a value to the keys array if it is a LocalizeKey */
function pushIfKey(keys: LocalizeKey[], value: string | LocalizeKey | undefined): void {
  if (typeof value === 'string' && isLocalizeKey(value)) keys.push(value);
}

/**
 * Collects all localization keys from a command palette configuration.
 *
 * Extracts localization keys from the provided command palette items and placeholder, returning an
 * array of keys that need to be localized. Always includes the default "no results" key.
 *
 * @param items - Array of command palette items to collect keys from
 * @param placeholder - Optional localization key or placeholder text to display when no items are
 *   shown
 * @returns Array of localization keys found in the items and placeholder, including the default no
 *   results key
 */
function collectCommandPaletteKeys(
  items: CommandPaletteItem[],
  placeholder: string | LocalizeKey | undefined,
): LocalizeKey[] {
  const keys: LocalizeKey[] = [DEFAULT_NO_RESULTS_KEY];
  pushIfKey(keys, placeholder ?? DEFAULT_PLACEHOLDER_KEY);
  items.forEach((item) => {
    pushIfKey(keys, item.label);
    pushIfKey(keys, item.description);
    pushIfKey(keys, item.badge);
  });
  return keys;
}

/** Resolves a string-or-LocalizeKey value using the localized strings map */
function resolveValue(
  value: string | LocalizeKey,
  localizedStrings: LanguageStrings,
): string | LocalizeKey {
  return isLocalizeKey(value) ? (localizedStrings[value] ?? value) : value;
}

/** Resolves LocalizeKey values in command palette items using localized strings */
function localizeCommandPaletteItems(
  items: CommandPaletteItem[],
  localizedStrings: LanguageStrings,
): CommandPaletteItem[] {
  return items.map((item) => ({
    ...item,
    label: resolveValue(item.label, localizedStrings),
    description: item.description ? resolveValue(item.description, localizedStrings) : undefined,
    badge: item.badge ? resolveValue(item.badge, localizedStrings) : undefined,
  }));
}

// ── Store-Connected Component ──

type OverlayCommandPaletteProps = {
  overlay: Extract<OverlayEntry, { type: 'commandPalette' }>;
};

/**
 * Production command palette component. Resolves LocalizeKey values in items (labels, descriptions,
 * badges) and placeholder/no-results text via `useLocalizedStrings`, manages overlay lifecycle, and
 * delegates rendering to {@link OverlayCommandPalettePresentational}.
 *
 * This is the component rendered by `OverlayHost`. Do not use it directly in tests or Storybook —
 * use {@link OverlayCommandPalettePresentational} instead, which accepts plain props without
 * requiring an `OverlayEntry`.
 */
export function OverlayCommandPalette({ overlay }: OverlayCommandPaletteProps) {
  const hasResolved = useRef(false);

  const localizeKeys = useMemo(
    () => collectCommandPaletteKeys(overlay.items, overlay.request.placeholder),
    [overlay.items, overlay.request.placeholder],
  );
  const [localizedStrings] = useLocalizedStrings(localizeKeys);

  const localizedItems = useMemo(
    () => localizeCommandPaletteItems(overlay.items, localizedStrings),
    [overlay.items, localizedStrings],
  );

  const localizedPlaceholder = useMemo(() => {
    const placeholder = overlay.request.placeholder ?? DEFAULT_PLACEHOLDER_KEY;
    return isLocalizeKey(placeholder)
      ? (localizedStrings[placeholder] ?? placeholder)
      : placeholder;
  }, [overlay.request.placeholder, localizedStrings]);

  const localizedNoResults = useMemo(
    () => localizedStrings[DEFAULT_NO_RESULTS_KEY] ?? 'No results found',
    [localizedStrings],
  );

  const handleSelect = useCallback(
    (itemId: string) => {
      if (hasResolved.current) return;
      hasResolved.current = true;
      resolveAndRemoveOverlay(overlay.id, overlay.type, itemId);
    },
    [overlay],
  );

  const handleDismiss = useCallback(() => {
    if (hasResolved.current) return;
    hasResolved.current = true;
    resolveAndRemoveOverlay(overlay.id, overlay.type, undefined);
  }, [overlay]);

  return (
    <OverlayCommandPalettePresentational
      items={localizedItems}
      position={overlay.position}
      anchor={{
        width: overlay.request.anchor?.width,
        height: overlay.request.anchor?.height,
      }}
      side={overlay.request.side}
      placeholder={localizedPlaceholder}
      noResultsText={localizedNoResults}
      maxWidth={overlay.request.maxWidth}
      maxHeight={overlay.request.maxHeight}
      onSelect={handleSelect}
      onDismiss={handleDismiss}
    />
  );
}
