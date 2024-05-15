import {
  IProjectDataProviderEngine,
  IProjectDataProviderEngineFactory,
  ProjectMetadata,
} from '@papi/core';
import HelloWorldProjectDataProviderEngine from './hello-world-project-data-provider-engine.model';

const helloWorldProjectDataProviderEngineFactory: IProjectDataProviderEngineFactory<'helloWorld'> & {
  getAvailableProjects(): Promise<ProjectMetadata[]>;
} = {
  /**
   * Returns a list of metadata objects for all projects that can be the targets of PDPs created by
   * this factory
   */
  async getAvailableProjects() {
    return [];
  },
  createProjectDataProviderEngine(): IProjectDataProviderEngine<'helloWorld'> {
    return new HelloWorldProjectDataProviderEngine();
  },
};

export default helloWorldProjectDataProviderEngineFactory;
