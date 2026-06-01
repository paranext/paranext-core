/**
 * RestoreFileList — the data-grid embedded in the RestoreForm dialog that shows the per-file
 * comparison between a backup and the on-disk destination, lets the user pick which files to
 * restore, and surfaces the "View differences" action via a right-click context menu AND a
 * keyboard-accessible button (NEW for PT10, resolves INV-FLAG-10 / WCAG 2.1.1).
 *
 * Pure presentational component:
 *
 * - Accepts `entries` (RestoreFileEntry[] per data-contracts.md §3.4) + `selectedFileIds` +
 *   `hideSameFiles` + `selectedFileId` via props.
 * - Emits `onToggleFile`, `onBulkToggle`, `onSelectFile`, `onViewDifferences` callbacks. The caller
 *   (UI-PKG-007 RestoreForm) owns the PAPI plumbing for `compareBackupFile` (M-004).
 * - Renders rows via the `BookGridSelector` from platform-scripture (FN-011 / ui-alignment.md Option
 *   A adapter — `book: entry.id`, semantic mismatch annotated below).
 *
 * Behavior highlights:
 *
 * - 9-state ComparisonResult lattice (BHV-503) → BookGridTone via `restoreFileToneFor` (extends
 *   `toneForComparisonState` from book-grid.component.tsx with the four version-flavored variants
 *   not present in that helper's narrow signature).
 * - Hide-same-files filter (BHV-322) is STATIC and CRC-based — no 10× row flash (INV-FLAG-9 / WCAG
 *   2.2.2). Per Worker B REVIEW-FLAG-7, the predicate is `sourceCrc === destinationCrc`, NOT
 *   `comparisonResult === 'FilesAreSame'`.
 * - Right-click context menu + keyboard `viewDifferencesButton` share the same enablement predicate
 *   (`entry.canViewDifferences && entry.comparisonResult !== 'DestDoesNotExist'`). See
 *   ui-spec-restore-form.md §"Conditional UI Rules" (line 465) and BHV-320.
 * - DestIsHigherVersion downgrade-confirm modal (VAL-104) on per-row tick. Select-All / Deselect-All
 *   bulk toggle WITHOUT bulk-downgrade prompts (PT9 INV-FLAG-11 default, pending ALIGNMENT-007).
 * - Auto-tick (`isNormallyRestored`) is the caller's responsibility — the component never mutates
 *   `selectedFileIds`. Stories seed initial selection from `isNormallyRestored` to demonstrate the
 *   gm-009 contract.
 *
 * Platform wiring: none. Zero platform-side imports. UI-PKG-007 RestoreForm hosts this component
 * and sends the `compareBackupFile` (M-004) request to the backend through `onViewDifferences`.
 */

import { useCallback, useMemo, useState } from 'react';
import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  TooltipProvider,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import {
  BookGridGroupBy,
  BookGridItem,
  BookGridSelector,
  BookGridTone,
  toneForComparisonState,
} from 'platform-scripture/src/manage-books-dialog/book-grid.component';

/* ------------------------------------------------------------------ */
/* Public types                                                       */
/* ------------------------------------------------------------------ */

/**
 * The 9 PtwFileComparisonStates values per data-contracts.md §3.5 (BHV-503). Component-internal
 * union — duplicated here so the component doesn't depend on the wire-side enum at runtime.
 */
export type ComparisonResult =
  | 'FilesAreSame'
  | 'SourceDoesNotExist'
  | 'SourceIsNewer'
  | 'SourceIsOlder'
  | 'DestDoesNotExist'
  | 'FilesAreSameVersion'
  | 'SourceIsHigherVersion'
  | 'DestIsHigherVersion'
  | 'Undetermined';

/**
 * One row in the restore file list. Field names match data-contracts.md §3.4 `RestoreFileEntry`
 * exactly so this type can be sourced directly from the M-002 `openRestoreSession` response.
 *
 * **Wire-to-UI normalization**: the wire type uses `null` for the two optional fields
 * (`destinationDisplayName`, `destinationCrc`). This UI type uses `undefined` so the React /
 * Storybook layer can stay null-free per the project's `no-null` lint rule. UI-PKG-007 RestoreForm
 * normalizes the wire response (`?? undefined`) before passing to this component.
 */
