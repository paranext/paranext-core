import { ReactNode, useCallback, useState } from 'react';
import { NavigationContentSearch, TabKeyValueContent } from 'platform-bible-react';
import { Localized, ProjectSettingsGroup, SettingsGroup } from 'platform-bible-utils';
import './project-settings-tab.component.scss';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { ProjectSettingsContributionInfo } from '@shared/utils/project-settings-document-combiner';
import ProjectOrUserSettingsList from '../settings-components/project-or-user-settings-list.component';

export const TAB_TYPE_PROJECT_SETTINGS_DIALOG = 'project-settings-dialog';

type ProjectSettingsDialogProps = {
  projectId: string;
  projectSettingsContributions:
    | Localized<ProjectSettingsContributionInfo['contributions']>
    | undefined;
};

export default function ProjectSettingsDialog({
  projectId,
  projectSettingsContributions,
}: ProjectSettingsDialogProps) {
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

    if (!projectSettingsContributions) return undefined;

    Object.entries(projectSettingsContributions).map(
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
  }, [generateFilteredTabContent, projectSettingsContributions]);

  if (!projectSettingsContributions)
    return <div className="project-settings-tab">No project Settings</div>;

  return (
    <div className="project-settings-tab">
      <NavigationContentSearch
        // We know projectSettingsContributions is not undefined here
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        tabList={generateTabList() as TabKeyValueContent[]}
        onSearch={handleSearchInput}
        searchPlaceholder="Search Project Settings..."
        isSearchBarFullWidth
      />
    </div>
  );
}

export type ProjectSettingsTabData = ProjectSettingsDialogProps;

export const loadProjectSettingsDialog = (savedTabInfo: SavedTabInfo): TabInfo => {
  const typedSavedTabInfo = {
    id: savedTabInfo.id,
    tabType: savedTabInfo.tabType,
    // We use this type in the addTab function, but it doesn't know what data is here
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    data: savedTabInfo.data as ProjectSettingsTabData,
  };

  return {
    ...savedTabInfo,
    tabTitle: 'Project Settings',
    content: (
      <ProjectSettingsDialog
        projectId={typedSavedTabInfo.data.projectId}
        projectSettingsContributions={typedSavedTabInfo.data.projectSettingsContributions}
      />
    ),
  };
};
