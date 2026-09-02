import { Button } from '@/components/shadcn-ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from '@/components/shadcn-ui/empty';
import { EmptyState } from '@/components/basics/empty-state.component';
import { DialogHeader, DialogTitle } from '@/components/shadcn-ui/dialog';
import { Label } from '@/components/shadcn-ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/shadcn-ui/table';
import {
  MultiSelectComboBox,
  MultiSelectComboBoxEntry,
} from '@/components/advanced/multi-select-combo-box.component';
import { SearchBar } from '@/components/basics/search-bar.component';
import { DblResourceData, ResourceType, formatReplacementString } from 'platform-bible-utils';
import { Check, CloudOff, SearchX } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Spinner } from '@/components/basics/spinner.component';
import { useProgressiveList } from './resource-picker-dialog.utils';

/**
 * Localization keys used by {@link ResourcePickerDialog}. Pass to `useLocalizedStrings` and forward
 * the result as the `localizedStrings` prop.
 */
export const RESOURCE_PICKER_DIALOG_STRING_KEYS = Object.freeze([
  '%resourcePicker_title%',
  '%resourcePicker_section_already_selected%',
  '%resourcePicker_section_installed%',
  '%resourcePicker_section_available_to_download%',
  '%resourcePicker_no_results%',
  '%resourcePicker_search_placeholder%',
  '%resourcePicker_language_filter_any%',
  '%resourcePicker_language_filter_multipleSelected%',
  '%resourcePicker_showing_count%',
  '%resourcePicker_load_error%',
  '%resourcePicker_retry%',
  '%resourcePicker_no_results_filtered%',
  '%resourcePicker_clear_filters%',
  '%resourcePicker_downloads_unavailable%',
] as const);

/**
 * Map of localized strings required by {@link ResourcePickerDialog}. Derive from
 * {@link RESOURCE_PICKER_DIALOG_STRING_KEYS}.
 */
export type ResourcePickerDialogLocalizedStrings = {
  [key in (typeof RESOURCE_PICKER_DIALOG_STRING_KEYS)[number]]?: string;
};

const localizeString = (
  strings: ResourcePickerDialogLocalizedStrings,
  key: keyof ResourcePickerDialogLocalizedStrings,
) => strings[key] ?? key;

/** Props for {@link ResourcePickerDialog} */
export interface ResourcePickerDialogProps {
  /** Full list of DBL resources fetched by the caller via PAPI */
  allResources: DblResourceData[];
  /** Whether the `allResources` is still loading */
  isResourcesLoading?: boolean;
  /**
   * Whether loading `allResources` failed. Distinct from an empty `allResources`: without it the
   * dialog can only report "no results", which reads as a truthful empty catalog and leaves the
   * user nothing to act on.
   */
  hasResourcesError?: boolean;
  /**
   * Re-runs the caller's resource fetch. Omit when the caller has no way to re-drive it; the error
   * state then renders its message without a retry rather than an inert button.
   */
  onRetryResources?: () => void;
  /**
   * Whether this installation cannot download resources at all, so the list is empty for a reason
   * that has nothing to do with the user's filters and that no retry can change.
   *
   * Distinct from `hasResourcesError`: that state offers a retry because trying again might work.
   * This one deliberately offers none, and says why the list is empty instead of leaving the user
   * to infer it from "no results".
   */
  areDownloadsUnavailable?: boolean;
  /** If provided, only resources of this type are shown */
  resourceType?: ResourceType;
  /** IDs of resources already selected in the calling panel */
  selectedResourceIds?: string[];
  /** Localized strings — use RESOURCE_PICKER_DIALOG_STRING_KEYS with useLocalizedStrings */
  localizedStrings: ResourcePickerDialogLocalizedStrings;
  /**
   * When true, clicking an "Already Selected" row calls `onSelect` just like any other row, letting
   * the caller treat it as a deselect. Defaults to false (Already Selected rows stay
   * non-interactive, showing only a checkmark) to preserve existing consumers' behavior.
   */
  allowDeselect?: boolean;
  /** Called when the user clicks a resource row to select it */
  onSelect: (resource: DblResourceData) => void;
}

/**
 * Component to list filtered resources entries for one of the resource picker sections. Optionally
 * allows clicking and selecting when `onSelect` is not undefined for the cases that the resource
 * can be picked and is not already picked.
 */
