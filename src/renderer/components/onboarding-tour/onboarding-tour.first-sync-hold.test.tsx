// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSyncExternalStore } from 'react';
import type { FirstSyncState } from 'papi-shared-types';
import { sendCommand } from '@shared/services/command.service';
import type { TourProps } from './tour.component';
import type { TourDomFixtures } from './onboarding-tour.test-utils';
import { installTourDomFixtures, resetTourHarness } from './onboarding-tour.test-utils';
import { OnboardingTour } from './onboarding-tour.component';

// Separate from `onboarding-tour.component.test.tsx` because that file replaces
// `useTourHeldForFirstSync` with a knob. This one runs the REAL hook, mocking only the setting it
// subscribes to and the availability command, so the wiring from the setting through `mightShow`
// to `Tour`'s `open` is exercised end to end.

// A controllable stand-in for the `platform.firstSyncState` subscription.
const firstSyncSetting = vi.hoisted((): { state: FirstSyncState; listeners: Set<() => void> } => ({
  state: 'unknown',
  listeners: new Set(),
}));

function setFirstSyncState(state: FirstSyncState) {
  firstSyncSetting.state = state;
  firstSyncSetting.listeners.forEach((listener) => listener());
}

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));

vi.mock('@renderer/services/first-run-store', async () => {
  const { firstRunStoreMock } = await import('./onboarding-tour.test-utils');
  return firstRunStoreMock();
});

vi.mock('./onboarding-tour.store', async () => {
  const { tourStoreMock } = await import('./onboarding-tour.test-utils');
  return tourStoreMock();
});

vi.mock('@renderer/hooks/use-is-power-mode.hook', async () => {
  const { powerModeMock } = await import('./onboarding-tour.test-utils');
  return powerModeMock();
});

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: (keys: string[]) => [Object.fromEntries(keys.map((k) => [k, k])), false],
  useSetting: () => [
    useSyncExternalStore(
      (listener: () => void) => {
        firstSyncSetting.listeners.add(listener);
        return () => {
          firstSyncSetting.listeners.delete(listener);
        };
      },
      () => firstSyncSetting.state,
    ),
    undefined,
    () => {},
    false,
  ],
}));

vi.mock('./tour.component', async (importOriginal) => {
  const original = await importOriginal<typeof import('./tour.component')>();
  // Function declaration required by react/function-component-definition; defined inside the
  // factory to avoid the vi.mock hoisting TDZ issue.
  function MockTourComponent({ open }: TourProps) {
    return open ? <div data-testid="mock-tour" /> : undefined;
  }
  return { ...original, Tour: MockTourComponent };
});

let fixtures: TourDomFixtures;

beforeEach(() => {
  resetTourHarness();
  firstSyncSetting.state = 'unknown';
  firstSyncSetting.listeners.clear();
  // sendCommand's return type is resolved from the command name, so no single implementation
  // satisfies its generic signature; every mock of it in this repo asserts through.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  vi.mocked(sendCommand).mockImplementation((async () => true) as unknown as typeof sendCommand);
  fixtures = installTourDomFixtures();
});

afterEach(() => {
  cleanup();
  fixtures.remove();
});

describe('OnboardingTour with the real first-sync hold', () => {
  it('stays closed while the first sync is pending, then opens once it is synced', async () => {
    setFirstSyncState('pending');
    render(<OnboardingTour />);
    await act(async () => {});
    expect(sendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.isAvailable');
    expect(screen.queryByTestId('mock-tour')).toBeNull();

    act(() => {
      setFirstSyncState('synced');
    });

    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();
  });

  it('opens when Send/Receive is not available, even though the state is pending', async () => {
    // sendCommand's generic return type admits no single implementation, as in `beforeEach`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(sendCommand).mockImplementation((async () => false) as unknown as typeof sendCommand);
    setFirstSyncState('pending');
    render(<OnboardingTour />);
    await act(async () => {});
    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();
  });
});
