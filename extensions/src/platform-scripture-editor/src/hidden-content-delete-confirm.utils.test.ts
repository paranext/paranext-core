import type { HiddenContentDeleteRequest } from '@eten-tech-foundation/platform-editor';
import { describe, expect, it, vi } from 'vitest';
import {
  buildHiddenContentDeleteConfirm,
  createHiddenContentDeleteHandler,
  describeHiddenContent,
  HiddenContentDeleteConfirmOptions,
} from './hidden-content-delete-confirm.utils';

vi.mock('@papi/frontend', () => ({
  logger: { warn: vi.fn() },
}));

const promptTemplate = 'This would delete content that this view cannot display: {markers}.';

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
        promptTemplate,
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
      promptTemplate,
    );
    expect(cancelLabel).toBe('%webView_platformScriptureEditor_hiddenContentDelete_skip%');
  });

  it('offers to keep the content for a caret delete the editor would cancel', () => {
    // A word or line delete that reaches hidden content further along: "keep" cancels it.
    const { cancelLabel } = buildHiddenContentDeleteConfirm(
      { items: [{ tag: 'figure', marker: 'fig' }], action: 'deleteBackward', canSkip: false },
      promptTemplate,
    );
    expect(cancelLabel).toBe('%webView_platformScriptureEditor_hiddenContentDelete_keep%');
  });

  it('offers to keep the content for an edit over a selection', () => {
    const { cancelLabel } = buildHiddenContentDeleteConfirm(
      { items: [{ tag: 'figure', marker: 'fig' }], action: 'replaceSelection', canSkip: false },
      promptTemplate,
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
  const localize = async () => promptTemplate;

  it('deletes only when the user confirms', async () => {
    const confirm = vi.fn<(options: HiddenContentDeleteConfirmOptions) => Promise<boolean>>(
      async () => true,
    );
    const handler = createHiddenContentDeleteHandler(localize, confirm);

    await expect(handler(request)).resolves.toBe('delete');
    expect(confirm).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: 'This would delete content that this view cannot display: \\fig.',
        okLabel: '%webView_platformScriptureEditor_hiddenContentDelete_delete%',
        isDestructive: true,
        isModal: true,
      }),
    );
  });

  it('looks up the prompt each time it asks', async () => {
    const localizeSpy = vi.fn(localize);
    const handler = createHiddenContentDeleteHandler(localizeSpy, async () => false);

    await handler(request);
    await handler(request);

    expect(localizeSpy).toHaveBeenCalledTimes(2);
    expect(localizeSpy).toHaveBeenCalledWith(
      '%webView_platformScriptureEditor_hiddenContentDelete_prompt%',
    );
  });

  it('keeps the content when the user cancels or dismisses the dialog', async () => {
    await expect(
      createHiddenContentDeleteHandler(localize, async () => false)(request),
    ).resolves.toBe('keep');
    await expect(
      createHiddenContentDeleteHandler(localize, async () => undefined)(request),
    ).resolves.toBe('keep');
  });

  it('keeps the content, without asking, when the prompt cannot be looked up', async () => {
    const confirm = vi.fn(async () => true);
    const handler = createHiddenContentDeleteHandler(async () => {
      throw new Error('localization service unavailable');
    }, confirm);

    await expect(handler(request)).resolves.toBe('keep');
    expect(confirm).not.toHaveBeenCalled();
  });

  it('keeps the content when the dialog fails', async () => {
    const handler = createHiddenContentDeleteHandler(localize, async () => {
      throw new Error('dialog closed');
    });

    await expect(handler(request)).resolves.toBe('keep');
  });
});
