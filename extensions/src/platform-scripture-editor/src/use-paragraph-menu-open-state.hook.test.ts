// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  useParagraphMenuOpenState,
  type UseParagraphMenuOpenStateOptions,
} from './use-paragraph-menu-open-state.hook';

function renderOpenState(overrides: Partial<UseParagraphMenuOpenStateOptions> = {}) {
  const notifyStructureProtected = vi.fn();
  const initialProps: UseParagraphMenuOpenStateOptions = {
    isReadOnly: false,
    isStructureProtected: false,
    hasBlockMarker: true,
    notifyStructureProtected,
    ...overrides,
  };
  const rendered = renderHook(
    (props: UseParagraphMenuOpenStateOptions) => useParagraphMenuOpenState(props),
    { initialProps },
  );
  return { ...rendered, initialProps, notifyStructureProtected };
}

describe('useParagraphMenuOpenState', () => {
  it('starts closed', () => {
    const { result } = renderOpenState();
    expect(result.current.isMenuOpen).toBe(false);
  });

  it('opens from the editor when the menu is available', () => {
    const { result } = renderOpenState();

    act(() => result.current.requestMenuFromEditor());

    expect(result.current.isMenuOpen).toBe(true);
  });

  it('notifies instead of opening while the structure is protected, so the key is never silently dropped', () => {
    const { result, notifyStructureProtected } = renderOpenState({ isStructureProtected: true });

    act(() => result.current.requestMenuFromEditor());

    expect(result.current.isMenuOpen).toBe(false);
    expect(notifyStructureProtected).toHaveBeenCalledTimes(1);
  });

  it('ignores an editor request in a read-only project, which has no paragraph menu at all', () => {
    const { result, notifyStructureProtected } = renderOpenState({ isReadOnly: true });

    act(() => result.current.requestMenuFromEditor());

    expect(result.current.isMenuOpen).toBe(false);
    expect(notifyStructureProtected).not.toHaveBeenCalled();
  });

  it('ignores an editor request while there is no block marker for the trigger to show', () => {
    // The trigger renders nothing without a marker; an open state recorded now would spring the
    // menu open the next time the caret enters a block.
    const { result } = renderOpenState({ hasBlockMarker: false });

    act(() => result.current.requestMenuFromEditor());

    expect(result.current.isMenuOpen).toBe(false);
  });

  it('passes the toolbar button’s own open and close through', () => {
    const { result } = renderOpenState();

    act(() => result.current.setIsMenuOpen(true));
    expect(result.current.isMenuOpen).toBe(true);

    act(() => result.current.setIsMenuOpen(false));
    expect(result.current.isMenuOpen).toBe(false);
  });

  it('closes when protection turns on and stays closed when it turns off', () => {
    const { result, rerender, initialProps } = renderOpenState();
    act(() => result.current.requestMenuFromEditor());
    expect(result.current.isMenuOpen).toBe(true);

    rerender({ ...initialProps, isStructureProtected: true });
    expect(result.current.isMenuOpen).toBe(false);

    rerender({ ...initialProps, isStructureProtected: false });
    expect(result.current.isMenuOpen).toBe(false);
  });

  it('closes when the caret leaves every block and stays closed when it re-enters one', () => {
    const { result, rerender, initialProps } = renderOpenState();
    act(() => result.current.setIsMenuOpen(true));

    rerender({ ...initialProps, hasBlockMarker: false });
    expect(result.current.isMenuOpen).toBe(false);

    rerender({ ...initialProps, hasBlockMarker: true });
    expect(result.current.isMenuOpen).toBe(false);
  });
});
