import { UnsubscriberAsync } from '@shared/utils/papi-util';
import { ExecutionActivationContext } from '@extension-host/extension-types/extension-activation-context.model';

/** Interface for all extensions to implement */
export interface IExtension {
  /**
   * Sets up this extension! Runs when paranext wants this extension to activate. For example, activate() should register commands for this extension
   * @param context data and utilities that are specific to this particular extension
   * @returns unsubscriber to run to deactivate this extension
   */
  activate: (context: ExecutionActivationContext) => Promise<UnsubscriberAsync>;

  /**
   * Deactivate anything in this extension that is not covered by the unsubscriber returned from the activate function, unsubscribing from things and such.
   * @returns promise that resolves to true if successfully deactivated
   */
  deactivate?: UnsubscriberAsync;
}
