import { describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { PlatformEventEmitter } from 'platform-bible-utils';
import { NetworkObject } from '@shared/models/network-object.model';
import { createUseNetworkObjectHook } from '@renderer/hooks/hook-generators/create-use-network-object-hook.util';

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
});
