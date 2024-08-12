import { ChangeEvent, useCallback, useState } from 'react';
import { useSetting } from '@renderer/hooks/papi-hooks';
import { SettingNames, SettingTypes } from 'papi-shared-types';
import { Checkbox, Input, SettingsListItem } from 'platform-bible-react';
import { debounce } from 'platform-bible-utils';
import settingsService from '@shared/services/settings.service';

export type SettingValues = SettingTypes[keyof SettingTypes];

type SettingProps = {
  settingKey: SettingNames;
  label: string;
  description?: string;
  defaultSetting: SettingValues;
};

export default function Setting({ settingKey, label, description, defaultSetting }: SettingProps) {
  const [setting, setSetting, , isLoading] = useSetting<keyof SettingTypes>(
    settingKey,
    defaultSetting,
  );

  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const validateSettingValue = async (
    currentSettingKey: SettingNames,
    newValue: SettingValues,
    currentValue: SettingValues,
  ) => {
    const isValid = await settingsService.validateSetting(
      currentSettingKey,
      newValue,
      currentValue,
    );
    return isValid;
  };

  const handleChangeSetting = async (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: SettingValues =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    // if (typeof setting === 'number') {
    //   // eslint-disable-next-line no-type-assertion/no-type-assertion
    //   const numericValue = parseInt(newValue as string, 10);
    //   if (Number.isNaN(numericValue)) {
    //     setErrorMessage('Invalid number');
    //     return;
    //   }
    //   newValue = numericValue;
    // }

    const isValid = await validateSettingValue(settingKey, newValue, settingKey);

    if (isValid) {
      setErrorMessage(undefined);
      if (setSetting) setSetting(newValue);
    } else {
      setErrorMessage('Invalid value');
    }
  };

  const debouncedHandleChange = debounce(handleChangeSetting, 500);

  const generateComponent = useCallback(() => {
    let component = <p>No setting component</p>;

    if (typeof setting === 'string' || typeof setting === 'number')
      component = (
        <Input key={settingKey} onChange={debouncedHandleChange} defaultValue={setting} />
      );
    else if (typeof setting === 'boolean')
      component = (
        <Checkbox
          key={settingKey}
          onChange={() => debouncedHandleChange}
          isDefaultChecked={setting}
        />
      );
    // else if (Array.isArray(setting))
    //   component = (
    //     <DropdownMenu>
    //       <DropdownMenuItem />
    //     </DropdownMenu>
    //   );
    else if (typeof setting === 'object')
      component = (
        <Input
          key={settingKey}
          onChange={debouncedHandleChange}
          defaultValue={JSON.stringify(setting, undefined, 2)}
        />
      );

    return (
      <div>
        {component}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
    );
  }, [setting, settingKey, debouncedHandleChange, errorMessage]);

  return (
    <SettingsListItem
      primary={label}
      secondary={description}
      generateActionComponent={generateComponent}
      isLoading={isLoading}
      loadingMessage="Loading setting"
    />
  );
}
