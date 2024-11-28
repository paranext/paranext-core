import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useData, useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import {
  BookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Ellipsis,
  Loader,
  Search,
} from 'lucide-react';
import type { DblResourceData, ResourceType } from 'platform-get-resources';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ComboBox,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  LocalizeKey,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import { useEffect, useMemo, useState } from 'react';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%getResources_action%',
  '%getResources_dialog_subtitle%',
  '%getResources_dialog_title%',
  '%getResources_filterInput%',
  '%getResources_fullName%',
  '%getResources_get%',
  '%getResources_installed%',
  '%getResources_language%',
  '%getResources_languageFilter%',
  '%getResources_loadingResources%',
  '%getResources_noResults%',
  '%getResources_open%',
  '%getResources_remove%',
  '%getResources_size%',
  '%getResources_type%',
  '%getResources_type_DBL%',
  '%getResources_type_ER%',
  '%getResources_type_SLR%',
  '%getResources_type_XR%',
  '%getResources_type_unknown%',
  '%getResources_update%',
];

type InstallInfo = {
  dblEntryUid: string;
  action: 'installing' | 'removing';
};

type SortConfig = {
  key: 'fullName' | 'bestLanguageName';
  direction: 'ascending' | 'descending';
};

type TypeOptions = {
  type: ResourceType;
  localizedValue: string;
};

const getLanguageOptions = (
  dblResources: DblResourceData[],
  languageFilter: string[],
): string[] => {
  const sortedLanguages = Array.from(
    new Set(dblResources.map((resource) => resource.bestLanguageName)),
  );

  const prioritizedLanguages = new Set(
    languageFilter.concat(
      dblResources
        .filter((resource) => resource.installed)
        .map((resource) => resource.bestLanguageName),
    ),
  );

  return sortedLanguages.sort((a, b) => {
    const aIsPrioritized = prioritizedLanguages.has(a);
    const bIsPrioritized = prioritizedLanguages.has(b);

    if (aIsPrioritized && bIsPrioritized) {
      return a.localeCompare(b);
    }
    if (aIsPrioritized) return -1;
    if (bIsPrioritized) return 1;

    return a.localeCompare(b);
  });
};

const getActionButtonContent = (
  resource: DblResourceData,
  buttonText: string,
  installResource: (dblEntryUid: string, action: 'install' | 'remove') => void,
) => {
  return (
    <Button variant="outline" onClick={() => installResource(resource.dblEntryUid, 'install')}>
      {buttonText}
    </Button>
  );
};

const getActionContent = (
  resource: DblResourceData,
  idsBeingHandled: string[],
  getText: string,
  updateText: string,
  installedText: string,
  installResource: (dblEntryUid: string, action: 'install' | 'remove') => void,
) => {
  const isBeingHandled = idsBeingHandled.includes(resource.dblEntryUid);
  if (isBeingHandled) {
    return (
      <Button variant="outline">
        <Spinner className="tw-h-5 tw-py-[1px]" />
      </Button>
    );
  }
  if (!resource.installed) {
    return getActionButtonContent(resource, getText, installResource);
  }
  if (resource.updateAvailable) {
    return getActionButtonContent(resource, updateText, installResource);
  }
  return <Label className="tw-h-6 tw-my-2 tw-flex tw-items-center">{installedText}</Label>;
};

