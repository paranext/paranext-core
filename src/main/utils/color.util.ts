/**
 * Utility functions for color conversion in the main process. Needed because Electron's
 * setTitleBarOverlay doesn't support oklch format.
 */

import { colordx } from '@colordx/core';

/**
 * Convert oklch color string to hex format
 *
 * @param colorString - Color string in any CSS format (oklch, hex, rgb, hsl, etc.)
 * @returns Hex color string, e.g. "#FF0000", or original string if conversion fails
 */
export function oklchToHex(colorString: string): string {
  try {
    return colordx(colorString).toHex();
  } catch {
    // If conversion fails, return original string
    return colorString;
  }
}
