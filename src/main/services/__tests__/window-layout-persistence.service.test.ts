import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import path from 'path';
import type { LayoutInfo } from '@shared/models/docking-framework.model';
import type {
  WindowBoundsState,
  WindowLayoutEntry,
  WindowLayoutStructure,
} from '@shared/data/window-layout-persistence.model';
import { reconcileSavedLayout } from '@shared/utils/saved-layout-reconciliation.util';

// NOTE: `globalThis.processType` is deliberately left unset (the logger warns per call but works).
// Setting it to `Main` would make the shared logger run electron-log's main-process initialization
// at import time, which requires the real electron runtime this test replaces with a mock.

// Left untyped (behaviors are wired in beforeEach) so `mock.calls` stays destructurable
const mocks = vi.hoisted(() => ({
  getPath: vi.fn(),
  readFile: vi.fn(),
  writeFile: vi.fn(),
  rename: vi.fn(),
  registerRequestHandler: vi.fn(),
}));

vi.mock('electron', () => ({ app: { getPath: mocks.getPath } }));
vi.mock('fs/promises', () => {
  const mocked = {
    readFile: mocks.readFile,
    writeFile: mocks.writeFile,
    rename: mocks.rename,
  };
  // Other modules in the import graph (e.g. the logger) default-import fs/promises
  return { ...mocked, default: mocked };
});
vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: mocks.registerRequestHandler,
}));

/** Missing-file rejection shaped the way fs delivers it (the service detects the `code`) */
function enoent(filePath: string): Error {
  return Object.assign(new Error(`ENOENT: no such file, open '${filePath}'`), { code: 'ENOENT' });
}

/** Put the given file contents on the mocked disk; anything not given does not exist */
function seedFiles(files: { structure?: unknown; legacyWindowState?: unknown } = {}): void {
  mocks.readFile.mockImplementation(async (filePath: string) => {
    if (filePath.endsWith('window-layouts.json') && files.structure !== undefined)
      return typeof files.structure === 'string'
        ? files.structure
        : JSON.stringify(files.structure);
    if (filePath.endsWith('window-state.json') && files.legacyWindowState !== undefined)
      return JSON.stringify(files.legacyWindowState);
    throw enoent(filePath);
  });
}

/** The structure most recently written to disk */
function writtenStructure(): WindowLayoutStructure {
  const lastWriteCall = mocks.writeFile.mock.calls.at(-1);
  if (!lastWriteCall) throw new Error('nothing was written');
  return JSON.parse(String(lastWriteCall[1]));
}

/** The request handler the service registered for the given request type */
function registeredHandler(requestType: string): (...args: unknown[]) => Promise<unknown> {
  const registration = mocks.registerRequestHandler.mock.calls.find(
    ([type]) => type === requestType,
  );
  if (!registration) throw new Error(`no handler registered for ${requestType}`);
  return registration[1];
}

/** A minimal saved layout holding one viewable tab */
function layoutWithTab(tabId: string): LayoutInfo {
  return {
    dockbox: { mode: 'horizontal', children: [{ tabs: [{ id: tabId, tabType: 'webView' }] }] },
  };
}

/** A saved layout whose only tab could never render (no id) — a phantom-only layout */
function phantomOnlyLayout(): LayoutInfo {
  return { dockbox: { mode: 'horizontal', children: [{ tabs: [{ tabType: 'webView' }] }] } };
}

/** The id of the first tab in an entry's layout, for order assertions */
function firstTabIdOf(layout: LayoutInfo | undefined): string | undefined {
  // Walking a deliberately opaque saved-layout fixture
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const dockbox = layout?.dockbox as { children?: { tabs?: { id?: string }[] }[] } | undefined;
  return dockbox?.children?.[0]?.tabs?.[0]?.id;
}

type ServiceModule = typeof import('@main/services/window-layout-persistence.service');

/**
 * The instance {@link startService} last handed out, so teardown can reach the module state a test
 * left behind. Each test re-imports the service, so only the instance it ran against can cancel
 * what that instance scheduled.
 */
let serviceUnderTest: ServiceModule | undefined;

/** Fresh service instance (module state reset) with its request handlers registered */
async function startService(): Promise<ServiceModule> {
  const service = await import('@main/services/window-layout-persistence.service');
  await service.initializeWindowLayoutPersistence();
  serviceUnderTest = service;
  return service;
}

/** Load the given entries and assign one window per entry, in order, starting at `firstWindowId` */
async function loadAndAssignAll(
  service: ServiceModule,
  entries: WindowLayoutEntry[],
  firstWindowId: number,
): Promise<void> {
  seedFiles({ structure: { windows: entries } });
  const plan = await service.loadWindowLayouts();
  if (plan.kind !== 'restore') throw new Error('expected a restore plan');
  plan.entries.forEach((_, index) => service.assignEntryToWindow(firstWindowId + index, index));
}

