import type { DataProviderDataType } from 'shared/models/data-provider.model';

declare module 'c-sharp-provider-test' {
  type TimeDataType = {
    TimeData: DataProviderDataType<string, string | undefined, string>;
  };
}

declare module 'papi-commands' {
  export interface CommandHandlers {
    addOne: (num: number) => number;
  }
}
