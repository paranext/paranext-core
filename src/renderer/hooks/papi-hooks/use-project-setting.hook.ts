import { useMemo } from 'react';
import {
  ProjectDataProviders,
  ProjectDataTypes,
  ProjectSettingNames,
  ProjectSettingTypes,
  ProjectTypes,
} from 'papi-shared-types';
import useProjectData from '@renderer/hooks/papi-hooks/use-project-data.hook';
import {
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import ExtractDataProviderDataTypes from '@shared/models/extract-data-provider-data-types.model';
import useProjectDataProvider from './use-project-data-provider.hook';

/**
 * Gets, sets and resets a project setting on the papi for a specified project. Also notifies
 * subscribers when the project setting changes and gets updated when the project setting is changed
 * by others.
 *
 * @param projectType Indicates what you expect the `projectType` to be for the project with the
 *   specified id. The TypeScript type for the returned Project Data Provider will have the Project
 *   Data Provider type associated with this `projectType`. If this argument does not match the
 *   project's actual `projectType` (according to its metadata), a warning will be logged
 * @param projectDataProviderSource `projectDataProviderSource` String name of the id of the project
 *   to get OR projectDataProvider (result of `useProjectDataProvider` if you want to consolidate
 *   and only get the Project Data Provider once)
 * @param key The string id of the project setting to interact with
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 *   updated every render
 * @param defaultValue The initial value to return while first awaiting the project setting value
 * @param subscriberOptions Various options to adjust how the subscriber emits updates
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. This means that `subscriberOptions` will be passed to the data
 *   provider's `subscribe<data_type>` method as soon as possible and will not be updated again
 *   until `dataProviderSource` or `selector` changes.
 * @returns `[setting, setSetting, resetSetting]`
 *
 *   - `setting`: the current value for the project setting from the Project Data Provider with the
 *       specified key, either the `defaultValue` or the resolved setting value
 *   - `setSetting`: asynchronous function to request that the Project Data Provider update the project
 *       setting with the specified key. Returns `true` if successful. Note that this function does
 *       not update the data. The Project Data Provider sends out an update to this subscription if
 *       it successfully updates data.
 *   - `resetSetting`: asynchronous function to request that the Project Data Provider reset the project
 *       setting
 *   - `isLoading`: whether the setting value is awaiting retrieval from the Project Data Provider
 *
 * @throws When subscription callback function is called with an update that has an unexpected
 *   message type
 */
const useProjectSetting = <
  ProjectType extends ProjectTypes,
  ProjectSettingName extends ProjectSettingNames,
>(
  projectType: ProjectType,
  projectDataProviderSource: string | ProjectDataProviders[ProjectType] | undefined,
  key: ProjectSettingName,
  defaultValue: ProjectSettingTypes[ProjectSettingName],
  subscriberOptions?: DataProviderSubscriberOptions,
): [
  setting: ProjectSettingTypes[ProjectSettingName],
  setSetting: ((newSetting: ProjectSettingTypes[ProjectSettingName]) => void) | undefined,
  resetSetting: (() => void) | undefined,
  isLoading: boolean,
] => {
  const projectDataProvider = useProjectDataProvider(projectType, projectDataProviderSource);

  // Unfortunately `Setting` isn't an actual `DataProviderDataType` on Project Data Providers. They
  // instead manually implement on `IProjectDataProvider` with a generic `ProjectSettingName`.
  // We must type assert to use it because `useProjectData` only sees actual `DataProviderDataType`s
  /* eslint-disable no-type-assertion/no-type-assertion */
  const [setting, setSetting, isLoading] = (
    useProjectData(projectType, projectDataProvider) as {
      Setting: (
        selector: ProjectSettingName,
        defaultValue: ProjectSettingTypes[ProjectSettingName],
        subscriberOptions?: DataProviderSubscriberOptions,
      ) => [
        setting: ProjectSettingTypes[ProjectSettingName],
        setSetting:
          | ((
              newData: ProjectSettingTypes[ProjectSettingName],
            ) => Promise<
              DataProviderUpdateInstructions<
                ExtractDataProviderDataTypes<ProjectDataTypes[ProjectType]>
              >
            >)
          | undefined,
        boolean,
      ];
    }
  ).Setting(key, defaultValue, subscriberOptions);
  /* eslint-enable */

  const resetSetting = useMemo(
    () =>
      projectDataProvider
        ? () => {
            projectDataProvider.resetSetting(key);
          }
        : undefined,
    [projectDataProvider, key],
  );

  return [setting, setSetting, resetSetting, isLoading];
};

export default useProjectSetting;
