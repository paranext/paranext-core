import Spinner from '@/components/basics/spinner.component';
import { Button } from '@/components/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import {
  BookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Ellipsis,
  Globe,
  Shapes,
} from 'lucide-react';

import Filter from '@/components/advanced/filter.component';
import type { MultiSelectComboBoxEntry } from '@/components/advanced/multi-select-combo-box.component';
import { DblResourceData, getErrorMessage } from 'platform-bible-utils';
import { useEffect, useMemo, useState } from 'react';
import SearchBar from '@/components/basics/search-bar.component';
import resourceExamples from './resource-examples';

type InstallInfo = {
  dblEntryUid: string;
  action: 'installing' | 'removing';
};

type SortConfig = {
  key: 'fullName' | 'bestLanguageName' | 'type' | 'size' | 'action';
  direction: 'ascending' | 'descending';
};

const getLanguageOptions = (
  resources: DblResourceData[],
  selectedLanguages: string[],
): MultiSelectComboBoxEntry[] => {
  const allLanguages: string[] = Array.from(
    new Set(
      resources.map((resource) => {
        return resource.bestLanguageName;
      }),
    ),
  );

  const starredLanguages = new Set(
    resources.filter((resource) => resource.installed).map((resource) => resource.bestLanguageName),
  );

  const prioritizedLanguages = new Set(selectedLanguages.concat(Array.from(starredLanguages)));

  const sortedLanguages = allLanguages.sort((a, b) => {
    const aIsPrioritized = prioritizedLanguages.has(a);
    const bIsPrioritized = prioritizedLanguages.has(b);

    if (aIsPrioritized && bIsPrioritized) {
      return a.localeCompare(b);
    }
    if (aIsPrioritized) return -1;
    if (bIsPrioritized) return 1;

    return a.localeCompare(b);
  });

  return sortedLanguages.map((language) => {
    return { label: language, value: language, starred: starredLanguages.has(language) };
  });
};

