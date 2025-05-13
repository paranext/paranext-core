import ProjectResourceFilter, {
  ProjectResourceFilterValue,
} from '@/components/basics/projectResourceFilter.component';
import { SearchBar } from '@/components/basics/search-bar.component';
import { Spinner } from '@/components/basics/spinner.component';
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
import { ChevronDown, ChevronsUpDown, ChevronUp, Ellipsis, Home } from 'lucide-react';
import {
  formatTimeSpan,
  LanguageStrings,
  LocalizeKey,
  LocalProjectInfo,
  MergedProjectInfo,
  ProjectTypes,
  SharedProjectsInfo,
} from 'platform-bible-utils';
import { useMemo, useState } from 'react';

type SortConfig = {
  key: 'fullName' | 'language' | 'activity' | 'action';
  direction: 'ascending' | 'descending';
};

export type HomeDialogProps = {
  localizedStrings?: LanguageStrings;
  uiLocales?: Intl.LocalesArgument;
  onOpenGetResources?: () => void;
  onOpenResourceOrProject?: (projectId: string, isEditable: boolean) => void;
  onSendReceiveProject?: (projectId: string) => void;
  showGetResourcesButton?: boolean;
  isSendReceiveInProgress?: boolean;
  isLoadingLocalProjects?: boolean;
  isLoadingRemoteProjects?: boolean;
  localProjectResourceInfo?: LocalProjectInfo[];
  sharedProjectsInfo?: SharedProjectsInfo;
  activeSendReceiveProjects?: string[];
};

