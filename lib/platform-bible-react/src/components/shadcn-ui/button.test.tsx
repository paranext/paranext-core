// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@/components/shadcn-ui/button';

describe('Button', () => {
  // jsdom computes no Tailwind CSS and cannot enter `:active`, so these pin the class strings a
  // `shadcn apply` would revert. `PressNudgeWithCallerTranslate` in `button.stories.tsx` is the
  // manual check for the geometry they stand in for.

  it('puts the pressed-state nudge on transform, not on a translate utility', () => {
    render(<Button>Press me</Button>);

    const { className } = screen.getByRole('button');

    expect(className).toMatch(/active:\S*transform-\[translateY/);
    // The trailing hyphen is load-bearing: it matches the reverted `translate-y-px` and not
    // `translateY(1px)`.
    expect(className).not.toMatch(/active:\S*translate-/);
  });

  it('keeps the prefixed radius variable on the sizes that clamp their radius', () => {
    render(<Button size="xs">Press me</Button>);

    const { className } = screen.getByRole('button');

    expect(className).toContain('var(--tw-radius-md)');
    expect(className).not.toMatch(/var\(--radius-md\)/);
  });
});