const getActionButtonContent = (
  resource: DblResourceData,
  buttonText: string,
  installResource: (dblEntryUid: string, action: 'install' | 'remove') => void,
) => {
  return (
    <Button
      className="tw-bg-muted"
      variant="ghost"
      onClick={() => installResource(resource.dblEntryUid, 'install')}
    >
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
      <Button className="tw-bg-muted" variant="ghost">
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

const resources = resourceExamples;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const installResource = async (_uid: string) => {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const uninstallResource = async (_uid: string) => {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const openResource = (_id: string) => {};

function GetResourcesExamples() {
  const actionText: string = 'Action';
  const anyText: string = 'Any';
  const dialogSubtitleText: string = 'Add resources to Home';
  const dialogTitleText: string = 'Get Resources';
  const filterInputText: string = 'Filter by';
  const filterByText: string = 'Search by name; language; type';
  const fullNameText: string = 'Full Name';
  const getText: string = 'Get';
  const installedText: string = 'Installed';
  const languageText: string = 'Language';
  const languagesText: string = 'Languages';
  const loadingText: string = 'Loading resources...';
  const noResultsText: string = 'No results found';
  const openText: string = 'Open';
  const removeText: string = 'Remove';
  const resultsText: string = 'results';
  const showingText: string = 'Showing';
  const sizeText: string = 'Size';
  const typeText: string = 'Type';
  const typesText: string = 'Types';
  const typeScriptureText: string = 'Scripture Resource';
  const typeErText: string = 'Enhanced Resource';
  const typeSlrText: string = 'Source Language Text';
  const typeXrText: string = 'XML Resource';
  const typeUnknownText: string = 'Unknown resource type';
  const updateText: string = 'Update';

  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>(['ScriptureResource']);

  // When no languages are selected on the first render of this component, set default selection to
  // languages that have resources installed
  useEffect(() => {
    if (isInitialized) return;
    if (selectedLanguages.length > 0) {
      setIsInitialized(true);
      return;
    }
    if (resources.length > 0 && selectedLanguages.length === 0) {
      setSelectedLanguages(
        Array.from(
          new Set(
            resources
              .filter((resource) => resource.installed === true)
              .map((resource) => resource.bestLanguageName),
          ),
        ),
      );
      setIsInitialized(true);
    }
  }, [selectedLanguages.length, setSelectedLanguages, isInitialized, setIsInitialized]);

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
        const resource = resources.find((res) => res.dblEntryUid === info.dblEntryUid);

        if (!resource) return true;

        if (info.action === 'installing' && resource.installed) return false;
        if (info.action === 'removing' && !resource.installed) return false;

        return true;
      }),
    );
  }, []);

  const [textFilter, setTextFilter] = useState<string>('');

  const textFilteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const filter = textFilter.toLowerCase();
      return (
        resource.displayName.toLowerCase().includes(filter) ||
        resource.fullName.toLowerCase().includes(filter) ||
        resource.bestLanguageName.toLowerCase().includes(filter)
      );
    });
  }, [textFilter]);

  const typeOptions: MultiSelectComboBoxEntry[] = useMemo(() => {
    return [
      { value: 'ScriptureResource', label: typeScriptureText },
      { value: 'EnhancedResource', label: typeErText },
      { value: 'SourceLanguageResource', label: typeSlrText },
      { value: 'XmlResource', label: typeXrText },
    ];
  }, [typeScriptureText, typeErText, typeSlrText, typeXrText]);

  const textAndTypeFilteredResources = useMemo(() => {
    if (selectedTypes.length === 0) return textFilteredResources;
    return textFilteredResources.filter((resource) => {
      return selectedTypes.includes(resource.type);
    });
  }, [textFilteredResources, selectedTypes]);

  const textAndTypeAndLanguageFilteredResources = useMemo(() => {
    if (selectedLanguages.length === 0) return textAndTypeFilteredResources;
    return textAndTypeFilteredResources.filter((resource) => {
      return selectedLanguages.includes(resource.bestLanguageName);
    });
  }, [selectedLanguages, textAndTypeFilteredResources]);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'bestLanguageName',
    direction: 'ascending',
  });

  const sortedResources = useMemo(() => {
    return [...textAndTypeAndLanguageFilteredResources].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;
      if (sortConfig.key === 'action') {
        aValue = (a.installed ? 10 : 0) + (a.updateAvailable ? 1 : 0);
        bValue = (b.installed ? 10 : 0) + (b.updateAvailable ? 1 : 0);
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

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

  const getTypeCount = (option: MultiSelectComboBoxEntry): number => {
    return resources.filter((resource) => resource.type === option.value).length ?? 0;
  };

  const getLanguageCount = (option: MultiSelectComboBoxEntry): number => {
    return resources.filter((resource) => resource.bestLanguageName === option.value).length ?? 0;
  };

  return (
    <div>
      <Card className="tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-border-0">
        <CardHeader className="tw-flex-shrink-0">
          <div className="tw-flex">
            <div className="tw-flex tw-items-center tw-pr-4">
              <BookOpen size={36} className="tw-me-4" />
              <div className="tw-flex tw-flex-col tw-gap-2">
                <CardTitle>{dialogTitleText}</CardTitle>
                <CardDescription className="tw-mt-1">{dialogSubtitleText}</CardDescription>
                <SearchBar
                  value={textFilter}
                  className="tw-min-w-72"
                  onSearch={setTextFilter}
                  placeholder={filterInputText}
                />
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              <Label className="tw-mb-2 tw-text-muted-foreground">{filterByText}</Label>
              <Filter
                entries={typeOptions}
                getEntriesCount={getTypeCount}
                selected={selectedTypes}
                onChange={setSelectedTypes}
                placeholder={typesText}
                icon={<Shapes />}
                badgesPlaceholder={anyText}
              />

              <Filter
                entries={getLanguageOptions(resources, selectedLanguages)}
                getEntriesCount={getLanguageCount}
                selected={selectedLanguages}
                onChange={setSelectedLanguages}
                placeholder={languagesText}
                sortSelected
                icon={<Globe />}
                badgesPlaceholder={anyText}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="tw-flex-grow tw-overflow-auto">
          {!resources ? (
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
              <Label>{loadingText}</Label>
              <Spinner />
            </div>
          ) : (
            <div>
              {sortedResources.length === 0 ? (
                <div className="tw-m-4 tw-flex tw-justify-center">
                  <Label>{noResultsText}</Label>
                </div>
              ) : (
                <Table stickyHeader>
                  <TableHeader className="tw-bg-none" stickyHeader>
                    <TableRow>
                      <TableHead />
                      <TableHead />
                      {buildTableHead('fullName', fullNameText)}
                      {buildTableHead('bestLanguageName', languageText)}
                      {buildTableHead('type', typeText)}
                      {buildTableHead('size', sizeText)}
                      {buildTableHead('action', actionText)}
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
                          {typeOptions.find((type) => type.value === resource.type)?.label ??
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
                                    onClick={() => openResource(resource.projectId)}
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
        <CardFooter className="tw-flex-shrink-0 tw-justify-center tw-border-t tw-p-4">
          {sortedResources.length > 0 && (
            <Label className="tw-font-normal">{`${showingText} ${sortedResources.length} ${resultsText}`}</Label>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default GetResourcesExamples;
