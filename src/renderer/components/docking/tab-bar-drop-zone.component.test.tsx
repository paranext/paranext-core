import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DockContext, DragState, PanelData } from 'rc-dock';
import {
  TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE,
  TabBarDropZone,
} from './tab-bar-drop-zone.component';
import {
  createContext,
  createDragState,
  createPanel,
  createTab,
  DOCK_ID,
} from './tab-bar-drop-zone-test.util';

interface MockDragDropDivProps {
  getRef?: React.Ref<HTMLDivElement>;
  onDragOverT?: (state: DragState) => void;
  onDragLeaveT?: (state: DragState) => void;
  onDropT?: (state: DragState) => unknown;
  children?: React.ReactNode;
}

// Captures the props `TabBarDropZone` passes to `DragDropDiv`, so tests can invoke its
// onDragOverT/onDragLeaveT/onDropT handlers directly instead of simulating real mouse events
// through rc-dock's DragManager. Declared before `vi.mock` (matching the pattern in
// dock-layout-wrapper.component.test.tsx) since the mock factory only reads it later, when
// `DragDropDiv` actually renders. Typed so `.mock.calls` below comes back as
// `MockDragDropDivProps` without a cast.
const mockDragDropDivProps = vi.fn<(props: MockDragDropDivProps) => void>();

// `addDragStateListener`/`removeDragStateListener` are plain module-level functions (not part of
// `DragDropDiv`), so they're mocked separately here to capture the callback `TabBarDropZone`
// registers, letting tests drive drag start/end directly instead of going through rc-dock's real
// `DragManager` (which only fires them from real `createDraggingElement`/`destroyDraggingElement`
// calls, themselves reachable only via simulated mouse events).
const addDragStateListenerMock = vi.fn<(callback: (scope: unknown) => void) => void>();
const removeDragStateListenerMock = vi.fn<(callback: (scope: unknown) => void) => void>();

// Only `DragDropDiv` and the drag-state listener functions are replaced — `DragState` and
// everything else stay the real rc-dock implementation, so seeding drag data via
// `DragState.setData` and reading it back inside the component under test exercises the real
// mechanism.
vi.mock('rc-dock', async () => {
  const actual = await vi.importActual<object>('rc-dock');
  return {
    ...actual,
    addDragStateListener: (callback: (scope: unknown) => void) =>
      addDragStateListenerMock(callback),
    removeDragStateListener: (callback: (scope: unknown) => void) =>
      removeDragStateListenerMock(callback),
    DragDropDiv: ({
      getRef,
      onDragOverT,
      onDragLeaveT,
      onDropT,
      children,
    }: MockDragDropDivProps) => {
      mockDragDropDivProps({ getRef, onDragOverT, onDragLeaveT, onDropT, children });
      return (
        <div ref={getRef} data-testid="drop-zone">
          {children}
        </div>
      );
    },
  };
});

/** The `onDragOverT`/`onDragLeaveT`/`onDropT` handlers `TabBarDropZone` passed to `DragDropDiv`. */
function getCapturedHandlers(): MockDragDropDivProps {
  const lastCall = mockDragDropDivProps.mock.calls.at(-1);
  if (!lastCall) throw new Error('DragDropDiv was not rendered');
  const [props] = lastCall;
  return props;
}

/** The callback `TabBarDropZone` most recently passed to `addDragStateListener`. */
function getCapturedDragStateListener(): (scope: unknown) => void {
  const lastCall = addDragStateListenerMock.mock.calls.at(-1);
  if (!lastCall) throw new Error('addDragStateListener was not called');
  const [callback] = lastCall;
  return callback;
}

/** The inner indicator element `TabBarDropZone` renders inside the zone, per `setDropRect`. */
function getIndicatorElement(zoneElement: HTMLElement): HTMLElement {
  const indicator = zoneElement.querySelector<HTMLElement>('.platform-tab-bar-drop-zone-indicator');
  if (!indicator) throw new Error('Indicator element was not rendered');
  return indicator;
}

