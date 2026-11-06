import type { HiddenContentDeleteRequest } from '@eten-tech-foundation/platform-editor';
import { LanguageStrings } from 'platform-bible-utils';
import { describe, expect, it, vi } from 'vitest';
import {
  buildHiddenContentDeleteConfirm,
  createHiddenContentDeleteHandler,
  createPlatformHiddenContentDeleteHandler,
  describeHiddenContent,
  getEditabilityOptions,
  HiddenContentDeleteConfirmOptions,
  HiddenContentDeleteServices,
} from './hidden-content-delete-confirm.utils';

const PROMPT_KEY = '%webView_platformScriptureEditor_hiddenContentDelete_prompt%';
const promptTemplate = 'This would delete content that this view cannot display: {markers}.';

describe('describeHiddenContent', () => {
  it('names constructs by marker, once each, falling back to a backslash and their type', () => {
    expect(
      describeHiddenContent([
        { tag: 'figure', marker: 'fig' },
        { tag: 'sidebar', marker: 'esb' },
        { tag: 'periph' },
      ]),
    ).toBe('\\fig, \\esb, \\periph');
  });

  it('shows an optional break as it is written in USFM', () => {
    expect(describeHiddenContent([{ tag: 'optbreak' }])).toBe('//');
  });

  it('counts a construct that appears more than once', () => {
    expect(
      describeHiddenContent([
        ...Array.from({ length: 12 }, () => ({ tag: 'figure', marker: 'fig' })),
        { tag: 'sidebar', marker: 'esb' },
        { tag: 'sidebar', marker: 'esb' },
        { tag: 'sidebar', marker: 'esb' },
      ]),
    ).toBe('\\fig ×12, \\esb ×3');
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

  it('labels the keep button "Don\'t delete" when a caret delete cannot skip', () => {
    // A word or line delete that reaches hidden content further along: "keep" leaves it undone.
    const { cancelLabel } = buildHiddenContentDeleteConfirm(
      { items: [{ tag: 'figure', marker: 'fig' }], action: 'deleteBackward', canSkip: false },
      promptTemplate,
    );
    expect(cancelLabel).toBe('%webView_platformScriptureEditor_hiddenContentDelete_keep%');
  });

  it('labels the keep button "Cancel edit" for an edit over a selection', () => {
    // "Keep" cancels the whole edit there, including any text being typed or pasted.
    const { cancelLabel } = buildHiddenContentDeleteConfirm(
      { items: [{ tag: 'figure', marker: 'fig' }], action: 'replaceSelection', canSkip: false },
      promptTemplate,
    );
    expect(cancelLabel).toBe('%webView_platformScriptureEditor_hiddenContentDelete_cancelEdit%');
  });
});

describe('createHiddenContentDeleteHandler', () => {
  const skippable: HiddenContentDeleteRequest = {
    items: [{ tag: 'figure', marker: 'fig' }],
    action: 'deleteBackward',
    canSkip: true,
  };
  const liveStrings: LanguageStrings = { [PROMPT_KEY]: promptTemplate };
  const notLoaded = async () => {
    throw new Error('the live strings were loaded, so this should not be called');
  };

  it.each([
    ['a request that can skip', skippable],
    ['a selection edit', { ...skippable, action: 'replaceSelection', canSkip: false } as const],
  ])('shows the full confirmation for %s and deletes only on confirm', async (_, request) => {
    const confirm = vi.fn<(options: HiddenContentDeleteConfirmOptions) => Promise<boolean>>(
      async () => true,
    );
    const handler = createHiddenContentDeleteHandler(() => liveStrings, notLoaded, confirm);

    await expect(handler(request)).resolves.toBe('delete');
    expect(confirm).toHaveBeenCalledWith(buildHiddenContentDeleteConfirm(request, promptTemplate));
  });

  it('keeps the content when the user cancels or dismisses the dialog', async () => {
    await expect(
      createHiddenContentDeleteHandler(
        () => liveStrings,
        notLoaded,
        async () => false,
      )(skippable),
    ).resolves.toBe('keep');
    await expect(
      createHiddenContentDeleteHandler(
        () => liveStrings,
        notLoaded,
        async () => undefined,
      )(skippable),
    ).resolves.toBe('keep');
  });

  it.each([
    ['have not loaded', {}],
    ['still hold the key', { [PROMPT_KEY]: PROMPT_KEY }],
  ])('looks the prompt up when the live strings %s', async (_, strings: LanguageStrings) => {
    const localize = vi.fn(async () => promptTemplate);
    const confirm = vi.fn(async () => false);

    await createHiddenContentDeleteHandler(() => strings, localize, confirm)(skippable);

    expect(localize).toHaveBeenCalledWith(PROMPT_KEY);
    expect(confirm).toHaveBeenCalledWith(
      buildHiddenContentDeleteConfirm(skippable, promptTemplate),
    );
  });

  it('fails, without asking, when the prompt has no localized string', async () => {
    // The editor treats the rejection as "keep" and logs it.
    const confirm = vi.fn(async () => true);
    const handler = createHiddenContentDeleteHandler(
      () => ({}),
      async () => PROMPT_KEY,
      confirm,
    );

    await expect(handler(skippable)).rejects.toThrow(PROMPT_KEY);
    expect(confirm).not.toHaveBeenCalled();
  });
});

describe('createPlatformHiddenContentDeleteHandler', () => {
  const request: HiddenContentDeleteRequest = {
    items: [{ tag: 'figure', marker: 'fig' }],
    action: 'deleteBackward',
    canSkip: true,
  };

  function fakeServices(answer: boolean | undefined) {
    const services = {
      localization: { getLocalizedString: vi.fn(async () => promptTemplate) },
      dialogs: { showDialog: vi.fn(async () => answer) },
    } satisfies HiddenContentDeleteServices;
    return services;
  }

  it('asks through the platform confirm dialog and deletes only on confirm', async () => {
    const services = fakeServices(true);
    const handler = createPlatformHiddenContentDeleteHandler(
      () => ({ [PROMPT_KEY]: promptTemplate }),
      services,
    );

    await expect(handler(request)).resolves.toBe('delete');
    expect(services.dialogs.showDialog).toHaveBeenCalledWith(
      'platform.confirm',
      buildHiddenContentDeleteConfirm(request, promptTemplate),
    );
    expect(services.localization.getLocalizedString).not.toHaveBeenCalled();
  });

  it('looks the prompt up through the localization service until the live strings load', async () => {
    const services = fakeServices(false);

    await expect(
      createPlatformHiddenContentDeleteHandler(() => ({}), services)(request),
    ).resolves.toBe('keep');
    expect(services.localization.getLocalizedString).toHaveBeenCalledWith({
      localizeKey: PROMPT_KEY,
    });
  });
});

describe('getEditabilityOptions', () => {
  const handler = vi.fn(async () => 'keep' as const);

  it('guards hidden content in an editable editor', () => {
    expect(getEditabilityOptions(false, handler)).toEqual({
      isReadonly: false,
      onHiddenContentDelete: handler,
    });
  });

  it('asks nothing in a read-only editor, which makes no edits', () => {
    expect(getEditabilityOptions(true, handler)).toEqual({
      isReadonly: true,
      onHiddenContentDelete: undefined,
    });
  });
});
