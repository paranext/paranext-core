import { EventEmitter } from 'events';
import { newPlatformError, PlatformError, wait } from 'platform-bible-utils';
import { vi } from 'vitest';
import { INTERFACE_SCALING_CHANNEL } from '@shared/data/interface-scaling.model';
import { logger } from '@shared/services/logger.service';
import { createInterfaceScaling } from './interface-scaling.util';

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

/**
 * A window as far as interface scaling uses it: `ready-to-show` and whether it is shown on the
 * window, and its `webContents`' load event and IPC to its page. Hidden unless `isVisible` says
 * otherwise, as a window is when created with `show: false`.
 */
function createWindow({ isVisible = false } = {}) {
  const webContents = Object.assign(new EventEmitter(), {
    isDestroyed: vi.fn(() => false),
    send: vi.fn<(channel: string, factor: number) => void>(),
    // Not part of what interface scaling may use: spied on only to prove main never sets zoom itself
    setZoomFactor: vi.fn<(factor: number) => void>(),
  });
  return Object.assign(new EventEmitter(), {
    webContents,
    isVisible: vi.fn(() => isVisible),
  });
}

type TestWindow = ReturnType<typeof createWindow>;

/** The zoom factors main has sent the window's page to set on itself */
const sentToPage = (window: TestWindow) =>
  window.webContents.send.mock.calls
    .filter(([channel]) => channel === INTERFACE_SCALING_CHANNEL)
    .map(([, factor]) => factor);

/**
 * `platform.zoomFactor` as the settings service exposes it: `get` answers `values` in turn (an
 * `Error` rejects, and so does running out), and `change` delivers a value to the current
 * subscriber
 */
function createSetting(values: (number | Error)[] = []) {
  let subscriber: ((value: number | PlatformError) => void) | undefined;
  const unsubscribe = vi.fn(async () => true);
  const setting = {
    get: vi.fn(async () => {
      const value = values.shift();
      if (value === undefined || value instanceof Error) throw value ?? new Error('no value');
      return value;
    }),
    subscribe: vi.fn(async (callback: (value: number | PlatformError) => void) => {
      subscriber = callback;
      return unsubscribe;
    }),
  };
  return { setting, unsubscribe, change: (value: number | PlatformError) => subscriber?.(value) };
}

/** Let the async `did-finish-load` listener and the subscription settle */
const settle = () => wait(0);

