import ComboBox from '@/components/basics/combo-box.component';
import Spinner from '@/components/basics/spinner.component';
import { Button } from '@/components/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import {
  BookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Ellipsis,
  Loader,
  Search,
} from 'lucide-react';

import {
  DblResourceData,
  getErrorMessage,
  LanguageStrings,
  LocalizeKey,
  ResourceType,
} from 'platform-bible-utils';
import { useEffect, useMemo, useState } from 'react';

export const FILTERABLE_RESOURCE_LIST_STRING_KEYS: LocalizeKey[] = [
  '%resources_action%',
  '%resources_dialog_subtitle%',
  '%resources_dialog_title%',
  '%resources_filterInput%',
  '%resources_fullName%',
  '%resources_get%',
  '%resources_installed%',
  '%resources_language%',
  '%resources_languageFilter%',
  '%resources_loadingResources%',
  '%resources_noResults%',
  '%resources_open%',
  '%resources_remove%',
  '%resources_size%',
  '%resources_type%',
  '%resources_type_DBL%',
  '%resources_type_ER%',
  '%resources_type_SLR%',
  '%resources_type_XR%',
  '%resources_type_unknown%',
  '%resources_update%',
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
  return <Label className="tw-my-2 tw-flex tw-h-6 tw-items-center">{installedText}</Label>;
};

type FilterableResourceListProps = {
  localizedStrings: LanguageStrings;
  dblResources: DblResourceData[];
  isLoadingDblResources: boolean;
  typeFilter: ResourceType[];
  setTypeFilter: (stateValue: ResourceType[]) => void;
  languageFilter: string[];
  setLanguageFilter: (stateValue: string[]) => void;
  openResource: (projectId: string) => void;
  installResource: ((uid: string) => Promise<void>) | undefined;
  uninstallResource: ((uid: string) => Promise<void>) | undefined;
};

function FilterableResourceList({
  localizedStrings,
  dblResources,
  isLoadingDblResources,
  typeFilter,
  setTypeFilter,
  languageFilter,
  setLanguageFilter,
  openResource,
  installResource,
  uninstallResource,
}: FilterableResourceListProps) {
  const actionText: string = localizedStrings['%resources_action%'];
  const dialogSubtitleText: string = localizedStrings['%resources_dialog_subtitle%'];
  const dialogTitleText: string = localizedStrings['%resources_dialog_title%'];
  const filterInputText: string = localizedStrings['%resources_filterInput%'];
  const fullNameText: string = localizedStrings['%resources_fullName%'];
  const getText: string = localizedStrings['%resources_get%'];
  const installedText: string = localizedStrings['%resources_installed%'];
  const languageText: string = localizedStrings['%resources_language%'];
  const languageFilterText: string = localizedStrings['%resources_languageFilter%'];
  const loadingResourcesText: string = localizedStrings['%resources_loadingResources%'];
  const noResultsText: string = localizedStrings['%resources_noResults%'];
  const openText: string = localizedStrings['%resources_open%'];
  const removeText: string = localizedStrings['%resources_remove%'];
  const sizeText: string = localizedStrings['%resources_size%'];
  const typeText: string = localizedStrings['%resources_type%'];
  const typeDblText: string = localizedStrings['%resources_type_DBL%'];
  const typeErText: string = localizedStrings['%resources_type_ER%'];
  const typeSlrText: string = localizedStrings['%resources_type_SLR%'];
  const typeXrText: string = localizedStrings['%resources_type_XR%'];
  const typeUnknownText: string = localizedStrings['%resources_type_unknown%'];
  const updateText: string = localizedStrings['%resources_update%'];

  const [installInfo, setInstallInfo] = useState<InstallInfo[]>([]);

  const installOrRemoveResource = (dblEntryUid: string, action: 'install' | 'remove'): void => {
    if (!installResource || !uninstallResource) return;
    const newInstallInfo: InstallInfo = {
      dblEntryUid,
      action: action === 'install' ? 'installing' : 'removing',
    };

    setInstallInfo((prevInfo) => [...prevInfo, newInstallInfo]);

    const actionFunction = action === 'install' ? installResource : uninstallResource;

    actionFunction(dblEntryUid).catch((error) => {
      console.debug(getErrorMessage(error));
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

  const typeOptions: TypeOptions[] = useMemo(() => {
    return [
      { type: 'DBLResource', localizedValue: typeDblText },
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
    <Card className="tw-rounded-none tw-border-0">
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
            <div className="tw-mb-1 tw-flex tw-gap-1">
              <div className="tw-relative">
                <Input
                  type="text"
                  className="tw-box-border tw-min-w-72 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-shadow-none tw-outline-none"
                  onChange={(event) => setTextFilter(event.target.value)}
                  value={textFilter}
                  placeholder={filterInputText}
                />
                <Search className="tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-text-muted-foreground" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Loader className="tw-mr-2 tw-w-4" />
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
                className="tw-w-auto tw-min-w-10 tw-flex-shrink"
                buttonPlaceholder={languageText}
                textPlaceholder={languageFilterText}
                value={languageFilter[0]}
                options={getLanguageOptions(dblResources, languageFilter)}
                onChange={languageFilterChangeHandler}
              />
            </div>

            {sortedResources.length === 0 ? (
              <div className="tw-m-4 tw-flex tw-w-full tw-justify-center">
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
                                <DropdownMenuItem onClick={() => openResource(resource.projectId)}>
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
}

export default FilterableResourceList;
