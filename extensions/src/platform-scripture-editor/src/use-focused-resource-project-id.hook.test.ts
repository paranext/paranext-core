// @vitest-environment jsdom
import { afterEach, describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useFocusedResourceProjectId } from './use-focused-resource-project-id.hook';

/** Build a grid-like DOM: one focusable element per cell, each tagged with its project id. */
function renderCells(projectIds: string[]) {
  document.body.innerHTML = projectIds
    .map((id) => `<div data-project-id="${id}"><div contenteditable tabindex="0"></div></div>`)
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

afterEach(() => {
  document.body.innerHTML = '';
});

describe('useFocusedResourceProjectId', () => {
  it('is undefined before the caret has entered any cell', () => {
    renderCells(['proj-a', 'proj-b']);
    const { result } = renderHook(() => useFocusedResourceProjectId(['proj-a', 'proj-b']));
    expect(result.current).toBeUndefined();
  });

  it('reports the project of the cell holding the caret', () => {
    renderCells(['proj-a', 'proj-b']);
    const { result } = renderHook(() => useFocusedResourceProjectId(['proj-a', 'proj-b']));
    focusCell('proj-b');
    expect(result.current).toBe('proj-b');
  });

  it('follows the caret from one cell to another', () => {
    renderCells(['proj-a', 'proj-b']);
    const { result } = renderHook(() => useFocusedResourceProjectId(['proj-a', 'proj-b']));
    focusCell('proj-b');
    focusCell('proj-a');
    expect(result.current).toBe('proj-a');
  });

  it('keeps the tracked resource when focus moves to chrome outside the cells', () => {
    // Reaching Find goes through exactly this kind of chrome; the caret has not moved.
    renderCells(['proj-a']);
    const { result } = renderHook(() => useFocusedResourceProjectId(['proj-a']));
    focusCell('proj-a');
    focusCell();
    expect(result.current).toBe('proj-a');
  });

  it('drops the tracked resource once it is no longer displayed', () => {
    renderCells(['proj-a', 'proj-b']);
    const { result, rerender } = renderHook(
      ({ available }: { available: string[] }) => useFocusedResourceProjectId(available),
      { initialProps: { available: ['proj-a', 'proj-b'] } },
    );
    focusCell('proj-b');
    expect(result.current).toBe('proj-b');
    rerender({ available: ['proj-a'] });
    expect(result.current).toBeUndefined();
  });

  it('removes the focus listener on unmount', () => {
    renderCells(['proj-a']);
    const { result, unmount } = renderHook(() => useFocusedResourceProjectId(['proj-a']));
    unmount();
    focusCell('proj-a');
    expect(result.current).toBeUndefined();
  });
});
