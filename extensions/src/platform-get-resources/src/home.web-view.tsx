import papi, { logger } from '@papi/frontend';
import { useData, useDataProvider, useLocalizedStrings, useSetting } from '@papi/frontend/react';
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
  useEvent,
} from 'platform-bible-react';
import {
  formatTimeSpan,
  getErrorMessage,
  isErrorMessageAboutParatextBlockingInternetAccess,
  isErrorMessageAboutRegistryAuthFailure,
  isPlatformError,
  LocalizeKey,
  newGuid,
} from 'platform-bible-utils';
import { EditedStatus, SharedProjectsInfo } from 'platform-scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const HOME_STRING_KEYS: LocalizeKey[] = [
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
];

type SortConfig = {
  key: 'fullName' | 'language' | 'activity' | 'action';
  direction: 'ascending' | 'descending';
};

type LocalProjectInfo = {
  projectId: string;
  isEditable: boolean;
  fullName: string;
  name: string;
  language: string;
};

type MergedProjectInfo = {
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

const defaultExcludePdpFactoryIds: string[] = [];
const defaultInterfaceLanguages: string[] = ['en'];

globalThis.webViewComponent = function HomeDialog() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(HOME_STRING_KEYS);

  const actionText: string = localizedStrings['%resources_action%'];
  const activityText: string = localizedStrings['%resources_activity%'];
  const clearSearchText: string = localizedStrings['%resources_clearSearch%'];
  const dialogTitleText: string = localizedStrings['%home_dialog_title%'];
  const filterInputText: string = localizedStrings['%resources_filterInput%'];
  const fullNameText: string = localizedStrings['%resources_fullName%'];
  const getText: string = localizedStrings['%resources_get%'];
  const getStartedText: string = localizedStrings['%resources_getStarted%'];
  const getStartedDescriptionText: string = localizedStrings['%resources_getStartedDescription%'];
  const getResourcesText: string = localizedStrings['%resources_getResources%'];
  const itemsText: string = localizedStrings['%resources_items%'];
  const languageText: string = localizedStrings['%resources_language%'];
  const loadingText: string = localizedStrings['%resources_loading%'];
  const noProjectsText: string = localizedStrings['%resources_noProjects%'];
  const noProjectsInstructionText: string = localizedStrings['%resources_noProjectsInstruction%'];
  const noSearchResultsText: string = localizedStrings['%resources_noSearchResults%'];
  const openText: string = localizedStrings['%resources_open%'];
  const searchedForText: string = localizedStrings['%resources_searchedFor%'];
  const syncText: string = localizedStrings['%resources_sync%'];

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');

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

  const [resourcesList] = useData('platformGetResources.dblResourcesProvider').DblResources(
    undefined,
    [],
  );

  const openResource = (projectId: string, isEditable: boolean) =>
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
    const isAvailable = await papi.commands.sendCommand(
      'platformGetResources.isSendReceiveAvailable',
    );
    if (isMounted.current) {
      setIsSendReceiveAvailable(isAvailable);
    }
  }, []);

  useEffect(() => {
    checkIfSendReceiveAvailable();
  }, [checkIfSendReceiveAvailable]);

  useEvent(
    papi.network.getNetworkEvent('platform.onDidReloadExtensions'),
    checkIfSendReceiveAvailable,
  );

  const [isSendReceiveInProgress, setIsSendReceiveInProgress] = useState<boolean>(false);
  const [activeSendReceiveProjects, setActiveSendReceiveProjects] = useState<string[]>([]);

  const sendReceiveProject = async (projectId: string) => {
    if (!isSendReceiveAvailable) return;

    try {
      setIsSendReceiveInProgress(true);
      setActiveSendReceiveProjects((prev) => [...prev, projectId]);

      await papi.commands.sendCommand('paratextBibleSendReceive.sendReceiveProjects', [projectId]);

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
        const projectsInfo = await papi.commands.sendCommand(
          'paratextBibleSendReceive.getSharedProjects',
        );

        if (promiseIsCurrent && isMounted.current) {
          setIsLoadingRemoteProjects(false);
          setSharedProjectsInfo(projectsInfo);
        }
      } catch (e) {
        const errorMessage = getErrorMessage(e);
        if (isErrorMessageAboutParatextBlockingInternetAccess(errorMessage)) {
          papi.notifications.send({
            severity: 'error',
            message: '%data_loading_error_paratextData_internet_disabled%',
            clickCommandLabel: '%general_open%',
            clickCommand: 'paratextRegistration.showParatextRegistration',
            notificationId: sharedProjectErrorNotificationId,
          });
        } else if (isErrorMessageAboutRegistryAuthFailure(errorMessage)) {
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

  const [localProjectsInfo, setLocalProjectsInfo] = useState<LocalProjectInfo[]>([]);
  const [isLoadingLocalProjects, setIsLoadingLocalProjects] = useState<boolean>(true);

  const [excludePdpFactoryIdsInHomePossiblyError] = useSetting(
    'platformGetResources.excludePdpFactoryIdsInHome',
    defaultExcludePdpFactoryIds,
  );

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
      const projectMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
        excludePdpFactoryIds,
      });
      const projectInfo = await Promise.all(
        projectMetadata.map(async (data) => {
          const pdp = await papi.projectDataProviders.get('platform.base', data.id);
          return {
            projectId: data.id,
            isEditable: await pdp.getSetting('platform.isEditable'),
            fullName: await pdp.getSetting('platform.fullName'),
            name: await pdp.getSetting('platform.name'),
            language: await pdp.getSetting('platform.language'),
          };
        }),
      );

      if (promiseIsCurrent && isMounted.current) {
        setIsLoadingLocalProjects(false);
        setLocalProjectsInfo(projectInfo);
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
  }, [isSendReceiveInProgress, excludePdpFactoryIds, resourcesList]);

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

  const buildTableHead = (key: SortConfig['key'], label: string) => (
    <TableHead onClick={() => handleSort(key)}>
      <div className="tw-flex tw-items-center">
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

  const [interfaceLanguages] = useSetting('platform.interfaceLanguage', defaultInterfaceLanguages);

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

  const getSendReceiveButtonContent = (project: MergedProjectInfo) => {
    if (isSendReceiveInProgress && activeSendReceiveProjects.includes(project.projectId)) {
      return <Spinner className="tw-h-5 tw-py-[1px]" />;
    }

    return project.isLocallyAvailable ? syncText : getText;
  };

  const syncOrGetButton = (project: MergedProjectInfo, isMenuItem?: boolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => sendReceiveProject(project.projectId)}>
          <span>{getSendReceiveButtonContent(project)}</span>
        </DropdownMenuItem>
      );
    return (
      <Button
        disabled={isSendReceiveInProgress && activeSendReceiveProjects.includes(project.projectId)}
        onClick={() => sendReceiveProject(project.projectId)}
      >
        {getSendReceiveButtonContent(project)}
      </Button>
    );
  };

  const openButton = (project: MergedProjectInfo, isMenuItem?: boolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => openResource(project.projectId, project.isEditable)}>
          <span>{openText}</span>
        </DropdownMenuItem>
      );
    return (
      <Button onClick={() => openResource(project.projectId, project.isEditable)}>
        {openText}
      </Button>
    );
  };

  return (
    <div>
      <Card className="tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-border-0">
        <CardHeader className="tw-flex-shrink-0">
          <div className="tw-flex tw-justify-between tw-gap-4">
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4">
              <div className="tw-flex tw-gap-4 tw-items-center">
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
            <div className="tw-self-end">
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
            <div className="tw-flex tw-flex-col tw-gap-4">
              {!localProjectsInfo ? (
                <div className="tw-flex-grow tw-h-full tw-border tw-border-muted tw-rounded-lg tw-p-6 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
                  <Label className="tw-text-muted-foreground">{noProjectsText}</Label>
                  <Label className="tw-text-muted-foreground tw-font-normal">
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
                          <TableHead />
                          <TableHead />
                          {buildTableHead('fullName', fullNameText)}
                          {buildTableHead('language', languageText)}
                          {filteredAndSortedProjects.some((project) => project.isSendReceivable) &&
                            buildTableHead('activity', activityText)}
                          {buildTableHead('action', actionText)}
                          <TableHead />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAndSortedProjects.map((project) => (
                          <TableRow
                            onDoubleClick={() =>
                              openResource(project.projectId, project.isEditable)
                            }
                            key={project.projectId}
                          >
                            <TableCell>
                              {project.isSendReceivable ? (
                                <ScrollText className="tw-pr-0" size={18} />
                              ) : (
                                <BookOpen className="tw-pr-0" size={18} />
                              )}
                            </TableCell>
                            <TableCell>{project.name}</TableCell>
                            <TableCell className="tw-font-medium">{project.fullName}</TableCell>
                            <TableCell>{project.language}</TableCell>
                            {filteredAndSortedProjects.some((proj) => proj.isSendReceivable) && (
                              <TableCell>
                                {project.lastSendReceiveDate &&
                                  formatTimeSpan(
                                    relativeTimeFormatter,
                                    new Date(project.lastSendReceiveDate),
                                  )}
                              </TableCell>
                            )}
                            <TableCell>
                              {project.isSendReceivable &&
                              (!project.isLocallyAvailable || project.editedStatus === 'edited')
                                ? syncOrGetButton(project)
                                : openButton(project)}
                            </TableCell>
                            <TableCell>
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
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              )}
              {filteredAndSortedProjects.length === 1 &&
                filteredAndSortedProjects[0].name === 'WEB' && (
                  <div className="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-w-auto">
                    <p className="tw-text-muted-foreground tw-font-normal">
                      {getStartedDescriptionText}
                    </p>
                    <Button
                      onClick={() => {
                        papi.commands.sendCommand(
                          'platform.openWindow',
                          'https://github.com/paranext/paranext/wiki/Getting-Started-with-Platform.Bible-and-Paratext-10-Studio',
                        );
                      }}
                    >
                      {getStartedText}
                    </Button>
                  </div>
                )}
            </div>
          </CardContent>
        )}
        {filteredAndSortedProjects.length > 0 && (
          <CardFooter className="tw-flex-shrink-0 tw-flex-col tw-justify-center tw-p-4 tw-border-t tw-gap-2">
            <p className="tw-font-normal">{`${filteredAndSortedProjects.length} ${itemsText}`}</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
