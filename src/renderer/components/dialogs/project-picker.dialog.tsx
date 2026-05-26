import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { ProjectPicker, PROJECT_PICKER_STRING_KEYS } from 'platform-bible-react';
import { DIALOG_BASE } from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  DialogTypes,
  PROJECT_PICKER_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';
import { useProjectPickerData } from '@renderer/hooks/use-project-picker-data.hook';
import { sendCommand } from '@shared/services/command.service';
import { dataProviders } from '@renderer/services/papi-frontend.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

const STRING_KEYS = [...PROJECT_PICKER_STRING_KEYS];

function ProjectPickerWrapper({
  submitDialog,
}: DialogTypes[typeof PROJECT_PICKER_DIALOG_TYPE]['props']) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);
  const { currentProject, recentProjects, allProjects, isLoading } = useProjectPickerData();

  const handleSelect = async (projectId: string) => {
    submitDialog();
    try {
      // This command comes from an extension and is not typed in CommandHandlers.
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      await (sendCommand as any)('platformScriptureEditor.openScriptureEditor', projectId);
      const svc = await dataProviders.get('platformScripture.recentlyOpenedProjects');
      await svc?.recordProjectOpened(projectId);
    } catch (e) {
      logger.warn(
        `ProjectPicker dialog: error opening project ${projectId}: ${getErrorMessage(e)}`,
      );
    }
  };

  return (
    <ProjectPicker
      currentProject={currentProject}
      recentProjects={recentProjects}
      allProjects={allProjects}
      isLoading={isLoading}
      onSelect={handleSelect}
      localizedStrings={localizedStrings}
    />
  );
}

export const PROJECT_PICKER_DIALOG: DialogDefinition<typeof PROJECT_PICKER_DIALOG_TYPE> =
  Object.freeze({
    ...DIALOG_BASE,
    tabType: PROJECT_PICKER_DIALOG_TYPE,
    defaultTitle: '%projectPicker_title%',
    initialSize: { width: 700, height: 550 },
    Component: ProjectPickerWrapper,
  });

export default PROJECT_PICKER_DIALOG;
