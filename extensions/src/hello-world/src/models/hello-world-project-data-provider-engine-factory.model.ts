import { IProjectDataProviderEngine, IProjectDataProviderEngineFactory } from '@papi/core';
import HelloWorldProjectDataProviderEngine from './hello-world-project-data-provider-engine.model';

const helloWorldProjectDataProviderEngineFactory: IProjectDataProviderEngineFactory<'helloWorld'> =
  {
    createProjectDataProviderEngine(): IProjectDataProviderEngine<'helloWorld'> {
      return new HelloWorldProjectDataProviderEngine();
    },
  };

export default helloWorldProjectDataProviderEngineFactory;
