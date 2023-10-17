import createUseDataHook from '@renderer/hooks/hook-generators/create-use-data-hook.utils';
// import { ProjectTypes, ProjectDataTypes } from 'papi-shared-types';
// import {
//   DataProviderSubscriberOptions,
//   DataProviderUpdateInstructions,
// } from '@shared/models/data-provider.model';
import IDataProvider from '@shared/models/data-provider.interface';
import useProjectDataProvider from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';

// type stuff = ProjectDataTypes['MyExtensionProjectTypeName']['ExtensionData']['getData'];

// type UseProjectDataHook = {
//   [DataType in string]: <
//     ProjectType extends ProjectTypes,
//     TDataType extends keyof ProjectDataTypes[ProjectType],
//   >(
//     projectDataProviderSource: string | IDataProvider<ProjectDataTypes[ProjectType]> | undefined,
//     selector: ProjectDataTypes[ProjectType][TDataType]['selector'],
//     defaultValue: ProjectDataTypes[ProjectType][TDataType]['getData'],
//     subscriberOptions?: DataProviderSubscriberOptions,
//   ) => [
//     ProjectDataTypes[ProjectType][TDataType]['getData'],
//     (
//       | ((
//           newData: ProjectDataTypes[ProjectType][TDataType]['setData'],
//         ) => Promise<DataProviderUpdateInstructions<ProjectDataTypes[ProjectType]>>)
//       | undefined
//     ),
//     boolean,
//   ];
// };

const useProjectData = createUseDataHook(
  useProjectDataProvider as (
    dataProviderSource: string | IDataProvider | undefined,
  ) => IDataProvider | undefined,
);

export default useProjectData;
