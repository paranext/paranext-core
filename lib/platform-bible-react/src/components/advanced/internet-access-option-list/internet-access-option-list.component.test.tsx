// @vitest-environment jsdom

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import { queryVisibleTooltips } from '@/components/shadcn-ui/tooltip.test-utils';
import {
  InternetAccessOptionList,
  isSupportedInternetUse,
  type InternetAccessOptionListProps,
  type InternetUse,
} from './internet-access-option-list.component';

// Radix RadioGroup and the Tooltip's Popper positioning both use ResizeObserver internally; jsdom
// doesn't provide it, so stub a no-op.
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
  '%paratextRegistration_description_internetUse_option_Disabled_2%': 'Disable ALL sentinel',
  '%paratextRegistration_description_internetUse_option_Disabled_details%':
    'Desc Disabled sentinel',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%':
    'Block sensitive sentinel',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%':
    'Desc Sensitive sentinel',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_2%': 'Configure proxy sentinel',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_details%': 'Desc Proxy sentinel',
  '%paratextRegistration_internetUse_comingSoon%': 'Coming soon',
  '%paratextRegistration_internetUse_unsupportedSelection_title%': 'Not supported sentinel',
  '%paratextRegistration_internetUse_unsupportedSelection_description%':
    '{selectedOption} is not supported sentinel',
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

/** The five [label, description] pairs, in render order. */
const ROWS: [label: string, description: string][] = [
  ['Unrestricted', 'Desc Enabled sentinel'],
  ['Disable access sentinel', 'Desc VPN sentinel'],
  ['Disable ALL sentinel', 'Desc Disabled sentinel'],
  ['Block sensitive sentinel', 'Desc Sensitive sentinel'],
  ['Configure proxy sentinel', 'Desc Proxy sentinel'],
];

/** A row's info button, found by the description it carries as its accessible name. */
function infoButtonFor(description: string) {
  return screen.getByRole('button', { name: description });
}

