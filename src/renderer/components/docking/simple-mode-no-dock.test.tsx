import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BoxData, DockContextType, PanelData, TabGroup } from 'rc-dock';
// Not re-exported from rc-dock's index, so it has to be imported from its own module
import { DockDropLayer } from 'rc-dock/lib/DockDropLayer';
import {
  getGroups,
  HEADLESS_GROUP,
  TAB_GROUP,
  TAB_GROUP_RESOURCES,
} from './platform-dock-layout-positioning.util';
import {
  createDockContext,
  createDragState,
  createPanel,
  createTab,
  resetDragStateStore,
} from './__tests__/rc-dock.test-utils';

vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));

/** Two panels side by side in a horizontal dock box, so rc-dock also offers its "full" squares. */
function createDockedPanels(group: string): { target: PanelData; sibling: PanelData } {
  const dockbox: BoxData = { id: 'dockbox', mode: 'horizontal', size: 1, children: [] };
  const target = createPanel({ id: 'target', group, parent: dockbox });
  const sibling = createPanel({ id: 'sibling', group, parent: dockbox });
  dockbox.children.push(target, sibling);
  return { target, sibling };
}

/** A panel in rc-dock's float box, the way a floating dialog or web view sits in the layout. */
function createFloatPanel(group: string): PanelData {
  const floatbox: BoxData = { id: 'floatbox', mode: 'float', size: 1, children: [] };
  const panel = createPanel({ id: 'float', group, parent: floatbox, x: 0, y: 0, w: 300, h: 200 });
  panel.tabs = [createTab({ id: 'float-tab', group, parent: panel })];
  floatbox.children.push(panel);
  return panel;
}

/** Renders the drop layer rc-dock shows over `target` while `dropFromPanel` is dragged onto it. */
function renderDropLayer(
  groups: { [key: string]: TabGroup },
  target: PanelData,
  dropFromPanel: PanelData,
): HTMLElement {
  const context = createDockContext({
    getGroup: (name) => {
      // rc-dock falls back to a floatable default group for an unknown name, so a missing group
      // here would quietly test a config the app never uses
      if (!name || !(name in groups)) throw new Error(`group '${name}' is not registered`);
      return groups[name];
    },
  });
  const { container } = render(
    <DockContextType.Provider value={context}>
      <DockDropLayer
        panelData={target}
        panelElement={document.createElement('div')}
        dropFromPanel={dropFromPanel}
      />
    </DockContextType.Provider>,
  );
  return container;
}

function dropSquaresIn(container: HTMLElement): Element[] {
  return Array.from(container.querySelectorAll('.dock-drop-square'));
}

afterEach(() => {
  resetDragStateStore();
});

// What rc-dock offers while something is dragged over a docked panel, rendered by rc-dock's own
// `DockDropLayer` against this app's real group config. This covers only the drop squares drawn
// over a panel's content. Drops onto a tab header are blocked by a Simple-mode stylesheet rule that
// stops tab bars being hit-tested during a drag; jsdom does no hit-testing, so that half is covered
// by `e2e-tests/tests/isolated/docking/simple-mode-no-dock.spec.ts`.
describe('dragging over a docked panel', () => {
  it('Power mode offers drop squares for a dragged float (control)', () => {
    const { target } = createDockedPanels(TAB_GROUP);
    const float = createFloatPanel(TAB_GROUP);
    createDragState({ panel: float, tabGroup: float.group });

    const container = renderDropLayer(getGroups(true), target, float);

    expect(dropSquaresIn(container).length).toBeGreaterThan(0);
  });

  it.each([TAB_GROUP, HEADLESS_GROUP, TAB_GROUP_RESOURCES])(
    'Simple mode offers no drop square for a dragged float in group %s',
    (group) => {
      const { target } = createDockedPanels(TAB_GROUP_RESOURCES);
      const float = createFloatPanel(group);
      createDragState({ panel: float, tabGroup: float.group });

      const container = renderDropLayer(getGroups(false), target, float);

      expect(dropSquaresIn(container)).toEqual([]);
    },
  );

  it('Simple mode offers no drop square, floating included, for a dragged docked column', () => {
    const { target, sibling: draggedColumn } = createDockedPanels(TAB_GROUP_RESOURCES);
    createDragState({ panel: draggedColumn, tabGroup: draggedColumn.group });

    const container = renderDropLayer(getGroups(false), target, draggedColumn);

    expect(dropSquaresIn(container)).toEqual([]);
  });
});
