// @vitest-environment jsdom
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { CONTENT_ZOOM_ROOT_ATTRIBUTE } from 'platform-bible-react';
import { BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS } from 'platform-bible-react/experimental';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReferenceList, ResourceReferenceList } from 'platform-scripture';
import type { EffectiveResourceReferenceListState } from './use-effective-resource-reference-list.hook';
import { MODEL_TEXT_PANEL_STRING_KEYS } from './model-text-panel.const';
import {
  MODEL_TEXT_EDITOR_CONTAINER_TEST_ID,
  ModelTextPanel,
  ModelTextPanelProps,
  WRITTEN_PICK_MAX_WAIT_MS,
} from './model-text-panel.component';
import { RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID } from './resource-book-not-available.component';

/**
 * Records every `setUsj` the panel pushes into the editor, across editor instances.
 *
 * Shared rather than created per instance because the panel UNMOUNTS `Editorial` to show a message
 * and remounts it on the way back to content — a fresh editor holds nothing, so what the tests
 * below need to see is whether the panel re-fed it. A per-instance spy nobody captures makes "the
 * editor is on screen" the only observable fact, which a permanently blank editor also satisfies.
 */
const setUsjSpy = vi.fn();

/** Collects the `options` prop passed to each Editorial render. */
const capturedEditorOptions = vi.fn();

/** Called once per Editorial mount, so a test can tell a hidden editor from a rebuilt one. */
const editorMountSpy = vi.fn();

