import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { useLastFocusedTabId } from '@renderer/hooks/use-last-focused-tab-id.hook';
import { useLastSelectedScriptureNavigableWebViewId } from '@renderer/hooks/use-last-selected-scripture-navigable-web-view-id.hook';
import { PlatformTabTitle } from './platform-tab-title.component';

// #region mocks

/**
 * Mutable focus subject the mocked `useData(...).Focus(...)` hook returns. Captured by the
 * `@renderer/hooks/papi-hooks` mock factory below and reassigned per test.
 */
let mockFocusSubject: unknown;

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%tab_aria_tab%': 'tab',
      '%tab_contextMenu_floatTab%': 'Float Tab',
    },
  ]),
  useData: vi.fn(() => ({
    Focus: () => [mockFocusSubject, vi.fn()],
  })),
}));

vi.mock('@renderer/hooks/use-last-selected-scripture-navigable-web-view-id.hook', () => ({
  useLastSelectedScriptureNavigableWebViewId: vi.fn(() => undefined),
}));

vi.mock('@renderer/hooks/use-last-focused-tab-id.hook', () => ({
  useLastFocusedTabId: vi.fn(() => undefined),
}));

// Default to power mode so the existing tint tests exercise the tint; the Simple-mode suppression
// test overrides this to false.
vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => true),
}));

