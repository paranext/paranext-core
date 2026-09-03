import { createElement } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DockContext, DragState, PanelData, TabData, TabGroup } from 'rc-dock';
import { resolveTabBarDropZoneSource } from './tab-bar-drop-zone.util';

const DOCK_ID = 'test-dock';
const GROUP = 'group-a';

function createPanel(overrides: Partial<PanelData> = {}): PanelData {
  return { id: 'panel-1', tabs: [], group: GROUP, ...overrides };
}

function createTab(overrides: Partial<TabData> = {}): TabData {
  return { id: 'tab-1', title: 'Tab', content: createElement('div'), group: GROUP, ...overrides };
}

/** Full {@link DockContext} stub; individual tests override `getGroup`. */
function createContext(overrides: Partial<DockContext> = {}): DockContext {
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
function seedDragState(data: Record<string, unknown> | undefined, scope: unknown = DOCK_ID): void {
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
}

describe('resolveTabBarDropZoneSource', () => {
  beforeEach(() => {
    // Clear rc-dock's shared drag-data store so tests can't see a previous test's seeded drag.
    seedDragState(undefined, undefined);
  });

  it('accepts a tab dragged from a panel in the same group', () => {
    const tab = createTab();
    seedDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), createPanel())).toBe(tab);
  });

  it('rejects a tab dragged from a different group', () => {
    const tab = createTab({ group: 'group-b' });
    seedDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), createPanel())).toBeUndefined();
  });

  it("rejects a tab dragged onto its own panel's bar when it is already that panel's last tab", () => {
    const panel = createPanel();
    const first = createTab({ id: 'tab-0', parent: panel });
    const tab = createTab({ parent: panel });
    panel.tabs = [first, tab];
    seedDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), panel)).toBeUndefined();
  });

  it("rejects a tab dragged onto its own panel's bar when it is that panel's only tab", () => {
    const panel = createPanel();
    const tab = createTab({ parent: panel });
    panel.tabs = [tab];
    seedDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), panel)).toBeUndefined();
  });

  it("accepts a tab dragged onto its own panel's bar when it is not the last tab (moves it to the end)", () => {
    const panel = createPanel();
    const tab = createTab({ parent: panel });
    const last = createTab({ id: 'tab-2', parent: panel });
    panel.tabs = [tab, last];
    seedDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), panel)).toBe(tab);
  });

  it("rejects a tab from a tabLocked source group, mirroring DockPanel's own tabs-square gate", () => {
    const tab = createTab();
    seedDragState({ tab }, DOCK_ID);
    const context = createContext({ getGroup: () => ({ tabLocked: true }) });

    expect(resolveTabBarDropZoneSource(context, createPanel())).toBeUndefined();
  });

  it('accepts a whole panel (e.g. a re-docked float) dragged from the same group', () => {
    const panel = createPanel({ id: 'source-panel' });
    seedDragState({ panel }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), createPanel({ id: 'target-panel' }))).toBe(
      panel,
    );
  });

  it('rejects a whole-panel drag from a different group', () => {
    const panel = createPanel({ id: 'source-panel', group: 'group-b' });
    seedDragState({ panel }, DOCK_ID);

    expect(
      resolveTabBarDropZoneSource(createContext(), createPanel({ id: 'target-panel' })),
    ).toBeUndefined();
  });

  it('rejects a panelLocked whole-panel drag', () => {
    const panel = createPanel({ id: 'source-panel', panelLock: {} });
    seedDragState({ panel }, DOCK_ID);

    expect(
      resolveTabBarDropZoneSource(createContext(), createPanel({ id: 'target-panel' })),
    ).toBeUndefined();
  });

  it('rejects a whole-panel drag over its own bar (would otherwise duplicate the panel — rc-dock issue ticlo/rc-dock#226)', () => {
    const panel = createPanel();
    seedDragState({ panel }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), panel)).toBeUndefined();
  });

  it('rejects when the drag carries neither a tab nor a panel for this dock', () => {
    seedDragState({ tab: createTab() }, 'a-different-dock-id');

    expect(resolveTabBarDropZoneSource(createContext(), createPanel())).toBeUndefined();
  });
});