vi.mock('@eten-tech-foundation/platform-editor', () => ({
  Editorial: React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    capturedEditorOptions(props.options);
    React.useImperativeHandle(ref, () => ({ setUsj: setUsjSpy }));
    React.useEffect(() => {
      editorMountSpy();
    }, []);
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

// The empty-state prompt as the STRINGS below render it (`{summary}` filled in). One constant, so
// the "prompt is not shown" checks cannot go vacuous when the fixture text changes.
const EMPTY_PROMPT = 'No Base or Model text selected. Pick one.';

const STRINGS = {
  '%webView_modelTextPanel_installing%': 'Installing resource…',
  '%webView_modelTextPanel_selecting%': 'Selecting resource…',
  '%webView_modelTextPanel_noProject%': 'No project.',
  '%webView_modelTextPanel_pickModelText%': 'Pick model text…',
  '%webView_modelTextPanel_changeText_ariaLabel%': '{textName} – change model text',
  '%webView_modelTextPanel_emptyState_pickText%': 'Pick a text…',
  '%webView_modelTextPanel_unknownResource%': 'The selected model text could not be found.',
  '%webView_modelTextPanel_unknownResource_adminChoice%':
    'The selected model text could not be found. A project admin can choose a different model text in the team layout.',
  '%webView_modelTextPanel_installFailed%': "The model text couldn't be installed.",
  '%webView_modelTextPanel_installFailedOffline%':
    "The model text couldn't be installed. Check your connection and try again.",
  '%webView_modelTextPanel_installedButUnavailable%':
    "The model text is installed but couldn't be opened.",
  '%webView_modelTextPanel_retry%': 'Try again',
  '%webView_modelTextPanel_emptyState_baseOrModel_prompt%':
    'No Base or Model text selected. {summary}',
  '%webView_modelTextPanel_emptyState_baseOrModel_summary%': 'Pick one.',
  '%webView_modelTextPanel_bookNotAvailable%':
    'This book does not exist in this model text. Choose a different model text or go to a book it contains.',
  '%webView_modelTextPanel_bookNotAvailable_adminChoice%':
    'This book does not exist in this model text. Go to a book it contains. A project admin can choose a different model text in the team layout.',
  '%webView_platformScriptureEditor_emptyChapter_messageResource%':
    'This chapter is empty in this resource.',
  '%webView_modelTextPanel_catalogUnavailable%': "Couldn't load the list of available resources.",
  '%webView_modelTextPanel_loading%': 'Loading…',
  '%webView_modelTextPanel_settingsUnavailable%':
    "Couldn't load your model text. It will appear once it's available.",
  '%webView_resourcePanel_textUnavailable%': 'This text could not be loaded.',
  '%webView_modelTextPanel_emptyState_moreInfo%': 'More info',
  '%webView_modelTextPanel_emptyState_lessInfo%': 'Less info',
  '%webView_modelTextPanel_emptyState_baseOrModel_intro%': 'Intro text.',
  '%webView_modelTextPanel_emptyState_baseOrModel_baseTerm%': 'Base:',
  '%webView_modelTextPanel_emptyState_baseOrModel_baseDefinition%': 'Base definition.',
  '%webView_modelTextPanel_emptyState_baseOrModel_modelTerm%': 'Model:',
  '%webView_modelTextPanel_emptyState_baseOrModel_modelDefinition%': 'Model definition.',
  '%webView_modelTextPanel_emptyState_baseOrModel_admin%': 'Admin text.',
  '%webView_modelTextPanel_emptyState_baseOrModel_copyrightTerm%': 'Note:',
  '%webView_modelTextPanel_emptyState_baseOrModel_copyrightNote%': 'Copyright text.',
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

/** The user's own choice: the admin has chosen nothing, so every item is user-sourced. */
function userChosenModelTexts(...dblEntryUids: string[]): EffectiveResourceReferenceList {
  return {
    dataVersion: '1.0.0',
    items: dblEntryUids.map((id) => ({ type: 'dblResource', id, name: id, source: 'user' })),
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
    resourceCopyLimit: undefined,
    ...overrides,
  };
}

function renderPanel(overrides: Partial<ModelTextPanelProps> = {}) {
  const props = makeProps(overrides);
  return { props, ...render(<ModelTextPanel {...props} />) };
}

/**
 * Renders a configured model text whose install resolves, then replays the refetch that success
 * triggers: the catalog clears while the fetch is in flight and comes back still reporting the
 * resource uninstalled. That is what a no-op install against a stale catalog looks like.
 */
async function renderWithCatalogStaleAfterInstall(overrides: Partial<ModelTextPanelProps> = {}) {
  const installResource = vi.fn(async () => {});
  const props = makeProps({
    modelTextsState: readyState(configuredModelText('uid-web')),
    dblResources: [UNINSTALLED_RESOURCE],
    installResource,
    ...overrides,
  });
  const { rerender } = render(<ModelTextPanel {...props} />);
  await waitFor(() => expect(installResource).toHaveBeenCalledTimes(1));
  rerender(<ModelTextPanel {...props} dblResources={[]} />);
  rerender(<ModelTextPanel {...props} dblResources={[{ ...UNINSTALLED_RESOURCE }]} />);
  return { installResource, props, rerender };
}

afterEach(() => {
  // restoreAllMocks (not just clearAllMocks) so a navigator.onLine getter spy can't leak between tests.
  vi.restoreAllMocks();
  // Module-scoped, so it outlives `restoreAllMocks` and has to be cleared explicitly.
  setUsjSpy.mockClear();
  capturedEditorOptions.mockClear();
  editorMountSpy.mockClear();
});

describe('ModelTextPanel', () => {
  // The column holds a Base or a Model text, so the empty state's button names neither.
  it('shows the "Pick a text" empty state when no model text is configured', () => {
    renderPanel();
    expect(screen.getByRole('button', { name: 'Pick a text…' })).toBeInTheDocument();
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

  it('re-reads the catalog as well as re-installing when the user retries', async () => {
    // The install failed against a catalog snapshot, so replaying it against that same snapshot
    // could only fail again. Re-reading is the half of the retry that can change the answer.
    const installResource = vi.fn(async () => {
      throw new Error('install failed');
    });
    const onRetryCatalog = vi.fn();
    renderPanel({
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [UNINSTALLED_RESOURCE],
      installResource,
      onRetryCatalog,
    });

    fireEvent.click(await screen.findByRole('button', { name: 'Try again' }));

    expect(onRetryCatalog).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(installResource).toHaveBeenCalledTimes(2));
  });

  it('offers a retry rather than reinstalling when a successful install leaves the flag stale', async () => {
    // Re-firing the install here would loop: every success asks for a re-read, which hands back the
    // same uid.
    const { installResource } = await renderWithCatalogStaleAfterInstall();

    await screen.findByRole('button', { name: 'Try again' });
    expect(installResource).toHaveBeenCalledTimes(1);
  });

  it('shows the model text in the same panel once a retry re-reads a catalog that has caught up', async () => {
    // The whole recovery, with no remount: a no-op install against a stale flag, the retry, and a
    // re-read that finally reports the resource installed.
    setUsjSpy.mockClear();
    const getResourceChapter = vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'ltr' }));
    const onRetryCatalog = vi.fn();
    const { props, rerender } = await renderWithCatalogStaleAfterInstall({
      getResourceChapter,
      onRetryCatalog,
    });

    fireEvent.click(await screen.findByRole('button', { name: 'Try again' }));
    expect(onRetryCatalog).toHaveBeenCalledTimes(1);
    // The re-read the retry started: the catalog empties while in flight, then comes back current.
    rerender(<ModelTextPanel {...props} dblResources={[]} />);
    rerender(<ModelTextPanel {...props} dblResources={[INSTALLED_RESOURCE]} />);

    expect(await screen.findByTestId('editorial')).toBeInTheDocument();
    expect(getResourceChapter).toHaveBeenCalledWith('project-web', expect.anything());
    await waitFor(() => expect(setUsjSpy).toHaveBeenCalledWith(SAMPLE_USJ));
  });

  it('says the model text is installed, with no connection hint, when the catalog has not caught up', async () => {
    // Offline, but the no-op install succeeded: "couldn't be installed, check your connection" would
    // be wrong on both counts.
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    await renderWithCatalogStaleAfterInstall();

    expect(
      await screen.findByText("The model text is installed but couldn't be opened."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/couldn't be installed/)).not.toBeInTheDocument();
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
    // A model text the user picked whose DBL uid is not in the catalog must not spin forever, and
    // must not be a dead end — it shows a not-found state with a way to recover by picking another.
    const showResourcePicker = vi.fn(async () => undefined);
    renderPanel({
      modelTextsState: readyState({
        dataVersion: '1.0.0',
        items: [{ type: 'dblResource', id: 'unknown-uid', name: 'Unknown', source: 'user' }],
      }),
      dblResources: [],
      showResourcePicker,
    });
    expect(screen.getByText('The selected model text could not be found.')).toBeInTheDocument();
    // Like every full-panel state, it stays reachable in a pane shorter than its content.
    expect(
      screen.getByText('The selected model text could not be found.').closest('div'),
    ).toHaveClass('tw:justify-center-safe', 'tw:overflow-y-auto');

    fireEvent.click(screen.getByRole('button', { name: 'Pick model text…' }));
    await waitFor(() => expect(showResourcePicker).toHaveBeenCalled());
  });

  // The pick runs from a click handler, so nothing upstream awaits it. A rejection it does not handle
  // itself becomes an unhandled rejection inside the web view: no message, no log line. Starts from
  // an unresolvable project reference because its not-found state renders after the "Selecting…"
  // state, so a pick that left the panel stuck selecting would show here.
  it('logs a failed pick and returns to where the user was', async () => {
    const logger = { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() };
    const showResourcePicker = vi.fn(async () => INSTALLED_RESOURCE);
    renderPanel({
      modelTextsState: readyState({
        dataVersion: '1.0.0',
        items: [{ type: 'project', id: 'missing-project', name: 'Missing', source: 'user' }],
      }),
      showResourcePicker,
      getUserModelTexts: async () => {
        throw new Error('settings unreadable');
      },
      logger,
    });

    fireEvent.click(screen.getByRole('button', { name: 'Pick model text…' }));

    await waitFor(() =>
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringMatching(/while selecting uid-web: settings unreadable/),
      ),
    );
    expect(
      await screen.findByText('The selected model text could not be found.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Selecting resource…')).not.toBeInTheDocument();

    // And the failure released the one-pick guard: without that, one error would leave every Pick
    // button doing nothing, with nothing on screen to say why.
    fireEvent.click(screen.getByRole('button', { name: 'Pick model text…' }));
    expect(showResourcePicker).toHaveBeenCalledTimes(2);
  });

  // The picker itself can reject (the dialog service rejects an overlay a newer request replaced).
  it('logs a rejected picker and stays usable', async () => {
    const logger = { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() };
    const showResourcePicker = vi.fn(async (): Promise<DblResourceData | undefined> => {
      throw new Error('Overlay was replaced by a new request');
    });
    renderPanel({ showResourcePicker, logger });

    fireEvent.click(screen.getByRole('button', { name: 'Pick a text…' }));

    await waitFor(() =>
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringMatching(/while opening the picker: Overlay was replaced/),
      ),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Pick a text…' }));
    expect(showResourcePicker).toHaveBeenCalledTimes(2);
  });

  // A second click would replace the open picker, or race a pick whose resource is still
  // installing. The Pick button stays enabled through both, so the panel itself must ignore it.
  it('ignores a second pick until the first one finishes', async () => {
    let closePicker: (resource: DblResourceData | undefined) => void = () => {};
    const showResourcePicker = vi.fn(
      () =>
        new Promise<DblResourceData | undefined>((resolve) => {
          closePicker = resolve;
        }),
    );
    renderPanel({ showResourcePicker });

    fireEvent.click(screen.getByRole('button', { name: 'Pick a text…' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pick a text…' }));
    expect(showResourcePicker).toHaveBeenCalledTimes(1);

    await act(async () => closePicker(undefined));
    fireEvent.click(screen.getByRole('button', { name: 'Pick a text…' }));
    expect(showResourcePicker).toHaveBeenCalledTimes(2);
  });

  // A picked text that isn't installed downloads before the pick is written, so the empty state
  // would otherwise stay up through the download, with a Pick button that ignores every click.
  it('replaces the empty state with "Selecting…" while a picked text downloads', async () => {
    let finishInstall: () => void = () => {};
    const installResource = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishInstall = resolve;
        }),
    );
    renderPanel({ showResourcePicker: vi.fn(async () => UNINSTALLED_RESOURCE), installResource });

    fireEvent.click(screen.getByRole('button', { name: 'Pick a text…' }));
    await waitFor(() => expect(installResource).toHaveBeenCalled());

    expect(screen.getByRole('status')).toHaveTextContent('Selecting resource…');
    expect(screen.queryByRole('button', { name: 'Pick a text…' })).not.toBeInTheDocument();
    expect(screen.queryByText(EMPTY_PROMPT)).not.toBeInTheDocument();

    await act(async () => finishInstall());
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
    // A model text the user picked, pointing at a project not installed here, must not render a
    // blank editor — it must show the not-found state with a way to pick another.
    const showResourcePicker = vi.fn(async () => undefined);
    renderPanel({
      modelTextsState: readyState({
        dataVersion: '1.0.0',
        items: [{ type: 'project', id: 'missing-project', name: 'Missing', source: 'user' }],
      }),
      dblResources: [], // project not in the installed list
      showResourcePicker,
    });
    expect(screen.getByText('The selected model text could not be found.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pick model text…' }));
    await waitFor(() => expect(showResourcePicker).toHaveBeenCalled());
  });

  // A pick goes into the user's list behind the admin's item, so it could never replace the admin's
  // text on screen: offering one would be a button that does nothing.
  it.each([
    ['a DBL entry missing from the catalog', { type: 'dblResource', id: 'unknown-uid' }],
    ['a project not installed here', { type: 'project', id: 'missing-project' }],
  ] as const)(
    'points to the team layout, with no picker, when the admin chose %s',
    (_case, reference) => {
      renderPanel({
        modelTextsState: readyState({
          dataVersion: '1.0.0',
          items: [{ ...reference, name: 'Missing', source: 'admin' }],
        }),
        dblResources: [],
      });

      expect(
        screen.getByText(STRINGS['%webView_modelTextPanel_unknownResource_adminChoice%']),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('The selected model text could not be found.'),
      ).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    },
  );

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
      modelTextsState: readyState(userChosenModelTexts('uid-web')),
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
      modelTextsState: readyState(userChosenModelTexts('uid-web')),
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
      modelTextsState: readyState(userChosenModelTexts('uid-web')),
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
      modelTextsState: readyState(userChosenModelTexts('uid-web')),
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
      modelTextsState: readyState(userChosenModelTexts('uid-web')),
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
    expect(screen.queryByText(EMPTY_PROMPT)).not.toBeInTheDocument();
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
    expect(screen.queryByText(EMPTY_PROMPT)).not.toBeInTheDocument();
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

    expect(screen.queryByText(EMPTY_PROMPT)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Pick a text…' })).not.toBeInTheDocument();
  });

  it('puts the header label in its own element so a long resource name ellipsises', async () => {
    // jsdom has no layout, so this pins the structure the ellipsis depends on rather than the
    // rendered glyphs. `text-overflow` is inert on a flex container — its text becomes an anonymous
    // flex item and hard-clips mid-glyph — so the header box must NOT carry `truncate`, and the
    // label must sit in a child that does.
    renderPanel({
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter: vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'ltr' })),
    });

    const header = await screen.findByTestId('model-text-header');
    expect(header).toHaveClass('tw:flex');
    expect(header).not.toHaveClass('tw:truncate');

    const label = within(header).getByText('WEB - World English Bible');
    expect(label).not.toBe(header);
    expect(label).toHaveClass('tw:truncate');
  });

  it('prompts for a Base or Model text when none is configured', () => {
    render(<ModelTextPanel {...makeProps()} />);

    expect(screen.getByText(EMPTY_PROMPT)).toBeInTheDocument();
  });

  // The panel requests its strings from MODEL_TEXT_PANEL_STRING_KEYS, so a key the shared
  // explanation reads but the panel never requests would render as English fallback text in
  // every language.
  it('requests every string the shared Base/Model explanation reads', () => {
    BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS.forEach((key) =>
      expect(MODEL_TEXT_PANEL_STRING_KEYS).toContain(key),
    );
  });

  // The disclosure's expand/collapse behaviour is covered directly in
  // panel-state-views.component.test.tsx. What this panel owns is that it supplies one at all,
  // with the shared Base/Model explanation inside.
  it('renders the More info disclosure with the Base/Model explanation, terms in bold', () => {
    render(<ModelTextPanel {...makeProps()} />);
    const toggle = screen.getByRole('button', { name: 'More info' });
    const disclosure = document.getElementById(toggle.getAttribute('aria-controls') ?? '');

    // Inside the disclosure the toggle controls, in this order, with each term sharing a paragraph
    // with its own definition.
    const paragraphs = Array.from(disclosure?.querySelectorAll('p') ?? []);
    expect(paragraphs.map((p) => p.textContent?.replace(/\s+/g, ' '))).toEqual([
      'Intro text.',
      'Base: Base definition.',
      'Model: Model definition.',
      'Admin text.',
      'Note: Copyright text.',
    ]);
    ['Base:', 'Model:', 'Note:'].forEach((term) =>
      expect(screen.getByText(term).tagName).toBe('STRONG'),
    );
  });

  it('renders the resource text in the direction its project declares', async () => {
    const getResourceChapter = vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'rtl' }));
    renderPanel({
      modelTextsState: readyState({
        dataVersion: '1.0.0',
        items: [{ type: 'project', id: 'proj-local', name: 'LocalRes', source: 'admin' }],
      }),
      dblResources: [LOCAL_NON_DBL_RESOURCE],
      getResourceChapter,
    });
    const container = screen.getByTestId(MODEL_TEXT_EDITOR_CONTAINER_TEST_ID);
    // The container is hidden until the chapter has loaded, so this is the load completing.
    await waitFor(() => expect(container).not.toHaveClass('tw:hidden'));
    expect(container).toHaveAttribute('dir', 'rtl');
  });

  it('falls back to ltr for a text direction a project cannot declare', async () => {
    // A project always declares ltr or rtl (direction cannot be guessed for a minority language),
    // so `auto` never reaches the editor even if the setting somehow holds it.
    const getResourceChapter = vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'auto' }));
    renderPanel({
      modelTextsState: readyState({
        dataVersion: '1.0.0',
        items: [{ type: 'project', id: 'proj-local', name: 'LocalRes', source: 'admin' }],
      }),
      dblResources: [LOCAL_NON_DBL_RESOURCE],
      getResourceChapter,
    });
    const container = screen.getByTestId(MODEL_TEXT_EDITOR_CONTAINER_TEST_ID);
    await waitFor(() => expect(container).not.toHaveClass('tw:hidden'));
    expect(container).toHaveAttribute('dir', 'ltr');
  });

  it('marks the text inside the scroll box, so scrolling to a verse measures unzoomed pixels', async () => {
    // `scrollToVerse` adds a `getBoundingClientRect()` distance to the scroll box's `scrollTop`. A
    // rect read under a zoomed ancestor is in zoomed pixels while `scrollTop` is not, so a marker on
    // the scroll box or above it makes every scroll overshoot by the zoom factor.
    renderPanel({
      modelTextsState: readyState({
        dataVersion: '1.0.0',
        items: [{ type: 'project', id: 'proj-local', name: 'LocalRes', source: 'admin' }],
      }),
      dblResources: [LOCAL_NON_DBL_RESOURCE],
      getResourceChapter: vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'ltr' })),
    });
    const scrollBox = screen.getByTestId(MODEL_TEXT_EDITOR_CONTAINER_TEST_ID);
    await waitFor(() => expect(scrollBox).toHaveClass('tw:overflow-auto'));

    const marker = screen.getByTestId('editorial').closest(`[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`);
    expect(marker).not.toBeNull();
    expect(marker).not.toBe(scrollBox);
    expect(scrollBox.contains(marker)).toBe(true);
    expect(scrollBox.closest(`[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`)).toBeNull();
  });

  it('passes the resource copy limit into the editor options once the chapter has loaded', async () => {
    renderPanel({
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter: vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'ltr' })),
      resourceCopyLimit: 6,
    });

    await waitFor(() =>
      expect(capturedEditorOptions).toHaveBeenLastCalledWith(
        expect.objectContaining({ copyLimit: 6 }),
      ),
    );
  });

  it('blocks copying from the render that changes chapter until the new chapter has loaded', async () => {
    let resolveChapter2: (value: {
      usj: typeof SAMPLE_USJ;
      textDirection: string;
    }) => void = () => {};
    const getResourceChapter = vi.fn(async (_projectId: string, ref: { chapterNum: number }) =>
      ref.chapterNum === 1
        ? { usj: SAMPLE_USJ, textDirection: 'ltr' }
        : new Promise<{ usj: typeof SAMPLE_USJ; textDirection: string }>((resolve) => {
            resolveChapter2 = resolve;
          }),
    );
    const props = {
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter,
      resourceCopyLimit: 6,
    };
    const { rerender } = renderPanel({
      ...props,
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
    });
    await waitFor(() =>
      expect(capturedEditorOptions).toHaveBeenLastCalledWith(
        expect.objectContaining({ copyLimit: 6 }),
      ),
    );
    const rendersBeforeChange = capturedEditorOptions.mock.calls.length;

    // The new chapter's limit is already known when the reference changes.
    rerender(
      <ModelTextPanel
        {...makeProps({
          ...props,
          scrRef: { book: 'GEN', chapterNum: 2, verseNum: 1, versificationStr: 'English' },
          resourceCopyLimit: 20,
        })}
      />,
    );

    const [[optionsOnChange]] = capturedEditorOptions.mock.calls.slice(rendersBeforeChange);
    expect(optionsOnChange).toEqual(expect.objectContaining({ copyLimit: 0 }));
    expect(capturedEditorOptions).toHaveBeenLastCalledWith(
      expect.objectContaining({ copyLimit: 0 }),
    );

    await act(async () => resolveChapter2({ usj: SAMPLE_USJ, textDirection: 'ltr' }));
    expect(capturedEditorOptions).toHaveBeenLastCalledWith(
      expect.objectContaining({ copyLimit: 20 }),
    );
  });
});

