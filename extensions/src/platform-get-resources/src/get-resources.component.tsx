import {
  AlertCircle,
  BookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Ellipsis,
  Globe,
  Shapes,
} from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Filter,
  Label,
  MultiSelectComboBoxEntry,
  SearchBar,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'platform-bible-react';
import { buildLanguageFilterOptions, matchesResourceType } from 'platform-bible-react/experimental';
import type { DblResourceData, LocalizedStringValue, ResourceType } from 'platform-bible-utils';
import { getErrorMessage } from 'platform-bible-utils';
import { useMemo, useState } from 'react';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStringsWithLoadingState prop of this
 * component.
 */
const RESOURCE_TYPES: ResourceType[] = [
  'ScriptureResource',
  'CommentaryResource',
  'EnhancedResource',
  'SourceLanguageResource',
  'XmlResource',
];

export const GET_RESOURCES_STRING_KEYS = Object.freeze([
  '%general_error_title%',
  '%resources_action%',
  '%resources_any_language%',
  '%resources_any_type%',
  '%resources_dialog_subtitle%',
  '%resources_dialog_title%',
  '%resources_filterBy%',
  '%resources_filterInput%',
  '%resources_fullName%',
  '%resources_get%',
  '%resources_installed%',
  '%resources_language%',
  '%resources_languages%',
  '%resources_languages_noResults%',
  '%resources_languages_searchPlaceholder%',
  '%resources_noResults%',
  '%resources_noResultsError%',
  '%resources_open%',
  '%resources_remove%',
  '%resources_results%',
  '%resources_showing%',
  '%resources_size%',
  '%resources_type%',
  '%resources_types%',
  '%resources_types_noResults%',
  '%resources_types_searchPlaceholder%',
  '%resources_type_Scripture%',
  '%resources_type_Commentary%',
  '%resources_type_ER%',
  '%resources_type_SLR%',
  '%resources_type_XR%',
  '%resources_type_unknown%',
  '%resources_update%',
] as const);

type GetResourcesLocalizedStringKey = (typeof GET_RESOURCES_STRING_KEYS)[number];
type GetResourcesLocalizedStrings = {
  [localizedKey in GetResourcesLocalizedStringKey]?: LocalizedStringValue;
};

export type ResourceAction = 'install' | 'remove';

type SortConfig = {
  key: 'fullName' | 'bestLanguageName' | 'type' | 'size' | 'action';
  direction: 'ascending' | 'descending';
};

const emptyResources: DblResourceData[] = [];

const getActionButtonContent = (
  resource: DblResourceData,
  buttonText: string,
  onInstallOrRemoveResource: (dblEntryUid: string, action: ResourceAction) => void,
) => {
  return (
    <Button
      className="tw:bg-muted"
      variant="ghost"
      onClick={() => onInstallOrRemoveResource(resource.dblEntryUid, 'install')}
    >
      {buttonText}
    </Button>
  );
};

const getActionContent = (
  resource: DblResourceData,
  idsBeingHandled: string[],
  getText: string,
  updateText: string,
  installedText: string,
  onInstallOrRemoveResource: (dblEntryUid: string, action: ResourceAction) => void,
) => {
  const isBeingHandled = idsBeingHandled.includes(resource.dblEntryUid);
  if (isBeingHandled) {
    return (
      <Button className="tw:bg-muted" variant="ghost">
        <Spinner className="tw:h-5 tw:py-px" />
      </Button>
    );
  }
  if (!resource.installed) {
    return getActionButtonContent(resource, getText, onInstallOrRemoveResource);
  }
  if (resource.updateAvailable) {
    return getActionButtonContent(resource, updateText, onInstallOrRemoveResource);
  }
  return <Label className="tw:my-2 tw:flex tw:h-6 tw:items-center">{installedText}</Label>;
};

