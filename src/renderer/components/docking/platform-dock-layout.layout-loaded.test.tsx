import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import DockLayout from 'rc-dock';
import { instance, mock, when } from 'ts-mockito';

// The same file-level stubs `platform-dock-layout.component.test.tsx` needs to import the component
vi.mock('@shared/services/logger.service');
vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));
vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: () => false,
}));
vi.mock('@renderer/components/docking/window-label.util', () => ({
  updateWindowTitle: vi.fn(),
}));
vi.mock('@renderer/services/dialog.service-shard', () => ({
  hasDialogRequest: () => false,
  resolveDialogRequest: vi.fn(),
}));
vi.mock('@renderer/components/docking/platform-dock-layout-middle-click-handlers.util', () => ({
  installMiddleClickTabBarHandlers: vi.fn(),
}));

// The service owns the initial layout load; these tests decide when it finishes
const mocks = vi.hoisted(() => ({
  registerDockLayout:
    vi.fn<(dockLayout: unknown, onInitialLayoutLoadFinished?: () => void) => void>(),
}));
vi.mock('@renderer/services/web-view.service-shard', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@renderer/services/web-view.service-shard')>()),
  registerDockLayout: (dockLayout: unknown, onInitialLayoutLoadFinished?: () => void) => {
    mocks.registerDockLayout(dockLayout, onInitialLayoutLoadFinished);
    return () => true;
  },
}));

// Stands in for rc-dock's own `DockLayout` so its root element is one these tests hold
let mockDockLayoutInstance: DockLayout;
vi.mock('@renderer/components/docking/dock-layout-wrapper.component', () => ({
  DockLayoutWrapper: forwardRef((_props: unknown, ref: ForwardedRef<DockLayout>) => {
    useImperativeHandle(ref, () => mockDockLayoutInstance);
    return undefined;
  }),
}));

// Imported after the mocks above so `vi.mock` hoisting wires them up first
// eslint-disable-next-line import/first
import { LAYOUT_LOADED_ATTRIBUTE, PlatformDockLayout } from './platform-dock-layout.component';

describe('PlatformDockLayout marks its root once the initial layout load has finished', () => {
  let dockRoot: HTMLDivElement;

  beforeEach(() => {
    mocks.registerDockLayout.mockReset();
    dockRoot = document.createElement('div');
    const localMockDockLayout = mock(DockLayout);
    when(localMockDockLayout.getRootElement()).thenReturn(dockRoot);
    // Mounting reads the layout to name the window; an empty one is all that read needs
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    when(localMockDockLayout.getLayout()).thenReturn({
      dockbox: { mode: 'horizontal', children: [] },
      floatbox: { mode: 'float', children: [] },
    } as ReturnType<DockLayout['getLayout']>);
    mockDockLayoutInstance = instance(localMockDockLayout);
  });

  afterEach(() => {
    cleanup();
  });

  /** The callback the component handed `registerDockLayout` for the initial load finishing */
  function finishInitialLayoutLoad(): () => void {
    const [call] = mocks.registerDockLayout.mock.calls;
    const onInitialLayoutLoadFinished = call?.[1];
    if (!onInitialLayoutLoadFinished)
      throw new Error('PlatformDockLayout registered no callback for the initial load');
    return onInitialLayoutLoadFinished;
  }

  it('leaves the root unmarked while the initial layout load is in flight', () => {
    render(<PlatformDockLayout />);

    // Positive control: the dock registered, so a load is under way and the callback exists
    expect(finishInitialLayoutLoad()).toEqual(expect.any(Function));
    expect(dockRoot.hasAttribute(LAYOUT_LOADED_ATTRIBUTE)).toBe(false);
  });

  it('marks the root once the initial layout load has finished', () => {
    render(<PlatformDockLayout />);

    act(() => finishInitialLayoutLoad()());

    expect(dockRoot.getAttribute(LAYOUT_LOADED_ATTRIBUTE)).toBe('true');
  });

  it('keeps the mark through later renders', () => {
    const { rerender } = render(<PlatformDockLayout />);
    act(() => finishInitialLayoutLoad()());

    rerender(<PlatformDockLayout />);

    expect(dockRoot.getAttribute(LAYOUT_LOADED_ATTRIBUTE)).toBe('true');
  });
});
