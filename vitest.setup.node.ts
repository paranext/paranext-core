// Additional setup for the `node`-environment vitest projects (`extensions`,
// `lib/platform-bible-utils`), loaded alongside the shared `vitest.setup.ts`.
//
// Those projects run the same scripture converters the extension host does, and the converters need
// `DOMParser`/`XMLSerializer`, which a `node` environment has none of. Installing them here mirrors
// what `extension-host.ts` does at startup.
//
// Deliberately kept out of the shared setup file: the jsdom projects already have a real DOM, so
// putting it there would pull xmldom into all ~150 of their workers for nothing — and guarding it
// with a conditional `await import` would make that file a top-level-await module, which measurably
// destabilized timing-sensitive renderer tests.

import './src/node/polyfills/dom-globals.polyfill';
