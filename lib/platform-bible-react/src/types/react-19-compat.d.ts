// Compat shims for React 18 → 19 type removals that affect dependencies we
// can't or don't want to update yet. Each entry should be removed when its
// upstream package adds React 19 support.

// The top-level import makes this file a module — without it,
// `declare module 'react'` would override the entire 'react' module instead
// of augmenting it.
import type * as React from 'react';

declare module 'react' {
  // `@tabler/icons-react@3.41.1` still imports `ReactSVG` from 'react', which
  // was removed in `@types/react@19`. Tabler only uses `keyof ReactSVG` to
  // constrain SVG element tag names, so a record with the SVG keys is enough.
  type ReactSVG = Record<keyof React.JSX.IntrinsicElements, never>;
}

// `@dnd-kit/core@6.x` and `@dnd-kit/sortable@10.x` reference the global `JSX`
// namespace (e.g. `JSX.Element`) which React 19 removed. Aliasing the global to
// `React.JSX` makes the .d.ts files type-check without patching @dnd-kit.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = React.JSX.Element;
    type IntrinsicElements = React.JSX.IntrinsicElements;
    type ElementClass = React.JSX.ElementClass;
    type ElementAttributesProperty = React.JSX.ElementAttributesProperty;
    type ElementChildrenAttribute = React.JSX.ElementChildrenAttribute;
    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
    type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
    type IntrinsicClassAttributes<T> = React.JSX.IntrinsicClassAttributes<T>;
  }
}
