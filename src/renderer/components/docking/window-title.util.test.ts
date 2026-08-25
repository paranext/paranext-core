import { beforeEach, describe, expect, test, vi } from 'vitest';
import { localizationService } from '@shared/services/localization.service';
import { updateWindowTitle } from '@renderer/components/docking/window-label.util';

vi.mock('@shared/services/localization.service', () => ({
  localizationService: { getLocalizedString: vi.fn() },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

const layoutWith = (tabId: string) => ({
  dockbox: { children: [{ activeId: tabId, tabs: [{ id: tabId }] }] },
});
const titled = (title: string) => () => ({ tabTitle: title });

beforeEach(() => {
  vi.mocked(localizationService.getLocalizedString).mockReset();
  document.title = 'unset';
});

describe('updateWindowTitle', () => {
  test('publishes a plain tab title as the page title', async () => {
    await updateWindowTitle(layoutWith('a'), titled('MRK — wgPIDGIN'));

    expect(document.title).toBe('MRK — wgPIDGIN');
    expect(localizationService.getLocalizedString).not.toHaveBeenCalled();
  });

  test('localizes a title that is a localize key', async () => {
    vi.mocked(localizationService.getLocalizedString).mockResolvedValue('Empty window');

    await updateWindowTitle(layoutWith('a'), () => undefined);

    expect(localizationService.getLocalizedString).toHaveBeenCalledWith({
      localizeKey: '%window_label_empty%',
    });
    expect(document.title).toBe('Empty window');
  });

  test('leaves the title alone when localizing fails', async () => {
    document.title = 'Notes';
    vi.mocked(localizationService.getLocalizedString).mockRejectedValue(new Error('no strings'));

    await updateWindowTitle(layoutWith('a'), () => undefined);

    expect(document.title).toBe('Notes');
  });

  test('lets the newest request win when localizing resolves out of order', async () => {
    // Two layout changes in quick succession, the first one's localization resolving last
    const resolvers: ((value: string) => void)[] = [];
    vi.mocked(localizationService.getLocalizedString).mockImplementation(
      () =>
        new Promise<string>((resolve) => {
          resolvers.push(resolve);
        }),
    );

    const first = updateWindowTitle(layoutWith('a'), () => ({ tabTitle: '%first%' }));
    const second = updateWindowTitle(layoutWith('a'), () => ({ tabTitle: '%second%' }));

    resolvers[1]('Second');
    resolvers[0]('First');
    await Promise.all([first, second]);

    expect(document.title).toBe('Second');
  });
});
