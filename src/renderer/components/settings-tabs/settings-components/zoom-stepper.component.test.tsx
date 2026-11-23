import { act, render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ZoomStepper } from './zoom-stepper.component';

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

// File-level rather than inside whichever test installs a spy: a failing assertion skips the rest of
// its own test body, so an in-test restore would leave the spy in place for everything after it.
afterEach(() => {
  vi.restoreAllMocks();
});

const PERCENT_LABEL = 'Percentage';
const LABELS = {
  increase: 'Increase default zoom',
  decrease: 'Decrease default zoom',
  reset: 'Reset default zoom',
  atMaximum: 'Already at the largest zoom (300 %)',
  atMinimum: 'Already at the smallest zoom (50 %)',
  atDefault: 'Already at the default zoom',
  percentInput: PERCENT_LABEL,
};
const baseProps = {
  defaultValue: 1,
  labels: LABELS,
  groupLabel: 'Tab content default zoom',
};

/** The typeable percentage field. */
const percentField = () => screen.getByRole('textbox', { name: PERCENT_LABEL });

/**
 * Matches a displayed percentage. Production puts a narrow no-break space (U+202F) before `%`, and
 * `\s` in a Unicode regex matches it, so the plain-looking pattern is exact about everything else.
 */
const showsPercent = (percent: number) => new RegExp(`^${percent}\\s%$`, 'u');

/** Types into the field and presses Enter, the way a user commits a percentage. */
function typeAndEnter(text: string) {
  fireEvent.change(percentField(), { target: { value: text } });
  fireEvent.keyDown(percentField(), { key: 'Enter' });
}

