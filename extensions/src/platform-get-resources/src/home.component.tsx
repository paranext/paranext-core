import {
  AlertCircle,
  BookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  CloudOff,
  Lock,
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
  DisabledActionTooltip,
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
  Tooltip,
  TooltipContent,
  TOOLTIP_DELAY_MS,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import type { ProjectMetadata } from '@papi/core';
import type { LanguageStrings, LocalizedStringValue } from 'platform-bible-utils';
import {
  formatReplacementString,
  formatTimeSpan,
  getErrorMessage,
  hasDistinctFullName,
  isLocalizeKey,
  normalizeFullName,
  PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
} from 'platform-bible-utils';
import type { EditedStatus, SharedProjectsInfo } from 'platform-scripture';
import { ReactNode, useMemo, useRef, useState } from 'react';
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
  '%general_countOfTotal%',
  '%resources_action%',
  '%resources_activity%',
  '%resources_activity_tooltip%',
  '%resources_clearFilters%',
  '%resources_clearSearch%',
  '%resources_filter_all%',
  '%resources_filterByValue%',
  '%resources_shortNameText%',
  '%resources_fullName%',
  '%resources_get%',
  '%resources_getStarted%',
  '%resources_getStartedDescription%',
  '%resources_getStartedNoItemsDescription%',
  '%resources_getResources%',
  '%resources_items%',
  '%resources_language%',
  '%resources_noProjects%',
  '%resources_noProjectsInstruction%',
  '%resources_noProjectsInstructionWithoutResources%',
  '%resources_noParatextProjectsFound%',
  '%resources_noResourcesFound%',
  '%resources_noSearchResults%',
  '%resources_open%',
  '%resources_paratextProjectReadOnly_tooltip%',
  '%resources_paratextProject_tooltip%',
  '%resources_paratextProjects_label%',
  '%resources_resource_tooltip%',
  '%resources_resources_label%',
  '%resources_filterInput_searchPlaceholder%',
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
const NO_LOCALIZED_UNSUPPORTED_REASONS: LanguageStrings = {};

export type SortConfig = {
  key: 'shortName' | 'fullName' | 'language' | 'activity' | 'action';
  direction: 'ascending' | 'descending';
};

/**
 * The shared tooltip nudges its arrow flush against the content only for top and bottom tooltips;
 * on a side tooltip the arrow is otherwise a whole diamond whose tip pokes into the trigger's
 * text.
 */
const SIDE_TOOLTIP_ARROW_CLASS = 'tw:translate-y-[calc(-50%-1px)]';

/**
 * A tooltip trigger that is a button only so the keyboard can reach it: it looks like the text it
 * wraps, and shows the standard focus ring when focused from the keyboard.
 */
const TOOLTIP_TRIGGER_BUTTON_CLASS =
  'tw:cursor-default tw:rounded-sm tw:text-start tw:outline-hidden tw:focus-visible:ring-2 tw:focus-visible:ring-ring';

/**
 * Short name of the sample project the app installs into an empty projects folder, which the
 * getting-started prompt is about when it is the only item. Only dev (unpackaged) runs install it
 * by default; a new user of a packaged build sees the prompt on the empty Home instead.
 */
const BUNDLED_SAMPLE_PROJECT_SHORT_NAME = 'WEB';

const DEFAULT_SORT_CONFIG: SortConfig = { key: 'language', direction: 'ascending' };

/**
 * A last send/receive date as a timestamp, or `undefined` for a row with none. Compared as time,
 * not as text: the backend sends local-offset ISO strings, which sort out of order across a DST
 * change.
 */
function getLastSendReceiveTime(project: MergedProjectInfo): number | undefined {
  if (!project.lastSendReceiveDate) return undefined;
  const time = new Date(project.lastSendReceiveDate).getTime();
  return Number.isNaN(time) ? undefined : time;
}

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
  /**
   * The project's `platform.isEditable` setting, as in `ProjectMetadata`: absent means it does not
   * say. Home only calls out an explicit `false`, since the user's role on a project can still make
   * an "editable" one read-only.
   */
  isEditable?: boolean;
  /** Localize key; absent means the project can be opened. See `ProjectMetadata.unsupportedReason`. */
  unsupportedReason?: string;
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
    isEditable: data.isEditable,
    fullName: normalizeFullName(data.fullName),
    name: data.name ?? data.id,
    language: data.language ?? '',
    unsupportedReason: data.unsupportedReason,
  };
}