describe('InternetAccessOptionList', () => {
  test('renders all 5 option labels', () => {
    renderList();
    ROWS.forEach(([label]) => expect(screen.getByLabelText(label)).toBeInTheDocument());
  });

  // Descriptions live in tooltips, not in always-visible <p>s. Assertions here are
  // structural rather than visibility-based: vitest loads no stylesheet, so `tw:sr-only` computes
  // to nothing and toBeVisible() would pass for anything in the DOM. The "is it actually hidden
  // from sighted users" check lives in the Playwright spec, where real CSS applies.
  test('descriptions are not rendered as visible paragraphs', () => {
    const { container } = renderList();
    const paragraphs = Array.from(container.querySelectorAll('p')).map((p) => p.textContent);
    // Every description reaches sighted users through a tooltip and assistive tech through an
    // sr-only span, so the list carries no body copy at all.
    ROWS.forEach(([, description]) => expect(paragraphs).not.toContain(description));
    expect(paragraphs).toEqual([]);
  });

  test('every row, including the disabled coming-soon ones, describes its radio for screen readers', () => {
    renderList();
    ROWS.forEach(([label, description]) => {
      const radio = screen.getByLabelText(label);
      const describedById = radio.getAttribute('aria-describedby');
      expect(describedById).toBeTruthy();
      const descriptionEl = document.getElementById(describedById ?? '');
      expect(descriptionEl).toHaveTextContent(description);
      // Visually hidden so the list stays uncluttered, but still in the accessibility tree.
      expect(descriptionEl).toHaveClass('tw:sr-only');
    });
  });

  // The info button sits beside the label, not inside it, precisely so this holds.
  test('the description is not part of the radio accessible name', () => {
    renderList();
    expect(screen.getByLabelText('Unrestricted')).toHaveAccessibleName('Unrestricted');
  });

  // Without a visible marker, nothing on a row hints that a description exists. It is a real button
  // rather than a decorative icon so every description is reachable by keyboard — including on the
  // coming-soon rows, whose disabled radios never take focus.
  test('every row, including the coming-soon ones, has an info button named by its description', () => {
    renderList();
    ROWS.forEach(([, description]) => expect(infoButtonFor(description)).toBeEnabled());
  });

  // The description explains the option rather than being part of the setting, so loading or
  // saving the setting must not take it away.
  test('info buttons stay usable while the list is disabled', () => {
    renderList({ disabled: true });
    ROWS.forEach(([, description]) => expect(infoButtonFor(description)).toBeEnabled());
  });

  const visibleTooltips = queryVisibleTooltips;

  test("hovering a row's info button reveals its description in a tooltip", async () => {
    const user = userEvent.setup();
    renderList();
    expect(visibleTooltips()).toHaveLength(0);

    await user.hover(infoButtonFor('Desc Enabled sentinel'));

    await waitFor(() => expect(visibleTooltips()).toHaveLength(1));
    expect(visibleTooltips()[0]).toHaveTextContent('Desc Enabled sentinel');
  });

  // The standalone panel focuses the checked radio when its fetch resolves. Descriptions open only
  // from the info buttons, so that load-time focus must not pop one open.
  test('programmatic focus on a radio does not reveal a tooltip', async () => {
    renderList({ value: 'VpnRequired' });

    act(() => screen.getByLabelText('Disable access sentinel').focus());

    await waitFor(() => expect(visibleTooltips()).toHaveLength(0));
  });

  test("tabbing reaches a coming-soon row's info button and reveals its description", async () => {
    const user = userEvent.setup();
    renderList({ value: 'Enabled' });
    expect(visibleTooltips()).toHaveLength(0);

    // Roving tabindex gives the radio group a single tab stop, on the checked radio; each info
    // button after it is a tab stop of its own, in row order.
    await user.tab();
    expect(screen.getByLabelText('Unrestricted')).toHaveFocus();
    await user.tab(); // Unrestricted's info button
    await user.tab(); // Disable access's info button
    await user.tab(); // Disable ALL's info button, on the first coming-soon row
    expect(infoButtonFor('Desc Disabled sentinel')).toHaveFocus();

    await waitFor(() => expect(visibleTooltips()).toHaveLength(1));
    expect(visibleTooltips()[0]).toHaveTextContent('Desc Disabled sentinel');
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

  // InternetSettings.xml is seeded once from a co-installed Paratext 9 on first launch, so it can
  // name an option this app does not implement yet. Showing the row selected under a banner is what
  // keeps that from looking like the app quietly picked something else.
  describe('a stored value the app cannot honor', () => {
    // role="status" (polite), not Alert's assertive default: the setting was already stored before
    // the user arrived, so announcing it must not interrupt whatever is being read.
    test.each(['Disabled', 'ProxyOnly'] as const)('%s is announced in a banner', (value) => {
      renderList({ value });
      expect(screen.getByRole('status')).toHaveTextContent('Not supported sentinel');
    });

    test('the banner names the option that is selected', () => {
      renderList({ value: 'ProxyOnly' });
      expect(screen.getByRole('status')).toHaveTextContent(
        'Configure proxy sentinel is not supported sentinel',
      );
    });

    // A value with no row at all selects nothing, so without this the wizard would hold Next shut
    // with nothing on screen explaining why. It can only be named by its raw form.
    test('a value with no row of its own still raises the banner, named by its raw value', () => {
      // The point of the test is a value outside the union — a settings file can carry one, and the
      // type cannot express it. Asserting is the only way to hand the component that input.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      renderList({ value: 'SomethingNewer' as InternetUse });
      expect(screen.queryByRole('radio', { checked: true })).not.toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveTextContent(
        'SomethingNewer is not supported sentinel',
      );
    });

    test('the row stays selected rather than being silently swapped', () => {
      renderList({ value: 'Disabled' });
      const radio = screen.getByLabelText('Disable ALL sentinel');
      expect(radio).toBeChecked();
      expect(radio).toBeDisabled();
    });

    test.each(['Enabled', 'VpnRequired'] as const)('%s shows no banner', (value) => {
      renderList({ value });
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  // Consumers that gate on a usable selection (the first-run wizard's Next button) read this
  // instead of re-deriving which options the app implements.
  describe('isSupportedInternetUse', () => {
    test.each(['Enabled', 'VpnRequired'] as const)('%s is supported', (value) => {
      expect(isSupportedInternetUse(value)).toBe(true);
    });

    test.each(['Disabled', 'ProxyOnly'] as const)('%s is not supported', (value) => {
      expect(isSupportedInternetUse(value)).toBe(false);
    });
  });
});
