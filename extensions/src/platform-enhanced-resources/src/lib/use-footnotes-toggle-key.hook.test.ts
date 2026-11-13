// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useFootnotesToggleKey } from './use-footnotes-toggle-key.hook';

function press(init: KeyboardEventInit): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
  document.body.dispatchEvent(event);
  return event;
}

describe('useFootnotesToggleKey', () => {
  it('toggles the footnotes pane on F7, from its current state', () => {
    const setShowFootnotes = vi.fn();
    const { rerender } = renderHook(({ shown }) => useFootnotesToggleKey(shown, setShowFootnotes), {
      initialProps: { shown: false },
    });

    expect(press({ key: 'F7' }).defaultPrevented).toBe(true);
    expect(setShowFootnotes).toHaveBeenLastCalledWith(true);

    rerender({ shown: true });
    press({ key: 'F7' });
    expect(setShowFootnotes).toHaveBeenLastCalledWith(false);
  });

  it('leaves F7 with a modifier alone', () => {
    const setShowFootnotes = vi.fn();
    renderHook(() => useFootnotesToggleKey(false, setShowFootnotes));

    press({ key: 'F7', ctrlKey: true });
    press({ key: 'F7', shiftKey: true });

    expect(setShowFootnotes).not.toHaveBeenCalled();
  });

  it.each([
    ['Ctrl+=', { key: '=', ctrlKey: true }],
    ['Ctrl+-', { key: '-', ctrlKey: true }],
    ['Ctrl+0', { key: '0', ctrlKey: true }],
    ['⌘+=', { key: '=', metaKey: true }],
    ['⌘+-', { key: '-', metaKey: true }],
    ['⌘+0', { key: '0', metaKey: true }],
  ])('leaves the content zoom chord %s to the platform', (_name, init) => {
    // The platform's content zoom listens on the same window; handling the chord here as well would
    // make one keypress drive both.
    const setShowFootnotes = vi.fn();
    renderHook(() => useFootnotesToggleKey(false, setShowFootnotes));

    const event = press(init);

    expect(event.defaultPrevented).toBe(false);
    expect(setShowFootnotes).not.toHaveBeenCalled();
  });
});
