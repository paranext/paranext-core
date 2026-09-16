import { createElement } from 'react';
import { vi } from 'vitest';
import { DockContext, DragState, PanelData, TabData, TabGroup } from 'rc-dock';

/** Dock id shared `DockContext`/`DragState` fixtures below are keyed to. */
export const DOCK_ID = 'test-dock';
/** Group shared `PanelData`/`TabData` fixtures below belong to by default. */
const GROUP = 'group-a';
/** A second group, distinct from {@link GROUP}, for tests that need a cross-group rejection. */
export const OTHER_GROUP = 'group-b';

export function createPanel(overrides: Partial<PanelData> = {}): PanelData {
  return { id: 'panel-1', tabs: [], group: GROUP, ...overrides };
}

export function createTab(overrides: Partial<TabData> = {}): TabData {
  return { id: 'tab-1', title: 'Tab', content: createElement('div'), group: GROUP, ...overrides };
}

/** Full {@link DockContext} stub; individual tests override `getGroup`. */
export function createDockContext(overrides: Partial<DockContext> = {}): DockContext {
  return {
    getDockId: () => DOCK_ID,
    useEdgeDrop: vi.fn(() => false),
    setDropRect: vi.fn(),
    getLayoutSize: vi.fn(() => ({ width: 0, height: 0 })),
    onSilentChange: vi.fn(),
    dockMove: vi.fn(),
    getGroup: (): TabGroup => ({}),
    find: vi.fn(),
    updateTab: vi.fn(() => true),
    navigateToPanel: vi.fn(),
    getTabCache: vi.fn(),
    removeTabCache: vi.fn(),
    updateTabCache: vi.fn(),
    getRootElement: vi.fn(),
    ...overrides,
  };
}

/**
 * Builds a real, seeded {@link DragState}: constructing it with `init: true` and calling `setData`
 * (as rc-dock's own `onDragStartT` handlers do) writes into `DragState`'s module-level store, which
 * `resolveTabBarDropZoneSource` then reads back via the static `DragState.getData` — exercising the
 * real mechanism rather than a mock of it.
 */
export function createDragState(
  data: Record<string, unknown> | undefined,
  scope: unknown = DOCK_ID,
): DragState {
  const state = new DragState(
    new MouseEvent('mousemove', { clientX: 0, clientY: 0 }),
    {
      element: document.createElement('div'),
      ownerDocument: document,
      dragType: 'left',
      baseX: 0,
      baseY: 0,
      scaleX: 1,
      scaleY: 1,
    },
    true,
  );
  state.setData(data, scope);
  return state;
}

/**
 * Clears rc-dock's shared, module-level drag-data store `DragState.getData` reads from, so one
 * test's seeded drag can't leak into the next — `DragState.getData` is a static that outlives any
 * one test.
 */
export function resetDragStateStore(): void {
  createDragState(undefined, undefined);
}
