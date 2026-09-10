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
    expect(screen.getByTestId('server-type-quality-assurance')).toBeDisabled();
    expect(screen.getByTestId('server-type-development')).toBeDisabled();
    expect(screen.getByTestId('server-type-test')).toBeDisabled();
  });

  test('Quality Assurance item is active when selectedServer is QualityAssurance', () => {
    renderSection({ selectedServer: 'QualityAssurance' });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    expect(screen.getByTestId('server-type-quality-assurance')).toHaveAttribute('data-state', 'on');
    expect(screen.getByTestId('server-type-production')).toHaveAttribute('data-state', 'off');
    expect(screen.getByTestId('server-type-development')).toHaveAttribute('data-state', 'off');
    expect(screen.getByTestId('server-type-test')).toHaveAttribute('data-state', 'off');
  });

  test('clicking Quality Assurance calls onServerChange with QualityAssurance', () => {
    const onServerChange = vi.fn();
    renderSection({ onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    fireEvent.click(screen.getByTestId('server-type-quality-assurance'));
    expect(onServerChange).toHaveBeenCalledWith('QualityAssurance');
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

  test('clicking the already-active Test item does not switch servers', () => {
    const onServerChange = vi.fn();
    renderSection({ selectedServer: 'Test', onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    // Radix fires deselect (value='') when the active item is clicked. There is no "no server"
    // state, so the deselect is ignored rather than re-routed to another server.
    fireEvent.click(screen.getByTestId('server-type-test'));
    expect(onServerChange).not.toHaveBeenCalled();
  });

  test('clicking the already-active Quality Assurance item does not switch servers', () => {
    const onServerChange = vi.fn();
    renderSection({ selectedServer: 'QualityAssurance', onServerChange });
    fireEvent.click(screen.getByRole('button', { name: /Developer only/ }));
    fireEvent.click(screen.getByTestId('server-type-quality-assurance'));
    expect(onServerChange).not.toHaveBeenCalled();
  });

  test('every ServerType value keeps exactly one item active', () => {
    const testIdsByServer = {
      Production: 'server-type-production',
      QualityAssurance: 'server-type-quality-assurance',
      Development: 'server-type-development',
      Test: 'server-type-test',
    } as const;

    Object.entries(testIdsByServer).forEach(([server, activeTestId]) => {
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
          testId === activeTestId ? 'on' : 'off',
        );
      });
      unmount();
    });
  });
});
