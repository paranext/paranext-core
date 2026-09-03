import React, { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DockContext, DragState, PanelData, TabData, TabGroup } from 'rc-dock';
import { TabBarDropZone } from './tab-bar-drop-zone.component';

const DOCK_ID = 'test-dock';
const GROUP = 'group-a';

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

function createPanel(overrides: Partial<PanelData> = {}): PanelData {
  return { id: 'panel-1', tabs: [], group: GROUP, ...overrides };
}

function createTab(overrides: Partial<TabData> = {}): TabData {
  return { id: 'tab-1', title: 'Tab', content: createElement('div'), group: GROUP, ...overrides };
}

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

/** A real `DragState`, seeded via the same `setData` mechanism rc-dock's own drag starters use. */
function createDragState(
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
 * Renders `TabBarDropZone` inside a minimal fixture matching the real rc-tabs tab-bar DOM shape —
 * `.dock-nav > .dock-nav-wrap > .dock-nav-list` (two `.dock-tab`s) plus `.dock-extra-content` —
 * that the component's `closest('.dock-nav')` last-tab lookup depends on. Returns the two tabs (in
 * DOM order, so `tabs[1]` is the last tab) and the zone element; callers stub
 * `getBoundingClientRect` on whichever of these their scenario needs before driving a drag.
 */
function renderTabBarFixture(
  panel: PanelData,
  context: DockContext,
): { tabs: [HTMLElement, HTMLElement]; zoneElement: HTMLElement } {
  render(
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
  const zoneElement = screen.getByTestId('drop-zone');
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
    const zoneElement = screen.getByTestId('drop-zone');
    const indicatorElement = getIndicatorElement(zoneElement);
    const { onDragOverT } = getCapturedHandlers();

    const tab = createTab();
    const state = createDragState({ tab }, DOCK_ID);
    const acceptSpy = vi.spyOn(state, 'accept');
    const rejectSpy = vi.spyOn(state, 'reject');

    onDragOverT?.(state);

    expect(acceptSpy).toHaveBeenCalled();
    expect(rejectSpy).not.toHaveBeenCalled();
    // `DockContext.setDropRect` reads its target's own `getBoundingClientRect()` to position the
    // global drop-indicator overlay; passing the zone itself here would show that overlay spanning
    // the zone's wider, tab-covering box during a drag rather than just the last-tab-to-"+" strip.
    expect(context.setDropRect).toHaveBeenCalledWith(indicatorElement, 'middle', expect.anything());
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
      const zoneElement = screen.getByTestId('drop-zone');
      const indicatorElement = getIndicatorElement(zoneElement);
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

  it('marks the zone and sets the overlap/indicator-inset custom properties from the last tab (LTR)', () => {
    const panel = createPanel();
    const context = createContext();
    const { tabs, zoneElement } = renderTabBarFixture(panel, context);
    // Last tab spans x:[500, 600] (width 100, midpoint 550); the zone starts at x:650 — 100px past
    // the tab's midpoint.
    stubRect(tabs[1], { left: 500, right: 600, width: 100 });
    stubRect(zoneElement, { left: 650, right: 900, width: 250 });
    const onDragStateChange = getCapturedDragStateListener();
    createDragState({ tab: createTab() }, DOCK_ID);

    onDragStateChange(DOCK_ID);

    expect(zoneElement).toHaveAttribute('data-dragging');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('100px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-inset')).toBe('50px');
  });

  it('computes the overlap from the zone’s right edge when the fixture is right-to-left', () => {
    const panel = createPanel();
    const context = createContext();
    const { tabs, zoneElement } = renderTabBarFixture(panel, context);
    zoneElement.style.direction = 'rtl';
    // Last tab spans x:[400, 500] (width 100, midpoint 450); the zone ends (its right edge, its
    // logical start in RTL) at x:350 — 100px before the tab's midpoint.
    stubRect(tabs[1], { left: 400, right: 500, width: 100 });
    stubRect(zoneElement, { left: 200, right: 350, width: 150 });
    const onDragStateChange = getCapturedDragStateListener();
    createDragState({ tab: createTab() }, DOCK_ID);

    onDragStateChange(DOCK_ID);

    expect(zoneElement).toHaveAttribute('data-dragging');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('100px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-inset')).toBe('50px');
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

    expect(zoneElement).not.toHaveAttribute('data-dragging');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-inset')).toBe('');
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

    expect(zoneElement).not.toHaveAttribute('data-dragging');
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
    expect(zoneElement).toHaveAttribute('data-dragging');

    // rc-dock's own `destroyDraggingElement` (DragManager.ts) calls every listener with `null` at
    // drag end.
    // eslint-disable-next-line no-null/no-null -- matches rc-dock's own drag-end call
    onDragStateChange(null);

    expect(zoneElement).not.toHaveAttribute('data-dragging');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-inset')).toBe('');
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
