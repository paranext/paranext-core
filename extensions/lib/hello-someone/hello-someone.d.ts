import type { IDataProvider } from 'shared/models/data-provider.model';

export interface GreetingsDataProvider extends IDataProvider<string, string, string> {
  testRandomMethod(things: string): Promise<string>;
}
