// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import type { LanguageInfo } from 'platform-bible-react';

const mockSetInterfaceLanguage = vi.fn();
const hookState = {
  interfaceLanguage: ['en'],
  setupLanguages: {
    en: { autonym: 'English' },
    es: { autonym: 'Español', uiNames: { en: 'Spanish' } },
  } satisfies Record<string, LanguageInfo>,
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
    },
    false,
  ]),
  useSetting: vi.fn(() => [hookState.interfaceLanguage, mockSetInterfaceLanguage, vi.fn()]),
  useData: vi.fn(() => ({
    SetupDialogLanguages: () => [hookState.setupLanguages, () => {}, hookState.isLoading],
  })),
}));
vi.mock('@shared/services/localization.service', () => ({
  localizationService: { dataProviderName: 'platform.localizationDataServiceDataProvider' },
}));
vi.mock('@shared/services/logger.service', () => ({ logger: { warn: vi.fn() } }));

// jsdom doesn't ship ResizeObserver or scrollIntoView; cmdk (used inside InterfaceLanguagePicker)
// instantiates a ResizeObserver on mount. No-op stubs are sufficient since the tests don't assert
// layout or scroll behavior.
class NoopResizeObserver implements ResizeObserver {
  // Touch `this` via a private field so the no-op methods don't trip
  // @typescript-eslint/class-methods-use-this. We keep `targets` as an internal record of
  // attached elements so the polyfill behaves like a (very dumb) real ResizeObserver —
  // observe/unobserve mutate the set, disconnect clears it. None of the tests inspect this
  // state; it just satisfies the lint rule without an eslint-disable.
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
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
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

  test('shows the current language even if it does not qualify for the setup gate', () => {
    hookState.interfaceLanguage = ['km']; // not in setupLanguages
    render(<LanguageStep onNext={vi.fn()} setCanProceed={vi.fn()} />);
    // km falls back to its raw tag as autonym and is still present + selected
    expect(screen.getByRole('option', { name: /km/ })).toHaveAttribute('aria-current', 'true');
  });

  test('gates Next off while languages are loading', () => {
    hookState.isLoading = true;
    const setCanProceed = vi.fn();
    render(<LanguageStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
    expect(setCanProceed).toHaveBeenCalledWith(false);
    hookState.isLoading = false;
  });
});
