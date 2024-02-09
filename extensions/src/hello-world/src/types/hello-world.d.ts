declare module 'hello-world' {
  import type { DataProviderDataType, IDataProvider, MandatoryProjectDataTypes } from '@papi/core';

  export type MyProjectDataType = MandatoryProjectDataTypes & {
    MyProjectData: DataProviderDataType<string, string, string>;
  };

  export type MyProjectDataMethods = {
    testRandomMethod(things: string): boolean;
  };

  export type MyProjectDataProvider = IDataProvider<MyProjectDataType> & MyProjectDataMethods;

  /** Event containing information about `helloWorld` */
  type HelloWorldEvent = {
    /**
     * How many times the `helloWorld` function has been run (called by `helloWorld.helloWorld`
     * command)
     */
    times: number;
  };
}

declare module 'papi-shared-types' {
  import type { MyProjectDataProvider } from 'hello-world';
  import type { IProjectStorageInterpreter } from 'papi-shared-types';

  export interface CommandHandlers {
    'helloWorld.helloWorld': () => string;
    'helloWorld.helloException': (message: string) => void;
  }

  export interface ProjectDataProviders {
    'helloWorld.myExtensionProjectTypeName': MyProjectDataProvider;
  }

  export interface ProjectStorageInterpreters {
    /** Placeholder. Implementation TBD */
    'helloWorld.myExtensionProjectTypeName': IProjectStorageInterpreter;
  }
}
