// @vitest-environment jsdom
import { afterEach, describe, it, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useActiveResourceProjectId } from './use-active-resource-project-id.hook';

/**
 * Build a grid-like DOM: per cell, one focusable element and one read-only text that cannot take
 * focus (as in an aligned column), each cell tagged with its project id.
 */
function renderCells(projectIds: string[]) {
  document.body.innerHTML = projectIds
    .map(
      (id) =>
        `<div data-project-id="${id}"><div contenteditable tabindex="0"></div><p class="read-only">text</p></div>`,
    )
    .join('');
  document.body.insertAdjacentHTML(
    'beforeend',
    '<button type="button" id="chrome">Options</button>',
  );
}

/** Focus the editable inside the cell for `projectId`, or the header button when omitted. */
function focusCell(projectId?: string) {
  const element = projectId
    ? document.querySelector<HTMLElement>(`[data-project-id="${projectId}"] [contenteditable]`)
    : document.querySelector<HTMLElement>('#chrome');
  act(() => element?.focus());
}

/** Press the pointer on the read-only text inside the cell for `projectId`, or on the header button. */
function pressCell(projectId?: string) {
  const element = projectId
    ? document.querySelector(`[data-project-id="${projectId}"] .read-only`)
    : document.querySelector('#chrome');
  act(() => {
    element?.dispatchEvent(new Event('pointerdown', { bubbles: true }));
  });
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('useActiveResourceProjectId', () => {
  it('is undefined before any cell is focused or pressed', () => {
    renderCells(['proj-a', 'proj-b']);
    const { result } = renderHook(() => useActiveResourceProjectId(['proj-a', 'proj-b'])[0]);
    expect(result.current).toBeUndefined();
  });

  it('reports the project of the cell holding the caret', () => {
    renderCells(['proj-a', 'proj-b']);
    const { result } = renderHook(() => useActiveResourceProjectId(['proj-a', 'proj-b'])[0]);
    focusCell('proj-b');
    expect(result.current).toBe('proj-b');
  });

  it('follows focus from one cell to another', () => {
    renderCells(['proj-a', 'proj-b']);
    const { result } = renderHook(() => useActiveResourceProjectId(['proj-a', 'proj-b'])[0]);
    focusCell('proj-b');
    focusCell('proj-a');
    expect(result.current).toBe('proj-a');
  });

  it('keeps the tracked resource when focus moves to chrome outside the cells', () => {
    // Reaching Find goes through exactly this kind of chrome; the caret has not moved.
    renderCells(['proj-a']);
    const { result } = renderHook(() => useActiveResourceProjectId(['proj-a'])[0]);
    focusCell('proj-a');
    focusCell();
    expect(result.current).toBe('proj-a');
  });

  it('reports the project of a cell whose read-only text is clicked without taking focus', () => {
    renderCells(['proj-a', 'proj-b']);
    const { result } = renderHook(() => useActiveResourceProjectId(['proj-a', 'proj-b'])[0]);
    focusCell('proj-a');
    pressCell('proj-b');
    expect(
      document.activeElement?.closest('[data-project-id]')?.getAttribute('data-project-id'),
    ).toBe('proj-a');
    expect(result.current).toBe('proj-b');
  });

  it('keeps the tracked resource when the pointer presses chrome outside the cells', () => {
    renderCells(['proj-a']);
    const { result } = renderHook(() => useActiveResourceProjectId(['proj-a'])[0]);
    pressCell('proj-a');
    pressCell();
    expect(result.current).toBe('proj-a');
  });

  it('reports a resource the owner names, as after a reveal that focused no cell', () => {
    renderCells(['proj-a', 'proj-b']);
    const { result } = renderHook(() => useActiveResourceProjectId(['proj-a', 'proj-b']));
    focusCell('proj-a');
    act(() => result.current[1]('proj-b'));
    expect(result.current[0]).toBe('proj-b');

    // A later focus or press still moves it.
    pressCell('proj-a');
    expect(result.current[0]).toBe('proj-a');
  });

  it('drops the tracked resource once it is no longer displayed', () => {
    renderCells(['proj-a', 'proj-b']);
    const { result, rerender } = renderHook(
      ({ available }: { available: string[] }) => useActiveResourceProjectId(available)[0],
      { initialProps: { available: ['proj-a', 'proj-b'] } },
    );
    focusCell('proj-b');
    expect(result.current).toBe('proj-b');
    rerender({ available: ['proj-a'] });
    expect(result.current).toBeUndefined();
  });

  it('removes the focus and pointer listeners on unmount', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    try {
      const { unmount } = renderHook(() => useActiveResourceProjectId(['proj-a']));
      const added = (type: string) => addSpy.mock.calls.find(([addedType]) => addedType === type);
      const focusinCall = added('focusin');
      const pointerdownCall = added('pointerdown');
      // Positive control: both listeners were registered, so there is something to remove.
      expect(focusinCall).toBeDefined();
      expect(pointerdownCall).toBeDefined();

      unmount();

      expect(removeSpy).toHaveBeenCalledWith('focusin', focusinCall?.[1]);
      expect(removeSpy).toHaveBeenCalledWith('pointerdown', pointerdownCall?.[1]);
    } finally {
      addSpy.mockRestore();
      removeSpy.mockRestore();
    }
  });
});
