import { vi } from 'vitest';

/** Mock useLocalizedStrings: returns empty record and false (not loading) */
export const useLocalizedStrings = vi.fn(() => [{}, false]);
