import { beforeEach, describe, expect, it } from 'vitest';
import { resolveTabBarDropZoneSource } from './tab-bar-drop-zone.util';
import {
  createDockContext,
  createDragState,
  createPanel,
  createTab,
  DOCK_ID,
  OTHER_GROUP,
  resetDragStateStore,
} from './__tests__/tab-bar-drop-zone.test-utils';

describe('resolveTabBarDropZoneSource', () => {
  beforeEach(() => {
    resetDragStateStore();
  });

  it('accepts a tab dragged from a panel in the same group', () => {
    const tab = createTab();
    createDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createDockContext(), createPanel())).toBe(tab);
  });

  it('rejects a tab dragged from a different group', () => {
    const tab = createTab({ group: OTHER_GROUP });
    createDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createDockContext(), createPanel())).toBeUndefined();
  });

  it("rejects a tab dragged onto its own panel's bar when it is already that panel's last tab", () => {
    const panel = createPanel();
    const first = createTab({ id: 'tab-0', parent: panel });
    const tab = createTab({ parent: panel });
    panel.tabs = [first, tab];
    createDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createDockContext(), panel)).toBeUndefined();
  });

  it("rejects a tab dragged onto its own panel's bar when it is that panel's only tab", () => {
    const panel = createPanel();
    const tab = createTab({ parent: panel });
    panel.tabs = [tab];
    createDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createDockContext(), panel)).toBeUndefined();
  });

  it("accepts a tab dragged onto its own panel's bar when it is not the last tab (moves it to the end)", () => {
    const panel = createPanel();
    const tab = createTab({ parent: panel });
    const last = createTab({ id: 'tab-2', parent: panel });
    panel.tabs = [tab, last];
    createDragState({ tab }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createDockContext(), panel)).toBe(tab);
  });

  // Both sides lack a group here, so only the missing-group check itself can reject the drag.
  it('rejects a tab with no group, even over a panel with no group', () => {
    const tab = createTab({ group: undefined });
    createDragState({ tab }, DOCK_ID);

    expect(
      resolveTabBarDropZoneSource(createDockContext(), createPanel({ group: undefined })),
    ).toBeUndefined();
  });

  it('rejects a tab from a tabLocked group', () => {
    const tab = createTab();
    createDragState({ tab }, DOCK_ID);
    const context = createDockContext({ getGroup: () => ({ tabLocked: true }) });

    expect(resolveTabBarDropZoneSource(context, createPanel())).toBeUndefined();
  });

  it('accepts a whole panel (e.g. a re-docked float) dragged from the same group', () => {
    const panel = createPanel({ id: 'source-panel' });
    createDragState({ panel }, DOCK_ID);

    expect(
      resolveTabBarDropZoneSource(createDockContext(), createPanel({ id: 'target-panel' })),
    ).toBe(panel);
  });

  it('rejects a whole-panel drag from a different group', () => {
    const panel = createPanel({ id: 'source-panel', group: OTHER_GROUP });
    createDragState({ panel }, DOCK_ID);

    expect(
      resolveTabBarDropZoneSource(createDockContext(), createPanel({ id: 'target-panel' })),
    ).toBeUndefined();
  });

  // Both sides lack a group here, so only the missing-group check itself can reject the drag.
  it('rejects a whole-panel drag with no group, even over a panel with no group', () => {
    const panel = createPanel({ id: 'source-panel', group: undefined });
    createDragState({ panel }, DOCK_ID);

    expect(
      resolveTabBarDropZoneSource(
        createDockContext(),
        createPanel({ id: 'target-panel', group: undefined }),
      ),
    ).toBeUndefined();
  });

  it('rejects a panelLocked whole-panel drag', () => {
    const panel = createPanel({ id: 'source-panel', panelLock: {} });
    createDragState({ panel }, DOCK_ID);

    expect(
      resolveTabBarDropZoneSource(createDockContext(), createPanel({ id: 'target-panel' })),
    ).toBeUndefined();
  });

  // Accepting this would duplicate the panel — rc-dock issue ticlo/rc-dock#226.
  it('rejects a whole-panel drag over its own bar', () => {
    const panel = createPanel();
    createDragState({ panel }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createDockContext(), panel)).toBeUndefined();
  });

  // The self-drop guard compares ids, not object identity: rc-dock replaces `PanelData` objects on
  // layout changes (`Algorithm` clone/replacePanel), so `DragState` can still hold a stale copy of
  // the target panel captured at drag start.
  it('rejects a whole-panel drag whose data is a stale copy of the target panel', () => {
    const targetPanel = createPanel({ id: 'source-panel' });
    const staleCopy = { ...targetPanel };
    createDragState({ panel: staleCopy }, DOCK_ID);

    expect(resolveTabBarDropZoneSource(createDockContext(), targetPanel)).toBeUndefined();
  });

  it('rejects when the drag carries neither a tab nor a panel for this dock', () => {
    createDragState({ tab: createTab() }, 'a-different-dock-id');

    expect(resolveTabBarDropZoneSource(createDockContext(), createPanel())).toBeUndefined();
  });
});
