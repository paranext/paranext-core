import {
  AlertCircle,
  BookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  CloudOff,
  ScrollText,
} from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  cn,
  DropdownMenuItem,
  Label,
  SearchBar,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'platform-bible-react';
import type { ProjectMetadata } from '@papi/core';
import type { LocalizedStringValue } from 'platform-bible-utils';
import {
  formatReplacementString,
  formatTimeSpan,
  getErrorMessage,
  normalizeFullName,
} from 'platform-bible-utils';
import type { EditedStatus, SharedProjectsInfo } from 'platform-scripture';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { HomeItemDropdownMenu } from './home-item-menu';
import {
  isShownByProjectResourceFilter,
  ProjectResourceFilter,
  type ProjectResourceFilterOption,
  type ProjectResourceFilterValue,
} from './project-resource-filter.component';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const HOME_STRING_KEYS = Object.freeze([
  '%resources_action%',
  '%resources_activity%',
  '%resources_clearFilters%',
  '%resources_clearSearch%',
  '%resources_filter_all%',
  '%resources_filterByValue%',
  '%resources_filterInput%',
  '%resources_shortNameText%',
  '%resources_fullName%',
  '%resources_get%',
  '%resources_getStarted%',
  '%resources_getStartedDescription%',
  '%resources_getResources%',
  '%resources_items%',
  '%resources_itemsFiltered%',
  '%resources_language%',
  '%resources_noProjects%',
  '%resources_noProjectsInstruction%',
  '%resources_noProjectsInstructionWithoutResources%',
  '%resources_noParatextProjectsFound%',
  '%resources_noResourcesFound%',
  '%resources_noSearchResults%',
  '%resources_open%',
  '%resources_paratextProjects_label%',
  '%resources_resources_label%',
  '%resources_searchedFor%',
  '%resources_serverProjectsUnavailable_title%',
  '%resources_serverUnreachable_description%',
  '%resources_serverUnreachable_title%',
  '%resources_syncFailed_title%',
  '%resources_sync%',
] as const);

