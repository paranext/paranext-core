import type IDataProvider from 'shared/models/data-provider.interface';
import type { DataProviderDataType } from 'shared/models/data-provider.model';

export type AllGreetingsData = {
  [name: string]: string | undefined;
};

export type GreetingsDataTypes = {
  Greeting: DataProviderDataType<string, string | undefined, string>;
  All: DataProviderDataType<undefined, AllGreetingsData, never>;
};

export type GreetingsDataProvider = IDataProvider<GreetingsDataTypes> & {
  testRandomMethod(things: string): Promise<string>;
};
