import React, { MutableRefObject, useCallback, useEffect } from 'react';

export type Direction = 'ltr' | 'rtl';

// TODO: issue: both exported functions fire x^2 times with x = the number of elements on screen that use this, however not all do fire on re-rendering.
// It works well for expected cases like a popover (combobox), but not so where unexpectedly a dir prop is needed (select, radio group, toggle group)
// or where we want to re-position elements with absolute position based on the current direction (bcv, search bar)
// This a problem in the preview app, but may not be a problem in the product, as we do not expect switching layout direction at runtime - maybe?

export function useGetDirRefCallback(setDir: React.Dispatch<React.SetStateAction<Direction>>) {
  return useCallback(
    (node: Element | null) => {
      if (node) {
        setDir(getDir(node));
        console.log('DIR', getDir(node));
      }
    },
    [setDir],
  );
}

export function useGetDirEffect(
  setDir: React.Dispatch<React.SetStateAction<Direction>>,
  ref: MutableRefObject<Element>,
) {
  useEffect(() => {
    setDir(getDir(ref.current));
  }, [setDir, ref]);
}

function getDir(node: Element): Direction {
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (getComputedStyle(node).direction as Direction) ?? 'ltr';
}
