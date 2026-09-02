import { beforeEach, describe, expect, test, vi } from 'vitest';
import { logger } from '@shared/services/logger.service';
import {
  clearModeSwitchClose,
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
    hideWindow: vi.fn(),
    closeWindow: vi.fn(() => true),
    focusWindow: vi.fn(),
    isAppShuttingDown: () => false,
    getPreservedEntrySlotIds: () => [],
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
    const deps = makeDeps({ getPreservedEntrySlotIds: () => [1, 2] });
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
      markWindowClosing: vi.fn((windowId: number) => {
        calls.push(`mark${windowId}`);
      }),
      closeWindow: vi.fn((windowId: number) => {
        calls.push(`close${windowId}`);
        return true;
      }),
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    // The whole sequence, not an index comparison: `indexOf` of a call that never happened is -1,
    // which is "less than" everything, so an ordering assertion alone passes hardest when the mark
    // is missing entirely — and the mark is the signal the renderer reads to stand down.
    expect(calls).toEqual(['mark2', 'close2', 'mark3', 'close3']);
  });

  test('a window closed for the switch is reported as such, and the survivor is not', async () => {
    initializeModeSwitchOrchestration(makeDeps(), 'power');

    await handleInterfaceModeChanged('simple');

    expect(isClosingForModeSwitch(2)).toBe(true);
    expect(isClosingForModeSwitch(1)).toBe(false);
  });

  test('a window that has gone is forgotten, so the set never outlives its windows', async () => {
    initializeModeSwitchOrchestration(makeDeps(), 'power');
    await handleInterfaceModeChanged('simple');
    expect(isClosingForModeSwitch(2)).toBe(true);

    clearModeSwitchClose(2);

    expect(isClosingForModeSwitch(2)).toBe(false);
    // The other window closed by the same switch is untouched: the set is cleared one window at a
    // time, as each actually goes away
    expect(isClosingForModeSwitch(3)).toBe(true);
  });

  test('with only the primary open, switching to simple closes nothing', async () => {
    const deps = makeDeps({ getTrackedWindowIds: () => [1] });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.closeWindow).not.toHaveBeenCalled();
  });

  test('a window the user already closed is left alone, and not claimed by the switch', async () => {
    const deps = makeDeps({ isWindowClosing: (windowId) => windowId === 2 });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.closeWindow).not.toHaveBeenCalledWith(2);
    expect(deps.markWindowClosing).not.toHaveBeenCalledWith(2);
    // Load-bearing, not decoration: a window recorded as closing FOR THE SWITCH keeps its entry,
    // so claiming one the user deliberately closed would bring it back on the way to power
    expect(isClosingForModeSwitch(2)).toBe(false);
    expect(deps.closeWindow).toHaveBeenCalledWith(3);
  });

  test('a window that is already gone is not left recorded as closing for the switch', async () => {
    // `closeWindow` answers false when there is no live window to ask. Nothing will ever report
    // that id closed, so a record made for it would outlive the window and go on dropping layouts
    // for an id that names nothing.
    const deps = makeDeps({ closeWindow: vi.fn((windowId: number) => windowId !== 2) });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(isClosingForModeSwitch(2)).toBe(false);
    expect(isClosingForModeSwitch(3)).toBe(true);
  });

  test('a window is taken off screen as it is marked, before its close is requested', async () => {
    // Until its close finishes the window is still on screen and interactive, showing the mode it
    // is moving to over a dock still holding the mode it is leaving — and anything rearranged in it
    // is refused by the layout save. It should disappear when the user asks.
    const calls: string[] = [];
    const deps = makeDeps({
      hideWindow: vi.fn((windowId: number) => {
        calls.push(`hide${windowId}`);
      }),
      closeWindow: vi.fn((windowId: number) => {
        calls.push(`close${windowId}`);
        return true;
      }),
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(calls).toEqual(['hide2', 'close2', 'hide3', 'close3']);
  });

  test('with no window holding the primary role, nothing is closed', async () => {
    // Every tracked window marked closing IS the application shutting down. A mode switch must
    // never be able to end the session, so when no window can be identified as the survivor the
    // switch closes nothing rather than closing them all.
    const deps = makeDeps({ isPrimaryWindow: () => false });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.closeWindow).not.toHaveBeenCalled();
  });

  test('a window that fails to come back does not take the rest of the reopen with it', async () => {
    const created: number[] = [];
    const deps = makeDeps({
      getTrackedWindowIds: () => [1],
      getPreservedEntrySlotIds: () => [11, 12, 13],
      createWindowForEntry: vi.fn(async (slotId: number) => {
        created.push(slotId);
        if (slotId === 12) throw new Error('renderer never started');
      }),
    });
    initializeModeSwitchOrchestration(deps, 'simple');

    await handleInterfaceModeChanged('power');

    expect(created).toEqual([11, 12, 13]);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('12'));
  });

  test('an entry freed while the reopen is running is still picked up', async () => {
    // A close from the switch that preceded this one can report late, freeing its entry after the
    // reopen has already read the set. Re-reading each pass is what keeps that window from being
    // missed until some future switch.
    const created: number[] = [];
    let preserved = [11];
    const deps = makeDeps({
      getTrackedWindowIds: () => [1],
      getPreservedEntrySlotIds: () => preserved,
      createWindowForEntry: vi.fn(async (slotId: number) => {
        created.push(slotId);
        // The secondary's close settles while the first window is being created
        if (slotId === 11) preserved = [11, 12];
      }),
    });
    initializeModeSwitchOrchestration(deps, 'simple');

    await handleInterfaceModeChanged('power');

    expect(created).toEqual([11, 12]);
  });

  test('a failed switch leaves the mode able to be acted on again', async () => {
    // The cache moves before the window work so the single-window guard permits the reopen. If that
    // work throws it has to go back, or the same-value guard swallows every later delivery of the
    // mode and the user is stuck until they toggle away and back.
    const deps = makeDeps({
      closeWindow: vi.fn(() => {
        throw new Error('window vanished');
      }),
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(getCachedInterfaceMode()).toBe('power');
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
      getPreservedEntrySlotIds: () => [0, 2, 3],
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
      getPreservedEntrySlotIds: () => [],
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
      getPreservedEntrySlotIds: () => [0],
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
      getPreservedEntrySlotIds: () => [0, 1, 2],
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

  test('a mode that has not been read yet refuses nothing', () => {
    // The startup restore creates its windows before the mode read they depend on can land,
    // because that read can block on the extension host. Treating an unread mode as simple
    // would refuse a power session the secondary windows it is in the middle of restoring.
    expect(isAdditionalWindowRefusedInSimpleMode(undefined, 1)).toBe(false);
  });
});
