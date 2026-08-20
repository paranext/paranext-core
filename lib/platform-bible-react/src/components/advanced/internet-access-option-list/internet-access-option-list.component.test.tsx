// @vitest-environment jsdom

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import { queryVisibleTooltips } from '@/components/shadcn-ui/tooltip.test-utils';
import {
  InternetAccessOptionList,
  type InternetAccessOptionListProps,
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

describe('InternetAccessOptionList', () => {
  test('renders all 5 option labels', () => {
    renderList();
    ROWS.forEach(([label]) => expect(screen.getByLabelText(label)).toBeInTheDocument());
  });

  // The descriptions moved out of always-visible <p>s and into hover tooltips. Assertions here are
  // structural rather than visibility-based: vitest loads no stylesheet, so `tw:sr-only` computes
  // to nothing and toBeVisible() would pass for anything in the DOM. The "is it actually hidden
  // from sighted users" check lives in the Playwright spec, where real CSS applies.
  test('descriptions are not rendered as visible paragraphs', () => {
    const { container } = renderList();
    const paragraphs = Array.from(container.querySelectorAll('p')).map((p) => p.textContent);
    // The list renders no body copy at all now that the coming-soon footer is gone — every
    // description reaches sighted users through a tooltip and assistive tech through an sr-only span.
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

  test('the description is not part of the radio accessible name', () => {
    renderList();
    expect(screen.getByLabelText('Unrestricted')).toHaveAccessibleName('Unrestricted');
  });

  // Without a visible marker, nothing on the row hints that a description exists and users who
  // click straight through never see one. Decorative, so it must stay out of the a11y tree.
  test('every row shows an info affordance, hidden from assistive tech', () => {
    const { container } = renderList();
    const icons = container.querySelectorAll('svg.lucide-info');
    expect(icons).toHaveLength(ROWS.length);
    icons.forEach((icon) => expect(icon).toHaveAttribute('aria-hidden', 'true'));
  });

  const visibleTooltips = queryVisibleTooltips;

  function rowFor(label: string) {
    const row = screen.getByLabelText(label).closest('[data-slot="tooltip-trigger"]');
    if (!row) throw new Error(`expected the "${label}" row to be the tooltip trigger`);
    return row;
  }

  test('hovering anywhere on a row reveals its description in a tooltip', async () => {
    const user = userEvent.setup();
    renderList();
    expect(visibleTooltips()).toHaveLength(0);

    // Hover the row (the trigger wrapping both the radio and the label), not the radio itself.
    await user.hover(rowFor('Unrestricted'));

    await waitFor(() => expect(visibleTooltips()).toHaveLength(1));
    expect(visibleTooltips()[0]).toHaveTextContent('Desc Enabled sentinel');
  });

  // The standalone panel focuses the checked radio when its fetch resolves. Radix opens a tooltip on
  // any focus, so without the trigger's focus guard that would pop a description open unprompted
  // every time the panel loads. (jsdom never reports :focus-visible, so the positive keyboard case
  // lives in the Storybook browser story instead.)
  test('programmatic focus on a radio does not reveal a tooltip', async () => {
    renderList({ value: 'VpnRequired' });

    act(() => screen.getByLabelText('Disable access sentinel').focus());

    await waitFor(() => expect(visibleTooltips()).toHaveLength(0));
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
