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
  '%paratextRegistration_description_internetUse_option_VpnRequired_3%': 'Sensitive sentinel',
  '%paratextRegistration_description_internetUse_option_VpnRequired_details_2%':
    'Desc Sensitive sentinel',
  '%paratextRegistration_description_internetUse_option_Disabled_2%': 'Disable ALL sentinel',
  '%paratextRegistration_description_internetUse_option_Disabled_details%':
    'Desc Disabled sentinel',
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
  test('renders all 4 option labels, their descriptions, and the footer', () => {
    renderList();
    expect(screen.getByLabelText('Unrestricted')).toBeInTheDocument();
    expect(screen.getByText('Desc Enabled sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Sensitive sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc Sensitive sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Disable ALL sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc Disabled sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Configure proxy sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc Proxy sentinel')).toBeInTheDocument();
    expect(screen.getByText('Footer text sentinel')).toBeInTheDocument();
  });

  // One row per value ParatextData persists. A second row for an existing value (such as a separate
  // "sensitive locations" row beside `VpnRequired`) would offer two choices that save the same thing.
  test('renders exactly one radio per internet use value', () => {
    renderList();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });

  test('showFooter={false} hides the footer but keeps the coming-soon badge', () => {
    renderList({ showFooter: false });
    expect(screen.queryByText('Footer text sentinel')).not.toBeInTheDocument();
    expect(screen.getAllByText('Coming soon')).toHaveLength(1);
  });

  test('clicking an active option calls onChange with the correct value', () => {
    const onChange = vi.fn();
    renderList({ value: 'VpnRequired', onChange });
    fireEvent.click(screen.getByLabelText('Unrestricted'));
    expect(onChange).toHaveBeenCalledWith('Enabled');
  });

  // `Disabled` is the only value that blocks ParatextData's network access unconditionally, so it
  // must stay selectable.
  test('disabling all internet access is selectable and reports Disabled', () => {
    const onChange = vi.fn();
    renderList({ value: 'Enabled', onChange });
    const disableAll = screen.getByLabelText('Disable ALL sentinel');
    expect(disableAll).toBeEnabled();
    fireEvent.click(disableAll);
    expect(onChange).toHaveBeenCalledWith('Disabled');
  });

  test('the coming-soon radio item is disabled (does not fire onChange)', () => {
    const onChange = vi.fn();
    renderList({ onChange });
    const proxy = screen.getByLabelText('Configure proxy sentinel');
    expect(proxy).toBeDisabled();
    fireEvent.click(proxy);
    expect(onChange).not.toHaveBeenCalled();
  });

  test('disabled prop makes all radio items non-interactive', () => {
    renderList({ disabled: true });
    const radios = screen.getAllByRole('radio');
    radios.forEach((r) => expect(r).toBeDisabled());
  });

  test('coming-soon badge appears on exactly 1 row', () => {
    renderList();
    expect(screen.getAllByText('Coming soon')).toHaveLength(1);
  });
});
