import { BookOpen, ChevronDown, ChevronsUpDown, ChevronUp, ScrollText } from 'lucide-react';
import {
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
import type { LocalizedStringValue } from 'platform-bible-utils';
import { formatTimeSpan } from 'platform-bible-utils';
import type { EditedStatus, SharedProjectsInfo } from 'platform-scripture';
import { ReactNode, useMemo, useState } from 'react';
import { HomeItemDropdownMenu } from './home-item-menu';
import ProjectResourceFilter, {
  FilterOption,
  ProjectResourceFilterValue,
} from './projectResourceFilter.component';

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
  '%resources_filterInput%',
  '%resources_shortNameText%',
  '%resources_fullName%',
  '%resources_get%',
  '%resources_getStarted%',
  '%resources_getStartedDescription%',
  '%resources_getResources%',
  '%resources_items%',
  '%resources_language%',
  '%resources_noProjects%',
  '%resources_noProjectsInstruction%',
  '%resources_noSearchResults%',
  '%resources_noItemsFound%',
  '%resources_open%',
  '%resources_searchedFor%',
  '%resources_sync%',
  '%resources_paratextProjects_label%',
  '%resources_resources_label%',
] as const);

type HomeLocalizedStringKey = (typeof HOME_STRING_KEYS)[number];
type HomeLocalizedStrings = {
  [localizedHomeKey in HomeLocalizedStringKey]?: LocalizedStringValue;
};

export type LocalProjectInfo = {
  projectId: string;
  isEditable: boolean;
  fullName: string;
  name: string;
  language: string;
  isResource: boolean;
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
  isResource: boolean;
};

