import {
  BookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Ellipsis,
  Home as HomeIcon,
  ScrollText,
} from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
import type { LocalizedStringValue } from 'platform-bible-utils';
import { formatTimeSpan } from 'platform-bible-utils';
import type { EditedStatus, SharedProjectsInfo } from 'platform-scripture';
import { useMemo, useState } from 'react';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const HOME_STRING_KEYS = Object.freeze([
  '%resources_action%',
  '%resources_activity%',
  '%resources_clearSearch%',
  '%home_dialog_title%',
  '%resources_filterInput%',
  '%resources_fullName%',
  '%resources_get%',
  '%resources_getStarted%',
  '%resources_getStartedDescription%',
  '%resources_getResources%',
  '%resources_items%',
  '%resources_language%',
  '%resources_loading%',
  '%resources_noProjects%',
  '%resources_noProjectsInstruction%',
  '%resources_noSearchResults%',
  '%resources_open%',
  '%resources_searchedFor%',
  '%resources_sync%',
] as const);

type HomeLocalizedStringKey = (typeof HOME_STRING_KEYS)[number];
type HomeLocalizedStrings = {
  [localizedHomeKey in HomeLocalizedStringKey]?: LocalizedStringValue;
};

export type SortConfig = {
  key: 'fullName' | 'language' | 'activity' | 'action';
  direction: 'ascending' | 'descending';
};

export type LocalProjectInfo = {
  projectId: string;
  isEditable: boolean;
  fullName: string;
  name: string;
  language: string;
};

export type MergedProjectInfo = {
  projectId: string;
  name: string;
  fullName: string;
  language: string;
  isEditable: boolean;
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
  localizedStrings?: HomeLocalizedStrings;
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
   * @param isEditable - Whether the project is editable.
   */
  onOpenProject?: (projectId: string, isEditable: boolean) => void;
  /**
   * Callback function to send/receive a project.
   *
   * @param projectId - The ID of the project to send/receive.
   */
  onSendReceiveProject?: (projectId: string) => void;
  /** Callback function to open the get started website of platform. */
  onGetStarted?: () => void;
  /** Whether to show the Get Resources button. */
  showGetResourcesButton?: boolean;
  /** Whether a send/receive operation is in progress. */
  isSendReceiveInProgress?: boolean;
  /** Whether loading local projects is in progress. */
  isLoadingLocalProjects?: boolean;
  /** Whether loading remote projects is in progress. */
  isLoadingRemoteProjects?: boolean;
  /** Array of local project information, containing projects and resources. */
  localProjectsInfo?: LocalProjectInfo[];
  /** Object of shared project information, containing projects on the send/receive server. */
  sharedProjectsInfo?: SharedProjectsInfo;
  /** Array of project IDs that are currently being sent/received. */
  activeSendReceiveProjects?: string[];
};

/**
 * A component that displays a list of local and remote projects, allowing users to open,
 * synchronize, and manage them. It also provides a button to get more resources.
 *
 * @param {localizedStrings} - Object with localized strings for the component.
 * @param {uiLocales} - Locales for formatting dates and times.
 * @param {onOpenGetResources} - Callback function to open the Get Resources dialog.
 * @param {onOpenProject} - Callback function to open a project.
 * @param {onSendReceiveProject} - Callback function to send/receive a project.
 * @param {onGetStarted} - Callback function to get started with the platform.
 * @param {showGetResourcesButton} - Whether to show the Get Resources button.
 * @param {isSendReceiveInProgress} - Whether a send/receive operation is in progress.
 * @param {isLoadingLocalProjects} - Whether loading local projects is in progress.
 * @param {isLoadingRemoteProjects} - Whether loading remote projects is in progress.
 * @param {localProjectsInfo} - Array of local project information, containing projects and
 *   resources.
 * @param {sharedProjectsInfo} - Object of shared project information, containing projects on the
 *   send/receive server.
 * @param {activeSendReceiveProjects} - Array of project IDs that are currently being sent/received.
 * @returns
 */
