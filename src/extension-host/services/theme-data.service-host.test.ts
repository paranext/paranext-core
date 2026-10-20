import { onTestFinished, vi } from 'vitest';
import { resyncContributions } from '@extension-host/services/contribution.service';
import { testingThemeDataService } from '@extension-host/services/theme-data.service-host';

const { implementThemeDataDataProviderEngine } = testingThemeDataService;

test('a live engine rebuilds its themes when contributions resync', async () => {
  const engine = implementThemeDataDataProviderEngine({});
  onTestFinished(() => engine.dispose());
  const notifyUpdateSpy = vi.spyOn(engine, 'notifyUpdate');

  await resyncContributions([]);

  expect(await engine.getAllThemes()).toHaveProperty('paratext');
  expect(notifyUpdateSpy).toHaveBeenCalledWith('*');
});

test('a disposed engine ignores contribution resyncs', async () => {
  const initialThemes = {};
  const disposedEngine = implementThemeDataDataProviderEngine(initialThemes);
  const disposedNotifyUpdateSpy = vi.spyOn(disposedEngine, 'notifyUpdate');
  const liveEngine = implementThemeDataDataProviderEngine({});
  onTestFinished(() => liveEngine.dispose());
  const liveNotifyUpdateSpy = vi.spyOn(liveEngine, 'notifyUpdate');

  await disposedEngine.dispose();
  await resyncContributions([]);

  expect(liveNotifyUpdateSpy).toHaveBeenCalledWith('*');
  expect(await disposedEngine.getAllThemes()).toBe(initialThemes);
  expect(disposedNotifyUpdateSpy).not.toHaveBeenCalled();
});
