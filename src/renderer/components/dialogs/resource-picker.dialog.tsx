import { Check } from 'lucide-react';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  DialogHeader,
  DialogTitle,
  Label,
  MultiSelectComboBox,
  type MultiSelectComboBoxEntry,
  SearchBar,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableRow,
  usePromise,
} from 'platform-bible-react';
import { DIALOG_BASE } from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  DialogTypes,
  RESOURCE_PICKER_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { sendCommand } from '@shared/services/command.service';
import { DblResourceData, ResourceType, formatReplacementString } from 'platform-bible-utils';

export const RESOURCE_PICKER_DIALOG_STRING_KEYS: [
  '%resourcePicker_title%',
  '%resourcePicker_section_already_selected%',
  '%resourcePicker_section_installed%',
  '%resourcePicker_section_available_to_download%',
  '%resourcePicker_no_results%',
  '%resourcePicker_search_placeholder%',
  '%resourcePicker_language_filter_any%',
  '%resourcePicker_language_filter_multipleSelected%',
  '%resourcePicker_showing_count%',
] = [
  '%resourcePicker_title%',
  '%resourcePicker_section_already_selected%',
  '%resourcePicker_section_installed%',
  '%resourcePicker_section_available_to_download%',
  '%resourcePicker_no_results%',
  '%resourcePicker_search_placeholder%',
  '%resourcePicker_language_filter_any%',
  '%resourcePicker_language_filter_multipleSelected%',
  '%resourcePicker_showing_count%',
] as const;

export type ResourcePickerDialogLocalizedStrings = {
  [key in (typeof RESOURCE_PICKER_DIALOG_STRING_KEYS)[number]]?: string;
};

const localizeString = (
  strings: ResourcePickerDialogLocalizedStrings,
  key: keyof ResourcePickerDialogLocalizedStrings,
) => strings[key] ?? key;

/**
 * Progressively reveals `items` in pages of `pageSize`. Attach `sentinelRef` to a hidden element at
 * the bottom of the rendered list — when it scrolls into view, the next page loads. Resets to page
 * 1 whenever the `items` array reference changes (e.g. after a filter update). Pass `null` as the
 * ref initial value; the IntersectionObserver skips observation if the element isn't mounted yet
 * (safe in tests where the DOM stub may not be connected).
 */
export function useProgressiveList<T>(items: T[], pageSize = 50) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  // null is required by useRef for DOM elements
  // eslint-disable-next-line no-null/no-null
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  useEffect(() => {
    if (visibleCount >= items.length) return;
    const el = sentinelRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount((c) => Math.min(c + pageSize, items.length));
      },
      { threshold: 0 },
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, items.length, pageSize]);

  return {
    visibleItems: items.slice(0, visibleCount),
    sentinelRef,
    hasMore: visibleCount < items.length,
  };
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

function ResourceSection({
  label,
  resources,
  onSelect,
}: {
  label: string;
  resources: DblResourceData[];
  onSelect?: (r: DblResourceData) => void;
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

export interface ResourcePickerDialogProps {
  allResources: DblResourceData[];
  isResourcesLoading?: boolean;
  resourceType?: ResourceType;
  selectedResourceIds?: string[];
  localizedStrings: ResourcePickerDialogLocalizedStrings;
  onSelect: (resource: DblResourceData) => void;
}

export function ResourcePickerDialog({
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
      const matchingLanguage = languageOptions.find((lang) => lang.value === selectedLanguages[0]);
      if (matchingLanguage) return matchingLanguage.label;
    }
    return formatReplacementString(
      localizeString(localizedStrings, '%resourcePicker_language_filter_multipleSelected%'),
      { selectCount: selectedLanguages.length },
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

function ResourcePickerDialogWrapper({
  resourceType,
  selectedResourceIds,
  submitDialog,
}: DialogTypes[typeof RESOURCE_PICKER_DIALOG_TYPE]['props']) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => RESOURCE_PICKER_DIALOG_STRING_KEYS, []),
  );

  const [resources, isResourcesLoading] = usePromise(
    useCallback(async () => sendCommand('platformGetResources.getCachedResources'), []),
    undefined,
  );

  return (
    <ResourcePickerDialog
      allResources={resources ?? []}
      isResourcesLoading={isResourcesLoading}
      resourceType={resourceType}
      selectedResourceIds={selectedResourceIds}
      localizedStrings={localizedStrings}
      onSelect={submitDialog}
    />
  );
}

export const RESOURCE_PICKER_DIALOG: DialogDefinition<typeof RESOURCE_PICKER_DIALOG_TYPE> =
  Object.freeze({
    ...DIALOG_BASE,
    tabType: RESOURCE_PICKER_DIALOG_TYPE,
    defaultTitle: '%resourcePicker_title%',
    initialSize: { width: 900, height: 650 },
    Component: ResourcePickerDialogWrapper,
  });

export default RESOURCE_PICKER_DIALOG;
