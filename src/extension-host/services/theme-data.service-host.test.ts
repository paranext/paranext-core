import { Mock, vi } from 'vitest';
import { testingThemeDataService } from '@extension-host/services/theme-data.service-host';

const mocks = vi.hoisted(() => {
  const unsubscribers: Mock[] = [];
  return { unsubscribers };
});

// Wraps the real event so each subscription's unsubscriber can be observed
vi.mock('@extension-host/services/contribution.service', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@extension-host/services/contribution.service')>();
  return {
    ...actual,
    onDidResyncContributions: (callback: () => Promise<void>) => {
      const unsubscribe = vi.fn(actual.onDidResyncContributions(callback));
      mocks.unsubscribers.push(unsubscribe);
      return unsubscribe;
    },
  };
});

test('dispose unsubscribes from contribution resyncs', async () => {
  const engine = testingThemeDataService.implementThemeDataDataProviderEngine({});
  expect(mocks.unsubscribers).toHaveLength(1);

  await expect(engine.dispose()).resolves.toBe(true);
  expect(mocks.unsubscribers[0]).toHaveBeenCalledTimes(1);

  // A second dispose has nothing left to unsubscribe
  await expect(engine.dispose()).resolves.toBe(true);
  expect(mocks.unsubscribers[0]).toHaveBeenCalledTimes(1);
});
