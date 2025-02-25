import papi, { logger } from '@papi/frontend';
import { useDataProvider, useLocalizedStrings, useSetting } from '@papi/frontend/react';
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
import { formatTimeSpan, getErrorMessage, LocalizeKey } from 'platform-bible-utils';
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
        logger.warn(`Home web view failed to get shared projects: ${getErrorMessage(e)}`);

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
  }, [isSendReceiveAvailable, isSendReceiveInProgress]);

  const [localProjectsInfo, setLocalProjectsInfo] = useState<LocalProjectInfo[]>([]);
  const [isLoadingLocalProjects, setIsLoadingLocalProjects] = useState<boolean>(true);

  useEffect(() => {
    let promiseIsCurrent = true;
    const getLocalProjects = async () => {
      const projectMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
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
  }, [isSendReceiveInProgress]);

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

  const [interfaceLanguages] = useSetting('platform.interfaceLanguage', ['en']);

  const relativeTimeFormatter = useMemo(() => {
    return new Intl.RelativeTimeFormat(interfaceLanguages, { style: 'long', numeric: 'auto' });
  }, [interfaceLanguages]);

  const getSendReceiveButtonContent = (project: MergedProjectInfo) => {
    if (isSendReceiveInProgress && activeSendReceiveProjects.includes(project.projectId)) {
      return <Spinner className="tw-h-5 tw-py-[1px]" />;
    }

    return project.isLocallyAvailable ? syncText : getText;
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
            {!localProjectsInfo ? (
              <div className="tw-flex-grow tw-h-full tw-border tw-border-gray-200 tw-rounded-lg tw-p-6 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
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
                  <div className="tw-flex-grow tw-h-full tw-border tw-border-gray-200 tw-rounded-lg tw-p-6 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
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
                          onDoubleClick={() => openResource(project.projectId, project.isEditable)}
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
                            {project.isSendReceivable ? (
                              <div>
                                <Button
                                  disabled={
                                    isSendReceiveInProgress &&
                                    activeSendReceiveProjects.includes(project.projectId)
                                  }
                                  onClick={() => sendReceiveProject(project.projectId)}
                                >
                                  {getSendReceiveButtonContent(project)}
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => openResource(project.projectId, project.isEditable)}
                              >
                                {openText}
                              </Button>
                            )}
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
                                  <DropdownMenuItem
                                    onClick={() =>
                                      openResource(project.projectId, project.isEditable)
                                    }
                                  >
                                    <span>{openText}</span>
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
        <CardFooter className="tw-flex-shrink-0 tw-justify-center tw-p-4 tw-border-t">
          {filteredAndSortedProjects.length > 0 && (
            <Label className="tw-font-normal">{`${filteredAndSortedProjects.length} ${itemsText}`}</Label>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
