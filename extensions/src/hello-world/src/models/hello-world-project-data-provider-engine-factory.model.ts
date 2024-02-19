import { IProjectDataProviderEngine, IProjectDataProviderEngineFactory } from '@papi/core';
import HelloWorldProjectDataProviderEngine from './hello-world-project-data-provider-engine.model';

const helloWorldProjectDataProviderEngineFactory: IProjectDataProviderEngineFactory<'helloWorld'> =
  {
    createProjectDataProviderEngine(
      projectId: string,
      projectStorageInterpreterId: string,
    ): IProjectDataProviderEngine<'helloWorld'> {
      return new HelloWorldProjectDataProviderEngine(projectId, projectStorageInterpreterId);
    },
  };

export default helloWorldProjectDataProviderEngineFactory;
