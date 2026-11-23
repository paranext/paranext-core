import type { BoxData, PanelData } from 'rc-dock';

/** An axis of the docked area: `horizontal` for widths, `vertical` for heights */
export type DockAxis = 'horizontal' | 'vertical';

/**
 * Where a tab group or box sits along one axis of the docked area, as fractions of the docked
 * area's extent on that axis: `[start, end]`, with `0 <= start <= end <= 1`
 */
export type DockSpan = readonly [start: number, end: number];

/**
 * Tolerance for comparing spans and extents worked out from rc-dock's weights, which are
 * floating-point sums and quotients: values closer than this count as equal
 */
export const DOCK_SPAN_TOLERANCE = 1e-9;

/**
 * Whether rc-dock draws `box`'s children one after another along `axis`. rc-dock draws every box
 * that is not `vertical` as a row, including one with no mode at all (`DockBox`).
 */
function isDrawnAlong(box: BoxData, axis: DockAxis): boolean {
  return (box.mode === 'vertical') === (axis === 'vertical');
}

/**
 * The weights rc-dock lays `box`'s children out by. All-zero weights (only a hand-edited layout has
 * them) are read as equal ones, so no share comes out as a division by zero.
 */
function getChildWeights(box: BoxData): number[] {
  const weights = box.children.map((child) => Math.max(child.size ?? 0, 0));
  return weights.some((weight) => weight > 0) ? weights : weights.map(() => 1);
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

/**
 * Where a docked tab group or box sits along `axis`, as fractions of the docked area, worked out
 * from rc-dock's `size` weights rather than from the DOM, which lags rc-dock's pending layout.
 *
 * Rc-dock renders every child of a box as `flex: <size> 1000000 <size>px`, so along the box's axis
 * a child gets `size / (sum of its siblings' sizes)` of the box, and across it the box's whole
 * extent. The dock box spans the whole docked area whatever its own `size`. Dividers and minimum
 * sizes are ignored, which puts the result a few pixels off.
 *
 * @param node A tab group or box in the dock box, with the `parent` links rc-dock keeps in any
 *   layout it has loaded
 * @param axis The axis to measure along
 * @returns The node's span on that axis
 */
export function getSpanInDock(node: PanelData | BoxData, axis: DockAxis): DockSpan {
  const box = node.parent;
  if (!box) return [0, 1];
  const [boxStart, boxEnd] = getSpanInDock(box, axis);
  const index = box.children.indexOf(node);
  if (!isDrawnAlong(box, axis) || index < 0) return [boxStart, boxEnd];
  const weights = getChildWeights(box);
  const total = sum(weights);
  const before = sum(weights.slice(0, index));
  const boxExtent = boxEnd - boxStart;
  return [
    boxStart + (boxExtent * before) / total,
    boxStart + (boxExtent * (before + weights[index])) / total,
  ];
}

/**
 * How far a docked tab group or box extends along `axis`, as a fraction of the docked area (see
 * {@link getSpanInDock})
 */
export function getExtentInDock(node: PanelData | BoxData, axis: DockAxis): number {
  const [start, end] = getSpanInDock(node, axis);
  return end - start;
}

/** How much two spans overlap: 0 when they are apart or only touch */
export function getSpanOverlap([startA, endA]: DockSpan, [startB, endB]: DockSpan): number {
  return Math.max(0, Math.min(endA, endB) - Math.max(startA, startB));
}

/**
 * The extent along `axis` that rc-dock gives a new tab group it docks against a side of `tabGroup`
 * on that axis (its `dockPanelToPanel`), as a fraction of the docked area:
 *
 * - When `tabGroup`'s box is laid out along `axis`, the new group joins that box with `tabGroup`'s
 *   own `size` as its weight.
 * - Otherwise rc-dock wraps `tabGroup` and the new group in a new box of two equal weights, which
 *   halves `tabGroup`'s extent. rc-dock tells the two cases apart by comparing the box's `mode`
 *   exactly, so a box with no mode takes this branch even though it is drawn as a row.
 *
 * @param tabGroup The docked tab group the new group would be docked beside
 * @param axis The axis of the side it would be docked on
 * @returns The new group's extent on that axis
 */
export function getNewGroupExtent(tabGroup: PanelData, axis: DockAxis): number {
  const extent = getExtentInDock(tabGroup, axis);
  const box = tabGroup.parent;
  const index = box ? box.children.indexOf(tabGroup) : -1;
  if (!box || box.mode !== axis || index < 0) return extent / 2;
  const weights = getChildWeights(box);
  const total = sum(weights);
  return (extent * total) / (total + weights[index]);
}
