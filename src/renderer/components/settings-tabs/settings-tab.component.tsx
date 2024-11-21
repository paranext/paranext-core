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
import ProjectOrOtherSettingsList from './settings-components/project-or-other-settings-list.component';

export const TAB_TYPE_SETTINGS_TAB = 'settings-tab';

type SettingsTabProps = {
  /** Optional project Id, when passed in, will only show settings for that project */
  projectId?: string;
};

export default function SettingsTab({ projectId }: SettingsTabProps) {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<SelectedSettingsSidebarItem>();

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
      const filteredContributions = Object.fromEntries(
        Object.entries(contributions).filter(
          ([, projectSettingsGroups]) =>
            Array.isArray(projectSettingsGroups) && projectSettingsGroups.length > 0,
        ),
      );

      return filteredContributions;
    }, []),
    useMemo(() => {
      return undefined;
    }, []),
  );

  const [filteredProjectSettingsContributions] = usePromise(
    useCallback(async () => {
      if (!selectedSidebarItem || !selectedSidebarItem.projectId) return undefined;

      const projectInterfacesFromProjectId = (
        await projectLookupService.getMetadataForProject(selectedSidebarItem.projectId)
      ).projectInterfaces;

      const filteredContributionsByInterface =
        await filterProjectSettingsContributionsByProjectInterfaces(
          projectSettingsContributions,
          projectInterfacesFromProjectId,
        );

      return filteredContributionsByInterface;
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

  // TODO: fix
  if (projectId && filteredProjectSettingsContributions) {
    return (
      <div className="settings-tab">
        {Object.entries(filteredProjectSettingsContributions).map(
          ([, settingsGroups]) =>
            settingsGroups &&
            Object.entries(settingsGroups).map(([, settingsGroup]) => (
              <ProjectOrOtherSettingsList
                key={settingsGroup.label}
                settingProperties={settingsGroup.properties}
                projectId={projectId}
                groupLabel={settingsGroup.label}
                groupDescription={settingsGroup.description}
                searchQuery=""
              />
            )),
        )}
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
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {selectedSidebarItem?.projectId && filteredProjectSettingsContributions
            ? Object.entries(filteredProjectSettingsContributions).map(
                ([, settingsGroups]) =>
                  settingsGroups &&
                  Object.entries(settingsGroups).map(([, settingsGroup]) => (
                    <ProjectOrOtherSettingsList
                      key={settingsGroup.label}
                      settingProperties={settingsGroup.properties}
                      projectId={selectedSidebarItem?.projectId}
                      groupLabel={settingsGroup.label}
                      groupDescription={settingsGroup.description}
                      searchQuery=""
                    />
                  )),
              )
            : selectedSidebarItem?.label && settingsContributions
              ? settingsContributions[selectedSidebarItem.label]?.map((group) => (
                  <ProjectOrOtherSettingsList
                    key={group.label}
                    groupLabel={group.label}
                    groupDescription={group.description}
                    settingProperties={group.properties}
                    searchQuery=""
                  />
                ))
              : undefined}
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
  const title = tabData.projectId ? 'Project Settings' : 'Settings';

  return {
    ...savedTabInfo,
    tabTitle: title,
    content: <SettingsTab projectId={tabData.projectId} />,
  };
};
