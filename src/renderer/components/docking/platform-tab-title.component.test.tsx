import '@testing-library/jest-dom';
import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
  useDataProvider: vi.fn(() => undefined),
}));

vi.mock('@renderer/hooks/use-last-selected-scripture-navigable-web-view-id.hook', () => ({
  useLastSelectedScriptureNavigableWebViewId: vi.fn(() => undefined),
}));

vi.mock('@renderer/hooks/use-last-focused-tab-id.hook', () => ({
  useLastFocusedTabId: vi.fn(() => undefined),
}));

// Mock heavy transitive deps that run side-effects at module init in jsdom.
vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service-host', () => ({
  __esModule: true,
  localThemeService: {},
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

// PlatformTabTitle subscribes to the window-focus data provider and renders localized strings.
// Stub the context-menu/tooltip primitives so the context-menu-gating tests below can assert on
// presence/absence of the ContextMenu wrapper without depending on Radix's portal/asChild behavior.
vi.mock('platform-bible-react', async (importOriginal) => {
  const actual = await importOriginal<object>();
  return {
    ...actual,
    ContextMenu: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="context-menu">{children}</div>
    ),
    ContextMenuTrigger: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    ContextMenuContent: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    ContextMenuItem: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    Tooltip: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    TooltipProvider: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    TooltipTrigger: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    TooltipContent: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  };
});

// jsdom has no ResizeObserver; stub it capturing the callback so tests can simulate column
// resizes (same pattern as use-view-visibility.hook.test.ts).
type MinimalResizeCallback = (entries: { contentRect: { width: number } }[]) => void;

let resizeCallback: MinimalResizeCallback | undefined;
const mockResizeObserve = vi.fn();
const mockResizeDisconnect = vi.fn();

beforeEach(() => {
  resizeCallback = undefined;
  mockResizeObserve.mockClear();
  mockResizeDisconnect.mockClear();
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn((callback: MinimalResizeCallback) => {
      resizeCallback = callback;
      return { observe: mockResizeObserve, disconnect: mockResizeDisconnect };
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

/**
 * Triggers a recompute of the icon-only-density decision (as a real column resize would). The
 * component reads current geometry directly (`getBoundingClientRect()`) rather than from the resize
 * entry, so callers must set up the desired panel/measure-clone widths (see
 * `setPanelWidth`/`setMeasureCloneWidth` below) before calling this.
 */
function simulateColumnResize() {
  act(() => {
    resizeCallback?.([]);
  });
}

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
 * containing `.dock-nav-wrap` > `.dock-nav-list` > the active tab header (where `PlatformTabTitle`
 * mounts, matching the DOM walk the icon-only-density effect performs) as a sibling of the active
 * tab content pane (mirroring the last-selected-tint effect's walk: header → `.dock-panel` →
 * `.dock-tabpane-active`).
 */
function renderTabTitle(id: string) {
  return render(
    <div className="dock-panel">
      <div className="dock-nav-wrap">
        <div className="dock-nav-list">
          <div className="dock-tab-active">
            <PlatformTabTitle id={id} text="Tab title" />
          </div>
        </div>
      </div>
      <div className="dock-tabpane-active" />
    </div>,
  );
}

/** A zero-filled `DOMRect`-shaped object with just `width` overridden, for mocking layout in jsdom. */
function makeRectWithWidth(width: number): DOMRect {
  return { width, height: 0, top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0, toJSON: () => ({}) };
}

/**
 * Sets `.dock-panel`'s `getBoundingClientRect().width` (jsdom doesn't compute real layout, so this
 * never reflects actual rendered geometry) to simulate the enclosing column being `width` px wide.
 */
function setPanelWidth(container: HTMLElement, width: number) {
  const panel = container.querySelector('.dock-panel');
  if (!panel) throw new Error('setPanelWidth: .dock-panel not found');
  vi.spyOn(panel, 'getBoundingClientRect').mockReturnValue(makeRectWithWidth(width));
}

/**
 * Sets this tab's `.platform-tab-title-measure` clone's `getBoundingClientRect().width` (jsdom
 * doesn't compute real layout) to simulate the tab bar needing `width` px at full icon+title size.
 * With a single rendered tab (as `renderTabTitle` produces), this clone's width IS the tab bar's
 * full content width the component sums across siblings.
 */
function setMeasureCloneWidth(container: HTMLElement, width: number) {
  const clone = container.querySelector('.platform-tab-title-measure');
  if (!clone) throw new Error('setMeasureCloneWidth: .platform-tab-title-measure not found');
  vi.spyOn(clone, 'getBoundingClientRect').mockReturnValue(makeRectWithWidth(width));
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

describe('PlatformTabTitle context-menu gating', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(useIsPowerMode).mockReturnValue(true);
  });

  it('power mode: wraps the title in a ContextMenu', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(true);
    render(<PlatformTabTitle text="Tab" id="tab-1" />);
    expect(screen.queryByTestId('context-menu')).toBeInTheDocument();
  });

  it('simple mode: does not wrap the title in a ContextMenu', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    render(<PlatformTabTitle text="Tab" id="tab-1" />);
    expect(screen.queryByTestId('context-menu')).not.toBeInTheDocument();
  });
});

describe('PlatformTabTitle responsive icon-only density (Simple mode)', () => {
  afterEach(() => {
    cleanup();
    vi.mocked(useIsPowerMode).mockReturnValue(true);
  });

  it('hides the title text once the tab bar’s real full content no longer fits the available space', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    const { container } = renderTabTitle('web-view-1');
    setPanelWidth(container, 300);
    setMeasureCloneWidth(container, 500);

    simulateColumnResize();

    expect(container.querySelector('.platform-tab-title')).toHaveClass('icon-only');
  });

  it('keeps the title text visible when the available space exceeds the tab bar’s real full content width', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    const { container } = renderTabTitle('web-view-1');
    setPanelWidth(container, 900);
    setMeasureCloneWidth(container, 500);

    simulateColumnResize();

    expect(container.querySelector('.platform-tab-title')).not.toHaveClass('icon-only');
  });

  it('measures live rather than caching a past reading, so a column that started too narrow correctly expands once genuinely widened', () => {
    // Regression test for a real bug: an earlier version cached the full-content width only the
    // first time it saw `!wasIconOnly`, which could capture a wrong value if that first
    // measurement happened during a transient state (e.g. before a sibling tab's title finished
    // loading) — and, since the cache only ever updated while NOT collapsed, a bad value taken
    // right before collapsing could never self-correct, leaving the tab stuck icon-only forever
    // regardless of how wide the column later became (confirmed via CDP up to a 3000px window).
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    const { container } = renderTabTitle('web-view-1');

    setPanelWidth(container, 300);
    setMeasureCloneWidth(container, 500);
    simulateColumnResize();
    expect(container.querySelector('.platform-tab-title')).toHaveClass('icon-only');

    // Widen enough to fit the SAME full-content width (500) again — no caching means this always
    // re-reads the true current content width, so it must correctly re-expand.
    setPanelWidth(container, 900);
    simulateColumnResize();

    expect(container.querySelector('.platform-tab-title')).not.toHaveClass('icon-only');
  });

  it('never observes for resize in Power mode', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(true);
    renderTabTitle('web-view-1');

    expect(mockResizeObserve).not.toHaveBeenCalled();
  });
});
