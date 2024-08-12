import { ChangeEvent, useCallback, useState } from 'react';
import { useProjectSetting } from '@renderer/hooks/papi-hooks';
import { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';
import projectSettingsService from '@shared/services/project-settings.service';
import { Checkbox, Input, SettingsListItem } from 'platform-bible-react';
import { debounce } from 'platform-bible-utils';

export type ProjectSettingValues = ProjectSettingTypes[keyof ProjectSettingTypes];

type ProjectSettingProps = {
  settingKey: ProjectSettingNames;
  label: string;
  description?: string;
  projectId: string;
  defaultSetting: ProjectSettingValues;
};

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

  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const validateProjectSettingValue = async (
    currentSettingKey: ProjectSettingNames,
    newValue: ProjectSettingValues,
    currentValue: ProjectSettingValues,
  ) => {
    const isValid = await projectSettingsService.isValid(currentSettingKey, newValue, currentValue);
    return isValid;
  };

  const handleChangeSetting = async (event: ChangeEvent<HTMLInputElement>) => {
    let newValue: ProjectSettingValues =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    if (typeof setting === 'number') {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const numericValue = parseInt(newValue as string, 10);
      if (Number.isNaN(numericValue)) {
        setErrorMessage('Invalid number');
        return;
      }
      newValue = numericValue;
    }

    const isValid = await validateProjectSettingValue(settingKey, newValue, setting);

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