type HomeLocalizedStringKey = (typeof HOME_STRING_KEYS)[number];
type HomeLocalizedStrings = {
  [localizedHomeKey in HomeLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * What Home knows about the send/receive server's half of the project list.
 *
 * The list Home shows is a merge of two halves, and only one of them can fail — so the component
 * has to be told which of these it is looking at rather than inferring it from an empty merge. A
 * single value rather than a pair of booleans because the states are mutually exclusive: the pairs
 * that do not correspond to any real situation ("failed and still loading", "reached and
 * unreachable") are then unrepresentable rather than merely untested. See
 * `adr-async-hook-state-shape`.
 *
 * - `loading` — an answer is still on its way; the list is not yet worth reading.
 * - `absent` — this build has no send/receive at all, so the local list is the whole truth and there
 *   is no missing half to report.
 * - `loaded` — the server answered; the merged list is complete.
 * - `unreachable` — the server was asked and never answered.
 * - `unavailable` — the server refused for a reason the user can act on (blocked internet access, an
 *   expired registration), which a notification names alongside this.
 * - `unknown` — whether this build even has a server was never established.
 */
export type RemoteProjectsState =
  | 'loading'
  | 'absent'
  | 'loaded'
  | 'unreachable'
  | 'unavailable'
  | 'unknown';

/**
 * Stable empty defaults. A default parameter allocates a fresh value on every render, which would
 * make the merge and sort memos below miss on every keystroke for any caller that omits these —
 * including every build without send/receive, where `sharedProjectsInfo` is absent all session.
 */
const NO_LOCAL_PROJECTS: LocalProjectInfo[] = [];
const NO_SHARED_PROJECTS: SharedProjectsInfo = {};
const NO_ACTIVE_SEND_RECEIVE_PROJECTS: string[] = [];

export type SortConfig = {
  key: 'shortName' | 'fullName' | 'language' | 'activity' | 'action';
  direction: 'ascending' | 'descending';
};

const DEFAULT_SORT_CONFIG: SortConfig = { key: 'language', direction: 'ascending' };

export type LocalProjectInfo = {
  projectId: string;
  isPublished: boolean;
  /**
   * Absent when the project has no full name. The Full Name column renders it beside a separate
   * short-name column, so mirroring `name` in would print the same text twice across two columns.
   */
  fullName?: string;
  name: string;
  language: string;
};

/**
 * Converts project metadata (from `papi.projectLookup.getMetadataForAllProjects`) into the
 * {@link LocalProjectInfo} shape the Home and New Tab web views render, applying the display
 * fallbacks the metadata's optional fields require. Shared so the two web views cannot drift.
 */
export function metadataToLocalProjectInfo(data: ProjectMetadata): LocalProjectInfo {
  return {
    projectId: data.id,
    isPublished: data.isPublished ?? false,
    fullName: normalizeFullName(data.fullName),
    name: data.name ?? data.id,
    language: data.language ?? '',
  };
}

export type MergedProjectInfo = {
  projectId: string;
  name: string;
  /** Absent when the project has no full name. See {@link LocalProjectInfo.fullName}. */
  fullName?: string;
  language: string;
  isPublished: boolean;
  isSendReceivable: boolean;
  isLocallyAvailable?: boolean;
  editedStatus?: EditedStatus;
  lastSendReceiveDate?: string;
};

export type HomeProps = {
  /**
   * Object with all localized strings that the Inventory needs to work well across multiple
   * languages. When using this component with Platform.Bible, you can import `HOME_STRING_KEYS`
   * from this library, pass it in to the Platform's localization hook, and pass the localized keys
   * that are returned by the hook into this prop.
   */
  localizedStringsWithLoadingState?: [HomeLocalizedStrings, boolean];
  /**
   * Locales for formatting dates and times. This is used to format the last send/receive date of
   * projects.
   */
  uiLocales?: Intl.LocalesArgument;
  /** Callback function to open the Get Resources dialog. */
  onOpenGetResources?: () => void;
  /**
   * Callback function to open a project.
   *
   * @param projectId - The ID of the project to open.
   * @param isPublished - Whether the project is a published resource (read-only reference). Pass
   *   this through to the open command so the caller can dispatch to the Resource Viewer for
   *   published projects and the Scripture Editor for non-published projects.
   */
  onOpenProject?: (projectId: string, isPublished: boolean) => void;
  /**
   * Callback function to send/receive a project. May be async; if it rejects, the component shows
   * the error message in a destructive alert.
   *
   * @param projectId - The ID of the project to send/receive.
   */
  onSendReceiveProject?: (projectId: string) => void | Promise<void>;
  /** Callback function to open the get started website of platform. */
  onGetStarted?: () => void;
  /** Whether to show the Get Resources button. */
  showGetResourcesButton?: boolean;
  /** Whether a send/receive operation is in progress. */
  isSendReceiveInProgress?: boolean;
  /** Whether loading local projects is in progress. */
  isLoadingLocalProjects?: boolean;
  /**
   * What is known about the send/receive server's half of the list. Drives both the loading gate
   * and the banner: without it, an unreachable server is indistinguishable from a server with no
   * projects on it, and a user who is offline is told their projects do not exist. See
   * {@link RemoteProjectsState} for what each value claims.
   */
  remoteProjectsState?: RemoteProjectsState;
  /**
   * Which items the type filter starts on. The user can change it from there. The Home web view
   * passes the filter it last showed, which an opener's preset replaces — the title bar's project
   * picker footer asks for `paratextProject`. Unset starts on `all`. Read once, on mount: a later
   * change to it does not move a filter the user may already have changed.
   */
  initialProjectResourceFilter?: ProjectResourceFilterValue;
  /** Called with the new filter each time the user changes it, including through Clear Filters. */
  onProjectResourceFilterChange?: (filter: ProjectResourceFilterValue) => void;
  /** Array of local project information, containing projects and resources. */
  localProjectsInfo?: LocalProjectInfo[];
  /** Object of shared project information, containing projects on the send/receive server. */
  sharedProjectsInfo?: SharedProjectsInfo;
  /** Array of project IDs that are currently being sent/received. */
  activeSendReceiveProjects?: string[];
  /**
   * Content for the header, e.g. <><HomeIcon
   * size={36}/><CardTitle>{localizedDialogTitleText}</CardTitle></>
   */
  headerContent: ReactNode;
};

/**
 * A component that displays a list of local and remote projects, allowing users to open,
 * synchronize, and manage them. It also provides a button to get more resources.
 *
 * @param {localizedStringsWithLoadingState} - Array of [Object with localized strings for the
 *   component, isLoading].
 * @param {uiLocales} - Locales for formatting dates and times.
 * @param {onOpenGetResources} - Callback function to open the Get Resources dialog.
 * @param {onOpenProject} - Callback function to open a project.
 * @param {onSendReceiveProject} - Callback function to send/receive a project.
 * @param {onGetStarted} - Callback function to get started with the platform.
 * @param {showGetResourcesButton} - Whether to show the Get Resources button.
 * @param {isSendReceiveInProgress} - Whether a send/receive operation is in progress.
 * @param {isLoadingLocalProjects} - Whether loading local projects is in progress.
 * @param {remoteProjectsState} - What is known about the send/receive server's half of the list.
 * @param {initialProjectResourceFilter} - Which items the type filter starts on.
 * @param {onProjectResourceFilterChange} - Called with the new filter each time the user changes
 *   it.
 * @param {localProjectsInfo} - Array of local project information, containing projects and
 *   resources.
 * @param {sharedProjectsInfo} - Object of shared project information, containing projects on the
 *   send/receive server.
 * @param {activeSendReceiveProjects} - Array of project IDs that are currently being sent/received.
 * @param {headerContent} - Content for the header, e.g. <><HomeIcon
 *   size={36}/><CardTitle>{localizedDialogTitleText}</CardTitle></>
 * @returns
 */
export function Home({
  localizedStringsWithLoadingState = [{}, false],
  uiLocales = [],
  onOpenGetResources = () => {},
  onOpenProject = () => {},
  onSendReceiveProject = () => {},
  onGetStarted = () => {},
  showGetResourcesButton = true,
  isSendReceiveInProgress = false,
  isLoadingLocalProjects = false,
  remoteProjectsState = 'absent',
  initialProjectResourceFilter = 'all',
  onProjectResourceFilterChange = () => {},
  localProjectsInfo = NO_LOCAL_PROJECTS,
  sharedProjectsInfo = NO_SHARED_PROJECTS,
  activeSendReceiveProjects = NO_ACTIVE_SEND_RECEIVE_PROJECTS,
  headerContent,
}: HomeProps) {
  const getLocalizedString = (localizeKey: HomeLocalizedStringKey) => {
    return localizedStringsWithLoadingState[0][localizeKey] ?? localizeKey;
  };
  const isLocalizedStringsLoading = localizedStringsWithLoadingState[1];
  const actionText: string = getLocalizedString('%resources_action%');
  const activityText: string = getLocalizedString('%resources_activity%');
  const clearFiltersText: string = getLocalizedString('%resources_clearFilters%');
  const clearSearchText: string = getLocalizedString('%resources_clearSearch%');
  const filterAllText: string = getLocalizedString('%resources_filter_all%');
  const filterByValueText: string = getLocalizedString('%resources_filterByValue%');
  const filterInputText: string = getLocalizedString('%resources_filterInput%');
  const shortNameText: string = getLocalizedString('%resources_shortNameText%');
  const fullNameText: string = getLocalizedString('%resources_fullName%');
  const getText: string = getLocalizedString('%resources_get%');
  const getStartedText: string = getLocalizedString('%resources_getStarted%');
  const getStartedDescriptionText: string = getLocalizedString('%resources_getStartedDescription%');
  const getResourcesText: string = getLocalizedString('%resources_getResources%');
  const itemsText: string = isLocalizedStringsLoading
    ? ''
    : getLocalizedString('%resources_items%');
  const itemsFilteredText: string = getLocalizedString('%resources_itemsFiltered%');
  const languageText: string = getLocalizedString('%resources_language%');
  const noProjectsText: string = getLocalizedString('%resources_noProjects%');
  // The default instruction ends with "or get resources", naming the button beside it. Callers that
  // suppress that button (New Tab) would otherwise point the user at something not on screen.
  const noProjectsInstructionText: string = getLocalizedString(
    showGetResourcesButton
      ? '%resources_noProjectsInstruction%'
      : '%resources_noProjectsInstructionWithoutResources%',
  );
  const noProjectsInstructionWithoutResourcesText: string = getLocalizedString(
    '%resources_noProjectsInstructionWithoutResources%',
  );
  const noParatextProjectsFoundText: string = getLocalizedString(
    '%resources_noParatextProjectsFound%',
  );
  const noResourcesFoundText: string = getLocalizedString('%resources_noResourcesFound%');
  const noSearchResultsText: string = getLocalizedString('%resources_noSearchResults%');
  const openText: string = getLocalizedString('%resources_open%');
  const paratextProjectsText: string = getLocalizedString('%resources_paratextProjects_label%');
  const resourcesText: string = getLocalizedString('%resources_resources_label%');
  const searchedForText: string = getLocalizedString('%resources_searchedFor%');
  const syncText: string = getLocalizedString('%resources_sync%');
  // Specific title for failed sync/get attempts — the alert is only shown for that flow, so a
  // contextual title ("Sync failed") communicates what failed better than the generic "Error".
  const syncFailedTitleText: string = getLocalizedString('%resources_syncFailed_title%');
  const serverUnreachableDescriptionText: string = getLocalizedString(
    '%resources_serverUnreachable_description%',
  );

  const isLoading = isLoadingLocalProjects || remoteProjectsState === 'loading';

  /**
   * Title for the banner that says the server half of the list is missing, or `undefined` when
   * there is no missing half to report. `unavailable` gets its own title because the server was
   * reached and refused: the notification beside it names the cause and offers the fix, and a
   * "can't reach the server" title next to it would contradict it and point at the wrong thing.
   */
  let missingServerHalfTitleText: string | undefined;
  if (remoteProjectsState === 'unavailable')
    missingServerHalfTitleText = getLocalizedString('%resources_serverProjectsUnavailable_title%');
  // `unknown` never established that there is a server to reach, which is a weaker claim than
  // `unreachable` — but the user-facing consequence is the same missing half, and the description
  // below ("showing only what is on your computer") is accurate for both.
  else if (remoteProjectsState === 'unreachable' || remoteProjectsState === 'unknown')
    missingServerHalfTitleText = getLocalizedString('%resources_serverUnreachable_title%');

  // Surfaces a business error (e.g. a project locked by another user) when an async action
  // callback rejects, so failures are visible in the UI rather than only logged by the webview.
  const [actionError, setActionError] = useState<string | undefined>(undefined);

  const handleSendReceiveProject = async (projectId: string) => {
    setActionError(undefined);
    try {
      await onSendReceiveProject(projectId);
    } catch (e) {
      setActionError(getErrorMessage(e));
    }
  };

  const mergedProjectInfo: MergedProjectInfo[] = useMemo(() => {
    const newMergedProjectInfo: MergedProjectInfo[] = [];
    if (sharedProjectsInfo) {
      Object.entries(sharedProjectsInfo).forEach(([projectId, sharedProject]) => {
        newMergedProjectInfo.push({
          projectId,
          name: sharedProject.name,
          fullName: sharedProject.fullName,
          language: sharedProject.language,
          // Shared (send/receive) projects are not published resources.
          isPublished: false,
          isSendReceivable: true,
          isLocallyAvailable: localProjectsInfo?.some((project) => project.projectId === projectId),
          editedStatus: sharedProject.editedStatus,
          lastSendReceiveDate: sharedProject.lastSendReceiveDate,
        });
      });
    }
    localProjectsInfo?.forEach((project) => {
      if (
        !newMergedProjectInfo.some((mergedProject) => mergedProject.projectId === project.projectId)
      ) {
        newMergedProjectInfo.push({
          projectId: project.projectId,
          name: project.name,
          fullName: project.fullName,
          language: project.language,
          isPublished: project.isPublished,
          isSendReceivable: false,
          isLocallyAvailable: true,
        });
      }
    });

    return newMergedProjectInfo;
  }, [localProjectsInfo, sharedProjectsInfo]);

  const [textFilter, setTextFilter] = useState<string>('');
  const [projectResourceFilter, setProjectResourceFilter] = useState<ProjectResourceFilterValue>(
    initialProjectResourceFilter,
  );
  const [sortConfig, setSortConfig] = useState<SortConfig>(DEFAULT_SORT_CONFIG);
  const changeProjectResourceFilter = (filter: ProjectResourceFilterValue) => {
    // Re-picking the checked option would otherwise write the same value through to the web view's
    // state, which saves the layout for nothing.
    if (filter === projectResourceFilter) return;
    setProjectResourceFilter(filter);
    onProjectResourceFilterChange(filter);
  };

  const projectResourceFilterOptions: ProjectResourceFilterOption[] = useMemo(
    () => [
      { key: 'paratextProject', label: paratextProjectsText, icon: ScrollText },
      { key: 'resource', label: resourcesText, icon: BookOpen },
    ],
    [paratextProjectsText, resourcesText],
  );

  const filteredProjects = useMemo(() => {
    if (!mergedProjectInfo) return [];
    return mergedProjectInfo.filter((project) => {
      if (!isShownByProjectResourceFilter(projectResourceFilter, project.isPublished)) return false;
      const filter = textFilter.toLowerCase();
      return (
        (project.fullName ?? '').toLowerCase().includes(filter) ||
        project.name.toLowerCase().includes(filter) ||
        project.language.toLowerCase().includes(filter)
      );
    });
  }, [mergedProjectInfo, textFilter, projectResourceFilter]);

  // Only send/receive rows have an activity, so the column exists only while one is listed.
  const hasActivityColumn = filteredProjects.some((project) => project.isSendReceivable);

  const filteredAndSortedProjects = useMemo(() => {
    // Copied because `sort` works in place and `filteredProjects` is a memoized value.
    return [...filteredProjects].sort((a, b) => {
      switch (sortConfig.key) {
        case 'shortName':
          if (a.name < b.name) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.name > b.name) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        case 'fullName': {
          // A project with no full name sorts as the empty string, so the nameless rows group
          // together at one end rather than sorting by a name the column does not show.
          const aFullName = a.fullName ?? '';
          const bFullName = b.fullName ?? '';
          if (aFullName < bFullName) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aFullName > bFullName) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        }
        case 'language':
          if (a.language < b.language) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.language > b.language) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        case 'activity': {
          // A total order: rows with no activity (never synced, or not send/receive at all) go last
          // in either direction, and ties fall back to language. Treating an undated row as equal to
          // every other row left the list only partly sorted, and a list with no dated rows at all
          // (the Resources filter hides every send/receive row) in the order it arrived.
          const aDate = a.lastSendReceiveDate || undefined;
          const bDate = b.lastSendReceiveDate || undefined;
          if (aDate && !bDate) return -1;
          if (!aDate && bDate) return 1;
          if (aDate && bDate && aDate !== bDate) {
            const dateOrder = aDate < bDate ? -1 : 1;
            return sortConfig.direction === 'ascending' ? dateOrder : -dateOrder;
          }
          if (a.language < b.language) return -1;
          if (a.language > b.language) return 1;
          return 0;
        }
        case 'action':
          // To be implemented later
          return 0;
        default:
          return 0;
      }
    });
  }, [filteredProjects, sortConfig]);

  const isTypeFiltered = projectResourceFilter !== 'all';

  // What to say when items exist but none survive the filters. An active type filter is named, with
  // or without a search, since it may be what hid the item searched for — "Nothing found." would
  // tell the user it is not installed. With no type filter, the search is the only explanation.
  const typeFilterEmptyTexts: Record<ProjectResourceFilterValue, string | undefined> = {
    all: undefined,
    paratextProject: noParatextProjectsFoundText,
    resource: noResourcesFoundText,
  };
  const noFilterResultsText = typeFilterEmptyTexts[projectResourceFilter] ?? noSearchResultsText;
  // While the user is asking for projects, getting a resource is not the answer — the filter would
  // hide it the moment it arrived — so no empty state under that filter offers it.
  const isAskingForProjects = projectResourceFilter === 'paratextProject';
  // Only resources are installed and the user asked for their projects: as far as getting a
  // project goes, that is an empty Home, so it gets the empty Home's advice.
  const isShowingNoProjects = !textFilter && isAskingForProjects;
  // The mirror image: while the user is asking for resources, joining a project is not the answer.
  const isAskingForResources = projectResourceFilter === 'resource';

  // Whether the list has finished its first load. The announcement below keys on this rather than
  // on the loading flag itself: every completed sync reloads the list, and dropping the message for
  // the reload and restoring it after would announce it again each time.
  const [hasListLoaded, setHasListLoaded] = useState(false);
  useEffect(() => {
    if (!isLoading) setHasListLoaded(true);
  }, [isLoading]);
  // Items exist, but none survive the filters.
  const isFilteredToNothing =
    hasListLoaded && mergedProjectInfo.length > 0 && filteredAndSortedProjects.length === 0;
  // The message a filter or search that empties the list swaps in, for the live region below. When
  // the server half is missing, its banner's title goes with it: "No Paratext projects found." on
  // its own tells an offline user they have none, and the banner itself is inserted with its
  // content, which a screen reader often does not announce. Joined with a newline, the one join the
  // style guide allows, so each piece stays a translatable whole.
  let filteredToNothingAnnouncement = '';
  if (isFilteredToNothing && !isLocalizedStringsLoading)
    filteredToNothingAnnouncement = missingServerHalfTitleText
      ? `${noFilterResultsText}\n${missingServerHalfTitleText}`
      : noFilterResultsText;

  const clearFilters = () => {
    setTextFilter('');
    if (isTypeFiltered) changeProjectResourceFilter('all');
  };

  let itemCountText = `${filteredAndSortedProjects.length} ${itemsText}`;
  if (!isLocalizedStringsLoading && filteredAndSortedProjects.length !== mergedProjectInfo.length)
    itemCountText = formatReplacementString(itemsFilteredText, {
      shownCount: filteredAndSortedProjects.length,
      totalCount: mergedProjectInfo.length,
    });

  const handleSort = (key: SortConfig['key']) => {
    const newSortConfig: SortConfig = { key, direction: 'ascending' };
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      newSortConfig.direction = 'descending';
    }
    setSortConfig(newSortConfig);
  };

  const buildTableHead = (key: SortConfig['key'], label: string, className?: string) => (
    <TableHead onClick={() => handleSort(key)} className={cn('tw:px-2', className)}>
      <Button className="tw:flex tw:items-center tw:px-2" variant="ghost">
        <div className="tw:font-normal">{label}</div>
        {sortConfig.key !== key && <ChevronsUpDown className="tw:pl-1" size={16} />}
        {sortConfig.key === key &&
          (sortConfig.direction === 'ascending' ? (
            <ChevronUp className="tw:pl-1" size={16} />
          ) : (
            <ChevronDown className="tw:pl-1" size={16} />
          ))}
      </Button>
    </TableHead>
  );

  const relativeTimeFormatter = useMemo(() => {
    return new Intl.RelativeTimeFormat(uiLocales, { style: 'long', numeric: 'auto' });
  }, [uiLocales]);

  const getSendReceiveButtonContent = (project: MergedProjectInfo) => {
    if (isSendReceiveInProgress && activeSendReceiveProjects.includes(project.projectId)) {
      return <Spinner className="tw:h-5 tw:py-[1px]" />;
    }

    return project.isLocallyAvailable ? syncText : getText;
  };

  const syncOrGetButton = (project: MergedProjectInfo, isMenuItem?: boolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => handleSendReceiveProject(project.projectId)}>
          <span>{getSendReceiveButtonContent(project)}</span>
        </DropdownMenuItem>
      );
    return (
      <Button
        disabled={isSendReceiveInProgress && activeSendReceiveProjects.includes(project.projectId)}
        onClick={() => handleSendReceiveProject(project.projectId)}
      >
        {getSendReceiveButtonContent(project)}
      </Button>
    );
  };

  const openButton = (project: MergedProjectInfo, isMenuItem?: boolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => onOpenProject(project.projectId, project.isPublished)}>
          <span>{openText}</span>
        </DropdownMenuItem>
      );
    return (
      <Button onClick={() => onOpenProject(project.projectId, project.isPublished)}>
        {openText}
      </Button>
    );
  };

  return (
    <Card className="tw:flex tw:h-screen tw:flex-col tw:rounded-none tw:border-0">
      <CardHeader
        className={cn(
          'tw:shrink-0 tw:[@media(max-height:28rem)]:!pb-2 tw:[@media(max-height:28rem)]:!pt-4 tw:max-[300px]:!pb-0',
          { 'tw:max-[300px]:!pb-2': showGetResourcesButton },
        )}
      >
        <div className="tw:flex tw:flex-wrap tw:justify-between tw:gap-4">
          {/* `max-w-sm` rather than `max-w-72`: the filter button shares the search row. */}
          <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-sm tw:w-full">
            <div className="tw:flex tw:gap-4 tw:items-center tw:[@media(max-height:28rem)]:!hidden tw:max-[300px]:!hidden">
              {headerContent}
            </div>
            <div className="tw:flex tw:items-center tw:gap-2">
              <div className="tw:min-w-0 tw:flex-1">
                <SearchBar
                  value={textFilter}
                  onSearch={setTextFilter}
                  placeholder={filterInputText}
                />
              </div>
              <ProjectResourceFilter
                value={projectResourceFilter}
                onChange={changeProjectResourceFilter}
                options={projectResourceFilterOptions}
                localizedAllText={filterAllText}
                localizedFilterByValueText={filterByValueText}
              />
            </div>
          </div>
          {showGetResourcesButton && (
            <div className="tw:self-end">
              <Button onClick={onOpenGetResources} className="tw:bg-muted" variant="ghost">
                {`+ ${getResourcesText}`}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      {actionError && (
        <div className="tw:mx-4 tw:mb-2">
          <Alert variant="destructive">
            <AlertCircle className="tw:h-4 tw:w-4" />
            <AlertTitle>{syncFailedTitleText}</AlertTitle>
            <AlertDescription>{actionError}</AlertDescription>
          </Alert>
        </div>
      )}
      {/*
       * Sits above the list rather than inside its empty state: the server half can be missing
       * while local projects still fill the table, and that is the case where nothing else on
       * screen suggests the list is incomplete. Not `destructive` — the list shown is accurate as
       * far as it goes, which is a narrower claim than the failed sync above. `role="status"`
       * overrides the polite-by-default `Alert`'s assertive `role="alert"`: this appears when an
       * async load settles and asks nothing of the user, so interrupting a screen reader mid
       * sentence to announce it is the wrong register.
       */}
      {!isLoading && missingServerHalfTitleText && (
        <div className="tw:mx-4 tw:mb-2">
          <Alert role="status">
            <CloudOff className="tw:h-4 tw:w-4" />
            <AlertTitle>{missingServerHalfTitleText}</AlertTitle>
            <AlertDescription>{serverUnreachableDescriptionText}</AlertDescription>
          </Alert>
        </div>
      )}
      {/*
       * A filter or search that empties the list swaps the table for a message, which a screen
       * reader gets no other notice of. The region is always mounted and holds only the message:
       * a live region inserted with its content is often not announced, and one that included the
       * quoted search or the buttons would be re-announced on every keystroke.
       */}
      <div role="status" aria-live="polite" aria-atomic="true" className="tw:sr-only">
        {filteredToNothingAnnouncement}
      </div>
      {isLoading ? (
        <CardContent className="tw:flex tw:flex-grow tw:flex-col tw:items-center tw:justify-center tw:gap-2">
          <Spinner />
        </CardContent>
      ) : (
        <CardContent className="tw:flex-grow tw:overflow-auto tw:min-h-32 tw:px-0">
          <div className="tw:flex tw:flex-col tw:gap-4">
            {/*
             * Nothing to list at all, as opposed to a search that excluded everything: the two
             * need different advice, and the no-results message quotes the query, so using it here
             * would show `Searched for ""` to someone who never searched.
             */}
            {mergedProjectInfo.length === 0 ? (
              <div className="tw:flex-grow tw:h-full tw:border tw:border-muted tw:rounded-lg tw:p-6 tw:text-center tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-1">
                <Label className="tw:text-muted-foreground">{noProjectsText}</Label>
                {!isAskingForResources && (
                  <Label className="tw:text-muted-foreground tw:font-normal">
                    {isAskingForProjects
                      ? noProjectsInstructionWithoutResourcesText
                      : noProjectsInstructionText}
                  </Label>
                )}

                {showGetResourcesButton && !isAskingForProjects && (
                  <Button
                    onClick={onOpenGetResources}
                    className="tw:mt-4"
                  >{`+ ${getResourcesText}`}</Button>
                )}
              </div>
            ) : (
              <div className="tw:flex-grow tw:h-full">
                {filteredAndSortedProjects.length === 0 ? (
                  <div className="tw:flex-grow tw:h-full tw:border tw:border-muted tw:rounded-lg tw:p-6 tw:text-center tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-1">
                    <Label className="tw:text-muted-foreground">{noFilterResultsText}</Label>
                    {textFilter && (
                      <Label className="tw:text-muted-foreground tw:font-normal">
                        {`${searchedForText} "${textFilter}".`}
                      </Label>
                    )}
                    {isShowingNoProjects && (
                      <Label className="tw:text-muted-foreground tw:font-normal">
                        {noProjectsInstructionWithoutResourcesText}
                      </Label>
                    )}
                    <div className="tw:flex tw:gap-1  tw:mt-4">
                      <Button variant="ghost" onClick={clearFilters}>
                        {isTypeFiltered ? clearFiltersText : clearSearchText}
                      </Button>
                      {showGetResourcesButton && !isAskingForProjects && (
                        <Button
                          onClick={onOpenGetResources}
                          variant="ghost"
                          className="tw:bg-muted"
                        >
                          {`+ ${getResourcesText}`}
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <Table stickyHeader>
                    <TableHeader className="tw:bg-none tw:max-[300px]:hidden" stickyHeader>
                      <TableRow className="tw:rounded-sm">
                        {buildTableHead('shortName', shortNameText, 'tw:ps-4')}
                        {buildTableHead('fullName', fullNameText, 'tw:hidden tw:md:!table-cell')}
                        {buildTableHead('language', languageText, 'tw:hidden tw:sm:!table-cell')}
                        {hasActivityColumn &&
                          buildTableHead('activity', activityText, 'tw:hidden tw:sm:!table-cell')}
                        {buildTableHead('action', actionText)}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedProjects.map((project) => (
                        <TableRow
                          onMouseDown={(e) => {
                            // cancel double‑click text selection
                            if (e.detail > 1) e.preventDefault();
                          }}
                          onDoubleClick={() =>
                            project.isLocallyAvailable
                              ? onOpenProject(project.projectId, project.isPublished)
                              : !isSendReceiveInProgress &&
                                handleSendReceiveProject(project.projectId)
                          }
                          key={project.projectId}
                          className={cn('tw:rounded-sm', {
                            'tw:text-muted-foreground/70 tw:hover:text-foreground':
                              !project.isLocallyAvailable,
                          })}
                        >
                          <TableCell
                            className={cn({ 'tw:ps-2': project.editedStatus === 'edited' })}
                          >
                            <div
                              className={cn(
                                'tw:flex tw:flex-row tw:items-center tw:gap-4 tw:ps-2',
                                { 'tw:ps-0': project.editedStatus === 'edited' },
                              )}
                            >
                              <div className="tw:flex tw:flex-row tw:items-center tw:gap-2">
                                {project.editedStatus === 'edited' && (
                                  <div className="tw:rounded-full tw:bg-primary tw:h-2 tw:w-2 tw:ms-[-8px]" />
                                )}
                                {project.isPublished ? (
                                  <BookOpen className="tw:pr-0" size={18} />
                                ) : (
                                  <ScrollText className="tw:pr-0" size={18} />
                                )}
                              </div>

                              <div className="tw:whitespace-nowrap tw:cursor-default">
                                {project.name}
                              </div>

                              <div className="tw:grow tw:hidden tw:max-[300px]:!flex">
                                <div className="tw:grow" />
                                <HomeItemDropdownMenu ellipsisButtonClassName="tw:h-6">
                                  {(!project.isLocallyAvailable ||
                                    project.editedStatus === 'edited') && (
                                    <DropdownMenuItem asChild>
                                      {syncOrGetButton(project, true)}
                                    </DropdownMenuItem>
                                  )}
                                  {project.isLocallyAvailable && (
                                    <DropdownMenuItem asChild>
                                      {openButton(project, true)}
                                    </DropdownMenuItem>
                                  )}
                                </HomeItemDropdownMenu>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="tw:hidden tw:md:!table-cell tw:font-medium tw:whitespace-normal tw:wrap-anywhere tw:cursor-default">
                            {project.fullName}
                          </TableCell>
                          <TableCell className="tw:hidden tw:sm:!table-cell tw:cursor-default">
                            {project.language}
                          </TableCell>
                          {hasActivityColumn && (
                            <TableCell className="tw:hidden tw:sm:!table-cell tw:cursor-default">
                              {project.lastSendReceiveDate &&
                                formatTimeSpan(
                                  relativeTimeFormatter,
                                  new Date(project.lastSendReceiveDate),
                                )}
                            </TableCell>
                          )}
                          <TableCell className="tw:max-[300px]:hidden">
                            <div className="tw:flex tw:justify-between tw:items-center">
                              {project.isSendReceivable &&
                              (!project.isLocallyAvailable || project.editedStatus === 'edited')
                                ? syncOrGetButton(project)
                                : openButton(project)}
                              {project.isSendReceivable && project.isLocallyAvailable && (
                                <HomeItemDropdownMenu>
                                  <DropdownMenuItem asChild>
                                    {project.editedStatus === 'edited'
                                      ? openButton(project, true)
                                      : syncOrGetButton(project, true)}
                                  </DropdownMenuItem>
                                </HomeItemDropdownMenu>
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
            {/* About the one item on screen, so only while that item is actually listed. */}
            {mergedProjectInfo.length === 1 &&
              filteredAndSortedProjects.length === 1 &&
              filteredAndSortedProjects[0].name === 'WEB' && (
                <div className="tw:flex tw:flex-col tw:gap-4 tw:items-center tw:w-auto">
                  <p className="tw:text-muted-foreground tw:font-normal">
                    {getStartedDescriptionText}
                  </p>
                  <Button onClick={onGetStarted}>{getStartedText}</Button>
                </div>
              )}
          </div>
        </CardContent>
      )}
      <CardFooter className="tw:shrink-0 tw:flex-col tw:justify-center tw:p-4 tw:border-t tw:gap-2 tw:[@media(max-height:32rem)]:!hidden">
        <Label>{itemCountText}</Label>
      </CardFooter>
    </Card>
  );
}
