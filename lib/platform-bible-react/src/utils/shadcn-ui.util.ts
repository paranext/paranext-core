import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// shadcn/ui uses this export in its boilerplate code
// eslint-disable-next-line import/prefer-default-export
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
