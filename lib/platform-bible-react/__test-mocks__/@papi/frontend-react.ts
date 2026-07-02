import { vi } from 'vitest';

// Test stub for the host-provided `@papi/frontend/react` virtual module so Vitest can
// resolve the specifier. Tests replace these with `vi.mock('@papi/frontend/react', ...)`.
// Mirrors extensions/__test-mocks__/@papi/frontend-react.ts.
export const useProjectSetting = vi.fn();
export const useProjectDataProvider = vi.fn();