export type RestoreFileListEntry = {
  /** Opaque id stable within the session. */
  id: string;
  /** Display name for column 1 ("Files In Backup"). */
  sourceDisplayName: string;
  /** Display name for column 2 ("Files On Hard Disk"). Omitted when the destination file is missing. */
  destinationDisplayName?: string;
  /** Per-file comparison state (BHV-108 / BHV-503). */
  comparisonResult: ComparisonResult;
  /** PT9 IsNormallyRestored — caller uses this to seed `selectedFileIds`; component never reads. */
  isNormallyRestored: boolean;
  /** Whether comparing this file against current is supported (BHV-320 source-property gate). */
  canViewDifferences: boolean;
  /** Tooltip localize key (RestoreForm_18..24 mapping per BHV-319 / EXT-200). */
  tooltipKey: string;
  /** Source-side CRC for the hide-same-files raw-CRC filter (BHV-322 / Worker B REVIEW-FLAG-7). */
  sourceCrc: number;
  /** Destination-side CRC (omitted when the destination file does not exist). */
  destinationCrc?: number;
};

/**
 * Localization keys consumed by the RestoreFileList chrome — column headers, context-menu items,
 * the keyboard `viewDifferencesButton`, the bulk-toggle buttons, the downgrade-confirm modal, and
 * the per-row tooltip strings (`RestoreForm_18`..`RestoreForm_24`).
 */
export const RESTORE_FILE_LIST_STRING_KEYS = Object.freeze([
  '%restore_file_list_column_files_in_backup%',
  '%restore_file_list_column_files_on_disk%',
  '%restore_file_list_aria_label%',
  '%restore_file_list_select_all_button%',
  '%restore_file_list_deselect_all_button%',
  '%restore_file_list_view_differences_button%',
  '%restore_file_list_context_menu_view_differences%',
  '%restore_file_list_context_menu_cannot_compare%',
  '%restore_file_list_status_group_new%',
  '%restore_file_list_status_group_newer%',
  '%restore_file_list_status_group_older%',
  '%restore_file_list_status_group_same%',
  '%restore_file_list_status_group_undetermined%',
  '%restore_file_list_downgrade_confirm_title%',
  '%restore_file_list_downgrade_confirm_body%',
  '%restore_file_list_downgrade_confirm_yes%',
  '%restore_file_list_downgrade_confirm_no%',
  // Per-row tooltip keys (PT9 RestoreForm_18..24). These also flow in via entry.tooltipKey, so the
  // localizedStrings prop must accept arbitrary `%RestoreForm_*%` keys (not just the chrome set).
  '%RestoreForm_18%',
  '%RestoreForm_19%',
  '%RestoreForm_20%',
  '%RestoreForm_21%',
  '%RestoreForm_22%',
  '%RestoreForm_23%',
  '%RestoreForm_24%',
] as const);

type RestoreFileListLocalizedStringKey = (typeof RESTORE_FILE_LIST_STRING_KEYS)[number];

/**
 * Localized strings map. Caller passes already-localized values; missing keys fall back to English.
 * The map is widened to `Record<string, LocalizedStringValue>` so per-row `tooltipKey` values
 * (which come from the backend per-entry) resolve here too.
 */
export type RestoreFileListLocalizedStrings = {
  [key in RestoreFileListLocalizedStringKey]?: LocalizedStringValue;
} & Record<string, LocalizedStringValue | undefined>;

