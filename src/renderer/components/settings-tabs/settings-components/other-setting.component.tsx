import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import { SettingNames, SettingTypes } from 'papi-shared-types';
import settingsService from '@shared/services/settings.service';
import Setting, { OtherSettingProps, OtherSettingValues } from './setting.component';

/** Provides a non-project setting component by utilizing the `Setting` component validation */
export function OtherSetting({
  settingKey,
  label,
  description,
  defaultSetting,
  className,
}: OtherSettingProps) {
  const [setting, setSetting, , isLoading] = useSetting<keyof SettingTypes>(
    settingKey,
    defaultSetting,
  );

  const validateOtherSetting = async (
    currentSettingKey: SettingNames,
    newValue: OtherSettingValues,
    currentValue: OtherSettingValues,
  ) => {
    return settingsService.validateSetting(currentSettingKey, newValue, currentValue);
  };

  return (
    <Setting
      settingKey={settingKey}
      setting={setting}
      setSetting={setSetting}
      isLoading={isLoading}
      validateOtherSetting={validateOtherSetting}
      label={label}
      description={description}
      className={className}
    />
  );
}

export default OtherSetting;
