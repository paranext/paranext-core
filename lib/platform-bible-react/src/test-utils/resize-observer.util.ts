// `ResizeObserver` is deliberately NOT installed ambiently by the repo's shared `vitest.setup.ts`
// alongside the Radix layout shims that sit next to it there. `use-shrink-step.hook.ts` branches on
// `typeof ResizeObserver === 'undefined'` on purpose, so that a render test that doesn't care about
// layout gets the widest shrink step by default instead of the 0-width jsdom would otherwise report.
// Making `ResizeObserver` ambiently present flips that default to the narrowest step for every such
// test in the repo — so a test that opens a Radix overlay and needs one to exist opts in here
// instead, by calling `installNoopResizeObserver()` from its own `beforeAll`.

const doNothing = () => {};

/**
 * Observes nothing and never calls back. A class rather than a factory because Radix constructs it
 * with `new`, and TypeScript only accepts a class there without a cast.
 */
class NoopResizeObserver implements ResizeObserver {
  observe = doNothing;

  unobserve = doNothing;

  disconnect = doNothing;
}

/** Installs a no-op `ResizeObserver` for a test that opens a Radix overlay and needs one to exist. */
export function installNoopResizeObserver(): void {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
}
