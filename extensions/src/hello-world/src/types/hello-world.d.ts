declare module 'hello-world' {
  import type { DataProviderDataType, MandatoryProjectDataTypes } from '@papi/core';
  import type { IProjectDataProvider } from 'papi-shared-types';

  export type HelloWorldProjectDataTypes = MandatoryProjectDataTypes & {
    RandomNumber: DataProviderDataType<number, number, number>;
    Names: DataProviderDataType<undefined, string[], never>;
  };

  export type HelloWorldProjectDataProviderMethods = {
    getAnyRandomNumber(): Promise<number>;
    addName(name: string): Promise<boolean>;
    removeName(name: string): Promise<boolean>;
  };

  export type HelloWorldProjectDataProvider = IProjectDataProvider<HelloWorldProjectDataTypes> &
    HelloWorldProjectDataProviderMethods;

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
  import type { HelloWorldProjectDataProvider } from 'hello-world';
  import type { IProjectStorageInterpreter } from 'papi-shared-types';

  export interface CommandHandlers {
    'helloWorld.helloWorld': () => string;
    'helloWorld.helloException': (message: string) => void;
    /**
     * Opens a new Hello World Project WebView and returns the WebView id
     *
     * @param projectId Optional project ID of the project to open. Prompts the user to select a
     *   project if not provided
     * @returns WebView id for new Hello World Project WebView or `undefined` if the user canceled
     *   the dialog
     */
    'helloWorld.openProject': (projectId: string | undefined) => Promise<string | undefined>;
  }

  export interface ProjectDataProviders {
    helloWorld: HelloWorldProjectDataProvider;
  }

  export interface ProjectStorageInterpreters {
    /** Placeholder. Implementation TBD */
    helloWorld: IProjectStorageInterpreter;
  }
}
