import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { UserProfilePopover } from './user-profile-popover.component';

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
  useSetting: vi.fn(() => ['simple', vi.fn(), vi.fn(), false]),
  useData: vi.fn(() => ({
    CurrentTheme: vi.fn(() => [
      { type: 'light', id: 'light', themeFamilyId: 'light', label: 'Light', cssVariables: {} },
      vi.fn(),
    ]),
    ShouldMatchSystem: vi.fn(() => [false, vi.fn()]),
    AvailableInterfaceLanguages: vi.fn(() => [{ en: { autonym: 'English' } }]),
  })),
  useDataProvider: vi.fn(() => undefined),
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(async () => ({ name: '', code: '', email: '', supporterName: '' })),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn() },
}));

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
