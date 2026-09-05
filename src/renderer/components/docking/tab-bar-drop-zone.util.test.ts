import { beforeEach, describe, expect, it } from 'vitest';
import { resolveTabBarDropZoneSource } from './tab-bar-drop-zone.util';
import {
  createContext,
  createDragState,
  createPanel,
  createTab,
  DOCK_ID,
} from './tab-bar-drop-zone-test.util';

describe('resolveTabBarDropZoneSource', () => {
  beforeEach(() => {
    // Clear rc-dock's shared drag-data store so tests can't see a previous test's seeded drag.
    createDragState(undefined, undefined);
  });

  it('accepts a tab dragged from a panel in the same group', () => {
    const tab = createTab();
    createDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), createPanel())).toBe(tab);
  });

  it('rejects a tab dragged from a different group', () => {
    const tab = createTab({ group: 'group-b' });
    createDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), createPanel())).toBeUndefined();
  });

  it("rejects a tab dragged onto its own panel's bar when it is already that panel's last tab", () => {
    const panel = createPanel();
    const first = createTab({ id: 'tab-0', parent: panel });
    const tab = createTab({ parent: panel });
    panel.tabs = [first, tab];
    createDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), panel)).toBeUndefined();
  });

  it("rejects a tab dragged onto its own panel's bar when it is that panel's only tab", () => {
    const panel = createPanel();
    const tab = createTab({ parent: panel });
    panel.tabs = [tab];
    createDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), panel)).toBeUndefined();
  });

  it("accepts a tab dragged onto its own panel's bar when it is not the last tab (moves it to the end)", () => {
    const panel = createPanel();
    const tab = createTab({ parent: panel });
    const last = createTab({ id: 'tab-2', parent: panel });
    panel.tabs = [tab, last];
    createDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), panel)).toBe(tab);
  });

  it("rejects a tab from a tabLocked source group, mirroring DockPanel's own tabs-square gate", () => {
    const tab = createTab();
    createDragState({ tab }, DOCK_ID);
    const context = createContext({ getGroup: () => ({ tabLocked: true }) });

    expect(resolveTabBarDropZoneSource(context, createPanel())).toBeUndefined();
  });

  it('accepts a whole panel (e.g. a re-docked float) dragged from the same group', () => {
    const panel = createPanel({ id: 'source-panel' });
    createDragState({ panel }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), createPanel({ id: 'target-panel' }))).toBe(
      panel,
    );
  });

  it('rejects a whole-panel drag from a different group', () => {
    const panel = createPanel({ id: 'source-panel', group: 'group-b' });
    createDragState({ panel }, DOCK_ID);

    expect(
      resolveTabBarDropZoneSource(createContext(), createPanel({ id: 'target-panel' })),
    ).toBeUndefined();
  });

  it('rejects a panelLocked whole-panel drag', () => {
    const panel = createPanel({ id: 'source-panel', panelLock: {} });
    createDragState({ panel }, DOCK_ID);

    expect(
      resolveTabBarDropZoneSource(createContext(), createPanel({ id: 'target-panel' })),
    ).toBeUndefined();
  });

  it('rejects a whole-panel drag over its own bar (would otherwise duplicate the panel — rc-dock issue ticlo/rc-dock#226)', () => {
    const panel = createPanel();
    createDragState({ panel }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createContext(), panel)).toBeUndefined();
  });

  it('rejects when the drag carries neither a tab nor a panel for this dock', () => {
    createDragState({ tab: createTab() }, 'a-different-dock-id');

    expect(resolveTabBarDropZoneSource(createContext(), createPanel())).toBeUndefined();
  });
});
