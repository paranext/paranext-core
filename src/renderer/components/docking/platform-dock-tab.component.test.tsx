import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { TabInfo, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import { createRCDockTabFromTabInfo } from './platform-dock-tab.component';
import { TAB_GROUP } from './platform-dock-layout-positioning.util';

// Mock heavy transitive deps that run side-effects at module init in jsdom.
vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));

// Stub child components that are heavy or pull in unrelated deps. Surfaces `webViewType` as a data
// attribute so a test can see which name (if any) reached the child, without rendering the real
// tab title and everything it pulls in.
vi.mock('./platform-tab-title.component', () => ({
  PlatformTabTitle: ({ webViewType }: { webViewType?: string }) => (
    <span data-testid="mock-tab-title" data-web-view-type={webViewType} />
  ),
}));
vi.mock('./platform-panel.component', () => ({
  PlatformPanel: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

/** Minimal {@link TabInfo} fixture; individual tests override `isClosable`. */
function createTabInfo(isClosable?: boolean): TabInfo {
  return {
    id: 'test-tab',
    tabType: 'webView',
    tabTitle: 'Test Tab',
    content: undefined,
    isClosable,
  };
}

function makeTabInfo(): TabInfo {
  return {
    id: 'test-id',
    tabType: TAB_TYPE_WEBVIEW,
    tabTitle: 'Test',
    content: <div>content</div>,
  };
}

describe('createRCDockTabFromTabInfo', () => {
  it('accepts an options object with shouldFlash', () => {
    const result = createRCDockTabFromTabInfo(makeTabInfo(), { shouldFlash: false });
    expect(result.group).toBe(TAB_GROUP);
    expect(result.id).toBe('test-id');
  });

  it('defaults to shouldFlash: false when options omitted', () => {
    const result = createRCDockTabFromTabInfo(makeTabInfo());
    expect(result.flashTriggerTime).toBeUndefined();
  });

  it('sets flashTriggerTime when shouldFlash is true', () => {
    const before = Date.now();
    const result = createRCDockTabFromTabInfo(makeTabInfo(), { shouldFlash: true });
    expect(result.flashTriggerTime).toBeGreaterThanOrEqual(before);
  });
});

describe('createRCDockTabFromTabInfo closable gating', () => {
  it('makes the tab non-closable when isClosable is false', () => {
    expect(createRCDockTabFromTabInfo(createTabInfo(false)).closable).toBe(false);
  });

  it('makes the tab closable when isClosable is true', () => {
    expect(createRCDockTabFromTabInfo(createTabInfo(true)).closable).toBe(true);
  });

  it('defaults to closable when isClosable is not specified', () => {
    expect(createRCDockTabFromTabInfo(createTabInfo(undefined)).closable).toBe(true);
  });

  it('default (no options): closable is true', () => {
    const result = createRCDockTabFromTabInfo(makeTabInfo());
    expect(result.closable).toBe(true);
  });
});

describe('createRCDockTabFromTabInfo webViewType wiring', () => {
  it('passes a web view tab’s webViewType through, naming its contributed menu', () => {
    const tabInfo: TabInfo = {
      id: 'test-id',
      tabType: TAB_TYPE_WEBVIEW,
      tabTitle: 'Test',
      content: <div>content</div>,
      data: { webViewType: 'greekWords.webView' },
    };

    render(<div>{createRCDockTabFromTabInfo(tabInfo).title}</div>);

    expect(screen.getByTestId('mock-tab-title')).toHaveAttribute(
      'data-web-view-type',
      'greekWords.webView',
    );
  });

  it('passes no webViewType for a tab that hosts no web view', () => {
    const tabInfo: TabInfo = {
      id: 'test-id',
      tabType: 'dialog',
      tabTitle: 'Test',
      content: <div>content</div>,
      data: { webViewType: 'greekWords.webView' },
    };

    render(<div>{createRCDockTabFromTabInfo(tabInfo).title}</div>);

    expect(screen.getByTestId('mock-tab-title')).not.toHaveAttribute('data-web-view-type');
  });
});
