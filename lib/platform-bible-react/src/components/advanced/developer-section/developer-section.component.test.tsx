// @vitest-environment jsdom

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { LanguageStrings } from 'platform-bible-utils';
import { DeveloperSection, type DeveloperSectionProps } from './developer-section.component';

// Radix ToggleGroup uses ResizeObserver internally; jsdom doesn't provide it, so stub a no-op.
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
  test('server toggle not visible when collapsed (default)', () => {
    renderSection();
    expect(screen.getByTestId('server-type-production')).not.toBeVisible();
    expect(screen.getByTestId('server-type-development')).not.toBeVisible();
  });

  test('clicking the header expands the section and shows the toggle', () => {
    renderSection();
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-production')).toBeVisible();
    expect(screen.getByTestId('server-type-development')).toBeVisible();
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
    expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'on');
    expect(screen.getByTestId('server-type-development')).toHaveAttribute('data-state', 'off');
  });

  test('Development item is active when selectedServer is Development', () => {
    renderSection({ selectedServer: 'Development' });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-development')).toHaveAttribute('data-state', 'on');
    expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'off');
  });

  test('clicking Development calls onServerChange with Development', () => {
    const onServerChange = vi.fn();
    renderSection({ onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    fireEvent.click(screen.getByTestId('server-type-development'));
    expect(onServerChange).toHaveBeenCalledWith('Development');
  });

  test('disabled prop makes toggle items non-interactive', () => {
    renderSection({ disabled: true });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-production')).toBeDisabled();
    expect(screen.getByTestId('server-type-development')).toBeDisabled();
    expect(screen.getByTestId('server-type-test')).toBeDisabled();
  });

  test('QualityAssurance selectedServer displays as Production being active', () => {
    renderSection({ selectedServer: 'QualityAssurance' });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'on');
    expect(screen.getByTestId('server-type-development')).toHaveAttribute('data-state', 'off');
    expect(screen.getByTestId('server-type-test')).toHaveAttribute('data-state', 'off');
  });

  test('shows the Test item as active when selectedServer is Test', () => {
    renderSection({ selectedServer: 'Test' });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-test')).toHaveAttribute('data-state', 'on');
    expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'off');
    expect(screen.getByTestId('server-type-development')).toHaveAttribute('data-state', 'off');
  });

  test('clicking Test calls onServerChange with Test', () => {
    const onServerChange = vi.fn();
    renderSection({ onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    fireEvent.click(screen.getByTestId('server-type-test'));
    expect(onServerChange).toHaveBeenCalledWith('Test');
  });

  test('clicking the already-active Test item does not switch servers (Test is visible, not hidden)', () => {
    const onServerChange = vi.fn();
    renderSection({ selectedServer: 'Test', onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    // Radix fires deselect (value='') when the active item is clicked. Unlike a hidden QA value,
    // Test is directly re-selectable, so it must NOT be re-routed to Production.
    fireEvent.click(screen.getByTestId('server-type-test'));
    expect(onServerChange).not.toHaveBeenCalled();
  });

  test('clicking Production while on hidden QA calls onServerChange with Production (escape hatch)', () => {
    const onServerChange = vi.fn();
    renderSection({ selectedServer: 'QualityAssurance', onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    // Clicking the already-active Production item triggers Radix deselect (value='').
    // The component must intercept this and call onServerChange('Production').
    fireEvent.click(screen.getByTestId('server-type-production'));
    expect(onServerChange).toHaveBeenCalledWith('Production');
  });
});
