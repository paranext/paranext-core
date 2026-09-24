// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  DestructiveKeyConfirmation,
  useFrozenWhileClosed,
} from './destructive-key-confirmation.component';

const ANCHOR_RECT = { top: 0, left: 0, width: 10, height: 10 };

// jsdom doesn't ship a ResizeObserver, which Radix's Popper-positioned TooltipContent instantiates
// on mount when open. A no-op stub is sufficient since these tests inspect text, not layout.
// Mirrors the precedent in shadcn-ui/context-menu.test.tsx.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
});

describe('DestructiveKeyConfirmation', () => {
  it('announces the message via role="status" so screen readers pick it up while armed', () => {
    render(
      <DestructiveKeyConfirmation
        open
        anchorRect={ANCHOR_RECT}
        message="Press {key} again to delete"
        confirmingKeyLabel="Backspace"
      />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Press Backspace again to delete');
  });

  it('clears the status region when not armed, so a later arm re-triggers the announcement', () => {
    render(
      <DestructiveKeyConfirmation
        open={false}
        anchorRect={ANCHOR_RECT}
        message="Press {key} again to delete"
        confirmingKeyLabel="Backspace"
      />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('');
  });
});

describe('useFrozenWhileClosed', () => {
  // Regression test: DestructiveKeyConfirmation's caller resets anchorRect/message/
  // confirmingKeyLabel/showArrow to "unarmed" defaults in the same render that `open` flips
  // false, while Radix keeps TooltipContent mounted for its fade-out-0/zoom-out-95 exit
  // animation (tooltip.tsx). Rendering straight off current props during that animation shrank
  // an already-empty, wrongly-positioned box instead of fading the real hint away. This can't be
  // observed end-to-end through DestructiveKeyConfirmation in jsdom — jsdom reports no running
  // CSS animation, so Radix's Presence unmounts TooltipContent synchronously regardless of what
  // this hook returns — so it's verified directly on the hook instead.
  it('keeps returning the last value from while open was true, once open goes false', () => {
    const { result, rerender } = renderHook(
      ({ open, value }) => useFrozenWhileClosed(open, value),
      {
        initialProps: { open: true, value: 'armed message' },
      },
    );
    expect(result.current).toBe('armed message');

    rerender({ open: false, value: 'reset default' });
    expect(result.current).toBe('armed message');

    rerender({ open: false, value: 'still resetting' });
    expect(result.current).toBe('armed message');
  });

  it('tracks the current value again once open goes back to true', () => {
    const { result, rerender } = renderHook(
      ({ open, value }) => useFrozenWhileClosed(open, value),
      {
        initialProps: { open: true, value: 'first arm' },
      },
    );

    rerender({ open: false, value: 'reset default' });
    rerender({ open: true, value: 'second arm' });
    expect(result.current).toBe('second arm');
  });
});
