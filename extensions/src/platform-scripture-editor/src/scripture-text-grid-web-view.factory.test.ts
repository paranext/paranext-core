import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { WebViewDefinition } from '@papi/core';
import papi, { logger } from '@papi/backend';
import { ScriptureTextGridWebViewFactory } from './scripture-text-grid-web-view.factory';

// The web-view bundle and its styles are webpack-only `?inline` imports; stub them as strings.
vi.mock('./scripture-text-grid.web-view?inline', () => ({ default: '' }));
vi.mock('./scripture-text-grid.web-view.scss?inline', () => ({ default: '' }));

vi.mock('@papi/backend', () => ({
  default: { webViewProviders: { postMessageToWebView: vi.fn() } },
  // A minimal base class: the factory only hands its web-view type to the constructor.
  WebViewFactory: class {},
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const definition: WebViewDefinition = {
  id: 'grid-1',
  webViewType: 'platformScriptureEditor.scriptureTextGrid',
  content: '',
};

describe('ScriptureTextGridWebViewFactory controller', () => {
  beforeEach(() => {
    vi.mocked(papi.webViewProviders.postMessageToWebView).mockReset();
    vi.mocked(logger.warn).mockClear();
  });

  it('delivers a reveal request to the web view as a message', async () => {
    vi.mocked(papi.webViewProviders.postMessageToWebView).mockResolvedValue(undefined);
    const controller = await new ScriptureTextGridWebViewFactory().createWebViewController(
      definition,
      'nonce-1',
    );

    await controller.revealResource('p');

    expect(papi.webViewProviders.postMessageToWebView).toHaveBeenCalledWith('grid-1', 'nonce-1', {
      method: 'revealResource',
      projectId: 'p',
    });
  });

  it('logs a warning and rethrows when the message cannot be delivered', async () => {
    const failure = new Error('web view is gone');
    vi.mocked(papi.webViewProviders.postMessageToWebView).mockRejectedValue(failure);
    const controller = await new ScriptureTextGridWebViewFactory().createWebViewController(
      definition,
      'nonce-1',
    );

    await expect(controller.revealResource('p')).rejects.toBe(failure);

    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('web view is gone'));
  });
});