/** Add a window that has loaded and painted, then clear what that did */
async function addPaintedWindow(interfaceScaling: ReturnType<typeof createInterfaceScaling>) {
  const window = createWindow();
  const remove = interfaceScaling.addWindow(window);
  window.webContents.emit('did-finish-load');
  await settle();
  window.emit('ready-to-show');
  window.webContents.send.mockClear();
  vi.mocked(logger.warn).mockClear();
  return { window, remove };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('createInterfaceScaling', () => {
  test('sets no zoom on a hidden window before it has painted, even with the setting known', async () => {
    // A zoom set before a hidden window's first frame can stop that frame, and the window with it
    const { setting } = createSetting([1.2, 1.4]);
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.read();
    const window = createWindow();
    interfaceScaling.addWindow(window);

    window.webContents.emit('dom-ready');
    window.webContents.emit('did-finish-load');
    await settle();

    expect(sentToPage(window)).toEqual([]);
    expect(window.webContents.setZoomFactor).not.toHaveBeenCalled();
  });

  test('has the page take the setting once its window has painted', async () => {
    const { setting } = createSetting([1.4]);
    const window = createWindow();
    createInterfaceScaling(setting).addWindow(window);
    window.webContents.emit('did-finish-load');
    await settle();

    window.emit('ready-to-show');

    expect(sentToPage(window)).toEqual([1.4]);
  });

  test('has the page take the setting when it is read, if the window painted before that', async () => {
    const { setting } = createSetting([1.4]);
    const window = createWindow();
    createInterfaceScaling(setting).addWindow(window);

    window.emit('ready-to-show');
    expect(sentToPage(window)).toEqual([]);
    window.webContents.emit('did-finish-load');
    await settle();

    expect(sentToPage(window)).toEqual([1.4]);
  });

  test('has the page of a later document take a fresh read of the setting', async () => {
    const { setting } = createSetting([1.2, 1.3]);
    const interfaceScaling = createInterfaceScaling(setting);
    const { window } = await addPaintedWindow(interfaceScaling);

    window.webContents.emit('did-finish-load');
    await settle();

    expect(sentToPage(window)).toEqual([1.3]);
  });

  test('has every painted window take a change', async () => {
    const { setting, change } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.followSetting();
    const { window: first } = await addPaintedWindow(interfaceScaling);
    const { window: second } = await addPaintedWindow(interfaceScaling);

    change(1.6);

    expect(sentToPage(first)).toEqual([1.6]);
    expect(sentToPage(second)).toEqual([1.6]);
  });

  test('leaves a window that has not painted alone on a change, then gives it the change', async () => {
    const { setting, change } = createSetting([1.2]);
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.followSetting();
    const window = createWindow();
    interfaceScaling.addWindow(window);
    window.webContents.emit('did-finish-load');
    await settle();

    change(1.9);
    expect(sentToPage(window)).toEqual([]);

    window.emit('ready-to-show');
    expect(sentToPage(window)).toEqual([1.9]);
  });

  test('has the page of a shown window take the setting when its first document loads, though it has not painted', async () => {
    // A shown window covered by others never paints until it is uncovered, so waiting for it to
    // paint would show its first frame at 100 % when it is
    const { setting } = createSetting([1.4]);
    const window = createWindow({ isVisible: true });
    createInterfaceScaling(setting).addWindow(window);

    window.webContents.emit('did-finish-load');
    await settle();

    expect(sentToPage(window)).toEqual([1.4]);
  });

  test('has a shown window that has not painted take a change once its document has loaded', async () => {
    const { setting, change } = createSetting([1.2]);
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.followSetting();
    const window = createWindow({ isVisible: true });
    interfaceScaling.addWindow(window);
    window.webContents.emit('did-finish-load');
    await settle();

    change(1.9);

    expect(sentToPage(window)).toEqual([1.2, 1.9]);
  });

  test('has a window shown after it was created take the setting at its next load, though it never painted', async () => {
    // A hidden window whose page failed to load is shown anyway, and can then be reloaded
    const { setting } = createSetting([1.2, 1.3]);
    const window = createWindow();
    createInterfaceScaling(setting).addWindow(window);
    window.webContents.emit('did-finish-load');
    await settle();
    expect(sentToPage(window)).toEqual([]);

    window.isVisible.mockReturnValue(true);
    window.webContents.emit('did-finish-load');
    await settle();

    expect(sentToPage(window)).toEqual([1.3]);
  });

  test('keeps the last value it had when the setting cannot be read', async () => {
    const { setting, change } = createSetting([new Error('Settings service undefined')]);
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.followSetting();
    change(1.3);

    expect(await interfaceScaling.read()).toBe(1.3);
    expect(logger.warn).toHaveBeenCalled();
  });

  test('falls back to the default when the setting has never been read', async () => {
    const { setting } = createSetting([new Error('Settings service undefined')]);

    expect(await createInterfaceScaling(setting).read()).toBe(1);
  });

  test('leaves windows as they are when a change arrives as an error', async () => {
    const { setting, change } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.followSetting();
    const { window } = await addPaintedWindow(interfaceScaling);
    change(1.3);

    change(newPlatformError('proxy has been revoked'));

    expect(sentToPage(window)).toEqual([1.3]);
    expect(logger.warn).toHaveBeenCalled();
  });

  test('stops applying changes to a window once it is removed', async () => {
    const { setting, change } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.followSetting();
    const kept = await addPaintedWindow(interfaceScaling);
    const removed = await addPaintedWindow(interfaceScaling);

    removed.remove();
    change(1.7);

    expect(sentToPage(kept.window)).toEqual([1.7]);
    expect(sentToPage(removed.window)).toEqual([]);
  });

  test('applies nothing to a window removed while its first load was still being read', async () => {
    const { setting, change } = createSetting([1.2]);
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.followSetting();
    const window = createWindow();
    const remove = interfaceScaling.addWindow(window);

    window.webContents.emit('did-finish-load');
    remove();
    await settle();
    window.emit('ready-to-show');
    change(1.7);

    expect(sentToPage(window)).toEqual([]);
  });

  test('applies nothing to a painted window removed while a later load was being read', async () => {
    const { setting } = createSetting([1.2, 1.3]);
    const interfaceScaling = createInterfaceScaling(setting);
    const { window, remove } = await addPaintedWindow(interfaceScaling);

    window.webContents.emit('did-finish-load');
    remove();
    await settle();

    expect(sentToPage(window)).toEqual([]);
  });

  test('takes one subscription at a time when asked to follow the setting twice at once', async () => {
    const { setting, unsubscribe, change } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);
    const { window } = await addPaintedWindow(interfaceScaling);

    await Promise.all([interfaceScaling.followSetting(), interfaceScaling.followSetting()]);
    change(1.6);

    expect(setting.subscribe).toHaveBeenCalledTimes(2);
    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(sentToPage(window)).toEqual([1.6]);
  });

  test('takes a new subscription each time it follows the setting, releasing the old one', async () => {
    const { setting, unsubscribe } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);

    await interfaceScaling.followSetting();
    await interfaceScaling.followSetting();

    expect(setting.subscribe).toHaveBeenCalledTimes(2);
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  test('follows the setting on a later attempt after subscribing fails', async () => {
    const { setting, change } = createSetting();
    setting.subscribe.mockRejectedValueOnce(new Error('Settings service undefined'));
    const interfaceScaling = createInterfaceScaling(setting);
    const { window } = await addPaintedWindow(interfaceScaling);

    await interfaceScaling.followSetting();
    expect(logger.warn).toHaveBeenCalled();
    await interfaceScaling.followSetting();
    change(1.8);

    expect(sentToPage(window)).toEqual([1.8]);
  });

  test('leaves a closed window alone and logs a window that cannot be reached', async () => {
    const { setting, change } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.followSetting();
    const closed = await addPaintedWindow(interfaceScaling);
    closed.window.webContents.isDestroyed.mockReturnValue(true);
    const broken = await addPaintedWindow(interfaceScaling);
    broken.window.webContents.send.mockImplementation(() => {
      throw new Error('Object has been destroyed');
    });
    vi.mocked(logger.error).mockClear();

    expect(() => change(1.5)).not.toThrow();

    expect(closed.window.webContents.send).not.toHaveBeenCalled();
    expect(broken.window.webContents.send).toHaveBeenCalledWith(INTERFACE_SCALING_CHANNEL, 1.5);
    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  test('follows the setting now and again only when the settings provider is announced', async () => {
    const { setting } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);
    let announce: ((details: { id: string }) => void) | undefined;

    await interfaceScaling.startFollowingSetting((callback) => {
      announce = callback;
    }, 'platform.settingsServiceDataProvider');
    expect(setting.subscribe).toHaveBeenCalledTimes(1);

    announce?.({ id: 'platform.themeServiceDataProvider-data' });
    await settle();
    expect(setting.subscribe).toHaveBeenCalledTimes(1);

    announce?.({ id: 'platform.settingsServiceDataProvider-data' });
    await settle();
    expect(setting.subscribe).toHaveBeenCalledTimes(2);
  });
});
