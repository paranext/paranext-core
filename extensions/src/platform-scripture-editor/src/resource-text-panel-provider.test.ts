import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LUCIDE_ICON_NAMES } from 'platform-bible-react/experimental';
import type { SavedWebViewDefinition } from '@papi/core';
import { createResourceTextPanelProvider } from './main';
import type { ResourceTextPanelOptions } from './show-resource-in-panel.util';
import { getStoredResourceSelection } from './resource-selection-store';

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

const mocks = vi.hoisted(() => ({
  interfaceMode: { current: 'simple' },
  /** The value of the resource selection setting */
  storedSelections: { current: {} as unknown },
}));

vi.mock('@papi/backend', () => ({
  default: {
    settings: {
      get: vi.fn(async (key: string) =>
        key === 'platform.interfaceMode'
          ? mocks.interfaceMode.current
          : mocks.storedSelections.current,
      ),
      set: vi.fn(async (_key: string, value: unknown) => {
        mocks.storedSelections.current = value;
      }),
    },
  },
  // Base classes `main.ts` and the modules it imports extend when they load; unused here.
  DataProviderEngine: vi.fn(),
  WebViewFactory: vi.fn(),
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const savedPanel = (webViewType: string): SavedWebViewDefinition => ({
  id: 'panel-1',
  webViewType,
  projectId: 'my-project',
  state: { scrollPosition: 12 },
});

beforeEach(() => {
  mocks.storedSelections.current = {
    ScriptureResource: { 'my-project': { selectedResourceId: 'dbl:previous' } },
    CommentaryResource: { 'my-project': { selectedResourceId: 'dbl:previous' } },
  };
});

/*
 * `showResourceInReferencePanel` selects a resource by reloading the tab with it in the reload
 * options. Nothing but the provider stores it as the selection the panel reads, so a provider that
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

    expect(await getStoredResourceSelection(resourceType, 'my-project')).toEqual({
      selectedResourceId: 'dbl:uid-byz',
      userPickedResourceId: 'dbl:uid-byz',
    });
    expect(built?.state).toEqual({ scrollPosition: 12, resourceType });
    expect(built?.projectId).toBe('my-project');
  });

  it('selects the resource its rebuild asks for under the project it is rebuilt for', async () => {
    const provider = createResourceTextPanelProvider(
      'platformScriptureEditor.bibleTexts',
      'title',
      'ScriptureResource',
      'icon',
    );

    const built = await provider.getWebView(
      { ...savedPanel('platformScriptureEditor.bibleTexts'), projectId: undefined },
      { projectId: 'other-project', selectedResourceId: 'dbl:uid-byz' },
      'nonce-1',
    );

    expect(built?.projectId).toBe('other-project');
    expect(await getStoredResourceSelection('ScriptureResource', 'other-project')).toMatchObject({
      selectedResourceId: 'dbl:uid-byz',
    });
    expect(await getStoredResourceSelection('ScriptureResource', 'my-project')).toMatchObject({
      selectedResourceId: 'dbl:previous',
    });
  });

  it("keeps the panel's own selection when its rebuild asks for none", async () => {
    const provider = createResourceTextPanelProvider(
      'platformScriptureEditor.bibleTexts',
      'title',
      'ScriptureResource',
      'icon',
    );

    await provider.getWebView(savedPanel('platformScriptureEditor.bibleTexts'), {}, 'nonce-1');

    expect(await getStoredResourceSelection('ScriptureResource', 'my-project')).toMatchObject({
      selectedResourceId: 'dbl:previous',
    });
  });
});

describe('reference panel provider tab icon', () => {
  afterEach(() => {
    mocks.interfaceMode.current = 'simple';
  });

  it('names a theme-coloured icon in simple mode', async () => {
    const provider = createResourceTextPanelProvider(
      'platformScriptureEditor.bibleTexts',
      'title',
      'ScriptureResource',
      'book-open',
    );

    const built = await provider.getWebView(
      savedPanel('platformScriptureEditor.bibleTexts'),
      {},
      'nonce-1',
    );

    expect(built?.iconName).toBe('book-open');
    expect(LUCIDE_ICON_NAMES).toContain('book-open');
    expect(built?.iconUrl).toBeUndefined();
  });

  it('shows the default logo in power mode, dropping any saved icon', async () => {
    mocks.interfaceMode.current = 'power';
    const provider = createResourceTextPanelProvider(
      'platformScriptureEditor.commentaries',
      'title',
      'CommentaryResource',
      'file-text',
    );

    const built = await provider.getWebView(
      {
        ...savedPanel('platformScriptureEditor.commentaries'),
        iconUrl: 'papi-extension://platformScriptureEditor/assets/file-text-dark.svg',
        iconName: 'file-text',
      },
      {},
      'nonce-1',
    );

    expect(built?.isClosable).toBe(true);
    expect(built?.iconName).toBeUndefined();
    expect(built?.iconUrl).toBeUndefined();
  });
});
