declare module 'c-sharp-provider-test' {
  import type { DataProviderDataType } from 'shared/models/data-provider.model';
  import type IDataProvider from 'shared/models/data-provider.interface';

  type TimeDataTypes = {
    Time: DataProviderDataType<undefined, string | undefined, never>;
  };

  export type TimeDataProvider = IDataProvider<TimeDataTypes>;
}

declare module 'papi-shared-types' {
  import type { TimeDataProvider } from 'c-sharp-provider-test';

  export interface CommandHandlers {
    'test.addOne': (num: number) => number;
  }

  export interface DataProviders {
    'current-time': TimeDataProvider;
  }
}
