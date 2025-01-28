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
  LocalizeKey,
  SearchBar,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useEvent,
  usePromise,
} from 'platform-bible-react';
import { formatTimeSpan, getErrorMessage } from 'platform-bible-utils';
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
  '%resources_installed%',
  '%resources_items%',
  '%resources_language%',
  '%resources_noProjects%',
  '%resources_noProjectsInstruction%',
  '%resources_noSearchResults%',
  '%resources_open%',
  '%resources_remove%',
  '%resources_searchedFor%',
  '%resources_update%',
  '%resources_sync%',
];

type SortConfig = {
  key: 'fullName' | 'language' | 'activity' | 'action';
  direction: 'ascending' | 'descending';
};

// This type is copied from paratext-bible-send-receive.d.ts
// Is there a better way to access this type?
type EditedStatus = undefined | '' | 'edited' | 'new' | 'unregistered';

type MergedProjectInfo = {
  projectId: string;
  name: string;
  fullName: string;
  language: string;
  isEditable: boolean;
  isSendReceivable: boolean;
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
  const getResourcesText: string = localizedStrings['%resources_getResources%'];
  const itemsText: string = localizedStrings['%resources_items%'];
  const languageText: string = localizedStrings['%resources_language%'];
  const noProjectsText: string = localizedStrings['%resources_noProjects%'];
  const noProjectsInstructionText: string = localizedStrings['%resources_noProjectsInstruction%'];
  const noSearchResultsText: string = localizedStrings['%resources_noSearchResults%'];
  const openText: string = localizedStrings['%resources_open%'];
  const searchedForText: string = localizedStrings['%resources_searchedFor%'];
  const syncText: string = localizedStrings['%resources_sync%'];

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');

  const [showGetResourcesButton, setShowGetResourceButton] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchAvailability = async () => {
      if (dblResourcesProvider) {
        setShowGetResourceButton(
          await dblResourcesProvider.isGetDblResourcesAvailable('Why do we need a parameter here?'),
        );
      } else {
        setShowGetResourceButton(undefined);
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
      'platformManageResources.isSendReceiveAvailable',
    );
    setIsSendReceiveAvailable(isAvailable);
  }, []);

  useEffect(() => {
    checkIfSendReceiveAvailable();
  }, [checkIfSendReceiveAvailable]);

  useEvent(
    papi.network.getNetworkEvent('platform.onDidReloadExtensions'),
    checkIfSendReceiveAvailable,
  );

  const [sendReceiveInProgress, setSendReceiveInProgress] = useState<boolean>(false);
  const [activeSendReceiveProjects, setActiveSendReceiveProjects] = useState<string[]>([]);

  const sendReceiveProject = async (projectId: string) => {
    try {
      setSendReceiveInProgress(true);
      setActiveSendReceiveProjects((prev) => [...prev, projectId]);

      await papi.commands.sendCommand('paratextBibleSendReceive.sendReceiveProjects', [projectId]);

      if (isMounted.current) {
        setActiveSendReceiveProjects((prev) => prev.filter((id) => id !== projectId));
        setSendReceiveInProgress(false);
      }
    } catch (e) {
      logger.warn(
        `Home web view failed to reload after running S/R for project ${projectId}: ${e}`,
      );
      setActiveSendReceiveProjects((prev) => prev.filter((id) => id !== projectId));
      setSendReceiveInProgress(false);
    }
  };

  const [sharedProjectsInfo] = usePromise(
    useCallback(async () => {
      if (!isSendReceiveAvailable) {
        return undefined;
      }
      try {
        const projectsInfo = await papi.commands.sendCommand(
          'paratextBibleSendReceive.getSharedProjects',
        );
        return projectsInfo;
      } catch (e) {
        logger.warn(`Home web view failed to get shared projects: ${getErrorMessage(e)}`);
        return undefined;
      }
    }, [isSendReceiveAvailable]),
    undefined,
  );

  const [allProjectsInfo] = usePromise(
    useCallback(async () => {
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
      return projectInfo;
    }, []),
    undefined,
  );

  const [mergedProjectInfo, setMergedProjectInfo] = useState<MergedProjectInfo[]>([]);

  useEffect(() => {
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
          editedStatus: sharedProject.editedStatus,
          lastSendReceiveDate: sharedProject.lastSendReceiveDate,
        });
      });
    }
    allProjectsInfo?.forEach((project) => {
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

    setMergedProjectInfo(newMergedProjectInfo);
  }, [allProjectsInfo, sharedProjectsInfo]);

  const [textFilter, setTextFilter] = useState<string>('');

  const textFilteredProjects = useMemo(() => {
    if (!mergedProjectInfo) return [];
    return mergedProjectInfo.filter((project) => {
      const filter = textFilter.toLowerCase();
      return (
        project.fullName.toLowerCase().includes(filter) ||
        project.name.toLowerCase().includes(filter) ||
        project.language.toLowerCase().includes(filter)
      );
    });
  }, [mergedProjectInfo, textFilter]);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'language',
    direction: 'ascending',
  });

  const handleSort = (key: SortConfig['key']) => {
    const newSortConfig: SortConfig = { key, direction: 'ascending' };
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      newSortConfig.direction = 'descending';
    }
    setSortConfig(newSortConfig);
  };

  const sortedProjects = useMemo(() => {
    return [...textFilteredProjects].sort((a, b) => {
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
          // To be implemented later
          return 0;
        case 'action':
          // To be implemented later
          return 0;
        default:
          return 0;
      }
    });
  }, [sortConfig, textFilteredProjects]);

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
                className="tw-min-w-72"
                onSearch={setTextFilter}
                placeholder={filterInputText}
              />
            </div>
            <div className="tw-self-end">
              {showGetResourcesButton && (
                <Button
                  onClick={() =>
                    papi.commands.sendCommand('platformManageResources.openGetResources')
                  }
                  className="tw-bg-muted"
                  variant="ghost"
                >
                  {`+ ${getResourcesText}`}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="tw-flex-grow tw-overflow-auto">
          {!allProjectsInfo ? (
            <div className="tw-flex-grow tw-h-full tw-border tw-border-gray-200 tw-rounded-lg tw-p-6 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
              <Label className="tw-text-muted-foreground">{noProjectsText}</Label>
              <Label className="tw-text-muted-foreground tw-font-normal">
                {noProjectsInstructionText}
              </Label>

              {showGetResourcesButton && (
                <Button
                  onClick={() =>
                    papi.commands.sendCommand('platformManageResources.openGetResources')
                  }
                  className="tw-mt-4"
                >{`+ ${getResourcesText}`}</Button>
              )}
            </div>
          ) : (
            <div className="tw-flex-grow tw-h-full">
              {sortedProjects.length === 0 ? (
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
                          papi.commands.sendCommand('platformManageResources.openGetResources')
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
                      {sortedProjects.some((project) => project.isSendReceivable) &&
                        buildTableHead('activity', activityText)}
                      {buildTableHead('action', actionText)}
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedProjects.map((project) => (
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
                        {sortedProjects.some((proj) => proj.isSendReceivable) && (
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
                                  sendReceiveInProgress &&
                                  activeSendReceiveProjects.includes(project.projectId)
                                }
                                onClick={() => sendReceiveProject(project.projectId)}
                              >
                                {sendReceiveInProgress &&
                                activeSendReceiveProjects.includes(project.projectId) ? (
                                  <Spinner className="tw-h-5 tw-py-[1px]" />
                                ) : (
                                  syncText
                                )}
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
                          {project.isSendReceivable && (
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
        <CardFooter className="tw-flex-shrink-0 tw-justify-center tw-p-4 tw-border-t">
          {sortedProjects.length > 0 && (
            <Label className="tw-font-normal">{`${sortedProjects.length} ${itemsText}`}</Label>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
