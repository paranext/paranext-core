import { vi } from 'vitest';
import { TabInfo } from '@shared/models/docking-framework.model';
import { createRCDockTabFromTabInfo } from './platform-dock-tab.component';

vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service-host', () => ({
  __esModule: true,
  localThemeService: {},
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

describe('createRCDockTabFromTabInfo()', () => {
  it('makes the tab non-closable when isClosable is false', () => {
    expect(createRCDockTabFromTabInfo(createTabInfo(false)).closable).toBe(false);
  });

  it('makes the tab closable when isClosable is true', () => {
    expect(createRCDockTabFromTabInfo(createTabInfo(true)).closable).toBe(true);
  });

  it('defaults to closable when isClosable is not specified', () => {
    expect(createRCDockTabFromTabInfo(createTabInfo(undefined)).closable).toBe(true);
  });
});