vi.mock('@renderer/services/web-view.service-host', () => ({
  floatTab: vi.fn(),
  updateTabPartialSync: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('@shared/services/window.service', () => ({
  windowService: { dataProviderName: 'platform.windowServiceDataProvider' },
}));

// #endregion

/**
 * CSS class applied to the active tab header while it is the navigation target and focus is outside
 * all tabs
 */
const cssClassTabHeaderLastSelected = 'platform-dock-tab-last-selected';
/**
 * CSS class applied to the active tab content pane while it is the navigation target and focus is
 * outside all tabs
 */
const cssClassTabContentLastSelected = 'platform-dock-tabpane-last-selected';

/**
 * Renders the tab title inside a stand-in for rc-dock's DOM structure: a `.dock-panel` ancestor
 * containing the active tab header (where `PlatformTabTitle` mounts) as a sibling of the active tab
 * content pane, mirroring the DOM walk the component performs (header → `.dock-panel` →
 * `.dock-tabpane-active`).
 */
function renderTabTitle(id: string) {
  return render(
    <div className="dock-panel">
      <div className="dock-tab-active">
        <PlatformTabTitle id={id} text="Tab title" />
      </div>
      <div className="dock-tabpane-active" />
    </div>,
  );
}

describe('PlatformTabTitle last-selected web view highlighting', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(useLastSelectedScriptureNavigableWebViewId).mockReturnValue(undefined);
    vi.mocked(useLastFocusedTabId).mockReturnValue(undefined);
    vi.mocked(useIsPowerMode).mockReturnValue(true);
    mockFocusSubject = undefined;
  });

  it('does not add the last-selected class in Simple mode, even when this tab is the last-selected web view, was the last focused tab, and focus is outside all tabs (the tint is Power-only)', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    vi.mocked(useLastSelectedScriptureNavigableWebViewId).mockReturnValue('web-view-1');
    vi.mocked(useLastFocusedTabId).mockReturnValue('web-view-1');
    mockFocusSubject = undefined;

    const { container } = renderTabTitle('web-view-1');

    expect(container.querySelector('.dock-tab-active')).not.toHaveClass(
      cssClassTabHeaderLastSelected,
    );
    expect(container.querySelector('.dock-tabpane-active')).not.toHaveClass(
      cssClassTabContentLastSelected,
    );
  });

  it('adds the last-selected class to the header and content pane when this tab is the last-selected web view, was the last focused tab, and focus is outside all tabs (undefined focus subject)', () => {
    vi.mocked(useLastSelectedScriptureNavigableWebViewId).mockReturnValue('web-view-1');
    vi.mocked(useLastFocusedTabId).mockReturnValue('web-view-1');
    mockFocusSubject = undefined;

    const { container } = renderTabTitle('web-view-1');

    expect(container.querySelector('.dock-tab-active')).toHaveClass(cssClassTabHeaderLastSelected);
    expect(container.querySelector('.dock-tabpane-active')).toHaveClass(
      cssClassTabContentLastSelected,
    );
  });

  it('adds the last-selected class to the header and content pane when this tab is the last-selected web view, was the last focused tab, and focus is outside all tabs (focusType "other")', () => {
    vi.mocked(useLastSelectedScriptureNavigableWebViewId).mockReturnValue('web-view-1');
    vi.mocked(useLastFocusedTabId).mockReturnValue('web-view-1');
    mockFocusSubject = { focusType: 'other' };

    const { container } = renderTabTitle('web-view-1');

    expect(container.querySelector('.dock-tab-active')).toHaveClass(cssClassTabHeaderLastSelected);
    expect(container.querySelector('.dock-tabpane-active')).toHaveClass(
      cssClassTabContentLastSelected,
    );
  });

  it('does not add the last-selected class when the user focused a different (e.g. non-navigable) tab after this one, even though this tab is still the navigation target', () => {
    // Reproduces: click scripture-navigable web view 1, click non-navigable web view 2 (tracker
    // retains web view 1), click the top toolbar (focus outside all tabs). Web view 1 still drives
    // BCV navigation but must not be tinted because it was not the tab the user was last in.
    vi.mocked(useLastSelectedScriptureNavigableWebViewId).mockReturnValue('web-view-1');
    vi.mocked(useLastFocusedTabId).mockReturnValue('web-view-2');
    mockFocusSubject = { focusType: 'other' };

    const { container } = renderTabTitle('web-view-1');

    expect(container.querySelector('.dock-tab-active')).not.toHaveClass(
      cssClassTabHeaderLastSelected,
    );
    expect(container.querySelector('.dock-tabpane-active')).not.toHaveClass(
      cssClassTabContentLastSelected,
    );
  });

  it('removes the last-selected class from the header and content pane when this tab becomes focused', () => {
    vi.mocked(useLastSelectedScriptureNavigableWebViewId).mockReturnValue('web-view-1');
    mockFocusSubject = { focusType: 'webView', id: 'web-view-1' };

    const { container } = renderTabTitle('web-view-1');

    expect(container.querySelector('.dock-tab-active')).not.toHaveClass(
      cssClassTabHeaderLastSelected,
    );
    expect(container.querySelector('.dock-tabpane-active')).not.toHaveClass(
      cssClassTabContentLastSelected,
    );
  });

  it('removes the last-selected class from the header and content pane when a DIFFERENT tab is focused (PT9 parity: no dual highlight)', () => {
    vi.mocked(useLastSelectedScriptureNavigableWebViewId).mockReturnValue('web-view-1');
    mockFocusSubject = { focusType: 'tab', tabType: 'webView', id: 'some-other-tab' };

    const { container } = renderTabTitle('web-view-1');

    expect(container.querySelector('.dock-tab-active')).not.toHaveClass(
      cssClassTabHeaderLastSelected,
    );
    expect(container.querySelector('.dock-tabpane-active')).not.toHaveClass(
      cssClassTabContentLastSelected,
    );
  });

  it('removes the last-selected class from the header and content pane when a DIFFERENT web view is focused (PT9 parity: no dual highlight)', () => {
    vi.mocked(useLastSelectedScriptureNavigableWebViewId).mockReturnValue('web-view-1');
    mockFocusSubject = { focusType: 'webView', id: 'some-other-web-view' };

    const { container } = renderTabTitle('web-view-1');

    expect(container.querySelector('.dock-tab-active')).not.toHaveClass(
      cssClassTabHeaderLastSelected,
    );
    expect(container.querySelector('.dock-tabpane-active')).not.toHaveClass(
      cssClassTabContentLastSelected,
    );
  });

  it('does not add the last-selected class to the header or content pane when this tab is not the last-selected web view', () => {
    vi.mocked(useLastSelectedScriptureNavigableWebViewId).mockReturnValue('some-other-web-view');
    mockFocusSubject = undefined;

    const { container } = renderTabTitle('web-view-1');

    expect(container.querySelector('.dock-tab-active')).not.toHaveClass(
      cssClassTabHeaderLastSelected,
    );
    expect(container.querySelector('.dock-tabpane-active')).not.toHaveClass(
      cssClassTabContentLastSelected,
    );
  });

  it('does not tint a sibling tab header or pane when the last-selected tab is not the front tab in its panel', () => {
    // The last-selected web view's tab is NOT the active tab in its panel: a sibling tab (e.g.
    // Settings) is active instead, so the sibling's header and pane carry
    // .dock-tab-active/.dock-tabpane-active and this tab's header does not
    vi.mocked(useLastSelectedScriptureNavigableWebViewId).mockReturnValue('web-view-1');
    mockFocusSubject = { focusType: 'tab', id: 'settings-tab' };

    const { container } = render(
      <div className="dock-panel">
        <div className="dock-tab-active" />
        <div className="dock-tab">
          <PlatformTabTitle id="web-view-1" text="Tab title" />
        </div>
        <div className="dock-tabpane-active" />
      </div>,
    );

    expect(container.querySelector('.dock-tab-active')).not.toHaveClass(
      cssClassTabHeaderLastSelected,
    );
    expect(container.querySelector('.dock-tabpane-active')).not.toHaveClass(
      cssClassTabContentLastSelected,
    );
  });
});
