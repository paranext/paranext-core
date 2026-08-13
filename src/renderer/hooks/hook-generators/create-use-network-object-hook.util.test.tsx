import { describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { PlatformEventEmitter } from 'platform-bible-utils';
import { NetworkObject } from '@shared/models/network-object.model';
import { createUseNetworkObjectHook } from '@renderer/hooks/hook-generators/create-use-network-object-hook.util';

/** Handlers the hooks subscribed to the "a network object was created" event */
const { createdNetworkObjectHandlers } = vi.hoisted(() => {
  const handlers: ((details: { id: string }) => void)[] = [];
  return { createdNetworkObjectHandlers: handlers };
});

// The hook watches for something being published under the name it wants. Mock the service so the
// tests can publish on demand — and so importing the hook does not pull the whole network stack in.
vi.mock('@shared/services/network-object.service', () => ({
  onDidCreateNetworkObject: (handler: (details: { id: string }) => void) => {
    createdNetworkObjectHandlers.push(handler);
    return () => {
      const handlerIndex = createdNetworkObjectHandlers.indexOf(handler);
      if (handlerIndex < 0) return false;
      createdNetworkObjectHandlers.splice(handlerIndex, 1);
      return true;
    };
  },
}));

/** Stand in for some process publishing a network object under the given id */
function publishNetworkObject(id: string) {
  [...createdNetworkObjectHandlers].forEach((handler) => handler({ id }));
}

/** A stand-in for a network object, with a handle that fires its `onDidDispose` */
function makeNetworkObject(label: string) {
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

// An app-global network object hosted by one window is re-published by another window when that one
// goes away, under the same name. A hook holding the old one is told it was disposed, and what it
// should serve from then on is whatever answers to that name now.
describe('useNetworkObject hooks after the object they hold is disposed', () => {
  it('resolves the object again, so a re-published one reaches the component', async () => {
    const firstHost = makeNetworkObject('first host');
    const secondHost = makeNetworkObject('second host');
    const getNetworkObject = vi
      .fn()
      .mockResolvedValueOnce(firstHost.networkObject)
      .mockResolvedValue(secondHost.networkObject);
    const useNetworkObject = createUseNetworkObjectHook(getNetworkObject);

    const { result } = renderHook(() => useNetworkObject('TheAppGlobalObject'));
    await waitFor(() => expect(result.current).toBe(firstHost.networkObject));

    act(() => firstHost.dispose());

    await waitFor(() => expect(result.current).toBe(secondHost.networkObject));
  });

  it('serves nothing while there is nothing to serve, rather than the disposed object', async () => {
    const firstHost = makeNetworkObject('first host');
    const getNetworkObject = vi
      .fn()
      .mockResolvedValueOnce(firstHost.networkObject)
      .mockResolvedValue(undefined);
    const useNetworkObject = createUseNetworkObjectHook(getNetworkObject);

    const { result } = renderHook(() => useNetworkObject('TheAppGlobalObject'));
    await waitFor(() => expect(result.current).toBe(firstHost.networkObject));

    act(() => firstHost.dispose());

    // Calls on a disposed object's proxy throw, so handing it back would be worse than nothing
    await waitFor(() => expect(result.current).toBeUndefined());
  });

  // The disposal drives exactly one lookup, and the window taking the object over may not have
  // published it yet when that lookup runs. Without a second trigger the component serves nothing
  // for the rest of its life over a gap that closed a moment later.
  it('looks the name up again when a window publishes under it after the gap', async () => {
    const firstHost = makeNetworkObject('first host');
    const secondHost = makeNetworkObject('second host');
    const getNetworkObject = vi
      .fn()
      .mockResolvedValueOnce(firstHost.networkObject)
      // The lookup the disposal drives lands before any window has re-published the name
      .mockResolvedValueOnce(undefined)
      .mockResolvedValue(secondHost.networkObject);
    const useNetworkObject = createUseNetworkObjectHook(getNetworkObject);

    const { result } = renderHook(() => useNetworkObject('TheAppGlobalObject'));
    await waitFor(() => expect(result.current).toBe(firstHost.networkObject));
    act(() => firstHost.dispose());
    await waitFor(() => expect(result.current).toBeUndefined());

    // A publication under some other name says nothing about the name this hook wants
    act(() => publishNetworkObject('SomeOtherObject'));
    await waitFor(() => expect(getNetworkObject).toHaveBeenCalledTimes(2));

    act(() => publishNetworkObject('TheAppGlobalObject'));

    await waitFor(() => expect(result.current).toBe(secondHost.networkObject));
  });

  // Almost no caller is asked for the id its object is registered under — a data provider name
  // becomes `{name}-data`, a web view id becomes `webViewController{id}` — so which publication
  // means "the thing this hook wants is back" is the caller's to answer.
  it('lets the caller decide which published object answers to the name it was asked for', async () => {
    const firstHost = makeNetworkObject('first host');
    const secondHost = makeNetworkObject('second host');
    const getNetworkObject = vi
      .fn()
      .mockResolvedValueOnce(firstHost.networkObject)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValue(secondHost.networkObject);
    const useNetworkObject = createUseNetworkObjectHook(
      getNetworkObject,
      undefined,
      (networkObjectDetails, networkObjectSource) =>
        networkObjectDetails.id === `${networkObjectSource}-suffixed`,
    );

    const { result } = renderHook(() => useNetworkObject('TheAppGlobalObject'));
    await waitFor(() => expect(result.current).toBe(firstHost.networkObject));
    act(() => firstHost.dispose());
    await waitFor(() => expect(result.current).toBeUndefined());

    // The source string itself is not what this caller's objects are registered under
    act(() => publishNetworkObject('TheAppGlobalObject'));
    await waitFor(() => expect(getNetworkObject).toHaveBeenCalledTimes(2));

    act(() => publishNetworkObject('TheAppGlobalObject-suffixed'));

    await waitFor(() => expect(result.current).toBe(secondHost.networkObject));
  });
});
