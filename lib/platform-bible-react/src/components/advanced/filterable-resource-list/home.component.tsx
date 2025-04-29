import ProjectResourceFilter from '@/components/basics/projectResourceFilter.component';
import SearchBar from '@/components/basics/search-bar.component';
import Spinner from '@/components/basics/spinner.component';
import { Button } from '@/components/shadcn-ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Label } from '@/components/shadcn-ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import useEvent from '@/hooks/use-event.hook';
import {
  BookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Ellipsis,
  Home,
  ScrollText,
} from 'lucide-react';
import {
  formatTimeSpan,
  getErrorMessage,
  isErrorMessageAboutParatextBlockingInternetAccess,
  isErrorMessageAboutRegistryAuthFailure,
  isPlatformError,
  LocalizeKey,
  newGuid,
  PlatformError,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// #region Send/Receive Types -- from 'platform-scripture';

/**
 * In what state the project to S/R is
 *
 * - `undefined` or `''` = project has not been edited
 * - `edited` = project has been edited
 * - `new` = project not present on the system and available for download
 */
type EditedStatus = undefined | '' | 'edited' | 'new' | 'unregistered';

/** Information about a S/R-able project needed to display it in the S/R dialog */
type SharedProjectInfo = {
  id: string;
  name: string;
  fullName: string;
  language: string;
  editedStatus: EditedStatus;
  lastSendReceiveDate: string;
  /** Names of admins on this project. Only filled if project is new */
  adminNames?: string[];
  warnings?: string[];
};

/**
 * Map of projects that can be S/Red to display in the S/R dialog.
 *
 * Maps project id to {@link SharedProjectInfo} for that project id
 */
type SharedProjectsInfo = { [projectId: string]: SharedProjectInfo };

// #endregion

const HOME_STRING_KEYS: LocalizeKey[] = [
  '%resources_action%',
  '%resources_activity%',
  '%resources_clearSearch%',
  '%home_dialog_title%',
  '%resources_filterInput%',
  '%resources_fullName%',
  '%resources_get%',
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
];

type SortConfig = {
  key: 'fullName' | 'language' | 'activity' | 'action';
  direction: 'ascending' | 'descending';
};

type LocalProjectResourceInfo = {
  id: string;
  isEditable: boolean;
  fullName: string;
  name: string;
  language: string;
  isResource?: boolean;
};

type MergedProjectResourceInfo = {
  id: string;
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

const defaultExcludePdpFactoryIds: string[] = [];
const defaultInterfaceLanguages: string[] = ['en'];

type HomeDialogProps = {
  useLocalizedStrings?: any;
  useDataProvider?: (name: string) => any;
  useData?: (name: string) => any;
  papi?: any;
  logger?: any;
  useSetting?: (name: string, defaultValue: any) => [any, PlatformError | undefined];
  staticProjectResourceList?: LocalProjectResourceInfo[];
};

export function HomeDialog({
  useLocalizedStrings,
  useDataProvider,
  useData,
  papi,
  logger,
  useSetting,
  staticProjectResourceList,
}: HomeDialogProps) {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  if (!logger) logger = console;

  const [localizedStrings] = useLocalizedStrings ? useLocalizedStrings(HOME_STRING_KEYS) : [[]];

  const actionText: string = localizedStrings['%resources_action%'] ?? '%resources_action%';
  const activityText: string = localizedStrings['%resources_activity%'] ?? '%resources_activity%';
  const clearSearchText: string =
    localizedStrings['%resources_clearSearch%'] ?? '%resources_clearSearch%';
  const dialogTitleText: string = localizedStrings['%home_dialog_title%'] ?? '%home_dialog_title%';
  const filterInputText: string =
    localizedStrings['%resources_filterInput%'] ?? '%resources_filterInput%';
  const fullNameText: string = localizedStrings['%resources_fullName%'] ?? '%resources_fullName%';
  const getText: string = localizedStrings['%resources_get%'] ?? '%resources_get%';
  const getResourcesText: string =
    localizedStrings['%resources_getResources%'] ?? '%resources_getResources%';
  const itemsText: string = localizedStrings['%resources_items%'] ?? '%resources_items%';
  const languageText: string = localizedStrings['%resources_language%'] ?? '%resources_language%';
  const loadingText: string = localizedStrings['%resources_loading%'] ?? '%resources_loading%';
  const noProjectsText: string =
    localizedStrings['%resources_noProjects%'] ?? '%resources_noProjects%';
  const noProjectsInstructionText: string =
    localizedStrings['%resources_noProjectsInstruction%'] ?? '%resources_noProjectsInstruction%';
  const noSearchResultsText: string =
    localizedStrings['%resources_noSearchResults%'] ?? '%resources_noSearchResults%';
  const openText: string = localizedStrings['%resources_open%'] ?? '%resources_open%';
  const searchedForText: string =
    localizedStrings['%resources_searchedFor%'] ?? '%resources_searchedFor%';
  const syncText: string = localizedStrings['%resources_sync%'] ?? '%resources_sync%';

  const dblResourcesProvider = useDataProvider
    ? useDataProvider('platformGetResources.dblResourcesProvider')
    : undefined;

  const [showGetResourcesButton, setShowGetResourcesButton] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchAvailability = async () => {
      if (dblResourcesProvider) {
        const isGetDblResourcesAvailable = await dblResourcesProvider.isGetDblResourcesAvailable();
        if (isMounted.current) {
          setShowGetResourcesButton(isGetDblResourcesAvailable);
        }
      } else {
        setShowGetResourcesButton(undefined);
      }
    };

    fetchAvailability();
  }, [dblResourcesProvider]);

  // listening on updates to the list of installed resources
  const [resourceList] = useData
    ? useData('platformGetResources.dblResourcesProvider').DblResources(undefined, [])
    : [];

  const openProjectOrResource = (projectId: string, isEditable: boolean) =>
    papi &&
    papi.commands.sendCommand(
      isEditable
        ? 'platformScriptureEditor.openScriptureEditor'
        : 'platformScriptureEditor.openResourceViewer',
      projectId,
    );

  const [isSendReceiveAvailable, setIsSendReceiveAvailable] = useState<boolean | undefined>(
    undefined,
  );

  const checkIfSendReceiveAvailable = useCallback(async () => {
    const isAvailable =
      papi && (await papi.commands.sendCommand('platformGetResources.isSendReceiveAvailable'));
    if (isMounted.current) {
      setIsSendReceiveAvailable(isAvailable);
    }
  }, []);

  useEffect(() => {
    checkIfSendReceiveAvailable();
  }, [checkIfSendReceiveAvailable]);

  useEvent(
    papi && papi.network.getNetworkEvent('platform.onDidReloadExtensions'),
    checkIfSendReceiveAvailable,
  );

  const [isSendReceiveInProgress, setIsSendReceiveInProgress] = useState<boolean>(false);
  const [activeSendReceiveProjects, setActiveSendReceiveProjects] = useState<string[]>([]);

  const sendReceiveProject = async (projectId: string) => {
    if (!isSendReceiveAvailable) return;

    try {
      setIsSendReceiveInProgress(true);
      setActiveSendReceiveProjects((prev) => [...prev, projectId]);

      papi &&
        (await papi.commands.sendCommand('paratextBibleSendReceive.sendReceiveProjects', [
          projectId,
        ]));

      if (isMounted.current) {
        setActiveSendReceiveProjects((prev) => prev.filter((id) => id !== projectId));
        setIsSendReceiveInProgress(false);
      }
    } catch (e) {
      logger.warn(
        `Home web view failed to reload after running S/R for project ${projectId}: ${e}`,
      );
      if (isMounted.current) {
        setActiveSendReceiveProjects((prev) => prev.filter((id) => id !== projectId));
        setIsSendReceiveInProgress(false);
      }
    }
  };

  const [sharedProjectsInfo, setSharedProjectsInfo] = useState<SharedProjectsInfo>();
  const [isLoadingRemoteProjects, setIsLoadingRemoteProjects] = useState<boolean>(true);

  const sharedProjectErrorNotificationId = useMemo(() => newGuid(), []);

  useEffect(() => {
    if (!isSendReceiveAvailable) {
      setIsLoadingRemoteProjects(false);
      return;
    }

    let promiseIsCurrent = true;
    const getSharedProjects = async () => {
      try {
        const sharedProjectsInfo = papi
          ? await papi.commands.sendCommand('paratextBibleSendReceive.getSharedProjects')
          : [];

        if (promiseIsCurrent && isMounted.current) {
          setIsLoadingRemoteProjects(false);
          setSharedProjectsInfo(sharedProjectsInfo);
        }
      } catch (e) {
        const errorMessage = getErrorMessage(e);
        if (isErrorMessageAboutParatextBlockingInternetAccess(errorMessage)) {
          papi &&
            papi.notifications.send({
              severity: 'error',
              message: '%data_loading_error_paratextData_internet_disabled%',
              clickCommandLabel: '%general_open%',
              clickCommand: 'paratextRegistration.showParatextRegistration',
              notificationId: sharedProjectErrorNotificationId,
            });
        } else if (isErrorMessageAboutRegistryAuthFailure(errorMessage)) {
          papi &&
            papi.notifications.send({
              severity: 'error',
              message: '%data_loading_error_paratextData_auth_failure%',
              clickCommandLabel: '%general_open%',
              clickCommand: 'paratextRegistration.showParatextRegistration',
              notificationId: sharedProjectErrorNotificationId,
            });
        } else {
          logger.warn(`Home web view failed to get shared projects: ${errorMessage}`);
        }

        if (promiseIsCurrent && isMounted.current) {
          setIsLoadingRemoteProjects(false);
        }
      }
    };

    if (isSendReceiveInProgress) {
      return;
    }
    if (!isSendReceiveAvailable) {
      setIsLoadingRemoteProjects(false);
      return;
    }
    getSharedProjects();

    return () => {
      // Mark this promise as old and not to be used
      promiseIsCurrent = false;
    };
  }, [isSendReceiveAvailable, isSendReceiveInProgress, sharedProjectErrorNotificationId]);

  const [localProjectResourceInfo, setLocalProjectsInfo] = useState<LocalProjectResourceInfo[]>([]);
  const [isLoadingLocalProjects, setIsLoadingLocalProjects] = useState<boolean>(true);

  const [excludePdpFactoryIdsInHomePossiblyError] = useSetting
    ? useSetting('platformGetResources.excludePdpFactoryIdsInHome', defaultExcludePdpFactoryIds)
    : [];

  const excludePdpFactoryIds = useMemo(() => {
    if (isPlatformError(excludePdpFactoryIdsInHomePossiblyError)) {
      logger.warn(
        'Failed to load setting: platformGetResources.excludePdpFactoryIdsInHome',
        excludePdpFactoryIdsInHomePossiblyError,
      );
      return defaultExcludePdpFactoryIds;
    }
    return excludePdpFactoryIdsInHomePossiblyError;
  }, [excludePdpFactoryIdsInHomePossiblyError]);

  useEffect(() => {
    let promiseIsCurrent = true;
    const getLocalProjects = async () => {
      const projectMetadata = papi
        ? await papi.projectLookup.getMetadataForAllProjects({
            includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
            excludePdpFactoryIds,
          })
        : [];
      const projectInfo = papi
        ? await Promise.all(
            projectMetadata.map(async (data: any) => {
              const pdp = await papi.projectDataProviders.get('platform.base', data.id);
              return {
                projectId: data.id,
                isEditable: await pdp.getSetting('platform.isEditable'),
                fullName: await pdp.getSetting('platform.fullName'),
                name: await pdp.getSetting('platform.name'),
                language: await pdp.getSetting('platform.language'),
              };
            }),
          )
        : staticProjectResourceList;

      if (promiseIsCurrent && isMounted.current) {
        setIsLoadingLocalProjects(false);
        projectInfo && setLocalProjectsInfo(projectInfo);
      }
    };

    if (isSendReceiveInProgress) {
      return;
    }
    getLocalProjects();

    return () => {
      // Mark this promise as old and not to be used
      promiseIsCurrent = false;
    };
  }, [isSendReceiveInProgress, excludePdpFactoryIds, resourceList]);

  const mergedProjectResourceInfo: MergedProjectResourceInfo[] = useMemo(() => {
    const newMergedProjectResourceInfo: MergedProjectResourceInfo[] = [];
    if (sharedProjectsInfo) {
      Object.entries(sharedProjectsInfo).forEach(([projectId, sharedProject]) => {
        newMergedProjectResourceInfo.push({
          id: projectId,
          name: sharedProject.name,
          fullName: sharedProject.fullName,
          language: sharedProject.language,
          isEditable: true,
          isSendReceivable: true,
          isLocallyAvailable: localProjectResourceInfo?.some((project) => project.id === projectId),
          editedStatus: sharedProject.editedStatus,
          lastSendReceiveDate: sharedProject.lastSendReceiveDate,
          isResource: false,
        });
      });
    }
    localProjectResourceInfo?.forEach((project) => {
      if (!newMergedProjectResourceInfo.some((mergedProject) => mergedProject.id === project.id)) {
        newMergedProjectResourceInfo.push({
          id: project.id,
          name: project.name,
          fullName: project.fullName,
          language: project.language,
          isEditable: project.isEditable,
          isSendReceivable: false,
          isResource: project.isResource || false,
        });
      }
    });

    return newMergedProjectResourceInfo;
  }, [localProjectResourceInfo, sharedProjectsInfo]);

  const [textFilter, setTextFilter] = useState<string>('');

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'language',
    direction: 'ascending',
  });

  const [projectResourceFilter, setProjectResourceFilter] = useState<string>('all');

  const filteredAndSortedProjectsResources = useMemo(() => {
    if (!mergedProjectResourceInfo) return [];
    const textFilteredProjects = mergedProjectResourceInfo.filter((project) => {
      const filter = textFilter.toLowerCase();

      const showInTypeFilter =
        projectResourceFilter === 'all' ||
        (projectResourceFilter === 'resources' && project.isResource) ||
        (projectResourceFilter === 'projects' && !project.isResource);

      return (
        showInTypeFilter &&
        (project.fullName.toLowerCase().includes(filter) ||
          project.name.toLowerCase().includes(filter) ||
          project.language.toLowerCase().includes(filter))
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
  }, [mergedProjectResourceInfo, textFilter, sortConfig, projectResourceFilter]);

  const handleSort = (key: SortConfig['key']) => {
    const newSortConfig: SortConfig = { key, direction: 'ascending' };
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      newSortConfig.direction = 'descending';
    }
    setSortConfig(newSortConfig);
  };

  const buildTableHead = (key: SortConfig['key'], label: string) => (
    <TableHead onClick={() => handleSort(key)}>
      <div className="tw-flex tw-cursor-pointer tw-items-center">
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

  const [interfaceLanguages] = useSetting
    ? useSetting('platform.interfaceLanguage', defaultInterfaceLanguages)
    : [];

  const uiLocales = useMemo(() => {
    if (isPlatformError(interfaceLanguages)) {
      logger.warn('Failed to load setting: platform.interfaceLanguage', interfaceLanguages);
      return defaultInterfaceLanguages;
    }

    return interfaceLanguages;
  }, [interfaceLanguages]);

  const relativeTimeFormatter = useMemo(() => {
    return new Intl.RelativeTimeFormat(uiLocales, { style: 'long', numeric: 'auto' });
  }, [uiLocales]);

  const getSendReceiveButtonContent = (project: MergedProjectResourceInfo) => {
    if (isSendReceiveInProgress && activeSendReceiveProjects.includes(project.id)) {
      return <Spinner className="tw-h-5 tw-py-[1px]" />;
    }

    return project.isLocallyAvailable ? syncText : getText;
  };

  const syncOrGetButton = (project: MergedProjectResourceInfo, isMenuItem?: boolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => sendReceiveProject(project.id)}>
          <span>{getSendReceiveButtonContent(project)}</span>
        </DropdownMenuItem>
      );
    return (
      <Button
        disabled={isSendReceiveInProgress && activeSendReceiveProjects.includes(project.id)}
        onClick={() => sendReceiveProject(project.id)}
      >
        {getSendReceiveButtonContent(project)}
      </Button>
    );
  };

  const openButton = (project: MergedProjectResourceInfo, isMenuItem?: boolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => openProjectOrResource(project.id, project.isEditable)}>
          <span>{openText}</span>
        </DropdownMenuItem>
      );
    return (
      <Button onClick={() => openProjectOrResource(project.id, project.isEditable)}>
        {openText}
      </Button>
    );
  };

  return (
    <div>
      <Card className="tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-border-0">
        <CardHeader className="tw-flex-shrink-0">
          <div className="tw-flex tw-justify-between tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-4 md:tw-flex-row">
              <div className="tw-flex tw-items-center tw-gap-4">
                <Home size={36} />
                <CardTitle>{dialogTitleText}</CardTitle>
              </div>
              <SearchBar
                value={textFilter}
                className="tw-min-w-72"
                onSearch={setTextFilter}
                placeholder={filterInputText}
              />
            </div>
            <div className="tw-flex tw-flex-wrap-reverse tw-gap-4 tw-self-end">
              {showGetResourcesButton && (
                <Button
                  onClick={() => papi.commands.sendCommand('platformGetResources.openGetResources')}
                  className="tw-bg-muted"
                  variant="ghost"
                >
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
          <CardContent className="tw-flex-grow tw-overflow-auto">
            {!localProjectResourceInfo ? (
              <div className="tw-flex tw-h-full tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-rounded-lg tw-border tw-border-gray-200 tw-p-6 tw-text-center">
                <Label className="tw-text-muted-foreground">{noProjectsText}</Label>
                <Label className="tw-font-normal tw-text-muted-foreground">
                  {noProjectsInstructionText}
                </Label>

                {showGetResourcesButton && (
                  <Button
                    onClick={() =>
                      papi.commands.sendCommand('platformGetResources.openGetResources')
                    }
                    className="tw-mt-4"
                  >{`+ ${getResourcesText}`}</Button>
                )}
              </div>
            ) : (
              <div className="tw-h-full tw-flex-grow">
                {filteredAndSortedProjectsResources.length === 0 ? (
                  <div className="tw-flex tw-h-full tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-rounded-lg tw-border tw-border-gray-200 tw-p-6 tw-text-center">
                    <Label className="tw-text-muted-foreground">{noSearchResultsText}</Label>
                    <Label className="tw-font-normal tw-text-muted-foreground">
                      {`${searchedForText} "${textFilter}".`}
                    </Label>
                    <div className="tw-mt-4 tw-flex tw-gap-1">
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
                          onClick={() =>
                            papi.commands.sendCommand('platformGetResources.openGetResources')
                          }
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
                        <TableHead>
                          <ProjectResourceFilter
                            onChange={setProjectResourceFilter}
                            variant="ghost"
                          />
                        </TableHead>
                        {buildTableHead('fullName', fullNameText)}
                        {buildTableHead('language', languageText)}
                        {filteredAndSortedProjectsResources.some(
                          (project) => project.isSendReceivable,
                        ) && buildTableHead('activity', activityText)}
                        {buildTableHead('action', actionText)}
                        <TableHead />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedProjectsResources.map((projectResource) => (
                        <TableRow
                          className="[&>td]:tw-p-2"
                          onDoubleClick={() =>
                            openProjectOrResource(projectResource.id, projectResource.isEditable)
                          }
                          key={projectResource.id}
                        >
                          <TableCell className="tw-ms-4 tw-flex tw-items-center tw-gap-4">
                            {projectResource.isResource ? (
                              <BookOpen className="tw-pr-0" size={18} />
                            ) : (
                              <ScrollText className="tw-pr-0" size={18} />
                            )}
                            <div className="tw-py-4">{projectResource.name}</div>
                          </TableCell>
                          <TableCell className="tw-font-medium">
                            {projectResource.fullName}
                          </TableCell>
                          <TableCell>{projectResource.language}</TableCell>
                          {filteredAndSortedProjectsResources.some(
                            (proj) => proj.isSendReceivable,
                          ) && (
                            <TableCell>
                              {projectResource.lastSendReceiveDate &&
                                formatTimeSpan(
                                  relativeTimeFormatter,
                                  new Date(projectResource.lastSendReceiveDate),
                                )}
                            </TableCell>
                          )}
                          <TableCell>
                            {projectResource.isSendReceivable &&
                            (!projectResource.isLocallyAvailable ||
                              projectResource.editedStatus === 'edited')
                              ? syncOrGetButton(projectResource)
                              : openButton(projectResource)}
                          </TableCell>
                          <TableCell>
                            {projectResource.isSendReceivable &&
                              projectResource.isLocallyAvailable && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                      <Ellipsis className="tw-w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="start">
                                    <DropdownMenuItem asChild>
                                      {projectResource.editedStatus === 'edited'
                                        ? openButton(projectResource, true)
                                        : syncOrGetButton(projectResource, true)}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}
          </CardContent>
        )}
        <CardFooter className="tw-flex-shrink-0 tw-justify-center tw-border-t tw-p-4">
          {filteredAndSortedProjectsResources.length > 0 && (
            <Label className="tw-font-normal">{`${filteredAndSortedProjectsResources.length} ${itemsText}`}</Label>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
