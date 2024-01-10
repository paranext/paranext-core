import { UnsubscriberAsync } from 'platform-bible-utils';
import { ExecutionActivationContext } from '@extension-host/extension-types/extension-activation-context.model';

/** Interface for all extensions to implement */
export interface IExtension {
  /**
   * Sets up this extension! Runs when paranext wants this extension to activate. For example,
   * activate() should register commands for this extension
   *
   * @param context Data and utilities that are specific to this particular extension
   */
  activate: (context: ExecutionActivationContext) => Promise<void>;

  /**
   * Deactivate anything in this extension that is not covered by the registrations in the context
   * object given to activate().
   *
   * @returns Promise that resolves to true if successfully deactivated
   */
  deactivate?: UnsubscriberAsync;
}
