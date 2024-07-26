import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMergeCustom = extendTailwindMerge({ prefix: 'pr-' });

// shadcn/ui uses this export in its boilerplate code
// eslint-disable-next-line import/prefer-default-export
export function cn(...inputs: ClassValue[]) {
  return twMergeCustom(clsx(inputs));
}
