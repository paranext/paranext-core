import {
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Separator } from '@/components/shadcn-ui/separator';
import { PickerAction, ResourceItem, ResourceType } from './resource-picker.types';
import { ResourcePickerItem, primaryActionFor } from './resource-picker-item';
import {
  SearchRow,
  groupItems,
  matchesSearch,
  partitionByLanguage,
  FEW_RESULTS_THRESHOLD,
} from './resource-picker-shared';
import {
  ResourcePickerLocalizedStrings,
  RESOURCE_PICKER_STRING_KEYS,
  localizeResourcePicker as L,
} from './resource-picker.strings';

export { RESOURCE_PICKER_STRING_KEYS };
export type { ResourcePickerLocalizedStrings };

/** Props for {@link ResourcePicker}. */
export interface ResourcePickerProps {
  /** Full set of resources the user can act on — included, installed, and available. */
  items: ResourceItem[];
  /**
   * IDs of items currently displayed on the calling surface. Single-select hosts pass 0 or 1 entry;
   * multi-select hosts pass any number. The picker emphasizes these rows visually and emits
   * `toggleDisplay` on click — the host applies its own single/multi semantics.
   */
  displayedIds?: string[];
  /**
   * Preferred languages for filtering (typically the user's UI language + any languages they read).
   * Drives the default state of the language filter and unlocks the "Preferred" preset.
   */
  preferredLanguages?: string[];
  /**
   * If provided, restricts the picker to items whose `data.type` matches one of these. Useful for
   * scoping a picker to a specific kind of resource (e.g. scripture texts only, commentaries only).
   * When omitted, every item is eligible.
   */
  allowedResourceTypes?: ResourceType[];
  /**
   * Hide the X (remove) affordance on included rows. Use in surfaces that are read-mostly or where
   * remove is reachable through another control. Defaults to `true` (X is shown).
   */
  allowRemove?: boolean;
  /** Receives every user action. Host updates `items` and `displayedIds` accordingly. */
  onAction: (action: PickerAction) => void;
  /** Localized strings; pass `RESOURCE_PICKER_STRING_KEYS` to `useLocalizedStrings`. */
  localizedStrings?: ResourcePickerLocalizedStrings;
}

/**
 * # Resource picker (full)
 *
 * The library-style picker showing every resource — included, installed, and available to download
 * — for managing project membership. Use this as the body of a modal or a wide panel.
 *
 * For the in-context single-select dropdown that switches _which_ included resource is shown (and
 * links out to this picker via a "Browse library" button), see {@link ResourcePickerCompact}.
 *
 * ## What it shows
 *
 * Three groups of resources, top-to-bottom:
 *
 * 1. **Included** — already attached to the project. Click a row to ask the host to show/hide that
 *    resource on the calling surface. Hover or focus a non-locked row to reveal an X that removes
 *    the resource from the project (or press `Delete`/`Backspace`).
 * 2. **On your computer** — already local but not yet in this project. Click to include AND display.
 * 3. **Available to download** — not local. Click to download, include, AND display. A spinner appears
 *    on the row while the download is in progress.
 *
 * When a search produces few in-filter results, a "Maybe you meant…" section is appended with
 * out-of-filter matches.
 *
 * ## Why this picker is presentational
 *
 * The host owns `items`, `displayedIds`, the project state, and the surrounding modal's open state.
 * Every interaction emits a `PickerAction`; the picker never mutates state or closes itself. That
 * keeps single-select vs multi-select, auto-display vs explicit-display, and "should the surface
 * close on this action?" entirely the host's policy.
 *
 * ## Keyboard model
 *
 * The list is a `listbox` with roving tabindex:
 *
 * | Key                    | Effect                                     |
 * | ---------------------- | ------------------------------------------ |
 * | `↓` / `↑`              | Move focus to next / previous row          |
 * | `Home` / `End`         | Move focus to first / last row             |
 * | `Enter` / `Space`      | Activate the focused row's primary action  |
 * | `Delete` / `Backspace` | Remove the focused non-locked included row |
 * | `Tab`                  | Leave the list (search, language filter)   |
 *
 * Focus is preserved across action-driven re-renders.
 *
 * ## Responsive collapse
 *
 * Uses container queries so each row decides its layout based on the picker's container width:
 *
 * - `<480px` → language chip collapses to a monospace 3-letter code
 * - `<360px` → resource name collapses to its abbreviation
 *
 * Tooltips carry the full information.
 */
