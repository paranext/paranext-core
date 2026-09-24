/**
 * Opt-in channel for the toolbar sync-status Storybook mock.
 *
 * Kept as its own module (types only, no webpack-specific code) so story files under `src/` can
 * import from here without pulling the webpack-only `use-sync-status.hook.ts` mock into `tsc`
 * typecheck — the same split `first-run-language-mock-channel.ts` uses. The webpack-aliased mock
 * reads this same module instance at hook-call time. See
 * `.storybook/mocks/use-sync-status.hook.ts`.
 *
 * A React context rather than a module-level singleton, so stories rendered simultaneously on the
 * autodocs page each read their own state instead of clobbering one another.
 */
import { createContext } from 'react';
// Type-only import of the real hook's contract, so a story can never describe a state the hook
// cannot actually produce. Deep relative (not `@renderer/*`) so the webpack replacement that swaps
// the hook out does not match this request.
import type { SyncStatusInfo } from '../../src/renderer/hooks/use-sync-status.hook';

/** Exactly what `useSyncStatus()` returns, which is all the sync button reads. */
export type SyncStatusMock = SyncStatusInfo;

/**
 * Per-story sync status. `undefined` (no provider) leaves the mocked hook at its inert default —
 * `idle` with no projects, which is what the real hook reports in Storybook, where the Send/Receive
 * commands it seeds from have no backend to answer them.
 */
export const SyncStatusMockContext = createContext<SyncStatusMock | undefined>(undefined);
