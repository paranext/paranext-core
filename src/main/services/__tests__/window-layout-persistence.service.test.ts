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

/** Fresh service instance (module state reset) with its request handlers registered */
async function startService(): Promise<ServiceModule> {
  const service = await import('@main/services/window-layout-persistence.service');
  await service.initializeWindowLayoutPersistence();
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

    service.handleWindowRemoved(12);
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

    service.handleWindowRemoved(11);
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
