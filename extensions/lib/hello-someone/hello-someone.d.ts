import type IDataProvider from 'shared/models/data-provider.interface';

export interface GreetingsDataProvider extends IDataProvider<string, string, string> {
  testRandomMethod(things: string): Promise<string>;
}
