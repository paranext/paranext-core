import type { PlatformError } from 'platform-bible-utils';
import type { PeopleDataProvider } from 'hello-someone';

declare module 'hello-someone' {
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import { IDataProvider, DataProviderDataType } from '@papi/core';

  export type Person = {
    greeting?: string;
    age?: number;
  };

  export type PeopleData = {
    [name: string]: Person | undefined | PlatformError;
  };

  export type PeopleDataTypes = {
    Greeting: DataProviderDataType<
      string | PlatformError,
      string | undefined | PlatformError,
      string
    >;
    Age: DataProviderDataType<string | PlatformError, number | undefined | PlatformError, number>;
    People: DataProviderDataType<undefined, PeopleData, never>;
  };

  export type PeopleDataMethods = {
    deletePerson(name: string): Promise<boolean>;
    testRandomMethod(things: string): Promise<string>;
  };

  export type PeopleDataProvider = IDataProvider<PeopleDataTypes> & PeopleDataMethods;
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'helloSomeone.helloSomeone': (name: string) => string;
  }

  export interface DataProviders {
    'helloSomeone.people': PeopleDataProvider;
  }
}