export type MergedProjectInfo = {
  projectId: string;
  name: string;
  /** Absent when the project has no full name. See {@link LocalProjectInfo.fullName}. */
  fullName?: string;
  language: string;
  isPublished: boolean;
  /** See {@link LocalProjectInfo.isEditable}. */
  isEditable?: boolean;
  isSendReceivable: boolean;
  isLocallyAvailable?: boolean;
  editedStatus?: EditedStatus;
  /**
   * Whether the project has changes to send to the server or to receive from it, per
   * {@link HomeProps.unsyncedProjectIds}.
   */
  hasUnsyncedChanges?: boolean;
  lastSendReceiveDate?: string;
  /** Localize key; absent means the project can be opened. See `ProjectMetadata.unsupportedReason`. */
  unsupportedReason?: string;
};

/**
 * Whether a project is out of step with the server: the shared-project list reports it as edited
 * (`editedStatus`), or it is in the live set of projects with changes to send or receive. A marked
 * row shows the dot and, when it can be synced, offers Sync before Open.
 */
const isEdited = (project: MergedProjectInfo) =>
  project.editedStatus === 'edited' || !!project.hasUnsyncedChanges;

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
   * Callback function to open a project or resource. While a returned promise is pending, the
   * item's Open button shows a spinner and further opens of it are ignored. The caller reports its
   * own failures; a rejection only ends the pending state.
   *
   * @param projectId - The ID of the project to open.
   * @param isPublished - Whether the project is a published resource (read-only reference), so the
   *   caller can decide how to open it.
   */
  onOpenProject?: (projectId: string, isPublished: boolean) => void | Promise<unknown>;
  /**
   * Callback function to send/receive a project. May be async; if it rejects, the component shows
   * the error message in a destructive alert.
   *
   * @param projectId - The ID of the project to send/receive.
   */
  onSendReceiveProject?: (projectId: string) => void | Promise<void>;
  /**
   * Callback function to open the get started website of platform. Without one, the getting-started
   * prompt is not shown, since its button would do nothing.
   */
  onGetStarted?: () => void;
  /** Whether to show the Get Resources button. */
  showGetResourcesButton?: boolean;
  /** Whether a send/receive operation is in progress. */
  isSendReceiveInProgress?: boolean;
  /**
   * Normalized (upper-cased) IDs of the projects with changes to send or receive, the union of the
   * two sets `paratextBibleSendReceive.getUnsyncedChanges` returns. Listed projects are marked and
   * offer Sync first.
   */
  unsyncedProjectIds?: readonly string[];
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
   * Localized text for each `unsupportedReason` key in the list, plus
   * `%project_unsupported_generic%`, which is shown for a reason that is not a key or has no entry.
   * With neither, no reason text is shown.
   */
  localizedUnsupportedReasons?: LanguageStrings;
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
 * @param {localizedUnsupportedReasons} - Localized text for each `unsupportedReason` key in the
 *   list, plus `%project_unsupported_generic%` for a reason that cannot be shown itself.
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
  onGetStarted,
  showGetResourcesButton = true,
  isSendReceiveInProgress = false,
  unsyncedProjectIds,
  isLoadingLocalProjects = false,
  remoteProjectsState = 'absent',
  initialProjectResourceFilter = 'all',
  onProjectResourceFilterChange = () => {},
  localProjectsInfo = NO_LOCAL_PROJECTS,
  sharedProjectsInfo = NO_SHARED_PROJECTS,
  activeSendReceiveProjects = NO_ACTIVE_SEND_RECEIVE_PROJECTS,
  localizedUnsupportedReasons = NO_LOCALIZED_UNSUPPORTED_REASONS,
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
  const filterInputText: string = getLocalizedString('%resources_filterInput_searchPlaceholder%');
  const shortNameText: string = getLocalizedString('%resources_shortNameText%');
  const fullNameText: string = getLocalizedString('%resources_fullName%');
  const getText: string = getLocalizedString('%resources_get%');
  const getStartedText: string = getLocalizedString('%resources_getStarted%');
  const getStartedDescriptionText: string = getLocalizedString('%resources_getStartedDescription%');
  const getStartedNoItemsDescriptionText: string = getLocalizedString(
    '%resources_getStartedNoItemsDescription%',
  );
  const getResourcesText: string = getLocalizedString('%resources_getResources%');
  const itemsText: string = isLocalizedStringsLoading
    ? ''
    : getLocalizedString('%resources_items%');
  const countOfTotalText: string = getLocalizedString('%general_countOfTotal%');
  const languageText: string = getLocalizedString('%resources_language%');
  const activityTooltipText: string = getLocalizedString('%resources_activity_tooltip%');
  const paratextProjectText: string = getLocalizedString('%resources_paratextProject_tooltip%');
  const paratextProjectReadOnlyText: string = getLocalizedString(
    '%resources_paratextProjectReadOnly_tooltip%',
  );
  const resourceText: string = getLocalizedString('%resources_resource_tooltip%');
  const noProjectsText: string = getLocalizedString('%resources_noProjects%');
  const noProjectsInstructionText: string = getLocalizedString('%resources_noProjectsInstruction%');
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

  // Items whose open is in flight. An open can take a while (in Simple mode a resource waits for the
  // catalog), so its Open button shows a spinner, and repeat opens are ignored rather than queued.
  // The ref guards against a double-click whose second click lands before the state re-renders.
  const [openingProjectIds, setOpeningProjectIds] = useState<string[]>([]);
  const openingProjectIdsRef = useRef(new Set<string>());

  const handleOpenProject = async (project: MergedProjectInfo) => {
    const { projectId } = project;
    if (openingProjectIdsRef.current.has(projectId)) return;
    openingProjectIdsRef.current.add(projectId);
    setOpeningProjectIds((ids) => [...ids, projectId]);
    try {
      await onOpenProject(projectId, project.isPublished);
    } catch {
      // The caller reports its own failures; this only makes sure the item can be opened again.
    } finally {
      openingProjectIdsRef.current.delete(projectId);
      setOpeningProjectIds((ids) => ids.filter((id) => id !== projectId));
    }
  };

  const mergedProjectInfo: MergedProjectInfo[] = useMemo(() => {
    const newMergedProjectInfo: MergedProjectInfo[] = [];
    if (sharedProjectsInfo) {
      Object.entries(sharedProjectsInfo).forEach(([projectId, sharedProject]) => {
        const localProject = localProjectsInfo?.find((project) => project.projectId === projectId);
        newMergedProjectInfo.push({
          projectId,
          name: sharedProject.name,
          fullName: sharedProject.fullName,
          language: sharedProject.language,
          // Shared (send/receive) projects are not published resources.
          isPublished: false,
          // The server's list says nothing about editability. A downloaded copy has its own
          // setting; one not on this machine yet has none.
          isEditable: localProject?.isEditable,
          isSendReceivable: true,
          isLocallyAvailable: !!localProject,
          editedStatus: sharedProject.editedStatus,
          hasUnsyncedChanges: unsyncedProjectIds?.includes(projectId.toUpperCase()),
          lastSendReceiveDate: sharedProject.lastSendReceiveDate,
          // The server's answer covers a project that is not downloaded yet; the local one covers a
          // server that does not report it. `||` so an empty reason never masks a real one.
          unsupportedReason: sharedProject.unsupportedReason || localProject?.unsupportedReason,
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
          isEditable: project.isEditable,
          isSendReceivable: false,
          isLocallyAvailable: true,
          hasUnsyncedChanges: unsyncedProjectIds?.includes(project.projectId.toUpperCase()),
          unsupportedReason: project.unsupportedReason,
        });
      }
    });

    return newMergedProjectInfo;
  }, [localProjectsInfo, sharedProjectsInfo, unsyncedProjectIds]);

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
  // With the Activity column hidden every listed row is undated, so an Activity sort orders them by
  // its language tie-break. Language is therefore the sort the headers report and toggle from.
  const effectiveSortConfig =
    sortConfig.key === 'activity' && !hasActivityColumn ? DEFAULT_SORT_CONFIG : sortConfig;

  const filteredAndSortedProjects = useMemo(() => {
    // Copied because `sort` works in place and `filteredProjects` is a memoized value.
    return [...filteredProjects].sort((a, b) => {
      switch (effectiveSortConfig.key) {
        case 'shortName':
          if (a.name < b.name) {
            return effectiveSortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.name > b.name) {
            return effectiveSortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        case 'fullName': {
          // A project with no full name sorts as the empty string, so the nameless rows group
          // together at one end rather than sorting by a name the column does not show.
          const aFullName = a.fullName ?? '';
          const bFullName = b.fullName ?? '';
          if (aFullName < bFullName) {
            return effectiveSortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aFullName > bFullName) {
            return effectiveSortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        }
        case 'language':
          if (a.language < b.language) {
            return effectiveSortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.language > b.language) {
            return effectiveSortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        case 'activity': {
          // A total order: rows with no activity (never synced, or not send/receive at all) go last
          // in either direction, and ties fall back to language. An undated row must not compare
          // equal to every other row, or the rows around it are left only partly sorted.
          const aTime = getLastSendReceiveTime(a);
          const bTime = getLastSendReceiveTime(b);
          if (aTime !== undefined && bTime === undefined) return -1;
          if (aTime === undefined && bTime !== undefined) return 1;
          if (aTime !== undefined && bTime !== undefined && aTime !== bTime) {
            const timeOrder = aTime < bTime ? -1 : 1;
            return effectiveSortConfig.direction === 'ascending' ? timeOrder : -timeOrder;
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
  }, [filteredProjects, effectiveSortConfig]);

  const isTypeFiltered = projectResourceFilter !== 'all';
  // The bundled WEB sample — a project, not the DBL resource that can share its short name — is the
  // only item the type filter lists, and no search hides it.
  const isOnlyWebSampleListed =
    filteredAndSortedProjects.length === 1 &&
    filteredAndSortedProjects[0].name === BUNDLED_SAMPLE_PROJECT_SHORT_NAME &&
    !filteredAndSortedProjects[0].isPublished &&
    mergedProjectInfo.filter((project) =>
      isShownByProjectResourceFilter(projectResourceFilter, project.isPublished),
    ).length === 1;

  // What to say when items exist but none survive the filters. An active type filter is named, with
  // or without a search, since it may be what hid the item searched for — "Nothing found." would
  // tell the user it is not installed. With no type filter, the search is the only explanation.
  const typeFilterEmptyTexts: Record<ProjectResourceFilterValue, string | undefined> = {
    all: undefined,
    paratextProject: noParatextProjectsFoundText,
    resource: noResourcesFoundText,
  };
  const noFilterResultsText = typeFilterEmptyTexts[projectResourceFilter] ?? noSearchResultsText;
  const isAskingForProjects = projectResourceFilter === 'paratextProject';
  const isAskingForResources = projectResourceFilter === 'resource';
  // The two pieces of advice an empty state can give, decided once for every empty state. Get
  // Resources is offered only where its button is on screen and the filter would not hide a
  // resource the moment it arrived. Joining a project is advised only where the filter would not
  // hide that project either, and not while the server half is missing: the user's projects may be
  // on the server Home could not reach.
  const canOfferGetResources = showGetResourcesButton && !isAskingForProjects;
  const canAdviseJoiningProject = !isAskingForResources && !missingServerHalfTitleText;
  // The project advice ends with "or get resources" only where that button is on screen.
  const joinProjectAdviceText = canOfferGetResources
    ? noProjectsInstructionText
    : noProjectsInstructionWithoutResourcesText;
  // Only resources are installed and the user asked for their projects: as far as getting a
  // project goes, that is an empty Home, so it gets the empty Home's advice.
  const isShowingNoProjects = !textFilter && isAskingForProjects && canAdviseJoiningProject;

  // The message for the live region below: what a filter or search that empties the list swaps in.
  // When the server half is missing, its banner's title goes with it: "No Paratext projects found."
  // on its own tells an offline user they have none, and the banner itself is inserted with its
  // content, which a screen reader often does not announce. Not under the Resources filter: server
  // rows are never resources, so the missing half cannot explain an empty Resources list. Joined
  // with a newline, the one join the style guide allows, so each piece stays a translatable whole.
  //
  // It only changes while the list and its strings are settled. Every completed sync reloads the
  // list, passing through `loading` behind a spinner; a message that changed for the reload — or
  // for a search typed under the spinner, or strings that arrived mid-reload — would announce
  // something that is not on screen, then announce again when the list came back. Updated during
  // render, so it costs no second render of every row.
  const [filteredToNothingAnnouncement, setFilteredToNothingAnnouncement] = useState('');
  if (!isLoading && !isLocalizedStringsLoading) {
    let settledAnnouncement = '';
    if (mergedProjectInfo.length > 0 && filteredAndSortedProjects.length === 0)
      settledAnnouncement =
        missingServerHalfTitleText && !isAskingForResources
          ? `${noFilterResultsText}\n${missingServerHalfTitleText}`
          : noFilterResultsText;
    if (settledAnnouncement !== filteredToNothingAnnouncement)
      setFilteredToNothingAnnouncement(settledAnnouncement);
  }

  // React element refs start out as `null`.
  // eslint-disable-next-line no-null/no-null
  const searchInputRef = useRef<HTMLInputElement>(null);

  const clearFilters = () => {
    setTextFilter('');
    if (isTypeFiltered) changeProjectResourceFilter('all');
    // The button that called this belongs to the empty state the list is about to replace, so focus
    // would otherwise fall to the document. The search box is where the user goes next.
    searchInputRef.current?.focus();
  };

  let itemCountText = `${filteredAndSortedProjects.length} ${itemsText}`;
  if (!isLocalizedStringsLoading && filteredAndSortedProjects.length !== mergedProjectInfo.length)
    itemCountText = formatReplacementString(countOfTotalText, {
      count: filteredAndSortedProjects.length,
      total: mergedProjectInfo.length,
    });

  const handleSort = (key: SortConfig['key']) => {
    const newSortConfig: SortConfig = { key, direction: 'ascending' };
    if (effectiveSortConfig.key === key && effectiveSortConfig.direction === 'ascending') {
      newSortConfig.direction = 'descending';
    }
    setSortConfig(newSortConfig);
  };

  const buildTableHead = (key: SortConfig['key'], label: string, className?: string) => (
    <TableHead onClick={() => handleSort(key)} className={cn('tw:px-2', className)}>
      <Button className="tw:flex tw:items-center tw:px-2" variant="ghost">
        <div className="tw:font-normal">{label}</div>
        {effectiveSortConfig.key !== key && <ChevronsUpDown className="tw:pl-1" size={16} />}
        {effectiveSortConfig.key === key &&
          (effectiveSortConfig.direction === 'ascending' ? (
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

  const exactDateTimeFormatter = useMemo(
    () => new Intl.DateTimeFormat(uiLocales, { dateStyle: 'long', timeStyle: 'short' }),
    [uiLocales],
  );

  /**
   * The row's kind — its icon, whether it carries the read-only padlock other project lists use,
   * and the words that name it in the tooltip and to screen readers.
   */
  const getRowKind = (project: MergedProjectInfo) => {
    if (project.isPublished) return { Icon: BookOpen, isReadOnly: false, label: resourceText };
    if (project.isEditable === false)
      return { Icon: ScrollText, isReadOnly: true, label: paratextProjectReadOnlyText };
    return { Icon: ScrollText, isReadOnly: false, label: paratextProjectText };
  };

  /**
   * The row's icon and short name, with its full name, language and kind in a tooltip. The icon is
   * named by its kind too, so the kind does not depend on seeing the icon or hovering the row.
   *
   * The trigger is a button so the keyboard reaches it: the table is a composite widget where ←/→
   * move between the controls in a row, and at narrow widths this tooltip is the only place the
   * full name and language appear. It has no action of its own; the row's double-click still
   * opens.
   */
  const renderNameWithDetails = (project: MergedProjectInfo) => {
    const { Icon, isReadOnly, label } = getRowKind(project);
    return (
      <Tooltip>
        <TooltipTrigger className={TOOLTIP_TRIGGER_BUTTON_CLASS}>
          <span className="tw:flex tw:flex-row tw:items-center tw:gap-4">
            <span className="tw:flex tw:flex-row tw:items-center tw:gap-2">
              {isEdited(project) && (
                <span
                  data-testid="home-project-unsynced-dot"
                  className="tw:rounded-full tw:bg-primary tw:h-2 tw:w-2 tw:ms-[-8px]"
                />
              )}
              <span role="img" aria-label={label} className="tw:flex tw:items-center">
                <Icon className="tw:pr-0" size={18} aria-hidden />
                {isReadOnly && <Lock className="tw:size-3 tw:-ms-1 tw:self-end" aria-hidden />}
              </span>
            </span>
            <span className="tw:whitespace-nowrap">{project.name}</span>
          </span>
        </TooltipTrigger>
        {/* Capped to the room beside the trigger, so a long full name wraps rather than clipping. */}
        <TooltipContent
          side="right"
          className="tw:max-w-(--radix-tooltip-content-available-width)"
          arrowClassName={SIDE_TOOLTIP_ARROW_CLASS}
        >
          <div className="tw:flex tw:flex-col tw:gap-0.5">
            {hasDistinctFullName({ shortName: project.name, fullName: project.fullName }) && (
              <div className="tw:wrap-anywhere tw:font-bold">{project.fullName}</div>
            )}
            <div>{project.language}</div>
            {/* The tooltip is inverted (`bg-foreground`), so its caption dims the tooltip's own
                text color rather than using `muted-foreground`, which is meant for the page. */}
            <div className="tw:text-background/80">{label}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  /**
   * The Activity cell: how long ago, with the exact time of the last sync in a tooltip. Parsed by
   * the same rule the Activity sort uses, so a date that does not parse is shown as no activity
   * instead of throwing out of `Intl.RelativeTimeFormat`.
   */
  const renderLastSendReceive = (project: MergedProjectInfo) => {
    const time = getLastSendReceiveTime(project);
    if (time === undefined) return undefined;
    return (
      <Tooltip>
        {/* A button for the same reason as the row name's: the exact time is only in this tooltip. */}
        <TooltipTrigger className={TOOLTIP_TRIGGER_BUTTON_CLASS}>
          {formatTimeSpan(relativeTimeFormatter, new Date(time))}
        </TooltipTrigger>
        <TooltipContent side="left" arrowClassName={SIDE_TOOLTIP_ARROW_CLASS}>
          <div className="tw:flex tw:flex-col tw:gap-0.5">
            <div className="tw:text-background/80">{activityTooltipText}</div>
            <div className="tw:font-bold">{exactDateTimeFormatter.format(new Date(time))}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  /**
   * Whether a row event happened in the row itself. A row's tooltips are portaled out of the table
   * but are still its React children, so their events bubble to the row's handlers; a double-click
   * on a tooltip must not open the project, or start a download, behind it.
   */
  const isEventInside = (event: { target: EventTarget; currentTarget: Element }) =>
    event.target instanceof Node && event.currentTarget.contains(event.target);

  const getSendReceiveButtonContent = (project: MergedProjectInfo) => {
    if (isSendReceiveInProgress && activeSendReceiveProjects.includes(project.projectId)) {
      return <Spinner className="tw:h-5 tw:py-[1px]" />;
    }

    return project.isLocallyAvailable ? syncText : getText;
  };

  /**
   * The text explaining why a project's Open, Sync, and Get are blocked, or `undefined` when the
   * project is supported.
   */
  const getUnsupportedReasonText = (project: MergedProjectInfo): string | undefined => {
    if (!project.unsupportedReason) return undefined;
    // A key with no translation can resolve to itself (the loading seed, and possibly the
    // fallback chain's last resort), so a value that is still a localize key is treated as
    // missing rather than shown verbatim as tooltip text. A reason that is missing that way, or
    // is not a key at all, falls back to the generic reason.
    const toShowableText = (text: string | undefined) =>
      text && !isLocalizeKey(text) ? text : undefined;
    return (
      toShowableText(
        isLocalizeKey(project.unsupportedReason)
          ? localizedUnsupportedReasons[project.unsupportedReason]
          : undefined,
      ) ?? toShowableText(localizedUnsupportedReasons[PROJECT_OPEN_BLOCKED_FALLBACK_KEY])
    );
  };

  /**
   * A menu item for an action a project's `unsupportedReason` can block. The reason is written
   * inside the item, since a menu item cannot show a hover tooltip. The item is `aria-disabled`
   * rather than Radix-`disabled` so keyboard navigation still reaches it and the reason is read as
   * part of its accessible name; selecting it does nothing.
   */
  const blockableMenuItem = ({
    label,
    isBlocked,
    reasonText,
    isDisabled,
    onActivate,
  }: {
    label: ReactNode;
    isBlocked: boolean;
    reasonText: string | undefined;
    isDisabled?: boolean;
    onActivate: () => void;
  }) => (
    <DropdownMenuItem
      disabled={isDisabled}
      aria-disabled={isBlocked || undefined}
      className={cn({ 'tw:opacity-50': isBlocked })}
      onSelect={(event) => {
        if (isBlocked) {
          event.preventDefault();
          return;
        }
        onActivate();
      }}
    >
      {/* Not muted: the blocked item is already drawn at half opacity, and muted text under that
          is unreadable. `min-w-0` lets a long reason wrap instead of widening the menu. */}
      <div className="tw:flex tw:min-w-0 tw:flex-col">
        <span>{label}</span>
        {reasonText && (
          <span className="tw:text-xs tw:italic tw:whitespace-normal tw:text-foreground">
            {reasonText}
          </span>
        )}
      </div>
    </DropdownMenuItem>
  );

  /**
   * Wraps a button for an action a project's `unsupportedReason` can block in a tooltip that shows
   * the reason. The button keeps its own props, including `disabled`.
   */
  const blockableTooltip = (
    isBlocked: boolean,
    reasonText: string | undefined,
    button: ReactNode,
  ) => (
    // Without reason text the wrapper would be a nameless tab stop with an empty bubble; the button
    // stays disabled either way.
    <DisabledActionTooltip disabled={isBlocked && !!reasonText} tooltipText={reasonText ?? ''}>
      {button}
    </DisabledActionTooltip>
  );

  const syncOrGetButton = (project: MergedProjectInfo, isMenuItem?: boolean) => {
    // Home reuses `unsupportedReason` (the can't-open signal) to block Sync and Get too. Today that
    // is only Study Bible Additions (see `adr-sba-not-syncable-from-dialog-or-home`). A project type
    // that becomes openable (removed from `ScrTextExtensions.GetOpenBlockedReason`) stops being
    // blocked here automatically; a type that stays unopenable but should be syncable needs its own
    // check instead of `unsupportedReason`.
    const isBlocked = !!project.unsupportedReason;
    const unsupportedReasonText = getUnsupportedReasonText(project);
    if (isMenuItem)
      return blockableMenuItem({
        label: getSendReceiveButtonContent(project),
        isBlocked,
        reasonText: unsupportedReasonText,
        onActivate: () => handleSendReceiveProject(project.projectId),
      });
    return blockableTooltip(
      isBlocked,
      unsupportedReasonText,
      <Button
        disabled={
          isBlocked ||
          (isSendReceiveInProgress && activeSendReceiveProjects.includes(project.projectId))
        }
        onClick={() => handleSendReceiveProject(project.projectId)}
      >
        {getSendReceiveButtonContent(project)}
      </Button>,
    );
  };

  const openButton = (project: MergedProjectInfo, isMenuItem?: boolean) => {
    const isOpening = openingProjectIds.includes(project.projectId);
    const isOpenBlocked = !!project.unsupportedReason;
    const unsupportedReasonText = getUnsupportedReasonText(project);
    if (isMenuItem)
      return blockableMenuItem({
        label: openText,
        isBlocked: isOpenBlocked,
        reasonText: unsupportedReasonText,
        isDisabled: isOpening,
        onActivate: () => handleOpenProject(project),
      });
    return blockableTooltip(
      isOpenBlocked,
      unsupportedReasonText,
      <Button
        disabled={isOpenBlocked}
        // Not `disabled` while opening, which would drop the focus of a keyboard user who pressed
        // it; a repeat press is ignored by `handleOpenProject`.
        aria-disabled={isOpening}
        aria-busy={isOpening}
        // The spinner has no text, so the button keeps its name while it shows.
        aria-label={openText}
        onClick={() => handleOpenProject(project)}
      >
        {isOpening ? <Spinner className="tw:h-5 tw:py-[1px]" /> : openText}
      </Button>,
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
          {/*
           * Grows, up to `max-w-sm`, to fit the search box's placeholder with the filter button
           * beside it; the `basis-72` it starts from is the width at which the Get Resources button
           * wraps below it.
           */}
          <div className="tw:flex tw:flex-col tw:gap-4 tw:grow tw:basis-72 tw:min-w-0 tw:max-w-sm">
            <div className="tw:flex tw:gap-4 tw:items-center tw:[@media(max-height:28rem)]:!hidden tw:max-[300px]:!hidden">
              {headerContent}
            </div>
            <div className="tw:flex tw:items-center tw:gap-2">
              <div className="tw:min-w-0 tw:flex-1">
                <SearchBar
                  ref={searchInputRef}
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
             * Nothing to list at all, as opposed to filters that hid everything: the two need
             * different messages, and only the second offers to clear the filters.
             */}
            {mergedProjectInfo.length === 0 ? (
              <div className="tw:flex-grow tw:h-full tw:border tw:border-muted tw:rounded-lg tw:p-6 tw:text-center tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-1">
                <Label className="tw:text-muted-foreground">{noProjectsText}</Label>
                {canAdviseJoiningProject && (
                  <Label className="tw:text-muted-foreground tw:font-normal">
                    {joinProjectAdviceText}
                  </Label>
                )}

                {canOfferGetResources && (
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
                        {joinProjectAdviceText}
                      </Label>
                    )}
                    <div className="tw:flex tw:gap-1  tw:mt-4">
                      <Button variant="ghost" onClick={clearFilters}>
                        {isTypeFiltered ? clearFiltersText : clearSearchText}
                      </Button>
                      {canOfferGetResources && (
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
                  <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
                    {/* The standard delay, so a sweep down the list doesn't open every tooltip it
                        crosses. Tooltips stay hoverable (WCAG 1.4.13): at narrow widths they are the
                        only place a row's full name and language appear. */}
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
                              if (!isEventInside(e)) return;
                              // cancel double‑click text selection
                              if (e.detail > 1) e.preventDefault();
                            }}
                            onDoubleClick={(e) => {
                              if (!isEventInside(e)) return;
                              // Open, Sync, and Get are all blocked for an unsupported project:
                              // Home reuses the can't-open `unsupportedReason` to block sync too
                              // (today only Study Bible Additions; see
                              // `adr-sba-not-syncable-from-dialog-or-home`). A type that stays
                              // unopenable but should be syncable needs its own check here.
                              if (project.unsupportedReason) return;
                              if (project.isLocallyAvailable) {
                                handleOpenProject(project);
                              } else if (!isSendReceiveInProgress) {
                                handleSendReceiveProject(project.projectId);
                              }
                            }}
                            key={project.projectId}
                            className={cn('tw:rounded-sm', {
                              'tw:text-muted-foreground/70 tw:hover:text-foreground':
                                !project.isLocallyAvailable && !project.unsupportedReason,
                              'tw:text-muted-foreground/70': !!project.unsupportedReason,
                            })}
                          >
                            <TableCell className={cn({ 'tw:ps-2': isEdited(project) })}>
                              <div
                                className={cn(
                                  'tw:flex tw:flex-row tw:items-center tw:gap-4 tw:ps-2',
                                  { 'tw:ps-0': isEdited(project) },
                                )}
                              >
                                {renderNameWithDetails(project)}

                                <div className="tw:grow tw:hidden tw:max-[300px]:!flex">
                                  <div className="tw:grow" />
                                  {/*
                                   * The menu-item builders return `DropdownMenuItem`s themselves.
                                   * Wrapping one in another `DropdownMenuItem asChild` would spread
                                   * the outer item's `aria-disabled`/`data-disabled` (undefined)
                                   * over the inner item's, so a disabled Open would look and act
                                   * enabled.
                                   */}
                                  <HomeItemDropdownMenu ellipsisButtonClassName="tw:h-6">
                                    {project.isSendReceivable &&
                                      (!project.isLocallyAvailable || isEdited(project)) &&
                                      syncOrGetButton(project, true)}
                                    {project.isLocallyAvailable && openButton(project, true)}
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
                                {renderLastSendReceive(project)}
                              </TableCell>
                            )}
                            <TableCell className="tw:max-[300px]:hidden">
                              <div className="tw:flex tw:justify-between tw:items-center">
                                {project.isSendReceivable &&
                                (!project.isLocallyAvailable || isEdited(project))
                                  ? syncOrGetButton(project)
                                  : openButton(project)}
                                {project.isSendReceivable && project.isLocallyAvailable && (
                                  <HomeItemDropdownMenu>
                                    {isEdited(project)
                                      ? openButton(project, true)
                                      : syncOrGetButton(project, true)}
                                  </HomeItemDropdownMenu>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TooltipProvider>
                )}
              </div>
            )}
            {/*
             * For a user who has nothing yet, or whose only item is the sample (and only while the
             * type filter shows it).
             */}
            {(mergedProjectInfo.length === 0 || isOnlyWebSampleListed) && onGetStarted && (
              <div className="tw:flex tw:flex-col tw:gap-4 tw:items-center tw:w-auto">
                <p className="tw:text-muted-foreground tw:font-normal">
                  {mergedProjectInfo.length === 0
                    ? getStartedNoItemsDescriptionText
                    : getStartedDescriptionText}
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
