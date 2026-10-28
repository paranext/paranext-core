import { describe, expect, it, vi } from 'vitest';
import { stopChildProcessesInOrder } from '@main/services/process-shutdown-order.util';

/** A promise the test settles by hand, so it can look at what has happened before it settles */
function createDeferred() {
  let resolveDeferred: () => void = () => {};
  const promise = new Promise<void>((resolve) => {
    resolveDeferred = resolve;
  });
  return { promise, resolve: () => resolveDeferred() };
}

function createSteps() {
  const extensionHostClosed = createDeferred();
  const dataProviderClosed = createDeferred();
  const steps = {
    waitForExtensionHostToClose: vi.fn(() => extensionHostClosed.promise),
    closeWebSocketClients: vi.fn(),
    waitForDataProviderToClose: vi.fn(() => dataProviderClosed.promise),
  };
  return { steps, extensionHostClosed, dataProviderClosed };
}

describe('stopChildProcessesInOrder', () => {
  it('closes the websocket clients only once the extension host has closed', async () => {
    const { steps, extensionHostClosed, dataProviderClosed } = createSteps();

    const stopping = stopChildProcessesInOrder(steps);
    // Let anything that does not depend on the extension host closing run
    await Promise.resolve();
    await Promise.resolve();
    expect(steps.waitForExtensionHostToClose).toHaveBeenCalledTimes(1);
    expect(steps.closeWebSocketClients).not.toHaveBeenCalled();

    extensionHostClosed.resolve();
    await vi.waitFor(() => expect(steps.closeWebSocketClients).toHaveBeenCalledTimes(1));
    dataProviderClosed.resolve();
    await stopping;
  });

  it('starts waiting for the data provider only after closing its connection', async () => {
    const { steps, extensionHostClosed, dataProviderClosed } = createSteps();

    const stopping = stopChildProcessesInOrder(steps);
    await Promise.resolve();
    await Promise.resolve();
    expect(steps.waitForDataProviderToClose).not.toHaveBeenCalled();
    extensionHostClosed.resolve();
    await vi.waitFor(() => expect(steps.waitForDataProviderToClose).toHaveBeenCalledTimes(1));
    dataProviderClosed.resolve();
    await stopping;

    expect(steps.closeWebSocketClients.mock.invocationCallOrder[0]).toBeLessThan(
      steps.waitForDataProviderToClose.mock.invocationCallOrder[0],
    );
  });
});
