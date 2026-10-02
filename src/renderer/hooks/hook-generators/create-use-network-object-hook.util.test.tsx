import { describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { PlatformEventEmitter } from 'platform-bible-utils';
import { NetworkObject } from '@shared/models/network-object.model';
import {
  createUseNetworkObjectHook,
  createUseNetworkObjectStateHook,
} from '@renderer/hooks/hook-generators/create-use-network-object-hook.util';

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

// A network object is looked up by name, and the process answering that name can be replaced under
// it — `platform.restartExtensionHost` registers the same data provider names on a fresh process.
// A hook holding the old object is told it was disposed, and what it should serve from then on is
// whatever answers to that name now.
describe('useNetworkObject hooks after the object they hold is disposed', () => {
  it('resolves the name again, so the object registered under it next reaches the component', async () => {
    const firstRegistration = makeNetworkObject('first registration');
    const secondRegistration = makeNetworkObject('second registration');
    const getNetworkObject = vi
      .fn()
      .mockResolvedValueOnce(firstRegistration.networkObject)
      .mockResolvedValue(secondRegistration.networkObject);
    const useNetworkObject = createUseNetworkObjectHook(getNetworkObject);

    const { result } = renderHook(() => useNetworkObject('TheNetworkObject'));
    await waitFor(() => expect(result.current).toBe(firstRegistration.networkObject));

    act(() => firstRegistration.dispose());

    await waitFor(() => expect(result.current).toBe(secondRegistration.networkObject));
  });

  it('serves nothing while there is nothing to serve, rather than the disposed object', async () => {
    const firstRegistration = makeNetworkObject('first registration');
    const getNetworkObject = vi
      .fn()
      .mockResolvedValueOnce(firstRegistration.networkObject)
      .mockResolvedValue(undefined);
    const useNetworkObject = createUseNetworkObjectHook(getNetworkObject);

    const { result } = renderHook(() => useNetworkObject('TheNetworkObject'));
    await waitFor(() => expect(result.current).toBe(firstRegistration.networkObject));

    act(() => firstRegistration.dispose());

    // Calls on a disposed object's proxy throw, so handing it back would be worse than nothing
    await waitFor(() => expect(result.current).toBeUndefined());
  });

  // The disposal drives exactly one lookup, and whatever answers the name next may not have
  // registered yet when that lookup runs. Without a second trigger the component serves nothing
  // for the rest of its life over a gap that closed a moment later.
  it('looks the name up again when something is published under it after the gap', async () => {
    const firstRegistration = makeNetworkObject('first registration');
    const secondRegistration = makeNetworkObject('second registration');
    const getNetworkObject = vi
      .fn()
      .mockResolvedValueOnce(firstRegistration.networkObject)
      // The lookup the disposal drives lands before anything has registered under the name again
      .mockResolvedValueOnce(undefined)
      .mockResolvedValue(secondRegistration.networkObject);
    const useNetworkObject = createUseNetworkObjectHook(getNetworkObject);

    const { result } = renderHook(() => useNetworkObject('TheNetworkObject'));
    await waitFor(() => expect(result.current).toBe(firstRegistration.networkObject));
    act(() => firstRegistration.dispose());
    await waitFor(() => expect(result.current).toBeUndefined());

    // A publication under some other name says nothing about the name this hook wants
    act(() => publishNetworkObject('SomeOtherObject'));
    await waitFor(() => expect(getNetworkObject).toHaveBeenCalledTimes(2));

    act(() => publishNetworkObject('TheNetworkObject'));

    await waitFor(() => expect(result.current).toBe(secondRegistration.networkObject));
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

// The state hook exists because `NetworkObject | undefined` cannot say WHICH of "nothing asked",
// "in flight", and "not available" it means — and, across a source change, cannot say that the
// object it is handing over belongs to the source the caller has stopped asking about.
describe('useNetworkObjectState', () => {
  /**
   * A lookup that is never expected to run, typed so the generated hook still takes a source
   * argument — a bare `vi.fn()` leaves the generator nothing to infer the parameters from.
   */
  const unusedLookup = () =>
    vi.fn<(source: string | NetworkObject<object> | undefined) => Promise<undefined>>(
      async () => undefined,
    );

  it('reports noSource when there is nothing to look up', () => {
    const useNetworkObjectState = createUseNetworkObjectStateHook(unusedLookup());

    const { result } = renderHook(() => useNetworkObjectState(undefined));

    expect(result.current).toEqual({ status: 'noSource' });
  });

  it('reports loading until the object for the source arrives, then ready', async () => {
    const registration = makeNetworkObject('the object');
    let resolveLookup: (networkObject: NetworkObject<object>) => void = () => {};
    const useNetworkObjectState = createUseNetworkObjectStateHook(
      vi.fn<(source: string | NetworkObject<object> | undefined) => Promise<NetworkObject<object>>>(
        () =>
          new Promise<NetworkObject<object>>((resolve) => {
            resolveLookup = resolve;
          }),
      ),
    );

    const { result } = renderHook(() => useNetworkObjectState('TheNetworkObject'));
    expect(result.current).toEqual({ status: 'loading' });

    await act(async () => {
      resolveLookup(registration.networkObject);
    });
    await waitFor(() =>
      expect(result.current).toEqual({
        status: 'ready',
        networkObject: registration.networkObject,
      }),
    );
  });

  it('reports loading — not the previous object — from the render the source changes on', async () => {
    const first = makeNetworkObject('first source');
    const getNetworkObject = vi
      .fn()
      .mockResolvedValueOnce(first.networkObject)
      .mockImplementationOnce(() => new Promise<NetworkObject<object>>(() => {}));
    const useNetworkObjectState = createUseNetworkObjectStateHook(getNetworkObject);

    const { result, rerender } = renderHook(
      ({ source }: { source: string }) => useNetworkObjectState(source),
      { initialProps: { source: 'FirstSource' } },
    );
    await waitFor(() => expect(result.current.status).toBe('ready'));

    rerender({ source: 'SecondSource' });

    // This is the whole point: the caller can tell that what it had no longer answers its question,
    // so it can neither display nor write through it.
    expect(result.current).toEqual({ status: 'loading' });
  });

  it('reports unavailable when the lookup rejects', async () => {
    const rejection = new Error('the lookup blew up');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const useNetworkObjectState = createUseNetworkObjectStateHook(
      vi.fn().mockRejectedValue(rejection),
    );

    const { result } = renderHook(() => useNetworkObjectState('TheNetworkObject'));

    // Distinguishable from `loading`, so a consumer can report a dead end instead of spinning.
    await waitFor(() =>
      expect(result.current).toEqual({ status: 'unavailable', error: rejection }),
    );
    vi.restoreAllMocks();
  });

  it('reports unavailable when nothing is registered under the name', async () => {
    const useNetworkObjectState = createUseNetworkObjectStateHook(
      vi.fn().mockResolvedValue(undefined),
    );

    const { result } = renderHook(() => useNetworkObjectState('TheNetworkObject'));

    await waitFor(() => expect(result.current).toEqual({ status: 'unavailable' }));
  });

  it('goes back to loading when the object it was serving is disposed', async () => {
    const registration = makeNetworkObject('the object');
    const getNetworkObject = vi
      .fn()
      .mockResolvedValueOnce(registration.networkObject)
      .mockImplementation(() => new Promise<NetworkObject<object>>(() => {}));
    const useNetworkObjectState = createUseNetworkObjectStateHook(getNetworkObject);

    const { result } = renderHook(() => useNetworkObjectState('TheNetworkObject'));
    await waitFor(() => expect(result.current.status).toBe('ready'));

    // A disposal drives a re-lookup, which is a wait — not a dead end.
    act(() => registration.dispose());

    await waitFor(() => expect(result.current.status).toBe('loading'));
  });

  it('serves an object it was handed directly as ready', () => {
    const registration = makeNetworkObject('handed in');
    const useNetworkObjectState = createUseNetworkObjectStateHook(unusedLookup());

    const { result } = renderHook(() => useNetworkObjectState(registration.networkObject));

    expect(result.current).toEqual({ status: 'ready', networkObject: registration.networkObject });
  });
});
