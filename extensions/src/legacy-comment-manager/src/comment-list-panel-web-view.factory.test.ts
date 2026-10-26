import { describe, expect, it, vi } from 'vitest';
import type { SavedWebViewDefinition } from '@papi/core';
import { CommentListPanelWebViewFactory } from './comment-list-panel-web-view.factory';
import { COMMENT_LIST_PANEL_WEB_VIEW_TYPE } from './comment-list-panel.utils';

// Webpack-only `?inline` imports don't resolve under vitest; stub them to plain strings.
vi.mock('./comment-list.web-view?inline', () => ({ default: 'mock-comment-list-web-view' }));
vi.mock('./tailwind.css?inline', () => ({ default: 'mock-tailwind-css' }));

const mocks = vi.hoisted(() => ({
  getSetting: vi.fn(async (): Promise<string> => 'simple'),
  // A class with no declared constructor accepts whatever the factory's `super(...)` passes.
  PapiBackendStubBase: class {},
}));

vi.mock('@papi/backend', () => ({
  default: {
    localization: { getLocalizedString: vi.fn(async () => 'Comments') },
    settings: { get: mocks.getSetting },
  },
  logger: { debug: vi.fn(), warn: vi.fn(), info: vi.fn(), error: vi.fn() },
  WebViewFactory: mocks.PapiBackendStubBase,
}));

const savedPanel: SavedWebViewDefinition = {
  id: 'comments-panel',
  webViewType: COMMENT_LIST_PANEL_WEB_VIEW_TYPE,
};

describe('CommentListPanelWebViewFactory tab icon', () => {
  it.each(['simple', 'power'])('opts its icon in to theme colouring in %s mode', async (mode) => {
    mocks.getSetting.mockResolvedValueOnce(mode);

    const definition = await new CommentListPanelWebViewFactory().getWebViewDefinition(
      savedPanel,
      {},
    );

    expect(definition?.iconUrl).toBe(
      'papi-extension://legacyCommentManager/assets/message-square.svg',
    );
    expect(definition?.isIconMonochrome).toBe(true);
  });
});
