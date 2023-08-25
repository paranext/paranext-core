import { ExecutionToken } from '@node/models/execution-token.model';
import UnsubscriberAsyncList from '@shared/utils/unsubscriber-async-list';

/** An object of this type is passed into `activate()` for each extension during initialization */
export type ExecutionActivationContext = {
  /** Canonical name of the extension */
  name: string;
  /** Used to save and load data from the storage service. */
  executionToken: ExecutionToken;
  /** Tracks all registrations made by an extension so they can be cleaned up when it is unloaded */
  registrations: UnsubscriberAsyncList;
};
