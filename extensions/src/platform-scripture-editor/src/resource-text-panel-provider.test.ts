import { describe, expect, it, vi } from 'vitest';
import type { SavedWebViewDefinition } from '@papi/core';
import { createResourceTextPanelProvider } from './main';
import type { ResourceTextPanelOptions } from './show-resource-in-panel.util';

// `main.ts` pulls in webpack-only `?inline` imports that only resolve under webpack — stub them so
// the module loads. Vitest hoists these above the imports, wherever they are written.
vi.mock('./platform-scripture-editor.web-view.scss?inline', () => ({ default: '' }));
vi.mock('./platform-scripture-editor.web-view?inline', () => ({ default: '' }));
vi.mock('./model-text-panel.web-view.scss?inline', () => ({ default: '' }));
vi.mock('./model-text-panel.web-view?inline', () => ({ default: '' }));
vi.mock('./resource-text-panel.web-view.scss?inline', () => ({ default: '' }));
vi.mock('./resource-text-panel.web-view?inline', () => ({ default: 'resource-panel-content' }));
vi.mock('./scripture-text-grid.web-view?inline', () => ({ default: '' }));
vi.mock('./scripture-text-grid.web-view.scss?inline', () => ({ default: '' }));

vi.mock('@papi/backend', () => ({
  default: { settings: { get: vi.fn(async () => 'simple') } },
  // Base classes `main.ts` and the modules it imports extend when they load; unused here.
  DataProviderEngine: vi.fn(),
  WebViewFactory: vi.fn(),
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const savedPanel = (webViewType: string): SavedWebViewDefinition => ({
  id: 'panel-1',
  webViewType,
  projectId: 'my-project',
  state: { selectedResourceId: 'dbl:previous' },
});

/*
 * `showResourceInReferencePanel` selects a resource by reloading the tab with it in the reload
 * options. Nothing but the provider puts it into the state the panel reads, so a provider that
 * dropped it would leave the tab on its old selection with every other test still passing.
 */
describe('reference panel providers', () => {
  it.each([
    ['platformScriptureEditor.bibleTexts', 'ScriptureResource'],
    ['platformScriptureEditor.commentaries', 'CommentaryResource'],
  ] as const)('%s selects the resource its reload asks for', async (webViewType, resourceType) => {
    const provider = createResourceTextPanelProvider(webViewType, 'title', resourceType, 'icon');

    const options: ResourceTextPanelOptions = { selectedResourceId: 'dbl:uid-byz' };
    const built = await provider.getWebView(savedPanel(webViewType), options, 'nonce-1');

    expect(built?.state).toEqual(
      expect.objectContaining({ selectedResourceId: 'dbl:uid-byz', resourceType }),
    );
    expect(built?.projectId).toBe('my-project');
  });

  it("keeps the panel's own selection when its rebuild asks for none", async () => {
    const provider = createResourceTextPanelProvider(
      'platformScriptureEditor.bibleTexts',
      'title',
      'ScriptureResource',
      'icon',
    );

    const built = await provider.getWebView(
      savedPanel('platformScriptureEditor.bibleTexts'),
      {},
      'nonce-1',
    );

    expect(built?.state).toEqual(expect.objectContaining({ selectedResourceId: 'dbl:previous' }));
  });
});
