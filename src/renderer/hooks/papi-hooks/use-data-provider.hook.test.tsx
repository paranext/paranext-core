import { describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { PlatformEventEmitter } from 'platform-bible-utils';
import { NetworkObject, NetworkObjectDetails } from '@shared/models/network-object.model';
import { networkObjectService } from '@shared/services/network-object.service';
import { getDataProviderObjectId } from '@shared/services/data-provider.service';
import { useDataProvider } from '@renderer/hooks/papi-hooks/use-data-provider.hook';

/** Handlers the hook subscribed to the "a network object was created" event */
const { createdNetworkObjectHandlers } = vi.hoisted(() => {
  const handlers: ((details: NetworkObjectDetails) => void)[] = [];
  return { createdNetworkObjectHandlers: handlers };
});

// Mock the layer the data provider service talks to rather than the service itself, so this test
// runs the real `dataProviderService.get` — including the name-to-object-id conversion that decides
// whether the hook's re-lookup listener can ever match.
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: vi.fn() },
  overrideDispose: vi.fn(),
  onDidCreateNetworkObject: (handler: (details: NetworkObjectDetails) => void) => {
    createdNetworkObjectHandlers.push(handler);
    return () => {
      const handlerIndex = createdNetworkObjectHandlers.indexOf(handler);
      if (handlerIndex < 0) return false;
      createdNetworkObjectHandlers.splice(handlerIndex, 1);
      return true;
    };
  },
}));

vi.mock('@shared/services/network.service', () => ({
  initialize: vi.fn(() => Promise.resolve()),
  getNetworkEvent: vi.fn(() => vi.fn()),
  createNetworkEventEmitterAsync: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

vi.mock('@shared/services/notification.service', () => ({
  notificationService: { send: vi.fn() },
}));

/** Stand in for some process publishing a network object under the given id */
function publishNetworkObject(id: string) {
  [...createdNetworkObjectHandlers].forEach((handler) =>
    handler({ id, objectType: 'dataProvider', functionNames: [] }),
  );
}

/**
 * Let every lookup a publication could have started run to completion, so that "nothing happened"
 * is a fact rather than a race the assertion happened to win.
 */
async function settleEverythingPending() {
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  });
}

/** A stand-in for a data provider network object, with a handle that fires its `onDidDispose` */
function makeDataProvider(label: string) {
  const disposeEmitter = new PlatformEventEmitter<void>();
  return {
    // The hook only reads `onDidDispose`; the label is how a test tells the two apart.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    networkObject: {
      label,
      onDidDispose: disposeEmitter.event,
    } as unknown as NetworkObject<object>,
    dispose: () => disposeEmitter.emit(),
  };
}

// `useDataProvider` is handed a provider NAME, but the provider is registered on the network under
// the object id derived from that name. Comparing the two directly is comparing things that are
// never equal, so the listener that is supposed to notice a provider being re-published under the
// name this hook wants can never fire — and for this hook there is nothing else to fall back on,
// since `networkObjectService.get` does not wait for an object that is not there yet.
describe('useDataProvider after the provider it holds is disposed', () => {
  it('looks the provider up again when one is published under its network object id', async () => {
    const firstHost = makeDataProvider('first host');
    const secondHost = makeDataProvider('second host');
    vi.mocked(networkObjectService.get)
      .mockResolvedValueOnce(firstHost.networkObject)
      // The lookup the disposal drives lands before any process has re-published the provider
      .mockResolvedValueOnce(undefined)
      .mockResolvedValue(secondHost.networkObject);

    const { result } = renderHook(() => useDataProvider('platform.placeholder'));
    await waitFor(() => expect(result.current).toBe(firstHost.networkObject));

    act(() => firstHost.dispose());
    await waitFor(() => expect(result.current).toBeUndefined());

    // Nothing is ever registered under the bare provider name, so this must not be mistaken for the
    // provider coming back
    act(() => publishNetworkObject('platform.placeholder'));
    await settleEverythingPending();
    expect(vi.mocked(networkObjectService.get)).toHaveBeenCalledTimes(2);
    expect(result.current).toBeUndefined();

    act(() => publishNetworkObject(getDataProviderObjectId('platform.placeholder')));

    await waitFor(() => expect(result.current).toBe(secondHost.networkObject));
  });
});
