import type IDataProvider from '@shared/models/data-provider.interface';
import type { DataProviderDataType } from '@shared/models/data-provider.model';
import type { CommandHandlerTypes } from '@shared/services/command.service';

declare module 'hello-someone' {
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

declare module '@shared/services/command.service' {
  export interface CommandHandlers {
    'hello-someone.hello-someone': CommandHandlerTypes<(someone: string) => string>;
    'hello-someone.echo-someone-renderer': CommandHandlerTypes<
      (message: string) => Promise<string>
    >;
  }
}
