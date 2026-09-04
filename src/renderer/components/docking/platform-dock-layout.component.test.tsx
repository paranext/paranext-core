import '@testing-library/jest-dom';
import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { installMiddleClickTabBarHandlers } from './platform-dock-layout-middle-click-handlers.util';
import { PlatformDockLayout } from './platform-dock-layout.component';

// #region mocks

vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => true),
}));

// `platform-tab-title.component.tsx` (imported here for `handleCloseTab`) uses these hooks, which
// eagerly subscribe to web-view events at module scope — stub them out rather than pull that whole
// subscription chain (and the PAPI network module-scope calls behind it) into this test.
vi.mock('@renderer/hooks/use-last-focused-tab-id.hook', () => ({
  useLastFocusedTabId: vi.fn(() => undefined),
}));

vi.mock('@renderer/hooks/use-last-selected-scripture-navigable-web-view-id.hook', () => ({
  useLastSelectedScriptureNavigableWebViewId: vi.fn(() => undefined),
}));

vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));

vi.mock('@shared/services/logger.service');

vi.mock('@shared/services/window.service', () => ({
  windowService: { dataProviderName: 'platform.windowServiceDataProvider' },
}));

// `platform-dock-layout.component.tsx` and `platform-tab-title.component.tsx` (imported for
// `handleCloseTab`) both pull from this module. It talks to PAPI/the network at import time in a
// real app, so it needs a full stand-in here rather than the real thing.
vi.mock('@renderer/services/web-view.service-shard', () => ({
  registerDockLayout: vi.fn(() => vi.fn()),
  handleDockEmptiedByRemoval: vi.fn(),
  closeTab: vi.fn(),
  floatTab: vi.fn(),
  updateTabPartialSync: vi.fn(),
}));

/** Stand-in for the DOM node `DockLayout.getRootElement()` would return. */
const mockRootElement = document.createElement('div');

type MockDockLayoutHandle = { getRootElement: () => HTMLElement };

// `DockLayoutWrapper` forwards its ref straight through to rc-dock's own `DockLayout`, whose real
// behavior in jsdom isn't worth exercising here — this test is only about whether
// `PlatformDockLayout` wires the middle-click tab-bar handlers to whatever root element the ref
// exposes, not about rc-dock's own rendering.
vi.mock('./dock-layout-wrapper.component', () => ({
  DockLayoutWrapper: forwardRef((_props: object, ref: ForwardedRef<MockDockLayoutHandle>) => {
    useImperativeHandle(ref, () => ({ getRootElement: () => mockRootElement }));
    return <div data-testid="mock-dock-layout-wrapper" />;
  }),
}));

vi.mock('./platform-dock-layout-middle-click-handlers.util', () => ({
  installMiddleClickTabBarHandlers: vi.fn(),
}));

// #endregion

describe('PlatformDockLayout middle-click tab-bar handlers wiring', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(installMiddleClickTabBarHandlers).mockReset();
  });

  it('installs the middle-click tab-bar handlers on the dock layout’s root element on mount', () => {
    render(<PlatformDockLayout />);

    expect(installMiddleClickTabBarHandlers).toHaveBeenCalledExactlyOnceWith(
      mockRootElement,
      expect.objectContaining({ onTabMiddleClick: expect.any(Function) }),
    );
  });

  it('cleans up the installed handlers on unmount', () => {
    const removeHandlers = vi.fn();
    vi.mocked(installMiddleClickTabBarHandlers).mockReturnValue(removeHandlers);

    const { unmount } = render(<PlatformDockLayout />);
    expect(removeHandlers).not.toHaveBeenCalled();

    unmount();

    expect(removeHandlers).toHaveBeenCalledTimes(1);
  });
});
