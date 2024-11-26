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
// import { ProjectSettingsContributionInfo } from '@shared/utils/project-settings-document-combiner';
// import { Localized } from 'platform-bible-utils';
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
    useMemo(() => undefined, []),
  );

  const [filteredProjectSettingsContributions] = usePromise(
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

  const [allProjectOptions]: [ProjectOptions[], boolean] = usePromise(
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

  // const renderProjectSettingsList = (
  //   contributions: Localized<ProjectSettingsContributionInfo['contributions']> | undefined,
  //   projectId: string,
  // ) => {
  //   if (!contributions) return <div>No settings available for this project.</div>;

  //   return Object.entries(contributions).flatMap(([, settingsGroups]) =>
  //     settingsGroups
  //       ? Object.entries(settingsGroups).map(([, settingsGroup]) => (
  //           <ProjectOrOtherSettingsList
  //             key={settingsGroup.label}
  //             settingProperties={settingsGroup.properties}
  //             projectId={projectId}
  //             groupLabel={settingsGroup.label}
  //             groupDescription={settingsGroup.description}
  //             searchQuery={searchQuery}
  //           />
  //         ))
  //       : [],
  //   );
  // };

  const renderProjectSettingsList = useCallback(
    (projectId: string) => {
      if (!filteredProjectSettingsContributions)
        return <div>No settings available for this project.</div>;

      return Object.entries(filteredProjectSettingsContributions).flatMap(([, settingsGroups]) =>
        settingsGroups
          ? Object.entries(settingsGroups).map(([, settingsGroup]) => (
              <ProjectOrOtherSettingsList
                key={settingsGroup.label}
                settingProperties={settingsGroup.properties}
                projectId={projectId}
                groupLabel={settingsGroup.label}
                groupDescription={settingsGroup.description}
                searchQuery={searchQuery}
              />
            ))
          : [],
      );
    },
    [filteredProjectSettingsContributions, searchQuery],
  );

  if (projectIdToLimitSettings) {
    return (
      <div className="project-settings-tab">
        {filteredProjectSettingsContributions ? (
          renderProjectSettingsList(projectIdToLimitSettings)
        ) : (
          <div>Loading settings...</div>
        )}
      </div>
    );
  }

  if (isLoadingSettingsContributions || isLoadingProjectSettingsContributions)
    return <div className="settings-tab">Loading Settings</div>;

  if (!settingsContributions) return <div className="settings-tab">No Settings</div>;

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
            {selectedSidebarItem.projectId
              ? renderProjectSettingsList(selectedSidebarItem.projectId)
              : settingsContributions[selectedSidebarItem.label]?.map((group) => (
                  <ProjectOrOtherSettingsList
                    key={group.label}
                    groupLabel={group.label}
                    groupDescription={group.description}
                    settingProperties={group.properties}
                    searchQuery={searchQuery}
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

  const title = tabData.projectIdToLimitSettings ? 'Project Settings' : 'Settings';

  return {
    ...savedTabInfo,
    tabTitle: title,
    content: <SettingsTab projectIdToLimitSettings={tabData.projectIdToLimitSettings} />,
  };
};
