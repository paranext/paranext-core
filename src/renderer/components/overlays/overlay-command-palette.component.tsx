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
import {
  resolveAndRemoveOverlay,
  updateCommandPaletteState,
} from '@renderer/services/overlays/overlay-store';
import {
  CommandPaletteItem,
  OverlayEntry,
  PaletteSearchField,
} from '@renderer/services/overlays/overlay.service-model';
import { filterPaletteItems } from '@renderer/services/overlays/overlay-palette-filter.util';
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
  useState,
} from 'react';
import { groupBy, isLocalizeKey, LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import type { PaletteKeyForwarding } from 'platform-bible-utils/experimental';

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
  /**
   * Accessible name for the passive mode's list of items. Passive mode only — active mode's list is
   * cmdk's own `CommandList`, which names itself. Defaults to 'Command palette results'.
   */
  listAriaLabel?: string;
  /** Maximum width in pixels. Defaults to 500. */
  maxWidth?: number;
  /** Maximum height in pixels. Defaults to 400. */
  maxHeight?: number;
  /**
   * When true, renders without stealing focus on mount, and its search input is a read-only DISPLAY
   * of the externally-driven `filterText` rather than an editable field. Items are filtered via
   * {@link filterPaletteItems} using that same `filterText`, and highlighted via the
   * externally-driven `selectedIndex` prop, instead of cmdk's own input-driven filter/keyboard
   * navigation. Item click still selects. Defaults to false.
   */
  passive?: boolean;
  /**
   * Current filter text. Passive mode only — ignored when `passive` is false (the active mode's
   * input owns its own value, seeded and overridden by this prop). Shown verbatim in the passive
   * search input so the user can see the query they are typing into the requesting WebView.
   */
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
  /**
   * Reports filter text the user types into the ACTIVE palette's input, so the store-connected
   * owner can mirror it into the overlay store — keeping a forwarded
   * `commitCommandPaletteSelection` (which resolves from the STORE's filterText/selectedIndex) in
   * agreement with what is displayed. Active mode only; passive mode's input is read-only and
   * reports nothing — its query is already owned by the session that drives `filterText`.
   */
  onFilterTextChange?: (filterText: string) => void;
  /**
   * Reports arrow-key highlight moves in the ACTIVE palette as an absolute index into the filtered
   * list (same store-mirroring rationale as {@link onFilterTextChange}).
   */
  onSelectedIndexChange?: (selectedIndex: number) => void;
  /**
   * Keys the requesting session claims, and where to send them — see
   * {@link CommandPaletteRequest.keyForwarding}. Forwarded keys are handed over verbatim and acted
   * on by nothing here, so the session's own semantics run whether it or this palette holds focus.
   */
  keyForwarding?: PaletteKeyForwarding;
  /**
   * Which item text fields the filter matches against — see
   * {@link CommandPaletteRequest.searchFields}. Threaded into the same {@link filterPaletteItems}
   * call the host uses for commit resolution, so what is on screen and what a commit selects agree
   * on which fields match.
   */
  searchFields?: readonly PaletteSearchField[];
};

// ── Constants ──

const DEFAULT_MAX_WIDTH = 500;
const DEFAULT_MAX_HEIGHT = 400;
/**
 * Vertical space the search input takes out of `maxHeight` before the list gets the rest. Both
 * modes render the input, so both reserve it.
 */
