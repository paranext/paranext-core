import { ProjectDataTypes } from 'papi-project-data-types';
import type IDataProvider from 'shared/models/data-provider.interface';
import type IDataProviderEngine from 'shared/models/data-provider-engine.model';

/**
 * Identifiers for all project types supported by PAPI. These are not intended to correspond 1:1
 * to the set of project types available in Paratext.
 */
export type ProjectTypes = keyof ProjectDataTypes;

// This enforces all the keys match ProjectDataTypes
type IDataProviderEngineGeneric<T extends ProjectDataTypes> = {
  [K in keyof T]: IDataProviderEngine<T[K]>;
};

/** All possible types for ProjectDataProviderEngines: IDataProviderEngine<ProjectDataType> */
export type ProjectDataProviderEngineTypes = IDataProviderEngineGeneric<ProjectDataTypes>;

// This enforces all the keys match ProjectDataTypes
type IDataProviderGeneric<T extends ProjectDataTypes> = {
  [K in keyof T]: IDataProvider<T[K]>;
};

/** All possible types for ProjectDataProviders: IDataProvider<ProjectDataType> */
export type ProjectDataProviderTypes = IDataProviderGeneric<ProjectDataTypes>;

export interface ProjectDataProviderEngineFactory<ProjectType extends ProjectTypes> {
  createProjectDataProviderEngine(
    projectId: string,
    projectStorageInterpreterId: string,
  ): ProjectDataProviderEngineTypes[ProjectType];
}
