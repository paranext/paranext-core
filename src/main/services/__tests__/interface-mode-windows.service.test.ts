import { beforeEach, describe, expect, test, vi } from 'vitest';
import { logger } from '@shared/services/logger.service';
import {
  clearModeSwitchClose,
  getCachedInterfaceMode,
  getSwitchGeneration,
  seedInterfaceMode,
  handleInterfaceModeChanged,
  initializeModeSwitchOrchestration,
  isAdditionalWindowRefusedInSimpleMode,
  isClosingForModeSwitch,
  undoModeSwitchClose,
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
    isWindowAbandoned: () => false,
    markWindowClosing: vi.fn(),
    unmarkWindowClosing: vi.fn(),
    hideWindow: vi.fn(),
    showWindow: vi.fn(),
    closeWindow: vi.fn(() => true),
    focusWindow: vi.fn(),
    isAppShuttingDown: () => false,
    getPreservedEntrySlotIds: () => [],
    createWindowForEntry: vi.fn(async () => {}),
    ...overrides,
  };
}

/** Let work started without being awaited — a reopen kicked off by a close reporting in — run */
async function settle(): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
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

  test('an ordinary simple launch does not run the switch reaction', async () => {
    // The launch-path regression this guards: the restore reports the mode it acted on, and the
    // window set already matches it. Reacting anyway would focus the survivor — which un-minimizes
    // a window started minimized and pulls a window in front of a user who has moved on.
    const deps = makeDeps({ getTrackedWindowIds: () => [1] });
    initializeModeSwitchOrchestration(deps, undefined);

    seedInterfaceMode('simple', getSwitchGeneration());
    await handleInterfaceModeChanged('simple');

    expect(deps.focusWindow).not.toHaveBeenCalled();
    expect(deps.closeWindow).not.toHaveBeenCalled();
    expect(deps.createWindowForEntry).not.toHaveBeenCalled();
  });

  test('the first mode seen after an unreadable startup read is adopted, not acted on', async () => {
    // A startup that could not read the mode leaves it unknown, and the subscription does not ask
    // for the current value — so the first delivery to arrive is the first this process has seen,
    // whether or not anything changed. Acting on it would run a switch reaction on an ordinary
    // session, off the back of some unrelated setting being written.
    const deps = makeDeps({ getPreservedEntrySlotIds: () => [11, 12] });
    initializeModeSwitchOrchestration(deps, undefined);

    await handleInterfaceModeChanged('simple');

    expect(deps.closeWindow).not.toHaveBeenCalled();
    expect(deps.focusWindow).not.toHaveBeenCalled();
    // …and it is now known, so a real change from here on is acted on
    expect(getCachedInterfaceMode()).toBe('simple');
    await handleInterfaceModeChanged('power');
    expect(deps.createWindowForEntry).toHaveBeenCalled();
  });

  test('a switch to power with no window open creates nothing', async () => {
    // The application can be resident with no windows at all (macOS, after the last one closed),
    // and the session-long subscription is still live. Building the whole saved window set there
    // would put windows on screen with no user gesture behind them; the dock click that asks for
    // them has its own path.
    const deps = makeDeps({
      getTrackedWindowIds: () => [],
      getPreservedEntrySlotIds: () => [11, 12],
    });
    initializeModeSwitchOrchestration(deps, 'simple');

    await handleInterfaceModeChanged('power');

    expect(deps.createWindowForEntry).not.toHaveBeenCalled();
  });

  test('adopting the first reading counts as a switch against a restore already in flight', async () => {
    // Anything that moves the cache has to move the generation with it, or a restore that read the
    // mode before this point lands afterwards and puts its now-stale reading back — which is the
    // clobbering the generation exists to prevent.
    const deps = makeDeps();
    initializeModeSwitchOrchestration(deps, undefined);
    const generationBeforeRestore = getSwitchGeneration();

    await handleInterfaceModeChanged('simple');
    expect(getCachedInterfaceMode()).toBe('simple');

    seedInterfaceMode('power', generationBeforeRestore);

    expect(getCachedInterfaceMode()).toBe('simple');
  });

  test('a switch to power with no window counts as one too', async () => {
    // The same rule for the other branch that records a mode without acting on it
    const deps = makeDeps({ getTrackedWindowIds: () => [], getPreservedEntrySlotIds: () => [11] });
    initializeModeSwitchOrchestration(deps, 'simple');
    const generationBeforeRestore = getSwitchGeneration();

    await handleInterfaceModeChanged('power');
    expect(getCachedInterfaceMode()).toBe('power');

    seedInterfaceMode('simple', generationBeforeRestore);

    expect(getCachedInterfaceMode()).toBe('power');
  });

  test('a seed records the mode without acting on it', async () => {
    // The negative control for the test above: seeding must be a record, not a switch — and the
    // mode it records has to be the one a later change is compared against.
    const deps = makeDeps({ getPreservedEntrySlotIds: () => [11] });
    initializeModeSwitchOrchestration(deps, undefined);

    seedInterfaceMode('power', getSwitchGeneration());

    expect(getCachedInterfaceMode()).toBe('power');
    expect(deps.createWindowForEntry).not.toHaveBeenCalled();
    // …and a real change away from the seeded mode is still acted on
    await handleInterfaceModeChanged('simple');
    expect(deps.closeWindow).toHaveBeenCalled();
  });

  test('a stale seed does not clobber a real switch that ran while it was in flight', async () => {
    // The race this guards: a restore reads the mode, a genuine change arrives and is acted on
    // before the restore's read is seeded, and the seed must not then overwrite what the real
    // switch just recorded with its now-stale reading.
    const deps = makeDeps({ getTrackedWindowIds: () => [1] });
    initializeModeSwitchOrchestration(deps, 'power');
    const generationBeforeRestore = getSwitchGeneration();

    await handleInterfaceModeChanged('simple');
    expect(getCachedInterfaceMode()).toBe('simple');

    seedInterfaceMode('power', generationBeforeRestore);

    expect(getCachedInterfaceMode()).toBe('simple');
  });

  test('a seed still applies when no switch ran since it was captured', async () => {
    const deps = makeDeps({ getTrackedWindowIds: () => [1] });
    initializeModeSwitchOrchestration(deps, undefined);
    const generationBeforeRestore = getSwitchGeneration();

    seedInterfaceMode('power', generationBeforeRestore);

    expect(getCachedInterfaceMode()).toBe('power');
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

  test('a window that fails to close does not take the rest of the batch with it', async () => {
    // Window 2 comes before window 3 in the tracked order; if closing 2 throws, 3 must still be
    // marked, hidden and asked to close rather than being left fully visible.
    const deps = makeDeps({
      closeWindow: vi.fn((windowId: number) => {
        if (windowId === 2) throw new Error('window vanished');
        return true;
      }),
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.markWindowClosing).toHaveBeenCalledWith(3);
    expect(deps.hideWindow).toHaveBeenCalledWith(3);
    expect(deps.closeWindow).toHaveBeenCalledWith(3);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('2'));
  });

  test('a window that fails to close is put back on screen instead of left hidden and claimed', async () => {
    // The switch marks and hides a window before it asks for the close. When that ask throws the
    // close never happens, and nothing else ever undoes it: `closed` is the only thing that clears
    // the mark and it will not fire. Left alone the window is invisible, still recorded as closing,
    // skipped by every later switch, and unreachable by the user for the life of the process.
    const deps = makeDeps({
      closeWindow: vi.fn((windowId: number) => {
        if (windowId === 2) throw new Error('window vanished');
        return true;
      }),
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(isClosingForModeSwitch(2)).toBe(false);
    expect(deps.showWindow).toHaveBeenCalledWith(2);
    expect(deps.unmarkWindowClosing).toHaveBeenCalledWith(2);
    // Only the window that failed. Window 3 closed cleanly and must not be brought back.
    expect(deps.showWindow).not.toHaveBeenCalledWith(3);
    expect(deps.unmarkWindowClosing).not.toHaveBeenCalledWith(3);
  });

  test('a recovery that itself fails does not abandon the rest of the batch', async () => {
    // Both callers of the undo are already recovering from something that went wrong. A second
    // throw out of the recovery would, from here, skip every window after this one — losing the
    // isolation the loop exists to give — and from the close handler would strand the very window
    // it is rescuing.
    const deps = makeDeps({
      closeWindow: vi.fn((windowId: number) => {
        if (windowId === 2) throw new Error('window vanished');
        return true;
      }),
      showWindow: vi.fn((windowId: number) => {
        if (windowId === 2) throw new Error('window already destroyed');
      }),
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    // Window 3 still got its turn, and window 2's claim came off despite the failed recovery
    expect(deps.closeWindow).toHaveBeenCalledWith(3);
    expect(isClosingForModeSwitch(2)).toBe(false);
  });

  test('a partial switch to simple leaves the mode where the user left it, so switching back still works', async () => {
    // The switch DID happen for every window that closed, and the setting on disk already reads
    // simple. Putting the cache back to power would make the user's next action — switching to
    // power — equal the cache and be swallowed by the same-value guard above, leaving the windows
    // that closed closed with no route back except toggling twice.
    const deps = makeDeps({
      closeWindow: vi.fn((windowId: number) => {
        if (windowId === 2) throw new Error('window vanished');
        return true;
      }),
      // Window 2 is alive again after the recovery, so its entry is not among the preserved ones;
      // only slot 7 is. Which entries count as preserved is `getPreservedEntrySlotIds`' own
      // decision, pinned in the persistence suite — this asserts the reopen honours it.
      getPreservedEntrySlotIds: () => [7],
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');
    expect(getCachedInterfaceMode()).toBe('simple');

    await handleInterfaceModeChanged('power');

    // Exactly the entry with no live window — no second copy of the window that stayed open
    expect(deps.createWindowForEntry).toHaveBeenCalledTimes(1);
    expect(deps.createWindowForEntry).toHaveBeenCalledWith(7);
  });

  test('a window whose close is cancelled comes back on screen and stops being claimed by the switch', async () => {
    // The other route to the same end state: the close was asked for, and the window's own handler
    // decided to stay open. Same consequence, same undo, different caller.
    const deps = makeDeps();
    initializeModeSwitchOrchestration(deps, 'power');
    await handleInterfaceModeChanged('simple');
    expect(isClosingForModeSwitch(2)).toBe(true);

    undoModeSwitchClose(2);

    expect(isClosingForModeSwitch(2)).toBe(false);
    expect(deps.showWindow).toHaveBeenCalledWith(2);
    expect(deps.unmarkWindowClosing).toHaveBeenCalledWith(2);
    // Window 3's close is still going ahead, so a blanket clear would be as wrong as no clear.
    expect(isClosingForModeSwitch(3)).toBe(true);
    expect(deps.showWindow).not.toHaveBeenCalledWith(3);
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

  test('a window that has been given up on cannot be the window a switch leaves behind', async () => {
    // The primary role sits on the persisted entry, and a window whose renderer was given up on
    // keeps its entry — so it keeps the role. Leaving it as the survivor would close every window
    // the user can still work in and leave them looking at a dead page, which is the same failure
    // as closing them all, one window later.
    const deps = makeDeps({ isWindowAbandoned: (windowId) => windowId === 1 });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.closeWindow).not.toHaveBeenCalled();
  });

  test('a window already on its way out cannot be the window a switch leaves behind', async () => {
    // The primary role is read from the persisted entry, which a window keeps until it has actually
    // gone — so a window the user closed a moment ago still answers to it. Leaving that one and
    // closing the rest ends with no window at all, one close later, which is the outcome the floor
    // above exists to refuse.
    const deps = makeDeps({
      isWindowClosing: (windowId) => windowId === 1,
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.closeWindow).not.toHaveBeenCalled();
  });

  test('a window that is alive is still the survivor when another has been given up on', async () => {
    // The negative control for the guard above: refusing whenever ANY window has been given up on
    // would stop the switch working in the ordinary case, and would read as correct from the test
    // above alone.
    const deps = makeDeps({ isWindowAbandoned: (windowId) => windowId === 3 });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');

    expect(deps.closeWindow).toHaveBeenCalledWith(2);
    expect(deps.closeWindow).not.toHaveBeenCalledWith(1);
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

  test('a switch back to power before the closes finish still brings the windows back', async () => {
    // A window stops holding its entry only once it has actually gone, which is one Electron close
    // later than the switch that asked for it. A switch back to power arriving in that gap sees
    // nothing preserved — and the reopen's per-pass re-read cannot help, because with an empty set
    // it never takes a pass at all. The closes reporting in is what starts it.
    let preserved: number[] = [];
    const created: number[] = [];
    const deps = makeDeps({
      getTrackedWindowIds: () => [1, 2],
      getPreservedEntrySlotIds: () => preserved,
      createWindowForEntry: vi.fn(async (slotId: number) => {
        created.push(slotId);
      }),
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');
    await handleInterfaceModeChanged('power');

    // Window 2 was asked to close but has not gone, so its entry is still held by a live window
    expect(created).toEqual([]);

    // Its close finishes, and only now is there an entry to reopen
    preserved = [22];
    clearModeSwitchClose(2);
    await settle();

    expect(created).toEqual([22]);
  });

  test('the reopen waits for the last of the closes rather than starting on the first', async () => {
    // Reopening between two closes would create windows while the switch that closed them is still
    // running. Nothing is missed by waiting: the last close is what makes the set complete.
    let preserved: number[] = [];
    const deps = makeDeps({
      getTrackedWindowIds: () => [1, 2, 3],
      getPreservedEntrySlotIds: () => preserved,
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');
    await handleInterfaceModeChanged('power');
    preserved = [22];
    clearModeSwitchClose(2);
    await settle();

    expect(deps.createWindowForEntry).not.toHaveBeenCalled();

    preserved = [22, 33];
    clearModeSwitchClose(3);
    await settle();

    expect(deps.createWindowForEntry).toHaveBeenCalledTimes(2);
  });

  test('a close reporting in during a reopen does not start a second one', async () => {
    // The running reopen re-reads the set each pass, so it picks the entry up itself. A second one
    // started alongside it would create a window per entry twice over.
    const created: number[] = [];
    let preserved = [33];
    let releaseFirstWindow = () => {};
    const firstWindowCreated = new Promise<void>((resolve) => {
      releaseFirstWindow = resolve;
    });
    const deps = makeDeps({
      getTrackedWindowIds: () => [1, 2, 3],
      getPreservedEntrySlotIds: () => preserved,
      createWindowForEntry: vi.fn(async (slotId: number) => {
        created.push(slotId);
        if (slotId === 33) await firstWindowCreated;
      }),
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');
    // Window 3 has gone; window 2's close is still running, so its entry is still held
    clearModeSwitchClose(3);
    const reopen = handleInterfaceModeChanged('power');
    await settle();

    // Window 2's close reports while the first window is still being created
    preserved = [33, 22];
    clearModeSwitchClose(2);
    releaseFirstWindow();
    await reopen;
    await settle();

    expect(created).toEqual([33, 22]);
  });

  test('a second switch to power waits for the reopen the first one left running', async () => {
    // A superseded reopen only notices it has been superseded between windows, so it is still
    // creating one when the switch that replaced it arrives. An entry stays preserved until its
    // window exists, so two reopens running together read the same entry and create it twice.
    const created: number[] = [];
    let preserved = [11];
    let releaseFirstWindow = () => {};
    const firstWindowCreated = new Promise<void>((resolve) => {
      releaseFirstWindow = resolve;
    });
    const deps = makeDeps({
      getTrackedWindowIds: () => [1],
      getPreservedEntrySlotIds: () => preserved,
      createWindowForEntry: vi.fn(async (slotId: number) => {
        created.push(slotId);
        if (slotId === 11) await firstWindowCreated;
        // A window exists now, so its entry stops being one with nothing on screen
        preserved = preserved.filter((candidate) => candidate !== slotId);
      }),
    });
    initializeModeSwitchOrchestration(deps, 'simple');

    const firstSwitchBack = handleInterfaceModeChanged('power');
    await settle();
    await handleInterfaceModeChanged('simple');
    const secondSwitchBack = handleInterfaceModeChanged('power');
    await settle();

    releaseFirstWindow();
    await firstSwitchBack;
    await secondSwitchBack;

    expect(created).toEqual([11]);
  });

  test('a close reporting in while the mode still reads simple reopens nothing', async () => {
    // The negative control: the ordinary end of a switch to simple runs exactly this path, and a
    // reopen fired from it would put back the window the switch had just closed.
    const deps = makeDeps({
      getTrackedWindowIds: () => [1, 2],
      getPreservedEntrySlotIds: () => [22],
    });
    initializeModeSwitchOrchestration(deps, 'power');

    await handleInterfaceModeChanged('simple');
    clearModeSwitchClose(2);
    await settle();

    expect(deps.createWindowForEntry).not.toHaveBeenCalled();
  });

  test('a failed switch back to power leaves the mode able to be acted on again', async () => {
    // The cache moves before the window work so the single-window guard permits the reopen. When
    // the reopen throws, nothing was closed and nothing came back, so the cache has to go back —
    // otherwise the same-value guard swallows the user's next attempt at power and they are stuck.
    //
    // Only this direction. A switch to SIMPLE that fails part-way still closed the windows whose
    // closes succeeded, so putting the cache back there would describe the application as being in
    // a mode it has left and would swallow the user's way out — see the partial-switch test below.
    const deps = makeDeps({
      getPreservedEntrySlotIds: () => {
        throw new Error('the structure could not be read');
      },
    });
    initializeModeSwitchOrchestration(deps, 'simple');

    await handleInterfaceModeChanged('power');

    expect(getCachedInterfaceMode()).toBe('simple');
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
