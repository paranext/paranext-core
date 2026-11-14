// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { ALIGNED_GRID_CLASS } from './aligned-grid.styles';
import {
  findRevealFocusTarget,
  findRevealTargetCell,
  revealRequestForGrid,
  TEXT_COLLECTION_CELL_ATTRIBUTE,
  type RevealRequest,
} from './reveal-resource.utils';

function containerOf(html: string): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

describe('findRevealTargetCell', () => {
  it('finds the cell of the matching resource, ignoring case', () => {
    const container = containerOf(
      `<div ${TEXT_COLLECTION_CELL_ATTRIBUTE} data-project-id="ABC" id="first"></div>
       <div ${TEXT_COLLECTION_CELL_ATTRIBUTE} data-project-id="DEF" id="second"></div>`,
    );
    expect(findRevealTargetCell(container, 'def')?.id).toBe('second');
  });

  it('ignores the chapter-context region, which shows the same resource', () => {
    const container = containerOf(
      `<div data-project-id="ABC" id="context"></div>
       <div ${TEXT_COLLECTION_CELL_ATTRIBUTE} data-project-id="ABC" id="cell"></div>`,
    );
    expect(findRevealTargetCell(container, 'ABC')?.id).toBe('cell');
  });

  it('returns undefined when no cell shows the resource', () => {
    const container = containerOf(
      `<div ${TEXT_COLLECTION_CELL_ATTRIBUTE} data-project-id="ABC"></div>`,
    );
    expect(findRevealTargetCell(container, 'NOPE')).toBeUndefined();
  });
});

describe('revealRequestForGrid', () => {
  const request: RevealRequest = { projectId: 'abc', requestId: 7 };

  it('withholds the request while the view is hidden', () => {
    expect(revealRequestForGrid(request, { isViewVisible: false, isGridSettled: true })).toBe(
      undefined,
    );
  });

  it('withholds the request while the view is visible but the grid is still loading', () => {
    expect(revealRequestForGrid(request, { isViewVisible: true, isGridSettled: false })).toBe(
      undefined,
    );
  });

  it('passes the request through when visible and settled', () => {
    expect(revealRequestForGrid(request, { isViewVisible: true, isGridSettled: true })).toBe(
      request,
    );
  });

  it('hands over the same request object once the grid settles', () => {
    const before = revealRequestForGrid(request, { isViewVisible: true, isGridSettled: false });
    const after = revealRequestForGrid(request, { isViewVisible: true, isGridSettled: true });
    expect(before).toBe(undefined);
    expect(after?.requestId).toBe(request.requestId);
    expect(after).toBe(request);
  });

  it('returns undefined when there is no request', () => {
    expect(revealRequestForGrid(undefined, { isViewVisible: true, isGridSettled: true })).toBe(
      undefined,
    );
  });
});

describe('findRevealFocusTarget', () => {
  it('returns the cell itself when it is a tab stop, as a verse-list row is', () => {
    const container = containerOf(
      `<div ${TEXT_COLLECTION_CELL_ATTRIBUTE} tabindex="0"><div data-cell-content tabindex="0"></div></div>`,
    );
    const cell = container.querySelector<HTMLElement>(`[${TEXT_COLLECTION_CELL_ATTRIBUTE}]`);
    expect(cell && findRevealFocusTarget(cell)).toBe(cell);
  });

  it("returns the cell's own focusable scroll port, as a chapter column has", () => {
    const container = containerOf(
      `<div ${TEXT_COLLECTION_CELL_ATTRIBUTE}><div data-cell-content tabindex="0"></div></div>`,
    );
    const cell = container.querySelector<HTMLElement>(`[${TEXT_COLLECTION_CELL_ATTRIBUTE}]`);
    expect(cell && findRevealFocusTarget(cell)).toBe(
      container.querySelector('[data-cell-content]'),
    );
  });

  it('returns the aligned grid root that holds the cell when the cell has no scroll port of its own', () => {
    const container = containerOf(
      `<div class="${ALIGNED_GRID_CLASS}"><div ${TEXT_COLLECTION_CELL_ATTRIBUTE}><div data-cell-content></div></div></div>`,
    );
    const cell = container.querySelector<HTMLElement>(`[${TEXT_COLLECTION_CELL_ATTRIBUTE}]`);
    expect(cell && findRevealFocusTarget(cell)).toBe(
      container.querySelector(`.${ALIGNED_GRID_CLASS}`),
    );
  });

  it('returns undefined when nothing around the cell can take focus', () => {
    const container = containerOf(
      `<div ${TEXT_COLLECTION_CELL_ATTRIBUTE}><div data-cell-content></div></div>`,
    );
    const cell = container.querySelector<HTMLElement>(`[${TEXT_COLLECTION_CELL_ATTRIBUTE}]`);
    expect(cell && findRevealFocusTarget(cell)).toBeUndefined();
  });
});
