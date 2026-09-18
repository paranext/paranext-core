import { CSSProperties } from 'react';

/** The Radix primitives whose content the platform draws for a web view. */
type ZoomablePrimitive = 'popover' | 'dropdown-menu';

/**
 * The style that draws a platform overlay at the scale of the pane that asked for it.
 *
 * `zoom` goes on the Radix `Content` element, never the popper wrapper Radix positions: the wrapper
 * stays in unzoomed viewport pixels, so Radix keeps measuring the drawn size and placing it
 * correctly. The available-space variables Radix publishes are in those same unzoomed pixels, so
 * dividing them by the scale is what keeps a zoomed pop-up inside the window rather than letting it
 * grow past the edge.
 *
 * A scale of 1 - or anything that is not a usable positive number - contributes nothing at all, so
 * an overlay from an unzoomed pane renders exactly as it did before.
 *
 * @experimental This function is unstable and may change or disappear without notice
 */
export function contentZoomOverlayStyle(
  scale: number,
  primitive: ZoomablePrimitive,
): CSSProperties {
  if (!Number.isFinite(scale) || scale <= 0 || scale === 1) return {};
  return {
    zoom: scale,
    maxWidth: `calc(var(--radix-${primitive}-content-available-width) / ${scale})`,
    maxHeight: `calc(var(--radix-${primitive}-content-available-height) / ${scale})`,
  };
}
