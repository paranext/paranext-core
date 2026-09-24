import { createContext, useContext } from 'react';

/**
 * Named shrink steps, ordered widest to narrowest. Consumers compare against these (`step >=
 * SHRINK_STEP.MINIMUM`), so the ascending order is part of the contract.
 *
 * Not every surface uses all four. `BookChapterControl` walks the whole ladder, while a control
 * with only one shorter form — the project selector, the paragraph style label — reads a single
 * boundary (`step >= SHRINK_STEP.MINIMUM`) and ignores the rest.
 */
export const SHRINK_STEP = Object.freeze({
  /** Full labels. */
  WIDE: 0,
  /** Abbreviated primary label form. */
  TIGHT: 1,
  /** Secondary field clipped with an ellipsis — CSS does this on its own. */
  TIGHTER: 2,
  /** Secondary field dropped entirely; primary field alone. */
  MINIMUM: 3,
});

/**
 * The shrink step published by the nearest toolbar root.
 *
 * Deliberately defaults to `SHRINK_STEP.WIDE` rather than throwing the way `useMenuContext` does:
 * every component that reads this is also usable standalone (a `BookChapterControl` in a dialog, a
 * story, a test), and those must keep rendering their full-width form when no toolbar is above
 * them.
 */
export const ShrinkStepContext = createContext<number>(SHRINK_STEP.WIDE);

/**
 * Reads the shrink step published by the nearest toolbar root.
 *
 * The value is resolved at the position of the component that calls this. A component that
 * _renders_ the provider sits above it and will always read the default — so anything that needs
 * the real step must be a child of the toolbar, not the thing that builds it.
 *
 * @returns The current step, or `SHRINK_STEP.WIDE` when there is no provider.
 */
export function useShrinkStepValue(): number {
  return useContext(ShrinkStepContext);
}

/**
 * A shrink step forced from outside, overriding what a toolbar would measure from its own width.
 *
 * Separate from {@link ShrinkStepContext} because the two answer different questions. A toolbar
 * _publishes_ to `ShrinkStepContext` and cannot read its own value back, and that context defaults
 * to `SHRINK_STEP.WIDE` rather than being unset — so a publisher reading it could never tell "no
 * one is overriding me" from "someone is overriding me with the widest step". This context is
 * `undefined` until something sets it, which is the distinction a publisher needs.
 *
 * Set it with {@link ShrinkStepOverride} rather than reaching for the provider directly.
 */
export const ShrinkStepOverrideContext = createContext<number | undefined>(undefined);

/**
 * Reads a shrink step forced from outside, if any.
 *
 * Toolbars that measure their own width call this and prefer its value over their measurement, so
 * stories and tests can pin a step in an environment with no layout engine. Components that only
 * _read_ a step have no use for this — they call {@link useShrinkStepValue} instead.
 *
 * @returns The overriding step, or `undefined` when nothing is overriding.
 */
export function useShrinkStepOverride(): number | undefined {
  return useContext(ShrinkStepOverrideContext);
}
