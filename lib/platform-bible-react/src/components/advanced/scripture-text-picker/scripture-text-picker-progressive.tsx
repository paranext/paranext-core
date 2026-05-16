import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Separator } from '@/components/shadcn-ui/separator';
import { Plus, ArrowLeft } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import { PickerAction, ScriptureTextItem } from './scripture-text-picker.types';
import { ScriptureTextRow, primaryActionFor } from './scripture-text-picker-row';
import {
  SearchRow,
  groupItems,
  matchesSearch,
  partitionByLanguage,
  FEW_RESULTS_THRESHOLD,
} from './scripture-text-picker-shared';
import {
  ScriptureTextPickerLocalizedStrings,
  SCRIPTURE_TEXT_PICKER_STRING_KEYS,
  localizeScriptureTextPicker as L,
} from './scripture-text-picker.strings';

export { SCRIPTURE_TEXT_PICKER_STRING_KEYS };
export type { ScriptureTextPickerLocalizedStrings };

export interface ScriptureTextPickerProgressiveProps {
  /** Full set of scripture texts the user can act on — included, installed, and available. */
  items: ScriptureTextItem[];
  /**
   * IDs of items currently displayed on the calling surface (the scripture viewer or whatever
   * surface opened the picker). Single-select hosts pass 0 or 1 entry; multi-select hosts pass
   * any number. The picker emphasizes these rows visually and emits `toggleDisplay` on click —
   * the host applies its own single/multi semantics.
   *
   * Why the host owns this: "currently displayed" is calling-surface state, not picker state.
   * The same picker serves both single- and multi-select callers without a `mode` prop.
   */
  displayedIds?: string[];
  /**
   * Preferred languages for filtering (typically the user's UI language + any languages they
   * read). Drives the default state of the language filter and unlocks the "Preferred" preset
   * in the language picker. Omit if the user hasn't set preferences.
   */
  preferredLanguages?: string[];
  /** Receives every user action. Host updates `items` and `displayedIds` accordingly. */
  onAction: (action: PickerAction) => void;
  /** Localized strings; pass `SCRIPTURE_TEXT_PICKER_STRING_KEYS` to `useLocalizedStrings`. */
  localizedStrings?: ScriptureTextPickerLocalizedStrings;
}

type View = 'included' | 'all';

