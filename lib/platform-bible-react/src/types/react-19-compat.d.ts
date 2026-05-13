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
