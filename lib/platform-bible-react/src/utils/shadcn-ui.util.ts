import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMergeCustom = extendTailwindMerge({ prefix: 'tw-' });

/**
 * Tailwind and CSS class application helper function. Uses
 * [`clsx`](https://www.npmjs.com/package/clsx) to make it easy to apply classes conditionally using
 * object syntax, and uses [`tailwind-merge`](https://www.npmjs.com/package/tailwind-merge) to make
 * it easy to merge/overwrite Tailwind classes in a programmer-logic-friendly way.
 *
 * Note: `tailwind-merge` is configured to use the prefix `tw-`, so you must use the same prefix
 * with any Tailwind classes you use with this function to successfully overwrite other Tailwind
 * classes. `platform-bible-react` is configured to use `tw-` as its Tailwind prefix, so any
 * Tailwind classes you pass into `platform-bible-react` components will be compared using the `tw-`
 * prefix.
 *
 * This function was popularized by
 * [shadcn/ui](https://ui.shadcn.com/docs/installation/manual#add-a-cn-helper). See [ByteGrad's
 * explanation video](https://www.youtube.com/watch?v=re2JFITR7TI) for more information.
 *
 * @example
 *
 * ```typescript
 * const borderShouldBeBlue = true;
 * const textShouldBeRed = true;
 * const heightShouldBe20 = false;
 * const classString = cn(
 *   'tw-bg-primary tw-h-10 tw-text-primary-foreground',
 *   'tw-bg-secondary',
 *   {
 *     'tw-border-blue-500': borderShouldBeBlue,
 *     'tw-text-red-500': textShouldBeRed,
 *     'tw-h-20': heightShouldBe20,
 *   },
 *   'some-class',
 * );
 * ```
 *
 * The resulting `classString` is `'tw-h-10 tw-bg-secondary tw-border-blue-500 tw-text-red-500
 * some-class'`
 *
 * - Notice that `'tw-bg-secondary'`, specified later, overwrote `'tw-bg-primary'`, specified earlier,
 *   because they are Tailwind classes that affect the same css property
 * - Notice that `'tw-text-red-500'`, specified later, overwrote `'tw-text-primary-foreground'`,
 *   specified earlier, because they are Tailwind classes that affect the same css property
 * - Notice that `'tw-h-20'`, specified later, did not overwrite `'tw-h-10'`, specified earlier,
 *   because `'tw-h-20'` is part of a conditional class object and its value evaluated to `false`;
 *   therefore it was not applied
 * - Notice that `'some-class'` was applied. This function is not limited only to Tailwind classes.
 *
 *
 * @param inputs Class strings or `clsx` conditional class objects to merge. Tailwind classes
 *   specified later in the arguments overwrite similar Tailwind classes specified earlier in the
 *   arguments
 * @returns Class string containing all applicable classes from the arguments based on the rules
 *   described above
 */
export function cn(...inputs: ClassValue[]) {
  return twMergeCustom(clsx(inputs));
}
