import { type CSSProperties, type RefObject, useLayoutEffect, useState } from 'react';
import { type BoxInsets, getScrollPortClientInsets } from './reveal-resource.utils';

/**
 * A column `style` carrying where its reveal outline sits; read by
 * `REVEALED_COLUMN_OUTLINE_CLASSES`. React's `CSSProperties` has no index signature, so the custom
 * properties are declared to be set without a type assertion.
 */
export type RevealOutlineInsetStyle = CSSProperties & {
  [K in `--stg-reveal-inset-${keyof BoxInsets}`]?: string;
};

function sameInsets(a: BoxInsets | undefined, b: BoxInsets): boolean {
  return (
    a !== undefined &&
    a.top === b.top &&
    a.right === b.right &&
    a.bottom === b.bottom &&
    a.left === b.left
  );
}

/**
 * Keeps a revealed column's outline over its scrolling text and off its scrollbar. The outline is
 * drawn on the column, and the column's scroll port fills it below the header with its scrollbar at
 * an edge (the left one for right-to-left text), so an outline set in from the column's edge would
 * run down the scrollbar. This measures the scroll port's client area, which leaves the scrollbar
 * out, and re-measures whenever it resizes, which is also when a scrollbar comes or goes.
 *
 * Hidden case: a hidden tab has no layout, so no measurement is taken there and the last one
 * stands; showing the tab resizes the scroll port, and the observer measures again.
 *
 * @param columnRef The column, which holds one cell and its `[data-cell-content]` scroll port.
 * @param isEnabled Whether the outline is shown on a column whose cell scrolls itself.
 * @returns The style to set on the column, or `undefined` to leave the outline on the column's
 *   whole box.
 */
export function useRevealOutlineInsets(
  columnRef: RefObject<HTMLElement | null>,
  isEnabled: boolean,
): RevealOutlineInsetStyle | undefined {
  const [insets, setInsets] = useState<BoxInsets | undefined>(undefined);

  useLayoutEffect(() => {
    const column = columnRef.current;
    const scrollPort = column?.querySelector<HTMLElement>('[data-cell-content]');
    if (!isEnabled || !column || !scrollPort) return undefined;
    const measure = () => {
      const next = getScrollPortClientInsets(column, scrollPort);
      if (next) setInsets((previous) => (sameInsets(previous, next) ? previous : next));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(column);
    observer.observe(scrollPort);
    return () => observer.disconnect();
  }, [columnRef, isEnabled]);

  if (!isEnabled || !insets) return undefined;
  return {
    '--stg-reveal-inset-top': `${insets.top}px`,
    '--stg-reveal-inset-right': `${insets.right}px`,
    '--stg-reveal-inset-bottom': `${insets.bottom}px`,
    '--stg-reveal-inset-left': `${insets.left}px`,
  };
}
