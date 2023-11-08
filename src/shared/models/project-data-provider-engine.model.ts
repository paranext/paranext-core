import { ProjectTypes, ProjectDataTypes } from 'papi-shared-types';
import type IDataProvider from 'shared/models/data-provider.interface';
import type IDataProviderEngine from 'shared/models/data-provider-engine.model';

/** All possible types for ProjectDataProviderEngines: IDataProviderEngine<ProjectDataType> */
export type ProjectDataProviderEngineTypes = {
  [ProjectType in ProjectTypes]: IDataProviderEngine<ProjectDataTypes[ProjectType]>;
};

/** All possible types for ProjectDataProviders: IDataProvider<ProjectDataType> */
export type ProjectDataProvider = {
  [ProjectType in ProjectTypes]: IDataProvider<ProjectDataTypes[ProjectType]>;
};

export interface ProjectDataProviderEngineFactory<ProjectType extends ProjectTypes> {
  createProjectDataProviderEngine(
    projectId: string,
    projectStorageInterpreterId: string,
  ): ProjectDataProviderEngineTypes[ProjectType];
}