/** English fallbacks used when a localization key is missing from the strings map. */
const FALLBACK_STRINGS: Record<RestoreFileListLocalizedStringKey, string> = Object.freeze({
  '%restore_file_list_column_files_in_backup%': 'Files In Backup',
  '%restore_file_list_column_files_on_disk%': 'Files On Hard Disk',
  '%restore_file_list_aria_label%': 'Backup file list',
  '%restore_file_list_select_all_button%': 'Select All Files',
  '%restore_file_list_deselect_all_button%': 'Deselect All Files',
  '%restore_file_list_view_differences_button%': 'View Differences',
  '%restore_file_list_context_menu_view_differences%': 'View differences between files',
  '%restore_file_list_context_menu_cannot_compare%': 'Cannot compare files',
  '%restore_file_list_status_group_new%': 'New (not on disk)',
  '%restore_file_list_status_group_newer%': 'Newer in backup',
  '%restore_file_list_status_group_older%': 'Older in backup',
  '%restore_file_list_status_group_same%': 'Same in both',
  '%restore_file_list_status_group_undetermined%': 'Undetermined',
  '%restore_file_list_downgrade_confirm_title%': 'Overwrite Warning!',
  '%restore_file_list_downgrade_confirm_body%':
    'The file you want to restore has a lower version number than the file on the hard disk. Are you sure you want to restore this file?',
  '%restore_file_list_downgrade_confirm_yes%': 'Yes',
  '%restore_file_list_downgrade_confirm_no%': 'No',
  '%RestoreForm_18%': 'The file in backup does not exist on the hard disk',
  '%RestoreForm_19%': 'These two files are identical',
  '%RestoreForm_20%': 'These two files have same version number',
  '%RestoreForm_21%':
    'The file in the backup has a newer version number than the file on hard disk',
  // PT9 source string has the typo "a older"; PT10 ships the corrected "an older" per
  // ui-spec-restore-form.md line 127 + requirements.md "Verbatim preservation".
  '%RestoreForm_22%': 'The file in backup has an older version number than the file on hard disk',
  '%RestoreForm_23%': 'The file in the backup is newer than the file on hard disk',
  '%RestoreForm_24%': 'The file in backup is older than the file on hard disk',
});

/**
 * Type-safe lookup into `FALLBACK_STRINGS`. Accepts any string key — returns the English fallback
 * if it's one of the known keys, `undefined` otherwise. Lets `t()` accept arbitrary backend-emitted
 * `tooltipKey` strings without type-asserting them into the narrow enumeration.
 *
 * Implementation note: indexes through a plain `Record<string, string | undefined>` view so the
 * compiler doesn't reject the lookup; the `Record` view is constructed once via
 * `Object.fromEntries` to keep the FALLBACK_STRINGS object's strict typing for callers.
 */
const FALLBACK_STRINGS_LOOKUP: Record<string, string | undefined> = Object.fromEntries(
  Object.entries(FALLBACK_STRINGS),
);

function fallbackLookup(key: string): string | undefined {
  return FALLBACK_STRINGS_LOOKUP[key];
}

/** Props accepted by `RestoreFileList`. See file-level TSDoc for the data flow. */
export interface RestoreFileListProps {
  /** Rows to render (already comparison-classified by the backend per §3.4). */
  entries: readonly RestoreFileListEntry[];
  /**
   * Set of `entry.id` whose `restoreThisFile` toggle is currently on. Caller-owned — this component
   * never mutates the set. Typed as a mutable `Set<string>` so it can pass straight through to
   * `BookGridSelector.selected` without a wrapper, but treat it as read-only.
   */
  selectedFileIds: Set<string>;
  /** Whether the hide-same-files CRC filter is currently on (BHV-322). */
  hideSameFiles: boolean;
  /**
   * Currently-active row id — drives `viewDifferencesButton` enablement. Omitted when no row is
   * active.
   */
  selectedFileId?: string;

  /** Called when the user toggles a single row's checkbox. */
  onToggleFile: (entryId: string, next: boolean) => void;
  /** Bulk select-all (true) or deselect-all (false). PT9 INV-FLAG-11: no bulk-downgrade prompt. */
  onBulkToggle: (next: boolean) => void;
  /** Called when the user changes which row is "active" (click / right-click / keyboard focus). */
  onSelectFile: (entryId: string) => void;
  /** Called when the user requests "View differences" via right-click OR the keyboard button. */
  onViewDifferences: (entry: RestoreFileListEntry) => void;

  /** Localized chrome + per-row tooltip strings. Missing keys fall back to English. */
  localizedStrings?: RestoreFileListLocalizedStrings;

  /**
   * How the embedded `BookGridSelector` should group rows. Default `'status'` groups by comparison
   * state (newer / older / same / …). `'none'` flattens. `'canon'` is unsupported here because rows
   * can be non-book files (Settings.xml, custom.vrs, etc.).
   */
  groupBy?: Exclude<BookGridGroupBy, 'canon'>;
}

/* ------------------------------------------------------------------ */
/* ComparisonResult → BookGridTone mapping (DESIGN-003)               */
/* ------------------------------------------------------------------ */

