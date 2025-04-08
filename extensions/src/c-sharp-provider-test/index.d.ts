declare module 'c-sharp-provider-test' {
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import { IDataProvider, DataProviderDataType } from '@papi/core';

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
