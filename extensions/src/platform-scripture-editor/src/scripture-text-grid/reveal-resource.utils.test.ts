// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { ALIGNED_GRID_CLASS } from './aligned-grid.styles';
import {
  findRevealFocusTarget,
  findRevealTargetCell,
  getScrollPortClientInsets,
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

describe('getScrollPortClientInsets', () => {
  type Box = {
    rect: [x: number, y: number, width: number, height: number];
    clientLeft?: number;
    clientTop?: number;
    clientWidth: number;
    clientHeight: number;
  };

  function elementWith({ rect, clientLeft = 0, clientTop = 0, clientWidth, clientHeight }: Box) {
    const element = document.createElement('div');
    element.getBoundingClientRect = () => new DOMRect(...rect);
    Object.defineProperties(element, {
      clientLeft: { value: clientLeft },
      clientTop: { value: clientTop },
      clientWidth: { value: clientWidth },
      clientHeight: { value: clientHeight },
    });
    return element;
  }

  // A 256 × 358 column at (100, 40) whose 21px header sits above a full-width scroll port.
  const column = () =>
    elementWith({ rect: [100, 40, 256, 358], clientWidth: 256, clientHeight: 358 });

  it('leaves out a scrollbar on the right and the header above', () => {
    const scrollPort = elementWith({
      rect: [100, 61, 256, 337],
      clientWidth: 242,
      clientHeight: 337,
    });
    expect(getScrollPortClientInsets(column(), scrollPort)).toEqual({
      top: 21,
      right: 14,
      bottom: 0,
      left: 0,
    });
  });

  it('leaves out a scrollbar on the left, where right-to-left text puts it', () => {
    const scrollPort = elementWith({
      rect: [100, 61, 256, 337],
      clientLeft: 14,
      clientWidth: 242,
      clientHeight: 337,
    });
    expect(getScrollPortClientInsets(column(), scrollPort)).toEqual({
      top: 21,
      right: 0,
      bottom: 0,
      left: 14,
    });
  });

  it('leaves out a horizontal scrollbar at the bottom', () => {
    const scrollPort = elementWith({
      rect: [100, 61, 256, 337],
      clientWidth: 256,
      clientHeight: 323,
    });
    expect(getScrollPortClientInsets(column(), scrollPort)).toEqual({
      top: 21,
      right: 0,
      bottom: 14,
      left: 0,
    });
  });

  it("measures from the container's padding edge, inside its border", () => {
    // `divide-x` gives every column after the first a 1px left border.
    const bordered = elementWith({
      rect: [100, 40, 257, 358],
      clientLeft: 1,
      clientWidth: 256,
      clientHeight: 358,
    });
    const scrollPort = elementWith({
      rect: [101, 61, 256, 337],
      clientWidth: 242,
      clientHeight: 337,
    });
    expect(getScrollPortClientInsets(bordered, scrollPort)).toEqual({
      top: 21,
      right: 14,
      bottom: 0,
      left: 0,
    });
  });

  it('returns undefined while the container has no layout, as in a hidden tab', () => {
    const hidden = elementWith({ rect: [0, 0, 0, 0], clientWidth: 0, clientHeight: 0 });
    const scrollPort = elementWith({ rect: [0, 0, 0, 0], clientWidth: 0, clientHeight: 0 });
    expect(getScrollPortClientInsets(hidden, scrollPort)).toBeUndefined();
  });
});
