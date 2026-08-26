import { PropsWithChildren } from 'react';
import { ShrinkStepContext, ShrinkStepOverrideContext } from './shrink-step.context';

/** Props for {@link ShrinkStepOverride}. */
export type ShrinkStepOverrideProps = PropsWithChildren<{
  /** The shrink step to force on everything inside. Higher means narrower. */
  value: number;
}>;

/**
 * Forces a shrink step on everything it wraps, instead of letting toolbars measure their own width.
 *
 * Intended for stories and tests: measuring needs a layout engine, which jsdom does not have. In
 * the app, render toolbars without this and let them measure themselves.
 *
 * It sets both shrink-step contexts, so it works whether or not a toolbar sits between it and the
 * component under test. A toolbar inside it reads the override and republishes that same value to
 * its descendants; a component that only reads a step picks the value up directly, with no toolbar
 * needed in between.
 *
 * @example
 *
 * ```tsx
 * render(
 *   <ShrinkStepOverride value={SHRINK_STEP.MINIMUM}>
 *     <BookChapterControl scrRef={scrRef} handleSubmit={handleSubmit} />
 *   </ShrinkStepOverride>,
 * );
 * ```
 */
export function ShrinkStepOverride({ value, children }: ShrinkStepOverrideProps) {
  return (
    <ShrinkStepOverrideContext.Provider value={value}>
      <ShrinkStepContext.Provider value={value}>{children}</ShrinkStepContext.Provider>
    </ShrinkStepOverrideContext.Provider>
  );
}

export default ShrinkStepOverride;
