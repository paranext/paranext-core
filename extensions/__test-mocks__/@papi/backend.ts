// This file legitimately exports two mock classes (`ProjectDataProviderEngine` and
// `DataProviderEngine`) — they mirror the two real exports from `@papi/backend` that extension
// service code extends. Splitting them across two files would duplicate the file-level Vitest
// import and the @papi/backend module alias, and any consumer of one mock implicitly needs the
// other. Disable the rule for this mock-only file.
/* eslint-disable max-classes-per-file */

import { vi } from 'vitest';

/**
 * Mock implementation of @papi/backend for testing purposes.
 *
 * This module provides mock implementations of the PAPI backend services that are normally only
 * available in the extension host runtime.
 */

export const logger = {
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
  log: vi.fn(),
};

export class ProjectDataProviderEngine {
  notifyUpdate = vi.fn();
}

export class DataProviderEngine {
  notifyUpdate = vi.fn();
}

const papi = {
  projectDataProviders: {
    get: vi.fn().mockResolvedValue({
      getSetting: vi.fn().mockResolvedValue(undefined),
    }),
  },
  // Default: `get` resolves `undefined` so `interfaceMode !== 'simple'` and structure protection is
  // inactive unless a test overrides it. `subscribe` resolves a no-op async unsubscriber.
  settings: {
    get: vi.fn().mockResolvedValue(undefined),
    subscribe: vi.fn().mockResolvedValue(() => Promise.resolve(true)),
  },
};

export default papi;
