import { MutableRefObject, useCallback, useEffect, useMemo } from 'react';

export type Direction = 'ltr' | 'rtl';

export function getDirRefCallback(setDir: React.Dispatch<React.SetStateAction<Direction>>) {
  return useCallback((node: any) => {
    if (node) {
      setDir(getDir(node));
    }
  }, []);
}

export function getDirEffect(
  setDir: React.Dispatch<React.SetStateAction<Direction>>,
  ref: MutableRefObject<Element>,
) {
  // TODO: issue: this only fires once on rendering, and not when direction is changed
  // this a problem in the preview app, but may not be a problem in the product, as we do not expect switching a running instance
  useEffect(() => {
    setDir(getDir(ref.current));
  }, []);
}

function getDir(node: Element): Direction {
  return (getComputedStyle(node).direction as Direction) ?? 'ltr';
}
