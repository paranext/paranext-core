// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@/components/shadcn-ui/button';

describe('Button', () => {
  // Callers position icon buttons with translate utilities — `tw:-translate-y-1/2` to center one
  // inside an input's end padding, for example. Every Tailwind translate utility writes the same
  // `--tw-translate-y` custom property, so a pressed-state translate replaces the caller's
  // centering rather than adding to it, and `:active` outranks the caller's unprefixed utility:
  // the button drops half its own height for as long as it is held. Keeping the nudge on
  // `transform` lets the two compose, since the browser applies `translate` before `transform`.
  //
  // jsdom cannot enter `:active` and computes no Tailwind CSS, so these pin the class rather than
  // the rendered geometry. That is enough to fail if a future `shadcn apply` reverts the utility,
  // which is the regression worth catching. `PressNudgeWithCallerTranslate` in `button.stories.tsx`
  // is the manual check for the geometry itself.
  it('puts the pressed-state nudge on transform, not on a translate utility', () => {
    render(<Button>Press me</Button>);

    const { className } = screen.getByRole('button');

    expect(className).toContain('tw:active:not-aria-[haspopup]:transform-[translateY(1px)]');
    expect(className).not.toMatch(/active:\S*translate-/);
  });

  it('keeps a caller translate alongside the pressed-state nudge', () => {
    render(<Button className="tw:-translate-y-1/2">Press me</Button>);

    const { className } = screen.getByRole('button');

    expect(className).toContain('tw:-translate-y-1/2');
    expect(className).toContain('tw:active:not-aria-[haspopup]:transform-[translateY(1px)]');
  });
});