describe('window layout persistence service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    mocks.getPath.mockReturnValue('/mock-user-data');
    mocks.writeFile.mockResolvedValue(undefined);
    mocks.rename.mockResolvedValue(undefined);
    mocks.registerRequestHandler.mockResolvedValue(async () => true);
    seedFiles();
  });

  afterEach(() => {
    // A layout push schedules a write on a real 500 ms debounce, and re-importing the service for
    // the next test does not cancel it: the orphaned timer fires into whichever test is running and
    // records a call on the file-wide writeFile mock. Removing a window cancels the pending write
    // unconditionally, so an id no window ever had defuses whatever this test left scheduled.
    serviceUnderTest?.handleWindowRemoved(-1, 'entry-goes-with-it');
    serviceUnderTest = undefined;
    vi.useRealTimers();
  });

  test('reports the legacy single-window plan when no structure file exists', async () => {
    seedFiles({
      legacyWindowState: {
        x: 5,
        y: 6,
        width: 700,
        height: 500,
        isMaximized: true,
        displayBounds: { x: 0, y: 0, width: 1920, height: 1080 },
      },
    });
    const service = await startService();

    const plan = await service.loadWindowLayouts();

    expect(plan).toEqual({
      kind: 'legacy',
      boundsState: {
        bounds: { x: 5, y: 6, width: 700, height: 500 },
        isMaximized: true,
        displayBounds: { x: 0, y: 0, width: 1920, height: 1080 },
      },
    });
  });

  test('reports the legacy plan with no bounds when the previous keeper file is missing too', async () => {
    const service = await startService();

    const plan = await service.loadWindowLayouts();

    expect(plan).toEqual({ kind: 'legacy', boundsState: undefined });
  });

  test('falls back to the legacy plan when the structure file is corrupt or empty', async () => {
    const service = await startService();

    seedFiles({ structure: 'this is not json' });
    expect((await service.loadWindowLayouts()).kind).toBe('legacy');

    seedFiles({ structure: { windows: [] } });
    expect((await service.loadWindowLayouts()).kind).toBe('legacy');
  });

  test('hands out the saved entries in file order as windows are assigned', async () => {
    seedFiles({
      structure: {
        windows: [
          { layout: layoutWithTab('one'), isMain: true },
          { layout: layoutWithTab('two') },
          { layout: layoutWithTab('three') },
        ],
      },
    });
    const service = await startService();

    const plan = await service.loadWindowLayouts();

    if (plan.kind !== 'restore') throw new Error('expected a restore plan');
    expect(plan.entries.map((entry) => firstTabIdOf(entry.layout))).toEqual([
      'one',
      'two',
      'three',
    ]);
    expect(plan.mainEntryIndex).toBe(0);

    service.assignEntryToWindow(11, 0);
    service.assignEntryToWindow(12, 1);
    service.assignEntryToWindow(13, 2);
    const getLayout = registeredHandler('windowLayout:get');
    await expect(getLayout(12)).resolves.toEqual({ kind: 'entry', layout: layoutWithTab('two') });
    await expect(getLayout(13)).resolves.toEqual({ kind: 'entry', layout: layoutWithTab('three') });
  });

  test('writes exactly the live windows in order; a removed window leaves no trace', async () => {
    const service = await startService();
    await loadAndAssignAll(
      service,
      [
        { layout: layoutWithTab('one'), isMain: true },
        { layout: layoutWithTab('two') },
        { layout: layoutWithTab('three') },
      ],
      11,
    );

    service.handleWindowRemoved(12, 'entry-goes-with-it');
    await service.writeNow([11, 13]);

    const written = writtenStructure();
    expect(written.windows.map((entry) => firstTabIdOf(entry.layout))).toEqual(['one', 'three']);
    // No trace anywhere in the file, not just no entry
    const lastWriteCall = mocks.writeFile.mock.calls.at(-1);
    expect(String(lastWriteCall?.[1])).not.toContain('two');
    // Written safely: temp file first, then renamed over the real one. Expectations are built with
    // path.join because the service joins paths, so separators differ per platform.
    expect(String(lastWriteCall?.[0])).toBe(
      path.join('/mock-user-data', 'window-layouts.json.tmp'),
    );
    expect(mocks.rename).toHaveBeenCalledWith(
      path.join('/mock-user-data', 'window-layouts.json.tmp'),
      path.join('/mock-user-data', 'window-layouts.json'),
    );
  });

  test('marks exactly one entry as main, following the tracked main window', async () => {
    const service = await startService();
    await loadAndAssignAll(
      service,
      [
        { layout: layoutWithTab('one'), isMain: true },
        { layout: layoutWithTab('two') },
        { layout: layoutWithTab('three') },
      ],
      11,
    );
    service.setMainWindowId(12);

    await service.writeNow([11, 12, 13]);

    expect(writtenStructure().windows.map((entry) => entry.isMain)).toEqual([
      undefined,
      true,
      undefined,
    ]);
  });

  test('falls back to marking the first entry as main when the main window is gone', async () => {
    const service = await startService();
    await loadAndAssignAll(
      service,
      [
        { layout: layoutWithTab('one'), isMain: true },
        { layout: layoutWithTab('two') },
        { layout: layoutWithTab('three') },
      ],
      11,
    );
    service.setMainWindowId(11);

    service.handleWindowRemoved(11, 'entry-goes-with-it');
    await service.writeNow([12, 13]);

    expect(writtenStructure().windows.map((entry) => entry.isMain)).toEqual([true, undefined]);
  });

  test('a session that never pushes a layout cannot clobber saved layouts or shrink the list', async () => {
    // A simple-mode session: only the main entry's window is created, and the renderer never
    // pushes a layout. The write must keep every entry, layouts untouched, only bounds moving.
    seedFiles({
      structure: {
        windows: [
          {
            layout: layoutWithTab('one'),
            bounds: { x: 1, y: 2, width: 300, height: 400 },
            isMain: true,
          },
          { layout: layoutWithTab('two') },
          { layout: layoutWithTab('three') },
        ],
      },
    });
    const service = await startService();
    const plan = await service.loadWindowLayouts();
    if (plan.kind !== 'restore') throw new Error('expected a restore plan');
    service.assignEntryToWindow(21, plan.mainEntryIndex);
    service.setMainWindowId(21);

    const movedBounds = { x: 50, y: 60, width: 800, height: 600 };
    service.updateWindowBounds(21, { bounds: movedBounds });
    await service.writeNow([21]);

    expect(writtenStructure().windows).toEqual([
      { layout: layoutWithTab('one'), bounds: movedBounds, isMain: true },
      { layout: layoutWithTab('two') },
      { layout: layoutWithTab('three') },
    ]);
  });

  test('coalesces rapid updates into one debounced write; writeNow flushes immediately', async () => {
    vi.useFakeTimers();
    const service = await startService();
    await loadAndAssignAll(service, [{ layout: layoutWithTab('one'), isMain: true }], 31);

    service.updateWindowBounds(31, { bounds: { x: 1, y: 1, width: 500, height: 500 } });
    service.updateWindowBounds(31, { bounds: { x: 2, y: 2, width: 500, height: 500 } });
    service.updateWindowBounds(31, { bounds: { x: 3, y: 3, width: 500, height: 500 } });
    expect(mocks.writeFile).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(2000);
    expect(mocks.writeFile).toHaveBeenCalledTimes(1);
    expect(writtenStructure().windows[0].bounds).toEqual({ x: 3, y: 3, width: 500, height: 500 });

    service.updateWindowBounds(31, { bounds: { x: 4, y: 4, width: 500, height: 500 } });
    await service.writeNow([31]);
    expect(mocks.writeFile).toHaveBeenCalledTimes(2);

    // The pending debounced write was absorbed by writeNow rather than firing again later
    await vi.advanceTimersByTimeAsync(10000);
    expect(mocks.writeFile).toHaveBeenCalledTimes(2);
  });

  test('drops a phantom-only entry so it cannot resurrect a window', async () => {
    seedFiles({
      structure: {
        windows: [
          { layout: phantomOnlyLayout() },
          { layout: layoutWithTab('keeper'), isMain: true },
        ],
      },
    });
    const service = await startService();

    const plan = await service.loadWindowLayouts();

    if (plan.kind !== 'restore') throw new Error('expected a restore plan');
    expect(plan.entries).toHaveLength(1);
    expect(firstTabIdOf(plan.entries[0].layout)).toBe('keeper');
    expect(plan.mainEntryIndex).toBe(0);
  });

  test('an entry saved tab-less restores a window — a deliberately empty window comes back', async () => {
    // Quitting with a second, empty window open and relaunching must bring that window back.
    // Tab-less-as-saved is the signature of a live, legitimately empty window; only an entry whose
    // tabs all turn out to be phantoms is junk (previous test).
    const emptyLayout: LayoutInfo = { dockbox: { mode: 'horizontal', children: [] } };
    seedFiles({
      structure: {
        windows: [{ layout: layoutWithTab('one'), isMain: true }, { layout: emptyLayout }],
      },
    });
    const service = await startService();

    const plan = await service.loadWindowLayouts();

    if (plan.kind !== 'restore') throw new Error('expected a restore plan');
    expect(plan.entries).toHaveLength(2);
    service.assignEntryToWindow(11, 0);
    service.assignEntryToWindow(12, 1);
    await expect(registeredHandler('windowLayout:get')(12)).resolves.toEqual({
      kind: 'entry',
      layout: emptyLayout,
    });
  });

  test('an entry with no saved layout restores an empty window, not the legacy layout', async () => {
    // An untouched empty window never pushes a layout, so its entry is written with no layout key.
    // It must come back as an empty window; answering 'legacy' here would clone the
    // pre-multi-window layout into it.
    seedFiles({
      structure: {
        windows: [
          { layout: layoutWithTab('one'), isMain: true },
          { bounds: { x: 2, y: 2, width: 200, height: 200 } },
        ],
      },
    });
    const service = await startService();

    const plan = await service.loadWindowLayouts();

    if (plan.kind !== 'restore') throw new Error('expected a restore plan');
    expect(plan.entries).toHaveLength(2);
    service.assignEntryToWindow(11, 0);
    service.assignEntryToWindow(12, 1);
    await expect(registeredHandler('windowLayout:get')(12)).resolves.toEqual({ kind: 'empty' });
  });

  test('the exact shape an emptied dock pushes round-trips as a restorable empty window', async () => {
    // What the renderer pushes for a window whose user closed every tab: `saveLayout` runs the
    // dock's layout through reconcileSavedLayout before pushing, so derive the pushed shape the
    // same way instead of hardcoding it. The load filter must classify this exact shape as
    // "already empty" (keep and restore) rather than phantom junk (drop), or quitting with an
    // emptied window would silently lose it.
    const pushedEmptyShape = reconcileSavedLayout({
      dockbox: { mode: 'horizontal', children: [{ tabs: [] }] },
    });
    seedFiles({
      structure: {
        windows: [{ layout: layoutWithTab('one'), isMain: true }, { layout: pushedEmptyShape }],
      },
    });
    const service = await startService();

    const plan = await service.loadWindowLayouts();

    if (plan.kind !== 'restore') throw new Error('expected a restore plan');
    expect(plan.entries).toHaveLength(2);
    service.assignEntryToWindow(11, 0);
    service.assignEntryToWindow(12, 1);
    await expect(registeredHandler('windowLayout:get')(12)).resolves.toEqual({
      kind: 'entry',
      layout: pushedEmptyShape,
    });
  });

  test('answers a main entry that never captured a layout with the legacy fallback', async () => {
    // An upgrade can create the structure file from bounds alone (a simple-mode session writes
    // bounds but never a layout). The pre-multi-window layout still lives in the renderer's
    // unprefixed localStorage, so this window must keep falling back to it.
    seedFiles({
      structure: { windows: [{ bounds: { x: 1, y: 2, width: 300, height: 400 } }] },
    });
    const service = await startService();

    const plan = await service.loadWindowLayouts();

    if (plan.kind !== 'restore') throw new Error('expected a restore plan');
    service.assignEntryToWindow(41, 0);
    await expect(registeredHandler('windowLayout:get')(41)).resolves.toEqual({ kind: 'legacy' });
  });

  test('answers the legacy window with the legacy fallback and any other window with empty', async () => {
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackLegacyWindow(51);
    service.trackNewWindow(52);

    const getLayout = registeredHandler('windowLayout:get');
    await expect(getLayout(51)).resolves.toEqual({ kind: 'legacy' });
    await expect(getLayout(52)).resolves.toEqual({ kind: 'empty' });
    await expect(getLayout(999)).resolves.toEqual({ kind: 'empty' });
  });

  test('a pushed layout is served back and persisted', async () => {
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackLegacyWindow(61);
    service.setMainWindowId(61);

    const pushed = layoutWithTab('pushed');
    await registeredHandler('windowLayout:save')(61, pushed);

    await expect(registeredHandler('windowLayout:get')(61)).resolves.toEqual({
      kind: 'entry',
      layout: pushed,
    });
    await service.writeNow([61]);
    expect(writtenStructure().windows).toEqual([{ layout: pushed, isMain: true }]);
  });

  test('a window marked pending content answers pending-content until its first layout push', async () => {
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackNewWindow(81);

    service.markWindowPendingContent(81);
    await expect(registeredHandler('windowLayout:get')(81)).resolves.toEqual({
      kind: 'pending-content',
    });

    const pushed = layoutWithTab('routed');
    await registeredHandler('windowLayout:save')(81, pushed);
    await expect(registeredHandler('windowLayout:get')(81)).resolves.toEqual({
      kind: 'entry',
      layout: pushed,
    });
  });

  test('clearWindowPendingContent un-marks a window so it answers as if never marked', async () => {
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackNewWindow(86);
    service.markWindowPendingContent(86);

    service.clearWindowPendingContent(86);

    await expect(registeredHandler('windowLayout:get')(86)).resolves.toEqual({ kind: 'empty' });
  });

  test('clearing a mark tells the routing target it changed', async () => {
    // A pending-content window is passed over for routed work, so losing the mark is the moment it
    // becomes a window new work can go to. Nothing else fires for that change, and the routers
    // holding a resolved shard for the old target have nothing else to tell them it moved.
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackNewWindow(87);
    const announceRoutingTargetChange = vi.fn();
    service.setPendingContentChangeListener(announceRoutingTargetChange);
    service.markWindowPendingContent(87);
    announceRoutingTargetChange.mockClear();

    service.clearWindowPendingContent(87);

    expect(announceRoutingTargetChange).toHaveBeenCalled();
  });

  test('a first layout push clearing the mark tells the routing target it changed', async () => {
    // The other way a mark comes off: the window pushed the layout its routed content produced,
    // which un-marks it directly rather than through `clearWindowPendingContent`
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackNewWindow(88);
    const announceRoutingTargetChange = vi.fn();
    service.setPendingContentChangeListener(announceRoutingTargetChange);
    service.markWindowPendingContent(88);
    announceRoutingTargetChange.mockClear();

    await registeredHandler('windowLayout:save')(88, layoutWithTab('routed'));

    expect(announceRoutingTargetChange).toHaveBeenCalled();
  });

  test('marking an untracked window pending content does not change its (empty) answer', async () => {
    const service = await startService();
    await service.loadWindowLayouts();

    service.markWindowPendingContent(999);

    await expect(registeredHandler('windowLayout:get')(999)).resolves.toEqual({ kind: 'empty' });
  });

  test('a tracked window not marked pending content is unaffected by another window’s mark', async () => {
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackNewWindow(82);
    service.trackNewWindow(83);

    service.markWindowPendingContent(82);

    await expect(registeredHandler('windowLayout:get')(83)).resolves.toEqual({ kind: 'empty' });
  });

  test('removing a pending-content window clears its mark so a later window cannot inherit it', async () => {
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackNewWindow(84);
    service.markWindowPendingContent(84);

    service.handleWindowRemoved(84, 'entry-goes-with-it');
    // A later window that happens to reuse the same runtime id must not inherit the stale mark
    service.trackNewWindow(84);

    await expect(registeredHandler('windowLayout:get')(84)).resolves.toEqual({ kind: 'empty' });
  });

  test('a window that went down with the app leaves nothing for a reused id to inherit', async () => {
    // A last-window close counts as the app going down, but on macOS the app stays resident with no
    // windows, and a window created from there (an extension calling for one, rather than the
    // activate path that reloads layouts) takes the departed window's runtime id back.
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackNewWindow(91);
    await registeredHandler('windowLayout:save')(91, layoutWithTab('departed'));
    service.markWindowPendingContent(91);

    service.handleWindowRemoved(91, 'entry-stays');
    service.trackNewWindow(91);

    // Neither the departed window's tabs nor its pending-content mark belong to the new window
    await expect(registeredHandler('windowLayout:get')(91)).resolves.toEqual({ kind: 'empty' });
    // …and the departed window is still a window the user had open: taking its runtime id back
    // must not take its entry out of the file
    await service.writeNow([91]);
    expect(writtenStructure().windows.map((entry) => firstTabIdOf(entry.layout))).toEqual([
      'departed',
      undefined,
    ]);
  });

  test('reloading window layouts clears pending-content marks left over from the previous session', async () => {
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackNewWindow(85);
    service.markWindowPendingContent(85);

    await service.loadWindowLayouts();
    service.trackNewWindow(85);

    await expect(registeredHandler('windowLayout:get')(85)).resolves.toEqual({ kind: 'empty' });
  });

  test('a mid-session window is appended after the restored entries when written', async () => {
    const service = await startService();
    await loadAndAssignAll(
      service,
      [{ layout: layoutWithTab('one'), isMain: true }, { layout: layoutWithTab('two') }],
      11,
    );
    service.setMainWindowId(11);
    service.trackNewWindow(99);
    await registeredHandler('windowLayout:save')(99, layoutWithTab('fresh'));

    await service.writeNow([11, 12, 99]);

    expect(writtenStructure().windows.map((entry) => firstTabIdOf(entry.layout))).toEqual([
      'one',
      'two',
      'fresh',
    ]);
  });

  test('a failed disk write is swallowed so persistence can never break the app', async () => {
    mocks.writeFile.mockRejectedValue(new Error('disk full'));
    const service = await startService();
    await loadAndAssignAll(service, [{ layout: layoutWithTab('one'), isMain: true }], 71);

    await expect(service.writeNow([71])).resolves.toBeUndefined();
  });

  test('a failed write leaves the write chain usable, so later writes still land', async () => {
    mocks.writeFile.mockRejectedValueOnce(new Error('disk full'));
    const service = await startService();
    await loadAndAssignAll(service, [{ layout: layoutWithTab('one'), isMain: true }], 71);
    service.setMainWindowId(71);

    await service.writeNow([71]);

    // Every write queues behind the one before it, so a failure left unresolved in that queue would
    // skip persistence for the rest of the session — including the quit-time flush
    await service.writeNow([71]);
    expect(mocks.writeFile).toHaveBeenCalledTimes(2);
    expect(writtenStructure().windows.map((entry) => firstTabIdOf(entry.layout))).toEqual(['one']);
  });

  test('removing a window cancels its pending debounced write so the flush stays the last write', async () => {
    vi.useFakeTimers();
    const service = await startService();
    await loadAndAssignAll(
      service,
      [{ layout: layoutWithTab('one'), isMain: true }, { layout: layoutWithTab('two') }],
      11,
    );
    service.setMainWindowId(11);

    // The app is going down: the structure is flushed with both windows still tracked…
    await service.writeNow([11, 12]);
    expect(mocks.writeFile).toHaveBeenCalledTimes(1);

    // …then a bounds update lands (the window was dragged during the shutdown wait), scheduling a
    // debounced write, and the window is torn down before the debounce fires.
    service.updateWindowBounds(12, { bounds: { x: 9, y: 9, width: 900, height: 900 } });
    service.handleWindowRemoved(12, 'entry-stays');
    await vi.advanceTimersByTimeAsync(10_000);

    // The flush must remain the last write: what the shutdown decided to persist is not something a
    // debounce left over from before it may follow up on, part-way through the app's teardown.
    expect(mocks.writeFile).toHaveBeenCalledTimes(1);
    expect(writtenStructure().windows.map((entry) => firstTabIdOf(entry.layout))).toEqual([
      'one',
      'two',
    ]);
  });

  test('removing an id no window ever had still cancels the pending write', async () => {
    // This suite's teardown defuses whatever a test left scheduled by removing an id nothing is
    // tracking, which only works while the cancel happens for every id rather than only for one
    // that was found. Tightening the removal to skip unknown ids would leave the test above green
    // and silently turn that teardown into a no-op, letting debounced writes bleed between tests
    // again.
    vi.useFakeTimers();
    const service = await startService();
    await loadAndAssignAll(service, [{ layout: layoutWithTab('one'), isMain: true }], 11);
    service.setMainWindowId(11);
    await service.writeNow([11]);
    expect(mocks.writeFile).toHaveBeenCalledTimes(1);

    service.updateWindowBounds(11, { bounds: { x: 9, y: 9, width: 900, height: 900 } });
    service.handleWindowRemoved(-1, 'entry-goes-with-it');
    await vi.advanceTimersByTimeAsync(10_000);

    expect(mocks.writeFile).toHaveBeenCalledTimes(1);
  });

  test('a multi-window shutdown writes every window, though they go away while the flushes queue', async () => {
    // Five windows, not two: with only two, the last flush executes before either window's removal
    // can reach it, so a flush that read a shrinking window list would still write both and this
    // would pass while saying nothing. Any count above two can tell the difference.
    const tabIds = ['one', 'two', 'three', 'four', 'five'];
    const service = await startService();
    await loadAndAssignAll(
      service,
      tabIds.map((tabId, index) => ({
        layout: layoutWithTab(tabId),
        ...(index === 0 ? { isMain: true } : {}),
      })),
      11,
    );
    service.setMainWindowId(11);

    // Hold each write at the disk, so the shutdown's ordering is stated here rather than raced out
    // of how quickly a mocked write resolves.
    const releaseWrite: (() => void)[] = [];
    mocks.writeFile.mockImplementation(
      async () =>
        new Promise<void>((resolve) => {
          releaseWrite.push(resolve);
        }),
    );

    // Every window's close handler runs in the same tick — the app is going down and Electron
    // closes them in one loop — so they all flush the same live set and the writes queue up.
    const windowIds = tabIds.map((_, index) => 11 + index);
    const flushes = windowIds.map(() => service.writeNow(windowIds));

    // Each window goes away as soon as its OWN flush lands, while the flushes behind it are still
    // waiting their turn. The window is going down with the app, so its entry stays.
    for (let index = 0; index < windowIds.length; index += 1) {
      // Sequential on purpose: this is the shutdown's ordering, one window at a time
      /* eslint-disable no-await-in-loop */
      await vi.waitFor(() => expect(mocks.writeFile).toHaveBeenCalledTimes(index + 1));
      releaseWrite[index]();
      await flushes[index];
      /* eslint-enable no-await-in-loop */
      service.handleWindowRemoved(windowIds[index], 'entry-stays');
    }

    // The last write is the one that survives on disk. Every window was live when the flushes were
    // decided, so every window has to be in it — a flush that read the tracked windows as they were
    // by the time it reached the front of the queue would hold only the stragglers.
    expect(writtenStructure().windows.map((entry) => firstTabIdOf(entry.layout))).toEqual(tabIds);
  });

  test('a window that went down with the app is written with what it last held', async () => {
    const service = await startService();
    await loadAndAssignAll(
      service,
      [{ layout: layoutWithTab('one'), isMain: true }, { layout: layoutWithTab('two') }],
      11,
    );
    service.setMainWindowId(11);

    // The window's last word on its own layout and placement, then it goes down with the app…
    await registeredHandler('windowLayout:save')(12, layoutWithTab('two-edited'));
    service.updateWindowBounds(12, { bounds: { x: 5, y: 6, width: 700, height: 800 } });
    service.handleWindowRemoved(12, 'entry-stays');

    // …and a flush that only reaches the disk afterwards still writes that, not the stale entry the
    // session started from.
    await service.writeNow([11, 12]);

    const written = writtenStructure();
    expect(written.windows.map((entry) => firstTabIdOf(entry.layout))).toEqual([
      'one',
      'two-edited',
    ]);
    expect(written.windows[1].bounds).toEqual({ x: 5, y: 6, width: 700, height: 800 });
  });

  test('a layout pushed while a flush waits behind an in-flight write still lands in the flush', async () => {
    const service = await startService();
    await loadAndAssignAll(service, [{ layout: layoutWithTab('one'), isMain: true }], 11);
    service.setMainWindowId(11);

    // The first write blocks on the disk, holding the write chain open
    let releaseFirstWrite: (() => void) | undefined;
    mocks.writeFile.mockImplementationOnce(
      async () =>
        new Promise<void>((resolve) => {
          releaseFirstWrite = resolve;
        }),
    );
    const firstWrite = service.writeNow([11]);
    await vi.waitFor(() => expect(mocks.writeFile).toHaveBeenCalledTimes(1));

    // The flush queues behind it, and a last-moment layout push lands before the flush executes
    const flush = service.writeNow([11]);
    await registeredHandler('windowLayout:save')(11, layoutWithTab('late'));

    if (!releaseFirstWrite) throw new Error('the first write never reached the disk');
    releaseFirstWrite();
    await firstWrite;
    await flush;

    expect(writtenStructure().windows.map((entry) => firstTabIdOf(entry.layout))).toEqual(['late']);
  });

  test('loading waits for an in-flight write so the plan reflects the newest structure', async () => {
    const service = await startService();
    await loadAndAssignAll(service, [{ layout: layoutWithTab('one'), isMain: true }], 11);
    service.setMainWindowId(11);
    await registeredHandler('windowLayout:save')(11, layoutWithTab('two'));

    // Block the write on the disk, and only surface its content to reads once it completes — the
    // mocked disk serves the old structure until the write lands, like a real file would
    let releaseWrite: (() => void) | undefined;
    let flushedRaw: string | undefined;
    mocks.writeFile.mockImplementation(
      async (_filePath: string, content: string) =>
        new Promise<void>((resolve) => {
          releaseWrite = () => {
            flushedRaw = content;
            resolve();
          };
        }),
    );
    mocks.readFile.mockImplementation(async (filePath: string) => {
      if (filePath.endsWith('window-layouts.json'))
        return flushedRaw ?? JSON.stringify({ windows: [{ layout: layoutWithTab('one') }] });
      throw enoent(filePath);
    });

    const write = service.writeNow([11]);
    await vi.waitFor(() => expect(mocks.writeFile).toHaveBeenCalled());
    const planPromise = service.loadWindowLayouts();
    if (!releaseWrite) throw new Error('the write never reached the disk');
    releaseWrite();
    await write;
    const plan = await planPromise;

    if (plan.kind !== 'restore') throw new Error('expected a restore plan');
    expect(firstTabIdOf(plan.entries[0].layout)).toBe('two');
  });

  test('a pushed layout is reconciled before it is stored, served, or persisted', async () => {
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackLegacyWindow(61);
    service.setMainWindowId(61);

    // A duplicated tab, which reconciliation collapses to one occurrence. The renderer reconciles
    // before pushing, but the handler must not depend on every pusher doing so.
    const pushed: LayoutInfo = {
      dockbox: {
        mode: 'horizontal',
        children: [
          { tabs: [{ id: 'kept', tabType: 'webView' }] },
          { tabs: [{ id: 'kept', tabType: 'webView' }] },
        ],
      },
    };
    await registeredHandler('windowLayout:save')(61, pushed);

    const reconciled = reconcileSavedLayout(pushed);
    await expect(registeredHandler('windowLayout:get')(61)).resolves.toEqual({
      kind: 'entry',
      layout: reconciled,
    });
    await service.writeNow([61]);
    expect(writtenStructure().windows).toEqual([{ layout: reconciled, isMain: true }]);
  });

  test('assigning to a missing entry index tracks the window as new instead', async () => {
    const service = await startService();
    await loadAndAssignAll(service, [{ layout: layoutWithTab('one'), isMain: true }], 11);
    service.setMainWindowId(11);

    service.assignEntryToWindow(99, 5);

    // The window is tracked (it appears in writes) but received no entry layout
    await expect(registeredHandler('windowLayout:get')(99)).resolves.toEqual({ kind: 'empty' });
    await service.writeNow([11, 99]);
    const written = writtenStructure();
    expect(written.windows).toHaveLength(2);
    expect(firstTabIdOf(written.windows[0].layout)).toBe('one');
    expect(written.windows[1].layout).toBeUndefined();
  });

  test('assigning a window to an already-assigned slot tracks it as a new window', async () => {
    const service = await startService();
    await loadAndAssignAll(service, [{ layout: layoutWithTab('one'), isMain: true }], 11);

    service.assignEntryToWindow(12, 0);

    // Window 12 must not receive entry 0's layout — that slot belongs to window 11
    await expect(registeredHandler('windowLayout:get')(12)).resolves.toEqual({ kind: 'empty' });
    await expect(registeredHandler('windowLayout:get')(11)).resolves.toEqual({
      kind: 'entry',
      layout: layoutWithTab('one'),
    });
  });

  test('assigning an already-tracked window again leaves its original assignment intact', async () => {
    const service = await startService();
    seedFiles({
      structure: {
        windows: [{ layout: layoutWithTab('one'), isMain: true }, { layout: layoutWithTab('two') }],
      },
    });
    const plan = await service.loadWindowLayouts();
    if (plan.kind !== 'restore') throw new Error('expected a restore plan');
    service.assignEntryToWindow(11, 0);
    service.setMainWindowId(11);

    service.assignEntryToWindow(11, 1);

    await expect(registeredHandler('windowLayout:get')(11)).resolves.toEqual({
      kind: 'entry',
      layout: layoutWithTab('one'),
    });
    // Entry 'two' survives as a preserved, unassigned slot
    await service.writeNow([11]);
    expect(writtenStructure().windows.map((entry) => firstTabIdOf(entry.layout))).toEqual([
      'one',
      'two',
    ]);
  });

  test('save requests with a bad id, a bad layout, or an untracked window change nothing', async () => {
    vi.useFakeTimers();
    const service = await startService();
    await service.loadWindowLayouts();
    service.trackLegacyWindow(61);

    const save = registeredHandler('windowLayout:save');
    await save('61', layoutWithTab('pushed')); // id must be a number
    await save(61, 'not-a-layout'); // layout must be object-shaped
    await save(999, layoutWithTab('pushed')); // window 999 is not tracked

    // None of the bad pushes may schedule a write or alter the tracked window's layout
    await vi.advanceTimersByTimeAsync(10_000);
    expect(mocks.writeFile).not.toHaveBeenCalled();
    await expect(registeredHandler('windowLayout:get')(61)).resolves.toEqual({ kind: 'legacy' });
  });

  test('a bounds update for one window leaves the other windows’ entries alone', async () => {
    const service = await startService();
    await loadAndAssignAll(
      service,
      [
        {
          layout: layoutWithTab('one'),
          bounds: { x: 1, y: 1, width: 100, height: 100 },
          isMain: true,
        },
        { layout: layoutWithTab('two'), bounds: { x: 2, y: 2, width: 200, height: 200 } },
      ],
      11,
    );
    service.setMainWindowId(11);

    const boundsUpdate: WindowBoundsState = {
      bounds: { x: 9, y: 9, width: 900, height: 900 },
      isMaximized: true,
    };
    service.updateWindowBounds(12, boundsUpdate);
    await service.writeNow([11, 12]);

    const written = writtenStructure();
    expect(written.windows[0].bounds).toEqual({ x: 1, y: 1, width: 100, height: 100 });
    expect(written.windows[1].bounds).toEqual({ x: 9, y: 9, width: 900, height: 900 });
    expect(written.windows[1].isMaximized).toBe(true);
  });
});