/** Stubs `getBoundingClientRect` on `element` for tests, since jsdom performs no layout. */
function stubRect(element: Element, rect: { left: number; right: number; width: number }): void {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    left: rect.left,
    right: rect.right,
    width: rect.width,
    top: 0,
    bottom: 0,
    height: 0,
    x: rect.left,
    y: 0,
    toJSON: () => ({}),
  });
}

/**
 * Gives the zone's inner indicator a non-zero width, as the browser lays it out whenever the zone
 * has room to show it. jsdom reports every rect as zero-sized, which the zone treats as "no visible
 * indicator" and rejects.
 */
function stubVisibleIndicator(zoneElement: HTMLElement): HTMLElement {
  const indicatorElement = getIndicatorElement(zoneElement);
  stubRect(indicatorElement, { left: 600, right: 608, width: 8 });
  return indicatorElement;
}

/**
 * Renders `TabBarDropZone` inside a minimal fixture matching the real rc-tabs tab-bar DOM shape —
 * `.dock-nav > .dock-nav-wrap > .dock-nav-list` (two `.dock-tab`s) plus `.dock-extra-content` —
 * that the component's `closest('.dock-nav')` last-tab lookup depends on. Returns the two tabs (in
 * DOM order, so `tabs[1]` is the last tab) and the zone element; callers stub
 * `getBoundingClientRect` on whichever of these their scenario needs before driving a drag. May be
 * called more than once per test to render several bars side by side.
 */
function renderTabBarFixture(
  panel: PanelData,
  context: DockContext,
): { tabs: [HTMLElement, HTMLElement]; zoneElement: HTMLElement } {
  const { container } = render(
    <div className="dock-nav">
      <div className="dock-nav-wrap">
        <div className="dock-nav-list">
          <div className="dock-tab" />
          <div className="dock-tab" />
        </div>
      </div>
      <div className="dock-extra-content">
        <TabBarDropZone panelData={panel} context={context} />
      </div>
    </div>,
  );
  const zoneElement = within(container).getByTestId('drop-zone');
  const dockNav = zoneElement.closest('.dock-nav');
  if (!dockNav) throw new Error('Fixture .dock-nav ancestor was not rendered');
  const [tab0, tab1] = Array.from(
    dockNav.querySelectorAll<HTMLElement>('.dock-nav-list .dock-tab'),
  );
  return { tabs: [tab0, tab1], zoneElement };
}

