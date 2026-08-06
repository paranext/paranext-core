import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import {
  getAllOpenWebViewDefinitionsWithReachability,
  getOpenWebViewDefinitionsForWindow,
  startWebViewRoutingService,
} from '@main/services/web-view-routing.service';
import { getRegisteredProxy, withWindows } from '@main/services/__tests__/routing-proxy-test.util';
import type { WebViewServiceType } from '@shared/services/web-view.service-model';

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  getWindows: vi.fn(),
  getReadyWindowIds: vi.fn(),
  isWindowReady: vi.fn(),
  networkObjectGet: vi.fn(),
  networkObjectSet: vi.fn(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getWindows: mocks.getWindows,
  getReadyWindowIds: mocks.getReadyWindowIds,
  isWindowReady: mocks.isWindowReady,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet, set: mocks.networkObjectSet },
}));
vi.mock('@shared/services/network.service', () => ({ getNetworkEvent: () => vi.fn() }));

/** Capture the proxy the service registers under the generic name */
async function getProxy() {
  return getRegisteredProxy<WebViewServiceType>(mocks.networkObjectSet, startWebViewRoutingService);
}

/** A scoped per-window WebViewService whose web views are the given ids */
function windowService(openWebViewIds: string[]) {
  return {
    getOpenWebViewDefinition: vi.fn(async (id: string) =>
      openWebViewIds.includes(id) ? { id } : undefined,
    ),
    getAllOpenWebViewDefinitions: vi.fn(async () => openWebViewIds.map((id) => ({ id }))),
    openWebView: vi.fn(async () => 'opened'),
    reloadWebView: vi.fn(async () => 'reloaded'),
  };
}

