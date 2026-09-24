import type { SavedWebViewDefinition } from '@papi/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ChecksSidePanelWebViewOptions,
  ChecksSidePanelWebViewProvider,
  checksSidePanelWebViewType,
} from './checks-side-panel.web-view-provider';

const mocks = vi.hoisted(() => ({ getSetting: vi.fn() }));

vi.mock('@papi/backend', () => ({
  default: {
    localization: { getLocalizedString: vi.fn().mockResolvedValue('Checks') },
    settings: { get: mocks.getSetting },
  },
}));

const savedWebView: SavedWebViewDefinition = {
  id: 'checks-1',
  webViewType: checksSidePanelWebViewType,
};

const options: ChecksSidePanelWebViewOptions = {
  projectId: 'project-1',
  editorScrollGroupId: 0,
  editorWebViewId: 'editor-1',
};

describe('ChecksSidePanelWebViewProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('pins the tab in Simple mode, where it lives in Column 3 alongside other pinned tabs', async () => {
    mocks.getSetting.mockResolvedValue('simple');

    const result = await new ChecksSidePanelWebViewProvider().getWebView(savedWebView, options);

    expect(result?.isClosable).toBe(false);
  });

  it('leaves the panel closable in Power mode', async () => {
    mocks.getSetting.mockResolvedValue('power');

    const result = await new ChecksSidePanelWebViewProvider().getWebView(savedWebView, options);

    expect(result?.isClosable).toBe(true);
  });
});
