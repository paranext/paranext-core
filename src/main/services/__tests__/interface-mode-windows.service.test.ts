import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  getCachedInterfaceMode,
  handleInterfaceModeChanged,
  initializeModeSwitchOrchestration,
  isAdditionalWindowRefusedInSimpleMode,
  isClosingForModeSwitch,
  resetForTesting,
  type ModeSwitchDependencies,
} from '@main/services/interface-mode-windows.service';

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

/**
 * Collaborators for one test, each recorded so a test can assert what the orchestration asked for.
 * Window 1 is the primary; 2 and 3 are secondaries.
 */
function makeDeps(overrides: Partial<ModeSwitchDependencies> = {}): ModeSwitchDependencies {
  return {
    getTrackedWindowIds: () => [1, 2, 3],
    isPrimaryWindow: (windowId) => windowId === 1,
    isWindowClosing: () => false,
    markWindowClosing: vi.fn(),
    closeWindow: vi.fn(),
    focusWindow: vi.fn(),
    isAppShuttingDown: () => false,
    getPreservedEntryIndexes: () => [],
    createWindowForEntry: vi.fn(async () => {}),
    ...overrides,
  };
}

describe('reacting to an interface-mode change', () => {
  beforeEach(() => {
    resetForTesting();
  });

  test('a write of an unrelated setting does nothing', async () => {
    // Every setting shares one data provider data type, so this callback is woken by any
    // settings write in the application, not only by a mode change.
    //
    // Preserved entries are seeded deliberately: without something for the power branch to
    // reopen, this test passes whether or not the mode is compared at all, and the guard it
    // exists to protect could be deleted with every test still green.
    const deps = makeDeps({ getPreservedEntryIndexes: () => [1, 2] });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('power');

    expect(deps.closeWindow).not.toHaveBeenCalled();
    expect(deps.createWindowForEntry).not.toHaveBeenCalled();
  });

  test('switching to simple closes every window but the primary', async () => {
    const deps = makeDeps();
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.closeWindow).toHaveBeenCalledWith(2);
    expect(deps.closeWindow).toHaveBeenCalledWith(3);
    expect(deps.closeWindow).not.toHaveBeenCalledWith(1);
  });

  test('a window is marked closing before it is told to close', async () => {
    // The mark is what makes a layout push arriving afterwards droppable, so it has to
    // land before the window is given any reason to push one
    const calls: string[] = [];
    const deps = makeDeps({
      markWindowClosing: vi.fn((windowId: number) => calls.push(`mark${windowId}`)),
      closeWindow: vi.fn((windowId: number) => calls.push(`close${windowId}`)),
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(calls.indexOf('mark2')).toBeLessThan(calls.indexOf('close2'));
  });

  test('a window closed for the switch is reported as such, and the survivor is not', async () => {
    initializeModeSwitchOrchestration(makeDeps(), 'power');

    await handleInterfaceModeChanged('simple');

    expect(isClosingForModeSwitch(2)).toBe(true);
    expect(isClosingForModeSwitch(1)).toBe(false);
  });

  test('with only the primary open, switching to simple closes nothing', async () => {
    const deps = makeDeps({ getTrackedWindowIds: () => [1] });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.closeWindow).not.toHaveBeenCalled();
  });

  test('a window already on its way out is left alone', async () => {
    const deps = makeDeps({ isWindowClosing: (windowId) => windowId === 2 });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.closeWindow).not.toHaveBeenCalledWith(2);
    expect(deps.closeWindow).toHaveBeenCalledWith(3);
  });

  test('the primary is focused once the others are closing', async () => {
    const deps = makeDeps();
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.focusWindow).toHaveBeenCalledWith(1);
  });

  test('switching to power reopens one window per preserved entry, in entry order', async () => {
    const created: number[] = [];
    const deps = makeDeps({
      getTrackedWindowIds: () => [1],
      getPreservedEntryIndexes: () => [0, 2, 3],
      createWindowForEntry: vi.fn(async (entryIndex: number) => {
        created.push(entryIndex);
      }),
    });
    initializeModeSwitchOrchestration(deps, 'simple');

    await handleInterfaceModeChanged('power');

    expect(created).toEqual([0, 2, 3]);
  });

  test('switching to power with nothing preserved creates nothing', async () => {
    const deps = makeDeps({
      getTrackedWindowIds: () => [1],
      getPreservedEntryIndexes: () => [],
    });
    initializeModeSwitchOrchestration(deps, 'simple');

    await handleInterfaceModeChanged('power');

    expect(deps.createWindowForEntry).not.toHaveBeenCalled();
  });

  test('the cached mode already reads power when the first window is created', async () => {
    // Load-bearing ordering: the single-window guard reads this cache, so a mode still
    // reading simple here would make the reopen refuse its own windows
    let modeWhileCreating: string | undefined;
    const deps = makeDeps({
      getTrackedWindowIds: () => [1],
      getPreservedEntryIndexes: () => [0],
      createWindowForEntry: vi.fn(async () => {
        modeWhileCreating = getCachedInterfaceMode();
      }),
    });
    initializeModeSwitchOrchestration(deps, 'simple');

    await handleInterfaceModeChanged('power');

    expect(modeWhileCreating).toBe('power');
  });

  test('a switch back part-way through stops the older run', async () => {
    const created: number[] = [];
    const deps = makeDeps({
      getTrackedWindowIds: () => [1],
      getPreservedEntryIndexes: () => [0, 1, 2],
      createWindowForEntry: vi.fn(async (entryIndex: number) => {
        created.push(entryIndex);
        // The user flips back while the reopen is still working through the entries
        if (entryIndex === 0) await handleInterfaceModeChanged('simple');
      }),
    });
    initializeModeSwitchOrchestration(deps, 'simple');

    await handleInterfaceModeChanged('power');

    expect(created).toEqual([0]);
  });

  test('nothing happens while the application is on its way down', async () => {
    const deps = makeDeps({ isAppShuttingDown: () => true });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.closeWindow).not.toHaveBeenCalled();
  });
});

describe('refusing a second window in simple mode', () => {
  test('simple mode refuses a window when one is already open', () => {
    expect(isAdditionalWindowRefusedInSimpleMode('simple', 1)).toBe(true);
  });

  test('simple mode permits the first window, so a launch is never refused', () => {
    // Startup and macOS re-activation both create their first window with none tracked;
    // refusing there would leave the application with no window at all
    expect(isAdditionalWindowRefusedInSimpleMode('simple', 0)).toBe(false);
  });

  test('power mode permits a second window', () => {
    expect(isAdditionalWindowRefusedInSimpleMode('power', 1)).toBe(false);
  });
});
