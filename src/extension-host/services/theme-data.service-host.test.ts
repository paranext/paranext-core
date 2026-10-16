import { vi } from 'vitest';
import { resyncContributions } from '@extension-host/services/contribution.service';
import { testingThemeDataService } from '@extension-host/services/theme-data.service-host';

const { implementThemeDataDataProviderEngine } = testingThemeDataService;

test('a live engine rebuilds its themes when contributions resync', async () => {
  const initialThemes = {};
  const engine = implementThemeDataDataProviderEngine(initialThemes);
  const notifyUpdateSpy = vi.spyOn(engine, 'notifyUpdate');

  await resyncContributions([]);

  expect(engine.allThemeFamiliesById).not.toBe(initialThemes);
  expect(notifyUpdateSpy).toHaveBeenCalledWith('*');
  await engine.dispose();
});

test('a disposed engine ignores contribution resyncs', async () => {
  const initialThemes = {};
  const engine = implementThemeDataDataProviderEngine(initialThemes);
  const notifyUpdateSpy = vi.spyOn(engine, 'notifyUpdate');

  await expect(engine.dispose()).resolves.toBe(true);
  await resyncContributions([]);

  expect(engine.allThemeFamiliesById).toBe(initialThemes);
  expect(notifyUpdateSpy).not.toHaveBeenCalled();
});