describe('web view routing proxy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
    mocks.getWindows.mockReturnValue([]);
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.isWindowReady.mockReturnValue(true);
  });

  test('gathers open web views from every window, not just the focused one', async () => {
    withWindows(mocks, { 1: windowService(['a']), 2: windowService(['b', 'c']) });
    const proxy = await getProxy();

    const all = await proxy.getAllOpenWebViewDefinitions();

    expect(all.map((definition) => definition.id).sort()).toEqual(['a', 'b', 'c']);
  });

  test('does not ask a window that has not registered its services yet', async () => {
    // A window is tracked from the moment it is shown; asking it before its renderer registers
    // stalls the whole fan-out for the network service's registration retry to learn nothing
    const serving = windowService(['a']);
    const starting = windowService([]);
    withWindows(mocks, { 1: serving, 2: starting }, { unreadyWindowIds: [2] });
    const proxy = await getProxy();

    const all = await proxy.getAllOpenWebViewDefinitions();

    expect(starting.getAllOpenWebViewDefinitions).not.toHaveBeenCalled();
    expect(all.map((definition) => definition.id)).toEqual(['a']);
  });

  test('refuses to answer with a partial list when a ready window could not be asked', async () => {
    // Callers treat this as the whole picture. A window that failed to answer is indistinguishable
    // from one with nothing open, so quietly dropping it makes them act on tabs that do exist.
    const healthy = windowService(['a']);
    const broken = windowService([]);
    broken.getAllOpenWebViewDefinitions.mockRejectedValue(new Error('window went away'));
    withWindows(mocks, { 1: healthy, 2: broken });
    const proxy = await getProxy();

    await expect(proxy.getAllOpenWebViewDefinitions()).rejects.toThrow('unreachable');
  });

  test('reports which windows did not answer to callers that can act on a partial list', async () => {
    // Shutdown has one shot at this and no event stream to correct it later, so it takes what it
    // can get — but it has to know the answer is incomplete rather than reading it as "nothing open"
    const healthy = windowService(['a']);
    const broken = windowService([]);
    broken.getAllOpenWebViewDefinitions.mockRejectedValue(new Error('window went away'));
    withWindows(mocks, { 1: healthy, 2: broken });

    const { definitions, unreachableWindowIds } =
      await getAllOpenWebViewDefinitionsWithReachability();

    expect(definitions.map((definition) => definition.id)).toEqual(['a']);
    expect(unreachableWindowIds).toEqual([2]);
  });

  test('reloads a web view in the window that actually owns it, not the focused one', async () => {
    const focused = windowService([]);
    const owner = windowService(['owned-view']);
    withWindows(mocks, { 1: focused, 2: owner });
    const proxy = await getProxy();

    await proxy.reloadWebView('someType', 'owned-view');

    expect(owner.reloadWebView).toHaveBeenCalled();
    expect(focused.reloadWebView).not.toHaveBeenCalled();
  });

  test('falls back to the focused window when no window owns the web view', async () => {
    const focused = windowService([]);
    withWindows(mocks, { 1: focused, 2: windowService([]) });
    const proxy = await getProxy();

    await proxy.reloadWebView('someType', 'unknown-view');

    expect(focused.reloadWebView).toHaveBeenCalled();
  });

  test('opens an existing web view in its owning window when given an existingId', async () => {
    const focused = windowService([]);
    const owner = windowService(['existing-view']);
    withWindows(mocks, { 1: focused, 2: owner });
    const proxy = await getProxy();

    await proxy.openWebView('someType', undefined, { existingId: 'existing-view' });

    expect(owner.openWebView).toHaveBeenCalled();
    expect(focused.openWebView).not.toHaveBeenCalled();
  });

  test('opens a brand new web view in the focused window', async () => {
    const focused = windowService([]);
    const other = windowService([]);
    withWindows(mocks, { 1: focused, 2: other });
    const proxy = await getProxy();

    await proxy.openWebView('someType');

    expect(focused.openWebView).toHaveBeenCalled();
    expect(other.openWebView).not.toHaveBeenCalled();
  });

  test('asks the owning window for a definition once, and answers with what it already fetched', async () => {
    // Finding the owner means fetching the definition, so fetching it again to return it is a
    // second cross-process round trip for an answer already in hand — and the two can disagree
    const owner = windowService(['owned-view']);
    withWindows(mocks, { 1: windowService([]), 2: owner });
    const proxy = await getProxy();

    const definition = await proxy.getOpenWebViewDefinition('owned-view');

    expect(definition?.id).toBe('owned-view');
    expect(owner.getOpenWebViewDefinition).toHaveBeenCalledTimes(1);
  });

  test('does not ask a window that has not registered its services yet who owns a web view', async () => {
    const focused = windowService([]);
    const starting = windowService(['owned-view']);
    withWindows(mocks, { 1: focused, 2: starting }, { unreadyWindowIds: [2] });
    const proxy = await getProxy();

    await proxy.reloadWebView('someType', 'owned-view');

    expect(starting.getOpenWebViewDefinition).not.toHaveBeenCalled();
    expect(focused.reloadWebView).toHaveBeenCalled();
  });

  test('refuses to route rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);
    withWindows(mocks, {});
    const proxy = await getProxy();

    await expect(proxy.openWebView('someType')).rejects.toThrow('No windows available');
  });

  describe('a ready window whose WebView service has not registered yet', () => {
    // Readiness is keyed on the WINDOW service. A renderer starts its window, web view, notification
    // and dialog services concurrently, so a window can be ready while its WebView service is still
    // moments away — a window that cannot be asked, which is not a window that answered "nothing".

    test('refuses to answer with a list that leaves it out', async () => {
      withWindows(mocks, { 1: windowService(['a']), 2: undefined });
      const proxy = await getProxy();

      await expect(proxy.getAllOpenWebViewDefinitions()).rejects.toThrow('unreachable');
    });

    test('reports it as unreachable to callers that can act on a partial list', async () => {
      withWindows(mocks, { 1: windowService(['a']), 2: undefined });

      const { definitions, unreachableWindowIds } =
        await getAllOpenWebViewDefinitionsWithReachability();

      expect(definitions.map((definition) => definition.id)).toEqual(['a']);
      expect(unreachableWindowIds).toEqual([2]);
    });

    test('refuses to route an operation to the focused window as if nobody owned the web view', async () => {
      // Falling back would reload whatever the focused window happens to be showing instead of the
      // web view the caller named — which may well be in the window that could not be asked
      withWindows(mocks, { 1: windowService([]), 2: undefined });
      const proxy = await getProxy();

      await expect(proxy.reloadWebView('someType', 'owned-view')).rejects.toThrow('unreachable');
    });

    test('still answers when another window claims the web view', async () => {
      // A window that could not be asked only matters when nobody claimed the id
      const owner = windowService(['owned-view']);
      withWindows(mocks, { 1: owner, 2: undefined });
      const proxy = await getProxy();

      await expect(proxy.reloadWebView('someType', 'owned-view')).resolves.toBe('reloaded');
    });
  });

  describe('asking one specific window what it has open', () => {
    test('answers with what that window has open', async () => {
      withWindows(mocks, { 1: windowService(['a', 'b']) });

      const definitions = await getOpenWebViewDefinitionsForWindow(1);

      expect(definitions.map((definition) => definition.id)).toEqual(['a', 'b']);
    });

    test('refuses to answer "nothing open" for a window that was serving requests', async () => {
      // This is the read a closing window's sync depends on, and that window's own service is the
      // only thing that could ever list its editors. An empty answer here is indistinguishable from
      // the truth, so its unsynced work would be dropped with nothing to correct it later.
      withWindows(mocks, { 1: undefined });
      mocks.isWindowReady.mockReturnValue(true);

      await expect(getOpenWebViewDefinitionsForWindow(1)).rejects.toThrow('could not be read');
    });

    test('answers nothing open for a window whose renderer never registered', async () => {
      // A window that was never ready never had a web view in it, so there is nothing to warn about
      withWindows(mocks, { 1: undefined });
      mocks.isWindowReady.mockReturnValue(false);

      await expect(getOpenWebViewDefinitionsForWindow(1)).resolves.toEqual([]);
    });
  });
});
