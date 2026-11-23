import { describe, expect, it } from 'vitest';
import type { NetworkObjectState } from '@papi/core';
import type { ITextConnectionSettingsProjectDataProvider } from 'platform-scripture';
import type { TextCollectionSources } from './scripture-text-grid-contents.utils';
import { getViewOptionsAvailability } from './scripture-text-grid-availability.utils';

type ProviderState = NetworkObjectState<ITextConnectionSettingsProjectDataProvider>;

/** A `ready` provider state; only the discriminant matters here. */
const readyProvider = (): ProviderState => ({
  status: 'ready',
  // The util never touches the provider, so a bare stand-in is enough.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  networkObject: {} as ITextConnectionSettingsProjectDataProvider,
});

const someSources = (): TextCollectionSources => ({
  adminReferenced: { dataVersion: '1.1.0', items: [] },
  userReferenced: { dataVersion: '1.1.0', items: [] },
  overlay: {},
  order: [],
});

describe('getViewOptionsAvailability', () => {
  it('reports noProject when no project is selected', () => {
    expect(
      getViewOptionsAvailability({
        textConnectionState: { status: 'noSource' },
        sources: undefined,
        hasSettingsError: false,
      }),
    ).toBe('noProject');
  });

  it('reports loading while the provider for the selected project is still resolving', () => {
    expect(
      getViewOptionsAvailability({
        textConnectionState: { status: 'loading' },
        sources: undefined,
        hasSettingsError: false,
      }),
    ).toBe('loading');
  });

  it('reports unavailable when the project has no text-connection settings', () => {
    // Distinct from `loading` on purpose: waiting will not help, so the panel must say so rather
    // than spinning forever.
    expect(
      getViewOptionsAvailability({
        textConnectionState: { status: 'unavailable' },
        sources: undefined,
        hasSettingsError: false,
      }),
    ).toBe('unavailable');
  });

  it('still reports loading once the provider is ready but the settings have not arrived', () => {
    // The window this util exists for: the provider resolving is not the same as the settings being
    // readable, because the admin setting and the two per-user subscriptions are separate round
    // trips. Treating a `ready` provider as operable is what enabled controls over no data.
    expect(
      getViewOptionsAvailability({
        textConnectionState: readyProvider(),
        sources: undefined,
        hasSettingsError: false,
      }),
    ).toBe('loading');
  });

  it('reports ready only once the provider resolved and the sources assembled', () => {
    expect(
      getViewOptionsAvailability({
        textConnectionState: readyProvider(),
        sources: someSources(),
        hasSettingsError: false,
      }),
    ).toBe('ready');
  });

  it('never reports ready for a project it has no provider for, even if sources linger', () => {
    // Defensive: a caller holding a previous project's assembled sources must not read as operable
    // just because it has something in hand.
    (['noSource', 'loading', 'unavailable'] as const).forEach((status) => {
      expect(
        getViewOptionsAvailability({
          textConnectionState: { status },
          sources: someSources(),
          hasSettingsError: false,
        }),
      ).not.toBe('ready');
    });
  });

  it('reports settingsError when the admin setting cannot be read', () => {
    // The unending-spinner case: an unreadable setting leaves `sources` `undefined` exactly as a
    // still-arriving one does, so without this the panel says "loading" for something that is
    // never going to load.
    expect(
      getViewOptionsAvailability({
        textConnectionState: readyProvider(),
        sources: undefined,
        hasSettingsError: true,
      }),
    ).toBe('settingsError');
  });

  it('prefers noProject and unavailable over a settings read failure', () => {
    // With no project or no support there is nothing to have failed to read, so those answers are
    // the more useful ones.
    expect(
      getViewOptionsAvailability({
        textConnectionState: { status: 'noSource' },
        sources: undefined,
        hasSettingsError: true,
      }),
    ).toBe('noProject');
    expect(
      getViewOptionsAvailability({
        textConnectionState: { status: 'unavailable' },
        sources: undefined,
        hasSettingsError: true,
      }),
    ).toBe('unavailable');
  });
});
