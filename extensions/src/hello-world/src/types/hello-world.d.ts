declare module 'hello-world' {
  import type { DataProviderDataType, IDataProvider, MandatoryProjectDataType } from '@papi/core';

  export type MyProjectDataType = MandatoryProjectDataType & {
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

  export interface CommandHandlers {
    'helloWorld.helloWorld': () => string;
    'helloWorld.helloException': (message: string) => void;
  }

  export interface ProjectDataProviders {
    'helloWorld.myExtensionProjectTypeName': MyProjectDataProvider;
  }
}