export type SortConfig = {
  key: 'shortName' | 'fullName' | 'language' | 'activity' | 'action';
  direction: 'ascending' | 'descending';
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
 * @param {isLoadingRemoteProjects} - Whether loading remote projects is in progress.
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
  isLoadingRemoteProjects = false,
  localProjectsInfo = [],
  sharedProjectsInfo = {},
  activeSendReceiveProjects = [],
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
  const languageText: string = getLocalizedString('%resources_language%');
  const noProjectsText: string = getLocalizedString('%resources_noProjects%');
  const noProjectsInstructionText: string = getLocalizedString('%resources_noProjectsInstruction%');
  const noSearchResultsText: string = getLocalizedString('%resources_noSearchResults%');
  const noItemsFoundText: string = getLocalizedString('%resources_noItemsFound%');
  const openText: string = getLocalizedString('%resources_open%');
  const searchedForText: string = getLocalizedString('%resources_searchedFor%');
  const syncText: string = getLocalizedString('%resources_sync%');
  const paratextProjectsText: string = getLocalizedString('%resources_paratextProjects_label%');
  const resourcesText: string = getLocalizedString('%resources_resources_label%');

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
          isResource: false, // Shared projects are always Paratext projects
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
          isLocallyAvailable: true,
          isResource: project.isResource,
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

  const [projectResourceFilter, setProjectResourceFilter] =
    useState<ProjectResourceFilterValue>('all');

  const filterOptions: FilterOption[] = useMemo(
    () => [
      { key: 'paratextProject', label: paratextProjectsText, icon: ScrollText },
      { key: 'resource', label: resourcesText, icon: BookOpen },
    ],
    [paratextProjectsText, resourcesText],
  );

  const filteredAndSortedProjects = useMemo(() => {
    if (!mergedProjectInfo) return [];
    const textFilteredProjects = mergedProjectInfo.filter((project) => {
      const filter = textFilter.toLowerCase();
      const showInFilter =
        projectResourceFilter === 'all' ||
        (projectResourceFilter === 'resource') === project.isResource;

      return (
        showInFilter &&
        (project.fullName.toLowerCase().includes(filter) ||
          project.name.toLowerCase().includes(filter) ||
          project.language.toLowerCase().includes(filter))
      );
    });

    return textFilteredProjects.sort((a, b) => {
      switch (sortConfig.key) {
        case 'shortName':
          if (a.name < b.name) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.name > b.name) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
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
  }, [mergedProjectInfo, textFilter, sortConfig, projectResourceFilter]);

  const handleSort = (key: SortConfig['key']) => {
    const newSortConfig: SortConfig = { key, direction: 'ascending' };
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      newSortConfig.direction = 'descending';
    }
    setSortConfig(newSortConfig);
  };

  const buildTableHead = (key: SortConfig['key'], label: string, className?: string) => (
    <TableHead onClick={() => handleSort(key)} className={cn('tw-px-2', className)}>
      <Button className="tw-flex tw-items-center tw-px-2" variant="ghost">
        <div className="tw-font-normal">{label}</div>
        {sortConfig.key !== key && <ChevronsUpDown className="tw-pl-1" size={16} />}
        {sortConfig.key === key &&
          (sortConfig.direction === 'ascending' ? (
            <ChevronUp className="tw-pl-1" size={16} />
          ) : (
            <ChevronDown className="tw-pl-1" size={16} />
          ))}
      </Button>
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
      <CardHeader
        className={cn(
          'tw-flex-shrink-0 [@media(max-height:28rem)]:!tw-pb-2 [@media(max-height:28rem)]:!tw-pt-4 max-[300px]:!tw-pb-0',
          { 'max-[300px]:!tw-pb-2': showGetResourcesButton },
        )}
      >
        <div className="tw-flex tw-flex-wrap tw-justify-between tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-4 tw-max-w-72 tw-w-full">
            <div className="tw-flex tw-gap-4 tw-items-center [@media(max-height:28rem)]:!tw-hidden max-[300px]:!tw-hidden">
              {headerContent}
            </div>
            <div className="tw-flex tw-gap-2 tw-items-center">
              <SearchBar
                value={textFilter}
                onSearch={setTextFilter}
                placeholder={filterInputText}
              />
              <ProjectResourceFilter
                value={projectResourceFilter}
                onChange={setProjectResourceFilter}
                options={filterOptions}
                localizedAllText={filterAllText}
              />
            </div>
          </div>
          {showGetResourcesButton && (
            <div className="tw-self-end">
              <Button onClick={onOpenGetResources} className="tw-bg-muted" variant="ghost">
                {`+ ${getResourcesText}`}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      {isLoadingLocalProjects || isLoadingRemoteProjects ? (
        <CardContent className="tw-flex tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-2">
          <Spinner />
        </CardContent>
      ) : (
        <CardContent className="tw-flex-grow tw-overflow-auto tw-min-h-32 tw-px-0">
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
                    <Label className="tw-text-muted-foreground">
                      {textFilter
                        ? noSearchResultsText
                        : projectResourceFilter !== 'all'
                          ? noItemsFoundText.replace(
                              '{0}',
                              filterOptions
                                .find((opt) => opt.key === projectResourceFilter)
                                ?.label.toLowerCase() || '',
                            )
                          : noSearchResultsText}
                    </Label>
                    {textFilter && (
                      <Label className="tw-text-muted-foreground tw-font-normal">
                        {`${searchedForText} "${textFilter}".`}
                      </Label>
                    )}
                    <div className="tw-flex tw-gap-1  tw-mt-4">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setTextFilter('');
                          setProjectResourceFilter('all');
                        }}
                      >
                        {projectResourceFilter !== 'all' ? clearFiltersText : clearSearchText}
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
                    <TableHeader className="tw-bg-none max-[300px]:tw-hidden" stickyHeader>
                      <TableRow className="tw-rounded-sm">
                        {buildTableHead('shortName', shortNameText, 'tw-ps-4')}
                        {buildTableHead('fullName', fullNameText, 'tw-hidden md:!tw-table-cell')}
                        {buildTableHead('language', languageText, 'tw-hidden sm:!tw-table-cell')}
                        {filteredAndSortedProjects.some((project) => project.isSendReceivable) &&
                          buildTableHead('activity', activityText, 'tw-hidden sm:!tw-table-cell')}
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
                              ? onOpenProject(project.projectId, project.isEditable)
                              : !isSendReceiveInProgress && onSendReceiveProject(project.projectId)
                          }
                          key={project.projectId}
                          className={cn('tw-rounded-sm', {
                            'tw-text-muted-foreground/70': !project.isLocallyAvailable,
                          })}
                        >
                          <TableCell
                            className={cn({ 'tw-ps-2': project.editedStatus === 'edited' })}
                          >
                            <div
                              className={cn(
                                'tw-flex tw-flex-row tw-items-center tw-gap-4 tw-ps-2',
                                { 'tw-ps-0': project.editedStatus === 'edited' },
                              )}
                            >
                              <div className="tw-flex tw-flex-row tw-items-center tw-gap-2">
                                {project.editedStatus === 'edited' && (
                                  <div className="tw-rounded-full tw-bg-primary tw-h-2 tw-w-2 tw-m-[-10px]" />
                                )}
                                {(() => {
                                  const Icon = project.isResource ? BookOpen : ScrollText;
                                  return <Icon className="tw-h-4 tw-w-4" />;
                                })()}
                              </div>

                              <div className="tw-whitespace-nowrap tw-cursor-default">
                                {project.name}
                              </div>

                              <div className="tw-grow tw-hidden max-[300px]:!tw-flex">
                                <div className="tw-grow" />
                                <HomeItemDropdownMenu ellipsisButtonClassName="tw-h-6">
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
                          <TableCell className="tw-hidden md:!tw-table-cell tw-font-medium tw-break-words tw-cursor-default tw-break-all">
                            {project.fullName}
                          </TableCell>
                          <TableCell className="tw-hidden sm:!tw-table-cell tw-cursor-default">
                            {project.language}
                          </TableCell>
                          {filteredAndSortedProjects.some((proj) => proj.isSendReceivable) && (
                            <TableCell className="tw-hidden sm:!tw-table-cell tw-cursor-default">
                              {project.lastSendReceiveDate &&
                                formatTimeSpan(
                                  relativeTimeFormatter,
                                  new Date(project.lastSendReceiveDate),
                                )}
                            </TableCell>
                          )}
                          <TableCell className="max-[300px]:tw-hidden">
                            <div className="tw-flex tw-justify-between tw-items-center">
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
      <CardFooter className="tw-flex-shrink-0 tw-flex-col tw-justify-center tw-p-4 tw-border-t tw-gap-2 [@media(max-height:32rem)]:!tw-hidden">
        <Label>{`${filteredAndSortedProjects.length} ${itemsText}`}</Label>
      </CardFooter>
    </Card>
  );
}
