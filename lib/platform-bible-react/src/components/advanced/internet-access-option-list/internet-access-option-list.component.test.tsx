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
  '%paratextRegistration_description_internetUse_option_Disabled_2%': 'Disable all sentinel',
  '%paratextRegistration_description_internetUse_option_Disabled_details%':
    'Desc Disabled sentinel',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_2%': 'Configure proxy sentinel',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_details%': 'Desc Proxy sentinel',
  '%paratextRegistration_internetUse_comingSoon%': 'Coming soon',
  '%paratextRegistration_internetUse_footer_2%': 'Footer text sentinel',
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
    expect(screen.getByLabelText('Disable all sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc Disabled sentinel')).toBeInTheDocument();
    expect(screen.getByLabelText('Configure proxy sentinel')).toBeInTheDocument();
    expect(screen.getByText('Desc Proxy sentinel')).toBeInTheDocument();
    expect(screen.getByText('Footer text sentinel')).toBeInTheDocument();
  });

  // Asserts which values are offered, not how many: two rows saving one value would offer the user
  // a choice that isn't one, and a count alone cannot tell that apart from a legitimate new option.
  test('offers one radio per internet use value', () => {
    renderList();
    expect(screen.getAllByRole('radio').map((radio) => radio.id)).toEqual([
      'internet-option-Enabled',
      'internet-option-VpnRequired',
      'internet-option-Disabled',
      'internet-option-ProxyOnly',
    ]);
  });

  test('showFooter={false} hides the footer', () => {
    renderList({ showFooter: false });
    expect(screen.queryByText('Footer text sentinel')).not.toBeInTheDocument();
  });

  // `Disabled` is the only value that blocks ParatextData's network access unconditionally, so it
  // must stay selectable alongside the others.
  test.each([
    ['Unrestricted', 'Enabled'],
    ['Sensitive sentinel', 'VpnRequired'],
    ['Disable all sentinel', 'Disabled'],
  ])('clicking %s reports %s to the caller', (label, expectedValue) => {
    const onChange = vi.fn();
    // Starts on the one row that is never the click target, so every case is a real change.
    renderList({ value: 'ProxyOnly', onChange });
    fireEvent.click(screen.getByLabelText(label));
    expect(onChange).toHaveBeenCalledWith(expectedValue);
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

  // The relabelled option only blocks where the location cannot be confirmed, so its description is
  // load-bearing: a screen reader that announces the label alone loses that qualification.
  test('each radio is described by its own description text', () => {
    renderList();
    const sensitiveLocations = screen.getByLabelText('Sensitive sentinel');
    const describedBy = sensitiveLocations.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy ?? '')).toHaveTextContent('Desc Sensitive sentinel');
  });
});