export function ResourcePicker({
  items,
  displayedIds,
  preferredLanguages,
  allowedResourceTypes,
  allowRemove = true,
  onAction,
  localizedStrings,
}: ResourcePickerProps) {
  const [search, setSearch] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(preferredLanguages ?? []);

  const inScope = useMemo(() => {
    if (!allowedResourceTypes || allowedResourceTypes.length === 0) return items;
    return items.filter((i) => allowedResourceTypes.includes(i.data.type));
  }, [items, allowedResourceTypes]);

  const allLanguages = useMemo(
    () => Array.from(new Set(inScope.map((i) => i.data.bestLanguageName))).sort(),
    [inScope],
  );

  const { searched, expanded } = useMemo(() => {
    const matched = inScope.filter((i) => matchesSearch(i, search));
    const { inFilter, outOfFilter } = partitionByLanguage(matched, selectedLanguages);
    return {
      searched: inFilter,
      expanded: search.length > 0 && inFilter.length <= FEW_RESULTS_THRESHOLD ? outOfFilter : [],
    };
  }, [inScope, search, selectedLanguages]);

  const groups = groupItems(searched);
  const visibleRows: ResourceItem[] = useMemo(
    () => [...groups.included, ...groups.installed, ...groups.available, ...expanded],
    [groups.included, groups.installed, groups.available, expanded],
  );

  // Listbox keyboard navigation (roving tabindex)
  const [activeId, setActiveId] = useState<string | undefined>();
  const rowRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const pendingFocusIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (visibleRows.length === 0) {
      setActiveId(undefined);
      return;
    }
    if (!activeId || !visibleRows.some((r) => r.data.dblEntryUid === activeId)) {
      setActiveId(visibleRows[0].data.dblEntryUid);
    }
  }, [visibleRows, activeId]);

  useLayoutEffect(() => {
    const id = pendingFocusIdRef.current;
    if (!id) return;
    pendingFocusIdRef.current = undefined;
    const el = rowRefs.current.get(id);
    if (el) {
      setActiveId(id);
      el.focus();
    }
  }, [items, displayedIds]);

  const focusRow = (id: string) => {
    setActiveId(id);
    requestAnimationFrame(() => rowRefs.current.get(id)?.focus());
  };

  const onListKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (visibleRows.length === 0) return;
    const idx = visibleRows.findIndex((r) => r.data.dblEntryUid === activeId);
    const target = visibleRows[idx];

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = visibleRows[Math.min(idx + 1, visibleRows.length - 1)];
      if (next) focusRow(next.data.dblEntryUid);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = visibleRows[Math.max(idx - 1, 0)];
      if (prev) focusRow(prev.data.dblEntryUid);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusRow(visibleRows[0].data.dblEntryUid);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusRow(visibleRows[visibleRows.length - 1].data.dblEntryUid);
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (!target) return;
      e.preventDefault();
      pendingFocusIdRef.current = target.data.dblEntryUid;
      onAction(primaryActionFor(target));
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      if (
        allowRemove &&
        target &&
        target.status.kind === 'included' &&
        !target.status.lockedIncluded
      ) {
        e.preventDefault();
        const next = visibleRows[idx + 1] ?? visibleRows[idx - 1];
        pendingFocusIdRef.current = next?.data.dblEntryUid;
        onAction({ type: 'remove', item: target });
      }
    }
  };

  const handleLanguageClick = (lang: string) => setSelectedLanguages([lang]);

  const renderRow = (it: ResourceItem) => (
    <ResourcePickerItem
      key={it.data.dblEntryUid}
      ref={(el) => {
        if (el) rowRefs.current.set(it.data.dblEntryUid, el);
        else rowRefs.current.delete(it.data.dblEntryUid);
      }}
      item={it}
      isDisplayed={displayedIds?.includes(it.data.dblEntryUid) ?? false}
      isActive={activeId === it.data.dblEntryUid}
      hideRemove={!allowRemove}
      onAction={onAction}
      onLanguageClick={handleLanguageClick}
      localizedStrings={localizedStrings}
    />
  );

  const isSearching = search.length > 0;

  return (
    <div className="tw:flex tw:w-full tw:flex-col tw:overflow-hidden">
      <SearchRow
        search={search}
        onSearch={setSearch}
        selectedLanguages={selectedLanguages}
        preferredLanguages={preferredLanguages}
        onLanguagesChange={setSelectedLanguages}
        allLanguages={allLanguages}
        localizedStrings={localizedStrings}
      />
      <Separator />

      {/*
        Sizing: list area shrinks to fit content with a hard max-height cap. While searching, a
        min-height kicks in so the picker doesn't shrink and jitter as results narrow.
      */}
      <div
        role="listbox"
        tabIndex={-1}
        aria-label={L(localizedStrings, '%resourcePicker_listbox_label%')}
        onKeyDown={onListKeyDown}
        className={`tw:@container tw:overflow-y-auto tw:p-1 tw:focus:outline-none tw:max-h-[24rem] ${
          isSearching ? 'tw:min-h-[14rem]' : ''
        }`}
      >
        {groups.included.length > 0 && (
          <Group label={L(localizedStrings, '%resourcePicker_group_included%')}>
            {groups.included.map(renderRow)}
          </Group>
        )}
        {groups.installed.length > 0 && (
          <Group label={L(localizedStrings, '%resourcePicker_group_installed%')}>
            {groups.installed.map(renderRow)}
          </Group>
        )}
        {groups.available.length > 0 && (
          <Group label={L(localizedStrings, '%resourcePicker_group_available%')}>
            {groups.available.map(renderRow)}
          </Group>
        )}
        {expanded.length > 0 && (
          <Group label={L(localizedStrings, '%resourcePicker_group_maybeYouMeant%')} muted>
            {expanded.map(renderRow)}
          </Group>
        )}
        {visibleRows.length === 0 && (
          <p className="tw:py-8 tw:text-center tw:text-sm tw:text-muted-foreground">
            {L(
              localizedStrings,
              isSearching || selectedLanguages.length > 0
                ? '%resourcePicker_empty_noMatches%'
                : '%resourcePicker_empty_noResults%',
            )}
          </p>
        )}
      </div>
    </div>
  );
}

function Group({
  label,
  muted,
  children,
}: {
  label: string;
  muted?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="tw:mb-1">
      <div className="tw:px-2 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground">
        {label}
      </div>
      <div className={muted ? 'tw:opacity-70' : undefined}>{children}</div>
    </div>
  );
}
