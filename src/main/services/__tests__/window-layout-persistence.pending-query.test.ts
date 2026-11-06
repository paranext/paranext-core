import { beforeEach, describe, expect, test, vi } from 'vitest';

// `window-layout-persistence.service` imports `app` from `electron`, which is unavailable outside
// the Electron runtime; `vi.mock` is hoisted above the dynamic imports below, so the module
// resolves against this stub.
vi.mock('electron', () => ({ app: { getPath: vi.fn() } }));
// The service also imports the network service to register its request handlers at startup; these
// tests never call `initializeWindowLayoutPersistence`, so a stub is enough to satisfy the import.
vi.mock('@shared/services/network.service', () => ({ registerRequestHandler: vi.fn() }));

type ServiceModule = typeof import('@main/services/window-layout-persistence.service');

/** A fresh module instance, so its module-level pending-content tracking starts empty each test */
async function freshService(): Promise<ServiceModule> {
  return import('@main/services/window-layout-persistence.service');
}

describe('querying whether a window is marked pending content', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  test('a never-marked window answers false', async () => {
    const service = await freshService();

    expect(service.isWindowPendingContent('1')).toBe(false);
  });

  test('a window answers true once marked', async () => {
    const service = await freshService();

    service.markWindowPendingContent('1');

    expect(service.isWindowPendingContent('1')).toBe(true);
  });

  test('a window answers false again once cleared', async () => {
    const service = await freshService();
    service.markWindowPendingContent('1');

    service.clearWindowPendingContent('1');

    expect(service.isWindowPendingContent('1')).toBe(false);
  });

  test('marks are per-window: another id was never marked, even while one is', async () => {
    const service = await freshService();

    service.markWindowPendingContent('1');

    expect(service.isWindowPendingContent('2')).toBe(false);
  });

  test('marks are per-window: clearing one window leaves another window marked', async () => {
    const service = await freshService();
    service.markWindowPendingContent('1');
    service.markWindowPendingContent('2');

    service.clearWindowPendingContent('1');

    expect(service.isWindowPendingContent('1')).toBe(false);
    expect(service.isWindowPendingContent('2')).toBe(true);
  });
});
