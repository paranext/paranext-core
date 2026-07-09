import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import ProjectPicker, {
  PROJECT_PICKER_STRING_KEYS,
} from '@renderer/components/projects/project-picker.component';
import { DIALOG_BASE } from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  DialogTypes,
  PROJECT_PICKER_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';
import { useProjectPickerData } from '@renderer/hooks/use-project-picker-data.hook';

const STRING_KEYS = [...PROJECT_PICKER_STRING_KEYS];

/**
 * @experimental This dialog was recently added, and its shape may change as we learn how it is used.
 *   It is not yet a stable contract.
 */
function ProjectPickerWrapper({
  submitDialog,
}: DialogTypes[typeof PROJECT_PICKER_DIALOG_TYPE]['props']) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);
  const { currentProject, recentProjects, allProjects, isLoading } = useProjectPickerData();

  return (
    <ProjectPicker
      currentProject={currentProject}
      recentProjects={recentProjects}
      allProjects={allProjects}
      isLoading={isLoading}
      onSelect={submitDialog}
      localizedStrings={localizedStrings}
    />
  );
}

/**
 * @experimental This dialog was recently added, and its shape may change as we learn how it is used.
 *   It is not yet a stable contract.
 */
export const PROJECT_PICKER_DIALOG: DialogDefinition<typeof PROJECT_PICKER_DIALOG_TYPE> =
  Object.freeze({
    ...DIALOG_BASE,
    tabType: PROJECT_PICKER_DIALOG_TYPE,
    defaultTitle: '%projectPicker_title%',
    initialSize: { width: 700, height: 550 },
    Component: ProjectPickerWrapper,
  });

export default PROJECT_PICKER_DIALOG;
