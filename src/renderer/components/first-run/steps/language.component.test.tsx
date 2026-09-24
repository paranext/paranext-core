// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import type { LanguageInfo } from 'platform-bible-react';
import { newPlatformError, type PlatformError } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { toast } from 'sonner';

// setInterfaceLanguage is async; resolve by default so the component's `.catch(...)` has a promise.
const mockSetInterfaceLanguage = vi.fn(() => Promise.resolve());
const GOOD_SETUP_LANGUAGES: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español', uiNames: { en: 'Spanish' } },
};
// Must stay unused: the step labels the current language from the shared language details.
const availableInterfaceLanguagesHook = vi.hoisted(() => vi.fn(() => [{}, () => {}, false]));
const hookState: {
  interfaceLanguage: string[];
  setupLanguages: Record<string, LanguageInfo> | PlatformError;
  isLoading: boolean;
} = {
  interfaceLanguage: ['en'],
  setupLanguages: GOOD_SETUP_LANGUAGES,
  isLoading: false,
};

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_language_title%': 'Choose your language',
      '%firstRun_language_instruction%': 'You can change it later.',
      '%firstRun_language_search_placeholder%': 'Search languages',
      '%firstRun_language_noResults%': 'No matching languages',
      '%firstRun_language_selected%': 'Selected',
      '%firstRun_language_setFailed%': "Couldn't change language. Please try again.",
    },
    false,
  ]),
  useSetting: vi.fn(() => [hookState.interfaceLanguage, mockSetInterfaceLanguage, vi.fn()]),
  useData: vi.fn(() => ({
    SetupDialogLanguages: () => [hookState.setupLanguages, () => {}, hookState.isLoading],
    AvailableInterfaceLanguages: availableInterfaceLanguagesHook,
  })),
}));
vi.mock('@shared/services/localization.service', () => ({
  localizationService: { dataProviderName: 'platform.localizationDataServiceDataProvider' },
}));
vi.mock('@shared/services/logger.service', () => ({ logger: { warn: vi.fn() } }));
vi.mock('sonner', () => ({ toast: { error: vi.fn() } }));

// jsdom doesn't ship ResizeObserver; cmdk (used inside InterfaceLanguagePicker) instantiates one
// on mount. A no-op stub is sufficient since the tests don't assert layout behavior. scrollIntoView
// is shimmed repo-wide in vitest.setup.ts.
class NoopResizeObserver implements ResizeObserver {
  // `targets` gives the no-op methods a `this` use (satisfies class-methods-use-this); unused by tests.
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

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
});

// The import must come after the vi.mock() calls and the beforeAll() stub setup so that Vitest's
// module hoisting picks up the mocks before the component module is evaluated.
// eslint-disable-next-line import/first
import { LanguageStep } from './language.component';

describe('LanguageStep', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    hookState.interfaceLanguage = ['en'];
    hookState.setupLanguages = GOOD_SETUP_LANGUAGES;
    hookState.isLoading = false;
  });

  test('renders the qualifying languages by autonym', () => {
    render(<LanguageStep onNext={vi.fn()} setCanProceed={vi.fn()} />);
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
  });

  test('selecting a language writes [tag, ...rest] to the setting', async () => {
    hookState.interfaceLanguage = ['en'];
    render(<LanguageStep onNext={vi.fn()} setCanProceed={vi.fn()} />);
    await userEvent.click(screen.getByText('Español'));
    expect(mockSetInterfaceLanguage).toHaveBeenCalledWith(['es', 'en']);
  });

  test('shows a current language that is not offered by its real autonym', () => {
    hookState.interfaceLanguage = ['fr']; // has a locale file but is not offered
    render(<LanguageStep onNext={vi.fn()} setCanProceed={vi.fn()} />);
    expect(screen.getByRole('option', { name: /Français/ })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.queryByText('fr')).not.toBeInTheDocument();
  });

  test('labels the current language without subscribing to all interface languages', () => {
    hookState.interfaceLanguage = ['km'];
    render(<LanguageStep onNext={vi.fn()} setCanProceed={vi.fn()} />);
    expect(screen.getByRole('option', { name: /ខ្មែរ/ })).toHaveAttribute('aria-current', 'true');
    expect(availableInterfaceLanguagesHook).not.toHaveBeenCalled();
  });

  test('falls back to the raw tag when the current language has no known details', () => {
    hookState.interfaceLanguage = ['xyz']; // no locale details for this tag
    render(<LanguageStep onNext={vi.fn()} setCanProceed={vi.fn()} />);
    expect(screen.getByRole('option', { name: /xyz/ })).toHaveAttribute('aria-current', 'true');
  });

  test('gates Next off while languages are loading', () => {
    hookState.isLoading = true;
    const setCanProceed = vi.fn();
    render(<LanguageStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
    expect(setCanProceed).toHaveBeenCalledWith(false);
  });

  test('does not write when the already-selected language is chosen again', async () => {
    render(<LanguageStep onNext={vi.fn()} setCanProceed={vi.fn()} />);
    await userEvent.click(screen.getByText('English')); // already the current selection (value = 'en')
    expect(mockSetInterfaceLanguage).not.toHaveBeenCalled();
  });

  test('logs a warning and shows an error toast when the setting write rejects', async () => {
    mockSetInterfaceLanguage.mockRejectedValueOnce(new Error('write failed'));
    render(<LanguageStep onNext={vi.fn()} setCanProceed={vi.fn()} />);
    await userEvent.click(screen.getByText('Español'));
    await vi.waitFor(() => expect(logger.warn).toHaveBeenCalled());
    expect(toast.error).toHaveBeenCalledWith("Couldn't change language. Please try again.");
  });

  test('falls back to English only when the language data is a platform error', () => {
    hookState.setupLanguages = newPlatformError('boom');
    render(<LanguageStep onNext={vi.fn()} setCanProceed={vi.fn()} />);
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.queryByText('Español')).not.toBeInTheDocument();
  });
});