describe('ModelTextPanel changing a model text the user chose', () => {
  const KJV: DblResourceData = {
    ...INSTALLED_RESOURCE,
    dblEntryUid: 'uid-kjv',
    displayName: 'KJV',
    fullName: 'King James Version',
    projectId: 'project-kjv',
  };
  const CHANGE_WEB = 'WEB - World English Bible – change model text';
  const CHANGE_KJV = 'KJV - King James Version – change model text';
  const USER_MISSING = STRINGS['%webView_modelTextPanel_bookNotAvailable%'];
  const ADMIN_MISSING = STRINGS['%webView_modelTextPanel_bookNotAvailable_adminChoice%'];
  /** What the panel receives once the user's pick of KJV is written: KJV first, WEB kept behind. */
  const AFTER_PICKING_KJV = readyState(userChosenModelTexts('uid-kjv', 'uid-web'));

  const withText = () => vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'ltr' }));
  /** WEB lacks Genesis; every other text has it. */
  const webLacksBook = () =>
    vi.fn(async (projectId: string) => {
      if (projectId === 'project-web')
        throw new Error('Book number 1 not found in project project-web.');
      return { usj: SAMPLE_USJ, textDirection: 'ltr' };
    });

  /** Props for WEB as the text the user chose, with KJV also installed. */
  function userChosenWebProps(overrides: Partial<ModelTextPanelProps> = {}) {
    return makeProps({
      dblResources: [INSTALLED_RESOURCE, KJV],
      getResourceChapter: withText(),
      modelTextsState: readyState(userChosenModelTexts('uid-web')),
      ...overrides,
    });
  }

  function renderUserChosenWeb(overrides: Partial<ModelTextPanelProps> = {}) {
    const props = userChosenWebProps(overrides);
    return { props, ...render(<ModelTextPanel {...props} />) };
  }

  /** A `setUserModelTexts` whose write stays pending until `finish` is called. */
  function heldWrite() {
    let resolveWrite: () => void = () => {};
    const setUserModelTexts = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveWrite = resolve;
        }),
    );
    return { setUserModelTexts, finish: () => act(async () => resolveWrite()) };
  }

  it('makes the header a button that opens the picker with only the text on screen selected', async () => {
    const showResourcePicker = vi.fn(async () => undefined);
    renderUserChosenWeb({
      modelTextsState: readyState(userChosenModelTexts('uid-web', 'uid-kjv')),
      showResourcePicker,
    });

    const header = await screen.findByRole('button', { name: CHANGE_WEB });
    expect(header).toHaveAttribute('data-testid', 'model-text-header');
    // The picker is a modal dialog. This also turns off `Button`'s 1px press nudge, which would
    // shift the whole row out of line with the editor toolbar.
    expect(header).toHaveAttribute('aria-haspopup', 'dialog');
    fireEvent.click(header);

    // Not ['uid-web', 'uid-kjv']: the picker can't select an "Already selected" row, so an earlier
    // pick listed there could never be chosen again.
    await waitFor(() => expect(showResourcePicker).toHaveBeenCalledWith(['uid-web']));
  });

  it('writes the newly picked text first in the user list', async () => {
    const setUserModelTexts = vi.fn<(list: ResourceReferenceList) => Promise<void>>(async () => {});
    renderUserChosenWeb({
      showResourcePicker: vi.fn(async () => KJV),
      getUserModelTexts: async () => ({
        dataVersion: '1.0.0',
        items: [{ type: 'dblResource', id: 'uid-web', name: 'WEB' }],
      }),
      setUserModelTexts,
    });

    fireEvent.click(await screen.findByRole('button', { name: CHANGE_WEB }));

    await waitFor(() => expect(setUserModelTexts).toHaveBeenCalledTimes(1));
    expect(setUserModelTexts.mock.calls[0][0].items[0]).toEqual({
      type: 'dblResource',
      id: 'uid-kjv',
      name: 'KJV',
    });
  });

  it('keeps the header a plain label when the admin chose the text', async () => {
    renderUserChosenWeb({ modelTextsState: readyState(configuredModelText('uid-web')) });

    const header = await screen.findByTestId('model-text-header');
    expect(within(header).getByText('WEB - World English Bible')).toBeInTheDocument();
    expect(header.tagName).not.toBe('BUTTON');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows the admin choice, with no change button, once the admin chooses a text', async () => {
    // The admin's choice overrides the user's without deleting it: the user's item stays in the
    // merged list, after the admin's.
    const setUserModelTexts = vi.fn(async () => {});
    const { props, rerender } = renderUserChosenWeb({ setUserModelTexts });
    expect(await screen.findByRole('button', { name: CHANGE_WEB })).toBeInTheDocument();

    rerender(
      <ModelTextPanel
        {...props}
        modelTextsState={readyState({
          dataVersion: '1.0.0',
          items: [
            { type: 'dblResource', id: 'uid-kjv', name: 'KJV', source: 'admin' },
            { type: 'dblResource', id: 'uid-web', name: 'WEB', source: 'user' },
          ],
        })}
      />,
    );

    expect(await screen.findByText('KJV - King James Version')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(setUserModelTexts).not.toHaveBeenCalled();
  });

  it('keeps the long-name ellipsis structure on the button header', async () => {
    renderUserChosenWeb();

    const header = await screen.findByRole('button', { name: CHANGE_WEB });
    expect(header).toHaveClass('tw:min-w-0', 'tw:overflow-hidden');
    expect(header).not.toHaveClass('tw:truncate');
    expect(within(header).getByText('WEB - World English Bible')).toHaveClass('tw:truncate');
  });

  it('pins the chevron to the end of the row, however long the name', async () => {
    renderUserChosenWeb();

    const header = await screen.findByRole('button', { name: CHANGE_WEB });
    // The icon has no role or name to query it by
    expect(header.querySelector('svg')).toHaveClass('tw:ms-auto');
  });

  it('draws the header focus ring inside the row', async () => {
    renderUserChosenWeb();

    // The row spans the panel edge to edge from its top, so a ring drawn outside it is clipped on
    // three sides and the focused header shows almost no indicator.
    const header = await screen.findByRole('button', { name: CHANGE_WEB });
    expect(header).toHaveClass('tw:focus-visible:ring-3', 'tw:focus-visible:ring-inset');
  });

  it('keeps only the bottom rule of the label row on the button header', async () => {
    renderUserChosenWeb();

    // `Button` merges its classes, so a later border reset would silently drop the bottom rule, and
    // its base `tw:border` would draw a box round the row if nothing reset it.
    const header = await screen.findByRole('button', { name: CHANGE_WEB });
    expect(header).toHaveClass('tw:border-b', 'tw:border-border', 'tw:h-[42px]');
    expect(header).not.toHaveClass('tw:border');
  });

  describe('a pick while a text is on screen', () => {
    it('keeps the header and the editor while the pick is written', async () => {
      const write = heldWrite();
      renderUserChosenWeb({
        showResourcePicker: vi.fn(async () => KJV),
        setUserModelTexts: write.setUserModelTexts,
      });
      const header = await screen.findByRole('button', { name: CHANGE_WEB });
      await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
      header.focus();

      fireEvent.click(header);

      // Sized to the content area below the header: a full-screen view would overflow under it.
      expect(await screen.findByRole('status')).toHaveTextContent('Selecting resource…');
      expect(screen.getByRole('status')).toHaveClass('tw:h-full');
      expect(screen.getByRole('status')).not.toHaveClass('tw:h-screen');
      // Only the content area waits: the header the user picked from keeps focus, and the editor is
      // hidden rather than rebuilt, so it still holds its text if the pick changes nothing.
      expect(header).toBeInTheDocument();
      expect(header).toHaveFocus();
      expect(screen.getByTestId(MODEL_TEXT_EDITOR_CONTAINER_TEST_ID)).toHaveClass('tw:hidden');
      expect(editorMountSpy).toHaveBeenCalledTimes(1);
    });

    it('shows the text on screen again when the picked text fails to install', async () => {
      const uninstalledKjv = { ...KJV, installed: false };
      // Held, as a real download is, so the "Selecting…" view is on screen before the failure lands.
      let failInstall: () => void = () => {};
      const installResource = vi.fn(
        () =>
          new Promise<void>((_resolve, reject) => {
            failInstall = () => reject(new Error('Offline'));
          }),
      );
      renderUserChosenWeb({
        dblResources: [INSTALLED_RESOURCE, uninstalledKjv],
        showResourcePicker: vi.fn(async () => uninstalledKjv),
        installResource,
      });
      await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());

      fireEvent.click(await screen.findByRole('button', { name: CHANGE_WEB }));

      await waitFor(() => expect(installResource).toHaveBeenCalledWith('uid-kjv'));
      expect(await screen.findByText('Selecting resource…')).toBeInTheDocument();
      await act(async () => failInstall());
      await waitFor(() =>
        expect(screen.getByTestId(MODEL_TEXT_EDITOR_CONTAINER_TEST_ID)).not.toHaveClass(
          'tw:hidden',
        ),
      );
      // The same editor, still holding WEB's text: a rebuilt one would be blank, because the editor
      // is fed only when the text in hand changes.
      expect(editorMountSpy).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('button', { name: CHANGE_WEB })).toBeInTheDocument();
    });

    // The header stays on screen while a picked text downloads, so this is the race the one-pick
    // guard exists for: a second pick finishing first, then the first one's write landing last and
    // replacing it.
    it('ignores a second pick while the first pick’s text is still downloading', async () => {
      const uninstalledKjv = { ...KJV, installed: false };
      let finishInstall: () => void = () => {};
      const installResource = vi.fn(
        () =>
          new Promise<void>((resolve) => {
            finishInstall = resolve;
          }),
      );
      const showResourcePicker = vi.fn(async () => uninstalledKjv);
      renderUserChosenWeb({
        dblResources: [INSTALLED_RESOURCE, uninstalledKjv],
        showResourcePicker,
        installResource,
      });
      const header = await screen.findByRole('button', { name: CHANGE_WEB });

      fireEvent.click(header);
      await waitFor(() => expect(installResource).toHaveBeenCalled());
      fireEvent.click(header);
      expect(showResourcePicker).toHaveBeenCalledTimes(1);

      await act(async () => finishInstall());
    });

    it('stops waiting once the write is done when the pick leaves the list unchanged', async () => {
      // Picking the text already first in the user's list writes an identical list, and an identical
      // list sends no update, so waiting for one would leave "Selecting…" up for good.
      renderUserChosenWeb({ showResourcePicker: vi.fn(async () => INSTALLED_RESOURCE) });
      await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());

      fireEvent.click(await screen.findByRole('button', { name: CHANGE_WEB }));

      await waitFor(() =>
        expect(screen.getByTestId(MODEL_TEXT_EDITOR_CONTAINER_TEST_ID)).not.toHaveClass(
          'tw:hidden',
        ),
      );
      expect(screen.queryByText('Selecting resource…')).not.toBeInTheDocument();
    });

    it('waits for the list written after the pick, even if the list changed while choosing', async () => {
      let choose: (resource: DblResourceData) => void = () => {};
      const write = heldWrite();
      const { props, rerender } = renderUserChosenWeb({
        showResourcePicker: vi.fn(
          () =>
            new Promise<DblResourceData | undefined>((resolve) => {
              choose = resolve;
            }),
        ),
        setUserModelTexts: write.setUserModelTexts,
      });
      fireEvent.click(await screen.findByRole('button', { name: CHANGE_WEB }));

      // A list update unrelated to this pick lands while the picker is open (say, a Send/Receive)
      rerender(
        <ModelTextPanel {...props} modelTextsState={readyState(userChosenModelTexts('uid-web'))} />,
      );
      await act(async () => choose(KJV));
      expect(await screen.findByText('Selecting resource…')).toBeInTheDocument();
      await write.finish();

      // The list in hand is still the one from before the write, so the pick is not over yet
      expect(screen.getByText('Selecting resource…')).toBeInTheDocument();
    });

    it('stops waiting, and shows the text it has, when no list arrives after the write', async () => {
      const write = heldWrite();
      renderUserChosenWeb({
        showResourcePicker: vi.fn(async () => KJV),
        setUserModelTexts: write.setUserModelTexts,
      });
      await waitFor(() => expect(setUsjSpy).toHaveBeenCalled());
      fireEvent.click(await screen.findByRole('button', { name: CHANGE_WEB }));
      expect(await screen.findByText('Selecting resource…')).toBeInTheDocument();

      vi.useFakeTimers();
      try {
        await write.finish();
        await act(async () => vi.advanceTimersByTimeAsync(WRITTEN_PICK_MAX_WAIT_MS - 1));
        expect(screen.getByText('Selecting resource…')).toBeInTheDocument();

        await act(async () => vi.advanceTimersByTimeAsync(1));
        expect(screen.queryByText('Selecting resource…')).not.toBeInTheDocument();
        expect(screen.getByTestId(MODEL_TEXT_EDITOR_CONTAINER_TEST_ID)).not.toHaveClass(
          'tw:hidden',
        );
        expect(screen.getByRole('button', { name: CHANGE_WEB })).toBeInTheDocument();
      } finally {
        vi.useRealTimers();
      }
    });

    it('waits for the picked text instead of showing the old one again', async () => {
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);
      const write = heldWrite();
      const { props, rerender } = renderUserChosenWeb({
        getResourceChapter: webLacksBook(),
        showResourcePicker: vi.fn(async () => KJV),
        setUserModelTexts: write.setUserModelTexts,
      });
      expect(await screen.findByText(USER_MISSING)).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Pick model text…' }));
      expect(await screen.findByText('Selecting resource…')).toBeInTheDocument();
      // The write can finish before the new list arrives. WEB's message must not come back in
      // between: it would take focus and be announced again about a text being replaced.
      await write.finish();
      expect(screen.getByText('Selecting resource…')).toBeInTheDocument();
      expect(screen.queryByText(USER_MISSING)).not.toBeInTheDocument();

      rerender(<ModelTextPanel {...props} modelTextsState={AFTER_PICKING_KJV} />);

      expect(await screen.findByRole('button', { name: CHANGE_KJV })).toBeInTheDocument();
      expect(screen.queryByText('Selecting resource…')).not.toBeInTheDocument();
    });

    describe('focus after a pick from the missing-book message', () => {
      /**
       * Picks KJV from WEB's missing-book message, whose button the "Selecting…" view replaces,
       * then delivers the new list once the write finishes.
       */
      async function pickFromMessage(
        deliver: (props: ModelTextPanelProps) => React.ReactElement,
        overrides: Partial<ModelTextPanelProps> = {},
      ) {
        const write = heldWrite();
        const { props, rerender } = renderUserChosenWeb({
          getResourceChapter: webLacksBook(),
          showResourcePicker: vi.fn(async () => KJV),
          setUserModelTexts: write.setUserModelTexts,
          ...overrides,
        });
        const messageButton = await screen.findByRole('button', { name: 'Pick model text…' });
        messageButton.focus();
        fireEvent.click(messageButton);
        expect(await screen.findByText('Selecting resource…')).toBeInTheDocument();
        expect(document.activeElement).toBe(document.body);
        await write.finish();
        rerender(deliver({ ...props, modelTextsState: AFTER_PICKING_KJV }));
        return { props, rerender };
      }

      it('puts focus on the header once the picked text is shown', async () => {
        vi.spyOn(document, 'hasFocus').mockReturnValue(true);

        await pickFromMessage((props) => <ModelTextPanel {...props} />);

        await waitFor(() => expect(screen.getByRole('button', { name: CHANGE_KJV })).toHaveFocus());
      });

      // The message mounts with its text already in its status region, which several screen readers
      // do not announce, so focus moving to it is what tells the user this text lacks the book too.
      it('lets the message take focus when the picked text lacks the book too', async () => {
        vi.spyOn(document, 'hasFocus').mockReturnValue(true);
        const noTextHasBook = vi.fn(
          async (projectId: string): Promise<{ usj: Usj | undefined; textDirection: string }> => {
            throw new Error(`Book number 1 not found in project ${projectId}.`);
          },
        );

        await pickFromMessage((props) => <ModelTextPanel {...props} />, {
          getResourceChapter: noTextHasBook,
        });

        await waitFor(() =>
          expect(screen.getByTestId(RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID)).toHaveFocus(),
        );
        expect(noTextHasBook).toHaveBeenCalledWith('project-kjv', expect.anything());
      });

      it('puts focus on the header when it only comes back after the pick', async () => {
        vi.spyOn(document, 'hasFocus').mockReturnValue(true);

        // Installing a picked text refetches the catalog, and the whole panel waits for it, header
        // included, until after the pick has finished.
        const { props, rerender } = await pickFromMessage((pickProps) => (
          <ModelTextPanel {...pickProps} isCatalogReady={false} />
        ));
        expect(screen.queryByTestId('model-text-header')).not.toBeInTheDocument();
        rerender(<ModelTextPanel {...props} modelTextsState={AFTER_PICKING_KJV} />);

        await waitFor(() => expect(screen.getByRole('button', { name: CHANGE_KJV })).toHaveFocus());
      });

      it('leaves focus alone when it is outside this document', async () => {
        // The picker is a dialog outside this iframe; focus that stayed out there is not ours to take.
        vi.spyOn(document, 'hasFocus').mockReturnValue(false);

        await pickFromMessage((props) => <ModelTextPanel {...props} />);

        expect(await screen.findByRole('button', { name: CHANGE_KJV })).not.toHaveFocus();
      });
    });
  });

  it('keeps the whole panel on "Selecting…" after a pick from a text not installed here, until the new list arrives', async () => {
    const write = heldWrite();
    const { props, rerender } = renderUserChosenWeb({
      modelTextsState: readyState({
        dataVersion: '1.0.0',
        items: [{ type: 'project', id: 'missing-project', name: 'Missing', source: 'user' }],
      }),
      showResourcePicker: vi.fn(async () => INSTALLED_RESOURCE),
      setUserModelTexts: write.setUserModelTexts,
    });
    fireEvent.click(await screen.findByRole('button', { name: 'Pick model text…' }));
    expect(await screen.findByText('Selecting resource…')).toBeInTheDocument();

    await write.finish();
    expect(screen.getByText('Selecting resource…')).toBeInTheDocument();
    expect(
      screen.queryByText('The selected model text could not be found.'),
    ).not.toBeInTheDocument();

    rerender(
      <ModelTextPanel {...props} modelTextsState={readyState(userChosenModelTexts('uid-web'))} />,
    );
    expect(await screen.findByRole('button', { name: CHANGE_WEB })).toBeInTheDocument();
    expect(screen.queryByText('Selecting resource…')).not.toBeInTheDocument();
  });

  // A picked text that isn't installed downloads before the pick is written, so the message would
  // otherwise stay up through the download, with a Pick button that ignores every click.
  it('replaces the not-found message with "Selecting…" while a picked text downloads', async () => {
    const uninstalledKjv = { ...KJV, installed: false };
    let finishInstall: () => void = () => {};
    const installResource = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishInstall = resolve;
        }),
    );
    renderUserChosenWeb({
      // Not in the catalog
      modelTextsState: readyState(userChosenModelTexts('unknown-uid')),
      dblResources: [INSTALLED_RESOURCE, uninstalledKjv],
      showResourcePicker: vi.fn(async () => uninstalledKjv),
      installResource,
    });
    fireEvent.click(await screen.findByRole('button', { name: 'Pick model text…' }));
    await waitFor(() => expect(installResource).toHaveBeenCalledWith('uid-kjv'));

    expect(screen.getByRole('status')).toHaveTextContent('Selecting resource…');
    expect(
      screen.queryByText('The selected model text could not be found.'),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Pick model text…' })).not.toBeInTheDocument();

    await act(async () => finishInstall());
  });

  describe('the full-name tooltip on a clipped header', () => {
    // jsdom ships no ResizeObserver, which the tooltip measures itself with
    class NoopResizeObserver {
      private readonly targets = new Set<Element>();

      observe(target: Element) {
        this.targets.add(target);
      }

      unobserve(target: Element) {
        this.targets.delete(target);
      }

      disconnect() {
        this.targets.clear();
      }
    }

    beforeEach(() => {
      vi.stubGlobal('ResizeObserver', NoopResizeObserver);
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    /** Makes every element report that its text overflows, so the label counts as clipped. */
    function clipLabel() {
      vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(500);
      vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);
    }

    /** Answers `:focus-visible` as the browser would after a keyboard (true) or pointer move. */
    function arriveBy(isKeyboard: boolean) {
      const { matches } = Element.prototype;
      vi.spyOn(Element.prototype, 'matches').mockImplementation(function matchesFocusVisible(
        this: Element,
        selector: string,
      ) {
        return selector === ':focus-visible' ? isKeyboard : matches.call(this, selector);
      });
    }

    it('shows the full name when the header is reached by keyboard', async () => {
      clipLabel();
      arriveBy(true);
      renderUserChosenWeb();

      act(() => screen.getByRole('button', { name: CHANGE_WEB }).focus());

      expect(await screen.findByRole('tooltip')).toHaveTextContent('WEB - World English Bible');
    });

    it('does not pop up when focus returns to the header after a pointer pick', async () => {
      clipLabel();
      arriveBy(false);
      renderUserChosenWeb();
      const header = await screen.findByRole('button', { name: CHANGE_WEB });

      act(() => header.focus());

      expect(header).toHaveFocus();
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('closes on Escape', async () => {
      clipLabel();
      arriveBy(true);
      renderUserChosenWeb();
      act(() => screen.getByRole('button', { name: CHANGE_WEB }).focus());
      expect(await screen.findByRole('tooltip')).toBeInTheDocument();

      fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });

      await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
    });
  });

  describe('when the book is missing', () => {
    it('offers the picker from the missing-book message when the user chose the text', async () => {
      const showResourcePicker = vi.fn(async () => undefined);
      renderUserChosenWeb({ getResourceChapter: webLacksBook(), showResourcePicker });

      expect(await screen.findByText(USER_MISSING)).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Pick model text…' }));

      await waitFor(() => expect(showResourcePicker).toHaveBeenCalledWith(['uid-web']));
    });

    it('opens one picker when the header and then the message button are clicked', async () => {
      // Never settles, so the first picker is still open when the second click lands.
      const showResourcePicker = vi.fn(() => new Promise<DblResourceData | undefined>(() => {}));
      renderUserChosenWeb({ getResourceChapter: webLacksBook(), showResourcePicker });
      const messageButton = await screen.findByRole('button', { name: 'Pick model text…' });

      fireEvent.click(screen.getByRole('button', { name: CHANGE_WEB }));
      expect(showResourcePicker).toHaveBeenCalledTimes(1);
      fireEvent.click(messageButton);

      expect(showResourcePicker).toHaveBeenCalledTimes(1);
    });

    it('points to the team layout, with no picker, when the admin chose the text', async () => {
      renderUserChosenWeb({
        getResourceChapter: webLacksBook(),
        modelTextsState: readyState(configuredModelText('uid-web')),
      });

      expect(await screen.findByText(ADMIN_MISSING)).toBeInTheDocument();
      expect(screen.queryByText(USER_MISSING)).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});

/** Whether `later` comes after `earlier` in document order */
function comesAfter(earlier: Node, later: Node) {
  // compareDocumentPosition reports its answer as bit flags
  // eslint-disable-next-line no-bitwise
  return (earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
}

describe('ModelTextPanel copyright notice', () => {
  it('shows the notice below the model text header, leaving the header row alone', async () => {
    renderPanel({
      modelTextsState: readyState(configuredModelText('uid-web')),
      dblResources: [INSTALLED_RESOURCE],
      getResourceChapter: vi.fn(async () => ({ usj: SAMPLE_USJ, textDirection: 'ltr' })),
      copyrightNotice: <div data-testid="copyright-notice">Notice</div>,
    });

    const editor = await screen.findByTestId('editorial');
    const header = screen.getByTestId('model-text-header');
    const notice = screen.getByTestId('copyright-notice');
    expect(header).not.toContainElement(notice);
    expect(comesAfter(header, notice)).toBe(true);
    expect(comesAfter(notice, editor)).toBe(true);
  });
});