describe('TabBarDropZone', () => {
  beforeEach(() => {
    mockDragDropDivProps.mockClear();
    addDragStateListenerMock.mockClear();
    removeDragStateListenerMock.mockClear();
    // Clear rc-dock's shared drag-data store between tests.
    createDragState(undefined, undefined);
  });

  it('accepts a same-group tab drag and shows the indicator on the inner indicator element', () => {
    const panel = createPanel();
    const context = createContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    const indicatorElement = stubVisibleIndicator(screen.getByTestId('drop-zone'));
    const { onDragOverT } = getCapturedHandlers();

    const tab = createTab();
    const state = createDragState({ tab }, DOCK_ID);
    const acceptSpy = vi.spyOn(state, 'accept');
    const rejectSpy = vi.spyOn(state, 'reject');

    onDragOverT?.(state);

    expect(acceptSpy).toHaveBeenCalled();
    expect(rejectSpy).not.toHaveBeenCalled();
    // The indicator element, not the zone: see `onDragOver` in the component.
    expect(context.setDropRect).toHaveBeenCalledWith(indicatorElement, 'middle', expect.anything());
  });

  it('rejects a same-group tab drag while the indicator has no width, without showing it', () => {
    const panel = createPanel();
    const context = createContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    stubRect(getIndicatorElement(screen.getByTestId('drop-zone')), {
      left: 600,
      right: 600,
      width: 0,
    });
    const { onDragOverT } = getCapturedHandlers();

    const state = createDragState({ tab: createTab() }, DOCK_ID);
    const acceptSpy = vi.spyOn(state, 'accept');
    const rejectSpy = vi.spyOn(state, 'reject');

    onDragOverT?.(state);

    expect(rejectSpy).toHaveBeenCalled();
    expect(acceptSpy).not.toHaveBeenCalled();
    // `.dock-drop-indicator`'s ring shadow would still paint around a zero-width rect.
    expect(context.setDropRect).not.toHaveBeenCalled();
  });

  it('rejects a different-group tab drag and does not show the indicator', () => {
    const panel = createPanel();
    const context = createContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    const { onDragOverT } = getCapturedHandlers();

    const tab = createTab({ group: 'group-b' });
    const state = createDragState({ tab }, DOCK_ID);
    const acceptSpy = vi.spyOn(state, 'accept');
    const rejectSpy = vi.spyOn(state, 'reject');

    onDragOverT?.(state);

    expect(rejectSpy).toHaveBeenCalled();
    expect(acceptSpy).not.toHaveBeenCalled();
    expect(context.setDropRect).not.toHaveBeenCalled();
  });

  it('clears the indicator on leave, using the same source token the accept call used', () => {
    const panel = createPanel();
    const context = createContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    stubVisibleIndicator(screen.getByTestId('drop-zone'));
    const { onDragOverT, onDragLeaveT } = getCapturedHandlers();

    const tab = createTab();
    const state = createDragState({ tab }, DOCK_ID);
    onDragOverT?.(state);
    const claimedSource = vi.mocked(context.setDropRect).mock.calls[0][2];

    onDragLeaveT?.(state);

    // Asserting the literal `null` the component passes, matching rc-dock's own
    // `setDropRect(null, 'remove', ...)` clearing contract.
    // eslint-disable-next-line no-null/no-null
    expect(context.setDropRect).toHaveBeenLastCalledWith(null, 'remove', claimedSource);
  });

  it('clears the indicator on unmount, using the same source token the accept call used', () => {
    const panel = createPanel();
    const context = createContext();
    const { unmount } = render(<TabBarDropZone panelData={panel} context={context} />);
    stubVisibleIndicator(screen.getByTestId('drop-zone'));
    const { onDragOverT } = getCapturedHandlers();

    const tab = createTab();
    const state = createDragState({ tab }, DOCK_ID);
    onDragOverT?.(state);
    const claimedSource = vi.mocked(context.setDropRect).mock.calls[0][2];

    unmount();

    // Asserting the literal `null` the component passes, matching rc-dock's own
    // `setDropRect(null, 'remove', ...)` clearing contract.
    // eslint-disable-next-line no-null/no-null
    expect(context.setDropRect).toHaveBeenLastCalledWith(null, 'remove', claimedSource);
  });

  it('calls dockMove(tab, panelData, "middle") on drop for a tab source', () => {
    const panel = createPanel();
    const context = createContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    const { onDropT } = getCapturedHandlers();

    const tab = createTab();
    const state = createDragState({ tab }, DOCK_ID);

    onDropT?.(state);

    expect(context.dockMove).toHaveBeenCalledWith(tab, panel, 'middle');
  });

  it('does nothing on drop when the drag no longer resolves to a valid source', () => {
    const panel = createPanel();
    const context = createContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    const { onDropT } = getCapturedHandlers();

    const state = createDragState(undefined, DOCK_ID);

    onDropT?.(state);

    expect(context.dockMove).not.toHaveBeenCalled();
  });

  it(
    'accepts a whole-panel drag from another panel in the same group (the shape a re-docked ' +
      "single-tab float uses — DockTabs.ts starts a float panel's drag as `panel` data, not " +
      '`tab`) and shows the indicator',
    () => {
      const targetPanel = createPanel({ id: 'target-panel' });
      const context = createContext();
      render(<TabBarDropZone panelData={targetPanel} context={context} />);
      const indicatorElement = stubVisibleIndicator(screen.getByTestId('drop-zone'));
      const { onDragOverT, onDropT } = getCapturedHandlers();

      const floatPanel = createPanel({ id: 'float-panel' });
      const state = createDragState({ panel: floatPanel }, DOCK_ID);
      const acceptSpy = vi.spyOn(state, 'accept');

      onDragOverT?.(state);
      expect(acceptSpy).toHaveBeenCalled();
      expect(context.setDropRect).toHaveBeenCalledWith(
        indicatorElement,
        'middle',
        expect.anything(),
      );

      onDropT?.(state);
      expect(context.dockMove).toHaveBeenCalledWith(floatPanel, targetPanel, 'middle');
    },
  );

  it('rejects a whole-panel drag over its own bar (would otherwise duplicate the panel — rc-dock issue ticlo/rc-dock#226)', () => {
    const panel = createPanel();
    const context = createContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    const { onDragOverT } = getCapturedHandlers();

    const state = createDragState({ panel }, DOCK_ID);
    const rejectSpy = vi.spyOn(state, 'reject');

    onDragOverT?.(state);

    expect(rejectSpy).toHaveBeenCalled();
    expect(context.setDropRect).not.toHaveBeenCalled();
  });

  it('rejects a panelLocked whole-panel drag', () => {
    const targetPanel = createPanel({ id: 'target-panel' });
    const context = createContext();
    render(<TabBarDropZone panelData={targetPanel} context={context} />);
    const { onDragOverT } = getCapturedHandlers();

    const lockedPanel = createPanel({ id: 'locked-panel', panelLock: {} });
    const state = createDragState({ panel: lockedPanel }, DOCK_ID);
    const rejectSpy = vi.spyOn(state, 'reject');

    onDragOverT?.(state);

    expect(rejectSpy).toHaveBeenCalled();
    expect(context.setDropRect).not.toHaveBeenCalled();
  });

  it("rejects a panel's own last tab dragged over its empty area: no indicator, no move on drop", () => {
    const panel = createPanel();
    const tab = createTab({ parent: panel });
    panel.tabs = [tab];
    const context = createContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    const { onDragOverT, onDropT } = getCapturedHandlers();

    const state = createDragState({ tab }, DOCK_ID);
    const rejectSpy = vi.spyOn(state, 'reject');

    onDragOverT?.(state);
    expect(rejectSpy).toHaveBeenCalled();
    expect(context.setDropRect).not.toHaveBeenCalled();

    onDropT?.(state);
    expect(context.dockMove).not.toHaveBeenCalled();
  });
});

