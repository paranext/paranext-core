// Additional setup for the `node`-environment vitest projects that run the scripture converters,
// loaded alongside the shared `vitest.setup.ts`. Each such project wires this file in itself, so a
// `node`-environment project that never touches the converters does not load it — check that
// criterion rather than assuming every `node` project is covered.
//
// Those projects run the same converters the extension host does, and the converters need
// `DOMParser`/`XMLSerializer`, which a `node` environment has none of. Installing them here mirrors
// what `extension-host.ts` does at startup.
//
// Deliberately kept out of the shared setup file: the jsdom projects already have a real DOM, so
// putting it there would pull xmldom into all ~150 of their workers for nothing — and guarding it
// with a conditional `await import` would make that file a top-level-await module, which measurably
// destabilized timing-sensitive renderer tests.

import './src/node/polyfills/dom-globals.polyfill';
