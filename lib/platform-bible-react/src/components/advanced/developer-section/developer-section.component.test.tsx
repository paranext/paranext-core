// @vitest-environment jsdom

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import { DeveloperSection, type DeveloperSectionProps } from './developer-section.component';

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
  '%paratextRegistration_developer_section_label%': 'Developer only',
  '%paratextRegistration_label_serverType_option_Production%': 'Production',
  '%paratextRegistration_label_serverType_option_Development%': 'Development',
  '%paratextRegistration_label_serverType_option_Test%': 'Test',
};

function renderSection(overrides: Partial<DeveloperSectionProps> = {}) {
  const defaults: DeveloperSectionProps = {
    localizedStrings: mockLocalizedStrings,
    selectedServer: 'Production',
    onServerChange: vi.fn(),
    disabled: false,
  };
  return render(<DeveloperSection {...defaults} {...overrides} />);
}

describe('DeveloperSection', () => {
  test('server radios not visible when collapsed (default)', () => {
    renderSection();
    expect(screen.getByTestId('server-type-production')).not.toBeVisible();
    expect(screen.getByTestId('server-type-development')).not.toBeVisible();
    expect(screen.getByTestId('server-type-test')).not.toBeVisible();
  });

  test('clicking the header expands the section and shows the radios', () => {
    renderSection();
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-production')).toBeVisible();
    expect(screen.getByTestId('server-type-development')).toBeVisible();
    expect(screen.getByTestId('server-type-test')).toBeVisible();
  });

  test('server choices render as radio buttons labeled by their server names', () => {
    renderSection();
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByRole('radio', { name: 'Production' })).toBe(
      screen.getByTestId('server-type-production'),
    );
    expect(screen.getByRole('radio', { name: 'Test' })).toBe(
      screen.getByTestId('server-type-test'),
    );
    expect(screen.getByRole('radio', { name: 'Development' })).toBe(
      screen.getByTestId('server-type-development'),
    );
    // The group takes its accessible name from the disclosure header rather than a new string.
    expect(screen.getByRole('radiogroup')).toHaveAccessibleName(/Developer only/);
  });

  test('clicking the header again collapses the section', () => {
    renderSection();
    const header = screen.getByRole('button', { name: /Developer only/ });
    fireEvent.click(header);
    fireEvent.click(header);
    expect(screen.getByTestId('server-type-production')).not.toBeVisible();
  });

  test('Production item is active when selectedServer is Production', () => {
    renderSection({ selectedServer: 'Production' });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'checked');
    expect(screen.getByTestId('server-type-development')).toHaveAttribute(
      'data-state',
      'unchecked',
    );
  });

  test('Development item is active when selectedServer is Development', () => {
    renderSection({ selectedServer: 'Development' });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-development')).toHaveAttribute('data-state', 'checked');
    expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'unchecked');
  });

  test('clicking Development calls onServerChange with Development', () => {
    const onServerChange = vi.fn();
    renderSection({ onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    fireEvent.click(screen.getByTestId('server-type-development'));
    expect(onServerChange).toHaveBeenCalledWith('Development');
  });

  test('disabled prop makes radio items non-interactive', () => {
    renderSection({ disabled: true });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-production')).toBeDisabled();
    expect(screen.getByTestId('server-type-development')).toBeDisabled();
    expect(screen.getByTestId('server-type-test')).toBeDisabled();
  });

  test('the Test item is active when selectedServer is Test', () => {
    renderSection({ selectedServer: 'Test' });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-test')).toHaveAttribute('data-state', 'checked');
    expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'unchecked');
  });

  test('clicking Test calls onServerChange with Test', () => {
    const onServerChange = vi.fn();
    renderSection({ onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    fireEvent.click(screen.getByTestId('server-type-test'));
    expect(onServerChange).toHaveBeenCalledWith('Test');
  });

  // Test has its own row, so — unlike hidden QA — a Test user is already on a checked row of their
  // own. Clicking Production must move them, and the escape hatch must not fire behind their back.
  test('a Test user is not silently re-routed to Production', () => {
    const onServerChange = vi.fn();
    renderSection({ selectedServer: 'Test', onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    fireEvent.click(screen.getByTestId('server-type-test'));
    expect(onServerChange).not.toHaveBeenCalledWith('Production');
  });

  // Since Test got a row of its own (PT-4312), QA is the only value left with no row — so it is the
  // only one that still needs the escape hatch below.
  describe('with a hidden QualityAssurance server', () => {
    const server = 'QualityAssurance' as const;

    test('displays Production as the checked option', () => {
      renderSection({ selectedServer: server });
      fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
      expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'checked');
      expect(screen.getByTestId('server-type-development')).toHaveAttribute(
        'data-state',
        'unchecked',
      );
    });

    test('clicking the checked Production radio persists the real Production value', () => {
      const onServerChange = vi.fn();
      renderSection({ selectedServer: server, onServerChange });
      fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
      // Production already displays as checked, so Radix fires no onValueChange. The component must
      // still persist Production, or this user has no one-click route back to it.
      fireEvent.click(screen.getByTestId('server-type-production'));
      expect(onServerChange).toHaveBeenCalledWith('Production');
    });
  });

  // The escape hatch's guard: without it, every click on the already-selected Production radio would
  // fire a redundant save — which in the wizard's immediate-apply path means a needless PAPI write
  // and a disabled/enabled flicker on the Next button.
  test('clicking Production when Production is already selected does not call onServerChange', () => {
    const onServerChange = vi.fn();
    renderSection({ selectedServer: 'Production', onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    fireEvent.click(screen.getByTestId('server-type-production'));
    expect(onServerChange).not.toHaveBeenCalled();
  });
});
