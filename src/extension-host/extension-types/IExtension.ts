import { UnsubscriberAsync } from '@shared/utils/papi-util';

/** Interface for all extensions to implement */
export interface IExtension {
  /**
   * Sets up this extension! Runs when paranext wants this extension to activate. For example, activate() should register commands for this extension
   * @returns unsubscriber to run to deactivate this extension
   */
  activate: () => Promise<UnsubscriberAsync>;

  /**
   * Deactivate anything in this extension that is not covered by the unsubscriber returned from the activate function, unsubscribing from things and such.
   * @returns promise that resolves to true if successfully deactivated
   */
  deactivate?: UnsubscriberAsync;
}
