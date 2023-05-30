import type IDataProvider from 'shared/models/data-provider.interface';
import type { DataProviderDataType } from 'shared/models/data-provider.model';

export type Person = {
  greeting?: string;
  age?: number;
};

export type AllGreetingsData = {
  [name: string]: Person | undefined;
};

export type GreetingsDataTypes = {
  Greeting: DataProviderDataType<string, string | undefined, string>;
  Age: DataProviderDataType<string, number | undefined, number>;
  All: DataProviderDataType<undefined, AllGreetingsData, never>;
};

export type GreetingsDataProvider = IDataProvider<GreetingsDataTypes> & {
  deletePerson(name: string): Promise<boolean>;
  testRandomMethod(things: string): Promise<string>;
};
