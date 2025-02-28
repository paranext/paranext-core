import { useCallback, useMemo, useState } from 'react';
import {
  SelectedSettingsSidebarItem,
  SettingsSidebarContentSearch,
  usePromise,
} from 'platform-bible-react';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import projectSettingsService, {
  filterProjectSettingsContributionsByProjectInterfaces,
} from '@shared/services/project-settings.service';
import settingsService from '@shared/services/settings.service';
import './settings-tab.component.scss';
import projectLookupService from '@shared/services/project-lookup.service';
import { projectDataProviders } from '@renderer/services/papi-frontend.service';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { formatReplacementString, Localized, LocalizeKey } from 'platform-bible-utils';
import { SettingsContributionInfo } from '@shared/utils/settings-document-combiner-base';
import { ProjectSettingsContributionInfo } from '@shared/utils/project-settings-document-combiner';
import ProjectOrOtherSettingsList from './settings-components/project-or-other-settings-list.component';

export const TAB_TYPE_SETTINGS_TAB = 'settings-tab';

type SettingsTabProps = {
  /** Optional project Id, when passed in, will only show settings for that project */
  projectIdToLimitSettings?: string;
};

async function getAllProjectIdsFromMetadata() {
  const allMetadata = await projectLookupService.getMetadataForAllProjects();
  return allMetadata.flatMap((metadata) => metadata.id);
}

async function getProjectName(projectIdToGetName: string) {
  const pdp = await projectDataProviders.get('platform.base', projectIdToGetName);
  const projectName = await pdp.getSetting('platform.name');

  return projectName;
}

const LOCALIZE_SETTING_KEYS: LocalizeKey[] = [
  '%settings_defaultMessage_loadingSettings%',
  '%settings_defaultMessage_noSettingsForThisProject%',
  '%settings_sidebar_extensionsLabel%',
  '%settings_sidebar_projectsLabel%',
  '%settings_sidebar_projectsComboBoxPlaceholder%',
  '%settings_defaultMessage_noSettings%',
  '%settings_defaultMessage_noSettingsFound%',
  '%settings_defaultMessage_noSettingsFoundDetails%',
];

