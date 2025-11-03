/** Options for calculating resizable pane size limits. */
export type PaneSizeLimitsOptions = {
  /**
   * The height of the splitter between the two panes, in pixels.
   *
   * @default 4
   */
  splitterHeightPx?: number;
  /**
   * Minimum height of the secondary pane (the pane whose size is to be constrained), in pixels.
   * Ensures the secondary pane never shrinks below this height.
   *
   * @default 20
   */
  secondaryPaneMinHeightPx?: number;
  /**
   * Minimum height of the main pane (the other pane), in pixels. Ensures the main pane always has
   * some visible content.
   *
   * @default 60
   */
  mainPaneMinHeightPx?: number;
  /**
   * Absolute minimum percentage of the total available height that the secondary pane can occupy.
   * Used to avoid the pane collapsing completely (e.g., if the available height is less that the
   * combined minimums).
   *
   * @default 3
   */
  absoluteMinPercent?: number;
  /**
   * Absolute maximum percentage of the total available height that the secondary pane can occupy.
   * Can be used to keep the "main" pane from being overwhelmed by the size of the secondary pane.
   *
   * @default 90
   */
  absoluteMaxPercent?: number;
};

/**
 * Calculates the minimum and maximum size (as percentages) for a resizable pane in a two-pane
 * layout based on the total available height and optional constraints.
 *
 * The returned percentages indicate the allowable range for the secondary pane (the one whose size
 * limits are being computed). When applied, they ensure that pane never shrinks below its minimum
 * or grows beyond its maximum, leaving adequate space for both panes.
 *
 * @param availableHeightPx - Total height available for both panes, in pixels.
 * @param options - Optional parameters for customizing pane size constraints.
 * @returns An object containing the minimum and maximum percentages the secondary pane can occupy:
 *   `{ minPercent, maxPercent }`.
 */
export function getPaneSizeLimits(
  availableHeightPx: number,
  options: PaneSizeLimitsOptions = {},
): { minPercent: number; maxPercent: number } {
  const {
    splitterHeightPx = 4,
    secondaryPaneMinHeightPx = 20,
    mainPaneMinHeightPx = 60,
    absoluteMinPercent = 3,
    absoluteMaxPercent = 90,
  } = options;

  const usableHeightPx = availableHeightPx - splitterHeightPx;

  let minPercent: number;
  let maxPercent: number;

  if (usableHeightPx < secondaryPaneMinHeightPx + mainPaneMinHeightPx) {
    minPercent = absoluteMinPercent;
    maxPercent = absoluteMaxPercent;
  } else {
    maxPercent = Math.min(
      Math.floor(((usableHeightPx - mainPaneMinHeightPx) / usableHeightPx) * 100),
      absoluteMaxPercent,
    );

    minPercent = Math.min(
      Math.max(Math.ceil((secondaryPaneMinHeightPx / usableHeightPx) * 100), absoluteMinPercent),
      maxPercent,
    );
  }

  return { minPercent, maxPercent };
}
