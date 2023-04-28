import type { DataProvider } from 'shared/models/data-provider.model';

export interface GreetingsDataProvider extends DataProvider<string, string, string> {
  testRandomMethod(things: string): Promise<string>;
}
