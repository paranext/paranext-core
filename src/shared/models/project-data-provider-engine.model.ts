import { ProjectTypes, ProjectDataTypes } from 'papi-shared-types';
import type IDataProvider from 'shared/models/data-provider.interface';
import type IDataProviderEngine from 'shared/models/data-provider-engine.model';

// This enforces all the keys match ProjectDataTypes
type IDataProviderEngineGeneric<T extends ProjectDataTypes> = {
  [K in keyof T]: IDataProviderEngine<T[K]>;
};

/** All possible types for ProjectDataProviderEngines: IDataProviderEngine<ProjectDataType> */
export type ProjectDataProviderEngineTypes = IDataProviderEngineGeneric<ProjectDataTypes>;

// This enforces all the keys match ProjectDataTypes
type IProjectDataProviderGeneric<T extends ProjectDataTypes> = {
  [K in keyof T]: IDataProvider<T[K]>;
};

/** All possible types for ProjectDataProviders: IDataProvider<ProjectDataType> */
export type ProjectDataProvider = IProjectDataProviderGeneric<ProjectDataTypes>;

export interface ProjectDataProviderEngineFactory<ProjectType extends ProjectTypes> {
  createProjectDataProviderEngine(
    projectId: string,
    projectStorageInterpreterId: string,
  ): ProjectDataProviderEngineTypes[ProjectType];
}
