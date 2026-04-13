/**
 * Utility functions for color conversion in the main process. Needed because Electron's
 * setTitleBarOverlay doesn't support oklch format.
 */

/**
 * Convert oklch color string to hex format
 *
 * @param oklchString - Color string in oklch format, e.g. "oklch(0.56 0.18 29.23)"
 * @returns Hex color string, e.g. "#FF0000", or original string if conversion fails
 */
export function oklchToHex(oklchString: string): string {
  const match = oklchString.match(/oklch\s*\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!match) {
    return oklchString; // Return original if not oklch format
  }

  const [, lStr, cStr, hStr] = match;
  const l = parseFloat(lStr);
  const c = parseFloat(cStr);
  const h = parseFloat(hStr);

  // Convert oklch to RGB
  const rgb = oklchToRgb(l, c, h);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Convert oklch to RGB color Implementation based on https://oklch.com/ and CSS Color Module Level
 * 4
 */
function oklchToRgb(l: number, c: number, h: number): { r: number; g: number; b: number } {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  // Convert OKLab to linear RGB
  const lms = new Float64Array(3);
  lms[0] = l + 0.3963377774 * a + 0.2158037573 * b;
  lms[1] = l - 0.1055613458 * a - 0.0638541728 * b;
  lms[2] = l - 0.0894841775 * a - 1.291486575 * b;

  const lms3 = new Float64Array(3);
  for (let i = 0; i < 3; i++) {
    lms3[i] = lms[i] * lms[i] * lms[i];
  }

  const r = 4.0767416621 * lms3[0] - 3.3077363322 * lms3[1] + 0.2309101289 * lms3[2];
  const g = -1.2684380046 * lms3[0] + 2.6097574011 * lms3[1] - 0.3413193761 * lms3[2];
  const b_ = -0.0041960863 * lms3[0] - 0.7034186147 * lms3[1] + 1.707614701 * lms3[2];

  // Clamp to [0, 1] and convert to [0, 255]
  return {
    r: Math.round(clamp(r, 0, 1) * 255),
    g: Math.round(clamp(g, 0, 1) * 255),
    b: Math.round(clamp(b_, 0, 1) * 255),
  };
}

/** Convert RGB to hex color string */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/** Clamp value between min and max */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
