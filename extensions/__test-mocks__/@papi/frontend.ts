import { vi } from 'vitest';

/**
 * Mock implementation of @papi/frontend for testing purposes.
 *
 * This module provides mock implementations of the PAPI frontend services that are normally only
 * available in the renderer/web-view runtime. Individual tests can override behavior with
 * `vi.mock('@papi/frontend', ...)` factory calls.
 */

export const logger = {
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
  log: vi.fn(),
};

const papi = {
  networkObjects: {
    get: vi.fn().mockResolvedValue(undefined),
    onDidCreateNetworkObject: vi.fn(() => () => {}),
  },
};

export default papi;
