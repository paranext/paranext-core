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
  '%webView_modelTextPanel_catalogUnavailable%': "Couldn't load the list of available resources.",
  '%webView_modelTextPanel_loading%': 'Loading…',
  '%webView_modelTextPanel_settingsUnavailable%':
    "Couldn't load your model text. It will appear once it's available.",
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

const SAMPLE_USJ: Usj = { type: 'USJ', version: '3.1', content: [] };

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
    modelTextsStatus: 'ready',
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

  it('shows the settings-unavailable error instead of the empty prompt when the setting cannot be read', () => {
    // An unreadable setting is not "nothing configured": offering only the picker would invite the
    // user to reconfigure a model text that may already be set.
    render(<ModelTextPanel {...makeProps({ modelTextsStatus: 'error' })} />);

    expect(
      screen.getByText("Couldn't load your model text. It will appear once it's available."),
    ).toBeInTheDocument();
    expect(screen.queryByText('No model text selected.')).not.toBeInTheDocument();
  });

  it('offers no controls in the settings-error state', () => {
    render(<ModelTextPanel {...makeProps({ modelTextsStatus: 'error' })} />);

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
          effectiveModelTexts: configuredModelText('uid-web'),
          dblResources: [],
          isCatalogReady: false,
        })}
      />,
    );

    expect(
      screen.queryByText('The selected model text could not be found.'),
    ).not.toBeInTheDocument();
  });

  it('does not show the empty prompt while the configured list is still resolving', () => {
    // The defect this guards: the loading and empty states shared one branch, so any gap in the
    // nested ternary that re-decided between them fell through to the empty prompt.
    render(
      <ModelTextPanel
        {...makeProps({
          effectiveModelTexts: undefined,
          modelTextsStatus: 'loading',
        })}
      />,
    );

    expect(screen.queryByText('No model text selected.')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Pick model text…' })).not.toBeInTheDocument();
  });
});
