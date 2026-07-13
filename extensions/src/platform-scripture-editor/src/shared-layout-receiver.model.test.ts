import { describe, it, expect, vi, beforeEach } from 'vitest';
import { focusSharedLayoutDefaultTab } from './shared-layout-receiver.model';

function makePapi() {
  const getSetting = vi.fn();
  return {
    papi: {
      logger: { warn: vi.fn() },
      projectDataProviders: { get: vi.fn(async () => ({ getSetting })) },
      webViews: { openWebView: vi.fn(async () => 'wv-1') },
    },
    getSetting,
  };
}

describe('focusSharedLayoutDefaultTab', () => {
  beforeEach(() => vi.clearAllMocks());

  it('brings the bible-texts panel to front for ScriptureResource', async () => {
    const { papi, getSetting } = makePapi();
    getSetting.mockResolvedValue('ScriptureResource');
    // The mock papi only implements the subset of PapiBackend this helper uses.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await focusSharedLayoutDefaultTab(papi as never, 'proj-1');
    expect(papi.webViews.openWebView).toHaveBeenCalledWith(
      'platformScriptureEditor.bibleTexts',
      undefined,
      { existingId: '?', createNewIfNotFound: false, bringToFront: true },
    );
  });

  it('brings the commentaries panel to front for CommentaryResource', async () => {
    const { papi, getSetting } = makePapi();
    getSetting.mockResolvedValue('CommentaryResource');
    // The mock papi only implements the subset of PapiBackend this helper uses.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await focusSharedLayoutDefaultTab(papi as never, 'proj-1');
    expect(papi.webViews.openWebView).toHaveBeenCalledWith(
      'platformScriptureEditor.commentaries',
      undefined,
      { existingId: '?', createNewIfNotFound: false, bringToFront: true },
    );
  });

  it('does nothing when the setting is empty or unrecognized', async () => {
    const { papi, getSetting } = makePapi();
    getSetting.mockResolvedValue('');
    // The mock papi only implements the subset of PapiBackend this helper uses.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await focusSharedLayoutDefaultTab(papi as never, 'proj-1');
    expect(papi.webViews.openWebView).not.toHaveBeenCalled();
  });

  it('swallows errors (never throws)', async () => {
    const { papi } = makePapi();
    papi.projectDataProviders.get.mockRejectedValue(new Error('boom'));
    await expect(
      // The mock papi only implements the subset of PapiBackend this helper uses.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      focusSharedLayoutDefaultTab(papi as never, 'proj-1'),
    ).resolves.toBeUndefined();
  });
});
