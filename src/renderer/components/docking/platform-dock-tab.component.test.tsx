import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';
import { TabInfo } from '@shared/models/docking-framework.model';
import { TAB_TYPE_WEBVIEW } from '@renderer/components/web-view.component';
import { createRCDockTabFromTabInfo } from './platform-dock-tab.component';
import { TAB_GROUP } from './platform-dock-layout-positioning.util';

// Mock heavy transitive deps that run side-effects at module init in jsdom.
vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service-host', () => ({
  __esModule: true,
  localThemeService: {},
}));

// Stub child components that are heavy or pull in unrelated deps.
vi.mock('./platform-tab-title.component', () => ({
  PlatformTabTitle: () => <span data-testid="mock-tab-title" />,
}));
vi.mock('./platform-panel.component', () => ({
  PlatformPanel: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

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
  it('power mode: closable is true', () => {
    const result = createRCDockTabFromTabInfo(makeTabInfo(), { isPowerMode: true });
    expect(result.closable).toBe(true);
  });

  it('simple mode: closable is false', () => {
    const result = createRCDockTabFromTabInfo(makeTabInfo(), { isPowerMode: false });
    expect(result.closable).toBe(false);
  });

  it('default (no options): closable is true (power-mode-compatible default)', () => {
    const result = createRCDockTabFromTabInfo(makeTabInfo());
    expect(result.closable).toBe(true);
  });
});
