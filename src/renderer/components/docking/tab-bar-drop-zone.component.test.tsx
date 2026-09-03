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
}

// Captures the props `TabBarDropZone` passes to `DragDropDiv`, so tests can invoke its
// onDragOverT/onDragLeaveT/onDropT handlers directly instead of simulating real mouse events
// through rc-dock's DragManager. Declared before `vi.mock` (matching the pattern in
// dock-layout-wrapper.component.test.tsx) since the mock factory only reads it later, when
// `DragDropDiv` actually renders. Typed so `.mock.calls` below comes back as
// `MockDragDropDivProps` without a cast.
const mockDragDropDivProps = vi.fn<(props: MockDragDropDivProps) => void>();

// Only `DragDropDiv` is replaced — `DragState` and everything else stay the real rc-dock
// implementation, so seeding drag data via `DragState.setData` and reading it back inside the
// component under test exercises the real mechanism.
vi.mock('rc-dock', async () => {
  const actual = await vi.importActual<object>('rc-dock');
  return {
    ...actual,
    DragDropDiv: ({ getRef, onDragOverT, onDragLeaveT, onDropT }: MockDragDropDivProps) => {
      mockDragDropDivProps({ getRef, onDragOverT, onDragLeaveT, onDropT });
      return <div ref={getRef} data-testid="drop-zone" />;
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

describe('TabBarDropZone', () => {
  beforeEach(() => {
    mockDragDropDivProps.mockClear();
    // Clear rc-dock's shared drag-data store between tests.
    createDragState(undefined, undefined);
  });

  it('accepts a same-group tab drag and shows the indicator on its own element', () => {
    const panel = createPanel();
    const context = createContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    const zoneElement = screen.getByTestId('drop-zone');
    const { onDragOverT } = getCapturedHandlers();

    const tab = createTab();
    const state = createDragState({ tab }, DOCK_ID);
    const acceptSpy = vi.spyOn(state, 'accept');
    const rejectSpy = vi.spyOn(state, 'reject');

    onDragOverT?.(state);

    expect(acceptSpy).toHaveBeenCalled();
    expect(rejectSpy).not.toHaveBeenCalled();
    expect(context.setDropRect).toHaveBeenCalledWith(zoneElement, 'middle', expect.anything());
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
      const { onDragOverT, onDropT } = getCapturedHandlers();

      const floatPanel = createPanel({ id: 'float-panel' });
      const state = createDragState({ panel: floatPanel }, DOCK_ID);
      const acceptSpy = vi.spyOn(state, 'accept');

      onDragOverT?.(state);
      expect(acceptSpy).toHaveBeenCalled();
      expect(context.setDropRect).toHaveBeenCalledWith(zoneElement, 'middle', expect.anything());

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

  it("accepts a tab dragged onto its own panel's empty area even when it is that panel's only tab", () => {
    const panel = createPanel();
    const tab = createTab({ parent: panel });
    panel.tabs = [tab];
    const context = createContext();
    render(<TabBarDropZone panelData={panel} context={context} />);
    const { onDragOverT, onDropT } = getCapturedHandlers();

    const state = createDragState({ tab }, DOCK_ID);
    const acceptSpy = vi.spyOn(state, 'accept');

    onDragOverT?.(state);
    expect(acceptSpy).toHaveBeenCalled();

    // Resolves to a no-op move (the tab is already this panel's only/last tab) — accepted anyway,
    // matching `TabCache.onDragOver`'s own precedent; see `tab-bar-drop-zone.util.ts`'s TSDoc.
    onDropT?.(state);
    expect(context.dockMove).toHaveBeenCalledWith(tab, panel, 'middle');
  });
});
