// @vitest-environment jsdom

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import {
  InternetAccessOptionList,
  type InternetAccessOptionListProps,
} from './internet-access-option-list.component';

// Radix RadioGroup uses ResizeObserver internally; jsdom doesn't provide it, so stub a no-op.
beforeAll(() => {
  global.ResizeObserver = class {
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // jsdom stub: intentionally no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
});

const mockLocalizedStrings: LanguageStrings = {
  '%paratextRegistration_description_internetUse_option_Enabled_2%': 'Unrestricted',
  '%paratextRegistration_description_internetUse_option_Enabled_details%': 'Desc Enabled sentinel',
  '%paratextRegistration_description_internetUse_option_VpnRequired_2%': 'Disable access sentinel',
  '%paratextRegistration_description_internetUse_option_VpnRequired_details%': 'Desc VPN sentinel',
  '%paratextRegistration_description_internetUse_option_Disabled%': 'Disable ALL sentinel',
  '%paratextRegistration_description_internetUse_option_Disabled_details%':
    'Desc Disabled sentinel',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%':
    'Block sensitive sentinel',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%':
    'Desc Sensitive sentinel',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_2%': 'Configure proxy sentinel',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_details%': 'Desc Proxy sentinel',
  '%paratextRegistration_internetUse_comingSoon%': 'Coming soon',
  '%paratextRegistration_internetUse_footer%': 'Footer text sentinel',
};

function renderList(overrides: Partial<InternetAccessOptionListProps> = {}) {
  const defaults: InternetAccessOptionListProps = {
    localizedStrings: mockLocalizedStrings,
    value: 'VpnRequired',
    onChange: vi.fn(),
    disabled: false,
  };
  return render(<InternetAccessOptionList {...defaults} {...overrides} />);
}

describe('InternetAccessOptionList', () => {
  test('renders all 5 option labels, their descriptions, and the footer', () => {
    renderList();
    expect(screen.getByLabelText('Unrestricted')).toBeInTheDocument();
    expect(screen.getByText('Desc Enabled sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Disable access sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc VPN sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Disable ALL sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc Disabled sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Block sensitive sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc Sensitive sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Configure proxy sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc Proxy sentinel')).toBeInTheDocument();
    expect(screen.getByText('Footer text sentinel')).toBeInTheDocument();
  });

  test('clicking an active option calls onChange with the correct value', () => {
    const onChange = vi.fn();
    renderList({ value: 'VpnRequired', onChange });
    fireEvent.click(screen.getByLabelText('Unrestricted'));
    expect(onChange).toHaveBeenCalledWith('Enabled');
  });

  test('coming-soon radio items are disabled (do not fire onChange)', () => {
    const onChange = vi.fn();
    renderList({ onChange });
    expect(screen.getByLabelText('Disable ALL sentinel')).toBeDisabled();
    expect(screen.getByLabelText('Block sensitive sentinel')).toBeDisabled();
    expect(screen.getByLabelText('Configure proxy sentinel')).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('disabled prop makes all radio items non-interactive', () => {
    renderList({ disabled: true });
    const radios = screen.getAllByRole('radio');
    radios.forEach((r) => expect(r).toBeDisabled());
  });

  test('coming-soon badge appears on exactly 3 rows', () => {
    renderList();
    expect(screen.getAllByText('Coming soon')).toHaveLength(3);
  });

  test('coming-soon badge does not appear on active option rows (options 1 and 2)', () => {
    renderList({ value: 'Enabled' });
    // Options 1 and 2 are active; only options 3-5 have badges
    expect(screen.getAllByText('Coming soon')).toHaveLength(3);
  });
});
