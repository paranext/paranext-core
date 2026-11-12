import { WEBSOCKET_PORT } from '@shared/data/rpc.model';
import { describe, expect, it, vi } from 'vitest';
import {
  isPapiPortWebSocketRequest,
  PapiPortRequestDetails,
  registerPapiPortRequestBlock,
} from './papi-port-request-block.util';

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn() },
}));

describe('isPapiPortWebSocketRequest', () => {
  it.each([
    `ws://localhost:${WEBSOCKET_PORT}`,
    `ws://127.0.0.1:${WEBSOCKET_PORT}/`,
    `ws://[::1]:${WEBSOCKET_PORT}`,
    `wss://example.com:${WEBSOCKET_PORT}/path`,
  ])('cancels a WebSocket to %s', (url) => {
    expect(isPapiPortWebSocketRequest({ url, resourceType: 'webSocket' })).toBe(true);
  });

  it('lets a WebSocket to another port through', () => {
    expect(
      isPapiPortWebSocketRequest({ url: 'ws://localhost:1212/ws', resourceType: 'webSocket' }),
    ).toBe(false);
  });

  it('lets a WebSocket with no explicit port through', () => {
    expect(
      isPapiPortWebSocketRequest({ url: 'wss://example.com/socket', resourceType: 'webSocket' }),
    ).toBe(false);
  });

  it.each(['xhr', 'mainFrame', 'subFrame', 'other'])(
    'lets a %s request to the PAPI port through',
    (resourceType) => {
      expect(
        isPapiPortWebSocketRequest({ url: `http://localhost:${WEBSOCKET_PORT}`, resourceType }),
      ).toBe(false);
    },
  );

  it('lets an unparseable URL through', () => {
    expect(isPapiPortWebSocketRequest({ url: 'not a url', resourceType: 'webSocket' })).toBe(false);
  });
});

describe('registerPapiPortRequestBlock', () => {
  function registerAndGetListener() {
    let listener:
      | ((details: PapiPortRequestDetails, callback: (r: { cancel?: boolean }) => void) => void)
      | undefined;
    registerPapiPortRequestBlock({
      webRequest: {
        onBeforeRequest: (registered) => {
          listener = registered;
        },
      },
    });
    if (!listener) throw new Error('No onBeforeRequest listener was registered');
    return listener;
  }

  it('cancels a WebSocket to the PAPI port', () => {
    const callback = vi.fn();

    registerAndGetListener()(
      { url: `ws://localhost:${WEBSOCKET_PORT}`, resourceType: 'webSocket' },
      callback,
    );

    expect(callback).toHaveBeenCalledWith({ cancel: true });
  });

  it('answers every other request without cancelling it', () => {
    const callback = vi.fn();

    registerAndGetListener()({ url: 'https://example.com/', resourceType: 'mainFrame' }, callback);

    expect(callback).toHaveBeenCalledWith({ cancel: false });
  });
});
