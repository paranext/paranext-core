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
  '%paratextRegistration_label_serverType_option_QualityAssurance%': 'Quality Assurance',
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
    expect(screen.getByTestId('server-type-quality-assurance')).toBeDisabled();
    expect(screen.getByTestId('server-type-development')).toBeDisabled();
    expect(screen.getByTestId('server-type-test')).toBeDisabled();
  });

  test('Quality Assurance item is active when selectedServer is QualityAssurance', () => {
    renderSection({ selectedServer: 'QualityAssurance' });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-quality-assurance')).toHaveAttribute(
      'data-state',
      'checked',
    );
    expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'unchecked');
    expect(screen.getByTestId('server-type-development')).toHaveAttribute(
      'data-state',
      'unchecked',
    );
    expect(screen.getByTestId('server-type-test')).toHaveAttribute('data-state', 'unchecked');
  });

  test('clicking Quality Assurance calls onServerChange with QualityAssurance', () => {
    const onServerChange = vi.fn();
    renderSection({ onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    fireEvent.click(screen.getByTestId('server-type-quality-assurance'));
    expect(onServerChange).toHaveBeenCalledWith('QualityAssurance');
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

  // A radio fires no change event when the already-checked item is clicked. Every ServerType has a
  // row of its own, so no persisted value is left unrepresented: the click is simply inert, and no
  // redundant save reaches the wizard's immediate-apply path.
  test('clicking the already-selected item does not call onServerChange', () => {
    const onServerChange = vi.fn();
    renderSection({ selectedServer: 'Production', onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    fireEvent.click(screen.getByTestId('server-type-production'));
    expect(onServerChange).not.toHaveBeenCalled();
  });

  test('every ServerType value keeps exactly one item checked', () => {
    const testIdsByServer = {
      Production: 'server-type-production',
      QualityAssurance: 'server-type-quality-assurance',
      Development: 'server-type-development',
      Test: 'server-type-test',
    } as const;

    Object.entries(testIdsByServer).forEach(([server, checkedTestId]) => {
      const { unmount } = renderSection({
        // The keys of testIdsByServer are exactly the ServerType union, but Object.entries widens
        // them to string, and ServerType is not exported for a narrowing guard.
        // eslint-disable-next-line no-type-assertion/no-type-assertion -- see comment above
        selectedServer: server as DeveloperSectionProps['selectedServer'],
      });
      fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
      Object.values(testIdsByServer).forEach((testId) => {
        expect(screen.getByTestId(testId)).toHaveAttribute(
          'data-state',
          testId === checkedTestId ? 'checked' : 'unchecked',
        );
      });
      unmount();
    });
  });
});
