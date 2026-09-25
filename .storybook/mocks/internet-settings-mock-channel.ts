/**
 * Opt-in channel for the first-run internet-settings Storybook mock.
 *
 * Why a channel rather than `spyOn(papiHooks, …)`: the hooks barrel is an ES module, whose exports
 * are non-configurable, so spying on one throws `Cannot spy on export "useDataProvider"` and the
 * story renders Storybook's error overlay instead of the step. The webpack-aliased mock in
 * `renderer-papi-hooks.tsx` reads this module instead, which is the same route the language step
 * takes.
 *
 * Kept as its own module (no webpack-only imports) so story files under `src/` can import it
 * without pulling that mock into `tsc` typecheck. See
 * `.storybook/mocks/first-run-language-mock-channel.ts`.
 */
import { createContext, createElement, type ComponentType, type ReactElement } from 'react';

/** Story-controlled state for the internet-settings data provider and its data. */
export type InternetSettingsMock = {
  /**
   * Whether the data provider has registered. `false` stands in for the window before the C#
   * provider comes up, which the step shows as its "provider registering" spinner.
   */
  isProviderRegistered: boolean;
  /**
   * What the `InternetSettings` data type yields. The settings object for the ordinary states, or a
   * `PlatformError` for the read-failure state.
   */
  value: unknown;
  /** Loading flag for the first read, which the step shows as a spinner with Next disabled. */
  isLoading: boolean;
};

/**
 * React context for per-story isolation, so stories rendered together on the autodocs page each
 * read their own state. Consumed by the hooks in `renderer-papi-hooks.tsx` via `useContext`.
 */
export const InternetSettingsMockContext = createContext<InternetSettingsMock | undefined>(
  undefined,
);

/** The settings a story gets unless it names others: VPN required, production server. */
export const DEFAULT_INTERNET_SETTINGS = {
  permittedInternetUse: 'VpnRequired' as const,
  selectedServer: 'Production' as const,
  proxyPort: 0,
};

/**
 * Story decorator pointing the internet-settings hooks at `mock`. Defaults to the ordinary case —
 * provider registered, settings loaded — so each story names only what it changes. Resolved once
 * per decorator so the provider's value keeps one identity across re-renders.
 */
export function withInternetSettings(mock: Partial<InternetSettingsMock> = {}) {
  const value: InternetSettingsMock = {
    isProviderRegistered: true,
    value: DEFAULT_INTERNET_SETTINGS,
    isLoading: false,
    ...mock,
  };
  return function StoryDecorator(Story: ComponentType): ReactElement {
    return createElement(InternetSettingsMockContext.Provider, { value }, createElement(Story));
  };
}
