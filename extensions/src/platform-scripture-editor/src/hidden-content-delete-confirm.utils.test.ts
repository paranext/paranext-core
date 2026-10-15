import type { HiddenContentDeleteRequest } from '@eten-tech-foundation/platform-editor';
import { LanguageStrings } from 'platform-bible-utils';
import { describe, expect, it, vi } from 'vitest';
import {
  buildHiddenContentDeleteConfirm,
  createHiddenContentDeleteHandler,
  describeHiddenContent,
  HiddenContentDeleteConfirmOptions,
} from './hidden-content-delete-confirm.utils';

const localizedStrings: LanguageStrings = {
  '%webView_platformScriptureEditor_hiddenContentDelete_prompt%':
    'This would delete content that this view cannot display: {markers}.',
};

describe('describeHiddenContent', () => {
  it('names constructs by marker, once each, falling back to their type', () => {
    expect(
      describeHiddenContent([
        { tag: 'figure', marker: 'fig' },
        { tag: 'figure', marker: 'fig' },
        { tag: 'sidebar', marker: 'esb' },
        { tag: 'periph' },
      ]),
    ).toBe('\\fig, \\esb, periph');
  });
});

describe('buildHiddenContentDeleteConfirm', () => {
  it('names the hidden content in the prompt and makes deleting the destructive choice', () => {
    expect(
      buildHiddenContentDeleteConfirm(
        { items: [{ tag: 'figure', marker: 'fig' }], action: 'deleteBackward', canSkip: true },
        localizedStrings,
      ),
    ).toEqual({
      title: '%webView_platformScriptureEditor_hiddenContentDelete_title%',
      prompt: 'This would delete content that this view cannot display: \\fig.',
      okLabel: '%webView_platformScriptureEditor_hiddenContentDelete_delete%',
      cancelLabel: '%webView_platformScriptureEditor_hiddenContentDelete_skip%',
      isDestructive: true,
      isModal: true,
    });
  });

  it('offers to skip over the content when the editor can skip it', () => {
    const { cancelLabel } = buildHiddenContentDeleteConfirm(
      { items: [{ tag: 'sidebar', marker: 'esb' }], action: 'deleteForward', canSkip: true },
      localizedStrings,
    );
    expect(cancelLabel).toBe('%webView_platformScriptureEditor_hiddenContentDelete_skip%');
  });

  it('offers to keep the content for a caret delete the editor would cancel', () => {
    // A word or line delete that reaches hidden content further along: "keep" cancels it.
    const { cancelLabel } = buildHiddenContentDeleteConfirm(
      { items: [{ tag: 'figure', marker: 'fig' }], action: 'deleteBackward', canSkip: false },
      localizedStrings,
    );
    expect(cancelLabel).toBe('%webView_platformScriptureEditor_hiddenContentDelete_keep%');
  });

  it('offers to keep the content for an edit over a selection', () => {
    const { cancelLabel } = buildHiddenContentDeleteConfirm(
      { items: [{ tag: 'figure', marker: 'fig' }], action: 'replaceSelection', canSkip: false },
      localizedStrings,
    );
    expect(cancelLabel).toBe('%webView_platformScriptureEditor_hiddenContentDelete_keep%');
  });
});

describe('createHiddenContentDeleteHandler', () => {
  const request: HiddenContentDeleteRequest = {
    items: [{ tag: 'figure', marker: 'fig' }],
    action: 'deleteBackward',
    canSkip: true,
  };

  it('deletes only when the user confirms', async () => {
    const confirm = vi.fn<(options: HiddenContentDeleteConfirmOptions) => Promise<boolean>>(
      async () => true,
    );
    const handler = createHiddenContentDeleteHandler(localizedStrings, confirm);

    await expect(handler(request)).resolves.toBe('delete');
    expect(confirm).toHaveBeenCalledWith(
      buildHiddenContentDeleteConfirm(request, localizedStrings),
    );
  });

  it('keeps the content when the user cancels or dismisses the dialog', async () => {
    await expect(
      createHiddenContentDeleteHandler(localizedStrings, async () => false)(request),
    ).resolves.toBe('keep');
    await expect(
      createHiddenContentDeleteHandler(localizedStrings, async () => undefined)(request),
    ).resolves.toBe('keep');
  });
});
