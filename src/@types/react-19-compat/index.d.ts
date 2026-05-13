// Compat shims for React 18 → 19 type removals (and one unrelated keyv breakage)
// that affect transitive dependencies we can't or don't want to upgrade yet.
//
// Each entry should be removed when its upstream package adds React 19 support
// (or when we drop the offending dependency entirely).
//
// This folder lives in `src/@types/` so it is auto-loaded as an ambient type
// package by every tsconfig that includes `src/@types` in `typeRoots`. Core,
// extensions, and any other consumer of `papi-dts`/the renderer share these
// shims so a single fix here covers all surfaces.

// Empty import is required so this file is treated as a module — without it,
// `declare module 'react'` would override the entire 'react' module instead
// of augmenting it.
import type * as React from 'react';

declare module 'react' {
  // `rc-dock@3.3.2` (and `4.0.0-alpha.3`) declares `title: React.ReactChild`
  // on `TabData`, but `@types/react@19` removed `ReactChild`. Restore the
  // React 18 definition so rc-dock's `.d.ts` parses.
  type ReactChild = React.ReactElement | string | number;
}

declare module 'keyv' {
  // `@types/cacheable-request@6.0.2` (transitively pulled in by
  // `electron → @electron/get → got@11`) does `import { Store } from 'keyv'`,
  // but `keyv@5+` no longer has a named `Store` export. Add a stub so the
  // .d.ts parses; the type is only used in positions we never reach.
  export type Store<T = unknown> = Record<string, T>;
}

declare global {
  // `@types/mdx@2.0.13` (and other older libs) reference the global `JSX`
  // namespace, which `@types/react@19` no longer provides — JSX moved to
  // `React.JSX`. Re-export everything from `React.JSX` under the global
  // `JSX` namespace. Pattern from the official React 19 upgrade guide.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type ElementType = React.JSX.ElementType;
    interface Element extends React.JSX.Element {}
    interface ElementClass extends React.JSX.ElementClass {}
    interface ElementAttributesProperty extends React.JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute extends React.JSX.ElementChildrenAttribute {}
    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
    interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T> extends React.JSX.IntrinsicClassAttributes<T> {}
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}
