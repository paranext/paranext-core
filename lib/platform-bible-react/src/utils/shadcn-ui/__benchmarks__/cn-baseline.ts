// Baseline `cn` implementation suggested by the reviewer — this is what we are
// comparing the compatibility-layer `cn` against. It does NOT support the
// TW3 `tw-` prefix; it only deduplicates classes that use the TW4 `tw:` prefix.
//
// This file lives only inside __benchmarks__ and is never imported by the
// shipped library.
import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMergeCustom = extendTailwindMerge({ prefix: 'tw' });

export function cnBaseline(...inputs: ClassValue[]) {
  return twMergeCustom(clsx(inputs));
}
