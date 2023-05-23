import type IDataProvider from 'shared/models/data-provider.interface';
import { DataProviderDataType } from 'shared/models/data-provider.model';

export type AllGreetingsData = {
  [name: string]: string | undefined;
};

export type GreetingsDataTypes = {
  greeting: DataProviderDataType<string, string | undefined, string>;
  all: DataProviderDataType<undefined, AllGreetingsData, never>;
};

export type GreetingsDataProvider = IDataProvider<GreetingsDataTypes> & {
  testRandomMethod(things: string): Promise<string>;
};
