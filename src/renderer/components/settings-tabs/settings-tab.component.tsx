import { ReactNode, useCallback, useMemo, useState } from 'react';
import { NavigationContentSearch, TabKeyValueContent, usePromise } from 'platform-bible-react';
import { Localized, ProjectSettingsGroup, SettingsGroup } from 'platform-bible-utils';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import projectSettingsService, {
  filterProjectSettingsContributionsByProjectInterfaces,
} from '@shared/services/project-settings.service';
import projectLookupService from '@shared/services/project-lookup.service';
import settingsService from '@shared/services/settings.service';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import ProjectOrUserSettingsList from './settings-components/project-or-user-settings-list.component';
import './settings-tab.component.scss';

export const TAB_TYPE_PROJECT_SETTINGS_TAB = 'project-settings-tab';
export const TAB_TYPE_USER_SETTINGS_TAB = 'user-settings-tab';

type SettingsTabProps = {
  projectId?: string;
};

export default function SettingsTab({ projectId }: SettingsTabProps) {
  const searchProjectSettingsKey = '%settings_searchProjectSettingsEllipsis%';
  const searchUserSettingsKey = '%settings_searchUserSettingsEllipsis%';
  const [localizedStrings] = useLocalizedStrings([searchProjectSettingsKey, searchUserSettingsKey]);
  const localizedSearchProjectSettings = localizedStrings[searchProjectSettingsKey];
  const localizedSearchUserSettings = localizedStrings[searchUserSettingsKey];

  const [settingsContributions, isLoadingSettingsContributions] = usePromise(
    useCallback(async () => {
      if (projectId) {
        const allProjectSettingsContributionInfo = (
          await projectSettingsService.getLocalizedContributionInfo()
        )?.contributions;

        const projectInterfacesFromProjectId = (
          await projectLookupService.getMetadataForProject(projectId)
        ).projectInterfaces;

        const filteredContributions = await filterProjectSettingsContributionsByProjectInterfaces(
          allProjectSettingsContributionInfo,
          projectInterfacesFromProjectId,
        );
        return filteredContributions;
      }
      return (await settingsService.getLocalizedSettingsContributionInfo())?.contributions;
    }, [projectId]),
    useMemo(() => {
      return undefined;
    }, []),
  );

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
  if (isLoadingSettingsContributions) return <div className="settings-tab">Loading Settings</div>;

  return (
    <div className="settings-tab">
      <NavigationContentSearch
        // We know projectSettingsContributions is not undefined here
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        tabList={generateTabList() as TabKeyValueContent[]}
        onSearch={handleSearchInput}
        searchPlaceholder={projectId ? localizedSearchProjectSettings : localizedSearchUserSettings}
        isSearchBarFullWidth
      />
    </div>
  );
}

export type SettingsTabData = SettingsTabProps;

export const loadProjectSettingsTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  const typedSavedTabInfo = {
    id: savedTabInfo.id,
    tabType: savedTabInfo.tabType,
    // We use this type in the addTab function, but it doesn't know what data is here
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    data: savedTabInfo.data as SettingsTabData,
  };

  return {
    ...savedTabInfo,
    tabTitle: '%settings_projectSettings%',
    content: <SettingsTab projectId={typedSavedTabInfo.data.projectId} />,
  };
};

export const loadUserSettingsTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: '%settings_userSettings%',
    content: <SettingsTab />,
  };
};
