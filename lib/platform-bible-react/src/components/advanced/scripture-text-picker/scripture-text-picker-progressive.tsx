import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Separator } from '@/components/shadcn-ui/separator';
import { Plus, ArrowLeft } from 'lucide-react';
import { PickerAction, ScriptureTextItem } from './scripture-text-picker.types';
import { ScriptureTextRow, primaryActionFor } from './scripture-text-picker-row';
import {
  SearchRow,
  groupItems,
  matchesSearch,
  partitionByLanguage,
  FEW_RESULTS_THRESHOLD,
} from './scripture-text-picker-shared';
import { PREFERRED_LANGUAGES } from './scripture-text-picker.data';

export interface ScriptureTextPickerProgressiveProps {
  items: ScriptureTextItem[];
  /**
   * IDs of items currently displayed on the calling surface. Single-select: 0 or 1 entry.
   * Multi-select: any number. The picker just emphasizes these rows and emits `toggleDisplay`
   * on click — the host applies its own single/multi semantics.
   */
  displayedIds?: string[];
  onAction: (action: PickerAction) => void;
}

type View = 'included' | 'all';

/**
 * Scripture text picker — progressive disclosure with a footer view toggle.
 *
 * View modes:
 * - `included` — only Included items in the list. Footer reads "+ Browse all texts (N)".
 * - `all` — Included + Installed + Available (+ optional out-of-filter expansion). Footer reads
 *   "← Show only included".
 *
 * Default: populated projects (>1 included) open in `included`; sparse projects open in `all`.
 * Typing in search auto-switches to `all` so search hits installed/available items too.
 *
 * The picker never closes itself. All interactions emit actions; the host updates state and
 * decides when (and how) to close the surrounding popover/dialog.
 *
 * Keyboard: arrow keys / Home / End navigate rows (listbox pattern, roving tabindex); Enter or
 * Space activates the focused row's primary action; Delete on a non-locked included row removes
 * it; Tab moves out of the list to the next focusable region (footer / search).
 */
export function ScriptureTextPickerProgressive({
  items,
  displayedIds,
  onAction,
}: ScriptureTextPickerProgressiveProps) {
  const [search, setSearch] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(PREFERRED_LANGUAGES);

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

  // Flat ordered list of rows currently rendered — drives keyboard navigation.
  const visibleRows: ScriptureTextItem[] = useMemo(() => {
    if (view === 'included') return groups.included;
    return [...groups.included, ...groups.installed, ...groups.available, ...expanded];
  }, [view, groups.included, groups.installed, groups.available, expanded]);

  // ─── Listbox keyboard navigation (roving tabindex) ──────────────────────
  const [activeId, setActiveId] = useState<string | undefined>();
  const rowRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  // Set during a keyboard activation to the id we want focused AFTER the re-render. A
  // useLayoutEffect below restores focus once the new DOM is committed. This is necessary
  // because activating Enter on an Installed/Available row moves it to Included (a different
  // group parent), so React remounts the DOM node and we lose focus otherwise.
  const pendingFocusIdRef = useRef<string | undefined>(undefined);

  // Keep activeId valid when the visible set changes.
  useEffect(() => {
    if (visibleRows.length === 0) {
      setActiveId(undefined);
      return;
    }
    if (!activeId || !visibleRows.some((r) => r.data.dblEntryUid === activeId)) {
      setActiveId(visibleRows[0].data.dblEntryUid);
    }
  }, [visibleRows, activeId]);

  // Restore focus to the pending row after an action-driven re-render.
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
      // The item stays in the list (toggleDisplay keeps it in Included; include moves it from
      // Installed/Available into Included). Either way, refocus the same id post-commit.
      pendingFocusIdRef.current = target.data.dblEntryUid;
      onAction(primaryActionFor(target));
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      if (target && target.status.kind === 'included' && !target.status.lockedIncluded) {
        e.preventDefault();
        // The target row is going away. Pre-pick its neighbor as the next focus target.
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
    />
  );

  const toggleView = () => setManualView(view === 'included' ? 'all' : 'included');

  return (
    <div className="tw:flex tw:size-full tw:flex-col tw:overflow-hidden">
      <SearchRow
        search={search}
        onSearch={setSearch}
        selectedLanguages={selectedLanguages}
        preferredLanguages={PREFERRED_LANGUAGES}
        onLanguagesChange={setSelectedLanguages}
        allLanguages={allLanguages}
      />
      <Separator />

      <div
        role="listbox"
        aria-label="Scripture texts"
        onKeyDown={onListKeyDown}
        className="tw:@container tw:flex-1 tw:overflow-y-auto tw:p-1 tw:focus:outline-none"
      >
        {view === 'included' ? (
          groups.included.length > 0 ? (
            <Group label="Included">{groups.included.map(renderRow)}</Group>
          ) : (
            <p className="tw:py-8 tw:text-center tw:text-sm tw:text-muted-foreground">
              Nothing included yet
            </p>
          )
        ) : (
          <>
            {groups.included.length > 0 && (
              <Group label="Included">{groups.included.map(renderRow)}</Group>
            )}
            {groups.installed.length > 0 && (
              <Group label="Installed">{groups.installed.map(renderRow)}</Group>
            )}
            {groups.available.length > 0 && (
              <Group label="Available to download">{groups.available.map(renderRow)}</Group>
            )}
            {expanded.length > 0 && (
              <Group label="Maybe you meant" muted>
                {expanded.map(renderRow)}
              </Group>
            )}
            {visibleRows.length === 0 && (
              <p className="tw:py-8 tw:text-center tw:text-sm tw:text-muted-foreground">
                No matches
              </p>
            )}
          </>
        )}
      </div>

      {/* Footer view toggle. Hidden when there's nothing to browse (sparse + empty Add) and we're
          already in 'all', because there's no other view to switch to. */}
      {(view === 'included' ? addCount > 0 : true) && (
        <>
          <Separator />
          <button
            type="button"
            onClick={toggleView}
            disabled={view === 'all' && search.length > 0}
            className="tw:flex tw:w-full tw:items-center tw:gap-2 tw:px-3 tw:py-2 tw:text-xs tw:font-medium tw:text-muted-foreground tw:hover:bg-accent tw:hover:text-foreground tw:disabled:opacity-50 tw:disabled:hover:bg-transparent"
            title={
              view === 'all' && search.length > 0
                ? 'Clear search to return to included only'
                : undefined
            }
          >
            {view === 'included' ? (
              <>
                <Plus className="tw:size-3.5" />
                <span>Browse all texts</span>
                <span className="tw:font-normal">({addCount})</span>
              </>
            ) : (
              <>
                <ArrowLeft className="tw:size-3.5" />
                <span>Show only included</span>
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
