import type { DataProviderDataType, MandatoryProjectDataType } from '@papi/core';

declare module 'hello-world' {
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
  export interface CommandHandlers {
    'helloWorld.helloWorld': () => string;
    'helloWorld.helloException': (message: string) => void;
  }

  export type MyProjectDataType = MandatoryProjectDataType & {
    MyProjectData: DataProviderDataType<string, string, string>;
  };

  export interface ProjectDataTypes {
    MyExtensionProjectTypeName: MyProjectDataType;
  }
}
