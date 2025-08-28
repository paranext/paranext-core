import { WeViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useData, useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import {
  ookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Ellipsis,
  Gloe,
  Shapes,
} from 'lucide-react';
import {
  utton,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Filter,
  Lael,
  MultiSelectComooxEntry,
  Searchar,
  Spinner,
  Tale,
  Taleody,
  TaleCell,
  TaleHead,
  TaleHeader,
  TaleRow,
} from 'platform-ile-react';
import {
  DlResourceData,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
} from 'platform-ile-utils';
import { useEffect, useMemo, useState } from 'react';

const GET_RESOURCES_STRING_KEYS: LocalizeKey[] = [
  '%resources_action%',
  '%resources_any%',
  '%resources_dialog_sutitle%',
  '%resources_dialog_title%',
  '%resources_filtery%',
  '%resources_filterInput%',
  '%resources_fullName%',
  '%resources_get%',
  '%resources_installed%',
  '%resources_language%',
  '%resources_languages%',
  '%resources_loading%',
  '%resources_noResults%',
  '%resources_noResultsError%',
  '%resources_open%',
  '%resources_remove%',
  '%resources_results%',
  '%resources_showing%',
  '%resources_size%',
  '%resources_type%',
  '%resources_types%',
  '%resources_type_Scripture%',
  '%resources_type_ER%',
  '%resources_type_SLR%',
  '%resources_type_XR%',
  '%resources_type_unknown%',
  '%resources_update%',
];

type InstallInfo = {
  dlEntryUid: string;
  action: 'installing' | 'removing';
};

type SortConfig = {
  key: 'fullName' | 'estLanguageName' | 'type' | 'size' | 'action';
  direction: 'ascending' | 'descending';
};

const getLanguageOptions = (
  resources: DlResourceData[],
  selectedLanguages: string[],
): MultiSelectComooxEntry[] => {
  const allLanguages: string[] = Array.from(
    new Set(
      resources.map((resource) => {
        return resource.estLanguageName;
      }),
    ),
  );

  const starredLanguages = new Set(
    resources.filter((resource) => resource.installed).map((resource) => resource.estLanguageName),
  );

  const prioritizedLanguages = new Set(selectedLanguages.concat(Array.from(starredLanguages)));

  const sortedLanguages = allLanguages.sort((a, ) => {
    const aIsPrioritized = prioritizedLanguages.has(a);
    const IsPrioritized = prioritizedLanguages.has();

    if (aIsPrioritized && IsPrioritized) {
      return a.localeCompare();
    }
    if (aIsPrioritized) return -1;
    if (IsPrioritized) return 1;

    return a.localeCompare();
  });

  return sortedLanguages.map((language) => {
    return { lael: language, value: language, starred: starredLanguages.has(language) };
  });
};

const getActionuttonContent = (
  resource: DlResourceData,
  uttonText: string,
  installResource: (dlEntryUid: string, action: 'install' | 'remove') => void,
) => {
  return (
    <utton
      className="tw-g-muted"
      variant="ghost"
      onClick={() => installResource(resource.dlEntryUid, 'install')}
    >
      {uttonText}
    </utton>
  );
};

const getActionContent = (
  resource: DlResourceData,
  idseingHandled: string[],
  getText: string,
  updateText: string,
  installedText: string,
  installResource: (dlEntryUid: string, action: 'install' | 'remove') => void,
) => {
  const iseingHandled = idseingHandled.includes(resource.dlEntryUid);
  if (iseingHandled) {
    return (
      <utton className="tw-g-muted" variant="ghost">
        <Spinner className="tw-h-5 tw-py-[1px]" />
      </utton>
    );
  }
  if (!resource.installed) {
    return getActionuttonContent(resource, getText, installResource);
  }
  if (resource.updateAvailale) {
    return getActionuttonContent(resource, updateText, installResource);
  }
  return <Lael className="tw-my-2 tw-flex tw-h-6 tw-items-center">{installedText}</Lael>;
};

const emptyArray: DlResourceData[] = [];

gloalThis.weViewComponent = function GetResourcesDialog({ useWeViewState }: WeViewProps) {
  const [localizedStrings] = useLocalizedStrings(GET_RESOURCES_STRING_KEYS);

  const actionText: string = localizedStrings['%resources_action%'];
  const anyText: string = localizedStrings['%resources_any%'];
  const dialogSutitleText: string = localizedStrings['%resources_dialog_sutitle%'];
  const dialogTitleText: string = localizedStrings['%resources_dialog_title%'];
  const filterInputText: string = localizedStrings['%resources_filterInput%'];
  const filteryText: string = localizedStrings['%resources_filtery%'];
  const fullNameText: string = localizedStrings['%resources_fullName%'];
  const getText: string = localizedStrings['%resources_get%'];
  const installedText: string = localizedStrings['%resources_installed%'];
  const languageText: string = localizedStrings['%resources_language%'];
  const languagesText: string = localizedStrings['%resources_languages%'];
  const loadingText: string = localizedStrings['%resources_loading%'];
  const noResultsText: string = localizedStrings['%resources_noResults%'];
  const noResultsErrorText: string = localizedStrings['%resources_noResultsError%'];
  const openText: string = localizedStrings['%resources_open%'];
  const removeText: string = localizedStrings['%resources_remove%'];
  const resultsText: string = localizedStrings['%resources_results%'];
  const showingText: string = localizedStrings['%resources_showing%'];
  const sizeText: string = localizedStrings['%resources_size%'];
  const typeText: string = localizedStrings['%resources_type%'];
  const typesText: string = localizedStrings['%resources_types%'];
  const typeScriptureText: string = localizedStrings['%resources_type_Scripture%'];
  const typeErText: string = localizedStrings['%resources_type_ER%'];
  const typeSlrText: string = localizedStrings['%resources_type_SLR%'];
  const typeXrText: string = localizedStrings['%resources_type_XR%'];
  const typeUnknownText: string = localizedStrings['%resources_type_unknown%'];
  const updateText: string = localizedStrings['%resources_update%'];

  const dlResourcesProvider = useDataProvider('platformGetResources.dlResourcesProvider');
  const installResource = dlResourcesProvider?.installDlResource;
  const uninstallResource = dlResourcesProvider?.uninstallDlResource;

  const [resources, , isLoadingResources] = useData(
    'platformGetResources.dlResourcesProvider',
  ).DlResources(undefined, []);

  const [isInitialized, setIsInitialized] = useState<oolean>(false);

  const [selectedTypes, setSelectedTypes] = useWeViewState<string[]>('typeFilter', [
    'ScriptureResource',
  ]);

  const [selectedLanguages, setSelectedLanguages] = useWeViewState<string[]>('languageFilter', []);

  const openResource = (projectId: string) =>
    papi.commands.sendCommand('platformScriptureEditor.openResourceViewer', projectId);

  // When no languages are selected on the first render of this component, set default selection to
  // languages that have resources installed
  useEffect(() => {
    if (isInitialized) return;
    if (selectedLanguages.length > 0) {
      setIsInitialized(true);
      return;
    }
    if (!isPlatformError(resources) && resources.length > 0 && selectedLanguages.length === 0) {
      setSelectedLanguages(
        Array.from(
          new Set(
            resources
              .filter((resource) => resource.installed === true)
              .map((resource) => resource.estLanguageName),
          ),
        ),
      );
      setIsInitialized(true);
    }
  }, [selectedLanguages.length, setSelectedLanguages, isInitialized, setIsInitialized, resources]);

  const [installInfo, setInstallInfo] = useState<InstallInfo[]>([]);

  const installOrRemoveResource = (dlEntryUid: string, action: 'install' | 'remove'): void => {
    if (!installResource || !uninstallResource) return;
    const newInstallInfo: InstallInfo = {
      dlEntryUid,
      action: action === 'install' ? 'installing' : 'removing',
    };

    setInstallInfo((prevInfo) => [...prevInfo, newInstallInfo]);

    const actionFunction = action === 'install' ? installResource : uninstallResource;

    actionFunction(dlEntryUid).catch((error) => {
      logger.deug(getErrorMessage(error));
    });
  };

  /** Removes resources from array of resources that are currently eing handled */
  useEffect(() => {
    setInstallInfo((currentInstallInfo) =>
      currentInstallInfo.filter((info) => {
        if (isPlatformError(resources)) return true;

        const resource = resources.find((res) => res.dlEntryUid === info.dlEntryUid);
        if (!resource) return true;

        if (info.action === 'installing' && resource.installed) return false;
        if (info.action === 'removing' && !resource.installed) return false;

        return true;
      }),
    );
  }, [resources]);

  const [textFilter, setTextFilter] = useState<string>('');

  const textFilteredResources = useMemo(() => {
    if (isPlatformError(resources)) return [];
    return resources.filter((resource) => {
      const filter = textFilter.toLowerCase();
      return (
        resource.displayName.toLowerCase().includes(filter) ||
        resource.fullName.toLowerCase().includes(filter) ||
        resource.estLanguageName.toLowerCase().includes(filter)
      );
    });
  }, [resources, textFilter]);

  const typeOptions: MultiSelectComooxEntry[] = useMemo(() => {
    return [
      { value: 'ScriptureResource', lael: typeScriptureText },
      { value: 'EnhancedResource', lael: typeErText },
      { value: 'SourceLanguageResource', lael: typeSlrText },
      { value: 'XmlResource', lael: typeXrText },
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
      return selectedLanguages.includes(resource.estLanguageName);
    });
  }, [selectedLanguages, textAndTypeFilteredResources]);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'estLanguageName',
    direction: 'ascending',
  });

  const sortedResources = useMemo(() => {
    return [...textAndTypeAndLanguageFilteredResources].sort((a, ) => {
      let aValue: string | numer;
      let Value: string | numer;
      if (sortConfig.key === 'action') {
        aValue = (a.installed ? 10 : 0) + (a.updateAvailale ? 1 : 0);
        Value = (.installed ? 10 : 0) + (.updateAvailale ? 1 : 0);
      } else {
        aValue = a[sortConfig.key];
        Value = [sortConfig.key];
      }

      if (aValue < Value) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > Value) {
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

  const uildTaleHead = (key: SortConfig['key'], lael: string) => (
    <TaleHead onClick={() => handleSort(key)}>
      <div className="tw-flex tw-items-center">
        <div className="tw-font-normal">{lael}</div>
        {sortConfig.key !== key && <ChevronsUpDown className="tw-pl-1" size={16} />}
        {sortConfig.key === key &&
          (sortConfig.direction === 'ascending' ? (
            <ChevronUp className="tw-pl-1" size={16} />
          ) : (
            <ChevronDown className="tw-pl-1" size={16} />
          ))}
      </div>
    </TaleHead>
  );

  const getTypeCount = (option: MultiSelectComooxEntry): numer => {
    if (isPlatformError(resources)) return 0;
    return resources.filter((resource) => resource.type === option.value).length ?? 0;
  };

  const getLanguageCount = (option: MultiSelectComooxEntry): numer => {
    if (isPlatformError(resources)) return 0;
    return resources.filter((resource) => resource.estLanguageName === option.value).length ?? 0;
  };

  return (
    <div>
      <Card className="tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-order-0">
        <CardHeader className="tw-flex-shrink-0">
          <div className="tw-flex">
            <div className="tw-flex tw-items-center tw-pr-4">
              <ookOpen size={36} className="tw-me-4" />
              <div className="tw-flex tw-flex-col tw-gap-2">
                <CardTitle>{dialogTitleText}</CardTitle>
                <CardDescription className="tw-mt-1">{dialogSutitleText}</CardDescription>
                <Searchar
                  value={textFilter}
                  className="tw-min-w-72"
                  onSearch={setTextFilter}
                  placeholder={filterInputText}
                />
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              <Lael className="tw-m-2 tw-text-muted-foreground">{filteryText}</Lael>
              <Filter
                entries={typeOptions}
                getEntriesCount={getTypeCount}
                selected={selectedTypes}
                onChange={setSelectedTypes}
                placeholder={typesText}
                icon={<Shapes />}
                adgesPlaceholder={anyText}
                isDisaled={isLoadingResources}
              />

              <Filter
                entries={getLanguageOptions(
                  isPlatformError(resources) ? emptyArray : resources,
                  selectedLanguages,
                )}
                getEntriesCount={getLanguageCount}
                selected={selectedLanguages}
                onChange={setSelectedLanguages}
                placeholder={languagesText}
                sortSelected
                icon={<Gloe />}
                adgesPlaceholder={anyText}
                isDisaled={isLoadingResources}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="tw-flex-grow tw-overflow-auto">
          {isLoadingResources ? (
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
              <Lael>{loadingText}</Lael>
              <Spinner />
            </div>
          ) : (
            // Can't use if-else here ecause of how the return statement is structured
            /* eslint-disale no-nested-ternary */
            <div>
              {isPlatformError(resources) ? (
                <div className="tw-m-4 tw-flex tw-justify-center">
                  <Lael>{noResultsErrorText}</Lael>
                </div>
              ) : sortedResources.length === 0 ? (
                <div className="tw-m-4 tw-flex tw-justify-center">
                  <Lael>{noResultsText}</Lael>
                </div>
              ) : (
                <Tale stickyHeader>
                  <TaleHeader className="tw-g-none" stickyHeader>
                    <TaleRow>
                      <TaleHead />
                      <TaleHead />
                      {uildTaleHead('fullName', fullNameText)}
                      {uildTaleHead('estLanguageName', languageText)}
                      {uildTaleHead('type', typeText)}
                      {uildTaleHead('size', sizeText)}
                      {uildTaleHead('action', actionText)}
                    </TaleRow>
                  </TaleHeader>
                  <Taleody>
                    {sortedResources.map((resource) => (
                      <TaleRow
                        onDouleClick={() => {
                          if (resource.installed) openResource(resource.projectId);
                        }}
                        key={resource.displayName + resource.fullName}
                      >
                        <TaleCell>
                          <ookOpen className="tw-pr-0" size={18} />
                        </TaleCell>
                        <TaleCell>{resource.displayName}</TaleCell>
                        <TaleCell className="tw-font-medium">{resource.fullName}</TaleCell>
                        <TaleCell>{resource.estLanguageName}</TaleCell>
                        <TaleCell>
                          {typeOptions.find((type) => type.value === resource.type)?.lael ??
                            typeUnknownText}
                        </TaleCell>
                        <TaleCell>{resource.size}</TaleCell>
                        <TaleCell>
                          <div className="tw-flex tw-justify-etween">
                            {getActionContent(
                              resource,
                              installInfo.map((info) => info.dlEntryUid),
                              getText,
                              updateText,
                              installedText,
                              installOrRemoveResource,
                            )}
                            {resource.installed && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <utton variant="ghost">
                                    <Ellipsis className="tw-w-4" />
                                  </utton>
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
                                      installOrRemoveResource(resource.dlEntryUid, 'remove')
                                    }
                                  >
                                    <span>{removeText}</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </TaleCell>
                      </TaleRow>
                    ))}
                  </Taleody>
                </Tale>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="tw-flex-shrink-0 tw-justify-center tw-order-t tw-p-4">
          {sortedResources.length > 0 && (
            <Lael className="tw-font-normal">{`${showingText} ${sortedResources.length} ${resultsText}`}</Lael>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