/**
 * # Scripture text picker
 *
 * A control for managing which scripture texts a project uses **and** for picking which
 * of those texts the calling surface currently displays. One UI, two jobs — see "Why dual
 * purpose" below.
 *
 * ## What it does
 *
 * The picker shows three groups of scripture texts:
 *
 * 1. **Included** — already attached to the project. Click a row to ask the host to display
 *    that text on the calling surface. Hover or focus a non-locked row to reveal an X that
 *    removes the text from the project (or press `Delete`/`Backspace` while it's focused).
 * 2. **Installed** — already on disk but not yet in this project. Click to include.
 * 3. **Available to download** — not on disk. Click to download and include. A spinner
 *    appears on the row while the download is in progress.
 *
 * A footer button toggles between two views:
 *
 * - `Included only` — just the Included group. Default when the project has more than one
 *   included text (the user opens the picker primarily to switch *what's displayed*).
 * - `Browse all texts (N)` — Included + Installed + Available, with a "Maybe you meant…"
 *   section appended when a search produces few in-filter results. Default when the project
 *   has ≤ 1 included text (the user opens the picker primarily to *add* texts).
 *
 * The initial view is **captured at open time** — it doesn't flip dynamically as the user
 * adds items mid-session. That would yank the Installed/Available list out from under them.
 *
 * ## Why dual purpose
 *
 * Splitting these into two separate UIs (a "Manage project" dialog and a "Which text?"
 * dropdown) would force users to remember which one to open for which job. Users usually
 * want to add a text *and* immediately display it, or remove a text *while* they're picking
 * which to view — the jobs blur in practice. Keeping them in one picker, with a view toggle
 * that captures the right default at open time, lets either intent flow naturally.
 *
 * ## Why this picker is presentational
 *
 * The host owns `items`, `displayedIds`, the project state, and the picker's open state.
 * Every interaction emits a `PickerAction`; the picker never mutates state or closes itself.
 * That keeps single-select vs multi-select, auto-display vs explicit-display, and "should
 * the popover close on this action?" entirely the host's policy — the picker doesn't need
 * a `mode` prop to express them.
 *
 * ## Keyboard model
 *
 * The list is a `listbox` with roving tabindex on the rows:
 *
 * | Key             | Effect                                                       |
 * |-----------------|--------------------------------------------------------------|
 * | `↓` / `↑`       | Move focus to next / previous row                            |
 * | `Home` / `End`  | Move focus to first / last row                               |
 * | `Enter` / `Space` | Activate the focused row's primary action                  |
 * | `Delete` / `Backspace` | Remove the focused non-locked included row            |
 * | `Tab`           | Leave the list (search, language filter, footer button)      |
 * | `Esc`           | (Host concern) close the surrounding popover/dialog          |
 *
 * Focus is preserved across action-driven re-renders — activating an Installed row that
 * moves into the Included group doesn't drop focus.
 *
 * ## Sizing
 *
 * The picker shrinks to fit its content with a hard cap on the list area's height. Once the
 * user starts typing in the search input, the list area also takes a *minimum* height so
 * the picker doesn't shrink and jitter as results narrow.
 *
 * ## Responsive collapse
 *
 * Uses container queries (`@container`) so each row decides its layout based on the picker's
 * container width, not the viewport:
 *
 * - `<480px` → language chip collapses to a monospace 3-letter code
 * - `<360px` → text name collapses to its abbreviation
 *
 * Tooltips on each piece carry the full information.
 *
 * ## Variants
 *
 * Only the **progressive** variant ships. Earlier explorations (unified scroll, tabbed) were
 * removed during design — see `./DESIGN.md` for the rationale.
 *
 * @example Single-select host
 * ```tsx
 * const [items, setItems] = useState(initialItems);
 * const [displayedIds, setDisplayedIds] = useState<string[]>([]);
 *
 * const onAction = (action: PickerAction) => {
 *   if (action.type === 'toggleDisplay') {
 *     setDisplayedIds(prev => prev[0] === action.item.data.dblEntryUid ? [] : [action.item.data.dblEntryUid]);
 *   } else if (action.type === 'include') {
 *     setItems(prev => prev.map(it => it.data.dblEntryUid === action.item.data.dblEntryUid
 *       ? { ...it, status: { kind: 'included' } } : it));
 *   } else if (action.type === 'remove') {
 *     // …
 *   }
 * };
 *
 * <ScriptureTextPickerProgressive
 *   items={items}
 *   displayedIds={displayedIds}
 *   preferredLanguages={['English', 'Spanish']}
 *   onAction={onAction}
 * />
 * ```
 */
