// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRunWhenVisible } from './use-run-when-visible.hook';

/** Renders the hook with controllable visibility and a spy for the deferred work. */
function renderRunWhenVisible(initialIsVisible: boolean) {
  const run = vi.fn();
  const { result, rerender } = renderHook(
    ({ isViewVisible }: { isViewVisible: boolean }) => useRunWhenVisible(isViewVisible, run),
    { initialProps: { isViewVisible: initialIsVisible } },
  );
  return { run, result, setVisible: (isViewVisible: boolean) => rerender({ isViewVisible }) };
}

describe('useRunWhenVisible', () => {
  it('runs immediately while the view is visible', () => {
    const { run, result } = renderRunWhenVisible(true);

    act(() => result.current());

    expect(run).toHaveBeenCalledTimes(1);
  });

  it('does not run while the view is hidden', () => {
    const { run, result } = renderRunWhenVisible(false);

    act(() => result.current());

    expect(run).not.toHaveBeenCalled();
  });

  it('runs the deferred work once when the view becomes visible', () => {
    const { run, result, setVisible } = renderRunWhenVisible(false);

    act(() => result.current());
    expect(run).not.toHaveBeenCalled();

    act(() => setVisible(true));

    expect(run).toHaveBeenCalledTimes(1);
  });

  it('collapses repeated requests made while hidden into a single catch-up run', () => {
    // The reason this hook exists: while Find is the inactive tab, every editor book change asks for
    // another search. Replaying them all on activation would queue a pile of full-book find jobs
    // whose results are all superseded by the last one.
    const { run, result, setVisible } = renderRunWhenVisible(false);

    act(() => {
      result.current();
      result.current();
      result.current();
    });

    act(() => setVisible(true));

    expect(run).toHaveBeenCalledTimes(1);
  });

  it('does not re-run the catch-up on a later hide/show cycle with no new request', () => {
    const { run, result, setVisible } = renderRunWhenVisible(false);

    act(() => result.current());
    act(() => setVisible(true));
    expect(run).toHaveBeenCalledTimes(1);

    act(() => setVisible(false));
    act(() => setVisible(true));

    expect(run).toHaveBeenCalledTimes(1);
  });

  it('keeps a stable callback identity so callers can leave it out of effect dependencies', () => {
    const { result, setVisible } = renderRunWhenVisible(true);
    const firstIdentity = result.current;

    act(() => setVisible(false));
    act(() => setVisible(true));

    expect(result.current).toBe(firstIdentity);
  });
});