globalThis.webViewComponent = function GetResourcesDialog({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  const actionText: string = localizedStrings['%getResources_action%'];
  const dialogSubtitleText: string = localizedStrings['%getResources_dialog_subtitle%'];
  const dialogTitleText: string = localizedStrings['%getResources_dialog_title%'];
  const filterInputText: string = localizedStrings['%getResources_filterInput%'];
  const fullNameText: string = localizedStrings['%getResources_fullName%'];
  const getText: string = localizedStrings['%getResources_get%'];
  const installedText: string = localizedStrings['%getResources_installed%'];
  const languageText: string = localizedStrings['%getResources_language%'];
  const languageFilterText: string = localizedStrings['%getResources_languageFilter%'];
  const loadingResourcesText: string = localizedStrings['%getResources_loadingResources%'];
  const noResultsText: string = localizedStrings['%getResources_noResults%'];
  const openText: string = localizedStrings['%getResources_open%'];
  const removeText: string = localizedStrings['%getResources_remove%'];
  const sizeText: string = localizedStrings['%getResources_size%'];
  const typeText: string = localizedStrings['%getResources_type%'];
  const typeDblText: string = localizedStrings['%getResources_type_DBL%'];
  const typeErText: string = localizedStrings['%getResources_type_ER%'];
  const typeSlrText: string = localizedStrings['%getResources_type_SLR%'];
  const typeXrText: string = localizedStrings['%getResources_type_XR%'];
  const typeUnknownText: string = localizedStrings['%getResources_type_unknown%'];
  const updateText: string = localizedStrings['%getResources_update%'];

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');
  const [dblResources, , isLoadingDblResources] = useData(
    'platformGetResources.dblResourcesProvider',
  ).DblResources(undefined, []);

  const [installInfo, setInstallInfo] = useState<InstallInfo[]>([]);

  const installOrRemoveResource = (dblEntryUid: string, action: 'install' | 'remove'): void => {
    if (!dblResourcesProvider) return;
    const newInstallInfo: InstallInfo = {
      dblEntryUid,
      action: action === 'install' ? 'installing' : 'removing',
    };

    setInstallInfo((prevInfo) => [...prevInfo, newInstallInfo]);

    const actionFunction =
      action === 'install'
        ? dblResourcesProvider?.installDblResource
        : dblResourcesProvider?.uninstallDblResource;

    actionFunction(dblEntryUid).catch((error) => {
      logger.debug(getErrorMessage(error));
    });
  };

  /** Removes resources from array of resources that are currently being handled */
  useEffect(() => {
    setInstallInfo((currentInstallInfo) =>
      currentInstallInfo.filter((info) => {
        const resource = dblResources.find((res) => res.dblEntryUid === info.dblEntryUid);

        if (!resource) return true;

        if (info.action === 'installing' && resource.installed) return false;
        if (info.action === 'removing' && !resource.installed) return false;

        return true;
      }),
    );
  }, [dblResources]);

  const [textFilter, setTextFilter] = useState<string>('');

  const textFilteredResources = useMemo(() => {
    return dblResources.filter((resource) => {
      const filter = textFilter.toLowerCase();
      return (
        resource.displayName.toLowerCase().includes(filter) ||
        resource.fullName.toLowerCase().includes(filter) ||
        resource.bestLanguageName.toLowerCase().includes(filter)
      );
    });
  }, [dblResources, textFilter]);

  const [typeFilter, setTypeFilter] = useWebViewState<ResourceType[]>('typeFilter', ['DBL']);

  const typeOptions: TypeOptions[] = useMemo(() => {
    return [
      { type: 'DBL', localizedValue: typeDblText },
      { type: 'EnhancedResource', localizedValue: typeErText },
      { type: 'SourceLanguageResource', localizedValue: typeSlrText },
      { type: 'XmlResource', localizedValue: typeXrText },
    ];
  }, [typeDblText, typeErText, typeSlrText, typeXrText]);

  const typeFilterChangeHandler = (newType: ResourceType): void => {
    const prevTypeFilter: ResourceType[] = [...typeFilter];
    let newTypeFilter: ResourceType[] = [];

    if (!prevTypeFilter || prevTypeFilter.length === 0) {
      newTypeFilter = [newType];
    } else {
      newTypeFilter = prevTypeFilter.includes(newType)
        ? prevTypeFilter.filter((value) => value !== newType)
        : [...prevTypeFilter, newType];
    }
    setTypeFilter(newTypeFilter);
  };

  const textAndTypeFilteredResources = useMemo(() => {
    return textFilteredResources.filter((resource) => {
      return typeFilter.includes(resource.type);
    });
  }, [textFilteredResources, typeFilter]);

  const [languageFilter, setLanguageFilter] = useWebViewState<string[]>('languageFilter', []);

  useEffect(() => {
    if (languageFilter.length === 0) {
      setLanguageFilter(
        dblResources
          .filter((resource) => resource.installed === true)
          .map((resource) => resource.bestLanguageName),
      );
    }
  }, [dblResources, languageFilter.length, setLanguageFilter]);

  const languageFilterChangeHandler = (newLanguage: string): void => {
    const prevLanguageFilter: string[] = [...languageFilter];
    let newLanguageFilter: string[] = [];

    if (!prevLanguageFilter || prevLanguageFilter.length === 0) {
      newLanguageFilter = [newLanguage];
    } else {
      newLanguageFilter = prevLanguageFilter.includes(newLanguage)
        ? prevLanguageFilter.filter((value) => value !== newLanguage)
        : [...prevLanguageFilter, newLanguage];
    }
    setLanguageFilter(newLanguageFilter);
  };

  const textAndTypeAndLanguageFilteredResources = useMemo(() => {
    return textAndTypeFilteredResources.filter((resource) => {
      return languageFilter.includes(resource.bestLanguageName);
    });
  }, [languageFilter, textAndTypeFilteredResources]);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'bestLanguageName',
    direction: 'ascending',
  });

  const sortedResources = useMemo(() => {
    return [...textAndTypeAndLanguageFilteredResources].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [sortConfig.direction, sortConfig.key, textAndTypeAndLanguageFilteredResources]);

  const handleSort = (key: SortConfig['key']) => {
    const newSortConfig: SortConfig = { key, direction: 'ascending' };
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      newSortConfig.direction = 'descending';
    }
    setSortConfig(newSortConfig);
  };

  return (
    <Card className="tw-border-0 tw-rounded-none">
      <CardHeader>
        <div className="tw-flex tw-items-center">
          <BookOpen size={36} className="tw-mr-2" />
          <div>
            <CardTitle>{dialogTitleText}</CardTitle>
            <CardDescription className="tw-mt-1">{dialogSubtitleText}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoadingDblResources || !dblResources ? (
          <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
            <Label>{loadingResourcesText}</Label>
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="tw-flex tw-gap-1 tw-mb-1">
              <div className="tw-relative">
                <Input
                  type="text"
                  className="tw-min-w-72 tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-shadow-none tw-outline-none"
                  onChange={(event) => setTextFilter(event.target.value)}
                  value={textFilter}
                  placeholder={filterInputText}
                />
                <Search className="tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-text-muted-foreground" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Loader className="tw-w-4 tw-mr-2" />
                    {typeText}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {typeOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      checked={typeFilter.includes(option.type)}
                      onClick={(e) => {
                        e.preventDefault();
                        typeFilterChangeHandler(option.type);
                      }}
                    >
                      <span>{option.localizedValue}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <ComboBox
                className="tw-flex-shrink tw-min-w-10 tw-w-auto"
                buttonPlaceholder={languageText}
                // alwaysShowPlaceholderOnButton
                textPlaceholder={languageFilterText}
                value={languageFilter[0]}
                options={getLanguageOptions(dblResources, languageFilter)}
                onChange={languageFilterChangeHandler}
                // buttonIcon={<Languages className="tw-w-4" />}
                // hideChevrons
                // alignMenu="start"
                // keepOpen
              />
            </div>

            {sortedResources.length === 0 ? (
              <div className="tw-flex tw-w-full tw-justify-center tw-m-4">
                <Label>{noResultsText}</Label>
              </div>
            ) : (
              <Table stickyHeader>
                <TableHeader className="tw-bg-none" stickyHeader>
                  <TableRow>
                    <TableHead />
                    <TableHead />
                    <TableHead onClick={() => handleSort('fullName')}>
                      <div className="tw-flex tw-items-center">
                        {fullNameText}
                        {sortConfig.key !== 'fullName' && (
                          <ChevronsUpDown className="tw-pl-1" size={16} />
                        )}
                        {sortConfig.key === 'fullName' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ChevronUp className="tw-pl-1" size={16} />
                          ) : (
                            <ChevronDown className="tw-pl-1" size={16} />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort('bestLanguageName')}>
                      <div className="tw-flex tw-items-center">
                        {languageText}
                        {sortConfig.key !== 'bestLanguageName' && (
                          <ChevronsUpDown className="tw-pl-1" size={16} />
                        )}
                        {sortConfig.key === 'bestLanguageName' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ChevronUp className="tw-pl-1" size={16} />
                          ) : (
                            <ChevronDown className="tw-pl-1" size={16} />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead>{typeText}</TableHead>
                    <TableHead>{sizeText}</TableHead>
                    <TableHead>{actionText}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedResources.map((resource) => (
                    <TableRow key={resource.displayName + resource.fullName}>
                      <TableCell>
                        <BookOpen className="tw-pr-0" size={18} />
                      </TableCell>
                      <TableCell>{resource.displayName}</TableCell>
                      <TableCell className="tw-font-medium">{resource.fullName}</TableCell>
                      <TableCell>{resource.bestLanguageName}</TableCell>
                      <TableCell>
                        {typeOptions.find((type) => type.type === resource.type)?.localizedValue ??
                          typeUnknownText}
                      </TableCell>
                      <TableCell>{resource.size}</TableCell>
                      <TableCell>
                        <div className="tw-flex tw-justify-between">
                          {getActionContent(
                            resource,
                            installInfo.map((info) => info.dblEntryUid),
                            getText,
                            updateText,
                            installedText,
                            installOrRemoveResource,
                          )}
                          {resource.installed && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                  <Ellipsis className="tw-w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                <DropdownMenuItem
                                  onClick={() =>
                                    papi.commands.sendCommand(
                                      'platformScriptureEditor.openResourceViewer',
                                      resource.projectId,
                                    )
                                  }
                                >
                                  <span>{openText}</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    installOrRemoveResource(resource.dblEntryUid, 'remove')
                                  }
                                >
                                  <span>{removeText}</span>
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
      </CardContent>
    </Card>
  );
};
