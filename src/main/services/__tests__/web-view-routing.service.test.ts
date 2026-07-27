import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startWebViewRoutingService } from '@main/services/web-view-routing.service';

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  getWindows: vi.fn(),
  networkObjectGet: vi.fn(),
  networkObjectSet: vi.fn(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getWindows: mocks.getWindows,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet, set: mocks.networkObjectSet },
}));
vi.mock('@shared/services/network.service', () => ({ getNetworkEvent: () => vi.fn() }));
vi.mock('@shared/services/web-view.service-model', () => ({
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW: 'webView:onDidCloseWebView',
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW: 'webView:onDidOpenWebView',
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW: 'webView:onDidUpdateWebView',
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE: 'WebViewService',
  getWebViewController: vi.fn(),
}));

/** Capture the proxy the service registers under the generic name */
async function getProxy() {
  mocks.networkObjectSet.mockResolvedValue(undefined);
  await startWebViewRoutingService();
  return mocks.networkObjectSet.mock.calls[0][1];
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

/** Wire windows 1..n, each serving the scoped service given for it */
function withWindows(servicesByWindowId: Record<number, ReturnType<typeof windowService>>) {
  const ids = Object.keys(servicesByWindowId).map(Number);
  mocks.getWindows.mockReturnValue(ids.map((id) => ({ id })));
  mocks.networkObjectGet.mockImplementation(async (name: string) => {
    const windowId = Number(name.split('-').pop());
    return servicesByWindowId[windowId];
  });
}

describe('web view routing proxy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
  });

  test('gathers open web views from every window, not just the focused one', async () => {
    withWindows({ 1: windowService(['a']), 2: windowService(['b', 'c']) });
    const proxy = await getProxy();

    const all = await proxy.getAllOpenWebViewDefinitions();

    expect(all.map((d: { id: string }) => d.id).sort()).toEqual(['a', 'b', 'c']);
  });

  test('returns the windows it could reach when one window fails, rather than failing entirely', async () => {
    const healthy = windowService(['a']);
    const broken = windowService([]);
    broken.getAllOpenWebViewDefinitions.mockRejectedValue(new Error('window went away'));
    withWindows({ 1: healthy, 2: broken });
    const proxy = await getProxy();

    const all = await proxy.getAllOpenWebViewDefinitions();

    expect(all.map((d: { id: string }) => d.id)).toEqual(['a']);
  });

  test('reloads a web view in the window that actually owns it, not the focused one', async () => {
    const focused = windowService([]);
    const owner = windowService(['owned-view']);
    withWindows({ 1: focused, 2: owner });
    const proxy = await getProxy();

    await proxy.reloadWebView('someType', 'owned-view');

    expect(owner.reloadWebView).toHaveBeenCalled();
    expect(focused.reloadWebView).not.toHaveBeenCalled();
  });

  test('falls back to the focused window when no window owns the web view', async () => {
    const focused = windowService([]);
    withWindows({ 1: focused, 2: windowService([]) });
    const proxy = await getProxy();

    await proxy.reloadWebView('someType', 'unknown-view');

    expect(focused.reloadWebView).toHaveBeenCalled();
  });

  test('opens an existing web view in its owning window when given an existingId', async () => {
    const focused = windowService([]);
    const owner = windowService(['existing-view']);
    withWindows({ 1: focused, 2: owner });
    const proxy = await getProxy();

    await proxy.openWebView('someType', undefined, { existingId: 'existing-view' });

    expect(owner.openWebView).toHaveBeenCalled();
    expect(focused.openWebView).not.toHaveBeenCalled();
  });

  test('opens a brand new web view in the focused window', async () => {
    const focused = windowService([]);
    const other = windowService([]);
    withWindows({ 1: focused, 2: other });
    const proxy = await getProxy();

    await proxy.openWebView('someType');

    expect(focused.openWebView).toHaveBeenCalled();
    expect(other.openWebView).not.toHaveBeenCalled();
  });

  test('refuses to route rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);
    mocks.getWindows.mockReturnValue([]);
    const proxy = await getProxy();

    await expect(proxy.openWebView('someType')).rejects.toThrow('No windows available');
  });
});
