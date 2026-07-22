import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InternetPlaceholderStep } from './internet.placeholder.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_step_internet_placeholder%': 'Internet settings (coming soon)',
    },
    false,
  ]),
}));

describe('placeholder steps', () => {
  it('internet placeholder renders its coming-soon text', () => {
    render(<InternetPlaceholderStep />);
    expect(screen.getByText(/internet settings/i)).toBeInTheDocument();
  });
});
