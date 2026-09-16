import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { PercentStepper } from './percent-stepper.component';

// Radix Tooltip (now wrapping every button) uses ResizeObserver internally; jsdom doesn't provide
// it, so we stub a no-op implementation.
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

const LABELS = {
  increase: 'Increase default zoom',
  decrease: 'Decrease default zoom',
  reset: 'Reset default zoom',
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
    // The readout follows the `value` prop, which hasn't moved yet — it never shows the
    // unconfirmed 1.2 the component just emitted.
    expect(screen.getByText('100 %')).toBeInTheDocument();
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

  it('steps by a quarter when the caller asks for it', () => {
    const onChange = vi.fn();
    render(
      <PercentStepper
        {...baseProps}
        min={0.5}
        max={3}
        step={0.25}
        value={0.5}
        onChange={onChange}
      />,
    );
    const increase = screen.getByRole('button', { name: LABELS.increase });
    fireEvent.click(increase);
    expect(onChange).toHaveBeenCalledWith(0.75);
    fireEvent.click(increase);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('steps by five hundredths without float drift', () => {
    const onIncrease = vi.fn();
    const increaseRender = render(
      <PercentStepper {...baseProps} step={0.05} value={1.1} onChange={onIncrease} />,
    );
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onIncrease).toHaveBeenCalledWith(1.15);
    increaseRender.unmount();

    const onDecrease = vi.fn();
    render(<PercentStepper {...baseProps} step={0.05} value={1.1} onChange={onDecrease} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.decrease }));
    expect(onDecrease).toHaveBeenCalledWith(1.05);
  });

  it('keeps the existing tenth step exact', () => {
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} value={2.9} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('rounds correctly for a step given in exponential notation', () => {
    const onChange = vi.fn();
    render(<PercentStepper {...baseProps} step={1e-2} value={1.1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledWith(1.11);
  });

  it('does not reuse a stale baseline after the window', () => {
    let currentTimeMs = 0;
    vi.spyOn(performance, 'now').mockImplementation(() => currentTimeMs);
    const onChange = vi.fn();
    const { rerender } = render(<PercentStepper {...baseProps} value={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledWith(1.1);
    // The write is never confirmed — the prop stays at 1 — but enough time passes that the
    // baseline the first press left behind is no longer trustworthy.
    currentTimeMs += 2000;
    rerender(<PercentStepper {...baseProps} value={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(1.1);
    vi.restoreAllMocks();
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