describe('ZoomStepper', () => {
  it('shows 120 % for a factor of 1.2', () => {
    render(<ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    // The field shows the factor as a whole percentage with a narrow no-break space before `%`.
    expect(percentField()).toHaveDisplayValue(showsPercent(120));
  });

  it('+ emits the next step', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1.2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1.3);
  });

  it('− emits the previous step', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1.2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.decrease }));
    expect(onChange).toHaveBeenCalledWith(1.1);
  });

  it('Reset emits the default', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1.2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.reset }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('disables increase but not decrease at the maximum', () => {
    render(<ZoomStepper {...baseProps} value={3} onChange={vi.fn()} />);
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
    render(<ZoomStepper {...baseProps} value={0.5} onChange={vi.fn()} />);
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
    render(<ZoomStepper {...baseProps} value={1} onChange={vi.fn()} />);
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
    render(<ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} disabled />);
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
    render(<ZoomStepper {...baseProps} value={1.2} onChange={onChange} disabled />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    fireEvent.click(screen.getByRole('button', { name: LABELS.decrease }));
    fireEvent.click(screen.getByRole('button', { name: LABELS.reset }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('stays focusable at its bound', () => {
    render(<ZoomStepper {...baseProps} value={3} onChange={vi.fn()} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    act(() => {
      increase.focus();
    });
    expect(increase).toHaveFocus();
  });

  it('keeps the pointer cursor off a bound button', () => {
    render(<ZoomStepper {...baseProps} value={3} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: LABELS.increase }).className).toContain(
      'aria-disabled:cursor-default',
    );
  });

  // A bound button keeps its tooltip reachable by keyboard — that is the whole reason the bound
  // state is `aria-disabled` rather than the native `disabled`, which drops out of the tab order.
  it('names the limit rather than the button when the bound is reached', async () => {
    render(<ZoomStepper {...baseProps} value={3} onChange={vi.fn()} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    act(() => {
      increase.focus();
    });
    expect(await screen.findByRole('tooltip')).toHaveTextContent(LABELS.atMaximum);
  });

  it('names the lower limit on the decrease button at the minimum', async () => {
    render(<ZoomStepper {...baseProps} value={0.5} onChange={vi.fn()} />);
    act(() => {
      screen.getByRole('button', { name: LABELS.decrease }).focus();
    });
    expect(await screen.findByRole('tooltip')).toHaveTextContent(LABELS.atMinimum);
  });

  it('names the default rather than the button when reset has nothing to reset', async () => {
    render(<ZoomStepper {...baseProps} value={1} onChange={vi.fn()} />);
    act(() => {
      screen.getByRole('button', { name: LABELS.reset }).focus();
    });
    expect(await screen.findByRole('tooltip')).toHaveTextContent(LABELS.atDefault);
  });

  it('names the reset button while there is something to reset', async () => {
    render(<ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    act(() => {
      screen.getByRole('button', { name: LABELS.reset }).focus();
    });
    expect(await screen.findByRole('tooltip')).toHaveTextContent(LABELS.reset);
  });

  it('names the button when it is not at a bound', async () => {
    render(<ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    act(() => {
      screen.getByRole('button', { name: LABELS.increase }).focus();
    });
    expect(await screen.findByRole('tooltip')).toHaveTextContent(LABELS.increase);
  });

  it('exposes keyboard-reachable buttons with the given labels', () => {
    render(<ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    [LABELS.increase, LABELS.decrease, LABELS.reset].forEach((name) => {
      const button = screen.getByRole('button', { name });
      expect(button.tagName).toBe('BUTTON');
      act(() => {
        button.focus();
      });
      expect(button).toHaveFocus();
    });
  });

  it('labels the group for assistive technology', () => {
    render(<ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    expect(screen.getByRole('group', { name: 'Tab content default zoom' })).toBeInTheDocument();
  });

  it('steps from the last emitted factor when pressed twice before the prop catches up', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    fireEvent.click(increase);
    fireEvent.click(increase);
    expect(onChange.mock.calls).toEqual([[1.1], [1.2]]);
    // The readout follows the presses, not the prop: both have been made, so it reads 120 % while
    // the platform is still confirming the first one.
    expect(percentField()).toHaveDisplayValue(showsPercent(120));
  });

  it('follows the prop once it catches up', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    fireEvent.click(increase);
    expect(onChange).toHaveBeenCalledWith(1.1);
    rerender(<ZoomStepper {...baseProps} value={1.1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledWith(1.2);
  });

  it('ignores a click that cannot move the value', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={3} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('keeps the existing tenth step exact', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={2.9} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('steps by the platform rule from an off-tenth factor', () => {
    // The shared helper steps to the next tenth in the direction pressed, so 0.95 goes to 0.9. A
    // rule that truncated the stepped result to a tenth instead would land on 0.8, two marks away
    // from where the user pressed once.
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={0.95} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.decrease }));
    expect(onChange).toHaveBeenCalledWith(0.9);
  });

  // The bounds are the platform's, not a caller's: at either one the button is `aria-disabled` and
  // the press emits nothing. `content-zoom.util.test.ts` is what pins the clamp inside
  // `adjustZoomFactor` itself; this only pins that the buttons gate on the same range.
  it('emits nothing from a press at either platform bound', () => {
    const atMinimum = vi.fn();
    const { unmount } = render(<ZoomStepper {...baseProps} value={0.5} onChange={atMinimum} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.decrease }));
    expect(atMinimum).not.toHaveBeenCalled();
    unmount();

    const atMaximum = vi.fn();
    render(<ZoomStepper {...baseProps} value={3} onChange={atMaximum} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(atMaximum).not.toHaveBeenCalled();
  });

  it('does not reuse a stale baseline after the window', () => {
    vi.useFakeTimers();
    try {
      const onChange = vi.fn();
      const { rerender } = render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
      fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
      expect(onChange).toHaveBeenCalledWith(1.1);
      // The write is never confirmed — the prop stays at 1 — but enough time passes that the
      // baseline the first press left behind is no longer trustworthy.
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      rerender(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
      fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(1.1);
      expect(percentField()).toHaveDisplayValue(showsPercent(110));
    } finally {
      vi.useRealTimers();
    }
  });

  it('still steps from an unconfirmed press while the window is open', () => {
    // The other side of the window above, and the side that matters in use: it has to outlast the
    // debounce the write waits behind plus the round trip that confirms it, or the second press of
    // an ordinary burst re-derives from a prop that has not caught up and repeats the first.
    vi.useFakeTimers();
    try {
      const onChange = vi.fn();
      const { rerender } = render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
      fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
      expect(onChange).toHaveBeenCalledWith(1.1);
      act(() => {
        vi.advanceTimersByTime(1400);
      });
      rerender(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
      fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
      expect(onChange).toHaveBeenLastCalledWith(1.2);
      expect(percentField()).toHaveDisplayValue(showsPercent(120));
    } finally {
      vi.useRealTimers();
    }
  });

  it('a confirmation of an earlier press does not discard a later one', () => {
    // Press 1's write landing while press 2 is still outstanding is the ordinary shape of a burst.
    const onChange = vi.fn();
    const { rerender } = render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    const increase = screen.getByRole('button', { name: LABELS.increase });
    fireEvent.click(increase);
    fireEvent.click(increase);
    rerender(<ZoomStepper {...baseProps} value={1.1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange.mock.calls.map(([factor]) => factor)).toEqual([1.1, 1.2, 1.3]);
  });

  it('a write from elsewhere still wins the baseline', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    rerender(<ZoomStepper {...baseProps} value={2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenLastCalledWith(2.1);
  });

  it('enables reset as soon as + is pressed, before the write lands', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1} defaultValue={1} onChange={onChange} />);
    const reset = screen.getByRole('button', { name: LABELS.reset });
    expect(reset).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(reset).not.toHaveAttribute('aria-disabled');
    fireEvent.click(reset);
    expect(onChange).toHaveBeenLastCalledWith(1);
  });

  it('disables + as soon as the press that reaches the maximum is made', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={2.9} onChange={onChange} />);
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
      render(<ZoomStepper {...baseProps} value={1} defaultValue={1} onChange={onChange} />);
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
    render(<ZoomStepper {...baseProps} value={1} onChange={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(percentField()).toHaveDisplayValue(showsPercent(110));
  });

  it('a foreign write wins immediately', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledWith(1.1);
    // An external change (e.g. another window writing the same setting) arrives instead of the
    // platform confirming the press above; the prop is authoritative, so both the display and the
    // baseline for the next press must follow it immediately.
    rerender(<ZoomStepper {...baseProps} value={2} onChange={onChange} />);
    expect(percentField()).toHaveDisplayValue(showsPercent(200));
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange).toHaveBeenCalledWith(2.1);
  });
});

describe('ZoomStepper percentage field', () => {
  it('commits a typed 137 on Enter as the factor 1.37', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1.2} onChange={onChange} />);
    typeAndEnter('137');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1.37);
    expect(percentField()).toHaveDisplayValue(showsPercent(137));
  });

  it('accepts a trailing % and the spaces the field itself displays', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    typeAndEnter('137%');
    typeAndEnter(' 90 % ');
    typeAndEnter('125 %');
    expect(onChange.mock.calls).toEqual([[1.37], [0.9], [1.25]]);
  });

  it('clamps a typed percentage to 50–300 %', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    typeAndEnter('20');
    expect(percentField()).toHaveDisplayValue(showsPercent(50));
    typeAndEnter('400');
    expect(percentField()).toHaveDisplayValue(showsPercent(300));
    expect(onChange.mock.calls).toEqual([[0.5], [3]]);
  });

  it.each(['13.7', 'abc', '', '%', '-120'])('reverts %j without committing anything', (text) => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1.2} onChange={onChange} />);
    typeAndEnter(text);
    expect(onChange).not.toHaveBeenCalled();
    expect(percentField()).toHaveDisplayValue(showsPercent(120));
  });

  it('commits on blur', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1.2} onChange={onChange} />);
    fireEvent.change(percentField(), { target: { value: '90' } });
    fireEvent.blur(percentField());
    expect(onChange).toHaveBeenCalledWith(0.9);
    expect(percentField()).toHaveDisplayValue(showsPercent(90));
  });

  it('Escape restores the last value and commits nothing, then or on blur', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1.2} onChange={onChange} />);
    fireEvent.change(percentField(), { target: { value: '250' } });
    fireEvent.keyDown(percentField(), { key: 'Escape' });
    expect(percentField()).toHaveDisplayValue(showsPercent(120));
    fireEvent.blur(percentField());
    expect(onChange).not.toHaveBeenCalled();
  });

  it('emits nothing for an unchanged value, including one that clamps to it', () => {
    const atCurrent = vi.fn();
    const { unmount } = render(<ZoomStepper {...baseProps} value={1.2} onChange={atCurrent} />);
    typeAndEnter('120');
    expect(atCurrent).not.toHaveBeenCalled();
    unmount();

    const atMaximum = vi.fn();
    render(<ZoomStepper {...baseProps} value={3} onChange={atMaximum} />);
    typeAndEnter('999');
    expect(atMaximum).not.toHaveBeenCalled();
    expect(percentField()).toHaveDisplayValue(showsPercent(300));
  });

  it('steps the buttons to the next 10 % mark from a typed off-grid value', () => {
    const up = vi.fn();
    const { unmount } = render(<ZoomStepper {...baseProps} value={1} onChange={up} />);
    typeAndEnter('137');
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(up.mock.calls).toEqual([[1.37], [1.4]]);
    unmount();

    const down = vi.fn();
    render(<ZoomStepper {...baseProps} value={1} onChange={down} />);
    typeAndEnter('137');
    fireEvent.click(screen.getByRole('button', { name: LABELS.decrease }));
    expect(down.mock.calls).toEqual([[1.37], [1.3]]);
  });

  it('blurring by pressing a button commits the typed value before the button steps', () => {
    const onChange = vi.fn();
    render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    fireEvent.change(percentField(), { target: { value: '137' } });
    // A pointer press on a button blurs the field first; jsdom does not do that on its own.
    fireEvent.blur(percentField());
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(onChange.mock.calls).toEqual([[1.37], [1.4]]);
  });

  it('keeps a typed commit through the confirmation of an earlier press', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    typeAndEnter('150');
    // Leave the field so what it shows below comes from the control's value, not the edit text.
    fireEvent.blur(percentField());
    rerender(<ZoomStepper {...baseProps} value={1.1} onChange={onChange} />);
    expect(onChange.mock.calls).toEqual([[1.1], [1.5]]);
    expect(percentField()).toHaveDisplayValue(showsPercent(150));
  });

  it('keeps what the user is typing when the value changes elsewhere, and commits it on blur', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    fireEvent.change(percentField(), { target: { value: '180' } });
    rerender(<ZoomStepper {...baseProps} value={2} onChange={onChange} />);
    expect(percentField()).toHaveDisplayValue('180');
    fireEvent.blur(percentField());
    expect(onChange).toHaveBeenCalledWith(1.8);
  });

  it('does not write a stale value back when an unedited field loses focus', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    fireEvent.focus(percentField());
    // The value changes elsewhere (another window, a zoom shortcut) while the field has focus.
    rerender(<ZoomStepper {...baseProps} value={2} onChange={onChange} />);
    fireEvent.blur(percentField());
    expect(onChange).not.toHaveBeenCalled();
    expect(percentField()).toHaveDisplayValue(showsPercent(200));
  });

  it('commits a typed value once and does not re-commit it over a later change', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ZoomStepper {...baseProps} value={1} onChange={onChange} />);
    typeAndEnter('137');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1.37);
    rerender(<ZoomStepper {...baseProps} value={2} onChange={onChange} />);
    fireEvent.blur(percentField());
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(percentField()).toHaveDisplayValue(showsPercent(200));
  });

  it('clears the announcement when the value changes elsewhere', () => {
    const { container, rerender } = render(
      <ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} />,
    );
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    const liveRegion = container.querySelector('[aria-live="polite"]');
    // Positive control: the press did announce, so an empty region below means it was cleared.
    expect(liveRegion).toHaveTextContent(showsPercent(130));
    rerender(<ZoomStepper {...baseProps} value={2} onChange={vi.fn()} />);
    expect(liveRegion).toBeEmptyDOMElement();
  });

  it('disables the field along with the buttons', () => {
    render(<ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} disabled />);
    expect(percentField()).toBeDisabled();
  });

  it('is an ordinary numeric text field, not a spinbutton', () => {
    render(<ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    expect(percentField()).toHaveAttribute('type', 'text');
    expect(percentField()).toHaveAttribute('inputmode', 'numeric');
    expect(screen.queryByRole('spinbutton')).toBeNull();
  });

  it('announces a button press in a live region that is not the field', () => {
    render(<ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    // Nothing is announced before a press; the field's value is not text content.
    expect(screen.queryByText(showsPercent(120))).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: LABELS.increase }));
    expect(screen.getByText(showsPercent(130))).toHaveAttribute('aria-live', 'polite');
    expect(percentField()).not.toHaveAttribute('aria-live');
  });

  it('does not announce a typed commit, which the focused field already shows', () => {
    render(<ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    typeAndEnter('137');
    expect(screen.queryByText(showsPercent(137))).toBeNull();
  });

  it('splits into a − + group and a percentage + reset group inside one wrapping group', () => {
    render(<ZoomStepper {...baseProps} value={1.2} onChange={vi.fn()} />);
    const outer = screen.getByRole('group', { name: 'Tab content default zoom' });
    expect(outer.className).toContain('tw:flex-wrap');
    const inner = within(outer).getAllByRole('group');
    expect(inner).toHaveLength(2);
    expect(
      within(inner[0])
        .getAllByRole('button')
        .map((button) => button.getAttribute('aria-label')),
    ).toEqual([LABELS.decrease, LABELS.increase]);
    expect(within(inner[1]).getByRole('textbox', { name: PERCENT_LABEL })).toBeInTheDocument();
    expect(
      within(inner[1])
        .getAllByRole('button')
        .map((button) => button.getAttribute('aria-label')),
    ).toEqual([LABELS.reset]);
  });
});
