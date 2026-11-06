import type { CSSProperties } from 'react';

/** A `style` object that also carries CSS custom properties, which `CSSProperties` alone rejects. */
type StyleWithCssVariables = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Cancels the enter zoom `DialogContent` applies, for dialogs that override its centered card into
 * a full-viewport layer.
 *
 * `DialogContent` animates in from `tw:data-open:zoom-in-95`. On a card that reads as a gentle pop;
 * on a full-viewport layer it scales the layer about its centre, leaving a band of un-covered,
 * still-live-looking app around all four edges for the length of the animation.
 *
 * Layered as an inline style rather than a `tw:data-open:zoom-in-100` class because the class does
 * not reliably win. `tailwind-merge` has no class group for `tw-animate-css`, so it treats the two
 * zoom utilities as unrelated and keeps both; which one applies is then decided by their order in
 * the generated stylesheet, not by the order they were passed to `cn`. Both utilities set the same
 * `--tw-enter-scale` custom property, so setting it inline on the element beats either of them.
 *
 * Setting the property does not require the zoom class to be present, so it is safe to apply
 * unconditionally.
 */
export const CANCEL_ENTER_ZOOM_STYLE: StyleWithCssVariables = { '--tw-enter-scale': 1 };
