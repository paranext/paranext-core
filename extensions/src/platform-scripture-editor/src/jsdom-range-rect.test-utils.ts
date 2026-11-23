/**
 * Gives jsdom's `Range` the `getBoundingClientRect` it lacks: jsdom (26.x) leaves it undefined
 * rather than returning a rect. A real browser returns an all-zero `DOMRect` for a Range with no
 * client rects (CSSOM View), so this installs only that spec-compliant shape, never a faked
 * non-zero rect. Code that reads a Range rect — the character-marker bar's caret line, Lexical's
 * scroll-into-view after a caret move — then takes the same path it takes in a browser with no
 * layout. A test that needs a real-looking caret rect spies on the method this installs.
 *
 * Call it at module scope in a jsdom test file. It does nothing where the method already exists.
 */
export function polyfillRangeBoundingClientRect(): void {
  if (typeof Range.prototype.getBoundingClientRect === 'function') return;
  Range.prototype.getBoundingClientRect = () => new DOMRect(0, 0, 0, 0);
}