export type GetResourcesProps = {
  /**
   * Array of [Object with localized strings for the component, isLoading]. Import
   * `GET_RESOURCES_STRING_KEYS` from this module, pass it into the Platform's localization hook,
   * and pass the result here.
   */
  localizedStringsWithLoadingState?: [GetResourcesLocalizedStrings, boolean];
  /** The list of DBL resources to display (already resolved; pass an empty array on error). */
  resources?: DblResourceData[];
  /** Whether the resource list is currently loading. */
  isLoadingResources?: boolean;
  /** Whether loading the resource list failed (shows the error message instead of the table). */
  isResourcesError?: boolean;
  /** DBL entry UIDs that are currently installing/removing (shown with a spinner). */
  idsBeingHandled?: string[];
  /** Currently selected resource type filter values. */
  selectedTypes?: string[];
  /** Currently selected language filter values. */
  selectedLanguages?: string[];
  /** Callback fired when the selected resource types change. */
  onSelectedTypesChange?: (types: string[]) => void;
  /** Callback fired when the selected languages change. */
  onSelectedLanguagesChange?: (languages: string[]) => void;
  /**
   * Callback to install or remove a resource. May be async; if it rejects, the component shows the
   * error message in a destructive alert.
   *
   * @param dblEntryUid - The DBL entry UID of the resource.
   * @param action - Whether to `install` or `remove` the resource.
   */
  onInstallOrRemoveResource?: (dblEntryUid: string, action: ResourceAction) => void | Promise<void>;
  /**
   * Callback to open an installed resource.
   *
   * @param projectId - The project ID of the resource to open.
   */
  onOpenResource?: (projectId: string) => void;
};

/**
 * A component that displays the list of available DBL resources with type/language filters, text
 * search, and per-resource install/remove/open actions. The localized-strings prop uses the tuple
 * `[strings, isLoading]` shape (matching the Home component).
 *
 * @returns The Get Resources dialog UI.
 */