/**
 * Extend `toneForComparisonState` (book-grid.component.tsx:187) to cover all 9 PascalCase §3.5
 * variants. The book-grid helper only handles 6 camelCase variants — we cover the four
 * version-flavored variants here (FilesAreSameVersion / SourceIsHigherVersion / DestIsHigherVersion
 * / Undetermined).
 *
 * Returned tone drives the pill color + badge variant (see `STATUS_BADGE_VARIANT` in
 * book-grid.component.tsx:140).
 */
export function restoreFileToneFor(state: ComparisonResult): Exclude<BookGridTone, 'hidden'> {
  switch (state) {
    case 'FilesAreSame':
      return 'same';
    case 'FilesAreSameVersion':
      return 'same';
    case 'SourceIsNewer':
      return 'newer';
    case 'SourceIsHigherVersion':
      return 'newer';
    case 'SourceIsOlder':
      return 'older';
    case 'DestIsHigherVersion':
      return 'older';
    case 'DestDoesNotExist': {
      // The backup file is new on disk. `toneForComparisonState` maps this to 'new' (line 202).
      // We re-invoke `toneForComparisonState` to inherit any future Manage Books tone changes
      // for this state. The 'hidden' branch is unreachable in practice but guarded for safety.
      const inherited = toneForComparisonState('destDoesNotExist');
      return inherited === 'hidden' ? 'new' : inherited;
    }
    case 'SourceDoesNotExist':
    case 'Undetermined':
    default:
      return 'neutral';
  }
}

