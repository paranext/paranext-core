import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { ReferenceHistoryButtons } from './reference-history-buttons.component';

vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => false),
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{}]),
}));

vi.mock('@renderer/services/scroll-group.service-host', () => ({
  getReferenceHistorySync: vi.fn(() => ({ current: undefined, back: [], forward: [] })),
  navigateReferenceHistorySync: vi.fn(() => false),
  onDidChangeReferenceHistory: vi.fn(() => vi.fn()),
}));

describe('ReferenceHistoryButtons — pill and divider by interface mode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the pill container and a divider in simple mode', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(false);
    render(<ReferenceHistoryButtons scrollGroupId={1} />);
    expect(screen.getByTestId('navigation-history-buttons')).toHaveClass('tw:rounded-full');
    expect(document.querySelector('[data-slot="button-group-separator"]')).not.toBeNull();
  });

  it('renders no pill container or divider in power mode', () => {
    vi.mocked(useIsPowerMode).mockReturnValue(true);
    render(<ReferenceHistoryButtons scrollGroupId={1} />);
    expect(screen.getByTestId('navigation-history-buttons')).not.toHaveClass('tw:rounded-full');
    expect(document.querySelector('[data-slot="button-group-separator"]')).toBeNull();
  });
});
