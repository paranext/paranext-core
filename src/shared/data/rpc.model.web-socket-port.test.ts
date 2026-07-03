import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getWebSocketPort,
  getWebSocketUrl,
  isPotentialConnectionToPapiNetwork,
  WEBSOCKET_PORT,
} from '@shared/data/rpc.model';
import { parseWebSocketPort } from '@shared/data/platform.data';

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), info: vi.fn(), debug: vi.fn(), error: vi.fn() },
}));

afterEach(() => {
  globalThis.webSocketPort = undefined;
});

describe('getWebSocketPort', () => {
  it('falls back to the default port when no port has been advertised', () => {
    globalThis.webSocketPort = undefined;
    expect(getWebSocketPort()).toBe(WEBSOCKET_PORT);
    expect(getWebSocketUrl()).toBe(`ws://localhost:${WEBSOCKET_PORT}`);
  });

  it('returns the advertised port when set', () => {
    globalThis.webSocketPort = 55251;
    expect(getWebSocketPort()).toBe(55251);
    expect(getWebSocketUrl()).toBe('ws://localhost:55251');
  });
});

describe('parseWebSocketPort', () => {
  it('parses a valid port', () => {
    expect(parseWebSocketPort('9123')).toBe(9123);
    expect(parseWebSocketPort('1')).toBe(1);
    expect(parseWebSocketPort('65535')).toBe(65535);
  });

  // Mirrors the invalid values covered for C# in PapiClientConnectionUriTests.cs
  it.each(['not-a-port', '0', '-1', '70000', '9123garbage', '12.5', ''])(
    'returns undefined for invalid value "%s"',
    (invalidPort) => {
      expect(parseWebSocketPort(invalidPort)).toBeUndefined();
    },
  );

  it('returns undefined when the string is missing', () => {
    expect(parseWebSocketPort(undefined)).toBeUndefined();
  });
});

describe('isPotentialConnectionToPapiNetwork', () => {
  it('blocks the default PAPI port even when this app is on a fallback port', () => {
    globalThis.webSocketPort = 55251;
    expect(isPotentialConnectionToPapiNetwork(`ws://localhost:${WEBSOCKET_PORT}`)).toBe(true);
  });

  it("blocks this app's actual PAPI port", () => {
    globalThis.webSocketPort = 55251;
    expect(isPotentialConnectionToPapiNetwork('ws://localhost:55251')).toBe(true);
    expect(isPotentialConnectionToPapiNetwork(new URL('ws://localhost:55251/some/path'))).toBe(
      true,
    );
  });

  it('allows other ports', () => {
    globalThis.webSocketPort = 55251;
    expect(isPotentialConnectionToPapiNetwork('ws://localhost:9000')).toBe(false);
    expect(isPotentialConnectionToPapiNetwork('wss://example.com/socket')).toBe(false);
  });
});