/** Status-group label keys per comparison state — fed into `BookGridSelector` `groupBy='status'`. */
function statusGroupKey(state: ComparisonResult): RestoreFileListLocalizedStringKey {
  switch (state) {
    case 'DestDoesNotExist':
      return '%restore_file_list_status_group_new%';
    case 'SourceIsNewer':
    case 'SourceIsHigherVersion':
      return '%restore_file_list_status_group_newer%';
    case 'SourceIsOlder':
    case 'DestIsHigherVersion':
      return '%restore_file_list_status_group_older%';
    case 'FilesAreSame':
    case 'FilesAreSameVersion':
      return '%restore_file_list_status_group_same%';
    case 'SourceDoesNotExist':
    case 'Undetermined':
    default:
      return '%restore_file_list_status_group_undetermined%';
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * Restore file list — see file-level TSDoc for the full contract. Hosted by UI-PKG-007 RestoreForm
 * in phase-3-ui; rendered standalone in Storybook for UX review.
 */
export function RestoreFileList({
  entries,
  selectedFileIds,
  hideSameFiles,
  selectedFileId,
  onToggleFile,
  onBulkToggle,
  onSelectFile,
  onViewDifferences,
  localizedStrings = {},
  groupBy = 'status',
}: RestoreFileListProps) {
  const t = useCallback(
    (key: RestoreFileListLocalizedStringKey | string): string => {
      const v = localizedStrings[key];
      if (typeof v === 'string') return v;
      // FALLBACK_STRINGS is widened to Record<string, string | undefined> via `fallbackLookup`
      // below — that way arbitrary entry.tooltipKey values (which are typed `string` and may not
      // be in the typed enumeration) can fall through to the key itself, signaling missing
      // localization to QA rather than rendering blank.
      const fallback = fallbackLookup(key);
      return fallback ?? key;
    },
    [localizedStrings],
  );

  // Pending downgrade-confirm modal state (BEH-005 / VAL-104).
  const [pendingDowngradeId, setPendingDowngradeId] = useState<string | undefined>(undefined);

  // Hide-same-files filter — STATIC (no flash, INV-FLAG-9 / WCAG 2.2.2). Predicate is raw CRC
  // equality per Worker B REVIEW-FLAG-7 — NOT `comparisonResult === 'FilesAreSame'`.
  const visibleEntries = useMemo<readonly RestoreFileListEntry[]>(() => {
    if (!hideSameFiles) return entries;
    return entries.filter(
      (entry) => entry.destinationCrc === undefined || entry.sourceCrc !== entry.destinationCrc,
    );
  }, [entries, hideSameFiles]);

  // Quick lookup so the viewDifferencesButton enablement predicate stays O(1).
  const entriesById = useMemo(() => {
    const map = new Map<string, RestoreFileListEntry>();
    visibleEntries.forEach((entry) => map.set(entry.id, entry));
    return map;
  }, [visibleEntries]);

  // FN-011 Option A adapter: `book: entry.id` — semantic mismatch ANNOTATED here so reviewers see
  // the deliberate misuse. For non-book files (Settings.xml, custom.vrs, lexicon files) the
  // `book` slot is the opaque file id; for `*.SFM` files it tends to be the USFM book code
  // already. See ui-alignment.md UA-RF-1 / FN-011.
  const gridItems = useMemo<BookGridItem[]>(
    () =>
      visibleEntries.map((entry): BookGridItem => {
        const statusKey = statusGroupKey(entry.comparisonResult);
        return {
          // CUSTOM (FN-011 Option A): `book` is the opaque file id (gm-001..gm-008), not a USFM
          // 3-letter code. Surfaces in aria-label + devtools — flag for Option B generalization
          // (deferred via SP-UI-RF-007 / DEC-310).
          book: entry.id,
          present: entry.comparisonResult !== 'DestDoesNotExist',
          tone: restoreFileToneFor(entry.comparisonResult),
          statusLabel: t(statusKey),
          primaryDate: entry.sourceDisplayName,
          secondaryDate: entry.destinationDisplayName,
        };
      }),
    [visibleEntries, t],
  );

  // BookGridSelector emits `book` (== entry.id here) on toggle. Per BEH-005, route the
  // DestIsHigherVersion-tick path through the downgrade-confirm modal.
  const handleGridToggle = useCallback(
    (book: string) => {
      const entry = entriesById.get(book);
      if (!entry) return;
      onSelectFile(entry.id);
      const isCurrentlySelected = selectedFileIds.has(entry.id);
      const goingFromUntickedToTicked = !isCurrentlySelected;
      if (goingFromUntickedToTicked && entry.comparisonResult === 'DestIsHigherVersion') {
        setPendingDowngradeId(entry.id);
        return;
      }
      onToggleFile(entry.id, !isCurrentlySelected);
    },
    [entriesById, onSelectFile, onToggleFile, selectedFileIds],
  );

  // viewDifferencesButton (BEH-004) enablement — same predicate as the right-click menu item.
  const selectedEntry: RestoreFileListEntry | undefined =
    selectedFileId !== undefined ? entriesById.get(selectedFileId) : undefined;
  const viewDiffsEligible =
    selectedEntry !== undefined &&
    selectedEntry.canViewDifferences &&
    selectedEntry.comparisonResult !== 'DestDoesNotExist';

  const handleViewDifferencesClick = useCallback(() => {
    if (!selectedEntry || !viewDiffsEligible) return;
    onViewDifferences(selectedEntry);
  }, [onViewDifferences, selectedEntry, viewDiffsEligible]);

  const handleBulkSelectAll = useCallback(() => {
    onBulkToggle(true);
  }, [onBulkToggle]);

  const handleBulkDeselectAll = useCallback(() => {
    onBulkToggle(false);
  }, [onBulkToggle]);

  // Downgrade-confirm modal handlers (BEH-005).
  const pendingEntry: RestoreFileListEntry | undefined =
    pendingDowngradeId !== undefined ? entriesById.get(pendingDowngradeId) : undefined;
  const handleDowngradeYes = useCallback(() => {
    if (pendingEntry) onToggleFile(pendingEntry.id, true);
    setPendingDowngradeId(undefined);
  }, [onToggleFile, pendingEntry]);
  const handleDowngradeNo = useCallback(() => {
    // No → row stays unticked (gm-010). Do NOT call onToggleFile.
    setPendingDowngradeId(undefined);
  }, []);

  // Row-aria label threads source + destination display names + the row's localized tooltip
  // (entry.tooltipKey) — that's how the §3.4 tooltipKey reaches the screen reader / a11y tree
  // (BEH-001).
  const getRowAriaLabel = useCallback(
    (item: BookGridItem) => {
      const entry = entriesById.get(item.book);
      if (!entry) return item.book;
      const tooltipText = t(entry.tooltipKey);
      const left = entry.sourceDisplayName;
      const right = entry.destinationDisplayName ?? '(not present)';
      return `${left} / ${right} — ${tooltipText}`;
    },
    [entriesById, t],
  );

  // Right-click context menu (BEH-003). Wraps the entire grid so right-clicks on any row trigger
  // a single menu. The active row is whatever `selectedFileId` is — the grid's onToggle path
  // updates selectedFileId via `onSelectFile`, and right-click on a pill bubbles to the wrapping
  // ContextMenu after Radix focuses the trigger. The menu item operates on the currently-focused
  // row. Reviewers should right-click after clicking a row to select it first.
  const contextMenuEnabled =
    selectedEntry !== undefined &&
    selectedEntry.canViewDifferences &&
    selectedEntry.comparisonResult !== 'DestDoesNotExist';

  const handleContextMenuViewDifferences = useCallback(() => {
    if (selectedEntry && contextMenuEnabled) {
      onViewDifferences(selectedEntry);
    }
  }, [contextMenuEnabled, onViewDifferences, selectedEntry]);

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className="pr-twp tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2"
        data-testid="restore-file-list"
      >
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div className="tw:flex tw:min-h-0 tw:flex-1 tw:flex-col">
              <div
                className="tw:flex tw:items-center tw:gap-4 tw:px-2 tw:py-1 tw:text-xs tw:font-semibold tw:text-muted-foreground"
                data-testid="restore-file-list-column-headers"
              >
                <span className="tw:flex-1">{t('%restore_file_list_column_files_in_backup%')}</span>
                <span className="tw:flex-1">{t('%restore_file_list_column_files_on_disk%')}</span>
              </div>
              <BookGridSelector
                items={gridItems}
                selected={selectedFileIds}
                onToggle={handleGridToggle}
                groupBy={groupBy}
                ariaLabel={t('%restore_file_list_aria_label%')}
                ariaMultiselectable
                primaryDateLabel={t('%restore_file_list_column_files_in_backup%')}
                secondaryDateLabel={t('%restore_file_list_column_files_on_disk%')}
                getRowAriaLabel={getRowAriaLabel}
                interactive
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent data-testid="restore-file-list-context-menu">
            <ContextMenuItem
              disabled={!contextMenuEnabled}
              onSelect={handleContextMenuViewDifferences}
              data-testid="restore-file-list-context-menu-view-differences"
            >
              {contextMenuEnabled
                ? t('%restore_file_list_context_menu_view_differences%')
                : t('%restore_file_list_context_menu_cannot_compare%')}
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        <div
          className="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:pt-1"
          data-testid="restore-file-list-actions"
        >
          <Button
            variant="outline"
            onClick={handleBulkSelectAll}
            aria-label={t('%restore_file_list_select_all_button%')}
            data-testid="select-all-files-button"
          >
            {t('%restore_file_list_select_all_button%')}
          </Button>
          <Button
            variant="outline"
            onClick={handleBulkDeselectAll}
            aria-label={t('%restore_file_list_deselect_all_button%')}
            data-testid="deselect-all-files-button"
          >
            {t('%restore_file_list_deselect_all_button%')}
          </Button>
          <Button
            variant="outline"
            onClick={handleViewDifferencesClick}
            disabled={!viewDiffsEligible}
            aria-label={t('%restore_file_list_view_differences_button%')}
            data-testid="view-differences-button"
          >
            {t('%restore_file_list_view_differences_button%')}
          </Button>
        </div>

        <Dialog
          open={pendingDowngradeId !== undefined}
          onOpenChange={(next) => {
            if (!next) handleDowngradeNo();
          }}
        >
          <DialogContent className="tw:max-w-md" data-testid="restore-file-list-downgrade-confirm">
            <DialogHeader>
              <DialogTitle>{t('%restore_file_list_downgrade_confirm_title%')}</DialogTitle>
              <DialogDescription>
                {t('%restore_file_list_downgrade_confirm_body%')}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleDowngradeNo}
                aria-label={t('%restore_file_list_downgrade_confirm_no%')}
                data-testid="restore-file-list-downgrade-no"
              >
                {t('%restore_file_list_downgrade_confirm_no%')}
              </Button>
              <Button
                onClick={handleDowngradeYes}
                aria-label={t('%restore_file_list_downgrade_confirm_yes%')}
                data-testid="restore-file-list-downgrade-yes"
              >
                {t('%restore_file_list_downgrade_confirm_yes%')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
