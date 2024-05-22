// import { platformProjectSettings } from '@extension-host/data/core-project-settings-info.data';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
// import { ProjectSettingsContribution } from 'platform-bible-utils';

export const TAB_TYPE_PROJECT_SETTINGS_DIALOG = 'project-settings-dialog';
// type ProjectSettingsDialogProps = {
//   projectSettingsContribution: ProjectSettingsContribution;
// };

export default function ProjectSettingsDialog(/* { projectSettingsContribution }: ProjectSettingsDialogProps */) {
  return <h3>In progress</h3>;
}

export const loadProjectSettingsDialog = (savedTabInfo: SavedTabInfo): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: 'Project Settings',
    content: (
      <ProjectSettingsDialog
      // Testing with project settings built into core
      // projectSettingsContribution={platformProjectSettings}
      />
    ),
  };
};
