import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import type { BoxData, DockMode, LayoutData, PanelData } from 'rc-dock';
import { fixLayoutData } from 'rc-dock/lib/Algorithm';
import {
  DockSpan,
  getExtentInDock,
  getNewGroupExtent,
  getSpanInDock,
  getSpanOverlap,
} from './dock-layout-geometry.util';

/** A tab group holding one tab, with an rc-dock `size` weight */
function group(id: string, size = 200): PanelData {
  return { id, size, tabs: [{ id: `${id}-tab`, title: id, content: createElement('div') }] };
}

/** A box laying `children` out in `mode`, with an rc-dock `size` weight */
function box(mode: DockMode, children: (BoxData | PanelData)[], size = 200): BoxData {
  return { mode, size, children };
}

/**
 * Loads a dock box the way rc-dock does: links every node to its parent, fills in missing sizes and
 * collapses boxes left with a single child
 */
function loadDock(dockbox: BoxData): LayoutData {
  return fixLayoutData({ dockbox });
}

/** The tab group with this id anywhere in the dock box */
function groupIn(layout: LayoutData, id: string): PanelData {
  const search = (node: BoxData | PanelData): PanelData | undefined => {
    if ('tabs' in node) return node.id === id ? node : undefined;
    return node.children.reduce<PanelData | undefined>(
      (found, child) => found ?? search(child),
      undefined,
    );
  };
  const found = search(layout.dockbox);
  if (!found) throw new Error(`No tab group '${id}' in the layout`);
  return found;
}

/** Matches a span within floating-point error of `expected` */
function closeToSpan([start, end]: DockSpan): DockSpan {
  return [expect.closeTo(start, 9), expect.closeTo(end, 9)];
}

describe('getSpanInDock', () => {
  it('gives the dock box the whole docked area on both axes', () => {
    const layout = loadDock(box('horizontal', [group('a'), group('b')]));

    expect(getSpanInDock(layout.dockbox, 'horizontal')).toEqual(closeToSpan([0, 1]));
    expect(getSpanInDock(layout.dockbox, 'vertical')).toEqual(closeToSpan([0, 1]));
  });

  it('shares a box out by its children’s sizes along its axis and passes its span through across it', () => {
    const layout = loadDock(
      box('horizontal', [
        box('vertical', [group('a', 300), group('b', 100)]),
        box('vertical', [group('c', 100), group('d', 300)]),
      ]),
    );

    expect(getSpanInDock(groupIn(layout, 'a'), 'horizontal')).toEqual(closeToSpan([0, 0.5]));
    expect(getSpanInDock(groupIn(layout, 'd'), 'horizontal')).toEqual(closeToSpan([0.5, 1]));
    expect(getSpanInDock(groupIn(layout, 'a'), 'vertical')).toEqual(closeToSpan([0, 0.75]));
    expect(getSpanInDock(groupIn(layout, 'b'), 'vertical')).toEqual(closeToSpan([0.75, 1]));
    expect(getSpanInDock(groupIn(layout, 'c'), 'vertical')).toEqual(closeToSpan([0, 0.25]));
    expect(getSpanInDock(groupIn(layout, 'd'), 'vertical')).toEqual(closeToSpan([0.25, 1]));
  });

  it('draws a box with no mode as a row, the way rc-dock renders it', () => {
    const dockbox = box('horizontal', [group('x', 100), group('y', 300)]);
    // rc-dock's type requires `mode`; a saved layout may lack it
    Reflect.deleteProperty(dockbox, 'mode');
    const layout = loadDock(dockbox);

    expect(getSpanInDock(groupIn(layout, 'x'), 'horizontal')).toEqual(closeToSpan([0, 0.25]));
    expect(getSpanInDock(groupIn(layout, 'x'), 'vertical')).toEqual(closeToSpan([0, 1]));
  });

  it('follows rc-dock’s collapse of a box left holding a single tab group', () => {
    // Simple mode's three columns, each a box with one tab group, as `simple-layout.data.ts` builds them
    const layout = loadDock(
      box('horizontal', [
        box('vertical', [group('model')], 1),
        box('vertical', [group('editor')], 2),
        box('vertical', [group('resources')], 1),
      ]),
    );

    expect(groupIn(layout, 'editor').parent).toBe(layout.dockbox);
    expect(getSpanInDock(groupIn(layout, 'editor'), 'horizontal')).toEqual(
      closeToSpan([0.25, 0.75]),
    );
  });

  it('reads all-zero sizes as equal shares', () => {
    const layout = loadDock(box('horizontal', [group('a', 0), group('b', 0)]));

    expect(getSpanInDock(groupIn(layout, 'a'), 'horizontal')).toEqual(closeToSpan([0, 0.5]));
    expect(getSpanInDock(groupIn(layout, 'b'), 'horizontal')).toEqual(closeToSpan([0.5, 1]));
  });
});

