import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeAll } from 'vitest';
import ParallelPassagesToolbar, { ParallelPassagesToolbarProps } from '../toolbar.component';

// Radix Select uses pointer events that jsdom doesn't support
beforeAll(() => {
  // eslint-disable-next-line no-proto
  if (!HTMLElement.prototype.hasPointerCapture) {
    HTMLElement.prototype.hasPointerCapture = vi.fn().mockReturnValue(false);
  }
  if (!HTMLElement.prototype.setPointerCapture) {
    HTMLElement.prototype.setPointerCapture = vi.fn();
  }
  if (!HTMLElement.prototype.releasePointerCapture) {
    HTMLElement.prototype.releasePointerCapture = vi.fn();
  }
  // scrollIntoView is also missing in jsdom
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  }
});

const defaultProps: ParallelPassagesToolbarProps = {
  sourceDisplayMode: 0,
  onSourceDisplayModeChange: vi.fn(),
  sourceLanguageAvailable: true,
  passageFilter: 'All',
  onPassageFilterChange: vi.fn(),
  typeFilter: 'All',
  onTypeFilterChange: vi.fn(),
  viewType: 'RowView',
  onViewTypeChange: vi.fn(),
  onComparativeTextsClick: vi.fn(),
};

function renderToolbar(overrides: Partial<ParallelPassagesToolbarProps> = {}) {
  const props = { ...defaultProps, ...overrides };
  // Reset mocks for each call
  Object.values(props).forEach((v) => {
    if (typeof v === 'function' && 'mockClear' in v) {
      (v as ReturnType<typeof vi.fn>).mockClear();
    }
  });
  return render(<ParallelPassagesToolbar {...props} />);
}

describe('ParallelPassagesToolbar', () => {
  it('renders all toolbar controls', () => {
    renderToolbar();
    expect(screen.getByRole('combobox', { name: /source text display/i })).toBeTruthy();
    expect(screen.getByRole('combobox', { name: /passage filter/i })).toBeTruthy();
    expect(screen.getByRole('combobox', { name: /type of parallel passage/i })).toBeTruthy();
    expect(screen.getByRole('combobox', { name: /approval view mode/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /comparative texts/i })).toBeTruthy();
  });

  it('disables source text selector when source language unavailable', () => {
    renderToolbar({ sourceLanguageAvailable: false });
    expect(
      screen.getByRole('combobox', { name: /source text display/i }).hasAttribute('disabled') ||
        screen
          .getByRole('combobox', { name: /source text display/i })
          .getAttribute('data-disabled') !== null,
    ).toBe(true);
  });

  it('enables source text selector when source language available', () => {
    renderToolbar({ sourceLanguageAvailable: true });
    const el = screen.getByRole('combobox', { name: /source text display/i });
    expect(el.hasAttribute('disabled') && el.getAttribute('data-disabled') !== null).toBe(false);
  });

  it('calls onComparativeTextsClick when button clicked', async () => {
    const onClick = vi.fn();
    renderToolbar({ onComparativeTextsClick: onClick });
    await userEvent.click(screen.getByRole('button', { name: /comparative texts/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onPassageFilterChange when passage filter changed', async () => {
    const onChange = vi.fn();
    renderToolbar({ onPassageFilterChange: onChange });
    await userEvent.click(screen.getByRole('combobox', { name: /passage filter/i }));
    const option = await screen.findByRole('option', { name: /changed text/i });
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith('ChangedText');
  });

  it('calls onTypeFilterChange when type filter changed', async () => {
    const onChange = vi.fn();
    renderToolbar({ onTypeFilterChange: onChange });
    await userEvent.click(screen.getByRole('combobox', { name: /type of parallel passage/i }));
    const option = await screen.findByRole('option', { name: /synoptic gospels/i });
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith('Gospels');
  });

  it('calls onViewTypeChange when view type changed', async () => {
    const onChange = vi.fn();
    renderToolbar({ onViewTypeChange: onChange });
    await userEvent.click(screen.getByRole('combobox', { name: /approval view mode/i }));
    const option = await screen.findByRole('option', { name: /approve passages individually/i });
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith('ColumnView');
  });

  it('calls onSourceDisplayModeChange when source display changed', async () => {
    const onChange = vi.fn();
    renderToolbar({ onSourceDisplayModeChange: onChange, sourceLanguageAvailable: true });
    await userEvent.click(screen.getByRole('combobox', { name: /source text display/i }));
    const option = await screen.findByRole('option', { name: /hebrew\/greek text and gloss/i });
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
