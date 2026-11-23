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
 * A window as far as interface scaling uses it: `ready-to-show`, whether it is shown and whether it
 * is closed on the window, and its `webContents`' load event and IPC to its page. Hidden unless
 * `isVisible` says otherwise, as a window is when created with `show: false`.
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
    isDestroyed: vi.fn(() => false),
    isVisible: vi.fn(() => isVisible),
  });
}

type TestWindow = ReturnType<typeof createWindow>;

/** Close the window the way a `BrowserWindow` closes: reading anything else off it then throws */
function destroy(window: TestWindow) {
  const throwDestroyed = () => {
    throw new Error('Object has been destroyed');
  };
  window.isDestroyed.mockReturnValue(true);
  window.isVisible.mockImplementation(throwDestroyed);
  Object.defineProperty(window, 'webContents', { get: throwDestroyed });
}

/** The zoom factors main has sent the window's page to set on itself */
const sentToPage = (window: TestWindow) =>
  window.webContents.send.mock.calls
    .filter(([channel]) => channel === INTERFACE_SCALING_CHANNEL)
    .map(([, factor]) => factor);

const SETTINGS_PROVIDER_NAME = 'platform.settingsServiceDataProvider';

/**
 * `platform.zoomFactor` as the settings service exposes it: `get` answers `values` in turn (an
 * `Error` rejects, and so does running out), `change` delivers a value to the current subscriber,
 * and `announce` announces a new network object with the given id
 */
function createSetting(values: (number | Error)[] = []) {
  let subscriber: ((value: number | PlatformError) => void) | undefined;
  let announcementListener: ((details: { id: string }) => void) | undefined;
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
    onDidCreateNetworkObject: (callback: (details: { id: string }) => void) => {
      announcementListener = callback;
    },
    settingsProviderName: SETTINGS_PROVIDER_NAME,
  };
  return {
    setting,
    unsubscribe,
    change: (value: number | PlatformError) => subscriber?.(value),
    announce: (id: string) => announcementListener?.({ id }),
  };
}

/** Have the next read of the setting wait until the returned function answers it */
function holdNextRead(setting: ReturnType<typeof createSetting>['setting']) {
  let answer: (value: number) => void = () => {};
  setting.get.mockImplementationOnce(
    () =>
      new Promise<number>((resolve) => {
        answer = resolve;
      }),
  );
  return (value: number) => answer(value);
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
    await interfaceScaling.startFollowingSetting();
    const { window: first } = await addPaintedWindow(interfaceScaling);
    const { window: second } = await addPaintedWindow(interfaceScaling);

    change(1.6);

    expect(sentToPage(first)).toEqual([1.6]);
    expect(sentToPage(second)).toEqual([1.6]);
  });

  test('leaves a window that has not painted alone on a change, then gives it the change', async () => {
    const { setting, change } = createSetting([1.2]);
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.startFollowingSetting();
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
    await interfaceScaling.startFollowingSetting();
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
    await interfaceScaling.startFollowingSetting();
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
    await interfaceScaling.startFollowingSetting();
    const { window } = await addPaintedWindow(interfaceScaling);
    change(1.3);

    change(newPlatformError('proxy has been revoked'));

    expect(sentToPage(window)).toEqual([1.3]);
    expect(logger.warn).toHaveBeenCalled();
  });

  test('stops applying changes to a window once it is removed', async () => {
    const { setting, change } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.startFollowingSetting();
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
    await interfaceScaling.startFollowingSetting();
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

  test('takes one subscription at a time when the provider is announced while following it', async () => {
    const { setting, unsubscribe, change, announce } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);
    const { window } = await addPaintedWindow(interfaceScaling);

    const started = interfaceScaling.startFollowingSetting();
    announce(`${SETTINGS_PROVIDER_NAME}-data`);
    await started;
    await settle();
    change(1.6);

    expect(setting.subscribe).toHaveBeenCalledTimes(2);
    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(sentToPage(window)).toEqual([1.6]);
  });

  test('takes a new subscription each time the provider is announced, releasing the old one', async () => {
    const { setting, unsubscribe, announce } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);

    await interfaceScaling.startFollowingSetting();
    announce(`${SETTINGS_PROVIDER_NAME}-data`);
    await settle();

    expect(setting.subscribe).toHaveBeenCalledTimes(2);
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  test('follows the setting on a later attempt after subscribing fails', async () => {
    const { setting, change, announce } = createSetting();
    setting.subscribe.mockRejectedValueOnce(new Error('Settings service undefined'));
    const interfaceScaling = createInterfaceScaling(setting);
    const { window } = await addPaintedWindow(interfaceScaling);

    await interfaceScaling.startFollowingSetting();
    expect(logger.warn).toHaveBeenCalled();
    announce(`${SETTINGS_PROVIDER_NAME}-data`);
    await settle();
    change(1.8);

    expect(sentToPage(window)).toEqual([1.8]);
  });

  test('leaves a closed window alone and logs a window that cannot be reached', async () => {
    const { setting, change } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.startFollowingSetting();
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
    const { setting, announce } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);

    await interfaceScaling.startFollowingSetting();
    expect(setting.subscribe).toHaveBeenCalledTimes(1);

    announce('platform.themeServiceDataProvider-data');
    await settle();
    expect(setting.subscribe).toHaveBeenCalledTimes(1);

    announce(`${SETTINGS_PROVIDER_NAME}-data`);
    await settle();
    expect(setting.subscribe).toHaveBeenCalledTimes(2);
  });

  test('skips a closed window without stopping a change reaching the windows after it', async () => {
    // A closed window stays added until main's close teardown, which runs after an async write
    const { setting, change } = createSetting();
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.startFollowingSetting();
    const closed = await addPaintedWindow(interfaceScaling);
    const open = await addPaintedWindow(interfaceScaling);
    const closedSend = closed.window.webContents.send;
    destroy(closed.window);
    vi.mocked(logger.error).mockClear();

    change(1.5);

    expect(closedSend).not.toHaveBeenCalled();
    expect(sentToPage(open.window)).toEqual([1.5]);
    expect(logger.error).not.toHaveBeenCalled();
  });

  test('applies nothing to a window closed while its load was being read', async () => {
    const { setting } = createSetting();
    const answerRead = holdNextRead(setting);
    const window = createWindow({ isVisible: true });
    createInterfaceScaling(setting).addWindow(window);
    const { send } = window.webContents;

    window.webContents.emit('did-finish-load');
    destroy(window);
    answerRead(1.4);
    await settle();

    expect(send).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

  test('keeps a change heard while a read was in flight over the older value that read answers', async () => {
    const { setting, change } = createSetting();
    const answerRead = holdNextRead(setting);
    const interfaceScaling = createInterfaceScaling(setting);
    await interfaceScaling.startFollowingSetting();

    const reading = interfaceScaling.read();
    change(1.6);
    answerRead(1.2);

    expect(await reading).toBe(1.6);
    // The next read fails, so it answers the last value it kept
    expect(await interfaceScaling.read()).toBe(1.6);
  });
});
