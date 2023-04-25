import { PapiEvent } from '@shared/models/papi-event.model';
import { UnsubscriberAsync } from '@shared/utils/papi-util';

export interface IDispose {
  dispose: UnsubscriberAsync;
}

export interface IOnDidDispose {
  onDidDispose: PapiEvent<void>;
}

export type CannotHaveOnDidDispose<T> = T & {
  // Include dispose optionally to avoid extra type casting later
  dispose?: UnsubscriberAsync;
  onDidDispose?: undefined;
};