describe('TabBarDropZone drag-state marking (last-tab overlap)', () => {
  beforeEach(() => {
    mockDragDropDivProps.mockClear();
    addDragStateListenerMock.mockClear();
    removeDragStateListenerMock.mockClear();
    // Clear rc-dock's shared drag-data store between tests.
    createDragState(undefined, undefined);
  });

  /**
   * Renders one tab bar whose last tab spans x:[500, 600] (midpoint 550) and whose zone starts at
   * `zoneStart`, then drives a drag start carrying `dragData` through the captured listener.
   */
  function startDragOverLtrBar(
    zoneStart: number,
    dragData: Record<string, unknown> = { tab: createTab() },
  ): HTMLElement {
    const { tabs, zoneElement } = renderTabBarFixture(createPanel(), createContext());
    stubRect(tabs[1], { left: 500, right: 600, width: 100 });
    stubRect(zoneElement, { left: zoneStart, right: 900, width: 900 - zoneStart });
    const onDragStateChange = getCapturedDragStateListener();
    createDragState(dragData, DOCK_ID);
    onDragStateChange(DOCK_ID);
    return zoneElement;
  }

  it('marks the zone, covering back to the last tab’s midpoint and leading the indicator to its trailing edge (LTR)', () => {
    // The zone starts 8px past the tab's trailing edge (the flex gap) and 58px past its midpoint.
    const zoneElement = startDragOverLtrBar(608);

    expect(zoneElement).toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('58px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('8px');
  });

  it('marks the zone for a whole-panel drag too', () => {
    const zoneElement = startDragOverLtrBar(608, { panel: createPanel({ id: 'other' }) });

    expect(zoneElement).toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('58px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('8px');
  });

  it('does not lead the indicator backward when the zone already starts over the last tab', () => {
    // A crowded bar clips the last tab under the zone: the zone starts 10px before its trailing edge.
    const zoneElement = startDragOverLtrBar(590);

    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('40px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('0px');
  });

  it('covers nothing when the zone already starts before the last tab’s midpoint', () => {
    const zoneElement = startDragOverLtrBar(540);

    expect(zoneElement).toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('0px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('0px');
  });

  it('measures from the zone’s right edge when the fixture is right-to-left', () => {
    const panel = createPanel();
    const context = createContext();
    const { tabs, zoneElement } = renderTabBarFixture(panel, context);
    zoneElement.style.direction = 'rtl';
    // Last tab spans x:[400, 500] (midpoint 450); the zone's right edge (its logical start in RTL)
    // is at x:392 — 8px before the tab's left edge and 58px before its midpoint.
    stubRect(tabs[1], { left: 400, right: 500, width: 100 });
    stubRect(zoneElement, { left: 200, right: 392, width: 192 });
    const onDragStateChange = getCapturedDragStateListener();
    createDragState({ tab: createTab() }, DOCK_ID);

    onDragStateChange(DOCK_ID);

    expect(zoneElement).toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('58px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('8px');
  });

  it('measures each zone against its own tab bar', () => {
    const first = renderTabBarFixture(createPanel({ id: 'panel-1' }), createContext());
    stubRect(first.tabs[1], { left: 500, right: 600, width: 100 });
    stubRect(first.zoneElement, { left: 608, right: 900, width: 292 });
    const second = renderTabBarFixture(createPanel({ id: 'panel-2' }), createContext());
    stubRect(second.tabs[1], { left: 1000, right: 1040, width: 40 });
    stubRect(second.zoneElement, { left: 1044, right: 1400, width: 356 });
    createDragState({ tab: createTab() }, DOCK_ID);

    addDragStateListenerMock.mock.calls.forEach(([listener]) => listener(DOCK_ID));

    expect(first.zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('58px');
    expect(first.zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe(
      '8px',
    );
    expect(second.zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('24px');
    expect(second.zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe(
      '4px',
    );
  });

  it('does not mark the zone when the drag carries neither tab nor panel data for this dock (e.g. a divider resize)', () => {
    const panel = createPanel();
    const context = createContext();
    const { tabs, zoneElement } = renderTabBarFixture(panel, context);
    stubRect(tabs[1], { left: 500, right: 600, width: 100 });
    stubRect(zoneElement, { left: 650, right: 900, width: 250 });
    const onDragStateChange = getCapturedDragStateListener();
    // No tab/panel seeded for DOCK_ID — matches a divider drag, which carries neither.

    onDragStateChange(DOCK_ID);

    expect(zoneElement).not.toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('');
  });

  it('does nothing when the tab bar has no tabs', () => {
    const panel = createPanel();
    const context = createContext();
    render(
      <div className="dock-nav">
        <div className="dock-nav-wrap">
          <div className="dock-nav-list" />
        </div>
        <div className="dock-extra-content">
          <TabBarDropZone panelData={panel} context={context} />
        </div>
      </div>,
    );
    const zoneElement = screen.getByTestId('drop-zone');
    stubRect(zoneElement, { left: 650, right: 900, width: 250 });
    const onDragStateChange = getCapturedDragStateListener();
    createDragState({ tab: createTab() }, DOCK_ID);

    onDragStateChange(DOCK_ID);

    expect(zoneElement).not.toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('');
  });

  it('clears the marker and custom properties when the drag ends', () => {
    const panel = createPanel();
    const context = createContext();
    const { tabs, zoneElement } = renderTabBarFixture(panel, context);
    stubRect(tabs[1], { left: 500, right: 600, width: 100 });
    stubRect(zoneElement, { left: 650, right: 900, width: 250 });
    const onDragStateChange = getCapturedDragStateListener();
    createDragState({ tab: createTab() }, DOCK_ID);
    onDragStateChange(DOCK_ID);
    expect(zoneElement).toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);

    // rc-dock's own `destroyDraggingElement` (DragManager.ts) calls every listener with `null` at
    // drag end.
    // eslint-disable-next-line no-null/no-null -- matches rc-dock's own drag-end call
    onDragStateChange(null);

    expect(zoneElement).not.toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('');
  });

  it('removes the drag-state listener on unmount, using the same callback that was added', () => {
    const panel = createPanel();
    const context = createContext();
    const { unmount } = render(<TabBarDropZone panelData={panel} context={context} />);
    const listener = getCapturedDragStateListener();

    unmount();

    expect(removeDragStateListenerMock).toHaveBeenCalledWith(listener);
  });
});
