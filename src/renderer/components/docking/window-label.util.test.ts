import { beforeEach, describe, expect, test, vi } from 'vitest';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import {
  EMPTY_WINDOW_LABEL_KEY,
  getWindowLabel,
  updateWindowTitle,
} from '@renderer/components/docking/window-label.util';

vi.mock('@shared/services/localization.service', () => ({
  localizationService: { getLocalizedString: vi.fn() },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

/** Stand-in for looking a tab up in the live dock layout */
const lookUpIn =
  (titles: Record<string, string | undefined>) =>
  (tabId: string): { tabTitle?: string } | undefined =>
    tabId in titles ? { tabTitle: titles[tabId] } : undefined;

const panel = (activeId: string | undefined, ...tabIds: string[]) => ({
  activeId,
  tabs: tabIds.map((id) => ({ id })),
});

describe('getWindowLabel', () => {
  test('names the window after the first panel’s active tab', () => {
    const layout = { dockbox: { children: [panel('b', 'a', 'b')] } };

    expect(getWindowLabel(layout, lookUpIn({ a: 'Home', b: 'MRK — wgPIDGIN' }))).toBe(
      'MRK — wgPIDGIN',
    );
  });

  test('falls through to the next tab carrying a title', () => {
    const layout = { dockbox: { children: [panel('a', 'a', 'b')] } };

    expect(getWindowLabel(layout, lookUpIn({ a: undefined, b: 'Biblical Terms' }))).toBe(
      'Biblical Terms',
    );
  });

  test('keeps looking past a panel whose tabs are all untitled', () => {
    const layout = { dockbox: { children: [panel('a', 'a'), panel('b', 'b')] } };

    expect(getWindowLabel(layout, lookUpIn({ a: undefined, b: 'Notes' }))).toBe('Notes');
  });

  test('finds a panel nested inside another box', () => {
    const layout = { dockbox: { children: [{ children: [panel('a', 'a')] }] } };

    expect(getWindowLabel(layout, lookUpIn({ a: 'Notes' }))).toBe('Notes');
  });

  test('ignores in-app float panels, which are transient and often modal', () => {
    // A dialog floating over the layout must not rename the window for as long as it is open
    const layout = {
      dockbox: { children: [panel('a', 'a')] },
      floatbox: { children: [panel('d', 'd')] },
    };

    expect(getWindowLabel(layout, lookUpIn({ a: 'MRK — wgPIDGIN', d: 'About' }))).toBe(
      'MRK — wgPIDGIN',
    );
  });

  test('names a window whose only float is a dialog after its docked content, not the dialog', () => {
    // The positive control for the case above: if float panels were walked, this would read 'About'
    const layout = {
      floatbox: { children: [panel('d', 'd')] },
      dockbox: { children: [panel('a', 'a')] },
    };

    expect(getWindowLabel(layout, lookUpIn({ a: 'Home', d: 'About' }))).toBe('Home');
  });

  test('stays unnamed rather than borrowing a float’s title when nothing docked has one', () => {
    // Whichever order a walk visited boxes in, reaching floats at all would name this window
    // 'About'. This is what pins floats out, rather than the cases where docked content wins anyway
    const layout = {
      dockbox: { children: [panel('a', 'a')] },
      floatbox: { children: [panel('d', 'd')] },
    };

    expect(getWindowLabel(layout, lookUpIn({ a: undefined, d: 'About' }))).toBe(
      EMPTY_WINDOW_LABEL_KEY,
    );
  });

  test('falls back to one string when no docked tab carries a title', () => {
    const layout = { dockbox: { children: [panel(undefined)] } };

    expect(getWindowLabel(layout, lookUpIn({}))).toBe(EMPTY_WINDOW_LABEL_KEY);
  });

  test('falls back when the layout holds nothing at all', () => {
    expect(getWindowLabel({}, lookUpIn({}))).toBe(EMPTY_WINDOW_LABEL_KEY);
  });

  test('skips a tab the layout names but the dock cannot find', () => {
    const layout = { dockbox: { children: [panel('gone', 'gone', 'b')] } };

    expect(getWindowLabel(layout, lookUpIn({ b: 'Notes' }))).toBe('Notes');
  });

  test('names the window after a maximized panel, which is what the user is looking at', () => {
    // Maximizing moves the real panel into `maxbox` and leaves an empty placeholder behind, so a
    // window showing a maximized tab would otherwise look empty
    const layout = {
      maxbox: { children: [panel('m', 'm')] },
      dockbox: { children: [{ activeId: undefined, tabs: [] }] },
    };

    expect(getWindowLabel(layout, lookUpIn({ m: 'MRK — wgPIDGIN' }))).toBe('MRK — wgPIDGIN');
  });

  test('prefers the maximized panel over what is still docked behind it', () => {
    const layout = {
      maxbox: { children: [panel('m', 'm')] },
      dockbox: { children: [panel('a', 'a')] },
    };

    expect(getWindowLabel(layout, lookUpIn({ m: 'Notes', a: 'Home' }))).toBe('Notes');
  });
});

const layoutWith = (tabId: string) => ({
  dockbox: { children: [{ activeId: tabId, tabs: [{ id: tabId }] }] },
});
const titled = (title: string) => () => ({ tabTitle: title });

beforeEach(() => {
  vi.mocked(localizationService.getLocalizedString).mockReset();
  // Cleared per test so a message assertion reads this test's log line, not an earlier test's
  vi.mocked(logger.warn).mockClear();
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

  test('names a rejection that is not an Error, rather than logging [object Object]', async () => {
    // A failed cross-process call rejects with a JSON-RPC payload, not an Error. Interpolating it
    // straight into the message loses the only diagnostic a window with a silently stale title has
    vi.mocked(localizationService.getLocalizedString).mockRejectedValue({
      code: -32603,
      message: 'Localization provider is down',
    });

    await updateWindowTitle(layoutWith('a'), () => undefined);

    const logged = vi.mocked(logger.warn).mock.calls[0][0];
    // The positive control: the message really did carry the payload, so the absence below is the
    // formatting being right rather than nothing having been logged at all
    expect(logged).toContain('Localization provider is down');
    expect(logged).not.toContain('[object Object]');
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
