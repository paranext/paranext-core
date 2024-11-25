import { useCallback, useMemo, useState } from 'react';
import {
  ProjectOptions,
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
import { ProjectSettingsContributionInfo } from '@shared/utils/project-settings-document-combiner';
import { Localized } from 'platform-bible-utils';
import ProjectOrOtherSettingsList from './settings-components/project-or-other-settings-list.component';

export const TAB_TYPE_SETTINGS_TAB = 'settings-tab';

type SettingsTabProps = {
  /** Optional project Id, when passed in, will only show settings for that project */
  projectIdToLimitSettings?: string;
};

export default function SettingsTab({ projectIdToLimitSettings }: SettingsTabProps) {
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
    useMemo(() => {
      return undefined;
    }, []),
  );

  const [filteredProjectSettingsContributions]: [
    Localized<ProjectSettingsContributionInfo['contributions']> | undefined,
    boolean,
  ] = usePromise(
    useCallback(async () => {
      if (!selectedSidebarItem.projectId) return undefined;

      const projectInterfacesFromProjectId = (
        await projectLookupService.getMetadataForProject(selectedSidebarItem.projectId)
      ).projectInterfaces;

      return (
        filterProjectSettingsContributionsByProjectInterfaces(
          projectSettingsContributions,
          projectInterfacesFromProjectId,
        ) || {}
      );
    }, [projectSettingsContributions, selectedSidebarItem]),
    useMemo(() => undefined, []),
  );

  const [allProjectIdsFromMetadata] = usePromise(
    useCallback(async () => {
      const allMetadata = await projectLookupService.getMetadataForAllProjects();
      return allMetadata.flatMap((metadata) => metadata.id);
    }, []),
    useMemo(() => [], []),
  );

  const projectNameCache: { [projectId: string]: string } = useMemo(() => {
    return {};
  }, []);

  const getProjectName = useCallback(
    async (projectIdToGetName: string) => {
      if (projectNameCache[projectIdToGetName]) {
        return projectNameCache[projectIdToGetName];
      }

      const pdp = await projectDataProviders.get('platform.base', projectIdToGetName);
      const projectName = await pdp.getSetting('platform.name');

      projectNameCache[projectIdToGetName] = projectName;

      return projectName;
    },
    [projectNameCache],
  );

  const [allProjectOptions]: [ProjectOptions[], boolean] = usePromise(
    useCallback(async () => {
      const projectOptions = await Promise.all(
        allProjectIdsFromMetadata.map(async (id) => ({
          projectId: id,
          projectName: await getProjectName(id),
        })),
      );
      return projectOptions;
    }, [allProjectIdsFromMetadata, getProjectName]),
    useMemo(() => [], []),
  );

  if (!settingsContributions) return <div className="settings-tab">No Settings</div>;
  if (isLoadingSettingsContributions || isLoadingProjectSettingsContributions)
    return <div className="settings-tab">Loading Settings</div>;

  const renderProjectSettingsList = (
    contributions: Localized<ProjectSettingsContributionInfo['contributions']>,
    projectId: string,
  ) => {
    if (!contributions) return undefined;

    return Object.entries(contributions).map(([, settingsGroups]) =>
      settingsGroups
        ? Object.entries(settingsGroups).map(([, settingsGroup]) => (
            <ProjectOrOtherSettingsList
              // key={settingsGroup.label}
              settingProperties={settingsGroup.properties}
              projectId={projectId}
              groupLabel={settingsGroup.label}
              groupDescription={settingsGroup.description}
              searchQuery={searchQuery}
            />
          ))
        : undefined,
    );
  };

  if (projectIdToLimitSettings) {
    // setSelectedSidebarItem({ label: '', projectId: projectIdToLimitSettings });

    return (
      <div className="settings-tab">
        {filteredProjectSettingsContributions
          ? renderProjectSettingsList(
              filteredProjectSettingsContributions,
              projectIdToLimitSettings,
            )
          : 'No settings'}
      </div>
    );
  }

  return (
    <div className="settings-tab">
      <div className="sidebar-container">
        <SettingsSidebarContentSearch
          extensionLabels={Object.keys(settingsContributions)}
          projectOptions={allProjectOptions}
          handleSelectSidebarItem={(key: string, projId?: string) =>
            setSelectedSidebarItem({ label: key, projectId: projId })
          }
          selectedSidebarItem={selectedSidebarItem}
          onSearch={handleSearchInput}
        >
          <div className="tw-space-y-4">
            {selectedSidebarItem.projectId && filteredProjectSettingsContributions
              ? renderProjectSettingsList(
                  filteredProjectSettingsContributions,
                  selectedSidebarItem.projectId,
                )
              : settingsContributions[selectedSidebarItem.label]?.map((group) => (
                  <ProjectOrOtherSettingsList
                    key={group.label}
                    groupLabel={group.label}
                    groupDescription={group.description}
                    settingProperties={group.properties}
                    searchQuery=""
                  />
                ))}
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

  // TODO project name in title ?
  const title = tabData.projectIdToLimitSettings ? 'Project Settings' : 'Settings';

  return {
    ...savedTabInfo,
    tabTitle: title,
    content: <SettingsTab projectIdToLimitSettings={tabData.projectIdToLimitSettings} />,
  };
};