const filterSettingsContributions = (
  contributions:
    | Localized<SettingsContributionInfo['contributions']>
    | Localized<ProjectSettingsContributionInfo['contributions']>
    | undefined,
  searchQuery: string,
) => {
  if (!contributions) return undefined;

  return Object.fromEntries(
    Object.entries(contributions).map(([key, groups]) => {
      if (!groups) return [key, undefined];

      const filteredGroups = groups.map((group) => {
        const filteredProperties = Object.fromEntries(
          Object.entries(group.properties).filter(([, property]) =>
            property.label.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        );

        return { ...group, properties: filteredProperties };
      });

      return [key, filteredGroups];
    }),
  );
};

export default function SettingsTab({ projectIdToLimitSettings }: SettingsTabProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZE_SETTING_KEYS, []));

  const [selectedSidebarItem, setSelectedSidebarItem] = useState<SelectedSettingsSidebarItem>({
    label: '',
    projectId: undefined,
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchInput = (newSearchTerm: string) => {
    setSearchQuery(newSearchTerm);
  };

  const [settingsContributions, isLoadingSettingsContributions] = usePromise(
    useCallback(async () => {
      const contributions = (await settingsService.getLocalizedSettingsContributionInfo())
        ?.contributions;
      if (!contributions) return undefined;

      // Filter out the extensions that do not have setting groups
      const filteredContributions = Object.fromEntries(
        Object.entries(contributions).filter(
          ([, settingsGroups]) => Array.isArray(settingsGroups) && settingsGroups.length > 0,
        ),
      );

      // Default selected item to the first settings tab
      setSelectedSidebarItem({
        label: Object.keys(filteredContributions)[0],
      });

      return filteredContributions;
    }, []),
    useMemo(() => undefined, []),
  );

  const matchedSettingsContributions = useMemo(
    () => filterSettingsContributions(settingsContributions, searchQuery),
    [searchQuery, settingsContributions],
  );

  const [projectSettingsContributions, isLoadingProjectSettingsContributions] = usePromise(
    useCallback(async () => {
      const contributions = (await projectSettingsService.getLocalizedContributionInfo())
        ?.contributions;
      if (!contributions) return undefined;

      // Filter out the projects that do not have setting groups
      return Object.fromEntries(
        Object.entries(contributions).filter(
          ([, projectSettingsGroups]) =>
            Array.isArray(projectSettingsGroups) && projectSettingsGroups.length > 0,
        ),
      );
    }, []),
    useMemo(() => undefined, []),
  );

  const [filteredProjectSettingsContributions, isLoadingFilteredProjectSettingsContributions] =
    usePromise(
      useCallback(async () => {
        if (!projectIdToLimitSettings && !selectedSidebarItem.projectId) return undefined;

        const projectId = projectIdToLimitSettings || selectedSidebarItem.projectId;

        const projectInterfacesFromProjectId =
          // We check for a valid projectId above
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          (await projectLookupService.getMetadataForProject(projectId!)).projectInterfaces;

        return filterProjectSettingsContributionsByProjectInterfaces(
          projectSettingsContributions,
          projectInterfacesFromProjectId,
        );
      }, [projectIdToLimitSettings, selectedSidebarItem.projectId, projectSettingsContributions]),
      useMemo(() => undefined, []),
    );

  const filteredAndMatchedProjectSettingsContributions = useMemo(
    () => filterSettingsContributions(filteredProjectSettingsContributions, searchQuery),
    [searchQuery, filteredProjectSettingsContributions],
  );

  const [allProjectOptions, isLoadingAllProjectOptions] = usePromise(
    useCallback(async () => {
      const allProjectIdsFromMetadata = await getAllProjectIdsFromMetadata();

      if (allProjectIdsFromMetadata.length === 0) {
        return [];
      }

      const projectOptions = await Promise.all(
        allProjectIdsFromMetadata.map(async (id) => ({
          projectId: id,
          projectName: await getProjectName(id),
        })),
      );
      return projectOptions;
    }, []),
    [],
  );

  const renderProjectSettingsList = useCallback(
    (projectId: string) => {
      if (!filteredAndMatchedProjectSettingsContributions)
        return <div>{localizedStrings['%settings_defaultMessage_noSettingsForThisProject%']}</div>;

      return Object.entries(filteredAndMatchedProjectSettingsContributions).flatMap(
        ([, settingsGroups]) =>
          settingsGroups
            ? Object.entries(settingsGroups).map(([, settingsGroup]) => (
                <ProjectOrOtherSettingsList
                  key={settingsGroup.label + projectId}
                  settingProperties={settingsGroup.properties}
                  projectId={projectId}
                  groupLabel={settingsGroup.label}
                  groupDescription={settingsGroup.description}
                  className="project-or-settings-list"
                />
              ))
            : [],
      );
    },
    [filteredAndMatchedProjectSettingsContributions, localizedStrings],
  );

  const showZeroResultsState = useMemo(() => {
    const contributions = selectedSidebarItem.projectId
      ? filteredAndMatchedProjectSettingsContributions
      : matchedSettingsContributions;

    if (!contributions) return true; // If contributions is undefined, show zero results

    // Check if any contribution has at least one property
    return !Object.values(contributions).some((groups) =>
      groups?.some((group) => Object.keys(group.properties).length > 0),
    );
  }, [
    filteredAndMatchedProjectSettingsContributions,
    matchedSettingsContributions,
    selectedSidebarItem.projectId,
  ]);

  if (projectIdToLimitSettings) {
    return (
      <div className="project-settings-tab">
        {filteredProjectSettingsContributions ? (
          renderProjectSettingsList(projectIdToLimitSettings)
        ) : (
          <div>{localizedStrings['%settings_defaultMessage_loadingSettings%']}</div>
        )}
      </div>
    );
  }

  if (
    isLoadingSettingsContributions ||
    isLoadingProjectSettingsContributions ||
    isLoadingAllProjectOptions ||
    isLoadingFilteredProjectSettingsContributions
  )
    return (
      <div className="settings-tab">
        {localizedStrings['%settings_defaultMessage_loadingSettings%']}
      </div>
    );

  if (!settingsContributions)
    return (
      <div className="settings-tab">{localizedStrings['%settings_defaultMessage_noSettings%']}</div>
    );

  return (
    <div className="settings-tab">
      <div className="sidebar-container">
        <SettingsSidebarContentSearch
          extensionLabels={Object.fromEntries(
            Object.entries(settingsContributions).map(([key, value]) => [
              key,
              value ? value[0].label : key,
            ]),
          )}
          projectInfo={allProjectOptions}
          handleSelectSidebarItem={(key: string, projId?: string) =>
            setSelectedSidebarItem({ label: key, projectId: projId })
          }
          selectedSidebarItem={selectedSidebarItem}
          searchValue={searchQuery}
          onSearch={handleSearchInput}
          extensionsSidebarGroupLabel={localizedStrings['%settings_sidebar_extensionsLabel%']}
          projectsSidebarGroupLabel={localizedStrings['%settings_sidebar_projectsLabel%']}
          buttonPlaceholderText={localizedStrings['%settings_sidebar_projectsComboBoxPlaceholder%']}
        >
          <div className="project-or-settings-list-container">
            {selectedSidebarItem.projectId
              ? renderProjectSettingsList(selectedSidebarItem.projectId)
              : matchedSettingsContributions &&
                matchedSettingsContributions[selectedSidebarItem.label]?.map((group) => (
                  <ProjectOrOtherSettingsList
                    key={group.label}
                    groupLabel={group.label}
                    groupDescription={group.description}
                    settingProperties={group.properties}
                    className="project-or-settings-list"
                  />
                ))}

            {showZeroResultsState && (
              <div className="zero-search-results">
                <span className="zero-search-results-title">
                  {localizedStrings['%settings_defaultMessage_noSettingsFound%']}
                </span>
                <span>
                  {formatReplacementString(
                    localizedStrings['%settings_defaultMessage_noSettingsFoundDetails%'],

                    {
                      query: searchQuery,
                    },
                  )}
                </span>
              </div>
            )}
          </div>
        </SettingsSidebarContentSearch>
      </div>
    </div>
  );
}

export type SettingsTabData = SettingsTabProps;

export const loadSettingsTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  // We use this type in the addTab function, but it doesn't know what data is here
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const tabData: SettingsTabData = savedTabInfo.data as SettingsTabData;

  const title = tabData.projectIdToLimitSettings
    ? '%settings_title_projectSettings%'
    : '%settings_title%';

  return {
    ...savedTabInfo,
    tabTitle: title,
    content: <SettingsTab projectIdToLimitSettings={tabData.projectIdToLimitSettings} />,
  };
};
