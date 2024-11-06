import { ChangeEvent, useCallback, useState } from 'react';
import {
  ProjectSettingNames,
  ProjectSettingTypes,
  SettingNames,
  SettingTypes,
} from 'papi-shared-types';
import { Checkbox, Input, SettingsListItem } from 'platform-bible-react';
import { debounce, getErrorMessage } from 'platform-bible-utils';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import { SettingDataTypes } from '@shared/services/settings.service-model';
import logger from '@shared/services/logger.service';

/** Props shared between the user and project setting components */
type BaseSettingProps<TSettingKey, TSettingValue> = {
  /** Key of the setting */
  settingKey: TSettingKey;
  /** Setting label */
  label: string;
  /** Setting description */
  description?: string;
  /** Default value of the setting */
  defaultSetting: TSettingValue;
};

/**
 * Combines properties and controls with optional validation functions for both project and user
 * settings
 */
type SettingProps<TProps, TControls, TValidateProject, TValidateUser> = TProps &
  TControls & {
    validateProjectSetting?: TValidateProject;
    validateUserSetting?: TValidateUser;
  };

/** Values of ProjectSettingTypes */
export type ProjectSettingValues = ProjectSettingTypes[keyof ProjectSettingTypes];

/** Props for the ProjectSetting component */
export type ProjectSettingProps = BaseSettingProps<ProjectSettingNames, ProjectSettingValues> & {
  projectId: string;
};

/** Values from the useProjectSetting hook to manage the setting */
type ProjectSettingsControls = {
  setting: ProjectSettingValues;
  // Necessary for flexibility in handleChangeSetting, ProjectSettingValues and
  // UserSettingValues are not the same so it couldn't assign
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSetting: ((newSetting: any) => void) | undefined;
  isLoading: boolean;
};

/** Values of SettingTypes */
export type UserSettingValues = SettingTypes[keyof SettingTypes];

/** Props for the UserSetting component */
export type UserSettingProps = BaseSettingProps<SettingNames, UserSettingValues>;

/** Values from the useSetting hook to manage the setting */
type UserSettingsControls = {
  setting: UserSettingValues;
  // Necessary for flexibility in handleChangeSetting, ProjectSettingValues and
  // UserSettingValues are not the same so it couldn't assign
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSetting: (newSetting: any) => Promise<DataProviderUpdateInstructions<SettingDataTypes>>;
  isLoading: boolean;
};

/**
 * Represents either project or user settings, includes properties, controls, and validation
 * function
 */
type CombinedSettingProps =
  | SettingProps<
      Omit<ProjectSettingProps, 'defaultSetting' | 'projectId'>,
      ProjectSettingsControls,
      // Necessary for flexibility in handleChangeSetting, couldn't use unknown
      // and keep types in ProjectSetting component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (settingKey: any, newValue: any, currentValue: any) => Promise<boolean>,
      never
    >
  | SettingProps<
      Omit<UserSettingProps, 'defaultSetting'>,
      UserSettingsControls,
      never,
      // Necessary for flexibility in handleChangeSetting, couldn't use unknown
      // and keep types in ProjectSetting component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (settingKey: any, newValue: any, currentValue: any) => Promise<boolean>
    >;

/**
 * Renders a setting component based on the type of setting (string, number, boolean, or object) and
 * includes validating the setting and displaying errors
 */
export default function Setting({
  settingKey,
  setting,
  setSetting,
  isLoading,
  validateUserSetting,
  validateProjectSetting,
  label,
  description,
}: CombinedSettingProps) {
  const validateSetting = validateUserSetting || validateProjectSetting;

  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  /**
   * Validate and change a setting
   *
   * @param event `ChangeEvent<HTMLInputElement>` is for `Input`; `boolean | 'indeterminate'` is for
   *   `Checkbox`
   */
  const handleChangeSetting = async (
    event: ChangeEvent<HTMLInputElement> | boolean | 'indeterminate',
  ) => {
    let newValue: unknown;

    if (typeof event === 'string')
      // This event came from a `Checkbox` component. It should not be indeterminate
      logger.warn(`Setting checkbox attempted to set to 'indeterminate' for some reason`);
    else if (typeof event === 'boolean') {
      // This event came from a `Checkbox` component
      newValue = event;
    } else {
      // This event came from an `Input` component
      const { value } = event.target;
      if (typeof setting === 'number') {
        const numericValue = parseInt(value, 10);
        if (Number.isNaN(numericValue)) {
          setErrorMessage('Invalid number');
          return;
        }
        newValue = numericValue;
      } else if (typeof setting === 'boolean' || typeof setting === 'string') {
        newValue = value;
      } else if (typeof setting === 'object') {
        try {
          newValue = JSON.parse(value);
        } catch {
          setErrorMessage('Invalid JSON');
          return;
        }
      } else {
        newValue = value;
      }
    }

    try {
      if (validateSetting && (await validateSetting(settingKey, newValue, setting))) {
        setErrorMessage(undefined);
        if (setSetting) setSetting(newValue);
      } else {
        setErrorMessage('Invalid value');
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
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
          onCheckedChange={debouncedHandleChange}
          defaultChecked={setting}
        />
      );
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
      isLoading={isLoading}
      loadingMessage="Loading setting"
    >
      {generateComponent()}
    </SettingsListItem>
  );
}
