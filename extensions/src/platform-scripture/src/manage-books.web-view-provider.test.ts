// @vitest-environment jsdom
import type { SavedWebViewDefinition } from '@papi/core';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { ManageBooksWebViewOptions } from './manage-books.web-view-provider';

vi.mock('@papi/backend', () => ({
  default: {
    projectDataProviders: {
      get: vi.fn().mockRejectedValue(new Error('no pdp in test')),
    },
    localization: {
      getLocalizedString: vi.fn().mockResolvedValue('Manage Books'),
    },
  },
}));

const { ManageBooksWebViewProvider, MANAGE_BOOKS_WEB_VIEW_TYPE } = await import(
  './manage-books.web-view-provider'
);

/**
 * Both builders are typed against the REAL contract rather than cast to `never`. That is the whole
 * point of this file: it exists to pin the shape of the transient launch options, and a cast to
 * `never` would let a field be renamed in `ManageBooksWebViewOptions` with no compile error and no
 * failing test — in the tests written specifically to catch that. `state` stays loosely typed
 * because `WebViewDefinitionBase.state` is genuinely `Record<string, unknown>`.
 */
const savedWebView = (state: Record<string, unknown> = {}): SavedWebViewDefinition => ({
  id: 'wv-1',
  webViewType: MANAGE_BOOKS_WEB_VIEW_TYPE,
  state,
});

const options = (
  overrides: Partial<ManageBooksWebViewOptions> = {},
): ManageBooksWebViewOptions => ({
  projectId: 'project-1',
  ...overrides,
});

describe('ManageBooksWebViewProvider transient launch options', () => {
  let provider: InstanceType<typeof ManageBooksWebViewProvider>;

  beforeEach(() => {
    provider = new ManageBooksWebViewProvider();
  });

  it('passes initialSection and initialSelectedBooks into state when supplied', async () => {
    const result = await provider.getWebView(
      savedWebView(),
      options({ initialSection: 'create', initialSelectedBooks: ['GEN'] }),
    );

    expect(result?.state?.initialSection).toBe('create');
    expect(result?.state?.initialSelectedBooks).toEqual(['GEN']);
  });

  it('scrubs stale launch options carried on the saved state when options omit them', async () => {
    const result = await provider.getWebView(
      savedWebView({ initialSection: 'create', initialSelectedBooks: ['GEN'] }),
      options(),
    );

    // A restored layout must never reopen on Create with a stale preselection. This is why the
    // assignment in the provider is unconditional rather than a spread-when-present: a conditional
    // spread reads as tidier and lets exactly this stale state survive.
    expect(result?.state?.initialSection).toBeUndefined();
    expect(result?.state?.initialSelectedBooks).toBeUndefined();
  });

  it('preserves unrelated saved state while scrubbing the launch options', async () => {
    const result = await provider.getWebView(
      savedWebView({ initialSection: 'create', somethingElse: 'keep me' }),
      options(),
    );

    expect(result?.state?.initialSection).toBeUndefined();
    expect(result?.state?.somethingElse).toBe('keep me');
  });

  it('scrubs every transient launch key the options type declares', async () => {
    // Belt-and-braces against the scrub and the type drifting apart: a launch key added to
    // `ManageBooksWebViewOptions` but forgotten in the provider's state assignment would survive on
    // the saved state and be restored on a future layout load. Listed explicitly (rather than derived
    // from the type, which does not exist at runtime) so adding a key here is the one deliberate step.
    const transientLaunchKeys: readonly (keyof ManageBooksWebViewOptions)[] = [
      'initialSection',
      'initialSelectedBooks',
    ];

    const result = await provider.getWebView(
      savedWebView(Object.fromEntries(transientLaunchKeys.map((key) => [key, 'stale']))),
      options(),
    );

    transientLaunchKeys.forEach((key) => {
      expect(result?.state?.[key]).toBeUndefined();
    });
  });
});
