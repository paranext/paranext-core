declare module 'hello-world' {
  import type { DataProviderDataType, MandatoryProjectDataTypes } from '@papi/core';
  import type { IProjectDataProvider } from 'papi-shared-types';

  export type HelloWorldProjectDataTypes = MandatoryProjectDataTypes & {
    /**
     * A random number (or set to a specific number) generated with the selector being the max
     * possible value for the number
     */
    RandomNumber: DataProviderDataType<number, number, number>;
    /** One list of names for the project. No meaningful selector information. */
    Names: DataProviderDataType<undefined, string[], never>;
  };

  export type HelloWorldProjectDataProviderMethods = {
    /**
     * Get one of the random numbers that has been generated up to this point. If there have not
     * been any random numbers generated yet, returns a random number between 0 and 1
     */
    getAnyRandomNumber(): Promise<number>;
    /** Add a name to the list of names for this project */
    addName(name: string): Promise<boolean>;
    /** Remove a name from the list of names for this project */
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

  export interface SettingTypes {
    /** Selected Person's Name on Hello World Web View */
    'hello-world.personName': string;
  }
}
