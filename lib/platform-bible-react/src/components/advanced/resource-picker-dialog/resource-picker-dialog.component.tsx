import { DialogHeader, DialogTitle } from '@/components/shadcn-ui/dialog';
import { Button } from '@/components/shadcn-ui/button';
import { Badge } from '@/components/shadcn-ui/badge';
import { Label } from '@/components/shadcn-ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/shadcn-ui/table';
import {
  MultiSelectComboBox,
  MultiSelectComboBoxEntry,
} from '@/components/advanced/multi-select-combo-box.component';
import { SearchBar } from '@/components/basics/search-bar.component';
import { DblResourceData, ResourceType, formatReplacementString } from 'platform-bible-utils';
import { useMemo, useState } from 'react';

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
 * shows a `Use` button when both `useLabel` and `onSelect` are not undefined for the cases that the
 * resource can be picked and is not already picked.
 */
function ResourceSection({
  label,
  resources,
  useLabel,
  onSelect,
}: {
  label: string;
  resources: DblResourceData[];
  useLabel?: string;
  onSelect?: (resource: DblResourceData) => void;
}) {
  if (resources.length === 0) return undefined;
  return (
    <>
      <Label className="tw-text-xs tw-uppercase tw-tracking-wider tw-text-muted-foreground">
        {label}
      </Label>
      <Table>
        <TableBody>
          {resources.map((r) => (
            <TableRow key={r.dblEntryUid}>
              <TableCell className="tw-border-0">
                <div>
                  <span className="tw-font-medium">{r.fullName}</span>
                  {' ('}
                  <span>{r.displayName}</span>)
                  <Badge variant="secondary" className="tw-ml-2">
                    {r.bestLanguageName}
                  </Badge>
                </div>
              </TableCell>
              {onSelect && useLabel && (
                <TableCell className="tw-border-0 tw-text-right">
                  <Button variant="outline" onClick={() => onSelect(r)}>
                    {useLabel}
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
  const useLabel = localizeString(localizedStrings, '%resourcePicker_button_use%');
  const noResultsText = localizeString(localizedStrings, '%resourcePicker_no_results%');
  const showingCountTemplate = localizeString(localizedStrings, '%resourcePicker_showing_count%');

  const isFiltered = searchText.length > 0 || selectedLanguages.length > 0;

  return (
    <>
      <DialogHeader className="tw-px-4 tw-pt-4">
        <DialogTitle>{titleText}</DialogTitle>
      </DialogHeader>
      <div className="tw-flex tw-gap-2 tw-p-4">
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
          placeholder={anyLanguageText}
          variant="outline"
        />
      </div>
      {isFiltered && (
        <p className="tw-px-4 tw-pb-1 tw-text-right tw-text-xs tw-text-muted-foreground">
          {formatReplacementString(showingCountTemplate, {
            filtered: filteredResources.length,
            total: allResources.length,
          })}
        </p>
      )}
      <div className="tw-flex-1 tw-overflow-y-auto tw-px-4 tw-pb-4">
        {hasNoResults ? (
          <p className="tw-py-8 tw-text-center tw-text-muted-foreground">{noResultsText}</p>
        ) : (
          <>
            <ResourceSection label={alreadySelectedLabel} resources={alreadySelected} />
            <ResourceSection
              label={installedLabel}
              resources={installed}
              useLabel={useLabel}
              onSelect={onSelect}
            />
            <ResourceSection
              label={toDownloadLabel}
              resources={toDownload}
              useLabel={useLabel}
              onSelect={onSelect}
            />
          </>
        )}
      </div>
    </>
  );
}
