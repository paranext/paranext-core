import { describe, expect, test, vi } from 'vitest';

/**
 * Separate from `window-routing.service.test.ts` because that suite mocks
 * `@shared/services/data-provider.service` wholesale, and what matters here is the behaviour
 * against the REAL one at module-load time.
 *
 * `setFocus` is decorated with `dataProviderService.decorators.doNotNotify`, which is evaluated
 * when the class is defined rather than when anything is called. A missing export, or an import
 * cycle that left `dataProviderService` uninitialised at that moment, would throw while the main
 * process was still loading modules — bringing the app up with no window at all. A suite that
 * substitutes its own stub for that module cannot see any of it.
 */
vi.mock('electron', () => ({ BrowserWindow: class {}, app: { on: () => {} } }));

describe('window routing proxy module load', () => {
  test('loads against the real data provider service and marks setFocus as not auto-notifying', async () => {
    const mod = await import('@main/services/window-routing.service');

    const { prototype } = mod.testingWindowRoutingService.FocusedWindowDataProviderEngine;
    // `doNotNotify` is a marker the decorator sets on the method, which `buildDataProvider` reads
    // back off the function; it is not part of any declared type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const { setFocus } = prototype as unknown as Record<string, { doNotNotify?: boolean }>;

    expect(setFocus.doNotNotify).toBe(true);
  });
});
