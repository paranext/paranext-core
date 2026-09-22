/**
 * Opt-in channel for the first-run language-step Storybook mock.
 *
 * Kept as its own module (a `type` import of LanguageInfo, plus React's `createElement` for the
 * decorator) so story files under `src/` can import from here without pulling the webpack-only
 * `renderer-papi-hooks.tsx` mock — and its `require.context` localization util — into `tsc`
 * typecheck. That mock reads this same context at hook-call time. See
 * `.storybook/mocks/renderer-papi-hooks.tsx`.
 *
 * Stories opt in through {@link withFirstRunLanguage}, a decorator, so that stories rendered
 * together on the autodocs page each read their own data rather than a shared global.
 */
import { createContext, createElement, type ComponentType, type ReactElement } from 'react';
import type { LanguageInfo } from 'platform-bible-react';

/** Story-controlled data for the first-run language step. */
export type FirstRunLanguageMock = {
  /** Value returned by `useSetting('platform.interfaceLanguage', …)` (index 0 is the selection). */
  interfaceLanguage: string[];
  /** Languages returned by the `SetupDialogLanguages` data type (the qualifying picker options). */
  setupLanguages: Record<string, LanguageInfo>;
  /** Languages returned by the `AvailableInterfaceLanguages` data type (autonym source). */
  availableLanguages: Record<string, LanguageInfo>;
  /** Loading flag for the `SetupDialogLanguages` data (gates the wizard's Next button). */
  isLoading: boolean;
};

/**
 * React context the replaced hooks read. Provided per story by {@link withFirstRunLanguage}, which
 * is how a story's data reaches them — a hook cannot be spied on here, because the barrel is an ES
 * module whose exports are not configurable.
 */
export const FirstRunLanguageMockContext = createContext<FirstRunLanguageMock | undefined>(
  undefined,
);

/**
 * Story decorator pointing the first-run language hooks at `mock`; unspecified fields fall back to
 * an English-only default. Resolved once per decorator so the provider's value keeps one identity
 * across re-renders, rather than re-rendering every consumer.
 */
export function withFirstRunLanguage(mock: Partial<FirstRunLanguageMock> = {}) {
  const value: FirstRunLanguageMock = {
    interfaceLanguage: ['en'],
    setupLanguages: { en: { autonym: 'English' } },
    availableLanguages: { en: { autonym: 'English' } },
    isLoading: false,
    ...mock,
  };
  return function StoryDecorator(Story: ComponentType): ReactElement {
    return createElement(FirstRunLanguageMockContext.Provider, { value }, createElement(Story));
  };
}
