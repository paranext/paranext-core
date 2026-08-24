// @vitest-environment jsdom
import { afterEach, describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReferenceList } from 'platform-scripture';
import { ModelTextPanel, ModelTextPanelProps } from './model-text-panel.component';

vi.mock('@eten-tech-foundation/platform-editor', () => ({
  Editorial: React.forwardRef((_props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    React.useImperativeHandle(ref, () => ({ setUsj: vi.fn() }));
    return <div data-testid="editorial" />;
  }),
  // The component reads `getDefaultViewOptions()` at module scope; the mocked component below
  // doesn't inspect the returned `view` options, so an empty object is sufficient.
  getDefaultViewOptions: () => ({}),
}));
vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    useExtraValidMarkers: () => [],
  };
});

const STRINGS = {
  '%webView_modelTextPanel_installing%': 'Installing resource…',
  '%webView_modelTextPanel_selecting%': 'Selecting resource…',
  '%webView_modelTextPanel_noProject%': 'No project.',
  '%webView_modelTextPanel_pickModelText%': 'Pick model text…',
  '%webView_modelTextPanel_unknownResource%': 'The selected model text could not be found.',
  '%webView_modelTextPanel_installFailed%': "The model text couldn't be installed.",
  '%webView_modelTextPanel_installFailedOffline%':
    "The model text couldn't be installed. Check your connection and try again.",
  '%webView_modelTextPanel_retry%': 'Try again',
  '%webView_modelTextPanel_emptyState_prompt%': 'No model text selected.',
  '%webView_modelTextPanel_bookNotAvailable%':
    'This book does not exist in this model text. Choose a different model text or go to a book it contains.',
  '%webView_platformScriptureEditor_emptyChapter_messageResource%':
    'This chapter is empty in this resource.',
};

const INSTALLED_RESOURCE: DblResourceData = {
  dblEntryUid: 'uid-web',
  displayName: 'WEB',
  fullName: 'World English Bible',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 1200,
  installed: true,
  updateAvailable: false,
  projectId: 'project-web',
};

const UNINSTALLED_RESOURCE: DblResourceData = { ...INSTALLED_RESOURCE, installed: false };

/**
 * A chapter with content. It carries a chapter marker and a verse because the panel distinguishes a
 * populated chapter from a blank one by those nodes — USJ with an empty `content` array is a
 * _blank_ chapter, not a generic stand-in.
 */
const SAMPLE_USJ: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'chapter', marker: 'c', number: '1' },
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '1' }, 'In the beginning'],
    },
  ],
};

/** A chapter the resource has, but with nothing in it — no chapter marker and no verses. */
const BLANK_USJ: Usj = { type: 'USJ', version: '3.1', content: [] };

/** An effective list with a single configured dblResource model text pointing at `dblEntryUid`. */
function configuredModelText(dblEntryUid: string): EffectiveResourceReferenceList {
  return {
    dataVersion: '1.0.0',
    items: [{ type: 'dblResource', id: dblEntryUid, name: 'WEB', source: 'admin' }],
  };
}

function makeProps(overrides: Partial<ModelTextPanelProps> = {}): ModelTextPanelProps {
  return {
    localizedStrings: STRINGS,
    hasProject: true,
    effectiveModelTexts: { dataVersion: '1.0.0', items: [] },
    isEffectiveModelTextsLoading: false,
    dblResources: [],
    isLoadingResources: false,
    getUserModelTexts: async () => undefined,
    installResource: vi.fn(async () => {}),
    setUserModelTexts: vi.fn(async () => {}),
    showResourcePicker: vi.fn(async () => undefined),
    getResourceChapter: vi.fn(async () => ({ usj: undefined, textDirection: 'ltr' })),
    ...overrides,
  };
}

function renderPanel(overrides: Partial<ModelTextPanelProps> = {}) {
  const props = makeProps(overrides);
  return { props, ...render(<ModelTextPanel {...props} />) };
}

afterEach(() => {
  // restoreAllMocks (not just clearAllMocks) so a navigator.onLine getter spy can't leak between tests.
  vi.restoreAllMocks();
});

