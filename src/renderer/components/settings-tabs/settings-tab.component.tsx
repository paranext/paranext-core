import { useCallback, useMemo, useState } from 'react';
import { SettingsSidebarContentSearch, usePromise } from 'platform-bible-react';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import projectSettingsService from '@shared/services/project-settings.service';
import settingsService from '@shared/services/settings.service';
// import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import ProjectOrUserSettingsList from './settings-components/project-or-user-settings-list.component';
import './settings-tab.component.scss';

export const TAB_TYPE_SETTINGS_TAB = 'settings-tab';

type SettingsTabProps = {
  /** Optional project Id, when passed in, will only show settings for that project */
  projectId?: string;
  /** Optional setting key, when passed in, will scroll to that selected setting in the dialog */
  // settingKey?: string;
};

type SelectedSidebarItem = {
  label: string;
  isProjectSetting: boolean;
};

export default function SettingsTab({ projectId }: SettingsTabProps) {
  // const searchProjectSettingsKey = '%settings_defaultSearchText_searchProject%';
  // const searchUserSettingsKey = '%settings_defaultSearchText_searchUserSettings%';
  // const [localizedStrings] = useLocalizedStrings(
  //   useMemo(() => [searchProjectSettingsKey, searchUserSettingsKey], []),
  // );
  // const localizedSearchProjectSettings = localizedStrings[searchProjectSettingsKey];
  // const localizedSearchUserSettings = localizedStrings[searchUserSettingsKey];
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<SelectedSidebarItem>();

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
        isProjectSetting: false,
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

  // const getFilteredProjectSettingKeys = useMemo(() => {
  //   const objectKeys = Object.keys(projectSettingsContributions);

  //   objectKeys.filter((key) => );
  // }, []);

  // const getProjectSettingLabels = () => {
  //   if (!projectSettingsContributions) return;

  //   const projectContributionKeysAndLabels: { [projectName: string]: string } = {};

  //   Object.entries(projectSettingsContributions).map(
  //     ([projectName, settingsGroups]) =>
  //       settingsGroups &&
  //       Object.entries(settingsGroups).map(
  //         // eslint-disable-next-line no-return-assign
  //         ([, settingsGroup]) =>
  //           (projectContributionKeysAndLabels[projectName] = settingsGroup.label),
  //       ),
  //   );
  // };

  // const getExtensionSettingLabels = () => {
  //   if (!settingsContributions) return;

  //   const contributionKeysAndLabels: { [extensionName: string]: string } = {};

  //   Object.entries(settingsContributions).map(
  //     ([extensionName, settingsGroups]) =>
  //       settingsGroups &&
  //       Object.entries(settingsGroups).map(
  //         // eslint-disable-next-line no-return-assign
  //         ([, settingsGroup]) => (contributionKeysAndLabels[extensionName] = settingsGroup.label),
  //       ),
  //   );
  // };

  const currentlySelectedSettingGroup = useMemo(() => {
    if (!selectedSidebarItem) return undefined;

    let selectedSettingGroup;
    if (!selectedSidebarItem.isProjectSetting && settingsContributions)
      selectedSettingGroup = settingsContributions[selectedSidebarItem.label];
    else if (selectedSidebarItem.isProjectSetting && projectSettingsContributions)
      selectedSettingGroup = projectSettingsContributions[selectedSidebarItem.label];

    return selectedSettingGroup;
  }, [projectSettingsContributions, selectedSidebarItem, settingsContributions]);

  if (!settingsContributions) return <div className="settings-tab">No Settings</div>;
  if (!projectSettingsContributions) return <div className="settings-tab">No project settings</div>;
  if (isLoadingSettingsContributions || isLoadingProjectSettingsContributions)
    return <div className="settings-tab">Loading Settings</div>;

  // TODO: fix
  if (projectId) {
    const specificProjectContribution = projectSettingsContributions[projectId];

    return (
      <div>
        {specificProjectContribution?.forEach((group) => (
          <ProjectOrUserSettingsList
            projectId={projectId}
            settingProperties={group.properties}
            groupLabel={group.label}
            searchQuery=""
          />
        )) || <div />}
      </div>
    );
  }

  return (
    <div className="settings-tab">
      <div className="sidebar-container">
        <SettingsSidebarContentSearch
          extensionLabels={Object.keys(settingsContributions)}
          // projectLabels={Object.keys(projectSettingsContributions)}
          handleSelectSidebarItem={(key: string, isProjectSetting: boolean) =>
            setSelectedSidebarItem({ label: key, isProjectSetting })
          }
          // selectedSidebarItem={selectedSidebarItem} // TODO: Needed to set the active item
        >
          {currentlySelectedSettingGroup && Array.isArray(currentlySelectedSettingGroup)
            ? currentlySelectedSettingGroup.map((group) => (
                <ProjectOrUserSettingsList
                  settingProperties={group.properties}
                  groupLabel={group.label}
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
