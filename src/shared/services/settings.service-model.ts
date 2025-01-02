import * as networkService from '@shared/services/network.service';
import { SettingNames, SettingTypes } from 'papi-shared-types';
import { OnDidDispose, UnsubscriberAsync } from 'platform-bible-utils';
import { serializeRequestType } from '@shared/utils/util';
import IDataProvider from '@shared/models/data-provider.interface';
import {
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { LocalizedSettingsContributionInfo } from '@shared/utils/settings-document-combiner-base';

/** Name prefix for registered commands that call settings validators */
export const CATEGORY_EXTENSION_SETTING_VALIDATOR = 'extensionSettingValidator';

/** JSDOC DESTINATION settingsServiceDataProviderName */
export const settingsServiceDataProviderName = 'platform.settingsServiceDataProvider';
export const settingsServiceObjectToProxy = Object.freeze({
  /**
   * JSDOC SOURCE settingsServiceDataProviderName
   *
   * This name is used to register the settings service data provider on the papi. You can use this
   * name to find the data provider when accessing it using the useData hook
   */
  dataProviderName: settingsServiceDataProviderName,

  /**
   * JSDOC SOURCE settingsServiceRegisterValidator
   *
   * Registers a function that validates whether a new setting value is allowed to be set.
   *
   * @param key The string id of the setting to validate
   * @param validator Function to call to validate the new setting value
   * @returns Unsubscriber that should be called whenever the providing extension is deactivated
   */
  registerValidator: async <SettingName extends SettingNames>(
    key: SettingName,
    validator: SettingValidator<SettingName>,
  ): Promise<UnsubscriberAsync> => {
    return networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_EXTENSION_SETTING_VALIDATOR, key),
      validator,
      {
        method: {
          summary: `Validate whether a given value is allowed for setting "${key}"`,
          params: [
            {
              name: 'newValue',
              required: true,
              summary: 'The new value to validate',
              schema: {
                oneOf: [
                  { type: 'object' },
                  { type: 'string' },
                  { type: 'number' },
                  { type: 'boolean' },
                  { type: 'array' },
                ],
              },
            },
            {
              name: 'currentValue',
              required: true,
              summary: 'The current value of the setting',
              schema: {
                oneOf: [
                  { type: 'object' },
                  { type: 'string' },
                  { type: 'number' },
                  { type: 'boolean' },
                  { type: 'array' },
                ],
              },
            },
            {
              name: 'allChanges',
              required: true,
              summary: 'All changes to the settings',
              schema: {
                oneOf: [
                  { type: 'object' },
                  { type: 'string' },
                  { type: 'number' },
                  { type: 'boolean' },
                  { type: 'array' },
                ],
              },
            },
          ],
          result: {
            name: 'return value',
            summary: 'Whether the new setting value is valid',
            schema: { type: 'boolean' },
          },
        },
      },
    );
  },
});
/**
 * SettingDataTypes handles getting and setting Platform.Bible core application and extension
 * settings.
 *
 * Note: the unnamed (`''`) data type is not actually part of `SettingDataTypes` because the methods
 * would not be able to create a generic type extending from `SettingNames` in order to return the
 * specific setting type being requested. As such, `get`, `set`, `reset` and `subscribe` are all
 * specified on {@link ISettingsService} instead. Unfortunately, as a result, using Intellisense with
 * `useData` will not show the unnamed data type (`''`) as an option, but you can use `useSetting`
 * instead. However, do note that the unnamed data type (`''`) is fully functional.
 *
 * The closest possible representation of the unnamed (````) data type follows:
 *
 * ```typescript
 * '': DataProviderDataType<SettingName, SettingTypes[SettingName], SettingTypes[SettingName]>;
 * ```
 */
export type SettingDataTypes = {};

export type AllSettingsData = {
  [SettingName in SettingNames]: SettingTypes[SettingName];
};

/** Function that validates whether a new setting value should be allowed to be set */
export type SettingValidator<SettingName extends SettingNames> = (
  newValue: SettingTypes[SettingName],
  currentValue: SettingTypes[SettingName],
  allChanges: Partial<SettingTypes>,
) => Promise<boolean>;

/** Validators for all settings. Keys are setting keys, values are functions to validate new settings */
export type AllSettingsValidators = {
  [SettingName in SettingNames]: SettingValidator<SettingName>;
};

declare module 'papi-shared-types' {
  export interface DataProviders {
    [settingsServiceDataProviderName]: ISettingsService;
  }
}

/** JSDOC SOURCE settingsService */
export type ISettingsService = {
  /**
   * Retrieves the value of the specified setting
   *
   * @param key The string id of the setting for which the value is being retrieved
   * @returns The value of the specified setting, parsed to an object. Returns default setting if
   *   setting does not exist
   * @throws If no default value is available for the setting.
   */
  get<SettingName extends SettingNames>(key: SettingName): Promise<SettingTypes[SettingName]>;

  /**
   * Validates the setting at the given key with the new value provided
   *
   * @param key The string id of the setting to validate
   * @param newValue The value to validate
   * @param currentValue The value already set to the setting
   * @param allChanges
   */
  validateSetting<SettingName extends SettingNames>(
    key: SettingName,
    newValue: SettingTypes[SettingName],
    currentValue: SettingTypes[SettingName],
    allChanges?: Partial<SettingTypes>,
  ): Promise<boolean>;

  /**
   * Sets the value of the specified setting
   *
   * @param key The string id of the setting for which the value is being set
   * @param newSetting The value that is to be set for the specified key
   * @returns Information that papi uses to interpret whether to send out updates. Defaults to
   *   `true` (meaning send updates only for this data type).
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  set<SettingName extends SettingNames>(
    key: SettingName,
    newSetting: SettingTypes[SettingName],
  ): Promise<DataProviderUpdateInstructions<SettingDataTypes>>;

  /**
   * Removes the setting from memory and resets it to its default value
   *
   * @param key The string id of the setting for which the value is being removed
   * @returns `true` if successfully reset the project setting. `false` otherwise
   */
  reset<SettingName extends SettingNames>(key: SettingName): Promise<boolean>;

  /**
   * Subscribes to updates of the specified setting. Whenever the value of the setting changes, the
   * callback function is executed.
   *
   * @param key The string id of the setting for which the value is being subscribed to
   * @param callback The function that will be called whenever the specified setting is updated
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber that should be called whenever the subscription should be deleted
   */
  subscribe<SettingName extends SettingNames>(
    key: SettingName,
    callback: (newSetting: SettingTypes[SettingName]) => void,
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;

  /** JSDOC DESTINATION settingsServiceRegisterValidator */
  registerValidator<SettingName extends SettingNames>(
    key: SettingName,
    validator: SettingValidator<SettingName>,
  ): Promise<UnsubscriberAsync>;

  /**
   * Get the current set of settings contribution info given all the input documents with all
   * localized string keys localized properly.
   *
   * @returns Localized project settings contribution info or undefined
   */
  getLocalizedSettingsContributionInfo(): Promise<LocalizedSettingsContributionInfo | undefined>;
} & OnDidDispose &
  IDataProvider<SettingDataTypes> &
  typeof settingsServiceObjectToProxy;
