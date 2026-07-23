// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReferenceList } from 'platform-scripture';
import { ModelTextPanel, type ModelTextPanelProps } from './model-text-panel.component';

// Editorial is heavy (Lexical) and only renders in the "active" state; mock it so the panel's
// resolution/loading logic can be tested in isolation. getDefaultViewOptions runs at module scope.
vi.mock('@eten-tech-foundation/platform-editor', () => ({
  Editorial: () => <div data-testid="editorial" />,
  getDefaultViewOptions: () => ({}),
}));

const STRINGS = {
  '%webView_modelTextPanel_selecting%': 'Selecting resource…',
  '%webView_modelTextPanel_noProject%': 'No project.',
  '%webView_modelTextPanel_pickModelText%': 'Pick model text…',
  '%webView_modelTextPanel_unknownResource%': 'The selected model text could not be found.',
  '%webView_modelTextPanel_installFailed%': "The model text couldn't be installed.",
  '%webView_modelTextPanel_installFailedOffline%':
    "The model text couldn't be installed. Check your connection and try again.",
  '%webView_modelTextPanel_retry%': 'Retry',
  '%webView_modelTextPanel_emptyState_prompt%': 'No model text selected.',
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

    // The regression (PT-4221): a configured-but-uninstalled model text is never installed and the
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
    expect(await screen.findByText('Selecting resource…')).toBeInTheDocument();

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
    await screen.findByRole('button', { name: 'Retry' });
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
    await screen.findByRole('button', { name: 'Retry' });
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
    fireEvent.click(await screen.findByRole('button', { name: 'Retry' }));
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
    expect(await screen.findByText('Selecting resource…')).toBeInTheDocument();
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

    // Instead of spinning forever (the PT-4221 symptom, on the error path), the panel surfaces the
    // failure and offers a retry.
    const retryButton = await screen.findByRole('button', { name: 'Retry' });
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
    // recover by picking another (PT-4221).
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
});
