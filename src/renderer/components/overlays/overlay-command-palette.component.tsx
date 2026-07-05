/**
 * Overlay command palette component. Renders a searchable, filterable list of items using the
 * shadcn Command component (cmdk). Positioned via a virtual anchor (same pattern as
 * overlay-popover) or centered in the viewport when no position is provided.
 *
 * Contains both the presentational component (OverlayCommandPalettePresentational, exported for
 * tests and stories) and the store-connected component (OverlayCommandPalette) that resolves
 * LocalizeKeys and connects to the overlay store.
 */

import { Popover as PopoverPrimitive } from 'radix-ui';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { resolveAndRemoveOverlay } from '@renderer/services/overlays/overlay-store';
import {
  CommandPaletteItem,
  filterPaletteItems,
  OverlayEntry,
} from '@renderer/services/overlays/overlay.service-model';
import {
  cn,
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
import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
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
  /**
   * When true, renders without a search input and without stealing focus on mount. Items are
   * filtered via {@link filterPaletteItems} using the externally-driven `filterText` prop, and
   * highlighted via the externally-driven `selectedIndex` prop, instead of cmdk's own input-driven
   * filter/keyboard navigation. Item click still selects. Defaults to false.
   */
  passive?: boolean;
  /** Current filter text. Passive mode only — ignored when `passive` is false. */
  filterText?: string;
  /**
   * Index of the highlighted item within the filtered list. Passive mode only — ignored when
   * `passive` is false. Defaults to 0.
   */
  selectedIndex?: number;
  /** Called when the user selects an item */
  onSelect: (itemId: string) => void;
  /** Called when the palette is dismissed (Escape, click outside) */
  onDismiss: () => void;
};

// ── Constants ──

const DEFAULT_MAX_WIDTH = 500;
const DEFAULT_MAX_HEIGHT = 400;

// ── Internal Components ──

/**
 * Renders the icon, label, description, and badge for a command palette item. Shared between the
 * cmdk-driven active-mode {@link PaletteItem} and the plain-element passive-mode
 * {@link PassivePaletteItem} so the two modes stay visually identical.
 */
function PaletteItemContent({ item }: { item: CommandPaletteItem }) {
  return (
    <>
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
    </>
  );
}

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
      <PaletteItemContent item={item} />
    </CommandItem>
  );
}

/**
 * Renders a single command palette item as a plain element rather than cmdk's `CommandItem` —
 * passive mode bypasses cmdk's own filter/keyboard-navigation entirely (the host drives filtering
 * and selection via `updateCommandPalette`), so highlighting is driven directly by the
 * externally-computed `isHighlighted` flag instead of cmdk's internal hover/keyboard state. Styled
 * with the same classes as `CommandItem` for visual parity, and carries the same `option` role cmdk
 * items have; `id` is referenced by the passive listbox's `aria-activedescendant`. Click still
 * selects.
 */
function PassivePaletteItem({
  id,
  item,
  isHighlighted,
  onSelect,
}: {
  id: string;
  item: CommandPaletteItem;
  isHighlighted: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    // Passive-mode option: click selects; keyboard interaction is driven externally by the host
    // via updateCommandPalette (aria-activedescendant pattern — focus never enters the overlay),
    // so the option itself has no keyboard listener and is intentionally not focusable.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
    <div
      id={id}
      data-slot="command-item"
      role="option"
      aria-selected={isHighlighted}
      aria-disabled={item.disabled}
      onClick={() => {
        if (item.disabled) return;
        onSelect(item.id);
      }}
      className={cn(
        'tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none',
        item.disabled && 'tw:pointer-events-none tw:opacity-50',
        isHighlighted && 'tw:bg-muted tw:text-foreground',
      )}
    >
      <PaletteItemContent item={item} />
    </div>
  );
}

/**
 * Renders items grouped by their group key, or as a single default group. `renderItem` determines
 * how each item is rendered — the cmdk-driven {@link PaletteItem} in active mode, or
 * {@link PassivePaletteItem} in passive mode.
 */
