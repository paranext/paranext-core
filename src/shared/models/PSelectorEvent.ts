import { PEventHandler } from '@shared/models/PEvent';
import { UnsubscriberAsync } from '@shared/util/PapiUtil';

/**
 * Function that subscribes the provided callback to run when this event is emitted if the emitter determines the event is relevant to that selector.
 * @param selector tells the emitter what subset of events should be sent to this callback
 * @param callback function to run with the event when it is emitted
 * @returns unsubscriber function to run to stop calling the passed-in function when the event is emitted
 */
export type PSelectorEvent<TSelector, TEvent> = (
  selector: TSelector,
  callback: PEventHandler<TEvent>,
) => Promise<UnsubscriberAsync>;
