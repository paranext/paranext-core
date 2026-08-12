import { vi } from 'vitest';
import * as networkServiceTypes from '@shared/services/network.service';
import { getAppWindowInputKind } from './app-window-input.util';

/** Build the parts of an Electron `MouseInputEvent` the handlers pass along */
function mouse(type: string, button: 'left' | 'right' = 'left') {
  return { type, button };
}

/** Build the parts of an Electron keyboard `Input` the handlers pass along */
function key(type: string, keyName: string) {
  return { type, key: keyName };
}

vi.mock('@shared/services/network.service', () => ({
  createNetworkEventEmitterAsync: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

/**
 * Load a fresh copy of the module under test with a fresh mock emitter. The module keeps its
 * emitter in module state, so each test needs its own copy to observe the not-yet-started state.
 */
async function loadFreshModule() {
  vi.resetModules();
  const networkService = await import('@shared/services/network.service');
  const emit = vi.fn();
  vi.mocked(networkService.createNetworkEventEmitterAsync).mockResolvedValue(
    // Only `emit` is exercised here; the rest of the emitter surface is irrelevant
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    { emit } as unknown as Awaited<
      ReturnType<typeof networkServiceTypes.createNetworkEventEmitterAsync>
    >,
  );
  const appWindowInput = await import('./app-window-input.util');
  return { ...appWindowInput, emit };
}

describe('getAppWindowInputKind', () => {
  it('classifies a mouse down as mouseDown', () => {
    expect(getAppWindowInputKind(mouse('mouseDown'))).toBe('mouseDown');
    expect(getAppWindowInputKind(mouse('mouseDown', 'right'))).toBe('mouseDown');
  });

  it('classifies an Escape key down as escape', () => {
    expect(getAppWindowInputKind(key('keyDown', 'Escape'))).toBe('escape');
  });

  it('ignores mouse events other than mouse down', () => {
    expect(getAppWindowInputKind(mouse('mouseUp'))).toBeUndefined();
    expect(getAppWindowInputKind(mouse('mouseMove'))).toBeUndefined();
  });

  it('ignores keys other than Escape and ignores Escape key up', () => {
    expect(getAppWindowInputKind(key('keyDown', 'a'))).toBeUndefined();
    expect(getAppWindowInputKind(key('keyDown', 'Enter'))).toBeUndefined();
    expect(getAppWindowInputKind(key('keyUp', 'Escape'))).toBeUndefined();
  });
});

describe('announceAppWindowInput', () => {
  it('emits nothing until the event has been started', async () => {
    const { announceAppWindowInput, startAppWindowInputEvent, emit } = await loadFreshModule();

    announceAppWindowInput(mouse('mouseDown'));
    expect(emit).not.toHaveBeenCalled();

    await startAppWindowInputEvent();
    announceAppWindowInput(mouse('mouseDown'));
    expect(emit).toHaveBeenCalledWith({ kind: 'mouseDown' });
  });

  it('emits the classified kind of each dismissal gesture', async () => {
    const { announceAppWindowInput, startAppWindowInputEvent, emit } = await loadFreshModule();
    await startAppWindowInputEvent();

    announceAppWindowInput(mouse('mouseDown', 'right'));
    announceAppWindowInput(key('keyDown', 'Escape'));

    expect(emit).toHaveBeenNthCalledWith(1, { kind: 'mouseDown' });
    expect(emit).toHaveBeenNthCalledWith(2, { kind: 'escape' });
  });

  it('emits nothing for input that is not a dismissal gesture', async () => {
    const { announceAppWindowInput, startAppWindowInputEvent, emit } = await loadFreshModule();
    await startAppWindowInputEvent();

    announceAppWindowInput(mouse('mouseUp'));
    announceAppWindowInput(key('keyDown', 'F8'));

    expect(emit).not.toHaveBeenCalled();
  });

  it('swallows and warns when emitting throws, so the caller keeps running', async () => {
    const { announceAppWindowInput, startAppWindowInputEvent, emit } = await loadFreshModule();
    await startAppWindowInputEvent();
    const { logger } = await import('@shared/services/logger.service');
    // A disposed emitter or a throwing local subscriber surfaces here; the window's input hooks
    // must still go on to detect the focus change
    emit.mockImplementation(() => {
      throw new Error('emitter is disposed');
    });

    expect(() => announceAppWindowInput(mouse('mouseDown'))).not.toThrow();
    expect(logger.warn).toHaveBeenCalled();
  });

  it('emits nothing when the event failed to register', async () => {
    vi.resetModules();
    const networkService = await import('@shared/services/network.service');
    vi.mocked(networkService.createNetworkEventEmitterAsync).mockRejectedValue(
      new Error('rejected by the central registry'),
    );
    const { announceAppWindowInput, startAppWindowInputEvent } = await import(
      './app-window-input.util'
    );

    // Registration failure must not take down main-process startup
    await expect(startAppWindowInputEvent()).resolves.toBeUndefined();
    expect(() => announceAppWindowInput(mouse('mouseDown'))).not.toThrow();
  });
});
