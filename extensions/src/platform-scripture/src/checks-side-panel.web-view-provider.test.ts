import type { SavedWebViewDefinition } from '@papi/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CHECKS_SIDE_PANEL_ICON_URL,
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

  it('shows the Checks icon in Simple mode, where Column 3 collapses its tabs to icons', async () => {
    mocks.getSetting.mockResolvedValue('simple');

    const result = await new ChecksSidePanelWebViewProvider().getWebView(savedWebView, options);

    expect(result?.iconUrl).toBe(CHECKS_SIDE_PANEL_ICON_URL);
    expect(CHECKS_SIDE_PANEL_ICON_URL).toBe(
      'papi-extension://platformScripture/assets/icons/clipboard-check.svg',
    );
  });

  it('keeps the saved icon in Power mode, where tabs are labeled with text', async () => {
    mocks.getSetting.mockResolvedValue('power');

    const result = await new ChecksSidePanelWebViewProvider().getWebView(
      { ...savedWebView, iconUrl: 'saved-icon.svg' },
      options,
    );

    expect(result?.iconUrl).toBe('saved-icon.svg');
  });
});
