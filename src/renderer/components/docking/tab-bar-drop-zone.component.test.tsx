import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DockContext, DragState, DropDirection, PanelData } from 'rc-dock';
import {
  TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE,
  TabBarDropZone,
} from './tab-bar-drop-zone.component';
import {
  createDockContext,
  createDragState,
  createPanel,
  createTab,
  DOCK_ID,
  OTHER_GROUP,
  resetDragStateStore,
} from './__tests__/rc-dock.test-utils';

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

/**
 * The handlers for every `DragDropDiv` rendered so far, in render order — for a test that mounts
 * more than one zone and needs to drive each one's handlers independently (`getCapturedHandlers`
 * only ever returns the most recent).
 */
function getAllCapturedHandlers(): MockDragDropDivProps[] {
  return mockDragDropDivProps.mock.calls.map(([props]) => props);
}

/** Clears the mocked rc-dock hooks and drag-data store between tests. */
function resetTestDoubles(): void {
  mockDragDropDivProps.mockClear();
  addDragStateListenerMock.mockClear();
  removeDragStateListenerMock.mockClear();
  resetDragStateStore();
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
 * Gives the zone's inner indicator a width at least as wide as the legible minimum, as the browser
 * lays it out whenever the zone has room to show it (or `claimLastTabOverlap` has widened its lead
 * to reach that minimum). jsdom reports every rect as zero-sized, which the zone treats as "no
 * visible indicator" and rejects.
 */
function stubVisibleIndicator(zoneElement: HTMLElement): HTMLElement {
  const indicatorElement = getIndicatorElement(zoneElement);
  stubRect(indicatorElement, { left: 600, right: 640, width: 40 });
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
  beforeEach(resetTestDoubles);

  it('accepts a same-group tab drag and shows the indicator on the inner indicator element', () => {
    const panel = createPanel();
    const context = createDockContext();
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
    const context = createDockContext();
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
    // `.dock-drop-indicator`'s ring shadow would still paint around a zero-width rect. This is the
    // only case `claimLastTabOverlap` can produce (the clipped, no-room-at-all case): every claim it
    // makes keeps the indicator at or above `MIN_VISIBLE_INDICATOR_WIDTH`.
    expect(context.setDropRect).not.toHaveBeenCalled();
  });

  it('accepts a same-group tab drag once the indicator has any visible width', () => {
    const panel = createPanel();
    const context = createDockContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    // Exactly `MIN_VISIBLE_INDICATOR_WIDTH` (1px) -- pins the accept gate's own boundary,
    // independent of `MIN_DRAWN_INDICATOR_WIDTH` (30px, a target for how wide the indicator is
    // drawn, not a gate on whether a drop is accepted).
    const indicatorElement = getIndicatorElement(screen.getByTestId('drop-zone'));
    stubRect(indicatorElement, { left: 600, right: 601, width: 1 });
    const { onDragOverT } = getCapturedHandlers();

    const state = createDragState({ tab: createTab() }, DOCK_ID);
    const acceptSpy = vi.spyOn(state, 'accept');
    const rejectSpy = vi.spyOn(state, 'reject');

    onDragOverT?.(state);

    expect(acceptSpy).toHaveBeenCalled();
    expect(rejectSpy).not.toHaveBeenCalled();
    expect(context.setDropRect).toHaveBeenCalledWith(indicatorElement, 'middle', expect.anything());
  });

  it('accepts a same-group tab drag when the indicator is capped short of the legible target by a narrow last tab', () => {
    const panel = createPanel();
    const context = createDockContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    // Matches the geometry `claimLastTabOverlap` produces for a 10px-wide last tab with no gap (see
    // "caps the widened indicator lead at the overlap" below): a visible but sub-legible 5px
    // indicator, from a zone claiming a region it can only reach 5px back into. That claim must
    // still be accepted here, or the claimed region becomes a dead spot -- the invariant this gate
    // exists to preserve (see `claimLastTabOverlap`'s own TSDoc).
    const indicatorElement = getIndicatorElement(screen.getByTestId('drop-zone'));
    stubRect(indicatorElement, { left: 505, right: 510, width: 5 });
    const { onDragOverT } = getCapturedHandlers();

    const state = createDragState({ tab: createTab() }, DOCK_ID);
    const acceptSpy = vi.spyOn(state, 'accept');
    const rejectSpy = vi.spyOn(state, 'reject');

    onDragOverT?.(state);

    expect(acceptSpy).toHaveBeenCalled();
    expect(rejectSpy).not.toHaveBeenCalled();
    expect(context.setDropRect).toHaveBeenCalledWith(indicatorElement, 'middle', expect.anything());
  });

  it('rejects a different-group tab drag and does not show the indicator', () => {
    const panel = createPanel();
    const context = createDockContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    const { onDragOverT } = getCapturedHandlers();

    const tab = createTab({ group: OTHER_GROUP });
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
    const context = createDockContext();
    const { rerender } = render(<TabBarDropZone panelData={panel} context={context} />);
    stubVisibleIndicator(screen.getByTestId('drop-zone'));
    const { onDragOverT } = getCapturedHandlers();

    const tab = createTab();
    const state = createDragState({ tab }, DOCK_ID);
    onDragOverT?.(state);
    const claimedSource = vi.mocked(context.setDropRect).mock.calls[0][2];

    // Re-rendering between the claim and the leave is what tells a token that stays stable across
    // renders (a ref) apart from one rebuilt every render: only the latter would hand `onDragLeaveT`
    // a different object than the one `onDragOverT` claimed with. `toBe`, not `toHaveBeenCalledWith`,
    // is what makes that distinction visible: both tokens are content-less `{}`s, so a matcher's deep
    // equality would call them equal even when they are two different objects.
    rerender(<TabBarDropZone panelData={panel} context={context} />);
    const { onDragLeaveT } = getCapturedHandlers();

    onDragLeaveT?.(state);

    const lastCall = vi.mocked(context.setDropRect).mock.calls.at(-1);
    // Asserting the literal `null` the component passes, matching rc-dock's own
    // `setDropRect(null, 'remove', ...)` clearing contract.
    // eslint-disable-next-line no-null/no-null
    expect(lastCall?.[0]).toBeNull();
    expect(lastCall?.[1]).toBe('remove');
    expect(lastCall?.[2]).toBe(claimedSource);
  });

  it('clears the indicator on unmount, using the same source token the accept call used', () => {
    const panel = createPanel();
    const context = createDockContext();
    const { rerender, unmount } = render(<TabBarDropZone panelData={panel} context={context} />);
    stubVisibleIndicator(screen.getByTestId('drop-zone'));
    const { onDragOverT } = getCapturedHandlers();

    const tab = createTab();
    const state = createDragState({ tab }, DOCK_ID);
    onDragOverT?.(state);
    const claimedSource = vi.mocked(context.setDropRect).mock.calls[0][2];

    // See the sibling "on leave" test above for why the re-render matters and why the assertion
    // below uses `toBe` on the extracted argument rather than `toHaveBeenCalledWith`.
    rerender(<TabBarDropZone panelData={panel} context={context} />);

    unmount();

    const lastCall = vi.mocked(context.setDropRect).mock.calls.at(-1);
    // Asserting the literal `null` the component passes, matching rc-dock's own
    // `setDropRect(null, 'remove', ...)` clearing contract.
    // eslint-disable-next-line no-null/no-null
    expect(lastCall?.[0]).toBeNull();
    expect(lastCall?.[1]).toBe('remove');
    expect(lastCall?.[2]).toBe(claimedSource);
  });

  it("does not clear another zone's claim when this zone leaves with a distinct source token", () => {
    // A fake that mirrors rc-dock's own `setDropRect` semantics (`DockDropSquare`'s clear clause):
    // a `'remove'` only takes effect when its `source` matches whichever source most recently
    // claimed the indicator. A shared (rather than per-zone) source token would let one zone's leave
    // wrongly clear a different zone's still-active claim.
    let activeSource: unknown;
    const setDropRect = vi.fn(
      (_element: HTMLElement, direction: DropDirection | undefined, source: unknown) => {
        if (direction === 'remove') {
          if (source === activeSource) activeSource = undefined;
          return;
        }
        activeSource = source;
      },
    );
    const context = createDockContext({ setDropRect });
    const panelA = createPanel({ id: 'panel-a' });
    const panelB = createPanel({ id: 'panel-b' });
    render(
      <>
        <TabBarDropZone panelData={panelA} context={context} />
        <TabBarDropZone panelData={panelB} context={context} />
      </>,
    );
    const [zoneA, zoneB] = screen.getAllByTestId('drop-zone');
    stubVisibleIndicator(zoneA);
    stubVisibleIndicator(zoneB);
    const [handlersA, handlersB] = getAllCapturedHandlers();

    const stateA = createDragState({ tab: createTab() }, DOCK_ID);
    handlersA.onDragOverT?.(stateA);
    const stateB = createDragState({ tab: createTab() }, DOCK_ID);
    handlersB.onDragOverT?.(stateB);
    const activeAfterBClaimed = activeSource;

    handlersA.onDragLeaveT?.(stateA);

    expect(activeSource).toBe(activeAfterBClaimed);
  });

  it('calls dockMove(tab, panelData, "middle") on drop for a tab source', () => {
    const panel = createPanel();
    const context = createDockContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    const { onDropT } = getCapturedHandlers();

    const tab = createTab();
    const state = createDragState({ tab }, DOCK_ID);

    onDropT?.(state);

    expect(context.dockMove).toHaveBeenCalledWith(tab, panel, 'middle');
  });

  it('does nothing on drop when the drag no longer resolves to a valid source', () => {
    const panel = createPanel();
    const context = createDockContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    const { onDropT } = getCapturedHandlers();

    const state = createDragState(undefined, DOCK_ID);

    onDropT?.(state);

    expect(context.dockMove).not.toHaveBeenCalled();
  });

  // The common source of `panel` drag data is dragging an already-docked panel by its bar; a
  // re-docked single-tab float is the same shape, since `TabCache.onDragStart` starts a single-tab
  // float panel's drag as `panel` data too, not `tab` (rc-dock/src/DockTabs.tsx).
  it('accepts and docks a same-group whole-panel drag (e.g. a re-docked float)', () => {
    const targetPanel = createPanel({ id: 'target-panel' });
    const context = createDockContext();
    render(<TabBarDropZone panelData={targetPanel} context={context} />);
    const indicatorElement = stubVisibleIndicator(screen.getByTestId('drop-zone'));
    const { onDragOverT, onDropT } = getCapturedHandlers();

    const floatPanel = createPanel({ id: 'float-panel' });
    const state = createDragState({ panel: floatPanel }, DOCK_ID);
    const acceptSpy = vi.spyOn(state, 'accept');

    onDragOverT?.(state);
    expect(acceptSpy).toHaveBeenCalled();
    expect(context.setDropRect).toHaveBeenCalledWith(indicatorElement, 'middle', expect.anything());

    onDropT?.(state);
    expect(context.dockMove).toHaveBeenCalledWith(floatPanel, targetPanel, 'middle');
  });

  // Accepting this would duplicate the panel — rc-dock issue ticlo/rc-dock#226.
  it('rejects a whole-panel drag over its own bar', () => {
    const panel = createPanel();
    const context = createDockContext();
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
    const context = createDockContext();
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
    const context = createDockContext();
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
  beforeEach(resetTestDoubles);

  /**
   * Renders one tab bar whose last tab spans x:[500, 600] (midpoint 550) and whose zone spans
   * x:[zoneStart, zoneEnd], then drives a drag start carrying `dragData` through the captured
   * listener.
   */
  function startDragOverLtrBar({
    zoneStart,
    zoneEnd = 900,
    dragData = { tab: createTab() },
  }: {
    zoneStart: number;
    zoneEnd?: number;
    dragData?: Record<string, unknown>;
  }): HTMLElement {
    const { tabs, zoneElement } = renderTabBarFixture(createPanel(), createDockContext());
    stubRect(tabs[1], { left: 500, right: 600, width: 100 });
    stubRect(zoneElement, { left: zoneStart, right: zoneEnd, width: zoneEnd - zoneStart });
    const onDragStateChange = getCapturedDragStateListener();
    createDragState(dragData, DOCK_ID);
    onDragStateChange(DOCK_ID);
    return zoneElement;
  }

  it('marks the zone, covering back to the last tab’s midpoint and leading the indicator to its trailing edge (LTR)', () => {
    // The zone starts 8px past the tab's trailing edge (the flex gap) and 58px past its midpoint.
    const zoneElement = startDragOverLtrBar({ zoneStart: 608 });

    expect(zoneElement).toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('58px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('8px');
  });

  it('marks the zone for a whole-panel drag too', () => {
    const zoneElement = startDragOverLtrBar({
      zoneStart: 608,
      dragData: { panel: createPanel({ id: 'other' }) },
    });

    expect(zoneElement).toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('58px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('8px');
  });

  // rc-dock's hit-test walk goes up from the zone and never reaches the tab, so any part of the tab
  // the zone covers must be a part the zone accepts, or a drop there does nothing.
  it('covers nothing when the zone starts over the last tab (a crowded bar clips the tab under it)', () => {
    // The zone starts 10px before the tab's trailing edge, past its midpoint, with no width left.
    const zoneElement = startDragOverLtrBar({ zoneStart: 590, zoneEnd: 590 });

    expect(zoneElement).toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('0px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('0px');
  });

  it('covers nothing when the zone starts over the last tab, even with room of its own', () => {
    const zoneElement = startDragOverLtrBar({ zoneStart: 590 });

    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('0px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('0px');
  });

  it('claims the tab and widens the indicator when a zero-width zone starts exactly at the last tab’s trailing edge', () => {
    // No natural gap and no zone width, for a natural indicator width of 0 — the narrowest
    // possible case. `gapToTab` is exactly 0, not negative, so the zone still isn't clipped: it
    // claims the tab's trailing half and widens the indicator to the legible minimum instead of
    // rejecting. The fixture's 100px-wide tab puts the overlap (50px) well past the 30px minimum,
    // so the cap below doesn't reduce it — see the narrow-tab test for when it does.
    const zoneElement = startDragOverLtrBar({ zoneStart: 600, zoneEnd: 600 });

    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('50px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('30px');
  });

  it('widens the indicator lead past a zero-width zone’s natural gap to the legible minimum', () => {
    // Natural lead is the 8px gap, with zero zone width, for a natural indicator width of 8px —
    // short of the legible minimum, so the lead widens to reach it. The overlap (the invisible hit
    // area) is unaffected: it still reaches back to the tab's midpoint regardless of indicator width.
    const zoneElement = startDragOverLtrBar({ zoneStart: 608, zoneEnd: 608 });

    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('58px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('30px');
  });

  it('leaves the indicator lead unchanged once the natural indicator width already meets the legible minimum', () => {
    // gapToTab is 8px (zoneStart 608) and zone width is 22px, for a natural indicator width of
    // exactly 30px — already at the legible minimum, so no widening is needed.
    const zoneElement = startDragOverLtrBar({ zoneStart: 608, zoneEnd: 630 });

    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('8px');
  });

  it('widens the indicator lead by exactly the shortfall when the natural width falls one pixel short', () => {
    // gapToTab is 8px and zone width is 21px, for a natural indicator width of 29px — one pixel
    // under the legible minimum, so the lead widens by exactly that one pixel.
    const zoneElement = startDragOverLtrBar({ zoneStart: 608, zoneEnd: 629 });

    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('9px');
  });

  it('caps the widened indicator lead at the overlap, for a last tab narrower than the legible minimum', () => {
    // A 10px-wide tab (midpoint 5px in from its trailing edge) with no gap: the overlap — the
    // region that actually hit-tests to the zone — only reaches 5px back, since it stops at the
    // tab's midpoint. Widening the lead to the full 30px minimum would draw the indicator past that
    // region, over territory rc-dock's own tab handler still owns, so the lead is capped at the
    // overlap instead: the indicator stays inside the covered region even though it stays short of
    // the legible minimum.
    const { tabs, zoneElement } = renderTabBarFixture(createPanel(), createDockContext());
    stubRect(tabs[1], { left: 500, right: 510, width: 10 });
    stubRect(zoneElement, { left: 510, right: 510, width: 0 });
    const onDragStateChange = getCapturedDragStateListener();
    createDragState({ tab: createTab() }, DOCK_ID);

    onDragStateChange(DOCK_ID);

    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('5px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('5px');
  });

  it('refuses to claim the tab when even the capped indicator would have no visible width', () => {
    // A 1px-wide tab (midpoint 0.5px in from its trailing edge) with no gap: the overlap only
    // reaches 0.5px back, so the capped indicator would be 0.5px wide -- narrower than
    // `MIN_VISIBLE_INDICATOR_WIDTH`, so `onDragOver` would reject a drop there. Claiming this region
    // anyway would extend the hit area over territory that then can't accept a drop, so the claim is
    // refused entirely instead: overlap and lead both fall back to their unwidened, natural values
    // (0, since there's no gap), leaving the tab to rc-dock's own per-tab handler.
    const { tabs, zoneElement } = renderTabBarFixture(createPanel(), createDockContext());
    stubRect(tabs[1], { left: 500, right: 501, width: 1 });
    stubRect(zoneElement, { left: 501, right: 501, width: 0 });
    const onDragStateChange = getCapturedDragStateListener();
    createDragState({ tab: createTab() }, DOCK_ID);

    onDragStateChange(DOCK_ID);

    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('0px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('0px');
  });

  it('covers nothing when a right-to-left zone starts over the last tab', () => {
    const { tabs, zoneElement } = renderTabBarFixture(createPanel(), createDockContext());
    zoneElement.style.direction = 'rtl';
    // Last tab spans x:[400, 500] (midpoint 450); the zone's right edge (its logical start in RTL)
    // is at x:410 — inside the tab, past its midpoint — with no width left.
    stubRect(tabs[1], { left: 400, right: 500, width: 100 });
    stubRect(zoneElement, { left: 410, right: 410, width: 0 });
    const onDragStateChange = getCapturedDragStateListener();
    createDragState({ tab: createTab() }, DOCK_ID);

    onDragStateChange(DOCK_ID);

    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('0px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('0px');
  });

  it('covers nothing when the zone already starts before the last tab’s midpoint', () => {
    const zoneElement = startDragOverLtrBar({ zoneStart: 540 });

    expect(zoneElement).toHaveAttribute(TAB_BAR_DROP_ZONE_DRAGGING_ATTRIBUTE);
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-overlap')).toBe('0px');
    expect(zoneElement.style.getPropertyValue('--tab-bar-drop-zone-indicator-lead')).toBe('0px');
  });

  it('measures from the zone’s right edge when the fixture is right-to-left', () => {
    const panel = createPanel();
    const context = createDockContext();
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
    const first = renderTabBarFixture(createPanel({ id: 'panel-1' }), createDockContext());
    stubRect(first.tabs[1], { left: 500, right: 600, width: 100 });
    stubRect(first.zoneElement, { left: 608, right: 900, width: 292 });
    const second = renderTabBarFixture(createPanel({ id: 'panel-2' }), createDockContext());
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
    const context = createDockContext();
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
    const context = createDockContext();
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
    const context = createDockContext();
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
    const context = createDockContext();
    const { unmount } = render(<TabBarDropZone panelData={panel} context={context} />);
    const listener = getCapturedDragStateListener();

    unmount();

    expect(removeDragStateListenerMock).toHaveBeenCalledWith(listener);
  });
});
