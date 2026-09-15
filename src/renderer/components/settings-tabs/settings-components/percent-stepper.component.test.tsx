import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { PercentStepper } from './percent-stepper.component';

const LABELS = {
  increase: 'Increase default zoom',
  decrease: 'Decrease default zoom',
  reset: 'Reset default zoom to 100 %',
};
const baseProps = {
  min: 0.5,
  max: 3,
  step: 0.1,
  defaultValue: 1,
  labels: LABELS,
  groupLabel: 'Tab content default zoom',
};

describe('PercentStepper', () => {
  it('shows 120 % for a factor of 1.2', () => {
    render(<PercentStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    // Production formats with a narrow no-break space (U+202F); Testing Library's default
    // normalizer collapses \s+ (which includes U+202F) to a single space, so the plain-space
    // literal below matches.
    expect(screen.getByText('120 %')).toBeInTheDocument();
  });

  it('+ emits the next step', () => {
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} value={1.2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1.3);
  });

  it('− emits the previous step', () => {
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} value={1.2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.decrease }));
    expect(onChange).toHaveBeenCalledWith(1.1);
  });

  it('Reset emits the default', () => {
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} value={1.2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.reset }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('disables increase but not decrease at the maximum', () => {
    render(<PercentStepper {...baseProps} value={3} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: LABELS.increase })).toBeDisabled();
    expect(screen.getByRole('button', { name: LABELS.decrease })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: LABELS.reset })).not.toBeDisabled();
  });

  it('disables decrease but not increase at the minimum', () => {
    render(<PercentStepper {...baseProps} value={0.5} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: LABELS.decrease })).toBeDisabled();
    expect(screen.getByRole('button', { name: LABELS.increase })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: LABELS.reset })).not.toBeDisabled();
  });

  it('disables Reset at the default', () => {
    render(<PercentStepper {...baseProps} value={1} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: LABELS.reset })).toBeDisabled();
    expect(screen.getByRole('button', { name: LABELS.increase })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: LABELS.decrease })).not.toBeDisabled();
  });

  it('disables every button when disabled is passed', () => {
    render(<PercentStepper {...baseProps} value={1.2} onChange={vi.fn()} disabled />);
    expect(screen.getByRole('button', { name: LABELS.increase })).toBeDisabled();
    expect(screen.getByRole('button', { name: LABELS.decrease })).toBeDisabled();
    expect(screen.getByRole('button', { name: LABELS.reset })).toBeDisabled();
  });

  it('exposes keyboard-reachable buttons with the given labels', () => {
    render(<PercentStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    [LABELS.increase, LABELS.decrease, LABELS.reset].forEach((name) => {
      const b = screen.getByRole('button', { name });
      expect(b.tagName).toBe('BUTTON');
      b.focus();
      expect(b).toHaveFocus();
    });
  });

  it('labels the group for assistive technology', () => {
    render(<PercentStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    expect(screen.getByRole('group', { name: 'Tab content default zoom' })).toBeInTheDocument();
  });

  it('steps from the value the user sees when clicked twice before the prop catches up', () => {
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} value={1} onChange={onChange} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    fireEvent.click(increase);
    fireEvent.click(increase);
    expect(onChange.mock.calls).toEqual([[1.1], [1.2]]);
    expect(screen.getByText('120 %')).toBeInTheDocument();
  });

  it('follows the prop once it catches up', () => {
    const onChange = vi.fn();
    const { rerender } = render(<PercentStepper {...baseProps} value={1} onChange={onChange} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    fireEvent.click(increase);
    expect(onChange).toHaveBeenCalledWith(1.1);
    rerender(<PercentStepper {...baseProps} value={1.1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledWith(1.2);
  });

  it('ignores a click that cannot move the value', () => {
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} value={3} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
