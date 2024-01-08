import { ProjectTypes, ProjectDataTypes } from 'papi-shared-types';
import type IDataProviderEngine from '@shared/models/data-provider-engine.model';

/** All possible types for ProjectDataProviderEngines: IDataProviderEngine<ProjectDataType> */
export type ProjectDataProviderEngineTypes = {
  [ProjectType in ProjectTypes]: IDataProviderEngine<ProjectDataTypes[ProjectType]>;
};

export interface ProjectDataProviderEngineFactory<ProjectType extends ProjectTypes> {
  createProjectDataProviderEngine(
    projectId: string,
    projectStorageInterpreterId: string,
  ): ProjectDataProviderEngineTypes[ProjectType];
}
