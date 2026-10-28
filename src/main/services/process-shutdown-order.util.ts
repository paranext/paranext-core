/** The steps that stop main's child processes on quit, passed in so their order can be tested */
export type ChildProcessShutdownSteps = {
  /** Waits for the extension host to exit, killing it if it takes too long */
  waitForExtensionHostToClose: () => Promise<void>;
  /** Closes the PAPI websocket clients still connected, telling each the app is shutting down */
  closeWebSocketClients: () => void;
  /** Waits for the .NET data provider to exit, killing it if it takes too long */
  waitForDataProviderToClose: () => Promise<void>;
};

/**
 * Stops the extension host and the .NET data provider, in the order their dependencies need.
 *
 * The extension host goes first, while the data provider is still connected: its extensions may
 * still call the data provider as they shut down. The data provider runs until its PAPI connection
 * drops and only then does its own shutdown work, such as releasing the Send/Receive locks it
 * holds, so its connection is closed before waiting for it to exit; the wait kills it if it does
 * not exit in time. With the extension host gone, the websocket clients still connected are the
 * data provider and any external tool, and the network is going down anyway.
 *
 * @param steps How to carry out each step
 */
export async function stopChildProcessesInOrder(steps: ChildProcessShutdownSteps): Promise<void> {
  await steps.waitForExtensionHostToClose();
  steps.closeWebSocketClients();
  await steps.waitForDataProviderToClose();
}
