import { ReactNode, useCallback, useState } from 'react';
// import { Layout } from '@shared/models/docking-framework.model';
import { NavigationContentSearch, TabKeyValueContent } from 'platform-bible-react';
import {
  Localized,
  ProjectSettingsContribution,
  ProjectSettingsGroup,
  SettingsGroup,
} from 'platform-bible-utils';
import './project-settings-tab.component.scss';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import ProjectOrUserSettingsList from '../settings-components/project-or-user-settings-list.component';

export const TAB_TYPE_PROJECT_SETTINGS_DIALOG = 'project-settings-dialog';

type ProjectSettingsDialogProps = {
  projectId: string;
  projectSettingsContribution: Localized<ProjectSettingsContribution>;
};

export default function ProjectSettingsDialog({
  projectId,
  projectSettingsContribution,
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

    if (Array.isArray(projectSettingsContribution)) {
      projectSettingsContribution.map(
        (settingsGroup: Localized<ProjectSettingsGroup> | Localized<SettingsGroup>) =>
          tabList.push({
            key: settingsGroup.label,
            value: settingsGroup.label,
            content: generateFilteredTabContent(settingsGroup),
          }),
      );
    } else {
      tabList.push({
        key: projectSettingsContribution.label,
        value: projectSettingsContribution.label,
        content: generateFilteredTabContent(projectSettingsContribution),
      });
    }

    return tabList;
  }, [generateFilteredTabContent, projectSettingsContribution]);

  return (
    <div className="project-settings-tab">
      <NavigationContentSearch
        tabList={generateTabList()}
        onSearch={handleSearchInput}
        searchPlaceholder="Search Project Settings..."
        isSearchBarFullWidth
      />
    </div>
  );
}

// export async function openProjectSettingsTab(
//   projectId: string | undefined,
// ): Promise<Layout | undefined> {
//   let projectIdForWebView = projectId;
//   if (!projectIdForWebView) {
//     projectIdForWebView = await dialogService.selectProject({
//       title: 'Open Project',
//       prompt: 'Choose the project to view the settings for:',
//     });
//   }
//   if (!projectIdForWebView) return undefined;

//   const projectSettingsContribution =
//     await projectSettingsService.getLocalizedContributionForExtension(projectIdForWebView);

//   if (!projectSettingsContribution) return undefined;

//   const layout: Layout = { type: 'float' };
//   const savedTabInfo = {
//     id: TAB_TYPE_PROJECT_SETTINGS_DIALOG,
//     tabType: TAB_TYPE_PROJECT_SETTINGS_DIALOG,
//     tabTitle: `${projectId} Settings`,
//     content: (
//       <ProjectSettingsDialog
//         projectId={projectIdForWebView}
//         projectSettingsContribution={projectSettingsContribution}
//       />
//     ),
//   };
//   return addTab(savedTabInfo, layout);
// }

export const loadProjectSettingsDialog = (
  savedTabInfo: SavedTabInfo,
  projectId: string,
  projectSettingsContribution: Localized<ProjectSettingsContribution>,
): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: 'Project Settings',
    content: (
      <ProjectSettingsDialog
        projectId={projectId}
        projectSettingsContribution={projectSettingsContribution}
      />
    ),
  };
};
