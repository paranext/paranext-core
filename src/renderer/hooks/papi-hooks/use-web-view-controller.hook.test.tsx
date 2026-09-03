import { describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { PlatformEventEmitter } from 'platform-bible-utils';
import { NetworkObject, NetworkObjectDetails } from '@shared/models/network-object.model';
import { networkObjectService } from '@shared/services/network-object.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import {
  getWebViewControllerObjectId,
  WEB_VIEW_CONTROLLER_OBJECT_TYPE,
} from '@shared/services/web-view.service-model';
import { useWebViewController } from '@renderer/hooks/papi-hooks/use-web-view-controller.hook';

const WEB_VIEW_ID = 'web-view-that-gets-re-hosted';
const WEB_VIEW_TYPE = 'platform.placeholderWebView';

/** Handlers the hook subscribed to the "a network object was created" event */
const { createdNetworkObjectHandlers } = vi.hoisted(() => {
  const handlers: ((details: NetworkObjectDetails) => void)[] = [];
  return { createdNetworkObjectHandlers: handlers };
});

// Mock the layer the web view service talks to rather than the service itself, so this test runs
// the real `getWebViewController` — including the web-view-id-to-object-id conversion that decides
// whether the hook's re-lookup listener can ever match.
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: vi.fn() },
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

vi.mock('@shared/services/network-object-status.service', () => ({
  networkObjectStatusService: { waitForNetworkObject: vi.fn() },
}));

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn()),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

/** Stand in for some process publishing a network object under the given id */
function publishNetworkObject(id: string) {
  [...createdNetworkObjectHandlers].forEach((handler) =>
    handler({ id, objectType: WEB_VIEW_CONTROLLER_OBJECT_TYPE, functionNames: [] }),
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

/** A stand-in for a web view controller network object, with a handle that fires `onDidDispose` */
function makeWebViewController(label: string) {
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

// `useWebViewController` is handed a web view id, but the controller is registered on the network
// under the object id derived from that web view id. Comparing the two directly is comparing things
// that are never equal, so the listener that is supposed to notice a controller being re-published
// for this web view can never fire.
describe('useWebViewController after the controller it holds is disposed', () => {
  it('looks the controller up again when one is published under its network object id', async () => {
    vi.mocked(networkObjectStatusService.waitForNetworkObject).mockResolvedValue({
      id: getWebViewControllerObjectId(WEB_VIEW_ID),
      objectType: WEB_VIEW_CONTROLLER_OBJECT_TYPE,
      functionNames: [],
      attributes: { webViewType: WEB_VIEW_TYPE },
    });
    const firstHost = makeWebViewController('first host');
    const secondHost = makeWebViewController('second host');
    vi.mocked(networkObjectService.get)
      .mockResolvedValueOnce(firstHost.networkObject)
      // The lookup the disposal drives lands before any process has re-published the controller
      .mockResolvedValueOnce(undefined)
      .mockResolvedValue(secondHost.networkObject);

    const { result } = renderHook(() => useWebViewController(WEB_VIEW_TYPE, WEB_VIEW_ID));
    await waitFor(() => expect(result.current).toBe(firstHost.networkObject));

    act(() => firstHost.dispose());
    await waitFor(() => expect(result.current).toBeUndefined());

    // Nothing is ever registered under the bare web view id, so this must not be mistaken for the
    // controller coming back
    act(() => publishNetworkObject(WEB_VIEW_ID));
    await settleEverythingPending();
    expect(vi.mocked(networkObjectService.get)).toHaveBeenCalledTimes(2);
    expect(result.current).toBeUndefined();

    act(() => publishNetworkObject(getWebViewControllerObjectId(WEB_VIEW_ID)));

    await waitFor(() => expect(result.current).toBe(secondHost.networkObject));
  });
});
