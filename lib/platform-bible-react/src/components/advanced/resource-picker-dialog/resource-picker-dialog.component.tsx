import { DialogHeader, DialogTitle } from '@/components/shadcn-ui/dialog';
import { Label } from '@/components/shadcn-ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/shadcn-ui/table';
import {
  MultiSelectComboBox,
  MultiSelectComboBoxEntry,
} from '@/components/advanced/multi-select-combo-box.component';
import { SearchBar } from '@/components/basics/search-bar.component';
import { DblResourceData, ResourceType, formatReplacementString } from 'platform-bible-utils';
import { Check } from 'lucide-react';
import { useMemo, useState } from 'react';
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
  '%resourcePicker_button_use%',
  '%resourcePicker_no_results%',
  '%resourcePicker_search_placeholder%',
  '%resourcePicker_language_filter_any%',
  '%resourcePicker_language_filter_multipleSelected%',
  '%resourcePicker_showing_count%',
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
  /** If provided, only resources of this type are shown */
  resourceType?: ResourceType;
  /** IDs of resources already selected in the calling panel */
  selectedResourceIds?: string[];
  /** Localized strings — use RESOURCE_PICKER_DIALOG_STRING_KEYS with useLocalizedStrings */
  localizedStrings: ResourcePickerDialogLocalizedStrings;
  /** Called when the user clicks "Use" on a resource entry */
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
}: {
  label: string;
  resources: DblResourceData[];
  onSelect?: (resource: DblResourceData) => void;
}) {
  if (resources.length === 0) return undefined;
  return (
    <>
      <TableRow className="tw:border-0 tw:hover:bg-transparent" aria-hidden>
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
          onClick={onSelect ? () => onSelect(r) : undefined}
          onKeyDown={
            onSelect
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelect(r);
                }
              : undefined
          }
        >
          <TableCell className="tw:w-5 tw:border-0 tw:py-1 tw:pr-1">
            {!onSelect && <Check className="tw:h-3.5 tw:w-3.5" />}
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
  resourceType,
  selectedResourceIds,
  localizedStrings,
  onSelect,
}: ResourcePickerDialogProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const filteredResources = useMemo(
    () =>
      allResources
        .filter((r) => !resourceType || r.type === resourceType)
        .filter((r) => matchesSearch(r, searchText))
        .filter(
          (r) => selectedLanguages.length === 0 || selectedLanguages.includes(r.bestLanguageName),
        ),
    [allResources, resourceType, searchText, selectedLanguages],
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

  const isFiltered = searchText.length > 0 || selectedLanguages.length > 0;

  return (
    <>
      <DialogHeader className="tw:px-4 tw:pt-4">
        <DialogTitle>{titleText}</DialogTitle>
      </DialogHeader>
      <div className="tw:flex tw:gap-2 tw:p-4">
        <SearchBar
          value={searchText}
          onSearch={setSearchText}
          placeholder={searchPlaceholder}
          isFullWidth
        />
        <MultiSelectComboBox
          entries={languageOptions}
          selected={selectedLanguages}
          onChange={setSelectedLanguages}
          customSelectedText={customLanguageSelectText}
          placeholder={anyLanguageText}
          variant="outline"
        />
      </div>
      {isFiltered && (
        <p className="tw:px-4 tw:pb-1 tw:text-right tw:text-xs tw:text-muted-foreground">
          {formatReplacementString(showingCountTemplate, {
            filtered: filteredResources.length,
            total: allResources.length,
          })}
        </p>
      )}
      <div className="tw:flex-1 tw:overflow-y-auto tw:px-4 tw:pb-4">
        {isResourcesLoading && (
          <p className="tw:py-8 tw:text-center">
            <Spinner />
          </p>
        )}
        {hasNoResults && !isResourcesLoading && (
          <p className="tw:py-8 tw:text-center tw:text-muted-foreground">{noResultsText}</p>
        )}
        {!hasNoResults && !isResourcesLoading && (
          <Table>
            <TableBody>
              <ResourceSection label={alreadySelectedLabel} resources={alreadySelected} />
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
