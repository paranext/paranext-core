declare module 'hello-someone' {
  import { IDataProvider, DataProviderDataType } from '@papi/core';

  export type Person = {
    greeting?: string;
    age?: number;
  };

  export type PeopleData = {
    [name: string]: Person | undefined;
  };

  export type PeopleDataTypes = {
    Greeting: DataProviderDataType<string, string | undefined, string>;
    Age: DataProviderDataType<string, number | undefined, number>;
    People: DataProviderDataType<undefined, PeopleData, never>;
  };

  export type PeopleDataMethods = {
    deletePerson(name: string): Promise<boolean>;
    testRandomMethod(things: string): Promise<string>;
  };

  export type PeopleDataProvider = IDataProvider<PeopleDataTypes> & PeopleDataMethods;
}

declare module 'papi-shared-types' {
  import type { PeopleDataProvider } from 'hello-someone';

  export interface CommandHandlers {
    'helloSomeone.helloSomeone': (name: string) => string;
    'helloSomeone.echoSomeoneRenderer': (message: string) => Promise<string>;
  }

  export interface DataProviders {
    'helloSomeone.people': PeopleDataProvider;
  }
}
