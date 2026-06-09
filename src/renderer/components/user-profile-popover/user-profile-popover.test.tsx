import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { sendCommand } from '@shared/services/command.service';
import { UserProfilePopover } from './user-profile-popover.component';

// Closure-referenced mock state, mutated by individual tests via the `setMockSetting` helper
// below. Using a closure (instead of per-test `mockImplementation` casts) keeps the mock factory
// strongly typed — the vi.mock factory infers types loosely while still letting tests vary
// behavior between cases without any `as` assertions.
type MockState = {
  interfaceMode: 'simple' | 'power';
  setInterfaceMode: ReturnType<typeof vi.fn>;
  interfaceLanguage: string[];
  setInterfaceLanguage: ReturnType<typeof vi.fn>;
  availableLanguages: Record<string, { autonym: string }>;
  themeType: 'light' | 'dark';
  setTheme: ReturnType<typeof vi.fn>;
  shouldMatchSystem: boolean;
  setShouldMatchSystem: ReturnType<typeof vi.fn>;
};

const DEFAULT_AVAILABLE_LANGUAGES: Record<string, { autonym: string }> = {
  en: { autonym: 'English' },
  es: { autonym: 'Español' },
  fr: { autonym: 'Français' },
};

const mockState: MockState = {
  interfaceMode: 'simple',
  setInterfaceMode: vi.fn(),
  interfaceLanguage: ['en'],
  setInterfaceLanguage: vi.fn(),
  availableLanguages: DEFAULT_AVAILABLE_LANGUAGES,
  themeType: 'light',
  setTheme: vi.fn(),
  shouldMatchSystem: false,
  setShouldMatchSystem: vi.fn(),
};

const setMockSetting = <K extends keyof MockState>(key: K, value: MockState[K]) => {
  mockState[key] = value;
};

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%toolbar_userProfile_label%': 'User Profile',
      '%userProfile_header_defaultName%': 'User Profile',
      '%userProfile_header_notRegistered%': 'Not registered',
      '%userProfile_interfaceMode_simple_label%': 'Simple Mode',
      '%userProfile_interfaceMode_simple_description%': 'Streamlined',
      '%userProfile_interfaceMode_power_label%': 'Power Mode',
      '%userProfile_interfaceMode_power_description%': 'Full',
      '%userProfile_profileAndRegistration%': 'Profile & Registration',
      '%userProfile_networkSettings%': 'Network Settings',
      '%userProfile_language%': 'Language',
      '%userProfile_appearance%': 'Appearance',
      '%userProfile_appearance_light%': 'Light',
      '%userProfile_appearance_dark%': 'Dark',
      '%userProfile_appearance_system%': 'Follow system',
    },
  ]),
  useSetting: vi.fn((key: string) => {
    if (key === 'platform.interfaceMode')
      return [mockState.interfaceMode, mockState.setInterfaceMode, vi.fn(), false];
    if (key === 'platform.interfaceLanguage')
      return [mockState.interfaceLanguage, mockState.setInterfaceLanguage, vi.fn(), false];
    return [undefined, vi.fn(), vi.fn(), false];
  }),
  useData: vi.fn(() => ({
    CurrentTheme: vi.fn(() => [
      {
        type: mockState.themeType,
        id: mockState.themeType,
        themeFamilyId: mockState.themeType,
        label: mockState.themeType,
        cssVariables: {},
      },
      mockState.setTheme,
    ]),
    ShouldMatchSystem: vi.fn(() => [mockState.shouldMatchSystem, mockState.setShouldMatchSystem]),
    AvailableInterfaceLanguages: vi.fn(() => [mockState.availableLanguages]),
  })),
  useDataProvider: vi.fn(() => undefined),
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(async () => ({ name: '', code: '', email: '', supporterName: '' })),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn() },
}));

// Reset mock state and call history between tests so each test starts from a known baseline.
beforeEach(() => {
  setMockSetting('interfaceMode', 'simple');
  setMockSetting('setInterfaceMode', vi.fn());
  setMockSetting('interfaceLanguage', ['en']);
  setMockSetting('setInterfaceLanguage', vi.fn());
  setMockSetting('availableLanguages', DEFAULT_AVAILABLE_LANGUAGES);
  setMockSetting('themeType', 'light');
  setMockSetting('setTheme', vi.fn());
  setMockSetting('shouldMatchSystem', false);
  setMockSetting('setShouldMatchSystem', vi.fn());
  vi.mocked(sendCommand).mockClear();
});

describe('UserProfilePopover', () => {
  test('renders the trigger button with the user profile aria-label', () => {
    render(<UserProfilePopover />);
    expect(screen.getByTestId('user-profile-popover-trigger')).toBeInTheDocument();
    expect(screen.getByLabelText('User Profile')).toBeInTheDocument();
  });

  test('opens the popover when the trigger is clicked', async () => {
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });
});

