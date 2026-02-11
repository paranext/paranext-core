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
