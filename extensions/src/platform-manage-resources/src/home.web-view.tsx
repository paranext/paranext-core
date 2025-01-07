import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { BookOpen, ChevronDown, ChevronsUpDown, ChevronUp, Ellipsis, Home } from 'lucide-react';
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
  // DropdownMenu,
  // DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuSeparator,
  // DropdownMenuTrigger,
  Label,
  LocalizeKey,
  SearchBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  usePromise,
} from 'platform-bible-react';
// import { DblResourceData, getErrorMessage } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';

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
];

type SortConfig = {
  key: 'fullName' | 'language' | 'activity' | 'action';
  direction: 'ascending' | 'descending';
};

// type InstallInfo = {
//   dblEntryUid: string;
//   action: 'installing' | 'removing';
// };

globalThis.webViewComponent = function GetResourcesDialog() {
  const [localizedStrings] = useLocalizedStrings(HOME_STRING_KEYS);

  const actionText: string = localizedStrings['%resources_action%'];
  const activityText: string = localizedStrings['%resources_activity%'];
  const clearSearchText: string = localizedStrings['%resources_clearSearch%'];
  const dialogTitleText: string = localizedStrings['%home_dialog_title%'];
  const filterInputText: string = localizedStrings['%resources_filterInput%'];
  const fullNameText: string = localizedStrings['%resources_fullName%'];
  // const getText: string = localizedStrings['%resources_get%'];
  const getResourcesText: string = localizedStrings['%resources_getResources%'];
  // const installedText: string = localizedStrings['%resources_installed%'];
  const itemsText: string = localizedStrings['%resources_items%'];
  const languageText: string = localizedStrings['%resources_language%'];
  const noProjectsText: string = localizedStrings['%resources_noProjects%'];
  const noProjectsInstructionText: string = localizedStrings['%resources_noProjectsInstruction%'];
  const noSearchResultsText: string = localizedStrings['%resources_noSearchResults%'];
  const openText: string = localizedStrings['%resources_open%'];
  // const removeText: string = localizedStrings['%resources_remove%'];
  const searchedForText: string = localizedStrings['%resources_searchedFor%'];
  // const updateText: string = localizedStrings['%resources_update%'];

  // const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');
  // const installResource = dblResourcesProvider?.installDblResource;
  // const uninstallResource = dblResourcesProvider?.uninstallDblResource;

  const openResource = (projectId: string, isEditable: boolean) =>
    papi.commands.sendCommand(
      isEditable
        ? 'platformScriptureEditor.openScriptureEditor'
        : 'platformScriptureEditor.openResourceViewer',
      projectId,
    );

  const [projects] = usePromise(
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

  console.log('editable projs:', projects);

  // const [sharedProjectsInfo] = usePromise(
  //   useCallback(async () => {
  //     try {
  //       const projectsInfo = await papi.commands.sendCommand(
  //         'paratextBibleSendReceive.getSharedProjects',
  //       );
  //       return projectsInfo;
  //     } catch (e) {
  //       // setGetSharedProjectsError(getErrorMessage(e));
  //       return undefined;
  //     }
  //   }, []),
  //   undefined,
  // );

  // console.log('S/R projs:', sharedProjectsInfo);

  // const openResource = (projectId: string) =>
  //   papi.commands.sendCommand('platformScriptureEditor.openResourceViewer', projectId);

  // const [installInfo, setInstallInfo] = useState<InstallInfo[]>([]);

  // const installOrRemoveResource = (dblEntryUid: string, action: 'install' | 'remove'): void => {
  //   if (!installResource || !uninstallResource) return;
  //   const newInstallInfo: InstallInfo = {
  //     dblEntryUid,
  //     action: action === 'install' ? 'installing' : 'removing',
  //   };

  //   setInstallInfo((prevInfo) => [...prevInfo, newInstallInfo]);

  //   const actionFunction = action === 'install' ? installResource : uninstallResource;

  //   actionFunction(dblEntryUid).catch((error) => {
  //     console.debug(getErrorMessage(error));
  //   });
  // };

  const [textFilter, setTextFilter] = useState<string>('');

  const textFilteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter((project) => {
      const filter = textFilter.toLowerCase();
      return project.fullName.toLowerCase().includes(filter);
    });
  }, [projects, textFilter]);

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
          // To be implemented
          return 0;
        case 'action':
          // To be implemented
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

  // const getActionButtonContent = (
  //   resource: DblResourceData,
  //   buttonText: string,
  //   installResource: (dblEntryUid: string, action: 'install' | 'remove') => void,
  // ) => {
  //   return (
  //     <Button
  //       className="tw-bg-muted"
  //       variant="ghost"
  //       onClick={() => installResource(resource.dblEntryUid, 'install')}
  //     >
  //       {buttonText}
  //     </Button>
  //   );
  // };

  // const getActionContent = (
  //   resource: { projectId: string; isEditable: boolean; fullName: string },
  //   idsBeingHandled: string[],
  //   getText: string,
  //   updateText: string,
  //   installedText: string,
  //   installResource: (dblEntryUid: string, action: 'install' | 'remove') => void,
  // ) => {
  //   const isBeingHandled = idsBeingHandled.includes(resource.dblEntryUid);
  //   if (isBeingHandled) {
  //     return (
  //       <Button className="tw-bg-muted" variant="ghost">
  //         <Spinner className="tw-h-5 tw-py-[1px]" />
  //       </Button>
  //     );
  //   }
  //   if (!resource.installed) {
  //     return getActionButtonContent(resource, getText, installResource);
  //   }
  //   if (resource.updateAvailable) {
  //     return getActionButtonContent(resource, updateText, installResource);
  //   }
  //   return <Label className="tw-my-2 tw-flex tw-h-6 tw-items-center">{installedText}</Label>;
  // };

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
              <Button
                onClick={() =>
                  papi.commands.sendCommand('platformManageResources.openGetResources')
                }
                className="tw-bg-muted"
                variant="ghost"
              >
                {`+ ${getResourcesText}`}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="tw-flex-grow tw-overflow-auto">
          {!projects ? (
            <div className="tw-flex-grow tw-h-full tw-border tw-border-gray-200 tw-rounded-lg tw-p-6 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
              <Label className="tw-text-muted-foreground">{noProjectsText}</Label>
              <Label className="tw-text-muted-foreground tw-font-normal">
                {noProjectsInstructionText}
              </Label>
              <Button
                onClick={() =>
                  papi.commands.sendCommand('platformManageResources.openGetResources')
                }
                className="tw-mt-4"
              >{`+ ${getResourcesText}`}</Button>
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
                    <Button
                      onClick={() =>
                        papi.commands.sendCommand('platformManageResources.openGetResources')
                      }
                      variant="ghost"
                      className="tw-bg-muted"
                    >
                      {`+ ${getResourcesText}`}
                    </Button>
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
                      {buildTableHead('activity', activityText)}
                      {buildTableHead('action', actionText)}
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedProjects.map((project) => (
                      <TableRow key={project.projectId}>
                        <TableCell>
                          <BookOpen className="tw-pr-0" size={18} />
                        </TableCell>
                        <TableCell>{project.name}</TableCell>
                        <TableCell className="tw-font-medium">{project.fullName}</TableCell>
                        <TableCell>{project.language}</TableCell>
                        <TableCell>Activity (?)</TableCell>
                        <TableCell>
                          Action (?)
                          {/* <div className="tw-flex tw-justify-between">
                            {getActionContent(
                              project,
                              installInfo.map((info) => info.dblEntryUid),
                              getText,
                              updateText,
                              installedText,
                              installOrRemoveResource,
                            )}
                            {project.isEditable && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost">
                                    <Ellipsis className="tw-w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  <DropdownMenuItem onClick={() => openResource(project.projectId)}>
                                    <span>{openText}</span>
                                  </DropdownMenuItem>

                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => {}}>
                                    <span>{removeText}</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div> */}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost">
                                <Ellipsis className="tw-w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem
                                onClick={() => openResource(project.projectId, project.isEditable)}
                              >
                                <span>{openText}</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
