// @vitest-environment jsdom
import { describe, expect, it, vi, beforeEach } from 'vitest';

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

const savedWebView = {
  id: 'wv-1',
  webViewType: MANAGE_BOOKS_WEB_VIEW_TYPE,
  state: {},
};

describe('ManageBooksWebViewProvider transient launch options', () => {
  let provider: InstanceType<typeof ManageBooksWebViewProvider>;

  beforeEach(() => {
    provider = new ManageBooksWebViewProvider();
  });

  it('passes initialSection and initialSelectedBooks into state when supplied', async () => {
    const result = await provider.getWebView(
      // The test doubles below intentionally omit most of the real
      // `SavedWebViewDefinition`/`ManageBooksWebViewOptions` shape; only the fields this test
      // cares about are needed, so the loose test doubles are cast rather than fully typed.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      savedWebView as never,
      // Loose test double, see comment above.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      {
        projectId: 'project-1',
        initialSection: 'create',
        initialSelectedBooks: ['GEN'],
        launchToken: 7,
      } as never,
    );

    expect(result?.state?.initialSection).toBe('create');
    expect(result?.state?.initialSelectedBooks).toEqual(['GEN']);
    expect(result?.state?.launchToken).toBe(7);
  });

  it('scrubs stale launch options carried on the saved state when options omit them', async () => {
    const staleSavedWebView = {
      ...savedWebView,
      state: { initialSection: 'create', initialSelectedBooks: ['GEN'], launchToken: 7 },
    };

    const result = await provider.getWebView(
      // Loose test double, see comment near the top of the previous test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      staleSavedWebView as never,
      // Loose test double, see comment near the top of the previous test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      {
        projectId: 'project-1',
      } as never,
    );

    // A restored layout must never reopen on Create with a stale preselection, and must not carry a
    // stale token that would make the dialog re-apply one.
    expect(result?.state?.initialSection).toBeUndefined();
    expect(result?.state?.initialSelectedBooks).toBeUndefined();
    expect(result?.state?.launchToken).toBeUndefined();
  });

  it('preserves unrelated saved state while scrubbing the launch options', async () => {
    const staleSavedWebView = {
      ...savedWebView,
      state: { initialSection: 'create', launchToken: 7, somethingElse: 'keep me' },
    };

    const result = await provider.getWebView(
      // Loose test double, see comment near the top of the first test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      staleSavedWebView as never,
      // Loose test double, see comment near the top of the first test.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      {
        projectId: 'project-1',
      } as never,
    );

    expect(result?.state?.initialSection).toBeUndefined();
    expect(result?.state?.launchToken).toBeUndefined();
    expect(result?.state?.somethingElse).toBe('keep me');
  });
});