describe('getSpanOverlap', () => {
  it.each<[DockSpan, DockSpan, number]>([
    [[0, 0.5], [0.5, 1], 0],
    [[0, 0.25], [0.5, 1], 0],
    [[0, 0.75], [0.25, 1], 0.5],
    [[0, 1], [0.25, 0.5], 0.25],
  ])('overlap of %j and %j is %d', (a, b, expected) => {
    expect(getSpanOverlap(a, b)).toBeCloseTo(expected, 9);
  });
});

describe('getNewGroupExtent and getExtentInDock', () => {
  it.each<[string, BoxData, string, string, number, number]>([
    [
      'a narrowed neighbour [Editor 1000 | Comments 250]',
      box('horizontal', [group('editor', 1000), group('comments', 250)]),
      'editor',
      'comments',
      4 / 9,
      0.2,
    ],
    [
      'untouched [200 | 200]',
      box('horizontal', [group('left'), group('right')]),
      'left',
      'right',
      1 / 3,
      0.5,
    ],
    [
      'Editor 600 | a column of two 400',
      box('horizontal', [
        group('editor', 600),
        box('vertical', [group('upper'), group('lower')], 400),
      ]),
      'editor',
      'upper',
      0.375,
      0.4,
    ],
    [
      'Simple mode’s 1 | 2 | 1 columns',
      box('horizontal', [
        box('vertical', [group('model')], 1),
        box('vertical', [group('editor')], 2),
        box('vertical', [group('resources')], 1),
      ]),
      'editor',
      'resources',
      1 / 3,
      0.25,
    ],
  ])(
    'measures a new group beside the target and its neighbour in %s',
    (_name, dockbox, targetId, neighbourId, expectedNew, expectedNeighbour) => {
      const layout = loadDock(dockbox);

      expect(getNewGroupExtent(groupIn(layout, targetId), 'horizontal')).toBeCloseTo(
        expectedNew,
        9,
      );
      expect(getExtentInDock(groupIn(layout, neighbourId), 'horizontal')).toBeCloseTo(
        expectedNeighbour,
        9,
      );
    },
  );

  it('halves a target in a box laid out across the axis, the way rc-dock wraps the two', () => {
    const layout = loadDock(
      box('horizontal', [box('vertical', [group('a'), group('b')]), group('c')]),
    );

    expect(getNewGroupExtent(groupIn(layout, 'a'), 'horizontal')).toBeCloseTo(0.25, 9);
  });

  it('halves a target in a box with no mode, since rc-dock compares the mode exactly', () => {
    const dockbox = box('horizontal', [group('x', 100), group('y', 300)]);
    Reflect.deleteProperty(dockbox, 'mode');
    const layout = loadDock(dockbox);

    expect(getNewGroupExtent(groupIn(layout, 'x'), 'horizontal')).toBeCloseTo(0.125, 9);
  });

  it('measures heights for a column', () => {
    const layout = loadDock(box('vertical', [group('upper', 1000), group('strip', 250)]));

    expect(getNewGroupExtent(groupIn(layout, 'upper'), 'vertical')).toBeCloseTo(4 / 9, 9);
    expect(getExtentInDock(groupIn(layout, 'strip'), 'vertical')).toBeCloseTo(0.2, 9);
  });
});