const SEARCH_INPUT_RESERVED_HEIGHT = 44;

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
      {/* `muted` de-emphasizes the text only (e.g. PT9's grey cue for non-basic markers). Unlike
          `disabled`, which dims the whole item container and blocks interaction, a muted item stays
          highlightable and selectable — so the reduced opacity belongs here on the text block, not
          on the container. */}
      <div
        className={cn(
          'tw:flex tw:flex-1 tw:flex-col tw:overflow-hidden',
          item.muted && 'tw:opacity-60',
        )}
      >
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
  return (
    <CommandItem
      // Identity value, not search text: filtering is done OUTSIDE cmdk (shouldFilter=false on the
      // root) with the same filterPaletteItems the host commit uses, so cmdk only needs a unique
      // value per item to drive its highlight/selection.
      value={item.id}
      disabled={item.disabled}
      onSelect={() => onSelect(item.id)}
      // Toolbar-button discipline: pressing the mouse button must not move focus (from the
      // palette's own search input here, or — when the input lost the cross-frame focus fight —
      // from the requesting editor). cmdk selects on click, which still fires after a
      // default-prevented mousedown.
      onMouseDown={(event) => event.preventDefault()}
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
      // The passive palette's whole contract is that focus stays in the requesting editor — but a
      // mouse PRESS on an item would move focus to this document before the click commit ever
      // reaches the editor, blurring it and nulling Lexical's live selection (the commit then
      // applies the marker at the document tail instead of the caret). preventDefault on mousedown
      // keeps focus where it is; the click still fires and selects.
      onMouseDown={(event) => event.preventDefault()}
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
  // `groupBy` keys the Map in first-appearance order, which is what `hasGroups` and the render
  // loop below rely on.
  const grouped = useMemo(() => groupBy(items, (item) => item.group ?? ''), [items]);

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
  listAriaLabel = 'Command palette results',
  maxWidth = DEFAULT_MAX_WIDTH,
  maxHeight = DEFAULT_MAX_HEIGHT,
  passive = false,
  filterText,
  selectedIndex = 0,
  onSelect,
  onDismiss,
  onFilterTextChange,
  onSelectedIndexChange,
  keyForwarding,
  searchFields,
}: OverlayCommandPalettePresentationalProps) {
  // React's useRef requires null as the initial value for DOM refs
  // eslint-disable-next-line no-null/no-null
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the search input on mount. Skipped entirely in passive mode, which renders no
  // search input and must never steal focus from the requesting WebView.
  //
  // A single synchronous focus() reliably LOSES the focus
  // fight when the palette opens while an editor webview iframe holds focus — the iframe's own
  // focus handling lands after this effect, leaving document.activeElement on the iframe, so
  // typing went to the document (replacing the selection), arrows never reached cmdk, and the
  // palette's Escape handler never fired. Retry across animation frames until the focus sticks
  // (bounded, and cancelled if the palette unmounts first).
  useEffect(() => {
    if (passive) return () => {};
    let rafId: number | undefined;
    let attempts = 0;
    const MAX_FOCUS_ATTEMPTS = 20;
    const tryFocus = () => {
      const input = inputRef.current;
      if (!input) return;
      input.focus();
      if (document.activeElement === input || attempts >= MAX_FOCUS_ATTEMPTS) return;
      attempts += 1;
      rafId = requestAnimationFrame(tryFocus);
    };
    tryFocus();
    return () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, [passive]);

  // Active-mode search text: locally typed AND externally driven. When the cross-frame focus
  // fight loses (the editor iframe re-grabs focus on every Lexical commit), the extension
  // forwards keystrokes via updateCommandPalette instead, and those must narrow the ACTIVE list
  // too. Controlled value; external updates win; local typing mirrors back out via
  // onFilterTextChange so the store stays the single source of truth for commits.
  const [inputValue, setInputValue] = useState(filterText ?? '');
  useEffect(() => {
    setInputValue(filterText ?? '');
  }, [filterText]);

  // Active-mode highlight: local mirror of the externally-driven selectedIndex, moved by cmdk's
  // own arrow-key handling (reported back out via onSelectedIndexChange) and overridden whenever
  // the external value changes (a forwarded moveSelection).
  const [activeSelectedIndex, setActiveSelectedIndex] = useState(selectedIndex);
  useEffect(() => {
    setActiveSelectedIndex(selectedIndex);
  }, [selectedIndex]);

  const handleInputValueChange = useCallback(
    (value: string) => {
      setInputValue(value);
      onFilterTextChange?.(value);
    },
    [onFilterTextChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Keys the requesting session claimed go straight back to it, ahead of everything this
      // palette would otherwise do with them — its own Escape below, and cmdk's navigation (cmdk
      // calls this handler first and skips its own handling when the event is default-prevented).
      // The session decides whether to claim; an unclaimed forwarded key still behaves normally.
      if (keyForwarding?.keys.includes(e.key)) {
        keyForwarding.onKey({
          key: e.key,
          keyCode: e.keyCode,
          isComposing: e.nativeEvent.isComposing,
          ctrlKey: e.ctrlKey,
          metaKey: e.metaKey,
          altKey: e.altKey,
          shiftKey: e.shiftKey,
          // Through the native event: the DOM signature takes any string, while React's
          // synthetic wrapper narrows the argument to its ModifierKey union.
          getModifierState: (keyArg: string) => e.nativeEvent.getModifierState(keyArg),
          preventDefault: () => e.preventDefault(),
          stopPropagation: () => e.stopPropagation(),
        });
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        onDismiss();
      }
    },
    [keyForwarding, onDismiss],
  );

  // BOTH modes bypass cmdk's own fuzzy filtering: the filtered list is computed with the same
  // filterPaletteItems function (and mode) the host uses to resolve a commit — keeping what's on
  // screen and what the host would select in agreement. Passive filters by the externally-driven
  // filterText; active by the input mirror (which external filterText updates overwrite).
  const filteredItems = useMemo(
    () =>
      filterPaletteItems(
        items,
        passive ? filterText : inputValue,
        passive ? 'passive' : 'active',
        searchFields,
      ),
    [items, passive, filterText, inputValue, searchFields],
  );
  // Highlight resolution, identical in both modes: clamp the driving index to the (possibly
  // just-narrowed) filtered list, exactly as the store clamps on every update, so neither mode can
  // point past the end of its own list. Passive is driven by the external `selectedIndex`, active
  // by the local mirror cmdk's arrow keys move.
  const drivingSelectedIndex = passive ? selectedIndex : activeSelectedIndex;
  const highlightedIndex = Math.min(
    Math.max(drivingSelectedIndex, 0),
    Math.max(0, filteredItems.length - 1),
  );
  const highlightedItem: CommandPaletteItem | undefined = filteredItems[highlightedIndex];

  // cmdk reports arrow-key highlight moves via the root's onValueChange (values are item ids —
  // see PaletteItem). Mirror into local state and out to the store owner. cmdk normalizes value
  // casing internally, so match ids case-insensitively.
  const handleCmdkValueChange = useCallback(
    (value: string) => {
      const index = filteredItems.findIndex(
        (item) => item.id.toLowerCase() === value.toLowerCase(),
      );
      if (index < 0 || index === activeSelectedIndex) return;
      setActiveSelectedIndex(index);
      onSelectedIndexChange?.(index);
    },
    [filteredItems, activeSelectedIndex, onSelectedIndexChange],
  );

  // Stable DOM ids for passive options so the listbox's aria-activedescendant can reference the
  // highlighted item (focus never enters the palette, so this is the accessible-selection signal).
  const passiveIdBase = useId();
  const getPassiveItemDomId = useCallback(
    (itemId: string) => `${passiveIdBase}-option-${encodeURIComponent(itemId)}`,
    [passiveIdBase],
  );

  // ONE search input for both modes: the palette must look and read the same however it was
  // opened, so the user always sees the query they are typing. The modes differ only in who owns
  // that query. Active mode: the input is focused and edited directly, and mirrors its value out.
  // Passive mode: focus never leaves the requesting WebView — the session owner there claims the
  // keystrokes and feeds them back through `filterText` — so the input is a read-only display of
  // that query and is kept out of the tab order. Making it editable would break the palette: a
  // focused input means the WebView is NOT focused, and both session owners gate their keydown
  // tables on editor focus, so every ratified Space/Enter/Escape semantic would stop running.
  const searchInput = (
    <CommandInput
      ref={passive ? undefined : inputRef}
      placeholder={placeholder}
      value={passive ? (filterText ?? '') : inputValue}
      onValueChange={passive ? undefined : handleInputValueChange}
      readOnly={passive}
      tabIndex={passive ? -1 : undefined}
      // Space-on-empty-input picks the highlighted item (the Enter UX) for plain callers, where
      // the list is the whole point. A palette with key forwarding must NOT opt in: its session
      // owns Space (the wrap commit / visible refusal), so a local pick would bypass the session's
      // own resolution.
      spaceSelectsHighlightedItem={!keyForwarding}
    />
  );

  const paletteContent = passive ? (
    <Command
      data-overlay-command-palette
      className="tw:rounded-lg tw:border"
      onKeyDown={handleKeyDown}
      // Filtering happens OUTSIDE cmdk in BOTH modes (filteredItems above). Passive mode must say
      // so explicitly, even though it registers no cmdk items: cmdk's `Group` renders only when
      // `shouldFilter === false`, or the search is empty, or the group appears in
      // `filtered.groups`. The search is NOT empty while the user types (cmdk's `Input` pushes a
      // controlled `value` into its own `search` state), and a group with no cmdk-registered
      // items is never in `filtered.groups` — so without this flag every group would go `hidden`
      // on the first keystroke, emptying a list whose items the session correctly kept. Beware
      // that the "No results found" element sits outside the group and would keep rendering,
      // disguising such hiding as a filter bug.
      shouldFilter={false}
    >
      {searchInput}
      {/* Not cmdk's CommandList: cmdk overrides a caller-supplied aria-activedescendant with its
          own (empty in passive mode, which registers no cmdk items), so passive mode renders its
          own listbox carrying the classes CommandList applies — including a visible scrollbar when
          the list overflows. tabIndex matches CommandList; focus stays in the requesting WebView,
          so aria-activedescendant alone is inert here (it only speaks from a focused element) —
          the overlay service announces highlight and match-count changes through its live region
          instead. The listbox still names itself for a screen reader that reaches it another way,
          e.g. by browsing the page. */}
      <div
        data-slot="command-list"
        role="listbox"
        aria-label={listAriaLabel}
        tabIndex={-1}
        aria-activedescendant={
          highlightedItem ? getPassiveItemDomId(highlightedItem.id) : undefined
        }
        className="pr-twp tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none"
        style={{ maxHeight: maxHeight - SEARCH_INPUT_RESERVED_HEIGHT }}
      >
        {filteredItems.length === 0 ? (
          <div data-slot="command-empty" className="tw:py-6 tw:text-center tw:text-sm">
            {noResultsText}
          </div>
        ) : (
          <GroupedItems
            items={filteredItems}
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
      // Filtering happens OUTSIDE cmdk (filteredItems above) so display and host commit share one
      // algorithm; cmdk only drives the highlight, two-way-synced with the store via the
      // controlled value below.
      shouldFilter={false}
      value={highlightedItem?.id ?? ''}
      onValueChange={handleCmdkValueChange}
    >
      {searchInput}
      <CommandList style={{ maxHeight: maxHeight - SEARCH_INPUT_RESERVED_HEIGHT }}>
        <CommandEmpty>{noResultsText}</CommandEmpty>
        <GroupedItems
          items={filteredItems}
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
/** Accessible name for the passive palette's list of items */
const DEFAULT_LIST_ARIA_LABEL_KEY: LocalizeKey = '%overlay_aria_commandPaletteList%';

/** Helper to push a value to the keys array if it is a LocalizeKey */
function pushIfKey(keys: LocalizeKey[], value: string | LocalizeKey | undefined): void {
  if (typeof value === 'string' && isLocalizeKey(value)) keys.push(value);
}

/**
 * Collects all localization keys from a command palette configuration.
 *
 * Extracts localization keys from the provided command palette items and placeholder, returning an
 * array of keys that need to be localized. Always includes the default "no results" and list
 * accessible-name keys.
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
  const keys: LocalizeKey[] = [DEFAULT_NO_RESULTS_KEY, DEFAULT_LIST_ARIA_LABEL_KEY];
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

  const localizedListAriaLabel = useMemo(
    () => localizedStrings[DEFAULT_LIST_ARIA_LABEL_KEY] ?? 'Command palette results',
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

  // Mirror the ACTIVE palette's local input/highlight into the overlay store, so a forwarded
  // commitCommandPaletteSelection (which resolves from the STORE's filterText/selectedIndex)
  // always picks exactly what the palette displays — the store is the single source of truth
  // for selection, regardless of where the keystrokes landed. The filter mode comes from the
  // request so these item counts match the host's own filterPaletteItems calls exactly.
  const filterMode = overlay.request.passive ? 'passive' : 'active';

  const handleFilterTextChange = useCallback(
    (filterText: string) => {
      updateCommandPaletteState(overlay.id, {
        filterText,
        // A new filter produces a NEWLY RANKED list, so the old highlight index means nothing in
        // it — same rule as the host's forwarded updateCommandPalette path. Carrying the index
        // forward (the store only clamps) left the highlight on whatever now sat at the stale
        // position, and Enter committed that item.
        selectedIndex: 0,
        itemCount: filterPaletteItems(
          overlay.items,
          filterText,
          filterMode,
          overlay.request.searchFields,
        ).length,
      });
    },
    [overlay.id, overlay.items, filterMode, overlay.request.searchFields],
  );

  const handleSelectedIndexChange = useCallback(
    (selectedIndex: number) => {
      updateCommandPaletteState(overlay.id, {
        selectedIndex,
        itemCount: filterPaletteItems(
          overlay.items,
          overlay.filterText,
          filterMode,
          overlay.request.searchFields,
        ).length,
      });
    },
    [overlay.id, overlay.items, overlay.filterText, filterMode, overlay.request.searchFields],
  );

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
      listAriaLabel={localizedListAriaLabel}
      maxWidth={overlay.request.maxWidth}
      maxHeight={overlay.request.maxHeight}
      passive={overlay.request.passive}
      filterText={overlay.filterText}
      selectedIndex={overlay.selectedIndex}
      onSelect={handleSelect}
      onDismiss={handleDismiss}
      onFilterTextChange={handleFilterTextChange}
      onSelectedIndexChange={handleSelectedIndexChange}
      keyForwarding={overlay.request.keyForwarding}
      searchFields={overlay.request.searchFields}
    />
  );
}
