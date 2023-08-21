import type { DataProviderDataType } from 'shared/models/data-provider.model';
import type IDataProvider from 'shared/models/data-provider.interface';

declare module 'c-sharp-provider-test' {
  type TimeDataTypes = {
    TimeData: DataProviderDataType<undefined, string | undefined, never>;
  };

  export type TimeDataProvider = IDataProvider<TimeDataTypes>;
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'test.addOne': (num: number) => number;
  }
}