describe('UserProfilePopover header', () => {
  test('shows skeleton placeholders while registration fetch is pending', async () => {
    let resolveFetch: (v: {
      name: string;
      code: string;
      email: string;
      supporterName: string;
    }) => void = () => {};
    vi.mocked(sendCommand).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    expect(await screen.findByTestId('user-profile-name-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('user-profile-email-skeleton')).toBeInTheDocument();
    resolveFetch({ name: '', code: '', email: '', supporterName: '' });
  });

  test('renders registered name and email when fetch resolves with data', async () => {
    vi.mocked(sendCommand).mockResolvedValueOnce({
      name: 'Alice Translator',
      code: '******-******-******-******-******',
      email: 'alice@example.com',
      supporterName: '',
    });
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    await waitFor(() => expect(screen.getByText('Alice Translator')).toBeInTheDocument());
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });

  test('renders fallback "User Profile" and "Not registered" when fetch resolves empty', async () => {
    vi.mocked(sendCommand).mockResolvedValueOnce({
      name: '',
      code: '',
      email: '',
      supporterName: '',
    });
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    await waitFor(() =>
      expect(screen.getByTestId('user-profile-name')).toHaveTextContent('User Profile'),
    );
    expect(screen.getByTestId('user-profile-email')).toHaveTextContent('Not registered');
  });

  test('renders the name and OMITS the email row when name is set but email is blank', async () => {
    vi.mocked(sendCommand).mockResolvedValueOnce({
      name: 'Alice Translator',
      code: '******-******-******-******-******',
      email: '',
      supporterName: '',
    });
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    await waitFor(() => expect(screen.getByText('Alice Translator')).toBeInTheDocument());
    expect(screen.queryByTestId('user-profile-email')).not.toBeInTheDocument();
  });
});

describe('UserProfilePopover interface mode', () => {
  test('toggles to Power Mode when Power is clicked from Simple', () => {
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    fireEvent.click(screen.getByTestId('user-profile-interface-mode-power'));
    expect(mockState.setInterfaceMode).toHaveBeenCalledWith('power');
  });

  test('ignores deselect attempt on the already-selected mode', () => {
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    fireEvent.click(screen.getByTestId('user-profile-interface-mode-simple'));
    expect(mockState.setInterfaceMode).not.toHaveBeenCalled();
  });
});

describe('UserProfilePopover action rows', () => {
  test('"Profile & Registration" click sends the command and closes the popover', async () => {
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    const button = await screen.findByTestId('user-profile-action-registration');
    fireEvent.click(button);
    expect(vi.mocked(sendCommand)).toHaveBeenCalledWith(
      'paratextRegistration.showParatextRegistration',
    );
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  test('"Network Settings" click sends the command and closes the popover', async () => {
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    const button = await screen.findByTestId('user-profile-action-network');
    fireEvent.click(button);
    expect(vi.mocked(sendCommand)).toHaveBeenCalledWith(
      'paratextRegistration.showInternetSettings',
    );
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});

describe('UserProfilePopover language picker', () => {
  test('renders one pill per available language with the primary selected', async () => {
    setMockSetting('interfaceLanguage', ['en', 'es']);
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    expect(await screen.findByTestId('user-profile-language-en')).toBeInTheDocument();
    expect(screen.getByTestId('user-profile-language-en')).toHaveAttribute('data-state', 'on');
  });

  test('clicking a non-primary language moves it to the front, preserving fallbacks', async () => {
    setMockSetting('interfaceLanguage', ['en', 'es']);
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    // 'en' is selectable but already primary - select 'es' instead
    fireEvent.click(await screen.findByTestId('user-profile-language-es'));
    expect(mockState.setInterfaceLanguage).toHaveBeenCalledWith(['es', 'en']);
  });

  test('clicking the already-primary language is a no-op (deselect attempt ignored)', async () => {
    setMockSetting('interfaceLanguage', ['en']);
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    fireEvent.click(await screen.findByTestId('user-profile-language-en'));
    expect(mockState.setInterfaceLanguage).not.toHaveBeenCalled();
  });

  test('renders English first, then the rest alphabetically by BCP-47 tag', async () => {
    setMockSetting('availableLanguages', {
      fr: { autonym: 'Français' },
      es: { autonym: 'Español' },
      en: { autonym: 'English' },
      de: { autonym: 'Deutsch' },
    });
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    await screen.findByTestId('user-profile-language-en');
    const pills = Array.from(
      document.querySelectorAll('[data-testid^="user-profile-language-"]'),
    ).map((el) => el.getAttribute('data-testid'));
    expect(pills).toEqual([
      'user-profile-language-en',
      'user-profile-language-de',
      'user-profile-language-es',
      'user-profile-language-fr',
    ]);
  });
});

describe('UserProfilePopover appearance', () => {
  test('selected pill is "system" when shouldMatchSystem is true', async () => {
    setMockSetting('shouldMatchSystem', true);
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    expect(await screen.findByTestId('user-profile-appearance-system')).toHaveAttribute(
      'data-state',
      'on',
    );
  });

  test('selected pill is theme.type when shouldMatchSystem is false', async () => {
    setMockSetting('themeType', 'dark');
    setMockSetting('shouldMatchSystem', false);
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    expect(await screen.findByTestId('user-profile-appearance-dark')).toHaveAttribute(
      'data-state',
      'on',
    );
  });

  test('clicking Light while in system mode disables shouldMatchSystem and sets type=light', async () => {
    setMockSetting('themeType', 'dark');
    setMockSetting('shouldMatchSystem', true);
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    fireEvent.click(await screen.findByTestId('user-profile-appearance-light'));
    expect(mockState.setShouldMatchSystem).toHaveBeenCalledWith(false);
    expect(mockState.setTheme).toHaveBeenCalledWith({ type: 'light' });
  });

  test('clicking Dark while NOT in system mode only calls setTheme', async () => {
    setMockSetting('themeType', 'light');
    setMockSetting('shouldMatchSystem', false);
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    fireEvent.click(await screen.findByTestId('user-profile-appearance-dark'));
    expect(mockState.setShouldMatchSystem).not.toHaveBeenCalled();
    expect(mockState.setTheme).toHaveBeenCalledWith({ type: 'dark' });
  });

  test('clicking System calls setShouldMatchSystem(true)', async () => {
    setMockSetting('themeType', 'light');
    setMockSetting('shouldMatchSystem', false);
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));
    fireEvent.click(await screen.findByTestId('user-profile-appearance-system'));
    expect(mockState.setShouldMatchSystem).toHaveBeenCalledWith(true);
    expect(mockState.setTheme).not.toHaveBeenCalled();
  });
});
