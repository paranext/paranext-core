// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DisabledTooltipWrapper } from './disabled-tooltip-wrapper.component';

describe('DisabledTooltipWrapper', () => {
  it('stays inert while the wrapped control is enabled', () => {
    // The button is its own focusable, named tooltip host here, so the wrapper must add no second
    // tab stop and no second accessible name.
    render(
      <DisabledTooltipWrapper isDisabled={false} disabledExplanation="Why it is off">
        <button type="button">Do the thing</button>
      </DisabledTooltipWrapper>,
    );

    expect(screen.queryByRole('group')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Why it is off')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('becomes focusable, named, and a group while the wrapped control is disabled', () => {
    // A disabled button cannot host its own tooltip, so the wrapper takes over: it must be
    // reachable by keyboard and carry the explanation as its accessible name.
    render(
      <DisabledTooltipWrapper isDisabled disabledExplanation="Why it is off">
        <button type="button" disabled>
          Do the thing
        </button>
      </DisabledTooltipWrapper>,
    );

    const wrapper = screen.getByRole('group', { name: 'Why it is off' });
    expect(wrapper).toHaveAttribute('tabindex', '0');
  });

  it('passes its className and other props through to the wrapper element', () => {
    // `TooltipTrigger asChild` clones this element with its own props; dropping them would break
    // the tooltip. `className` is load-bearing too — consumers use it to let the child shrink.
    render(
      <DisabledTooltipWrapper isDisabled className="tw:min-w-0" data-testid="wrapper">
        <button type="button" disabled>
          Do the thing
        </button>
      </DisabledTooltipWrapper>,
    );

    expect(screen.getByTestId('wrapper')).toHaveClass('tw:min-w-0');
  });
});