function ResourceSection({
  label,
  resources,
  onSelect,
  showCheckmark,
}: {
  label: string;
  resources: DblResourceData[];
  onSelect?: (resource: DblResourceData) => void;
  showCheckmark?: boolean;
}) {
  if (resources.length === 0) return undefined;
  return (
    <>
      <TableRow className="tw:border-0 tw:hover:bg-transparent">
        <TableCell colSpan={4} className="tw:border-0 tw:pt-4 tw:pb-0">
          <Label className="tw:text-xs tw:tracking-wider tw:text-muted-foreground tw:uppercase">
            {label}
          </Label>
        </TableCell>
      </TableRow>
      {resources.map((r) => (
        <TableRow
          key={r.dblEntryUid}
          className={
            onSelect ? 'tw:cursor-pointer tw:border-0' : 'tw:pointer-events-none tw:border-0'
          }
          role={onSelect ? 'button' : undefined}
          aria-label={onSelect ? r.displayName : undefined}
          onClick={onSelect ? () => onSelect(r) : undefined}
          onKeyDown={
            onSelect
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(r);
                  }
                }
              : undefined
          }
        >
          <TableCell className="tw:w-5 tw:border-0 tw:py-1 tw:pr-1">
            {showCheckmark && (
              <>
                <Check className="tw:h-3.5 tw:w-3.5" aria-hidden />
                <span className="tw:sr-only">{label}</span>
              </>
            )}
          </TableCell>
          <TableCell className="tw:border-0 tw:py-1 tw:pr-2 tw:font-normal tw:whitespace-nowrap">
            {r.displayName}
          </TableCell>
          <TableCell className="tw:border-0 tw:py-1 tw:pl-2">{r.fullName}</TableCell>
          <TableCell className="tw:border-0 tw:py-1 tw:pl-4 tw:text-right tw:text-muted-foreground">
            {r.bestLanguageName}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

/**
 * Which of the picker body's mutually exclusive states to render.
 *
 * - `loading` — the catalog has not settled; show a spinner.
 * - `error` — the fetch failed; say so and offer a retry, which can genuinely re-drive it.
 * - `filteredEmpty` — the user's own filters excluded everything; offer to clear them.
 * - `downloadsUnavailable` — this installation cannot download resources; say so, offer nothing,
 *   because nothing the user does here can change it.
 * - `empty` — the catalog genuinely holds nothing for this picker.
 * - `list` — there is something to show.
 */
export type ResourcePickerBodyState =
  | 'loading'
  | 'error'
  | 'filteredEmpty'
  | 'downloadsUnavailable'
  | 'empty'
  | 'list';

/**
 * Decides which body state the picker is in.
 *
 * Derived once rather than re-spelled as a guard on each branch: the states are mutually exclusive
 * by construction here, where five overlapping boolean expressions leave that exclusivity to be
 * verified by eye — and a sixth state added later has to be threaded correctly through all of them.
 * Mirrors `getResourcePanelReadiness` on the panels' side of this same handoff.
 *
 * @param input The independent signals the state is derived from.
 * @returns The single state to render.
 */
export function getResourcePickerBodyState(input: {
  isResourcesLoading: boolean;
  hasResourcesError: boolean;
  hasNoResults: boolean;
  canClearFiltersHelp: boolean;
  areDownloadsUnavailable: boolean;
}): ResourcePickerBodyState {
  if (input.isResourcesLoading) return 'loading';
  // A failure outranks emptiness: an empty list caused by a fetch that never arrived is not an
  // answer about the catalog.
  if (input.hasResourcesError) return 'error';
  if (!input.hasNoResults) return 'list';
  // Clearable filters first — that is the one empty state the user can act on directly.
  if (input.canClearFiltersHelp) return 'filteredEmpty';
  if (input.areDownloadsUnavailable) return 'downloadsUnavailable';
  return 'empty';
}

function matchesSearch(resource: DblResourceData, searchText: string): boolean {
  if (!searchText) return true;
  const lower = searchText.toLowerCase();
  return (
    resource.displayName.toLowerCase().includes(lower) ||
    resource.fullName.toLowerCase().includes(lower) ||
    resource.bestLanguageName.toLowerCase().includes(lower)
  );
}

/**
 * Presentational dialog content for picking a DBL resource. Renders three sections — Already
 * Selected, Installed, and Available to Download — derived from `allResources` and
 * `selectedResourceIds`. Supports text search and language filtering.
 *
 * Does not include an outer `Dialog` or `DialogContent` wrapper; the host (paranext-core dialog
 * infrastructure or a Storybook decorator) is responsible for providing that context.
 *
 * Obtain localized strings by passing {@link RESOURCE_PICKER_DIALOG_STRING_KEYS} to
 * `useLocalizedStrings` and forwarding the result as `localizedStrings`.
 *
 * @param props See {@link ResourcePickerDialogProps}
 */
export default function ResourcePickerDialog({
  allResources,
  isResourcesLoading,
  hasResourcesError,
  onRetryResources,
  areDownloadsUnavailable,
  resourceType,
  selectedResourceIds,
  localizedStrings,
  allowDeselect,
  onSelect,
}: ResourcePickerDialogProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // React writes `null` into a detached DOM ref itself, so there is no `undefined` equivalent here.
  // eslint-disable-next-line no-null/no-null
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Resets BOTH filters: clearing only the one the user is looking at leaves the list still
  // filtered by the other, which reads as the control having done nothing.
  //
  // Focus moves to the search box because this button is inside the region it removes: without a
  // deliberate move, activating it drops focus to `<body>` and a keyboard user restarts from the top
  // of the dialog. The search box is the nearest control that survives the change.
  const clearFilters = useCallback(() => {
    setSearchText('');
    setSelectedLanguages([]);
    searchInputRef.current?.focus();
  }, []);

  // The `resourceType` narrowing is separated from the user's own filters because only the latter
  // are clearable. Counting or offering to clear against `allResources` would describe a set this
  // dialog was never allowed to show.
  const typeScopedResources = useMemo(
    () => allResources.filter((r) => !resourceType || r.type === resourceType),
    [allResources, resourceType],
  );

  const filteredResources = useMemo(
    () =>
      typeScopedResources
        .filter((r) => matchesSearch(r, searchText))
        .filter(
          (r) => selectedLanguages.length === 0 || selectedLanguages.includes(r.bestLanguageName),
        ),
    [typeScopedResources, searchText, selectedLanguages],
  );

  const alreadySelected = useMemo(
    () => filteredResources.filter((r) => selectedResourceIds?.includes(r.dblEntryUid)),
    [filteredResources, selectedResourceIds],
  );

  const installed = useMemo(
    () =>
      filteredResources.filter((r) => r.installed && !selectedResourceIds?.includes(r.dblEntryUid)),
    [filteredResources, selectedResourceIds],
  );

  const toDownload = useMemo(
    () =>
      filteredResources.filter(
        (r) => !r.installed && !selectedResourceIds?.includes(r.dblEntryUid),
      ),
    [filteredResources, selectedResourceIds],
  );

  const { visibleItems: visibleToDownload, sentinelRef, hasMore } = useProgressiveList(toDownload);

  const languageOptions: MultiSelectComboBoxEntry[] = useMemo(
    () =>
      Array.from(new Set(allResources.map((r) => r.bestLanguageName))).map((lang) => ({
        label: lang,
        value: lang,
      })),
    [allResources],
  );

  const hasNoResults =
    alreadySelected.length === 0 && installed.length === 0 && toDownload.length === 0;

  const titleText = localizeString(localizedStrings, '%resourcePicker_title%');
  const searchPlaceholder = localizeString(localizedStrings, '%resourcePicker_search_placeholder%');
  const anyLanguageText = localizeString(localizedStrings, '%resourcePicker_language_filter_any%');
  const alreadySelectedLabel = localizeString(
    localizedStrings,
    '%resourcePicker_section_already_selected%',
  );
  const installedLabel = localizeString(localizedStrings, '%resourcePicker_section_installed%');
  const toDownloadLabel = localizeString(
    localizedStrings,
    '%resourcePicker_section_available_to_download%',
  );
  const noResultsText = localizeString(localizedStrings, '%resourcePicker_no_results%');
  const loadErrorText = localizeString(localizedStrings, '%resourcePicker_load_error%');
  const retryText = localizeString(localizedStrings, '%resourcePicker_retry%');
  const noResultsFilteredText = localizeString(
    localizedStrings,
    '%resourcePicker_no_results_filtered%',
  );
  const clearFiltersText = localizeString(localizedStrings, '%resourcePicker_clear_filters%');
  const downloadsUnavailableText = localizeString(
    localizedStrings,
    '%resourcePicker_downloads_unavailable%',
  );
  const showingCountTemplate = localizeString(localizedStrings, '%resourcePicker_showing_count%');

  const customLanguageSelectText = useMemo(() => {
    if (selectedLanguages.length === languageOptions.length || selectedLanguages.length === 0)
      return anyLanguageText;
    if (selectedLanguages.length === 1) {
      const matchingType = languageOptions.find((type) => type.value === selectedLanguages[0]);
      if (matchingType) return matchingType.label;
    }
    return formatReplacementString(
      localizeString(localizedStrings, '%resourcePicker_language_filter_multipleSelected%'),
      {
        selectCount: selectedLanguages.length,
      },
    );
  }, [selectedLanguages, languageOptions, anyLanguageText, localizedStrings]);

  // Selecting every language narrows nothing, which is why the trigger keeps reading "Any language"
  // in that state. Treating it as filtered anyway would report a "showing 9 of 9" count and offer to
  // clear a filter that is not excluding anything.
  const isLanguageFiltered =
    selectedLanguages.length > 0 && selectedLanguages.length < languageOptions.length;
  const isFiltered = searchText.length > 0 || isLanguageFiltered;

  // Offering "Clear filters" is only honest when clearing would actually reveal something. With a
  // `resourceType` that matches nothing in the catalog the list is empty no matter what the user
  // clears, and routing them through a control that provably cannot change the result just returns
  // them to the same dead end by a longer path.
  const canClearFiltersHelp = isFiltered && typeScopedResources.length > 0;

  // Filtering a catalog that has not arrived, or one whose fetch failed, cannot change what is on
  // screen — `GetResources` disables its own filters in the same situation, and leaving these live
  // invites the user to narrow an empty list and conclude their search was at fault.
  const areFiltersInert = !!isResourcesLoading || !!hasResourcesError;

  const bodyState = getResourcePickerBodyState({
    isResourcesLoading: !!isResourcesLoading,
    hasResourcesError: !!hasResourcesError,
    hasNoResults,
    canClearFiltersHelp,
    areDownloadsUnavailable: !!areDownloadsUnavailable,
  });

  return (
    <>
      <DialogHeader className="tw:px-4 tw:pt-4">
        <DialogTitle>{titleText}</DialogTitle>
      </DialogHeader>
      <div className="tw:flex tw:gap-2 tw:p-4">
        <SearchBar
          ref={searchInputRef}
          value={searchText}
          onSearch={setSearchText}
          placeholder={searchPlaceholder}
          isFullWidth
          isDisabled={areFiltersInert}
        />
        <MultiSelectComboBox
          entries={languageOptions}
          selected={selectedLanguages}
          onChange={setSelectedLanguages}
          customSelectedText={customLanguageSelectText}
          placeholder={anyLanguageText}
          variant="outline"
          isDisabled={areFiltersInert}
        />
      </div>
      {/* Suppressed while loading or failed: a count of a catalog that never arrived reads as a
          confident "0 of 0" directly above the message explaining that nothing could be loaded. The
          total is the type-scoped set, not the whole catalog — reporting entries this picker filters
          out anyway implies candidates the user could reach by clearing something. */}
      {isFiltered && bodyState !== 'loading' && bodyState !== 'error' && (
        <p className="tw:px-4 tw:pb-1 tw:text-right tw:text-xs tw:text-muted-foreground">
          {formatReplacementString(showingCountTemplate, {
            filtered: filteredResources.length,
            total: typeScopedResources.length,
          })}
        </p>
      )}
      <div className="tw:min-h-0 tw:flex-1 tw:overflow-y-auto tw:px-4 tw:pb-4">
        {bodyState === 'loading' && (
          <p className="tw:py-8 tw:text-center">
            <Spinner />
          </p>
        )}
        {bodyState === 'error' && (
          <Empty role="alert">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CloudOff />
              </EmptyMedia>
              <EmptyDescription>{loadErrorText}</EmptyDescription>
            </EmptyHeader>
            {onRetryResources && (
              <EmptyContent>
                <Button variant="outline" size="sm" onClick={onRetryResources}>
                  {retryText}
                </Button>
              </EmptyContent>
            )}
          </Empty>
        )}
        {bodyState === 'filteredEmpty' && (
          <Empty role="status">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchX />
              </EmptyMedia>
              <EmptyDescription>{noResultsFilteredText}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                {clearFiltersText}
              </Button>
            </EmptyContent>
          </Empty>
        )}
        {bodyState === 'downloadsUnavailable' && (
          <Empty role="status">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CloudOff />
              </EmptyMedia>
              <EmptyDescription>{downloadsUnavailableText}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        {bodyState === 'empty' && (
          <EmptyState className="tw:py-8 tw:text-center" message={noResultsText} />
        )}
        {bodyState === 'list' && (
          <Table>
            <TableBody>
              <ResourceSection
                label={alreadySelectedLabel}
                resources={alreadySelected}
                onSelect={allowDeselect ? onSelect : undefined}
                showCheckmark
              />
              <ResourceSection label={installedLabel} resources={installed} onSelect={onSelect} />
              <ResourceSection
                label={toDownloadLabel}
                resources={visibleToDownload}
                onSelect={onSelect}
              />
              {hasMore && (
                <TableRow className="tw:border-0">
                  <TableCell colSpan={4} className="tw:border-0 tw:p-0">
                    <div ref={sentinelRef} aria-hidden />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
