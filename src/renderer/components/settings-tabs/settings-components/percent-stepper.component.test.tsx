import { act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { PercentStepper } from './percent-stepper.component';

// Radix Tooltip uses ResizeObserver internally; jsdom doesn't provide it, so we stub a no-op
// implementation.
beforeAll(() => {
  global.ResizeObserver = class {
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
});

// File-level, not at the end of the one test that spies: an assertion that fails before an in-test
// restore would otherwise leave `performance.now` pinned for everything after it.
afterEach(() => {
  vi.restoreAllMocks();
});

const LABELS = {
  increase: 'Increase default zoom',
  decrease: 'Decrease default zoom',
  reset: 'Reset default zoom',
  atMaximum: 'Already at the largest zoom (300 %)',
  atMinimum: 'Already at the smallest zoom (50 %)',
};
const baseProps = {
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
    expect(screen.getByRole('button', { name: LABELS.increase })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('button', { name: LABELS.decrease })).not.toHaveAttribute(
      'aria-disabled',
    );
    expect(screen.getByRole('button', { name: LABELS.reset })).not.toHaveAttribute('aria-disabled');
  });

  it('disables decrease but not increase at the minimum', () => {
    render(<PercentStepper {...baseProps} value={0.5} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: LABELS.decrease })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('button', { name: LABELS.increase })).not.toHaveAttribute(
      'aria-disabled',
    );
    expect(screen.getByRole('button', { name: LABELS.reset })).not.toHaveAttribute('aria-disabled');
  });

  it('disables Reset at the default', () => {
    render(<PercentStepper {...baseProps} value={1} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: LABELS.reset })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('button', { name: LABELS.increase })).not.toHaveAttribute(
      'aria-disabled',
    );
    expect(screen.getByRole('button', { name: LABELS.decrease })).not.toHaveAttribute(
      'aria-disabled',
    );
  });

  it('disables every button when disabled is passed', () => {
    render(<PercentStepper {...baseProps} value={1.2} onChange={vi.fn()} disabled />);
    expect(screen.getByRole('button', { name: LABELS.increase })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('button', { name: LABELS.decrease })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(screen.getByRole('button', { name: LABELS.reset })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('does not emit when a disabled button is pressed, even off any numeric bound', () => {
    const onChange = vi.fn();
    // value=1.2 sits strictly between min/max/defaultValue, so only the `disabled` prop — not the
    // bound-clamping arithmetic in `emit` — is what could stop the press from changing the value.
    render(<PercentStepper {...baseProps} value={1.2} onChange={onChange} disabled />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    fireEvent.click(screen.getByRole('button', { name: LABELS.decrease }));
    fireEvent.click(screen.getByRole('button', { name: LABELS.reset }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('stays focusable at its bound', () => {
    render(<PercentStepper {...baseProps} value={3} onChange={vi.fn()} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    increase.focus();
    expect(increase).toHaveFocus();
  });

  it('keeps the pointer cursor off a bound button', () => {
    render(<PercentStepper {...baseProps} value={3} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: LABELS.increase }).className).toContain(
      'aria-disabled:cursor-default',
    );
  });

  // A bound button keeps its tooltip reachable by keyboard — that is the whole reason the bound
  // state is `aria-disabled` rather than the native `disabled`, which drops out of the tab order.
  it('names the limit rather than the button when the bound is reached', async () => {
    render(<PercentStepper {...baseProps} value={3} onChange={vi.fn()} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    increase.focus();
    expect(await screen.findByRole('tooltip')).toHaveTextContent(LABELS.atMaximum);
  });

  it('names the button when it is not at a bound', async () => {
    render(<PercentStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    screen.getByRole('button', { name: LABELS.increase }).focus();
    expect(await screen.findByRole('tooltip')).toHaveTextContent(LABELS.increase);
  });

  it('exposes keyboard-reachable buttons with the given labels', () => {
    render(<PercentStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    [LABELS.increase, LABELS.decrease, LABELS.reset].forEach((name) => {
      const button = screen.getByRole('button', { name });
      expect(button.tagName).toBe('BUTTON');
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  it('labels the group for assistive technology', () => {
    render(<PercentStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    expect(screen.getByRole('group', { name: 'Tab content default zoom' })).toBeInTheDocument();
  });

  it('steps from the last emitted factor when pressed twice before the prop catches up', () => {
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} value={1} onChange={onChange} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    fireEvent.click(increase);
    fireEvent.click(increase);
    expect(onChange.mock.calls).toEqual([[1.1], [1.2]]);
    // The readout follows the presses, not the prop: both have been made, so it reads 120 % while
    // the platform is still confirming the first one.
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

  it('keeps the existing tenth step exact', () => {
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} value={2.9} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('steps by the platform rule from an off-tenth factor', () => {
    // The shared helper steps first and rounds the result to a tenth, so 0.95 goes to 0.9 — a rule
    // that rounds the input first would land on 0.8 instead.
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} value={0.95} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.decrease }));
    expect(onChange).toHaveBeenCalledWith(0.9);
  });

  it('clamps to the platform range rather than to caller props', () => {
    const atMinimum = vi.fn();
    const { unmount } = render(<PercentStepper {...baseProps} value={0.5} onChange={atMinimum} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.decrease }));
    expect(atMinimum).not.toHaveBeenCalled();
    unmount();

    const atMaximum = vi.fn();
    render(<PercentStepper {...baseProps} value={3} onChange={atMaximum} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(atMaximum).not.toHaveBeenCalled();
  });

  it('does not reuse a stale baseline after the window', () => {
    vi.useFakeTimers();
    try {
      const onChange = vi.fn();
      const { rerender } = render(<PercentStepper {...baseProps} value={1} onChange={onChange} />);
      fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
      expect(onChange).toHaveBeenCalledWith(1.1);
      // The write is never confirmed — the prop stays at 1 — but enough time passes that the
      // baseline the first press left behind is no longer trustworthy.
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      rerender(<PercentStepper {...baseProps} value={1} onChange={onChange} />);
      fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(1.1);
      expect(screen.getByText('110 %')).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('a confirmation of an earlier press does not discard a later one', () => {
    // Press 1's write landing while press 2 is still outstanding is the ordinary shape of a burst.
    const onChange = vi.fn();
    const { rerender } = render(<PercentStepper {...baseProps} value={1} onChange={onChange} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    fireEvent.click(increase);
    fireEvent.click(increase);
    rerender(<PercentStepper {...baseProps} value={1.1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange.mock.calls.map(([factor]) => factor)).toEqual([1.1, 1.2, 1.3]);
  });

  it('a write from elsewhere still wins the baseline', () => {
    const onChange = vi.fn();
    const { rerender } = render(<PercentStepper {...baseProps} value={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    rerender(<PercentStepper {...baseProps} value={2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenLastCalledWith(2.1);
  });

  it('enables reset as soon as + is pressed, before the write lands', () => {
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} value={1} defaultValue={1} onChange={onChange} />);
    const reset = screen.getByRole('button', { name: LABELS.reset });
    expect(reset).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(reset).not.toHaveAttribute('aria-disabled');
    fireEvent.click(reset);
    expect(onChange).toHaveBeenLastCalledWith(1);
  });

  it('disables + as soon as the press that reaches the maximum is made', () => {
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} value={2.9} onChange={onChange} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    fireEvent.click(increase);
    expect(increase).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(increase);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('releases the optimistic enabled state if the write never lands', () => {
    vi.useFakeTimers();
    try {
      const onChange = vi.fn();
      render(<PercentStepper {...baseProps} value={1} defaultValue={1} onChange={onChange} />);
      fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
      const reset = screen.getByRole('button', { name: LABELS.reset });
      expect(reset).not.toHaveAttribute('aria-disabled');
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(reset).toHaveAttribute('aria-disabled', 'true');
    } finally {
      vi.useRealTimers();
    }
  });

  it('shows the pressed factor in the readout before the write lands', () => {
    render(<PercentStepper {...baseProps} value={1} onChange={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(screen.getByText('110 %')).toBeInTheDocument();
  });

  it('a foreign write wins immediately', () => {
    const onChange = vi.fn();
    const { rerender } = render(<PercentStepper {...baseProps} value={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledWith(1.1);
    // An external change (e.g. another window writing the same setting) arrives instead of the
    // platform confirming the press above; the prop is authoritative, so both the display and the
    // baseline for the next press must follow it immediately.
    rerender(<PercentStepper {...baseProps} value={2} onChange={onChange} />);
    expect(screen.getByText('200 %')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledWith(2.1);
  });
});
