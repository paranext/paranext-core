// The icon catalog renders the tabler icons `platform-bible-react` uses, so the core typecheck sees
// `@tabler/icons-react`'s types. That package still imports `ReactSVG` from 'react', which
// `@types/react@19` removed. This mirrors the shim in
// `lib/platform-bible-react/src/types/react-19-compat.d.ts`; remove both when tabler supports
// React 19's types.

// The top-level import makes this file a module, so `declare module 'react'` augments React's
// types instead of replacing them
import type * as React from 'react';

declare module 'react' {
  type ReactSVG = Record<keyof React.JSX.IntrinsicElements, never>;
}
