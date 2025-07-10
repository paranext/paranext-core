import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { BookOpen, ChevronDown, ChevronsUpDown, ChevronUp, Plus } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { useEffect, useMemo, useRef, useState } from 'react';

const NEW_TAB_STRING_KEYS: LocalizeKey[] = [
  '%resources_clearSearch%',
  '%new_tab_dialog_title%',
  '%resources_filterInput%',
  '%resources_fullName%',
  '%resources_items%',
  '%resources_language%',
  '%resources_loading%',
  '%resources_noProjects%',
  '%resources_noProjectsInstruction%',
  '%resources_noSearchResults%',
  '%resources_open%',
  '%resources_searchedFor%',
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
};

const defaultExcludePdpFactoryIds: string[] = [];

globalThis.webViewComponent = function NewTab({ id: webViewId }: WebViewProps) {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(NEW_TAB_STRING_KEYS);

  const clearSearchText: string = localizedStrings['%resources_clearSearch%'];
  const dialogTitleText: string = localizedStrings['%new_tab_dialog_title%'];
  const filterInputText: string = localizedStrings['%resources_filterInput%'];
  const fullNameText: string = localizedStrings['%resources_fullName%'];
  const itemsText: string = localizedStrings['%resources_items%'];
  const languageText: string = localizedStrings['%resources_language%'];
  const loadingText: string = localizedStrings['%resources_loading%'];
  const noProjectsText: string = localizedStrings['%resources_noProjects%'];
  const noProjectsInstructionText: string = localizedStrings['%resources_noProjectsInstruction%'];
  const noSearchResultsText: string = localizedStrings['%resources_noSearchResults%'];
  const openText: string = localizedStrings['%resources_open%'];
  const searchedForText: string = localizedStrings['%resources_searchedFor%'];

  const openResource = (projectId: string, isEditable: boolean) =>
    papi.commands.sendCommand(
      isEditable
        ? 'platformScriptureEditor.openScriptureEditor'
        : 'platformScriptureEditor.openResourceViewer',
      projectId,
      undefined,
      webViewId,
    );

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

    getLocalProjects();

    return () => {
      // Mark this promise as old and not to be used
      promiseIsCurrent = false;
    };
  }, [excludePdpFactoryIds]);

  const mergedProjectInfo: MergedProjectInfo[] = useMemo(() => {
    const newMergedProjectInfo: MergedProjectInfo[] = [];
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
        });
      }
    });

    return newMergedProjectInfo;
  }, [localProjectsInfo]);

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

  const openButton = (project: MergedProjectInfo) => (
    <Button onClick={() => openResource(project.projectId, project.isEditable)}>{openText}</Button>
  );

  return (
    <div>
      <Card className="tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-border-0">
        <CardHeader className="tw-flex-shrink-0">
          <div className="tw-flex tw-justify-between tw-gap-4">
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4">
              <div className="tw-flex tw-gap-4 tw-items-center">
                <Plus size={36} />
                <CardTitle>{dialogTitleText}</CardTitle>
              </div>
              <SearchBar
                value={textFilter}
                className="tw-min-w-72"
                onSearch={setTextFilter}
                placeholder={filterInputText}
              />
            </div>
          </div>
        </CardHeader>
        {isLoadingLocalProjects ? (
          <CardContent className="tw-flex tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-2">
            <Label>{loadingText}</Label>
            <Spinner />
          </CardContent>
        ) : (
          <CardContent className="tw-flex-grow tw-overflow-auto">
            {!localProjectsInfo ? (
              <div className="tw-flex-grow tw-h-full tw-border tw-border-muted tw-rounded-lg tw-p-6 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
                <Label className="tw-text-muted-foreground">{noProjectsText}</Label>
                <Label className="tw-text-muted-foreground tw-font-normal">
                  {noProjectsInstructionText}
                </Label>
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
                            <BookOpen className="tw-pr-0" size={18} />
                          </TableCell>
                          <TableCell>{project.name}</TableCell>
                          <TableCell className="tw-font-medium">{project.fullName}</TableCell>
                          <TableCell>{project.language}</TableCell>
                          <TableCell>{openButton(project)}</TableCell>
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
