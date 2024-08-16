import { ReactNode, useCallback, useState } from 'react';
import { NavigationContentSearch, TabKeyValueContent } from 'platform-bible-react';
import { Localized, ProjectSettingsGroup, SettingsGroup } from 'platform-bible-utils';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { ProjectSettingsContributionInfo } from '@shared/utils/project-settings-document-combiner';
import { LocalizedSettingsContributionInfo } from '@shared/utils/settings-document-combiner-base';
import ProjectOrUserSettingsList from './settings-components/project-or-user-settings-list.component';
import './settings-tab.component.scss';

export const TAB_TYPE_PROJECT_SETTINGS_TAB = 'project-settings-tab';
export const TAB_TYPE_USER_SETTINGS_TAB = 'user-settings-tab';

type SettingsTabProps = {
  projectId?: string;
  settingsContributions:
    | Localized<ProjectSettingsContributionInfo['contributions']>
    | LocalizedSettingsContributionInfo['contributions']
    | undefined;
};

export default function SettingsTab({ projectId, settingsContributions }: SettingsTabProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchInput = (newSearchTerm: string) => {
    setSearchQuery(newSearchTerm);
  };

  const generateFilteredTabContent = useCallback(
    (settingsGroup: Localized<ProjectSettingsGroup> | Localized<SettingsGroup>): ReactNode => {
      return (
        <ProjectOrUserSettingsList
          settingProperties={settingsGroup.properties}
          searchQuery={searchQuery}
          groupLabel={settingsGroup.label}
          groupDescription={settingsGroup.description}
          projectId={projectId}
        />
      );
    },
    [projectId, searchQuery],
  );

  const generateTabList = useCallback(() => {
    const tabList: TabKeyValueContent[] = [];

    if (!settingsContributions) return undefined;

    Object.entries(settingsContributions).map(
      ([, settingsGroups]) =>
        settingsGroups &&
        Object.entries(settingsGroups).map(([, settingsGroup]) =>
          tabList.push({
            key: settingsGroup.label,
            value: settingsGroup.label,
            content: generateFilteredTabContent(settingsGroup),
          }),
        ),
    );

    return tabList;
  }, [generateFilteredTabContent, settingsContributions]);

  if (!settingsContributions) return <div className="settings-tab">No Settings</div>;

  return (
    <div className="settings-tab">
      <NavigationContentSearch
        // We know projectSettingsContributions is not undefined here
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        tabList={generateTabList() as TabKeyValueContent[]}
        onSearch={handleSearchInput}
        searchPlaceholder={projectId ? 'Search Project Settings...' : 'Search User Settings...'}
        isSearchBarFullWidth
      />
    </div>
  );
}

export type SettingsTabData = SettingsTabProps;

export const loadProjectSettingsDialog = (savedTabInfo: SavedTabInfo): TabInfo => {
  const typedSavedTabInfo = {
    id: savedTabInfo.id,
    tabType: savedTabInfo.tabType,
    // We use this type in the addTab function, but it doesn't know what data is here
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    data: savedTabInfo.data as SettingsTabData,
  };

  return {
    ...savedTabInfo,
    tabTitle: 'Project Settings',
    content: (
      <SettingsTab
        projectId={typedSavedTabInfo.data.projectId}
        settingsContributions={typedSavedTabInfo.data.settingsContributions}
      />
    ),
  };
};

export const loadUserSettingsDialog = (savedTabInfo: SavedTabInfo): TabInfo => {
  const typedSavedTabInfo = {
    id: savedTabInfo.id,
    tabType: savedTabInfo.tabType,
    // We use this type in the addTab function, but it doesn't know what data is here
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    data: savedTabInfo.data as SettingsTabData,
  };

  return {
    ...savedTabInfo,
    tabTitle: 'User Settings',
    content: <SettingsTab settingsContributions={typedSavedTabInfo.data.settingsContributions} />,
  };
};
