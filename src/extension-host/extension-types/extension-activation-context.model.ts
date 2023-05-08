import { ExecutionToken } from '@node/models/execution-token.model';

/** An object of this type is passed into `activate()` for each extension during initialization */
export type ExecutionActivationContext = {
  executionToken: ExecutionToken;
};