describe('ModelTextPanel', () => {
  it('shows the "Pick model text" empty state when no model text is configured', () => {
    renderPanel();
    expect(screen.getByRole('button', { name: 'Pick model text…' })).toBeInTheDocument();
  });

  it('auto-installs a configured model text whose resource is matched but not installed', async () => {
    const installResource = vi.fn(async () => {});
    renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [UNINSTALLED_RESOURCE],
      installResource,
    });

    // Without auto-install, a configured-but-uninstalled model text is never installed and the
    // panel sits on an infinite spinner. It must instead kick off the install so it can resolve.
    await waitFor(() => expect(installResource).toHaveBeenCalledWith('uid-web'));
  });

  it('renders the editor once the configured resource finishes installing', async () => {
    const getResourceChapter = vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'ltr' }));
    const { rerender } = renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [UNINSTALLED_RESOURCE],
      getResourceChapter,
    });
    // Auto-installing a configured resource the user didn't pick reads "Installing…", not "Selecting…".
    expect(await screen.findByText('Installing resource…')).toBeInTheDocument();

    // Simulate the webview re-resolving the catalog after install: the resource is now installed.
    rerender(
      <ModelTextPanel
        {...makeProps({
          effectiveModelTexts: configuredModelText('uid-web'),
          dblResources: [INSTALLED_RESOURCE],
          getResourceChapter,
        })}
      />,
    );
    expect(await screen.findByTestId('editorial')).toBeInTheDocument();
  });

  it('does not re-attempt a failed install across re-renders (no retry storm)', async () => {
    const installResource = vi.fn(async () => {
      throw new Error('install failed');
    });
    const { rerender } = renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [UNINSTALLED_RESOURCE],
      installResource,
    });
    await screen.findByRole('button', { name: 'Try again' });
    expect(installResource).toHaveBeenCalledTimes(1);

    // The webview re-resolves the list (new array identity) with the same still-uninstalled
    // resource; the failed-uid guard must suppress a fresh install attempt.
    rerender(
      <ModelTextPanel
        {...makeProps({
          effectiveModelTexts: configuredModelText('uid-web'),
          dblResources: [{ ...UNINSTALLED_RESOURCE }],
          installResource,
        })}
      />,
    );
    await screen.findByRole('button', { name: 'Try again' });
    expect(installResource).toHaveBeenCalledTimes(1);
  });

  it('recovers to the editor when a retried install succeeds', async () => {
    // Default impl resolves; only the first attempt rejects — so the retried install succeeds.
    const installResource = vi.fn(async () => {});
    installResource.mockRejectedValueOnce(new Error('install failed'));
    const getResourceChapter = vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'ltr' }));
    const { rerender } = renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [UNINSTALLED_RESOURCE],
      installResource,
      getResourceChapter,
    });

    // First attempt fails → recovery state.
    fireEvent.click(await screen.findByRole('button', { name: 'Try again' }));
    await waitFor(() => expect(installResource).toHaveBeenCalledTimes(2));

    // The retry's install succeeds; the webview re-resolves with the resource installed.
    rerender(
      <ModelTextPanel
        {...makeProps({
          effectiveModelTexts: configuredModelText('uid-web'),
          dblResources: [INSTALLED_RESOURCE],
          installResource,
          getResourceChapter,
        })}
      />,
    );
    expect(await screen.findByTestId('editorial')).toBeInTheDocument();
  });

  it('shows the installing state while auto-install is in flight', async () => {
    // A never-resolving install keeps the panel in the installing state so it is observable.
    const installResource = vi.fn(() => new Promise<void>(() => {}));
    renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [UNINSTALLED_RESOURCE],
      installResource,
    });

    // Guards the widened render gate: the auto-install case must show the labeled (finite-looking)
    // installing state, not fall through to a bare spinner.
    expect(await screen.findByText('Installing resource…')).toBeInTheDocument();
  });

  it('surfaces a recoverable retry state when auto-install fails, and retries the same resource', async () => {
    const installResource = vi.fn(async () => {
      throw new Error('install failed');
    });
    renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [UNINSTALLED_RESOURCE],
      installResource,
    });

    // Instead of spinning forever on the error path, the panel surfaces the failure and offers a
    // retry.
    const retryButton = await screen.findByRole('button', { name: 'Try again' });
    expect(screen.getByText("The model text couldn't be installed.")).toBeInTheDocument();

    // The failing install is attempted exactly once — no retry storm.
    expect(installResource).toHaveBeenCalledTimes(1);

    // Retry re-attempts installing the same configured resource, so an admin (or user) choice is
    // recoverable without opening the picker.
    fireEvent.click(retryButton);
    await waitFor(() => expect(installResource).toHaveBeenCalledTimes(2));
  });

  it('does not auto-install a model text whose resource is already installed', async () => {
    const installResource = vi.fn(async () => {});
    const getResourceChapter = vi.fn(async () => ({ usj: undefined, textDirection: 'ltr' }));
    renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [INSTALLED_RESOURCE],
      installResource,
      getResourceChapter,
    });

    // An installed resource resolves straight to reading its chapter (no install step). Waiting on
    // that read also lets the panel's async state updates settle inside `act`.
    await waitFor(() => expect(getResourceChapter).toHaveBeenCalled());
    expect(installResource).not.toHaveBeenCalled();
  });

  it('offers the picker (not a dead end) when a configured reference cannot be resolved', async () => {
    // A configured model text that is not a resolvable DBL resource (here a project reference) must
    // not spin forever, and must not be a dead end — it shows a not-found state with a way to
    // recover by picking another.
    const showResourcePicker = vi.fn(async () => undefined);
    renderPanel({
      effectiveModelTexts: {
        dataVersion: '1.0.0',
        items: [{ type: 'project', id: 'p1', name: 'Some Project', source: 'admin' }],
      },
      dblResources: [],
      showResourcePicker,
    });
    expect(screen.getByText('The selected model text could not be found.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pick model text…' }));
    await waitFor(() => expect(showResourcePicker).toHaveBeenCalled());
  });

  it('hints at the connection in the install-failed state when offline', async () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    const installResource = vi.fn(async () => {
      throw new Error('offline');
    });
    renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [UNINSTALLED_RESOURCE],
      installResource,
    });
    expect(
      await screen.findByText(
        "The model text couldn't be installed. Check your connection and try again.",
      ),
    ).toBeInTheDocument();
  });

  it('shows the book-not-available message when the model text lacks the current book', async () => {
    const getResourceChapter = vi.fn(async () => {
      throw new Error('Book number 1 not found in project project-web.');
    });
    renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
    });

    expect(
      await screen.findByText(
        'This book does not exist in this model text. Choose a different model text or go to a book it contains.',
      ),
    ).toBeInTheDocument();
    // The blank editor is the bug being fixed: it gave the user no reason for the emptiness.
    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
    // The label header stays, so the message is attributed to a named model text rather than
    // floating in an anonymous panel.
    expect(screen.getByTestId('model-text-header')).toBeInTheDocument();
  });

  it('keeps showing the editor for an unrelated fetch failure', async () => {
    const getResourceChapter = vi.fn(async () => {
      throw new Error('Project project-web is not available');
    });
    renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
    });

    // Only a missing book earns the message. Claiming "this book is not in this text" for any
    // failure would state something the panel does not actually know.
    expect(await screen.findByTestId('editorial')).toBeInTheDocument();
    expect(
      screen.queryByText(
        'This book does not exist in this model text. Choose a different model text or go to a book it contains.',
      ),
    ).not.toBeInTheDocument();
  });

  it('clears the message when the user navigates to a book the model text does have', async () => {
    const getResourceChapter = vi.fn(async (_projectId: string, ref: { book: string }) => {
      if (ref.book === 'GEN') throw new Error('Book number 1 not found in project project-web.');
      return { usj: SAMPLE_USJ, textDirection: 'ltr' };
    });
    const props = {
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
    };
    const { rerender } = renderPanel({
      ...props,
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
    });
    expect(
      await screen.findByText(
        'This book does not exist in this model text. Choose a different model text or go to a book it contains.',
      ),
    ).toBeInTheDocument();

    rerender(
      <ModelTextPanel
        {...makeProps({
          ...props,
          scrRef: { book: 'MAT', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
        })}
      />,
    );

    // A stale message is its own bug: it would tell the user a book is missing while its text is
    // right there to be rendered.
    expect(await screen.findByTestId('editorial')).toBeInTheDocument();
    expect(
      screen.queryByText(
        'This book does not exist in this model text. Choose a different model text or go to a book it contains.',
      ),
    ).not.toBeInTheDocument();
  });

  it('shows the empty-chapter message instead of the editor when the chapter has no content', async () => {
    // A blank chapter arrives as a successful, empty USJ — not as an error — so the missing-book
    // branch never sees it. Without its own branch the read-only editor renders with nothing set and
    // shows `Editorial`'s "enter some Scripture" prompt: an edit invitation in a text the reader
    // cannot edit.
    const getResourceChapter = vi.fn(async () => ({ usj: BLANK_USJ, textDirection: 'ltr' }));
    renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
    });

    // `role="status"` asserted alongside the text because this region swaps in place as the user
    // navigates, so the live region is what announces it instead of the model text going silent.
    expect(await screen.findByRole('status')).toHaveTextContent(
      'This chapter is empty in this resource.',
    );
    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
  });

  it('distinguishes a blank chapter from a book the resource does not have', async () => {
    // The two states have different causes and different wording; a blank chapter must not borrow
    // the missing-book sentence, which would tell the reader the book is absent when it is present.
    const getResourceChapter = vi.fn(async () => ({ usj: BLANK_USJ, textDirection: 'ltr' }));
    renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
    });

    await screen.findByText('This chapter is empty in this resource.');
    expect(
      screen.queryByText(
        'This book does not exist in this model text. Choose a different model text or go to a book it contains.',
      ),
    ).not.toBeInTheDocument();
  });

  it('does not claim the chapter is empty while the next chapter is still loading', async () => {
    // `usj` keeps the PREVIOUS chapter's content until the new load lands, so navigating away from a
    // blank chapter would leave the message painted over a chapter that is still arriving. The
    // blank-chapter branch has to be gated on the load having finished.
    const getResourceChapter = vi.fn(async () => ({ usj: BLANK_USJ, textDirection: 'ltr' }));
    const { rerender } = renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    });
    await screen.findByText('This chapter is empty in this resource.');

    // The next chapter's load never settles, so the in-flight state is observable.
    const neverResolves = vi.fn(() => new Promise<never>(() => {}));
    rerender(
      <ModelTextPanel
        {...makeProps({
          effectiveModelTexts: configuredModelText('uid-web'),
          dblResources: [INSTALLED_RESOURCE],
          getResourceChapter: neverResolves,
          scrRef: { book: 'GEN', chapterNum: 2, verseNum: 1 },
        })}
      />,
    );
    expect(screen.queryByText('This chapter is empty in this resource.')).not.toBeInTheDocument();
  });

  it('recovers to the editor when navigating from a blank chapter to one with content', async () => {
    // The blank-chapter state is derived from the current USJ rather than latched, so a populated
    // chapter must render the editor again instead of leaving the panel stuck on the message.
    const getResourceChapter = vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'ltr' }));
    getResourceChapter.mockResolvedValueOnce({ usj: BLANK_USJ, textDirection: 'ltr' });
    const { rerender } = renderPanel({
      effectiveModelTexts: configuredModelText('uid-web'),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    });
    expect(await screen.findByText('This chapter is empty in this resource.')).toBeInTheDocument();

    rerender(
      <ModelTextPanel
        {...makeProps({
          effectiveModelTexts: configuredModelText('uid-web'),
          dblResources: [INSTALLED_RESOURCE],
          getResourceChapter,
          scrRef: { book: 'GEN', chapterNum: 2, verseNum: 1 },
        })}
      />,
    );
    expect(await screen.findByTestId('editorial')).toBeInTheDocument();
    expect(screen.queryByText('This chapter is empty in this resource.')).not.toBeInTheDocument();
  });
});
