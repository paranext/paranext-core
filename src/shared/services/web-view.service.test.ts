import { vi } from 'vitest';
import { NetworkObject } from '@shared/models/network-object.model';
import { networkObjectService } from '@shared/services/network-object.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { WebViewServiceType } from '@shared/services/web-view.service-model';
import { webViewService } from './web-view.service';

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: vi.fn() },
}));

vi.mock('@shared/services/network-object-status.service', () => ({
  networkObjectStatusService: { waitForNetworkObject: vi.fn() },
}));

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn()),
}));

describe('webViewService initialization', () => {
  it('retries initialization after waiting for the WebViewService network object fails', async () => {
    // Simulate the renderer not registering WebViewService within the timeout (e.g. a slow
    // renderer startup in development)
    vi.mocked(networkObjectStatusService.waitForNetworkObject).mockRejectedValueOnce(
      new Error('Timeout reached waiting for wait-for-net-obj to settle'),
    );

    await expect(webViewService.openWebView('test.webView')).rejects.toThrow('Timeout reached');

    // Simulate the renderer having registered WebViewService by now
    vi.mocked(networkObjectStatusService.waitForNetworkObject).mockResolvedValue({
      functionNames: ['openWebView'],
      id: 'WebViewService',
      objectType: 'object',
    });
    const openWebView = vi.fn(async () => 'web-view-id');
    // The get() mock only implements the openWebView method this test calls, not all of NetworkObject
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(networkObjectService.get).mockResolvedValue({
      openWebView,
    } as unknown as NetworkObject<WebViewServiceType>);

    // Without retrying initialization, this would reject with the cached timeout error
    await expect(webViewService.openWebView('test.webView')).resolves.toBe('web-view-id');
    expect(openWebView).toHaveBeenCalledWith('test.webView');
  });
});
