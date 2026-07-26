/**
 * Opt-in channel for the first-run language-step Storybook mock.
 *
 * Kept as its own dependency-free module (only a `type` import) so story files under `src/` can
 * import the setters without pulling the webpack-only `renderer-papi-hooks.tsx` mock (and its
 * `require.context` localization util) into `tsc` typecheck. The webpack-aliased mock reads this
 * same module instance at hook-call time. See `.storybook/mocks/renderer-papi-hooks.tsx`.
 */
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

let activeMock: FirstRunLanguageMock | undefined;

/**
 * Opt the renderer hooks into first-run language-step mock data (typically from a story
 * `beforeEach`, paired with {@link resetFirstRunLanguageMock} cleanup). Unspecified fields fall back
 * to an English-only default.
 */
export function setFirstRunLanguageMock(mock: Partial<FirstRunLanguageMock> = {}): void {
  activeMock = {
    interfaceLanguage: ['en'],
    setupLanguages: { en: { autonym: 'English' } },
    availableLanguages: { en: { autonym: 'English' } },
    isLoading: false,
    ...mock,
  };
}

/** Restore straight passthrough to the real renderer hooks. */
export function resetFirstRunLanguageMock(): void {
  activeMock = undefined;
}

/** Current opt-in mock data, or `undefined` when the real hooks should be used. */
export function getFirstRunLanguageMock(): FirstRunLanguageMock | undefined {
  return activeMock;
}
