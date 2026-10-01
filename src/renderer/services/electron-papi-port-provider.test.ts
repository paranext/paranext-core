import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { createElectronPapiPortProvider } from '@renderer/services/electron-papi-port-provider';
import { PAPI_PORT_CHANNEL, PAPI_PORT_ERROR_CHANNEL } from '@shared/data/papi-port.model';

const requestPort = vi.fn();

/** Jsdom's window.postMessage sets neither `source` nor `ports`, so events are dispatched by hand */
function postFromPreload(data: unknown, ports: unknown[] = [], source: unknown = window) {
  window.dispatchEvent(
    new MessageEvent('message', {
      data,
      // Stand-in ports and sources; the provider only passes them through or compares identity
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      ports: ports as MessagePort[],
      // Stand-in ports and sources; the provider only passes them through or compares identity
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      source: source as Window,
    }),
  );
}

describe('createElectronPapiPortProvider', () => {
  beforeEach(() => {
    requestPort.mockReset();
    vi.stubGlobal('electronAPI', { papi: { requestPort } });
    // The provider reads the bridge off the window it is given
    Object.assign(window, { electronAPI: { papi: { requestPort } } });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('installs its listener before asking, then hands over the first port with its window id', () => {
    const provider = createElectronPapiPortProvider(window);
    const onPort = vi.fn();
    const onError = vi.fn();
    let askedBeforeListening = false;
    requestPort.mockImplementation(() => {
      // Reply synchronously inside the request; a listener installed afterwards would miss it
      postFromPreload({ type: PAPI_PORT_CHANNEL, windowId: 'w1' }, [{ fake: 'port' }]);
      askedBeforeListening = onPort.mock.calls.length === 0;
    });

    provider({ onPort, onError });

    expect(requestPort).toHaveBeenCalledTimes(1);
    expect(askedBeforeListening).toBe(false);
    expect(onPort).toHaveBeenCalledWith({ fake: 'port' }, 'w1');
    expect(onError).not.toHaveBeenCalled();
  });

  test('ignores messages whose source is not this window, whose shape is wrong, or that carry no port', () => {
    const provider = createElectronPapiPortProvider(window);
    const onPort = vi.fn();
    const onError = vi.fn();
    provider({ onPort, onError });

    postFromPreload({ type: PAPI_PORT_CHANNEL, windowId: 'w1' }, [{ fake: 'port' }], {
      not: 'window',
    });
    postFromPreload('electronAPI:papi.port', [{ fake: 'port' }]);
    postFromPreload({ type: PAPI_PORT_CHANNEL, windowId: 'w1' }, []);

    expect(onPort).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  test('reports exactly one outcome and then stops listening', () => {
    const provider = createElectronPapiPortProvider(window);
    const onPort = vi.fn();
    const onError = vi.fn();
    provider({ onPort, onError });

    postFromPreload({ type: PAPI_PORT_CHANNEL, windowId: 'w1' }, [{ fake: 'first' }]);
    postFromPreload({ type: PAPI_PORT_CHANNEL, windowId: 'w1' }, [{ fake: 'second' }]);
    postFromPreload({ type: PAPI_PORT_ERROR_CHANNEL, reason: 'late' });

    expect(onPort).toHaveBeenCalledTimes(1);
    expect(onPort).toHaveBeenCalledWith({ fake: 'first' }, 'w1');
    expect(onError).not.toHaveBeenCalled();
  });

  test('relays a port error', () => {
    const provider = createElectronPapiPortProvider(window);
    const onPort = vi.fn();
    const onError = vi.fn();
    provider({ onPort, onError });

    postFromPreload({ type: PAPI_PORT_ERROR_CHANNEL, reason: 'network not ready' });

    expect(onError).toHaveBeenCalledWith('network not ready');
    expect(onPort).not.toHaveBeenCalled();
  });

  test('reports an error instead of throwing when the bridge is missing', () => {
    Object.assign(window, { electronAPI: {} });
    const provider = createElectronPapiPortProvider(window);
    const onError = vi.fn();

    provider({ onPort: vi.fn(), onError });

    expect(onError).toHaveBeenCalledWith(expect.stringContaining('electronAPI.papi.requestPort'));
  });
});