export function GetResources({
  localizedStringsWithLoadingState = [{}, false],
  resources = emptyResources,
  isLoadingResources = false,
  isResourcesError = false,
  idsBeingHandled = [],
  selectedTypes = [],
  selectedLanguages = [],
  onSelectedTypesChange = () => {},
  onSelectedLanguagesChange = () => {},
  onInstallOrRemoveResource = () => {},
  onOpenResource = () => {},
}: GetResourcesProps) {
  const getLocalizedString = (key: GetResourcesLocalizedStringKey): string =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const errorTitleText: string = getLocalizedString('%general_error_title%');
  const actionText: string = getLocalizedString('%resources_action%');
  const anyLanguage: string = getLocalizedString('%resources_any_language%');
  const anyType: string = getLocalizedString('%resources_any_type%');
  const dialogSubtitleText: string = getLocalizedString('%resources_dialog_subtitle%');
  const dialogTitleText: string = getLocalizedString('%resources_dialog_title%');
  const filterInputText: string = getLocalizedString('%resources_filterInput%');
  const filterByText: string = getLocalizedString('%resources_filterBy%');
  const fullNameText: string = getLocalizedString('%resources_fullName%');
  const getText: string = getLocalizedString('%resources_get%');
  const installedText: string = getLocalizedString('%resources_installed%');
  const languageText: string = getLocalizedString('%resources_language%');
  const languagesText: string = getLocalizedString('%resources_languages%');
  const languagesSearchPlaceholder: string = getLocalizedString(
    '%resources_languages_searchPlaceholder%',
  );
  const languagesNoResultsText: string = getLocalizedString('%resources_languages_noResults%');
  const noResultsText: string = getLocalizedString('%resources_noResults%');
  const noResultsErrorText: string = getLocalizedString('%resources_noResultsError%');
  const openText: string = getLocalizedString('%resources_open%');
  const removeText: string = getLocalizedString('%resources_remove%');
  const resultsText: string = getLocalizedString('%resources_results%');
  const showingText: string = getLocalizedString('%resources_showing%');
  const sizeText: string = getLocalizedString('%resources_size%');
  const typeText: string = getLocalizedString('%resources_type%');
  const typesText: string = getLocalizedString('%resources_types%');
  const typesSearchPlaceholder: string = getLocalizedString('%resources_types_searchPlaceholder%');
  const typesNoResultsText: string = getLocalizedString('%resources_types_noResults%');
  const typeScriptureText: string = getLocalizedString('%resources_type_Scripture%');
  const typeCommentaryText: string = getLocalizedString('%resources_type_Commentary%');
  const typeErText: string = getLocalizedString('%resources_type_ER%');
  const typeSlrText: string = getLocalizedString('%resources_type_SLR%');
  const typeXrText: string = getLocalizedString('%resources_type_XR%');
  const typeUnknownText: string = getLocalizedString('%resources_type_unknown%');
  const updateText: string = getLocalizedString('%resources_update%');

  // Surfaces a business error (e.g. "resource is no longer available") when an install/remove
  // action callback rejects, so failures are visible rather than only logged by the webview.
  const [actionError, setActionError] = useState<string | undefined>(undefined);

  const handleInstallOrRemoveResource = async (dblEntryUid: string, action: ResourceAction) => {
    setActionError(undefined);
    try {
      await onInstallOrRemoveResource(dblEntryUid, action);
    } catch (e) {
      setActionError(getErrorMessage(e));
    }
  };

  const [textFilter, setTextFilter] = useState<string>('');

  /**
   * The persisted type selection narrowed to types that actually exist. Web view state outlives any
   * one build of this list, so a value retired from {@link RESOURCE_TYPES} is dropped here rather
   * than silently filtering every row away.
   */
  const selectedResourceTypes = useMemo(
    () => RESOURCE_TYPES.filter((type) => selectedTypes.includes(type)),
    [selectedTypes],
  );

  /**
   * The catalogue narrowed to the chosen types. The language options and the grid are both derived
   * from this one list, so a language the filter offers always has rows behind it.
   */
  const typeScopedResources = useMemo(
    () => resources.filter((resource) => matchesResourceType(resource, selectedResourceTypes)),
    [resources, selectedResourceTypes],
  );

  // `sortSelected` on the language Filter re-sorts these (starred first, then selected, then
  // alphabetical), so the plain alphabetical order returned here is what reaches the user.
  const languageOptions: MultiSelectComboBoxEntry[] = useMemo(
    () => buildLanguageFilterOptions(typeScopedResources),
    [typeScopedResources],
  );

  /**
   * The language selection with any language the filter no longer offers dropped.
   *
   * This selection is persisted across sessions and seeded from installed resources, so narrowing
   * the type filter can leave a language selected that no longer has a row. Filtering on the raw
   * selection would empty the grid, and the badge for a language absent from the options renders
   * with no label — an X the user has to guess at.
   */
  const effectiveLanguages = useMemo(
    () => selectedLanguages.filter((language) => languageOptions.some((o) => o.value === language)),
    [selectedLanguages, languageOptions],
  );

  const typeOptions: MultiSelectComboBoxEntry[] = useMemo(() => {
    const labelByType: Record<ResourceType, string> = {
      ScriptureResource: typeScriptureText,
      CommentaryResource: typeCommentaryText,
      EnhancedResource: typeErText,
      SourceLanguageResource: typeSlrText,
      XmlResource: typeXrText,
    };

    return RESOURCE_TYPES.map((type) => ({
      value: type,
      label: labelByType[type],
      secondaryLabel: resources.filter((resource) => resource.type === type).length.toString(),
    }));
  }, [typeScriptureText, typeCommentaryText, typeErText, typeSlrText, typeXrText, resources]);

  const textFilteredResources = useMemo(() => {
    return typeScopedResources.filter((resource) => {
      const filter = textFilter.toLowerCase();
      return (
        resource.displayName.toLowerCase().includes(filter) ||
        resource.fullName.toLowerCase().includes(filter) ||
        resource.bestLanguageName.toLowerCase().includes(filter)
      );
    });
  }, [typeScopedResources, textFilter]);

  const textAndTypeAndLanguageFilteredResources = useMemo(() => {
    if (effectiveLanguages.length === 0) return textFilteredResources;
    return textFilteredResources.filter((resource) =>
      effectiveLanguages.includes(resource.bestLanguageName),
    );
  }, [effectiveLanguages, textFilteredResources]);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'bestLanguageName',
    direction: 'ascending',
  });

  const sortedResources = useMemo(() => {
    return [...textAndTypeAndLanguageFilteredResources].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;
      if (sortConfig.key === 'action') {
        aValue = (a.installed ? 10 : 0) + (a.updateAvailable ? 1 : 0);
        bValue = (b.installed ? 10 : 0) + (b.updateAvailable ? 1 : 0);
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [sortConfig.direction, sortConfig.key, textAndTypeAndLanguageFilteredResources]);

  const handleSort = (key: SortConfig['key']) => {
    const newSortConfig: SortConfig = { key, direction: 'ascending' };
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      newSortConfig.direction = 'descending';
    }
    setSortConfig(newSortConfig);
  };

  const buildTableHead = (key: SortConfig['key'], label: string) => (
    <TableHead onClick={() => handleSort(key)}>
      <div className="tw:flex tw:items-center">
        <div className="tw:font-normal">{label}</div>
        {sortConfig.key !== key && <ChevronsUpDown className="tw:pl-1" size={16} />}
        {sortConfig.key === key &&
          (sortConfig.direction === 'ascending' ? (
            <ChevronUp className="tw:pl-1" size={16} />
          ) : (
            <ChevronDown className="tw:pl-1" size={16} />
          ))}
      </div>
    </TableHead>
  );

  return (
    <div>
      <Card className="tw:flex tw:h-screen tw:flex-col tw:rounded-none tw:border-0">
        <CardHeader className="tw:shrink-0">
          <div className="tw:flex">
            <div className="tw:flex tw:items-center tw:pr-4">
              <BookOpen size={36} className="tw:me-4" />
              <div className="tw:flex tw:flex-col tw:gap-2">
                <CardTitle>{dialogTitleText}</CardTitle>
                <CardDescription className="tw:mt-1">{dialogSubtitleText}</CardDescription>
                <SearchBar
                  value={textFilter}
                  className="tw:min-w-72"
                  onSearch={setTextFilter}
                  placeholder={filterInputText}
                />
              </div>
            </div>
            <div className="tw:flex tw:flex-col tw:gap-1">
              <Label className="tw:mb-2 tw:text-muted-foreground">{filterByText}</Label>
              <Filter
                entries={typeOptions}
                selected={selectedTypes}
                onChange={onSelectedTypesChange}
                placeholder={typesText}
                searchPlaceholder={typesSearchPlaceholder}
                commandEmptyMessage={typesNoResultsText}
                icon={<Shapes />}
                badgesPlaceholder={anyType}
                isDisabled={isLoadingResources}
              />

              <Filter
                entries={languageOptions}
                selected={effectiveLanguages}
                onChange={onSelectedLanguagesChange}
                placeholder={languagesText}
                searchPlaceholder={languagesSearchPlaceholder}
                commandEmptyMessage={languagesNoResultsText}
                sortSelected
                icon={<Globe />}
                badgesPlaceholder={anyLanguage}
                isDisabled={isLoadingResources}
              />
            </div>
          </div>
        </CardHeader>
        {actionError && (
          <div className="tw:mx-4 tw:mb-2">
            <Alert variant="destructive">
              <AlertCircle className="tw:h-4 tw:w-4" />
              <AlertTitle>{errorTitleText}</AlertTitle>
              <AlertDescription>{actionError}</AlertDescription>
            </Alert>
          </div>
        )}
        <CardContent className="tw:grow tw:overflow-auto">
          {isLoadingResources ? (
            <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
              <Spinner />
            </div>
          ) : (
            // Can't use if-else here because of how the return statement is structured
            /* eslint-disable no-nested-ternary */
            <div>
              {isResourcesError ? (
                <div className="tw:m-4 tw:flex tw:justify-center">
                  <Label>{noResultsErrorText}</Label>
                </div>
              ) : sortedResources.length === 0 ? (
                <div className="tw:m-4 tw:flex tw:justify-center">
                  <Label>{noResultsText}</Label>
                </div>
              ) : (
                <Table stickyHeader>
                  <TableHeader className="tw:bg-none" stickyHeader>
                    <TableRow>
                      <TableHead />
                      <TableHead />
                      {buildTableHead('fullName', fullNameText)}
                      {buildTableHead('bestLanguageName', languageText)}
                      {buildTableHead('type', typeText)}
                      {buildTableHead('size', sizeText)}
                      {buildTableHead('action', actionText)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedResources.map((resource) => (
                      <TableRow
                        onDoubleClick={() => {
                          if (resource.installed) onOpenResource(resource.projectId);
                        }}
                        key={resource.displayName + resource.fullName}
                      >
                        <TableCell>
                          <BookOpen className="tw:pr-0" size={18} />
                        </TableCell>
                        <TableCell>{resource.displayName}</TableCell>
                        <TableCell className="tw:font-medium tw:whitespace-normal tw:wrap-anywhere">
                          {resource.fullName}
                        </TableCell>
                        <TableCell>{resource.bestLanguageName}</TableCell>
                        <TableCell>
                          {typeOptions.find((type) => type.value === resource.type)?.label ??
                            typeUnknownText}
                        </TableCell>
                        <TableCell>{resource.size}</TableCell>
                        <TableCell>
                          <div className="tw:flex tw:justify-between">
                            {getActionContent(
                              resource,
                              idsBeingHandled,
                              getText,
                              updateText,
                              installedText,
                              handleInstallOrRemoveResource,
                            )}
                            {resource.installed && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost">
                                    <Ellipsis className="tw:w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  <DropdownMenuItem
                                    onClick={() => onOpenResource(resource.projectId)}
                                  >
                                    <span>{openText}</span>
                                  </DropdownMenuItem>

                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleInstallOrRemoveResource(resource.dblEntryUid, 'remove')
                                    }
                                  >
                                    <span>{removeText}</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="tw:shrink-0 tw:justify-center tw:border-t tw:p-4">
          {sortedResources.length > 0 && (
            <Label className="tw:font-normal">{`${showingText} ${sortedResources.length} ${resultsText}`}</Label>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
