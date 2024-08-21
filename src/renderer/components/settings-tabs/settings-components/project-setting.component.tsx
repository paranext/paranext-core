import { useProjectSetting } from '@renderer/hooks/papi-hooks';
import { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';
import projectSettingsService from '@shared/services/project-settings.service';
import Setting, { ProjectSettingProps, ProjectSettingValues } from './setting.component';

/**
 * Provides a project-specific setting component by using the `Setting` component with
 * project-specific validation
 */
export default function ProjectSetting({
  settingKey,
  label,
  description,
  defaultSetting,
  projectId,
}: ProjectSettingProps) {
  const [setting, setSetting, , isLoading] = useProjectSetting<keyof ProjectSettingTypes>(
    projectId,
    settingKey,
    defaultSetting,
  );

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
      setting={setting}
      setSetting={setSetting}
      isLoading={isLoading}
      validateProjectSetting={validateProjectSetting}
      label={label}
      description={description}
    />
  );
}