export function HomeDialog({
  localizedStrings = {},
  uiLocales = [],
  onOpenGetResources = () => {},
  onOpenResourceOrProject = () => {},
  onSendReceiveProject = () => {},
  showGetResourcesButton = true,
  isSendReceiveInProgress = false,
  isLoadingLocalProjects = false,
  isLoadingRemoteProjects = false,
  localProjectResourceInfo = [],
  sharedProjectsInfo = {},
  activeSendReceiveProjects = [],
}: HomeDialogProps) {
  const getLocalizedString: { (localizeKey: LocalizeKey): string } = (localizeKey: LocalizeKey) => {
    return localizedStrings[localizeKey] ?? localizeKey;
  };
  const actionText: string = getLocalizedString('%resources_action%');
  const activityText: string = getLocalizedString('%resources_activity%');
  const clearSearchText: string = getLocalizedString('%resources_clearSearch%');
  const dialogTitleText: string = getLocalizedString('%home_dialog_title%');
  const filterInputText: string = getLocalizedString('%resources_filterInput%');
  const fullNameText: string = getLocalizedString('%resources_fullName%');
  const getText: string = getLocalizedString('%resources_get%');
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

  const mergedProjectAndResources: MergedProjectInfo[] = useMemo(() => {
    const newMergedProjectsAndResources: MergedProjectInfo[] = [];
    if (sharedProjectsInfo) {
      Object.entries(sharedProjectsInfo).forEach(([projectId, sharedProject]) => {
        newMergedProjectsAndResources.push({
          id: projectId,
          name: sharedProject.name,
          fullName: sharedProject.fullName,
          language: sharedProject.language,
          isEditable: true,
          isSendReceivable: true,
          isLocallyAvailable: localProjectResourceInfo?.some((project) => project.id === projectId),
          editedStatus: sharedProject.editedStatus,
          lastSendReceiveDate: sharedProject.lastSendReceiveDate,
          type: 'project',
        });
      });
    }
    localProjectResourceInfo?.forEach((project) => {
      if (!newMergedProjectsAndResources.some((mergedProject) => mergedProject.id === project.id)) {
        newMergedProjectsAndResources.push({
          id: project.id,
          name: project.name,
          fullName: project.fullName,
          language: project.language,
          isEditable: project.isEditable,
          isSendReceivable: false,
          type: project.type,
        });
      }
    });

    return newMergedProjectsAndResources;
  }, [localProjectResourceInfo, sharedProjectsInfo]);

  const [textFilter, setTextFilter] = useState<string>('');

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'language',
    direction: 'ascending',
  });

  const [projectResourceFilter, setProjectResourceFilter] =
    useState<ProjectResourceFilterValue>('all');

  const filteredAndSortedProjectsResources = useMemo(() => {
    if (!mergedProjectAndResources) return [];
    const textFilteredProjects = mergedProjectAndResources.filter((project) => {
      const filter = textFilter.toLowerCase();
      const showInTypeFilter =
        projectResourceFilter === 'all' || projectResourceFilter === project.type;

      return (
        showInTypeFilter &&
        (project.fullName.toLowerCase().includes(filter) ||
          project.name.toLowerCase().includes(filter) ||
          project.language.toLowerCase().includes(filter))
      );
    });

    // If for a selected type there are no items, redirect the user to the full list after few seconds
    if (textFilteredProjects.length === 0 && textFilter === '') {
      setTimeout(() => {
        setProjectResourceFilter('all');
      }, 2000);
    }

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
  }, [mergedProjectAndResources, textFilter, sortConfig, projectResourceFilter]);

  const handleSort = (key: SortConfig['key']) => {
    const newSortConfig: SortConfig = { key, direction: 'ascending' };
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      newSortConfig.direction = 'descending';
    }
    setSortConfig(newSortConfig);
  };

  const buildTableHead = (key: SortConfig['key'], label: string) => (
    <TableHead onClick={() => handleSort(key)}>
      <Button variant="ghost" className="tw-bg-transparent hover:tw-bg-transparent">
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
    if (isSendReceiveInProgress && activeSendReceiveProjects.includes(project.id)) {
      return <Spinner className="tw-h-5 tw-py-[1px]" />;
    }

    return project.isLocallyAvailable ? syncText : getText;
  };

  const syncOrGetButton = (project: MergedProjectInfo, isMenuItem?: boolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => onSendReceiveProject(project.id)}>
          <span>{getSendReceiveButtonContent(project)}</span>
        </DropdownMenuItem>
      );
    return (
      <Button
        disabled={isSendReceiveInProgress && activeSendReceiveProjects.includes(project.id)}
        onClick={() => onSendReceiveProject(project.id)}
      >
        {getSendReceiveButtonContent(project)}
      </Button>
    );
  };

  const openButton = (project: MergedProjectInfo, isMenuItem?: boolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => onOpenResourceOrProject(project.id, project.isEditable)}>
          <span>{openText}</span>
        </DropdownMenuItem>
      );
    return (
      <Button onClick={() => onOpenResourceOrProject(project.id, project.isEditable)}>
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
          <CardContent className="tw-flex-grow tw-overflow-auto">
            {!localProjectResourceInfo ? (
              <div className="tw-flex tw-h-full tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-rounded-lg tw-border tw-border-gray-200 tw-p-6 tw-text-center">
                <Label className="tw-text-muted-foreground">{noProjectsText}</Label>
                <Label className="tw-font-normal tw-text-muted-foreground">
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
                          setProjectResourceFilter('all');
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
                        <TableHead>
                          <ProjectResourceFilter
                            onChange={setProjectResourceFilter}
                            variant="ghost"
                            types={Object.values(ProjectTypes)}
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
                      {filteredAndSortedProjectsResources.map((projectResource) => {
                        const Icon = ProjectTypes[projectResource.type].icon;

                        return (
                          <TableRow
                            className="[&>td]:tw-p-2"
                            onDoubleClick={() =>
                              onOpenResourceOrProject(
                                projectResource.id,
                                projectResource.isEditable,
                              )
                            }
                            key={projectResource.id}
                          >
                            <TableCell className="tw-ms-4 tw-flex tw-items-center tw-gap-4">
                              <Icon className="tw-h-4 tw-pr-0" />
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
                        );
                      })}
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
