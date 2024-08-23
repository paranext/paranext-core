import { useSetting } from '@renderer/hooks/papi-hooks';
import { SettingNames, SettingTypes } from 'papi-shared-types';
import settingsService from '@shared/services/settings.service';
import Setting, { UserSettingProps, UserSettingValues } from './setting.component';

/**
 * Provides a user-specific setting component by utilizing the `Setting` component with
 * user-specific validation
 */
export default function UserSetting({
  settingKey,
  label,
  description,
  defaultSetting,
}: UserSettingProps) {
  const [setting, setSetting, , isLoading] = useSetting<keyof SettingTypes>(
    settingKey,
    defaultSetting,
  );

  const validateUserSetting = async (
    currentSettingKey: SettingNames,
    newValue: UserSettingValues,
    currentValue: UserSettingValues,
  ) => {
    return settingsService.validateSetting(currentSettingKey, newValue, currentValue);
  };

  return (
    <Setting
      settingKey={settingKey}
      setting={setting}
      setSetting={setSetting}
      isLoading={isLoading}
      validateUserSetting={validateUserSetting}
      label={label}
      description={description}
    />
  );
}
