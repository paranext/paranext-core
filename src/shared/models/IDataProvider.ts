import { UnsubscriberAsync } from '@shared/util/PapiUtil';

interface IDataProvider<TData, TSelector> {
  set: (selector: TSelector, data: TData) => Promise<boolean>;
  get: (selector: TSelector) => Promise<TData>;
  subscribe: (
    selector: TSelector,
    callback: (data: TData) => void,
  ) => Promise<UnsubscriberAsync>;
}

export default IDataProvider;