function GroupedItems({
  items,
  renderItem,
}: {
  items: CommandPaletteItem[];
  renderItem: (item: CommandPaletteItem) => ReactNode;
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
    return <CommandGroup>{items.map((item) => renderItem(item))}</CommandGroup>;
  }

  return (
    <>
      {Array.from(grouped.entries()).map(([groupKey, groupItems]) => (
        <CommandGroup key={groupKey} heading={groupKey || undefined}>
          {groupItems.map((item) => renderItem(item))}
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
  passive = false,
  filterText,
  selectedIndex = 0,
  onSelect,
  onDismiss,
}: OverlayCommandPalettePresentationalProps) {
  // React's useRef requires null as the initial value for DOM refs
  // eslint-disable-next-line no-null/no-null
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the search input on mount. Called synchronously after DOM commit so cmdk receives
  // keyboard events (including arrow keys) immediately without a setTimeout tick delay. Skipped
  // entirely in passive mode, which renders no search input and must never steal focus from the
  // requesting WebView.
  useEffect(() => {
    if (passive) return;
    inputRef.current?.focus();
  }, [passive]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onDismiss();
      }
    },
    [onDismiss],
  );

  // Passive mode bypasses cmdk's own input-driven filtering, so the filtered list is computed
  // with the same filterPaletteItems function the host uses to resolve a commit — keeping what's
  // on screen and what the host would select in agreement.
  const passiveFilteredItems = useMemo(
    () => (passive ? filterPaletteItems(items, filterText) : items),
    [passive, items, filterText],
  );
  const highlightedItem: CommandPaletteItem | undefined = passiveFilteredItems[selectedIndex];

  // Stable DOM ids for passive options so the listbox's aria-activedescendant can reference the
  // highlighted item (focus never enters the palette, so this is the accessible-selection signal).
  const passiveIdBase = useId();
  const getPassiveItemDomId = useCallback(
    (itemId: string) => `${passiveIdBase}-option-${encodeURIComponent(itemId)}`,
    [passiveIdBase],
  );

  const paletteContent = passive ? (
    <Command
      data-overlay-command-palette
      className="tw:rounded-lg tw:border"
      onKeyDown={handleKeyDown}
    >
      {/* Not cmdk's CommandList: cmdk overrides a caller-supplied aria-activedescendant with its
          own (empty in passive mode, which registers no cmdk items), so passive mode renders its
          own listbox with CommandList's classes. tabIndex matches CommandList; focus stays in the
          requesting WebView. */}
      <div
        data-slot="command-list"
        role="listbox"
        tabIndex={-1}
        aria-activedescendant={
          highlightedItem ? getPassiveItemDomId(highlightedItem.id) : undefined
        }
        className="pr-twp tw:no-scrollbar tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none"
        style={{ maxHeight: maxHeight - 44 }}
      >
        {passiveFilteredItems.length === 0 ? (
          <div data-slot="command-empty" className="tw:py-6 tw:text-center tw:text-sm">
            {noResultsText}
          </div>
        ) : (
          <GroupedItems
            items={passiveFilteredItems}
            renderItem={(item) => (
              <PassivePaletteItem
                key={item.id}
                id={getPassiveItemDomId(item.id)}
                item={item}
                isHighlighted={item.id === highlightedItem?.id}
                onSelect={onSelect}
              />
            )}
          />
        )}
      </div>
    </Command>
  ) : (
    <Command
      data-overlay-command-palette
      className="tw:rounded-lg tw:border"
      onKeyDown={handleKeyDown}
    >
      <CommandInput ref={inputRef} placeholder={placeholder} />
      <CommandList style={{ maxHeight: maxHeight - 44 }}>
        <CommandEmpty>{noResultsText}</CommandEmpty>
        <GroupedItems
          items={items}
          renderItem={(item) => <PaletteItem key={item.id} item={item} onSelect={onSelect} />}
        />
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
            fill: 'var(--popover)',
            stroke: 'var(--border)',
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
      passive={overlay.request.passive}
      filterText={overlay.filterText}
      selectedIndex={overlay.selectedIndex}
      onSelect={handleSelect}
      onDismiss={handleDismiss}
    />
  );
}
