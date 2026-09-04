import {
  AlertCircle,
  BookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  CloudOff,
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
  RetryableErrorView,
  SearchBar,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'platform-bible-react';
import { getResourcePickerBodyState } from 'platform-bible-react/experimental';
import type { DblResourceData, LocalizedStringValue, PlatformError } from 'platform-bible-utils';
import {
  FAILED_PRECONDITION,
  getErrorMessage,
  isPlatformError,
  newPlatformError,
} from 'platform-bible-utils';
import { useMemo, useState } from 'react';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStringsWithLoadingState prop of this
 * component.
 */
export const GET_RESOURCES_STRING_KEYS = Object.freeze([
  '%general_error_title%',
  '%resources_action%',
  '%resources_any_language%',
  '%resources_any_type%',
  '%resources_dialog_subtitle%',
  '%resources_dialog_title%',
  '%resources_downloadsUnavailable%',
  '%resources_filterBy%',
  '%resources_filterInput%',
  '%resources_fullName%',
  '%resources_get%',
  '%resources_installed%',
  '%resources_language%',
  '%resources_languages%',
  '%resources_noResults%',
  '%resources_noResultsError%',
  '%resources_open%',
  '%resources_providerNotReady%',
  '%resources_remove%',
  '%resources_results%',
  '%resources_retry%',
  '%resources_showing%',
  '%resources_size%',
  '%resources_type%',
  '%resources_types%',
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

const getLanguageOptions = (
  resources: DblResourceData[],
  selectedLanguages: string[],
): MultiSelectComboBoxEntry[] => {
  const allLanguages: string[] = Array.from(
    new Set(resources.map((resource) => resource.bestLanguageName)),
  );

  const starredLanguages = new Set(
    resources.filter((resource) => resource.installed).map((resource) => resource.bestLanguageName),
  );

  const prioritizedLanguages = new Set(selectedLanguages.concat(Array.from(starredLanguages)));

  const sortedLanguages = allLanguages.sort((a, b) => {
    const aIsPrioritized = prioritizedLanguages.has(a);
    const bIsPrioritized = prioritizedLanguages.has(b);

    if (aIsPrioritized && bIsPrioritized) {
      return a.localeCompare(b);
    }
    if (aIsPrioritized) return -1;
    if (bIsPrioritized) return 1;

    return a.localeCompare(b);
  });

  return sortedLanguages.map((language) => {
    const count = resources.filter((resource) => resource.bestLanguageName === language).length;
    return {
      label: language,
      value: language,
      starred: starredLanguages.has(language),
      secondaryLabel: count.toString(),
    };
  });
};

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

/**
 * Rejection reason a caller of `onInstallOrRemoveResource` uses to say "the backing data provider
 * has not resolved yet".
 *
 * A sentinel rather than a message: this component owns the localized strings, so a caller that
 * supplied its own text would put untranslated English in front of the user.
 *
 * Raise it with {@link newResourceActionProviderNotReadyError} and recognise it with
 * {@link isResourceActionProviderNotReadyError} rather than comparing this string yourself.
 */
export const RESOURCE_ACTION_PROVIDER_NOT_READY = 'platformGetResources.providerNotReady';

/**
 * Builds the rejection a caller of `onInstallOrRemoveResource` raises when the backing data
 * provider has not resolved yet.
 *
 * A `PlatformError` carrying `FAILED_PRECONDITION` rather than a bare `Error`: the code is the
 * machine-readable class of the failure — the system is not in a state where this action can run —
 * and it is what anything other than this component (a log surface, a generic handler, a caller
 * deciding whether to retry) should key off.
 *
 * @returns The rejection reason to reject with.
 */
export function newResourceActionProviderNotReadyError(): PlatformError {
  return newPlatformError(RESOURCE_ACTION_PROVIDER_NOT_READY, FAILED_PRECONDITION);
}

/**
 * Whether a rejection from `onInstallOrRemoveResource` is "the backing data provider has not
 * resolved yet".
 *
 * Keyed on the sentinel in the message, and deliberately NOT on `FAILED_PRECONDITION` alone, for
 * two independent reasons:
 *
 * - The code does not survive a TypeScript rejection crossing a process boundary. `doRequest` in
 *   `network.service.ts` rebuilds such a rejection as a message-only `PlatformError`; its richer
 *   `platformErrorCode` field is populated only for C# `PlatformErrorCodes.WithCode` throws. The
 *   note on `isJsonRpcMethodNotFoundError` in `src/shared/data/rpc.model.ts` records the same
 *   constraint, and reads its own code back out of the message for the same reason.
 * - The code says only what CLASS of failure this is. A genuine install failure that is also a failed
 *   precondition would then be relabelled "resources are not ready yet" — a different lie from the
 *   one this sentinel exists to prevent, but a lie.
 *
 * Matched as a substring so it survives the prefix PAPI prepends at a process boundary. A caller
 * raising this from the extension host or a data provider, rather than from inside the web view's
 * own React tree, would otherwise fall through to the raw message and show the user a machine
 * token.
 *
 * @param error The rejection reason.
 * @returns Whether it is the provider-not-ready sentinel.
 */
export function isResourceActionProviderNotReadyError(error: unknown): boolean {
  const message = isPlatformError(error) ? error.message : getErrorMessage(error);
  return message.includes(RESOURCE_ACTION_PROVIDER_NOT_READY);
}

// PAPI prepends `JSON-RPC Request error (<code>): ` to any rejection that crosses a process
// boundary, and every real install/uninstall failure crosses one. That prefix is diagnostic noise
// to whoever reads the alert, so strip it before showing the message. Spelled out rather than
// imported because `getJsonRpcRequestErrorMessagePrefix` lives in `src/shared`, which an extension
// cannot import from; written with character classes so it stays readable without escapes.
const JSON_RPC_ERROR_PREFIX_PATTERN = /^JSON-RPC Request error [(][^)]*[)]: */;

function stripCrossProcessPrefix(message: string): string {
  return message.replace(JSON_RPC_ERROR_PREFIX_PATTERN, '');
}

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
  /**
   * Re-runs the caller's resource fetch. Omit when the caller has no way to re-drive it; the error
   * state then renders its message without a retry rather than an inert button.
   */
  onRetryResources?: () => void;
  /**
   * Whether this installation cannot download resources at all. Distinct from `isResourcesError`:
   * that state offers a retry because trying again might work; this one says why the list is empty
   * and offers none, because no retry can change it.
   */
  areDownloadsUnavailable?: boolean;
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
  onRetryResources,
  areDownloadsUnavailable = false,
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
  const noResultsText: string = getLocalizedString('%resources_noResults%');
  const noResultsErrorText: string = getLocalizedString('%resources_noResultsError%');
  const retryText: string = getLocalizedString('%resources_retry%');
  const providerNotReadyText: string = getLocalizedString('%resources_providerNotReady%');
  const downloadsUnavailableText: string = getLocalizedString('%resources_downloadsUnavailable%');
  const openText: string = getLocalizedString('%resources_open%');
  const removeText: string = getLocalizedString('%resources_remove%');
  const resultsText: string = getLocalizedString('%resources_results%');
  const showingText: string = getLocalizedString('%resources_showing%');
  const sizeText: string = getLocalizedString('%resources_size%');
  const typeText: string = getLocalizedString('%resources_type%');
  const typesText: string = getLocalizedString('%resources_types%');
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
      // Callers signal "the backing provider has not resolved yet" with a sentinel rather than a
      // message, because the text the user reads has to be localized and this component is the half
      // that holds the localized strings. Any other rejection carries a message worth showing —
      // minus the cross-process prefix, which tells the user nothing.
      setActionError(
        isResourceActionProviderNotReadyError(e)
          ? providerNotReadyText
          : stripCrossProcessPrefix(getErrorMessage(e)),
      );
    }
  };

  // Clearing the stale action error is this button's job because the error state REPLACES the
  // table, and a row action is the only other thing that clears it. Without this, a failed install
  // followed by a failed catalog refresh pins its alert above a list that recovers fine, with no
  // interaction left that can dismiss it.
  const handleRetryResources = () => {
    setActionError(undefined);
    onRetryResources?.();
  };

  const [textFilter, setTextFilter] = useState<string>('');

  const textFilteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const filter = textFilter.toLowerCase();
      return (
        resource.displayName.toLowerCase().includes(filter) ||
        resource.fullName.toLowerCase().includes(filter) ||
        resource.bestLanguageName.toLowerCase().includes(filter)
      );
    });
  }, [resources, textFilter]);

  const typeOptions: MultiSelectComboBoxEntry[] = useMemo(() => {
    const getTypeCount = (type: string): string =>
      (resources.filter((resource) => resource.type === type).length ?? 0).toString();

    return [
      {
        value: 'ScriptureResource',
        label: typeScriptureText,
        secondaryLabel: getTypeCount('ScriptureResource'),
      },
      {
        value: 'CommentaryResource',
        label: typeCommentaryText,
        secondaryLabel: getTypeCount('CommentaryResource'),
      },
      {
        value: 'EnhancedResource',
        label: typeErText,
        secondaryLabel: getTypeCount('EnhancedResource'),
      },
      {
        value: 'SourceLanguageResource',
        label: typeSlrText,
        secondaryLabel: getTypeCount('SourceLanguageResource'),
      },
      {
        value: 'XmlResource',
        label: typeXrText,
        secondaryLabel: getTypeCount('XmlResource'),
      },
    ];
  }, [typeScriptureText, typeCommentaryText, typeErText, typeSlrText, typeXrText, resources]);

  const textAndTypeFilteredResources = useMemo(() => {
    if (selectedTypes.length === 0) return textFilteredResources;
    return textFilteredResources.filter((resource) => selectedTypes.includes(resource.type));
  }, [textFilteredResources, selectedTypes]);

  const textAndTypeAndLanguageFilteredResources = useMemo(() => {
    if (selectedLanguages.length === 0) return textAndTypeFilteredResources;
    return textAndTypeFilteredResources.filter((resource) =>
      selectedLanguages.includes(resource.bestLanguageName),
    );
  }, [selectedLanguages, textAndTypeFilteredResources]);

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

  // The same discriminant the resource picker derives its body from, so the two surfaces showing the
  // very same catalog cannot answer "why is this list empty?" differently. This list has no "Clear
  // filters" affordance of its own — its filters sit in the header and are always reachable — so it
  // never asks for that state.
  const bodyState = getResourcePickerBodyState({
    isResourcesLoading: isLoadingResources,
    hasResourcesError: isResourcesError,
    hasNoResults: sortedResources.length === 0,
    canClearFiltersHelp: false,
    areDownloadsUnavailable,
  });

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
                icon={<Shapes />}
                badgesPlaceholder={anyType}
                isDisabled={isLoadingResources}
              />

              <Filter
                entries={getLanguageOptions(resources, selectedLanguages)}
                selected={selectedLanguages}
                onChange={onSelectedLanguagesChange}
                placeholder={languagesText}
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
          {bodyState === 'loading' && (
            <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
              <Spinner />
            </div>
          )}
          {bodyState === 'error' && (
            <RetryableErrorView
              icon={<CloudOff />}
              message={noResultsErrorText}
              retryLabel={retryText}
              onRetry={onRetryResources ? handleRetryResources : undefined}
            />
          )}
          {bodyState === 'downloadsUnavailable' && (
            <RetryableErrorView
              role="status"
              icon={<CloudOff />}
              message={downloadsUnavailableText}
            />
          )}
          {bodyState === 'empty' && (
            <div className="tw:m-4 tw:flex tw:justify-center">
              <Label>{noResultsText}</Label>
            </div>
          )}
          {bodyState === 'list' && (
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
                              <DropdownMenuItem onClick={() => onOpenResource(resource.projectId)}>
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
