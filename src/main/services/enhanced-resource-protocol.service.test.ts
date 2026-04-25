import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  setFetchImageBytesInvokerForTest,
  enhancedResourceProtocolService,
  handleEnhancedResourceRequest,
} from '@main/services/enhanced-resource-protocol.service';

// Mock Electron's protocol.handle so we can exercise the module's registration
// path without a running Electron session. Vitest hoists vi.mock above imports.
const { mockProtocolHandle, mockSendCommand, mockLoggerWarn } = vi.hoisted(() => ({
  mockProtocolHandle: vi.fn(),
  mockSendCommand: vi.fn(),
  mockLoggerWarn: vi.fn(),
}));

vi.mock('electron', () => ({
  protocol: {
    handle: mockProtocolHandle,
  },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: {
    warn: mockLoggerWarn,
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  },
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: mockSendCommand,
}));

describe('enhanced-resource-protocol.service / handleEnhancedResourceRequest', () => {
  let restore: () => void = () => {};

  afterEach(() => {
    restore();
    restore = () => {};
    mockLoggerWarn.mockClear();
  });

  test('returns 200 with decoded bytes and content-type from the command result', async () => {
    restore = setFetchImageBytesInvokerForTest(async ({ imageId, size }) => {
      expect(imageId).toBe('Dromedary');
      expect(size).toBe('thumbnail');
      return {
        contentType: 'image/jpeg',
        data: Buffer.from('hello').toString('base64'),
      };
    });

    const response = await handleEnhancedResourceRequest({
      url: 'papi-er://images/Dromedary',
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('image/jpeg');
    const body = Buffer.from(await response.arrayBuffer()).toString('utf-8');
    expect(body).toBe('hello');
  });

  test('passes size=full through to the PAPI command', async () => {
    const seen: { imageId: string; size: string }[] = [];
    restore = setFetchImageBytesInvokerForTest(async (input) => {
      seen.push(input);
      return {
        contentType: 'image/jpeg',
        data: Buffer.from('full-bytes').toString('base64'),
      };
    });

    await handleEnhancedResourceRequest({
      url: 'papi-er://images/Dromedary?size=full',
    });

    expect(seen).toEqual([{ imageId: 'Dromedary', size: 'full' }]);
  });

  test('returns 404 when the PAPI command returns undefined', async () => {
    restore = setFetchImageBytesInvokerForTest(async () => undefined);

    const response = await handleEnhancedResourceRequest({
      url: 'papi-er://images/NoSuchImage',
    });

    expect(response.status).toBe(404);
  });

  test('returns 400 on malformed URL', async () => {
    const response = await handleEnhancedResourceRequest({
      url: 'papi-er://not-a-pathtype',
    });

    expect(response.status).toBe(400);
  });

  test('falls back to imageId MIME lookup when the result has empty contentType', async () => {
    restore = setFetchImageBytesInvokerForTest(async () => ({
      contentType: '',
      data: Buffer.from('png-bytes').toString('base64'),
    }));

    const response = await handleEnhancedResourceRequest({
      url: 'papi-er://images/Dromedary.png',
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('image/png');
  });
});

describe('enhanced-resource-protocol.service / initialize', () => {
  beforeEach(() => {
    mockProtocolHandle.mockClear();
  });

  test('registers the papi-er protocol handler with Electron', async () => {
    await enhancedResourceProtocolService.initialize();
    // initialize() is idempotent at the module level; we cannot easily reset
    // the cached promise here, so the only invariant we assert is that the
    // first call did register the correct protocol name.
    await enhancedResourceProtocolService.initialize();

    expect(mockProtocolHandle).toHaveBeenCalled();
    expect(mockProtocolHandle.mock.calls[0][0]).toBe('papi-er');
  });
});
