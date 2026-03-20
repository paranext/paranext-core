import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Internal types ---

type PrefixInfo = {
  /** The class normalized to tw: (TW4) format for tailwind-merge */
  normalized: string;
  /** The original class string as authored */
  original: string;
};

// --- Helpers ---

/**
 * Split a class string on `:` but respect brackets so that arbitrary values like `[color:red]` are
 * not split.
 */
function splitClassSegments(cls: string): string[] {
  const segments: string[] = [];
  let current = '';
  let bracketDepth = 0;

  for (let i = 0; i < cls.length; i++) {
    const char = cls[i];
    if (char === '[') bracketDepth++;
    else if (char === ']') bracketDepth--;

    if (char === ':' && bracketDepth === 0) {
      segments.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  segments.push(current);
  return segments;
}

/**
 * Normalize a TW3-style (`tw-*`) class to TW4-style (`tw:*`) so that tailwind-merge (which treats
 * `tw` as a modifier) can deduplicate across both prefix formats.
 *
 * Handles four TW3 input forms:
 *
 * - `tw-utility` → `tw:utility`
 * - `tw--utility` (negative form A) → `tw:-utility`
 * - `-tw-utility` (negative form B, with optional variant prefixes) → `tw:-utility` (variants
 *   moved before `tw:`)
 * - `!tw-utility` (important form, with optional variant prefixes) → `tw:!utility` (variants
 *   moved before `tw:`)
 *
 * TW4-style classes (`tw:*`) pass through unchanged.
 */
function normalizeTw3ToTw4(token: string): PrefixInfo {
  // Already TW4 format — pass through
  if (token.startsWith('tw:')) {
    return { normalized: token, original: token };
  }

  const segments = splitClassSegments(token);

  // Negative form B: variants may precede `-tw-utility`
  // e.g. `hover:-tw-mt-4` → segments = ['hover', '-tw-mt-4']
  const negFormBIndex = segments.findIndex((s) => s.startsWith('-tw-'));
  if (negFormBIndex !== -1) {
    const utility = segments[negFormBIndex].slice(4); // strip `-tw-`
    const variants = segments.filter((_, i) => i !== negFormBIndex);
    const normalized = `tw:${[...variants, `-${utility}`].join(':')}`;
    return { normalized, original: token };
  }

  // Important form: variants may precede `!tw-utility`
  // e.g. `hover:!tw-p-4` → segments = ['hover', '!tw-p-4']
  const importantFormIndex = segments.findIndex((s) => s.startsWith('!tw-'));
  if (importantFormIndex !== -1) {
    const utility = segments[importantFormIndex].slice(4); // strip `!tw-`
    const variants = segments.filter((_, i) => i !== importantFormIndex);
    const normalized = `tw:${[...variants, `!${utility}`].join(':')}`;
    return { normalized, original: token };
  }

  // Standard tw- prefix (last segment) — handles both positive and negative form A (tw--X)
  const lastSegment = segments[segments.length - 1];
  if (lastSegment.startsWith('tw-')) {
    const utility = lastSegment.slice(3); // strip `tw-`
    const variants = segments.slice(0, -1);
    // `tw-mt-4` → utility='mt-4'  → `tw:mt-4`
    // `tw--mt-4` → utility='-mt-4' → `tw:-mt-4`
    const normalized = `tw:${[...variants, utility].join(':')}`;
    return { normalized, original: token };
  }

  // Not a tw-prefixed class
  return { normalized: token, original: token };
}

/**
 * Convert a normalized TW4 class (`tw:*`) back to the original TW3 format based on the format of
 * the winning original class.
 */
function restoreToOriginalFormat(normalizedClass: string, originalFormat: string): string {
  // If the winner was already TW4, keep as-is
  if (originalFormat.startsWith('tw:')) {
    return normalizedClass;
  }

  const segments = splitClassSegments(normalizedClass);
  // Must start with `tw` modifier to be restorable
  if (segments[0] !== 'tw') return normalizedClass;

  const variants = segments.slice(1, -1);
  const utility = segments[segments.length - 1];

  // Detect which TW3 form the original used
  const origSegments = splitClassSegments(originalFormat);
  const wasNegFormB = origSegments.some((s) => s.startsWith('-tw-'));
  const wasImportantForm = origSegments.some((s) => s.startsWith('!tw-'));

  if (wasNegFormB && utility.startsWith('-')) {
    // `-tw-mt-4` form: strip the leading `-` from utility and wrap with `-tw-`
    const positiveUtility = utility.slice(1);
    return [...variants, `-tw-${positiveUtility}`].join(':');
  }

  if (wasImportantForm && utility.startsWith('!')) {
    // `!tw-p-4` form: strip the leading `!` from utility and wrap with `!tw-`
    const bareUtility = utility.slice(1);
    return [...variants, `!tw-${bareUtility}`].join(':');
  }

  // Standard `tw-` form (covers both positive and negative form A `tw--mt-4`)
  return [...variants, `tw-${utility}`].join(':');
}

// --- Public API ---

/**
 * Tailwind and CSS class application helper function. Uses
 * [`clsx`](https://www.npmjs.com/package/clsx) to make it easy to apply classes conditionally using
 * object syntax, and uses [`tailwind-merge`](https://www.npmjs.com/package/tailwind-merge) to make
 * it easy to merge/overwrite Tailwind classes in a programmer-logic-friendly way.
 *
 * Supports both TW3 (`tw-*`) and TW4 (`tw:*`) prefix formats. When classes using different prefix
 * formats conflict (e.g. `tw-p-4` vs `tw:p-4`), the last one specified wins (standard
 * tailwind-merge behavior), and the result preserves the winning class's original prefix format.
 *
 * This backwards compatibility allows extensions still using TW3's `tw-` prefix to interoperate
 * with PBR components that have migrated to TW4's `tw:` prefix.
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
 *   'tw:bg-primary tw:h-10 tw:text-primary-foreground',
 *   'tw:bg-secondary',
 *   {
 *     'tw:border-blue-500': borderShouldBeBlue,
 *     'tw:text-red-500': textShouldBeRed,
 *     'tw:h-20': heightShouldBe20,
 *   },
 *   'some-class',
 * );
 * ```
 *
 * The resulting `classString` is `'tw:h-10 tw:bg-secondary tw:border-blue-500 tw:text-red-500
 * some-class'`
 *
 * - Notice that `'tw:bg-secondary'`, specified later, overwrote `'tw:bg-primary'`, specified
 *   earlier, because they are Tailwind classes that affect the same css property
 * - Notice that `'tw:text-red-500'`, specified later, overwrote `'tw:text-primary-foreground'`,
 *   specified earlier, because they are Tailwind classes that affect the same css property
 * - Notice that `'tw:h-20'`, specified later, did not overwrite `'tw:h-10'`, specified earlier,
 *   because `'tw:h-20'` is part of a conditional class object and its value evaluated to `false`;
 *   therefore it was not applied
 * - Notice that `'some-class'` was applied. This function is not limited only to Tailwind classes.
 *
 * @param inputs Class strings or `clsx` conditional class objects to merge. Tailwind classes
 *   specified later in the arguments overwrite similar Tailwind classes specified earlier in the
 *   arguments
 * @returns Class string containing all applicable classes from the arguments based on the rules
 *   described above
 */
export function cn(...inputs: ClassValue[]) {
  const resolved = clsx(inputs);
  if (!resolved) return resolved;

  const tokens = resolved.split(' ').filter(Boolean);

  // Track the last-seen original form for each normalized class so we can restore after merge
  const lastSeenOriginal = new Map<string, string>();
  const normalizedTokens: string[] = [];

  for (const token of tokens) {
    const info = normalizeTw3ToTw4(token);
    lastSeenOriginal.set(info.normalized, info.original);
    normalizedTokens.push(info.normalized);
  }

  // twMerge (no prefix config) treats `tw:` as a modifier — dedup works correctly
  const merged = twMerge(normalizedTokens.join(' '));

  // Restore surviving tokens to their original prefix format
  const mergedTokens = merged.split(' ').filter(Boolean);
  const restored = mergedTokens.map((mergedToken) => {
    const original = lastSeenOriginal.get(mergedToken);
    if (!original) return mergedToken;
    return restoreToOriginalFormat(mergedToken, original);
  });

  return restored.join(' ');
}