export function ScriptureTextPickerProgressive({
  items,
  displayedIds,
  preferredLanguages,
  onAction,
  localizedStrings,
}: ScriptureTextPickerProgressiveProps) {
  const [search, setSearch] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(preferredLanguages ?? []);

  // Initial view captured ONCE on mount based on the project state at open. We don't want the
  // view to flip back to "included" mid-session just because the user added enough items to no
  // longer count as sparse — that would yank Installed/Available out from under them. After mount,
  // only an explicit click on the footer toggle (or an active search) changes the view.
  const [initialView] = useState<View>(() => {
    const includedAtOpen = items.filter((i) => i.status.kind === 'included').length;
    return includedAtOpen <= 1 ? 'all' : 'included';
  });
  const [manualView, setManualView] = useState<View | undefined>(undefined);
  const view: View = search.length > 0 ? 'all' : (manualView ?? initialView);

  const allLanguages = useMemo(
    () => Array.from(new Set(items.map((i) => i.data.bestLanguageName))).sort(),
    [items],
  );

  const { searched, expanded } = useMemo(() => {
    const matched = items.filter((i) => matchesSearch(i, search));
    const { inFilter, outOfFilter } = partitionByLanguage(matched, selectedLanguages);
    return {
      searched: inFilter,
      expanded: search.length > 0 && inFilter.length <= FEW_RESULTS_THRESHOLD ? outOfFilter : [],
    };
  }, [items, search, selectedLanguages]);

  const groups = groupItems(searched);
  const addCount = groups.installed.length + groups.available.length;

  const visibleRows: ScriptureTextItem[] = useMemo(() => {
    if (view === 'included') return groups.included;
    return [...groups.included, ...groups.installed, ...groups.available, ...expanded];
  }, [view, groups.included, groups.installed, groups.available, expanded]);

  // ─── Listbox keyboard navigation (roving tabindex) ──────────────────────
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

  const onListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
      if (target && target.status.kind === 'included' && !target.status.lockedIncluded) {
        e.preventDefault();
        const next = visibleRows[idx + 1] ?? visibleRows[idx - 1];
        pendingFocusIdRef.current = next?.data.dblEntryUid;
        onAction({ type: 'remove', item: target });
      }
    }
  };

  const handleLanguageClick = (lang: string) => setSelectedLanguages([lang]);

  const renderRow = (it: ScriptureTextItem) => (
    <ScriptureTextRow
      key={it.data.dblEntryUid}
      ref={(el) => {
        if (el) rowRefs.current.set(it.data.dblEntryUid, el);
        else rowRefs.current.delete(it.data.dblEntryUid);
      }}
      item={it}
      isDisplayed={displayedIds?.includes(it.data.dblEntryUid) ?? false}
      isActive={activeId === it.data.dblEntryUid}
      onAction={onAction}
      onLanguageClick={handleLanguageClick}
      localizedStrings={localizedStrings}
    />
  );

  const toggleView = () => setManualView(view === 'included' ? 'all' : 'included');

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
        Sizing: list area shrinks to fit content with a hard max-height cap. When the user is
        actively searching, we *also* apply a min-height so the picker doesn't shrink and
        jitter as the result set narrows. Wasted space > jitter during typing.
      */}
      <div
        role="listbox"
        aria-label={L(localizedStrings, '%scriptureTextPicker_listbox_label%')}
        onKeyDown={onListKeyDown}
        className={`tw:@container tw:overflow-y-auto tw:p-1 tw:focus:outline-none tw:max-h-[24rem] ${
          isSearching ? 'tw:min-h-[14rem]' : ''
        }`}
      >
        {view === 'included' ? (
          groups.included.length > 0 ? (
            <Group label={L(localizedStrings, '%scriptureTextPicker_group_included%')}>
              {groups.included.map(renderRow)}
            </Group>
          ) : (
            <p className="tw:py-8 tw:text-center tw:text-sm tw:text-muted-foreground">
              {L(localizedStrings, '%scriptureTextPicker_empty_nothingIncluded%')}
            </p>
          )
        ) : (
          <>
            {groups.included.length > 0 && (
              <Group label={L(localizedStrings, '%scriptureTextPicker_group_included%')}>
                {groups.included.map(renderRow)}
              </Group>
            )}
            {groups.installed.length > 0 && (
              <Group label={L(localizedStrings, '%scriptureTextPicker_group_installed%')}>
                {groups.installed.map(renderRow)}
              </Group>
            )}
            {groups.available.length > 0 && (
              <Group label={L(localizedStrings, '%scriptureTextPicker_group_available%')}>
                {groups.available.map(renderRow)}
              </Group>
            )}
            {expanded.length > 0 && (
              <Group label={L(localizedStrings, '%scriptureTextPicker_group_maybeYouMeant%')} muted>
                {expanded.map(renderRow)}
              </Group>
            )}
            {visibleRows.length === 0 && (
              <p className="tw:py-8 tw:text-center tw:text-sm tw:text-muted-foreground">
                {L(localizedStrings, '%scriptureTextPicker_empty_noMatches%')}
              </p>
            )}
          </>
        )}
      </div>

      {(view === 'included' ? addCount > 0 : true) && (
        <>
          <Separator />
          <button
            type="button"
            onClick={toggleView}
            disabled={view === 'all' && isSearching}
            className="tw:flex tw:w-full tw:items-center tw:gap-2 tw:px-3 tw:py-2 tw:text-xs tw:font-medium tw:text-muted-foreground tw:hover:bg-accent tw:hover:text-foreground tw:disabled:opacity-50 tw:disabled:hover:bg-transparent"
            title={
              view === 'all' && isSearching
                ? L(localizedStrings, '%scriptureTextPicker_footer_clearSearchHint%')
                : undefined
            }
          >
            {view === 'included' ? (
              <>
                <Plus className="tw:size-3.5" />
                <span>
                  {formatReplacementString(
                    L(localizedStrings, '%scriptureTextPicker_footer_browseAll%'),
                    { count: addCount },
                  )}
                </span>
              </>
            ) : (
              <>
                <ArrowLeft className="tw:size-3.5" />
                <span>{L(localizedStrings, '%scriptureTextPicker_footer_showOnlyIncluded%')}</span>
              </>
            )}
          </button>
        </>
      )}
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
  children: React.ReactNode;
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
