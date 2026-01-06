import { useEffect } from 'react';

/**
 * Adds a CSS stylesheet to the current document in a
 * [`style`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/style) element
 *
 * @param stylesheet The CSS stylesheet to apply to the current document. If `undefined`, this hook
 *   does nothing.
 */
export function useStylesheet(stylesheet: string | undefined) {
  useEffect(() => {
    let styleElement: HTMLStyleElement;

    if (stylesheet) {
      // Add styles to document
      styleElement = document.createElement('style');
      styleElement.appendChild(document.createTextNode(stylesheet));
      document.head.appendChild(styleElement);
    }

    return () => {
      if (styleElement) {
        // Remove styles
        document.head.removeChild(styleElement);
      }
    };
  }, [stylesheet]);
}