export function Home({
  localizedStrings = {},
  uiLocales = [],
  onOpenGetResources = () => {},
  onOpenProject = () => {},
  onSendReceiveProject = () => {},
  onGetStarted = () => {},
  showGetResourcesButton = true,
  isSendReceiveInProgress = false,
  isLoadingLocalProjects = false,
  isLoadingRemoteProjects = false,
  localProjectsInfo = [],
  sharedProjectsInfo = {},
  activeSendReceiveProjects = [],
}: HomeProps) {
  const getLocalizedString = (localizeKey: HomeLocalizedStringKey) => {
    return localizedStrings[localizeKey] ?? localizeKey;
  };
  const actionText: string = getLocalizedString('%resources_action%');
  const activityText: string = getLocalizedString('%resources_activity%');
  const clearSearchText: string = getLocalizedString('%resources_clearSearch%');
  const dialogTitleText: string = getLocalizedString('%home_dialog_title%');
  const filterInputText: string = getLocalizedString('%resources_filterInput%');
  const fullNameText: string = getLocalizedString('%resources_fullName%');
  const getText: string = getLocalizedString('%resources_get%');
  const getStartedText: string = getLocalizedString('%resources_getStarted%');
  const getStartedDescriptionText: string = getLocalizedString('%resources_getStartedDescription%');
  const getResourcesText: string = getLocalizedString('%resources_getResources%');
  const itemsText: string = getLocalizedString('%resources_items%');
  const languageText: string = getLocalizedString('%resources_language%');
  const loadingText: string = getLocalizedString('%resources_loading%');
  const noProjectsText: string = getLocalizedString('%resources_noProjects%');
  const noProjectsInstructionText: string = getLocalizedString('%resources_noProjectsInstruction%');
  const noSearchResultsText: string = getLocalizedString('%resources_noSearchResults%');
  const openText: string = getLocalizedString('%resources_open%');
  const searchedForText: string = getLocalizedString('%resources_searchedFor%');
  const syncText: string = getLocalizedString('%resources_sync%');

  const mergedProjectInfo: MergedProjectInfo[] = useMemo(() => {
    const newMergedProjectInfo: MergedProjectInfo[] = [];
    if (sharedProjectsInfo) {
      Object.entries(sharedProjectsInfo).forEach(([projectId, sharedProject]) => {
        newMergedProjectInfo.push({
          projectId,
          name: sharedProject.name,
          fullName: sharedProject.fullName,
          language: sharedProject.language,
          isEditable: true,
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
          isEditable: project.isEditable,
          isSendReceivable: false,
        });
      }
    });

    return newMergedProjectInfo;
  }, [localProjectsInfo, sharedProjectsInfo]);

  const [textFilter, setTextFilter] = useState<string>('');

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'language',
    direction: 'ascending',
  });

  const filteredAndSortedProjects = useMemo(() => {
    if (!mergedProjectInfo) return [];
    const textFilteredProjects = mergedProjectInfo.filter((project) => {
      const filter = textFilter.toLowerCase();
      return (
        project.fullName.toLowerCase().includes(filter) ||
        project.name.toLowerCase().includes(filter) ||
        project.language.toLowerCase().includes(filter)
      );
    });

    return textFilteredProjects.sort((a, b) => {
      switch (sortConfig.key) {
        case 'fullName':
          if (a.fullName < b.fullName) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.fullName > b.fullName) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        case 'language':
          if (a.language < b.language) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.language > b.language) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        case 'activity':
          if (!a.lastSendReceiveDate || !b.lastSendReceiveDate) {
            return 0;
          }
          if (a.lastSendReceiveDate < b.lastSendReceiveDate) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.lastSendReceiveDate > b.lastSendReceiveDate) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        case 'action':
          // To be implemented later
          return 0;
        default:
          return 0;
      }
    });
  }, [mergedProjectInfo, textFilter, sortConfig]);

  const handleSort = (key: SortConfig['key']) => {
    const newSortConfig: SortConfig = { key, direction: 'ascending' };
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      newSortConfig.direction = 'descending';
    }
    setSortConfig(newSortConfig);
  };

  const buildTableHead = (key: SortConfig['key'], label: string, className?: string) => (
    <TableHead onClick={() => handleSort(key)} className={className}>
      <div className="tw-flex tw-items-center tw-px-0">
        <div className="tw-font-normal">{label}</div>
        {sortConfig.key !== key && <ChevronsUpDown className="tw-pl-1" size={16} />}
        {sortConfig.key === key &&
          (sortConfig.direction === 'ascending' ? (
            <ChevronUp className="tw-pl-1" size={16} />
          ) : (
            <ChevronDown className="tw-pl-1" size={16} />
          ))}
      </div>
    </TableHead>
  );

  const relativeTimeFormatter = useMemo(() => {
    return new Intl.RelativeTimeFormat(uiLocales, { style: 'long', numeric: 'auto' });
  }, [uiLocales]);

  const getSendReceiveButtonContent = (project: MergedProjectInfo) => {
    if (isSendReceiveInProgress && activeSendReceiveProjects.includes(project.projectId)) {
      return <Spinner className="tw-h-5 tw-py-[1px]" />;
    }

    return project.isLocallyAvailable ? syncText : getText;
  };

  const syncOrGetButton = (project: MergedProjectInfo, isMenuItem?: boolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => onSendReceiveProject(project.projectId)}>
          <span>{getSendReceiveButtonContent(project)}</span>
        </DropdownMenuItem>
      );
    return (
      <Button
        disabled={isSendReceiveInProgress && activeSendReceiveProjects.includes(project.projectId)}
        onClick={() => onSendReceiveProject(project.projectId)}
      >
        {getSendReceiveButtonContent(project)}
      </Button>
    );
  };

  const openButton = (project: MergedProjectInfo, isMenuItem?: boolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => onOpenProject(project.projectId, project.isEditable)}>
          <span>{openText}</span>
        </DropdownMenuItem>
      );
    return (
      <Button onClick={() => onOpenProject(project.projectId, project.isEditable)}>
        {openText}
      </Button>
    );
  };

  return (
    <Card className="tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-border-0">
      <CardHeader className="tw-flex-shrink-0 [@media(max-height:24rem)]:!tw-pb-2">
        <div className="tw-flex tw-flex-wrap tw-justify-between tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-4 tw-max-w-72 tw-w-full">
            <div className="tw-flex tw-gap-4 tw-items-center [@media(max-height:24rem)]:!tw-hidden">
              <HomeIcon size={36} />
              <CardTitle>{dialogTitleText}</CardTitle>
            </div>
            <SearchBar value={textFilter} onSearch={setTextFilter} placeholder={filterInputText} />
          </div>
          <div className="tw-self-end">
            {showGetResourcesButton && (
              <Button onClick={onOpenGetResources} className="tw-bg-muted" variant="ghost">
                {`+ ${getResourcesText}`}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      {isLoadingLocalProjects || isLoadingRemoteProjects ? (
        <CardContent className="tw-flex tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-2">
          <Label>{loadingText}</Label>
          <Spinner />
        </CardContent>
      ) : (
        <CardContent className="tw-flex-grow tw-overflow-auto tw-min-h-32">
          <div className="tw-flex tw-flex-col tw-gap-4">
            {!localProjectsInfo ? (
              <div className="tw-flex-grow tw-h-full tw-border tw-border-muted tw-rounded-lg tw-p-6 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
                <Label className="tw-text-muted-foreground">{noProjectsText}</Label>
                <Label className="tw-text-muted-foreground tw-font-normal">
                  {noProjectsInstructionText}
                </Label>

                {showGetResourcesButton && (
                  <Button
                    onClick={onOpenGetResources}
                    className="tw-mt-4"
                  >{`+ ${getResourcesText}`}</Button>
                )}
              </div>
            ) : (
              <div className="tw-flex-grow tw-h-full">
                {filteredAndSortedProjects.length === 0 ? (
                  <div className="tw-flex-grow tw-h-full tw-border tw-border-muted tw-rounded-lg tw-p-6 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
                    <Label className="tw-text-muted-foreground">{noSearchResultsText}</Label>
                    <Label className="tw-text-muted-foreground tw-font-normal">
                      {`${searchedForText} "${textFilter}".`}
                    </Label>
                    <div className="tw-flex tw-gap-1  tw-mt-4">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setTextFilter('');
                        }}
                      >
                        {clearSearchText}
                      </Button>
                      {showGetResourcesButton && (
                        <Button
                          onClick={onOpenGetResources}
                          variant="ghost"
                          className="tw-bg-muted"
                        >
                          {`+ ${getResourcesText}`}
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <Table stickyHeader>
                    <TableHeader className="tw-bg-none" stickyHeader>
                      <TableRow>
                        <TableHead />
                        {buildTableHead('fullName', fullNameText, 'tw-hidden md:tw-table-cell')}
                        {buildTableHead('language', languageText, 'tw-hidden sm:tw-table-cell')}
                        {filteredAndSortedProjects.some((project) => project.isSendReceivable) &&
                          buildTableHead('activity', activityText, 'tw-hidden sm:tw-table-cell')}
                        {buildTableHead('action', actionText)}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedProjects.map((project) => (
                        <TableRow
                          onDoubleClick={() => onOpenProject(project.projectId, project.isEditable)}
                          key={project.projectId}
                        >
                          <TableCell className="tw-ms-4 tw-flex tw-items-center tw-gap-4">
                            {project.isEditable ? (
                              <ScrollText
                                className="tw-pr-0"
                                size={18}
                                style={{ minWidth: '24px' }}
                              />
                            ) : (
                              <BookOpen
                                className="tw-pr-0"
                                size={18}
                                style={{ minWidth: '24px' }}
                              />
                            )}
                            <div className="tw-py-4 tw-whitespace-nowrap">{project.name}</div>
                          </TableCell>
                          <TableCell className="tw-hidden md:tw-table-cell tw-font-medium tw-break-all">
                            {project.fullName}
                          </TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">
                            {project.language}
                          </TableCell>
                          {filteredAndSortedProjects.some((proj) => proj.isSendReceivable) && (
                            <TableCell className="tw-hidden sm:tw-table-cell">
                              {project.lastSendReceiveDate &&
                                formatTimeSpan(
                                  relativeTimeFormatter,
                                  new Date(project.lastSendReceiveDate),
                                )}
                            </TableCell>
                          )}
                          <TableCell>
                            <div className="tw-flex tw-justify-between tw-items-center">
                              {project.isSendReceivable &&
                              (!project.isLocallyAvailable || project.editedStatus === 'edited')
                                ? syncOrGetButton(project)
                                : openButton(project)}
                              {project.isSendReceivable && project.isLocallyAvailable && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                      <Ellipsis className="tw-w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="start">
                                    <DropdownMenuItem asChild>
                                      {project.editedStatus === 'edited'
                                        ? openButton(project, true)
                                        : syncOrGetButton(project, true)}
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
            {mergedProjectInfo.length === 1 && mergedProjectInfo[0].name === 'WEB' && (
              <div className="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-w-auto">
                <p className="tw-text-muted-foreground tw-font-normal">
                  {getStartedDescriptionText}
                </p>
                <Button onClick={onGetStarted}>{getStartedText}</Button>
              </div>
            )}
          </div>
        </CardContent>
      )}
      <CardFooter className="tw-flex-shrink-0 tw-flex-col tw-justify-center tw-p-4 tw-border-t tw-gap-2 [@media(max-height:24rem)]:!tw-hidden">
        <p className="tw-font-normal">{`${filteredAndSortedProjects.length} ${itemsText}`}</p>
      </CardFooter>
    </Card>
  );
}
