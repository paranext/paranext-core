// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PanelReadinessView } from './panel-readiness-view.component';

const STRINGS = {
  errorMessage: "Couldn't load your resources. They will appear once they're available.",
  catalogErrorMessage: "Couldn't load the list of available resources.",
  loadingLabel: 'Loading…',
  emptyPrompt: 'No Bible text selected.',
  pickLabel: 'Pick Bible text…',
  retryLabel: 'Try again',
  registrationRequiredMessage: 'Register Paratext to browse freely available texts.',
  registerLabel: 'Register Paratext',
};

function renderView(
  readiness: 'loading' | 'error' | 'catalogError' | 'registrationRequired' | 'empty' | 'configured',
  overrides = {},
) {
  const props = {
    onPick: vi.fn(),
    onRetryCatalog: vi.fn(),
    onOpenRegistration: vi.fn(),
    ...overrides,
  };
  const result = render(<PanelReadinessView readiness={readiness} {...STRINGS} {...props} />);
  return { ...result, ...props };
}

describe('PanelReadinessView', () => {
  it('renders the settings error as a message with no controls', () => {
    renderView('error');

    expect(
      screen.getByText("Couldn't load your resources. They will appear once they're available."),
    ).toBeInTheDocument();
    // The empty prompt must never accompany the error: it would offer to reconfigure a resource
    // that may already be set.
    expect(screen.queryByText('No Bible text selected.')).not.toBeInTheDocument();
    // No retry button. Nothing in this panel can re-drive the project-setting read, so a button
    // here would be inert — the setting is watched and the panel recovers on its own.
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a labelled spinner and neither the prompt nor the error while loading', () => {
    const { container } = renderView('loading');

    expect(container.querySelector('svg')).toBeInTheDocument();
    // The wait can span a whole catalog fetch, so the spinner must say something rather than sit
    // silent — for a sighted user and for assistive tech alike.
    expect(screen.getByText('Loading…')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('No Bible text selected.')).not.toBeInTheDocument();
    expect(
      screen.queryByText("Couldn't load your resources. They will appear once they're available."),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders the empty prompt with a pick action once emptiness is known', () => {
    const { onPick } = renderView('empty');

    expect(screen.getByText('No Bible text selected.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pick Bible text…' }));
    expect(onPick).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when the panel has something to show', () => {
    const { container } = renderView('configured');

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the catalog error with a retry, because re-fetching can actually help', () => {
    const { onRetryCatalog } = renderView('catalogError');

    expect(screen.getByText("Couldn't load the list of available resources.")).toBeInTheDocument();
    // Distinct from the settings error, which offers no control: this one is genuinely recoverable.
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetryCatalog).toHaveBeenCalledTimes(1);
  });

  it('does not offer the pick prompt alongside a catalog error', () => {
    // Something IS configured in this state — it just cannot be resolved yet. Offering the picker
    // would invite the user to replace it.
    renderView('catalogError');

    expect(screen.queryByText('No Bible text selected.')).not.toBeInTheDocument();
  });

  it('offers registration, not a retry, when the registration is what is missing', () => {
    // A retry cannot succeed until the registration changes, so this state pairs the message with
    // the one action that can — the same pairing Home uses for this failure.
    const { onOpenRegistration } = renderView('registrationRequired');

    expect(
      screen.getByText('Register Paratext to browse freely available texts.'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
    // Nor the pick prompt: there is nothing to pick from without a catalog.
    expect(screen.queryByText('No Bible text selected.')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Register Paratext' }));
    expect(onOpenRegistration).toHaveBeenCalledTimes(1);
  });

  it('gives each front state its own icon so they are distinguishable at a glance', () => {
    // AC-4. Before this, `empty` and `catalogError` rendered character-identical containers —
    // centred text plus a button — while their buttons did opposite things (reconfigure vs. retry).
    const iconOf = (readiness: 'error' | 'catalogError' | 'registrationRequired' | 'empty') => {
      const { container, unmount } = renderView(readiness);
      const icon = container.querySelector('[data-slot="empty-icon"] svg');
      const name = icon?.getAttribute('class') ?? undefined;
      unmount();
      return name;
    };

    const settingsError = iconOf('error');
    const catalogError = iconOf('catalogError');
    const registrationRequired = iconOf('registrationRequired');
    const empty = iconOf('empty');

    expect(settingsError).toBeDefined();
    expect(catalogError).toBeDefined();
    expect(registrationRequired).toBeDefined();
    expect(empty).toBeDefined();
    // `registrationRequired` is the one most at risk of colliding: like `catalogError` it is a
    // failed-catalog state, and like `empty` it carries a single button.
    expect(new Set([settingsError, catalogError, registrationRequired, empty]).size).toBe(4);
  });
});
