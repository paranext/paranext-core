import { describe, it, expect, vi } from 'vitest';
import { MarkerMenuItem } from 'platform-bible-react';
import { wrapMarkerMenuItemsWithClose } from './marker-menu.utils';

function makeItem(marker: string, action = vi.fn()): MarkerMenuItem {
  return { marker, title: `Title ${marker}`, action };
}

describe('wrapMarkerMenuItemsWithClose', () => {
  it("runs the picked item's action, then closes the menu", () => {
    const calls: string[] = [];
    const items = [
      makeItem(
        'p',
        vi.fn(() => calls.push('action')),
      ),
    ];

    const [wrapped] = wrapMarkerMenuItemsWithClose(items, () => calls.push('close'));
    wrapped.action();

    expect(calls).toEqual(['action', 'close']);
  });

  it('runs only the picked item and closes once', () => {
    const first = makeItem('p');
    const second = makeItem('q1');
    const close = vi.fn();

    wrapMarkerMenuItemsWithClose([first, second], close)[1].action();

    expect(second.action).toHaveBeenCalledTimes(1);
    expect(first.action).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('keeps every other field and leaves the input items unchanged', () => {
    const original = makeItem('s1');
    const originalAction = original.action;

    const [wrapped] = wrapMarkerMenuItemsWithClose([original], vi.fn());

    expect(wrapped).toEqual({ ...original, action: expect.any(Function) });
    expect(wrapped.action).not.toBe(originalAction);
    expect(original.action).toBe(originalAction);
  });
});
