import { useProjectSetting } from '@renderer/hooks/papi-hooks/use-project-setting.hook';
import { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';
import { projectSettingsService } from '@shared/services/project-settings.service';
import { ProjectSettingProps, ProjectSettingValues, Setting } from './setting.component';

/**
 * Provides a project-specific setting component by using the `Setting` component with
 * project-specific validation
 */
export function ProjectSetting({
  settingKey,
  label,
  description,
  defaultSetting,
  projectId,
  className,
}: ProjectSettingProps) {
  const [setting, setSetting, , isLoading] = useProjectSetting<keyof ProjectSettingTypes>(
    projectId,
    settingKey,
    defaultSetting,
  );

  // `platform.isPublished` is the source of truth for whether the project is locked. When it's
  // true, `platform.isEditable` is forced off in the UI and both switches become read-only.
  const [isPublished] = useProjectSetting(projectId, 'platform.isPublished', false);
  const isPublishedValue = isPublished === true;

  const isPublishedSetting = settingKey === 'platform.isPublished';
  const isEditableLockedByPublished = settingKey === 'platform.isEditable' && isPublishedValue;

  const disabled = isPublishedSetting || isEditableLockedByPublished;
  const displaySetting = isEditableLockedByPublished ? false : setting;

  const validateProjectSetting = async (
    currentSettingKey: ProjectSettingNames,
    newValue: ProjectSettingValues,
    currentValue: ProjectSettingValues,
  ) => {
    return projectSettingsService.isValid(currentSettingKey, newValue, currentValue);
  };

  return (
    <Setting
      settingKey={settingKey}
      setting={displaySetting}
      setSetting={setSetting}
      isLoading={isLoading}
      validateProjectSetting={validateProjectSetting}
      label={label}
      description={description}
      className={className}
      disabled={disabled}
    />
  );
}

export default ProjectSetting;
