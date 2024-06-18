import { useMemo } from 'react';
import {
  IBaseProjectDataProvider,
  ProjectDataProviderInterfaces,
  ProjectInterfaceDataTypes,
  ProjectSettingNames,
  ProjectSettingTypes,
} from 'papi-shared-types';
import useProjectData from '@renderer/hooks/papi-hooks/use-project-data.hook';
import {
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import ExtractDataProviderDataTypes from '@shared/models/extract-data-provider-data-types.model';
import useProjectDataProvider from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';

/**
 * Gets, sets and resets a project setting on the papi for a specified project. Also notifies
 * subscribers when the project setting changes and gets updated when the project setting is changed
 * by others.
 *
 * @param projectDataProviderSource `projectDataProviderSource` String name of the id of the project
 *   to get OR projectDataProvider (result of `useProjectDataProvider` if you want to consolidate
 *   and only get the Project Data Provider once). If you provide a project id, this hook will use a
 *   PDP for this project that supports the `platform.base` `projectInterface`.
 *
 *   Note: If you provide a projectDataProvider directly, it must be an
 *   {@link IBaseProjectDataProvider}
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
const useProjectSetting = <ProjectSettingName extends ProjectSettingNames>(
  // Any Base PDP type works. Without `any`, the DataProviderUpdateInstructions types are incompatible
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projectDataProviderSource: string | IBaseProjectDataProvider<any> | undefined,
  key: ProjectSettingName,
  defaultValue: ProjectSettingTypes[ProjectSettingName],
  subscriberOptions?: DataProviderSubscriberOptions,
): [
  setting: ProjectSettingTypes[ProjectSettingName],
  setSetting: ((newSetting: ProjectSettingTypes[ProjectSettingName]) => void) | undefined,
  resetSetting: (() => void) | undefined,
  isLoading: boolean,
] => {
  const projectDataProvider = useProjectDataProvider(
    PROJECT_INTERFACE_PLATFORM_BASE,
    // Reduce the type to just the important part. Now that we have `any` here, the DataProviderUpdateInstructions
    // are again not compatible without type asserting
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    projectDataProviderSource as ProjectDataProviderInterfaces[typeof PROJECT_INTERFACE_PLATFORM_BASE],
  );

  // Unfortunately `Setting` isn't an actual `DataProviderDataType` on Project Data Providers. They
  // instead manually implement on `IProjectDataProvider` with a generic `ProjectSettingName`.
  // We must type assert to use it because `useProjectData` only sees actual `DataProviderDataType`s
  /* eslint-disable no-type-assertion/no-type-assertion */
  const [setting, setSetting, isLoading] = (
    useProjectData(PROJECT_INTERFACE_PLATFORM_BASE, projectDataProvider) as unknown as {
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
                ExtractDataProviderDataTypes<
                  ProjectInterfaceDataTypes[typeof PROJECT_INTERFACE_PLATFORM_BASE]
                >
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
