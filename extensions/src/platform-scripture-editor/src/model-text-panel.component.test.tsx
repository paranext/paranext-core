// @vitest-environment jsdom
import { afterEach, describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReferenceList } from 'platform-scripture';
import type { EffectiveResourceReferenceListState } from './use-effective-resource-reference-list.hook';
import {
  MODEL_TEXT_EDITOR_CONTAINER_TEST_ID,
  ModelTextPanel,
  ModelTextPanelProps,
} from './model-text-panel.component';

/**
 * Records every `setUsj` the panel pushes into the editor, across editor instances.
 *
 * Shared rather than created per instance because the panel UNMOUNTS `Editorial` to show a message
 * and remounts it on the way back to content — a fresh editor holds nothing, so what the tests
 * below need to see is whether the panel re-fed it. A per-instance spy nobody captures makes "the
 * editor is on screen" the only observable fact, which a permanently blank editor also satisfies.
 */
const setUsjSpy = vi.fn();

vi.mock('@eten-tech-foundation/platform-editor', () => ({
  Editorial: React.forwardRef((_props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    React.useImperativeHandle(ref, () => ({ setUsj: setUsjSpy }));
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
  '%webView_modelTextPanel_catalogUnavailable%': "Couldn't load the list of available resources.",
  '%webView_modelTextPanel_loading%': 'Loading…',
  '%webView_modelTextPanel_settingsUnavailable%':
    "Couldn't load your model text. It will appear once it's available.",
  '%webView_resourcePanel_textUnavailable%': 'This text could not be loaded.',
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

/** Synthetic non-DBL entry (dblEntryUid === projectId) as returned by getLocalNonDblResources. */
const LOCAL_NON_DBL_RESOURCE: DblResourceData = {
  dblEntryUid: 'proj-local',
  projectId: 'proj-local',
  displayName: 'LocalRes',
  fullName: 'LocalRes',
  bestLanguageName: '',
  type: 'ScriptureResource',
  size: 0,
  installed: true,
  updateAvailable: false,
};

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

/** Wraps a list in the hook's `ready` state — the only state that may carry one. */
function readyState(list: EffectiveResourceReferenceList): EffectiveResourceReferenceListState {
  return { status: 'ready', list };
}

function makeProps(overrides: Partial<ModelTextPanelProps> = {}): ModelTextPanelProps {
  return {
    localizedStrings: STRINGS,
    hasProject: true,
    modelTextsState: readyState({ dataVersion: '1.0.0', items: [] }),
    isCatalogReady: true,
    hasCatalogError: false,
    onRetryCatalog: vi.fn(),
    dblResources: [],
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
  // Module-scoped, so it outlives `restoreAllMocks` and has to be cleared explicitly.
  setUsjSpy.mockClear();
});

describe('ModelTextPanel', () => {
  it('shows the "Pick model text" empty state when no model text is configured', () => {
    renderPanel();
    expect(screen.getByRole('button', { name: 'Pick model text…' })).toBeInTheDocument();
  });

  it('auto-installs a configured model text whose resource is matched but not installed', async () => {
    const installResource = vi.fn(async () => {});
    renderPanel({
      modelTextsState: readyState(configuredModelText('uid-web')),
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
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [UNINSTALLED_RESOURCE],
      getResourceChapter,
    });
    // Auto-installing a configured resource the user didn't pick reads "Installing…", not "Selecting…".
    expect(await screen.findByText('Installing resource…')).toBeInTheDocument();

    // Simulate the webview re-resolving the catalog after install: the resource is now installed.
    rerender(
      <ModelTextPanel
        {...makeProps({
          modelTextsState: readyState(configuredModelText('uid-web')),
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
      modelTextsState: readyState(configuredModelText('uid-web')),
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
          modelTextsState: readyState(configuredModelText('uid-web')),
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
      modelTextsState: readyState(configuredModelText('uid-web')),
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
          modelTextsState: readyState(configuredModelText('uid-web')),
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
      modelTextsState: readyState(configuredModelText('uid-web')),
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
      modelTextsState: readyState(configuredModelText('uid-web')),
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
      modelTextsState: readyState(configuredModelText('uid-web')),
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
    // A configured model text whose DBL uid is not in the catalog must not spin forever, and must
    // not be a dead end — it shows a not-found state with a way to recover by picking another.
    const showResourcePicker = vi.fn(async () => undefined);
    renderPanel({
      modelTextsState: readyState({
        dataVersion: '1.0.0',
        items: [{ type: 'dblResource', id: 'unknown-uid', name: 'Unknown', source: 'admin' }],
      }),
      dblResources: [],
      showResourcePicker,
    });
    expect(screen.getByText('The selected model text could not be found.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pick model text…' }));
    await waitFor(() => expect(showResourcePicker).toHaveBeenCalled());
  });

  it('loads a configured ProjectReference model text directly by project ID', async () => {
    // Locally-installed non-DBL resources (added via selectTextConnection as ProjectReferences)
    // are resolvable directly by project ID when the resource is in the installed list.
    const getResourceChapter = vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'ltr' }));
    renderPanel({
      modelTextsState: readyState({
        dataVersion: '1.0.0',
        items: [{ type: 'project', id: 'proj-local', name: 'LocalRes', source: 'admin' }],
      }),
      dblResources: [LOCAL_NON_DBL_RESOURCE],
      getResourceChapter,
    });
    await waitFor(() =>
      expect(getResourceChapter).toHaveBeenCalledWith('proj-local', expect.anything()),
    );
    expect(await screen.findByTestId('editorial')).toBeInTheDocument();
  });

  it('offers the picker (not a dead end) when a ProjectReference points to an uninstalled project', async () => {
    // An admin-shared model text pointing at a project the user does not have must not render a
    // blank editor — it must show the not-found state with a way to pick another.
    const showResourcePicker = vi.fn(async () => undefined);
    renderPanel({
      modelTextsState: readyState({
        dataVersion: '1.0.0',
        items: [{ type: 'project', id: 'missing-project', name: 'Missing', source: 'admin' }],
      }),
      dblResources: [], // project not in the installed list
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
      modelTextsState: readyState(configuredModelText('uid-web')),
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
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
    });

    expect(
      await screen.findByText(
        'This book does not exist in this model text. Choose a different model text or go to a book it contains.',
      ),
    ).toBeInTheDocument();
    // No editor alongside the message: a blank editor would give the user no reason for the
    // emptiness, and its placeholder invites an edit this text does not accept. It is HIDDEN rather
    // than unmounted, so the reader sees only the message while the panel keeps one editor instance
    // instead of rebuilding Lexical each time a message comes and goes.
    expect(screen.getByTestId(MODEL_TEXT_EDITOR_CONTAINER_TEST_ID)).toHaveClass('tw:hidden');
    // The label header stays, so the message is attributed to a named model text rather than
    // floating in an anonymous panel.
    expect(screen.getByTestId('model-text-header')).toBeInTheDocument();
  });

  it('names an unrelated fetch failure rather than spinning or showing a blank editor', async () => {
    const getResourceChapter = vi.fn(async () => {
      throw new Error('Project project-web is not available');
    });
    renderPanel({
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
    });

    // Only a missing book earns the message. Claiming "this book is not in this text" for any
    // failure would state something the panel does not actually know.
    expect(
      screen.queryByText(
        'This book does not exist in this model text. Choose a different model text or go to a book it contains.',
      ),
    ).not.toBeInTheDocument();
    // The failure is named instead. A spinner would be a false claim here: the fetch already
    // rejected and nothing retries it until the reference or the model text changes, so the progress
    // it promises never arrives.
    expect(await screen.findByText('This text could not be loaded.')).toBeInTheDocument();
    // The editor is hidden behind the message rather than showing Lexical's "Enter some Scripture…"
    // placeholder, and is never fed, since there is no USJ to feed it.
    await waitFor(() =>
      expect(screen.getByTestId(MODEL_TEXT_EDITOR_CONTAINER_TEST_ID)).toHaveClass('tw:hidden'),
    );
    expect(setUsjSpy).not.toHaveBeenCalled();
  });

  it('clears the message when the user navigates to a book the model text does have', async () => {
    const getResourceChapter = vi.fn(async (_projectId: string, ref: { book: string }) => {
      if (ref.book === 'GEN') throw new Error('Book number 1 not found in project project-web.');
      return { usj: SAMPLE_USJ, textDirection: 'ltr' };
    });
    const props = {
      modelTextsState: readyState(configuredModelText('uid-web')),
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
    // The editor holds nothing until the panel feeds it, so asserting only that it is shown would
    // pass just as well over a permanently blank editor showing Lexical's "Enter some Scripture…"
    // placeholder.
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalledWith(SAMPLE_USJ));
  });

  it('shows the empty-chapter message instead of the editor when the chapter has no content', async () => {
    // A blank chapter arrives as a successful, empty USJ — not as an error — so the missing-book
    // branch never sees it. Without its own branch the read-only editor renders with nothing set and
    // shows `Editorial`'s "enter some Scripture" prompt: an edit invitation in a text the reader
    // cannot edit.
    const getResourceChapter = vi.fn(async () => ({ usj: BLANK_USJ, textDirection: 'ltr' }));
    renderPanel({
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
    });

    // `role="status"` asserted alongside the text because this region swaps in place as the user
    // navigates, so the live region is what announces it instead of the model text going silent.
    expect(await screen.findByRole('status')).toHaveTextContent(
      'This chapter is empty in this resource.',
    );
    expect(screen.getByTestId(MODEL_TEXT_EDITOR_CONTAINER_TEST_ID)).toHaveClass('tw:hidden');
  });

  it('distinguishes a blank chapter from a book the resource does not have', async () => {
    // The two states have different causes and different wording; a blank chapter must not borrow
    // the missing-book sentence, which would tell the reader the book is absent when it is present.
    const getResourceChapter = vi.fn(async () => ({ usj: BLANK_USJ, textDirection: 'ltr' }));
    renderPanel({
      modelTextsState: readyState(configuredModelText('uid-web')),
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
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    });
    await screen.findByText('This chapter is empty in this resource.');
    const editorBeforeNavigating = screen.getByTestId('editorial');

    // The next chapter's load never settles, so the in-flight state is observable.
    const neverResolves = vi.fn(() => new Promise<never>(() => {}));
    rerender(
      <ModelTextPanel
        {...makeProps({
          modelTextsState: readyState(configuredModelText('uid-web')),
          dblResources: [INSTALLED_RESOURCE],
          getResourceChapter: neverResolves,
          scrRef: { book: 'GEN', chapterNum: 2, verseNum: 1 },
        })}
      />,
    );
    expect(screen.queryByText('This chapter is empty in this resource.')).not.toBeInTheDocument();
    // Nor the text. `usj` still holds the PREVIOUS chapter's content, so showing the editor here
    // would show the chapter the user just left as though it were the one they asked for.
    expect(screen.getByTestId(MODEL_TEXT_EDITOR_CONTAINER_TEST_ID)).toHaveClass('tw:hidden');
    // But the editor itself SURVIVES the wait. Node identity, not merely presence: unmounting
    // `Editorial` disposes the whole `LexicalComposer` — plugins and nodes deregister, the DOM is
    // torn down — and every chapter step goes through this in-flight window, so unmounting here
    // would pay a full editor rebuild plus a whole-chapter `setUsj` on the panel's primary
    // interaction. Presence alone would pass over a fresh instance.
    expect(screen.getByTestId('editorial')).toBe(editorBeforeNavigating);
    // The label header stays mounted across the wait, so the panel does not go anonymous between
    // every chapter step.
    expect(screen.getByTestId('model-text-header')).toBeInTheDocument();
  });

  it('does not call a book absent from the model text an empty chapter', async () => {
    // Both states can be true of the state in hand at once: navigating from a blank chapter into a
    // book the model text lacks leaves the previous chapter's blank USJ in `usj` while the new
    // failure has not landed yet. Claiming "this chapter is empty" about a book that is absent
    // entirely is the wrong explanation, so nothing may be asserted until the answer in hand is the
    // answer to the reference on screen.
    const getResourceChapter = vi.fn(async (_projectId: string, ref: { book: string }) => {
      if (ref.book === 'EXO') throw new Error('Book number 2 not found in project project-web.');
      return { usj: BLANK_USJ, textDirection: 'ltr' };
    });
    const props = {
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
    };
    const { rerender } = renderPanel({
      ...props,
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
    });
    await screen.findByText('This chapter is empty in this resource.');

    rerender(
      <ModelTextPanel
        {...makeProps({
          ...props,
          scrRef: { book: 'EXO', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
        })}
      />,
    );

    expect(
      await screen.findByText(
        'This book does not exist in this model text. Choose a different model text or go to a book it contains.',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText('This chapter is empty in this resource.')).not.toBeInTheDocument();
  });

  it('recovers to the editor when navigating from a blank chapter to one with content', async () => {
    // The blank-chapter state is derived from the current USJ rather than latched, so a populated
    // chapter must render the editor again instead of leaving the panel stuck on the message.
    const getResourceChapter = vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'ltr' }));
    getResourceChapter.mockResolvedValueOnce({ usj: BLANK_USJ, textDirection: 'ltr' });
    const { rerender } = renderPanel({
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    });
    expect(await screen.findByText('This chapter is empty in this resource.')).toBeInTheDocument();

    rerender(
      <ModelTextPanel
        {...makeProps({
          modelTextsState: readyState(configuredModelText('uid-web')),
          dblResources: [INSTALLED_RESOURCE],
          getResourceChapter,
          scrRef: { book: 'GEN', chapterNum: 2, verseNum: 1 },
        })}
      />,
    );
    expect(await screen.findByTestId('editorial')).toBeInTheDocument();
    expect(screen.queryByText('This chapter is empty in this resource.')).not.toBeInTheDocument();
  });
  it('shows the settings-unavailable error instead of the empty prompt when the setting cannot be read', () => {
    // An unreadable setting is not "nothing configured": offering only the picker would invite the
    // user to reconfigure a model text that may already be set.
    render(<ModelTextPanel {...makeProps({ modelTextsState: { status: 'error' } })} />);

    expect(
      screen.getByText("Couldn't load your model text. It will appear once it's available."),
    ).toBeInTheDocument();
    expect(screen.queryByText('No model text selected.')).not.toBeInTheDocument();
  });

  it('offers no controls in the settings-error state', () => {
    render(<ModelTextPanel {...makeProps({ modelTextsState: { status: 'error' } })} />);

    // Nothing in this panel can re-drive the project-setting read, so any button here would be
    // inert. The message carries the recovery expectation instead; the setting stays watched and
    // the panel recovers on its own.
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does not claim the model text is missing while the resource catalog has not arrived', () => {
    // A configured DBL resource matches nothing until the catalog lands, so answering "could not be
    // found" here is a guess dressed as a fact — and it renders a Pick button that invites the user
    // to replace a model text that is configured and fine.
    render(
      <ModelTextPanel
        {...makeProps({
          modelTextsState: readyState(configuredModelText('uid-web')),
          dblResources: [],
          isCatalogReady: false,
        })}
      />,
    );

    expect(
      screen.queryByText('The selected model text could not be found.'),
    ).not.toBeInTheDocument();
    // Asserting only the not-found string left this blind to the mutation it exists to guard:
    // flipping the pre-catalog branch from 'loading' to 'empty' kept it green. The empty prompt's
    // absence and the spinner's presence are what actually pin AC-1 here.
    expect(screen.queryByText('No model text selected.')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('does not show the empty prompt while the configured list is still resolving', () => {
    // The defect this guards: the loading and empty states shared one branch, so any gap in the
    // nested ternary that re-decided between them fell through to the empty prompt.
    render(
      <ModelTextPanel
        {...makeProps({
          modelTextsState: { status: 'loading' },
        })}
      />,
    );

    expect(screen.queryByText('No model text selected.')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Pick model text…' })).not.toBeInTheDocument();
  });
});
